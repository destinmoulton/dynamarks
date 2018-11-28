/**
 * The database stored in Dynamarks for meta data
 */
import debug from "debug";
import { cloneDeep, find, has, isObject, keys } from "lodash";
const sum = require("hash-sum");

import DocumentChanges from "../dynalist/documentchanges";
import DynalistAPI from "../../../common/dynalistapi";
import { DynalistFolders } from "../../constants/folders.constants";
import RemoteBookmarks from "../remotebookmarks";
import Settings from "../../../common/settings";
import { SettingKeys } from "../../../common/constants/settings.constants";
import * as Types from "../../../common/types";

const INITIAL_DB: Types.IDB = {
    folderMap: {},
    installations: []
};

const log = debug("kernel:DB");

class DB {
    private db: Types.IDB = null;
    private iDynalistAPI: DynalistAPI = null;
    private iRemoteBookmarks: RemoteBookmarks = null;
    iSettings: Settings = null;
    dbNode: Types.IDynalistNode = null;
    currentInstallation: Types.IDBInstallation = null;

    constructor(
        dynalistapi: DynalistAPI,
        remotebookmarks: RemoteBookmarks,
        settings: Settings
    ) {
        this.iDynalistAPI = dynalistapi;
        this.iRemoteBookmarks = remotebookmarks;
        this.iSettings = settings;
    }

    public async setup() {
        const dbNode = this.iRemoteBookmarks.getSingleByName(
            DynalistFolders.db
        );

        // Verify/instantiate the database

        const isNodeDB = this.doesNodeContainDB(dbNode);
        let dbData = cloneDeep(INITIAL_DB);
        if (isNodeDB) {
            dbData = JSON.parse(dbNode.note);
        }
        this.dbNode = dbNode;
        this.db = dbData;

        if (!isNodeDB) {
            await this.mapRemoteFolders();
        }

        const installationID: any = await this.iSettings.get(
            SettingKeys.installationID
        );
        if (!this.hasInstallation(installationID)) {
            // Need to setup a new/fresh installation
            await this.iSettings.remove(SettingKeys.installationID);
        } else {
            this.currentInstallation = this.getInstallation(installationID);
        }

        log("setup() :: this.db", this.db);
    }

    private async mapRemoteFolders() {
        keys(DynalistFolders).forEach(folderKey => {
            const folder = this.iRemoteBookmarks.getSingleByName(
                DynalistFolders[folderKey]
            );

            this.addFolderMap(folderKey, folder.id);
        });
        await this.upload();
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

    public async addInstallation(installData: {
        browser: string;
        name: string;
        os: string;
    }) {
        // Generate an installationID
        const installationID = sum(Date.now());
        await this.iSettings.set(SettingKeys.installationID, installationID);

        const inst: Types.IDBInstallation = {
            id: installationID,
            name: "",
            browser: "",
            os: "",
            lastSyncTime: 0,
            bookmarkMap: []
        };
        this.db.installations.push(inst);
        await this.upload();

        this.currentInstallation = this.getInstallation(installationID);
    }

    private getInstallation(installationID: string): Types.IDBInstallation {
        return find(this.db.installations, { id: installationID });
    }

    public getAllInstallations() {
        return this.db.installations;
    }

    private hasInstallation(installationID: string) {
        const possibleInstallation = this.getInstallation(installationID);
        return isObject(possibleInstallation);
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

export default DB;
