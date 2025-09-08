// jest.config.cjs
module.exports = {
  testEnvironment: "jsdom",
  setupFilesAfterEnv: ["<rootDir>/setupTests.js"],
  transform: { "^.+\\.[tj]sx?$": "babel-jest" },
  moduleNameMapper: { "\\.(css|scss)$": "identity-obj-proxy" },
};
