const path = require('path');
const TerserPlugin = require("terser-webpack-plugin");
const ForkTsCheckerPlugin = require("fork-ts-checker-webpack-plugin");

module.exports = async function getProdConfig() {
  return {
    mode: "production",
    devtool: "cheap-module-source-map",
    plugins: [
      new ForkTsCheckerPlugin({
        typescript: false,
        eslint: {
          enabled: true,
          files: "./src/**/*.{ts,}",
          options: {
            configFile: path.join(process.cwd(), '.eslintrc.js'),
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
