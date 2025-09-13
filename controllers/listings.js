const Listing = require("../models/listing");

module.exports.index = (async(req,res)=>{
    const allListing=await Listing.find({});
    res.render("listings/index.ejs",{allListing});
})

module.exports.renderNewForm = async(req,res)=>{
        res.render("listings/new.ejs");
};

module.exports.createListing = async(req,res,next)=>{
    let url=req.file.path;
    let filename=req.file.filename;
    console.log(url, ".......", filename);

    const newListing=new Listing(req.body.listing);
    newListing.owner = req.user._id;
    newListing.image={url,filename};
    await newListing.save();
    req.flash("success","New listing created!");
    res.redirect("/listings");
}
module.exports.showListing = async(req,res)=>{
    let {id}=req.params;
    const listings=await Listing.findById(id)
        .populate({
            path:"reviews",
            populate:{
                path : "author",
            },
        })
        .populate("owner");
    if(!listings){
          req.flash("error","Listing you requested for does not exist");
          return res.redirect("/listings");
    }
    console.log(listings);
    res.render("listings/show.ejs",{listings});
}

module.exports.renderEditForm = async(req,res)=>{
    let {id}=req.params;
    const listings=await Listing.findById(id);
       if(!listings){
          req.flash("error","Listing you requested for does not exist");
          return res.redirect("/listings");
    }

    let originalImageUrl = listings.image.url;
    originalImageUrl= originalImageUrl.replace("/upload","/upload/w_250");
    res.render("listings/edit.ejs",{listings, originalImageUrl});
}

module.exports.updateListing = async(req,res)=>{
     let {id}=req.params;
    let listing=await Listing.findByIdAndUpdate(id,{...req.body.listing});

    if(typeof req.file !== "undefined"){
    let url=req.file.path;
    let filename=req.file.filename;
    listing.image={url,filename};
    await listing.save();
    }
    req.flash("success","Listing updated!");
    res.redirect(`/listings/${id}`);
};
module.exports.destroyListing= async(req,res)=>{
    let {id}=req.params;
    await Listing.findByIdAndDelete(id);
     req.flash("success","listing deleted!");
    res.redirect("/listings");
}