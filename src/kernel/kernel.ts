/**
 * kernel.ts
 *
 * @author Destin Moulton
 * @license MIT
 *
 * To be run as a background process in the manifest.json.
 */

import Initializer from "./initializer";

class Kernel {
    private initializer: Initializer = null;

    constructor() {
        this.initializer = new Initializer();
    }
}

// Initialize the kernel
new Kernel();
