const express=require("express");
const router = express.Router();
const wrapAsync=require("../utils/wrapAsync.js");
const Listing=require("../models/listing.js");
const {isloggedIn, isOwner, validateListing} = require("../middleware.js");
const listingController = require("../controllers/listings.js");
const multer = require('multer');
const {storage} = require("../cloudConfig.js");
const upload = multer({storage});

router
.route("/")
    .get(wrapAsync(listingController.index))    //index route
    .post(
        isloggedIn,
        upload.single('listing[image]'),
        validateListing,
        wrapAsync(listingController.createListing)
    );  
    
//new Route
router.get("/new",isloggedIn,wrapAsync(listingController.renderNewForm));      

router
.route("/:id")
    .get(wrapAsync(listingController.showListing))          //show listing
    .put(
        isloggedIn,
        isOwner,                                          //update listing
        upload.single('listing[image]'),
        validateListing,
        wrapAsync(listingController.updateListing)
    )      
    .delete(isloggedIn,isOwner,wrapAsync(listingController.destroyListing));                    //delete listing

//edit route
router.get("/:id/edit",isloggedIn,isOwner,wrapAsync(listingController.renderEditForm));


module.exports = router;