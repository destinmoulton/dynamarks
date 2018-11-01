import * as React from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";

import store from "./redux/store";
import ErrorBoundary from "./components/ErrorBoundary";
import Nav from "./components/Nav";

class App {
    run() {
        console.log("running app");
        const container = document.getElementById("react-app");

        const routing = (
            <ErrorBoundary>
                <Provider store={store}>
                    <Nav />
                </Provider>
            </ErrorBoundary>
        );

        render(routing, container);
    }
}

const app = new App();
app.run();
