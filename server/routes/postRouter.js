const express=require('express')
const requireAuth=require("../middleware/requireAuth");
const { getPost, addPost, editPost, getStory } = require('../controller/postController');

const router=express.Router();
router.get("/getpost/:id",requireAuth,getPost)
router.post("/addpost",requireAuth,addPost)
router.put("/editpost",requireAuth,editPost)
router.get("/getstory/:category",getStory)

module.exports=router  