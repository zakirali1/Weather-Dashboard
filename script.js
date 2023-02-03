// $(document).ready(function() {

let search = $("#search-input")
//  .val()
//  .trim();

 console.log(search);

//  localStorage.setItem("city name", JSON.stringify(search));
// });

$("#search-button").on("click", function(event) {

event.preventDefault();

let searchVal = search.val().trim()
localStorage.setItem("city name", JSON.stringify(searchVal));
$("search-input").val(localStorage.getItem("city name"));
// localStorage.getItem("city name")

let queryURL = "http://api.openweathermap.org/geo/1.0/direct?q="

let api = "&appid=6a1c1f77dd62fe1efb6093d9ffc4bee5"

$.ajax({
    url: queryURL + searchVal + api,
    method: "GET"
}).then(function(response) {
    console.log(response)

    
});

});