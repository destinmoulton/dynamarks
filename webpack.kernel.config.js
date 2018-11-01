var path = require("path");
var webpack = require("webpack");

/**
 * KERNEL CONFIG
 */
module.exports = {
    entry: "./src/kernel/kernel.ts",
    output: {
        path: path.join(__dirname, "dist", "app"),
        filename: "kernel.js"
    },
    devtool: "source-map",
    resolve: {
        // Add '.ts' as resolvable extension
        extensions: [".ts", ".js", ".json"]
    },
    module: {
        rules: [
            // All files with a '.ts' will be handled by ts-loader
            { test: /\.ts$/, loader: "ts-loader" },

            // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
            { enforce: "pre", test: /\.js$/, loader: "source-map-loader" }
        ]
    }
    // When importing a module whose path matches one of the following, just
    // assume a corresponding global variable exists and use that instead.
    // This is important because it allows us to avoid bundling all of our
    // dependencies, which allows browsers to cache those libraries between builds.
    // externals: {
    //     react: "React",
    //     "react-dom": "ReactDOM",
    //     immutable: "Immutable",
    //     moment: "moment",
    //     "semantic-ui-react": "semanticUIReact"
    // }
};
