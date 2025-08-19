const Listing = require("../models/listing");
const mbxStyles = require('@mapbox/mapbox-sdk/services/styles');
const mbxGeocoding = require('@mapbox/mapbox-sdk/services/geocoding');
// const nodemailer = require('nodemailer');

const bodyParser = require("body-parser");
const cors = require("cors");
const { Resend } = require("resend");



module.exports.index = async (req, res) => {
    const allListing = await Listing.find({});
    res.render("listing/index.ejs", { allListing });
}

// render new form

module.exports.renderNewForm = (req, res) => {
    res.render("listing/new.ejs");
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

    // console.log(listing);
    // console.log("Hello world")
    let currUser = res.locals.user;

    let finalcurrUser = currUser ? currUser._id : null;
    // console.log("Display Current User");
    // console.log(currUser);
    res.render("listing/view.ejs", { list: listing, currUser: finalcurrUser });
}


// create new listing

module.exports.createListing = async (req, res, next) => {

    let url = req.file.path;
    let filename = req.file.filename;

    let { listing } = req.body;
    let { location } = req.body;
    let newList = await new Listing(listing);
    newList.owner = req.user._id;
    newList.image = { url, filename };
    await newList.save();

    console.log("-----------------coordinates-------------------");
    module.exports = listing.location;
    const address = listing.location;
    const URL = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address)}&addressdetails=1`;
    const response = await fetch(URL);
    const data = await response.json();
    const lat = data[0].lat;
    const lon = data[0].lon;
    console.log(data);
    console.log("lattitude", lat);
    console.log("longitude", lon);
    console.log("-----------------coordinates-------------------");


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


module.exports.getEmail = async (req, res) => {
    let { id } = req.params;

    let list = await Listing.findById(id);

    if (!list) {
        req.flash("error", "Listing does not Exist");
        res.redirect("/listing");
    }

    res.render("listing/email.ejs", { list });

}


module.exports.postEmail = async (req, res) => {

    const resend = new Resend("re_V5Mo7iyE_5cQFfJHUsVP2kuKCLe3K6VVU"); 

    let { id } = req.params;

    console.log("Id==",id);

    let { listing } = req.body;

    console.log(listing);

    try {
        await resend.emails.send({
            from: "jayeshkotkardi@gmail.com",
            to: "jayeshkotkardi@gmail.com",
            subject: "New Form Submission",
            text: `Item Name: ${listing.title}\nName: ${listing.name}\nMobile Number: ${listing.number}\n Email: ${listing.email}\nPayment: ${listing.payment}\nQty: ${listing.qty}\nLocation: ${listing.location}\n`,

        });
        req.flash("success","Email Send Successfully");
        console.log("====================");
        console.log(resend);
        console.log("====================");

    } catch (error) {
        console.error("❌ Error sending email:", error);
        res.status(500).send("❌ Failed to send email.");
    }

    res.redirect("/listing");

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