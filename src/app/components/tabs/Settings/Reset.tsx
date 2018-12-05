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

class Reset extends React.Component<IMapDispatchToProps, IState> {
    private text = text.tabs.settings;
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
            <Button onClick={this.handleClick} text={this.text.reset.button} />
        );
    }

    private renderConfirm() {
        const msg = this.text.reset.confirmlines.map((line, idx) => {
            return <div key={idx}>{line}</div>;
        });
        return (
            <Confirm
                message={msg}
                okHandler={this.handleConfirmOk}
                cancelHandler={this.handleConfirmCancel}
            />
        );
    }
    render() {
        const { isConfirming } = this.state;
        let view = isConfirming ? this.renderConfirm() : this.renderButton();

        return (
            <Card className="dmks-settings-card" elevation={1}>
                <div>
                    <div className="dmks-settings-card-title">
                        <Icon
                            icon="delete"
                            intent="danger"
                            className="dmks-settings-card-icon"
                        />
                        {this.text.reset.title}
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
)(Reset);
