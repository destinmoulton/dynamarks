import debug from "debug";
import { keys } from "lodash";

import BrowserEvents from "./lib/browserevents";
import DBEvents from "./lib/db/dbevents";
import { DynalistFolders } from "./constants/folders.constants";
import DynalistAPI from "../common/dynalistapi";
import DB from "./lib/db/db";
import LocalBookmarks from "./lib/localbookmarks";
import Messenger from "../common/messenger";
import * as MessengerActions from "../common/constants/messengeractions.constants";
import RemoteBookmarks from "./lib/remotebookmarks";
import Settings from "../common/settings";
import { SettingKeys } from "../common/constants/settings.constants";
import Sync from "./lib/sync/sync";
import SyncEvents from "./lib/sync/syncevents";
import SyncOverwrite from "./lib/sync/syncoverwrite";
import * as Types from "../common/types";

const log = debug("kernel:syncsetup");
class Initializer {
    private iBrowserEvents: BrowserEvents = null;
    private iDBEvents: DBEvents = null;
    private iDynalistAPI: DynalistAPI = null;
    private iDB: DB = null;
    private iMessenger: Messenger = null;
    private iLocalBookmarks: LocalBookmarks = null;
    private iRemoteBookmarks: RemoteBookmarks = null;
    private iSettings: Settings = null;
    private iSync: Sync = null;
    private iSyncEvents: SyncEvents = null;
    private iSyncOverwrite: SyncOverwrite = null;

    constructor() {
        this.iMessenger = new Messenger();
        this.iSettings = new Settings();
        this.iSettings.initialize();
        this.iBrowserEvents = new BrowserEvents();

        this.iDynalistAPI = new DynalistAPI(this.iSettings);

        // The order of initialization is IMPORTANT
        this.initializeDB();
        this.initializeBookmarks();
        this.initializeSync();

        this.prepareToAct();
    }

    private initializeDB() {
        this.iDB = new DB(this.iDynalistAPI, this.iSettings);

        this.iDBEvents = new DBEvents(this.iDB, this.iMessenger);
    }

    private initializeBookmarks() {
        this.iLocalBookmarks = new LocalBookmarks();
        this.iRemoteBookmarks = new RemoteBookmarks(
            this.iDynalistAPI,
            this.iDB,
            this.iSettings
        );
    }

    private initializeSync() {
        this.iSync = new Sync(
            this.iDB,
            this.iLocalBookmarks,
            this.iRemoteBookmarks
        );

        this.iSyncOverwrite = new SyncOverwrite(
            this.iDB,
            this.iLocalBookmarks,
            this.iRemoteBookmarks
        );

        this.iSyncEvents = new SyncEvents(
            this.iMessenger,
            this.iSync,
            this.iSyncOverwrite
        );
    }

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
        const isDB = this.iDB.doesNodeContainDB(dbNode);

        await this.iDB.setupDB(dbNode);
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

            this.iDB.addFolderMap(folderKey, folder.id);
        });
        await this.iDB.upload();
    }
}

export default Initializer;
