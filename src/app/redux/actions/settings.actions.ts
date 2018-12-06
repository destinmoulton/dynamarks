import * as _ from "lodash";

import * as ActionTypes from "../actiontypes";
import * as MessengerActions from "../../../common/constants/messengeractions.constants";
import * as Types from "../../../common/types";
import {
    SettingDefaults,
    SettingKeys
} from "../../../common/constants/settings.constants";
import { messenger, settings } from "../../instances";

export function set(key: string, value: any) {
    return (dispatch: Types.IDispatch) => {
        return settings.set(key, value).then(() => {
            // Notify the kernel of setting set
            messenger.send("settings", {
                action: MessengerActions.SETTINGS_CHANGE,
                payload: key
            });

            return dispatch(setSingle(key, value));
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
        return settings.remove(key).then(() => {
            dispatch(nullifySingle(key));
        });
    };
}

function reset() {
    return {
        type: ActionTypes.SETTINGS_RESET
    };
}

function populationComplete() {
    return {
        type: ActionTypes.SETTINGS_POPULATION_COMPLETE
    };
}

// Populate the settings from storage (or default)
export function populate() {
    return async (dispatch: Types.IDispatch) => {
        await settings.debug();
        for (let key of _.keys(SettingKeys)) {
            const settingName = SettingKeys[key];
            const isSet = await settings.exists(settingName);
            if (isSet) {
                console.log("setting IS set", settingName);
                const setting = await settings.get(settingName);
                dispatch(setSingle(settingName, setting));
            } else if (SettingDefaults[key] !== null) {
                dispatch(set(settingName, SettingDefaults[key]));
            }
        }
        dispatch(populationComplete());
    };
}

// Clear all settings
export function clearAll() {
    return (dispatch: Types.IDispatch) => {
        return settings.clearAll().then(() => {
            return dispatch(reset());
        });
    };
}
