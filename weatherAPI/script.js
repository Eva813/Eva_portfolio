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
  console.log(data, locationIndex)
  let name = data.records.location[locationIndex].locationName;
  let weather = data.records.location[locationIndex].weatherElement;
  console.log(name);
  console.log(weather);
  // 天氣描述
  let weatherDescription = weather[6].time[0].elementValue[0].value;
  let weatherTemp = data.location[cityNum].weatherElement[1].time[0].elementValue[0].value;
  let weatherImg = changeImg(weatherDescription);

  // const icon = `https://openweathermap.org/img/wn/${weather[0]["icon"]
  //   }@2x.png`;
  let li = $('<li></li>');
  li.addClass("city");
  const markup = `
  <h2 class="city-name" data-name="${name},">
    <span>${name}</span>
    <sup>2</sup>
  </h2>
  <div class="city-temp">${Math.round(main.temp)}<sup>°C</sup>
  </div>
  <figure>
    <img class="city-icon" src=${icon} alt=${weather[0]["main"]}>
    <figcaption>${weather[0]["description"]}</figcaption>
  </figure>
`;
}
