const express = require('express')
const authController = require("../controllers/auth.controllers")

const router = express.Router();

// User auth APIs
router.post("/user/register", authController.registerUser)
router.post('/user/login' , authController.loginUser)
router.get('/user/logout' , authController.logoutUser)

// food partner auth APIs
router.post("/food-partner/register" , authController.registerfoodPartner)
router.post("/food-partner/login" , authController.loginfoodPartner)
router.get("/food-partner/logout" , authController.logoutfoodPartner)

module.exports = router; 