const express=require('express');
const Post=require("../models/post")
const Slide=require("../models/slide")
const requireAuth=require("../middleware/requireAuth")
const router=express.router()

const getPost=async(req,res)=>{
    try {
        const {id}=req.params;

        const findPost=await Post.findById(id).populate("slide")
        res.status(200).send(findPost)
    } catch (error) {
        console.log(error)
        res.status(500).send({ error: "Internal Server Error" });
    }
}

const addPost=async(req,res)=>{
    try {
        const {slides}=req.body;

        const slideObject=slides.map((slideData,index)=>{
            return new Slide({
                slideNumber:index+1,
                header:slideData.header,
                description:slideData.description,
                imageUrl:slideData.imageUrl,
                likes:[],
                category:slideData.category,
            })
        })

        const createSlides=await Slide.create(slideObject)

        const post=new Post({
            slides:createSlides.map((slide)=>slide._id),
            postedBy:req.user
        })

        await post.save()
        res.status(201).json({message:"Post created successfully"})
    } catch (error) {
        console.log(error)
        res.status(500).send({ error: "Internal Server Error" });
    }
}

const editPost=async(req,res)=>{
    const {slides:editedSlides}=req.body;
    const {id}=req.params;
    try {
        const existingPost=await Post.findById(id);
        
        await Slide.deleteMany({ _id: { $in: existingPost.slides } });

        const slideObjects = editedSlides.map((slideData, index) => {
            return new Slide({
              slideNumber: index + 1,
              header: slideData.header,
              description: slideData.description,
              imageUrl: slideData.imageUrl,
              likes: [],
              category: slideData.category,
            });
          });

        const createSlides=await Slide.create(slideObjects)

        existingPost.slides=createSlides.map((slide)=>slide._id);
        await existingPost.save();

        res.status(200).send({ message: "Post updated successfully" });
    } catch (error) {
        console.log(error)
        res.status(500).send({error:"Internal Server Error"})
    }
}

//add category
module.exports={
    getPost,
    addPost,
    editPost
}