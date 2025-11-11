/**
 * Route Configuration
 * 
 * This file centralizes all route paths for the application.
 * Use these constants instead of hardcoding route strings throughout the app.
 * 
 * Route Categories:
 * - Public Routes: Accessible without authentication
 * - Company Routes: Protected routes for company users
 * - Admin Routes: Protected routes for super admin users
 * - Employee Routes: Routes for employee dashboard
 * 
 * Environment Variables:
 * - REACT_APP_BASE_PATH: Override the default base path (default: '/orpect')
 */

// ============================================
// BASE PATH CONFIGURATION
// ============================================
// Default base path for the application
const DEFAULT_BASE_PATH = '/orpect';

// Get base path from environment variable or use default
export const BASE_PATH = process.env.REACT_APP_BASE_PATH || DEFAULT_BASE_PATH;

// Ensure base path starts with '/' and doesn't end with '/'
export const BASE_PATH_CLEAN = BASE_PATH.startsWith('/') 
  ? (BASE_PATH.endsWith('/') ? BASE_PATH.slice(0, -1) : BASE_PATH)
  : `/${BASE_PATH}`;

// Export for use in Router basename
export const ROUTER_BASENAME = BASE_PATH_CLEAN;

// ============================================
// PUBLIC ROUTES (No Authentication Required)
// ============================================
export const PUBLIC_ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  SIGNUP: '/signup',
  FORGET_PASSWORD: '/forget-password',
  RESET_PASSWORD: '/reset-password',
  VERIFICATION: '/verification',
  ABOUT_US: '/about-us',
  CONTACT_US: '/contact-us',
  FAQS: '/faqs',
  COMMUNITY_GUIDELINES: '/community-guidlines',
  PRIVACY_POLICY: '/privacy-policy',
  TERMS_OF_USE: '/terms-of-use',
  BLOG: '/blog',
  JOIN_ORPECT_PLUS: '/join-orpect-plus',
  DATA_REQUEST_FORM: '/data-request-form',
  ERROR_404: '/404',
};

// ============================================
// COMPANY ROUTES (Protected - Regular Users)
// ============================================
export const COMPANY_ROUTES = {
  DASHBOARD: '/dashboard',
  PROFILE: '/profile',
  UPDATE_PASSWORD: '/update-password',
  
  // Employee Management
  EMPLOYEE_LIST: '/employee',
  ADD_EMPLOYEE: '/add-employee',
  VIEW_EMPLOYEE: '/view-employee/:id',
  VIEW_EX_EMPLOYEE: '/view-exemployee/:id',
  VIEW_NON_JOINER: '/view-nonjoiner/:id',
  CURRENT_EMPLOYEE: '/current-employee',
  EX_EMPLOYEE: '/ex-employee',
  NON_JOINER: '/non-joiner',
  SEARCH_EMPLOYEE: '/search-employee',
  
  // Reviews
  ADD_REVIEW: '/add-review',
  ADD_EX_EMPLOYEE_REVIEW: '/add-exemployee-review',
  ADD_NON_JOINER_REVIEW: '/add-nonjoiner-review',
  EMPLOYEE_REVIEW: '/employee-review/:id',
  PREVIOUS_REVIEW: '/previous-review',
  
  // Other
  ADD_POSITION: '/add-position',
  UPLOAD_CSV: '/upload-csv',
  IMPORT_EXPORT: '/import-export',
};

// ============================================
// ADMIN ROUTES (Protected - Super Admin)
// ============================================
export const ADMIN_ROUTES = {
  // Base path
  BASE: '/super-admin',
  
  // Authentication
  LOGIN: '/super-admin/login',
  
  // Dashboard
  DASHBOARD: '/super-admin/dashboard',
  
  // User Management
  USER: '/super-admin/user',
  ADD_USER: '/super-admin/adduser',
  VIEW_USER: '/super-admin/viewuser/:id',
  
  // Company Management
  COMPANIES: '/super-admin/companies',
  ADD_COMPANY: '/super-admin/addcompany',
  VIEW_COMPANY: '/super-admin/viewcompany/:id',
  COMPANY_REVIEWS: '/super-admin/company-reviews',
  
  // Employee Management
  CURRENT_EMPLOYEE: '/super-admin/currentEmployee/:id',
  EX_EMPLOYEE: '/super-admin/exEmployee/:id',
  NON_JOINER: '/super-admin/nonJoiner/:id',
  
  // Profile & Settings
  PROFILE: '/super-admin/profile',
  UPDATE_PASSWORD: '/super-admin/updatepassword',
  
  // Other
  NOTIFICATION_LIST: '/super-admin/notification-list',
  DATA_REQUEST: '/super-admin/data-request',
};

// ============================================
// EMPLOYEE ROUTES (Employee Dashboard)
// ============================================
export const EMPLOYEE_ROUTES = {
  SIGNUP: '/employee-signup',
  DASHBOARD: '/employee-dashboard',
  TOTAL_REVIEWS: '/total-reviews',
  COMPANY_DETAIL: '/company-detail',
  COMPANY_REVIEW: '/company-review',
};

// ============================================
// HELPER FUNCTIONS
// ============================================

/**
 * Replace route parameters with actual values
 * @param {string} route - Route path with parameters (e.g., '/view-employee/:id')
 * @param {object} params - Object with parameter values (e.g., { id: '123' })
 * @returns {string} - Route path with replaced parameters
 * 
 * @example
 * replaceRouteParams(COMPANY_ROUTES.VIEW_EMPLOYEE, { id: '123' })
 * // Returns: '/view-employee/123'
 */
export const replaceRouteParams = (route, params = {}) => {
  let result = route;
  Object.keys(params).forEach(key => {
    result = result.replace(`:${key}`, params[key]);
  });
  return result;
};

/**
 * Get full route path with base path prefix
 * @param {string} route - Route path (e.g., '/dashboard')
 * @returns {string} - Full route path with base path (e.g., '/orpect/dashboard')
 * 
 * @example
 * getFullRoute(COMPANY_ROUTES.DASHBOARD)
 * // Returns: '/orpect/dashboard'
 */
export const getFullRoute = (route) => {
  // Don't add base path to routes that already include it or are absolute URLs
  if (route.startsWith('http://') || route.startsWith('https://')) {
    return route;
  }
  
  // Ensure route starts with '/'
  const cleanRoute = route.startsWith('/') ? route : `/${route}`;
  
  // Combine base path with route
  return `${BASE_PATH_CLEAN}${cleanRoute}`;
};

/**
 * Get admin route with base path
 * @param {string} path - Route path relative to admin base
 * @returns {string} - Full admin route path
 * 
 * @example
 * getAdminRoute('dashboard') // Returns: '/super-admin/dashboard'
 */
export const getAdminRoute = (path) => {
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;
  return `${ADMIN_ROUTES.BASE}/${cleanPath}`;
};

/**
 * Get company route
 * @param {string} path - Route path
 * @returns {string} - Full company route path
 */
export const getCompanyRoute = (path) => {
  return path.startsWith('/') ? path : `/${path}`;
};

/**
 * Get employee route
 * @param {string} path - Route path
 * @returns {string} - Full employee route path
 */
export const getEmployeeRoute = (path) => {
  return path.startsWith('/') ? path : `/${path}`;
};

// ============================================
// ROUTE GROUPS (For easier imports)
// ============================================
export const ROUTES = {
  PUBLIC: PUBLIC_ROUTES,
  COMPANY: COMPANY_ROUTES,
  ADMIN: ADMIN_ROUTES,
  EMPLOYEE: EMPLOYEE_ROUTES,
};

export default ROUTES;

