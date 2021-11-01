import axios from 'axios';
// import Axios from 'axios';
import { useDispatch } from 'react-redux';

const url="http://localhost:3500/posts";

export const fetchPosts=()=>axios.get(url)
export const createPost=(newPost) => axios.post(url,newPost)

export const updatePost=(id, updatedPost) =>axios.patch(`${url}/${id}`, updatedPost );

export const deletePost = (id) => axios.delete(`${url}/${id}`);

export const filterPost=(category)=>axios.get(`${url}/filter/${category}`)