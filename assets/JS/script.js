var apiKey = '044bb9c5369619c2020f969f5078b5a5';
var cityInput = document.querySelector('#cityInput');
var searchBtn = document.querySelector('#searchBtn');
var searchHistoryEl = document.querySelector("#searchHistory");
var searchButtons = document.getElementsByClassName('searchItemBtn');

//CLICK SEARCH TO GET WEATHER & CLEAR PREVIOUS INFO FROM SCREEN
searchBtn.addEventListener('click', function(event) {
  event.preventDefault();

  if (cityInput.value === "") {
    alert("City cannot be blank.");
  } else {
    document.querySelector("#cardRow").innerHTML = '';
    document.querySelector('#todayContainer').innerHTML = '';
    getWeather(cityInput.value);
    save();
    getButtons();
  }
});

// SAVE FUNCTION
function save() {
  var new_city = document.querySelector('#cityInput').value;
  
  if(localStorage.getItem('Cities:') == null) {
    localStorage.setItem('Cities:', '[]');
  }
  var old_city = JSON.parse(localStorage.getItem('Cities:'));
  old_city.push(new_city);
  
  localStorage.setItem('Cities:', JSON.stringify(old_city));

  //Divider Line CSS
  var dividerEl = document.querySelector("#divider");
  dividerEl.className = "searchDivider";
}

//SEARCH HISTORY BUTTONS
//Creates buttons from storage
function getButtons() {
  var old_city = JSON.parse(localStorage.getItem('Cities:'));
  searchHistoryEl.innerHTML = "";
  for (var i = 0; i < old_city.length; i++) {
    var searchItemBtn = document.createElement('button');
    searchItemBtn.classList.add("searchItemBtn");
    var searchedCity = JSON.parse(localStorage.getItem('Cities:'))[i];
    searchItemBtn.innerHTML += searchedCity;
    searchHistoryEl.append(searchItemBtn); 
    renderWeather();
  }

  //Render city's forecast on click
  function renderWeather() {
    searchItemBtn.addEventListener("click", function(event) { 
      event.preventDefault();
      if (searchItemBtn) {
        document.querySelector("#cardRow").innerHTML = '';
        document.querySelector('#todayContainer').innerHTML = ''
        getWeather(event.target.innerHTML);
      }
    });
  }
}

//GET WEATHER FUNCTION
function getWeather(city) {
    //Geo location to get latitude and longitude for "One Call"
    var cityLatLonURL ='https://api.openweathermap.org/geo/1.0/direct?q=' + city + '&limit=1&appid=' + apiKey;
    fetch(cityLatLonURL)
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        var lat = data[0].lat;
        var lon = data[0].lon;
        
        //Border Box CSS
        var todayContainerEl = document.querySelector('#todayContainer')
        todayContainerEl.className = "custom-today";

        //Display City Name
        var cityName = document.createElement('h3');
        var cityData = data[0].name;
        cityName.innerHTML = cityData;
        todayContainerEl.append(cityName);

        //"ONE CALL" FOR CURRENT & 5-DAY FORECAST
        var weatherURL = 'https://api.openweathermap.org/data/2.5/onecall?lat=' + lat + '&lon=' + lon + '&appid=' + apiKey + '&units=imperial';
        fetch(weatherURL)
          .then(function (response) {
            return response.json();
          })
          .then(function (data) {
            console.log(data)

          //Current Date
          var todayDate = document.createElement('h3');
          var currentDate = moment.unix(data.current.dt).format(" (MM/DD/YYYY) ");
          todayDate = currentDate;
          cityName.append(todayDate);
        
          //Current Weather Icon
          var imgEl = document.createElement('img');
          var iconCode = data.current.weather[0].icon;
          var iconUrl = "https://openweathermap.org/img/w/" + iconCode + ".png";
          imgEl.setAttribute('src', iconUrl);
          cityName.append(imgEl);
       
          //Current Temperature
          var tempToday = document.createElement('p');
          var currentTemp = data.current.temp;
          tempToday.innerHTML = "Temperature: " + currentTemp + "\u00B0" + " F";
          todayContainerEl.append(tempToday);
    
          //Current Wind Speed 
          var windToday = document.createElement('p');
          var currentWind = data.current.wind_speed;
          windToday.innerHTML = "Wind: " + currentWind + " MPH";
          todayContainerEl.append(windToday);

          //Current Humidity
          var humidityToday = document.createElement('p');
          var currentHumidity = data.current.humidity;
          humidityToday.innerHTML = "Humidity: " + currentHumidity + "%";
          todayContainerEl.append(humidityToday);

          //Current UV Index
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
      
          //5-DAY Forcast Title 
          var fiveDayTitleEl = document.querySelector("#fiveDayTitle");
          fiveDayTitleEl.innerHTML = "5-Day Forecast:";

          //FOR LOOP FOR ALL 5 CARDS
          for (var i = 0; i < 5; i++) {

          //5-DAY Forcast Cards
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






        
        
        
