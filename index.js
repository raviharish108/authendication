import express from "express";
import {MongoClient} from "mongodb";
import {registerrouter} from "./userRouter.js"
import cors from "cors"
import * as dotenv from "dotenv";
dotenv.config();
// const url="mongodb://127.0.0.1:27017";
const mongo_url= process.env.URL;
const port= process.env.PORT;
const app=express();
app.use(express.json());
app.use(cors());
//......................... for mongo db connection
async function createConnection(){
    const client=new MongoClient(mongo_url);
    await client.connect();
    console.log("mongo is connected👍👍👍");
    return client;
}
//......................

//..........................
         
export const client= await createConnection();
//...................
app.use("/api",registerrouter);

   app.listen(port,()=>{
    console.log("port is connected");
})