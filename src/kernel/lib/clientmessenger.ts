import { has } from "lodash";
import Dispatcher from "../../common/dispatcher";

class IClientMessenger {
    channel: any;
    dispatcher: Dispatcher;
}

/**
 * Setup the runtime messaging system for communicating
 * with the client/react application.
 *
 *  - Listen for messages
 *  - Dispatch messages
 */
class ClientMessenger extends IClientMessenger {
    constructor(dispatcher: Dispatcher) {
        super();
        this.channel = null;
        this.dispatcher = dispatcher;

        this.initializeEvents();
    }

    initializeEvents() {
        browser.runtime.onConnect.addListener(this.listenForMessages);
        browser.runtime.onMessage.addListener(this.handleMessage);
    }

    handleMessage = (msg: any) => {
        if (!has(msg, "action")) {
            this.channel.postMessage({
                error: "No action provided in message.",
                original: msg
            });
            return;
        }
        this.dispatcher.dispatch(msg);
    };

    listenForMessages = (port: any) => {
        if (port.name !== "dynamarks") return;

        this.channel = port;
        this.channel.onMessage.addListener((msg: any) => {
            this.handleMessage(msg);
        });
    };
}
