import Student from "../models/studentModel.js"

export function getStudents(req,res){
    Student.find().then((result)=>{
        res.json(result)
    })
}

export function postStudents(req,res){
    let studentData=req.body

    let student=new Student(studentData)

    student.save().then(()=>{
        res.json({
            msg:"Student saved"
        })
    }).catch(()=>{
       res.json({
        msg:"ERROR in saving data"
       })
    })
}