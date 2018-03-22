/* global __dirname, require, module */

const webpack = require('webpack')

const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const path = require('path')
const env = require('yargs').argv.env // use --env with webpack 2
const pkg = require('./package.json')

const libraryName = pkg.name

let plugins = [],
  outputFile

if (env === 'build') {
  plugins.push(new UglifyJsPlugin())

  outputFile = `${libraryName}.min.js`
} else {
  outputFile = `${libraryName}.js`
}

const config = {
  entry: `${__dirname}/src/index.js`,
  devtool: 'source-map',
  target: 'node',
  output: {
    path: `${__dirname}/lib`,
    filename: outputFile,
    library: libraryName,
    libraryTarget: 'umd',
    umdNamedDefine: true
  },
  module: {
    rules: [
      {
        test: /(\.jsx|\.js)$/,
        loader: 'babel-loader',
        exclude: /(node_modules|bower_components)/
      }
    ]
  },
  resolve: {
    modules: [path.resolve('./node_modules'), path.resolve('./src')],
    extensions: ['.json', '.js']
  },
  plugins
}

module.exports = config
