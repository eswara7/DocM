import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
//import dotenv from "dotenv/config";
import { docRouter } from "./routers/docRouter.js";
import { userRouter } from "./routers/userRouter.js";
import cors from "cors";
import { AIrouter } from "./routers/AIrouter.js";

dotenv.config();
const app = express();
const port = 3000;
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended:true}))
try {
    mongoose.connect(process.env.MONGO_URI).then(()=>app.listen(port)).then(()=>{
        console.log(`database connected and server running at ${port}`)
    }).catch((err)=>console.log(`something wrong with database ${err}`))
} catch (error) {
    console.log(error)
}
app.use("/api/v1/user",userRouter)
app.use("/api/v1/docs",docRouter)
app.use("/api/v1/ai",AIrouter)

app.use((err,req,res,next)=>{
    console.log(err);
    return res.status(500).json({message:"internel server issue"})
})