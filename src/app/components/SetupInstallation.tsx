import * as React from "react";

import Loading from "./shared/Loading";

import { messenger } from "../instances";
import * as MessengerActions from "../../common/constants/messengeractions.constants";
import * as Types from "../../common/types";

interface IProps {}

interface IState {
    isLoadingInstallations: boolean;
    installations: Types.IDBInstallation[];
}

class SetupInstallation extends React.Component<IProps, IState> {
    private topic = "db";
    constructor(props: IProps) {
        super(props);

        this.state = {
            isLoadingInstallations: true,
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

    private _handleDispatchMessages = async (packet: any) => {
        switch (packet.action) {
            case MessengerActions.DB_INSTALLATIONS_DATA:
                this.setState({
                    installations: packet.data,
                    isLoadingInstallations: false
                });
                return;
            default:
                return;
        }
    };

    componentDidMount() {
        this._requestInstallations();
    }

    private _viewListInstallations() {
        const { installations } = this.state;
        const items = installations.map(install => {
            return <li>{install.name}</li>;
        });
        return <ul>{items}</ul>;
    }

    render() {
        const { installations, isLoadingInstallations } = this.state;
        let view = <Loading message="Checking installation..." />;

        if (!isLoadingInstallations) {
            if (installations.length > 0) {
                view = this._viewListInstallations();
            } else {
                view = this._installationForm();
            }
        }

        return view;
    }
}

export default SetupInstallation;
