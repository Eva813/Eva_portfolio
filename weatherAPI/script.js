$(document).ready(function () {
  $('button').click(function (e) {
    e.preventDefault();
    let value = $('input').val();
    // console.log(value);
    getWeather(value);
  })
});
let locationIndex = 5;


function getWeather() {
  let url = "https://opendata.cwb.gov.tw/api/v1/rest/datastore/F-C0032-001?Authorization=CWB-F0145DA5-2539-4333-BAFD-466910C1EECC&format=JSON";
  $.ajax({
    type: "get",
    url: url,

    dataType: "json",
    success: function (data) {
      console.log(data);
      insertdata(data, locationNum);
    },
    error: function (err) {
      console.log('oh no')
    }
  });


};
let locationNum = 0;
function insertdata(data, locationNum) {
  // console.log(data, locationNum)
  let name = data.location[locationNum].locationName;
  let weather = data.location[locationNum].weatherElement;
  console.log(name);
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
