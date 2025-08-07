import bcrypt from 'bcryptjs';

/**
 * Validates a plain password against a hashed password
 * @param {string} plainPassword - Password user entered (e.g., from login form)
 * @param {string} hashedPassword - Password stored in the database
 * @returns {boolean} - true if matched, false otherwise
 */
export const validatePassword = async (plainPassword, hashedPassword) => {
  const isMatch = await bcrypt.compare(plainPassword, hashedPassword);
  return isMatch;
};
