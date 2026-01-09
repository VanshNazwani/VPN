// // // // import { NextResponse } from 'next/server';
// // // // import { doc, getDoc, updateDoc, addDoc, collection } from 'firebase/firestore';
// // // // import { db } from '@/lib/firebase';
// // // // import { withAuth } from '@/lib/middleware-auth';
// // // // import bcrypt from 'bcryptjs';
// // // // import nodemailer from 'nodemailer';

// // // // async function handler(request) {
// // // //   try {
// // // //     const userId = request.user.userId;
// // // //     const { currentPassword, newPassword } = await request.json();

// // // //     if (!currentPassword || !newPassword) {
// // // //       return NextResponse.json(
// // // //         { message: 'Current password and new password are required' },
// // // //         { status: 400 }
// // // //       );
// // // //     }

// // // //     if (newPassword.length < 6) {
// // // //       return NextResponse.json(
// // // //         { message: 'New password must be at least 6 characters long' },
// // // //         { status: 400 }
// // // //       );
// // // //     }

// // // //     // Get user data
// // // //     const userDoc = await getDoc(doc(db, 'users', userId));
// // // //     if (!userDoc.exists()) {
// // // //       return NextResponse.json(
// // // //         { message: 'User not found' },
// // // //         { status: 404 }
// // // //       );
// // // //     }

// // // //     const userData = userDoc.data();

// // // //     // Verify current password
// // // //     const isCurrentPasswordValid = await bcrypt.compare(currentPassword, userData.password);
// // // //     if (!isCurrentPasswordValid) {
// // // //       return NextResponse.json(
// // // //         { message: 'Current password is incorrect' },
// // // //         { status: 400 }
// // // //       );
// // // //     }

// // // //     // Generate OTP for verification
// // // //     const otp = Math.floor(100000 + Math.random() * 900000).toString();
// // // //     const otpExpiry = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

// // // //     // Store OTP
// // // //     await addDoc(collection(db, 'otpStore'), {
// // // //       email: userData.email,
// // // //       otp,
// // // //       expiryAt: otpExpiry,
// // // //       type: 'password_change',
// // // //       newPasswordHash: await bcrypt.hash(newPassword, 12),
// // // //       userId,
// // // //       createdAt: new Date(),
// // // //     });

// // // //     // Send OTP email
// // // //     const transporter = nodemailer.createTransporter({
// // // //       service: 'gmail',
// // // //       auth: {
// // // //         user: process.env.EMAIL_USER,
// // // //         pass: process.env.EMAIL_PASS,
// // // //       },
// // // //     });

// // // //     await transporter.sendMail({
// // // //       from: process.env.EMAIL_USER,
// // // //       to: userData.email,
// // // //       subject: 'Password Change Verification - VPN Academy',
// // // //       html: `
// // // //         <div style="max-width: 600px; margin: 0 auto; padding: 20px; font-family: Arial, sans-serif;">
// // // //           <h2 style="color: #333; text-align: center;">Password Change Request</h2>
// // // //           <p>Hello ${userData.fullName},</p>
// // // //           <p>We received a request to change your password. To complete this process, please verify using the OTP below:</p>
// // // //           <div style="background: #f5f5f5; padding: 20px; text-align: center; margin: 20px 0;">
// // // //             <h1 style="color: #007bff; font-size: 32px; letter-spacing: 2px; margin: 0;">${otp}</h1>
// // // //           </div>
// // // //           <p>This OTP is valid for 10 minutes.</p>
// // // //           <p>If you didn't request this password change, please ignore this email and contact support.</p>
// // // //           <p>Best regards,<br>The VPN Academy Team</p>
// // // //         </div>
// // // //       `,
// // // //     });

// // // //     return NextResponse.json({
// // // //       message: 'OTP sent to your email. Please verify to complete password change.',
// // // //       requireOTP: true,
// // // //     });
// // // //   } catch (error) {
// // // //     console.error('Error changing password:', error);
// // // //     return NextResponse.json(
// // // //       { message: 'Internal server error' },
// // // //       { status: 500 }
// // // //     );
// // // //   }
// // // // }

// // // // export const POST = withAuth(handler);

// // // import { doc, getDoc, updateDoc, addDoc, collection } from 'firebase/firestore';
// // // import { db } from '@/lib/firebase';
// // // import { withAuth } from '@/lib/middleware-auth';
// // // import bcrypt from 'bcryptjs';
// // // import nodemailer from 'nodemailer';

// // // async function handler(request) {
// // //   try {
// // //     const userId = request.user.userId;
// // //     const { currentPassword, newPassword } = await request.json();

// // //     if (!currentPassword || !newPassword) {
// // //       return Response.json(
// // //         { message: 'Current password and new password are required' },
// // //         { status: 400 }
// // //       );
// // //     }

// // //     if (newPassword.length < 6) {
// // //       return Response.json(
// // //         { message: 'New password must be at least 6 characters long' },
// // //         { status: 400 }
// // //       );
// // //     }

// // //     // Get user data
// // //     const userDoc = await getDoc(doc(db, 'users', userId));
// // //     if (!userDoc.exists()) {
// // //       return Response.json(
// // //         { message: 'User not found' },
// // //         { status: 404 }
// // //       );
// // //     }

// // //     const userData = userDoc.data();

// // //     // Verify current password
// // //     const isCurrentPasswordValid = await bcrypt.compare(currentPassword, userData.password);
// // //     if (!isCurrentPasswordValid) {
// // //       return Response.json(
// // //         { message: 'Current password is incorrect' },
// // //         { status: 400 }
// // //       );
// // //     }

// // //     // Generate OTP for verification
// // //     const otp = Math.floor(100000 + Math.random() * 900000).toString();
// // //     const otpExpiry = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

// // //     // Store OTP
// // //     await addDoc(collection(db, 'otpStore'), {
// // //       email: userData.email,
// // //       otp,
// // //       expiryAt: otpExpiry,
// // //       type: 'password_change',
// // //       newPasswordHash: await bcrypt.hash(newPassword, 12),
// // //       userId,
// // //       createdAt: new Date(),
// // //     });

// // //     // Send OTP email
// // //     const transporter = nodemailer.createTransporter({
// // //       service: 'gmail',
// // //       auth: {
// // //         user: process.env.EMAIL_USER,
// // //         pass: process.env.EMAIL_PASS,
// // //       },
// // //     });

// // //     await transporter.sendMail({
// // //       from: process.env.EMAIL_USER,
// // //       to: userData.email,
// // //       subject: 'Password Change Verification - VPN Academy',
// // //       html: `
// // //         <div style="max-width: 600px; margin: 0 auto; padding: 20px; font-family: Arial, sans-serif;">
// // //           <h2 style="color: #333; text-align: center;">Password Change Request</h2>
// // //           <p>Hello ${userData.fullName},</p>
// // //           <p>We received a request to change your password. To complete this process, please verify using the OTP below:</p>
// // //           <div style="background: #f5f5f5; padding: 20px; text-align: center; margin: 20px 0;">
// // //             <h1 style="color: #007bff; font-size: 32px; letter-spacing: 2px; margin: 0;">${otp}</h1>
// // //           </div>
// // //           <p>This OTP is valid for 10 minutes.</p>
// // //           <p>If you didn't request this password change, please ignore this email and contact support.</p>
// // //           <p>Best regards,<br>The VPN Academy Team</p>
// // //         </div>
// // //       `,
// // //     });

// // //     return Response.json({
// // //       message: 'OTP sent to your email. Please verify to complete password change.',
// // //       requireOTP: true,
// // //     });
// // //   } catch (error) {
// // //     console.error('Error changing password:', error);
// // //     return Response.json(
// // //       { message: 'Internal server error' },
// // //       { status: 500 }
// // //     );
// // //   }
// // // }

// // // export const POST = withAuth(handler);
// // import { doc, getDoc, updateDoc, addDoc, collection } from 'firebase/firestore';
// // import { db } from '@/lib/firebase';
// // import { withAuth } from '@/lib/middleware-auth';
// // import bcrypt from 'bcryptjs';
// // import nodemailer from 'nodemailer';

// // async function handler(request) {
// //   try {
// //     const userId = request.user.userId;
// //     const { currentPassword, newPassword } = await request.json();

// //     if (!currentPassword || !newPassword) {
// //       return Response.json(
// //         { message: 'Current password and new password are required' },
// //         { status: 400 }
// //       );
// //     }

// //     if (newPassword.length < 6) {
// //       return Response.json(
// //         { message: 'New password must be at least 6 characters long' },
// //         { status: 400 }
// //       );
// //     }

// //     // Get user data
// //     const userDoc = await getDoc(doc(db, 'users', userId));
// //     if (!userDoc.exists()) {
// //       return Response.json(
// //         { message: 'User not found' },
// //         { status: 404 }
// //       );
// //     }

// //     const userData = userDoc.data();

// //     // Verify current password
// //     const isCurrentPasswordValid = await bcrypt.compare(currentPassword, userData.password);
// //     if (!isCurrentPasswordValid) {
// //       return Response.json(
// //         { message: 'Current password is incorrect' },
// //         { status: 400 }
// //       );
// //     }

// //     // Generate OTP for verification
// //     const otp = Math.floor(100000 + Math.random() * 900000).toString();
// //     const otpExpiry = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

// //     // Store OTP
// //     await addDoc(collection(db, 'otpStore'), {
// //       email: userData.email,
// //       otp,
// //       expiryAt: otpExpiry,
// //       type: 'password_change',
// //       newPasswordHash: await bcrypt.hash(newPassword, 12),
// //       userId,
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
// //       to: userData.email,
// //       subject: 'Password Change Verification - VPN Academy',
// //       html: `
// //         <div style="max-width: 600px; margin: 0 auto; padding: 20px; font-family: Arial, sans-serif;">
// //           <h2 style="color: #333; text-align: center;">Password Change Request</h2>
// //           <p>Hello ${userData.fullName},</p>
// //           <p>We received a request to change your password. To complete this process, please verify using the OTP below:</p>
// //           <div style="background: #f5f5f5; padding: 20px; text-align: center; margin: 20px 0;">
// //             <h1 style="color: #007bff; font-size: 32px; letter-spacing: 2px; margin: 0;">${otp}</h1>
// //           </div>
// //           <p>This OTP is valid for 10 minutes.</p>
// //           <p>If you didn't request this password change, please ignore this email and contact support.</p>
// //           <p>Best regards,<br>The VPN Academy Team</p>
// //         </div>
// //       `,
// //     });

// //     return Response.json({
// //       message: 'OTP sent to your email. Please verify to complete password change.',
// //       requireOTP: true,
// //     });
// //   } catch (error) {
// //     console.error('Error changing password:', error);
// //     return Response.json(
// //       { message: 'Internal server error' },
// //       { status: 500 }
// //     );
// //   }
// // }

// // export const POST = withAuth(handler);

// import { doc, getDoc, updateDoc, addDoc, collection } from 'firebase/firestore';
// import { db } from '@/lib/firebase';
// import { withAuth } from '@/lib/middleware-auth';
// import bcrypt from 'bcryptjs';
// import nodemailer from 'nodemailer';

// async function handler(request) {
//   try {
//     const userId = request.user.userId;
//     const { currentPassword, newPassword, otp, isOtpVerification } = await request.json();

//     // If this is OTP verification step
//     if (isOtpVerification) {
//       return await verifyOtpAndChangePassword(userId, otp);
//     }

//     // Initial password change request
//     if (!currentPassword || !newPassword) {
//       return Response.json(
//         { message: 'Current password and new password are required' },
//         { status: 400 }
//       );
//     }

//     if (newPassword.length < 6) {
//       return Response.json(
//         { message: 'New password must be at least 6 characters long' },
//         { status: 400 }
//       );
//     }

//     // Get user data
//     const userDoc = await getDoc(doc(db, 'users', userId));
//     if (!userDoc.exists()) {
//       return Response.json(
//         { message: 'User not found' },
//         { status: 404 }
//       );
//     }

//     const userData = userDoc.data();

//     // Verify current password
//     const isCurrentPasswordValid = await bcrypt.compare(currentPassword, userData.password);
//     if (!isCurrentPasswordValid) {
//       return Response.json(
//         { message: 'Current password is incorrect' },
//         { status: 400 }
//       );
//     }

//     // Generate OTP for verification
//     const generatedOtp = Math.floor(100000 + Math.random() * 900000).toString();
//     const otpExpiry = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

//     // Store OTP
//     await addDoc(collection(db, 'otpStore'), {
//       email: userData.email,
//       otp: generatedOtp,
//       expiryAt: otpExpiry,
//       type: 'password_change',
//       newPasswordHash: await bcrypt.hash(newPassword, 12),
//       userId,
//       createdAt: new Date(),
//     });

//     // Send OTP email with improved error handling
//     try {
//       await sendOtpEmail(userData.email, userData.fullName, generatedOtp);

//       return Response.json({
//         message: 'OTP sent to your email. Please verify to complete password change.',
//         requireOTP: true,
//       });
//     } catch (emailError) {
//       console.error('Email sending failed:', emailError);

//       // Fallback: For development/testing, return OTP in response (remove in production)
//       if (process.env.NODE_ENV === 'development') {
//         return Response.json({
//           message: 'Email service temporarily unavailable. OTP for testing: ' + generatedOtp,
//           requireOTP: true,
//           devOtp: generatedOtp, // Remove this in production
//         });
//       }

//       return Response.json(
//         { message: 'Failed to send verification email. Please try again.' },
//         { status: 500 }
//       );
//     }

//   } catch (error) {
//     console.error('Error changing password:', error);
//     return Response.json(
//       { message: 'Internal server error' },
//       { status: 500 }
//     );
//   }
// }

// async function verifyOtpAndChangePassword(userId, otp) {
//   try {
//     if (!otp) {
//       return Response.json(
//         { message: 'OTP is required' },
//         { status: 400 }
//       );
//     }

//     // Find OTP record
//     const otpQuery = await db.collection('otpStore')
//       .where('userId', '==', userId)
//       .where('type', '==', 'password_change')
//       .where('otp', '==', otp)
//       .get();

//     if (otpQuery.empty) {
//       return Response.json(
//         { message: 'Invalid OTP' },
//         { status: 400 }
//       );
//     }

//     const otpDoc = otpQuery.docs[0];
//     const otpData = otpDoc.data();

//     // Check if OTP is expired
//     if (new Date() > otpData.expiryAt.toDate()) {
//       // Clean up expired OTP
//       await otpDoc.ref.delete();
//       return Response.json(
//         { message: 'OTP has expired. Please request a new one.' },
//         { status: 400 }
//       );
//     }

//     // Update user password
//     await updateDoc(doc(db, 'users', userId), {
//       password: otpData.newPasswordHash,
//       updatedAt: new Date(),
//     });

//     // Clean up OTP record
//     await otpDoc.ref.delete();

//     return Response.json({
//       message: 'Password changed successfully!',
//     });

//   } catch (error) {
//     console.error('Error verifying OTP:', error);
//     return Response.json(
//       { message: 'Internal server error' },
//       { status: 500 }
//     );
//   }
// }

// async function sendOtpEmail(email, fullName, otp) {
//   // Create transporter with better SSL handling
//   const transporter = nodemailer.createTransport({
//     service: 'gmail',
//     auth: {
//       user: process.env.EMAIL_USER,
//       pass: process.env.EMAIL_PASS,
//     },
//     // Fix for SSL certificate issues
//     tls: {
//       rejectUnauthorized: false, // For development only
//     },
//     // Alternative configuration for better compatibility
//     secure: true,
//     port: 465,
//   });

//   // Verify connection
//   await transporter.verify();

//   await transporter.sendMail({
//     from: process.env.EMAIL_USER,
//     to: email,
//     subject: 'Password Change Verification - VPN Academy',
//     html: `
//       <div style="max-width: 600px; margin: 0 auto; padding: 20px; font-family: Arial, sans-serif;">
//         <h2 style="color: #333; text-align: center;">Password Change Request</h2>
//         <p>Hello ${fullName},</p>
//         <p>We received a request to change your password. To complete this process, please verify using the OTP below:</p>
//         <div style="background: #f5f5f5; padding: 20px; text-align: center; margin: 20px 0;">
//           <h1 style="color: #007bff; font-size: 32px; letter-spacing: 2px; margin: 0;">${otp}</h1>
//         </div>
//         <p>This OTP is valid for 10 minutes.</p>
//         <p>If you didn't request this password change, please ignore this email and contact support.</p>
//         <p>Best regards,<br>The VPN Academy Team</p>
//       </div>
//     `,
//   });
// }

// export const POST = withAuth(handler);

import { doc, getDoc, updateDoc, addDoc, collection, query, where, getDocs, deleteDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { withAuth } from '@/lib/middleware-auth';
import bcrypt from 'bcryptjs';
import nodemailer from 'nodemailer';

async function handler(request) {
  try {
    const userId = request.user.userId;
    const { currentPassword, newPassword, otp, isOtpVerification } = await request.json();

    // If this is OTP verification step
    if (isOtpVerification) {
      return await verifyOtpAndChangePassword(userId, otp);
    }

    // Initial password change request
    if (!currentPassword || !newPassword) {
      return Response.json(
        { message: 'Current password and new password are required' },
        { status: 400 }
      );
    }

    if (newPassword.length < 6) {
      return Response.json(
        { message: 'New password must be at least 6 characters long' },
        { status: 400 }
      );
    }

    // Get user data
    const userDoc = await getDoc(doc(db, 'users', userId));
    if (!userDoc.exists()) {
      return Response.json(
        { message: 'User not found' },
        { status: 404 }
      );
    }

    const userData = userDoc.data();

    // Verify current password
    const isCurrentPasswordValid = await bcrypt.compare(currentPassword, userData.password);
    if (!isCurrentPasswordValid) {
      return Response.json(
        { message: 'Current password is incorrect' },
        { status: 400 }
      );
    }

    // Generate OTP for verification
    const generatedOtp = Math.floor(100000 + Math.random() * 900000).toString();
    const otpExpiry = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

    // Store OTP
    await addDoc(collection(db, 'otpStore'), {
      email: userData.email,
      otp: generatedOtp,
      expiryAt: otpExpiry,
      type: 'password_change',
      newPasswordHash: await bcrypt.hash(newPassword, 12),
      userId,
      createdAt: new Date(),
    });

    // Send OTP email with improved error handling
    try {
      await sendOtpEmail(userData.email, userData.fullName, generatedOtp);

      return Response.json({
        message: 'OTP sent to your email. Please verify to complete password change.',
        requireOTP: true,
      });
    } catch (emailError) {
      console.error('Email sending failed:', emailError);

      // Fallback: For development/testing, return OTP in response (remove in production)
      if (process.env.NODE_ENV === 'development') {
        return Response.json({
          message: 'Email service temporarily unavailable. OTP for testing: ' + generatedOtp,
          requireOTP: true,
          devOtp: generatedOtp, // Remove this in production
        });
      }

      return Response.json(
        { message: 'Failed to send verification email. Please try again.' },
        { status: 500 }
      );
    }

  } catch (error) {
    console.error('Error changing password:', error);
    return Response.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}

async function verifyOtpAndChangePassword(userId, otp) {
  try {
    if (!otp) {
      return Response.json(
        { message: 'OTP is required' },
        { status: 400 }
      );
    }

    // Find OTP record using v9 syntax
    const otpQuery = query(
      collection(db, 'otpStore'),
      where('userId', '==', userId),
      where('type', '==', 'password_change'),
      where('otp', '==', otp)
    );

    const otpSnapshot = await getDocs(otpQuery);

    if (otpSnapshot.empty) {
      return Response.json(
        { message: 'Invalid OTP' },
        { status: 400 }
      );
    }

    const otpDoc = otpSnapshot.docs[0];
    const otpData = otpDoc.data();

    // Check if OTP is expired
    if (new Date() > otpData.expiryAt.toDate()) {
      // Clean up expired OTP
      await deleteDoc(otpDoc.ref);
      return Response.json(
        { message: 'OTP has expired. Please request a new one.' },
        { status: 400 }
      );
    }

    // Update user password
    await updateDoc(doc(db, 'users', userId), {
      password: otpData.newPasswordHash,
      updatedAt: new Date(),
    });

    // Clean up OTP record
    await deleteDoc(otpDoc.ref);

    return Response.json({
      message: 'Password changed successfully!',
    });

  } catch (error) {
    console.error('Error verifying OTP:', error);
    return Response.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}

async function sendOtpEmail(email, fullName, otp) {
  // Create transporter with better SSL handling
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
    // Fix for SSL certificate issues
    tls: {
      rejectUnauthorized: false, // For development only
    },
    // Alternative configuration for better compatibility
    secure: true,
    port: 465,
  });

  // Verify connection
  await transporter.verify();

  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: email,
    subject: 'Password Change Verification - VPN Academy',
    html: `
      <div style="max-width: 600px; margin: 0 auto; padding: 20px; font-family: Arial, sans-serif;">
        <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 40px 20px; text-align: center;">
          <h1 style="color: white; margin: 0; font-size: 28px;">VPN Academy</h1>
          <p style="color: rgba(255,255,255,0.9); margin: 10px 0 0 0; font-size: 16px;">Password Change Verification</p>
        </div>
        
        <div style="padding: 40px 20px; background-color: #f8f9fa;">
          <h2 style="color: #333; margin-top: 0;">Hello ${fullName},</h2>
          
          <p style="color: #666; line-height: 1.6;">
            We received a request to change your password. Please use the OTP below to complete this process:
          </p>
          
          <div style="background: white; padding: 20px; text-align: center; margin: 20px 0;">
            <h1 style="color: #667eea; font-size: 32px; letter-spacing: 2px; margin: 0;">${otp}</h1>
          </div>
          
          <p style="color: #666; line-height: 1.6;">
            This OTP is valid for 10 minutes.
          </p>
          
          <div style="background: #e7f3ff; padding: 15px; border-radius: 8px; margin: 20px 0;">
            <p style="color: #0066cc; margin: 0; font-size: 14px;">
              <strong>Security Note:</strong> If you didn't request this password change, please ignore this email and contact support.
            </p>
          </div>
          
          <p style="color: #666; line-height: 1.6;">
            Best regards,<br>
            <strong>The VPN Academy Team</strong>
          </p>
        </div>
        
        <div style="background: #333; padding: 20px; text-align: center;">
          <p style="color: #999; margin: 0; font-size: 12px;">
            © 2024 VPN Academy. All rights reserved.
          </p>
        </div>
      </div>
    `,
  });
}

export const POST = withAuth(handler);