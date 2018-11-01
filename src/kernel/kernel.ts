/**
 * kernel.ts
 *
 * @author Destin Moulton
 * @license MIT
 *
 * To be run as a background process in the manifest.json.
 */
import { has } from "lodash";
class IKernel {
    channel: any;
}

class Kernel extends IKernel {
    constructor() {
        super();
        this.channel = null;

        this.initializeEvents();
    }

    initializeEvents() {
        browser.runtime.onConnect.addListener(this.listenForMessages);
        browser.runtime.onMessage.addListener(this.handleMessage);
    }

    handleMessage = (msg: any) => {
        console.log(msg);
        this.channel.postMessage({ response: "TEST RESPONSE" });
    };

    listenForMessages = (port: any) => {
        if (port.name !== "dynamarks") return;

        this.channel = port;
        this.channel.onMessage.addListener((msg: any) => {
            this.handleMessage(msg);
        });
    };
}

new Kernel();
