import { keys, remove, values } from "lodash";

import LocalBookmarks from "./lib/localbookmarks";

import Messenger from "../common/messenger";
import Settings from "../common/settings";
import * as Types from "../common/types";
import * as MessengerActions from "../common/constants/messengeractions.constants";
import { SettingKeys } from "../common/constants/settings.constants";
import {
    BookmarkFolderKeys,
    BrowserFolderIDs
} from "./constants/folders.constants";
import RemoteBookmarks from "./lib/remotebookmarks";
import DocumentChanges from "./lib/dynalist/documentchanges";

class Sync {
    private iMessenger: Messenger = null;
    private iLocalBookmarks: LocalBookmarks = null;
    private iRemoteBookmarks: RemoteBookmarks = null;
    private iSettings: Settings = null;

    constructor(messenger: Messenger, settings: Settings) {
        this.iMessenger = messenger;
        this.iSettings = settings;

        this.iLocalBookmarks = new LocalBookmarks();
        this.iRemoteBookmarks = new RemoteBookmarks(this.iSettings);

        this.iMessenger.subscribe("settings", this.handleDispatchSettings);
        this.iMessenger.subscribe("sync", this.handleDispatchSync);

        this.prepareToAct();
    }

    private handleDispatchSettings = (packet: Types.IDispatchMessage) => {
        console.log("Sync :: handleDispatchSettings() :: packet = ", packet);
    };

    private handleDispatchSync = async (packet: Types.IDispatchMessage) => {
        await this.prepareToAct();
        switch (packet.action) {
            case MessengerActions.SYNC_OVERWRITE_SERVER:
                return await this.overwriteServer();
            case MessengerActions.SYNC_OVERWRITE_LOCAL:
                return await this.overwriteLocal();
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

    private areSettingsLoaded() {
        const prom1 = this.iSettings.exists(SettingKeys.token);
        const prom2 = this.iSettings.exists(SettingKeys.doc);

        return Promise.all([prom1, prom2]).then((exists: boolean[]) => {
            return exists.every(doesExist => {
                return doesExist;
            });
        });
    }

    private populate() {
        const prom1 = this.iRemoteBookmarks.setup();

        const prom2 = this.iLocalBookmarks.populate();

        return Promise.all([prom1, prom2]).catch(err => {
            console.error(err);
        });
    }

    private async overwriteServer() {
        console.log("Sync :: overwriteServer()");

        // Remove current children
        await this.iRemoteBookmarks.purgeTopFolderChildNodes();
    }

    private overwriteLocal() {
        this.iLocalBookmarks;
    }

    private synchronize() {}
}

export default Sync;
