// import { collection, addDoc, query, where, getDocs } from 'firebase/firestore';
// import { db } from '@/lib/firebase';
// import bcrypt from 'bcryptjs';
// import { sendEmail } from '@/lib/email';

// export async function POST(request) {
//   try {
//     const { fullName, email, password } = await request.json();

//     // Verify Cloudflare Turnstile
//     // const turnstileResponse = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
//     //   method: 'POST',
//     //   headers: {
//     //     'Content-Type': 'application/x-www-form-urlencoded',
//     //   },
//     //   body: `secret=${process.env.TURNSTILE_SECRET_KEY}&response=${turnstileToken}`,
//     // });

//     // const turnstileResult = await turnstileResponse.json();
//     // if (!turnstileResult.success) {
//     //   return Response.json(
//     //     { message: 'Turnstile verification failed' },
//     //     { status: 400 }
//     //   );
//     // }

//     // Check if admin already exists
//     const adminsRef = collection(db, 'admins');
//     const q = query(adminsRef, where('email', '==', email));
//     const querySnapshot = await getDocs(q);

//     if (!querySnapshot.empty) {
//       return Response.json(
//         { message: 'Admin with this email already exists' },
//         { status: 400 }
//       );
//     }

//     // Hash password
//     const saltRounds = 12;
//     const hashedPassword = await bcrypt.hash(password, saltRounds);

//     // Create admin document
//     const adminData = {
//       fullName,
//       email,
//       password: hashedPassword,
//       role: 'admin',
//       isVerified: true,
//       isActive: true,
//       createdAt: new Date(),
//       updatedAt: new Date(),
//       permissions: {
//         canCreateCourses: true,
//         canManageUsers: true,
//         canViewAnalytics: true,
//         canManageAdmins: true,
//         canManageOrders: true
//       }
//     };

//     const docRef = await addDoc(collection(db, 'admins'), adminData);

//     // Send welcome email to new admin
//     try {
//       await sendEmail({
//         to: email,
//         subject: 'Welcome to VPN Academy - Admin Access Granted',
//         html: `
//           <div style="max-width: 600px; margin: 0 auto; font-family: Arial, sans-serif;">
//             <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 40px 20px; text-align: center;">
//               <h1 style="color: white; margin: 0; font-size: 28px;">Welcome to VPN Academy</h1>
//               <p style="color: rgba(255,255,255,0.9); margin: 10px 0 0 0; font-size: 16px;">Admin Access Granted</p>
//             </div>
            
//             <div style="padding: 40px 20px; background-color: #f8f9fa;">
//               <h2 style="color: #333; margin-top: 0;">Hello ${fullName},</h2>
              
//               <p style="color: #666; line-height: 1.6;">
//                 Congratulations! Your administrator account has been successfully created for VPN Academy. 
//                 You now have full access to manage the platform.
//               </p>
              
//               <div style="background: white; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #667eea;">
//                 <h3 style="color: #333; margin-top: 0;">Your Admin Credentials:</h3>
//                 <p style="color: #666; margin: 5px 0;"><strong>Email:</strong> ${email}</p>
//                 <p style="color: #666; margin: 5px 0;"><strong>Role:</strong> Administrator</p>
//               </div>
              
//               <div style="background: white; padding: 20px; border-radius: 8px; margin: 20px 0;">
//                 <h3 style="color: #333; margin-top: 0;">Admin Permissions:</h3>
//                 <ul style="color: #666; line-height: 1.8;">
//                   <li>✅ Create and manage courses</li>
//                   <li>✅ Manage user accounts</li>
//                   <li>✅ View analytics and reports</li>
//                   <li>✅ Add new administrators</li>
//                   <li>✅ Manage orders and payments</li>
//                 </ul>
//               </div>
              
//               <div style="text-align: center; margin: 30px 0;">
//                 <a href="${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/admin/login" 
//                    style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 12px 30px; text-decoration: none; border-radius: 25px; font-weight: bold; display: inline-block;">
//                   Access Admin Panel
//                 </a>
//               </div>
              
//               <div style="background: #e7f3ff; padding: 15px; border-radius: 8px; margin: 20px 0;">
//                 <p style="color: #0066cc; margin: 0; font-size: 14px;">
//                   <strong>Security Note:</strong> Keep your login credentials secure and do not share them with unauthorized personnel. 
//                   If you suspect any unauthorized access, please change your password immediately.
//                 </p>
//               </div>
              
//               <p style="color: #666; line-height: 1.6;">
//                 If you have any questions or need assistance getting started, please don't hesitate to contact our support team.
//               </p>
              
//               <p style="color: #666; line-height: 1.6;">
//                 Best regards,<br>
//                 <strong>The VPN Academy Team</strong>
//               </p>
//             </div>
            
//             <div style="background: #333; padding: 20px; text-align: center;">
//               <p style="color: #999; margin: 0; font-size: 12px;">
//                 This email was sent to ${email} because an admin account was created for you on VPN Academy.
//               </p>
//               <p style="color: #999; margin: 5px 0 0 0; font-size: 12px;">
//                 © 2024 VPN Academy. All rights reserved.
//               </p>
//             </div>
//           </div>
//         `
//       });
//     } catch (emailError) {
//       console.error('Failed to send welcome email:', emailError);
//       // Don't fail the registration if email fails
//     }

//     return Response.json({
//       message: 'Admin account created successfully',
//       adminId: docRef.id,
//     }, { status: 201 });

//   } catch (error) {
//     console.error('Admin registration error:', error);
//     return Response.json(
//       { message: 'Internal server error' },
//       { status: 500 }
//     );
//   }
// }

import { createUserWithEmailAndPassword } from 'firebase/auth';
import { collection, addDoc, query, where, getDocs, doc, setDoc } from 'firebase/firestore';
import { auth, db } from '@/lib/firebase';
import bcrypt from 'bcryptjs';
import nodemailer from 'nodemailer';

export async function POST(request) {
  try {
    const { fullName, email, password, turnstileToken } = await request.json();

    console.log('Admin registration attempt for:', email);

    // Verify Cloudflare Turnstile
    const turnstileResponse = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: `secret=${process.env.TURNSTILE_SECRET_KEY}&response=${turnstileToken}`,
    });

    const turnstileResult = await turnstileResponse.json();
    if (!turnstileResult.success) {
      console.log('Turnstile verification failed:', turnstileResult);
      return Response.json(
        { message: 'Verification failed. Please try again.' },
        { status: 400 }
      );
    }

    // Check if admin already exists in Firestore
    const adminsRef = collection(db, 'admins');
    const q = query(adminsRef, where('email', '==', email));
    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      return Response.json(
        { message: 'Admin already exists with this email' },
        { status: 400 }
      );
    }

    // Generate OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const otpExpiry = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

    // Hash password for storage
    const hashedPassword = await bcrypt.hash(password, 12);

    // Prepare admin data for Firestore
    const adminData = {
      fullName,
      email,
      password: hashedPassword,
      role: 'admin',
      isVerified: false,
      isActive: true,
      createdAt: new Date(),
      permissions: {
        canCreateCourses: true,
        canManageUsers: true,
        canViewAnalytics: true,
        canManageAdmins: true,
        canManageOrders: true
      }
    };

    // Create admin in Firebase Auth
    let firebaseUser;
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      firebaseUser = userCredential.user;
      console.log('Firebase Auth admin created:', firebaseUser.uid);
    } catch (firebaseError) {
      console.error('Firebase Auth error:', firebaseError);
      if (firebaseError.code === 'auth/email-already-in-use') {
        return Response.json(
          { message: 'Email is already registered' },
          { status: 400 }
        );
      }
      throw firebaseError;
    }

    // Store admin data in Firestore with Firebase Auth UID
    await setDoc(doc(db, 'admins', firebaseUser.uid), adminData);

    // Store OTP for verification
    await addDoc(collection(db, 'adminOtpStore'), {
      email,
      otp,
      expiryAt: otpExpiry,
      firebaseUid: firebaseUser.uid,
      createdAt: new Date(),
    });

    // Send OTP email
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Admin Account Verification - VPN Academy',
      html: `
        <div style="max-width: 600px; margin: 0 auto; padding: 20px; font-family: Arial, sans-serif;">
          <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 40px 20px; text-align: center;">
            <h1 style="color: white; margin: 0; font-size: 28px;">VPN Academy Admin</h1>
            <p style="color: rgba(255,255,255,0.9); margin: 10px 0 0 0; font-size: 16px;">Account Verification Required</p>
          </div>
          
          <div style="padding: 40px 20px; background-color: #f8f9fa;">
            <h2 style="color: #333; margin-top: 0;">Hello ${fullName},</h2>
            
            <p style="color: #666; line-height: 1.6;">
              Your administrator account has been created for VPN Academy. 
              To complete the setup, please verify your email using the OTP below:
            </p>
            
            <div style="background: white; padding: 20px; text-align: center; margin: 20px 0;">
              <h1 style="color: #667eea; font-size: 32px; letter-spacing: 2px; margin: 0;">${otp}</h1>
            </div>
            
            <p style="color: #666; line-height: 1.6;">
              This OTP is valid for 10 minutes. After verification, you'll have full admin access to:
            </p>
            
            <ul style="color: #666; line-height: 1.8;">
              <li>✅ Create and manage courses</li>
              <li>✅ Manage user accounts</li>
              <li>✅ View analytics and reports</li>
              <li>✅ Add new administrators</li>
              <li>✅ Manage orders and payments</li>
            </ul>
            
            <div style="background: #e7f3ff; padding: 15px; border-radius: 8px; margin: 20px 0;">
              <p style="color: #0066cc; margin: 0; font-size: 14px;">
                <strong>Security Note:</strong> If you didn't create this account, please ignore this email.
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
      `
    });

    console.log('Admin registration successful for:', email);

    return Response.json(
      { message: 'Admin registration successful. Please check your email for OTP.' },
      { status: 201 }
    );
  } catch (error) {
    console.error('Admin registration error:', error);
    return Response.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}