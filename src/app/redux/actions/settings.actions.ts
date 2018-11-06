import * as _ from "lodash";

import * as ActionTypes from "../actiontypes";
import * as Types from "../../../common/types";
import SettingsConstants from "../../../common/constants/settings.constants";
import { settings } from "../../instances";

export function set(key: string, value: any) {
    return {
        type: ActionTypes.SETTINGS_SET,
        key,
        value
    };
}

// Populate the settings from storage
export function populate() {
    return (dispatch: Types.IDispatch) => {
        _.values(SettingsConstants).forEach((settingName: string) => {
            settings.get(settingName).then(setting => {
                if (!_.isEmpty(setting)) {
                    dispatch(set(settingName, setting));
                }
            });
        });
    };
}

// Clear all settings
export function clearAll() {
    return (dispatch: Types.IDispatch) => {
        _.values(SettingsConstants).forEach((settingName: string) => {
            return settings.remove(settingName).then(() => {
                return dispatch(set(settingName, null));
            });
        });
    };
}
