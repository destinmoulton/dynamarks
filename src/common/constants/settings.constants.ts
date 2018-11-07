export const SettingKeys = {
    token: "dynalist_token",
    doc: "dynalist_bookmarks_document",
    interval: "synchronization_interval"
};

interface IDefaults {
    [key: string]: any;
}

export const SettingDefaults: IDefaults = {
    token: null,
    doc: null,
    interval: 15
};
