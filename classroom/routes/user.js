const express= require("express");
const router=express.Router();

//index route-users
router.get("/",(req,res)=>{
    res.send("get for users");
});
//show route-users
router.get("/:id",(req,res)=>{
    res.send("get for show users");
});
//post -users
router.post("/",(req,res)=>{
    res.send("post for users");
});
//delete -users
router.delete("/:id",(req,res)=>{
    res.send("delete for users id");
});

module.exports=router;