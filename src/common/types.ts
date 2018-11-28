import moment, { Moment } from "moment";

export enum EKernelStatus {
    Unconfigured,
    Synchronizing,
    OK
}

// ----------------
// Messenger Types
//
export interface IMessage {
    topic: string;
    action?: string;
    payload?: any;
}
//
// END Messenger Types
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

export interface IDynalistNode {
    id: string;
    content: string;
    note: string;
    parent: string;
    children: string[];
}

export interface IDynalistNodeChange {
    action: string;
    parent_id?: string;
    node_id?: string;
    content?: string;
    note?: string;
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

export interface IStateSettings {
    [key: string]: any;
}

export interface IStateBookmarks {
    lastSync: Moment;
}

export interface IRootStoreState {
    settingsStore: IStateSettings;
}
//
// END Redux Types
// ---------------

// --------
// DB Types
//
export interface IDBFolderMap {
    [folder_key: string]: string;
}

export interface IDBBookmarkMapChild {
    browserBookmarkId: string;
    dynalistNodeId: string;
}

export interface IDBBookmarkMap {
    mapId: string;
    browserBookmarkId: string;
    dynalistNodeId: string;
    children: IDBBookmarkMapChild[];
}

export interface IDBInstallation {
    id: string;
    name: string;
    browser: string;
    os: string;
    lastSyncTime: number;
    bookmarkMap: IDBBookmarkMap[];
}

export interface IDB {
    folderMap: IDBFolderMap;
    installations: IDBInstallation[];
}
//
// END DB Types
// ------------
