/**
 * Main application file
 */

'use strict';

// Set default node environment to development
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var express = require('express');

// Setup server
var app = express();
var server = require('http').createServer(app);

// Config server
app.use(express.static(__dirname + '/../client'));

// Add routes
require('./routes')(app);

// Start server
server.listen(5000, function () {
  console.log('Express server listening on %d, in %s mode', 5000, process.env.NODE_ENV);
});
