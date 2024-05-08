const express=require('express')
const requireAuth=require('../middleware/requireAuth')
const getSlideData = require('../controller/slideController')

const router=express.Router()

router.get("/slideData/:id",requireAuth,getSlideData)

module.exports=router
