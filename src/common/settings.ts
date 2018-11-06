import * as _ from "lodash";

class Settings {
    error(err: Error) {
        console.error(err);
    }

    async set(name: string, data: any) {
        try {
            return await browser.storage.local.set({ [name]: data });
        } catch (err) {
            this.error(err);
            return false;
        }
    }

    async get(name: string) {
        try {
            return await browser.storage.local.get(name);
        } catch (err) {
            this.error(err);
            return false;
        }
    }

    async remove(name: string) {
        try {
            return await browser.storage.local.remove(name);
        } catch (err) {
            this.error(err);
            return false;
        }
    }

    async exists(name: string) {
        try {
            const val = await browser.storage.local.get(name);
            return !_.isEmpty(val);
        } catch (err) {
            this.error(err);
            return false;
        }
    }

    // Get all and print them out
    async debug() {
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
