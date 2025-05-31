import React from 'react';
import { Navigate } from 'react-router-dom';
import Loader from '../layout/loader/Loader';
import { useSelector } from 'react-redux';

const ProtectedRoute = ({ isAdmin,element: Element }) => {
  const { loading, isAuthenticated ,user} = useSelector((state) => state.user);
  
  if (loading || isAuthenticated === undefined) {
    return <Loader/>; // or a loading spinner
  }
  if(isAdmin === false && user.role !== "admin"){
    return <Navigate to="/login" replace />
  }

  return isAuthenticated === false ? <Navigate to="/login" replace /> : <Element/> ;
};

export default ProtectedRoute;