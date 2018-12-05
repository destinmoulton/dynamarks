/**
 * The database stored in Dynamarks for meta data
 */
import debug from "debug";
import { cloneDeep, find, has, isObject, keys } from "lodash";
const sum = require("hash-sum");

import DocumentChanges from "../documentchanges";
import { DynalistFolders } from "../../../constants/folders.constants";
import RemoteFolders from "./remotefolders";
import Settings from "../../../../common/settings";
import { SettingKeys } from "../../../../common/constants/settings.constants";
import * as Types from "../../../../common/types";

const INITIAL_DB: Types.IDB = {
    folderMap: {},
    installations: []
};

const log = debug("kernel:db");
class DB extends Types.OOObserver {
    private db: Types.IDB = null;

    private iRemoteFolders: RemoteFolders = null;
    iSettings: Settings = null;
    dbNode: Types.IDynalistNode = null;
    currentInstallation: Types.IDBInstallation = null;

    protected subject: Types.OOSubject;
    private nodelist: Types.OONodeList;

    constructor(
        nodesubject: Types.OOSubject,
        remotefolders: RemoteFolders,
        settings: Settings
    ) {
        super();
        this.subject = nodesubject;
        this.iRemoteFolders = remotefolders;
        this.iSettings = settings;

        this.subject.registerObserver(this);
    }

    public update(nodelist: Types.OONodeList) {
        this.nodelist = nodelist;

        if (this.db === null) {
            this.setupNewDB();
        }
    }

    public async setupNewDB() {
        const dbNode = this.nodelist.getSingleByName(DynalistFolders.db);

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
            this.setCurrentInstallation(installationID);
        }

        log("setupNewDB() :: this.db", this.db);
    }

    private async mapRemoteFolders() {
        keys(DynalistFolders).forEach(folderKey => {
            const folder = this.nodelist.getSingleByName(
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
            return await this.subject.modifyData(changes);
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
            name: installData.name,
            browser: installData.browser,
            os: installData.os,
            lastSyncTime: 0,
            bookmarkMap: []
        };
        this.db.installations.push(inst);
        await this.upload();

        this.setCurrentInstallation(installationID);
        return installationID;
    }

    public setCurrentInstallation(installationID: string) {
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
