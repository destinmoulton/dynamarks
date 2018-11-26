import debug from "debug";
import * as _ from "lodash";
import sum from "hash-sum";

import * as Types from "./types";
import { SettingKeys } from "./constants/settings.constants";
import { has } from "immutable";

const log = debug("common:settings");
class Settings {
    error(err: Error) {
        log("ERROR", err);
    }

    public async initialize() {
        const hasBrowserId = await this.exists(SettingKeys.browserId);
        if (!hasBrowserId) {
            // Create a browser id
            await this.set(SettingKeys.browserId, sum(Date.now()));
        }
    }

    public async set(name: string, data: any) {
        try {
            return await browser.storage.local.set({ [name]: data });
        } catch (err) {
            this.error(err);
            return false;
        }
    }

    public async get(key: string) {
        try {
            const res = await browser.storage.local.get(key);
            return has(res, key) ? res[key] : res;
        } catch (err) {
            this.error(err);
            return false;
        }
    }

    public async remove(name: string) {
        try {
            return await browser.storage.local.remove(name);
        } catch (err) {
            this.error(err);
            return false;
        }
    }

    public async exists(name: string) {
        try {
            const val = await browser.storage.local.get(name);
            return !_.isEmpty(val);
        } catch (err) {
            this.error(err);
            return false;
        }
    }

    // Get all and print them out
    public async debug() {
        try {
            return await browser.storage.local.get(null).then((data: any) => {
                log("debug()", data);
            });
        } catch (err) {
            this.error(err);
            return false;
        }
    }
}

export default Settings;
