import * as types from "../common/types";

/**
 * Container for the kernel status.
 */
class Status {
    currentStatus: types.EKernelStatus;
    dispatcher: types.IDispatcher;
    messenger: types.IClientMessenger;

    constructor(
        dispatcher: types.IDispatcher,
        messenger: types.IClientMessenger
    ) {
        this.currentStatus = types.EKernelStatus.Unconfigured;
        this.dispatcher = dispatcher;
        this.messenger = messenger;

        this.dispatcher.subscribe("status", this._handleDispatch);
    }

    private _handleDispatch = (msg: types.IDispatchMessage) => {
        switch (msg.action) {
            case "get":
                const message = {
                    topic: "status",
                    action: "get.result",
                    data: this.get()
                };
                return this.messenger.send(message);
        }
    };

    set(newStatus: types.EKernelStatus) {
        this.currentStatus = newStatus;
    }

    get() {
        return this.currentStatus;
    }
}

export default Status;
