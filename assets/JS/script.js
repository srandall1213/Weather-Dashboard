var apiKey = '044bb9c5369619c2020f969f5078b5a5';
var cityInput = document.querySelector('#cityInput');
var searchBtn = document.querySelector('#searchBtn');

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

  var fiveDayUrl = 'https://api.openweathermap.org/data/2.5/forecast?q=' + cityInput.value + '&units=imperial' + '&appid=' + apiKey;
    fetch(fiveDayUrl)
      .then(function (response5) {
        return response5.json();
      })
      .then(function (data5) {
        console.log(data5);

      //add for loop & find a call that only gives one time of day for the 5 day forcast

        //5-DAY FORCAST TITLE
        var fiveDayTitleEl = document.querySelector("#fiveDayTitle");
        fiveDayTitleEl.textContent = "5-Day Forcast:";

        //CARD-1
        //container + background
        var card1ContainerEl = document.querySelector("#card1Container");
        card1ContainerEl.classList.add("custom-card");
        //date
        var date1El = document.createElement('div');
        date1El.textContent = moment.unix(data5.list[0].dt).format("MM/DD/YYYY");
        date1El.classList.add("custom-header");
        card1ContainerEl.append(date1El);
        //emoji
        var imgEl1 = document.createElement('img');
        var iconCode1 = data5.list[0].weather[0].icon;
        var iconUrl1 = "http://openweathermap.org/img/w/" + iconCode1 + ".png";
        imgEl1.setAttribute('src', iconUrl1);
        card1ContainerEl.append(imgEl1);
        //temp
        // var temp1 = document.createElement('p');
        // temp1.textContent = "Temp: " + data5.main.temp + "\u00B0" + " F";
        // card1ContainerEl.append(temp1);
        //wind
        // var wind1 = document.createElement('p');
        // wind1.textContent = "Wind: " + data5.wind.speed + " MPH";
        // card1ContainerEl.append(wind1);
        //humidity
        // var humidity1 = document.createElement('p');
        // humidity1.textContent = "Humidity: " + data5.main.humidity + "%";
        // card1ContainerEl.append(humidity1);
      });
}