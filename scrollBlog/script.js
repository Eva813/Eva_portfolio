$(document).ready(function () {
  doAjax();
});


let limit = 5
let page = 1

async function doAjax() {
  let result;

  try {
    result = await $.ajax({
      url: `https://jsonplaceholder.typicode.com/posts?_limit=${limit}&_page=${page}`,
      type: 'get',
      dataType: 'json',
      success: function (data) {
        $.each(data, function (index, value) {


          const postEl = $('<div />').addClass('post').html(`<div class="number">${value.id}</div> <div class="post-info"><h2 class="post-title">${value.title}</h2><p class="post-body">${value.body}</p>
      </div>`)
          //console.log(postEl)
          postEl.appendTo('#posts-container');
          //$('#posts-container').append(postEl)

        });


        //console.log(data);
      }
    });

    return result;
  } catch (error) {
    console.error(error);
  }

}




$(window).scroll(function () {
  var scrollTop = $(this).scrollTop();
  var scrollHeight = $('body').prop("scrollHeight");
  //一樣 var scrollHeight2 = document.documentElement.scrollHeight;
  var clientHeight = document.documentElement.clientHeight;
  //https://stackoverflow.com/questions/10423759/plain-javascript-to-jquery-clientheight

  console.log('scrollTop:', scrollTop);
  console.log('scrollHeight:', scrollHeight);
  console.log('clientHeight:', clientHeight);


  if (scrollTop + clientHeight >= scrollHeight - 5) {
    console.log('123')
    // showLoading();
  }
})



