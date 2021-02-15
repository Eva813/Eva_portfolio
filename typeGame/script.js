$(document).ready(function () {

  $('input').keyup(checkWord);

  $('#settings-btn').click(function (e) {
    e.preventDefault();
    $('.settings').toggleClass('hide')
  });


  //設置select的選擇
  $('form').change(function () {
    difficulty = $('#difficulty').val();
    localStorage.setItem('difficulty', difficulty);

  });
  //使畫面的難易度選擇，呈現儲存的選項
  $('#difficulty').val(function () {
    let a = $('#difficulty').val()
    if (localStorage.getItem('difficulty') !== null) {
      return a = localStorage.getItem('difficulty');
    } else {
      return a = 'medium';
    }
  })
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
  randomItem = words[Math.floor(Math.random() * words.length)];
  console.log(randomItem);

  $('#word').text(randomItem);
};

getRandomword();


//輸入單字核對
function checkWord() {
  let text = $('#text').val();
  let Item = randomItem;
  console.log(Item);
  if (text === Item) {
    getRandomword();
    updateScore();
    $('#text').val("");

    //time += 5;
    if (difficulty === 'hard') {
      time += 2;
    } else if (difficulty === 'medium') {
      time += 3;
    } else {
      time += 5;
    }

    //判斷完之後，隨之繼續倒數時間
    countTime();

  }
}

let score = 0
//分數計算
function updateScore() {
  score++;
  $('#score').text(score);
}

// Init time
let time = 10;
// 倒數計時
//https://jsfiddle.net/satyasrinivaschekuri/y03m54Le/
function countTime() {
  time--;
  $('#time').text(`${time}s`)
  if (time <= 0) {
    clearInterval(downloadTimer);
    gameOver();
  }
  //   } else {
  //     time--;
  //     $('#time').text(`${time}s`)
  //   }
}

var downloadTimer = setInterval(countTime, 1000);

//遊戲結束
//location.reload()
function gameOver() {
  $('#end-game-container').html(`<h1>Time ran out</h1>
  <p>Your final score is ${score}</p>
  <button onclick="location.reload()">Reload</button>
  <div id="img" >
        <img src="./good.png" alt="">
      </div>
  `)
  // 顯示指定的flex容器
  $("#end-game-container").css('display', 'flex');

  //增加判斷，分數達到一標準，會出現圖示
  let s = score
  //console.log(s)
  if (s >= 5) {
    $("#end-game-container").find('img').addClass('show');

  };

}


//如果儲存端不是空值(已有選擇)，就以此為主，否則的話就是medium
let difficulty = localStorage.getItem('difficulty') !== null
  ? localStorage.getItem('difficulty')
  : 'medium';









