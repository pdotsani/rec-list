'use strcit';

var Discogs = require('disconnect').Client;
var config = require('config');
var express = require('express');

var router = express.Router();

router.get('/me', function(req, res) {
  var dis = new Discogs(req.session.accessData);
  dis.getIdentity(function(err, data){
      console.log(data);
  });
});

module.exports = router;
