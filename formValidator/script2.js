// email驗證
function checkEmail(email) {
  var emailRule = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return emailRule.test(email);
}
$("#email").keyup(function (e) {
  e.preventDefault();
  var email_input = $("#email").val();
  result = checkEmail(email_input);
  // console.log(result);
  var message = $("#email").siblings('small').first();
  // console.log(message.text());
  if (result) {

    $(this).css('border-color', '#2ecc71');

    message.css('visibility', 'hidden');
  } else {

    $(this).css('border-color', '#e74c3c');

    message.text("Email is not valid").css('visibility', 'visible');
  }

});
