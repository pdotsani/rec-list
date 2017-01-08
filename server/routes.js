/**
 * Main application routes
 */

'use strict';

var path = require('path');

module.exports = function(app) {

	app.use('/oauth', require('./oauth'));
	
	app.use('/api/collection', require('./api/collection'));

	app.get('*', function(req, res) {
		res.sendFile(path.resolve(__dirname, '..', 'client', 'index.html'));
	})
};