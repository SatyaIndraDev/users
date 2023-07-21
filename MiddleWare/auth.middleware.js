const jwt=require("jsonwebtoken")
const {blockList}=require("../blocklist")

const auth=(req,res,next)=>{
    const token=req.headers.authorization.split(" ")[1]
    if(token){
        if(blockList.includes(token)){
            res.status(400).json({"msg":"Token Expired"})
        }else{
            const decode=jwt.decode(token,"masai");
            if(decode){
                next()
            }else{
                res.status(400).json({"msg":"Not Authorized"})
            }
        }
    }else{
        res.status(400).json({"msg":"Please Login again"})
    }
}
module.exports={
    auth
}