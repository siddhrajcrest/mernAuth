// import { formatMs } from "@material-ui/core";
import React, {useState, useEffect} from "react";
import { Autocomplete, TextField } from "@mui/material";
import { Button } from "@mui/material";
import { Typography } from "@mui/material";
import { Paper, Container } from "@mui/material";
import { Box } from "@mui/system";
import FileBase from 'react-file-base64';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import InputAdornment from '@mui/material/InputAdornment';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import CategoryModal from '../categoryModal';
import FormControl from '@mui/material/FormControl';
import TextareaAutosize from '@mui/material/TextareaAutosize';
import {Redirect} from 'react-router-dom'
import Select from '@mui/material/Select';
import {useDispatch}  from "react-redux";
import Posts from '../posts/posts'
// import { createPost } from "../../api";
import {createPost, updatePost} from '../../actions/posts'
import { makeStyles } from "@material-ui/styles";
import { useSelector } from "react-redux";
import jwt_decode from "jwt-decode";
import { getCategories } from "../../actions/categoryactions";
import { createCategory } from "../../api/categoryapi";
import { ClassNames } from "@emotion/react";


//Get the id of the Post



const Form=({currentId, setCurrentId })=>{
    const token = useSelector(state => state.auth)
    const categorytype = useSelector(state => state.category);
    const [modal, setmodal] = useState(false);
    const [categoryModal, setcategoryModal] = useState(false);
    // console.log(categorytype[3].name);
    const dispatch = useDispatch();
    // const [options, setoptions] = useState([]);
    // dispatch(createCategory)
    const [name, setname] = useState("");
    const [category, setcategory] = useState("");
    useEffect(() => {
        if(token){
            // console.log("dispatcher called");
           if(currentId){
             document.title="Edit the Product";
           }
           else{
             document.title="Add new Product";
           }
            // console.log(category);
            // console.log(posts);
            dispatch(getCategories())
            
        
            // console.log(posts);
            // dispatch(getPosts);
            // console.log(dispatch(getPosts));
    
        }
        else{
            window.location.replace("/login");
        }
       
    },[]);
    const options=[];
    for(var i=0;i<categorytype.length;i++){
        options.push(`option ${i}`);
    }
    const [postData, setpostData]=useState({
        name: "",
        category: '',
        description: "",
        price: "",
        selectedFile: "",
    })
    const post=useSelector((state)=>currentId? state.posts.find((message)=>message._id===currentId): null);

    const dispatches =useDispatch();

    
    
    useEffect(()=>{
        if(post) setpostData(post);
    }, [post]);
    
    const clear = () => {
        setCurrentId(0);
        setpostData({ name: '', category: '', description: '', price: '', selectedFile: '' });
      };
      const handlecategory=()=>{
        setcategoryModal(true);
        setmodal(true);
      }
      const onClose=()=>{
        // console.log("Edit Clicked", id);
        // console.log("Close");
        setcategoryModal(false);
        
      }
    const handlesubmit=(e)=>{
        // e.preventDefault();
    //   dispatches(createPost(postData));
    let name=document.forms["postform"]["name"].value;
    
    let messagelen=document.forms["postform"]["description"].value;
    let taglen=document.forms["postform"]["price"].value;
    
    if(name.length==0 || messagelen==0 || taglen==0 ){
        alert("Fields cannot be empty");
    }
    else{
        if (currentId) {
            console.log("function initiated for update current id", currentId);

            dispatches(updatePost(currentId, postData));
            
            clear();
            
          } else {
            console.log("function initiated for create current id", currentId);
            dispatches(createPost(postData));
            
            clear();
          }
          window.location.replace("/products");
        }

    }
    return(
        <Container style={{paddingTop:'6rem'}}> 
       <Paper elevation={3}>
           <form name="postform" autoComplete="off" onSubmit={handlesubmit}>
               <Typography style={{marginBottom:'2rem',padding:'2rem', fontWeight:'bolder', color: '#1976d2'}}>{currentId? `Edit` : `Add`} a Product</Typography>

           <TextField 
           name="name" 
           variant="outlined" 
           label="Enter Product Name" 
           style={{marginLeft:'2rem'}} 
           
           value={postData.name}
           onChange={(e)=>setpostData({ ...postData, name: e.target.value})}/>
           {/* <TextField 
           name="title" 
           variant="outlined" 
           label="Enter Product Category" 
           style={{marginLeft:'2rem'}} 
           
           value={postData.title}
           onChange={(e)=>setpostData({ ...postData, title: e.target.value})}/> */}
           {/* <FormControl style={{width:'13rem', paddingLeft:'2rem'}}>
        <InputLabel style={{paddingLeft:'2rem'}}>Select Category</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="category"
          value={postData.category}
          label="Category"
          onChange={(e)=>setpostData({...postData, category: e.target.value})}
        >
        
          {options.map((option,i)=><MenuItem key={i} value={categorytype[i].name}>{categorytype[i].name}</MenuItem>)}
        </Select>
      </FormControl> */}
      <Autocomplete
      style={{marginTop: '20px', marginBottom: '20px', marginLeft: '20px', marginRight: '20px'}}      
      id="category"
      value={postData.category}
      fullWidth={false}
      onSelect={(e)=>setpostData({...post, category: e.target.value})}
      options={categorytype.map((option,i)=>categorytype[i].name)}
      renderInput={(params)=><TextField {...params} label="Select Category"/>}
      ></Autocomplete>
     
           <TextField 
           name="description" 
           variant="outlined" 
           label="Enter Product Description" 
           style={{marginLeft:'2rem'}} 
           
           value={postData.description}
           onChange={(e)=>setpostData({ ...postData,description: e.target.value})}/>
            <TextField 
           name="price" 
           variant="outlined" 
           label="Enter Price" 
           style={{marginLeft:'2rem'}} 
           type="number"
           value={postData.price}
           onChange={(e)=>setpostData({ ...postData,price: e.target.value})}
           InputProps={{
            startAdornment: (
              <InputAdornment position="start">
               ₹
              </InputAdornment>
            ),
          }}/>
          
           <div style={{marginTop:'2rem', marginLeft: '2rem'}}>
               <FileBase type="files" multiple={false} onDone={({base64})=>setpostData({...postData, selectedFile:base64})}/>
               
           </div>
           <Button variant="contained" color="primary" size="large" fullWidth style={{marginTop:'2rem'}} onClick={()=>{handlesubmit()}}> Submit</Button>
           
           <Button variant="contained"  size="large" fullWidth  style={{marginTop:'2rem', backgroundColor:'red'}} onClick={()=>{clear()}}> clear</Button>
           </form>
           <Button onClick={()=>handlecategory()} fullWidth variant="contained" style={{marginTop : '2rem'}}>Add new Category</Button>
           </Paper>
         {categoryModal
         ?  <CategoryModal onClose={()=>onClose()}  modalstate={modal}/> : <></>}
           </Container>
    )
}

export default Form;