const Listing = require("../models/listing.js");
const Review = require("../models/review.js");


// create Review Route

module.exports.createReview = async (req, res) => {

    let { id } = req.params;

    let { review } = req.body;

    let listing = await Listing.findById(id);

    let newReview = await new Review(review);

    

    newReview.author = req.user._id;  // here we store author of new review

    listing.reviews.push(newReview);

    await newReview.save();
    await listing.save();

    // console.log("--------- REVIEW ----------------");
    // console.log(newReview);
    // console.log(newReview.rating);
    // console.log("--------- REVIEW ----------------");

    req.flash("success", "New Review Created");

    // console.log(newReview);

    res.redirect(`/listing/${id}`);

    // res.send("Review Success"); 
}


// Delete Review Route

module.exports.deleteReview = async (req, res) => {
    let { id, reviewId } = req.params;

    // Listing.reviews.findByIdAndDelete(reviewId);

    await Listing.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });

    await Review.findByIdAndDelete(reviewId);

    req.flash("success", "Review Deleted");

    res.redirect(`/listing/${id}`);
}