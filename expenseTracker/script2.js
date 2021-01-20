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


});


//在list中插入
function addTransactions(id, name, amount, transactions) {



  const Transaction_str = `<li class='plus' >${name}<span> ${amount}</span><button class="delete-btn"  data-id="${id}">x</button></li>`
  $('#list').append(Transaction_str);
  $('#text').val('');
  $('#amount').val('');

  //刪除鈕 要交易交出後再綁事件
  $('.delete-btn').last().click(function () {
    $(this).parent().remove();
    let id = $(this).data('id');
    //console.log(id);
    deleteFromLocalstorage(transactions);

  })
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


//init
function initHistory(transactions) {
  transactions.forEach(transaction => {
    addTransactions(transaction.id, transaction.name, transaction.amount, transactions);
  });

}

