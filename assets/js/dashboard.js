var cityFormEl = document.querySelector("#city-form");
var cityInputEl = document.querySelector("#city");
var currentForecastEl = document.querySelector("#current-forecast");

// 
var getCityCoordinates = function(city){
    var geoCodeAPI = 'http://api.openweathermap.org/geo/1.0/direct?q=' + city + '&appid=878e67a957d8eb1a75bbbdfe25e0bbfc';
    fetch(geoCodeAPI).then(function(res) {
        return res.json();
    })
    .then(function(data) {
        var geoCodeAPIResults = data[0];
        console.log(geoCodeAPIResults);
        var lat = geoCodeAPIResults.lat;
        var long = geoCodeAPIResults.lon;
        getCity(city, lat, long);
    })
};

// 
var citySubmitHandler = function(event) {
    // prevent page form refreshing
    event.preventDefault();
    // get value from input element
    var city = cityInputEl.value.trim();

    if (city) {
        getCityCoordinates(city);

        // add city to search history


        //clear old content
        cityInputEl.value = "";

    } else {
        alert("Please enter a valid city");
    }
};

var getCity = function(city, lat, long) {
    var weatherAPI = 'https://api.openweathermap.org/data/2.5/onecall?lat=' + lat +'&lon=' + long +'&units=imperial&exclude=minutely,hourly,alerts&appid=878e67a957d8eb1a75bbbdfe25e0bbfc';
    fetch(weatherAPI).then(function(res) {
        return res.json();
    })
    .then(function(data) {
        // display current forescast
        currentForecast(city, data.current);
        // display upcoming forecast
    })
};

var currentForecast = function(city, weather) {
    var cityNameEl = document.createElement('h3');
    cityNameEl.textContent = city;
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

cityFormEl.addEventListener("submit", citySubmitHandler)