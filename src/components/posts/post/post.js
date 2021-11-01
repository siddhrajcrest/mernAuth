// import { formatMs } from "@material-ui/core";
import React from "react";
import { Card, CardActions, CardContent, CardMedia, Button, Typography } from "@mui/material";
import {ModeComment, ThumbDown} from '@material-ui/icons';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import DeleteIcon from '@mui/icons-material/Delete';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ModeCommentIcon from '@mui/icons-material/ModeComment';
import EditIcon from '@mui/icons-material/Edit';
import Form from "../../forms/form";
import {useDispatch} from 'react-redux';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import { Link } from "react-router-dom";
import { typography } from "@mui/system";
import { deletePost } from "../../../actions/posts";
const Post=({post, setCurrentId})=>{
  const dispatch = useDispatch();
    return(
      <Card sx={{ maxWidth: 500 }}>
      <CardMedia
        component="img"
        resizemode={'contain'}
        image={post.selectedFile}
        alt={post.description}
      />
      <CardContent>
      <Typography variant="h4">{post.name}</Typography>
        <Typography gutterBottom variant="h5" component="div">
          {post.description}
        </Typography>
        <Typography variant="body2" color="text.secondary">
         {post.category}
        </Typography>
        <Typography variant="body4" color="textSecondary" component="h2" style={{fontWeight:'bolder'}}>₹{post.price}</Typography>
        <Typography variant="p" style={{}}></Typography>
      </CardContent>
      <CardActions style={{padding: '0 16px 8px 16px',
    display: 'flex',
    justifyContent: 'space-between',}}>
        <Link to="form" onClick={()=>{setCurrentId(post._id)}}><Button size="small" ><EditIcon/></Button></Link>
        <Button size="small" onClick={()=>{dispatch(deletePost(post._id))}}><DeleteIcon/></Button>
      </CardActions>
    </Card>
    )
}

export default Post;

