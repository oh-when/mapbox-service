const { jestConfig } = require("@dedong/mapbox-builder");

module.exports = {
  ...jestConfig,
  roots: ["."],
  testMatch: ["<rootDir>/__tests__/**/*.spec.(t|j)s"],
};
