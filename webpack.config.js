var path = require('path');
var webpack = require('webpack');

var ROOT_PATH = path.resolve(__dirname);
var APP_PATH = path.resolve(__dirname, './components/index.js');
var BUILD_PATH = path.resolve(__dirname, './build');

module.exports = {
	entry: APP_PATH,
	output: {
		path: BUILD_PATH,
		filename: 'bundle.js'
	},
	module: {
		loaders: [{
			test: /\.jsx?$/,
			loader: 'babel-loader',
			query: {
				presets: ['es2015', 'react']
			}
		}]
	}
}