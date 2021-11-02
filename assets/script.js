//selectors


//globals
var roomsBaseApi = "https://cors-anywhere.herokuapp.com/https://www.roomster.com/api/search?"; //base url for roomster api in develop mode. uses a proxy -- make sure you authenticate to the server.
// var roomsBaseApi = "https://www.roomster.com/api/search?";// base url to use when deploying to production -- you do not need a proxy server in prod**important


//functions

//
function formatCityState(citySearch, state)
{
        var formattedStrings = [];
        // splits string if spaces
        var city = citySearch.split(" ");
        if(city.length > 1) // if multiple words
        {
            city[0] += "%2520"; // appends space string to first word
            city[1] += "%252C%2520"; // appends comma and space string to second word
            citySearch = city[0] + city[1]; //redefines city search to query param form
            console.log(citySearch);
            formattedStrings.push(citySearch);
        }else
        {
            citySearch += "%252C%2520"; // if city = one word then append comma and space string
            console.log(citySearch);
            formattedStrings.push(citySearch);
        }
    
        state += "%252C%2520"; //appends comma and space to acheive query param form
        formattedStrings.push(state);

        return formattedStrings;

}

//returns room listings data based on given budget, city and geo location values
function fetchRoomListings(budgetMin = 0, budgetMax, citySearch, state, swLat, swLng, neLat, neLng)
{
    var url = roomsBaseApi;
    var responseData;

    var cityStateStrings = formatCityState(citySearch, state);

    citySearch = cityStateStrings[0];
    state = cityStateStrings[1];

    url+=`search_params.sort=LastActivity&search_params.budget.min=${budgetMin}&search_params.budget.max=${budgetMax}&search_params.geo.lat_sw=${swLat}&search_params.geo.lng_sw=${swLng}&search_params.geo.lat_ne=${neLat}&search_params.geo.lng_ne=${neLng}&search_params.searchLocation=${citySearch}${state}USA&search_params.page_size=11`;

    console.log(url);

    // fetch room list data
    responseData = fetch(url)
    .then(response => response.json())
    .then((data) => data.items);

    
    return responseData;
}    

data = fetchRoomListings(0,5000, "Long Beach", "CA", 33.732742, -118.248966, 33.885459, -118.063162);
console.log(data);

