// button to submit form containing state, city and budget data
var submitDataButton = document.querySelector(".needs-validation");

// selection for state, city and bugdet
var state = document.querySelector("#validationCustom01");
var city = document.querySelector("#validationCustom02");
var budget = document.querySelector("#validationCustom03");

// select if user selected either rent or buy option
var rentOrBuyOption = document.querySelector(".form-check-button");

// button to submit optional data
var submitOptionalDataButton = document.querySelector(".submit-optional-data");


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

    if (rentOrBuyOption) {
        rentOrBuyOptionValue = rentOrBuyOption.value;
    }

    // function grabs room data based off inputted state, city, budget, and rentOrBuyoption data
    getRoomData(stateValue, cityValue, budgetValue, rentOrBuyOptionValue);

    // store data into the database
    storeRoomData(stateValue, cityValue, budgetValue, rentOrBuyOptionValue);
    
    state.value = '';
    city.value = '';
    budget.value = '';
    rentOrBuyOption.value = '';
    
}


// variable to store every room data info into database

function storeRoomData(state,city,budget,rentOrBuy) {
    var roomData = {
        stateInfo: state,
        cityInfo: city,
        budgetInfo: budget,
        rentOrBuyOption: rentOrBuy
    };

    allRoomData.push(roomData);
    localStorage.setItem("roomStorage", JSON.stringify(allRoomData));

}

var allRoomData = JSON.parse(localStorage.getItem("cityStorage")) || [];

// function that uses APIs to grab lat/long and city info
// NOTE: need help with this
function getRoomData(state,city,budget,rentOrBuy) {
    var roomAPIURL = 'https://www.roomster.com/api/search?search_params.budget.min=0&search_params.budget.max=' + (budget) + '&search_params.searchLocation=' + (city);
    console.log(roomAPIURL);
    fetch(roomAPIURL)
    .then(res => res.json())
    .then(data => console.log(data))
    .catch(err => console.log(err))
        // .then(function (response) {
        //     if (response.ok) {
        //         response.json().then(function (data) {

        //             console.log(data);
        //         })
        //     }
        //     })



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