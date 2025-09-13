const mongoose=require("mongoose");
const initData=require("./data.js");
const Listing=require("../models/listing.js");

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

const initDB = async ()=>{
    await Listing.deleteMany({});
    initData.data=initData.data.map((el)=>({...el, owner:"68b0a0836f8400660f0ddc7d"}));
    await Listing.insertMany(initData.data);
    console.log(initData.data);
    console.log("data was initialized");

}
initDB();