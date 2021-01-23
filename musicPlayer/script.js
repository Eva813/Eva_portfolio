$(document).ready(function (e) {

  $('#play').click(function (e) {


    playMusic();


  });
});


//播放音樂
function playMusic() {

  $('.music-container').addClass('play');
  $('i.fas').removeClass('fa-play');
  $('i.fas').addClass('fa-pause');


};
//停止音樂
// function pauseMusic() {

// }


var a = $('i.fas');
console.log(a)
