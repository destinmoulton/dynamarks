/**
 * kernel.ts
 *
 * @author Destin Moulton
 * @license MIT
 *
 * To be run as a background process in the manifest.json.
 */
import { has } from "lodash";

import LocalBookmarks from "./lib/localbookmarks";
import bookmarkids from "./constants/bookmarkids";
class IKernel {
    channel: any;
    localbookmarks: LocalBookmarks;
}

class Kernel extends IKernel {
    constructor() {
        super();
        this.localbookmarks = new LocalBookmarks();

        this.localbookmarks.pluckById(bookmarkids.menu).then(bkmks => {
            console.log("bkmks", bkmks);
        });
    }
}

// Initialize the kernel
new Kernel();
