const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Review = require("./review.js");


const listingSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    description: String,
    image: {
        url: String,
       filename:String,
    },
    price: {
        type:Number,
  },
    location: {
        type: String,
    },
    country: {
        type:String,
    },
    reviews: [
        {
            type:Schema.Types.ObjectId,
            ref:"Review",
        },
    ],
    owner:{
        type:Schema.Types.ObjectId,
        ref:"User",
    },
});

listingSchema.post("findOneAndDelete", async(listing)=>{
    if(listing){
        await Review.deleteMany({_id:{$in: listing.reviews}});
    }
});

const Listing = mongoose.model("Listing", listingSchema);
module.exports = Listing;


// const mongoose=require('mongoose');
// const Schema=mongoose.Schema;

// const listingSchema = new Schema({
//     title: {
//         type:String,
//         required:true,
//     },
//     description: String,
//     image: {
//         type: String,
//         default:"https://unsplash.com/photos/brown-wooden-lounge-chairs-near-pool-surrounded-by-palm-trees-vmIWr0NnpCQ",
//         set:(v)=>
//             v === ""
//             ? "https://unsplash.com/photos/brown-wooden-lounge-chairs-near-pool-surrounded-by-palm-trees-vmIWr0NnpCQ" 
//             : v,
//     },
//     price:{
//         type:Number,
//     },
//     location:{
//         type: String,
//     },
//     country: {
//         type:String,
//     },
// });
// const Listing = mongoose.model("Listing", listingSchema);
// module.exports=Listing;

