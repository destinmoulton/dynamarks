import * as React from "react";
import { connect } from "react-redux";

import { Button, Card, Icon } from "@blueprintjs/core";

import text from "../../../constants/text";
import * as Types from "../../../../common/types";
import * as SettingsActions from "../../../redux/actions/settings.actions";
import { SettingKeys } from "../../../../common/constants/settings.constants";

interface IMapStateToProps {
    settings: Types.ISettingsState;
}

interface IMapDispatchToProps {
    settingSet: (key: string, value: string) => void;
}

type TProps = IMapStateToProps & IMapDispatchToProps;

interface IState {}

class SyncInterval extends React.Component<TProps, IState> {
    constructor(props: TProps) {
        super(props);

        this.state = {};
    }

    private handleChangeInput(evt: any) {
        console.log(evt.target.value);
    }

    private renderInput() {
        const { settings } = this.props;
        return (
            <div>
                <div className="dmks-settings-card-title">
                    <Icon icon="time" />
                    {text.tabs.settings.syncinterval.title}
                </div>
                <input
                    type="text"
                    onChange={this.handleChangeInput}
                    value={settings[SettingKeys.interval]}
                />
            </div>
        );
    }

    render() {
        const view = this.renderInput();
        return <Card>{view}</Card>;
    }
}

const mapStateToProps = (state: Types.IRootStoreState) => {
    const { settings } = state.settingsStore;
    return {
        settings
    };
};

const mapDispatchToProps = (dispatch: Types.IDispatch) => {
    return {
        settingSet: (key: string, value: string) =>
            dispatch(SettingsActions.set(key, value))
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SyncInterval);
