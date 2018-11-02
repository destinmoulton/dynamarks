import * as types from "./types";

/**
 * Dispatcher is a pseudo publisher (ie pub/sub)
 */
class Dispatcher extends types.IDispatcher {
    constructor() {
        super();

        this.subscribers = [];
    }

    subscribe(subscriber: any) {
        this.subscribers.push(subscriber);
    }

    dispatch(msg: types.IMessage) {
        this.subscribers.forEach(sub => {
            sub(msg);
        });
    }
}

export default Dispatcher;
