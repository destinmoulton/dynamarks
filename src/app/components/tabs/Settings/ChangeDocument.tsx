import * as React from "react";
import { connect } from "react-redux";

import { Button, Card, Icon } from "@blueprintjs/core";
import Confirm from "../../shared/Confirm";
import text from "../../../constants/text";
import * as Types from "../../../../common/types";
import * as SettingsActions from "../../../redux/actions/settings.actions";
import { SettingKeys } from "../../../../common/constants/settings.constants";

interface IMapStateToProps {
    settingsStore: Types.IStateSettings;
}

interface IMapDispatchToProps {
    settingRemove: (key: string) => void;
}

type TProps = IMapStateToProps & IMapDispatchToProps;

interface IState {
    isConfirming: boolean;
}

class ChangeDocument extends React.Component<TProps, IState> {
    constructor(props: TProps) {
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
        this.props.settingRemove(SettingKeys.doc);
    };

    private renderOption() {
        const { settingsStore } = this.props;
        const doc = settingsStore.settings[SettingKeys.doc];

        return (
            <div>
                <div className="dmks-settings-card-title">
                    <Icon icon="document" className="dmks-settings-card-icon" />
                    {text.tabs.settings.changedocument.title}
                </div>
                <div className="">{doc.title}</div>
                <Button
                    onClick={this.handleClick}
                    text={text.tabs.settings.changedocument.button}
                />
            </div>
        );
    }

    private renderConfirm() {
        return (
            <Confirm
                message={text.tabs.settings.changedocument.confirm}
                okHandler={this.handleConfirmOk}
                cancelHandler={this.handleConfirmCancel}
            />
        );
    }
    render() {
        const { isConfirming } = this.state;
        let view = isConfirming ? this.renderConfirm() : this.renderOption();

        return (
            <Card className="dmks-settings-card" elevation={1}>
                {view}
            </Card>
        );
    }
}

const mapStateToProps = (state: Types.IRootStoreState) => {
    return {
        settingsStore: state.settingsStore
    };
};

const mapDispatchToProps = (dispatch: Types.IDispatch) => {
    return {
        settingRemove: (key: string) => dispatch(SettingsActions.remove(key))
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ChangeDocument);
