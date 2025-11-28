import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import { Link } from 'react-router-dom';
import { getCookiePreferences, saveCookiePreferences } from '../../helper/cookieManager';

/**
 * Cookie Preferences Manager Component
 * Allows users to change their cookie preferences after initial consent
 */
const CookiePreferencesManager = ({ onClose }) => {
  const [preferences, setPreferences] = useState({
    necessary: true,
    analytics: false,
    marketing: false,
    functional: false,
  });

  useEffect(() => {
    const savedPreferences = getCookiePreferences();
    setPreferences(savedPreferences);
  }, []);

  const handlePreferenceChange = (key) => {
    if (key === 'necessary') return; // Cannot disable necessary cookies
    setPreferences({ ...preferences, [key]: !preferences[key] });
  };

  const handleSave = () => {
    saveCookiePreferences(preferences, 'custom');
    if (onClose) {
      onClose();
    }
  };

  const handleAcceptAll = () => {
    const allAccepted = {
      necessary: true,
      analytics: true,
      marketing: true,
      functional: true,
    };
    saveCookiePreferences(allAccepted, 'accepted');
    setPreferences(allAccepted);
    if (onClose) {
      onClose();
    }
  };

  const handleRejectAll = () => {
    const onlyNecessary = {
      necessary: true,
      analytics: false,
      marketing: false,
      functional: false,
    };
    saveCookiePreferences(onlyNecessary, 'rejected');
    setPreferences(onlyNecessary);
    if (onClose) {
      onClose();
    }
  };

  return (
    <div className="position-fixed top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center" style={{ zIndex: 10000, padding: '20px' }}>
      <div className="card shadow-lg" style={{ maxWidth: '600px', width: '100%', maxHeight: '90vh', overflowY: 'auto' }}>
        <div className="card-header d-flex justify-content-between align-items-center border-bottom">
          <h3 className="card-title mb-0" style={{ color: '#134d75' }}>Cookie Preferences</h3>
          {onClose && (
            <button 
              type="button" 
              className="btn-close" 
              onClick={onClose}
              aria-label="Close"
            ></button>
          )}
        </div>

        <div className="card-body p-4">
          <p className="text-muted mb-4">
            We use cookies to enhance your experience. You can customize your preferences below.
            <Link to="/cookie-policy" className="ms-1" style={{ color: '#134d75', textDecoration: 'underline' }}> Learn more</Link>
          </p>

          <div className="mb-4">
            <div className="card mb-3 border">
              <div className="card-body">
                <div className="form-check d-flex align-items-start">
                  <input
                    className="form-check-input mt-1 me-3"
                    type="checkbox"
                    checked={preferences.necessary}
                    disabled
                    id="necessary-cookies"
                    style={{ width: '18px', height: '18px', cursor: 'not-allowed' }}
                  />
                  <label className="form-check-label flex-grow-1" htmlFor="necessary-cookies" style={{ cursor: 'default' }}>
                    <strong className="d-block mb-1">Necessary Cookies</strong>
                    <small className="text-muted d-block">
                      Required for the website to function. These cannot be disabled.
                    </small>
                  </label>
                </div>
              </div>
            </div>

            <div className="card mb-3 border">
              <div className="card-body">
                <div className="form-check d-flex align-items-start">
                  <input
                    className="form-check-input mt-1 me-3"
                    type="checkbox"
                    checked={preferences.analytics}
                    onChange={() => handlePreferenceChange('analytics')}
                    id="analytics-cookies"
                    style={{ width: '18px', height: '18px', cursor: 'pointer' }}
                  />
                  <label className="form-check-label flex-grow-1" htmlFor="analytics-cookies" style={{ cursor: 'pointer' }}>
                    <strong className="d-block mb-1">Analytics Cookies</strong>
                    <small className="text-muted d-block">
                      Help us understand how visitors interact with our website.
                    </small>
                  </label>
                </div>
              </div>
            </div>

            <div className="card mb-3 border">
              <div className="card-body">
                <div className="form-check d-flex align-items-start">
                  <input
                    className="form-check-input mt-1 me-3"
                    type="checkbox"
                    checked={preferences.functional}
                    onChange={() => handlePreferenceChange('functional')}
                    id="functional-cookies"
                    style={{ width: '18px', height: '18px', cursor: 'pointer' }}
                  />
                  <label className="form-check-label flex-grow-1" htmlFor="functional-cookies" style={{ cursor: 'pointer' }}>
                    <strong className="d-block mb-1">Functional Cookies</strong>
                    <small className="text-muted d-block">
                      Enable enhanced functionality like chat support.
                    </small>
                  </label>
                </div>
              </div>
            </div>

            <div className="card mb-3 border">
              <div className="card-body">
                <div className="form-check d-flex align-items-start">
                  <input
                    className="form-check-input mt-1 me-3"
                    type="checkbox"
                    checked={preferences.marketing}
                    onChange={() => handlePreferenceChange('marketing')}
                    id="marketing-cookies"
                    style={{ width: '18px', height: '18px', cursor: 'pointer' }}
                  />
                  <label className="form-check-label flex-grow-1" htmlFor="marketing-cookies" style={{ cursor: 'pointer' }}>
                    <strong className="d-block mb-1">Marketing Cookies</strong>
                    <small className="text-muted d-block">
                      Used for advertising and tracking purposes.
                    </small>
                  </label>
                </div>
              </div>
            </div>
          </div>

          <div className="d-flex gap-2 flex-wrap justify-content-end">
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
              onClick={handleSave} 
              className="btn btn-sm fw-bold"
              style={{ backgroundColor: '#134d75', color: '#fff', padding: '10px 20px' }}
            >
              Save Preferences
            </button>
            {onClose && (
              <button 
                onClick={onClose} 
                className="btn btn-secondary btn-sm fw-bold"
                style={{ padding: '10px 20px' }}
              >
                Cancel
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CookiePreferencesManager;

