var cityFormEl = document.querySelector("#city-form");
var cityInputEl = document.querySelector("#city");
var cityNameEl = document.querySelector("#city-name");
var cityTempEl = document.querySelector("#city-temp");
var cityWindEl = document.querySelector("#city-wind");
var cityHumidityEl = document.querySelector("#city-humidity");
var cityUVEl = document.querySelector("#city-uv");

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
    console.log("in citySubmithandler");
    // get value from input element
    var city = cityInputEl.value.trim();

    if (city) {
        console.log("in citySubmithandler if");
        getCityCoordinates(city);

        //clear old content
        cityInputEl.value = "";
        cityNameEl.textContent = "";
        cityTempEl.textContent = "";
        cityWindEl.textContent = "";
        cityHumidityEl.textContent = "";
        cityUVEl.textContent = "";
    } else {
        alert("Please enter a valid city");
    }
};

var getCity = function(city, lat, long) {
    var weatherAPI = 'https://api.openweathermap.org/data/2.5/onecall?lat=' + lat +'&lon=' + long +'&exclude=minutely,hourly,alerts&appid=878e67a957d8eb1a75bbbdfe25e0bbfc';
};

cityFormEl.addEventListener("submit", citySubmitHandler)