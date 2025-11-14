/**
 * API Configuration
 * 
 * This file centralizes all API-related configuration.
 * You can override the base URL using environment variables.
 * 
 * Environment Variables:
 * - REACT_APP_API_BASE_URL: Override the default API base URL
 * - REACT_APP_IMAGE_BASE_URL: Override the default image base URL
 */

// Default API base URL
const DEFAULT_API_BASE_URL = "https://spartanbots.xyz/borpact/public/api";

// Default Image base URL
const DEFAULT_IMAGE_BASE_URL = "https://spartanbots.xyz/borpact/public";

// Get API base URL from environment variable or use default
export const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || DEFAULT_API_BASE_URL;

// Get Image base URL from environment variable or use default
export const IMAGE_BASE_URL = process.env.REACT_APP_IMAGE_BASE_URL || DEFAULT_IMAGE_BASE_URL;

// Ensure the URL doesn't have a trailing slash
export const BASE_URL = API_BASE_URL.endsWith('/') 
  ? API_BASE_URL.slice(0, -1) 
  : API_BASE_URL;

// Ensure Image base URL has a trailing slash for proper concatenation
export const IMAGE_BASE_URL_WITH_SLASH = IMAGE_BASE_URL.endsWith('/') 
  ? IMAGE_BASE_URL 
  : `${IMAGE_BASE_URL}/`;

// Export with trailing slash for cases where it's needed
export const BASE_URL_WITH_SLASH = `${BASE_URL}/`;

// API Configuration object
export const API_CONFIG = {
  baseURL: BASE_URL,
  baseUrl: BASE_URL, // Alias for compatibility
  timeout: 30000, // 30 seconds
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
};

export default API_CONFIG;

