

import React, { Component } from "react"; 
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Axios from 'axios';
import { useState, useEffect } from "react";
import { Typography } from "@mui/material";
import Login from "./login";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
function Register(email){
  useEffect(() => {
    document.title="Register page";
  })
  const [useremail, setuseremail] = useState("");
  const [username, setusername] = useState("");
  // const [usermobile, setusermobile] = useState("");
  const [userpassword, setuserpassword] = useState("");
  const [userpassword2, setuserpassword2] = useState("");
  const [status, setstatus] = useState("");
  const [login, setlogin] = useState("");
  const [color, setcolor] = useState("");
  const token = useSelector(state => state.auth);
  useEffect(() => {
    if(token){
      window.location.replace("/profile");
    }
  });

  const onSubmit=()=>{
    console.log("Register Clicked");
    Axios.post('http://localhost:3500/api/users/register',{
      name:username,
      email:useremail,
      // mobile:usermobile,
      password:userpassword,
      password2:userpassword2,
    }).then(response=>{
      // console.log(response.data)
      if(response.data.emailalreadyexist)
      {
        console.log("Email already exist");
        setstatus("Email id Already exist, Login with your credentials below");
        setcolor("red");
        setlogin("true");
        // setsignupStatus("Registration Successful");
      }
  
    else if(response.data.email=="Email field is required"){
      setstatus("Email field is required")
      setcolor("red");
    }
    else if(response.data.email=="Email is invalid"){
      setstatus("Email is Invalid, please Enter a Valid One")
      setcolor("red");
    }
    else if(response.data.password=="Password must be at least 6 characters"){
      console.log("Password must be at least 6 characters");
      setcolor("red");
      setstatus("Password must be at least 6 characters");
    }
    else if(response.data.password2=="Passwords must match"){
      setstatus("Passwords must match");
      setcolor("red");
    }
    else{
      console.log(`Registration Successful ${response.data.name}`);
      setstatus(`Thankyou for Registering with us, ${response.data.name}, You can login with your Credentials`)
      // setcolor("blue")
      // setlogin("true");
      window.location.replace("/login");
    }

    })
    .catch((errors)=>{
      setstatus(errors.email);
    })
  }


  
    return (
     <div>
        
    
    <div className="form" style={{color:'Blue', paddingTop:'4rem'}}>
<h2>
  Register
</h2>
<TextField id="name" style={{marginTop:'2rem'}} label="Enter your name" variant="outlined" onChange={(n)=>{setusername(n.target.value)}}  />
      <TextField id="email" style={{marginTop:'2rem'}} label="Enter Email" variant="outlined" onChange={(e)=>{setuseremail(e.target.value)}} />
      
      {/* <TextField id="Mobile Number" style={{marginTop:'2rem'}} label="Enter Mobile Number" variant="outlined" onChange={(m)=>{setusermobile(m.target.value)}} /> */}
      <TextField id="password" type="password" style={{marginTop:'2rem'}} label="Enter Password" variant="outlined" onChange={(p)=>{setuserpassword(p.target.value)}} />

      <TextField id="password2" type="password" style={{marginTop:'2rem'}} label="Enter Password Again" variant="outlined" onChange={(p2)=>{setuserpassword2(p2.target.value)}} />
      <Button variant="contained" style={{marginTop:'2rem'}} onClick={()=>onSubmit()} > SignUp</Button>
      <Typography style={{color:`${color}`, paddingTop:'1rem'}}>{status}</Typography>
      <Typography style={{color:'grey', paddingTop:'1rem'}}>Already Registered?<Link to="/login" style={{textDecoration:'none'}}> Login here</Link></Typography>
      
 
</div>
{login
?
  <>
  <Link to="/login" style={{textDecoration:'none', paddingTop:'1rem'}} className="form"><Button variant="contained" color="error">Sign In</Button></Link>
  
  </>
  : ""
}


     </div>
    );
  }


export default Register;