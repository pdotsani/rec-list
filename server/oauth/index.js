'use strict';

var Discogs = require('disconnect').Client;
// var config = require('config');
var express = require('express');

var router = express.Router();

var DISCOGS_KEY = process.env.DISCOGS_KEY // || config.get('DISCOGS_KEY');
var DISCOGS_SECRET = process.env.DISCOGS_SECRET // || config.get('DISCOGS_SECRET');
var URL_CALLBACK = process.env.URL_CALLBACK || 'http://localhost:5000/oauth/callback';

router.get('/authorize', function(req, res) {
  var oAuth = new Discogs().oauth();
  oAuth.getRequestToken(
    DISCOGS_KEY,
    DISCOGS_SECRET,
    URL_CALLBACK,
    function(err, requestData) {
      if(err) console.error(err);
      req.session.requestData = requestData;
      res.redirect(requestData.authorizeUrl);
    }
  );
});

router.get('/callback', function(req, res){
  var oAuth = new Discogs(req.session.requestData).oauth();
  oAuth.getAccessToken(
    req.query.oauth_verifier, // Verification code sent back by Discogs
    function(err, accessData){
      if(err) console.error(err);
      req.session.accessData = accessData;
      delete req.session.requestData;
      res.redirect('/list');
    }
  );
});

router.get('/logout', function(req, res) {
  req.session.destroy(function(err) {
    if(err) {
      console.error(err);
    } else {
      res.redirect('/');
    }
  });
});

router.get('/is', function(req, res) {
  if(req.session.accessData) {
    res.json({ isAuth: true });
  } else {
    res.json({ isAuth: false });
  }
});

module.exports = router;
