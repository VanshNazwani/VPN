// // // // // // // import { NextResponse } from 'next/server';
// // // // // // // import { doc, getDoc } from 'firebase/firestore';
// // // // // // // import { db } from '@/lib/firebase';
// // // // // // // import { withAuth } from '@/lib/middleware-auth';

// // // // // // // async function handler(request) {
// // // // // // //   try {
// // // // // // //     const userId = request.user.userId;

// // // // // // //     // Get user from database
// // // // // // //     const userDoc = await getDoc(doc(db, 'users', userId));
// // // // // // //     if (!userDoc.exists()) {
// // // // // // //       return NextResponse.json(
// // // // // // //         { message: 'User not found' },
// // // // // // //         { status: 404 }
// // // // // // //       );
// // // // // // //     }

// // // // // // //     const userData = userDoc.data();
// // // // // // //     const { password, ...userWithoutPassword } = userData;

// // // // // // //     return NextResponse.json({
// // // // // // //       user: {
// // // // // // //         id: userDoc.id,
// // // // // // //         ...userWithoutPassword,
// // // // // // //       },
// // // // // // //     });
// // // // // // //   } catch (error) {
// // // // // // //     console.error('Token verification error:', error);
// // // // // // //     return NextResponse.json(
// // // // // // //       { message: 'Invalid token' },
// // // // // // //       { status: 401 }
// // // // // // //     );
// // // // // // //   }
// // // // // // // }

// // // // // // // export const GET = withAuth(handler);

// // // // // // import { NextResponse } from 'next/server';
// // // // // // import { doc, getDoc } from 'firebase/firestore';
// // // // // // import { db } from '@/lib/firebase';
// // // // // // import { withAuth } from '@/lib/middleware-auth';

// // // // // // async function handler(request) {
// // // // // //   try {
// // // // // //     const userId = request.user?.userId;

// // // // // //     if (!userId) {
// // // // // //       return NextResponse.json(
// // // // // //         { message: 'No user ID provided in token' },
// // // // // //         { status: 401 }
// // // // // //       );
// // // // // //     }

// // // // // //     // Get user from database
// // // // // //     const userDoc = await getDoc(doc(db, 'users', userId));
// // // // // //     if (!userDoc.exists()) {
// // // // // //       return NextResponse.json(
// // // // // //         { message: 'User not found' },
// // // // // //         { status: 404 }
// // // // // //       );
// // // // // //     }

// // // // // //     const userData = userDoc.data();
// // // // // //     const { password, ...userWithoutPassword } = userData;

// // // // // //     return NextResponse.json({
// // // // // //       user: {
// // // // // //         id: userDoc.id,
// // // // // //         ...userWithoutPassword,
// // // // // //       },
// // // // // //     }, { status: 200 });
// // // // // //   } catch (error) {
// // // // // //     console.error('Token verification error:', error.message, error.stack);
// // // // // //     return NextResponse.json(
// // // // // //       { message: 'Internal server error' },
// // // // // //       { status: 500 }
// // // // // //     );
// // // // // //   }
// // // // // // }

// // // // // // export const POST = withAuth(handler); // Changed to POST to match AuthProvider
// // // // // // export const GET = withAuth(handler); // Support GET for flexibility

// // // // // import { NextResponse } from 'next/server';
// // // // // import { doc, getDoc } from 'firebase/firestore';
// // // // // import { db } from '@/lib/firebase';
// // // // // import { withAuth } from '@/lib/middleware-auth';

// // // // // async function handler(request) {
// // // // //   try {
// // // // //     const userId = request.user?.userId;

// // // // //     if (!userId) {
// // // // //       return NextResponse.json(
// // // // //         { message: 'No user ID provided in token' },
// // // // //         { status: 401 }
// // // // //       );
// // // // //     }

// // // // //     // Get user from database
// // // // //     const userDoc = await getDoc(doc(db, 'users', userId));
// // // // //     if (!userDoc.exists()) {
// // // // //       return NextResponse.json(
// // // // //         { message: 'User not found' },
// // // // //         { status: 404 }
// // // // //       );
// // // // //     }

// // // // //     const userData = userDoc.data();
// // // // //     const { password, ...userWithoutPassword } = userData;

// // // // //     return NextResponse.json({
// // // // //       user: {
// // // // //         id: userDoc.id,
// // // // //         ...userWithoutPassword,
// // // // //       },
// // // // //     }, { status: 200 });
// // // // //   } catch (error) {
// // // // //     console.error('Token verification error:', error);
// // // // //     return NextResponse.json(
// // // // //       { message: 'Internal server error' },
// // // // //       { status: 500 }
// // // // //     );
// // // // //   }
// // // // // }

// // // // // export const POST = withAuth(handler);
// // // // // export const GET = withAuth(handler);

// // // // // Remove NextResponse import - using native Response API instead
// // // // import { doc, getDoc } from 'firebase/firestore';
// // // // import { db } from '@/lib/firebase';
// // // // import { withAuth } from '@/lib/middleware-auth';

// // // // async function handler(request) {
// // // //   try {
// // // //     const userId = request.user?.userId;

// // // //     if (!userId) {
// // // //       return new Response(
// // // //         JSON.stringify({ message: 'No user ID provided in token' }),
// // // //         {
// // // //           status: 401,
// // // //           headers: { 'Content-Type': 'application/json' }
// // // //         }
// // // //       );
// // // //     }

// // // //     // Get user from database
// // // //     const userDoc = await getDoc(doc(db, 'users', userId));
// // // //     if (!userDoc.exists()) {
// // // //       return new Response(
// // // //         JSON.stringify({ message: 'User not found' }),
// // // //         {
// // // //           status: 404,
// // // //           headers: { 'Content-Type': 'application/json' }
// // // //         }
// // // //       );
// // // //     }

// // // //     const userData = userDoc.data();
// // // //     const { password, ...userWithoutPassword } = userData;

// // // //     return new Response(
// // // //       JSON.stringify({
// // // //         user: {
// // // //           id: userDoc.id,
// // // //           ...userWithoutPassword,
// // // //         },
// // // //       }),
// // // //       {
// // // //         status: 200,
// // // //         headers: { 'Content-Type': 'application/json' }
// // // //       }
// // // //     );
// // // //   } catch (error) {
// // // //     console.error('Token verification error:', error);
// // // //     return new Response(
// // // //       JSON.stringify({ message: 'Internal server error' }),
// // // //       {
// // // //         status: 500,
// // // //         headers: { 'Content-Type': 'application/json' }
// // // //       }
// // // //     );
// // // //   }
// // // // }

// // // // export const POST = withAuth(handler);
// // // // export const GET = withAuth(handler);
// // // import { NextResponse } from 'next/server';
// // // import { doc, getDoc } from 'firebase/firestore';
// // // import { auth, db } from '@/lib/firebase';
// // // import { generateToken } from '@/lib/auth';
// // // import admin from 'firebase-admin';

// // // // Initialize Firebase Admin if not already initialized
// // // if (!admin.apps.length) {
// // //   admin.initializeApp({
// // //     credential: admin.credential.cert({
// // //       projectId: process.env.FIREBASE_PROJECT_ID,
// // //       clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
// // //       privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
// // //     }),
// // //   });
// // // }

// // // export async function POST(request) {
// // //   try {
// // //     const authHeader = request.headers.get('authorization');
// // //     const token = authHeader?.replace('Bearer ', '');

// // //     if (!token) {
// // //       return NextResponse.json(
// // //         { message: 'No token provided' },
// // //         { status: 401 }
// // //       );
// // //     }

// // //     let firebaseUid;
// // //     try {
// // //       // Verify Firebase ID token
// // //       const decodedToken = await admin.auth().verifyIdToken(token);
// // //       firebaseUid = decodedToken.uid;
// // //       console.log('Firebase token verified for user:', firebaseUid);
// // //     } catch (firebaseError) {
// // //       console.error('Firebase token verification failed:', firebaseError);
// // //       return NextResponse.json(
// // //         { message: 'Invalid or expired token' },
// // //         { status: 401 }
// // //       );
// // //     }

// // //     // Get user data from Firestore
// // //     const userDoc = await getDoc(doc(db, 'users', firebaseUid));
// // //     if (!userDoc.exists()) {
// // //       return NextResponse.json(
// // //         { message: 'User not found' },
// // //         { status: 404 }
// // //       );
// // //     }

// // //     const userData = userDoc.data();
    
// // //     // Check if user is verified
// // //     if (!userData.isVerified) {
// // //       return NextResponse.json(
// // //         { message: 'Email not verified' },
// // //         { status: 401 }
// // //       );
// // //     }

// // //     // Generate custom JWT token for API authorization
// // //     const customToken = generateToken({
// // //       userId: firebaseUid,
// // //       email: userData.email,
// // //       fullName: userData.fullName,
// // //       role: userData.role,
// // //     });

// // //     const { password, ...userWithoutPassword } = userData;

// // //     return NextResponse.json({
// // //       user: {
// // //         id: firebaseUid,
// // //         ...userWithoutPassword,
// // //       },
// // //       customToken,
// // //     });
// // //   } catch (error) {
// // //     console.error('Token verification error:', error);
// // //     return NextResponse.json(
// // //       { message: 'Internal server error' },
// // //       { status: 500 }
// // //     );
// // //   }
// // // }

// // // // Support GET for backward compatibility
// // // export const GET = POST;

// // import { doc, getDoc } from 'firebase/firestore';
// // import { auth, db } from '@/lib/firebase';
// // import { generateToken } from '@/lib/auth';
// // import admin from 'firebase-admin';

// // // Initialize Firebase Admin if not already initialized
// // if (!admin.apps.length) {
// //   admin.initializeApp({
// //     credential: admin.credential.cert({
// //       projectId: process.env.FIREBASE_PROJECT_ID,
// //       clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
// //       privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
// //     }),
// //   });
// // }

// // export async function POST(request) {
// //   try {
// //     const authHeader = request.headers.get('authorization');
// //     const token = authHeader?.replace('Bearer ', '');

// //     if (!token) {
// //       return Response.json(
// //         { message: 'No token provided' },
// //         { status: 401 }
// //       );
// //     }

// //     let firebaseUid;
// //     try {
// //       // Verify Firebase ID token
// //       const decodedToken = await admin.auth().verifyIdToken(token);
// //       firebaseUid = decodedToken.uid;
// //       console.log('Firebase token verified for user:', firebaseUid);
// //     } catch (firebaseError) {
// //       console.error('Firebase token verification failed:', firebaseError);
// //       return Response.json(
// //         { message: 'Invalid or expired token' },
// //         { status: 401 }
// //       );
// //     }

// //     // Get user data from Firestore
// //     const userDoc = await getDoc(doc(db, 'users', firebaseUid));
// //     if (!userDoc.exists()) {
// //       return Response.json(
// //         { message: 'User not found' },
// //         { status: 404 }
// //       );
// //     }

// //     const userData = userDoc.data();
        
// //     // Check if user is verified
// //     if (!userData.isVerified) {
// //       return Response.json(
// //         { message: 'Email not verified' },
// //         { status: 401 }
// //       );
// //     }

// //     // Generate custom JWT token for API authorization
// //     const customToken = generateToken({
// //       userId: firebaseUid,
// //       email: userData.email,
// //       fullName: userData.fullName,
// //       role: userData.role,
// //     });

// //     const { password, ...userWithoutPassword } = userData;

// //     return Response.json({
// //       user: {
// //         id: firebaseUid,
// //         ...userWithoutPassword,
// //       },
// //       customToken,
// //     });
// //   } catch (error) {
// //     console.error('Token verification error:', error);
// //     return Response.json(
// //       { message: 'Internal server error' },
// //       { status: 500 }
// //     );
// //   }
// // }

// // // Support GET for backward compatibility
// // export const GET = POST;

// import { doc, getDoc } from 'firebase/firestore';
// import { db } from '@/lib/firebase';
// import { generateToken } from '@/lib/auth';
// import { cookies } from 'next/headers';
// import admin from 'firebase-admin';

// // Initialize Firebase Admin if not already initialized
// if (!admin.apps.length) {
//   try {
//     admin.initializeApp({
//       credential: admin.credential.cert({
//         projectId: process.env.FIREBASE_PROJECT_ID,
//         clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
//         privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
//       }),
//     });
//   } catch (error) {
//     console.error('Firebase Admin initialization error:', error);
//   }
// }

// export async function POST(request) {
//   try {
//     const authHeader = request.headers.get('authorization');
//     const token = authHeader?.replace('Bearer ', '');

//     if (!token) {
//       return Response.json(
//         { message: 'No token provided' },
//         { status: 401 }
//       );
//     }

//     let firebaseUid;
//     try {
//       // Verify Firebase ID token
//       const decodedToken = await admin.auth().verifyIdToken(token);
//       firebaseUid = decodedToken.uid;
//       console.log('Firebase token verified for user:', firebaseUid);
//     } catch (firebaseError) {
//       console.error('Firebase token verification failed:', firebaseError);
//       return Response.json(
//         { message: 'Invalid or expired token' },
//         { status: 401 }
//       );
//     }

//     // Get user data from Firestore
//     const userDoc = await getDoc(doc(db, 'users', firebaseUid));
//     if (!userDoc.exists()) {
//       return Response.json(
//         { message: 'User not found' },
//         { status: 404 }
//       );
//     }

//     const userData = userDoc.data();
        
//     // Check if user is verified
//     if (!userData.isVerified) {
//       return Response.json(
//         { message: 'Email not verified' },
//         { status: 401 }
//       );
//     }

//     // Generate custom JWT token for API authorization
//     const customToken = generateToken({
//       userId: firebaseUid,
//       email: userData.email,
//       fullName: userData.fullName,
//       role: userData.role,
//     });

//     // Set cookie server-side
//     const cookieStore = cookies();
//     cookieStore.set('auth-token', customToken, {
//       httpOnly: true,
//       secure: process.env.NODE_ENV === 'production',
//       sameSite: 'strict',
//       maxAge: 7 * 24 * 60 * 60, // 7 days
//       path: '/',
//     });

//     const { password, ...userWithoutPassword } = userData;

//     return Response.json({
//       user: {
//         id: firebaseUid,
//         ...userWithoutPassword,
//       },
//     });
//   } catch (error) {
//     console.error('Token verification error:', error);
//     return Response.json(
//       { message: 'Internal server error' },
//       { status: 500 }
//     );
//   }
// }

// // Support GET for backward compatibility
// export const GET = POST;

import { doc, getDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { generateToken } from '@/lib/auth';
import admin from 'firebase-admin';

// Initialize Firebase Admin if not already initialized
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert({
      projectId: process.env.FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
    }),
  });
}

export async function POST(request) {
  try {
    const authHeader = request.headers.get('authorization');
    const token = authHeader?.replace('Bearer ', '');

    if (!token) {
      return Response.json(
        { message: 'No token provided' },
        { status: 401 }
      );
    }

    let firebaseUid;
    try {
      // Verify Firebase ID token
      const decodedToken = await admin.auth().verifyIdToken(token);
      firebaseUid = decodedToken.uid;
      console.log('Firebase token verified for user:', firebaseUid);
    } catch (firebaseError) {
      console.error('Firebase token verification failed:', firebaseError);
      return Response.json(
        { message: 'Invalid or expired token' },
        { status: 401 }
      );
    }

    // Get user data from Firestore
    const userDoc = await getDoc(doc(db, 'users', firebaseUid));
    if (!userDoc.exists()) {
      return Response.json(
        { message: 'User not found' },
        { status: 404 }
      );
    }

    const userData = userDoc.data();
        
    // Check if user is verified
    if (!userData.isVerified) {
      return Response.json(
        { message: 'Email not verified' },
        { status: 401 }
      );
    }

    // Generate custom JWT token for API authorization
    const customToken = generateToken({
      userId: firebaseUid,
      email: userData.email,
      fullName: userData.fullName,
      role: userData.role,
    });

    const { password, ...userWithoutPassword } = userData;

    return Response.json({
      user: {
        id: firebaseUid,
        ...userWithoutPassword,
      },
      customToken,
    });
  } catch (error) {
    console.error('Token verification error:', error);
    return Response.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}

// Support GET for backward compatibility
export const GET = POST;