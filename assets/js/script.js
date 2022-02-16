var formEl =document.getElementById('city-form');
var cityInputEl = document.getElementById('city-input');
var cities = JSON.parse(localStorage.getItem('cities')) || []

function getForecast(city){

}

function getCitiesFromLS(){
    return JSON.parse(localStorage.getItem('cities')) || []
}

function setCitiesToLS(){
    localStorage.setItem(JSON.stringify(cities));
}

formEl.addEventListener('submit', function(event){
    event.preventDefault();
    var value = cityInputEl.value;
    getForecast(cityInputEl.value);
    cities.push(value);
})

