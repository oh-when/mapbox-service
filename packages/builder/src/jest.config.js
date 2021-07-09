module.exports = {
  preset: "ts-jest",
  testEnvironment: 'jsdom',
  collectCoverageFrom: [
    "<rootDir>/src/**/*.(t|j)s",
    "!<rootDir>/src/**/*.(test|spec).(t|j)s",
    "!<rootDir>/src/**/types/**",
    "!<rootDir>/node_modules/**",
  ],
  coverageDirectory: "coverage",
  coverageReporters: ["json", "text", "lcov"],
  reporters: [
    "default",
  ],
};
