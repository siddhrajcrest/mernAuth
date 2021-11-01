import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { useSelector } from 'react-redux';
import getPost from '../actions/posts';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { Paper, Typography } from '@mui/material';
const columns = [
  { field: 'ProductName', headerName: 'Product Name', width: 300 },
  { field: 'category', headerName: 'Product Category', width: 300 },
  { field: 'description', headerName: 'Description', width: 300 },
  {
    field: 'price',
    headerName: 'Price',
    type: 'number',
    width: 300,
  },
 
];

export default function DataTable(props) {
    const products = useSelector(state => state.posts);
    console.log(products);
    const token = useSelector(state => state.auth); 
    const dispatch = useDispatch();
    useEffect(() => {
        if(token){
           
        }
        else{
            window.location.replace("/login")
        }
      
    });
    // console.log(props.category);
const rows = [];
  for(var i=0;i<products.length;i++){
      rows.push( { id: `${products[i]._id}`,ProductName: `${products[i].name}`, description: `${products[i].description}`, category: `${products[i].category}`, price: `${products[i].price}` })
  }
//   console.log(rows);
  
  return (
      <>
      
      <Typography
          sx={{ flex: '1 1 100%' }}
          variant="h6"
          id="tableTitle"
          component="div"
          style={{alignItems: 'center', justifyContent: 'center', justifySelf: 'center', alignSelf: 'center'}}
        >
          {props.category} Products
        </Typography>
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={10}
        rowsPerPageOptions={[10]}
        checkboxSelection
      />
    </div>
    
    </>
  );
}
