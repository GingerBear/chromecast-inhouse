var chromecasts = require('chromecasts');

module.exports = {
  stop: function(req, res, next) {
    chromecasts().on('update', function (player) {
      player.stop();
      next();
    });
  },
  pause: function(req, res, next) {
    chromecasts().on('update', function (player) {
      player.pause();
      next();
    });
  },
  resume: function(req, res, next) {
    chromecasts().on('update', function (player) {
      player.resume();
      next();
    });
  }
};