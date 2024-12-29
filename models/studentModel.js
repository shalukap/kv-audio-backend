import mongoose from "mongoose";

const studentSchema=new mongoose.Schema({         //Create Schema(structure of the datatable)
    name:String,
    age:Number,
    height:Number
})  
const Student=mongoose.model("students",studentSchema)// collection name(Table Name),schema name


export default Student