
// 取得隨1-100隨機數字
function theRandomNum() {
  return Math.floor(Math.random() * 100) + 1;
  //沒有加1，數字會是0-99
}

let randomNum = theRandomNum();
console.log(randomNum);

//語音辨識
// window.SpeechRecognition = window.webkitSpeechRecognition || window.SpeechRecognition;

// let recognition = new window.SpeechRecognition();

try {
  var SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  var recognition = new SpeechRecognition();
}
catch (e) {
  console.error(e);

}




// 開始語音辨識
recognition.start();
//取得語音辨識的結果
recognition.onresult = function (event) {
  //console.log(event);
  let myWord = event.results[0][0].transcript
  //console.log('You said: ', myWord);
  writeMessage(myWord);
  checkNumber(myWord);
};


//記錄下使用者所說的
function writeMessage(myWord) {
  $('#msg').html(`
  <div>You said:</div>
    <span class="box">${myWord}</span>
    
  `)
}
//核對隨機數字與猜的數字
function checkNumber(myWord) {
  let number = +myWord; //轉為數字
  if (Number.isNaN(number)) {
    $('#msg').append(`<div>This is not a valid number</div>`)
    return
  }
  //設定語句
  if (number > 100 || number < 1) {
    $('#msg').append(`<div>Number must be between 1 and 100</div>`);
    return;
  }

  if (number === randomNum) {
    $('body').html(`
    <h2>Congrats! You have guessed the number! <br><br> 
    It was ${number}</h2>
    <button class="play-again" id="play-again" > Play Again </button>
    `);
  } else if (number > randomNum) {
    $('#msg').append(`<div>GO LOWER</div>`);
  } else {
    $('#msg').append(`<div>GO HIGHER</div>`)
  }

}

//使猜數字可以持續猜，直到答對為止
//https://stackoverflow.com/questions/51080738/how-to-make-speech-recognition-continous-for-a-fix-time-period
recognition.onend = function () {
  recognition.start();
}
