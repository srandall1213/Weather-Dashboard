var apiKey = '044bb9c5369619c2020f969f5078b5a5';
var cityInput = document.querySelector('#cityInput');
var searchBtn = document.querySelector('#searchBtn');
var todayContainerEl = document.querySelector('#todayContainer')

searchBtn.addEventListener('click', todayBox);
searchBtn.addEventListener('click', fiveDayForcast);

function todayBox() {
    var todayURL = 'https://api.openweathermap.org/data/2.5/weather?q=' + cityInput.value + '&units=imperial' + '&appid=' + apiKey;
    fetch(todayURL)
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        console.log(data);

        //TODAY BORDER BOX
        todayContainerEl.className = "custom-today";
        //CITY NAME
        var cityName = document.createElement('h3');
        cityName.textContent = data.name;
        todayContainerEl.append(cityName);
        //TODAY'S DATE
        var todayDate = document.createElement('h3');
        var todayDate = moment.unix(data.dt).format(" (MM/DD/YYYY)");
        cityName.append(todayDate);    
        //TODAY'S WEATHER EMOJI
        var imgEl = document.createElement('img');
        var iconCode = data.weather[0].icon;
        var iconUrl = "http://openweathermap.org/img/w/" + iconCode + ".png";
        imgEl.setAttribute('src', iconUrl);
        cityName.append(imgEl);
        //TODAY'S TEMPERATURE
        var tempToday = document.createElement('p');
        tempToday.textContent = "Temperature: " + data.main.temp + "\u00B0" + " F";
        todayContainerEl.append(tempToday);
        //TODAY'S WIND SPEED
        var windToday = document.createElement('p');
        windToday.textContent = "Wind: " + data.wind.speed + " MPH";
        todayContainerEl.append(windToday);
        //TODAY'S HUMIDITY 
        var humidityToday = document.createElement('p');
        humidityToday.textContent = "Humidity: " + data.main.humidity + "%";
        todayContainerEl.append(humidityToday);
        //TODAY'S UV INDEX - FIX THIS SECTION!!! 
        //FIND UV INDEX CALL
        //FIGURE OUT HOW TO ADD CSS TO THE VALUE
        //ADD IF STATMENTS TO DETERMINE COLOR (0-2 low, 3-5 moderate, 6-7 high, 8-10 very high, 11+ extreme)
        var uvindexToday = document.createElement('p');
        uvindexToday.textContent = "UV Index: " + data.main.temp
        todayContainerEl.append(uvindexToday);
        });
}      

function fiveDayForcast() {

  var fiveDayUrl = 'https://api.openweathermap.org/data/2.5/weather?q=' + cityInput.value + '&units=imperial' + '&appid=' + apiKey;
    fetch(fiveDayUrl)
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        console.log(data);


      });
}