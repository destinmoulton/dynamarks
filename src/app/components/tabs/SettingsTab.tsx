import * as React from "react";

import ChangeDocument from "./Settings/ChangeDocument";
import Reset from "./Settings/Reset";
import SyncInterval from "./Settings/SyncInterval";

class SettingsTab extends React.Component {
    render() {
        return (
            <div>
                <ChangeDocument />
                <SyncInterval />
                <Reset />
            </div>
        );
    }
}

export default SettingsTab;
