
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

doAjax()





// function getData(ajaxurl) {
//   return $.ajax({
//     url: ajaxurl,
//     dataType: 'json',
//     type: 'GET',
//   });
// };

// async function test() {
//   try {
//     const res = await getData(`https://jsonplaceholder.typicode.com/posts？_limit=${limit}&_page=${page}`)
//     console.log(res)
//   } catch (err) {
//     console.log(err);
//   }
// }

// test();
