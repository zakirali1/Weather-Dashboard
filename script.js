// $(document).ready(function() {

let search = $("#search-input")
let today = $("#today");
//  .val()
//  .trim();

 console.log(search);
 let todaysDate = moment().format(" \(d/D/YYYY)")
 console.log(todaysDate)

//  localStorage.setItem("city name", JSON.stringify(search));
// });

$("#search-button").on("click", function(event) {

event.preventDefault();

let searchVal = search.val().trim()
localStorage.setItem("city name", JSON.stringify(searchVal));
$("search-input").val(localStorage.getItem("city name"));
// localStorage.getItem("city name")

let queryURL = "https://api.openweathermap.org/data/2.5/forecast?q="

let api = "&appid=6a1c1f77dd62fe1efb6093d9ffc4bee5"

$.ajax({
    url: queryURL + searchVal + api,
    method: "GET"
}).then(function(response) {
    console.log(response)
    
    let icon = response.list[0].weather[0].icon;
    console.log(icon);
    let weatherIcon = $("<img>").attr("src", `http://openweathermap.org/img/wn/${icon}@2x.png`)

    let cityN = $('<h1>').text(response.city.name + todaysDate);
    cityN.append(weatherIcon)
    $('#today').append(cityN)

});

});