import { filter, find, has, isArray, sortBy, values } from "lodash";

import * as Types from "../../common/types";
import DocumentChanges from "./dynalist/documentchanges";

import {
    BookmarkFolderKeys,
    BrowserFolderIDs
} from "../constants/folders.constants";

class LocalBookmarks {
    private bookmarks: Types.ILocalBookmark[] = null;

    public async populate() {
        const bmks = await browser.bookmarks.getTree();

        let result: Types.ILocalBookmark[] = [];
        this.flattenBookmarks(bmks[0], result);
        const sorted = sortBy(result, ["index"]);
        this.bookmarks = sorted;

        //console.log("LocalBookmarks :: bookmarks", sorted);
        return sorted;
    }

    public getBookmarks() {
        return this.bookmarks;
    }

    public getSingleById(id: string) {
        return find(this.bookmarks, { id });
    }

    // Remove all the bookmarks in the browser top folders
    public async purgeTopFolderBookmarks() {
        for (let key of BookmarkFolderKeys) {
            const browserFolderId = BrowserFolderIDs[key];
            const subTree = await browser.bookmarks.getSubTree(browserFolderId);

            if (isArray(subTree) && subTree[0].id === browserFolderId) {
                for (let child of subTree[0].children) {
                    await browser.bookmarks.removeTree(child.id);
                }
            }
        }
    }

    public async addBookmark(bookmark: browser.bookmarks.CreateDetails) {
        try {
            return browser.bookmarks.create(bookmark);
        } catch (err) {
            console.error(
                "LocalBookmarks :: addBookmark() :: Error creating a bookmark",
                err,
                bookmark
            );
        }
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
            index: node.index || 0,
            parentId: node.parentId || "",
            title: node.title,
            url: node.url || ""
        });

        return node.id;
    }
}
export default LocalBookmarks;
