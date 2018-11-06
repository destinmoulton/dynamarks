import * as _ from "lodash";

import * as ActionTypes from "../actiontypes";
import * as Types from "../../../common/types";
import settingsConstants from "../../../common/constants/settings.constants";

let initialState: Types.ISettingsState = {};

_.values(settingsConstants).forEach((setting: string) => {
    initialState[setting] = null;
});

function settingsReducer(
    state: Types.ISettingsState = initialState,
    action: any
) {
    switch (action.type) {
        case ActionTypes.SETTINGS_SET_SINGLE:
            return {
                ...state,
                [action.key]: action.value
            };
        case ActionTypes.SETTINGS_NULLIFY_SINGLE:
            return {
                ...state,
                [action.key]: null
            };
        default:
            return { ...state };
    }
}

export default settingsReducer;
