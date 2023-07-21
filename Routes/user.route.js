const express=require("express")

const {userModel}=require("../Model/User.model")
const bcrypt=require("bcrypt")
const jwt=require("jsonwebtoken")
const {blockList}=require("../blocklist")

const UserRouter=express.Router();

UserRouter.post("/register",async(req,res)=>{
    try {
        const {name,email,password}=req.body;
        const existingUser=await userModel.findOne({email});
        if(existingUser){
            res.status(200).json({"msg":"Eamil Already Register"})
        }else{
            bcrypt.hash(password,5,async(err,hash)=>{
                if(err){
                    res.status(400).json({error:err})
                }else{
                    const user=new userModel({name,email,password:hash});
                    await user.save()
                    res.status(200).json({"msg":"The new user has been registered","registeredUser":req.body})
                }
            })
        }
    } catch (err) {
        res.status(400).json({error:err})
    }
})

UserRouter.post("/login",async(req,res)=>{
    try {
        const {email,password}=req.body;
        const user=await userModel.findOne({email});
        bcrypt.compare(password,user.password,(err,decode)=>{
            if(decode){
                const token=jwt.sign({course:"backend"},"masai",{expiresIn:"7d"});
                res.status(200).json({"msg":"Login successful!",token})
            }else{
                res.status(400).json({error:err})
            }
        });
    } catch (err) {
        res.status(400).json({error:err})
    }
})

UserRouter.get("/logout", async(req,res)=>{
    try {
        const token=req.headers.authorization.split(" ")[1];
        blockList.push(token)
        res.status(200).json({"msg":"User has been logged out"})
    } catch (err) {
        res.status(400).json({error:err})
    }
})

module.exports={
    UserRouter
}