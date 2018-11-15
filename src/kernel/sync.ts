import { toInteger } from "lodash";

import LocalBookmarks from "./lib/localbookmarks";

import Messenger from "../common/messenger";
import Settings from "../common/settings";
import * as Types from "../common/types";
import * as MessengerActions from "../common/constants/messengeractions.constants";
import { SettingKeys } from "../common/constants/settings.constants";
import {
    BookmarkFolderKeys,
    BrowserFolderIDs
} from "./constants/folders.constants";
import RemoteBookmarks from "./lib/remotebookmarks";
import DocumentChanges from "./lib/dynalist/documentchanges";
import { isArray } from "util";
import { has } from "immutable";

class Sync {
    private iMessenger: Messenger = null;
    private iLocalBookmarks: LocalBookmarks = null;
    private iRemoteBookmarks: RemoteBookmarks = null;
    private iSettings: Settings = null;

    constructor(messenger: Messenger, settings: Settings) {
        this.iMessenger = messenger;
        this.iSettings = settings;

        this.iLocalBookmarks = new LocalBookmarks();
        this.iRemoteBookmarks = new RemoteBookmarks(this.iSettings);

        this.iMessenger.subscribe("settings", this.handleDispatchSettings);
        this.iMessenger.subscribe("sync", this.handleDispatchSync);

        this.prepareToAct();
    }

    private handleDispatchSettings = (packet: Types.IDispatchMessage) => {
        console.log("Sync :: handleDispatchSettings() :: packet = ", packet);
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

    private areSettingsLoaded() {
        const prom1 = this.iSettings.exists(SettingKeys.token);
        const prom2 = this.iSettings.exists(SettingKeys.doc);

        return Promise.all([prom1, prom2]).then((exists: boolean[]) => {
            return exists.every(doesExist => {
                return doesExist;
            });
        });
    }

    private populate() {
        const prom1 = this.iRemoteBookmarks.setup();

        const prom2 = this.iLocalBookmarks.populate();

        return Promise.all([prom1, prom2]).catch(err => {
            console.error(err);
        });
    }

    private async overwriteServer() {
        // Remove current children
        await this.iRemoteBookmarks.purgeTopFolderChildNodes();

        for (let key of BookmarkFolderKeys) {
            const topLocalFolder = this.iLocalBookmarks.getSingleById(
                BrowserFolderIDs[key]
            );

            const remoteFolder = this.iRemoteBookmarks.getTopFolderByKey(key);
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

            const remoteFolder = this.iRemoteBookmarks.getTopFolderByKey(key);
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
