var express = require('express');
var router = express.Router();
var request = require('request');
var cheerio = require('cheerio');
var async = require('async');
var _ = require('lodash');
var utils = require('../lib/utils');
var chromecasts = require('chromecasts')();

var albumUrl = 'http://api.tv.sohu.com/v4/album/videos/{{albumId}}.json?page_size=30&with_trailer=1&with_fee_video=1&site=1&api_key=f351515304020cad28c92f70f002261c';

router.get('/:aid', function(req, res, next) {

  var aid = req.params.aid;

  request(albumUrl.replace('{{albumId}}', aid), function(error, response, body) {
    var album = JSON.parse(body);
    var firstVideoName = album.data.videos[0].video_name;
    var title = 'Album for ' + firstVideoName;

    res.render('album', {
      title: title,
      videoName: title,
      album: album.data,
    });

  });

});

module.exports = router;
