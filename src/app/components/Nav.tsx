import { has } from "lodash";
import * as React from "react";
import { connect } from "react-redux";

import * as Types from "../../common/types";
import TabsController from "./TabsController";
import KeyForm from "./forms/KeyForm";
import { settings } from "../instances";
import SettingsConstants from "../../common/constants/settings.constants";
import * as SettingsActions from "../redux/actions/settings.actions";

interface IMapStateToProps {
    settings: Types.ISettingsState;
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
        const { settings } = this.props;

        let view = null;
        if (
            has(settings, SettingsConstants.token) &&
            SettingsConstants.token !== null
        ) {
            view = <TabsController />;
        } else {
            view = <KeyForm />;
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
    return {
        settings: state.settingsStore
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
