//const api_key= "JLVE704tRGtZrHRvY9Aa521QwfWD5eTzvRcTUw66";
//https://developer.nps.gov/api/v1/parks?parkCode=acad&api_key=INSERT-API-KEY-HERE'

//TODO: fix bug adding all parks to the list instead of page refresh-V code


var showNationalParks = function (parks) {
    let results = document.getElementById("results");
    results.innerHTML = ''; //clears previous history

    for (let i = 0; i < parks.length; i++) {

        let park = document.createElement("div")
        park.innerHTML = [
            `<strong>${parks[i].fullName}</strong>`,
            `<p>${parks[i].description}</p>`
        ].join("")
        results.appendChild(park) //should display not append
    }
}



let getNationalParks = function (state) {
    var apiUrl = `https://developer.nps.gov/api/v1/parks?stateCode=${state}&api_key=ORm0C1iPEzxladrhfvdeAK32TYKBEaXewFngkMZp`
    fetch(apiUrl)
        .then(response => {
            if (response.ok) {
                console.log(response);
            }
            return response.json();
        })
        .then(data => {
            console.log(data);
            showNationalParks(data.data)
        })
        .catch(error => {
            console.error("There was a problem with the fetch operation:", error);
        });
}

var statesEl = document.getElementById("states");
statesEl.addEventListener("change", function (event) {
    console.log(statesEl.value)
    getNationalParks(statesEl.value)
});

const API_KEY = "eb08f849c1d29475fc3fe6db076c663a"; // Replace with your OpenWeatherMap API key

document.getElementById('search-btn').addEventListener('click', function() {
    const city = document.getElementById('city-search').value;

    // Fetch city coordinates
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`)
        .then(response => response.json())
        .then(data => {
            const lat = data.coord.lat;
            const lon = data.coord.lon;

            // Now fetch the 5-day forecast using the coordinates
            fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}`)
                .then(response => response.json())
                .then(data => {
                    displayCurrentWeather(data);
                    display5DayForecast(data);
                    addCityToHistory(city);
                });
        });
});

function displayCurrentWeather(data) {
    // Extract the data for current weather and display it
    document.getElementById('city-name').textContent = data.city.name;
    document.getElementById('current-date').textContent = new Date(data.list[0].dt * 1000).toLocaleDateString();
    document.getElementById('weather-icon').src = "https://openweathermap.org/img/w/" + data.list[0].weather[0].icon + ".png";
    document.getElementById('temperature').textContent = "Temperature: " + (data.list[0].main.temp - 273.15).toFixed(2) + "°C"; // Convert Kelvin to Celsius
    document.getElementById('humidity').textContent = "Humidity: " + data.list[0].main.humidity + "%";
    document.getElementById('wind-speed').textContent = "Wind Speed: " + data.list[0].wind.speed + " m/s";
}