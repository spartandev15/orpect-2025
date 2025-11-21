import React from "react";

/**
 * RenderIf Component - Conditional rendering component
 * @param {boolean} condition - The condition to check
 * @param {React.ReactNode} children - The content to render if condition is true
 * @param {React.ReactNode} fallback - Optional content to render if condition is false
 * @returns {React.ReactNode|null} - Renders children if condition is true, fallback if provided and condition is false, or null
 */
const RenderIf = ({ condition, children, fallback = null }) => {
  if (condition) {
    return <>{children}</>;
  }
  return fallback ? <>{fallback}</> : null;
};

export default RenderIf;

