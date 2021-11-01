

export default(categories=[], action)=>{
    switch(action.type){
        case 'GET_CATEGORY':
            // console.log("Get category Reducer");
            // console.log(action.payload);
            return action.payload;
            case 'CREATE_CATEGORY':
                console.log("Create Reducer");
                    return [...categories,action.payload];
            case 'UPDATE_CATEGORY':
                console.log("update category  reducer");
                return categories.map((category)=>category._id===action.payload._id ? action.payload : category);
          
                case 'DELETE_CATEGORY':
                    // console.log("delete Category reducer");
                    return categories.filter((category)=>category._id!==action.payload);
                    
        default:
            return categories;
    }
}