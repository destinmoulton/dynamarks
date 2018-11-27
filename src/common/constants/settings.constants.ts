interface ISettings {
    [key: string]: any;
}
export const SettingKeys: ISettings = {
    token: "dynalistToken",
    doc: "dynalistBookmarksDocument",
    interval: "synchronizationInterval",
    browserID: "browserID"
};

export const SettingDefaults: ISettings = {
    token: null,
    doc: null,
    interval: 15,
    browserID: null
};
