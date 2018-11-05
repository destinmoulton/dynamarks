import * as _ from "lodash";

import * as types from "./types";

/**
 * Dispatcher is a pseudo publisher (ie pub/sub)
 */
class Dispatcher implements types.IDispatcher {
    subscriptions: types.TDispatchSubscriptions = {};

    constructor() {
        this.subscriptions = {};
    }

    subscribe(topic: string, subscriber: types.TDispatchSubscriber) {
        if (!_.has(this.subscriptions, topic)) this.subscriptions[topic] = [];

        this.subscriptions[topic].push(subscriber);
    }

    dispatch(msg: types.IDispatchMessage) {
        if (!_.has(this.subscriptions, msg.topic)) {
            console.error("dispatch() :: topic does not exist", msg);
            return;
        }

        this.subscriptions[msg.topic].forEach(
            (sub: types.TDispatchSubscriber) => {
                sub(msg);
            }
        );
    }
}

export default Dispatcher;
