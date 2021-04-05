//取輸入框的值
//如果值內不是空白，github,getuser().then (data )

$(document).ready(function () {
  $('#searchUser').keyup(function () {
    let value = $(this).val();
    //console.log(value);
    getGithubUser(value);
    getUserRepo(value);
  });
});



function getGithubUser(username) {

  let url = `https://api.github.com/users/${username}?access_token=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`;
  $.ajax({
    type: "get",
    url: url,
    dataType: "json",

    success: function (data) {
      //console.log(data);
      insertProfile(data);

    },
    error: function (err) {
      //每次抓到錯誤，要執行下方判斷前，要先清除
      clearAlert();
      //console.log(err.responseJSON);
      if (err.responseJSON.message === "Not Found") {
        let container = $(".searchContainer");
        let search = $(".search");
        let alert = $('<div></div>');
        //boostrapt的class
        alert.addClass('alert alert-danger');
        alert.text(`User Not Found`);
        search.before(alert);
      }
    }

  });
  // Timeout after 3 sec
  setTimeout(() => {
    clearAlert();
  }, 3000);
}

// Clear alert message
function clearAlert() {
  const currentAlert = $('.alert');
  if (currentAlert) {
    currentAlert.remove();
  }
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
        <div id="repos"></div>
        `

  $('#profile').html(words);
}



// 取得專案資料
function getUserRepo(user) {
  let page = 5;
  let sort = 'creat:asc';
  let url = `https://api.github.com/users/${user}/repos?per_page=${page}&sort=${sort}`
  $.ajax({
    type: "get",
    url: url,
    dataType: "json",
    success: function (data) {
      //console.log(data)
      showRepo(data);
    }
  });
}


function showRepo(repo) {
  let output = '';

  $.each(repo, function (index, repo) {

    output += `
        <div class="card card-body mb-2">
          <div class="row">
            <div class="col-md-6">
              <a href="${repo.html_url}" target="_blank">${repo.name}</a>
            </div>
            <div class="col-md-6">
            <span class="badge badge-primary">Stars: ${repo.stargazers_count}</span>
            <span class="badge badge-secondary">Watchers: ${repo.watchers_count}</span>
            <span class="badge badge-success">Forks: ${repo.forms_count}</span>
            </div>
          </div>
        </div>
      `;
    $('#repos').html(output);
  });

}
