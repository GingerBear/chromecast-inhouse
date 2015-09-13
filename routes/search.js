var express = require('express');
var router = express.Router();
var request = require('request');
var cheerio = require('cheerio');
var async = require('async');
var _ = require('lodash');
var utils = require('../lib/utils');
var chromecasts = require('chromecasts');


var searchUrl = 'http://api.tv.sohu.com/v4/search/all.json?api_key=f351515304020cad28c92f70f002261c&plat=17&sver=4&all=0&page=1&page_size=50&key={{q}}&pay=1';

router.get('/', function(req, res, next) {

  var q = encodeURIComponent(req.query.q);

console.log(searchUrl.replace('{{q}}', q));

  request(searchUrl.replace('{{q}}', q), function(error, response, body) {

    var resultJson = JSON.parse(body);

    res.render('search', {
      items: resultJson.data.items,
      q: req.query.q,
    });

  });

});

module.exports = router;
