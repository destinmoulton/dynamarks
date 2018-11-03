export enum EKernelStatus {
    Unconfigured,
    Synchronizing,
    OK
}

// ---------------------
// ClientMessenger Types
//
export interface IClientMessenger {
    channel: any;
    dispatcher: IDispatcher;
    send: (msg: IDispatchMessage) => void;
}
//
// END ClientMessenger Types
// -------------------------

// ----------------
// Dispatcher Types
//
export class IDispatcher {
    subscriptions: TDispatchSubscriptions;
    subscribe: (topic: string, subscriber: TDispatchSubscriber) => void;
    dispatch: (msg: IDispatchMessage) => void;
}

export interface IDispatchMessage {
    topic: string;
    action: string;
    payload?: any;
}

export type TDispatchSubscriber = (msg: IDispatchMessage) => void;

export interface TDispatchSubscriptions {
    [key: string]: TDispatchSubscriber[];
}
//
// END Dispatcher Types
// --------------------

// --------------
// Bookmark Types
//
export interface ILocalBookmark {
    children: string[];
    dateAdded: number;
    dateGroupModified: number;
    id: string;
    index: number;
    parentId: string;
    title: string;
    url: string;
}
//
// END Bookmark Types
// ------------------

// --------------
// Dynalist types
//
export interface IDynalistDocument {
    id: string;
    title: string;
    type: string;
    permission: number;
    collapsed?: boolean;
    children?: string[];
}
//
// END Dynalist Types
// ------------------
