import * as _ from "lodash";
import { List, Map } from "immutable";

import * as Types from "./types";
import { SettingKeys } from "./constants/settings.constants";

const BASE_URL = "https://dynalist.io/api/v1/";

class DynalistAPI {
    settings: Types.ISettingsClass;

    constructor(settings: Types.ISettingsClass) {
        this.settings = settings;
    }

    private async request(url: string, requestParams: any = {}) {
        const token = await this.settings.get(SettingKeys.token);
        if (_.isEmpty(token)) {
            throw Error("DynalistAPI :: request() -- token is not set.");
        }

        const params = {
            body: JSON.stringify({ token, ...requestParams }),
            method: "POST"
        };
        return fetch(url, params)
            .then(res => res.json())
            .then(json => {
                if (json._code !== "Ok") {
                    throw Error(
                        `DynalistAPI request() invalid. _code = ${json._code}`
                    );
                }
                return json;
            })
            .catch(err => {
                throw err;
            });
    }

    public isTokenValid(tokenToTest: string) {
        const url = BASE_URL + "file/list";
        const params = {
            body: JSON.stringify({ tokenToTest }),
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

    public async getBookmarks() {
        try {
            const doc = await this.settings.get(SettingKeys.doc);
            if (doc === null) {
                return;
            }

            const params = {
                file_id: doc.id
            };

            const url = BASE_URL + "doc/read";
            return await this.request(url, params);
        } catch (err) {
            throw err;
        }
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

    public async getAllFiles() {
        const url = BASE_URL + "file/list";

        try {
            return await this.request(url);
        } catch (err) {
            console.error(err);
        }
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
