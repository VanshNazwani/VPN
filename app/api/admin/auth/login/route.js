// // // import { NextResponse } from 'next/server';
// // // import { collection, query, where, getDocs } from 'firebase/firestore';
// // // import { db } from '@/lib/firebase';
// // // import bcrypt from 'bcryptjs';
// // // import { generateToken } from '@/lib/auth';

// // // export async function POST(request) {
// // //   try {
// // //     const { email, password } = await request.json();

// // //     // Verify Cloudflare Turnstile
// // //     // const turnstileResponse = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
// // //     //   method: 'POST',
// // //     //   headers: {
// // //     //     'Content-Type': 'application/x-www-form-urlencoded',
// // //     //   },
// // //     //   body: `secret=${process.env.TURNSTILE_SECRET_KEY}&response=${turnstileToken}`,
// // //     // });

// // //     // const turnstileResult = await turnstileResponse.json();
// // //     // if (!turnstileResult.success) {
// // //     //   return NextResponse.json(
// // //     //     { message: 'Turnstile verification failed' },
// // //     //     { status: 400 }
// // //     //   );
// // //     // }

// // //     // Find admin in admins collection
// // //     const adminsRef = collection(db, 'admins');
// // //     const q = query(adminsRef, where('email', '==', email));
// // //     const querySnapshot = await getDocs(q);

// // //     if (querySnapshot.empty) {
// // //       return NextResponse.json(
// // //         { message: 'Invalid admin credentials' },
// // //         { status: 401 }
// // //       );
// // //     }

// // //     const adminDoc = querySnapshot.docs[0];
// // //     const adminData = adminDoc.data();

// // //     // Check if admin is verified
// // //     if (!adminData.isVerified) {
// // //       return NextResponse.json(
// // //         { message: 'Admin account not verified' },
// // //         { status: 401 }
// // //       );
// // //     }

// // //     // Verify password
// // //     const isPasswordValid = await bcrypt.compare(password, adminData.password);
// // //     if (!isPasswordValid) {
// // //       return NextResponse.json(
// // //         { message: 'Invalid admin credentials' },
// // //         { status: 401 }
// // //       );
// // //     }

// // //     // Generate JWT token
// // //     const token = generateToken({
// // //       userId: adminDoc.id,
// // //       email: adminData.email,
// // //       fullName: adminData.fullName,
// // //       role: 'admin',
// // //     });

// // //     // Remove password from admin data
// // //     const { password: _, ...adminWithoutPassword } = adminData;

// // //     return NextResponse.json({
// // //       message: 'Admin login successful',
// // //       token,
// // //       user: {
// // //         id: adminDoc.id,
// // //         ...adminWithoutPassword,
// // //       },
// // //     });
// // //   } catch (error) {
// // //     console.error('Admin login error:', error);
// // //     return NextResponse.json(
// // //       { message: 'Internal server error' },
// // //       { status: 500 }
// // //     );
// // //   }
// // // }
// // import { signInWithEmailAndPassword } from 'firebase/auth';
// // import { doc, getDoc, collection, addDoc } from 'firebase/firestore';
// // import { auth, db } from '@/lib/firebase';
// // import { generateToken } from '@/lib/auth';
// // import { cookies } from 'next/headers';
// // import nodemailer from 'nodemailer';

// // export async function POST(request) {
// //   try {
// //     const { email, password, turnstileToken } = await request.json();

// //     console.log('Admin login attempt for:', email);

// //     // Validate input
// //     if (!email || !password || !turnstileToken) {
// //       return Response.json(
// //         { message: 'Missing required fields' },
// //         { status: 400 }
// //       );
// //     }

// //     // Verify Cloudflare Turnstile
// //     const turnstileResponse = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
// //       method: 'POST',
// //       headers: {
// //         'Content-Type': 'application/x-www-form-urlencoded',
// //       },
// //       body: `secret=${process.env.TURNSTILE_SECRET_KEY}&response=${turnstileToken}`,
// //     });

// //     const turnstileResult = await turnstileResponse.json();
// //     if (!turnstileResult.success) {
// //       console.log('Turnstile verification failed:', turnstileResult);
// //       return Response.json(
// //         { message: 'Verification failed. Please try again.' },
// //         { status: 400 }
// //       );
// //     }

// //     // Authenticate with Firebase Auth
// //     let firebaseUser;
// //     try {
// //       const userCredential = await signInWithEmailAndPassword(auth, email, password);
// //       firebaseUser = userCredential.user;
// //       console.log('Firebase Auth successful for admin:', firebaseUser.uid);
// //     } catch (firebaseError) {
// //       console.error('Firebase Auth error:', firebaseError);
// //       let errorMessage = 'Invalid email or password';

// //       if (firebaseError.code === 'auth/user-not-found') {
// //         errorMessage = 'No admin account found with this email';
// //       } else if (firebaseError.code === 'auth/wrong-password') {
// //         errorMessage = 'Incorrect password';
// //       } else if (firebaseError.code === 'auth/user-disabled') {
// //         errorMessage = 'This admin account has been disabled';
// //       } else if (firebaseError.code === 'auth/too-many-requests') {
// //         errorMessage = 'Too many failed attempts. Please try again later';
// //       }

// //       return Response.json(
// //         { message: errorMessage },
// //         { status: 401 }
// //       );
// //     }

// //     // Get admin data from Firestore
// //     const adminDoc = await getDoc(doc(db, 'admins', firebaseUser.uid));
// //     if (!adminDoc.exists()) {
// //       console.error('Admin document not found in Firestore');
// //       return Response.json(
// //         { message: 'Admin data not found' },
// //         { status: 404 }
// //       );
// //     }

// //     const adminData = adminDoc.data();

// //     // Check if admin is verified
// //     if (!adminData.isVerified) {
// //       return Response.json(
// //         { message: 'Please verify your email before logging in' },
// //         { status: 401 }
// //       );
// //     }

// //     // Check if admin is active
// //     if (!adminData.isActive) {
// //       return Response.json(
// //         { message: 'Admin account has been deactivated' },
// //         { status: 401 }
// //       );
// //     }

// //     // Generate OTP for secure admin login
// //     const otp = Math.floor(100000 + Math.random() * 900000).toString();
// //     const otpExpiry = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

// //     // Store OTP for verification
// //     await addDoc(collection(db, 'adminLoginOtpStore'), {
// //       email,
// //       otp,
// //       expiryAt: otpExpiry,
// //       firebaseUid: firebaseUser.uid,
// //       createdAt: new Date(),
// //     });

// //     // Send OTP email
// //     const transporter = nodemailer.createTransport({
// //       service: 'gmail',
// //       auth: {
// //         user: process.env.EMAIL_USER,
// //         pass: process.env.EMAIL_PASS,
// //       },
// //     });

// //     await transporter.sendMail({
// //       from: process.env.EMAIL_USER,
// //       to: email,
// //       subject: 'Admin Login Verification - VPN Academy',
// //       html: `
// //         <div style="max-width: 600px; margin: 0 auto; padding: 20px; font-family: Arial, sans-serif;">
// //           <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 40px 20px; text-align: center;">
// //             <h1 style="color: white; margin: 0; font-size: 28px;">VPN Academy Admin</h1>
// //             <p style="color: rgba(255,255,255,0.9); margin: 10px 0 0 0; font-size: 16px;">Login Verification</p>
// //           </div>
          
// //           <div style="padding: 40px 20px; background-color: #f8f9fa;">
// //             <h2 style="color: #333; margin-top: 0;">Hello ${adminData.fullName},</h2>
            
// //             <p style="color: #666; line-height: 1.6;">
// //               A login attempt was made to your admin account. Please use the OTP below to complete the login:
// //             </p>
            
// //             <div style="background: white; padding: 20px; text-align: center; margin: 20px 0;">
// //               <h1 style="color: #667eea; font-size: 32px; letter-spacing: 2px; margin: 0;">${otp}</h1>
// //             </div>
            
// //             <p style="color: #666; line-height: 1.6;">
// //               This OTP is valid for 10 minutes.
// //             </p>
            
// //             <div style="background: #e7f3ff; padding: 15px; border-radius: 8px; margin: 20px 0;">
// //               <p style="color: #0066cc; margin: 0; font-size: 14px;">
// //                 <strong>Security Note:</strong> If this wasn't you, please contact support immediately.
// //               </p>
// //             </div>
            
// //             <p style="color: #666; line-height: 1.6;">
// //               Best regards,<br>
// //               <strong>The VPN Academy Team</strong>
// //             </p>
// //           </div>
          
// //           <div style="background: #333; padding: 20px; text-align: center;">
// //             <p style="color: #999; margin: 0; font-size: 12px;">
// //               © 2024 VPN Academy. All rights reserved.
// //             </p>
// //           </div>
// //         </div>
// //       `
// //     });

// //     return Response.json({
// //       message: 'OTP sent to your email for verification',
// //       requiresOTP: true,
// //     });
// //   } catch (error) {
// //     console.error('Admin login error:', error);
// //     return Response.json(
// //       { message: 'Internal server error' },
// //       { status: 500 }
// //     );
// //   }
// // }

// import { signInWithEmailAndPassword } from 'firebase/auth';
// import { doc, getDoc, collection, addDoc } from 'firebase/firestore';
// import { auth, db } from '@/lib/firebase';
// import { generateToken } from '@/lib/auth';
// import { cookies } from 'next/headers';
// import nodemailer from 'nodemailer';

// export async function POST(request) {
//   try {
//     const { email, password, turnstileToken } = await request.json();

//     console.log('Admin login attempt for:', email);

//     // Validate input
//     if (!email || !password || !turnstileToken) {
//       return Response.json(
//         { message: 'Missing required fields' },
//         { status: 400 }
//       );
//     }

//     // Verify Cloudflare Turnstile
//     const turnstileResponse = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/x-www-form-urlencoded',
//       },
//       body: `secret=${process.env.TURNSTILE_SECRET_KEY}&response=${turnstileToken}`,
//     });

//     const turnstileResult = await turnstileResponse.json();
//     if (!turnstileResult.success) {
//       console.log('Turnstile verification failed:', turnstileResult);
//       return Response.json(
//         { message: 'Verification failed. Please try again.' },
//         { status: 400 }
//       );
//     }

//     // Authenticate with Firebase Auth
//     let firebaseUser;
//     try {
//       const userCredential = await signInWithEmailAndPassword(auth, email, password);
//       firebaseUser = userCredential.user;
//       console.log('Firebase Auth successful for admin:', firebaseUser.uid);
//     } catch (firebaseError) {
//       console.error('Firebase Auth error:', firebaseError);
//       let errorMessage = 'Invalid email or password';

//       if (firebaseError.code === 'auth/user-not-found') {
//         errorMessage = 'No admin account found with this email';
//       } else if (firebaseError.code === 'auth/wrong-password') {
//         errorMessage = 'Incorrect password';
//       } else if (firebaseError.code === 'auth/user-disabled') {
//         errorMessage = 'This admin account has been disabled';
//       } else if (firebaseError.code === 'auth/too-many-requests') {
//         errorMessage = 'Too many failed attempts. Please try again later';
//       }

//       return Response.json(
//         { message: errorMessage },
//         { status: 401 }
//       );
//     }

//     // Get admin data from Firestore using Firebase Auth UID as document ID
//     const adminDoc = await getDoc(doc(db, 'admins', firebaseUser.uid));
//     if (!adminDoc.exists()) {
//       console.error('Admin document not found in Firestore for UID:', firebaseUser.uid);
//       return Response.json(
//         { message: 'Admin data not found. Please contact support.' },
//         { status: 404 }
//       );
//     }

//     const adminData = adminDoc.data();
//     console.log('Admin data found:', { email: adminData.email, isVerified: adminData.isVerified, isActive: adminData.isActive });

//     // Check if admin is verified
//     if (!adminData.isVerified) {
//       return Response.json(
//         { message: 'Please verify your email before logging in' },
//         { status: 401 }
//       );
//     }

//     // Check if admin is active
//     if (!adminData.isActive) {
//       return Response.json(
//         { message: 'Admin account has been deactivated' },
//         { status: 401 }
//       );
//     }

//     // Check if admin needs to change temporary password
//     const requiresPasswordChange = adminData.hasTemporaryPassword || false;

//     // Generate OTP for secure admin login
//     const otp = Math.floor(100000 + Math.random() * 900000).toString();
//     const otpExpiry = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

//     // Store OTP for verification
//     await addDoc(collection(db, 'adminLoginOtpStore'), {
//       email,
//       otp,
//       expiryAt: otpExpiry,
//       firebaseUid: firebaseUser.uid,
//       createdAt: new Date(),
//     });

//     // Send OTP email
//     const transporter = nodemailer.createTransport({
//       service: 'gmail',
//       auth: {
//         user: process.env.EMAIL_USER,
//         pass: process.env.EMAIL_PASS,
//       },
//     });

//     await transporter.sendMail({
//       from: process.env.EMAIL_USER,
//       to: email,
//       subject: 'Admin Login Verification - VPN Academy',
//       html: `
//         <div style="max-width: 600px; margin: 0 auto; padding: 20px; font-family: Arial, sans-serif;">
//           <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 40px 20px; text-align: center;">
//             <h1 style="color: white; margin: 0; font-size: 28px;">VPN Academy Admin</h1>
//             <p style="color: rgba(255,255,255,0.9); margin: 10px 0 0 0; font-size: 16px;">Login Verification</p>
//           </div>
          
//           <div style="padding: 40px 20px; background-color: #f8f9fa;">
//             <h2 style="color: #333; margin-top: 0;">Hello ${adminData.fullName},</h2>
            
//             <p style="color: #666; line-height: 1.6;">
//               A login attempt was made to your admin account. Please use the OTP below to complete the login:
//             </p>
            
//             <div style="background: white; padding: 20px; text-align: center; margin: 20px 0;">
//               <h1 style="color: #667eea; font-size: 32px; letter-spacing: 2px; margin: 0;">${otp}</h1>
//             </div>
            
//             <p style="color: #666; line-height: 1.6;">
//               This OTP is valid for 10 minutes.
//             </p>
            
//             <div style="background: #e7f3ff; padding: 15px; border-radius: 8px; margin: 20px 0;">
//               <p style="color: #0066cc; margin: 0; font-size: 14px;">
//                 <strong>Security Note:</strong> If this wasn't you, please contact support immediately.
//               </p>
//             </div>
            
//             <p style="color: #666; line-height: 1.6;">
//               Best regards,<br>
//               <strong>The VPN Academy Team</strong>
//             </p>
//           </div>
          
//           <div style="background: #333; padding: 20px; text-align: center;">
//             <p style="color: #999; margin: 0; font-size: 12px;">
//               © 2024 VPN Academy. All rights reserved.
//             </p>
//           </div>
//         </div>
//       `
//     });

//     console.log('OTP sent successfully to:', email);

//     return Response.json({
//       message: 'OTP sent to your email for verification',
//       requiresOTP: true,
//       requiresPasswordChange: requiresPasswordChange,
//     });
//   } catch (error) {
//     console.error('Admin login error:', error);
//     return Response.json(
//       { message: 'Internal server error' },
//       { status: 500 }
//     );
//   }
// }

import { signInWithEmailAndPassword } from 'firebase/auth';
import { doc, getDoc, collection, addDoc } from 'firebase/firestore';
import { auth, db } from '@/lib/firebase';
import nodemailer from 'nodemailer';

export async function POST(request) {
  try {
    const { email, password, turnstileToken } = await request.json();

    console.log('Admin login attempt for:', email);

    // Validate input
    if (!email || !password || !turnstileToken) {
      return Response.json(
        { message: 'Missing required fields' },
        { status: 400 }
      );
    }

    // ✅ Verify Cloudflare Turnstile
    const turnstileResponse = await fetch(
      'https://challenges.cloudflare.com/turnstile/v0/siteverify',
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: `secret=${process.env.TURNSTILE_SECRET_KEY}&response=${turnstileToken}`,
      }
    );

    const turnstileResult = await turnstileResponse.json();
    if (!turnstileResult.success) {
      console.log('Turnstile verification failed:', turnstileResult);
      return Response.json(
        { message: 'Verification failed. Please try again.' },
        { status: 400 }
      );
    }

    // ✅ Authenticate with Firebase Auth
    let firebaseUser;
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      firebaseUser = userCredential.user;
      console.log('Firebase Auth successful for admin:', firebaseUser.uid);
    } catch (firebaseError) {
      console.error('Firebase Auth error:', firebaseError);
      let errorMessage = 'Invalid email or password';

      if (firebaseError.code === 'auth/user-not-found') {
        errorMessage = 'No admin account found with this email';
      } else if (firebaseError.code === 'auth/wrong-password') {
        errorMessage = 'Incorrect password';
      } else if (firebaseError.code === 'auth/user-disabled') {
        errorMessage = 'This admin account has been disabled';
      } else if (firebaseError.code === 'auth/too-many-requests') {
        errorMessage = 'Too many failed attempts. Please try again later';
      }

      return Response.json({ message: errorMessage }, { status: 401 });
    }

    // ✅ Get admin data from Firestore
    const adminDoc = await getDoc(doc(db, 'admins', firebaseUser.uid));
    if (!adminDoc.exists()) {
      console.error(
        'Admin document not found in Firestore for UID:',
        firebaseUser.uid
      );
      return Response.json(
        { message: 'Admin data not found. Please contact support.' },
        { status: 404 }
      );
    }

    const adminData = adminDoc.data();
    console.log('Admin data found:', {
      email: adminData.email,
      isVerified: adminData.isVerified,
      isActive: adminData.isActive,
    });

    // ✅ Check status
    if (!adminData.isVerified) {
      return Response.json(
        { message: 'Please verify your email before logging in' },
        { status: 401 }
      );
    }

    if (!adminData.isActive) {
      return Response.json(
        { message: 'Admin account has been deactivated' },
        { status: 401 }
      );
    }

    const requiresPasswordChange = adminData.hasTemporaryPassword || false;

    // ✅ Generate OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const otpExpiry = new Date(Date.now() + 10 * 60 * 1000); // 10 mins

    await addDoc(collection(db, 'adminLoginOtpStore'), {
      email,
      otp,
      expiryAt: otpExpiry,
      firebaseUid: firebaseUser.uid,
      createdAt: new Date(),
    });

    // ✅ Setup Nodemailer with Gmail SMTP
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true, // SSL
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS, // Gmail App Password (not normal password)
      },
      tls: {
        rejectUnauthorized: false, // 🔑 allows self-signed certs
      },
    });

    // ✅ Send OTP email
    await transporter.sendMail({
      from: `"VPN Academy Admin" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: 'Admin Login Verification - VPN Academy',
      html: `
        <div style="max-width:600px;margin:0 auto;padding:20px;font-family:Arial,sans-serif;">
          <h2>Hello ${adminData.fullName},</h2>
          <p>A login attempt was made on your account. Use the OTP below to complete login:</p>
          <div style="background:#f4f4f4;padding:20px;text-align:center;margin:20px 0;">
            <h1 style="color:#333;font-size:32px;">${otp}</h1>
          </div>
          <p>This OTP is valid for 10 minutes.</p>
          <p>If this wasn’t you, please contact support immediately.</p>
          <br>
          <p>– The VPN Academy Team</p>
        </div>
      `,
    });

    console.log('OTP sent successfully to:', email);

    return Response.json({
      message: 'OTP sent to your email for verification',
      requiresOTP: true,
      requiresPasswordChange,
    });
  } catch (error) {
    console.error('Admin login error:', error);
    return Response.json({ message: 'Internal server error' }, { status: 500 });
  }
}
