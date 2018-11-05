import * as types from "../../common/types";
import * as _ from "lodash";
/**
 * Handle messaging with the kernel
 */
class KernelMessenger {
    channel: any;
    dispatcher: types.IDispatcher;

    constructor(dispatcher: types.IDispatcher) {
        this.channel = browser.runtime.connect(
            null,
            { name: "dynamarks" }
        );
        this.dispatcher = dispatcher;

        this.listenForMessages();
    }

    send(msg: types.IDispatchMessage) {
        return this.channel.postMessage(msg);
    }

    private listenForMessages() {
        this.channel.onMessage.addListener(this.handleMessage);
    }

    private handleMessage = (msg: types.IDispatchMessage) => {
        if (!_.has(msg, "topic") || !_.has(msg, "action")) {
            this.channel.postMessage({
                error: "No topic or action provided in message.",
                original: msg
            });
            return;
        }
        this.dispatcher.dispatch(msg);
    };
}

export default KernelMessenger;
