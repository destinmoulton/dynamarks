import * as _ from "lodash";

import * as Types from "./types";
import { SettingDefaults } from "./constants/settings.constants";

class Settings implements Types.ISettingsClass {
    error(err: Error) {
        console.error(err);
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
            return await browser.storage.local.get(key).then(res => {
                if (_.isEmpty(res)) {
                    if (_.has(SettingDefaults, key)) {
                        return SettingDefaults[key];
                    }
                    return null;
                }
                return _.has(res, key) ? res[key] : res;
            });
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
                console.log("Settings :: debug()", data);
            });
        } catch (err) {
            this.error(err);
            return false;
        }
    }
}

export default Settings;
