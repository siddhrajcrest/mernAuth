export default(posts=[], action)=>{
    switch(action.type){
            case 'FILTER':
                    // console.log("Filter Category Reducer");
                    return action.payload;
                     
        default: 
            return posts;
    }
}