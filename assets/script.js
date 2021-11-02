// button to submit form containing state, city and budget data
var submitDataButton = document.querySelector(".needs-validation");

// selection for state, city and bugdet
var state = document.querySelector("#validationCustom01");
var city = document.querySelector("#validationCustom02");
var budget = document.querySelector("#validationCustom03");

// select if user selected either rent or buy option
// var rentOrBuyOption = document.querySelector(".form-check-button");

// button to submit optional data
var submitOptionalDataButton = document.querySelector(".submit-optional-data");

// Google Maps API key
var GoogleAPIKey = "AIzaSyCmEuQHyUcrKoHajuYANO4wsVkMzEJX1GA";


// function that submits data
function submitData(event) {
    event.preventDefault();
    // functions that grab data from api and 
    if (state) {
        stateValue = state.value.trim();
    }

    if (city) {
        cityValue = city.value.trim();
    }

    if (budget) {
        budgetValue = budget.value;
    }


    // function grabs lat/lon coordiantes based off inputted state/city
    getLocationData(stateValue, cityValue, budgetValue);

    // store data into the database
    storeRoomData(stateValue, cityValue, budgetValue);

    state.value = '';
    city.value = '';
    budget.value = '';

    
    
}

// variable to store every room data info into database
var allRoomData = JSON.parse(localStorage.getItem("cityStorage")) || [];

// function that takes the state,city,budget and stores in the user database
function storeRoomData(state,city,budget) {
    var roomData = {
        stateInfo: state,
        cityInfo: city,
        budgetInfo: budget,
    };

    allRoomData.push(roomData);
    localStorage.setItem("roomStorage", JSON.stringify(allRoomData));



}


// get the lattituude and longitude information using Google Maps API based off city and sate
// take the ne and sw lat/long info and add to roomAPIURL
// do fetch requiest on roomAPIURL;
function getLocationData(state,city,budget) {
    var GoogleAPIURL = "https://maps.googleapis.com/maps/api/geocode/json?address=" + city + "," + state + "&key=" + GoogleAPIKey;
    fetch(GoogleAPIURL)
    .then(function (response) {
        if (response.ok) {
            response.json().then(function (data) {

                // pass the data containing lat/lon and coordinates to getRoomData to get the room info
                getRoomData(data,budget);
            })
        }

    })
    .catch(function (error) {
        console.log(error);
    });
}

// get room information based off of inputted value
// sampleURL: https://www.roomster.com/api/search?search_params.page_number=1&search_params.service_type=HaveShare&search_params.sort=LastActivity&search_params.budget.min=0&search_params.budget.max=5000&search_params.age.min=18&search_params.age.max=99&                                                                                     search_params.geo.lat_sw=33.732742&search_params.geo.lng_sw=-118.248966&search_params.geo.lat_ne=33.885459&search_params.geo.lng_ne=-118.063162&search_params.include_total_count=true&search_params.is_cache_loaded=false&search_params.searchLocation=Long%2520Beach%252C%2520CA%252C%2520USA&search_params.page_size=11
function getRoomData(data, budgetMax) {
    var roomAPIURL = 'https://cors-anywhere.herokuapp.com/https://www.roomster.com/api/search?search_params.page_number=1&search_params.service_type=HaveShare&search_params.sort=LastActivity&search_params.budget.min=0&search_params.budget.max=' + budgetMax + '&search_params.age.min=18&search_params.age.max=99&search_params.geo.lat_sw=' + data["results"][0]["geometry"]["bounds"]["southwest"].lat + '&search_params.geo.lng_sw=' + data["results"][0]["geometry"]["bounds"]["southwest"].lng + '&search_params.geo.lat_ne=' + data["results"][0]["geometry"]["bounds"]["northeast"].lat + "&search_params.geo.lng_ne=" + data["results"][0]["geometry"]["bounds"]["northeast"].lng + "&search_params.include_total_count=true&search_params.is_cache_loaded=false";
    console.log(roomAPIURL);
    fetch(roomAPIURL)
    .then(res => res.json())
    .then(data => console.log(data))
    .catch(err => console.log(err))

}


// used to validate that user has inputted information or else form will not be submitted
function formValidation() {
    'use strict'
  
    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    var forms = document.querySelectorAll('.needs-validation')
  
    // Loop over them and prevent submission
    Array.prototype.slice.call(forms)
      .forEach(function (form) {
        form.addEventListener('click', function (event) {
          if (!form.checkValidity()) {
            event.preventDefault()
            event.stopPropagation()
          }
  
          form.classList.add('was-validated')
        }, false)
      })
    }

formValidation();
  
  
submitDataButton.addEventListener("submit", submitData);