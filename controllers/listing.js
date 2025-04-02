const Listing = require("../models/listing");
const mbxStyles = require('@mapbox/mapbox-sdk/services/styles');
const mbxGeocoding = require('@mapbox/mapbox-sdk/services/geocoding');

module.exports.index = async (req, res) => {
    const allListing = await Listing.find({});
    res.render("listing/index.ejs", { allListing });
}

// render new form

module.exports.renderNewForm = (req, res) => {
    res.render("listing/new.ejs");
}

module.exports.reserve = async(req,res)=>{
    let { id } = req.params;
    let list = await Listing.findById(id);
    res.render("listing/reserve.ejs",{list:list});
}


module.exports.reservePost = async(req,res)=>{
   res.redirect("/listing");
}




// search based on perticular country

module.exports.search = async(req, res) =>{
    let {query} = req.body;

    console.log("data==",query)

    // let allListing = await Listing.find({country:country});
    let allListing = await Listing.find({
        $or: [
            { title: { $regex: new RegExp(query, "i") } },
            { country: { $regex: new RegExp(query, "i") } }
        ]
    });

    console.log(allListing.length);
    if(allListing.length == 0)
    {
        req.flash("error", "Listing Not Found");
        return res.redirect("/listing");
    }
    res.render("listing/index.ejs",{allListing});

}

// show listing

module.exports.showListing = async (req, res) => {
    let { id } = req.params;
    let listing = await Listing.findById(id)
        .populate({
            path: "reviews",
            populate: {
                path: "author",
            },
        }).populate("owner");

    if (!listing) {
        req.flash("error", "Listing does not Exist");
        res.redirect("/listing");
    }

    // console.log("Length",listing.coordinate);

    if (listing.coordinate.length == 0) {

        const address = listing.location;
        const URL = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address)}&addressdetails=1`;
        const response = await fetch(URL);
        const data = await response.json();
        const lat = data[0].lat;
        const lon = data[0].lon;
        listing.coordinate.push(lat);
        listing.coordinate.push(lon);
        
        await listing.save();

        
    }
    // console.log("LCO==",listing.coordinate);

    // console.log("Listing==",listing);

    let currUser = res.locals.user;

    let finalcurrUser = currUser ? currUser._id : null;
    res.render("listing/view.ejs", { list: listing, currUser: finalcurrUser });
}


// create new listing

module.exports.createListing = async (req, res, next) => {

    let url = req.file.path;
    let filename = req.file.filename;

    let { listing } = req.body;
    // let { location } = req.body;
    let newList = await new Listing(listing);
    newList.owner = req.user._id;
    newList.image = { url, filename };
    await newList.save();

    // console.log("-----------------coordinates-------------------");
    // // module.exports = listing.location;
    // const address = listing.location;
    // const URL = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address)}&addressdetails=1`;
    // const response = await fetch(URL);
    // const data = await response.json();
    // const lat = data[0].lat;
    // const lon = data[0].lon;
    // newList.coordinate.push(lat);
    // newList.coordinate.push(lon);
    // await newList.save();

    // console.log("Final Data==", newList);

    req.flash("success", "New Listing Created");

    res.redirect("/listing");
}


// GET Update Listing

module.exports.getUpdate = async (req, res) => {
    let { id } = req.params;

    let list = await Listing.findById(id);

    if (!list) {
        req.flash("error", "Listing does not Exist");
        res.redirect("/listing");
    }

    res.render("listing/update.ejs", { list });

}


// POST Update Listing

module.exports.postUpdate = async (req, res) => {
    let { id } = req.params;
    let { listing } = req.body;

    // =====================================================================
    // in the below code everything is correct but when we send the request from the HOPSCOTCH then anyone can Update
    // =====================================================================

    let list = await Listing.findByIdAndUpdate(id, listing);


    if (req.file) {
        let url = req.file.path;
        let filename = req.file.filename;

        list.image = { url, filename };
        await list.save();
    }

    req.flash("success", "Listing Updated");

    // console.log(list);

    res.redirect(`/listing/${id}`);
}


// Delete Listing

module.exports.deleteListing = async (req, res) => {
    let { id } = req.params;

    await Listing.findByIdAndDelete(id);

    req.flash("success", "Listing Deleted");

    res.redirect("/listing");
}