const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");
const process = require("process");
const { merge } = require("webpack-merge");
const mocker = require("../mock");

const host = "localhost";
const config = {
  devServer: {
    host,
    index: "index.html",
    disableHostCheck: true,
    inline: true,
    contentBase: [
      path.join(process.cwd(), "dist"),
      path.join(process.cwd(), "node_modules"),
    ],
    overlay: {
      errors: true,
      warning: false,
    },
    injectClient: false,
    before: function (app) {
      app.use("/mocker", mocker);
    },
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "..", "templates", "index.html"),
    })
  ]
};

async function getDevServerConfig(option = {}) {
  const { portOffset } = option;

  const MIN_PORT = 3000;
  const port = MIN_PORT + Number.parseInt(portOffset) || 0;

  Object.assign(config.devServer, {
    port,
    public: `${host}:${port}`,
    https: option.https || false,
  });

  const protocol =
    config.devServer.https === true ||
    typeof config.devServer.https === "object"
      ? "https"
      : "http";
  console.log("----------------------------------------------------------------");
  console.log(`[Local] \t : ${protocol}://${host}:${port}/`);
  console.log("----------------------------------------------------------------");

  return config;
}

module.exports = async function getDevConfig(options) {
  const configs = await Promise.all([getDevServerConfig(options)]);

  return merge(...configs);
};
