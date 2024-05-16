const express=require('express')
const requireAuth=require('../middleware/requireAuth')
const {addBookmark, removeBookmark, likePost, getallposts, getallBookmark,isBookmarked}=require("../controller/userPostController")
const router=express.Router();

router.post("/addbookmark",requireAuth,addBookmark)
router.post("/removeBookmark",requireAuth,removeBookmark)
router.post("/like",requireAuth,likePost)
router.get("/getPost",requireAuth,getallposts)
router.get("/isBookmarked/:slideId",requireAuth,isBookmarked)
router.get("/getallBookmark",requireAuth,getallBookmark)

module.exports=router  
