const express=require("express")
const bcrypt=require("bcrypt")
const jwt=require("jsonwebtoken")
const { usermodel } = require("../Models/user.model")
const { auth } = require("../Middleware/auth.middleware")

const userroute=express.Router()

userroute.get("/",async(req,res)=>{
   
    try{
        const data=await usermodel.find()
        res.status(200).json({msg:data})
    }
    catch(err){
        res.status(400).json({error:err.message})
    }
})

userroute.post("/register",async(req,res)=>{
    let {name,email,password}=req.body
    if(/\d/.test(password) && /[A-Z]/.test(password) && /[!@#$%^&*]/.test(password) && password.length >= 8){
        const data=await usermodel.findOne({email})
        if(data){
            res.status(400).json({ error: "This Account has already been registered" })
        }
        else{
            try{
                bcrypt.hash(password,5,async(err,hash)=>{
                    if(err){
                        res.status(400).json({error:err})
                    }
                    else{
                        const user = new usermodel({ name, email,password: hash ,img:"https://th.bing.com/th/id/R.dfd2117bffea3a4aee801514fc559ec9?rik=REcysG6pdXunig&riu=http%3a%2f%2fvardaanmedicalcenter.com%2fimages%2fcontent%2fuser-img.png&ehk=3xmzA5FfQhDypR3AQjnGCHvVocIt83G5KFEA6pKZDH4%3d&risl=&pid=ImgRaw&r=0"})
                        await user.save()
                        
                        res.status(200).json({ msg: "The new user has been registered", registeredUser: user })
                    }
                })
            }
            catch(err){
                res.status(400).json({error:err})
            }
        }
    }
    else {
        res.status(400).json({ error: "Password should contain atleast one numeric value, special character, uppercase letter and the length should be of 8 or long" })
    }
})


userroute.post("/login", async(req, res) =>{
    const {email,password}=req.body
    try{
        const user=await usermodel.findOne({email})
        console.log(user)
        if(user){
            bcrypt.compare(password,user.password, (err,result)=>{
                if(result){
                    var token=jwt.sign({course:"backend",email:user.email},"payal")
                    res.status(200).json({msg:"Login successfull!",token:token,data:user})
                }
                else{
                    res.status(400).json({error:"Wrong Credential"})
                }
            })
        }
        else{
            res.status(400).json({error:"User not found"})
        }
    }
    catch(err){
        res.status(400).json({ error: err.message })
    }
})



userroute.patch("/update/:id",auth,async(req,res)=>{
    const id=req.params.id
    
    try{
        await usermodel.findByIdAndUpdate({_id:id},req.body)
        const datawant=await usermodel.find()
        res.status(200).json({msg:"Coin data has been updated",datawant})
    }
    catch(err){
        res.status(400).json({error:err.message})
    }

})





module.exports={
    userroute
}