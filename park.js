const API_KEY = "eb08f849c1d29475fc3fe6db076c663a"; // Replace with your OpenWeatherMap API key 
// Fetch city coordinates
let getWeather = function (lat, long) {
    // Now fetch the 5-day forecast using the coordinates
    fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${long}&appid=${API_KEY}`)
        .then(response => response.json())
        .then(data => {
            console.log("first");
     //       console.log(data);
            displayCurrentWeather(data);

//
        });
};

//TODO:display 5 day forecast
function displayCurrentWeather(data) {
    // Extract the data for current weather and display it
    console.log("FIND OUT!!");
    console.log(data);
    document.getElementById('city-name').textContent = data.city.name;
    document.getElementById('current-date').textContent = new Date(data.list[0].dt * 1000).toLocaleDateString();
    document.getElementById('weather-icon').src = "https://openweathermap.org/img/w/" + data.list[0].weather[0].icon + ".png";
    document.getElementById('temperature').textContent = "Temperature: " + (data.list[0].main.temp - 273.15).toFixed(0) + "°C"; // Convert Kelvin to Celsius
    document.getElementById('humidity').textContent = "Humidity: " + data.list[0].main.humidity + "%";
    document.getElementById('wind-speed').textContent = "Wind Speed: " + data.list[0].wind.speed + " m/s";
    console.log("third");
    console.log(data);
}


//TODO: display park info
//TODO: create a model: alerts, etc

let getParkInfo = function (park) {
    var apiUrl = `https://developer.nps.gov/api/v1/parks?parkCode=${park}&api_key=ORm0C1iPEzxladrhfvdeAK32TYKBEaXewFngkMZp`
    fetch(apiUrl)
        .then(response => {
            if (response.ok) {
                console.log(response);
            }
            return response.json();
        })
        .then(data => {
            console.log(data);
            getWeather(data.data[0].latitude, data.data[0].longitude);
        })
        .catch(error => {
            console.error("There was a problem with the fetch operation:", error);
        });
}

let parkCode = document.location.search.replace("?parkCode=", "");
getParkInfo(parkCode);

