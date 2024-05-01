const express=require('express');
const User=require("../models/user")
const Post=require("../models/post")
const Slide=require("../models/slide")
const requireAuth=require("../middleware/requireAuth")
const bcrpyt=require("bcrypt")
const jwt=require("jsonwebtoken")

//Register
const registerUser=async(req,res)=>{
    try {
        const {username,password}=req.body;

        if(!username||!password){
            return res.status(400).json({message:"Username or password required"})
        }

        const existringUser=await User.findOne({username})

        if(existringUser){
            return res.status(409).json({message:"Username already exists"})
        }

        const hashedPassword=await bcrpyt.hash(password,10);

        const newUser=new User({
            username, 
            password:hashedPassword
        })

        await newUser.save()
        res.status(200).json({ message: "User created" });
        }
    catch (error) {
        console.error(error)
        res.status(500).json({ error: "Internal Server Error" })
    }
}

//login
const loginUser = async (req, res) => {
    try {
        const { username, password } = req.body;

        const findUsername = await User.findOne({ username }); // Changed find() to findOne()

        if (!findUsername) {
            return res.status(404).json({ message: "User not found" });
        }

        const passwordMatch = await bcrpyt.compare(password, findUsername.password); // Fixed the typo here

        if (!passwordMatch) {
            return res.status(400).json({ message: "Invalid username or password" });
        }

        const token = jwt.sign(
            {
                user: findUsername._id
            },
            process.env.JWT_SECRET_KEY,
            {
                expiresIn: "7d"
            }
        );

        res.json({
            success: true,
            token: token,
            userId: findUsername._id,
            username: findUsername.username
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};


const logout=async(req,res)=>{
    try {
        const { username } = req.body;

        const token = jwt.sign(
          {
            user: username.username,
          },
          process.env.JWT_SECRET_KEY,
          { expiresIn: 0 }
        );
    
        res.json({ success: true, token, user: username.username });
    } catch (error) {
        console.error(error)
        res.status(500).json({ error: "Internal Server Error" })
    }
}
module.exports={
    registerUser,
    loginUser,
    logout
}