var moment = moment();
var cityFormEl = document.querySelector("#city-form");
var cityInputEl = document.querySelector("#city");
var currentForecastEl = document.querySelector("#current-forecast");
var searchContainer = document.querySelector("#cities-container");
var fiveDayForecastEl = document.querySelector("#five-day-forecast");

var currentDateEl = document.querySelector("#current-date");
var currentIconEl = document.querySelector("#current-icon");
var currentTempEl = document.querySelector("#current-temp");
var currentWindEl = document.querySelector("#current-wind");
var currentHumidityEl = document.querySelector("#current-humidity");
var currentUVEl = document.querySelector("#current-index");

var forecastDateOneEl = document.querySelector("#forecast-date-1");
var forecastIconOneEl = document.querySelector("#forecast-icon-1");
var forecastTempOneEl = document.querySelector("#forecast-temp-1");
var forecastWindOneEl = document.querySelector("#forecast-wind-1");
var forecastHumidityOneEl = document.querySelector("#forecast-humidity-1");

var forecastDateTwoEl = document.querySelector("#forecast-date-2");
var forecastIconTwoEl = document.querySelector("#forecast-icon-2");
var forecastTempTwoEl = document.querySelector("#forecast-temp-2");
var forecastWindTwoEl = document.querySelector("#forecast-wind-2");
var forecastHumidityTwoEl = document.querySelector("#forecast-humidity-2");

var forecastDateThreeEl = document.querySelector("#forecast-date-3");
var forecastIconThreeEl = document.querySelector("#forecast-icon-3");
var forecastTempThreeEl = document.querySelector("#forecast-temp-3");
var forecastWindThreeEl = document.querySelector("#forecast-wind-3");
var forecastHumidityThreeEl = document.querySelector("#forecast-humidity-3");

var forecastDateFourEl = document.querySelector("#forecast-date-4");
var forecastIconFourEl = document.querySelector("#forecast-icon-4");
var forecastTempFourEl = document.querySelector("#forecast-temp-4");
var forecastWindFourEl = document.querySelector("#forecast-wind-4");
var forecastHumidityFourEl = document.querySelector("#forecast-humidity-4");

var forecastDateFiveEl = document.querySelector("#forecast-date-5");
var forecastIconFiveEl = document.querySelector("#forecast-icon-5");
var forecastTempFiveEl = document.querySelector("#forecast-temp-5");
var forecastWindFiveEl = document.querySelector("#forecast-wind-5");
var forecastHumidityFiveEl = document.querySelector("#forecast-humidity-5");



var getCityCoordinates = function(city){
    var geoCodeAPI = 'http://api.openweathermap.org/geo/1.0/direct?q=' + city + '&appid=878e67a957d8eb1a75bbbdfe25e0bbfc';
    fetch(geoCodeAPI).then(function(res) {
        if (res.ok) {
            return res.json().then(function(data) {
                var geoCodeAPIResults = data[0];
                console.log(geoCodeAPIResults);
                var lat = geoCodeAPIResults.lat;
                var long = geoCodeAPIResults.lon;
                getCity(city, lat, long);
            });
        } else {
            alert("Error: City not found");
        }
    })
    .catch(function(error) {
        alert("Unable to connect to WeatherAPI. Please try another city.");
    });
};

// 
var citySubmitHandler = function(event) {
    // prevent page form refreshing
    event.preventDefault();
    // get value from input element
    var city = cityInputEl.value.trim();

    if (city) {
        // retrieve city coordiantes
        getCityCoordinates(city);

        // add city to search history
        addSearch(city);

        //clear old content
        cityInputEl.value = "";

    } else {
        alert("Please enter a valid city");
    }
};

var searchSubmitHandler = function(event) {
    // prevent page form refreshing
    event.preventDefault();
    var prevCity = event.target.textContent;

    getCityCoordinates(prevCity);
}

var getCity = function(city, lat, long) {
    var weatherAPI = 'https://api.openweathermap.org/data/2.5/onecall?lat=' + lat +'&lon=' + long +'&units=imperial&exclude=minutely,hourly,alerts&appid=878e67a957d8eb1a75bbbdfe25e0bbfc';
    fetch(weatherAPI).then(function(res) {
        return res.json();
    })
    .then(function(data) {
        // display current forescast
        currentForecast(city, data.current);
        // display upcoming forecast
        futureForecast(data);
    })
};

var currentForecast = function(city, weather) {
    currentDateEl.textContent = city + " " + moment.format("L");
    currentIconEl.src = "https://openweathermap.org/img/wn/" + weather.weather[0].icon + "@2x.png";
    currentTempEl.textContent = "Temp: " + weather.temp + " °F";
    currentWindEl.textContent = "Wind: " + weather.wind_speed + " mph";
    currentHumidityEl.textContent = "Humidity: " + weather.humidity + "%";
    currentUVEl.textContent = "UV Index: " + weather.uvi;
    if(weather.uvi < 3) {
        currentUVEl.classList = "uvi-favorable";
    } else if(weather.uvi >= 5) {
        currentUVEl.classList = "uvi-sever";
    } else {
        currentUVEl.classList = "uvi-moderate";
    }

    /*
    console.log(weather);
    var cityNameEl = document.createElement('h3');
    cityNameEl.textContent = city + " " + moment.format("L");
    currentForecastEl.appendChild(cityNameEl);

    var iconSrc =  "https://openweathermap.org/img/wn/" + weather.weather[0].icon + "@2x.png";
    var currentIconEl = document.createElement('img');
    currentIconEl.src = iconSrc;
    currentForecastEl.appendChild(currentIconEl);

    var cityTempEl = document.createElement('p');
    cityTempEl.textContent = "Temp: " + weather.temp + " °F";
    currentForecastEl.appendChild(cityTempEl);

    var cityWindEl = document.createElement('p');
    cityWindEl.textContent = "Wind: " + weather.wind_speed + " mph";
    currentForecastEl.appendChild(cityWindEl);

    var cityHumidityEl = document.createElement('p');
    cityHumidityEl.textContent = "Humidity: " + weather.humidity + "%";
    currentForecastEl.appendChild(cityHumidityEl);

    var cityUVEl = document.createElement('p');
    cityUVEl.textContent = "UV Index: " + weather.uvi;
    if(weather.uvi < 3) {
        cityUVEl.classList = "uvi-favorable";
    } else if(weather.uvi >= 5) {
        cityUVEl.classList = "uvi-sever";
    } else {
        cityUVEl.classList = "uvi-moderate";
    }
    currentForecastEl.appendChild(cityUVEl);
    */
};

var futureForecast = function(forecast) {
    var oneDate = moment.add(1, 'day');
    forecastDateOneEl.textContent = oneDate.format("L");
    var iconSrcOne =  "https://openweathermap.org/img/wn/" + forecast.daily[1].weather[0].icon + "@2x.png";
    forecastIconOneEl.src = iconSrcOne;
    forecastTempOneEl.textContent = "Temp: " + forecast.daily[1].temp.day + " °F";
    forecastWindOneEl.textContent = "Wind: " + forecast.daily[1].wind_speed + " mph";
    forecastHumidityOneEl.textContent = "Humidity: " + forecast.daily[1].humidity + "%";

    var twoDate = moment.add(1, 'day');
    forecastDateTwoEl.textContent = twoDate.format("L");
    var iconSrcTwo =  "https://openweathermap.org/img/wn/" + forecast.daily[2].weather[0].icon + "@2x.png";
    forecastIconTwoEl.src = iconSrcTwo;
    forecastTempTwoEl.textContent = "Temp: " + forecast.daily[2].temp.day + " °F";
    forecastWindTwoEl.textContent = "Wind: " + forecast.daily[2].wind_speed + " mph";
    forecastHumidityTwoEl.textContent = "Humidity: " + forecast.daily[2].humidity + "%";

    var threeDate = moment.add(1, 'day');
    forecastDateThreeEl.textContent = threeDate.format("L");
    var iconSrcThree =  "https://openweathermap.org/img/wn/" + forecast.daily[3].weather[0].icon + "@2x.png";
    forecastIconThreeEl.src = iconSrcThree;
    forecastTempThreeEl.textContent = "Temp: " + forecast.daily[3].temp.day + " °F";
    forecastWindThreeEl.textContent = "Wind: " + forecast.daily[3].wind_speed + " mph";
    forecastHumidityThreeEl.textContent = "Humidity: " + forecast.daily[3].humidity + "%";

    var fourDate = moment.add(1, 'day');
    forecastDateFourEl.textContent = fourDate.format("L");
    var iconSrcFour =  "https://openweathermap.org/img/wn/" + forecast.daily[4].weather[0].icon + "@2x.png";
    forecastIconFourEl.src = iconSrcFour;
    forecastTempFourEl.textContent = "Temp: " + forecast.daily[4].temp.day + " °F";
    forecastWindFourEl.textContent = "Wind: " + forecast.daily[4].wind_speed + " mph";
    forecastHumidityFourEl.textContent = "Humidity: " + forecast.daily[4].humidity + "%";

    var fiveDate = moment.add(1, 'day');
    forecastDateFiveEl.textContent = fiveDate.format("L");
    var iconSrcFive =  "https://openweathermap.org/img/wn/" + forecast.daily[5].weather[0].icon + "@2x.png";
    forecastIconFiveEl.src = iconSrcFive;
    forecastTempFiveEl.textContent = "Temp: " + forecast.daily[5].temp.day + " °F";
    forecastWindFiveEl.textContent = "Wind: " + forecast.daily[5].wind_speed + " mph";
    forecastHumidityFiveEl.textContent = "Humidity: " + forecast.daily[5].humidity + "%";

    oneDate = moment.subtract(5, 'day');
}

// append previous searches to search container
var addSearch = function(city) {
    var previousSearch = document.createElement('button');
    previousSearch.textContent = city;
    previousSearch.classList = "previous-search";
    searchContainer.appendChild(previousSearch);
};

cityFormEl.addEventListener("submit", citySubmitHandler);
searchContainer.addEventListener("click", searchSubmitHandler);