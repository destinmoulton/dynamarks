import * as React from "react";

import { Tab, Tabs } from "@blueprintjs/core";

import AboutPanel from "./panels/AboutPanel";
import ActionsPanel from "./panels/ActionsPanel";

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
        const { tabs, selectedIndex } = this.state;
        return (
            <Tabs animate={true}>
                <Tab id="actions" title="Actions" panel={<ActionsPanel />} />
                <Tab id="about" title="About" panel={<AboutPanel />} />
                <Tabs.Expander />
            </Tabs>
        );
    }
}

export default TabController;
