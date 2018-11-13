import { filter, find, has, sortBy } from "lodash";

import * as Types from "../../common/types";
import DocumentChanges from "./dynalist/documentchanges";

class LocalBookmarks {
    private bookmarks: Types.ILocalBookmark[] = null;

    public async populate() {
        const bmks = await browser.bookmarks.getTree();
        let result: Types.ILocalBookmark[] = [];
        this.flattenBookmarks(bmks[0], result);
        const sorted = sortBy(result, ["index"]);
        this.bookmarks = sorted;

        console.log("LocalBookmarks :: bookmarks", sorted);
        return sorted;
    }

    public getSingleById(id: string) {
        return find(this.bookmarks, { id });
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
