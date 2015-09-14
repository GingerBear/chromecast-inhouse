var chromecasts = require('chromecasts');

function control(req, res, op, val) {
  console.log('op: ' + op + ' ' + (val || ''));
  if (req.app.player) {
    
    if (op === 'seek') {
      req.app.player.status(function(err, status) {
        req.app.player[op](status.currentTime + parseInt(val));
      });
    } else {
      req.app.player[op]();  
    }

    res.send(200);
  } else {
    var cc = chromecasts();
    cc.on('update', function (player) {
      player[op]();
      req.app.player = player;
      res.send(200);
    });
  }
}

module.exports = {
  stop: function(req, res, next) {
    control(req, res, 'stop');
  },
  pause: function(req, res, next) {
    control(req, res, 'pause');
  },
  resume: function(req, res, next) {
    control(req, res, 'resume');
  },
  resume: function(req, res, next) {
    control(req, res, 'resume');
  },
  seek: function(req, res, next) {
    control(req, res, 'seek', req.params.seconds);
  }
};