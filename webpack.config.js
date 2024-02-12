const path = require('path');
const TerserPlugin = require('terser-webpack-plugin');

const isProductionMode = process.env.NODE_ENV === 'production';

module.exports = {
	entry: './src/main.js',
	output: {
		filename: 'bundle.js',
		path: path.resolve(__dirname, 'public/bundles'),
		clean: true,
	},
	mode: isProductionMode ? 'production' : 'development',
	devtool: 'source-map',
	optimization: {
		minimizer: [
			new TerserPlugin({
				extractComments: false,
				terserOptions: {
					output: {
						comments: false,
					},
				},
			}),
		],
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				use: ['source-map-loader'],
				enforce: 'pre',
			},
		],
	},
	devServer: {
		static: {
			directory: path.join(__dirname, '/'),
		},
		compress: true,
		port: 8080,
		hot: true,
	},
};
