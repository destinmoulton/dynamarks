import debug from "debug";
import { find, isArray, isObject, keys, remove, values } from "lodash";

import {
    BookmarkFolderKeys,
    DynalistFolders
} from "../../../constants/folders.constants";
import DocumentChanges from "../documentchanges";
import DynalistAPI from "../../../../common/dynalistapi";
import DB from "../db";
import Settings from "../../../../common/settings";
import * as Types from "../../../../common/types";

const log = debug("kernel:remotebookmarks");
class RemoteBookmarks extends Types.OOObserver {
    private bookmarks: Types.IDynalistNode[];

    private iDB: DB = null;

    protected subject: Types.OOSubject;
    private nodelist: Types.OONodeList;

    constructor(nodesubject: Types.OOSubject, db: DB) {
        super();
        this.subject = nodesubject;

        this.iDB = db;

        this.subject.registerObserver(this);
    }

    public update(nodelist: Types.OONodeList) {
        this.nodelist = nodelist;
    }

    public async setup() {
        try {
            const { doFoldersExist, foldersToCreate } = this.checkTopFolders();
            if (!doFoldersExist) {
                await this.createTopFolders(foldersToCreate);

                // Re-run the this method after the top folders are created
                await this.setup();
            }
            return true;
        } catch (err) {
            log("setup() :: ERROR :: Problem in setup.", err);
        }
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

    public addChildren(parent_id: string, children: Types.ILocalBookmark[]) {
        const changes = new DocumentChanges();
        children.forEach((child: Types.ILocalBookmark) => {
            changes.addNode(parent_id, child.title, child.url);
        });
        return this.subject.modifyData(changes);
    }

    private checkTopFolders() {
        const foldersToCreate = values(DynalistFolders);
        keys(DynalistFolders).forEach(folderKey => {
            const folderName = DynalistFolders[folderKey];
            this.bookmarks.forEach((node: Types.IDynalistNode) => {
                if (node.content === folderName) {
                    remove(foldersToCreate, val => val === folderName);
                }
            });
        });

        return {
            doFoldersExist: foldersToCreate.length === 0,
            foldersToCreate
        };
    }

    private async createTopFolders(foldersToCreate: string[]) {
        if (foldersToCreate.length > 0) {
            const changes = new DocumentChanges();

            foldersToCreate.forEach(folder => {
                changes.addNode("root", folder);
            });
            await this.subject.modifyData(changes);
        }
        return true;
    }
}

export default RemoteBookmarks;
