import { find, isArray, keys, remove, reverse, values } from "lodash";

import {
    BookmarkFolderKeys,
    DynalistFolders
} from "../constants/folders.constants";
import DocumentChanges from "./dynalist/documentchanges";
import DynalistAPI from "../../common/dynalistapi";
import DynamarksDB from "./dynamarksdb";
import Settings from "../../common/settings";
import * as Types from "../../common/types";

interface ITopFoldersMap {
    [key: string]: Types.IDynalistNode;
}

class RemoteBookmarks {
    private bookmarks: Types.IDynalistNode[];
    private topFoldersMap: ITopFoldersMap = {};
    private iDynalistAPI: DynalistAPI = null;
    private iDynamarksDB: DynamarksDB = null;
    private iSettings: Settings = null;

    constructor(settings: Settings) {
        this.iSettings = settings;
        this.iDynalistAPI = new DynalistAPI(this.iSettings);
        this.iDynamarksDB = new DynamarksDB(this.iDynalistAPI);
    }

    public async setup() {
        try {
            await this.populateBookmarks();

            const { doFoldersExist, foldersToCreate } = this.checkTopFolders();
            if (!doFoldersExist) {
                await this.createTopFolders(foldersToCreate);
                await this.setup();
            } else {
                const dbNode = this.getSingleByName(DynalistFolders.db);
                // Verify/instantiate the database
                const isDB = this.iDynamarksDB.doesNodeContainDB(dbNode);

                this.iDynamarksDB.setDB(dbNode);
                if (!isDB) {
                    // The folder ids have not been mapped yet
                    this.createDBTopFolders();
                    await this.iDynamarksDB.upload();
                }

                this.mapTopFoldersFromDB();
            }
        } catch (err) {
            console.error(
                "RemoteBookmarks :: populate() :: Error populating the bookmarks.",
                err
            );
        }
    }

    public async populateBookmarks() {
        this.bookmarks = await this.iDynalistAPI.getBookmarks();
        console.log(
            "RemoteBookmarks :: populateBookmarks() :: bookmarks",
            this.bookmarks
        );
    }

    private mapTopFoldersFromDB() {
        const dbMap = this.iDynamarksDB.getTopFolderMap();
        keys(DynalistFolders).forEach(folderKey => {
            this.topFoldersMap[folderKey] = this.getSingleById(
                dbMap[folderKey]
            );
        });
        console.log(this.topFoldersMap);
    }

    private createDBTopFolders() {
        keys(DynalistFolders).forEach(folderKey => {
            const folder = this.getSingleByName(DynalistFolders[folderKey]);
            this.iDynamarksDB.addFolderMap(folderKey, folder.id);
        });
    }

    private getSingleByName(name: string): Types.IDynalistNode {
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

    public getTopFolderByKey(folderKey: string) {
        return this.topFoldersMap[folderKey];
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

    // Remove all the nodes from the top folders
    public purgeTopFolderChildNodes() {
        const promixes = BookmarkFolderKeys.map(async key => {
            const changes = new DocumentChanges();
            const topFolder = this.getTopFolderByKey(key);
            await this.removeChildrenRecursively(topFolder.id, changes);
            return this.iDynalistAPI.submitChanges(changes.getChanges());
        });
        return Promise.all(promixes).then(() => {
            return this.populateBookmarks();
        });
    }

    public addChildren(parent_id: string, children: Types.ILocalBookmark[]) {
        const changes = new DocumentChanges();
        children.forEach((child: Types.ILocalBookmark) => {
            changes.addNode(parent_id, child.title, child.url);
        });
        return this.iDynalistAPI.submitChanges(changes.getChanges());
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
            const documentChanges = new DocumentChanges();

            foldersToCreate.forEach(folder => {
                documentChanges.addNode("root", folder);
            });
            console.log(
                "Sync :: syncDynamarksFolders foldersToCreate",
                foldersToCreate
            );
            return await this.iDynalistAPI.submitChanges(
                documentChanges.getChanges()
            );
        }
        return true;
    }
}

export default RemoteBookmarks;
