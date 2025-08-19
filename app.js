if(process.env.NODE_ENV != "production"){
    require("dotenv").config();
}

const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const ejsMate = require("ejs-mate");             // use for boilerplate code ( layout() )
const wrapAsync = require("./utils/wrapAsync.js");    // handlling errors
const ExpressError = require("./utils/ExpressError.js");  // handlling express error
const { listingSchema, reviewSchema } = require("./schema.js");         // server side validation by using 'joi' package.

const bodyParser = require('body-parser');
const session = require("express-session");          // session 
const flash = require("connect-flash");                 // flash messages
const helmet = require("helmet");

const { isLogined, saveRedirectUrl, isReviewAuthor, validateListing, validateReview } = require("./middleware.js");

const passport = require("passport");
const LocalStrategy = require("passport-local");

const Listing = require("./models/listing.js");
const Review = require("./models/review.js");
const User = require("./models/user.js");

const listingRouter = require("./routes/listing.js");            //  All Listing Routes
const reviewRouter = require("./routes/review.js");             // All Reviews Routes
const userRouter = require("./routes/user.js");                 // All Users Routes

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true }));         // to parse form data
app.engine("ejs", ejsMate);                             // use for boilerplate code (i.e navbar ( layout() )).
app.use(express.static(path.join(__dirname, "/public")));

passport.use(new LocalStrategy(User.authenticate()));   // responsible for login and signup user

passport.serializeUser(User.serializeUser());       // store user info into the session when it's login
passport.deserializeUser(User.deserializeUser());  // destroy user info from the sessiom when the user logout

const cors = require("cors");

app.use(bodyParser.json());
app.use(cors());
app.use(helmet({
    contentSecurityPolicy: {
        directives: {
            defaultSrc: ["'self'"],
            scriptSrc: ["'self'", "https://cdn.jsdelivr.net", "https://unpkg.com", "https://cdnjs.cloudflare.com"],
            styleSrc: ["'self'", "'unsafe-inline'", "https://cdn.jsdelivr.net", "https://unpkg.com", "https://cdnjs.cloudflare.com"],
            imgSrc: [
                "'self'",
                "data:",
                "https://images.unsplash.com",
                "https://plus.unsplash.com",
                "https://*.basemaps.cartocdn.com",
                "https://*.tile.openstreetmap.org"
            ],
            fontSrc: ["'self'", "https://cdnjs.cloudflare.com", "data:"],
            connectSrc: ["'self'"],
            objectSrc: ["'none'"],
            frameAncestors: ["'self'"]
        }
    }
}));

app.use(session({
    secret: process.env.SESSION_SECRET || 'your-secret-key',  // Use env in production
    resave: false,
    saveUninitialized: true,
    cookie:{
        expires: Date.now() + 7 * 24 * 60 * 60 * 1000,
        maxAge: 7 * 24 * 60 * 60 * 1000,
        httpOnly: true,
    },
}));

app.use(flash());                       // here we use flash

app.use(passport.initialize());
app.use(passport.session());       // to check wheather same user on different web pages.


app.use((req, res, next) => {
    // console.log("display user", req.user);
    res.locals.user = req.user;                 // This makes req.user available in all views
    next();
});


main().then(() => {
    // console.log("Connected to DB");
})
    .catch(err => console.log("Error in Conection",err));

async function main() {
    await mongoose.connect("mongodb://127.0.0.1:27017/project")
}








// Flash Middleware 

app.use((req, res, next)=>{
    res.locals.success = req.flash("success");
    res.locals.error = req.flash("error");
    next();
})


// All listing Routes are here

app.use("/listing", listingRouter);

// All reviews Routes are here

app.use("/listing/:id/review", reviewRouter);


// All users Routes are here

app.use("/",userRouter);





app.all("*",(req, res, next)=>{
    next(new ExpressError(404, "Page Not Found"))
})


app.use((err, req, res, next)=>{
    let { statusCode=500, message="Something went wrong" } = err;
    // res.status(statusCode).send(message);
    // console.log("something went wrong");
    // res.send("something went wrong");

    res.render("error.ejs",{message});
})





// console.log("SERVER");

app.listen(8000, () => {
    console.log("App is listening on port 8000");
});







// <!-- <% if( currUser && currUser.equals(list.owner._id)) { %> -->
//     <!-- <% } %> -->
