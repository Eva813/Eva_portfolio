//const text = $('#text');
//const amount = $('#amount');

const dummyTransactions = [
  { id: 1, text: 'Flower', amount: -20 },
  { id: 2, text: 'salary', amount: 200 },
  { id: 3, text: 'book', amount: -50 }, { id: 4, text: 'camera', amount: 20 }
];
let transactions = dummyTransactions;

//將 交易項目(list)，加入dom列表中
function addTransactionDOM(transaction) {
  const sign = transaction.amount < 0 ? '-' : '+';

  //創造html,li那一段

  const item = $('<li></li>').appendTo('#list');

  //add class based on value
  item.addClass(transaction.amount < 0 ? 'minus' : 'plus');
  item.html(`${transaction.text} <span> ${sign}${Math.abs(transaction.amount)}</span> <button class="delete-btn">x</button>`);

  $('#list').append(item);

}

//收入、支出位置可以更新
//* 拿到數量值的變數，並創造新陣列
function updateValue() {
  const amounts = transactions.map(function (transaction) {
    return transaction.amount
  })

  //計算加總


}

//init 
function init() {
  $('#list').html(''); //清除list
  transactions.forEach(addTransactionDOM);
  updateValue();
}



init();
