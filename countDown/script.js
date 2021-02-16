
$(document).ready(function () {
  //抓取年份
  $('#year').html(currentYear + 1)
});

//getFullYear(),用來取得日期物件當中本地時間的年份
const currentYear = new Date().getFullYear();
//https://www.w3schools.com/jsref/jsref_getfullyear.asp
//宣告新的一年1/1的日期
const newYearTime = new Date(`January 01 ${currentYear + 1} 00:00:00`);



//console.log(currentYear);
//console.log(newYearTime);

//取得現在時間;取得現在時間與新年時間的差異
function updateCountdown() {
  const currentTime = new Date();
  //console.log(currentTime);
  const diff = newYearTime - currentTime;
  //diff計算出來是毫秒
  //days
  const d = Math.floor(diff / 1000 / 60 / 60 / 24);
  //取得除以24之後的餘數
  const h = Math.floor(diff / 1000 / 60 / 60) % 24;
  const m = Math.floor(diff / 1000 / 60) % 60;
  const s = Math.floor(diff / 1000) % 60;
  $('#days').html(d);
  //當數字少於10，要呈現01,02...
  $('#hours').html(h < 10 ? '0' + h : h);
  $('#minutes').html(m < 10 ? '0' + m : m);
  $('#seconds').html(s < 10 ? '0' + s : s);

}

//設定每一秒都會循環倒數
setInterval(updateCountdown, 1000);

//設置loading圖示
setTimeout(function () {
  $('#loading').remove();
  //要在css檔案的countdown，先設置display：none
  $('#countdown').css('display', 'flex');
}, 1000);
