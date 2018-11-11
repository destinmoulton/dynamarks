/**
 * Messenger stores messages in the local storage
 */
import { has } from "lodash";

type TSubscriptionMethod = (packet: any) => void;
interface ITopic {
    [key: string]: TSubscriptionMethod[];
}

class Messenger {
    private key: string;
    private topics: ITopic = null;

    constructor() {
        this.key = "messenger";
        this.topics = {};
        browser.storage.onChanged.addListener(this.handleChanged.bind(this));
    }

    private handleChanged = (changes: any, areaName: string) => {
        if (areaName === "local") {
            if (has(changes, this.key)) {
                if (has(changes[this.key].newValue, "topic")) {
                    if (!has(changes[this.key].newValue, "packet")) {
                        console.error(
                            "Messenger :: handleChanged() :: packet not found",
                            changes[this.key].newValue
                        );
                    } else {
                        const topic = changes[this.key].newValue.topic;
                        if (has(this.topics, topic)) {
                            this.topics[topic].forEach(method =>
                                method(changes[this.key].newValue.packet)
                            );
                        }
                    }
                }
            }
        }
    };

    public subscribe(topic: string, method: TSubscriptionMethod) {
        if (!has(this.topics, topic)) this.topics[topic] = [];
        this.topics[topic].push(method);
        console.log("Messenger :: subscribe() ", this.topics);
    }

    public send(topic: string, packet: any) {
        return browser.storage.local.set({ [this.key]: { topic, packet } });
    }
}

export default Messenger;
