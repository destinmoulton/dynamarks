interface IFolders {
    [key: string]: string;
}

export const BrowserFolderIDs: IFolders = {
    root: "root________",
    menu: "menu________",
    toolbar: "toolbar_____",
    unfiled: "unfiled_____",
    mobile: "mobile______"
};

export const DynalistFolders: IFolders = {
    menu: "Menu",
    toolbar: "Toolbar",
    unfiled: "Other Bookmarks",
    mobile: "Mobile",
    db: "Dynamarks Database"
};

export const BookmarkFolderKeys = ["menu", "toolbar", "unfiled", "mobile"];
