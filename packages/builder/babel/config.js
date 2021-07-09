module.exports = {
  presets: [
    [
      "@babel/preset-env",
      {
        loose: true,
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
    [
      "@babel/preset-typescript",
      {
        onlyRemoveTypeImports: true,
      },
    ],
  ],
  plugins: [
    ["@babel/proposal-class-properties", { loose: true }],
    [
      "@babel/transform-runtime",
      {
        corejs: 3,
      },
    ],
  ],
};
