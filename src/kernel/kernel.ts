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
import LocalBookmarks from "./lib/localbookmarks";
import Dispatcher from "../common/dispatcher";
import Status from "./status";

class Kernel {
    localbookmarks: LocalBookmarks = null;
    dispatcher: Dispatcher = null;
    messenger: ClientMessenger = null;
    status: Status = null;

    constructor() {
        this.localbookmarks = new LocalBookmarks();
        this.dispatcher = new Dispatcher();
        this.messenger = new ClientMessenger(this.dispatcher);
        this.status = new Status(this.dispatcher, this.messenger);
    }
}

// Initialize the kernel
new Kernel();
