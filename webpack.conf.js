const path = require('path');
const webpack = require('webpack');

module.exports = {
    entry: './graphito.js',
    output: {
        path: path.resolve(__dirname, 'lib'),
        filename: 'graphito.js'
    },
    module: {
        rules: [
            { test: /\.js$/, exclude: /node_modules/, loader: "babel-loader" }
        ],
    },
    plugins: [
        new webpack.NormalModuleReplacementPlugin(
          /\/iconv-loader$/, 'node-noop',
        )
    ]
};