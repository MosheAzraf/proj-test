import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Loader from './Loader';

const ProtectedRoute = ({ allowedRoles }) => {
  const { currentUser, roles, isLoading } = useSelector((state) => state.auth);
  console.log(currentUser)

  if(isLoading){
    return <Loader/>
  }

  if (!currentUser) {
    return <Navigate to="/login" />;
  }

  const hasRequiredRole = roles.some((role) => allowedRoles.includes(role));

  if (!hasRequiredRole) {
    return <Navigate to="/unauthorized" />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
