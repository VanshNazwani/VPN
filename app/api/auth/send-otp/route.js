import { collection, addDoc, query, where, getDocs } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import nodemailer from 'nodemailer';

export async function POST(request) {
    try {
        const { email, fullName, turnstileToken } = await request.json();

        console.log('Sending OTP for:', email);

        // Verify Cloudflare Turnstile (if provided)
        if (turnstileToken) {
            const turnstileResponse = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: `secret=${process.env.TURNSTILE_SECRET_KEY}&response=${turnstileToken}`,
            });

            const turnstileResult = await turnstileResponse.json();
            if (!turnstileResult.success) {
                return Response.json(
                    { message: 'Verification failed. Please try again.' },
                    { status: 400 }
                );
            }
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

        // Generate OTP
        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        const otpExpiry = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

        // Store OTP for verification (without creating user)
        const otpDoc = await addDoc(collection(db, 'otpStore'), {
            email,
            otp,
            expiryAt: otpExpiry,
            createdAt: new Date(),
            verified: false,
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
          <p>Thank you for joining VPN Academy. Please verify your email address using the OTP below:</p>
          <div style="background: #f5f5f5; padding: 20px; text-align: center; margin: 20px 0;">
            <h1 style="color: #007bff; font-size: 32px; letter-spacing: 2px; margin: 0;">${otp}</h1>
          </div>
          <p>This OTP is valid for 10 minutes.</p>
          <p>If you didn't request this, please ignore this email.</p>
          <p>Best regards,<br>The VPN Academy Team</p>
        </div>
      `,
        });

        return Response.json(
            {
                message: 'OTP sent successfully.',
                tempUserId: otpDoc.id // Return temp ID for verification
            },
            { status: 200 }
        );
    } catch (error) {
        console.error('Send OTP error:', error);
        return Response.json(
            { message: 'Internal server error' },
            { status: 500 }
        );
    }
}