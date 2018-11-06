import * as React from "react";

import ChangeDocument from "./Settings/ChangeDocument";
import SignOut from "./Settings/SignOut";

class SettingsTab extends React.Component {
    render() {
        return (
            <div>
                <ChangeDocument />
                <SignOut />
            </div>
        );
    }
}

export default SettingsTab;
