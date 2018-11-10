import { keys, remove, values } from "lodash";
import DynalistAPI from "../common/dynalistapi";
import LocalBookmarks from "./lib/localbookmarks";
import Settings from "../common/settings";
import * as Types from "../common/types";
import { DynalistFolders } from "./constants/folders.constants";
import DocumentChanges from "./lib/dynalist/documentchanges";
import { SettingKeys } from "../common/constants/settings.constants";

class Sync {
    private iDynalistAPI: DynalistAPI = null;
    private iLocalBookmarks: LocalBookmarks = null;
    private iSettings: Settings = null;

    private bookmarksLocal: Types.ILocalBookmark[] = null;
    private bookmarksRemote: any = null;

    constructor(
        dynalistapi: DynalistAPI,
        localbookmarks: LocalBookmarks,
        settings: Settings
    ) {
        this.iDynalistAPI = dynalistapi;
        this.iLocalBookmarks = localbookmarks;
        this.iSettings = settings;

        this.canSynchronize().then(canSync => {
            console.log("Sync :: constructor() canSync", canSync);
            if (canSync) {
                return this.populate().then(() => {
                    console.log(
                        "Sync :: constructor() this.bookmarksRemote",
                        this.bookmarksRemote
                    );
                    console.log(
                        "Sync :: constructor() this.bookmarksLocal",
                        this.bookmarksLocal
                    );
                    return this.syncDynamarksFolders();
                });
            }
        });
    }

    private populate() {
        const prom1 = this.getRemoteBookmarks().then(bookmarks => {
            this.bookmarksRemote = bookmarks;
        });

        const prom2 = this.getLocalBookmarks().then(bookmarks => {
            this.bookmarksLocal = bookmarks;
        });

        return Promise.all([prom1, prom2]).catch(err => {
            console.error(err);
        });
    }

    private async syncDynamarksFolders() {
        const foldersToCreate = values(DynalistFolders);
        keys(DynalistFolders).forEach(folderKey => {
            const folderName = DynalistFolders[folderKey];
            this.bookmarksRemote.forEach((node: Types.IDynalistNode) => {
                if (node.content === folderName) {
                    remove(foldersToCreate, val => val === folderName);
                }
            });
        });
        const documentChanges = new DocumentChanges();
        foldersToCreate.forEach(folder => {
            documentChanges.addNode("root", folder);
        });
        console.log(
            "Sync :: syncDynamarksFolders foldersToCreate",
            foldersToCreate
        );
        return await this.iDynalistAPI.submitChanges(
            documentChanges.getChanges()
        );
    }

    private canSynchronize() {
        const prom1 = this.iSettings.exists(SettingKeys.token);
        const prom2 = this.iSettings.exists(SettingKeys.doc);

        return Promise.all([prom1, prom2]).then((exists: boolean[]) => {
            return exists.every(doesExist => {
                return doesExist;
            });
        });
    }

    // Get the local bookmarks
    private async getLocalBookmarks() {
        try {
            return await this.iLocalBookmarks.getBookmarks();
        } catch (err) {
            throw err;
        }
    }

    // Get the remote bookmarks
    private async getRemoteBookmarks() {
        try {
            return await this.iDynalistAPI.getBookmarks();
        } catch (err) {
            throw err;
        }
    }
}

export default Sync;
