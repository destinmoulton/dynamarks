import * as React from "react";

import { Button } from "@blueprintjs/core";

interface IProps {
    message: string;
    okHandler: () => void;
    cancelHandler: () => void;
}
const Confirm = (props: IProps) => {
    const { message, okHandler, cancelHandler } = props;
    return (
        <div>
            <div className="dmks-confirm-message-container">{message}</div>
            <div className="dmks-confirm-button-container">
                <div className="dmks-confirm-cancel-button-container">
                    <Button
                        onClick={cancelHandler}
                        icon="cross"
                        text="Cancel"
                    />
                </div>
                <div className="dmks-confirm-ok-button-container">
                    <Button
                        onClick={okHandler}
                        rightIcon="tick"
                        intent="success"
                        text="OK"
                    />
                </div>
                <div className="clear" />
            </div>
        </div>
    );
};

export default Confirm;
