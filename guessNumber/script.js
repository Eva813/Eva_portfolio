
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
  writeMessage(myWord)
};


//記錄下使用者所說的
function writeMessage(myWord) {
  $('#msg').html(`
  <div>You said:</div>
    <span class="box">${myWord}</span>
    <div>GO higher</div>
  `)
}
