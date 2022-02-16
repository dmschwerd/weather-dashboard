var formEl =document.getElementById('city-form');
var cityInputEl = document.getElementById('city-input');
var cities = getCitiesFromLS();
var priorSearchEl = document.getElementById('prior-search');

function getForecast(city) {
    console.log('Getting forecast in ' + city);
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