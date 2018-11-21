interface ISettings {
    [key: string]: any;
}
export const SettingKeys: ISettings = {
    token: "dynalist_token",
    doc: "dynalist_bookmarks_document",
    interval: "synchronization_interval",
    browserID: "browserID"
};

export const SettingDefaults: ISettings = {
    token: null,
    doc: null,
    interval: 15,
    browserID: null
};
