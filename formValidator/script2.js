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


// 使用者名稱
$("#username").keyup(function () {
  var username_input = $("#username").val();
  var message_username = $("#username").siblings('small').first();

  if (username_input.length < 3) {

    $(this).css('border-color', '#e74c3c');

    message_username.text("Username must be at least 3 characters").css('visibility', 'visible');


  } else if (username_input.length > 15) {

    $(this).css('border-color', '#e74c3c');

    message_username.text("Username must be at less than 15 characters").css('visibility', 'visible');

  } else {

    $(this).css('border-color', '#2ecc71');

    message_username.css('visibility', 'hidden');

  }

})

//正確時，外框顯示綠色，錯誤時紅色 


//密碼
$("#password").keyup(function (e) {

  e.preventDefault();
  var password_input = $("#password").val();
  var message_password = $("#password").siblings('small').first();
  if (password_input.length < 8) {

    $(this).css('border-color', '#e74c3c');

    message_password.text("Password must be at least 8 characters").css('visibility', 'visible');
  } else if (password_input.length > 16) {

    $(this).css('border-color', '#e74c3c');

    message_password.text("Password must be at less than 16 characters").css('visibility', 'visible');
  } else {

    $(this).css('border-color', '#2ecc71');


    message_password.css('visibility', 'hidden')
  }


})
