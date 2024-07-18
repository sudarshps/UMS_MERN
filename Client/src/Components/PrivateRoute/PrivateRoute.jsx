import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import Cookies from "js-cookie";

const PrivateRoute = ({ children }) => {

  const [isAuthenticated,setIsAuthenticated] = useState (() => {
    const token = Cookies.get("token");
    return !!token
  });

  useEffect(()=>{
    const token = Cookies.get('token')
    setIsAuthenticated(!!token)
  },[])

  return isAuthenticated ? children : <Navigate to='/login' replace/>
};

export default PrivateRoute;
