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

  $('#next').click(function () {
    nextSong()
  })

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
  //console.log(song);
  $('#title').text(song);

  $('#audio').attr('src', `music/${song}.mp3`);
  $('#cover').attr('src', `img/${song}.jpg`);

}

// Initially load song details into DOM
loadSongs(songs_name[songIndex]);


//左右鍵的跳轉
//歌曲的索引，如果比歌曲總數-1還小，就將索引加1，跳轉下一首
function nextSong() {

  if (songIndex < songs_name.length - 1) { songIndex += 1; } else {
    songIndex = 0
  };
  loadSongs(songs_name[songIndex]);
  playMusic();
}

