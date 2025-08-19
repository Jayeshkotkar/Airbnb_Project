// this is the wrapAsync function that is used to handle the server side Errors.


module.exports = (fn) => {
    return (req, res, next) => {
        fn(req, res, next).catch((err)=>{
            next(err);
        })
    }
}