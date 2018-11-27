import * as _ from "lodash";

import * as ActionTypes from "../actiontypes";
import * as Types from "../../../common/types";
import { SettingKeys } from "../../../common/constants/settings.constants";

let initialSettings: Types.IStateSettings = {};
_.values(SettingKeys).forEach((setting: string) => {
    initialSettings[setting] = null;
});

let initialState: Types.IStateSettings = {
    settings: initialSettings,
    isPopulated: false
};

function settingsReducer(
    state: Types.IStateSettings = initialState,
    action: any
) {
    switch (action.type) {
        case ActionTypes.SETTINGS_SET_SINGLE: {
            let settings = _.cloneDeep(state.settings);
            settings[action.key] = action.value;
            return {
                ...state,
                settings
            };
        }
        case ActionTypes.SETTINGS_NULLIFY_SINGLE: {
            let settings = _.cloneDeep(state.settings);
            settings[action.key] = null;
            return {
                ...state,
                settings
            };
        }
        case ActionTypes.SETTINGS_POPULATION_COMPLETE:
            return {
                ...state,
                isPopulated: true
            };
        case ActionTypes.SETTINGS_RESET:
            return {
                ...initialState
            };
        default:
            return { ...state };
    }
}

export default settingsReducer;
