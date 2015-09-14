var express = require('express');
var router = express.Router();
var request = require('request');
var cheerio = require('cheerio');
var async = require('async');
var _ = require('lodash');
var utils = require('../lib/utils');
var chromecasts = require('chromecasts');
var phantom = require('phantom');


var bigBangUrl = 'http://m.tv.sohu.com/v2477206.shtml';
var albumUrl = 'http://api.tv.sohu.com/v4/album/videos/{{albumId}}.json?page_size=30&with_trailer=1&with_fee_video=1&site=1&api_key=f351515304020cad28c92f70f002261c';
var videoUrl = 'http://api.tv.sohu.com/v4/video/info/{{videoId}}.json?api_key=f351515304020cad28c92f70f002261c';
// var videoQS = '&uid=1310300916007201&pt=1&prod=h5&pg=1&eye=0&cv=1.0.0&qd=680&src=1105&ca=4&cateCode=101&_c=1&SOHUSVP=6pHU1ajK_pA09ZXZoRvsb2_CmbeYA-8ofG_NteLQ82Ud2w10MJspLA';
var videoQS = '&pt=1&prod=h5&pg=1&eye=0&cv=1.0.0&qd=680&src=1105&ca=4&cateCode=115&_c=1&SOHUSVP=4ChWU1zI9pxBIFK1EDH-tqztQJiNtcDMiwyHiCBkVQN36VsIZikxTA';
// var videoQS = '&pt=1&prod=h5&pg=1&eye=0&cv=1.0.0&qd=680&src=1105&ca=4&cateCode=115&_c=1&SOHUSVP={{SOHUSVP}}';

function cast(req, video) {
  if (req.app.player) {
    req.app.player.play(video.mp4, {title: video.title, type: 'video/mp4'})
  } else {
    var cc = chromecasts();
    cc.on('update', function (player) {
      // console.log('all players: ', cc)
      player.play(video.mp4, {title: video.title, type: 'video/mp4'})
      req.app.player = player;
    });
  }
}


function getSOHUSVP(cb) {
  phantom.create(function (ph) {
    phantomInstance = ph;
    ph.createPage(function (p) {

      p.open("http://m.tv.sohu.com/v1862509.shtml?channeled=1211030100", function (status) {
        p.evaluate(function () {
          return document.cookie.match(/SOHUSVP=([^;]+)/).pop();
        }, function(result) {
          console.log('Get SOHUSVP: ' + result);
          cb(result);
        });
      });

    });
  });
}

router.get('/:vid', function(req, res, next) {

console.log('Getting new video info...');

  request(videoUrl.replace('{{videoId}}', req.params.vid), function(error, response, body) {

console.log('Grabing new SOHUSVP...');

    // getSOHUSVP(function(SOHUSVP) {

      var video = JSON.parse(body);
      var videoToCast = {
        mp4: video.data.url_high_mp4.split(',')[0].trim() + videoQS,//.replace('{{SOHUSVP}}', SOHUSVP),
        title: video.data.video_name,
      };

console.log(videoToCast);

      cast(req, videoToCast);

      res.send(200);
    // });

  });

});

module.exports = router;
