const express = require("express");
// const router = express.Router();


const wrapAsync = require("../utils/wrapAsync.js");    // handlling errors
// const ExpressError = require("../utils/ExpressError.js");  // handlling express error

const { listingSchema, reviewSchema } = require("../schema.js");         // server side validation by using 'joi' package.
const { isLogined, saveRedirectUrl, isReviewAuthor , validateReview } = require("../middleware.js");

const Listing = require("../models/listing.js");
const Review = require("../models/review.js");
const User = require("../models/user.js");

const passport = require("passport");
const LocalStrategy = require("passport-local");


// SignUp Form

module.exports.signUpForm = (req, res) => {
    res.render("user/signup.ejs");
}

// POST SignUp 

module.exports.postSignUp = async (req, res) => {
    let { username, email, password } = req.body;

    let newUser = await new User({ username, email });
    // await User.deleteMany({});
    let registerUser = await User.register(newUser, password);
    req.login(registerUser, (err) => {
        if (err) {
            next(err);
        }
    })
    
    req.flash("success","Account Created Successfully");
    res.redirect("/listing");
}

// LogIn Form

module.exports.logInForm = (req, res) => {
    res.render("user/login.ejs");
}


// POST Login

module.exports.postLogin = async (req, res) => {

    // console.log(req.originalUrl);
    let redirectUrl = res.locals.redirectUrl || "/listing";

req.flash("success","Login Successfully");

    res.redirect(redirectUrl);

}

// Logout 

module.exports.Logout = (req, res, next) => {
    req.logout((err) => {
        if (err) {
            next(err);
        }
    })
    req.flash("success","Logout Successfully");
    res.redirect("/listing");
}
