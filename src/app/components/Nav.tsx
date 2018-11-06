import * as _ from "lodash";
import * as React from "react";
import { connect } from "react-redux";

import Loading from "./shared/Loading";
import * as Types from "../../common/types";
import TabsController from "./TabsController";
import KeyForm from "./forms/KeyForm";
import SelectDoc from "./settings/SelectDoc";

import { SettingKeys } from "../../common/constants/settings.constants";
import * as SettingsActions from "../redux/actions/settings.actions";

interface IMapStateToProps {
    settings: Types.ISettingsState;
    isPopulated: boolean;
}

interface IMapDispatchToProps {
    settingsPopulate: () => void;
}

interface IProps {}

type TNavProps = IMapStateToProps & IMapDispatchToProps & IProps;
interface IState {}
class Nav extends React.Component<TNavProps, IState> {
    constructor(props: TNavProps) {
        super(props);

        this.state = {};
    }

    componentDidMount() {
        this.props.settingsPopulate();
    }

    render() {
        const { settings, isPopulated } = this.props;

        let view = <Loading message="Loading data..." />;

        if (isPopulated) {
            if (
                _.has(settings, SettingKeys.token) &&
                settings[SettingKeys.token] !== null
            ) {
                if (settings[SettingKeys.doc] === null) {
                    view = <SelectDoc />;
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
        settings: settingsStore.settings,
        isPopulated: settingsStore.isPopulated
    };
};

const mapDispatchToProps = (dispatch: Types.IDispatch) => {
    return {
        settingsPopulate: () => dispatch(SettingsActions.populate())
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Nav);
