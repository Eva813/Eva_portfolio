
// 取得隨1-100隨機數字
function theRandomNum() {
  return Math.floor(Math.random() * 100) + 1;
  //沒有加1，數字會是0-99
}

let randomNum = theRandomNum();
console.log(randomNum);

