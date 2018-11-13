/**
 * The database stored in Dynamarks for meta data
 */

import { cloneDeep, keys } from "lodash";
import { DynalistFolders } from "../constants/folders.constants";

import DynalistAPI from "../../common/dynalistapi";
import DocumentChanges from "./dynalist/documentchanges";
import * as Types from "../../common/types";

interface IFolderMap {
    [folder_key: string]: string;
}

interface IDynarksDB {
    folderMap: IFolderMap;
}

const INITIAL_DB: IDynarksDB = {
    folderMap: {}
};
class DynamarksDB {
    db: IDynarksDB = null;
    iDynalistAPI: DynalistAPI = null;
    dbNode: Types.IDynalistNode = null;

    constructor(dynalistapi: DynalistAPI) {
        this.iDynalistAPI = dynalistapi;
    }

    public setDB(node: Types.IDynalistNode) {
        let dbData = cloneDeep(INITIAL_DB);
        if (this.doesNodeContainDB(node)) {
            dbData = JSON.parse(node.note);
        }
        this.dbNode = node;
        this.db = dbData;
    }

    public doesNodeContainDB(dbNode: Types.IDynalistNode) {
        try {
            const possibleDB = JSON.parse(dbNode.note);
            return true;
        } catch (err) {
            return false;
        }
    }

    public async upload() {
        const changes = new DocumentChanges();
        const jsonDB = JSON.stringify(this.db);
        changes.editNode(this.dbNode.id, this.dbNode.content, jsonDB);

        try {
            return await this.iDynalistAPI.submitChanges(changes.getChanges());
        } catch (err) {
            console.error(err);
        }
    }

    public addFolderMap(folder_key: string, node_id: string) {
        this.db.folderMap[folder_key] = node_id;
    }

    public getTopFolderMap() {
        return this.db.folderMap;
    }
}

export default DynamarksDB;