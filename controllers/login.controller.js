// controllers/auth.controller.js

import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import { sendMail } from '../models/emailTemplates.model.js';
import db from '../config/firebase.admin.js';
import {validatePassword} from '../middleweare/validate.password.js';

import {
  collection,
  query,
  where,
  getDocs,
  updateDoc,
  doc,
  Timestamp
} from 'firebase/firestore';

dotenv.config();

// Env vars
const JWT_SECRET = process.env.JWT_SECRET || 'default_jwt_secret';
const JWT_RESET_SECRET = process.env.JWT_RESET_SECRET || 'default_reset_secret';
const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:4000';

/**
 * ==================================
 * 1) LOGIN CONTROLLER
 * ==================================
 */
export async function login(req, res) {
  try {
    const { email, password } = req.body;

    if (!email || !password)
      return res.status(400).json({ error: 'Email and password are required.' });

    const usersRef = collection(db, 'ji_users');
    const q = query(usersRef, where('email', '==', email.toLowerCase()));
    const snapshot = await getDocs(q);

    if (snapshot.empty)
      return res.status(400).json({ error: 'Invalid credentials.' });

    const userDoc = snapshot.docs[0];
    const user = userDoc.data();

    const isMatch = await validatePassword(password, user.password_hash);
    if (!isMatch)
      return res.status(400).json({ error: 'Invalid credentials.' });

    const token = jwt.sign({ userId: userDoc.id }, JWT_SECRET, { expiresIn: '7d' });

    return res.status(200).json({
      token,
      user: {
        id: userDoc.id,
        email: user.email,
        role: user.role || 'student',
        name: user.name || ''
      }
    });

  } catch (err) {
    console.error('Login error:', err);
    return res.status(500).json({ error: 'Server error.' });
  }
}

/**
 * ==================================
 * 2) REQUEST PASSWORD RESET
 * ==================================
 */
export async function requestPasswordReset(req, res) {
  try {
    const { email } = req.body;

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      return res.status(400).json({ error: 'Valid email is required.' });

    const genericResponse = {
      message: 'If that email is registered, you will receive a reset link shortly.'
    };

    const usersRef = collection(db, 'ji_users');
    const q = query(usersRef, where('email', '==', email.toLowerCase()));
    const snapshot = await getDocs(q);

    if (snapshot.empty)
      return res.status(200).json(genericResponse); // Do not reveal

    const userDoc = snapshot.docs[0];
    const resetToken = jwt.sign(
      { userId: userDoc.id },
      JWT_RESET_SECRET,
      { expiresIn: '1h' }
    );

    const userRef = doc(db, 'ji_users', userDoc.id);
    await updateDoc(userRef, {
      resetPasswordToken: resetToken,
      resetPasswordExpires: Timestamp.fromDate(new Date(Date.now() + 3600_000))
    });

    const resetLink = `${FRONTEND_URL}/reset-password?token=${resetToken}`;
    const user = userDoc.data();

    const variables = {
      full_name: user.name || 'User',
      reset_password_link: resetLink,
      email: user.email
    };

    await sendMail({
      to: user.email,
      templateType: 'reset_password',
      variables
    });

    return res.status(200).json(genericResponse);

  } catch (err) {
    console.error('requestPasswordReset error:', err);
    return res.status(500).json({ error: 'Unable to process request.' });
  }
}

/**
 * ==================================
 * 3) RESET PASSWORD
 * ==================================
 */
export async function resetPassword(req, res) {
  try {
    const { token, newPassword } = req.body;

    if (!token || !newPassword)
      return res.status(400).json({ error: 'Token and new password are required.' });

    const payload = jwt.verify(token, JWT_RESET_SECRET);

    const userRef = doc(db, 'ji_users', payload.userId);
    const snapshot = await getDocs(query(collection(db, 'ji_users'), where('__name__', '==', payload.userId)));

    if (snapshot.empty)
      return res.status(400).json({ error: 'Invalid or expired token.' });

    const userDoc = snapshot.docs[0];
    const user = userDoc.data();

    if (
      user.resetPasswordToken !== token ||
      (user.resetPasswordExpires?.toMillis?.() || 0) < Date.now()
    ) {
      return res.status(400).json({ error: 'Token has expired or is invalid.' });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    await updateDoc(userRef, {
      password_hash: hashedPassword,
      resetPasswordToken: null,
      resetPasswordExpires: null,
      updatedAt: Timestamp.now()
    });

    return res.json({ message: 'Password has been reset successfully.' });

  } catch (err) {
    console.error('resetPassword error:', err);
    return res.status(400).json({ error: err.message });
  }
}
