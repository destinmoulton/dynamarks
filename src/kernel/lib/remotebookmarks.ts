import { keys, remove, values } from "lodash";

import { DynalistFolders } from "../constants/folders.constants";
import DocumentChanges from "./dynalist/documentchanges";
import DynalistAPI from "../../common/dynalistapi";
import DynamarksDB from "./dynamarksdb";
import * as Types from "../../common/types";

class RemoteBookmarks {
    bookmarks: Types.IDynalistNode[];
    iDynalistAPI: DynalistAPI = null;

    constructor(dynalistapi: DynalistAPI) {
        this.iDynalistAPI = dynalistapi;
    }

    public async populate() {
        try {
            this.bookmarks = await this.iDynalistAPI.getBookmarks();
        } catch (err) {
            console.error(
                "RemoteBookmarks :: populate() :: Error getting the bookmarks."
            );
        }
    }

    private async syncDynamarksFolders() {
        const foldersToCreate = values(DynalistFolders);
        keys(DynalistFolders).forEach(folderKey => {
            const folderName = DynalistFolders[folderKey];
            this.bookmarks.forEach((node: Types.IDynalistNode) => {
                if (node.content === folderName) {
                    remove(foldersToCreate, val => val === folderName);
                }
            });
        });

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
