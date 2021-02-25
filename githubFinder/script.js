//取輸入框的值
//如果值內不是空白，github,getuser().then (data，如果data 是 )

$(document).ready(function () {

});

$('#searchUser').keyup(function () {
  let value = $(this).val();
  //console.log(value);
  getGithubUser(value);
});

function getGithubUser(username) {
  let url = `https://api.github.com/users/${username}`
  $.ajax({
    type: "get",
    url: url,
    dataType: "json",
    success: function (response) {
      console.log(response);
    }
  });
}
