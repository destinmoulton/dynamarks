import { keys, remove, values } from "lodash";

import LocalBookmarks from "./lib/localbookmarks";

import Messenger from "../common/messenger";
import Settings from "../common/settings";
import * as Types from "../common/types";

import { SettingKeys } from "../common/constants/settings.constants";
import RemoteBookmarks from "./lib/remotebookmarks";

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

        this.synchronize();
    }

    private handleDispatchSettings = (packet: Types.IDispatchMessage) => {
        console.log("Sync :: handleDispatchSettings() :: packet = ", packet);
    };

    private synchronize() {
        return this.canSynchronize().then(canSync => {
            if (canSync) {
                return this.populate().then(() => {});
            }
        });
    }

    private canSynchronize() {
        const prom1 = this.iSettings.exists(SettingKeys.token);
        const prom2 = this.iSettings.exists(SettingKeys.doc);

        return Promise.all([prom1, prom2]).then((exists: boolean[]) => {
            return exists.every(doesExist => {
                return doesExist;
            });
        });
    }

    private populate() {
        const prom1 = this.iRemoteBookmarks.populate();

        const prom2 = this.iLocalBookmarks.populate();

        return Promise.all([prom1, prom2]).catch(err => {
            console.error(err);
        });
    }
}

export default Sync;
