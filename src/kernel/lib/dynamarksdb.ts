/**
 * The database stored in Dynamarks for meta data
 */

import { cloneDeep } from "lodash";

interface IFolderMap {
    [folder_key: string]: string;
}

interface IDynarksDB {
    folderMap: IFolderMap;
}

const INITIAL_DB: IDynarksDB = {
    folderMap: null
};
class DynamarksDB {
    db: IDynarksDB = cloneDeep(INITIAL_DB);

    addFolderMap(folder_key: string, node_id: string) {
        this.db.folderMap[folder_key] = node_id;
    }
}

export default DynamarksDB;
