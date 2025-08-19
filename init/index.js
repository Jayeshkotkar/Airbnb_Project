const mongoose = require("mongoose");
const Listing = require("../models/listing.js");
const {data} = require("./data.js");


main().then(()=>{
    // console.log("Connect to DB");
})
.catch(err => console.log(err));

async function main() {
    await mongoose.connect("mongodb://127.0.0.1:27017/project");
}


const initDB = async()=> {
    
    // console.log(data);
    await Listing.deleteMany({});
    let allListing = data.map((obj)=> ({ ...obj,owner:'67a859a2024d24ff316e407a' }));
    await Listing.insertMany(allListing);
    // console.log("data was intialize");
    
};

initDB();