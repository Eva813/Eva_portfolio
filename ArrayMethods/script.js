
//先抓取需要的資料
const main = document.getElementById('main');
//取得按鈕的id
const addUserBtn = document.getElementById('add-user');
const doubleBtn = document.getElementById('double');
const millionBtn = document.getElementById('show-millionaires');
const sortBtn = document.getElementById('sort');
const calBtn = document.getElementById('calculate-wealth');

//array 的初始化
let data = [];

//呼叫三次函示，會叫出三位人員
getRandomUser();
getRandomUser();
getRandomUser();
//取得使用者和錢
//使用fetch來取得api
//https://www.oxxostudio.tw/articles/201908/js-fetch.html
// function getRandomUser() {
//   fetch('https://randomuser.me/api').then(response => response.json()).then(data => data)
// }

//使用非同步 async ,https://www.oxxostudio.tw/articles/201908/js-async-await.html
//將要fetch的部分，放入變數，而當要取得asynchronous
async function getRandomUser() {
  const res = await fetch('https://randomuser.me/api'); //執行完後發出promise
  const data = await res.json();
  //查看取得的資料，並從中選擇要用的部分
  //console.log(data);
  const user = data.results[0];

  //創造新的使用者，並建立新的物件
  const newUser = {
    name: `${user.name.first} ${user.name.last}`,
    money: Math.floor(Math.random() * 1000000)
  };
  //console.log(newUser);
  addData(newUser);
}

//將新建立的物件(newUser)放入陣列中
function addData(newObj) {
  //這裡的data是在最前面所宣告的 初始陣列
  //newObj是物件內容
  data.push(newObj);

  //不放入參數，使用預設data
  updateDOM();

};


//將新創立的物件輸出呈現到畫面上(dom)
function updateDOM(provideData = data) {
  //console.log(provideData);
  //清除main區域的div
  main.innerHTML = `<h2><strong>Person</strong>  Wealth</h2>`;
  provideData.forEach(item => {
    const element = document.createElement('div');
    //在新div增加class
    element.classList.add('person');
    element.innerHTML = `<strong>${item.name}</strong> ${item.money}`;
    main.appendChild(element);
  })
};
