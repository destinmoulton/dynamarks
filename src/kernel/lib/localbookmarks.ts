import { filter, find, has } from "lodash";

import * as Types from "../../common/types";

class LocalBookmarks {
    bookmarks: Types.ILocalBookmark[] = null;

    public getFolderContents(parentId: string) {
        return filter(this.bookmarks, bookmark => {
            return bookmark.parentId === parentId;
        });
    }

    public async populate() {
        const bmks = await browser.bookmarks.getTree();
        let result: Types.ILocalBookmark[] = [];
        this.flattenBookmarks(bmks[0], result);

        this.bookmarks = result;
        return result;
    }

    private flattenBookmarks(
        node: browser.bookmarks.BookmarkTreeNode,
        result: Types.ILocalBookmark[]
    ) {
        let children: string[] = [];
        if (has(node, "children")) {
            // group or folder
            node.children.forEach(child => {
                children.push(this.flattenBookmarks(child, result));
            });
        }
        // bookmark
        result.push({
            children,
            dateAdded: node.dateAdded || 0,
            dateGroupModified: node.dateGroupModified || 0,
            id: node.id,
            index: node.index || -1,
            parentId: node.parentId || "",
            title: node.title,
            url: node.url || ""
        });

        return node.id;
    }
}
export default LocalBookmarks;
