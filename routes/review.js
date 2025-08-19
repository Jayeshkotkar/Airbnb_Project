const express = require("express");
const router = express.Router({ mergeParams: true });


const wrapAsync = require("../utils/wrapAsync.js");    // handlling errors
const ExpressError = require("../utils/ExpressError.js");  // handlling express error

const { listingSchema, reviewSchema } = require("../schema.js");         // server side validation by using 'joi' package.
const { isLogined, saveRedirectUrl, isReviewAuthor , validateReview } = require("../middleware.js");

// const Listing = require("../models/listing.js");
// const Review = require("../models/review.js");

const {createReview, deleteReview} = require("../controllers/review.js");


// create review route

router.post("/", isLogined, validateReview, wrapAsync(createReview));

// Delete Review Route

router.post("/:reviewId", isLogined, isReviewAuthor, wrapAsync(deleteReview));


module.exports = router;