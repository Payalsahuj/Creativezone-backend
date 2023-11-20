const jwt=require("jsonwebtoken")

const auth=(req,res,next)=>{
    const token=req.headers.authorization?.split(" ")[1]

    if(token){
        
        try{
            jwt.verify(token,"payal",(err,decoded)=>{
                if(decoded){
                    req.body.email=decoded.email
                    next()
                }
                else{
                    res.status(200).json({msg:'Token is not valide'})
                }
            })
        }
        catch(err){
            res.status(400).json({error:err.message})
        }
    }
    else{
        res.json({msg:'Token needs to be require may be you have to login again'})
    }
}

module.exports={
    auth
}