import React from 'react'
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import jwt_decode from 'jwt-decode';
import { Typography } from '@mui/material';
import {Table} from 'reactstrap'
import { Container } from '@mui/material';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import DeleteIcon from '@mui/icons-material/Delete';
import { Paper } from '@mui/material';
import {Button} from '@mui/material';
import {Link} from'react-router-dom';
import { useState } from 'react';

function Profile() {
    const token = useSelector((state) => state.auth);
    const [user, setuser] = useState("");
    const [info, setinfo] = useState("");
    useEffect(() => {
        if(token){
             setinfo(jwt_decode(token));
            console.log(info);
            // console.log(info);
            setuser(info.name);
        }
        else{
            window.location.replace("/login");
        }
       
    });

    return (
        <Container style={{marginTop:'2rem'}}>
           <Table>
       <thead>
         <tr>
           <th>User name</th>
           <th>User email</th>
           {/* <th>Delete Account</th> */}
          <th>Change Password</th>
         </tr>
       </thead>
       <tbody>
      
          <tr>
            <td>{info.name}</td>
            <td>{info.email}</td>
            {/* <td><Button onClick={()=>console.log("Delete User??")}><DeleteIcon/></Button></td> */}
            <td><Link to="/updatepassword"><Button><LockOpenIcon/></Button></Link></td>
          </tr>
  
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
       </Container>
    )
}

export default Profile
