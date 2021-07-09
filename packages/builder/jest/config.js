module.exports = {
  preset: "ts-jest",
  collectCoverageFrom: [
    "<rootDir>/src/**/*.(t|j)s",
    "!<rootDir>/src/**/*.(test|spec).(t|j)s",
    "!<rootDir>/src/**/typings/**",
    "!<rootDir>/node_modules/**",
  ],
  coverageDirectory: "coverage",
  coverageReporters: ["json", "text", "lcov"],
  reporters: [
    "default",
  ],
  globals: {
    nhn: {},
    naver: {},
  },
};
