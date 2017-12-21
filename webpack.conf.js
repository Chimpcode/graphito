const path = require('path')
const webpack = require('webpack')

module.exports = {
  entry: './graphito.js',
  output: {
    path: path.resolve(__dirname, 'lib'),
    filename: 'graphito.js',
    libraryTarget: 'umd',
    library: 'graphito',
    umdNamedDefine: true
  },
  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'eslint-loader',
        options: {
          formatter: require('eslint-friendly-formatter'),
          emitWarning: true
        }
      },
            { test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader' }
    ]
  },
  plugins: [
    new webpack.NormalModuleReplacementPlugin(
          /\/iconv-loader$/, 'node-noop'
        )
  ]
}
