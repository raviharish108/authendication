import { response } from "express";
import jwt from "jsonwebtoken"
export const auth=(req,res,next)=>{
    try{
        const token=req.header("token");
        jwt.verify(token,process.env.secretkey)
        console.log(token);
        next();
    }
    catch(err){
        res.status(401).send({error:err.message})
    }
   
}