import { flatten, has, map } from "lodash";

import * as Types from "../../common/types";

class LocalBookmarks {
    private async getTree() {
        return await browser.bookmarks.getTree();
    }

    public async getBookmarks() {
        const bmks = await this.getTree();
        let result: Types.ILocalBookmark[] = [];
        this.flattenBookmarks(bmks[0], result);
        return Promise.resolve(result);
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
