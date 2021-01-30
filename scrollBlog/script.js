
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
          $('<div />')

        });


        console.log(data);
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
