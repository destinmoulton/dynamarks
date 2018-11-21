import {
    BookmarkFolderKeys,
    BrowserFolderIDs
} from "../constants/folders.constants";
import DynamarksDB from "./dynamarksdb";
import LocalBookmarks from "./localbookmarks";
import RemoteBookmarks from "./remotebookmarks";

class Synchronize {
    private iDynamarksDB: DynamarksDB = null;
    private iLocalBookmarks: LocalBookmarks = null;
    private iRemoteBookmarks: RemoteBookmarks = null;
    constructor(
        dynamarksdb: DynamarksDB,
        localbookmarks: LocalBookmarks,
        remotebookmarks: RemoteBookmarks
    ) {
        this.iDynamarksDB = dynamarksdb;
        this.iLocalBookmarks = localbookmarks;
        this.iRemoteBookmarks = remotebookmarks;
    }
}
export default Synchronize;
