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

  $('#next').click(nextSong)
  $('#prev').click(function () {
    prevSong();
  });

  $('#audio').on('timeupdate', handleProgress);



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
//為何取[0]
function handleProgress() {
  var duration = $('#audio').get(0).duration;
  //console.log(duration)
  var currentTime = $('#audio')[0].currentTime;
  //console.log(currentTime)
  const progressBar = $('#progress');
  const progressPercent = (currentTime / duration) * 100;

  //currentTime目前播放時間去與影片長度duration轉換成百分比，即可得到目前播放時間的百分比

  progressBar.css('width', `${progressPercent}%`);
};




//點擊, 拖曳進度條
//取得滑鼠點選進度條位置e.offsetX和進度條總長度
//progress.offsetWidth並將其轉換成百分比數值

//https://ithelp.ithome.com.tw/articles/10194871
//https://tools.wingzero.tw/article/sn/102


$('#progress-container').click(function (e) {
  const width = $('#progress-container').width(); //216.25
  //console.log(width);
  //取得點擊位置
  var elm = $(this);
  var xPos = e.pageX - elm.offset().left;

  //console.log(xPos);

  var duration = $('#audio')[0].duration;


  var theTime = ((xPos / width))
    * duration;
  //console.log(theTime);
  $('#audio')[0].currentTime = theTime;
});




