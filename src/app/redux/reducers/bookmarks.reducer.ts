import moment, { Moment } from "moment";

import * as Types from "../../../common/types";

const INITIAL_STATE: Types.IStateBookmarks = {
    lastSync: null
};

function entriesReducer(state = INITIAL_STATE, action: any) {
    switch (action.type) {
        default:
            return { ...state };
    }
}

export default entriesReducer;
