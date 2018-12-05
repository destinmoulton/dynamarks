export default {
    tabs: {
        about: {
            info: "Dynamarks was built by Destin Moulton."
        },
        actions: {
            buttons: {
                sync: "Sync",
                upload: "Overwrite Server",
                download: "Overwrite Local"
            }
        },
        settings: {
            changedocument: {
                title: "Dynalist Bookmark Document",
                button: "Change Synchronization Document",
                confirm:
                    "Are you sure you want to change the Dynalist synchronization document?"
            },
            syncinterval: {
                title: "Sync Interval",
                editbutton: "Edit",
                cancelbutton: "Cancel",
                savebutton: "Save"
            },
            reset: {
                title: "Remove Settings",
                button: "Reset",
                confirmlines: [
                    "Are you sure you want to reset Dynamarks?",
                    "This will clear the API key and stop all synchronization."
                ]
            }
        }
    },
    selectdoc: {
        loading: "Loading Dynalist documents..."
    }
};
