



$.ajax({
  url: `https://jsonplaceholder.typicode.com/posts？_limit5`,//注意符號
  method: 'get',//抓取值
  dataType: 'json',
  success: function (data) {
    //console.log(data);  //查看抓到的物件

    const rate = data.conversion_rates[currency_two];
    //console.log(rate);

    $('#rate').text(`1 ${currency_one} = ${rate} ${currency_two}`);

    //將值帶入
    $('#amount-two').val((amountOne * rate).toFixed(2));
  }
