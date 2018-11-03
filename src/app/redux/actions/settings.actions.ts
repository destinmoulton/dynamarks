import * as ActionTypes from "../actiontypes";

export function set(key: string, value: any) {
    return {
        type: ActionTypes.SETTINGS_SET,
        key,
        value
    };
}
