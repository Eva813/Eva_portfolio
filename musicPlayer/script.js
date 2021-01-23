$(document).ready(function (e) {

  $('#play').click(function (e) {
    var hasPlay = $('.music-countainer').hasClass('paly');

    if ($('#play').paused) {
      pauseMusic();
    } else {
      playMusic();
    }
  });

});


//播放音樂
function playMusic() {

  $('.music-container').addClass('play');
  $('#play').find('i').removeClass('fa-play');
  $('#play').find('i').addClass('fa-pause');

  $('#audio').get(0).play();
};
//停止音樂
function pauseMusic() {
  $('.music-container').removeClass('play');
  $('#play').find('i').addClass('fa-play');
  $('#play').find('i').removeClass('fa-pause');
  $('#audio').get(0).pause();
}

//使音樂出現

