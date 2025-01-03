import React from "react";
import { Navigate } from "react-router-dom";
const PublicRoute = ({ children,isLoggedIn }) => {
    if (isLoggedIn) {
        return <Navigate to="/" />;
    }
    return children
};

export default PublicRoute