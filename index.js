import express from 'express'
import bodyParser from 'body-parser'
import mongoose from 'mongoose';
import Student from './models/studentModel.js';
import studentRouter from './routes/studentRoute.js';
import userRouter from './routes/userRouter.js';
import productRouter from './routes/productRouter.js';
import jwt from "jsonwebtoken";
import dotenv from 'dotenv';
import reviewRouter from './routes/reviewRouter.js';

dotenv.config();

const app=express();


app.use(bodyParser.json());

//middleware to create token 
app.use((req,res,next)=>{
    let token = req.header("Authorization");
    if (token!=null){
        token=token.replace("Bearer ","");
        jwt.verify(token,process.env.JWT_SECRET,(err,decoded)=>{
            if(!err){
                req.user=decoded           
                        
                
            }
        })
       
        next()
    }
    
    
})

let mongoUrl=process.env.MONGO_URL;

mongoose.connect(mongoUrl)
let connction=mongoose.connection
connction.once("open",()=>{
    console.log("Connection open");
    
})


app.listen(3000,()=>{console.log("Port 3000 used");
})


//app.use("/students",studentRouter)
app.use("/api/users",userRouter)
app.use("/api/products",productRouter)
app.use("/api/review",reviewRouter)