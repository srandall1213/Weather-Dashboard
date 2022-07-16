var apiKey = '044bb9c5369619c2020f969f5078b5a5';
var cityInput = document.querySelector('#cityInput');
var searchBtn = document.querySelector('#searchBtn');

searchBtn.addEventListener('click', today);
searchBtn.addEventListener('click', fiveDayForcast);

function today() {
    var todayURL = 'https://api.openweathermap.org/data/2.5/weather?q=' + cityInput.value + '&appid=' + apiKey + '&units=imperial';
    fetch(todayURL)
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        console.log(data);

        //TODAY BORDER BOX
        var todayContainerEl = document.querySelector('#todayContainer')
        todayContainerEl.className = "custom-today";
        //CITY NAME
        var cityName = document.createElement('h3');
        cityName.textContent = data.name;
        todayContainerEl.append(cityName);
        //TODAY'S DATE
        var todayDate = document.createElement('h3');
        var todayDate = moment.unix(data.dt).format(" (MM/DD/YYYY) ");
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
  //NEED TO CHECK IF COUNT = 5 PARAMETER IS RIGHT... 5 DAYS OR 5 TIMESTAMPS IN ONE DAY?
  var fiveDayURL = 'https://api.openweathermap.org/data/2.5/forecast?q=' + cityInput.value + '&appid=' + apiKey + '&units=imperial&cnt=5';
    fetch(fiveDayURL)
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        console.log(data);

        //5-DAY FORCAST TITLE
        var fiveDayTitleEl = document.querySelector("#fiveDayTitle");
        fiveDayTitleEl.textContent = "5-Day Forcast:";

        //FOR LOOP FOR ALL 5 CARDS - NOT RIGHT VARIABLES
        for (var i = 0; i < data.list.length; i++) {

        //CARDS
        //container + background
        var cardRowEl = document.querySelector("#cardRow");
        var cardEl = document.createElement('div');
        cardEl.classList.add("custom-card");
        cardEl.classList.add("col-2");
        cardRowEl.append(cardEl);
        //date
        var dateEl = document.createElement('div');
        dateEl.textContent = moment.unix(data.list[0].dt).format("MM/DD/YYYY");
        dateEl.classList.add("custom-header");
        cardEl.append(dateEl);
        //emoji
        var imgEl = document.createElement('img');
        var iconCode = data.list[0].weather[0].icon;
        var iconUrl = "http://openweathermap.org/img/w/" + iconCode + ".png";
        imgEl.setAttribute('src', iconUrl);
        cardEl.append(imgEl);
        //temp
        var temp = document.createElement('p');
        temp.textContent = "Temp: " + data.list[0].main.temp + "\u00B0" + " F";
        cardEl.append(temp);
        //wind
        var wind = document.createElement('p');
        wind.textContent = "Wind: " + data.list[0].wind.speed + " MPH";
        cardEl.append(wind);
        //humidity
        var humidity = document.createElement('p');
        humidity.textContent = "Humidity: " + data.list[0].main.humidity + "%";
        cardEl.append(humidity);
        }
      });
}
        
        
        
