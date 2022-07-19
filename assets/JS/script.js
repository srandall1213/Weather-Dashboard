var apiKey = '044bb9c5369619c2020f969f5078b5a5';
var cityInput = document.querySelector('#cityInput');
var searchBtn = document.querySelector('#searchBtn');

//CLICK SEARCH TO GET WEATHER & CLEAR PREVIOUS INFO FROM SCREEN
searchBtn.addEventListener('click', function(event) {
  event.preventDefault();

  if (cityInput.value === "") {
    alert("City cannot be blank.");
  } else {
    document.querySelector("#cardRow").innerHTML = '';
    document.querySelector('#todayContainer').innerHTML = '';
    getWeather();
    save();
  }

});

// SET CITIES TO STORAGE
function save() {
  var new_city = document.querySelector('#cityInput').value;

  if(localStorage.getItem('Cities:') == null) {
    localStorage.setItem('Cities:', '[]');
  }

  var old_city = JSON.parse(localStorage.getItem('Cities:'));
  old_city.push(new_city);

  localStorage.setItem('Cities:', JSON.stringify(old_city));
}

//TRYING TO FIGURE OUT HOW TO RENDER CITY FROM SEARCH HISTORY.. BELOW IS AN EXAMPLE FROM CLASS THAT I'M TRYING TO APPLY
var oldCityClickHandler = function (event) {
  var searchedCity = event.target.getAttribute('data-search');

  if (searchedCity) {
    getWeather(searchedCity);
    document.querySelector("#cardRow").innerHTML = '';
    document.querySelector('#todayContainer').innerHTML = '';
  }

  console.log(JSON.parse(localStorage.getItem('Cities:'))) //need to get specific city that matches the button

};

// CLICK CITY NAME IN SEARCH HISTORY TO RENDER THAT CITY
searchItemBtn.addEventListener('click', oldCityClickHandler);

function getWeather() {
    //GEO LOCATION API TO GET LATITUDE & LONGITUDE FOR "ONE CALL"
    var cityLatLonURL ='https://api.openweathermap.org/geo/1.0/direct?q=' + cityInput.value + '&limit=1&appid=' + apiKey;
    fetch(cityLatLonURL)
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        var lat = data[0].lat;
        var lon = data[0].lon;
        
        //CURRENT DAY BORDER BOX
        var todayContainerEl = document.querySelector('#todayContainer')
        todayContainerEl.className = "custom-today";

        //CURRENT DAY BOX - CITY NAME
        var cityName = document.createElement('h3');
        var cityData = data[0].name;
        cityName.innerHTML = cityData;
        todayContainerEl.append(cityName);

        //SEARCH HISTORY DIVIDER LINE
        var dividerEl = document.querySelector("#divider");
        dividerEl.className = "searchDivider";

        //SEARCH HISTORY
        var searchHistoryContainer = document.querySelector("#searchHistory")
        var searchItemBtn = document.createElement('button');
        searchItemBtn.classList.add("searchItemBtn");
        searchItemBtn.setAttribute('data-search', cityData);
        searchItemBtn.innerHTML = cityData;
        searchHistoryContainer.append(searchItemBtn);  


        //"ONE CALL" FOR CURRENT & 5-DAY FORECAST
        var weatherURL = 'https://api.openweathermap.org/data/2.5/onecall?lat=' + lat + '&lon=' + lon + '&appid=' + apiKey + '&units=imperial';
        fetch(weatherURL)
          .then(function (response) {
            return response.json();
          })
          .then(function (data) {
            console.log(data)

          //CURRENT DATE
          var todayDate = document.createElement('h3');
          var currentDate = moment.unix(data.current.dt).format(" (MM/DD/YYYY) ");
          todayDate = currentDate;
          cityName.append(todayDate);
        
          //CURRENT WEATHER ICON
          var imgEl = document.createElement('img');
          var iconCode = data.current.weather[0].icon;
          var iconUrl = "https://openweathermap.org/img/w/" + iconCode + ".png";
          imgEl.setAttribute('src', iconUrl);
          cityName.append(imgEl);
       
          //CURRENT TEMPERATURE
          var tempToday = document.createElement('p');
          var currentTemp = data.current.temp;
          tempToday.innerHTML = "Temperature: " + currentTemp + "\u00B0" + " F";
          todayContainerEl.append(tempToday);
    
          //CURRENT WIND SPEED
          var windToday = document.createElement('p');
          var currentWind = data.current.wind_speed;
          windToday.innerHTML = "Wind: " + currentWind + " MPH";
          todayContainerEl.append(windToday);

          //CURRENT HUMIDITY 
          var humidityToday = document.createElement('p');
          var currentHumidity = data.current.humidity;
          humidityToday.innerHTML = "Humidity: " + currentHumidity + "%";
          todayContainerEl.append(humidityToday);

          //CURRENT UV INDEX 
          var uvColorBox = document.createElement('p');
          var currentUVI = data.current.uvi;
          var uvColorBoxText = document.createTextNode(`UV Index: ${currentUVI}`);

          if (currentUVI <= 2) {
            $(uvColorBox).addClass("favorable");
          } else if (currentUVI >= 3 && currentUVI <= 5) {
            $(uvColorBox).addClass("moderate");
          } else {
            $(uvColorBox).addClass("severe");
          }

          uvColorBox.append(uvColorBoxText);
          todayContainerEl.append(uvColorBox);
      
          //5-DAY FORECAST TITLE
          var fiveDayTitleEl = document.querySelector("#fiveDayTitle");
          fiveDayTitleEl.innerHTML = "5-Day Forecast:";

          //FOR LOOP FOR ALL 5 CARDS
          for (var i = 0; i < 5; i++) {

          //5-DAY FORECAST CARDS
          // container + background
          var cardRowEl = document.querySelector("#cardRow");
          var cardEl = document.createElement('div');
          cardEl.classList.add("custom-card");
          cardEl.classList.add("col");
          cardRowEl.append(cardEl);
          //date
          var dateEl = document.createElement('div');
          var dateData = moment.unix(data.daily[i].dt).format("MM/DD/YYYY")
          dateEl.innerHTML = dateData;
          dateEl.classList.add("custom-header");
          cardEl.append(dateEl);
          //icon
          var imgEl5 = document.createElement('img');
          var iconCode5 = data.daily[i].weather[0].icon;
          var iconUrl5 = "https://openweathermap.org/img/w/" + iconCode5 + ".png";
          imgEl5.setAttribute('src', iconUrl5);
          cardEl.append(imgEl5);
          //temp
          var temp = document.createElement('p');
          var tempData = data.daily[i].temp.day
          temp.innerHTML = "Temp: " + tempData + "\u00B0" + " F";
          cardEl.append(temp);
          //wind
          var wind = document.createElement('p');
          var windData = data.daily[i].wind_speed
          wind.innerHTML = "Wind: " + windData + " MPH";
          cardEl.append(wind);
          //humidity
          var humidity = document.createElement('p');
          var humidityData = data.daily[i].humidity
          humidity.innerHTML = "Humidity: " + humidityData + "%";
          cardEl.append(humidity);
          }

        });
      }); 
}


        
        
        
