const TOKEN_KEY='jwt';
const login=()=>{
    localStorage.setItem(TOKEN_KEY,'TestLogin');
}

export default login;
export const logout=()=>{
    localStorage.removeItem(TOKEN_KEY);

}
export const isLogin=()=>{
    if(localStorage.getItem(TOKEN_KEY)){
        return true;
    }
    else{
        return false;
    }
}