import React, { useEffect } from "react";
import Footer from "./Footer";
import Header from "./Header";
import "../../asset/css/landingpage.css";
import { getCookiePreferences, hasConsent } from "../../helper/cookieManager";

const LayoutOrpect = ({ children }) => {
  useEffect(() => {
    // Only load Tawk.to if user has consented to functional cookies
    const preferences = getCookiePreferences();
    const consent = hasConsent();
    
    if (consent && preferences.functional) {
      // Check if script already exists
      if (!document.getElementById('tawk-script')) {
        const script = document.createElement("script");
        script.id = 'tawk-script';
        script.src = "https://embed.tawk.to/648719bacc26a871b0220a14/1h2nrp1bp";
        script.async = true;
        script.charset = "UTF-8";
        script.setAttribute("crossorigin", "*");
        document.body.appendChild(script);
      }
    }

    // Listen for cookie preference changes
    const handleCookieChange = () => {
      const updatedPreferences = getCookiePreferences();
      if (updatedPreferences.functional && hasConsent()) {
        if (!document.getElementById('tawk-script')) {
          const script = document.createElement("script");
          script.id = 'tawk-script';
          script.src = "https://embed.tawk.to/648719bacc26a871b0220a14/1h2nrp1bp";
          script.async = true;
          script.charset = "UTF-8";
          script.setAttribute("crossorigin", "*");
          document.body.appendChild(script);
        }
      } else {
        const existingScript = document.getElementById('tawk-script');
        if (existingScript) {
          existingScript.remove();
        }
        if (window.Tawk_API) {
          window.Tawk_API.hideWidget();
        }
      }
    };

    window.addEventListener('cookiePreferencesChanged', handleCookieChange);

    return () => {
      window.removeEventListener('cookiePreferencesChanged', handleCookieChange);
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
