const express=require("express");
const router=express.Router();


//index route - post
router.get("/",(req,res)=>{
    res.send("get for users");
});
//show route - post
router.get("/:id",(req,res)=>{
    res.send("get for show users");
});
//post - post
router.post("/",(req,res)=>{
    res.send("post for users");
});
//delete - post
router.delete("/:id",(req,res)=>{
    res.send("delete for users id");
});

module.exports = router;
