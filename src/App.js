import * as React from 'react';
import { useEffect, useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import category from './components/category';
import { useDispatch } from 'react-redux';
import postAction from './actions/posts';
import MenuIcon from '@mui/icons-material/Menu';
import Posts from './components/posts/posts';
import Form from './components/forms/form';
import NewPassword from './components/authentication/newpassword';
import Home from './components/home';
import Landing from './components/landing';
// import Appbar from './components/appbar'
// import form from './components/forms/form'
import login from './components/authentication/login';
import 'bootstrap/dist/css/bootstrap.min.css';
import Register from './components/authentication/register';
import Post from './components/posts/post/post';
import Products from './components/posts/products'
import memory from './images/memories.png';
import { MenuItem } from '@mui/material';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import AccountCircle from '@mui/icons-material/AccountCircle';
import Menu from '@mui/material/Menu';
import publicRoute from './components/publicRoute';
import privateRoute from './components/privateRoute';
import Profile from './components/profile';
import forgotpassword from './components/authentication/forgotpassword';
import Category from './components/categories'
import updatepassword from './components/authentication/updatepassword';
import AllProducts from './components/allproducts';
import './App.css';
import  {
  BrowserRouter as Router,
  Switch as Switche,
  Route,
  Link
}  from 'react-router-dom'
import Appbar from './components/appbar';
// import { Category } from '@material-ui/icons';
export default function App() {

  const [currentId, setCurrentId] =useState(null); 
  const [categoryId, setCategoryId] = useState(null);
  const [auth, setAuth] = React.useState(true);
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleChange = (event) => {
    setAuth(event.target.checked);
  };

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const dispatch=useDispatch();
  useEffect(()=>{
     dispatch(postAction);
      }, [dispatch]);
  return (
    
     <Router>
   <Appbar />
   {/* <Products/> */}
   {/* <h1 style={{paddingTop:'6rem'}} className="form">Welcome to memories app</h1> */}
   {/* <Landing/> */}
     <Switche>
       <Route path="/form" render={(props)=> <Form {...props} setCurrentId={setCurrentId} currentId={currentId}/>} />
       <Route exact path="/" />
       <Route path="/allproducts" render={(props)=><AllProducts {...props} setCurrentId={setCurrentId}/>}  />
       <Route path="/login" component={login}/>
      <Route path="/forgot" component={forgotpassword}/>
       {/* to pass props here do <Route path="" render={(props)=><Component {...props} title={`props`}/>} */}
       <Route path="/products" render={(props)=><Products {...props} setCurrentId={setCurrentId}/>}/>
       <Route exact path="/reset/:token">
    <NewPassword/>
       </Route>
       <Route path="/updatepassword" component={updatepassword} />
       <Route path="/category" render={(props)=><Category {...props} setCategoryId={setCategoryId}/>}/>
       <Route path="/register" component={Register}/>
       <Route path="/profile" component={Profile}/>
       {/* <Route path="/category" component={Category}/> */}
       {/* <publicRoute restricted={false} component={Home} exact path="/home"/> */}
     </Switche>
   </Router>
  );
}
