import {
    BookmarkFolderKeys,
    BrowserFolderIDs
} from "../../constants/folders.constants";
import DB from "../db/db";
import LocalBookmarks from "../localbookmarks";
import RemoteBookmarks from "../remotebookmarks";

class Sync {
    private iDynamarksDB: DB = null;
    private iLocalBookmarks: LocalBookmarks = null;
    private iRemoteBookmarks: RemoteBookmarks = null;
    constructor(
        DB: DB,
        localbookmarks: LocalBookmarks,
        remotebookmarks: RemoteBookmarks
    ) {
        this.iDynamarksDB = DB;
        this.iLocalBookmarks = localbookmarks;
        this.iRemoteBookmarks = remotebookmarks;
    }

    public synchronize() {}
}
export default Sync;
