const mongoose=require("mongoose")

const userschema=mongoose.Schema({
    name:String,
    email:String,
    password:String
})

const usermodule=mongoose.model("user",userschema)


module.exports={
    usermodule
}