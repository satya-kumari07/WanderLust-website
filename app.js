const express= require("express");
const app=express();
const mongoose=require('mongoose');
const Listing=require("./models/listing.js");


main()
.then(()=>{
    console.log("connected to DB");
}).
catch((err) =>{ 
    console.log(err)
});
async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/majorproject');
}

app.get("/",(req,res)=>{
    res.send("hii satya");
});

app.get("/listings",async (req,res)=>{
    // let sampleListing=new Listing({
    //     title:"My New Villa",
    //     description:"By the Beach",
    //     price:1200,
    //     location:"chennai",
    //     country:"india",
    // });
    // await sampleListing.save();
    // console.log("sample was saved");
    // res.send("successfull");
    let listing=await Listing.find();
    res.send(listing);
});
app.listen(3000,()=>{
    console.log("server is listening to port 3000");
});