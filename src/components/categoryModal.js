import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { useState } from 'react';
import {Form, FormGroup, Label,Input} from'reactstrap';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { updateCategory, createCategory } from '../api/categoryapi';
import { getCategories } from '../actions/categoryactions';
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function BasicModal({modalstate,categoryId, onClose}) {
  const modal=modalstate;
  const [open, setOpen] = useState(modal);
  const token = useSelector(state => state.auth);
  const categoryType = useSelector(state => state.category);
  const handleOpen = () => setOpen(true);
 
  const [categoryData, setcategoryData] = useState({
      name: '',
      description: ''
  })
//   console.log(categoryId);
  const dispatch = useDispatch();
  useEffect(() => {
    if(token){
      dispatch(getCategories());
      // console.log(categoryId);
      // console.log(title);
    };
  
  }, []);
  const category = useSelector(state =>categoryId? state.category.find((message)=>message._id===categoryId): null)
  useEffect(() => {
    if(category){
      setcategoryData(category);
    }
  }, [category]);
//   useEffect(() => {
//       if(category) setcategoryData(category);
//   }, [category])

    const onSubmit=(e)=>{
        // console.log("submit clicked");
        let name=document.forms["categoryFrom"]["name"].value;
        let description=document.forms["categoryFrom"]["description"].value;
        // console.log(description);
        if(name.length==0 || description.length==0){
            alert("Fileds Cannot be Empty")
        }
       
        else{
            if(categoryId){
                // console.log("Updating Category");
                window.location.reload();

                dispatch(updateCategory(categoryId,categoryData));
                clear();
            }
            else{
                // console.log("Creating Category");
                window.location.reload();

                dispatch(createCategory(categoryData));
                clear();
            }
           onClose()
           
        
            
            
        }
    }
    const onChange=()=>{

    }
    const clear=()=>{
        // console.log("Clear clicked");
        setcategoryData({name: '', description: ''});
    }
    
  return (
    <div>
      {/* {categoryId?
        <Button style={{marginTop: '2rem', color: 'white'}} variant="contained" onClick={handleOpen} fullWidth>Edit Category</Button>
        :
        <Button style={{marginTop: '2rem', color: 'white'}} variant="contained" onClick={handleOpen} fullWidth>Add new Category</Button>
      } */}
      
      <Modal
        open={modalstate}
        onClose={onClose}
        aria-labelledby="modal-modal-title"
        dialogClassName="modal-90w"
        centered
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
        <Form name="categoryFrom" onSubmit={onSubmit}>
<FormGroup>
 <Label for="item" style={{marginBottom: '1rem'}}>{categoryId? `Edit ${categoryData.name}` : "Add new"} Category</Label>
 <Input value={categoryData.name}  type="text" name="name" id="item" placeholder="Add Category Name"onChange={(e)=>setcategoryData({...categoryData, name: e.target.value})}/ >
 <Input value={categoryData.description} type="text" style={{marginTop:'1rem'}} name="description" id="item" placeholder="Add Description" onChange={(e)=>setcategoryData({...categoryData,description:e.target.value})}/ >
     <Button variant="outlined"   style={{marginTop:'2rem'}} onClick={onSubmit} > {categoryId? "Edit" : "Add" } Category</Button>
     <Button  variant="outlined" onClick={clear}  style={{marginTop:'2rem', marginLeft:'2rem'}} > Clear</Button>
     
</FormGroup>
</Form>
        </Box>
      </Modal>
    </div>
  );
}

