'use strcit';

var Discogs = require('disconnect').Client;
var config = require('config');
var express = require('express');

var router = express.Router();

router.get('/me', function(req, res) {
  var dis = new Discogs(req.session.accessData);
  var col = new Discogs().user().collection();
  var releases = [];
  dis.getIdentity(function(err, data){
  	console.log(data.username);
  	col.getReleases(data.username, 
  		0, { page: 1, per_page: 25 }, function(err, data){
  			data.releases.forEach(function(release, idx) {
  				releases.push({
  					title: release.basic_information.title,
  					artist: release.basic_information.artists[0].name,
  					label: release.basic_information.labels[0].name,
  					id: release.id
  				})
  			});
  			data['folder'] = 0;
  			data['releases'] = releases;
  			console.log(data);
  			res.json(data);
  	});
  });
});

module.exports = router;
