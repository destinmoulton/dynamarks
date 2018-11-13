interface ISettings {
    [key: string]: any;
}
export const SettingKeys: ISettings = {
    token: "dynalist_token",
    doc: "dynalist_bookmarks_document",
    interval: "synchronization_interval",
    browserID: "browserID"
};

const info = [
    navigator.appCodeName,
    navigator.appName,
    navigator.appVersion,
    navigator.language,
    navigator.platform,
    navigator.product
];
const browserID = info.join(" | ");

export const SettingDefaults: ISettings = {
    token: null,
    doc: null,
    interval: 15,
    browserID
};
