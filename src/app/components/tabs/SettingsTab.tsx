import * as React from "react";

import ChangeDocument from "./Settings/ChangeDocument";
import SignOut from "./Settings/SignOut";
import SyncInterval from "./Settings/SyncInterval";

class SettingsTab extends React.Component {
    render() {
        return (
            <div>
                <ChangeDocument />
                <SyncInterval />
                <SignOut />
            </div>
        );
    }
}

export default SettingsTab;
