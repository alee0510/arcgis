import {ZodError} from 'zod';

/**
 * Formats Zod validation errors into a user-friendly message
 * @param error - The ZodError object
 * @param joinWith - String to join multiple error messages (default: ', ')
 * @returns A formatted error message string
 */
export const formatZodError = (
  error: ZodError,
  joinWith: string = ', ',
): string => {
  return error.issues.map(issue => issue.message).join(joinWith);
};

/**
 * Formats Zod validation errors into field-specific error object
 * @param error - The ZodError object
 * @returns An object with field names as keys and error messages as values
 */
export const formatZodErrorByField = (
  error: ZodError,
): Record<string, string> => {
  const fieldErrors: Record<string, string> = {};

  error.issues.forEach(issue => {
    const fieldName = issue.path.join('.');
    fieldErrors[fieldName] = issue.message;
  });

  return fieldErrors;
};

/**
 * Gets the first error message from a ZodError
 * @param error - The ZodError object
 * @returns The first error message or empty string
 */
export const getFirstZodError = (error: ZodError): string => {
  return error.issues[0]?.message || '';
};
