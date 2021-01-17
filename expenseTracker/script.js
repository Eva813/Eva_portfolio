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
  //將製作好的item加入dom
  $('#list').append(item);

}

//收入、支出位置可以更新
//* 拿到數量值的變數，並創造新陣列
function updateValue() {
  const amounts = transactions.map(function (transaction) {
    return transaction.amount
  })

  //計算加總 
  var total = 0;
  $.each(amounts, function () { total += parseFloat((this).toFixed(2)) || 0; });
  //傳回YOUR BALANCE
  $('#balance').text(`$${total}`);
  //console.log(total);

  //*************************** */
  //從陣列找出>0的值，放置income
  //console.log(amounts)
  var income = amounts.filter(
    function (item) {
      return item > 0
    }
  )
  //console.log(income);

  var totalIncome = 0;
  $.each(income, function () { totalIncome += parseFloat((this).toFixed(2)) || 0; });

  //console.log(totalIncome); //回傳220
  //傳回到income
  $('#money-plus').text(`$${totalIncome}`);

  //***************************** */
  //從陣列找出<0的值，放置income
  var expense = amounts.filter(
    function (item) {
      return item < 0
    }
  )
  console.log(expense);

  var totalExpense = 0;
  $.each(expense, function () { totalExpense += parseFloat((this).toFixed(2)) || 0; });

  console.log(totalExpense); //回傳-70
  //傳回到expense
  $('#money-minus').text(`$${totalExpense}`)
}







//建立初始函式init 
function init() {
  $('#list').html(''); //清除list
  transactions.forEach(addTransactionDOM);
  updateValue();
}



init();
