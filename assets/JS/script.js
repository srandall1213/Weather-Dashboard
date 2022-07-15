var apiKey = '044bb9c5369619c2020f969f5078b5a5';
var cityInput = document.querySelector('#cityInput');
var searchBtn = document.querySelector('#searchBtn');
var todayContainerEl = document.querySelector('#todayContainer')

function todayBox() {
    var queryURL = 'http://api.openweathermap.org/data/2.5/weather?q=' + cityInput.value + '&appid=' + apiKey + '&units=imperial';
    fetch(queryURL)
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        console.log(data);
        for (var i = 0; i < data.length; i++) {
        console.log(data[i]);
            
            var cityName = document.createElement('h3');
            cityName.textContent = data[i].name;
            todayContainerEl.append(cityName);

            // $("#city").text(data[i].name);

        
            // var todayDateEl = moment();
            // $('#todayDate').text(todayDateEl.format("(MM/DD/YYYY)"));

            //$("#todayEmoji").text(data[i].weather.0.icon)
            

            // $("#tempToday").text(data[i].main.temp);
            // $("#windToday").text(data[i].wind.speed);
            // $("#humidityToday").text(data[i].main.humidity);
            // $("#uvIndexToday").text(data[i].);

        }
      });
}
searchBtn.addEventListener('click', todayBox);