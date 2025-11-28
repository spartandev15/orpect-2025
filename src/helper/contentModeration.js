/**
 * Content Moderation Helper for EEOC Compliance
 * Flags potentially discriminatory language in reviews and content
 */

// List of potentially discriminatory terms and phrases
const discriminatoryTerms = {
  race: [
    'race', 'ethnicity', 'color', 'national origin',
    'african', 'asian', 'hispanic', 'latino', 'caucasian', 'white', 'black',
    // Add more as needed
  ],
  gender: [
    'gender', 'sex', 'male', 'female', 'man', 'woman', 'pregnant',
    'maternity', 'paternity', 'transgender', 'lgbt', 'gay', 'lesbian',
    // Add more as needed
  ],
  religion: [
    'religion', 'religious', 'christian', 'muslim', 'jewish', 'hindu', 'buddhist',
    'church', 'mosque', 'temple', 'prayer', 'sabbath',
    // Add more as needed
  ],
  age: [
    'age', 'old', 'young', 'elderly', 'senior', 'millennial', 'gen z', 'boomer',
    'too old', 'too young', 'retirement',
    // Add more as needed
  ],
  disability: [
    'disabled', 'disability', 'handicapped', 'mental illness', 'depression',
    'anxiety', 'autism', 'adhd',
    // Add more as needed
  ],
};

// Phrases that indicate discrimination
const discriminatoryPhrases = [
  'because of their',
  'due to their',
  'based on their',
  'not suitable because',
  'too old to',
  'too young to',
  'doesn\'t fit our culture',
  'not the right fit',
  'doesn\'t match our values',
];

/**
 * Check if text contains potentially discriminatory language
 * @param {string} text - The text to check
 * @returns {Object} - Object with isDiscriminatory flag and details
 */
export const checkDiscriminatoryContent = (text) => {
  if (!text || typeof text !== 'string') {
    return { isDiscriminatory: false, flags: [], severity: 'none' };
  }

  const lowerText = text.toLowerCase();
  const flags = [];
  let severity = 'none';

  // Check for discriminatory terms
  Object.keys(discriminatoryTerms).forEach((category) => {
    discriminatoryTerms[category].forEach((term) => {
      const regex = new RegExp(`\\b${term}\\b`, 'gi');
      if (regex.test(lowerText)) {
        flags.push({
          category,
          term,
          type: 'term',
        });
        if (severity === 'none') severity = 'low';
      }
    });
  });

  // Check for discriminatory phrases
  discriminatoryPhrases.forEach((phrase) => {
    if (lowerText.includes(phrase.toLowerCase())) {
      flags.push({
        category: 'general',
        phrase,
        type: 'phrase',
      });
      severity = severity === 'none' ? 'medium' : 'high';
    }
  });

  // Check for negative context with protected characteristics
  const negativeWords = ['bad', 'poor', 'terrible', 'awful', 'worst', 'failed', 'incompetent'];
  const hasNegativeContext = negativeWords.some((word) => lowerText.includes(word));
  
  if (hasNegativeContext && flags.length > 0) {
    severity = 'high';
  }

  return {
    isDiscriminatory: flags.length > 0,
    flags,
    severity,
    message: flags.length > 0 
      ? 'This content may contain discriminatory language. Please review and ensure compliance with EEOC guidelines.'
      : null,
  };
};

/**
 * Validate review content for EEOC compliance
 * @param {string} reviewText - The review text to validate
 * @param {Object} options - Validation options
 * @returns {Object} - Validation result
 */
export const validateReviewContent = (reviewText, options = {}) => {
  const {
    strictMode = false,
    showWarnings = true,
  } = options;

  const checkResult = checkDiscriminatoryContent(reviewText);

  if (checkResult.isDiscriminatory) {
    if (strictMode) {
      return {
        valid: false,
        error: 'This review contains potentially discriminatory language and cannot be submitted. Please revise your review to focus on job-related performance and qualifications.',
        ...checkResult,
      };
    } else {
      return {
        valid: true,
        warning: showWarnings ? checkResult.message : null,
        ...checkResult,
      };
    }
  }

  return {
    valid: true,
    ...checkResult,
  };
};

/**
 * Get suggestions for improving review content
 * @param {string} reviewText - The review text
 * @returns {Array} - Array of suggestions
 */
export const getContentSuggestions = (reviewText) => {
  const suggestions = [];
  const checkResult = checkDiscriminatoryContent(reviewText);

  if (checkResult.isDiscriminatory) {
    suggestions.push({
      type: 'warning',
      message: 'Focus on job-related performance, skills, and qualifications rather than personal characteristics.',
    });

    if (checkResult.flags.some((f) => f.category === 'age')) {
      suggestions.push({
        type: 'info',
        message: 'Avoid references to age. Focus on experience, skills, and performance.',
      });
    }

    if (checkResult.flags.some((f) => f.category === 'gender')) {
      suggestions.push({
        type: 'info',
        message: 'Avoid gender-specific comments. Focus on professional capabilities.',
      });
    }

    if (checkResult.flags.some((f) => f.category === 'race')) {
      suggestions.push({
        type: 'info',
        message: 'Avoid references to race, ethnicity, or national origin. Focus on work performance.',
      });
    }
  }

  return suggestions;
};

export default {
  checkDiscriminatoryContent,
  validateReviewContent,
  getContentSuggestions,
};

