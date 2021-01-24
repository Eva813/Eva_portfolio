$(document).ready(function () {

  $('#play').click(function (e) {
    var hasPlay = $('#music-container').hasClass('play');
    var a = $('#audio').paused;
    if (hasPlay) {
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

//載入歌曲

// var songs_name = [hey, summer, ukulele];

// function loadsongs() {

// }


var a = $('#music-countainer').hasClass('play');
console.log(a);
