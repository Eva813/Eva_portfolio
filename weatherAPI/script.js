let locationIndex = 5;
$(document).ready(function (e) {
  getCity();

  //https://codertw.com/%E5%89%8D%E7%AB%AF%E9%96%8B%E7%99%BC/287007/
  $('#selector-list').change(function () {
    $('.msg').text('別忘了按下SUBMIT');
  })


});


function getCity() {
  let url = "https://opendata.cwb.gov.tw/api/v1/rest/datastore/F-D0047-091?Authorization=CWB-F0145DA5-2539-4333-BAFD-466910C1EECC&format=JSON";

  $.ajax({
    type: "get",
    url: url,

    dataType: "json",
    success: function (data) {
      console.log(data);
      let selectCity = $('#selector-list');
      for (let i = 0; i < data.records.locations[0].location.length; i++) {
        let opt = $('<option></option>');
        opt.attr("data-index", i);
        opt.html(data.records.locations[0].location[i].locationName);
        selectCity.append(opt);
      }
      $('button').click(function (e) {
        e.preventDefault();
        clear();
        let selectedCityIndex = $('#selector-list').get(0).selectedIndex;
        getWeather(data, selectedCityIndex);
        weekWeather(data, selectedCityIndex);
      })

    },
    error: function (err) {
      console.log('oh no')
    }
  });


};
// 資料清除
function clear() {
  $('.cities').html('');
  $('.week-ul').html('');
  $('.msg').text('');
}

// 抓取日期

// function getDate() {
//   let today = new Date();
//   console.log(today)
//   return today;

// }
// getDate()


function getWeather(data, locationIndex) {

  //console.log(data, locationIndex)
  let name = data.records.locations[0].location[locationIndex].locationName;
  let weather = data.records.locations[0].location[locationIndex].weatherElement;
  //console.log(name);
  //console.log(weather);
  // 天氣描述
  let weatherDescription = weather[6].time[0].elementValue[0].value;
  let weatherCode = weather[6].time[0].elementValue[1].value;
  let minTemp = weather[8].time[0].elementValue[0].value;
  let maxTemp = weather[12].time[0].elementValue[0].value;
  let weatherImg = checkImg(weatherCode);
  // 今天日期
  // let date = getDate().toUTCString();

  console.log(weatherCode);

  let li = $('<li></li>').appendTo('.cities');
  li.addClass("city");
  li.html(`
  <h2 class="city-name" data-name="${name},">
    <span>${name}</span>
    <sup>Today</sup>
  </h2>
  <div class="city-temp">${Math.round(minTemp)}<sup>°C</sup> ~ ${Math.round(maxTemp)}<sup>°C</sup>
  </div>
  <figure class='weather-icon'>
    ${weatherImg}
    <figcaption>${weatherDescription}</figcaption>
  </figure>
`);

  $('.cities').append(li);
};



function weekWeather(data, locationIndex) {
  // $('.week-ul').html('');
  var weather = data.records.locations[0].location[locationIndex].weatherElement;
  for (let i = 1; i < 7; i++) {
    let timeIndex = 2 * i;
    let weekday = $('<li></li>').appendTo('.week-ul');
    weekday.addClass('day').attr('id', `day-${i}`);

    let weatherDescription = weather[6].time[timeIndex].elementValue[0].value;
    let weatherCode = weather[6].time[timeIndex].elementValue[1].value;
    let minTemp = weather[8].time[timeIndex].elementValue[0].value;
    let maxTemp = weather[12].time[timeIndex].elementValue[0].value;
    let weatherImg = checkImg(weatherCode);
    console.log(weatherDescription);

    ////////////
    let today = new Date();
    let tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + i);
    let weekDay = tomorrow.getDay();
    let weekMonth = tomorrow.getMonth()
    let date = tomorrow.getDate();
    const dayNamesEn = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const monthNamesEn = [
      'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
      'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
    ]
    let inweekDay = dayNamesEn[weekDay]
    let inweekMonth = monthNamesEn[weekMonth];
    let indate = date;
    ///////////


    weekday.html(`<li class="day">
          <h2 class="whichDay" data-name="">
            <span>${indate} ${inweekMonth}</span>
            <sup>${inweekDay}</sup>
          </h2>
          <div class="city-temp">${minTemp}<sup>°C</sup> ~ ${maxTemp}<sup>°C</sup>
          </div>
          <figure class='weather-icon'>
            ${weatherImg}
            <figcaption>${weatherDescription}</figcaption>
          </figure>
        </li>`)
    $('.week-ul').append(weekday);
  }
}
// 測試取得隔一天的日期，並擷取其中的日期、月份、星期，nextweek()
// function nextweek() {
//   for (let i = 1; i < 7; i++) {
//     let today = new Date();
//     let tomorrow = new Date(today);
//     tomorrow.setDate(tomorrow.getDate() + i);
//     let weekDay = tomorrow.getDay();
//     let weekMonth = tomorrow.getMonth()
//     let date = tomorrow.getDate();
//     const dayNamesEn = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
//     const monthNamesEn = [
//       'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
//       'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
//     ]
//     let inweekDay = dayNamesEn[weekDay]
//     let inweekMonth = monthNamesEn[weekMonth];
//     let indate = date;

//     console.log(dayNamesEn[weekDay]); //Friday
//     console.log(monthNamesEn[weekMonth])
//     console.log(date);
//     // console.log(tomorrow.toUTCString());

//   }
// }


function checkImg(data) {
  let weatherData = +data;
  const weatherTypes = {
    isThunderstorm: [15, 16, 17, 18, 21, 22, 33, 34, 35, 36, 41],
    isClear: [1],
    isCloudyFog: [25, 26, 27, 28],
    isCloudy: [2, 3, 4, 5, 6, 7],
    isFog: [24],
    isPartiallyClearWithRain: [
      8, 9, 10, 11, 12,
      13, 14, 19, 20, 29, 30,
      31, 32, 38, 39,
    ],
    isSnowing: [23, 37, 42],
  };
  // console.log(data)
  // console.log(weatherTypes.isPartiallyClearWithRain)

  // let s = weatherTypes.isThunderstorm.includes(weatherData);
  // console.log(s);



  if (weatherTypes.isThunderstorm.includes(weatherData)) {
    return `<img class="city-icon" src="./img/thunderstorm.png" alt="weather-img">`;
  } else if (weatherTypes.isClear.includes(weatherData)) {
    return `<img class="city-icon" src="./img/clear.png" alt="weather-img">`;
  } else if (weatherTypes.isCloudyFog.includes(weatherData)) {
    return `<img class="city-icon" src="./img/cloudyfog.png" alt="weather-img">`;
  } else if (weatherTypes.isCloudy.includes(weatherData)) {
    return `<img class="city-icon" src="./img/cloud-and-sun.png" alt="weather-img">`;
  } else if (weatherTypes.isFog.includes(weatherData)) {
    return `<img class="city-icon" src="./img/fog.png" alt="weather-img">`;
  } else if (weatherTypes.isPartiallyClearWithRain.includes(weatherData)) {
    return `<img class="city-icon" src="./img/clearwithrainy.png" alt="weather-img">`;
  } else { return `<img class="city-icon" src="./img/snow.png" alt="weather-img">`; }

}


