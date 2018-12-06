interface ISettingKeys {
    [key: string]: string;
    token: string;
    doc: string;
    interval: string;
    installationID: string;
}

interface ISettingDefaults {
    [key: string]: null | number;
    token: null;
    doc: null;
    interval: number;
    installationID: null;
}

export const SettingKeys: ISettingKeys = {
    token: "dynalistToken",
    doc: "dynalistBookmarksDocument",
    interval: "synchronizationInterval",
    installationID: "installationID"
};

export const SettingDefaults: ISettingDefaults = {
    token: null,
    doc: null,
    interval: 15,
    installationID: null
};
