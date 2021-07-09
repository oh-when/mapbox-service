const path = require("path");
const { getWebpackConfig } = require("@dedong/builder");

module.exports = getWebpackConfig(() => {
  return {
    entry: {
      MapBoxService: path.resolve(__dirname, "src", "ts", "index.ts"),
    },
  };
});
