var apiKey = '044bb9c5369619c2020f969f5078b5a5';
var cityInput = document.querySelector('#cityInput');
var searchBtn = document.querySelector('#searchBtn');

searchBtn.addEventListener('click', getWeather);

function getWeather() {
    //GEO LOCATION API TO GET LAT & LON FOR ONE CALL
    var cityLatLonURL ='https://api.openweathermap.org/geo/1.0/direct?q=' + cityInput.value + '&limit=1&appid=' + apiKey;
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
        var iconUrl = "https://openweathermap.org/img/w/" + iconCode + ".png";
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
        //CURRENT UV INDEX 
        var uvColorBox = document.createElement('p');
        var uvColorBoxText = document.createTextNode(`UV Index: ${data.current.uvi}`);
       
        if (data.current.uvi <= 2) {
          $(uvColorBox).addClass("favorable");
        } else if (data.current.uvi >= 3 && data.current.uvi <= 5) {
          $(uvColorBox).addClass("moderate");
        } else {
          $(uvColorBox).addClass("severe");
        }

        uvColorBox.append(uvColorBoxText);
        todayContainerEl.append(uvColorBox);
      
        //5-DAY FORECAST TITLE
        var fiveDayTitleEl = document.querySelector("#fiveDayTitle");
        fiveDayTitleEl.textContent = "5-Day Forcast:";
        
        //FOR LOOP FOR ALL 5 CARDS
        for (var i = 0; i < 5; i++) {

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
        var iconUrl = "https://openweathermap.org/img/w/" + iconCode + ".png";
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
        
        
        
