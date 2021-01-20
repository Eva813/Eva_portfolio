$(document).ready(function () {
  //預設值的設置，取得存在本地的資料或是空陣列
  var transactions = JSON.parse(localStorage.getItem('Transactions')) || [];

  //陣列初始
  if (transactions.length > 0) {
    initHistory(transactions);
  }
  //點擊按鈕的事件
  $('.btn').click(function (e) {
    e.preventDefault();
    //console.log('click');
    //取得表格中的值
    const text_val = $('#text').val();
    const amount_val = $('#amount').val();
    let id = generateID();

    addTransactions(id, text_val, amount_val, transactions);

    //推入陣列
    transactions.push({
      id: id,
      name: text_val,
      amount: amount_val
    })


    localStorage.setItem('Transactions', JSON.stringify(transactions));


  })
  updateValue(transactions);

});


//在list中插入
function addTransactions(id, name, amount, transactions) {
  console.log('amount:', amount);

  const Transaction_str = $('<li></li>').appendTo('#list');

  Transaction_str.addClass(amount < 0 ? 'minus' : 'plus');
  Transaction_str.html(`${name}<span> ${amount}</span><button class="delete-btn"  data-id="${id}">x</button>`);
  $('#list').append(Transaction_str);


  $('#text').val('');
  $('#amount').val('');

  //刪除鈕 要交易交出後再綁事件
  $('.delete-btn').last().click(function () {
    $(this).parent().remove();
    let id = $(this).data('id');
    //console.log(id);
    deleteFromLocalstorage(transactions, id); //要記得傳入id

  });

}
//從localstorage刪除
//要記得在參數放入id
function deleteFromLocalstorage(transactions, id) {
  transactions.forEach(function (item, index, arr) {
    //console.log('item', item);
    //console.log('index', index);
    //console.log('arr', arr);
    if (item.id === id) {
      arr.splice(index, 1);
    }
  });
  //迴圈刪除後，要儲存到localStorage才有確實刪去
  localStorage.setItem('Transactions', JSON.stringify(transactions));
}


// Generate random ID
function generateID() {
  return Math.floor(Math.random() * 100000000);
}


//數值更新計算
function updateValue(transactions) {
  const amounts_arr = transactions.map(function (transaction) {
    return transaction.amount
  })
  var amounts = parseInt(amounts_arr);
  console.log(amounts);

  //計算加總 
  var total = 0;
  $.each(amounts_arr, function () { total += parseFloat((this).toFixed(2)) || 0; });
  //傳回YOUR BALANCE
  $('#balance').text(`$${total}`);
  console.log(total);


  //*************************** */
  //從陣列找出>0的值，放置income
  //console.log(amounts)
  var income = amounts_arr.filter(
    function (item) {
      return item > 0
    }
  )
  console.log(income);
  var totalIncome = 0;
  $.each(income, function () { totalIncome += parseFloat((this)) || 0; });

  //console.log(totalIncome); //回傳220
  //傳回到income
  $('#money-plus').text(`$${totalIncome}`);
  //***************************** */
  //從陣列找出<0的值，放置income
  var expense = amounts_arr.filter(
    function (item) {
      return item < 0
    }
  )
  console.log(expense);

  var totalExpense = 0;
  $.each(expense, function () { totalExpense += parseFloat((this)) || 0; });

  console.log(totalExpense);
  //傳回到expense
  $('#money-minus').text(`$${totalExpense}`)


}

//init
function initHistory(transactions) {
  transactions.forEach(transaction => {
    addTransactions(transaction.id, transaction.name, transaction.amount, transactions);
  });
  updateValue(transactions);

}

