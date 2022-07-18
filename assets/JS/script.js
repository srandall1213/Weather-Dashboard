var apiKey = '044bb9c5369619c2020f969f5078b5a5';
var cityInput = document.querySelector('#cityInput');
var searchBtn = document.querySelector('#searchBtn');
var weatherBoxesEl = document.querySelector("#weatherBoxes");

//CLICK SEARCH TO GET WEATHER & CLEAR PREVIOUS INFO FROM SCREEN
searchBtn.addEventListener('click', function(event) {
  event.preventDefault();

  if (cityInput.value === "") {
    alert("City cannot be blank.");
  } else {
    document.querySelector("#cardRow").innerHTML = '';
    document.querySelector('#todayContainer').innerHTML = '';
  }

  var dividerLine = document.createElement("div");
  dividerLine.className = "searchDivider";
  $("#searchBox").append(dividerLine);

  getWeather();

});

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
        
        //CURRENT BORDER BOX
        var todayContainerEl = document.querySelector('#todayContainer')
        todayContainerEl.className = "custom-today";

        //CURRENT BOX - CITY NAME
        var cityName = document.createElement('h3');
        cityName.innerHTML = data[0].name;
        todayContainerEl.append(cityName);
        
        //SEARCH HISTORY - CITY NAME
        var searchItemBtn = document.createElement('button');
        searchItemBtn.classList.add("searchItem");
        searchItemBtn.innerHTML = data[0].name;
        $("#searchBox").append(searchItemBtn);

        console.log(data);
      
        //"ONE CALL" FOR CURRENT & 5-DAY FORECAST
        var weatherURL = 'https://api.openweathermap.org/data/2.5/onecall?lat=' + lat + '&lon=' + lon + '&appid=' + apiKey + '&units=imperial';
        fetch(weatherURL)
          .then(function (response) {
            return response.json();
          })
          .then(function (data) {
            console.log(data);

        //CURRENT DATE
        var todayDate = document.createElement('h3');
        todayDate = moment.unix(data.current.dt).format(" (MM/DD/YYYY) ");
        cityName.append(todayDate);  
        
        //CURRENT WEATHER ICON
        var imgEl = document.createElement('img');
        var iconCode = data.current.weather[0].icon;
        var iconUrl = "https://openweathermap.org/img/w/" + iconCode + ".png";
        imgEl.setAttribute('src', iconUrl);
        cityName.append(imgEl);
       
        //CURRENT TEMPERATURE
        var tempToday = document.createElement('p');
        tempToday.innerHTML = "Temperature: " + data.current.temp + "\u00B0" + " F";
        todayContainerEl.append(tempToday);
    
        //CURRENT WIND SPEED
        var windToday = document.createElement('p');
        windToday.innerHTML = "Wind: " + data.current.wind_speed + " MPH";
        todayContainerEl.append(windToday);

        //CURRENT HUMIDITY 
        var humidityToday = document.createElement('p');
        humidityToday.innerHTML = "Humidity: " + data.current.humidity + "%";
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
        dateEl.innerHTML = moment.unix(data.daily[i].dt).format("MM/DD/YYYY");
        dateEl.classList.add("custom-header");
        cardEl.append(dateEl);
        //icon
        var imgEl = document.createElement('img');
        var iconCode = data.daily[i].weather[0].icon;
        var iconUrl = "https://openweathermap.org/img/w/" + iconCode + ".png";
        imgEl.setAttribute('src', iconUrl);
        cardEl.append(imgEl);
        //temp
        var temp = document.createElement('p');
        temp.innerHTML = "Temp: " + data.daily[i].temp.day + "\u00B0" + " F";
        cardEl.append(temp);
        //wind
        var wind = document.createElement('p');
        wind.innerHTML = "Wind: " + data.daily[i].wind_speed + " MPH";
        cardEl.append(wind);
        //humidity
        var humidity = document.createElement('p');
        humidity.innerHTML = "Humidity: " + data.daily[i].humidity + "%";
        cardEl.append(humidity);
        }


        //NEED TO CONVERT VARIABLES SOMEHOW
        // var weatherStorage = {
        //   'City': cityName,
        //   'Current Date': todayDate,
        //   'Current Icon': imgEl,
        //   'Current Temp': tempToday,
        //   'Current Wind': windToday,
        //   'Current Humidity': humidityToday,
        //   'Current UV Index': uvColorBox, //or uvColorBoxText?
        // }
        // localStorage.setItem('Weather Storage:', JSON.stringify(weatherStorage));
        // var retrievedStorage = localStorage.getItem('Weather Storage:');
        // console.log('Retrieved Storage:', JSON.parse(retrievedStorage));



        

        });
      });
  
    
}

//CLICK CITY NAME IN SEARCH HISTORY TO RENDER THAT CITY
// searchItemBtn.addEventListener('click', function(event) {
//   event.preventDefault();
  
// })
        
        
        
