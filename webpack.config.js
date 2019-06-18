const fs = require("fs-extra");
const path = require("path");
const webpack = require("webpack");
const nodeExternals = require("webpack-node-externals");
const CleanWebpackPlugin = require("clean-webpack-plugin");

console.log("NODE_ENV:" + process.env.NODE_ENV);
const mode =
  process.env.NODE_ENV === "production" ? "production" : "development";
const isDevMode = mode === "development";
const prodEntries = {
  sfs: ["./src/index.ts"]
};

const outDir = "dist";
let entries = isDevMode
  ? {
      ...prodEntries,
      sfs: [
        "webpack/hot/poll?1000",
        "./src/index.ts"
      ]
    }
  : prodEntries;

fs.removeSync(path.resolve(__dirname, outDir));

module.exports = {
  target: "node",
  mode,
  node: {
    __dirname: false,
    __filename: false
  },
  context: __dirname,
  entry: entries,
  externals: [
    nodeExternals({
      whitelist: ["webpack/hot/poll?1000"]
    })
  ],
  devtool: "source-map",
  devServer: {
    hot: true,
    contentBase: path.resolve(__dirname),
    publicPath: "/"
  },
  resolve: {
    extensions: [".ts", ".js"],
    alias: {
      "@config": path.resolve(__dirname, "./src/config"),
      "@components": path.resolve(__dirname, "./src/components")
    }
  },
  plugins: [
    ...(isDevMode ? [] : [new CleanWebpackPlugin()]),
    new webpack.DefinePlugin({
      VERSION: JSON.stringify(require("./package.json").version)
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.NamedModulesPlugin(),
  ],
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: "ts-loader",
        exclude: /node_modules/
      },
      {
        enforce: "pre",
        test: /\.(ts)$/,
        loader: "tslint-loader",
        exclude: /(node_modules)/
      }
    ]
  },
  output: {
    filename: "[name].js",
    path: path.resolve(__dirname, outDir),
    devtoolModuleFilenameTemplate: function(info) {
      return path.resolve(__dirname, encodeURI(info.resourcePath));
    },
    library: "[name]",
    libraryTarget: "umd"
  }
};
