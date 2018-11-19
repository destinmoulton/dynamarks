/**
 * The database stored in Dynamarks for meta data
 */

import { cloneDeep, find, has, isObject, keys } from "lodash";
import { DynalistFolders } from "../constants/folders.constants";

import DynalistAPI from "../../common/dynalistapi";
import DocumentChanges from "./dynalist/documentchanges";
import * as Types from "../../common/types";

interface IFolderMap {
    [folder_key: string]: string;
}

interface IInstallation {
    lastSyncTime: string;
    browserID: string;
    lastBookmarks: string;
}

interface IDynarksDB {
    folderMap: IFolderMap;
    installations: IInstallation[];
}

const INITIAL_DB: IDynarksDB = {
    folderMap: {},
    installations: []
};
class DynamarksDB {
    db: IDynarksDB = null;
    iDynalistAPI: DynalistAPI = null;
    dbNode: Types.IDynalistNode = null;

    constructor(dynalistapi: DynalistAPI) {
        this.iDynalistAPI = dynalistapi;
    }

    public setDBNode(node: Types.IDynalistNode) {
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

            return (
                has(possibleDB, "foldermap") && has(possibleDB, "installations")
            );
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
            console.error(
                "DynamarksDB :: upload() :: Error uploading db.",
                err
            );
        }
    }

    public addFolderMap(folder_key: string, node_id: string) {
        this.db.folderMap[folder_key] = node_id;
    }

    public getTopFolderMap() {
        return this.db.folderMap;
    }

    public async addInstallation(browserID: string) {
        const inst = {
            browserID,
            lastSyncTime: "",
            lastBookmarks: ""
        };
        this.db.installations.push(inst);
        return await this.upload();
    }

    public getInstallation(browserID: string) {
        return find(this.db.installations, { browserID });
    }

    public hasInstallation(browserID: string) {
        return isObject(this.getInstallation(browserID));
    }
}

export default DynamarksDB;
