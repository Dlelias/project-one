var cardImageEl = "url for property image";
var cardHeaderEl = "Address";
var cardTextEl = "Price/size";

var data = JSON.parse(localStorage.getItem("cityData"));

function tester() {
  for (var i = 0; i < 8; i++) {
    $(".card-container").append(`<div class="col-12 col-xl-3 col-md-5 p-5" id="card-8">
    <div class="card">
      <img src="https://via.placeholder.com/150" class="card-img-top" alt="..." />
      <div class="card-body">
        <h5 class="card-header">${data.items[i].listing.geo_location.full_address}</h5>
        <p class="card-text">
          ${data.items[i].listing.rates.monthly_rate}
        </p>
        <a href="#" class="btn btn-primary myButton">Select Property</a>
      </div>
    </div>
  </div>`);
  }
}

// Event-listener (button pressed)
$(".card-container").on("click", ".myButton", function (event) {});

tester();
