/**
 * kernel.ts
 *
 * @author Destin Moulton
 * @license MIT
 *
 * To be run as a background process in the manifest.json.
 */

import * as types from "../common/types";

import ClientMessenger from "./lib/clientmessenger";
import Dispatcher from "../common/dispatcher";
import DynalistAPI from "../common/dynalistapi";
import LocalBookmarks from "./lib/localbookmarks";
import Settings from "../common/settings";
import Status from "./status";
import Sync from "./sync";

class Kernel {
    private localbookmarks: LocalBookmarks = null;
    private dispatcher: Dispatcher = null;
    private settings: Settings = null;
    private dynalistapi: DynalistAPI = null;
    private messenger: ClientMessenger = null;
    private status: Status = null;

    constructor() {
        this.localbookmarks = new LocalBookmarks();
        this.dispatcher = new Dispatcher();
        this.messenger = new ClientMessenger(this.dispatcher);
        this.status = new Status(this.dispatcher, this.messenger);
        this.settings = new Settings();
        this.dynalistapi = new DynalistAPI(this.settings);
    }
}

// Initialize the kernel
new Kernel();
