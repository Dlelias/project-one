// this script is for javascript functionality on results.html webpage

// get all the data we retrived from Roomster API
const data = JSON.parse(localStorage.getItem("cityData"));

// Builds results page, 1 card per property
function showResults() {
  for (let i = 0; i < data.items.length; i++) {
    $(".card-container").append(`<div class="rounded col-12 col-xl-3 col-md-5 p-5">
    <div class="card h-100">
      <img src="${data.items[i].listing.images[0]}" class="min-w-100 card-img-top alt="..." />
      <div class="card-body d-flex flex-column">
        <h5 class="card-header text-center address my-6">${
          data.items[i].listing.geo_location.full_address
        }</h5>
        <p class="card-text text-center my-3">
          ${"$" + data.items[i].listing.rates.monthly_rate + " monthly"}
        </p>
        <a href="#" class="btn btn-dark mt-auto w-100 myButton" id="${i}">View Photos</a>
      </div>
    </div>
  </div>`);
  }
}

// Event-listener(s) for "view photos" buttons
$(".card-container").on("click", ".myButton", function (event) {
  let selectedProperty = this.id;
  viewPhotos(selectedProperty);
});

// Photo gallery for selected property
function viewPhotos(selectedProperty) {
  $("#back-to-results").removeClass("invisible");
  $(".card-container").empty();
  for (let i = 0; i < data.items[selectedProperty].listing.images.length; i++) {
    $(".card-container").append(`<div class="col-12 col-xl-3 col-md-5 p-5">
    <div class="card" >
      <img src="${data.items[selectedProperty].listing.images[i]}" class="card-img-top alt="..." />    
    </div>
  </div>`);
  }
}

// Build results page
showResults();
