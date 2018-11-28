interface ISettings {
    [key: string]: any;
}
export const SettingKeys: ISettings = {
    token: "dynalistToken",
    doc: "dynalistBookmarksDocument",
    interval: "synchronizationInterval",
    installationID: "installationID"
};

export const SettingDefaults: ISettings = {
    token: null,
    doc: null,
    interval: 15,
    installationID: null
};
