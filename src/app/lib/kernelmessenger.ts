class IKernelMessenger {
    channel: any;
}

class KernelMessenger extends IKernelMessenger {
    constructor() {
        super();
    }

    connect() {
        this.channel = browser.runtime.connect(
            null,
            { name: "dynamarks" }
        );
    }

    send(msg: any) {
        this.channel.postMessage(msg);
    }

    subscribe(subscriber: (msg: any) => void) {
        this.channel.onMessage.addListener(subscriber);
    }
}

export default new KernelMessenger();
