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
import { settings } from "../instances";

interface IMapStateToProps {
    settingsState: Types.ISettingsState;
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

    async componentDidMount() {
        this.props.settingsPopulate();
    }

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
        settingsPopulate: () => dispatch(SettingsActions.populate())
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Nav);
