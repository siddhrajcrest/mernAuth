import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Table2 from './table2';
import { useSelector } from 'react-redux';
import InputLabel from '@mui/material/InputLabel';
import { Autocomplete, Button, Container, Grid, TextField } from '@mui/material';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useState } from 'react';
import { useEffect } from 'react';
import CategoryModal from './categoryModal';
import getPost, { deletePost } from '../actions/posts';
import MenuItem from '@mui/material/MenuItem';
import { Select } from '@mui/material';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import {filterPost} from '../actions/posts';
import { getCategories } from '../actions/categoryactions';
import { Table } from 'reactstrap';
import Post from './posts/post/post';
function AllProducts({setCurrentId}) {
  
    const token = useSelector(state => state.auth);
    const products = useSelector(state => state.posts);
    const Filtered = useSelector(state => state.filter);
    const [Category, setCategory] = useState("");
    const [modal, setmodal] = useState(false);
    const [categorymodal, setcategorymodal] = useState(false);
    const categoryType = useSelector(state => state.category);
    const dispatch = useDispatch();
    useEffect(() => {
      if(token){
        dispatch(getPost());
        document.title="Categories Wise Products"
        dispatch(getCategories());
        // dispatch(filterPost(Category));
      }
      else{
        window.location.replace("/login")
      }
    
    }, []);
   

    // console.log(categoryType);
    const options=[]
    for(var i=0;i<categoryType.length;i++){
      options.push(`option ${i}`);
    }
    const onClick=()=>{
      // console.log(Category);
      dispatch(filterPost(Category));
      // console.log(Filtered);
      
    }
    const handlecategorymodal=()=>{
      setcategorymodal(true);
      setmodal(true);
    }
    const onClose=()=>{
      // console.log("Edit Clicked", id);
      // console.log("Close");
      setcategorymodal(false);
      
    }
    const deleteProduct=(id)=>{
      dispatch(deletePost(id));
    }
    const editProduct=(id)=>{

    }
    console.log(Filtered);
    const optionFilter=[];
    for(var i=0;i<Filtered.length;i++){
      optionFilter.push(`option no. ${i}`);
    }
    return (
     <Container>
       {/* <Typography>Select a Category to filter the Products</Typography> */}
       {/* <InputLabel style={{paddingLeft:'2rem'}}>Select Category</InputLabel> */}
        {/* <Select
          labelId="demo-simple-select-label"
          
          id="category"
          style={{margin: '6rem'}}
          label="Category"
          onChange={(e)=>setCategory(e.target.value)}
        >
          {options.map((option,i)=><MenuItem key={i} value={categoryType[i].name}>{categoryType[i].name}</MenuItem>)}
        </Select> */}
        <Autocomplete
        id="category"
        onSelect={(e)=>setCategory(e.target.value)}
        fullWidth={false}
        style={{marginTop: '30px', marginBottom: '30px'}}
        options={categoryType.map((option,i)=>categoryType[i].name)}
        renderInput={(params)=><TextField {...params} label="Select A category" />}
        ></Autocomplete>
        <Button variant="contained" onClick={()=>onClick()}>Filter Products</Button>
        <Link to="/form" onClick={()=>setCurrentId(null)}  style={{textDecoration: 'none', color: 'white'}}><Button variant="contained" style={{marginLeft:'2rem'}}>Add new Product</Button></Link>
        <Button variant="contained" style={{marginLeft: '2rem'}} onClick={()=>handlecategorymodal()}>Add new Category</Button>
        {!Filtered.length
        ?
        <Container><h4 style={{color:'green', margin:'2rem'}} >No products Available for {Category} Category</h4></Container> : (
        
        <>
          <Table>
           <thead>
           <tr>
             <th>Product Image</th>
             <th>Product Name</th>
             <th>Product Category</th>
             <th>Product Description</th>
             <th>Product Price</th>
             <th>Delete Action</th>
             <th>Edit Action</th>
           </tr>
           </thead>

           <tbody>
             {optionFilter.map((option,i)=>(
               <tr>
                 <td><img style={{height: '6rem'}} src={Filtered[i].selectedFile}/></td>
                 <td>{Filtered[i].name}</td>
                 <td>{Filtered[i].category}</td>
                 <td>{Filtered[i].description}</td>
                 <td>₹ {Filtered[i].price}</td>
                 <th><Button onClick={()=>{deleteProduct(Filtered[i]._id)}}><DeleteOutlineOutlinedIcon/></Button></th>
                 <th>  <Link to="form" onClick={()=>{setCurrentId(Filtered[i]._id)}}><Button ><EditOutlinedIcon/></Button></Link></th>
               </tr>
             ))}
           </tbody>
         </Table>
        </>)}
         {categorymodal
         ?  <CategoryModal onClose={()=>onClose()}  modalstate={modal}/> : 
         
         <>
       
         </>}
     </Container>
    )
  
  }

export default AllProducts


{/* <Grid container alignItems="stretch" spacing={1}>
        {
          Filtered.map((product)=>(
            <Grid style={{marginTop:'2rem'}} key={product._id} item xs={12} sm={6}>
              <Post post={product} setCurrentId={setCurrentId}/>
            </Grid>
          ))
        }</Grid> */}