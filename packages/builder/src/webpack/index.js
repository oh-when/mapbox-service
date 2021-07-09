const { merge } = require("webpack-merge");
const getCommonConfig = require("./config.common");
const getDevConfig = require("./config.dev");
const getProdConfig = require("./config.prod");

module.exports =
  (getPackageConfig) =>
  async (options = {}) => {
    const configs = await Promise.all([
      getCommonConfig(options),
      options.dev ? getDevConfig(options) : getProdConfig(options),
      getPackageConfig ? getPackageConfig(options) : Promise.resolve({}),
    ]);

    return merge(...configs);
  };
