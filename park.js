let getParkInfo = function(park){
    var apiUrl = `https://developer.nps.gov/api/v1/parks?parkCode=${park}&api_key=ORm0C1iPEzxladrhfvdeAK32TYKBEaXewFngkMZp`
    fetch(apiUrl)
    .then(response => {
        if (response.ok){
            console.log(response);
        }
    return response.json();
    })
    .then(data => {
        console.log(data);

    })
    .catch(error => {
        console.error("There was a problem with the fetch operation:",error);
    });
}

let parkCode = document.location.search.replace("?parkCode=","");
getParkInfo(parkCode);