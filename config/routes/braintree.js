const express = require('express');
const router = express.Router();

const { requireSignin, isAuth } = require("../../app/controllers/authController");
const userController = require("../../app/controllers/userController");
const { generateToken, processPayment } = require("../../app/controllers/braintreeController");

router.get('/braintree/getToken/:userId', requireSignin, isAuth, generateToken);
router.post('/braintree/payment/:userId', requireSignin, isAuth, processPayment);
router.param("userId",userController.userById);


module.exports = router;