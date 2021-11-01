import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import memory from '../images/memories.png';
import { MenuItem } from '@mui/material';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import AccountCircle from '@mui/icons-material/AccountCircle';
import Menu from '@mui/material/Menu';
import Avatar from '@mui/material/Avatar';
import Posts from './posts/posts';
import jwt_decode from 'jwt-decode';
import { deepOrange, deepPurple } from '@mui/material/colors';
import Form from './forms/form';
import {Link} from 'react-router-dom';
import { useState} from 'react';
import Login from './authentication/login';
import {useSelector} from "react-redux";
import login from './../actions/auth';
import { useEffect } from 'react';
import { LocalDiningOutlined, SettingsBackupRestoreRounded } from '@material-ui/icons';
export default function Appbar() {
  
  const [currentId, setCurrentId] =useState(null); 
    const [auth, setAuth] = React.useState(true);
    const [showPost, setShowPost] = React.useState(false);
    const [showNewPost, setShowNewPost] = React.useState(false);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [newposttitle, setnewposttitle] = useState("Add new Post");
    const [postTitle, setpostTitle] = useState("Show All Post");
    const [loginform, setloginform] = useState(false);
    const [logintitle, setlogintitle] = useState("Login");
    const [appbar, setappbar] = useState(false);
   const [name, setname] = useState("");
    // const loginform=(true)
    var token = useSelector((state) => state.auth);
    useEffect(() => {

      // var decoded=jwt_decode(token);
      // var name=decoded.name;
      if(token){
       
        var decoded=jwt_decode(token);
        setname(decoded.name);
     
        setlogintitle("Logout");
        setappbar(true); 
        // setloginform(false);
        // console.log("already logged in");
       
      }
      else{
        console.log("loggout");
        setappbar(false);
        // localStorage.removeItem('token');
        setlogintitle("Login");
        // setloginform(true);
        // setloginform(true);
        // loginfunction();
       
        
      }
    });
    const handleMenu = (event) => {
      setAnchorEl(event.currentTarget);
    };
  
    const handleClose = () => {
      setAnchorEl(null);
    };
    const handleCloselogin = () => {
      setAnchorEl(null);    
      if(token){
        localStorage.removeItem('token');
        window.location.replace("/login");
      } 
      else{
        setloginform(true)
        
      }
    };
    const handleClosenewpost = () => {
      setAnchorEl(null);
      if(showNewPost){
        setnewposttitle("Add new Post");
        setShowNewPost(false);
      }
      else{
      setShowNewPost(true);
      setnewposttitle("Hide Add new Post");
    }
    };
    const handleClosepost = () => {
      setAnchorEl(null);
      if(showPost)
      {
        setpostTitle("Show All posts");
      setShowPost(false);
      
      }
      else{
        setShowPost(true);
        setpostTitle("Hide All Posts");
      
      }
    };
    return (
    //     <Box sx={{ flexGrow: 1 }}>
    //   <AppBar position="static">
    //     <Toolbar>
    //       <IconButton
    //         size="large"
    //         edge="start"
    //         color="inherit"
    //         aria-label="menu"
    //         sx={{ mr: 2 }}
    //       >
    //         <MenuIcon />
    //       </IconButton>
    //       <img src={memory} style={{width:'25px', height:'25px'}}/>
    //       <Typography variant="h6" component="div" sx={{ flexGrow: 1 }} style={{color:'white'}}>
    //       <Link to="/" style={{textDecoration:'none'}}>
    //         Memories</Link>
    //       </Typography>
    //      <Link to="/test" style={{textDecoration:'none'}}> <Button color="inherit" style={{marginRight:'1rem', color:'white'}}>Add new post</Button></Link>
    //      <Link to="/login" style={{textDecoration:'none'}}> <Button color="inherit" style={{marginRight:'1rem', color:'white'}}>Login</Button></Link>
    //       {/* <Button color="inherit" >Login</Button> */}
           
    //     </Toolbar>
    //   </AppBar>
    //   {/* <Posts/> */}
    //   {/* <Form/> */}
     
    // </Box>
    <Box sx={{ flexGrow: 1 }}>
    <FormGroup>
      {/* <FormControlLabel
        control={
          <Switch
            checked={auth}
            onChange={handleChange}
            aria-label="login switch"
          />
        }
        label={auth ? 'Logout' : 'Login'}
      /> */}
    </FormGroup>
    <AppBar position="static">
      <Toolbar>
        <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={{ mr: 2 }}
        >
          <MenuIcon />
        </IconButton>
        
        {/* <img src={memory} style={{width:'25px', height:'25px'}}/> */}
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }} style={{color:'white'}}>
          <Link to="/allproducts" style={{textDecoration:'none', color:'white'}}>
           Kart App</Link>
          </Typography>
        {auth && (
          <div>
          
            {appbar
            ? <> 
             <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleMenu}
              color="inherit"
            >
             <Avatar sx={{ bgcolor: deepOrange[500] }}>{name.charAt(0)}</Avatar>
            </IconButton>
            <Menu
            id="menu-appbar"
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            keepMounted
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <Link to="/profile" style={{textDecoration:'none', color:'white'}}><MenuItem onClick={handleClose} style={{color:'black'}}>{name}</MenuItem></Link>
         <Link to="/category" style={{textDecoration: 'none'}}> <MenuItem onClick={handleClose} style={{color: 'black'}}>Categories</MenuItem></Link>
           <MenuItem onClick={handleCloselogin} style={{color:'black'}}>Logout</MenuItem>
           <Link to="/form" onClick={()=>setCurrentId(null), ()=>handleClose()} style={{textDecoration: 'none'}}><MenuItem  style={{color:'black'}} >Add new product</MenuItem></Link>
          <Link to="/products" style={{textDecoration:'none'}}><MenuItem onClick={handleClose} style={{color:'black'}} >Show All Products</MenuItem></Link>
          </Menu></> :
           <>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleMenu}
              color="inherit"
            >
              <AccountCircle />
            </IconButton> <Menu
           id="menu-appbar"
           anchorEl={anchorEl}
           anchorOrigin={{
             vertical: 'top',
             horizontal: 'right',
           }}
           keepMounted
           transformOrigin={{
             vertical: 'top',
             horizontal: 'right',
           }}
           open={Boolean(anchorEl)}
           onClose={handleClose}
         >
           {/* <MenuItem onClick={handleClose} style={{color:'black'}}>{name}</MenuItem> */}
 <Link to="/login"style={{textDecoration:'none'}}><MenuItem onClick={handleCloselogin} style={{color:'black'}} >Login</MenuItem></Link>
 <Link to="/register" style={{textDecoration:'none', }}><MenuItem onClick={handleClose} style={{color:'black'}} >Register</MenuItem></Link>

          {/* <Link to="" style={{textDecoration:'none'}}> <MenuItem onClick={handleClosenewpost} style={{color:'black'}} >{newposttitle}</MenuItem></Link>
          <Link to="" style={{textDecoration:'none'}}> <MenuItem onClick={handleClosepost} style={{color:'black'}} >{postTitle}</MenuItem></Link> */}
         </Menu></>
            }
           
          </div>
        )}
      </Toolbar>
     
    </AppBar>


    
    {showPost  
      ? <> 
          <Posts setCurrentId={setCurrentId} /> 
          
        </>

      : ''
    }
   
    {showNewPost  
      ? <> 
          
          <Form currentId={currentId} setCurrentId={setCurrentId}/>
        </>

      : ''
    }
    {/* <Posts/> */}
  </Box>
    )
}

