let locationIndex = 5;
$(document).ready(function (e) {
  getCity();

  //https://codertw.com/%E5%89%8D%E7%AB%AF%E9%96%8B%E7%99%BC/287007/



});



function getCity() {
  let url = "https://opendata.cwb.gov.tw/api/v1/rest/datastore/F-C0032-001?Authorization=CWB-F0145DA5-2539-4333-BAFD-466910C1EECC&format=JSON";

  $.ajax({
    type: "get",
    url: url,

    dataType: "json",
    success: function (data) {
      console.log(data);
      let selectCity = $('#sector-list');
      for (let i = 0; i < data.records.location.length; i++) {
        let opt = $('<option></option>');
        opt.attr("data-index", i);
        opt.html(data.records.location[i].locationName);
        selectCity.append(opt);
      }
      $('button').click(function (e) {
        e.preventDefault();
        clear();
        let selectedCityIndex = $('#sector-list').get(0).selectedIndex;
        getWeather(data, selectedCityIndex);

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
}

function getWeather(data, locationIndex) {

  //console.log(data, locationIndex)
  let name = data.records.location[locationIndex].locationName;
  let weather = data.records.location[locationIndex].weatherElement;
  // console.log(name);
  // console.log(weather);
  // 天氣描述
  let weatherDescription = weather[0].time[0].parameter.parameterName;
  let weatherCode = weather[0].time[0].parameter.parameterValue;
  let minTemp = weather[2].time[0].parameter.parameterName;
  let maxTemp = weather[4].time[0].parameter.parameterName;
  let weatherImg = checkImg(weatherCode);



  let li = $('<li></li>').appendTo('.cities');
  li.addClass("city");
  li.html(`
  <h2 class="city-name" data-name="${name},">
    <span>${name}</span>
    <sup>2</sup>
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

function checkImg(data) {
  let weatherData = data;
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


function getweek() {
  let weekurl = "https://opendata.cwb.gov.tw/api/v1/rest/datastore/F-D0047-091?Authorization=CWB-F0145DA5-2539-4333-BAFD-466910C1EECC&format=JSON"
  $.ajax({
    type: "get",
    url: weekurl,
    dataType: "json",
    success: function (res) {
      console.log(res)
    }
  });
}
getweek()
