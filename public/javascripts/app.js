(function() {
  $('.video-play-link, .player-control').click(function(e) {
    e.preventDefault();
    $.ajax($(this).attr('href'));
  });
})();