import React from 'react'
import {Container, ListGroup, ListGroupItem} from 'reactstrap';
import {CSSTransition, TransitionGroup} from 'react-transition-group';
import {v1 as uuid} from 'uuid';
import { Table } from 'reactstrap';
import { Button } from "@mui/material";

import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import CategoryModal from './categoryModal'
import { useState } from 'react';
import EditIcon from '@mui/icons-material/Edit';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { useDispatch } from 'react-redux';
import { getCategories, deleteCategory } from '../actions/categoryactions';
// import { deleteCategory } from '../api/categoryapi';
export default function Category(categoryId) {
  const categoryType = useSelector(state => state.category);
  const [id, setid] = useState("");
  const [modal, setmodal] = useState(false);
  const [categoryModal, setcategoryModal] = useState(false);
  const dispatch = useDispatch();
  // console.log(categoryType);
 const options=[];
  const token = useSelector(state => state.auth);
  useEffect(() => {
  if(token){
    dispatch(getCategories());

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
  for(var i=0;i<categoryType.length;i++){
    options.push(`option ${i}`)
  }
  // console.log(options);
  return (
   <Container>
     <Table>
       <thead>
         <tr>
           <th>Category name</th>
           <th>Category Description</th>
           <th>Delete Action</th>
           <th>Edit Action</th>
         </tr>
       </thead>
       <tbody>
        {options.map((option,i)=>(
          <tr>
            <td>{categoryType[i].name}</td>
            <td>{categoryType[i].description}</td>
            <td><Button variant='outlined' onClick={()=>onDeleteClick(categoryType[i]._id)}><DeleteOutlineIcon/></Button>
            
            {/* <CategoryModal categoryId={categoryId}/> */}
          </td>
          <td><Button variant='outlined' onClick={()=>onEditClick(categoryType[i]._id)}><EditIcon/></Button>
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
       <Button fullWidth variant='outlined' onClick={()=>addnew()}> Add new Category</Button>
    {categoryModal
    ?
    <CategoryModal categoryId={id} onClose={()=>onClose()} modalstate={categoryModal}/>
    :
      <></>

    }
   </Container>
  )
}
