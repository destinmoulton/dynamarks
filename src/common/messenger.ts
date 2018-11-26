/**
 * Messenger stores messages in the local storage, however
 * it uses the onChanged handler to do the event
 * notification. This seems weird, but is also easier to use
 * than the browser/extension notification system.
 */
import debug from "debug";
import { has } from "lodash";

type TSubscriptionMethod = (packet: any) => void;
interface ITopic {
    [key: string]: TSubscriptionMethod[];
}

const log = debug("common:messenger");
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
                        log(
                            "ERROR :: handleChanged() :: packet not found",
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
        log("subscribe()", this.topics);
    }

    public send(topic: string, packet: any) {
        return browser.storage.local.set({ [this.key]: { topic, packet } });
    }
}

export default Messenger;
