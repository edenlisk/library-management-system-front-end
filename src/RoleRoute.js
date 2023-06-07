import React from "react";
import { useSelector } from "react-redux";
import { Route, Navigate } from "react-router-dom";

const RoleBasedRoute = ({ element, roles }) => {
    const accessibility = useSelector((state) => state.auth.accessibility);
  
    // Check if the user's role is allowed to access the route
    const isRoleAllowed = roles.includes(accessibility);
  
    return isRoleAllowed ? (
      <>{element}</>
    ) : (
      <Navigate to="/unauthorized" replace />
    );
  };

  export default RoleBasedRoute;