var path = require('path');
var webpack = require('webpack');

var ROOT_PATH = path.resolve(__dirname);
var APP_PATH = path.resolve(__dirname, './components/index.js');
var BUILD_PATH = path.resolve(__dirname, './build');

module.exports = {
	entry: [
		'webpack/hot/dev-server',
    	'webpack-dev-server/client?http://localhost:8080',
    	APP_PATH
	],	
	output: {
		path: BUILD_PATH,
		filename: 'bundle.js'
	},
	module: {
		loaders: [{
			test: /\.jsx?$/,
			loaders: ['babel-loader?presets[]=es2015,presets[]=react']
		},{
			test: /\.less$/,
			loader: 'style!css!less'
		},{
    		test: /\.(png|jpg)$/,
    		loader: 'url?limit=50000'
    	}]
	}
}