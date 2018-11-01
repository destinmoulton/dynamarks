import * as React from "react";

import { Button, Card } from "@blueprintjs/core";

import * as bmk from "../../lib/bookmarks";

import text from "../../text";

class ActionsPanel extends React.Component {
    async render() {
        const { buttons } = text.panels.actions;

        const bmks = await bmk.getAll();
        console.log(bmks);
        return (
            <Card>
                <Button icon="refresh">{buttons.sync}</Button>
                <Button icon="arrow-up">{buttons.upload}</Button>
                <Button icon="arrow-down">{buttons.download}</Button>
            </Card>
        );
    }
}

export default ActionsPanel;
