import axios from "axios";
import * as api from '../api/categoryapi'
export const getCategories=()=>{
    // console.log("Get category Action");
    return(dispatch)=>{
        // console.log("Get Action");
            axios
            .get("http://localhost:3500/category")
            .then(({data})=>dispatch({type: 'GET_CATEGORY', payload: data}))
            .catch((err)=>console.log(err));
    }
}


export const deleteCategory=(id)=>async (dispatch)=>{
    try{
    //    console.log(id);
      await api.deleteCategory(id);
      dispatch({type: 'DELETE_CATEGORY',payload: id})
    }
    catch(error){
        console.log(error.message);
    }
}
export const updateCategory=(id,updatedCategory)=>(dispatch)=>{
    try{
        const{data}=api.updateCategory(id,updatedCategory);
        dispatch({type:'UPDATE_CATEGORY', payload: id});
    }
    catch(error){
        console.log(error.message);
    }
}

export const createCategory=(category)=>(dispatch)=>{
    try{
        const{data}=api.createCategory(category);
        dispatch({type: 'CREATE_CATEGORY', payload: data})
    }
    catch(error){
        console.log(error.message);
    }
}