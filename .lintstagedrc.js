module.exports = {
  "packages/**/src/js/**/*.ts": [
    "eslint --fix --no-eslintrc --config .eslintrc.js --ext .ts",
    "prettier --write",
    "git add .",
  ],
};
