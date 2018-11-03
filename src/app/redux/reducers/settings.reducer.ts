import { keys } from "lodash";

import * as ActionTypes from "../actiontypes";
import settingsConstants from "../../../common/constants/settings.constants";

interface ISettingsState {
    [key: string]: any;
}

let initialState: ISettingsState = {};

keys(settingsConstants).forEach((key: string) => {
    initialState[key] = null;
});

function settingsReducer(state: ISettingsState = initialState, action: any) {
    switch (action.type) {
        case ActionTypes.SETTINGS_SET:
            return {
                ...state,
                [action.key]: action.value
            };
        default:
            return { ...state };
    }
}

export default settingsReducer;
