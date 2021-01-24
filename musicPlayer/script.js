$(document).ready(function () {

  $('#play').click(function (e) {
    var hasPlay = $('#music-container').hasClass('play');
    //var a = $('#audio').paused;
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

var songs_name = ['hey', 'summer', 'ukulele'];
let songIndex = 1;

function loadSongs(song) {
  console.log(song);
  $('#title').text(song);

  $('#audio').attr('src', `music/${song}.mp3`);
  $('#cover').attr('src', `img/${song}.jpg`);
}

// Initially load song details into DOM
loadSongs(songs_name[songIndex]);

// var a = $('#music-countainer').hasClass('play');
// console.log(a);
