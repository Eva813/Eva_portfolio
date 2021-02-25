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
  let url = `https://api.github.com/users/${username}?access_token=aec2689d3f9be4d85108db41496c1670e16e10ca`;
  $.ajax({
    type: "get",
    url: url,
    dataType: "json",


    success: function (data) {
      if (data.message === "Not Found") {
        console.log('wrong');
      } else { insertProfile(data); }

    }
  });
}

function insertProfile(user) {

  let words = `<div class="row">
          <div class="col-md-3">
            <img class="img-fluid mb-2" src="${user.avatar_url}">
            <a href="${user.html_url}" target="_blank" class="btn btn-primary btn-block mb-4">View Profile</a>
          </div>
          <div class="col-md-9">
            <span class="badge badge-primary">Public Repos: ${user.public_repos}</span>
            <span class="badge badge-secondary">Public Gists: ${user.public_gists}</span>
            <span class="badge badge-success">Followers: ${user.followers}</span>
            <span class="badge badge-info">Following: ${user.following}</span>
            <br><br>
            <ul class="list-group">
              <li class="list-group-item">Company: ${user.company}</li>
              <li class="list-group-item">Website/Blog: ${user.blog} </li>
              <li class="list-group-item">Location: ${user.location}</li>
              <li class="list-group-item">Member Since: ${user.created_at}</li>
            </ul>
          </div>
        </div>
        <h3 class="page-heading mb-3">Latest Repos</h3>    
        `

  $('#profile').html(words);
}
