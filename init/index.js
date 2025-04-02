const mongoose = require("mongoose");
const Listing = require("../models/listing.js");
const { data } = require("./data.js");


const ATLASDB_URL = "mongodb + srv://jayeshkotkar01:KloP7hJEoXQMUVyf@cluster0.90tlvha.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"


// main().then(()=>{
//     // console.log("Connect to DB");
// })
// .catch(err => console.log(err));

// async function main() {
//     await mongoose.connect(ATLASDB_URL);
// }


const initDB = async () => {

    // console.log(data);
    await Listing.deleteMany({});
    let allListing = data.map((obj) => ({ ...obj, owner: '67a859a2024d24ff316e407a' }));
    await Listing.insertMany(allListing);
    // console.log("data was intialize");

};

initDB();