import axios from 'axios';
const setAuthToken=token=>{
    if(token){
        // apply Authorization to every request

    }
    else{
        // delete auth header 
        delete axios.defaults.headers.common["Authorization"];
    }
};

export default setAuthToken;