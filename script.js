
// manipulate DOM once page loads and safe to do so
$(document).ready(function() {

// setting my global variables

// load my values from local storage if it exists otherwise create an empty array
let cities = JSON.parse(localStorage.getItem("cities")) || [];



// grab my ID's from DOM
let search = $("#search-input");
let today = $("#today");
let fiveday = $("#forecast");
let results;
let arr = [];
//  console.log(search);

// use momentJS to set time and format to how I need it
 let todaysDate = moment().format(" \(DD/MM/YYYY)");
 console.log(todaysDate);

// my buttons create function 

const buttonCreate = names => {
    // first empty the list group dynamic elements
    $(".list-group").empty();
    // loop through my cities array and pass in values from my call below
        cities.forEach(function(names){

         // create my buttons and classes dynamically
            let list = $(".list-group");
        let buttons = $("<button>").attr(`value`, `${names}`).addClass("listButtons").text(`${names}`)
        list.append(buttons);
            
        })
        
        
    }

    buttonCreate();
 
// my search button function
$("#search-button").on("click", function(event) { 

    //  prevent load on click
event.preventDefault();

// take the value of search value variable and trim white spaces beginning and end
let searchVal = search.val().trim()

// if the element in cities array doesnt exist push to my input value to my array
if(!cities.includes(searchVal)) {
cities.push(searchVal);
// set local storage to save the values
localStorage.setItem("cities", JSON.stringify(cities));
}
// call api call with and pass in search value in text box, same with button create
apiCall(searchVal);
buttonCreate(searchVal);

});

// my api call function, taking in the value from above and using to create my queryURL dynamically
const apiCall = searchValues => { 

// empty today section, array and forecast, to avoid appending data instead of updating
$("#today").empty();
arr = [];
$("#forecast").empty()

// api URL

let queryURL = "https://api.openweathermap.org/data/2.5/forecast?q="

//  my API key
let api = "&appid=6a1c1f77dd62fe1efb6093d9ffc4bee5"

// ajax call
$.ajax({
    url: queryURL + searchValues + api,
    method: "GET"
}).then(function(response) {
    // console.log(response)
 
    // save reponse object to global variable for later manipulation without relying on ajax call. this will track response object each time
    // new calls are made
    results = response;
    
    // store temp in variable
    let mainTemp = response.list[0].main.temp - 273.15
    // fix current temp to 2 decimal places and add symbol for Celsius
     let currentTemp = mainTemp.toFixed(2) + `\u00B0` + " C"

    // store icon in variable
    let icon = response.list[0].weather[0].icon;

    // store wind value in variable;
    let wind = response.list[0].wind.speed * 2.237

    // store humidity value in variable;
    let humidity = response.list[0].main.humidity;
    console.log(humidity);

    console.log(icon);

    // create img tag and attr set to url - passing in icon value to dynamically grab icon and output to page.
    let weatherIcon = $("<img>").attr("src", `http://openweathermap.org/img/wn/${icon}@2x.png`)

    // dynamically create tags and content for the page depending on which city chosen
    let cityN = $('<h1>').text(response.city.name + todaysDate).append(weatherIcon);

    //dynamically create content for temperature, wind and humidity
    let details = $("<p>").text("Temp: " + currentTemp);
    let winds = $("<p>").text("Wind: " + wind + " MPH");
    let humid = $("<p>").text("Humidity: " + humidity + "%")

    // append to today section
    $('#today').prepend(cityN)
    $('#today').append(details, winds, humid);
      
    // call create forecast after creating the elements and content for the today's section
createforecast()
});

};

// my 5 day forecast function
const createforecast = () => {
    
    // using loop to create content from results array and filtering to get one value from each day. filtering using dt_text
     for(let i = 1; i < results.list.length; i++){
        // spliting the text and filtering on 09:00 value as unique to each array elment 
     let word = results.list[i].dt_txt.slice(" ").includes("09:00:00");
     if(word) {
    arr.push(results.list[i]);

     };
};

// call next function
print5day();

};

// function for printing the forecast
const print5day = () => {
    
    // console.log(arr.length)
    
    // creating my dynamic element content
    let containerDiv = $("<div>").addClass("container")
    // $("#header").text("5-day Forecast")
    let header = $("<h5>").attr("id", "header").addClass("text-left").text("5-day Forecast")
    header.text("5-day Forecast")
    let newDiv = $("<div>").addClass("row text-left");
    containerDiv.append(newDiv);
    $("#forecast").append(header,containerDiv);
    

    // using loop to create for each day
    for(let i = 0; i < arr.length; i++) {
        
       
    let forecastDiv = $("<div>").addClass("col-sm").attr("id", `day${i}`);
    newDiv.append(forecastDiv);
    // using moment to manipulate date to present on app
        let dates = moment().add([i+1],'days').format("DD/MM/YYYY");
        let p = $("<p>").text(dates);
        $(`#day${i}`).prepend(p)
        
        // creating my dynamic elements using same template for today's content
        let temp = arr[i].main.temp - 273.15
        let currTemp = temp.toFixed(2) + `\u00B0` + " C"
        let pic = arr[i].weather[0].icon;
        let currSpeed = arr[i].wind.speed * 2.237
        let hum = arr[i].main.humidity;
        let weatherpic = $("<img>").attr("src", `http://openweathermap.org/img/wn/${pic}@2x.png`)
        // let cityN = $('<h1>').text(response.city.name + todaysDate).append(weatherIcon);
        let currDetails = $("<p>").text("Temp: " + currTemp);
        let speedEl = $("<p>").text("Wind: " + currSpeed + " MPH");
        let humEl = $("<p>").text("Humidity: " + hum + "%")
        $(`#day${i}`).append(weatherpic,currDetails, speedEl, humEl);
};


};

// click handle function for listbuttons class
$(document).on("click", ".listButtons", function(event) {
  
    event.preventDefault();
    let buttonText = $(this).text();
    console.log(buttonText);
    apiCall(buttonText)
});


});
