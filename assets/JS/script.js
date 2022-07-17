var apiKey = '044bb9c5369619c2020f969f5078b5a5';
var cityInput = document.querySelector('#cityInput');
var searchBtn = document.querySelector('#searchBtn');

searchBtn.addEventListener('click', getWeather);

function getWeather() {
    //GEO LOCATION API TO GET LAT & LON FOR ONE CALL
    var cityLatLonURL ='http://api.openweathermap.org/geo/1.0/direct?q=' + cityInput.value + '&limit=1&appid=' + apiKey;
    fetch(cityLatLonURL)
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        var lat = data[0].lat;
        var lon = data[0].lon;
        //CURRENT BORDER BOX
        var todayContainerEl = document.querySelector('#todayContainer')
        todayContainerEl.className = "custom-today";
        //CITY NAME
        var cityName = document.createElement('h3');
        cityName.textContent = data[0].name;
        todayContainerEl.append(cityName);
        console.log(data);
      
        //ONE CALL FOR CURRENT & 5-DAY FORECAST
        var weatherURL = 'https://api.openweathermap.org/data/2.5/onecall?lat=' + lat + '&lon=' + lon + '&appid=' + apiKey + '&units=imperial';
        fetch(weatherURL)
          .then(function (response) {
            return response.json();
          })
          .then(function (data) {
            console.log(data);

        //CURRENT DATE
        var todayDate = document.createElement('h3');
        var todayDate = moment.unix(data.current.dt).format(" (MM/DD/YYYY) ");
        cityName.append(todayDate);    
        //CURRENT WEATHER EMOJI
        var imgEl = document.createElement('img');
        var iconCode = data.current.weather[0].icon;
        var iconUrl = "http://openweathermap.org/img/w/" + iconCode + ".png";
        imgEl.setAttribute('src', iconUrl);
        cityName.append(imgEl);
        //CURRENT TEMPERATURE
        var tempToday = document.createElement('p');
        tempToday.textContent = "Temperature: " + data.current.temp + "\u00B0" + " F";
        todayContainerEl.append(tempToday);
        //CURRENT WIND SPEED
        var windToday = document.createElement('p');
        windToday.textContent = "Wind: " + data.current.wind_speed + " MPH";
        todayContainerEl.append(windToday);
        //CURRENT HUMIDITY 
        var humidityToday = document.createElement('p');
        humidityToday.textContent = "Humidity: " + data.current.humidity + "%";
        todayContainerEl.append(humidityToday);
        //CURRENT UV INDEX - FIX THIS SECTION!!!
        //FIGURE OUT HOW TO ADD CSS TO THE VALUE
        //ADD IF STATMENTS TO DETERMINE COLOR (0-2 favorable, 3-5 moderate, 6+ severe)
        var uvindexToday = document.createElement('p');
        uvindexToday.textContent = "UV Index: " + data.current.uvi
        todayContainerEl.append(uvindexToday);

        //5-DAY FORECAST TITLE
        var fiveDayTitleEl = document.querySelector("#fiveDayTitle");
        fiveDayTitleEl.textContent = "5-Day Forcast:";

        //FOR LOOP FOR ALL 5 CARDS -- FIGURE OUT HOW TO ONLY SELECT THE FIRST 5 OF THE ARRAY IN DATA.DAILY.. NOT ALL 8. NEED HELP HERE!!!!
        for (var i = 0; i < data.daily; i++) {

        //CARDS
        // container + background
        var cardRowEl = document.querySelector("#cardRow");
        var cardEl = document.createElement('div');
        cardEl.classList.add("custom-card");
        cardEl.classList.add("col-2");
        cardRowEl.append(cardEl);
        //date
        var dateEl = document.createElement('div');
        dateEl.textContent = moment.unix(data.daily[i].dt).format("MM/DD/YYYY");
        dateEl.classList.add("custom-header");
        cardEl.append(dateEl);
        //emoji
        var imgEl = document.createElement('img');
        var iconCode = data.daily[i].weather[0].icon;
        var iconUrl = "http://openweathermap.org/img/w/" + iconCode + ".png";
        imgEl.setAttribute('src', iconUrl);
        cardEl.append(imgEl);
        //temp
        var temp = document.createElement('p');
        temp.textContent = "Temp: " + data.daily[i].temp.day + "\u00B0" + " F";
        cardEl.append(temp);
        //wind
        var wind = document.createElement('p');
        wind.textContent = "Wind: " + data.daily[i].wind_speed + " MPH";
        cardEl.append(wind);
        //humidity
        var humidity = document.createElement('p');
        humidity.textContent = "Humidity: " + data.daily[i].humidity + "%";
        cardEl.append(humidity);
        }
        });
      });
}    
        
        
        
