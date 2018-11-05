import * as React from "react";

import { Card } from "@blueprintjs/core";
import SignOut from "./Settings/SignOut";

import text from "../../constants/text";
class SettingsTab extends React.Component {
    render() {
        return (
            <div>
                <SignOut />
            </div>
        );
    }
}

export default SettingsTab;
