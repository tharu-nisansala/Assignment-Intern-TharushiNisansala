const mongoose=require('mongoose')

const adminSchema=new mongoose.Schema({
    username:String,
    password:String
})

const adminModel=mongoose.model("admin",adminSchema)
module.exports=adminModel