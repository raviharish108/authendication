import express, { response } from "express"
import bcrypt from "bcrypt"
import {client} from "./index.js"
import {auth} from "./middleware/auth.js"
import jwt from "jsonwebtoken"
const router=express.Router();
 
router.get("/register", (req,res)=>{
    res.send("hii this is from register")
})




router.post("/register",async(req,res)=>{

        const {username,password}=req.body;
        const useform=await client.db("mongodb").collection("authendication").findOne({username:username});
       if(useform){
        res.status(400).send("username already exist");
         }
         else if(password.length<6){
            res.send("password must be atleast above 7 char")
         }
          else{
         
          var hash=await bcrypt.hash(password,10);
         const result=await client.db("mongodb").collection("authendication").insertOne({username:username,password:hash});
         console.log(hash);
           res.json(result);
          }
});

router.post("/login",async(req,res)=>{
    try{
    const {username,password}=req.body;
    let userformdb=await client.db("mongodb").collection("authendication").findOne({username:username});
    if(!userformdb){
        res.status(401).send("invalid username and passworsd")
    }else{
        // const ispasswordmatch=await bcrypt.compare(req.body.password,storedpassword);
        const ispasswordmatch=await bcrypt.compare(password,userformdb.password);
        console.log(ispasswordmatch);
        if(ispasswordmatch){
            var userToken=jwt.sign({id:userformdb._id},process.env.secretkey)
            res.header("auth",userToken).json(userToken);
        }
        else{
            res.send("password wrong")
        }
    }
}
catch(err){
res.status(400).json(err);
}
})
export const registerrouter=router;