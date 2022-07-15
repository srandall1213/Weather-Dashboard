var apiKey = '044bb9c5369619c2020f969f5078b5a5';
var cityInput = document.querySelector('#cityInput');
var searchBtn = document.querySelector('#searchBtn');

function todayBox() {
    var queryURL = 'http://api.openweathermap.org/data/2.5/weather?q=' + cityInput.value + '&appid=' + apiKey;
    fetch(queryURL)
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        console.log(data);
        // for (var i = 0; i < data.length; i++) {
        //     $("#city").text(cityInput);

        //     var todayDateEl = moment();
        //     $('#todayDate').text(todayDateEl.format("(MM/DD/YYYY)"));

        //     $("#tempToday").text(data[i].temperature);
        //     $("#windToday").text(data[i].wind);
        //     $("#humidityToday").text(data[i].humidity);
        //     $("#uvIndexToday").text(data[i].uvindex);

        // }
      });
  }
searchBtn.addEventListener('click', todayBox);