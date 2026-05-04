/**
 * Cookie Management Utility
 * Handles enabling/disabling cookies and third-party scripts based on user consent
 */
import Cookies from 'js-cookie';

/**
 * Get current cookie preferences
 */
export const getCookiePreferences = () => {
  try {
    const saved = Cookies.get('cookiePreferences');
    if (saved) {
      return JSON.parse(saved);
    }
  } catch (e) {
    console.error('Error reading cookie preferences:', e);
  }
  return {
    necessary: true,
    analytics: false,
    marketing: false,
    functional: false,
  };
};

/**
 * Check if user has given consent
 */
export const hasConsent = () => {
  const consent = Cookies.get('cookieConsent');
  return consent === 'accepted' || consent === 'custom';
};

/**
 * Apply cookie preferences - enable/disable scripts based on preferences
 */
export const applyCookiePreferences = (preferences) => {
  // Always enable necessary cookies
  if (preferences.necessary !== false) {
    enableNecessaryCookies();
  }

  // Analytics cookies
  if (preferences.analytics) {
    enableAnalyticsCookies();
  } else {
    disableAnalyticsCookies();
  }

  // Marketing cookies
  if (preferences.marketing) {
    enableMarketingCookies();
  } else {
    disableMarketingCookies();
  }

  // Functional cookies
  if (preferences.functional) {
    enableFunctionalCookies();
  } else {
    disableFunctionalCookies();
  }
};

/**
 * Enable necessary cookies (always enabled)
 */
const enableNecessaryCookies = () => {
  // Necessary cookies are always enabled
  // These include session management, authentication, etc.
  console.log('Necessary cookies enabled');
};

/**
 * Enable analytics cookies and scripts
 */
const enableAnalyticsCookies = () => {
  // Enable Google Analytics if you have it
  if (typeof window.gtag !== 'undefined') {
    window.gtag('consent', 'update', {
      analytics_storage: 'granted'
    });
  }
  
  // You can add other analytics scripts here
  console.log('Analytics cookies enabled');
};

/**
 * Disable analytics cookies and scripts
 */
const disableAnalyticsCookies = () => {
  // Disable Google Analytics
  if (typeof window.gtag !== 'undefined') {
    window.gtag('consent', 'update', {
      analytics_storage: 'denied'
    });
  }
  
  // Clear analytics cookies
  clearCookiesByPattern(/^_ga|^_gid|^_gat/);
  console.log('Analytics cookies disabled');
};

/**
 * Enable marketing cookies and scripts
 */
const enableMarketingCookies = () => {
  // Enable marketing/advertising scripts
  // Example: Facebook Pixel, Google Ads, etc.
  console.log('Marketing cookies enabled');
};

/**
 * Disable marketing cookies and scripts
 */
const disableMarketingCookies = () => {
  // Disable marketing scripts
  // Clear marketing cookies
  clearCookiesByPattern(/^_fbp|^_fbc|^fr/);
  console.log('Marketing cookies disabled');
};

/**
 * Enable functional cookies and scripts
 */
const enableFunctionalCookies = () => {
  // Enable functional scripts like Tawk.to chat
  loadTawkToScript();
  console.log('Functional cookies enabled');
};

/**
 * Disable functional cookies and scripts
 */
const disableFunctionalCookies = () => {
  // Disable functional scripts
  removeTawkToScript();
  console.log('Functional cookies disabled');
};

/**
 * Load Tawk.to chat script
 */
const loadTawkToScript = () => {
  // Check if script already exists
  if (document.getElementById('tawk-script')) {
    return;
  }

  const script = document.createElement('script');
  script.id = 'tawk-script';
  script.src = 'https://embed.tawk.to/648719bacc26a871b0220a14/1h2nrp1bp';
  script.async = true;
  script.charset = 'UTF-8';
  script.setAttribute('crossorigin', '*');
  document.body.appendChild(script);
};

/**
 * Remove Tawk.to chat script
 */
const removeTawkToScript = () => {
  // Remove script element
  const script = document.getElementById('tawk-script');
  if (script) {
    script.remove();
  }

  // Hide Tawk.to widget if it exists
  if (window.Tawk_API) {
    window.Tawk_API.hideWidget();
  }

  // Clear Tawk.to cookies
  clearCookiesByPattern(/^Tawk/);
};

/**
 * Clear cookies matching a pattern
 */
const clearCookiesByPattern = (pattern) => {
  const cookies = document.cookie.split(';');
  cookies.forEach(cookie => {
    const cookieName = cookie.split('=')[0].trim();
    if (pattern.test(cookieName)) {
      // Clear cookie for current domain
      Cookies.remove(cookieName);
      // Clear cookie for root domain
      Cookies.remove(cookieName, { path: '/' });
      // Clear cookie for all subdomains
      const domain = window.location.hostname.split('.').slice(-2).join('.');
      Cookies.remove(cookieName, { domain: `.${domain}`, path: '/' });
    }
  });
};

/**
 * Initialize cookie management on page load
 */
export const initializeCookieManagement = () => {
  const consent = Cookies.get('cookieConsent');
  
  if (consent) {
    const preferences = getCookiePreferences();
    applyCookiePreferences(preferences);
  } else {
    // No consent yet - only enable necessary cookies
    applyCookiePreferences({
      necessary: true,
      analytics: false,
      marketing: false,
      functional: false,
    });
  }
};

/**
 * Save cookie preferences and apply them
 */
export const saveCookiePreferences = (preferences, consentType = 'custom') => {
  // Save preferences to cookie
  Cookies.set('cookieConsent', consentType, { expires: 365 });
  Cookies.set('cookiePreferences', JSON.stringify(preferences), { expires: 365 });
  Cookies.set('cookieConsentDate', new Date().toISOString(), { expires: 365 });
  
  // Apply preferences immediately
  applyCookiePreferences(preferences);
  
  // Dispatch custom event for other components to listen
  window.dispatchEvent(new CustomEvent('cookiePreferencesChanged', { 
    detail: preferences 
  }));
};

/**
 * Clear all non-necessary cookies
 */
export const clearAllNonNecessaryCookies = () => {
  disableAnalyticsCookies();
  disableMarketingCookies();
  disableFunctionalCookies();
};

/**
 * Get consent status
 */
export const getConsentStatus = () => {
  const consent = Cookies.get('cookieConsent');
  const preferences = getCookiePreferences();
  
  return {
    hasConsent: !!consent,
    consentType: consent || 'none',
    preferences,
    consentDate: Cookies.get('cookieConsentDate'),
  };
};

export default {
  getCookiePreferences,
  hasConsent,
  applyCookiePreferences,
  initializeCookieManagement,
  saveCookiePreferences,
  clearAllNonNecessaryCookies,
  getConsentStatus,
};

