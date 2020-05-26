const express = require("express");
const router =  express.Router();

const { 
    requireSignin,
    isAuth, 
    isAdmin 
} = require("../../app/controllers/authController");
const productsController = require('../../app/controllers/productsController')
const { userById } = require("../../app/controllers/userController");

router.get("/product/:productId", productsController.read);
router.post(
    "/product/create/:userId",
    requireSignin,
    isAdmin,
    isAuth,
    productsController.create
);
router.delete(
    "/product/:productId/:userId",
    requireSignin,
    isAuth,
    isAdmin,
    productsController.remove
);
router.put(
    "/product/:productId/:userId",
    requireSignin,
    isAuth,
    isAdmin,
    productsController.update
);
router.get("/products", productsController.list);
router.get("/products/search", productsController.listSearch);
router.get("/products/related/:productId", productsController.listRelated);
router.get("/products/categories", productsController.listCategories);
router.post("/products/by/search", productsController.listBySearch);
router.get("/product/photo/:productId", productsController.photo);

router.param("userId", userById);
router.param("productId", productsController.productById)

module.exports = router;