/**
 * kernel.ts
 *
 * @author Destin Moulton
 * @license MIT
 *
 * To be run as a background process in the manifest.json.
 */

import * as types from "../common/types";

import BrowserEvents from "./lib/browserevents";
import Messenger from "../common/messenger";

import DynalistAPI from "../common/dynalistapi";
import LocalBookmarks from "./lib/localbookmarks";
import Settings from "../common/settings";

import Sync from "./sync";

class Kernel {
    private browserevents: BrowserEvents = null;
    private settings: Settings = null;
    private dynalistapi: DynalistAPI = null;
    private messenger: Messenger = null;
    private sync: Sync = null;

    constructor() {
        this.messenger = new Messenger();
        this.settings = new Settings();
        this.dynalistapi = new DynalistAPI(this.settings);
        this.browserevents = new BrowserEvents();

        this.sync = new Sync(this.dynalistapi, this.messenger, this.settings);
    }
}

// Initialize the kernel
new Kernel();
