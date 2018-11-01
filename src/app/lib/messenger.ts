class IMessenger {
    channel: any;
}

class Messenger extends IMessenger {
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

export default new Messenger();
