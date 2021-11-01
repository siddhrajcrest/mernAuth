import { combineReducers} from "redux";
import posts from './posts';
import auth from './auth';
import filter from "./filter";
import category from './category'
export default combineReducers({
    posts,
    auth,
    category,
    filter,
})
