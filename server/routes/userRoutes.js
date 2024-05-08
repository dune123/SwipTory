const express=require('express')
const {registerUser, loginUser, logout}=require("../controller/userController");
const requireAuth = require('../middleware/requireAuth');

const router=express.Router();
router.post("/register",registerUser)
router.post("/login",loginUser)
router.post("/logout",requireAuth,logout)

module.exports=router
