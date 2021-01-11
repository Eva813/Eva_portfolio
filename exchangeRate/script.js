
$("#currency-one").change(function caculate() {

  var currency_one = $("#currency-one").val();
  var currency_two = $('#currency-two').val();
  var amountOne = $('#amount-one').val();
  var amountTwo = $('#amount-two').val();

  $.ajax({
    url: `https://v6.exchangerate-api.com/v6/06f04b805743079a1966771a/latest/${currency_one}`,
    method: 'get',//get,post,put
    dataType: 'json',
    success: function (data) {
      console.log(data);
      const rate = data.conversion_rates[currency_two];
      console.log(rate);
      $('#rate').append(`1 ${currency_one} = ${rate} ${currency_two}`);
      amountTwo = (amountOne * rate).toFixed(2);
      console.log(amountTwo);
    }
  }).then(function (res) {
    //response <-> request


  })
  // .done(function (msg) {
  //   console.log(msg);
  // });
})

//抓取api的資料



