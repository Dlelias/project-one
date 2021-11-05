//selectors--------------------------------------------------------------------------------

var submitDataButton = document.querySelector(".needs-validation"); // button to submit form containing state, city and budget data

// selection for state, city and bugdet
var state = document.querySelector("#validationCustom01");
var city = document.querySelector("#validationCustom02");
var budget = document.querySelector("#validationCustom03");

var roomsBaseApi = "https://www.roomster.com/api/search?"; // base url to use when deploying to production -- you do not need a proxy server in prod**important
var GoogleAPIKey = "AIzaSyCmEuQHyUcrKoHajuYANO4wsVkMzEJX1GA"; // Google Maps API key

//functions--------------------------------------------------------------------------------

// function that submits data
function submitData(event) {
    event.preventDefault();

    // takes the values inputted by user
    if (state) {
        stateValue = state.value.trim();
    }

    if (city) {
        cityValue = city.value.trim();
    }

    if (budget) {
        budgetValue = budget.value;
    }

  if (city) {
    cityValue = city.value.trim();
  }

    // function grabs lat/lon coordiantes based off inputted state/city
    getLocationData(stateValue, cityValue, budgetValue);
    }


// function that takes the state,city,budget and stores in the user database
function storeRoomData(state, city, budget) {
  var roomData = {
    stateInfo: state,
    cityInfo: city,
    budgetInfo: budget,
  };

    allRoomData.push(roomData);
    localStorage.setItem("roomStorage", JSON.stringify(allRoomData));
    
    // redirect to the results.html webpage after storing user inputs in local storage
    location.href = `results.html?city=${cityValue}&state=${stateValue}&budget=${budgetValue}`

}

// variable to store every room data info into database
var allRoomData = JSON.parse(localStorage.getItem("roomStorage")) || [];


// get the lattituude and longitude information using Google Maps API based off city and sate
// take the ne and sw lat/long info and add to roomAPIURL
// do fetch requiest on roomAPIURL;
function getLocationData(state,city,budget) {
    var GoogleAPIURL = "https://maps.googleapis.com/maps/api/geocode/json?address=" + city + "," + state + "&key=" + GoogleAPIKey;
    fetch(GoogleAPIURL)
    .then(function (response) {
        if (response.ok) {
            response.json().then(function (data) {
                
                // pass the data containing lat/lon coordinates and budget in getRoomData to get the room info
                getRoomData(data,budget);
            })
        }
    })
    .catch(function (error) {
      console.log(error);
    });
}

// get room information based off of inputted data from Google Maps API and desired max budget
function getRoomData(data, budgetMax) {
  var roomAPIURL =
    "https://wendy-cors.herokuapp.com/https://www.roomster.com/api/search?search_params.page_number=1&search_params.service_type=HaveShare&search_params.sort=LastActivity&search_params.budget.min=0&search_params.budget.max=" +
    budgetMax +
    "&search_params.age.min=18&search_params.age.max=99&search_params.geo.lat_sw=" +
    data["results"][0]["geometry"]["bounds"]["southwest"].lat +
    "&search_params.geo.lng_sw=" +
    data["results"][0]["geometry"]["bounds"]["southwest"].lng +
    "&search_params.geo.lat_ne=" +
    data["results"][0]["geometry"]["bounds"]["northeast"].lat +
    "&search_params.geo.lng_ne=" +
    data["results"][0]["geometry"]["bounds"]["northeast"].lng +
    "&search_params.include_total_count=true&search_params.is_cache_loaded=false";
  fetch(roomAPIURL)
    .then((res) => res.json())
    .then(function (data) {
      localStorage.setItem("cityData", JSON.stringify(data));
    storeRoomData(stateValue, cityValue, budgetValue);
    })
    .catch((err) => console.log(err));
}

// used to validate that user has inputted information or else form will not be submitted
function formValidation() {
  "use strict";

  // Fetch all the forms we want to apply custom Bootstrap validation styles to
  var forms = document.querySelectorAll(".needs-validation");

  // Loop over them and prevent submission
  Array.prototype.slice.call(forms)
    .forEach(function (form) {
      form.addEventListener('submit', function (event) {
        if (!form.checkValidity()) {
          event.preventDefault()
          event.stopPropagation()
        }
        form.classList.add('was-validated')
      }, false)
    })
}

formValidation();

// when user hits submit button, submitData function fires where it submits user inputs and returns data    
submitDataButton.addEventListener("submit",(event) => {
    submitData(event)
});

