const mongoose=require("mongoose")

const userschema=mongoose.Schema({
    name:String,
    email:String,
    password:String,
    img:String
})

const usermodel=mongoose.model("user",userschema)


module.exports={
    usermodel
}