import mongoose from "mongoose";

const ProductSchema=new mongoose.Schema({
    key:{
        type:String,
        required:true,
        unique:true
    },
    name:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    catogory:{
        type:String,
        required:true,
        default:"Uncatogory"
    },
    dimentions:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    availability:{
        type:Boolean,
        required:true,
        default:true
    }
})

const Product=mongoose.model("Product",ProductSchema)

export default Product