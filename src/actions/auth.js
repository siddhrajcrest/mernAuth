// import Loggedin from './../Reducers/auth'

 //Action Creators
const login=(dispatch)=>{
    try{
        console.log("Auth action");
            dispatch({type: 'LOGIN'});
        //     console.log();
            // dispatch (action);
    }catch(error){
            console.log(error.message);
    }
}
export default login;