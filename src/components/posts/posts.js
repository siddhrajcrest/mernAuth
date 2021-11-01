// import { formatMs } from "@material-ui/core";
import React from "react";
import Post from "./post/post";
import { Grid, CircularProgress, Container, Button } from "@mui/material";
import { useSelector } from "react-redux";
import { useState } from "react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import getPost from "../../actions/posts";
import jwt_decode from 'jwt-decode';
import {Link} from 'react-router-dom';
const Posts=({setCurrentId})=>{
    const posts=useSelector((state)=>state.posts);
    // const category = useSelector(state => state.categories)
    const token=useSelector((state)=>state.auth);
    const dispatch = useDispatch();
    const [name, setname] = useState("");
    
    
    useEffect(() => {
        if(token){
            // console.log("dispatcher called");
            document.title="All Products";
            // console.log(category);
            // console.log(posts);
            dispatch(getPost())
            const user=jwt_decode(token);
            setname(user.name);
            // dispatch(getPosts);
            // console.log(dispatch(getPosts));
    
        }
        else{
            window.location.replace("/login");
        }
       
    }, []);
   
    // console.log(user.name);
    // const classes=useStyles();
    
    return(
        
       !posts.length ? <Container><CircularProgress color="success" style={{margin:'6rem'}}/> <h4 style={{color:'green', margin:'2rem'}} >Hello {name},please wait while we fetch your Products <br /> Or else <Link to="/form" style={{textDecoration: 'none'}}>Create new Product</Link></h4></Container> : (
           <>
            {/* <Link to="/allproducts" style={{textDecoration:'none', color: 'white', alignItems:'center'}}><Button variant="contained">All Products</Button></Link> */}
          <Container style={{paddingTop: '7rem'}}> 
         
          <Grid container alignItems="stretch" spacing={1} >
              
                {
                    posts.map((post)=>(
                        <Grid style={{margintop:'3rem'}} key={post._id} item xs={12} sm={6}>
                            <Post post={post} setCurrentId={setCurrentId}/>
                            </Grid>
                    ))
                }
           </Grid>
          <Link to="form" style={{textDecoration: 'none'}}> <Button fullWidth variant="outlined" style={{marginTop: "2rem", marginBottom: '2rem'}}>Add new Product</Button></Link>
           </Container>
           </>
       )
    )
}

export default Posts;