import {
    BookmarkFolderKeys,
    BrowserFolderIDs
} from "../../../constants/folders.constants";
import DB from "./db";
import LocalBookmarks from "../../localbookmarks";
import RemoteFolders from "./remotefolders";
import * as Types from "../../../../common/types";

class Sync extends Types.OOObserver {
    private iDB: DB = null;
    private iLocalBookmarks: LocalBookmarks = null;
    private iRemoteFolders: RemoteFolders = null;

    protected subject: Types.OOSubject;
    private nodelist: Types.OONodeList;
    constructor(
        nodesubject: Types.OOSubject,
        db: DB,
        localbookmarks: LocalBookmarks,
        remotefolders: RemoteFolders
    ) {
        super();

        this.subject = nodesubject;
        this.iDB = db;
        this.iLocalBookmarks = localbookmarks;
        this.iRemoteFolders = remotefolders;

        this.subject.registerObserver(this);
    }

    public update(nodelist: Types.OONodeList) {
        this.nodelist = nodelist;
    }

    public synchronize() {}
}
export default Sync;
