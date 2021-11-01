import React from 'react'
import {Container, ListGroup, ListGroupItem} from 'reactstrap';
import {CSSTransition, TransitionGroup} from 'react-transition-group';
import {v1 as uuid} from 'uuid';
import { Table } from 'reactstrap';
import { Button } from "@mui/material";

import { useSelector } from 'react-redux';
import { useEffect } from 'react';
// import CategoryModal from './categoryModal'
import { Link } from 'react-router-dom';
import { useState } from 'react';
import EditIcon from '@mui/icons-material/Edit';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { useDispatch } from 'react-redux';
import { getCategories, deleteCategory } from '../../actions/categoryactions';
import { deletePost } from '../../actions/posts';
import getPost from '../../actions/posts';
// import { deleteCategory } from '../api/categoryapi';
export default function Category({setCurrentId}) {
//   const categoryType = useSelector(state => state.category);
  const [id, setid] = useState("");
  const posts=useSelector((state)=>state.posts);
  
  const [modal, setmodal] = useState(false);
  const [categoryModal, setcategoryModal] = useState(false);
  const dispatch = useDispatch();
  // console.log(categoryType);
 const options=[];
  const token = useSelector(state => state.auth);
  useEffect(() => {
  if(token){
    // dispatch(getCategories());
    dispatch(getPost());

  }
  else{
    window.location.replace('/login');
  }

  }, []);
 
  const onDeleteClick=(id)=>{
    dispatch(deleteCategory(id)); 
  }
  const addnew=()=>{
    setcategoryModal(true);
    setmodal(true);
  }
  const onEditClick=(id)=>{
    console.log("Edit Clicked", id);
    setcategoryModal(true);
    setid(id);
    setmodal(true);
  //  <CategoryModal func={this.handleOpen}/>
  }
  const onClose=()=>{
    // console.log("Edit Clicked", id);
    // console.log("Close");
    setcategoryModal(false);
    setid(null);
    // setmodal(true);
  //  <CategoryModal func={this.handleOpen}/>
  }
  // console.log(categoryType[0]._id);
  // const categories=[];
  // for(var i=0;i<categoryType.length;i++){
  //   categories.push( {CategoryName: `${categoryType[i].name}` })
  // }
  // console.log(categories);
 
  // for(var i=0;i<categoryType.length;i++){
  //   options.push(`option ${i}`);
  // }
  for(var i=0;i<posts.length;i++){
    options.push(`option ${i}`)
  }
  // console.log(options);
  return (
   <Container>
     <Table responsive>
       <thead>
         <tr>
             <th>Product Image</th>
           <th>Product name</th>
           <th>Product Category</th>
           <th>Product Description</th>
           <th>Product Price</th>
           <th>Delete Action</th>
           <th>Edit Action</th>
         </tr>
       </thead>
       <tbody>
        {options.map((option,i)=>(
          <tr>
              <td><img style={{height: '6rem'}} src={posts[i].selectedFile}/></td>
            <td>{posts[i].name}</td>
            <td>{posts[i].category}</td>
            <td>{posts[i].description}</td>
            <td>{posts[i].price}</td>
            <td><Button variant='outlined' onClick={()=>dispatch(deletePost(posts[i]._id))}><DeleteOutlineIcon/></Button>
            
            {/* <CategoryModal categoryId={categoryId}/> */}
          </td>
          <td>        <Link to="form" onClick={()=>{setCurrentId(posts[i]._id)}}><Button size="small" ><EditIcon/></Button></Link>
</td>
          </tr>
        ))}
       </tbody>
        {/* <tbody>
        {options.map(({option, index})=>(
          <tr>
            <td>{categoryType[index].name}</td>
            <td>{categoryType[index].description}</td>
            <td><Button className="remove-btn" color="danger" onClick={()=>{console.log("Delete Clicked for ");}}>&times;</Button></td>
          </tr>
        ))}
       </tbody> */}
       </Table>
       <Link to="/form" onClick={()=>setCurrentId(null)} style={{textDecoration: 'none'}}><Button fullWidth variant='outlined' > Add new Product</Button></Link>
    {/* {categoryModal
    ?
    <CategoryModal categoryId={id} onClose={()=>onClose()} modalstate={categoryModal}/>
    :
      <></>

    } */}
   </Container>
  )
}
