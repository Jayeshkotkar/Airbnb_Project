const Listing = require("./models/listing");
const Review = require("./models/review");
const ExpressError = require("./utils/ExpressError.js");         // handlling express error
const { listingSchema, reviewSchema } = require("./schema.js");  // server side validation by using 'joi' package.


module.exports.isLogined = (req, res, next)=>{
    if(!req.isAuthenticated()){                     // check user is login or not
        req.session.redirectUrl = req.originalUrl;            // redirect cuurent page after login
        // req.flash("error","you are not login");
        return res.redirect("/login");
    }
    next();
}

module.exports.saveRedirectUrl = (req, res, next)=>{
    if(req.session.redirectUrl){
        res.locals.redirectUrl = req.session.redirectUrl;
    }
    next();
}


// to check a user who want to make changes ( update/ delete) is that actually owner of this listing or not

module.exports.isOwner = async (req, res, next) => {
    let { id } = req.params;
    let listing = await Listing.findById(id);

    console.log("===============");
    console.log(res.locals.user);
    console.log("===================");

    if(!listing.owner._id.equals(res.locals.user._id))
    {
        req.flash("error","you are not the owner of this listing");
        return res.redirect(`/listing/${id}`);
    }
    next(); 
}


// to check a user who want to make changes (  delete) is that actually owner of this review or not

module.exports.isReviewAuthor = async(req, res, next)=>{
    let { id, reviewId } = req.params;
    let review = await Review.findById(reviewId);
    if(!review.author.equals(res.locals.user.id)){
        console.log("You are not authour of this review");
        return res.redirect(`/listing/${id}`);
    }
    next();
}



// joi validate listing

module.exports.validateListing = (req, res, next) =>{
    let { error } = listingSchema.validate(req.body);           // joi - validation
    console.log("--------------------------------");
    console.log(error);

    if(error){
        throw new ExpressError(400, error);
    }
    else{
        next();
    }
};





// validate review using joi

module.exports.validateReview = (req, res, next) =>{
    let { error } = reviewSchema.validate(req.body);
    // console.log(result);

    if(error){
        throw new ExpressError(400, error);
    }
    else{
        next();
    }
};