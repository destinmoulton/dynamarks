import debug from "debug";
import { find, isArray, isObject, keys, remove, values } from "lodash";

import {
    BookmarkFolderKeys,
    DynalistFolders
} from "../../../constants/folders.constants";
import DocumentChanges from "../documentchanges";
import DB from "./db";
import * as Types from "../../../../common/types";

const log = debug("kernel:remotefolders");
class RemoteFolders extends Types.OOObserver {
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

    private checkTopFolders() {
        const foldersToCreate = values(DynalistFolders);
        const nodes = this.nodelist.getAll();
        keys(DynalistFolders).forEach(folderKey => {
            const folderName = DynalistFolders[folderKey];
            for (let node of nodes) {
                if (node.content === folderName) {
                    remove(foldersToCreate, val => val === folderName);
                }
            }
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

export default RemoteFolders;
