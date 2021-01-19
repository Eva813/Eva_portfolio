$(document).ready(function () {
  $('.btn').click(function (e) {
    e.preventDefault();
    console.log('click');
    addTransactions('cash', '+200');
  })
});


//在list中插入
function addTransactions(name, amount) {
  var Transaction_str = `<li class='plus' >${name}<span> ${amount}</span><button class="delete-btn">x</button></li>`
  $('#list').append(Transaction_str);

  $('#text').val('');
  $('#amount').val('');
}


//在表格中輸入值，交出後清空
