import * as React from "react";
import { Button, Card } from "@blueprintjs/core";

import text from "../../constants/text";
import * as MessengerActions from "../../../common/constants/messengeractions.constants";
import { messenger } from "../../instances";

class ActionsTab extends React.Component {
    handleMessage(msg: any) {
        console.log(msg);
    }

    handleClickUpload = () => {
        messenger.send("sync", {
            action: MessengerActions.SYNC_OVERWRITE_SERVER
        });
    };

    handleClickDownload = () => {
        messenger.send("sync", {
            action: MessengerActions.SYNC_OVERWRITE_LOCAL
        });
    };

    render() {
        const { buttons } = text.tabs.actions;

        return (
            <Card>
                <Button icon="refresh">{buttons.sync}</Button>
                <Button icon="arrow-up" onClick={this.handleClickUpload}>
                    {buttons.upload}
                </Button>
                <Button icon="arrow-down" onClick={this.handleClickDownload}>
                    {buttons.download}
                </Button>
            </Card>
        );
    }
}

export default ActionsTab;
