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
import { useSelector } from "react-redux";
import { useCallback } from "react";
import Appbar from "../appbar";
import { SettingsInputCompositeSharp } from "@material-ui/icons";
import login from '../../actions/auth';
function ForgotPassword(){
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
    else{
      document.title="Forgot Password"
    }
  });
  const onSubmit=()=>{
    // console.log("Login clicked");
    Axios.post('http://localhost:5000/api/users/reset-password',{
      email:useremail,
    }).then(response=>{
    //   console.log(response.data)
    if(response.data.message){
    setloginStatus(response.data.message);
    }
    else if(response.data.error){
        console.log(response.data.error);
        setloginStatus(response.data.error)
    }
      
    })
    .catch((errors)=>{
      setloginStatus("Error");
      // setcolor("red");
    })
  }


  
    return (
     <div>
        
    {loginform
    ?

    <div className="form" style={{color:'Blue', paddingTop:'4rem'}}>
<h2>
  Forgot Password
</h2>

 <TextField id="email" style={{marginTop:'2rem'}} label="Enter Email" variant="outlined" onChange={(e)=>{setuseremail(e.target.value)}} />
 

 


 <Button variant="contained" style={{marginTop:'2rem'}} type="submit"  onClick={()=>onSubmit()}> Get Reset Link</Button>
 {/* <Typography style={{paddingTop:'2rem', color:'grey'}}> Forgot Password?? <Link to="/forgot" style={{textDecoration:'none'}}> Click Here</Link></Typography>

 <Typography style={{paddingTop:'2rem', color:'grey'}}> New to Website??,<Link to="/register" style={{textDecoration:'none'}}> Sign up here </Link></Typography> */}
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


export default ForgotPassword;