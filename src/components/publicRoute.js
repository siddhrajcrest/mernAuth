import React from 'react'
import { Redirect, Route } from 'react-router'
import { isLogin } from './utils'
import home from "./home";

const publicRoute=({component: Component, restricted, ...rest})=> {
    return (
        <Route {...rest} render={props=>(
            isLogin() && restricted ?
            <Redirect to="/home"/>
            :
            <Component {...props}/>
        )}>
            
        </Route>
    )
}
