// @ts-check
// JSON Schema: https://json.schemastore.org/webpack

const TerserPlugin = require("terser-webpack-plugin");
const { version } = require("./package.json");
const webpack = require("webpack");
const { type } = require("os");

module.exports = (env, argv) => {
	return {
		entry: "./src/textblock.ts",
		mode: argv.mode || "production",
		target: "web",
		module: {
			rules: [
				{
					test: /\.ts$/,
					use: "ts-loader",
					exclude: /node_modules|demo/
				}
			]
		},
		resolve: {
			extensions: [".ts", ".js"]
		},
		optimization: {
			minimize: argv.mode === "production",
			minimizer: [new TerserPlugin()]
		},
		output: {
			filename: "textblock.min.js",
			path: __dirname + "/dist",
			library: {
				type: "umd"
			},
			globalObject: 'typeof self !== "undefined" ? self : globalThis'
		},
		plugins: [
			new webpack.DefinePlugin({
				TB_VERSION: JSON.stringify(version)
			})
		]
	};
};
