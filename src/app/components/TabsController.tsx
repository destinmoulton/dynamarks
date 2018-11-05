import * as React from "react";

import { Tab, Tabs } from "@blueprintjs/core";

import AboutTab from "./tabs/AboutTab";
import ActionsTab from "./tabs/ActionsTab";
import SettingsTab from "./tabs/SettingsTab";

interface IProps {}
interface IState {
    selectedIndex: number;
    tabs: string[];
}
class TabController extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);

        this.state = {
            selectedIndex: 0,
            tabs: ["Tags", "About"]
        };
    }

    render() {
        return (
            <Tabs animate={true}>
                <Tab id="actions" title="Actions" panel={<ActionsTab />} />
                <Tab id="settings" title="Settings" panel={<SettingsTab />} />
                <Tab id="about" title="About" panel={<AboutTab />} />
                <Tabs.Expander />
            </Tabs>
        );
    }
}

export default TabController;
