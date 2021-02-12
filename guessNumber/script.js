
// 取得隨1-100隨機數字
function theRandomNum() {
  return Math.floor(Math.random() * 100) + 1;
  //沒有加1，數字會是0-99
}

let randomNum = theRandomNum();
console.log(randomNum);

//語音辨識
window.SpeechRecognition = window.webkitSpeechRecognition || window.SpeechRecognition;

let recognition = new window.SpeechRecognition();


// 開始語音辨識
recognition.start();
//取得語音辨識的結果
