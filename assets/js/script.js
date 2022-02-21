var formEl =document.getElementById('city-form');
var cityInputEl = document.getElementById('city-input');
var cities = getCitiesFromLS();
var priorSearchEl = document.getElementById('prior-search');
var citySearch = document.querySelector('#city-search');
var upcomingEl = document.getElementById('upcoming-forecast');
var currentEl = document.getElementById('current-forecast');

function getForecastCoordinates(city) {
    var geocodeAPI = 'http://api.openweathermap.org/geo/1.0/direct?q=' + city + '&appid=878e67a957d8eb1a75bbbdfe25e0bbfc'
    fetch(geocodeAPI)
    .then(function(res) {
        return res.json();
    })
    .then(function(data) {
        var geocodeAPIresults = data[0];
        console.log(geocodeAPIresults);
        var latitude = geocodeAPIresults.lat;
        var longitude = geocodeAPIresults.lon;
        getWeather(city, latitude, longitude);
    })
}

function getForecast(city) {
    getForecastCoordinates(city);
}

function getWeather(city, latitude, longitude) {
    var weatherAPI = 'https://api.openweathermap.org/data/2.5/onecall?lat=' + latitude +'&lon=' + longitude +'&exclude=minutely,hourly,alerts&appid=878e67a957d8eb1a75bbbdfe25e0bbfc'
    fetch(weatherAPI)
    .then(function(res) {
        return res.json();
    })
    .then(function(data) {
        console.log("Weather", data)
        currentForecast(city, data.current);
        upcomingForecast(city, data.daily);
    })
}

function currentForecast(city, weather) {
    var current = weather;

    var temperatureEl = document.createElement('p');
    temperatureEl.textContent = current.temp + ' degrees kelvin';
    currentEl.appendChild(temperatureEl);

    var windSpeedEl = document.createElement('p');
    windSpeedEl.textContent = current.wind_speed + ' wind speed';
    currentEl.appendChild(windSpeedEl);

    var humidityEl = document.createElement('p');
    humidityEl.textContent = current.humidity + ' humidity';
    currentEl.appendChild(humidityEl);

    var uvEl = document.createElement('p');
    uvEl.textContent = current.uvi + ' uv index';
    currentEl.appendChild(uvEl);
    
}

function upcomingForecast(city, weather) {
    for(var i = 1; i < 6; i++) {
        var forecastDay = weather[i];
        var temperatureEl = document.createElement('p');
        temperatureEl.textContent = forecastDay.temp.day + ' degrees kelvin';
        upcomingEl.appendChild(temperatureEl);
        
        var windSpeedEl = document.createElement('p');
        windSpeedEl.textContent = forecastDay.wind_speed + ' wind speed';
        upcomingEl.appendChild(windSpeedEl);
        
        var humidityEl = document.createElement('p');
        humidityEl.textContent = forecastDay.humidity + ' humidity';
        upcomingEl.appendChild(humidityEl);
        

    }
}

function getCitiesFromLS() {
    return JSON.parse(localStorage.getItem('cities')) || []
}

function setCitiesToLS() {
    localStorage.setItem('cities', JSON.stringify(cities));
}

function saveCityToLS(city) {

}

function createPriorSearch() {
    priorSearchEl.innerHTML = "";
    cities = getCitiesFromLS();
    for(var i = 0; i < cities.length; i++) {
        var cityButton = document.createElement('button');
        cityButton.textContent = cities[i];
        cityButton.setAttribute('data-city', cities[i])
        cityButton.addEventListener('click', function(event){
            var city = event.target.getAttribute('data-city')
            getForecast(city);
        })
        priorSearchEl.appendChild(cityButton);
    }
}

formEl.addEventListener('submit', function(event) {
    event.preventDefault();
    var value = cityInputEl.value;
    getForecast(cityInputEl.value);

    cities.push(value);
    setCitiesToLS();
    cityInputEl.value = "";
})

createPriorSearch();