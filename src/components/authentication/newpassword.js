import React, { Component } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Axios from "axios";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Typography } from "@mui/material";
import Register from "./register";
import { Link, useParams } from "react-router-dom";
import Posts from "../posts/posts";
import { useSelector } from "react-redux";
import { useCallback } from "react";
import Appbar from "../appbar";
import { SettingsInputCompositeSharp } from "@material-ui/icons";
import login from "../../actions/auth";
function Login() {
  useEffect(() => {
    document.title = "Login Page";
  });

  // state management
  const [loginStatus, setloginStatus] = useState("");
  const [useremail, setuseremail] = useState("");
  const [userpassword, setUserpassword] = useState("");
  const { token } = useParams();
  // console.log(token);
  const [registerbutton, setregisterbutton] = useState(false);
  const [loginform, setloginform] = useState(true);
  const [posts, setposts] = useState(false);
  const authtoken = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  useEffect(() => {
    if (authtoken) {
      window.location.replace("/profile");
    } else {
      document.title = "Reset you password";
    }
  });
  const onSubmit = () => {
    // console.log("Login clicked");
    Axios.post("http://localhost:3500/api/users/updatepassword", {
      password: userpassword,
      token,
    })
      .then((response) => {
        if (response.data.error) {
          console.log("error");
          setloginStatus(response.data.error);
        } else if (response.data.message) {
          console.log("Message");
          setloginStatus(response.data.message);
          window.location.replace("/login");
        }
        if (response.data.success) {
          // setposts(true);
          // this.props.parentcallback(true)
          // setcolor("green");
        }
      })
      .catch((errors) => {
        setloginStatus("Error");
        // setcolor("red");
      });
  };

  return (
    <div>
      {loginform ? (
        <div className="form" style={{ color: "Blue", paddingTop: "4rem" }}>
          <h2>Enter New password</h2>

          <TextField
            id="password"
            type="password"
            style={{ marginTop: "2rem" }}
            label="Enter Password"
            variant="outlined"
            onChange={(f) => {
              setUserpassword(f.target.value);
            }}
          />

          <Button
            variant="contained"
            style={{ marginTop: "2rem" }}
            type="submit"
            onClick={() => onSubmit()}
          >
            {" "}
            Update Password
          </Button>
          {/* <Typography style={{paddingTop:'2rem', color:'grey'}}> Forgot Password?? <Link to="/forgot" style={{textDecoration:'none'}}> Click Here</Link></Typography>

 <Typography style={{paddingTop:'2rem', color:'grey'}}> New to Website??,<Link to="/register" style={{textDecoration:'none'}}> Sign up here </Link></Typography> */}
          {/* <Link to="/register" style={{textDecoration:'none'}}><Button variant="contained" style={{marginTop:'1rem'}} >Register</Button></Link> */}
          <Typography style={{ color: "red" }}>{loginStatus}</Typography>
        </div>
      ) : (
        ""
      )}

      {registerbutton ? (
        <>
          <Link
            to="/register"
            style={{ textDecoration: "none" }}
            className="form"
          >
            <Button
              variant="contained"
              color="error"
              style={{ marginTop: "1rem" }}
            >
              Register
            </Button>
          </Link>
        </>
      ) : (
        ""
      )}
      {posts ? (
        <>
          <Posts />
        </>
      ) : (
        ""
      )}
    </div>
  );
}

export default Login;
