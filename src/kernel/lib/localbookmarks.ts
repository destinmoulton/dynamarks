import { flatten, has, map } from "lodash";

import bookmarkids from "../constants/bookmarkids";
import * as types from "../../common/types";

class LocalBookmarks {
    async getTree() {
        return await browser.bookmarks.getTree();
    }

    async pluckById(id: string) {
        const bmks = await this.getTree();
        console.log("bmks", bmks);
        let result: types.ILocalBookmark[] = [];
        this.flattenBookmarks(bmks[0], result);
        console.log("flat", result);
        return map(flatten(bmks), id);
    }

    flattenBookmarks(
        node: browser.bookmarks.BookmarkTreeNode,
        result: types.ILocalBookmark[]
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
