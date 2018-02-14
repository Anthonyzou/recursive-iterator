'use strict'

// http://webpack.github.io/docs/
const webpack = require('webpack')
// https://webpack.js.org/plugins/uglifyjs-webpack-plugin/
const UglifyJSPlugin = require('uglifyjs-webpack-plugin')
const path = require('path')

const pkg = require('./package.json')

const ENTRY_POINT = './src/RecursiveIterator.ts'
const LIBRARY_NAME = 'RecursiveIterator'

module.exports = {
  entry: {
    [pkg.name]: ENTRY_POINT,
    [pkg.name + '.min']: ENTRY_POINT
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/
      }
    ]
  },
  resolve: {
    // Add `.ts` and `.tsx` as a resolvable extension.
    extensions: ['.ts', '.tsx', '.js']
  },
  devtool: 'source-map',
  output: {
    path: path.join(__dirname, 'dist'),
    libraryTarget: 'umd',
    library: LIBRARY_NAME,
    filename: '[name].js'
  },
  plugins: [
    new UglifyJSPlugin({
      // Minify only [name].min.js file
      // http://stackoverflow.com/a/34018909
      include: /\.min\.js$/
    }),
    new webpack.BannerPlugin(
      `${pkg.name} v${pkg.version}\n` + `${pkg.homepage}`
    )
  ]
}
