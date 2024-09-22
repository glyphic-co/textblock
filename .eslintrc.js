module.exports = {
	env: {
		browser: true
	},
	extends: ["eslint:recommended"],
	ignorePatterns: ["!.*.js", ".eslintrc.js", "*.min.*", ".old", "dist", "webpack.config.js"],
	parser: "@typescript-eslint/parser",
	plugins: ["@typescript-eslint", "import"],
	overrides: [
		{
			files: ["**/*.ts"],
			extends: [
				"plugin:@typescript-eslint/recommended",
				"plugin:@typescript-eslint/recommended-requiring-type-checking"
			],
			rules: {
				"@typescript-eslint/no-non-null-assertion": "off",
				"@typescript-eslint/no-explicit-any": "off",
				"@typescript-eslint/no-redundant-type-constituents": "off",
				"@typescript-eslint/no-unused-expressions": "off",
				"@typescript-eslint/naming-convention": [
					"error",
					{
						selector: "interface",
						format: ["PascalCase"],
						custom: {
							regex: "^I[A-Z]",
							match: false
						}
					}
				]
			}
		},
		{
			files: ["**/*.js"],
			parser: "espree",
			parserOptions: {
				ecmaVersion: 2020
			},
			rules: {}
		}
	],
	parserOptions: {
		project: ["./tsconfig.json"],
		tsconfigRootDir: __dirname
	},
	settings: {
		"import/resolver": {
			typescript: {}
		}
	},
	root: true
};
