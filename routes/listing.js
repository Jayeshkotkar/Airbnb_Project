const express = require("express");
const router = express.Router();

const { isLogined, saveRedirectUrl, isReviewAuthor, isOwner, validateListing } = require("../middleware.js");
const wrapAsync = require("../utils/wrapAsync.js");    // handlling errors
const ExpressError = require("../utils/ExpressError.js");  // handlling express error
const { listingSchema, reviewSchema } = require("../schema.js");         // server side validation by using 'joi' package.

const Listing = require("../models/listing.js");
const {index,renderNewForm,showListing,createListing, getUpdate, getEmail, postEmail, postUpdate, deleteListing} = require("../controllers/listing.js");
 
const multer = require("multer");            // to parse form data i.e file upload data

const {storage} = require("../cloudConfig.js");

const upload = multer( { storage } );  // here multer is store files on cloudinary storage






// create new listing form
router.get("/new", isLogined, renderNewForm);

// create new listing
router.post("/", isLogined, upload.single("listing[image]"), validateListing, wrapAsync(createListing));

// router.post("/",upload.single('listing[image]'), (req, res)=>{
//     res.send(req.file);
// })

// index route
router.get("/", wrapAsync(index));

// View perticular listing
router.get("/:id", wrapAsync(showListing));


// Get Update Listing
router.get("/:id/edit", isLogined, isOwner, wrapAsync(getUpdate));


router.get("/:id/email", isLogined, getEmail);
router.post("/:id/email", isLogined, postEmail);


// Post Update listing
router.post("/:id/edit",isLogined, isOwner, upload.single("listing[image]"), validateListing, wrapAsync(postUpdate));


// Delete listing
router.get("/:id/delete", isLogined, isOwner, wrapAsync(deleteListing));


module.exports = router;