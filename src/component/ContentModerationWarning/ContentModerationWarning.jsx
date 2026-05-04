import React, { useState, useEffect } from 'react';
import { validateReviewContent, getContentSuggestions } from '../../helper/contentModeration';
import { toast } from 'react-toastify';

/**
 * Content Moderation Warning Component
 * Displays warnings for potentially discriminatory content in reviews
 * For EEOC compliance
 */
const ContentModerationWarning = ({ 
  reviewText, 
  onValidationChange,
  strictMode = false,
  showSuggestions = true 
}) => {
  const [validationResult, setValidationResult] = useState(null);
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    if (!reviewText || reviewText.trim().length === 0) {
      setValidationResult(null);
      setSuggestions([]);
      if (onValidationChange) {
        onValidationChange({ valid: true, hasWarnings: false });
      }
      return;
    }

    const result = validateReviewContent(reviewText, { strictMode, showWarnings: true });
    setValidationResult(result);

    if (showSuggestions && result.isDiscriminatory) {
      const contentSuggestions = getContentSuggestions(reviewText);
      setSuggestions(contentSuggestions);
    } else {
      setSuggestions([]);
    }

    if (onValidationChange) {
      onValidationChange({
        valid: result.valid,
        hasWarnings: result.isDiscriminatory,
        severity: result.severity,
      });
    }
  }, [reviewText, strictMode, showSuggestions, onValidationChange]);

  if (!validationResult || !validationResult.isDiscriminatory) {
    return null;
  }

  const getSeverityClass = () => {
    switch (validationResult.severity) {
      case 'high':
        return 'alert-danger';
      case 'medium':
        return 'alert-warning';
      case 'low':
        return 'alert-info';
      default:
        return 'alert-warning';
    }
  };

  return (
    <div className={`alert ${getSeverityClass()} mt-2`} role="alert">
      <strong>
        <i className="fas fa-exclamation-triangle me-2"></i>
        Content Moderation Warning
      </strong>
      <p className="mb-2 mt-2">
        {validationResult.message || 
          'This review may contain potentially discriminatory language. Please ensure your review focuses on job-related performance and qualifications, not personal characteristics protected by EEOC regulations.'}
      </p>
      
      {!validationResult.valid && (
        <p className="mb-2 text-danger">
          <strong>This review cannot be submitted until the content is revised.</strong>
        </p>
      )}

      {showSuggestions && suggestions.length > 0 && (
        <div className="mt-2">
          <strong>Suggestions:</strong>
          <ul className="mb-0 mt-2">
            {suggestions.map((suggestion, index) => (
              <li key={index}>{suggestion.message}</li>
            ))}
          </ul>
        </div>
      )}

      <div className="mt-2">
        <small>
          <strong>Protected Characteristics:</strong> Race, color, religion, sex (including pregnancy, 
          gender identity, and sexual orientation), national origin, age (40 or older), disability, 
          or genetic information.
        </small>
      </div>
    </div>
  );
};

export default ContentModerationWarning;

