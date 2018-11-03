import * as React from "react";

import { Tab, Tabs } from "@blueprintjs/core";

import TabsController from "./TabsController";
import KeyPanel from "./panels/KeyPanel";
import { settings } from "../instances";

interface IProps {}
interface IState {
    keyIsSet: boolean;
}
class Nav extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);

        this.state = {
            keyIsSet: false
        };
    }

    async componentDidMount() {
        // Check if dynalist key is set
        const isKey = await settings.exists("dynalist_key");
        this.setState({
            keyIsSet: isKey
        });
    }

    render() {
        const { keyIsSet } = this.state;
        let view = null;
        if (!keyIsSet) {
            view = <KeyPanel />;
        } else {
            view = <TabsController />;
        }
        return (
            <div>
                <div id="dmks_addon_title">Dynamarks</div>
                {view}
            </div>
        );
    }
}

export default Nav;
