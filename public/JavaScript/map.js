// // const { location } = require("../../controllers/listing");


// // console.log("CoOrdinates==",coOrdinates.lat)

// // const lat = parseInt(coOrdinates.lat);
// // const lon = parseInt(coOrdinates.lon);


// console.log(coOrdinates);

// // let loc = coOrdinates.splite(",")
// // console.log(loc)


// var map = L.map('map').setView( [coOrdinates], 10); // Coordinates for the center and zoom level

//     // Add CartoDB Positron light map (no API key required)
//     L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}.png', {
//         attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CartoDB</a>'
//     }).addTo(map);


//     // coOrdinate = [ 20.0112475, 73.7902364 ];

//     // coOrdinate = coOrdinates;
//     console.log("==============Map coOrdinates=============");
//     // console.log("DATA ==",lat,"",lon);
//     console.log("==============Map coOrdinates=============");


//     // Add a marker (optional)
//     var marker = L.marker([20.0112475, 73.7902364]).addTo(map)
//         .bindPopup("The Exact Location Will be Provided After Booking")
//         .openPopup();



// ======================================================================================



console.log("Coordinates from Server:", coOrdinates);

// if (!Array.isArray(coOrdinates) || coOrdinates.length !== 2) {
//     console.error("Invalid coordinates:", coOrdinates);
// } else {
    var map = L.map('map').setView(coOrdinates, 10); // Corrected

    // Add CartoDB Positron light map
    L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);

    // Add marker
    var marker = L.marker(coOrdinates).addTo(map)
        .bindPopup("The Exact Location Will be Provided After Booking")
        .openPopup();
// }
