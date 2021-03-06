import { createStore, combineReducers, applyMiddleware } from "redux";

import { createLogger } from "redux-logger";
import thunk from "redux-thunk";

import bookmarksReducer from "./reducers/bookmarks.reducer";
import settingsReducer from "./reducers/settings.reducer";

let middleware = applyMiddleware(thunk);

// if (storage.has("redux-debug") && storage.get("redux-debug") === "on") {
//     const logger = createLogger({
//         collapsed: true
//     });
//     middleware = applyMiddleware(thunk, logger);
// }

const store = createStore(
    combineReducers({
        bookmarksStore: bookmarksReducer,
        settingsStore: settingsReducer
    }),
    middleware
);

export default store;
