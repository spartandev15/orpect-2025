import React, { useEffect } from "react";
import Footer from "./Footer";
import Header from "./Header";
import "../../asset/css/landingpage.css"

const LayoutOrpect = ({ children }) => {
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

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
};

export default LayoutOrpect;
