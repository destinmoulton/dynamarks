import moment, { Moment } from "moment";

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

// -----------
// Redux Types
//
export interface IDispatch {
    <R>(
        asyncAction: (dispatch: IDispatch, getState: () => IRootStoreState) => R
    ): R;
    <R>(asyncAction: (dispatch: IDispatch) => R): R;
    // (neverAction: (dispatch: Dispatch, getState: () => GetState) => never): never;
    (action: object): void;
    // (action: Thunk): ; // thunks in this app must return a promise
}

export interface IGetState {
    (): IRootStoreState;
}

export interface ISettingsState {
    [key: string]: any;
}

export interface IBookmarksState {
    lastSync: Moment;
}

export interface IRootStoreState {
    settingsStore: ISettingsState;
}
//
// END Redux Types
// ---------------

// -------------------
// Settings Class Type
//
export interface ISettingsClass {
    get: (key: string) => any;
}
//
// END Settings Class Type
// -----------------------
