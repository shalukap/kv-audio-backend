import Review from "../models/review.js";

export function addReview(req,res){
    
    
    if(req.user==null){
        res.status(401).json({
            msg:"Please login and try again"
        })
        return
    }

    const data=req.body;    
    

    data.name= req.user.firstName+" "+req.user.lastName;
    data.profilePicture=req.user.profilePicture;
    data.email=req.user.email;

    const newReview=new Review(data)
    
    newReview.save().then(()=>{
        res.json({msg:'Reviewd Saved Succesfully'})
    }).catch((error)=>{
        res.status(501).json({error:error})
    })
}

export function getReview(req,res){
    const user=req.user;
    if (user==null||user.role !="Admin"){
        Review.find({isApproved:true}).then((reviews)=>{
            res.json(reviews)
        })
        return
    }
    if (user.role=="Admin"){
        Review.find().then((reviews)=>{
            res.json(reviews)
        })
    }
}

export function deleteReview(req,res){
    const email=req.user.email;
    
    

    if(req.user==null){
        res.status(401).json({msg:'Please login and try again'})
        return
    }
    if(req.user.role=="Admin"){
        Review.deleteOne({email:email}).then(()=>{
            res.json({msg:'Review Delete succesfully'})
        }).catch(()=>{
            res.json({error:'Review delete failed'})
        })
        return;
    }
    if (req.user.role=='Customer'){
        if(req.user.email==email){
            review.deleteOne({email:email}).then(()=>{
                res.json({msg:'Review delete suceesfully'})
            }).catch(()=>{
                res.json({msg:"Review deletion failed"})
            })
        }else{
            res.json({msg:'You are not authorized to perform this action'})
        }
    }

}

export function approveReview(req,res){
    const email=req.user.email

    if (req.user==null){
        res.status(401).json({msg:'Please login and try again'})
    }

    if (req.user.role=='Admin'){
        Review.updateOne(
            {email:email},{isApproved:true}
        ).then(()=>{
            res.json({msg:'Review approved succesfully'})
        }).catch(()=>{
            res.status(500).json({msg:'Review approval failed'})
        })
    }else{
        res.json({msg:'Only admins allows to approve reviews'})
    }

}

