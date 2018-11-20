import { has, isArray, keys } from "lodash";

import {
    BookmarkFolderKeys,
    BrowserFolderIDs,
    DynalistFolders
} from "./constants/folders.constants";
import DynalistAPI from "../common/dynalistapi";
import DynamarksDB from "./lib/dynamarksdb";
import LocalBookmarks from "./lib/localbookmarks";
import Messenger from "../common/messenger";
import * as MessengerActions from "../common/constants/messengeractions.constants";
import Settings from "../common/settings";
import { SettingKeys } from "../common/constants/settings.constants";

import * as Types from "../common/types";

import RemoteBookmarks from "./lib/remotebookmarks";
import DocumentChanges from "./lib/dynalist/documentchanges";

class Sync {
    private iDynalistAPI: DynalistAPI = null;
    private iDynamarksDB: DynamarksDB = null;
    private iMessenger: Messenger = null;
    private iLocalBookmarks: LocalBookmarks = null;
    private iRemoteBookmarks: RemoteBookmarks = null;
    private iSettings: Settings = null;

    constructor(messenger: Messenger, settings: Settings) {
        this.iMessenger = messenger;
        this.iSettings = settings;

        this.iDynalistAPI = new DynalistAPI(this.iSettings);
        this.iDynamarksDB = new DynamarksDB(this.iDynalistAPI);
        this.iLocalBookmarks = new LocalBookmarks();
        this.iRemoteBookmarks = new RemoteBookmarks(
            this.iDynalistAPI,
            this.iDynamarksDB,
            this.iSettings
        );

        this.iMessenger.subscribe("settings", this.handleDispatchSettings);
        this.iMessenger.subscribe("sync", this.handleDispatchSync);

        this.prepareToAct();
    }

    private handleDispatchSettings = async (packet: Types.IDispatchMessage) => {
        switch (packet.action) {
            case MessengerActions.SETTINGS_CHANGE:
                return await this.prepareToAct();
            default:
                return;
        }
    };

    private handleDispatchSync = async (packet: Types.IDispatchMessage) => {
        await this.prepareToAct();
        switch (packet.action) {
            case MessengerActions.SYNC_OVERWRITE_SERVER:
                return await this.overwriteServer();
            case MessengerActions.SYNC_OVERWRITE_LOCAL:
                return await this.overwriteLocal();
            case MessengerActions.SYNC_SYNCHRONIZE:
                return await this.synchronize();
            default:
                return;
        }
    };

    private prepareToAct() {
        return this.areSettingsLoaded().then(canSync => {
            if (canSync) {
                return this.populate();
            }
        });
    }

    private async areSettingsLoaded() {
        const existsToken = await this.iSettings.exists(SettingKeys.token);
        const existsDoc = await this.iSettings.exists(SettingKeys.doc);
        return existsToken && existsDoc;
    }

    private async populate() {
        await this.iRemoteBookmarks.setup();
        await this.setupDB();
        await this.iLocalBookmarks.populate();
    }

    private async setupDB() {
        const dbNode = this.iRemoteBookmarks.getSingleByName(
            DynalistFolders.db
        );
        // Verify/instantiate the database
        const isDB = this.iDynamarksDB.doesNodeContainDB(dbNode);

        this.iDynamarksDB.setDBNode(dbNode);
        if (!isDB) {
            await this.mapRemoteFoldersToDB();
        }

        this.iDynamarksDB.updateSync(this.iLocalBookmarks.getBookmarks());
    }

    private async mapRemoteFoldersToDB() {
        keys(DynalistFolders).forEach(folderKey => {
            const folder = this.iRemoteBookmarks.getSingleByName(
                DynalistFolders[folderKey]
            );

            this.iDynamarksDB.addFolderMap(folderKey, folder.id);
        });
        await this.iDynamarksDB.upload();
    }

    private async overwriteServer() {
        // Remove current children
        await this.iRemoteBookmarks.purgeTopFolderChildNodes();

        for (let key of BookmarkFolderKeys) {
            const topLocalFolder = this.iLocalBookmarks.getSingleById(
                BrowserFolderIDs[key]
            );
            const remoteFolderID = this.iDynamarksDB.getMappedFolderByKey(key);
            const remoteFolder = this.iRemoteBookmarks.getSingleById(
                remoteFolderID
            );
            await this.addLocalChildrenToRemote(remoteFolder, topLocalFolder);
        }
    }

    private async addLocalChildrenToRemote(
        remoteFolder: Types.IDynalistNode,
        localFolder: Types.ILocalBookmark
    ): Promise<any> {
        const children = localFolder.children.map(childId => {
            return this.iLocalBookmarks.getSingleById(childId);
        });
        await this.iRemoteBookmarks.addChildren(remoteFolder.id, children);

        // Get the new version
        await this.iRemoteBookmarks.populateBookmarks();
        for (
            let child_index = 0;
            child_index < children.length;
            child_index++
        ) {
            const child = children[child_index];
            if (child.children.length > 0) {
                // Find the remote folder
                const remoteChildId = this.iRemoteBookmarks.getChildIdByIndex(
                    remoteFolder.id,
                    child_index
                );

                if (remoteChildId && remoteChildId !== "") {
                    const remoteChild = this.iRemoteBookmarks.getSingleById(
                        remoteChildId
                    );

                    await this.addLocalChildrenToRemote(remoteChild, child);
                }
            }
        }
    }

    private async overwriteLocal() {
        await this.iLocalBookmarks.purgeTopFolderBookmarks();

        await this.iRemoteBookmarks.populateBookmarks();

        for (let key of BookmarkFolderKeys) {
            const topLocalFolder = this.iLocalBookmarks.getSingleById(
                BrowserFolderIDs[key]
            );
            const remoteFolderID = this.iDynamarksDB.getMappedFolderByKey(key);
            const remoteFolder = this.iRemoteBookmarks.getSingleById(
                remoteFolderID
            );
            await this.addRemoteChildrenToBrowser(remoteFolder, topLocalFolder);
        }
    }

    // Recursive method to add the remote bookmarks
    // to the browser
    private async addRemoteChildrenToBrowser(
        remoteFolder: Types.IDynalistNode,
        localFolder: Types.ILocalBookmark
    ) {
        if (!isArray(remoteFolder.children)) {
            return true;
        }

        // Add the children for the remoteFolder
        let newChildren: browser.bookmarks.BookmarkTreeNode[] = [];
        for (
            let childIndex = 0;
            childIndex < remoteFolder.children.length;
            childIndex++
        ) {
            const childId = remoteFolder.children[childIndex];
            const child = this.iRemoteBookmarks.getSingleById(childId);

            let newBookmark: browser.bookmarks.CreateDetails = {
                parentId: localFolder.id,
                index: childIndex,
                title: child.content
            };
            if (child.note && child.note !== "") {
                newBookmark.url = child.note;
            }
            const newChild = await this.iLocalBookmarks.addBookmark(
                newBookmark
            );
            newChildren.push(newChild);
        }

        // Make sure the data model matches the browser tree
        await this.iLocalBookmarks.populate();

        // Process any folders in the added children
        for (
            let newChildIndex = 0;
            newChildIndex < newChildren.length;
            newChildIndex++
        ) {
            const newChild = newChildren[newChildIndex];
            const localChild = this.iLocalBookmarks.getSingleById(newChild.id);
            const remoteChildId = remoteFolder.children[newChildIndex];
            const remoteChild = this.iRemoteBookmarks.getSingleById(
                remoteChildId
            );
            if (has(remoteChild, "children")) {
                if (remoteChild.children.length > 0) {
                    await this.addRemoteChildrenToBrowser(
                        remoteChild,
                        localChild
                    );
                }
            }
        }
    }

    private synchronize() {}
}

export default Sync;
