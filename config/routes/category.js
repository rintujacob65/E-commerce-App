const express = require("express");
const router =  express.Router();

const { 
    requireSignin,
    isAuth, 
    isAdmin 
} = require("../../app/controllers/authController");
const categoriesController = require("../../app/controllers/categoriesController");
const { userById } = require("../../app/controllers/userController")

router.get("/category/:categoryId", categoriesController.read);
router.post(
    "/category/create/:userId", 
    requireSignin, isAuth, isAdmin, categoriesController.create
);
router.put(
    "/category/:categoryId/:userId", 
    requireSignin, isAuth, isAdmin, categoriesController.update
);
router.delete(
    "/category/:categoryId/:userId", 
    requireSignin, isAuth, isAdmin, categoriesController.remove
);

router.get('/categories', categoriesController.list);


router.param("userId", userById);
router.param("categoryId", categoriesController.categoryById);

module.exports = router ;