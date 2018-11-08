import DynalistAPI from "../common/dynalistapi";

class Sync {
    private dynalistapi: DynalistAPI = null;

    constructor(dynalistapi: DynalistAPI) {
        this.dynalistapi = dynalistapi;
    }

    // Get the local bookmarks
    async getLocalBookmarks() {}

    // Get the remote bookmarks
    public async getRemoteBookmarks() {
        return await this.dynalistapi.getBookmarks();
    }
}

export default Sync;
