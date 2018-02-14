"use strict";

// http://webpack.github.io/docs/
const webpack = require("webpack");
// https://webpack.js.org/plugins/uglifyjs-webpack-plugin/
const UglifyJSPlugin = require("uglifyjs-webpack-plugin");

const pkg = require("./package.json");

const ENTRY_POINT = "./src/RecursiveIterator.ts";
const LIBRARY_NAME = "RecursiveIterator";

module.exports = {
  entry: {
    [pkg.name]: ENTRY_POINT,
    [pkg.name + ".min"]: ENTRY_POINT
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/
      }
    ]
  },
  devtool: "source-map",
  output: {
    path: __dirname + "/dist",
    libraryTarget: "umd",
    library: LIBRARY_NAME,
    filename: "[name].js"
  },
  plugins: [
    new UglifyJSPlugin({
      // Minify only [name].min.js file
      // http://stackoverflow.com/a/34018909
      // include: /\.min\.js$/
    }),
    new webpack.BannerPlugin(
      `${pkg.name} v${pkg.version}\n` + `${pkg.homepage}`
    )
  ]
};
