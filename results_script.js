var data = JSON.parse(localStorage.getItem("cityData"));

function tester() {
  for (var i = 0; i < data.items.length; i++) {
    $(".card-container").append(`<div class="col-12 col-xl-3 col-md-5 p-5">
    <div class="card h-100">
      <img src="${data.items[i].listing.images[0]}" class="card-img-top alt="..." />
      <div class="card-body">
        <h5 class="card-header">${data.items[i].listing.geo_location.full_address}</h5>
        <p class="card-text">
          ${"$" + data.items[i].listing.rates.monthly_rate + " monthly"}
        </p>
        <a href="#" class="btn btn-primary myButton" id="${i}">View Photos</a>
      </div>
    </div>
  </div>`);
  }
  return vars;
}
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
  console.log(roomAPIURL);
  fetch(roomAPIURL)
    .then((res) => res.json())
    .then(function (data) {
      for (var i = 0; i < 8; i++) {
        $(".card-container").append(`<div class="col-12 col-xl-3 col-md-5 p-5" id="card-8">
        <div class="card">
          <img src="https://via.placeholder.com/150" class="card-img-top" alt="..." />
          <div class="card-body">
            <h5 class="card-header">${data?.items[i].listing.geo_location.full_address}</h5>
            <p class="card-text">
              ${data?.items[i].listing.rates.monthly_rate}
            </p>
            <a href="#" class="btn btn-primary myButton">Select Property</a>
          </div>
        </div>
      </div>`);
      }
    })
    .catch((err) => console.log(err));
}

function getLocationData(state,city,budget) {
  console.log("line 79")

  var GoogleAPIURL = "https://maps.googleapis.com/maps/api/geocode/json?address=" + city + "," + state + "&key=" + GoogleAPIKey;
  fetch(GoogleAPIURL)
  .then(function (response) {
      console.log("line 84")
      if (response.ok) {
          response.json().then(function (data) {
              
              console.log("line 88",data)
              // pass the data containing lat/lon and coordinates to getRoomData to get the room info
              getRoomData(data,budget);
          })
      }

  })
  .catch(function (error) {
    console.log(error);
  });
}

function tester() {
  var city = getUrlVars()["city"]
  var state = getUrlVars()["state"] 
  var budget = getUrlVars()["budget"]
  getLocationData(state,city,budget)
}
// Event-listener photo gallery buttons
$(".card-container").on("click", ".myButton", function (event) {
  var selectedProperty = this.id;
  viewPhotos(selectedProperty);
});

// Photo gallery for selected property
function viewPhotos(selectedProperty) {
  $(".card-container").empty();
  for (var i = 0; i < data.items[selectedProperty].listing.images.length; i++) {
    $(".card-container").append(`<div class="col-12 col-xl-3 col-md-5 p-5">
    <div class="card" >
      <img src="${data.items[selectedProperty].listing.images[i]}" class="card-img-top alt="..." />     
    </div>
  </div>`);
  }
}

tester();
