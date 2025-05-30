import React from 'react';
import { Navigate } from 'react-router-dom';
import Loader from '../layout/loader/Loader';
import { useSelector } from 'react-redux';

const ProtectedRoute = ({ element: Element }) => {
  const { loading, isAuthenticated } = useSelector((state) => state.user);
  
  if (loading || isAuthenticated === undefined) {
    return <Loader/>; // or a loading spinner
  }

  return isAuthenticated === false ? <Navigate to="/login" replace /> : <Element/> ;
};

export default ProtectedRoute;