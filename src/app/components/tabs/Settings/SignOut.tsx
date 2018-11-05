import * as React from "react";

import { Button, Card } from "@blueprintjs/core";
import Confirm from "../../shared/Confirm";
import text from "../../../constants/text";

interface IProps {}

interface IState {
    isConfirming: boolean;
}

class SignOut extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);

        this.state = {
            isConfirming: false
        };
    }

    private handleClick = () => {
        this.setState({
            isConfirming: true
        });
    };

    private handleConfirmCancel = () => {
        console.log("CONFIRM CANCEL");
        this.setState({
            isConfirming: false
        });
    };

    private handleConfirmOk = () => {
        console.log("CONFIRM OK");
    };

    private renderButton() {
        return (
            <Button
                onClick={this.handleClick}
                text={text.tabs.settings.buttons.clear}
            />
        );
    }

    private renderConfirm() {
        return (
            <Confirm
                message={text.tabs.settings.clear.message}
                okHandler={this.handleConfirmOk}
                cancelHandler={this.handleConfirmCancel}
            />
        );
    }
    render() {
        const { isConfirming } = this.state;
        let view = isConfirming ? this.renderConfirm() : this.renderButton();

        return <Card>{view}</Card>;
    }
}

export default SignOut;
