$(document).ready(function () {

  $('input').keyup(checkWord);
});




// List of words for game
const words = [
  'sigh',
  'tense',
  'airplane',
  'ball',
  'pies',
  'juice',
  'warlike',
  'bad',
  'north',
  'dependent',
  'steer',
  'silver',
  'highfalutin',
  'superficial',
  'quince',
  'eight',
  'feeble',
  'admit',
  'drag',
  'loving'
];

//初始文字
//let randomItem

// 隨機取得單字
function getRandomword() {
  //https://www.codegrepper.com/code-examples/javascript/get+random+word+from+array+javascript
  randomItem = words[Math.floor(Math.random() * words.length)];
  console.log(randomItem);

  $('#word').text(randomItem);
};

getRandomword()


//輸入單字核對
function checkWord() {
  let text = $('#text').val();
  let Item = randomItem;
  console.log(Item);
  if (text === Item) {
    getRandomword();
    updateScore();
    $('#text').val("");
  }
}

let score = 0
//分數計算
function updateScore() {
  score++;
  $('#score').text(score);
}
