const webpack = require("webpack");
const merge = require("webpack-merge");
const path = require("path");
const ErrorOverlayPlugin = require("error-overlay-webpack-plugin");
const CircularDependencyPlugin = require("circular-dependency-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const common = require("./webpack.common.js");
const env = require("./config/dev.env");

module.exports = merge(common, {
  entry: [
    "webpack-hot-middleware/client?reload=true", // hot reload
    path.join(process.cwd(), "src/index.js"), // Start with js/app.js
  ],
  mode: "development",
  devtool: "inline-source-map",
  plugins: [
    new webpack.DefinePlugin({
      "process.env": env,
    }),
    new MiniCssExtractPlugin({
      filename: "[name].css",
      chunkFilename: "[id].css",
    }),
    new ErrorOverlayPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new CircularDependencyPlugin({
      exclude: /a\.js|node_modules/, // exclude node_modules
      failOnError: false, // show a warning when there is a circular dependency
    }),
  ],
  // module: {
  //   rules: [
  //     {
  //       test: /\.(sa|sc|c)ss$/,
  //       use: [
  //         {
  //           loader: MiniCssExtractPlugin.loader,
  //           options: {
  //             publicPath: (resourcePath, context) => {
  //               // publicPath is the relative path of the resource to the context
  //               // e.g. for ./css/admin/main.css the publicPath will be ../../
  //               // while for ./css/main.css the publicPath will be ../
  //               return path.relative(path.dirname(resourcePath), context) + '/';
  //             },
  //             hmr: true,
  //             // if hmr does not work, this is a forceful method.
  //             reloadAll: false,
  //           },
  //         },
  //         "css-loader",
  //       ],
  //     },
  //   ],
  // },
});
