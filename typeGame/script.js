$(document).ready(function () {

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


// 隨機取得單字
function getRandomword() {
  //https://www.codegrepper.com/code-examples/javascript/get+random+word+from+array+javascript
  var randomItem = words[Math.floor(Math.random() * words.length)];
  console.log(randomItem);

  $('#word').text(randomItem);
};

getRandomword()
console.log(getRandomword);
