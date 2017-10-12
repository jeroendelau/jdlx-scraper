const webpack = require('webpack');
const UglifyJsPlugin = webpack.optimize.UglifyJsPlugin;
const path = require('path');
const env = require('yargs').argv.env; // use --env with webpack 2

const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

var plugins = [];

var libraryName = "jdlx-scraper";
var outputFile = libraryName;

if (env === 'build') {
  plugins.push(new UglifyJsPlugin({ minimize: true }));
  outputFile += '.min.js';
} else {
  outputFile += '.js';
}


module.exports = {
    entry: "./src/jdlx-scraper.js",
    devtool: 'source-map',
    output: {
        path: __dirname + "/dist",
        filename: outputFile,
        library: libraryName,
        libraryTarget: 'umd',
        umdNamedDefine: true
    },
    module: {
        loaders: [
          {
            test: /(\.jsx|\.js)$/,
            loader: 'babel-loader',
            exclude: /(node_modules|bower_components)/
          },
           {
        test: /(\.jsx|\.js)$/,
        loader: "eslint-loader",
        exclude: /node_modules/
      }
        ]
  },
  plugins: plugins
};