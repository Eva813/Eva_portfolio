
$('button').click(
  function (e) {
    e.preventDefault();//要用.preventDefault()來停止預設行為的發生

    // 清空內容
    $('#results').html('');
    $('#buttons').html('');
    let q = $('#search-field').val();
    getVideo(q);

  }
)


function getVideo() {
  let value = $('#search-field').val();
  let youtubeURL = "https://www.googleapis.com/youtube/v3/search";
  $.ajax({
    type: "GET",
    url: youtubeURL,
    data: {//將要放入網址的參數放在這
      part:
        'id,snippet',// 必填，把需要的資訊列出來
      q: value,// 查詢文字
      maxResults: 5,// 預設為五筆資料，可以設定1~50
      type: "video",
      key: 'AIzaSyCKPRCaNS-PQJLl2jzoQEf-O4I0tnrtd8M'// 使用 API 只能取得公開的播放清單

    },
    dataType: "json",
    success: function (data) {
      //console.log(data);
      let nextPageToken = data.nextPageToken;
      let prevPageToken = data.prevPageToken;

      //試著將收到的資料傳入，並呈現於畫面中
      insertItems(data);

      getBtn(data, prevPageToken, nextPageToken)


    }, error: function (err) {
      console.log('oh no');
    }
  });
}

function insertItems(item) {
  let output = '';
  $.each(item.items, function (index, value) {
    let videoId = item.items[index].id.videoId;
    let videoTitle = item.items[index].snippet.title;
    let description = item.items[index].snippet.description;
    let thumbnailURL = item.items[index].snippet.thumbnails.high.url;//高解析度影片縮圖
    let channelTitle = item.items[index].snippet.channelTitle;
    let publishedDate = item.items[index].snippet.publishedAt;
    // 按鈕


    //data-type="iframe" 
    output += `<li><div class="list-left">
    <img src=" ${thumbnailURL}"></div>
    <div class="list-right">
    <h3>
    <a data-fancybox data-type="iframe" data-src="https://www.youtube.com/embed/${videoId}" "href="javascript:;"> ${videoTitle} </a></h3> <small>By <span class="cTitle"> ${channelTitle}</span> on ${publishedDate}</small>
    <p> ${description} <p></div></li> <div classs="clearfix"></div> 
    `

    $('#results').html(output);
  });
};




// //製作上一頁、下一頁跳轉按鈕(沒有prevPageToken)
function getBtn(value, prevPageToken, nextPageToken) {//前面加一個驚嘆號，代表否定
  console.log(nextPageToken)
  if (!prevPageToken) {
    var btnOutput = $(`<div class="button-container">
    <button id="next-button" class="paging-button" data-token="${nextPageToken}" data-query="${value}" onclick="pressNext();"> Next Page</button></div>`
    )
    $("#buttons").append(btnOutput);
  } else {
    var btnOutput = $(`<div class="button-container"><button id="prev-button" class="paging-button" data-token="${prevPageToken}" data-query="${value}" onclick="pressPrev();"> Prev Page</button>  
    <button id="next-button" class="paging-button"  data-token="${nextPageToken}" data-query="${value}" onclick="pressNext();">Next Page</button></div>`)
    $("#buttons").append(btnOutput);
  }

}


//取得下一頁的資料
function pressNext() {

  let youtubeURL = "https://www.googleapis.com/youtube/v3/search";
  let token = $('#next-button').data('token');
  let value = $('#search-field').val();
  $.ajax({
    type: "GET",
    url: youtubeURL,
    data: {//將要放入網址的參數放在這
      part:
        'id,snippet',// 必填，把需要的資訊列出來
      q: value,// 查詢文字
      pageToken: token,
      maxResults: 5,// 預設為五筆資料，可以設定1~50
      type: "video",

      key: 'AIzaSyCKPRCaNS-PQJLl2jzoQEf-O4I0tnrtd8M'// 使用 API 只能取得公開的播放清單

    },
    dataType: "json",
    success: function (data) {
      console.log(data);
      let nextPageToken = data.nextPageToken;
      let prevPageToken = data.prevPageToken;

      // 清空內容
      $('#results').html('');
      $('#buttons').html('');
      //試著將收到的資料傳入，並呈現於畫面中
      insertItems(data);

      getBtn(data, prevPageToken, nextPageToken)


    }, error: function (err) {
      console.log('oh no');
    }
  });

}


//前一頁
function pressPrev() {
  // 清空內容
  $('#results').html('');
  $('#buttons').html('');
  let youtubeURL = new URL(`https://www.googleapis.com/youtube/v3/search?`);
  let token = $('#prev-button').data('token');
  let value = $('#search-field').val();
  $.ajax({
    type: "GET",
    url: youtubeURL,
    data: {//將要放入網址的參數放在這
      part:
        'id,snippet',// 必填，把需要的資訊列出來
      q: value,// 查詢文字
      pageToken: token,
      maxResults: 5,// 預設為五筆資料，可以設定1~50
      type: "video",

      key: 'AIzaSyCKPRCaNS-PQJLl2jzoQEf-O4I0tnrtd8M'// 使用 API 只能取得公開的播放清單

    },
    dataType: "json",
    success: function (data) {
      console.log(data);
      let nextPageToken = data.nextPageToken;
      let prevPageToken = data.prevPageToken;

      // 清空內容
      $('#results').html('');
      $('#buttons').html('');
      //試著將收到的資料傳入，並呈現於畫面中
      insertItems(data);

      getBtn(data, prevPageToken, nextPageToken)


    }, error: function (err) {
      console.log('oh no');
    }
  });

}


//fancyBox
$('[data-fancybox]').fancybox({
  toolbar: false,
  smallBtn: true,
  iframe: {
    preload: false, // 自動調整 <iframe> 的寬度 / 高度

  }
});

const iframe = document.createElement('iframe');
iframe.setAttribute('allow', 'fullscreen'); // must be 1st

