// src/components/CookieConsent.js
import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';

const CookieConsent = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = Cookies.get('cookieConsent');
    if (!consent) {
      setVisible(true);
    }
  }, []);

  const handleAccept = () => {
    Cookies.set('cookieConsent', 'accepted', { expires: 365 });
    setVisible(false);
  };

  const handleReject = () => {
    Cookies.set('cookieConsent', 'rejected', { expires: 365 });
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div style={styles.container}>
      <p style={styles.text}>
        We use cookies to improve your experience. Do you accept?
      </p>
      <div style={styles.buttonContainer}>
        <button onClick={handleAccept} style={{ ...styles.button, ...styles.accept }}>
          Accept
        </button>
        <button onClick={handleReject} style={{ ...styles.button, ...styles.reject }}>
          Reject
        </button>
      </div>
    </div>
  );
};

const styles = {
  container: {
    position: 'fixed',
    bottom: 0,
    width: '100%',
    background: '#222',
    color: '#fff',
    padding: '15px 20px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    zIndex: 1000,
    flexWrap: 'wrap',
    zIndex:1001
  },
  text: {
    margin: 0,
    flex: 1,
    minWidth: '250px',
  },
  buttonContainer: {
    display: 'flex',
    gap: '10px',
  },
  button: {
    padding: '8px 16px',
    border: 'none',
    borderRadius: '4px',
    fontWeight: 'bold',
    cursor: 'pointer',
  },
  accept: {
    backgroundColor: '#4caf50',
    color: '#fff',
  },
  reject: {
    backgroundColor: '#f44336',
    color: '#fff',
  },
};

export default CookieConsent;
