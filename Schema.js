const mongoose = require("mongoose");
const bcrypt =require('bcrypt')
const jwtt=require('jsonwebtoken')

const JWT=new mongoose.Schema(
    {
        email:
        {
            type:String,
            require:true,
            unique:true
        },
        password:
        {
            type:String,
            require:true
        },
        token:
        {
            type:String
        }
     

    }
);
JWT.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
  };


JWT.pre("save", async function (next) {
    if (!this.isModified("password")) {
      next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    this.token=jwtt.sign({ _id: this._id },"eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ", {
      expiresIn: "30d",});
  });

// JWT.methods.generateToken=async function()
// {
//   try
//   {
//     let token =jwtt.sign({ _id: this._id },"eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ", {
//       expiresIn: "30d",})
    
//      await this.save();
//      return token;
//   }
//   catch(err)
//   {
//     console.log(err);

//   }
  
//}




module.exports =mongoose.model('jwt',JWT);