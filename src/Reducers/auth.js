export default(auth,action)=>{
    switch(action.type){
        case 'LOGIN':
           console.log("Auth reducer executed");
           var accesstoken=localStorage.getItem('token');
           return accesstoken;
            // console.log(accesstoken);
     default: 
           return localStorage.getItem('token')
      
    }
}