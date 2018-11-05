import * as React from "react";
import { Button, Card } from "@blueprintjs/core";

import text from "../../constants/text";
import { dispatcher, kernelmessenger } from "../../instances";

class ActionsTab extends React.Component {
    async componentDidMount() {
        dispatcher.subscribe("status", this.handleMessage);
        kernelmessenger.send({
            topic: "status",
            action: "get"
        });
    }

    handleMessage(msg: any) {
        console.log(msg);
    }

    render() {
        const { buttons } = text.panels.actions;

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
