import express from 'express'
import { loginUser, registerUser } from '../controllers/userController.js'

const userRouter=express.Router()


userRouter.post("/",registerUser)
userRouter.get("/login",loginUser)


export default userRouter