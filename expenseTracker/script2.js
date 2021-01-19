$(document).ready(function () {
  //預設值的設置，取得存在本地的資料或是空陣列
  var transactions = JSON.parse(localStorage.getItem('Transactions')) || [];

  //陣列初始
  if (transactions.length > 0) {
    initHistory(transactions);
  }

  $('.btn').click(function (e) {
    e.preventDefault();
    //console.log('click');
    //取得表格中的值
    const text_val = $('#text').val();
    const amount_val = $('#amount').val();
    const id = generateID();

    addTransactions(id, text_val, amount_val);

    //推入陣列
    transactions.push({
      id: id,
      name: text_val,
      amount: amount_val
    })


    localStorage.setItem('Transactions', JSON.stringify(transactions));
  })


});


//在list中插入
function addTransactions(id, name, amount) {

  console.log(id, name, amount);
  const Transaction_str = `<li class='plus' >${name}<span> ${amount}</span><button class="delete-btn">x</button></li>`
  $('#list').append(Transaction_str);
  $('#text').val('');
  $('#amount').val('');

  //刪除鈕 要交易交出後再綁事件
  $('.delete-btn').last().click(function () {
    $(this).parent().remove();
  })
}

// Generate random ID
function generateID() {
  return Math.floor(Math.random() * 100000000);
}


//init
function initHistory(transactions) {
  transactions.forEach(transaction => {
    addTransactions(transaction.name, transaction.amount);
  });

}

