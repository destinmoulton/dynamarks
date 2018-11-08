import * as _ from "lodash";
import * as React from "react";
import { connect } from "react-redux";

import { Button, Card, Icon } from "@blueprintjs/core";

import text from "../../../constants/text";
import * as Types from "../../../../common/types";
import * as SettingsActions from "../../../redux/actions/settings.actions";
import { SettingKeys } from "../../../../common/constants/settings.constants";

interface IMapStateToProps {
    settingInterval: number;
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

    private handleChangeInput = (evt: any) => {
        const newInterval = evt.target.value;

        this.props.settingSet(SettingKeys.interval, newInterval);
    };

    private domOptions() {
        return _.range(5, 60).map(number => {
            return (
                <option key={number} value={number}>
                    {number.toString()}
                </option>
            );
        });
    }

    private domSelect() {
        const options = this.domOptions();
        const { settingInterval } = this.props;
        return (
            <div>
                <select
                    value={settingInterval}
                    onChange={this.handleChangeInput}
                >
                    {options}
                </select>
                <span>
                    {"   "}
                    Minutes
                </span>
            </div>
        );
    }

    render() {
        let view = this.domSelect();

        return (
            <Card className="dmks-settings-card" elevation={1}>
                <div>
                    <div className="dmks-settings-card-title">
                        <Icon icon="time" className="dmks-settings-card-icon" />
                        {text.tabs.settings.syncinterval.title}
                    </div>
                    {view}
                </div>
            </Card>
        );
    }
}

const mapStateToProps = (state: Types.IRootStoreState) => {
    const { settings } = state.settingsStore;
    return {
        settingInterval: settings[SettingKeys.interval]
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
