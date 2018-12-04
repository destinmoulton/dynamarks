import {
    BookmarkFolderKeys,
    BrowserFolderIDs
} from "../../../constants/folders.constants";
import DB from "../db";
import LocalBookmarks from "../../localbookmarks";
import RemoteBookmarks from "./remotebookmarks";

class Sync {
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

    public synchronize() {}
}
export default Sync;
