import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const ProtectedRoute = ({ element: Element }) => {
  const { loading, isAuthenticated } = useSelector((state) => state.user);
  
  if (loading) {
    return null; // or return a loading spinner
  }

  return isAuthenticated ? <Element /> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;