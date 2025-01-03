import React from "react";
import { Navigate } from "react-router-dom";
const PrivateRoute = ({ children,isLoggedIn }) => {
    if (!isLoggedIn){
        return <Navigate to="/login"/>;
    }
    return children
};

export default PrivateRoute