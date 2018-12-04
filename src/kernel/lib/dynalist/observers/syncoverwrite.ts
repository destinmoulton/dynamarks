import { has, isArray } from "lodash";

import {
    BookmarkFolderKeys,
    BrowserFolderIDs
} from "../../../constants/folders.constants";
import DB from "../db";
import LocalBookmarks from "../../localbookmarks";
import DocumentChanges from "../documentchanges";
import RemoteFolders from "./remotefolders";
import * as Types from "../../../../common/types";

class SyncOverwrite extends Types.OOObserver {
    private iDB: DB = null;
    private iLocalBookmarks: LocalBookmarks = null;
    private nodelist: Types.OONodeList;
    protected subject: Types.OOSubject;

    constructor(
        nodesubject: Types.OOSubject,
        db: DB,
        localbookmarks: LocalBookmarks
    ) {
        super();
        this.subject = nodesubject;
        this.iDB = db;
        this.iLocalBookmarks = localbookmarks;

        this.subject.registerObserver(this);
    }

    public update(nodelist: Types.OONodeList) {
        this.nodelist = nodelist;
    }

    public async overwriteServer() {
        // Remove current children
        await this.purgeTopFolderChildNodes();

        this.iDB.clearBookmarkMap();
        for (let key of BookmarkFolderKeys) {
            const topLocalFolder = this.iLocalBookmarks.getSingleById(
                BrowserFolderIDs[key]
            );
            const remoteFolderID = this.iDB.getMappedFolderByKey(key);
            const remoteFolder = this.nodelist.getSingleById(remoteFolderID);
            await this.addLocalChildrenToRemote(remoteFolder, topLocalFolder);
        }

        await this.iDB.upload();
    }

    // Remove all the nodes from the top folders
    public async purgeTopFolderChildNodes() {
        const changes = new DocumentChanges();
        for (let key of BookmarkFolderKeys) {
            const topFolderID = this.iDB.getMappedFolderByKey(key);
            const topFolder = this.nodelist.getSingleById(topFolderID);
            this.removeChildrenRecursively(topFolder.id, changes);
        }
        this.subject.modifyData(changes);
    }

    public removeChildrenRecursively(
        parent_id: string,
        changes: DocumentChanges
    ): void {
        const children = this.nodelist.getChildren(parent_id);
        for (let child of children) {
            changes.deleteNode(child.id);
            if (isArray(child.children) && child.children.length > 0) {
                return this.removeChildrenRecursively(child.id, changes);
            }
        }
    }

    private async addLocalChildrenToRemote(
        remoteFolder: Types.IDynalistNode,
        localFolder: Types.ILocalBookmark
    ) {
        const children = localFolder.children.map(childId => {
            return this.iLocalBookmarks.getSingleById(childId);
        });
        await this.addChildren(remoteFolder.id, children);

        // Add the bookmark to the DB map
        this.iDB.addBookmarkMap(localFolder.id, remoteFolder.id);

        for (
            let child_index = 0;
            child_index < children.length;
            child_index++
        ) {
            const localChild = children[child_index];
            if (localChild.children.length > 0) {
                // Find the remote folder
                const remoteChild = this.nodelist.getChildByIndex(
                    remoteFolder.id,
                    child_index
                );

                if (remoteChild.id && remoteChild.id !== "") {
                    this.iDB.addBookmarkMapChild(
                        localFolder.id,
                        remoteFolder.id,
                        localChild.id,
                        remoteChild.id
                    );

                    await this.addLocalChildrenToRemote(
                        remoteChild,
                        localChild
                    );
                }
            }
        }
    }

    public addChildren(parent_id: string, children: Types.ILocalBookmark[]) {
        const changes = new DocumentChanges();
        children.forEach((child: Types.ILocalBookmark) => {
            changes.addNode(parent_id, child.title, child.url);
        });
        return this.subject.modifyData(changes);
    }

    public async overwriteLocal() {
        await this.iLocalBookmarks.purgeTopFolderBookmarks();

        this.iDB.clearBookmarkMap();
        for (let key of BookmarkFolderKeys) {
            const topLocalFolder = this.iLocalBookmarks.getSingleById(
                BrowserFolderIDs[key]
            );
            const remoteFolderID = this.iDB.getMappedFolderByKey(key);
            const remoteFolder = this.nodelist.getSingleById(remoteFolderID);
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
            const child = this.nodelist.getSingleById(childId);

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
            const remoteChild = this.nodelist.getSingleById(remoteChildId);

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
