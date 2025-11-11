import React, { useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { getFromLocalStorage } from '../helper';

const SuperAdminProtectedRoute = ({ children }) => {
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

  // Check for super admin token - this is the key identifier for admin users
  const superAdminToken = getFromLocalStorage("superAdmintoken");
  const regularToken = getFromLocalStorage("token");
  
  // If user only has regular token (not admin token), redirect to regular dashboard
  if (regularToken && !superAdminToken) {
    return <Navigate to="/dashboard" replace />;
  }

  // If no admin token, redirect to admin login
  if (!superAdminToken) {
    return <Navigate to="/super-admin/login" replace />;
  }

  // User has admin token, allow access
  return children;
};

export default SuperAdminProtectedRoute;

