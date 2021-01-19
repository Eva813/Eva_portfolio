$(document).ready(function () {
  $('.btn').click(function (e) {
    e.preventDefault();
    console.log('click');
    //取得表格中的值
    const text_val = $('#text').val();
    const amount_val = $('#amount').val();
    addTransactions(text_val, amount_val);

  })

});


//在list中插入
function addTransactions(name, amount) {

  const Transaction_str = `<li class='plus' >${name}<span> ${amount}</span><button class="delete-btn">x</button></li>`

  //$('.list').addClass(+amount < 0 ? 'minus' : 'plus');
  //console.log($('.list'));



  $('#list').append(Transaction_str);
  $('#text').val('');
  $('#amount').val('');
}


//在表格中輸入值，交出後清空
function addClass() {
  Transaction_str.addClass(amount < 0 ? 'minus' : 'plus');
}
