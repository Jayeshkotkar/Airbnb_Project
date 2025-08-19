const mongoose = require("mongoose");
const Review = require("./review");
const User = require("./user");
const { required } = require("joi");
const Schema = mongoose.Schema;

main().then(()=>{
    console.log("Connect to DB");
})
.catch(err => console.log(err));

async function main() {
    await mongoose.connect("mongodb://127.0.0.1:27017/project");
}

const listingSchema = new mongoose.Schema({
    title:{
        type:String,
        require:true
    },
    description:String,
    image: {
       url: String,
       filename: String,
    },
    price:Number,
    location:String,
    country:String,
    reviews:[
        {
            type: Schema.Types.ObjectId,
            ref:"Review"
        }
    ],
    owner:{
        type: Schema.Types.ObjectId,
        ref:"User",
    },
    coordinate:{
        type: [Number],
        require:true,
    },
});


listingSchema.post("findOneAndDelete", async(listing)=> {

    if(listing){
        
    await Review.deleteMany( { _id: { $in: listing.reviews } } );

    }

} )

const Listing = mongoose.model("Listing",listingSchema);

module.exports = Listing;