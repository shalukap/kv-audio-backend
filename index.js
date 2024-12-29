import express from 'express'
import bodyParser from 'body-parser'
import mongoose from 'mongoose';
import Student from './models/studentModel.js';
import studentRouter from './routes/studentRoute.js';
import userRouter from './routes/userRouter.js';
import productRouter from './routes/productRouter.js';
import jwt from "jsonwebtoken";


const app=express();
app.use(bodyParser.json());
//middleware to create token 
app.use((req,res,next)=>{
    let token = req.header("Authorization");
    if (token!=null){
        token=token.replace("Bearer ","");
        jwt.verify(token,"KV-secret-15L",(err,decoded)=>{
            if(!err){
                req.user=decoded         
                
            }
        })
       
       
    }
    next()
    
})

let mongoUrl="mongodb+srv://shaluka:Xt20Ay91@aimscluster.09fla.mongodb.net/MERN?retryWrites=true&w=majority&appName=AIMSCluster"

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