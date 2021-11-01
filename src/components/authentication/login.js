import React, { Component } from "react"; 
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Axios from 'axios';
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Typography } from "@mui/material";
import Register from "./register";
import { Link } from "react-router-dom";
import Posts from '../posts/posts';
import {GoogleLogin} from 'react-google-login';
import { useSelector } from "react-redux";
import { useCallback } from "react";
import Appbar from "../appbar";
import { SettingsInputCompositeSharp } from "@material-ui/icons";
import login from '../../actions/auth';
function Login(){
  useEffect(() => {
    document.title="Login Page";
  })
 
  // state management
  const [loginStatus, setloginStatus] = useState("");
  const [useremail, setuseremail] = useState("");
  const [userpassword, setUserpassword] = useState("");
  const [registerbutton, setregisterbutton] = useState(false);
  const [loginform, setloginform] = useState(true);
  const [posts, setposts] = useState(false);
  const token = useSelector(state => state.auth);
  const dispatch=useDispatch()
  useEffect(() => {
    if(token){
      window.location.replace("/profile");
    }
  });
  const onSubmit=()=>{
   
    console.log("Login clicked");
    Axios.post('http://localhost:3500/api/users/login',{
      email:useremail,
      password:userpassword,
    }).then(response=>{
      console.log(response.data)
      if(response.data.success)
      {
        // console.log("Login Successful");
        dispatch(login);
        setloginStatus("Welcome to The app");
        setloginform(false);
        localStorage.setItem('token',response.data.token);
        window.location.replace("/profile");
        // setposts(true);
       
        // this.props.parentcallback(true)
        // setcolor("green");
      }
      else if(response.data.email){
        // console.log("email got");
        setloginStatus("Email Id is Invalid");
      }
      else if(response.data.emailnotfound){
        console.log("email not found");
        setloginStatus("Email id is not registered, Register below");
        setregisterbutton("true");
      }
      else if(response.data.password){
        setloginStatus("Password is Required")
      }
      else if(response.data.passwordincorrect){
        console.log("password incorrect");
        setloginStatus("Password is Incorrect")
      }
      
    })
    .catch((errors)=>{
      setloginStatus("Error");
      // setcolor("red");
    })
  }
  const client="9901719520-hg3m9k4nm91o7t6f5gd6innkrvhjdqdk.apps.googleusercontent.com";

    return (
     <div>
        
    {loginform
    ?

    <div className="form" style={{color:'Blue', paddingTop:'4rem'}}>
<h2>
  Login
</h2>

 <TextField id="email" style={{marginTop:'2rem'}} label="Enter Email" variant="outlined" onChange={(e)=>{setuseremail(e.target.value)}} />
 

 <TextField id="password" type="password" style={{marginTop:'2rem'}} label="Enter Password" variant="outlined" onChange={(f)=>{setUserpassword(f.target.value)}} />


 <Button variant="contained" style={{marginTop:'2rem'}} type="submit"  onClick={()=>onSubmit()}> Sign In</Button>
 
 <Typography style={{paddingTop:'2rem', color:'grey'}}> Forgot Password?? <Link to="/forgot" style={{textDecoration:'none'}}> Click Here</Link></Typography>

 <Typography style={{paddingTop:'2rem', color:'grey'}}> New to Website??,<Link to="/register" style={{textDecoration:'none'}}> Sign up here </Link></Typography>
 {/* <Link to="/register" style={{textDecoration:'none'}}><Button variant="contained" style={{marginTop:'1rem'}} >Register</Button></Link> */}
 <Typography style={{color:'red'}}>{loginStatus}</Typography>
</div>

  : ""  }

{registerbutton 
? <>

<Link to="/register" style={{textDecoration:'none'}} className="form"><Button variant="contained" color="error" style={{marginTop:'1rem'}} >Register</Button></Link>
</>
: 
""

}
{posts
? <>
<Posts/>

</>
: ""
}
     </div>
    );
  }


export default Login;