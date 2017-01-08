var webpack = require('webpack');
var path = require('path');

var BUILD_DIR = path.resolve(__dirname, 'dist/');
var APP_DIR = path.resolve(__dirname, 'client/');

var config = {
  entry: APP_DIR + '/index.js',
  output: {
    filename: 'bundle.js',
    sourceMapFilename: "./bundle.map"
  },
  devtool: '#source-map',
  module: {
  	loaders: [
  		{
  			loader: 'babel',
  			test: /.js?/,
  			include: APP_DIR,
  			exclude: /(node_modules)/,
  			query: {
  				presets: ['react', 'es2015', 'es2016']
  			}
  		}
  	]
  }
};

module.exports = config;