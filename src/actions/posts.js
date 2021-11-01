 import axios from 'axios';
import * as api from '../api';

 //Action Creators
const getPost=()=>{
   return(dispatch)=>{
           axios
           .get("http://localhost:3500/posts")
           .then(({data})=>dispatch({type: 'FETCH_ALL', payload: data}))
           .catch((err)=>console.log(err));
   }
 
}

export default getPost;

export const createPost=(post)=>async(dispatch)=>{
        try{
                        const{data} =await api.createPost(post);
                        dispatch({type:'CREATE', payload: data});
        }catch(error){
                        console.log(error.message);
        }
}

export const filterPost=(category)=>async(dispatch)=>{
        // console.log("filterpost action");
        try{
                const{data}=await api.filterPost(category);
                dispatch({type: 'FILTER', payload: data});
        }
        catch(error){
                console.log(error.message);
        }
}
export const updatePost=(id,post )=>async(dispatch)=>{
        try{
                const {data}=await api.updatePost(id,post);
                dispatch({type: 'UPDATE', payload: data});
        }
        catch (error){ 
                console.log(error.message);
        }
}
export const deletePost = (id) => async (dispatch) => {
        try {
          await api.deletePost(id);
      
          dispatch({ type: 'DELETE', payload: id });
        } catch (error) {
          console.log(error.message);
        }
      };