const {listingSchema, reviewSchema}= require("./schema.js");
const ExpressError = require("./utils/ExpressError.js");
const Listing = require("./models/listing");
const Review=require("./models/review.js");

module.exports.isloggedIn = (req,res,next)=>{
        if(!req.isAuthenticated()){
            if(req.originalUrl.includes("/reviews")){
                const listingId = req.params.id;
                req.session.redirectUrl = `/listings/${listingId}`;
            }else{
                 req.session.redirectUrl = req.originalUrl;
            }
            req.flash("error","You must be logged in to create listing");
            return res.redirect("/login");
        }
        next();
};

module.exports.savedUrl=(req,res,next)=>{
    if(req.session.redirectUrl){
        res.locals.redirectUrl = req.session.redirectUrl;
    }
    next();
}

module.exports.isOwner = async(req,res,next)=>{
    let  {id} = req.params;
    let listings = await Listing.findById(id);
    if(!listings.owner._id.equals(res.locals.currUser._id)){
        req.flash("error","You are not the owner of this listing");
        return res.redirect(`/listings/${id}`);
    }next();
}

module.exports.validateListing =(req,res,next)=>{

    let {error} = listingSchema.validate(req.body);
    if(error){
        let errMsg= error.details.map((el)=>el.message).join(",");
        next(new ExpressError(400,errMsg));
    }else{
        next();
    }
}

module.exports.validateReview =(req,res,next)=>{

    let {error} = reviewSchema.validate(req.body);
    if(error){
        let errMsg= error.details.map((el)=>el.message).join(",");
        next(new ExpressError(400,errMsg));
    }else{
        next();
    }
}

module.exports.isAuthor = async(req,res,next)=>{
    let  {id,reviewId} = req.params;
    let review = await Review.findById(reviewId);
    if(!review.author._id.equals(res.locals.currUser._id)){
        req.flash("error","You are not the author of this listing");
        return res.redirect(`/listings/${id}`);
    }next();
}
