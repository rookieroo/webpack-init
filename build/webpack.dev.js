const webpack = require("webpack");
const merge = require("webpack-merge");
const path = require("path");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

const HtmlWebpackPlugin = require("html-webpack-plugin");
const ErrorOverlayPlugin = require("error-overlay-webpack-plugin");
const CircularDependencyPlugin = require("circular-dependency-plugin");

const common = require("./webpack.common.js");

module.exports = merge(common, {
  entry: [
    "webpack-hot-middleware/client?reload=true", // hot reload
    path.join(process.cwd(), "src/index.js"), // Start with js/app.js
  ],
  mode: "development",
  devtool: "inline-source-map",
  plugins: [
    new CleanWebpackPlugin(),
    new ErrorOverlayPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      title: "webpack init",
      template: "index.html",
    }),
    new CircularDependencyPlugin({
      exclude: /a\.js|node_modules/, // exclude node_modules
      failOnError: false, // show a warning when there is a circular dependency
    }),
  ],
});
