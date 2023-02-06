$(document).ready(function() {
    $(".list-group .listButtons").val(localStorage.getItem("city"))

   
let cities = JSON.parse(localStorage.getItem("cities")) || [];
let search = $("#search-input")
let today = $("#today");
let fiveday = $("#forecast");
let results;
let arr = [];
//  .val()
//  .trim();

 console.log(search);
 let todaysDate = moment().format(" \(DD/MM/YYYY)")
 console.log(todaysDate)
//  let tomorro = moment().add(1,'days').format("DD MM YYYY");
//  console.log(tomorro)

//  localStorage.setItem("city name", JSON.stringify(search));
// });

const buttonCreate = names => {
    $(".list-group").empty();
        cities.forEach(function(names){
           
           if(cities.indexOf(names) !== 1) {
            let list = $(".list-group");
        let buttons = $("<button>").attr(`value`, `${names}`).addClass("listButtons").text(`${names}`)
        list.append(buttons);
           }
           
        })
        
        // let list = $(".list-group");
        // let buttons = $("<button>").attr(`value`, `${names}`).addClass("listButtons").text(`${names}`)
        // list.append(buttons);
        // localStorage.setItem("city", JSON.stringify(`${names}`));
    }

    buttonCreate();
 

$("#search-button").on("click", function(event) { 


// clear()


// $("#forecast div").empty()
event.preventDefault();

let searchVal = search.val().trim()

$("search-input").val(localStorage.getItem("city name"));
cities.push(searchVal);
localStorage.setItem("cities", JSON.stringify(cities));
apiCall(searchVal);
buttonCreate(searchVal);
});

const apiCall = searchValues => { 

$("#today").empty();
arr = [];
$("#forecast").empty()

// localStorage.getItem("city name")

let queryURL = "https://api.openweathermap.org/data/2.5/forecast?q="

let api = "&appid=6a1c1f77dd62fe1efb6093d9ffc4bee5"

$.ajax({
    url: queryURL + searchValues + api,
    method: "GET"
}).then(function(response) {
    console.log(response)
    // console.log(response.list[0].main.temp);
    // console.log(response.list[0].wind.speed)
    // console.log(response.list[0].main.humidity)
 
    results = response;
// console.log(results)
// console.log(response.list[0].dt_txt)
// console.log(response.list[3].dt_txt)
// // })

// console.log(results.list.clouds.dt_txt)
// console.log(results);
//  console.log(results);
    
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
    // localStorage.setItem('today', JSON.stringify(today));
    

//   for (let i = 1; i < results.length; i++) {
  
//     let header = $("<h5>").text(moment().add(results[i],'days').format("DD/MM/YYYY"));
//     console.log(header)
//     $("#forecast").append(header)
//   }

createforecast()
});

};



// const buttonCreate = inputsV => {

// }

const createforecast = () => {
    
    // $("#forecast").text("hello")
    //  let forecast = $("#forecast");
   
    //  for(let i = 1; i < results.length )
    //  let days = moment().add(1,'days').format("DD/MM/YYYY")
    //  console.log(days)
    //  let header = $("<h5>").text(days);
    //  forecast.append(header)

     for(let i = 1; i < results.list.length; i++){
     let word = results.list[i].dt_txt.slice(" ").includes("09:00:00")
     if(word) {
    arr.push(results.list[i]);

     }
// console.log(word)

// $("#forecast").empty();
}
console.log(arr);

print5day();

};

// console.log(results);
console.log(arr);


const print5day = () => {
    
    console.log(arr.length)
    // $("#forecast").append("<h5>").text("5-day forecast");
    let containerDiv = $("<div>").addClass("container")
    // $("#header").text("5-day Forecast")
    let header = $("<h5>").attr("id", "header").addClass("text-left").text("5-day Forecast")
    header.text("5-day Forecast")
    let newDiv = $("<div>").addClass("row text-left");
    containerDiv.append(newDiv);
    $("#forecast").append(header,containerDiv);
    

    // <h5 id="header" class="text-left"></h5>
    for(let i = 0; i < arr.length; i++) {
        
       
    let forecastDiv = $("<div>").addClass("col-sm").attr("id", `day${i}`);
    newDiv.append(forecastDiv);
        let dates = moment().add([i+1],'days').format("DD/MM/YYYY");
        let p = $("<p>").text(dates);
        $(`#day${i}`).prepend(p)
        // card.append(dates)
        // $("#forecast").append(divs);

        let temp = arr[i].main.temp - 273.15
        // console.log(arr[0].main.temp);
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

$(document).on("click", ".listButtons", function(event) {
  
    event.preventDefault();
    let buttonText = $(this).text();
    console.log(buttonText);
    apiCall(buttonText)
})

// $("#forecast").empty() 

// function clear() {
//     $("#forecast").empty();
//   }

// document.querySelector("#today").addEventListener("click", function() {
//     document.querySelector("#today").innerHTML = "";
//   });
  
//   document.querySelector("#forecast").addEventListener("click", function() {
//     document.querySelector("#forecast").innerHTML = "";
//   });

});
