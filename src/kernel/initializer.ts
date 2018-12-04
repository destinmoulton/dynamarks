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
import DBEvents from "./lib/events/dbevents";
import { DynalistFolders } from "./constants/folders.constants";
import DynalistAPI from "../common/dynalistapi";
import DB from "./lib/dynalist/observers/db";
import LocalBookmarks from "./lib/localbookmarks";
import Messenger from "../common/messenger";
import NodeSubject from "./lib/dynalist/nodesubject";
import RemoteFolders from "./lib/dynalist/observers/remotefolders";
import Settings from "../common/settings";
import { SettingKeys } from "../common/constants/settings.constants";
import Sync from "./lib/dynalist/observers/sync";
import SyncEvents from "./lib/events/syncevents";
import SyncOverwrite from "./lib/dynalist/observers/syncoverwrite";

const log = debug("kernel:syncsetup");
class Initializer {
    private iBrowserEvents: BrowserEvents = null;
    private iDBEvents: DBEvents = null;
    private iDynalistAPI: DynalistAPI = null;
    private iDB: DB = null;
    private iMessenger: Messenger = null;
    private iLocalBookmarks: LocalBookmarks = null;
    private iNodeSubject: NodeSubject = null;
    private iRemoteFolders: RemoteFolders = null;
    private iSettings: Settings = null;
    private iSync: Sync = null;
    private iSyncEvents: SyncEvents = null;
    private iSyncOverwrite: SyncOverwrite = null;

    constructor() {
        this.iMessenger = new Messenger();

        this.iBrowserEvents = new BrowserEvents();

        // The order of the following is IMPORTANT
        this.iSettings = new Settings();

        this.iDynalistAPI = new DynalistAPI(this.iSettings);

        this.iLocalBookmarks = new LocalBookmarks();

        this.initializeSubjectAndObservers();
        this.initializeEvents();

        this.prepareToAct();
    }

    private initializeSubjectAndObservers() {
        this.iNodeSubject = new NodeSubject(this.iDynalistAPI);

        this.iDB = new DB(
            this.iNodeSubject,
            this.iRemoteFolders,
            this.iSettings
        );

        this.iRemoteFolders = new RemoteFolders(this.iNodeSubject, this.iDB);

        this.iSync = new Sync(
            this.iNodeSubject,
            this.iDB,
            this.iLocalBookmarks,
            this.iRemoteFolders
        );

        this.iSyncOverwrite = new SyncOverwrite(
            this.iNodeSubject,
            this.iDB,
            this.iLocalBookmarks
        );
    }

    private initializeEvents() {
        this.iDBEvents = new DBEvents(this.iDB, this.iMessenger);

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
        await this.iRemoteFolders.setup();

        await this.iLocalBookmarks.populate();
        await this.iDB.setup();
    }
}

export default Initializer;
