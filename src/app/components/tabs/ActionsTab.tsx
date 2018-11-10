import * as React from "react";
import { Button, Card } from "@blueprintjs/core";

import text from "../../constants/text";

class ActionsTab extends React.Component {
    handleMessage(msg: any) {
        console.log(msg);
    }

    render() {
        const { buttons } = text.tabs.actions;

        return (
            <Card>
                <Button icon="refresh">{buttons.sync}</Button>
                <Button icon="arrow-up">{buttons.upload}</Button>
                <Button icon="arrow-down">{buttons.download}</Button>
            </Card>
        );
    }
}

export default ActionsTab;
