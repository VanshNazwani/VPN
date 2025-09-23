// import jwt from 'jsonwebtoken';
// import { cookies } from 'next/headers';

// export function generateToken(payload) {
//   return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '7d' });
// }

// export function verifyToken(token) {
//   try {
//     return jwt.verify(token, process.env.JWT_SECRET);
//   } catch (error) {
//     return null;
//   }
// }

// export async function getCurrentUser() {
//   try {
//     const cookieStore = cookies();
//     const token = cookieStore.get('auth-token');

//     if (!token) return null;

//     const decoded = verifyToken(token.value);
//     return decoded;
//   } catch (error) {
//     return null;
//   }
// }



import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';
import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '@/lib/firebase';

export function generateToken(payload) {
  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '7d' });
}

export function verifyToken(token) {
  try {
    return jwt.verify(token, process.env.JWT_SECRET);
  } catch (error) {
    return null;
  }
}

export async function getCurrentUser() {
  try {
    const cookieStore = cookies();
    const token = cookieStore.get('auth-token');

    if (!token) return null;

    const decoded = verifyToken(token.value);
    return decoded;
  } catch (error) {
    return null;
  }
}

// export async function sendPasswordResetEmailToUser(email) {
//   try {
//     await sendPasswordResetEmail(auth, email);
//     return { success: true };
//   } catch (error) {
//     console.error('Error sending password reset email:', error);

//     let errorMessage = 'Failed to send password reset email';

//     if (error.code === 'auth/user-not-found') {
//       errorMessage = 'No account found with this email address';
//     } else if (error.code === 'auth/too-many-requests') {
//       errorMessage = 'Too many requests. Please wait before trying again';
//     } else if (error.code === 'auth/invalid-email') {
//       errorMessage = 'Invalid email address';
//     }

//     return { success: false, error: errorMessage };
//   }
// }

export async function sendPasswordResetEmailToUser(email) {
  try {
    await sendPasswordResetEmail(auth, email);
    return { success: true };
  } catch (error) {
    console.error('Error sending password reset email:', error);

    let errorMessage = 'Failed to send password reset email';

    if (error.code === 'auth/user-not-found') {
      errorMessage = 'No account found with this email address';
    } else if (error.code === 'auth/too-many-requests') {
      errorMessage = 'Too many requests. Please wait before trying again';
    } else if (error.code === 'auth/invalid-email') {
      errorMessage = 'Invalid email address';
    }

    return { success: false, error: errorMessage };
  }
}