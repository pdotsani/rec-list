/**
 * Main application file
 */

'use strict';

// Set default node environment to development
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var session = require('express-session');
var MongoDBStore = require('connect-mongodb-session')(session);
var express = require('express');

// Setup server
var app = express();
var store = new MongoDBStore({
  uri: 'mongodb://localhost:27017/rec_list_sessions',
  collection: 'sessions'
});
// Config server
app.use(session({
  secret: 'APP_SECRET',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false, httpOnly: false },
  store: store
}))
app.use(express.static(__dirname + '/../client'));
var server = require('http').createServer(app);

// Add routes
require('./routes')(app);

// Start server
server.listen(5000, function () {
  console.log('Express server listening on %d, in %s mode', 5000, process.env.NODE_ENV);
});
