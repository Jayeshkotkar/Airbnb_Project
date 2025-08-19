// const { location } = require("../../controllers/listing");

var map = L.map('map').setView([51.505, -0.09], 10); // Coordinates for the center and zoom level

    // Add CartoDB Positron light map (no API key required)
    L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CartoDB</a>'
    }).addTo(map);

    // Add a marker (optional)
    var marker = L.marker([51.5, -0.09]).addTo(map)
        .bindPopup("The Exact Location Will be Provided After Booking")
        .openPopup();



 


