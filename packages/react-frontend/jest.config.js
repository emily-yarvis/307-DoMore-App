export default {
    testEnvironment: "jest-environment-jsdom",
    transform: {
      "^.+\\.jsx?$": "babel-jest",
    },
    moduleNameMapper: {
      "\\.(css|scss)$": "identity-obj-proxy",
    },
    setupFilesAfterEnv: ["<rootDir>/setupTests.js"],
    reporters: [
      "default",
      [
        "jest-junit",
        {
          outputDirectory: "./test-results",
          outputName: "test-results.xml",
        },
      ],
    ],
  };
  