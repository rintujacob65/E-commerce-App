const express = require('express');
const router = express.Router()

const { 
        requireSignin,
        isAuth, 
        isAdmin 
    } = require("../../app/controllers/authController");
const userController = require("../../app/controllers/userController");

router.get('/secret/:userId', 
    requireSignin, 
    isAuth, 
    isAdmin, (req, res) => {
    res.json({
        user : req.profile
    })
})
router.get('/user/:userId', requireSignin, isAuth, userController.read);
router.put('/user/:userId', requireSignin, isAuth, userController.update);
router.get('/orders/by/user/:userId', 
            requireSignin, 
            isAuth, 
            userController.purchaseHistory
        );

router.param('userId',userController.userById)


module.exports = router;