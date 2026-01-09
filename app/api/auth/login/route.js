// // // // // // // import { NextResponse } from 'next/server';
// // // // // // // import { collection, query, where, getDocs } from 'firebase/firestore';
// // // // // // // import { db } from '@/lib/firebase';
// // // // // // // import bcrypt from 'bcryptjs';
// // // // // // // import { generateToken } from '@/lib/auth';

// // // // // // // export async function POST(request) {
// // // // // // //   try {
// // // // // // //     const { email, password, turnstileToken } = await request.json();

// // // // // // //     // Verify Cloudflare Turnstile
// // // // // // //     const turnstileResponse = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
// // // // // // //       method: 'POST',
// // // // // // //       headers: {
// // // // // // //         'Content-Type': 'application/x-www-form-urlencoded',
// // // // // // //       },
// // // // // // //       body: `secret=${process.env.TURNSTILE_SECRET_KEY}&response=${turnstileToken}`,
// // // // // // //     });

// // // // // // //     const turnstileResult = await turnstileResponse.json();
// // // // // // //     if (!turnstileResult.success) {
// // // // // // //       return NextResponse.json(
// // // // // // //         { message: 'Turnstile verification failed' },
// // // // // // //         { status: 400 }
// // // // // // //       );
// // // // // // //     }

// // // // // // //     // Find user
// // // // // // //     const usersRef = collection(db, 'users');
// // // // // // //     const q = query(usersRef, where('email', '==', email));
// // // // // // //     const querySnapshot = await getDocs(q);

// // // // // // //     if (querySnapshot.empty) {
// // // // // // //       return NextResponse.json(
// // // // // // //         { message: 'Invalid credentials' },
// // // // // // //         { status: 401 }
// // // // // // //       );
// // // // // // //     }

// // // // // // //     const userDoc = querySnapshot.docs[0];
// // // // // // //     const userData = userDoc.data();

// // // // // // //     // Check if user is verified
// // // // // // //     if (!userData.isVerified) {
// // // // // // //       return NextResponse.json(
// // // // // // //         { message: 'Please verify your email first' },
// // // // // // //         { status: 401 }
// // // // // // //       );
// // // // // // //     }

// // // // // // //     // Verify password
// // // // // // //     const isPasswordValid = await bcrypt.compare(password, userData.password);
// // // // // // //     if (!isPasswordValid) {
// // // // // // //       return NextResponse.json(
// // // // // // //         { message: 'Invalid credentials' },
// // // // // // //         { status: 401 }
// // // // // // //       );
// // // // // // //     }

// // // // // // //     // Generate JWT token
// // // // // // //     const token = generateToken({
// // // // // // //       userId: userDoc.id,
// // // // // // //       email: userData.email,
// // // // // // //       fullName: userData.fullName,
// // // // // // //       role: userData.role,
// // // // // // //     });

// // // // // // //     // Remove password from user data
// // // // // // //     const { password: _, ...userWithoutPassword } = userData;

// // // // // // //     return NextResponse.json({
// // // // // // //       message: 'Login successful',
// // // // // // //       token,
// // // // // // //       user: {
// // // // // // //         id: userDoc.id,
// // // // // // //         ...userWithoutPassword,
// // // // // // //       },
// // // // // // //     });
// // // // // // //   } catch (error) {
// // // // // // //     console.error('Login error:', error);
// // // // // // //     return NextResponse.json(
// // // // // // //       { message: 'Internal server error' },
// // // // // // //       { status: 500 }
// // // // // // //     );
// // // // // // //   }
// // // // // // // }

// // // // // // import  {NextResponse}  from 'next/server';
// // // // // // import { collection, query, where, getDocs } from 'firebase/firestore';
// // // // // // import { db } from '@/lib/firebase';
// // // // // // import bcrypt from 'bcryptjs';
// // // // // // import { generateToken } from '@/lib/auth';

// // // // // // export async function POST(request) {
// // // // // //   try {
// // // // // //     const { email, password, turnstileToken } = await request.json();

// // // // // //     // Validate input
// // // // // //     if (!email || !password || !turnstileToken) {
// // // // // //       return NextResponse.json(
// // // // // //         { message: 'Missing required fields' },
// // // // // //         { status: 400 }
// // // // // //       );
// // // // // //     }

// // // // // //     // Verify Cloudflare Turnstile
// // // // // //     const turnstileResponse = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
// // // // // //       method: 'POST',
// // // // // //       headers: {
// // // // // //         'Content-Type': 'application/x-www-form-urlencoded',
// // // // // //       },
// // // // // //       body: `secret=${process.env.TURNSTILE_SECRET_KEY}&response=${turnstileToken}`,
// // // // // //     });

// // // // // //     const turnstileResult = await turnstileResponse.json();
// // // // // //     if (!turnstileResult.success) {
// // // // // //       return NextResponse.json(
// // // // // //         { message: 'Turnstile verification failed' },
// // // // // //         { status: 400 }
// // // // // //       );
// // // // // //     }

// // // // // //     // Find user
// // // // // //     const usersRef = collection(db, 'users');
// // // // // //     const q = query(usersRef, where('email', '==', email));
// // // // // //     const querySnapshot = await getDocs(q);

// // // // // //     if (querySnapshot.empty) {
// // // // // //       return NextResponse.json(
// // // // // //         { message: 'Invalid email or password' },
// // // // // //         { status: 401 }
// // // // // //       );
// // // // // //     }

// // // // // //     const userDoc = querySnapshot.docs[0];
// // // // // //     const userData = userDoc.data();

// // // // // //     // Check if user is verified
// // // // // //     if (!userData.isVerified) {
// // // // // //       return NextResponse.json(
// // // // // //         { message: 'Please verify your email first' },
// // // // // //         { status: 401 }
// // // // // //       );
// // // // // //     }

// // // // // //     // Verify password
// // // // // //     const isPasswordValid = await bcrypt.compare(password, userData.password);
// // // // // //     if (!isPasswordValid) {
// // // // // //       return NextResponse.json(
// // // // // //         { message: 'Invalid email or password' },
// // // // // //         { status: 401 }
// // // // // //       );
// // // // // //     }

// // // // // //     // Generate JWT token
// // // // // //     const token = generateToken({
// // // // // //       userId: userDoc.id,
// // // // // //       email: userData.email,
// // // // // //       fullName: userData.fullName,
// // // // // //       role: userData.role,
// // // // // //     });

// // // // // //     // Remove password from user data
// // // // // //     const { password: _, ...userWithoutPassword } = userData;

// // // // // //     return NextResponse.json({
// // // // // //       message: 'Login successful',
// // // // // //       token,
// // // // // //       user: {
// // // // // //         id: userDoc.id,
// // // // // //         ...userWithoutPassword,
// // // // // //       },
// // // // // //     });
// // // // // //   } catch (error) {
// // // // // //     console.error('Login error:', error.message, error.stack);
// // // // // //     return NextResponse.json(
// // // // // //       { message: 'Internal server error' },
// // // // // //       { status: 500 }
// // // // // //     );
// // // // // //   }
// // // // // // }

// // // // // // Remove NextResponse import - using native Response API instead
// // // // // import { collection, query, where, getDocs } from 'firebase/firestore';
// // // // // import { db } from '@/lib/firebase';
// // // // // import bcrypt from 'bcryptjs';
// // // // // import { generateToken } from '@/lib/auth';

// // // // // export async function POST(request) {
// // // // //   try {
// // // // //     const { email, password, turnstileToken } = await request.json();

// // // // //     // Validate input
// // // // //     if (!email || !password || !turnstileToken) {
// // // // //       return new Response(
// // // // //         JSON.stringify({ message: 'Missing required fields' }),
// // // // //         {
// // // // //           status: 400,
// // // // //           headers: { 'Content-Type': 'application/json' }
// // // // //         }
// // // // //       );
// // // // //     }

// // // // //     // Verify Cloudflare Turnstile
// // // // //     const turnstileResponse = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
// // // // //       method: 'POST',
// // // // //       headers: {
// // // // //         'Content-Type': 'application/x-www-form-urlencoded',
// // // // //       },
// // // // //       body: `secret=${process.env.TURNSTILE_SECRET_KEY}&response=${turnstileToken}`,
// // // // //     });

// // // // //     const turnstileResult = await turnstileResponse.json();
// // // // //     if (!turnstileResult.success) {
// // // // //       return new Response(
// // // // //         JSON.stringify({ message: 'Turnstile verification failed' }),
// // // // //         {
// // // // //           status: 400,
// // // // //           headers: { 'Content-Type': 'application/json' }
// // // // //         }
// // // // //       );
// // // // //     }

// // // // //     // Find user
// // // // //     const usersRef = collection(db, 'users');
// // // // //     const q = query(usersRef, where('email', '==', email));
// // // // //     const querySnapshot = await getDocs(q);

// // // // //     if (querySnapshot.empty) {
// // // // //       return new Response(
// // // // //         JSON.stringify({ message: 'Invalid email or password' }),
// // // // //         {
// // // // //           status: 401,
// // // // //           headers: { 'Content-Type': 'application/json' }
// // // // //         }
// // // // //       );
// // // // //     }

// // // // //     const userDoc = querySnapshot.docs[0];
// // // // //     const userData = userDoc.data();

// // // // //     // Check if user is verified
// // // // //     if (!userData.isVerified) {
// // // // //       return new Response(
// // // // //         JSON.stringify({ message: 'Please verify your email first' }),
// // // // //         {
// // // // //           status: 401,
// // // // //           headers: { 'Content-Type': 'application/json' }
// // // // //         }
// // // // //       );
// // // // //     }

// // // // //     // Verify password
// // // // //     const isPasswordValid = await bcrypt.compare(password, userData.password);
// // // // //     if (!isPasswordValid) {
// // // // //       return new Response(
// // // // //         JSON.stringify({ message: 'Invalid email or password' }),
// // // // //         {
// // // // //           status: 401,
// // // // //           headers: { 'Content-Type': 'application/json' }
// // // // //         }
// // // // //       );
// // // // //     }

// // // // //     // Generate JWT token
// // // // //     const token = generateToken({
// // // // //       userId: userDoc.id,
// // // // //       email: userData.email,
// // // // //       fullName: userData.fullName,
// // // // //       role: userData.role,
// // // // //     });

// // // // //     // Remove password from user data
// // // // //     const { password: _, ...userWithoutPassword } = userData;

// // // // //     return new Response(
// // // // //       JSON.stringify({
// // // // //         message: 'Login successful',
// // // // //         token,
// // // // //         user: {
// // // // //           id: userDoc.id,
// // // // //           ...userWithoutPassword,
// // // // //         },
// // // // //       }),
// // // // //       {
// // // // //         status: 200,
// // // // //         headers: { 'Content-Type': 'application/json' }
// // // // //       }
// // // // //     );
// // // // //   } catch (error) {
// // // // //     console.error('Login error:', error.message, error.stack);
// // // // //     return new Response(
// // // // //       JSON.stringify({ message: 'Internal server error' }),
// // // // //       {
// // // // //         status: 500,
// // // // //         headers: { 'Content-Type': 'application/json' }
// // // // //       }
// // // // //     );
// // // // //   }
// // // // // }

// // // // import { NextResponse } from 'next/server';
// // // // import { signInWithEmailAndPassword } from 'firebase/auth';
// // // // import { doc, getDoc } from 'firebase/firestore';
// // // // import { auth, db } from '@/lib/firebase';
// // // // import { generateToken } from '@/lib/auth';

// // // // export async function POST(request) {
// // // //   try {
// // // //     const { email, password, turnstileToken } = await request.json();

// // // //     console.log('Login attempt for:', email);

// // // //     // Validate input
// // // //     if (!email || !password || !turnstileToken) {
// // // //       return NextResponse.json(
// // // //         { message: 'Missing required fields' },
// // // //         { status: 400 }
// // // //       );
// // // //     }

// // // //     // Verify Cloudflare Turnstile
// // // //     const turnstileResponse = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
// // // //       method: 'POST',
// // // //       headers: {
// // // //         'Content-Type': 'application/x-www-form-urlencoded',
// // // //       },
// // // //       body: `secret=${process.env.TURNSTILE_SECRET_KEY}&response=${turnstileToken}`,
// // // //     });

// // // //     const turnstileResult = await turnstileResponse.json();
// // // //     if (!turnstileResult.success) {
// // // //       console.log('Turnstile verification failed:', turnstileResult);
// // // //       return NextResponse.json(
// // // //         { message: 'Verification failed. Please try again.' },
// // // //         { status: 400 }
// // // //       );
// // // //     }

// // // //     // Authenticate with Firebase Auth
// // // //     let firebaseUser;
// // // //     try {
// // // //       const userCredential = await signInWithEmailAndPassword(auth, email, password);
// // // //       firebaseUser = userCredential.user;
// // // //       console.log('Firebase Auth successful for:', firebaseUser.uid);
// // // //     } catch (firebaseError) {
// // // //       console.error('Firebase Auth error:', firebaseError);
// // // //       let errorMessage = 'Invalid email or password';

// // // //       if (firebaseError.code === 'auth/user-not-found') {
// // // //         errorMessage = 'No account found with this email';
// // // //       } else if (firebaseError.code === 'auth/wrong-password') {
// // // //         errorMessage = 'Incorrect password';
// // // //       } else if (firebaseError.code === 'auth/user-disabled') {
// // // //         errorMessage = 'This account has been disabled';
// // // //       } else if (firebaseError.code === 'auth/too-many-requests') {
// // // //         errorMessage = 'Too many failed attempts. Please try again later';
// // // //       }

// // // //       return NextResponse.json(
// // // //         { message: errorMessage },
// // // //         { status: 401 }
// // // //       );
// // // //     }

// // // //     // Get user data from Firestore
// // // //     const userDoc = await getDoc(doc(db, 'users', firebaseUser.uid));
// // // //     if (!userDoc.exists()) {
// // // //       console.error('User document not found in Firestore');
// // // //       return NextResponse.json(
// // // //         { message: 'User data not found' },
// // // //         { status: 404 }
// // // //       );
// // // //     }

// // // //     const userData = userDoc.data();

// // // //     // Check if user is verified
// // // //     if (!userData.isVerified) {
// // // //       return NextResponse.json(
// // // //         { message: 'Please verify your email before logging in' },
// // // //         { status: 401 }
// // // //       );
// // // //     }

// // // //     // Generate custom JWT token for API authorization
// // // //     const customToken = generateToken({
// // // //       userId: firebaseUser.uid,
// // // //       email: userData.email,
// // // //       fullName: userData.fullName,
// // // //       role: userData.role,
// // // //     });

// // // //     // Remove password from user data
// // // //     const { password: _, ...userWithoutPassword } = userData;

// // // //     const responseData = {
// // // //       message: 'Login successful',
// // // //       token: customToken,
// // // //       user: {
// // // //         id: firebaseUser.uid,
// // // //         ...userWithoutPassword,
// // // //       },
// // // //     };

// // // //     console.log('Login successful for:', email, 'Role:', userData.role);

// // // //     return NextResponse.json(responseData);
// // // //   } catch (error) {
// // // //     console.error('Login error:', error);
// // // //     return NextResponse.json(
// // // //       { message: 'Internal server error' },
// // // //       { status: 500 }
// // // //     );
// // // //   }
// // // // }

// // // import { signInWithEmailAndPassword } from 'firebase/auth';
// // // import { doc, getDoc } from 'firebase/firestore';
// // // import { auth, db } from '@/lib/firebase';
// // // import { generateToken } from '@/lib/auth';

// // // export async function POST(request) {
// // //   try {
// // //     const { email, password, turnstileToken } = await request.json();

// // //     console.log('Login attempt for:', email);

// // //     // Validate input
// // //     if (!email || !password || !turnstileToken) {
// // //       return Response.json(
// // //         { message: 'Missing required fields' },
// // //         { status: 400 }
// // //       );
// // //     }

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
// // //       console.log('Turnstile verification failed:', turnstileResult);
// // //       return Response.json(
// // //         { message: 'Verification failed. Please try again.' },
// // //         { status: 400 }
// // //       );
// // //     }

// // //     // Authenticate with Firebase Auth
// // //     let firebaseUser;
// // //     try {
// // //       const userCredential = await signInWithEmailAndPassword(auth, email, password);
// // //       firebaseUser = userCredential.user;
// // //       console.log('Firebase Auth successful for:', firebaseUser.uid);
// // //     } catch (firebaseError) {
// // //       console.error('Firebase Auth error:', firebaseError);
// // //       let errorMessage = 'Invalid email or password';

// // //       if (firebaseError.code === 'auth/user-not-found') {
// // //         errorMessage = 'No account found with this email';
// // //       } else if (firebaseError.code === 'auth/wrong-password') {
// // //         errorMessage = 'Incorrect password';
// // //       } else if (firebaseError.code === 'auth/user-disabled') {
// // //         errorMessage = 'This account has been disabled';
// // //       } else if (firebaseError.code === 'auth/too-many-requests') {
// // //         errorMessage = 'Too many failed attempts. Please try again later';
// // //       }

// // //       return Response.json(
// // //         { message: errorMessage },
// // //         { status: 401 }
// // //       );
// // //     }

// // //     // Get user data from Firestore
// // //     const userDoc = await getDoc(doc(db, 'users', firebaseUser.uid));
// // //     if (!userDoc.exists()) {
// // //       console.error('User document not found in Firestore');
// // //       return Response.json(
// // //         { message: 'User data not found' },
// // //         { status: 404 }
// // //       );
// // //     }

// // //     const userData = userDoc.data();

// // //     // Check if user is verified
// // //     if (!userData.isVerified) {
// // //       return Response.json(
// // //         { message: 'Please verify your email before logging in' },
// // //         { status: 401 }
// // //       );
// // //     }

// // //     // Generate custom JWT token for API authorization
// // //     const customToken = generateToken({
// // //       userId: firebaseUser.uid,
// // //       email: userData.email,
// // //       fullName: userData.fullName,
// // //       role: userData.role,
// // //     });

// // //     // Remove password from user data
// // //     const { password: _, ...userWithoutPassword } = userData;

// // //     const responseData = {
// // //       message: 'Login successful',
// // //       token: customToken,
// // //       user: {
// // //         id: firebaseUser.uid,
// // //         ...userWithoutPassword,
// // //       },
// // //     };

// // //     console.log('Login successful for:', email, 'Role:', userData.role);

// // //     return Response.json(responseData);
// // //   } catch (error) {
// // //     console.error('Login error:', error);
// // //     return Response.json(
// // //       { message: 'Internal server error' },
// // //       { status: 500 }
// // //     );
// // //   }
// // // }

// // import { signInWithEmailAndPassword } from 'firebase/auth';
// // import { doc, getDoc } from 'firebase/firestore';
// // import { auth, db } from '@/lib/firebase';
// // import { generateToken } from '@/lib/auth';
// // import { cookies } from 'next/headers';

// // export async function POST(request) {
// //   try {
// //     const { email, password, turnstileToken } = await request.json();

// //     console.log('Login attempt for:', email);

// //     // Validate input
// //     if (!email || !password) {
// //       return Response.json(
// //         { message: 'Email and password are required' },
// //         { status: 400 }
// //       );
// //     }

// //     // Verify Cloudflare Turnstile (make it optional for better UX)
// //     if (turnstileToken) {
// //       try {
// //         const turnstileResponse = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
// //           method: 'POST',
// //           headers: {
// //             'Content-Type': 'application/x-www-form-urlencoded',
// //           },
// //           body: `secret=${process.env.TURNSTILE_SECRET_KEY}&response=${turnstileToken}`,
// //         });

// //         const turnstileResult = await turnstileResponse.json();
// //         if (!turnstileResult.success) {
// //           console.log('Turnstile verification failed:', turnstileResult);
// //           return Response.json(
// //             { message: 'Verification failed. Please try again.' },
// //             { status: 400 }
// //           );
// //         }
// //       } catch (turnstileError) {
// //         console.warn('Turnstile verification error:', turnstileError);
// //         // Continue without Turnstile if there's an error (fallback)
// //       }
// //     }

// //     // Authenticate with Firebase Auth
// //     let firebaseUser;
// //     try {
// //       const userCredential = await signInWithEmailAndPassword(auth, email, password);
// //       firebaseUser = userCredential.user;
// //       console.log('Firebase Auth successful for:', firebaseUser.uid);
// //     } catch (firebaseError) {
// //       console.error('Firebase Auth error:', firebaseError);
// //       let errorMessage = 'Invalid email or password';

// //       if (firebaseError.code === 'auth/user-not-found') {
// //         errorMessage = 'No account found with this email';
// //       } else if (firebaseError.code === 'auth/wrong-password') {
// //         errorMessage = 'Incorrect password';
// //       } else if (firebaseError.code === 'auth/user-disabled') {
// //         errorMessage = 'This account has been disabled';
// //       } else if (firebaseError.code === 'auth/too-many-requests') {
// //         errorMessage = 'Too many failed attempts. Please try again later';
// //       }

// //       return Response.json(
// //         { message: errorMessage },
// //         { status: 401 }
// //       );
// //     }

// //     // Get user data from Firestore
// //     const userDoc = await getDoc(doc(db, 'users', firebaseUser.uid));
// //     if (!userDoc.exists()) {
// //       console.error('User document not found in Firestore');
// //       return Response.json(
// //         { message: 'User data not found' },
// //         { status: 404 }
// //       );
// //     }

// //     const userData = userDoc.data();

// //     // Check if user is verified
// //     if (!userData.isVerified) {
// //       return Response.json(
// //         { message: 'Please verify your email before logging in' },
// //         { status: 401 }
// //       );
// //     }

// //     // Generate custom JWT token for API authorization
// //     const customToken = generateToken({
// //       userId: firebaseUser.uid,
// //       email: userData.email,
// //       fullName: userData.fullName,
// //       role: userData.role,
// //     });

// //     // Remove password from user data
// //     const { password: _, ...userWithoutPassword } = userData;

// //     const responseData = {
// //       message: 'Login successful',
// //       user: {
// //         id: firebaseUser.uid,
// //         ...userWithoutPassword,
// //       },
// //     };

// //     // Set cookie server-side
// //     const cookieStore = cookies();
// //     cookieStore.set('auth-token', customToken, {
// //       httpOnly: true,
// //       secure: process.env.NODE_ENV === 'production',
// //       sameSite: 'strict',
// //       maxAge: 7 * 24 * 60 * 60, // 7 days
// //       path: '/',
// //     });

// //     console.log('Login successful for:', email, 'Role:', userData.role);

// //     return Response.json(responseData);
// //   } catch (error) {
// //     console.error('Login error:', error);
// //     return Response.json(
// //       { message: 'Internal server error' },
// //       { status: 500 }
// //     );
// //   }
// // }

// import { signInWithEmailAndPassword } from 'firebase/auth';
// import { doc, getDoc } from 'firebase/firestore';
// import { auth, db } from '@/lib/firebase';
// import { generateToken } from '@/lib/auth';

// export async function POST(request) {
//   try {
//     const { email, password, turnstileToken } = await request.json();

//     console.log('Login attempt for:', email);

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
//       console.log('Firebase Auth successful for:', firebaseUser.uid);
//     } catch (firebaseError) {
//       console.error('Firebase Auth error:', firebaseError);
//       let errorMessage = 'Invalid email or password';

//       if (firebaseError.code === 'auth/user-not-found') {
//         errorMessage = 'No account found with this email';
//       } else if (firebaseError.code === 'auth/wrong-password') {
//         errorMessage = 'Incorrect password';
//       } else if (firebaseError.code === 'auth/user-disabled') {
//         errorMessage = 'This account has been disabled';
//       } else if (firebaseError.code === 'auth/too-many-requests') {
//         errorMessage = 'Too many failed attempts. Please try again later';
//       }

//       return Response.json(
//         { message: errorMessage },
//         { status: 401 }
//       );
//     }

//     // Get user data from Firestore
//     const userDoc = await getDoc(doc(db, 'users', firebaseUser.uid));
//     if (!userDoc.exists()) {
//       console.error('User document not found in Firestore');
//       return Response.json(
//         { message: 'User data not found' },
//         { status: 404 }
//       );
//     }

//     const userData = userDoc.data();

//     // Check if user is verified
//     if (!userData.isVerified) {
//       return Response.json(
//         { message: 'Please verify your email before logging in' },
//         { status: 401 }
//       );
//     }

//     // Generate custom JWT token for API authorization
//     const customToken = generateToken({
//       userId: firebaseUser.uid,
//       email: userData.email,
//       fullName: userData.fullName,
//       role: userData.role,
//     });

//     // Remove password from user data
//     const { password: _, ...userWithoutPassword } = userData;

//     const responseData = {
//       message: 'Login successful',
//       token: customToken,
//       user: {
//         id: firebaseUser.uid,
//         ...userWithoutPassword,
//       },
//     };

//     console.log('Login successful for:', email, 'Role:', userData.role);

//     return Response.json(responseData);
//   } catch (error) {
//     console.error('Login error:', error);
//     return Response.json(
//       { message: 'Internal server error' },
//       { status: 500 }
//     );
//   }
// }

import { signInWithEmailAndPassword } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { auth, db } from '@/lib/firebase';
import { generateToken } from '@/lib/auth';
import { cookies } from 'next/headers';

export async function POST(request) {
  try {
    const { email, password, turnstileToken } = await request.json();

    console.log('Login attempt for:', email);

    // Validate input
    if (!email || !password || !turnstileToken) {
      return Response.json(
        { message: 'Missing required fields' },
        { status: 400 }
      );
    }

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

    // Authenticate with Firebase Auth
    let firebaseUser;
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      firebaseUser = userCredential.user;
      console.log('Firebase Auth successful for:', firebaseUser.uid);
    } catch (firebaseError) {
      console.error('Firebase Auth error:', firebaseError);
      let errorMessage = 'Invalid email or password';

      if (firebaseError.code === 'auth/user-not-found') {
        errorMessage = 'No account found with this email';
      } else if (firebaseError.code === 'auth/wrong-password') {
        errorMessage = 'Incorrect password';
      } else if (firebaseError.code === 'auth/user-disabled') {
        errorMessage = 'This account has been disabled';
      } else if (firebaseError.code === 'auth/too-many-requests') {
        errorMessage = 'Too many failed attempts. Please try again later';
      }

      return Response.json(
        { message: errorMessage },
        { status: 401 }
      );
    }

    // Get user data from Firestore
    const userDoc = await getDoc(doc(db, 'users', firebaseUser.uid));
    if (!userDoc.exists()) {
      console.error('User document not found in Firestore');
      return Response.json(
        { message: 'User data not found' },
        { status: 404 }
      );
    }

    const userData = userDoc.data();

    // Check if user is verified
    if (!userData.isVerified) {
      return Response.json(
        { message: 'Please verify your email before logging in' },
        { status: 401 }
      );
    }

    // Generate custom JWT token for API authorization
    const customToken = generateToken({
      userId: firebaseUser.uid,
      email: userData.email,
      fullName: userData.fullName,
      role: userData.role,
    });

    // Set httpOnly cookie
    const cookieStore = await cookies();
    cookieStore.set('auth-token', customToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60, // 7 days
      path: '/',
    });

    // Remove password from user data
    const { password: _, ...userWithoutPassword } = userData;

    const responseData = {
      message: 'Login successful',
      token: customToken,
      user: {
        id: firebaseUser.uid,
        ...userWithoutPassword,
      },
    };

    console.log('Login successful for:', email, 'Role:', userData.role);

    return Response.json(responseData);
  } catch (error) {
    console.error('Login error:', error);
    return Response.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}
  