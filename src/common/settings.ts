import * as _ from "lodash";

import * as Types from "./types";

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

    public async get(name: string) {
        try {
            return await browser.storage.local.get(name).then(res => {
                return res[name];
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
