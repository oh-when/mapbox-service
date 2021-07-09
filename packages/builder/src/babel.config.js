module.exports = {
  presets: [
    [
      "@babel/preset-env",
      {
        modules: "umd",
        useBuiltIns: false,
        include: [],
        exclude: [],
        targets: {
          chrome: "58",
          ie: "11",
        },
      },
    ],
    ["@babel/preset-typescript", { onlyRemoveTypeImports: true }],
  ],
  assumptions: {
    setPublicClassFields: true,
    privateFieldsAsProperties: true
  },
  plugins: [
    [
      "@babel/plugin-transform-runtime",
      {
        "absoluteRuntime": false,
        "corejs": false,
        "helpers": true,
        "regenerator": true
      }
    ],
    ["babel-plugin-transform-typescript-metadata"],
    ["@babel/plugin-proposal-decorators", { "legacy": true }],
  ],
};
