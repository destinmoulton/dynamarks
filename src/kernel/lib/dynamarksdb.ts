/**
 * The database stored in Dynamarks for meta data
 */

import { cloneDeep, find, has, isObject, keys } from "lodash";
import { DynalistFolders } from "../constants/folders.constants";
import { BrowserID } from "../../common/constants/settings.constants";

import DynalistAPI from "../../common/dynalistapi";
import DocumentChanges from "./dynalist/documentchanges";
import * as Types from "../../common/types";

interface IFolderMap {
    [folder_key: string]: string;
}

interface IInstallation {
    browserID: string;
    lastBookmarks: string;
    lastSyncTime: number;
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
    currentInstallation: IInstallation = null;

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

        if (!this.hasInstallation(BrowserID)) {
            this.addInstallation(BrowserID);
        }
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

    // Map the dynalist nodes to the folders
    public addFolderMap(folder_key: string, node_id: string) {
        this.db.folderMap[folder_key] = node_id;
    }

    public getMappedFolderByKey(key: string) {
        return this.db.folderMap[key];
    }

    private async addInstallation(browserID: string) {
        const inst = {
            browserID,
            lastSyncTime: 0,
            lastBookmarks: ""
        };
        this.db.installations.push(inst);
        return await this.upload();
    }

    private getInstallation(browserID: string): IInstallation {
        return find(this.db.installations, { browserID });
    }

    private hasInstallation(browserID: string) {
        return isObject(this.getInstallation(browserID));
    }

    public updateSync(newBookmarks: Types.ILocalBookmark[]) {
        const inst: IInstallation = this.getInstallation(BrowserID);
        inst.lastBookmarks = JSON.stringify(newBookmarks);
        inst.lastSyncTime = Date.now();
        console.log(this.db.installations);
    }
}

export default DynamarksDB;
