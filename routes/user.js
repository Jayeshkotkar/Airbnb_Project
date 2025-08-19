const express = require("express");
const router = express.Router();


const wrapAsync = require("../utils/wrapAsync.js");    // handlling errors
// const ExpressError = require("../utils/ExpressError.js");  // handlling express error

// const { listingSchema, reviewSchema } = require("../schema.js");         // server side validation by using 'joi' package.
const { isLogined, saveRedirectUrl, isReviewAuthor , validateReview } = require("../middleware.js");

// const Listing = require("../models/listing.js");
// const Review = require("../models/review.js");

const passport = require("passport");
// const LocalStrategy = require("passport-local");

// controller

const { signUpForm, postSignUp, logInForm, postLogin, Logout } = require("../controllers/user.js");

// signup

router.get("/signup", signUpForm);

router.post("/signup", wrapAsync(postSignUp));

// login

router.get("/login", logInForm);


router.post("/login", saveRedirectUrl,
    passport.authenticate("local", {
        failureRedirect: "/login",
        failureFlash: true,
    }), wrapAsync(postLogin))


// Logout 

router.get("/logout", Logout)

module.exports = router;