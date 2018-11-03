import { List, Map } from "immutable";

import * as types from "../../common/types";

const BASE_URL = "https://dynalist.io/api/v1/";

class DynalistAPI {
    token: string;

    constructor(token: string) {
        this.token = token;
    }

    private request(url: string, requestParams: any = {}) {
        const params = {
            body: JSON.stringify({ token: this.token, ...requestParams }),
            method: "POST"
        };
        return fetch(url, params)
            .then(res => res.json())
            .catch(err => {
                console.error(err);
            });
    }

    public async isTokenValid() {
        const res = await this.getAllFiles();

        return res._code === "Ok";
    }

    public async getTopDocs() {
        const res = await this.getAllFiles();
        const filesMap = this.mapFiles(res.files);

        let topDocs = List<types.IDynalistDocument>();
        filesMap.forEach((file: types.IDynalistDocument) => {
            if (res.root_file_id === file.id) {
                file.children.forEach(child_id => {
                    const child = filesMap.get(child_id);
                    if (child.type === "document") {
                        topDocs = topDocs.push(child);
                    }
                });
            }
        });
        return topDocs;
    }

    public getAllFiles() {
        const url = BASE_URL + "file/list";

        return this.request(url);
    }

    private mapFiles(
        files: types.IDynalistDocument[]
    ): Map<string, types.IDynalistDocument> {
        let docMap = Map<string, types.IDynalistDocument>();

        files.forEach((file: types.IDynalistDocument) => {
            docMap = docMap.set(file.id, file);
        });

        return docMap;
    }
}

export default DynalistAPI;
