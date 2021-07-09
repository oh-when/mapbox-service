const getWebpackConfig = require("./webpack");
const babelConfig = require("./babel.config");
const jestConfig = require("./jest.config");
const eslintConfig = require("./eslint.config");

module.exports = {
  getWebpackConfig,
  babelConfig,
  jestConfig,
  eslintConfig
};
