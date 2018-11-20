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

import LocalBookmarks from "./lib/localbookmarks";
import Settings from "../common/settings";

import SyncSetup from "./syncsetup";

class Kernel {
    private browserevents: BrowserEvents = null;
    private settings: Settings = null;
    private messenger: Messenger = null;
    private syncsetup: SyncSetup = null;

    constructor() {
        this.messenger = new Messenger();
        this.settings = new Settings();
        this.browserevents = new BrowserEvents();

        this.syncsetup = new SyncSetup(this.messenger, this.settings);
    }
}

// Initialize the kernel
new Kernel();
