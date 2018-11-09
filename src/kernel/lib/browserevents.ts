interface IRemoveInfo {
    parentId: string;
    index: number;
    node: browser.bookmarks.BookmarkTreeNode;
}

interface IChangeInfo {
    title: string;
    url: string;
}

interface IMoveInfo {
    parentId: string;
    index: number;
    oldParentId: string;
    oldIndex: number;
}

class BrowserEvents {
    private setupListeners() {
        browser.bookmarks.onCreated.addListener(this.bookmarkCreated);
        browser.bookmarks.onRemoved.addListener(this.bookmarkRemoved);
        browser.bookmarks.onChanged.addListener(this.bookmarkChanged);
        browser.bookmarks.onMoved.addListener(this.bookmarkMoved);
    }

    private bookmarkCreated(
        id: string,
        node: browser.bookmarks.BookmarkTreeNode
    ) {}

    private bookmarkRemoved(id: string, removeInfo: IRemoveInfo) {}

    private bookmarkChanged(id: string, changeInfo: IChangeInfo) {}

    private bookmarkMoved(id: string, moveInfo: IMoveInfo) {}
}

export default BrowserEvents;
