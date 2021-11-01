// import { formatMs } from "@material-ui/core";
import React from "react";
import Post from "./posts/post/post";
import { Grid, CircularProgress, Container, Button } from "@mui/material";
import { useSelector } from "react-redux";
import { useState } from "react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import SingleCategory from './category';
// import modal from './categoryModal';
import CategoryModal from './categoryModal'
// import getPost from "../actions/posts";
import Table from './table'
import {getCategories} from '../actions/categoryactions'
import jwt_decode from 'jwt-decode';
import {Link} from 'react-router-dom';
const Categories=({setCategoryId})=>{
    const posts = useSelector(state => state.category)
    
    // const category = useSelector(state => state.categories)
    const token=useSelector((state)=>state.auth);
    const dispatch = useDispatch();
    const [name, setname] = useState("");
    // console.log(setCategoryId);
    
    useEffect(() => {
        if(token){
            // console.log("dispatcher called");
            document.title="All Categories";
            // console.log(category);
            // console.log(posts);
            dispatch(getCategories())
            // console.log(posts);
            const user=jwt_decode(token);
            setname(user.name);
            // dispatch(getPosts);
            // console.log(dispatch(getPosts));
    
        }
        else{
            window.location.replace("/login");
        }
       
    },[]);
   
    // console.log(user.name);
    // const classes=useStyles();
    
    return(
        
       !posts.length ? <Container><CircularProgress color="success" style={{margin:'6rem'}}/> <h4 style={{color:'green', margin:'2rem'}} >Hello {name},please wait while we fetch your Categories <br /> Or Else, Create new Category </h4> <CategoryModal/></Container> : (
           <>
            {/* <Link to="/allproducts" style={{textDecoration:'none', color: 'white', alignItems:'center'}}><Button variant="contained">All Products</Button></Link> */}
        <Container style={{marginTop: '2rem'}}>
                            <SingleCategory />
                            {/* <Table/> */}
                            <CategoryModal/>
                            </Container>
           </>
       )
    )
}

export default Categories;