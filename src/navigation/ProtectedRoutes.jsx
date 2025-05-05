import React, { useEffect } from 'react';
import { Navigate} from 'react-router-dom';

const ProtectedRoute = ({ children }) => {

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

  const isLoggedIn = !!localStorage.getItem("token");

  return isLoggedIn ? (
    children
  ) : (
   <Navigate to="/"  />
  );
  };

export default ProtectedRoute;
