const API_KEY = "eb08f849c1d29475fc3fe6db076c663a"; // Replace with your OpenWeatherMap API key 
// Fetch city coordinates
let getWeather = function (lat, long) {
    // Now fetch the 5-day forecast using the coordinates
    fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${long}&appid=${API_KEY}`)
        .then(response => response.json())
        .then(data => {
            console.log(data)
            //     displayCurrentWeather(data);
            //     display5DayForecast(data);
            //     addCityToHistory(city);
        });
};

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

