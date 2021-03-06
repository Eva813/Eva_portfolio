let locationIndex = 5;
$(document).ready(function () {
  $('button').click(function (e) {
    e.preventDefault();
    let value = $('input').val();
    // console.log(value);
    getWeather(value);
  })
});



function getWeather() {
  let url = "https://opendata.cwb.gov.tw/api/v1/rest/datastore/F-C0032-001?Authorization=CWB-F0145DA5-2539-4333-BAFD-466910C1EECC&format=JSON";
  let weekurl = "https://opendata.cwb.gov.tw/api/v1/rest/datastore/F-D0047-091?Authorization=CWB-F0145DA5-2539-4333-BAFD-466910C1EECC&format=JSON"
  $.ajax({
    type: "get",
    url: url,

    dataType: "json",
    success: function (data) {
      console.log(data);
      insertdata(data, locationIndex);
    },
    error: function (err) {
      console.log('oh no')
    }
  });


};

function insertdata(data, locationIndex) {
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
  <figure>
    ${weatherImg}
    <figcaption>${weatherDescription}</figcaption>
  </figure>
`);

  $('.cities').append(li);
};

function checkImg() {
  let weatherCode = weather[0].time[0].parameter.parameterValue;

  if (weatherCode === isThunderstorm) {
    return '<img class="city-icon src="images/svg/sunny.svg" alt="weather-img">';
  } else if (weatherCode === '多雲時晴' || weatherCode === '多雲') {
    return '<img  class="city-icon src="images/svg/sun-cloudy.svg" alt="weather-img">';
  } else if (weatherCode === '多雲時陰' || weatherCode === '陰時多雲' || weatherCode === '陰天') {
    return '<img class="city-icon src="images/svg/cloudy.svg" alt="weather-img">';
  } else {
    return '<img class="city-icon src="images/svg/rainy.svg" alt="weather-img">';
  }

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
}
