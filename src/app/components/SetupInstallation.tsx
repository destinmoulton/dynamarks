import * as React from "react";
import { Button } from "@blueprintjs/core";
import platform from "platform";

import Loading from "./shared/Loading";
import InstallationForm from "./forms/InstallationForm";
import { messenger } from "../instances";
import * as MessengerActions from "../../common/constants/messengeractions.constants";
import * as Types from "../../common/types";

interface IProps {}

interface IState {
    isLoadingInstallations: boolean;
    isNewInstall: boolean;
    installations: Types.IDBInstallation[];
}

class SetupInstallation extends React.Component<IProps, IState> {
    private topic = "db";
    constructor(props: IProps) {
        super(props);

        this.state = {
            isLoadingInstallations: true,
            isNewInstall: false,
            installations: []
        };

        messenger.subscribe(this.topic, this._handleDispatchMessages);
    }

    private _requestInstallations() {
        const packet = {
            action: MessengerActions.DB_GET_INSTALLATIONS
        };
        messenger.send(this.topic, packet);
    }

    private _handleDispatchMessages = async (packet: Types.IMessage) => {
        switch (packet.action) {
            case MessengerActions.DB_INSTALLATIONS_DATA:
                this.setState({
                    installations: packet.payload,
                    isLoadingInstallations: false
                });
                return;
            default:
                return;
        }
    };

    private _handleClickNewInstall = (evt: any) => {
        this.setState({
            isNewInstall: true
        });
    };

    private _handleCancelNewInstall = (evt: any) => {
        this.setState({
            isNewInstall: false
        });
    };

    private _handleClickCurrentInstall(installationID: string) {
        const packet = {
            action: MessengerActions.DB_SET_CURRENT_INSTALLATION,
            payload: { installationID }
        };
        messenger.send(this.topic, packet);
    }

    componentDidMount() {
        this._requestInstallations();
    }

    private _viewListInstallations() {
        const { installations } = this.state;

        const items = installations.map((install, idx) => {
            return (
                <li
                    className="dmks-listlinks-item"
                    key={idx}
                    onClick={this._handleClickCurrentInstall.bind(
                        this,
                        install.id
                    )}
                >
                    {install.name}
                </li>
            );
        });
        return (
            <div>
                <h3>Existing Installation?</h3>
                <p>Choose an existing installation or create a new one.</p>
                <ul className="dmks-listlinks">{items}</ul>
                <Button onClick={this._handleClickNewInstall}>
                    New Installation
                </Button>
            </div>
        );
    }

    render() {
        const {
            installations,
            isLoadingInstallations,
            isNewInstall
        } = this.state;
        let view = <Loading message="Checking installation..." />;

        if (!isLoadingInstallations) {
            if (installations.length > 0 && !isNewInstall) {
                view = this._viewListInstallations();
            } else {
                view = (
                    <InstallationForm
                        cancelHandler={this._handleCancelNewInstall}
                    />
                );
            }
        }

        return view;
    }
}

export default SetupInstallation;
