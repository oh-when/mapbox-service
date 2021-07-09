const jestConfig = require("@dedong/builder/jest/config");

module.exports = {
  ...jestConfig,
  roots: ["."],
  testMatch: ["<rootDir>/src/__tests__/**/*.(t|j)s"],
};
