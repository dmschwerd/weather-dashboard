var moment = moment();
var cityFormEl = document.querySelector("#city-form");
var cityInputEl = document.querySelector("#city");
var currentForecastEl = document.querySelector("#current-forecast");
var searchContainer = document.querySelector("#cities-container");
var fiveDayForecastEl = document.querySelector("#five-day-forecast");

// 
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
    console.log(weather);
    var cityNameEl = document.createElement('h3');
    cityNameEl.textContent = city + " " + moment.format("L");
    currentForecastEl.appendChild(cityNameEl);

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
    currentForecastEl.appendChild(cityUVEl);
};

var futureForecast = function(forecast) {
    console.log(forecast);
    for(var i = 1; i < 6; i++) {
        var forecastContainerEl = document.createElement('div');
        fiveDayForecastEl.appendChild(forecastContainerEl);

        var forecastTempEl = document.createElement('p');
        forecastTempEl.textContent = "Temp: " + forecast.daily[i].temp.day + " °F";
        forecastContainerEl.appendChild(forecastTempEl);

        var forecastWindEl = document.createElement('p');
        forecastWindEl.textContent = "Wind: " + forecast.daily[i].wind_speed + " mph";
        forecastContainerEl.appendChild(forecastWindEl);

        var forecastHumidityEl = document.createElement('p');
        forecastHumidityEl.textContent = "Humidity: " + forecast.daily[i].humidity + "%";
        forecastContainerEl.appendChild(forecastHumidityEl);
    }
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
