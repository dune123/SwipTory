const express=require('express')
const requireAuth=require("../middleware/requireAuth");
const { getPost, addPost, editPost } = require('../controller/postController');

const router=express.Router();
router.get("/getpost/:id",requireAuth,getPost)
router.post("/addpost",requireAuth,addPost)
router.put("/editpost",requireAuth,editPost)

module.exports=router