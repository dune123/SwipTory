const Slide=require("../models/slide")

const getSlideData=async(req,res)=>{
    const {id}=req.params;
    try {
        const slide=await Slide.findById(id);
        if(!slide){
            return res.status(404).send({message:"Slide not found"});
        }
        res.status(200).json({slide})
    } catch (error) {
        console.log(error)
        res.status(500).send({error:"Internal Server Error"});
    }
}

module.exports=getSlideData;