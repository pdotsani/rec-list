'use strcit';

var Discogs = require('disconnect').Client;
var config = require('config');
var express = require('express');

var router = express.Router();

router.get('/me/:page', function(req, res) {
  var page = req.params.page;
  var dis = new Discogs(req.session.accessData);
  var usr = new Discogs().user();
  var listings = [];
  dis.getIdentity(function(err, data){
    usr.getInventory(data.username, { page: page, perPage: 50 }, function(err, inventory) {
      inventory.listings.forEach(function(listing, idx) {
        listings.push({
          price: listing.price,
          release: listing.release,
          id: listing.id
        });
      });
      inventory['listings'] = listings;
      inventory['current'] = 1;
      res.json(inventory)
    });
  });
});

router.delete('/:id', function(req, res) {
  var id = req.params.id;
  var dis = new Discogs(req.session.accessData).marketplace();
  dis.deleteListing(id, function(err, data) {
    res.sendStatus(200);
  });
});

module.exports = router;
