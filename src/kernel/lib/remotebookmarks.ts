import { find, isArray, isObject, keys, remove, values } from "lodash";

import {
    BookmarkFolderKeys,
    DynalistFolders
} from "../constants/folders.constants";
import DocumentChanges from "./dynalist/documentchanges";
import DynalistAPI from "../../common/dynalistapi";
import DynamarksDB from "./dynamarksdb";
import Settings from "../../common/settings";
import * as Types from "../../common/types";
import {
    BrowserID,
    SettingKeys
} from "../../common/constants/settings.constants";

class RemoteBookmarks {
    private bookmarks: Types.IDynalistNode[];
    private iDynalistAPI: DynalistAPI = null;
    private iDynamarksDB: DynamarksDB = null;
    private iSettings: Settings = null;

    constructor(
        dynalistapi: DynalistAPI,
        dynamarksdb: DynamarksDB,
        settings: Settings
    ) {
        this.iDynalistAPI = dynalistapi;
        this.iDynamarksDB = dynamarksdb;
        this.iSettings = settings;
    }

    public async setup() {
        try {
            await this.populateBookmarks();

            const { doFoldersExist, foldersToCreate } = this.checkTopFolders();
            if (!doFoldersExist) {
                await this.createTopFolders(foldersToCreate);

                // Re-run the this method after the top folders are created
                await this.setup();
            }
            return true;
        } catch (err) {
            console.error(
                "RemoteBookmarks :: setup() :: Error setting up RemoteBookmarks.",
                err
            );
        }
    }

    public async populateBookmarks() {
        try {
            this.bookmarks = await this.iDynalistAPI.getBookmarks();
            console.log(
                "RemoteBookmarks :: populateBookmarks() :: bookmarks",
                this.bookmarks
            );
        } catch (err) {
            console.error(
                "RemoteBookmarks :: populateBookmarks() :: Error getting the bookmarks.",
                err
            );
        }
    }

    public getSingleByName(name: string): Types.IDynalistNode {
        return find(this.bookmarks, { content: name });
    }

    public getSingleById(id: string): Types.IDynalistNode {
        return find(this.bookmarks, { id });
    }

    public getChildIdByIndex(parent_id: string, child_index: number) {
        console.log(
            "RemoteBookmarks :: getChildIdByIndex() parent_id,child_index = ",
            parent_id,
            child_index
        );
        const parent = this.getSingleById(parent_id);
        if (isArray(parent.children) && parent.children.length > 0) {
            return parent.children[child_index];
        }
        return "";
    }

    public getChildren(parent_node_id: string) {
        const node = this.getSingleById(parent_node_id);
        return node.children instanceof Array && node.children.length > 0
            ? node.children
            : [];
    }

    // Remove all the nodes from the top folders
    public async purgeTopFolderChildNodes() {
        for (let key of BookmarkFolderKeys) {
            const changes = new DocumentChanges();
            const topFolderID = this.iDynamarksDB.getMappedFolderByKey(key);
            const topFolder = this.getSingleById(topFolderID);
            this.removeChildrenRecursively(topFolder.id, changes);
            await this.iDynalistAPI.submitChanges(changes);
        }
        await this.populateBookmarks();
    }

    public removeChildrenRecursively(
        parent_id: string,
        changes: DocumentChanges
    ) {
        const childIds = this.getChildren(parent_id);
        if (childIds.length > 0) {
            childIds.forEach((childId: string) => {
                const child = this.getSingleById(childId);
                changes.deleteNode(childId);
                if (isArray(child.children) && child.children.length > 0) {
                    return this.removeChildrenRecursively(child.id, changes);
                }
            });
        }
        return true;
    }

    public addChildren(parent_id: string, children: Types.ILocalBookmark[]) {
        const changes = new DocumentChanges();
        children.forEach((child: Types.ILocalBookmark) => {
            changes.addNode(parent_id, child.title, child.url);
        });
        return this.iDynalistAPI.submitChanges(changes);
    }

    private checkTopFolders() {
        const foldersToCreate = values(DynalistFolders);
        keys(DynalistFolders).forEach(folderKey => {
            const folderName = DynalistFolders[folderKey];
            this.bookmarks.forEach((node: Types.IDynalistNode) => {
                if (node.content === folderName) {
                    remove(foldersToCreate, val => val === folderName);
                }
            });
        });

        return {
            doFoldersExist: foldersToCreate.length === 0,
            foldersToCreate
        };
    }

    private async createTopFolders(foldersToCreate: string[]) {
        if (foldersToCreate.length > 0) {
            const changes = new DocumentChanges();

            foldersToCreate.forEach(folder => {
                changes.addNode("root", folder);
            });
            console.log(
                "Sync :: syncDynamarksFolders foldersToCreate",
                foldersToCreate
            );
            return await this.iDynalistAPI.submitChanges(changes);
        }
        return true;
    }
}

export default RemoteBookmarks;
