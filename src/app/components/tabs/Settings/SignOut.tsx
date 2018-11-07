import * as React from "react";
import { connect } from "react-redux";

import { Button, Card, Icon } from "@blueprintjs/core";
import Confirm from "../../shared/Confirm";
import text from "../../../constants/text";
import * as Types from "../../../../common/types";
import * as SettingsActions from "../../../redux/actions/settings.actions";

interface IMapDispatchToProps {
    settingsClearAll: () => void;
}

interface IState {
    isConfirming: boolean;
}

class SignOut extends React.Component<IMapDispatchToProps, IState> {
    constructor(props: IMapDispatchToProps) {
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
        this.setState({
            isConfirming: false
        });
    };

    private handleConfirmOk = () => {
        this.setState({
            isConfirming: false
        });

        this.props.settingsClearAll();
    };

    private renderButton() {
        return (
            <Button
                onClick={this.handleClick}
                text={text.tabs.settings.clear.button}
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

        return (
            <Card>
                <div>
                    <div className="dmks-settings-card-title">
                        <Icon icon="delete" intent="danger" />
                        <span>{"  "}</span>
                        {text.tabs.settings.clear.title}
                    </div>
                    {view}
                </div>
            </Card>
        );
    }
}

const mapStateToProps = () => {
    return {};
};

const mapDispatchToProps = (dispatch: Types.IDispatch) => {
    return {
        settingsClearAll: () => {
            dispatch(SettingsActions.clearAll());
        }
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SignOut);
