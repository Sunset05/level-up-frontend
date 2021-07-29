import { React } from 'react'
import { Route, Redirect } from 'react-router-dom'


export default function PrivateRoute({ path, component: Component, ...props }) {
    return localStorage.token
        ? <Route exact path={path} render={(routerProps) => <Component {...props}  />}/>
        : <Redirect to="/signup" />
}
