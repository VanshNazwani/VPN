// routes/register.route.js
import express from 'express';
import { body, validationResult } from 'express-validator';
import { registerUser } from '../controllers/register.controller.js';

const router = express.Router();

/**
 * @route   POST /api/register
 * @desc    Register a new user (Firebase Firestore)
 * @access  Public
 */
router.post(
  '/register',
  [
    body('email')
      .isEmail().withMessage('Must be a valid email')
      .normalizeEmail(),
    body('password')
      .isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
    body('name')
      .optional().trim().escape(),
    body('dob')
      .optional().isISO8601().toDate(),
    body('mobile')
      .optional().isMobilePhone(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }

    // 🔁 Call Firebase-based controller
    try {
      return await registerUser(req, res);
    } catch (err) {
      console.error('Registration error:', err.message);
      return res.status(500).json({ success: false, message: 'Server Error' });
    }
  }
);

export default router;
