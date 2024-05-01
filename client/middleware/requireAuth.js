const jwt=require("jsonwebtoken");
const dotenv=require("dotenv")
dotenv.config()

const requireAuth=async(req,res,next)=>{
    const token=req.header('Authorization')

    if(!token){
        return res.status(401).json({message:"Invalid token"})
    }

    try {
        const decoded=jwt.verify(token,process.env.JWT_SECRET_KEY);
        req.user=decoded.user;
        next()
    } catch (error) {
        console.log(error)
        res.status(400).json({ message: "Unauthorized" });
    }
}

module.exports=requireAuth