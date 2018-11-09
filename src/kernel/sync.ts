import DynalistAPI from "../common/dynalistapi";
import LocalBookmarks from "./lib/localbookmarks";

class Sync {
    private dynalistapi: DynalistAPI = null;
    private localbookmarks: LocalBookmarks = null;

    constructor(dynalistapi: DynalistAPI, localbookmarks: LocalBookmarks) {
        this.dynalistapi = dynalistapi;
        this.localbookmarks = localbookmarks;
    }

    // Get the local bookmarks
    async getLocalBookmarks() {
        return await this.localbookmarks.getBookmarks();
    }

    // Get the remote bookmarks
    public async getRemoteBookmarks() {
        return await this.dynalistapi.getBookmarks();
    }
}

export default Sync;
