import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import PropTypes from 'prop-types'

const ProtectedRoutes = ({roles}) => {

    const token = localStorage.getItem("token");

if (!token) {
    return <Navigate to="/login"/>
}
try {
    const decoded = jwtDecode(token);

    if (roles.includes(decoded.role)) {
        return <Outlet/>
    } else {
    return <Navigate to="/"/>
    
    }
} catch (error) {
    return <Navigate to="/login"/>
    
}

  
};

ProtectedRoutes.propTypes = {
    roles: PropTypes.arrayOf(PropTypes.string).isRequired,
  };

export default ProtectedRoutes;
