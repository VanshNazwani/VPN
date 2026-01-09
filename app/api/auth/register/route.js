// // // import { NextResponse } from 'next/server';
// // // import { collection, addDoc, query, where, getDocs } from 'firebase/firestore';
// // // import { db } from '@/lib/firebase';
// // // import bcrypt from 'bcryptjs';
// // // import nodemailer from 'nodemailer';

// // // export async function POST(request) {
// // //   try {
// // //     const { fullName, email, password, location, referralCode, turnstileToken } = await request.json();

// // //     // Verify Cloudflare Turnstile
// // //     const turnstileResponse = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
// // //       method: 'POST',
// // //       headers: {
// // //         'Content-Type': 'application/x-www-form-urlencoded',
// // //       },
// // //       body: `secret=${process.env.TURNSTILE_SECRET_KEY}&response=${turnstileToken}`,
// // //     });

// // //     const turnstileResult = await turnstileResponse.json();
// // //     if (!turnstileResult.success) {
// // //       return NextResponse.json(
// // //         { message: 'Turnstile verification failed' },
// // //         { status: 400 }
// // //       );
// // //     }

// // //     // Check if user already exists
// // //     const usersRef = collection(db, 'users');
// // //     const q = query(usersRef, where('email', '==', email));
// // //     const querySnapshot = await getDocs(q);

// // //     if (!querySnapshot.empty) {
// // //       return NextResponse.json(
// // //         { message: 'User already exists with this email' },
// // //         { status: 400 }
// // //       );
// // //     }

// // //     // Hash password
// // //     const hashedPassword = await bcrypt.hash(password, 12);

// // //     // Generate OTP
// // //     const otp = Math.floor(100000 + Math.random() * 900000).toString();
// // //     const otpExpiry = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

// // //     // Handle referral
// // //     let referredBy = null;
// // //     if (referralCode) {
// // //       const referralQuery = query(usersRef, where('referralCode', '==', referralCode));
// // //       const referralSnapshot = await getDocs(referralQuery);
// // //       if (!referralSnapshot.empty) {
// // //         referredBy = referralSnapshot.docs[0].id;
// // //       }
// // //     }

// // //     // Generate user's referral code
// // //     const userReferralCode = `VPN${Math.random().toString(36).substring(2, 8).toUpperCase()}`;

// // //     // Create user document
// // //     const userData = {
// // //       fullName,
// // //       email,
// // //       password: hashedPassword,
// // //       location,
// // //       referralCode: userReferralCode,
// // //       referredBy,
// // //       credits: 0,
// // //       role: 'student',
// // //       isVerified: false,
// // //       createdAt: new Date(),
// // //       enrolledCourses: [],
// // //       completedCourses: [],
// // //     };

// // //     await addDoc(usersRef, userData);

// // //     // Store OTP for verification
// // //     await addDoc(collection(db, 'otpStore'), {
// // //       email,
// // //       otp,
// // //       expiryAt: otpExpiry,
// // //       createdAt: new Date(),
// // //     });

// // //     // Send OTP email
// // //     const transporter = nodemailer.createTransport({
// // //       service: 'gmail',
// // //       auth: {
// // //         user: process.env.EMAIL_USER,
// // //         pass: process.env.EMAIL_PASS,
// // //       },
// // //     });

// // //     await transporter.sendMail({
// // //       from: process.env.EMAIL_USER,
// // //       to: email,
// // //       subject: 'Verify Your Email - VPN Academy',
// // //       html: `
// // //         <div style="max-width: 600px; margin: 0 auto; padding: 20px; font-family: Arial, sans-serif;">
// // //           <h2 style="color: #333; text-align: center;">Welcome to VPN Academy!</h2>
// // //           <p>Hello ${fullName},</p>
// // //           <p>Thank you for joining VPN Academy. To complete your registration, please verify your email address using the OTP below:</p>
// // //           <div style="background: #f5f5f5; padding: 20px; text-align: center; margin: 20px 0;">
// // //             <h1 style="color: #007bff; font-size: 32px; letter-spacing: 2px; margin: 0;">${otp}</h1>
// // //           </div>
// // //           <p>This OTP is valid for 10 minutes.</p>
// // //           <p>If you didn't create this account, please ignore this email.</p>
// // //           <p>Best regards,<br>The VPN Academy Team</p>
// // //         </div>
// // //       `,
// // //     });

// // //     return NextResponse.json(
// // //       { message: 'Registration successful. Please check your email for OTP.' },
// // //       { status: 201 }
// // //     );
// // //   } catch (error) {
// // //     console.error('Registration error:', error);
// // //     return NextResponse.json(
// // //       { message: 'Internal server error' },
// // //       { status: 500 }
// // //     );
// // //   }
// // // }

// // // Remove NextResponse import completely - we'll use native Response

// // import { collection, addDoc, query, where, getDocs } from 'firebase/firestore';
// // import { db } from '@/lib/firebase';
// // import bcrypt from 'bcryptjs';
// // import nodemailer from 'nodemailer';

// // export async function POST(request) {
// //   try {
// //     const { fullName, email, password, location, referralCode, turnstileToken } = await request.json();

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
// //       return new Response(
// //         JSON.stringify({ message: 'Turnstile verification failed' }),
// //         {
// //           status: 400,
// //           headers: { 'Content-Type': 'application/json' }
// //         }
// //       );
// //     }

// //     // Check if user already exists
// //     const usersRef = collection(db, 'users');
// //     const q = query(usersRef, where('email', '==', email));
// //     const querySnapshot = await getDocs(q);

// //     if (!querySnapshot.empty) {
// //       return new Response(
// //         JSON.stringify({ message: 'User already exists with this email' }),
// //         {
// //           status: 400,
// //           headers: { 'Content-Type': 'application/json' }
// //         }
// //       );
// //     }

// //     // Hash password
// //     const hashedPassword = await bcrypt.hash(password, 12);

// //     // Generate OTP
// //     const otp = Math.floor(100000 + Math.random() * 900000).toString();
// //     const otpExpiry = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

// //     // Handle referral
// //     let referredBy = null;
// //     if (referralCode) {
// //       const referralQuery = query(usersRef, where('referralCode', '==', referralCode));
// //       const referralSnapshot = await getDocs(referralQuery);
// //       if (!referralSnapshot.empty) {
// //         referredBy = referralSnapshot.docs[0].id;
// //       }
// //     }

// //     // Generate user's referral code
// //     const userReferralCode = `VPN${Math.random().toString(36).substring(2, 8).toUpperCase()}`;

// //     // Create user document
// //     const userData = {
// //       fullName,
// //       email,
// //       password: hashedPassword,
// //       location,
// //       referralCode: userReferralCode,
// //       referredBy,
// //       credits: 0,
// //       role: 'student',
// //       isVerified: false,
// //       createdAt: new Date(),
// //       enrolledCourses: [],
// //       completedCourses: [],
// //     };

// //     await addDoc(usersRef, userData);

// //     // Store OTP for verification
// //     await addDoc(collection(db, 'otpStore'), {
// //       email,
// //       otp,
// //       expiryAt: otpExpiry,
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
// //       subject: 'Verify Your Email - VPN Academy',
// //       html: `
// //         <div style="max-width: 600px; margin: 0 auto; padding: 20px; font-family: Arial, sans-serif;">
// //           <h2 style="color: #333; text-align: center;">Welcome to VPN Academy!</h2>
// //           <p>Hello ${fullName},</p>
// //           <p>Thank you for joining VPN Academy. To complete your registration, please verify your email address using the OTP below:</p>
// //           <div style="background: #f5f5f5; padding: 20px; text-align: center; margin: 20px 0;">
// //             <h1 style="color: #007bff; font-size: 32px; letter-spacing: 2px; margin: 0;">${otp}</h1>
// //           </div>
// //           <p>This OTP is valid for 10 minutes.</p>
// //           <p>If you didn't create this account, please ignore this email.</p>
// //           <p>Best regards,<br>The VPN Academy Team</p>
// //         </div>
// //       `,
// //     });

// //     return new Response(
// //       JSON.stringify({ message: 'Registration successful. Please check your email for OTP.' }),
// //       {
// //         status: 201,
// //         headers: { 'Content-Type': 'application/json' }
// //       }
// //     );
// //   } catch (error) {
// //     console.error('Registration error:', error);
// //     return new Response(
// //       JSON.stringify({ message: 'Internal server error' }),
// //       {
// //         status: 500,
// //         headers: { 'Content-Type': 'application/json' }
// //       }
// //     );
// //   }
// // }

// import { NextResponse } from 'next/server';
// import { createUserWithEmailAndPassword } from 'firebase/auth';
// import { collection, addDoc, query, where, getDocs, doc, setDoc } from 'firebase/firestore';
// import { auth, db } from '@/lib/firebase';
// import bcrypt from 'bcryptjs';
// import nodemailer from 'nodemailer';

// export async function POST(request) {
//   try {
//     const { fullName, email, password, location, referralCode, turnstileToken } = await request.json();

//     console.log('Registration attempt for:', email);

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
//       return NextResponse.json(
//         { message: 'Verification failed. Please try again.' },
//         { status: 400 }
//       );
//     }

//     // Check if user already exists in Firestore
//     const usersRef = collection(db, 'users');
//     const q = query(usersRef, where('email', '==', email));
//     const querySnapshot = await getDocs(q);

//     if (!querySnapshot.empty) {
//       return NextResponse.json(
//         { message: 'User already exists with this email' },
//         { status: 400 }
//       );
//     }

//     // Handle referral
//     let referredBy = null;
//     if (referralCode) {
//       const referralQuery = query(usersRef, where('referralCode', '==', referralCode));
//       const referralSnapshot = await getDocs(referralQuery);
//       if (!referralSnapshot.empty) {
//         referredBy = referralSnapshot.docs[0].id;
//       }
//     }

//     // Generate user's referral code
//     const userReferralCode = `VPN${Math.random().toString(36).substring(2, 8).toUpperCase()}`;

//     // Generate OTP
//     const otp = Math.floor(100000 + Math.random() * 900000).toString();
//     const otpExpiry = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

//     // Hash password for storage
//     const hashedPassword = await bcrypt.hash(password, 12);

//     // Prepare user data for Firestore
//     const userData = {
//       fullName,
//       email,
//       password: hashedPassword,
//       location,
//       referralCode: userReferralCode,
//       referredBy,
//       credits: 0,
//       role: 'student',
//       isVerified: false,
//       createdAt: new Date(),
//       enrolledCourses: [],
//       completedCourses: [],
//     };

//     // Create user in Firebase Auth (but mark as unverified)
//     let firebaseUser;
//     try {
//       const userCredential = await createUserWithEmailAndPassword(auth, email, password);
//       firebaseUser = userCredential.user;
//       console.log('Firebase Auth user created:', firebaseUser.uid);
//     } catch (firebaseError) {
//       console.error('Firebase Auth error:', firebaseError);
//       if (firebaseError.code === 'auth/email-already-in-use') {
//         return NextResponse.json(
//           { message: 'Email is already registered' },
//           { status: 400 }
//         );
//       }
//       throw firebaseError;
//     }

//     // Store user data in Firestore with Firebase Auth UID
//     await setDoc(doc(db, 'users', firebaseUser.uid), userData);

//     // Store OTP for verification
//     await addDoc(collection(db, 'otpStore'), {
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
//       subject: 'Verify Your Email - VPN Academy',
//       html: `
//         <div style="max-width: 600px; margin: 0 auto; padding: 20px; font-family: Arial, sans-serif;">
//           <h2 style="color: #333; text-align: center;">Welcome to VPN Academy!</h2>
//           <p>Hello ${fullName},</p>
//           <p>Thank you for joining VPN Academy. To complete your registration, please verify your email address using the OTP below:</p>
//           <div style="background: #f5f5f5; padding: 20px; text-align: center; margin: 20px 0;">
//             <h1 style="color: #007bff; font-size: 32px; letter-spacing: 2px; margin: 0;">${otp}</h1>
//           </div>
//           <p>This OTP is valid for 10 minutes.</p>
//           <p>If you didn't create this account, please ignore this email.</p>
//           <p>Best regards,<br>The VPN Academy Team</p>
//         </div>
//       `,
//     });

//     console.log('Registration successful for:', email);

//     return NextResponse.json(
//       { message: 'Registration successful. Please check your email for OTP.' },
//       { status: 201 }
//     );
//   } catch (error) {
//     console.error('Registration error:', error);
//     return NextResponse.json(
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
    const { fullName, email, password, location, referralCode, turnstileToken } = await request.json();

    console.log('Registration attempt for:', email);

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

    // Check if user already exists in Firestore
    const usersRef = collection(db, 'users');
    const q = query(usersRef, where('email', '==', email));
    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      return Response.json(
        { message: 'User already exists with this email' },
        { status: 400 }
      );
    }

    // Handle referral
    let referredBy = null;
    if (referralCode) {
      const referralQuery = query(usersRef, where('referralCode', '==', referralCode));
      const referralSnapshot = await getDocs(referralQuery);
      if (!referralSnapshot.empty) {
        referredBy = referralSnapshot.docs[0].id;
      }
    }

    // Generate user's referral code
    const userReferralCode = `VPN${Math.random().toString(36).substring(2, 8).toUpperCase()}`;

    // Generate OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const otpExpiry = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

    // Hash password for storage
    const hashedPassword = await bcrypt.hash(password, 12);

    // Prepare user data for Firestore
    const userData = {
      fullName,
      email,
      password: hashedPassword,
      location,
      referralCode: userReferralCode,
      referredBy,
      credits: 0,
      role: 'student',
      isVerified: false,
      createdAt: new Date(),
      enrolledCourses: [],
      completedCourses: [],
    };

    // Create user in Firebase Auth (but mark as unverified)
    let firebaseUser;
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      firebaseUser = userCredential.user;
      console.log('Firebase Auth user created:', firebaseUser.uid);
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

    // Store user data in Firestore with Firebase Auth UID
    await setDoc(doc(db, 'users', firebaseUser.uid), userData);

    // Store OTP for verification
    await addDoc(collection(db, 'otpStore'), {
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
      subject: 'Verify Your Email - VPN Academy',
      html: `
        <div style="max-width: 600px; margin: 0 auto; padding: 20px; font-family: Arial, sans-serif;">
          <h2 style="color: #333; text-align: center;">Welcome to VPN Academy!</h2>
          <p>Hello ${fullName},</p>
          <p>Thank you for joining VPN Academy. To complete your registration, please verify your email address using the OTP below:</p>
          <div style="background: #f5f5f5; padding: 20px; text-align: center; margin: 20px 0;">
            <h1 style="color: #007bff; font-size: 32px; letter-spacing: 2px; margin: 0;">${otp}</h1>
          </div>
          <p>This OTP is valid for 10 minutes.</p>
          <p>If you didn't create this account, please ignore this email.</p>
          <p>Best regards,<br>The VPN Academy Team</p>
        </div>
      `,
    });

    console.log('Registration successful for:', email);

    return Response.json(
      { message: 'Registration successful. Please check your email for OTP.' },
      { status: 201 }
    );
  } catch (error) {
    console.error('Registration error:', error);
    return Response.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}