const os = require("os");
const path = require("path");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const babelOption = require("../babel.config");

module.exports = async function getCommonConfig(option) {
  return {
    mode: "development",
    devtool: "cheap-module-source-map",
    output: {
      filename: "js/[name].js",
      path: path.resolve(process.cwd(), "dist"),
      library: "[name]",
      libraryTarget: "umd",
      libraryExport: "default",
    },
    resolve: {
      extensions: [".ts", ".tsx", ".js", ".json"],
      alias: {
        "~": path.join(process.cwd(), "src")
      },
    },
    target: ["web", "es5"],
    module: {
      rules: [
        {
          test: /\.(js|ts)$/,
          exclude:
            /node_modules(?!(\/|\\)regenerator-runtime|strip-ansi|ansi-regex).*/,
          use: [
            {
              loader: "thread-loader",
              options: {
                workers: os.cpus().length - 1,
              },
            },
            {
              loader: "babel-loader",
              options: babelOption,
            },
          ],
        },
        // html
        {
          test: /\.html$/,
          exclude: /(node_modules|dist|build)/,
          loader: "html-loader",
        },
      ],
    },
    plugins: [
      new CopyWebpackPlugin({
        patterns: [
          {
            from: "src/types/**/*",
            to({ context, absoluteFilename }) {
              return "./types/[name][ext]";
            },
            force: true,
          },
        ],
      })
    ],
  };
};
