import React, { useState } from 'react'
import axios from 'axios'
import {  Link, useNavigate } from "react-router-dom"
import './From.css'

function Signup() {
   const history=useNavigate();

    const [email,setEmail]=useState('')
    const [password,setPassword]=useState('')

    async function submit(e){
        e.preventDefault();
      

        try{

             await axios.post("http://localhost:3000/signUp",{
                email,password
            }).then(res=>
                {
                    try
                    {
                        if(res.data==="enter valid Details")
                        {
                          alert("enter valid email and password with minimum 6 digits");
                        }

                        else if(res.data!=="User already exists")
                        {
                            if(res.data!=="Enter password")
                            {
                                alert("singUp suceess full");
                                history('/home')
                            }
                            else{
                                alert("Enter Valid Details")
                            }

                        }
                        else
                        {
                            alert("User already exists");
                        }
                      

                    }
                    catch(err)
                    {
                        console.log(err.message)

                      
                    }
                })
            
           

         }
        catch(e){
            console.log(e);

        }
    }





  return (
    <div className="login">
        <h1>Welcome</h1>
         <form >

            <h1>Signup</h1>

           
                <input type="email" onChange={(e) => { setEmail(e.target.value) }} placeholder="Email"  />
                <input type="password" onChange={(e) => { setPassword(e.target.value) }} placeholder="Password" />
                <input type="submit" onClick={submit} />

         

            <br />
            <p>OR</p>
            <br />

            <button>  <Link to="/" >Login Page</Link></button>
            </form>

        </div>
  )
}

export default Signup
