import debug from "debug";
import * as _ from "lodash";

import * as Types from "./types";

import { has } from "immutable";

const log = debug("common:settings");
class Settings {
    error(err: Error) {
        log("ERROR", err);
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

    // Clear all the settings in storage.local
    public async clearAll() {
        try {
            return await browser.storage.local.clear();
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
