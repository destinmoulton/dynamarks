import debug from "debug";
import { keys } from "lodash";

import { DynalistFolders } from "./constants/folders.constants";
import DynalistAPI from "../common/dynalistapi";
import DynamarksDB from "./lib/dynamarksdb";
import LocalBookmarks from "./lib/localbookmarks";
import Messenger from "../common/messenger";
import * as MessengerActions from "../common/constants/messengeractions.constants";
import Settings from "../common/settings";
import { SettingKeys } from "../common/constants/settings.constants";
import SyncOverwrite from "./lib/syncoverwrite";
import * as Types from "../common/types";

import RemoteBookmarks from "./lib/remotebookmarks";

const log = debug("kernel:syncsetup");
class SyncSetup {
    private iDynalistAPI: DynalistAPI = null;
    private iDynamarksDB: DynamarksDB = null;
    private iMessenger: Messenger = null;
    private iLocalBookmarks: LocalBookmarks = null;
    private iRemoteBookmarks: RemoteBookmarks = null;
    private iSettings: Settings = null;
    private iSyncOverwrite: SyncOverwrite = null;

    constructor(messenger: Messenger, settings: Settings) {
        this.iMessenger = messenger;
        this.iSettings = settings;

        this.iDynalistAPI = new DynalistAPI(this.iSettings);
        this.iDynamarksDB = new DynamarksDB(this.iDynalistAPI, this.iSettings);
        this.iLocalBookmarks = new LocalBookmarks();
        this.iRemoteBookmarks = new RemoteBookmarks(
            this.iDynalistAPI,
            this.iDynamarksDB,
            this.iSettings
        );
        this.iSyncOverwrite = new SyncOverwrite(
            this.iDynamarksDB,
            this.iLocalBookmarks,
            this.iRemoteBookmarks
        );

        this.iMessenger.subscribe("settings", this.handleDispatchSettings);
        this.iMessenger.subscribe("sync", this.handleDispatchSync);

        this.prepareToAct();
    }

    private handleDispatchSettings = async (packet: Types.IDispatchMessage) => {
        switch (packet.action) {
            case MessengerActions.SETTINGS_CHANGE:
                return await this.prepareToAct();
            default:
                return;
        }
    };

    private handleDispatchSync = async (packet: Types.IDispatchMessage) => {
        await this.prepareToAct();
        switch (packet.action) {
            case MessengerActions.SYNC_OVERWRITE_SERVER:
                return await this.iSyncOverwrite.overwriteServer();
            case MessengerActions.SYNC_OVERWRITE_LOCAL:
                return await this.iSyncOverwrite.overwriteLocal();
            case MessengerActions.SYNC_SYNCHRONIZE:
                return await this.synchronize();
            default:
                return;
        }
    };

    private prepareToAct() {
        return this.areSettingsLoaded().then(canSync => {
            if (canSync) {
                return this.populate();
            }
        });
    }

    private async areSettingsLoaded() {
        const existsToken = await this.iSettings.exists(SettingKeys.token);
        const existsDoc = await this.iSettings.exists(SettingKeys.doc);
        return existsToken && existsDoc;
    }

    private async populate() {
        await this.iRemoteBookmarks.setup();

        await this.iLocalBookmarks.populate();
        await this.setupDB();
    }

    private async setupDB() {
        const dbNode = this.iRemoteBookmarks.getSingleByName(
            DynalistFolders.db
        );
        // Verify/instantiate the database
        const isDB = this.iDynamarksDB.doesNodeContainDB(dbNode);

        await this.iDynamarksDB.setupDB(dbNode);
        if (!isDB) {
            log("setupDB() isDB = false");
            await this.mapRemoteFoldersToDB();
        }
    }

    private async mapRemoteFoldersToDB() {
        keys(DynalistFolders).forEach(folderKey => {
            const folder = this.iRemoteBookmarks.getSingleByName(
                DynalistFolders[folderKey]
            );

            this.iDynamarksDB.addFolderMap(folderKey, folder.id);
        });
        await this.iDynamarksDB.upload();
    }

    private synchronize() {}
}

export default SyncSetup;
