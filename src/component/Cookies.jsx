// src/components/CookieConsent.js
import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { Link } from 'react-router-dom';
import { 
  saveCookiePreferences, 
  getCookiePreferences, 
  initializeCookieManagement 
} from '../helper/cookieManager';
import './CookieConsent.css';

const CookieConsent = () => {
  const [visible, setVisible] = useState(false);
  const [showPreferences, setShowPreferences] = useState(false);
  const [preferences, setPreferences] = useState({
    necessary: true, // Always true, cannot be disabled
    analytics: false,
    marketing: false,
    functional: false,
  });

  useEffect(() => {
    const consent = Cookies.get('cookieConsent');
    const savedPreferences = getCookiePreferences();
    
    if (!consent) {
      setVisible(true);
      // Initialize with only necessary cookies until consent is given
      initializeCookieManagement();
    } else {
      // Load saved preferences
      setPreferences(savedPreferences);
      // Apply saved preferences
      initializeCookieManagement();
    }
  }, []);

  const handleAcceptAll = () => {
    const allAccepted = {
      necessary: true,
      analytics: true,
      marketing: true,
      functional: true,
    };
    // Save and apply preferences
    saveCookiePreferences(allAccepted, 'accepted');
    setPreferences(allAccepted);
    // Log consent
    logConsent('accepted_all', allAccepted);
    setVisible(false);
  };

  const handleRejectAll = () => {
    const onlyNecessary = {
      necessary: true,
      analytics: false,
      marketing: false,
      functional: false,
    };
    // Save and apply preferences (this will disable non-necessary cookies)
    saveCookiePreferences(onlyNecessary, 'rejected');
    setPreferences(onlyNecessary);
    logConsent('rejected_all', onlyNecessary);
    setVisible(false);
  };

  const handleSavePreferences = () => {
    // Save and apply custom preferences
    saveCookiePreferences(preferences, 'custom');
    logConsent('custom', preferences);
    setVisible(false);
  };

  const handlePreferenceChange = (key) => {
    if (key === 'necessary') return; // Cannot disable necessary cookies
    setPreferences({ ...preferences, [key]: !preferences[key] });
  };

  const logConsent = (action, prefs) => {
    // Store consent log in localStorage (backend should handle this)
    const consentLog = {
      action,
      preferences: prefs,
      timestamp: new Date().toISOString(),
      userAgent: navigator.userAgent,
    };
    const existingLogs = JSON.parse(localStorage.getItem('consentLogs') || '[]');
    existingLogs.push(consentLog);
    localStorage.setItem('consentLogs', JSON.stringify(existingLogs.slice(-10))); // Keep last 10
  };

  if (!visible) return null;

  return (
    <div className="position-fixed bottom-0 start-0 w-100 p-4 shadow-lg" style={{ backgroundColor: '#fff', zIndex: 1001, maxHeight: '90vh', overflowY: 'auto' }}>
      <div className="container-fluid">
        <div className="row">
          <div className="col-12">
            <p className="mb-3 me-md-3" style={{ fontSize: '14px', lineHeight: '1.5' }}>
              We use cookies to enhance your experience, personalize content, and analyze traffic. 
              By clicking 'Accept All', you consent to our use of cookies. 
              <Link to="/cookie-policy" className="ms-1" style={{ color: '#f6a21e', textDecoration: 'underline' }}> Learn more</Link>
            </p>
            <div className="d-flex gap-2 flex-wrap">
              {!showPreferences ? (
                <>
                  <button 
                    onClick={handleAcceptAll} 
                    className="btn btn-sm fw-bold"
                    style={{ backgroundColor: '#134d75', color: '#fff', padding: '10px 20px' }}
                  >
                    Accept All
                  </button>
                  <button 
                    onClick={handleRejectAll} 
                    className="btn btn-sm fw-bold"
                    style={{ backgroundColor: '#f44336', color: '#fff', padding: '10px 20px' }}
                  >
                    Reject All
                  </button>
                  <button 
                    onClick={() => setShowPreferences(true)} 
                    className="btn btn-sm fw-bold"
                    style={{ backgroundColor: '#f6a21e', color: '#fff', padding: '10px 20px' }}
                  >
                    Customize
                  </button>
                </>
              ) : (
                <div className="cookie-preferences-panel">
                  <h4 className="cookie-preferences-title">Cookie Preferences</h4>
                  
                  <div className="cookie-preference-item">
                    <label className="cookie-preference-label">
                      <input
                        className="cookie-preference-checkbox"
                        type="checkbox"
                        checked={preferences.necessary}
                        disabled
                        id="banner-necessary-cookies"
                      />
                      <div className="cookie-preference-info">
                        <strong className="cookie-preference-name">Necessary Cookies</strong>
                        <small className="cookie-preference-desc">
                          Required for the website to function
                        </small>
                      </div>
                    </label>
                  </div>

                  <div className="cookie-preference-item">
                    <label className="cookie-preference-label">
                      <input
                        className="cookie-preference-checkbox"
                        type="checkbox"
                        checked={preferences.analytics}
                        onChange={() => handlePreferenceChange('analytics')}
                        id="banner-analytics-cookies"
                      />
                      <div className="cookie-preference-info">
                        <strong className="cookie-preference-name">Analytics Cookies</strong>
                        <small className="cookie-preference-desc">
                          Help us understand how visitors interact
                        </small>
                      </div>
                    </label>
                  </div>

                  <div className="cookie-preference-item">
                    <label className="cookie-preference-label">
                      <input
                        className="cookie-preference-checkbox"
                        type="checkbox"
                        checked={preferences.functional}
                        onChange={() => handlePreferenceChange('functional')}
                        id="banner-functional-cookies"
                      />
                      <div className="cookie-preference-info">
                        <strong className="cookie-preference-name">Functional Cookies</strong>
                        <small className="cookie-preference-desc">
                          Enable enhanced functionality
                        </small>
                      </div>
                    </label>
                  </div>

                  <div className="cookie-preference-item">
                    <label className="cookie-preference-label">
                      <input
                        className="cookie-preference-checkbox"
                        type="checkbox"
                        checked={preferences.marketing}
                        onChange={() => handlePreferenceChange('marketing')}
                        id="banner-marketing-cookies"
                      />
                      <div className="cookie-preference-info">
                        <strong className="cookie-preference-name">Marketing Cookies</strong>
                        <small className="cookie-preference-desc">
                          Used for advertising and tracking
                        </small>
                      </div>
                    </label>
                  </div>

                  <div className="cookie-preference-buttons">
                    <button 
                      onClick={handleSavePreferences} 
                      className="cookie-preference-btn-save"
                    >
                      Save Preferences
                    </button>
                    <button 
                      onClick={() => setShowPreferences(false)} 
                      className="cookie-preference-btn-back"
                    >
                      Back
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CookieConsent;
