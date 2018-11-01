import * as React from "react";

import { Button, Card } from "@blueprintjs/core";

import * as localbookmarks from "../../lib/localbookmarks";

import text from "../../constants/text";
import bookmarkids from "../../constants/bookmarkids";

class ActionsPanel extends React.Component {
    async componentDidMount() {
        const bmks = await localbookmarks.pluckById(bookmarkids.menu);
        console.log(bmks);
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

export default ActionsPanel;
