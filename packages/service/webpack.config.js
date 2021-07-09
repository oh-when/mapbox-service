const path = require("path");
const { getWebpackConfig } = require("@dedong/mapbox-builder");

module.exports = getWebpackConfig(() => {
  return {
    entry: {
      MapBoxService: path.resolve(__dirname, "src", "index.ts"),
    },
  };
});
