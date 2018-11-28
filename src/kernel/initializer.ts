/**
 * Initializes all of the classes and begins
 * setting up and synchronizing.
 *
 * @author Destin Moulton
 *
 */
import debug from "debug";
import { keys } from "lodash";

import BrowserEvents from "./lib/browserevents";
import DBEvents from "./lib/db/dbevents";
import { DynalistFolders } from "./constants/folders.constants";
import DynalistAPI from "../common/dynalistapi";
import DB from "./lib/db/db";
import LocalBookmarks from "./lib/localbookmarks";
import Messenger from "../common/messenger";
import RemoteBookmarks from "./lib/remotebookmarks";
import Settings from "../common/settings";
import { SettingKeys } from "../common/constants/settings.constants";
import Sync from "./lib/sync/sync";
import SyncEvents from "./lib/sync/syncevents";
import SyncOverwrite from "./lib/sync/syncoverwrite";

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

        this.iBrowserEvents = new BrowserEvents();

        // The order of the following is IMPORTANT
        this.iSettings = new Settings();
        this.iSettings.initialize();
        this.iDynalistAPI = new DynalistAPI(this.iSettings);

        this.initializeDB();
        this.initializeBookmarks();
        this.initializeSync();

        this.prepareToAct();
    }

    private initializeDB() {
        this.iDB = new DB(
            this.iDynalistAPI,
            this.iRemoteBookmarks,
            this.iSettings
        );

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
        await this.iDB.setup();
    }
}

export default Initializer;
