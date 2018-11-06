import { List, Map } from "immutable";

import * as Types from "./types";

const BASE_URL = "https://dynalist.io/api/v1/";

class DynalistAPI {
    token: string;

    constructor() {}

    public setToken(token: string) {
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

    public isTokenValid(token: string) {
        const url = BASE_URL + "file/list";
        const params = {
            body: JSON.stringify({ token }),
            method: "POST"
        };
        return fetch(url, params)
            .then(res => res.json())
            .then(json => {
                return json._code === "Ok";
            })
            .catch(err => {
                console.error(err);
            });
    }

    public async getTopDocs() {
        const res = await this.getAllFiles();
        const filesMap = this.mapFiles(res.files);

        let topDocs = List<Types.IDynalistDocument>();
        filesMap.forEach((file: Types.IDynalistDocument) => {
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
        files: Types.IDynalistDocument[]
    ): Map<string, Types.IDynalistDocument> {
        let docMap = Map<string, Types.IDynalistDocument>();

        files.forEach((file: Types.IDynalistDocument) => {
            docMap = docMap.set(file.id, file);
        });

        return docMap;
    }
}

export default DynalistAPI;
