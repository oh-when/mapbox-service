const path = require("path");

const rootPath = path.resolve(__dirname, "..", "..", "..");
const packagePath = path.join(rootPath, "packages");
const tsconfigPath = path.join(rootPath, "tsconfig.json");

module.exports = {
  rootPath,
  packagePath,
  tsconfigPath
}
