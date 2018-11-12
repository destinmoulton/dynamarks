import { find, keys, remove, reverse, values } from "lodash";

import { DynalistFolders } from "../constants/folders.constants";
import DocumentChanges from "./dynalist/documentchanges";
import DynalistAPI from "../../common/dynalistapi";
import DynamarksDB from "./dynamarksdb";
import Settings from "../../common/settings";
import * as Types from "../../common/types";

interface ITopFoldersMap {
    [key: string]: Types.IDynalistNode;
}

class RemoteBookmarks {
    bookmarks: Types.IDynalistNode[];
    topFoldersMap: ITopFoldersMap = {};
    iDynalistAPI: DynalistAPI = null;
    iDynamarksDB: DynamarksDB = null;
    iSettings: Settings = null;

    constructor(settings: Settings) {
        this.iSettings = settings;
        this.iDynalistAPI = new DynalistAPI(this.iSettings);
        this.iDynamarksDB = new DynamarksDB(this.iDynalistAPI);
    }

    public async populate() {
        try {
            this.bookmarks = await this.iDynalistAPI.getBookmarks();
            const { doFoldersExist, foldersToCreate } = this.checkTopFolders();
            if (!doFoldersExist) {
                await this.createTopFolders(foldersToCreate);
                await this.populate();
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

    private getSingleById(id: string): Types.IDynalistNode {
        return find(this.bookmarks, { id });
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

            reverse(foldersToCreate).forEach(folder => {
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
