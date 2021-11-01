import axios from "axios";

// import { useDispatch } from "react-redux";

const url="http://localhost:3500/category";
export const deleteCategory=(id)=>axios.delete(`${url}/${id}`);
export const createCategory=(newCategory)=>axios.post(url,newCategory);
export const updateCategory=(id,updatedCategory)=>axios.patch(`${url}/${id}`, updatedCategory);