export const SettingKeys = {
    token: "dynalist_token",
    doc: "dynalist_bookmarks_document",
    interval: "synchronization_interval"
};

interface IDefaults {
    [key: string]: any;
}

const info = [
    navigator.appCodeName,
    navigator.appName,
    navigator.appVersion,
    navigator.language,
    navigator.platform,
    navigator.product
];
const browserID = info.join(" | ");

export const SettingDefaults: IDefaults = {
    token: null,
    doc: null,
    interval: 15,
    browserID
};
