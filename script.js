var showNationalParks = function(parks){
    console.log(parks)
    let results = document.getElementById("results");
    for  (i=0;i<parks.length;i++){ 
        let park = document.createElement("div")
        park.innerHTML = [
            `<strong>${parks[i].fullName}</strong>`,
            `<p>${parks[i].description}</p>`
        ].join("")
        results.append(park)
    }
}

let getNationalParks = function(state){
    var apiUrl = `https://developer.nps.gov/api/v1/parks?stateCode=${state}&api_key=ORm0C1iPEzxladrhfvdeAK32TYKBEaXewFngkMZp`
    fetch(apiUrl)
    .then(response => {
        if (response.ok){
            console.log(response);
        }
    return response.json();
    })
    .then(data => {
        console.log(data);
        showNationalParks(data.data)
    })
    .catch(error => {
        console.error("There was a problem with the fetch operation:",error);
    });
}

var statesEl= document.getElementById("states");
statesEl.addEventListener("change",function(event){
    console.log(statesEl.value)
    getNationalParks(statesEl.value)
});
