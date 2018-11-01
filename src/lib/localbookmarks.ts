import { flatten, has, map } from "lodash";

import bookmarkids from "../constants/bookmarkids";
import * as types from "../types";
async function getAll() {
    return await browser.bookmarks.getTree();
}

async function pluckById(id: string) {
    const bmks = await getAll();
    console.log("bmks", bmks);
    let result: types.ILocalBookmark[] = [];
    flattenBookmarks(bmks[0], result);
    console.log("flat", result);
    return map(flatten(bmks), id);
}

function flattenBookmarks(
    node: browser.bookmarks.BookmarkTreeNode,
    result: types.ILocalBookmark[]
) {
    if (has(node, "children")) {
        // group or folder
        node.children.forEach(child => {
            console.log(child);
            flattenBookmarks(child, result);
        });
    }
    // bookmark
    result.push({
        dateAdded: node.dateAdded || 0,
        dateGroupModified: node.dateGroupModified || 0,
        id: node.id,
        index: node.index || -1,
        parentId: node.parentId || "",
        title: node.title,
        url: node.url || ""
    });

    return result;
}

export { getAll, pluckById };
