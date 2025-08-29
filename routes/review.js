const express=require("express");
const router = express.Router({mergeParams:true});
const Review=require("../models/review.js");
const ExpressError = require("../utils/ExpressError.js");
const wrapAsync=require("../utils/wrapAsync.js");
const {isloggedIn,validateReview, isAuthor} = require("../middleware.js");
const reviewController = require("../controllers/reviews.js");

//Reviews 
//post review route
router.post(
    "/",isloggedIn,validateReview,
    wrapAsync(reviewController.createReview));

//delete review route
router.delete("/:reviewId",isloggedIn,isAuthor,wrapAsync(reviewController.destroyReview));


module.exports=router;