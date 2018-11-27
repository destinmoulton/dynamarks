/**
 * The database stored in Dynamarks for meta data
 */
import debug from "debug";
import { cloneDeep, find, has, isObject, keys } from "lodash";

import { SettingKeys } from "../../common/constants/settings.constants";
import DynalistAPI from "../../common/dynalistapi";
import DocumentChanges from "./dynalist/documentchanges";
import Settings from "../../common/settings";
import * as Types from "../../common/types";

const INITIAL_DB: Types.IDB = {
    folderMap: {},
    installations: []
};

const log = debug("kernel:dynamarksdb");

class DynamarksDB {
    db: Types.IDB = null;
    iDynalistAPI: DynalistAPI = null;
    iSettings: Settings = null;
    dbNode: Types.IDynalistNode = null;
    currentInstallation: Types.IDBInstallation = null;

    constructor(dynalistapi: DynalistAPI, settings: Settings) {
        this.iDynalistAPI = dynalistapi;
        this.iSettings = settings;
    }

    public async setupDB(node: Types.IDynalistNode) {
        let dbData = cloneDeep(INITIAL_DB);
        if (this.doesNodeContainDB(node)) {
            dbData = JSON.parse(node.note);
        }
        this.dbNode = node;
        this.db = dbData;

        const browserID: any = await this.iSettings.get(SettingKeys.browserID);
        if (!this.hasInstallation(browserID)) {
            await this.addInstallation(browserID);
        }
        this.currentInstallation = this.getInstallation(browserID);
        log("setupDB() :: this.db", this.db);
    }

    public doesNodeContainDB(dbNode: Types.IDynalistNode) {
        try {
            const possibleDB = JSON.parse(dbNode.note);

            return (
                has(possibleDB, "folderMap") && has(possibleDB, "installations")
            );
        } catch (err) {
            return false;
        }
    }

    public async upload() {
        const changes = new DocumentChanges();
        const jsonDB = JSON.stringify(this.db);
        changes.editNode(this.dbNode.id, this.dbNode.content, jsonDB);
        log("upload()", this.db);
        try {
            return await this.iDynalistAPI.submitChanges(changes);
        } catch (err) {
            log("ERROR :: upload() :: Error uploading db.", err);
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
        const inst: Types.IDBInstallation = {
            browserID,
            lastSyncTime: 0,
            bookmarkMap: []
        };
        this.db.installations.push(inst);
        return await this.upload();
    }

    private getInstallation(browserID: string): Types.IDBInstallation {
        return find(this.db.installations, { browserID });
    }

    private hasInstallation(browserID: string) {
        return isObject(this.getInstallation(browserID));
    }

    public clearBookmarkMap() {
        this.currentInstallation.bookmarkMap = [];
    }

    public addBookmarkMap(browserBookmarkId: string, dynalistNodeId: string) {
        const newMap: Types.IDBBookmarkMap = {
            mapId: browserBookmarkId + dynalistNodeId,
            browserBookmarkId,
            dynalistNodeId,
            children: []
        };

        this.currentInstallation.bookmarkMap.push(newMap);
    }

    public addBookmarkMapChild(
        parentBrowserBookmarkId: string,
        parentDynalistNodeId: string,
        childBrowserBookmarkId: string,
        childDynalistNodeId: string
    ) {
        const mapping = find(this.currentInstallation.bookmarkMap, {
            browserBookmarkId: parentBrowserBookmarkId,
            dynalistNodeId: parentDynalistNodeId
        });
        mapping.children.push({
            browserBookmarkId: childBrowserBookmarkId,
            dynalistNodeId: childDynalistNodeId
        });
    }
}

export default DynamarksDB;
