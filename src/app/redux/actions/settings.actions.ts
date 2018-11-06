import * as _ from "lodash";

import * as ActionTypes from "../actiontypes";
import * as Types from "../../../common/types";
import SettingsConstants from "../../../common/constants/settings.constants";
import { settings } from "../../instances";

export function set(key: string, value: any) {
    return (dispatch: Types.IDispatch) => {
        settings.set(key, value).then(() => {
            dispatch(setSingle(key, value));
        });
    };
}

function setSingle(key: string, value: any) {
    return {
        type: ActionTypes.SETTINGS_SET_SINGLE,
        key,
        value
    };
}

function nullifySingle(key: string) {
    return {
        type: ActionTypes.SETTINGS_NULLIFY_SINGLE,
        key
    };
}

export function remove(key: string) {
    return (dispatch: Types.IDispatch) => {
        settings.remove(key).then(() => {
            dispatch(nullifySingle(key));
        });
    };
}

// Populate the settings from storage
export function populate() {
    return (dispatch: Types.IDispatch) => {
        _.values(SettingsConstants).forEach((settingName: string) => {
            settings.get(settingName).then(setting => {
                if (!_.isEmpty(setting)) {
                    dispatch(setSingle(settingName, setting));
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
                return dispatch(nullifySingle(settingName));
            });
        });
    };
}
