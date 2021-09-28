const path = require("path");

/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
	preset: "ts-jest",
	globals: {
		"ts-jest": {
			tsconfig: path.resolve(__dirname, "tsconfig.spec.json"),
		},
	},

	collectCoverage: true,
	coverageDirectory: path.resolve(__dirname, "coverage"),
	coverageReporters: ["lcov", "text", "html"],

	rootDir: path.resolve(__dirname, "src"),

	// Indicates which provider should be used to instrument code for coverage
	coverageProvider: "v8",

	moduleDirectories: ["node_modules", "<rootDir>"],

	// The test environment that will be used for testing
	testEnvironment: "node",

	watchPlugins: [
		"jest-watch-typeahead/filename",
		"jest-watch-typeahead/testname",
	],
};
