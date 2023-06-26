const mongoose=require("mongoose")

const Data= new mongoose.Schema(
    {

    email:{
        type:String,
        required:true,
        default:""
    },
    password:{
        type:String,
        require:true,
        default:""
    },
    token:
    {
        type:String,
       
    }
})
module.exports=mongoose.model("Data",Data);