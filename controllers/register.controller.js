// controllers/register.controller.js

import jwt from 'jsonwebtoken';
import { sendMail } from '../models/emailTemplates.model.js';
import {hashPassword} from  '../middleweare/hash.password.js'

// Firebase Firestore
import db from '../config/firebase.admin.js';
import { collection, query, where, getDocs, addDoc, serverTimestamp } from 'firebase/firestore';

const JWT_SECRET = process.env.JWT_SECRET || 'secret123';

export const registerUser = async (req, res, next) => {
  try {
    const { email, password, name, dob, mobile } = req.body;

    console.log('Register attempt:', { email, name, dob, mobile });

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Email and password are required',
      });
    }

    // 🔍 Check if user already exists (by email)
    const usersRef = collection(db, 'ji_users');
    const q = query(usersRef, where('email', '==', email));
    const snapshot = await getDocs(q);

    if (!snapshot.empty) {
      return res.status(400).json({
        success: false,
        message: 'User already exists',
      });
    }
    const hashedPassword = await hashPassword(password);

    // 📧 Prepare email

   const emailData = {
        to: email,
        templateType: 'registration',
        variables: {
        full_name: 'Learn Node.js',
        email: '2017subodih2017@gmail.com',
        login_link: 'https://your-login-url.com'
       }
    };


    await sendMail(emailData);

    // 🔐 Save new user to Firestore
    const newUserDoc = await addDoc(usersRef, {
      email,
      password_hash: hashedPassword, // Make sure to hash it before production use!
      name: name || null,
      dob: dob || null,
      mobile: mobile || null,
      role: 'student',
      resetPasswordToken: null,
      resetPasswordExpires: null,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });

    // 🔑 Generate token
    const token = jwt.sign(
      { id: newUserDoc.id }, // Firestore doc ID
      JWT_SECRET,
      { expiresIn: '7d' }
    );

    return res.status(201).json({
      success: true,
      message: 'User registered successfully',
      token
    });
  } catch (error) {
    console.error('Registration Error:', error);
    return res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error.message
    });
  }
};
