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
    ["@babel/plugin-proposal-decorators", { decoratorsBeforeExport: true }],
    ["@babel/proposal-class-properties"],
    ["@babel/transform-runtime", { corejs: 3 }],
  ],
};
