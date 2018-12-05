import * as React from "react";
import { Button, FormGroup, InputGroup } from "@blueprintjs/core";
import * as platform from "platform";

import * as MessengerActions from "../../../common/constants/messengeractions.constants";
import { messenger } from "../../instances";
import Messenger from "../../../common/messenger";

interface IProps {
    cancelHandler: (evt: any) => void;
}
interface IState {
    os: string;
    browser: string;
    name: string;
}
class InstallationForm extends React.Component<IProps, IState> {
    topic = "db";

    constructor(props: IProps) {
        super(props);

        this.state = {
            os: platform.os.family.toString(),
            browser: platform.name.toString(),
            name: platform.os.family.toString() + " " + platform.name.toString()
        };
    }

    private _onChange(name: string, evt: React.FormEvent<HTMLInputElement>) {
        let obj: any = {};
        obj[name] = evt.currentTarget.value;
        this.setState(obj);
    }

    private _okHandler = async (evt: any) => {
        const { os, browser, name } = this.state;
        const packet = {
            action: MessengerActions.DB_ADD_INSTALLATION,
            payload: {
                os,
                browser,
                name
            }
        };
        await messenger.send(this.topic, packet);
    };

    render() {
        const { os, browser, name } = this.state;
        return (
            <div>
                <h3>ID For This Installation</h3>
                <FormGroup label="OS">
                    <InputGroup
                        type="text"
                        value={os}
                        onChange={this._onChange.bind(this, "os")}
                    />
                </FormGroup>
                <FormGroup label="Browser">
                    <InputGroup
                        type="text"
                        value={browser}
                        onChange={this._onChange.bind(this, "browser")}
                    />
                </FormGroup>
                <FormGroup label="Name">
                    <InputGroup
                        type="text"
                        value={name}
                        onChange={this._onChange.bind(this, "name")}
                    />
                </FormGroup>
                <div className="dmks-confirm-button-container">
                    <div className="dmks-confirm-cancel-button-container">
                        <Button
                            onClick={this.props.cancelHandler}
                            icon="cross"
                            text="Cancel"
                        />
                    </div>
                    <div className="dmks-confirm-ok-button-container">
                        <Button
                            onClick={this._okHandler}
                            rightIcon="tick"
                            intent="success"
                            text="OK"
                        />
                    </div>
                    <div className="clear" />
                </div>
            </div>
        );
    }
}

export default InstallationForm;
