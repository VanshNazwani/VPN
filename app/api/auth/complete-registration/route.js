// import { createUserWithEmailAndPassword } from 'firebase/auth';
// import { collection, query, where, getDocs, doc, setDoc, updateDoc, deleteDoc } from 'firebase/firestore';
// import { auth, db } from '@/lib/firebase';
// import bcrypt from 'bcryptjs';

// export async function POST(request) {
//   try {
//     const { fullName, email, password, location, referralCode, otp, tempUserId } = await request.json();

//     console.log('Completing registration for:', email);

//     // Verify OTP
//     const otpQuery = query(
//       collection(db, 'otpStore'),
//       where('email', '==', email),
//       where('otp', '==', otp),
//       where('verified', '==', false)
//     );
//     const otpSnapshot = await getDocs(otpQuery);

//     if (otpSnapshot.empty) {
//       return Response.json(
//         { message: 'Invalid OTP or OTP expired' },
//         { status: 400 }
//       );
//     }

//     const otpDoc = otpSnapshot.docs[0];
//     const otpData = otpDoc.data();

//     // Check if OTP is expired
//     if (new Date() > otpData.expiryAt.toDate()) {
//       return Response.json(
//         { message: 'OTP has expired' },
//         { status: 400 }
//       );
//     }

//     // Handle referral
//     let referredBy = null;
//     if (referralCode) {
//       const usersRef = collection(db, 'users');
//       const referralQuery = query(usersRef, where('referralCode', '==', referralCode));
//       const referralSnapshot = await getDocs(referralQuery);
//       if (!referralSnapshot.empty) {
//         referredBy = referralSnapshot.docs[0].id;
//       }
//     }

//     // Generate user's referral code
//     const userReferralCode = `VPN${Math.random().toString(36).substring(2, 8).toUpperCase()}`;

//     // Hash password for storage
//     const hashedPassword = await bcrypt.hash(password, 12);

//     // Create user in Firebase Auth
//     const userCredential = await createUserWithEmailAndPassword(auth, email, password);
//     const firebaseUser = userCredential.user;

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
//       isVerified: true, // Mark as verified since OTP was confirmed
//       createdAt: new Date(),
//       enrolledCourses: [],
//       completedCourses: [],
//     };

//     // Store user data in Firestore with Firebase Auth UID
//     await setDoc(doc(db, 'users', firebaseUser.uid), userData);

//     // Mark OTP as verified and clean up
//     await updateDoc(otpDoc.ref, { verified: true });

//     // Optionally delete the OTP record
//     // await deleteDoc(otpDoc.ref);

//     console.log('Registration completed for:', email);

//     return Response.json(
//       { message: 'Registration completed successfully!' },
//       { status: 201 }
//     );
//   } catch (error) {
//     console.error('Complete registration error:', error);
//     return Response.json(
//       { message: 'Internal server error' },
//       { status: 500 }
//     );
//   }
// }

import { createUserWithEmailAndPassword } from 'firebase/auth';
import { collection, query, where, getDocs, doc, setDoc, updateDoc, deleteDoc } from 'firebase/firestore';
import { auth, db } from '@/lib/firebase';
import nodemailer from 'nodemailer';

export async function POST(request) {
    try {
        const { fullName, email, password, location, referralCode, otp, tempUserId } = await request.json();

        console.log('Completing registration for:', email);

        // Verify OTP
        const otpQuery = query(
            collection(db, 'otpStore'),
            where('email', '==', email),
            where('otp', '==', otp),
            where('verified', '==', false)
        );
        const otpSnapshot = await getDocs(otpQuery);

        if (otpSnapshot.empty) {
            return Response.json(
                { message: 'Invalid OTP or OTP expired' },
                { status: 400 }
            );
        }

        const otpDoc = otpSnapshot.docs[0];
        const otpData = otpDoc.data();

        // Check if OTP is expired
        if (new Date() > otpData.expiryAt.toDate()) {
            return Response.json(
                { message: 'OTP has expired' },
                { status: 400 }
            );
        }

        // Handle referral
        let referredBy = null;
        let referrerName = null;
        if (referralCode) {
            const usersRef = collection(db, 'users');
            const referralQuery = query(usersRef, where('referralCode', '==', referralCode));
            const referralSnapshot = await getDocs(referralQuery);
            if (!referralSnapshot.empty) {
                referredBy = referralSnapshot.docs[0].id;
                referrerName = referralSnapshot.docs[0].data().fullName;
            }
        }

        // Generate user's referral code
        const userReferralCode = `VPN${Math.random().toString(36).substring(2, 8).toUpperCase()}`;

        // Create user in Firebase Auth
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const firebaseUser = userCredential.user;

        // Prepare user data for Firestore (NO PASSWORD STORED)
        const userData = {
            fullName,
            email,
            location,
            referralCode: userReferralCode,
            referredBy,
            credits: referredBy ? 10 : 0, // Give bonus credits if referred
            role: 'student',
            isVerified: true, // Mark as verified since OTP was confirmed
            verifiedAt: new Date(), // ← This one line
            createdAt: new Date(),
            enrolledCourses: [],
            completedCourses: [],
        };

        // Store user data in Firestore with Firebase Auth UID
        await setDoc(doc(db, 'users', firebaseUser.uid), userData);

        // Mark OTP as verified and clean up
        await updateDoc(otpDoc.ref, { verified: true });

        // Optionally delete the OTP record after successful registration
        await deleteDoc(otpDoc.ref);

        // Send Welcome Email
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });

        const welcomeEmailHtml = `
      <div style="max-width: 600px; margin: 0 auto; padding: 20px; font-family: Arial, sans-serif; background-color: #f9f9f9;">
        <div style="background-color: white; padding: 30px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
          <div style="text-align: center; margin-bottom: 30px;">
            <h1 style="color: #007bff; margin: 0; font-size: 28px;">🎉 Welcome to VPN Academy!</h1>
            <p style="color: #666; margin: 10px 0 0 0; font-size: 16px;">Your account has been successfully created</p>
          </div>
          
          <div style="margin-bottom: 25px;">
            <p style="margin: 0 0 15px 0; font-size: 16px;">Hello <strong>${fullName}</strong>,</p>
            <p style="margin: 0 0 15px 0; line-height: 1.6; color: #333;">
              Congratulations! Your VPN Academy account has been successfully created and verified. You now have full access to our platform and all its features.
            </p>
          </div>

          <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin-bottom: 25px;">
            <h3 style="color: #333; margin: 0 0 15px 0; font-size: 18px;">📋 Your Account Details:</h3>
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 8px 0; color: #666; font-weight: bold;">Email:</td>
                <td style="padding: 8px 0; color: #333;">${email}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #666; font-weight: bold;">Location:</td>
                <td style="padding: 8px 0; color: #333;">${location}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #666; font-weight: bold;">Your Referral Code:</td>
                <td style="padding: 8px 0; color: #007bff; font-weight: bold;">${userReferralCode}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #666; font-weight: bold;">Credits:</td>
                <td style="padding: 8px 0; color: #28a745; font-weight: bold;">${userData.credits}</td>
              </tr>
            </table>
            ${referredBy ? `<p style="margin: 15px 0 0 0; padding: 15px; background-color: #d4edda; border-radius: 5px; color: #155724;">✨ You were referred by <strong>${referrerName}</strong> and received bonus credits!</p>` : ''}
          </div>

          <div style="margin-bottom: 25px;">
            <h3 style="color: #333; margin: 0 0 15px 0; font-size: 18px;">🚀 What's Next?</h3>
            <ul style="margin: 0; padding-left: 20px; line-height: 1.8; color: #333;">
              <li>Browse our extensive course catalog</li>
              <li>Start learning with hands-on tutorials</li>
              <li>Join our community discussions</li>
              <li>Track your progress and earn certificates</li>
              <li>Share your referral code to earn more credits</li>
            </ul>
          </div>

          <div style="text-align: center; margin: 30px 0;">
            <a href="${process.env.NEXT_PUBLIC_APP_URL || 'https://your-domain.com'}/auth/login" 
               style="display: inline-block; padding: 12px 30px; background-color: #007bff; color: white; text-decoration: none; border-radius: 6px; font-weight: bold; font-size: 16px;">
              Start Learning Now →
            </a>
          </div>

          <div style="border-top: 1px solid #eee; padding-top: 20px; text-align: center;">
            <p style="margin: 0 0 10px 0; color: #666; font-size: 14px;">
              Need help? Contact us at <a href="mailto:support@vpnacademy.com" style="color: #007bff;">support@vpnacademy.com</a>
            </p>
            <p style="margin: 0; color: #999; font-size: 12px;">
              This email was sent to ${email}. You're receiving this because you successfully registered for VPN Academy.
            </p>
          </div>

          <div style="text-align: center; margin-top: 20px;">
            <p style="margin: 0; color: #333; font-weight: bold;">Happy Learning! 🎓</p>
            <p style="margin: 5px 0 0 0; color: #666;">The VPN Academy Team</p>
          </div>
        </div>
      </div>
    `;

        await transporter.sendMail({
            from: `"VPN Academy" <${process.env.EMAIL_USER}>`,
            to: email,
            subject: '🎉 Welcome to VPN Academy - Account Created Successfully!',
            html: welcomeEmailHtml,
        });

        // If user was referred, optionally credit the referrer
        if (referredBy) {
            try {
                const referrerRef = doc(db, 'users', referredBy);
                // Add referral bonus to referrer (you can adjust the amount)
                await updateDoc(referrerRef, {
                    credits: userData.credits + 5, // Give referrer 5 bonus credits
                });
            } catch (referrerError) {
                console.error('Error updating referrer credits:', referrerError);
                // Don't fail the registration if referrer update fails
            }
        }

        console.log('Registration completed and welcome email sent for:', email);

        return Response.json(
            {
                message: 'Registration completed successfully! Welcome email sent.',
                user: {
                    uid: firebaseUser.uid,
                    email: email,
                    fullName: fullName,
                    referralCode: userReferralCode,
                    credits: userData.credits
                }
            },
            { status: 201 }
        );
    } catch (error) {
        console.error('Complete registration error:', error);

        // If there's an error after user creation, you might want to clean up
        // But be careful not to delete a successfully created user

        return Response.json(
            { message: 'Internal server error during registration completion' },
            { status: 500 }
        );
    }
}