import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate,Link } from "react-router-dom"
import './From.css'



function Login(){
   const history=useNavigate()
    const [email,setEmail]=useState('')
    const [password,setPassword]=useState('')
   
   
       

 
     

    async function submit(e){
        e.preventDefault();
        try
        {
      
             await axios.post("http://localhost:3000/logIn",{
                email,password
            }).then(res=>
                {
               if(res.data==="enter valid Details")
                  {
                    alert("enter valid Details");
                  }
           
                else if(res.data!=="Acoount not found")
                {
                    if(res.data!=="wrong password")
                    {
    
                        alert("LogIn successfull")
                        
                        history('/home')
                    }
                    else if(res.data==="wrong password")
                    {
                        alert("wrong password");
                    }

                }
               
            })
        }    
        
        catch(err)
        {
            alert("Enter valid email  password")

        }

    
       
    }

  return (
    <div className='login'>
        <h1>Welcome</h1>
        <form >
          <h1>Login</h1>


    <input type="email" onChange={(e) => { setEmail(e.target.value) }} placeholder="Email"  /><br></br>
    <input type="password" onChange={(e) => { setPassword(e.target.value) }} placeholder="Password"  /><br></br>
    <input type="submit" onClick={submit} />



<br />
<p>OR</p>
<br />

<button>  <Link to="/signup" >Signup Page</Link></button>

</form>
    </div>
  )
}

export default Login
