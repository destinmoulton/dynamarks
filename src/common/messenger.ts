import { has } from "lodash";

type TSubscriptionMethod = (packet: any) => void;
interface ITopic {
    [key: string]: TSubscriptionMethod[];
}

class Messenger {
    private topics: ITopic = null;

    constructor(name: string) {
        this.topics = {};
        browser.storage.onChanged.addListener(this.handleChanged);
    }

    private handleChanged = (
        changes: browser.storage.StorageChange,
        areaName: string
    ) => {
        if (areaName === "local") {
            console.log("Messenger :: handleChanged() :: changes", changes);
        }
    };

    public subscribe(topic: string, method: TSubscriptionMethod) {
        if (!has(this.topics, topic)) this.topics[topic] = [];
        this.topics[topic].push(method);
    }
}

export default Messenger;
