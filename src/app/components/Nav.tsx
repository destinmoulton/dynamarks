import * as _ from "lodash";
import * as React from "react";
import { connect } from "react-redux";

import Loading from "./shared/Loading";
import * as Types from "../../common/types";
import TabsController from "./TabsController";
import KeyForm from "./forms/KeyForm";
import SelectDoc from "./settings/SelectDoc";
import SetupInstallation from "./SetupInstallation";

import { SettingKeys } from "../../common/constants/settings.constants";
import * as SettingsActions from "../redux/actions/settings.actions";
import { settings } from "../instances";
import { getClassNamespace } from "@blueprintjs/core/lib/esm/common/classes";

interface IMapStateToProps {
    settingsState: Types.IStateSettings;
    isPopulated: boolean;
}

interface IMapDispatchToProps {
    settingsPopulate: () => void;
    settingsSet: (key: string, value: any) => void;
}

interface IProps {}

type TNavProps = IMapStateToProps & IMapDispatchToProps & IProps;
interface IState {}

class Nav extends React.Component<TNavProps, IState> {
    constructor(props: TNavProps) {
        super(props);

        this.state = {};

        // Add a setting listener to detect when a setting is changed
        // IMPORTANT!
        settings.addListener(this._handleSettingChanged);
    }

    async componentDidMount() {
        this.props.settingsPopulate();
    }

    private _handleSettingChanged = (changes: any, areaName: string) => {
        if (areaName === "local") {
            const changedKeys = _.keys(changes);
            for (let key of changedKeys) {
                if (_.has(SettingKeys, key)) {
                    this.props.settingsSet(key, changes[key].newValue);
                }
            }
        }
    };

    render() {
        const { settingsState, isPopulated } = this.props;

        let view = <Loading message="Loading data..." />;

        if (isPopulated) {
            if (
                _.has(settingsState, SettingKeys.token) &&
                settingsState[SettingKeys.token] !== null
            ) {
                if (settingsState[SettingKeys.doc] === null) {
                    view = <SelectDoc />;
                } else if (settingsState[SettingKeys.installationID] === null) {
                    view = <SetupInstallation />;
                } else {
                    view = <TabsController />;
                }
            } else {
                view = <KeyForm />;
            }
        }
        return (
            <div>
                <div id="dmks_addon_title">Dynamarks</div>
                {view}
            </div>
        );
    }
}

const mapStateToProps = (state: Types.IRootStoreState) => {
    const { settingsStore } = state;
    return {
        settingsState: settingsStore.settings,
        isPopulated: settingsStore.isPopulated
    };
};

const mapDispatchToProps = (dispatch: Types.IDispatch) => {
    return {
        settingsPopulate: () => dispatch(SettingsActions.populate()),
        settingsSet: (key: string, value: any) =>
            dispatch(SettingsActions.set(key, value))
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Nav);
