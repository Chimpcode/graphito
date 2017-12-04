const path = require('path');
const webpack = require('webpack');

module.exports = {
    entry: './graphito.js',
    output: {
        path: path.resolve(__dirname, 'lib'),
        filename: 'graphito.js'
    },
    plugins: [
        new webpack.NormalModuleReplacementPlugin(
          /\/iconv-loader$/, 'node-noop',
        )
    ]
};