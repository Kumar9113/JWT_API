const express=require('express')
const app=express();
app.use(express.json());
const cors = require("cors")
//const jwtt =require("jsonwebtoken")
app.use(cors())
const jwt=require('./Schema')
const { check, validationResult } = require("express-validator");

const mongoose=require('mongoose')
const { MongoClient, ServerApiVersion } = require('mongodb');

mongoose.connect('mongodb+srv://Kumar:Kumar%409113@cluster0.bprqnop.mongodb.net/?retryWrites=true&w=majority',
{useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1} 
).then(()=>
{
    console.log('db connecct')
}).catch(err=>console.log(err))

app.get("/",cors(),(req,res)=>{

})




// const generateToken = (id) => {
//   return jwtt.sign({ id },"eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ", {
//     expiresIn: "30d",
//   });
// };


app.post("/logIn",[
  check("email", "Please input a valid email")
      .isEmail(),
  check("password", "Please input a password with a min length of 6")
      .isLength({min: 6})
], async(req,res)=>
{
    
    const { email, password } = req.body;
    const errors=validationResult(req);
    if(!errors.isEmpty()){
      return res.json("enter valid Details");
  }

    const user = await jwt.findOne({ email });

    
  try{
    if (user && (await user.matchPassword(password))) {
      res.send({
        _id: user._id,
       
        email: user.email,
        password:user.password,
        token:user.token

        
        
      });
    }
    else if (user.email===email && !await user.matchPassword(password)) 
     {
      
      res.send("wrong password");
      
    }

  }
  catch(err)
  {
    res.status(404).json("Acoount not found")

  }
    

})





app.post("/signUp",[
  check("email", "Please input a valid email")
      .isEmail(),
  check("password", "Please input a password with a min length of 6")
      .isLength({min: 6})
],async(req,res)=>
{
    const{email,password}=req.body;
    const errors=validationResult(req);
    if(!errors.isEmpty()){
      return res.json("enter valid Details");
  }

    const userExists=await jwt.findOne({email})

    if (userExists) {
        console.log("exits");
        
       
        return res.send("User already exists");
      }
      if(password==="" || email==='')
      {
        console.log("enter password");
        return res.send("Enter password")
      }
      const user = await jwt.create({
       
        email,
        password,
       
      });
      if(password==="")
      {
        console.log("enter password");
      }
      


      if (user ) {
        res.json({
          _id: user._id,
          email: user.email,
          password:user.password,
        token:user.token,
        });
      
      }
      
      
      else {
        res.send("error");
      }
    });

    

app.get('/adddata',(req,res)=>
{
  const {username}=req.body;
  res.send(username);

})



app.listen(3000,()=>
{
    console.log("Server start")
})