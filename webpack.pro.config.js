var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');

var ROOT_PATH = path.resolve(__dirname);
var APP_PATH = path.resolve(__dirname, './src/index.jsx');
var BUILD_PATH = path.resolve(__dirname, './build');
var TEM_PATH = path.resolve(__dirname, './templates/index.html');

module.exports = {
	entry: {
        app: APP_PATH,
        vendor: ['react', 'react-dom','react-umeditor','similar-react-router']
    },	
	output: {
		path: BUILD_PATH,
		filename: '[name].[hash].js'
	},
    plugins: [
        new webpack.optimize.UglifyJsPlugin({minimize: true}),
        new webpack.optimize.CommonsChunkPlugin({ name: 'vendor', filename: 'vendor.js' }),
        new HtmlWebpackPlugin({
            title: 'Editor Demo',
            template: TEM_PATH,
            filename: 'index.html',
            chunks: ['app', 'vendor'],
            inject: 'body'
          })
    ],
	module: {
		loaders: [{
			test: /\.jsx?$/,
			loaders: ['babel'],
            query: {
              presets: ['react','es2015','stage-0']
            }
		},{
			test: /\.less$/,
			loader: ['style','css','less']
		},{
    		test: /\.(png|jpg)$/,
    		loader: 'url?limit=50000'
    	}]
	}
}