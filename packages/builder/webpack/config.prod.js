const path = require("path");
const TerserPlugin = require("terser-webpack-plugin");
const ForkTsCheckerPlugin = require("fork-ts-checker-webpack-plugin");

const ROOT_PATH = path.resolve(__dirname, "..", "..", "..");
const TS_ESLINT_PATH = path.join(ROOT_PATH, ".eslintrc.js");

module.exports = async function getProdConfig() {
  return {
    mode: "production",
    devtool: "source-map",
    plugins: [
      new ForkTsCheckerPlugin({
        typescript: false,
        eslint: {
          enabled: true,
          files: "./src/**/*.{ts,}",
          options: {
            configFile: TS_ESLINT_PATH,
            useEslintrc: false,
          },
        },
      }),
    ],
    optimization: {
      minimizer: [
        new TerserPlugin({
          parallel: true,
          terserOptions: {
            compress: {
              warnings: true, // dev terminal console
              drop_console: true, // drop console.* calls
              dead_code: true, // drop unreachable code
              unused: true, // drop unref'd vars/funcs
            },
            ie8: false,
          },
        }),
      ],
    },
  };
};
