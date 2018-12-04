import { has, isArray } from "lodash";

import {
    BookmarkFolderKeys,
    BrowserFolderIDs
} from "../../../constants/folders.constants";
import DB from "../../db/db";
import LocalBookmarks from "../../localbookmarks";
import RemoteBookmarks from "./remotebookmarks";
import * as Types from "../../../../common/types";

class SyncOverwrite {
    private iDB: DB = null;
    private iLocalBookmarks: LocalBookmarks = null;
    private iRemoteBookmarks: RemoteBookmarks = null;

    constructor(
        DB: DB,
        localbookmarks: LocalBookmarks,
        remotebookmarks: RemoteBookmarks
    ) {
        this.iDB = DB;
        this.iLocalBookmarks = localbookmarks;
        this.iRemoteBookmarks = remotebookmarks;
    }

    public async overwriteServer() {
        // Remove current children
        await this.iRemoteBookmarks.purgeTopFolderChildNodes();

        this.iDB.clearBookmarkMap();
        for (let key of BookmarkFolderKeys) {
            const topLocalFolder = this.iLocalBookmarks.getSingleById(
                BrowserFolderIDs[key]
            );
            const remoteFolderID = this.iDB.getMappedFolderByKey(key);
            const remoteFolder = this.iRemoteBookmarks.getSingleById(
                remoteFolderID
            );
            await this.addLocalChildrenToRemote(remoteFolder, topLocalFolder);
        }

        await this.iDB.upload();
    }

    private async addLocalChildrenToRemote(
        remoteFolder: Types.IDynalistNode,
        localFolder: Types.ILocalBookmark
    ) {
        const children = localFolder.children.map(childId => {
            return this.iLocalBookmarks.getSingleById(childId);
        });
        await this.iRemoteBookmarks.addChildren(remoteFolder.id, children);

        // Add the bookmark to the DB map
        this.iDB.addBookmarkMap(localFolder.id, remoteFolder.id);

        // Get the new version
        await this.iRemoteBookmarks.populateBookmarks();
        for (
            let child_index = 0;
            child_index < children.length;
            child_index++
        ) {
            const localChild = children[child_index];
            if (localChild.children.length > 0) {
                // Find the remote folder
                const remoteChildId = this.iRemoteBookmarks.getChildIdByIndex(
                    remoteFolder.id,
                    child_index
                );

                if (remoteChildId && remoteChildId !== "") {
                    const remoteChild = this.iRemoteBookmarks.getSingleById(
                        remoteChildId
                    );

                    this.iDB.addBookmarkMapChild(
                        localFolder.id,
                        remoteFolder.id,
                        localChild.id,
                        remoteChildId
                    );

                    await this.addLocalChildrenToRemote(
                        remoteChild,
                        localChild
                    );
                }
            }
        }
    }

    public async overwriteLocal() {
        await this.iLocalBookmarks.purgeTopFolderBookmarks();

        await this.iRemoteBookmarks.populateBookmarks();
        this.iDB.clearBookmarkMap();
        for (let key of BookmarkFolderKeys) {
            const topLocalFolder = this.iLocalBookmarks.getSingleById(
                BrowserFolderIDs[key]
            );
            const remoteFolderID = this.iDB.getMappedFolderByKey(key);
            const remoteFolder = this.iRemoteBookmarks.getSingleById(
                remoteFolderID
            );
            await this.addRemoteChildrenToBrowser(remoteFolder, topLocalFolder);
        }

        await this.iDB.upload();
    }

    // Recursive method to add the remote bookmarks
    // to the browser
    private async addRemoteChildrenToBrowser(
        remoteFolder: Types.IDynalistNode,
        localFolder: Types.ILocalBookmark
    ) {
        if (!isArray(remoteFolder.children)) {
            return true;
        }

        // Add the children for the remoteFolder
        let newChildren: browser.bookmarks.BookmarkTreeNode[] = [];
        for (
            let childIndex = 0;
            childIndex < remoteFolder.children.length;
            childIndex++
        ) {
            const childId = remoteFolder.children[childIndex];
            const child = this.iRemoteBookmarks.getSingleById(childId);

            let newBookmark: browser.bookmarks.CreateDetails = {
                parentId: localFolder.id,
                index: childIndex,
                title: child.content
            };
            if (child.note && child.note !== "") {
                newBookmark.url = child.note;
            }
            const newChild = await this.iLocalBookmarks.addBookmark(
                newBookmark
            );
            newChildren.push(newChild);
        }

        this.iDB.addBookmarkMap(localFolder.id, remoteFolder.id);

        // Make sure the data model matches the browser tree
        await this.iLocalBookmarks.populate();

        // Process any folders in the added children
        for (
            let newChildIndex = 0;
            newChildIndex < newChildren.length;
            newChildIndex++
        ) {
            const newChild = newChildren[newChildIndex];
            const localChild = this.iLocalBookmarks.getSingleById(newChild.id);
            const remoteChildId = remoteFolder.children[newChildIndex];
            const remoteChild = this.iRemoteBookmarks.getSingleById(
                remoteChildId
            );

            this.iDB.addBookmarkMapChild(
                localFolder.id,
                remoteFolder.id,
                localChild.id,
                remoteChildId
            );

            if (has(remoteChild, "children")) {
                if (remoteChild.children.length > 0) {
                    // Recursion to add the next round of children
                    await this.addRemoteChildrenToBrowser(
                        remoteChild,
                        localChild
                    );
                }
            }
        }
    }
}

export default SyncOverwrite;
