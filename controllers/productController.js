import Product from "../models/product.js";


export function addProduct(req,res){   
    
   if (req.user==null){
        res.status(401).json({
            msg:"Please login and try again"
        })
        return
    }

    if (req.user.role!="Admin"){
        res.status(403).json({
            msg:"You are not authorize to insert data"
        })
        return
    }
    
    
    const data=req.body      
    const newProduct=new Product(data)
    newProduct.save().then(()=>{
        res.json({msg:"Product Saved succesfully"})
    }).catch((error)=>{
        res.status(500).json({error:error})
    })
}