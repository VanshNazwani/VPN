
// import { sendPasswordResetEmail } from 'firebase/auth';
// import { auth } from '@/lib/firebase';
// import { NextResponse } from 'next/server';

// export async function POST(request) {
//     try {
//         const body = await request.json();
//         const email = body?.email;

//         if (!email) {
//             return NextResponse.json({ message: 'Email is required' }, { status: 400 });
//         }

//         const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//         if (!emailRegex.test(email)) {
//             return NextResponse.json({ message: 'Invalid email format' }, { status: 400 });
//         }

//         // Note: make sure `auth` is correctly initialized for server usage.
//         await sendPasswordResetEmail(auth, email, {
//             url: `${process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000'}/login`,
//             handleCodeInApp: false,
//         });

//         return NextResponse.json({ message: 'Password reset email sent successfully', success: true });
//     } catch (error) {
//         console.error('Password reset error (server):', error);

//         let message = 'Failed to send password reset email';
//         if (error?.code) {
//             switch (error.code) {
//                 case 'auth/user-not-found':
//                     message = 'No account found with this email address';
//                     break;
//                 case 'auth/invalid-email':
//                     message = 'Invalid email address';
//                     break;
//                 case 'auth/too-many-requests':
//                     message = 'Too many requests. Please try again later';
//                     break;
//                 case 'auth/network-request-failed':
//                     message = 'Network error. Please check your connection';
//                     break;
//             }
//         } else if (error?.message) {
//             message = error.message;
//         }

//         return NextResponse.json({ message, success: false, error: error?.code ?? null }, { status: 400 });
//     }
// }

import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "@/lib/firebase"; // make sure this is client SDK only
import { NextResponse } from "next/server";

export async function POST(request) {
    try {
        // 🛡️ Try parsing body safely
        let body;
        try {
            body = await request.json();
        } catch {
            return NextResponse.json(
                { message: "Invalid or missing JSON body", success: false },
                { status: 400 }
            );
        }

        const email = body?.email;

        // 🛡️ Validate email existence
        if (!email) {
            return NextResponse.json(
                { message: "Email is required", success: false },
                { status: 400 }
            );
        }

        // 🛡️ Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return NextResponse.json(
                { message: "Invalid email format", success: false },
                { status: 400 }
            );
        }

        // ✅ Send reset email
        await sendPasswordResetEmail(auth, email, {
            url: `${process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"
                }/login`,
            handleCodeInApp: false,
        });

        return NextResponse.json({
            message: "Password reset email sent successfully",
            success: true,
        });
    } catch (error) {
        console.error("Password reset error (server):", error);

        let message = "Failed to send password reset email";
        if (error?.code) {
            switch (error.code) {
                case "auth/user-not-found":
                    message = "No account found with this email address";
                    break;
                case "auth/invalid-email":
                    message = "Invalid email address";
                    break;
                case "auth/too-many-requests":
                    message = "Too many requests. Please try again later";
                    break;
                case "auth/network-request-failed":
                    message = "Network error. Please check your connection";
                    break;
            }
        } else if (error?.message) {
            message = error.message;
        }

        return NextResponse.json(
            { message, success: false, error: error?.code ?? null },
            { status: 400 }
        );
    }
}
