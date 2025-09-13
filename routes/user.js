const express= require("express");
const router = express.Router();
const wrapAsync=require("../utils/wrapAsync.js");
const passport = require("passport");
const {savedUrl}=require("../middleware.js");
const userController = require("../controllers/users.js");


router
.route("/signup")
    .get(userController.renderSignupForm)
    .post(wrapAsync(userController.signup));

router
.route("/login")
    .get(userController.renderLoginForm)
    .post(savedUrl,passport.authenticate("local", {failureRedirect: "/login",failureFlash: true}),userController.login);


router.get("/logout",userController.logout);

module.exports = router;