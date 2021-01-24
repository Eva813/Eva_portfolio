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
  $('#prev').click(function () {
    prevSong()
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
//跳轉前一首


function prevSong() {
  //如果索引沒有大於0。就會播索引[2]
  if (songIndex > 0) { songIndex -= 1; } else {
    songIndex = songs_name.length - 1;
  };
  loadSongs(songs_name[songIndex]);
  playMusic();
}

//進度條的製作
//let curr_track = document.createElement('audio');

//顯示進度條
function handleProgress(e) {
  const progressBar = $('#progress');
  const progressPercent = (currentTime / duration) * 100;
  //currentTime目前播放時間去與影片長度duration轉換成百分比，即可得到目前播放時間的百分比
  progressBar.style.width = `${progressPercent}%`;
} cvxz

const progress = player.querySelector('.progress');

//點擊, 拖曳進度條
function scrub(e) {
  const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
  video.currentTime = scrubTime;
}
video.addEventListener('timeupdate', handleProgress);

let mousedown = false;
progress.addEventListener('click', scrub);
progress.addEventListener('mousemove', (e) => mousedown && scrub(e));
progress.addEventListener('mousedown', () => mousedown = true);
progress.addEventListener('mouseup', () => mousedown = false);

