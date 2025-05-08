import { toast } from 'react-toastify';

// Error types
export const ErrorTypes = {
  NETWORK: 'NETWORK_ERROR',
  AUTH: 'AUTH_ERROR',
  VALIDATION: 'VALIDATION_ERROR',
  SERVER: 'SERVER_ERROR',
  UNKNOWN: 'UNKNOWN_ERROR'
};

// Error messages
const ErrorMessages = {
  [ErrorTypes.NETWORK]: 'Network error. Please check your connection.',
  [ErrorTypes.AUTH]: 'Authentication error. Please login again.',
  [ErrorTypes.VALIDATION]: 'Please check your input and try again.',
  [ErrorTypes.SERVER]: 'Server error. Please try again later.',
  [ErrorTypes.UNKNOWN]: 'An unexpected error occurred. Please try again.'
};

// Handle API errors
export const handleApiError = (error) => {
  // Log error
  console.error('API Error:', error);

  // Determine error type
  let errorType = ErrorTypes.UNKNOWN;
  let errorMessage = error.message;

  if (!error.response) {
    errorType = ErrorTypes.NETWORK;
  } else if (error.response.status === 401) {
    errorType = ErrorTypes.AUTH;
  } else if (error.response.status === 422) {
    errorType = ErrorTypes.VALIDATION;
  } else if (error.response.status >= 500) {
    errorType = ErrorTypes.SERVER;
  }

  // Get user friendly message
  const userMessage = error.response?.data?.message || ErrorMessages[errorType];

  // Show toast
  toast.error(userMessage);

  return {
    type: errorType,
    message: userMessage,
    originalError: error
  };
};

// Handle general errors
export const handleError = (error, context = '') => {
  // Log error with context
  console.error(`Error in ${context}:`, error);

  // Show toast
  toast.error('An unexpected error occurred. Please try again.');

  return {
    type: ErrorTypes.UNKNOWN,
    message: error.message,
    context,
    originalError: error
  };
};

// Handle validation errors
export const handleValidationError = (errors) => {
  // Log validation errors
  console.error('Validation Errors:', errors);

  // Show first error in toast
  const firstError = Object.values(errors)[0];
  if (firstError) {
    toast.error(firstError);
  }

  return {
    type: ErrorTypes.VALIDATION,
    errors
  };
}; 