export class IDispatcher {
    subscribers: any[];
}

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

export interface IMessage {
    action: string;
    payload?: any;
}
