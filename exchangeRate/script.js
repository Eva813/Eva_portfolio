
function calculate() {

  var currency_one = $("#currency-one").val();
  var currency_two = $('#currency-two').val();
  var amountOne = $('#amount-one').val();
  var amountTwo = $('#amount-two').val();

  //https://app.exchangerate-api.com/dashboard/confirmed

  $.ajax({
    url: `https://v6.exchangerate-api.com/v6/06f04b805743079a1966771a/latest/${currency_one}`,  //注意符號
    method: 'get',//get,post,put
    dataType: 'json',
    success: function (data) {
      //console.log(data);
      const rate = data.conversion_rates[currency_two];
      //console.log(rate);
      $('#rate').text(`1 ${currency_one} = ${rate} ${currency_two}`);
      $('#amount-two').val((amountOne * rate).toFixed(2));
      //console.log($('#amount-two').val());
    }
  })


}

$("#currency-one").change(function () {
  //$("#rate").html("");//不用額外清空，直接取代即可
  calculate();
})

//抓取amountone
$("#amount-one").on("input", function () {
  // $("#rate").html("");
  calculate();
})

$("#currency-two").change(function () {
  $("#rate").html("");
  calculate();
})

//抓取amountTwo
$("#amount-two").on("input", function () {
  //$("#rate").html("");
  calculate();
})

//swap按鈕
$('#swap').click(function () {
  //$("#rate").html("");
  let temp = $("#currency-one").val();//設一個變數來存放currency-one

  $("#currency-one").val($("#currency-two").val());

  $("#currency-two").val(temp);
  calculate();


});

calculate();






