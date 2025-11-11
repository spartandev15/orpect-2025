import React, { useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { getFromLocalStorage } from '../helper';

const ProtectedRoute = ({ children }) => {
  const location = useLocation();

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://embed.tawk.to/648719bacc26a871b0220a14/1h2nrp1bp";
    script.async = true;
    script.charset = "UTF-8";
    script.setAttribute("crossorigin", "*");

    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const regularToken = getFromLocalStorage("token");
  const superAdminToken = getFromLocalStorage("superAdmintoken");
  
  // Check if user is trying to access admin routes
  const isAdminRoute = location.pathname.startsWith('/super-admin');
  
  // If user has admin token, they should only access admin routes
  // Redirect to admin dashboard if they try to access regular user routes
  if (!isAdminRoute && superAdminToken) {
    return <Navigate to="/super-admin/dashboard" replace />;
  }

  // If user only has regular token and trying to access admin routes, redirect to regular dashboard
  if (isAdminRoute && regularToken && !superAdminToken) {
    return <Navigate to="/dashboard" replace />;
  }

  // Regular users should only access non-admin routes
  // Check if user is logged in with regular token (and not admin)
  const isLoggedIn = !!regularToken && !superAdminToken;

  return isLoggedIn ? (
    children
  ) : (
   <Navigate to="/" replace />
  );
  };

export default ProtectedRoute;
