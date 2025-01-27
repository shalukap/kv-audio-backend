import User from "../models/userModel.js";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv';


dotenv.config();
export function registerUser(req,res){

    const data=req.body

    data.password=bcrypt.hashSync(data.password,16)
    const newUser=new User(data)
    newUser.save().then(()=>{
        res.json({
            msg:"User Registed"
        })
    }).catch((error)=>{ 
        res.status(500).json({
            error:"User Registration error"
        })
    })
}

export function loginUser(req,res){
    const data=req.body;
    console.log(data);
    
    User.findOne({
        email:data.email
    }).then((user)=>{
        if(user===null){
            res.status(404).json({error:'user not found'})
        }else{
            //res.json({msg:"user Found",user:user})
            const isPasswordCorrect=bcrypt.compareSync(data.password,user.password)
            if(isPasswordCorrect){
                const token=jwt.sign({
                    firstname:user.firstName,
                    lastname:user.lastName,
                    email:user.email,
                    role:user.role,
                    profilePicture:user.profilePicture
                },process.env.JWT_SECRET)//password to given by developer to encrypt  
                res.json({msg:"Login succesful",token:token})
            }else{
                res.status(404).json({error:"Login Failed"})
            }
        }
    })
}