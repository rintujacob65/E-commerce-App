const express = require('express');
const router = express.Router()

const { 
        signup, 
        signin, 
        signout,
        requireSignin //middleware
     } = require("../../app/controllers/authController");
const { userSignupValidator } = require("../../app/validator")

router.post("/signup", userSignupValidator,  signup);
router.post("/signin",  signin);
router.get("/signout",  signout);


module.exports = router;