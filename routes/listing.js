const express=require("express");
const router = express.Router();
const wrapAsync=require("../utils/wrapAsync.js");
const {listingSchema}= require("../schema.js");
const ExpressError = require("../utils/ExpressError.js");
const Listing=require("../models/listing.js");


const validateListing =(req,res,next)=>{

    let {error} = listingSchema.validate(req.body);
    if(error){
        let errMsg= error.details.map((el)=>el.message).join(",");
        next(new ExpressError(400,errMsg));
    }else{
        next();
    }
}

//index route
router.get("/",wrapAsync(async(req,res)=>{
    const allListing=await Listing.find({});
    res.render("listings/index.ejs",{allListing});
}));

//new Route
router.get("/new",wrapAsync(async(req,res)=>{
    res.render("listings/new.ejs");
}));

router.post("/",validateListing,wrapAsync(async(req,res,next)=>{
    const newListing=new Listing(req.body.listing);
    await newListing.save();
    req.flash("success","New listing created!");
    res.redirect("/listings");
    console.log("newListing");
}));

//show route
router.get("/:id",wrapAsync(async(req,res)=>{
    let {id}=req.params;
    const listings=await Listing.findById(id).populate("reviews");
    if(!listings){
          req.flash("error","Listing you requested for does not exist");
          return res.redirect("/listings");
    }
    res.render("listings/show.ejs",{listings});
}));

//edit route
router.get("/:id/edit",wrapAsync(async(req,res)=>{
    let {id}=req.params;
    const listings=await Listing.findById(id);
       if(!listings){
          req.flash("error","Listing you requested for does not exist");
          return res.redirect("/listings");
    }
    res.render("listings/edit.ejs",{listings});
}));

router.put("/:id",validateListing, wrapAsync(async(req,res)=>{
     let {id}=req.params;
    await Listing.findByIdAndUpdate(id,{...req.body.listing});
     req.flash("success","Listing updated!");
    res.redirect(`/listings/${id}`);
}));

//delete route
router.delete("/:id",wrapAsync(async(req,res)=>{
    let {id}=req.params;
    await Listing.findByIdAndDelete(id);
     req.flash("success","listing deleted!");
    res.redirect("/listings");
}));

module.exports = router;