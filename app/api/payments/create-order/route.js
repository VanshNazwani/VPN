// // // // // // // // import { NextResponse } from 'next/server';
// // // // // // // // import { doc, getDoc, collection, addDoc } from 'firebase/firestore';
// // // // // // // // import { db } from '@/lib/firebase';
// // // // // // // // import { withAuth } from '@/lib/middleware-auth';
// // // // // // // // import Razorpay from 'razorpay';

// // // // // // // // const razorpay = new Razorpay({
// // // // // // // //   key_id: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
// // // // // // // //   key_secret: process.env.RAZORPAY_KEY_SECRET,
// // // // // // // // });

// // // // // // // // async function handler(request) {
// // // // // // // //   try {
// // // // // // // //     const { courseId, amount } = await request.json();

// // // // // // // //     // Get course details
// // // // // // // //     const courseDoc = await getDoc(doc(db, 'courses', courseId));
// // // // // // // //     if (!courseDoc.exists()) {
// // // // // // // //       return NextResponse.json(
// // // // // // // //         { message: 'Course not found' },
// // // // // // // //         { status: 404 }
// // // // // // // //       );
// // // // // // // //     }

// // // // // // // //     const courseData = courseDoc.data();

// // // // // // // //     // Create Razorpay order
// // // // // // // //     const options = {
// // // // // // // //       amount: amount * 100, // Convert to paise
// // // // // // // //       currency: 'INR',
// // // // // // // //       receipt: `course_${courseId}_${Date.now()}`,
// // // // // // // //       notes: {
// // // // // // // //         courseId,
// // // // // // // //         userId: request.user.userId,
// // // // // // // //         courseName: courseData.title,
// // // // // // // //       },
// // // // // // // //     };

// // // // // // // //     const order = await razorpay.orders.create(options);

// // // // // // // //     // Store order in database
// // // // // // // //     await addDoc(collection(db, 'orders'), {
// // // // // // // //       orderId: order.id,
// // // // // // // //       courseId,
// // // // // // // //       userId: request.user.userId,
// // // // // // // //       amount,
// // // // // // // //       currency: 'INR',
// // // // // // // //       status: 'created',
// // // // // // // //       createdAt: new Date(),
// // // // // // // //       courseName: courseData.title,
// // // // // // // //       userName: request.user.fullName,
// // // // // // // //     });

// // // // // // // //     return NextResponse.json({
// // // // // // // //       orderId: order.id,
// // // // // // // //       amount: order.amount,
// // // // // // // //       currency: order.currency,
// // // // // // // //     });
// // // // // // // //   } catch (error) {
// // // // // // // //     console.error('Order creation error:', error);
// // // // // // // //     return NextResponse.json(
// // // // // // // //       { message: 'Failed to create order' },
// // // // // // // //       { status: 500 }
// // // // // // // //     );
// // // // // // // //   }
// // // // // // // // }

// // // // // // // // export const POST = withAuth(handler);

// // // // // // // import { doc, getDoc, collection, addDoc } from 'firebase/firestore';
// // // // // // // import { db } from '@/lib/firebase';
// // // // // // // import { withAuth } from '@/lib/middleware-auth';
// // // // // // // import Razorpay from 'razorpay';

// // // // // // // const razorpay = new Razorpay({
// // // // // // //   key_id: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
// // // // // // //   key_secret: process.env.RAZORPAY_KEY_SECRET,
// // // // // // // });

// // // // // // // async function handler(request) {
// // // // // // //   try {
// // // // // // //     const { courseId, amount } = await request.json();

// // // // // // //     // Validate input parameters
// // // // // // //     if (!courseId || typeof courseId !== 'string') {
// // // // // // //       console.error('Invalid courseId:', courseId);
// // // // // // //       return Response.json(
// // // // // // //         { message: 'Valid courseId is required' },
// // // // // // //         { status: 400 }
// // // // // // //       );
// // // // // // //     }

// // // // // // //     if (!amount || typeof amount !== 'number' || amount <= 0) {
// // // // // // //       console.error('Invalid amount:', amount);
// // // // // // //       return Response.json(
// // // // // // //         { message: 'Valid amount is required' },
// // // // // // //         { status: 400 }
// // // // // // //       );
// // // // // // //     }

// // // // // // //     // Validate user data from middleware
// // // // // // //     if (!request.user || !request.user.userId) {
// // // // // // //       console.error('User data not found in request');
// // // // // // //       return Response.json(
// // // // // // //         { message: 'User authentication failed' },
// // // // // // //         { status: 401 }
// // // // // // //       );
// // // // // // //     }

// // // // // // //     console.log('Creating order for courseId:', courseId, 'userId:', request.user.userId);

// // // // // // //     // Get course details
// // // // // // //     const courseDoc = await getDoc(doc(db, 'courses', courseId));
// // // // // // //     if (!courseDoc.exists()) {
// // // // // // //       console.error('Course not found:', courseId);
// // // // // // //       return Response.json(
// // // // // // //         { message: 'Course not found' },
// // // // // // //         { status: 404 }
// // // // // // //       );
// // // // // // //     }

// // // // // // //     const courseData = courseDoc.data();

// // // // // // //     // Create Razorpay order
// // // // // // //     const options = {
// // // // // // //       amount: amount * 100, // Convert to paise
// // // // // // //       currency: 'INR',
// // // // // // //       receipt: `course_${courseId}_${Date.now()}`,
// // // // // // //       notes: {
// // // // // // //         courseId,
// // // // // // //         userId: request.user.userId,
// // // // // // //         courseName: courseData.title,
// // // // // // //       },
// // // // // // //     };

// // // // // // //     console.log('Creating Razorpay order with options:', options);
// // // // // // //     const order = await razorpay.orders.create(options);
// // // // // // //     console.log('Razorpay order created:', order.id);

// // // // // // //     // Store order in database
// // // // // // //     await addDoc(collection(db, 'orders'), {
// // // // // // //       orderId: order.id,
// // // // // // //       courseId,
// // // // // // //       userId: request.user.userId,
// // // // // // //       amount,
// // // // // // //       currency: 'INR',
// // // // // // //       status: 'created',
// // // // // // //       createdAt: new Date(),
// // // // // // //       courseName: courseData.title,
// // // // // // //       userName: request.user.fullName,
// // // // // // //     });

// // // // // // //     console.log('Order stored in database');

// // // // // // //     return Response.json({
// // // // // // //       orderId: order.id,
// // // // // // //       amount: order.amount,
// // // // // // //       currency: order.currency,
// // // // // // //     });
// // // // // // //   } catch (error) {
// // // // // // //     console.error('Order creation error:', error);

// // // // // // //     // More specific error handling
// // // // // // //     if (error.code === 'permission-denied') {
// // // // // // //       return Response.json(
// // // // // // //         { message: 'Access denied to database' },
// // // // // // //         { status: 403 }
// // // // // // //       );
// // // // // // //     }

// // // // // // //     if (error.message?.includes('courseId')) {
// // // // // // //       return Response.json(
// // // // // // //         { message: 'Invalid course ID provided' },
// // // // // // //         { status: 400 }
// // // // // // //       );
// // // // // // //     }

// // // // // // //     return Response.json(
// // // // // // //       { message: 'Failed to create order' },
// // // // // // //       { status: 500 }
// // // // // // //     );
// // // // // // //   }
// // // // // // // }

// // // // // // // export const POST = withAuth(handler);

// // // // // // // /api/payments/create-order/route.js
// // // // // // import { NextRequest, NextResponse } from 'next/server';
// // // // // // import Razorpay from 'razorpay';
// // // // // // import { db } from '@/lib/firebase'; // Your Firebase config
// // // // // // import { doc, setDoc, getDoc } from 'firebase/firestore';
// // // // // // import crypto from 'crypto';

// // // // // // const razorpay = new Razorpay({
// // // // // //   key_id: process.env.RAZORPAY_KEY_ID,
// // // // // //   key_secret: process.env.RAZORPAY_KEY_SECRET,
// // // // // // });

// // // // // // // Generate short receipt (max 40 chars)
// // // // // // function generateShortReceipt(courseId, userId) {
// // // // // //   const timestamp = Date.now().toString().slice(-8); // Last 8 digits
// // // // // //   const courseShort = courseId.slice(0, 8); // First 8 chars
// // // // // //   const userShort = userId.slice(0, 8); // First 8 chars
// // // // // //   return `${courseShort}_${userShort}_${timestamp}`; // ~32 chars max
// // // // // // }

// // // // // // export async function POST(request) {
// // // // // //   try {
// // // // // //     const { courseId, userId, amount, courseName, userEmail } = await request.json();

// // // // // //     console.log(`Creating order for courseId: ${courseId} userId: ${userId}`);

// // // // // //     // Input validation
// // // // // //     if (!courseId || !userId || !amount || !courseName || !userEmail) {
// // // // // //       return NextResponse.json(
// // // // // //         { error: 'Missing required fields' },
// // // // // //         { status: 400 }
// // // // // //       );
// // // // // //     }

// // // // // //     // Validate amount (should be in paise)
// // // // // //     const amountInPaise = parseInt(amount);
// // // // // //     if (isNaN(amountInPaise) || amountInPaise <= 0) {
// // // // // //       return NextResponse.json(
// // // // // //         { error: 'Invalid amount' },
// // // // // //         { status: 400 }
// // // // // //       );
// // // // // //     }

// // // // // //     // Generate short receipt
// // // // // //     const receipt = generateShortReceipt(courseId, userId);
// // // // // //     console.log(`Generated receipt: ${receipt} (Length: ${receipt.length})`);

// // // // // //     // Create order in database FIRST for security
// // // // // //     const orderData = {
// // // // // //       courseId,
// // // // // //       userId,
// // // // // //       amount: amountInPaise,
// // // // // //       courseName,
// // // // // //       userEmail,
// // // // // //       status: 'created',
// // // // // //       createdAt: new Date().toISOString(),
// // // // // //       receipt,
// // // // // //       razorpayOrderId: null,
// // // // // //     };

// // // // // //     const orderRef = doc(db, 'orders', receipt);

// // // // // //     // Check if order already exists
// // // // // //     const existingOrder = await getDoc(orderRef);
// // // // // //     if (existingOrder.exists()) {
// // // // // //       const existing = existingOrder.data();
// // // // // //       if (existing.status === 'completed') {
// // // // // //         return NextResponse.json(
// // // // // //           { error: 'Order already completed' },
// // // // // //           { status: 400 }
// // // // // //         );
// // // // // //       }
// // // // // //       // If order exists but not completed, use existing receipt
// // // // // //       console.log('Using existing order with receipt:', receipt);
// // // // // //     } else {
// // // // // //       // Create new order in database
// // // // // //       await setDoc(orderRef, orderData);
// // // // // //       console.log('Order created in database with receipt:', receipt);
// // // // // //     }

// // // // // //     // Create Razorpay order with short receipt
// // // // // //     const razorpayOptions = {
// // // // // //       amount: amountInPaise,
// // // // // //       currency: 'INR',
// // // // // //       receipt: receipt, // This is now guaranteed to be < 40 chars
// // // // // //       notes: {
// // // // // //         courseId,
// // // // // //         userId,
// // // // // //         courseName,
// // // // // //         userEmail,
// // // // // //         dbOrderId: receipt
// // // // // //       }
// // // // // //     };

// // // // // //     console.log('Creating Razorpay order with options:', {
// // // // // //       ...razorpayOptions,
// // // // // //       amount: `₹${priceInRupees} (${amountInPaise} paise)`
// // // // // //     });

// // // // // //     const order = await razorpay.orders.create(razorpayOptions);

// // // // // //     // Update database with Razorpay order ID
// // // // // //     await setDoc(orderRef, {
// // // // // //       ...orderData,
// // // // // //       razorpayOrderId: order.id,
// // // // // //       status: 'pending',
// // // // // //       updatedAt: new Date().toISOString()
// // // // // //     });

// // // // // //     console.log('Razorpay order created successfully:', order.id);

// // // // // //     return NextResponse.json({
// // // // // //       success: true,
// // // // // //       orderId: order.id,
// // // // // //       amount: order.amount,
// // // // // //       currency: order.currency,
// // // // // //       receipt: order.receipt,
// // // // // //       dbOrderId: receipt,
// // // // // //       key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID
// // // // // //     });

// // // // // //   } catch (error) {
// // // // // //     console.error('Order creation error:', error);

// // // // // //     // Handle Razorpay specific errors
// // // // // //     if (error.statusCode && error.error) {
// // // // // //       console.log('Razorpay error:', error.error);
// // // // // //       return NextResponse.json(
// // // // // //         { 
// // // // // //           error: 'Payment gateway error: ' + error.error.description,
// // // // // //           code: error.error.code
// // // // // //         },
// // // // // //         { status: error.statusCode }
// // // // // //       );
// // // // // //     }

// // // // // //     return NextResponse.json(
// // // // // //       { error: 'Internal server error: ' + error.message },
// // // // // //       { status: 500 }
// // // // // //     );
// // // // // //   }
// // // // // // }

// // // // // // // Payment verification endpoint (PATCH method)
// // // // // // export async function PATCH(request) {
// // // // // //   try {
// // // // // //     const { 
// // // // // //       razorpay_order_id, 
// // // // // //       razorpay_payment_id, 
// // // // // //       razorpay_signature,
// // // // // //       receipt 
// // // // // //     } = await request.json();

// // // // // //     console.log('Verifying payment for receipt:', receipt);

// // // // // //     // Verify payment signature
// // // // // //     const expectedSignature = crypto
// // // // // //       .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
// // // // // //       .update(`${razorpay_order_id}|${razorpay_payment_id}`)
// // // // // //       .digest('hex');

// // // // // //     if (expectedSignature !== razorpay_signature) {
// // // // // //       console.error('Invalid payment signature');
// // // // // //       return NextResponse.json(
// // // // // //         { error: 'Invalid payment signature' },
// // // // // //         { status: 400 }
// // // // // //       );
// // // // // //     }

// // // // // //     // Get order from database
// // // // // //     const orderRef = doc(db, 'orders', receipt);
// // // // // //     const orderDoc = await getDoc(orderRef);

// // // // // //     if (!orderDoc.exists()) {
// // // // // //       return NextResponse.json(
// // // // // //         { error: 'Order not found in database' },
// // // // // //         { status: 404 }
// // // // // //       );
// // // // // //     }

// // // // // //     const orderData = orderDoc.data();

// // // // // //     // Verify the Razorpay order ID matches
// // // // // //     if (orderData.razorpayOrderId !== razorpay_order_id) {
// // // // // //       console.error('Order ID mismatch');
// // // // // //       return NextResponse.json(
// // // // // //         { error: 'Order ID mismatch - possible tampering attempt' },
// // // // // //         { status: 400 }
// // // // // //       );
// // // // // //     }

// // // // // //     // Update order status to completed
// // // // // //     await setDoc(orderRef, {
// // // // // //       ...orderData,
// // // // // //       status: 'completed',
// // // // // //       paymentId: razorpay_payment_id,
// // // // // //       signature: razorpay_signature,
// // // // // //       completedAt: new Date().toISOString(),
// // // // // //       updatedAt: new Date().toISOString()
// // // // // //     });

// // // // // //     console.log('Payment verified and order completed for receipt:', receipt);

// // // // // //     // TODO: Grant course access to user
// // // // // //     // You can add your course access logic here
// // // // // //     // Example: await grantCourseAccess(orderData.userId, orderData.courseId);

// // // // // //     return NextResponse.json({
// // // // // //       success: true,
// // // // // //       message: 'Payment verified successfully',
// // // // // //       orderId: razorpay_order_id,
// // // // // //       paymentId: razorpay_payment_id
// // // // // //     });

// // // // // //   } catch (error) {
// // // // // //     console.error('Payment verification error:', error);
// // // // // //     return NextResponse.json(
// // // // // //       { error: 'Payment verification failed: ' + error.message },
// // // // // //       { status: 500 }
// // // // // //     );
// // // // // //   }
// // // // // // }

// // // // // // // Optional: GET method to check order status
// // // // // // export async function GET(request) {
// // // // // //   try {
// // // // // //     const { searchParams } = new URL(request.url);
// // // // // //     const receipt = searchParams.get('receipt');
// // // // // //     const orderId = searchParams.get('orderId');

// // // // // //     if (!receipt && !orderId) {
// // // // // //       return NextResponse.json(
// // // // // //         { error: 'Receipt or order ID required' },
// // // // // //         { status: 400 }
// // // // // //       );
// // // // // //     }

// // // // // //     let orderData = null;

// // // // // //     if (receipt) {
// // // // // //       // Get by receipt
// // // // // //       const orderRef = doc(db, 'orders', receipt);
// // // // // //       const orderDoc = await getDoc(orderRef);
// // // // // //       if (orderDoc.exists()) {
// // // // // //         orderData = { id: orderDoc.id, ...orderDoc.data() };
// // // // // //       }
// // // // // //     }

// // // // // //     if (!orderData) {
// // // // // //       return NextResponse.json(
// // // // // //         { error: 'Order not found' },
// // // // // //         { status: 404 }
// // // // // //       );
// // // // // //     }

// // // // // //     // Return order status without sensitive data
// // // // // //     return NextResponse.json({
// // // // // //       success: true,
// // // // // //       order: {
// // // // // //         id: orderData.id,
// // // // // //         status: orderData.status,
// // // // // //         amount: orderData.amount,
// // // // // //         courseName: orderData.courseName,
// // // // // //         createdAt: orderData.createdAt,
// // // // // //         completedAt: orderData.completedAt
// // // // // //       }
// // // // // //     });

// // // // // //   } catch (error) {
// // // // // //     console.error('Get order error:', error);
// // // // // //     return NextResponse.json(
// // // // // //       { error: 'Failed to fetch order' },
// // // // // //       { status: 500 }
// // // // // //     );
// // // // // //   }
// // // // // // }

// // // // // // api/payments/create-order/route.js
// // // // // import { NextResponse } from 'next/server';
// // // // // import Razorpay from 'razorpay';
// // // // // import { db } from '@/lib/firebase';
// // // // // import { doc, setDoc, getDoc } from 'firebase/firestore';

// // // // // const razorpay = new Razorpay({
// // // // //   key_id: process.env.,
// // // // //   key_secret: process.env.RAZORPAY_KEY_SECRET,
// // // // // });

// // // // // // Generate short receipt (max 40 chars)
// // // // // function generateShortReceipt(courseId, userId) {
// // // // //   const timestamp = Date.now().toString().slice(-8); // Last 8 digits
// // // // //   const courseShort = courseId.slice(0, 8); // First 8 chars
// // // // //   const userShort = userId.slice(0, 8); // First 8 chars
// // // // //   return `${courseShort}_${userShort}_${timestamp}`; // ~32 chars max
// // // // // }

// // // // // export async function POST(request) {
// // // // //   try {
// // // // //     const { courseId, userId, price, courseName, userEmail } = await request.json();

// // // // //     console.log(`Creating order for courseId: ${courseId} userId: ${userId}`);

// // // // //     // Input validation
// // // // //     if (!courseId || !userId || !price || !courseName || !userEmail) {
// // // // //       return NextResponse.json(
// // // // //         { error: 'Missing required fields' },
// // // // //         { status: 400 }
// // // // //       );
// // // // //     }

// // // // //     // Validate price and convert to paise (price is in rupees in your DB)
// // // // //     const priceInRupees = parseInt(price);
// // // // //     if (isNaN(priceInRupees) || priceInRupees <= 0) {
// // // // //       return NextResponse.json(
// // // // //         { error: 'Invalid price' },
// // // // //         { status: 400 }
// // // // //       );
// // // // //     }

// // // // //     const amountInPaise = priceInRupees * 100; // Convert rupees to paise for Razorpay

// // // // //     // Generate short receipt
// // // // //     const receipt = generateShortReceipt(courseId, userId);
// // // // //     console.log(`Generated receipt: ${receipt} (Length: ${receipt.length})`);

// // // // //     // Create order in database FIRST for security
// // // // //     const orderData = {
// // // // //       courseId,
// // // // //       userId,
// // // // //       price: priceInRupees, // Store original price in rupees
// // // // //       amount: amountInPaise, // Store amount in paise for Razorpay
// // // // //       courseName,
// // // // //       userEmail,
// // // // //       status: 'created',
// // // // //       createdAt: new Date(),
// // // // //       receipt,
// // // // //       orderId: null, // Will store Razorpay order ID here
// // // // //     };

// // // // //     const orderRef = doc(db, 'orders', receipt);

// // // // //     // Check if order already exists
// // // // //     const existingOrder = await getDoc(orderRef);
// // // // //     if (existingOrder.exists()) {
// // // // //       const existing = existingOrder.data();
// // // // //       if (existing.status === 'completed') {
// // // // //         return NextResponse.json(
// // // // //           { error: 'Order already completed' },
// // // // //           { status: 400 }
// // // // //         );
// // // // //       }
// // // // //       // If order exists but not completed, use existing receipt
// // // // //       console.log('Using existing order with receipt:', receipt);
// // // // //     } else {
// // // // //       // Create new order in database
// // // // //       await setDoc(orderRef, orderData);
// // // // //       console.log('Order created in database with receipt:', receipt);
// // // // //     }

// // // // //     // Create Razorpay order with short receipt
// // // // //     const razorpayOptions = {
// // // // //       amount: amountInPaise,
// // // // //       currency: 'INR',
// // // // //       receipt: receipt, // This is now guaranteed to be < 40 chars
// // // // //       notes: {
// // // // //         courseId,
// // // // //         userId,
// // // // //         courseName,
// // // // //         userEmail,
// // // // //         dbOrderId: receipt
// // // // //       }
// // // // //     };

// // // // //     console.log('Creating Razorpay order with options:', {
// // // // //       ...razorpayOptions,
// // // // //       amount: `₹${priceInRupees} (${amountInPaise} paise)`
// // // // //     });

// // // // //     const order = await razorpay.orders.create(razorpayOptions);

// // // // //     // Update database with Razorpay order ID (this matches your verify route expectation)
// // // // //     await setDoc(orderRef, {
// // // // //       ...orderData,
// // // // //       orderId: order.id, // Your verify route looks for 'orderId' field
// // // // //       status: 'pending',
// // // // //       updatedAt: new Date()
// // // // //     });

// // // // //     console.log('Razorpay order created successfully:', order.id);

// // // // //     return NextResponse.json({
// // // // //       success: true,
// // // // //       orderId: order.id,
// // // // //       amount: order.amount,
// // // // //       currency: order.currency,
// // // // //       receipt: order.receipt,
// // // // //       dbOrderId: receipt,
// // // // //       key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID
// // // // //     });

// // // // //   } catch (error) {
// // // // //     console.error('Order creation error:', error);

// // // // //     // Handle Razorpay specific errors
// // // // //     if (error.statusCode && error.error) {
// // // // //       console.log('Razorpay error:', error.error);
// // // // //       return NextResponse.json(
// // // // //         { 
// // // // //           error: 'Payment gateway error: ' + error.error.description,
// // // // //           code: error.error.code
// // // // //         },
// // // // //         { status: error.statusCode }
// // // // //       );
// // // // //     }

// // // // //     return NextResponse.json(
// // // // //       { error: 'Internal server error: ' + error.message },
// // // // //       { status: 500 }
// // // // //     );
// // // // //   }
// // // // // }

// // // // // // Optional: GET method to check order status
// // // // // export async function GET(request) {
// // // // //   try {
// // // // //     const { searchParams } = new URL(request.url);
// // // // //     const receipt = searchParams.get('receipt');
// // // // //     const orderId = searchParams.get('orderId');

// // // // //     if (!receipt && !orderId) {
// // // // //       return NextResponse.json(
// // // // //         { error: 'Receipt or order ID required' },
// // // // //         { status: 400 }
// // // // //       );
// // // // //     }

// // // // //     let orderData = null;

// // // // //     if (receipt) {
// // // // //       // Get by receipt
// // // // //       const orderRef = doc(db, 'orders', receipt);
// // // // //       const orderDoc = await getDoc(orderRef);
// // // // //       if (orderDoc.exists()) {
// // // // //         orderData = { id: orderDoc.id, ...orderDoc.data() };
// // // // //       }
// // // // //     }

// // // // //     if (!orderData) {
// // // // //       return NextResponse.json(
// // // // //         { error: 'Order not found' },
// // // // //         { status: 404 }
// // // // //       );
// // // // //     }

// // // // //     // Return order status without sensitive data
// // // // //     return NextResponse.json({
// // // // //       success: true,
// // // // //       order: {
// // // // //         id: orderData.id,
// // // // //         status: orderData.status,
// // // // //         amount: orderData.amount,
// // // // //         courseName: orderData.courseName,
// // // // //         createdAt: orderData.createdAt,
// // // // //         completedAt: orderData.completedAt
// // // // //       }
// // // // //     });

// // // // //   } catch (error) {
// // // // //     console.error('Get order error:', error);
// // // // //     return NextResponse.json(
// // // // //       { error: 'Failed to fetch order' },
// // // // //       { status: 500 }
// // // // //     );
// // // // //   }
// // // // // }

// // // // // api/payments/create-order/route.js
// // // // import { NextResponse } from 'next/server';
// // // // import Razorpay from 'razorpay';
// // // // import { db } from '@/lib/firebase';
// // // // import { doc, setDoc, getDoc } from 'firebase/firestore';
// // // // import { withAuth } from '@/lib/middleware-auth';

// // // // const razorpay = new Razorpay({
// // // //   key_id: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
// // // //   key_secret: process.env.RAZORPAY_KEY_SECRET,
// // // // });

// // // // // Generate short receipt (max 40 chars)
// // // // function generateShortReceipt(courseId, userId) {
// // // //   const timestamp = Date.now().toString().slice(-8); // Last 8 digits
// // // //   const courseShort = courseId.slice(0, 8); // First 8 chars
// // // //   const userShort = userId.slice(0, 8); // First 8 chars
// // // //   return `${courseShort}_${userShort}_${timestamp}`; // ~32 chars max
// // // // }

// // // // async function handler(request) {
// // // //   try {
// // // //     const { courseId, price, courseName } = await request.json();

// // // //     // Extract user info from authenticated request (set by withAuth middleware)
// // // //     const userId = request.user.userId;
// // // //     const userEmail = request.user.email;
// // // //     const userName = request.user.fullName;

// // // //     console.log(`Creating order for courseId: ${courseId} userId: ${userId}`);

// // // //     // Input validation
// // // //     if (!courseId || !price || !courseName) {
// // // //       return NextResponse.json(
// // // //         { error: 'Missing required fields: courseId, price, courseName' },
// // // //         { status: 400 }
// // // //       );
// // // //     }

// // // //     // Validate user data from middleware
// // // //     if (!userId || !userEmail) {
// // // //       console.error('User data not found in request');
// // // //       return NextResponse.json(
// // // //         { message: 'User authentication failed' },
// // // //         { status: 401 }
// // // //       );
// // // //     }

// // // //     // Validate price and convert to paise (price is in rupees in your DB)
// // // //     const priceInRupees = parseInt(price);
// // // //     if (isNaN(priceInRupees) || priceInRupees <= 0) {
// // // //       return NextResponse.json(
// // // //         { error: 'Invalid price' },
// // // //         { status: 400 }
// // // //       );
// // // //     }

// // // //     const amountInPaise = priceInRupees * 100; // Convert rupees to paise for Razorpay

// // // //     // Generate short receipt
// // // //     const receipt = generateShortReceipt(courseId, userId);
// // // //     console.log(`Generated receipt: ${receipt} (Length: ${receipt.length})`);

// // // //     // Create order in database FIRST for security
// // // //     const orderData = {
// // // //       courseId,
// // // //       userId,
// // // //       userEmail,
// // // //       userName,
// // // //       price: priceInRupees, // Store original price in rupees
// // // //       amount: amountInPaise, // Store amount in paise for Razorpay
// // // //       courseName,
// // // //       status: 'created',
// // // //       createdAt: new Date(),
// // // //       receipt,
// // // //       orderId: null, // Will store Razorpay order ID here
// // // //     };

// // // //     const orderRef = doc(db, 'orders', receipt);

// // // //     // Check if order already exists
// // // //     const existingOrder = await getDoc(orderRef);
// // // //     if (existingOrder.exists()) {
// // // //       const existing = existingOrder.data();
// // // //       if (existing.status === 'completed') {
// // // //         return NextResponse.json(
// // // //           { error: 'Order already completed' },
// // // //           { status: 400 }
// // // //         );
// // // //       }
// // // //       // If order exists but not completed, use existing receipt
// // // //       console.log('Using existing order with receipt:', receipt);
// // // //     } else {
// // // //       // Create new order in database
// // // //       await setDoc(orderRef, orderData);
// // // //       console.log('Order created in database with receipt:', receipt);
// // // //     }

// // // //     // Create Razorpay order with short receipt
// // // //     const razorpayOptions = {
// // // //       amount: amountInPaise,
// // // //       currency: 'INR',
// // // //       receipt: receipt, // This is now guaranteed to be < 40 chars
// // // //       notes: {
// // // //         courseId,
// // // //         userId,
// // // //         courseName,
// // // //         userEmail,
// // // //         userName,
// // // //         dbOrderId: receipt
// // // //       }
// // // //     };

// // // //     console.log('Creating Razorpay order with options:', {
// // // //       ...razorpayOptions,
// // // //       amount: `₹${priceInRupees} (${amountInPaise} paise)`
// // // //     });

// // // //     const order = await razorpay.orders.create(razorpayOptions);

// // // //     // Update database with Razorpay order ID (this matches your verify route expectation)
// // // //     await setDoc(orderRef, {
// // // //       ...orderData,
// // // //       orderId: order.id, // Your verify route looks for 'orderId' field
// // // //       status: 'pending',
// // // //       updatedAt: new Date()
// // // //     });

// // // //     console.log('Razorpay order created successfully:', order.id);

// // // //     return NextResponse.json({
// // // //       success: true,
// // // //       orderId: order.id,
// // // //       amount: order.amount,
// // // //       currency: order.currency,
// // // //       receipt: order.receipt,
// // // //       dbOrderId: receipt,
// // // //       key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID
// // // //     });

// // // //   } catch (error) {
// // // //     console.error('Order creation error:', error);

// // // //     // More specific error handling
// // // //     if (error.code === 'permission-denied') {
// // // //       return NextResponse.json(
// // // //         { message: 'Access denied to database' },
// // // //         { status: 403 }
// // // //       );
// // // //     }

// // // //     // Handle Razorpay specific errors
// // // //     if (error.statusCode && error.error) {
// // // //       console.log('Razorpay error:', error.error);
// // // //       return NextResponse.json(
// // // //         { 
// // // //           error: 'Payment gateway error: ' + error.error.description,
// // // //           code: error.error.code
// // // //         },
// // // //         { status: error.statusCode }
// // // //       );
// // // //     }

// // // //     return NextResponse.json(
// // // //       { error: 'Internal server error: ' + error.message },
// // // //       { status: 500 }
// // // //     );
// // // //   }
// // // // }

// // // // // Export POST method with authentication middleware
// // // // export const POST = withAuth(handler);

// // // // // Optional: GET method to check order status (also with auth)
// // // // async function getHandler(request) {
// // // //   try {
// // // //     const { searchParams } = new URL(request.url);
// // // //     const receipt = searchParams.get('receipt');
// // // //     const orderId = searchParams.get('orderId');

// // // //     if (!receipt && !orderId) {
// // // //       return NextResponse.json(
// // // //         { error: 'Receipt or order ID required' },
// // // //         { status: 400 }
// // // //       );
// // // //     }

// // // //     let orderData = null;

// // // //     if (receipt) {
// // // //       // Get by receipt
// // // //       const orderRef = doc(db, 'orders', receipt);
// // // //       const orderDoc = await getDoc(orderRef);
// // // //       if (orderDoc.exists()) {
// // // //         const data = orderDoc.data();
// // // //         // Verify that this order belongs to the authenticated user
// // // //         if (data.userId !== request.user.userId) {
// // // //           return NextResponse.json(
// // // //             { error: 'Unauthorized access to order' },
// // // //             { status: 403 }
// // // //           );
// // // //         }
// // // //         orderData = { id: orderDoc.id, ...data };
// // // //       }
// // // //     }

// // // //     if (!orderData) {
// // // //       return NextResponse.json(
// // // //         { error: 'Order not found' },
// // // //         { status: 404 }
// // // //       );
// // // //     }

// // // //     // Return order status without sensitive data
// // // //     return NextResponse.json({
// // // //       success: true,
// // // //       order: {
// // // //         id: orderData.id,
// // // //         status: orderData.status,
// // // //         amount: orderData.amount,
// // // //         price: orderData.price,
// // // //         courseName: orderData.courseName,
// // // //         createdAt: orderData.createdAt,
// // // //         completedAt: orderData.completedAt
// // // //       }
// // // //     });

// // // //   } catch (error) {
// // // //     console.error('Get order error:', error);
// // // //     return NextResponse.json(
// // // //       { error: 'Failed to fetch order' },
// // // //       { status: 500 }
// // // //     );
// // // //   }
// // // // }

// // // // export const GET = withAuth(getHandler);

// // // import { NextResponse } from 'next/server';
// // // import Razorpay from 'razorpay';
// // // import { db } from '@/lib/firebase';
// // // import { doc, setDoc, getDoc } from 'firebase/firestore';
// // // import { withAuth } from '@/lib/middleware-auth';

// // // const razorpay = new Razorpay({
// // //   key_id: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
// // //   key_secret: process.env.RAZORPAY_KEY_SECRET,
// // // });

// // // // Generate short receipt (max 40 chars)
// // // function generateShortReceipt(courseId, userId) {
// // //   const timestamp = Date.now().toString().slice(-8); // Last 8 digits
// // //   const courseShort = courseId.slice(0, 8); // First 8 chars
// // //   const userShort = userId.slice(0, 8); // First 8 chars
// // //   return `${courseShort}_${userShort}_${timestamp}`; // ~32 chars max
// // // }

// // // async function handler(request) {
// // //   console.log('=== CREATE ORDER API CALLED ===');

// // //   try {
// // //     const { courseId, price, courseName } = await request.json();

// // //     console.log('Request body:', { courseId, price, courseName });

// // //     // Extract user info from authenticated request (set by withAuth middleware)
// // //     const userId = request.user.userId;
// // //     const userEmail = request.user.email;
// // //     const userName = request.user.fullName;

// // //     console.log(`Creating order for courseId: ${courseId} userId: ${userId}`);

// // //     // Input validation
// // //     if (!courseId || !price || !courseName) {
// // //       console.error('Missing required fields:', { courseId, price, courseName });
// // //       return NextResponse.json(
// // //         { error: 'Missing required fields: courseId, price, courseName' },
// // //         { status: 400 }
// // //       );
// // //     }

// // //     // Validate user data from middleware
// // //     if (!userId || !userEmail) {
// // //       console.error('User data not found in request');
// // //       return NextResponse.json(
// // //         { error: 'User authentication failed' },
// // //         { status: 401 }
// // //       );
// // //     }

// // //     // Check if user already has this course
// // //     console.log('Checking if user already enrolled in this course...');
// // //     const userDocRef = doc(db, 'users', userId);
// // //     const userDoc = await getDoc(userDocRef);

// // //     if (userDoc.exists()) {
// // //       const userData = userDoc.data();
// // //       const enrolledCourses = userData.enrolledCourses || [];
// // //       if (enrolledCourses.includes(courseId)) {
// // //         console.log('User already enrolled in this course');
// // //         return NextResponse.json(
// // //           { error: 'You are already enrolled in this course' },
// // //           { status: 400 }
// // //         );
// // //       }
// // //     }

// // //     // Validate price and convert to paise (price is in rupees in your DB)
// // //     const priceInRupees = parseInt(price);
// // //     if (isNaN(priceInRupees) || priceInRupees <= 0) {
// // //       console.error('Invalid price:', price);
// // //       return NextResponse.json(
// // //         { error: 'Invalid price' },
// // //         { status: 400 }
// // //       );
// // //     }

// // //     const amountInPaise = priceInRupees * 100; // Convert rupees to paise for Razorpay

// // //     // Generate short receipt
// // //     const receipt = generateShortReceipt(courseId, userId);
// // //     console.log(`Generated receipt: ${receipt} (Length: ${receipt.length})`);

// // //     // Create order in database FIRST for security
// // //     const orderData = {
// // //       courseId,
// // //       userId,
// // //       userEmail,
// // //       userName,
// // //       price: priceInRupees, // Store original price in rupees
// // //       amount: amountInPaise, // Store amount in paise for Razorpay
// // //       courseName,
// // //       status: 'created',
// // //       createdAt: new Date(),
// // //       receipt,
// // //       orderId: null, // Will store Razorpay order ID here
// // //     };

// // //     const orderRef = doc(db, 'orders', receipt);

// // //     // Check if order already exists
// // //     const existingOrder = await getDoc(orderRef);
// // //     if (existingOrder.exists()) {
// // //       const existing = existingOrder.data();
// // //       if (existing.status === 'completed') {
// // //         console.log('Order already completed');
// // //         return NextResponse.json(
// // //           { error: 'Order already completed' },
// // //           { status: 400 }
// // //         );
// // //       }
// // //       // If order exists but not completed, use existing receipt
// // //       console.log('Using existing order with receipt:', receipt);
// // //     } else {
// // //       // Create new order in database
// // //       await setDoc(orderRef, orderData);
// // //       console.log('Order created in database with receipt:', receipt);
// // //     }

// // //     // Create Razorpay order with short receipt
// // //     const razorpayOptions = {
// // //       amount: amountInPaise,
// // //       currency: 'INR',
// // //       receipt: receipt, // This is now guaranteed to be < 40 chars
// // //       notes: {
// // //         courseId,
// // //         userId,
// // //         courseName,
// // //         userEmail,
// // //         userName,
// // //         dbOrderId: receipt
// // //       }
// // //     };

// // //     console.log('Creating Razorpay order with options:', {
// // //       ...razorpayOptions,
// // //       amount: `₹${priceInRupees} (${amountInPaise} paise)`
// // //     });

// // //     const order = await razorpay.orders.create(razorpayOptions);

// // //     // Update database with Razorpay order ID (this matches your verify route expectation)
// // //     await setDoc(orderRef, {
// // //       ...orderData,
// // //       orderId: order.id, // Your verify route looks for 'orderId' field
// // //       status: 'pending',
// // //       updatedAt: new Date()
// // //     });

// // //     console.log('Razorpay order created successfully:', order.id);

// // //     return NextResponse.json({
// // //       success: true,
// // //       orderId: order.id,
// // //       amount: order.amount,
// // //       currency: order.currency,
// // //       receipt: order.receipt,
// // //       dbOrderId: receipt,
// // //       key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID
// // //     });

// // //   } catch (error) {
// // //     console.error('=== ORDER CREATION ERROR ===');
// // //     console.error('Error details:', error);

// // //     // More specific error handling
// // //     if (error.code === 'permission-denied') {
// // //       return NextResponse.json(
// // //         { error: 'Access denied to database' },
// // //         { status: 403 }
// // //       );
// // //     }

// // //     // Handle Razorpay specific errors
// // //     if (error.statusCode && error.error) {
// // //       console.log('Razorpay error:', error.error);
// // //       return NextResponse.json(
// // //         { 
// // //           error: 'Payment gateway error: ' + error.error.description,
// // //           code: error.error.code
// // //         },
// // //         { status: error.statusCode }
// // //       );
// // //     }

// // //     return NextResponse.json(
// // //       { error: 'Internal server error: ' + error.message },
// // //       { status: 500 }
// // //     );
// // //   }
// // // }

// // // // Export POST method with authentication middleware
// // // export const POST = withAuth(handler);

// // // // Optional: GET method to check order status (also with auth)
// // // async function getHandler(request) {
// // //   try {
// // //     const { searchParams } = new URL(request.url);
// // //     const receipt = searchParams.get('receipt');
// // //     const orderId = searchParams.get('orderId');

// // //     if (!receipt && !orderId) {
// // //       return NextResponse.json(
// // //         { error: 'Receipt or order ID required' },
// // //         { status: 400 }
// // //       );
// // //     }

// // //     let orderData = null;

// // //     if (receipt) {
// // //       // Get by receipt
// // //       const orderRef = doc(db, 'orders', receipt);
// // //       const orderDoc = await getDoc(orderRef);
// // //       if (orderDoc.exists()) {
// // //         const data = orderDoc.data();
// // //         // Verify that this order belongs to the authenticated user
// // //         if (data.userId !== request.user.userId) {
// // //           return NextResponse.json(
// // //             { error: 'Unauthorized access to order' },
// // //             { status: 403 }
// // //           );
// // //         }
// // //         orderData = { id: orderDoc.id, ...data };
// // //       }
// // //     }

// // //     if (!orderData) {
// // //       return NextResponse.json(
// // //         { error: 'Order not found' },
// // //         { status: 404 }
// // //       );
// // //     }

// // //     // Return order status without sensitive data
// // //     return NextResponse.json({
// // //       success: true,
// // //       order: {
// // //         id: orderData.id,
// // //         status: orderData.status,
// // //         amount: orderData.amount,
// // //         price: orderData.price,
// // //         courseName: orderData.courseName,
// // //         createdAt: orderData.createdAt,
// // //         completedAt: orderData.completedAt
// // //       }
// // //     });

// // //   } catch (error) {
// // //     console.error('Get order error:', error);
// // //     return NextResponse.json(
// // //       { error: 'Failed to fetch order' },
// // //       { status: 500 }
// // //     );
// // //   }
// // // }

// // // export const GET = withAuth(getHandler);

// // import { NextResponse } from 'next/server';
// // import { db } from '@/lib/firebase';
// // import { doc, getDoc, setDoc, updateDoc, arrayUnion } from 'firebase/firestore';
// // import Razorpay from 'razorpay';
// // import { withAuth } from '@/lib/middleware-auth';

// // // Initialize Razorpay
// // const razorpay = new Razorpay({
// //   key_id: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
// //   key_secret: process.env.RAZORPAY_KEY_SECRET,
// // });

// // async function handler(request) {
// //   try {
// //     console.log('=== CREATE ORDER API CALLED ===');

// //     const body = await request.json();
// //     const { courseId, price, courseName } = body;
// //     const userId = request.user.userId;

// //     console.log('Request body:', { courseId, price, courseName });
// //     console.log('Creating order for courseId:', courseId, 'userId:', userId);

// //     // Validate required fields
// //     if (!courseId || !price || !courseName) {
// //       console.error('Missing required fields:', { courseId, price, courseName });
// //       return NextResponse.json(
// //         { 
// //           success: false,
// //           error: 'Missing required fields: courseId, price, or courseName' 
// //         },
// //         { status: 400 }
// //       );
// //     }

// //     // Get user data
// //     const userDocRef = doc(db, 'users', userId);
// //     const userDoc = await getDoc(userDocRef);

// //     if (!userDoc.exists()) {
// //       console.error('User not found:', userId);
// //       return NextResponse.json(
// //         { 
// //           success: false,
// //           error: 'User not found' 
// //         },
// //         { status: 404 }
// //       );
// //     }

// //     const userData = userDoc.data();
// //     console.log('User data retrieved for:', userData.email);

// //     // Check if user is already enrolled
// //     console.log('Checking if user already enrolled in this course...');
// //     const enrolledCourses = userData.enrolledCourses || [];
// //     if (enrolledCourses.includes(courseId)) {
// //       console.log('User already enrolled in course:', courseId);
// //       return NextResponse.json(
// //         { 
// //           success: false,
// //           error: 'You are already enrolled in this course' 
// //         },
// //         { status: 400 }
// //       );
// //     }

// //     // Generate unique receipt ID
// //     const timestamp = Date.now().toString().slice(-8);
// //     const receipt = `${courseId.slice(0, 8)}_${userId.slice(0, 8)}_${timestamp}`;
// //     console.log('Generated receipt:', receipt, '(Length:', receipt.length + ')');

// //     // Create order document in Firebase first
// //     const orderData = {
// //       userId,
// //       courseId,
// //       courseName: courseData.title, // Use actual course title
// //       price: actualPrice,
// //       originalPrice: courseData.originalPrice || null,
// //       currency: 'INR',
// //       receipt,
// //       status: 'created',
// //       createdAt: new Date(),
// //       userEmail: userData.email,
// //       userName: userData.fullName || userData.name || 'Unknown',
// //       courseCategory: courseData.category,
// //       courseLevel: courseData.level,
// //       courseDuration: courseData.duration,
// //     };

// //     await setDoc(doc(db, 'orders', receipt), orderData);
// //     console.log('Order created in database with receipt:', receipt);

// //     // Create Razorpay order
// //     const razorpayOrderOptions = {
// //       amount: price * 100, // Amount in paise
// //       currency: 'INR',
// //       receipt: receipt,
// //       notes: {
// //         courseId,
// //         userId,
// //         courseName,
// //         userEmail: userData.email,
// //         userName: userData.fullName || userData.name || 'Unknown',
// //         dbOrderId: receipt
// //       }
// //     };

// //     console.log('Creating Razorpay order with options:', {
// //       amount: `₹${price} (${price * 100} paise)`,
// //       currency: 'INR',
// //       receipt: receipt,
// //       notes: razorpayOrderOptions.notes
// //     });

// //     const razorpayOrder = await razorpay.orders.create(razorpayOrderOptions);
// //     console.log('Razorpay order created successfully:', razorpayOrder.id);

// //     // Update order with Razorpay order ID
// //     await updateDoc(doc(db, 'orders', receipt), {
// //       razorpayOrderId: razorpayOrder.id,
// //       updatedAt: new Date(),
// //     });

// //     // Prepare response - THIS IS THE KEY PART
// //     const response = {
// //       success: true,
// //       orderId: razorpayOrder.id,
// //       amount: razorpayOrder.amount,
// //       currency: razorpayOrder.currency,
// //       key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
// //       receipt: receipt,
// //       dbOrderId: receipt,
// //       notes: razorpayOrder.notes,
// //     };

// //     console.log('Sending response:', response);

// //     return NextResponse.json(response, { status: 200 });

// //   } catch (error) {
// //     console.error('Create order error:', error);

// //     // Handle specific Razorpay errors
// //     if (error.error) {
// //       console.error('Razorpay error details:', error.error);
// //       return NextResponse.json(
// //         { 
// //           success: false,
// //           error: `Razorpay Error: ${error.error.description || error.error.code || error.message}` 
// //         },
// //         { status: 400 }
// //       );
// //     }

// //     return NextResponse.json(
// //       { 
// //         success: false,
// //         error: 'Failed to create order: ' + error.message 
// //       },
// //       { status: 500 }
// //     );
// //   }
// // }

// // export const POST = withAuth(handler);

// import { NextResponse } from 'next/server';
// import { db } from '@/lib/firebase';
// import { doc, getDoc, setDoc, updateDoc, arrayUnion } from 'firebase/firestore';
// import Razorpay from 'razorpay';
// import { withAuth } from '@/lib/middleware-auth';

// // Initialize Razorpay
// const razorpay = new Razorpay({
//   key_id: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
//   key_secret: process.env.RAZORPAY_KEY_SECRET,
// });

// async function handler(request) {
//   try {
//     console.log('=== CREATE ORDER API CALLED ===');

//     const body = await request.json();
//     const { courseId, price, courseName } = body;
//     const userId = request.user.userId;

//     console.log('Request body:', { courseId, price, courseName });
//     console.log('Creating order for courseId:', courseId, 'userId:', userId);

//     // Validate required fields
//     if (!courseId || !price || !courseName) {
//       console.error('Missing required fields:', { courseId, price, courseName });
//       return NextResponse.json(
//         {
//           success: false,
//           error: 'Missing required fields: courseId, price, or courseName'
//         },
//         { status: 400 }
//       );
//     }

//     // Get user data
//     const userDocRef = doc(db, 'users', userId);
//     const userDoc = await getDoc(userDocRef);

//     if (!userDoc.exists()) {
//       console.error('User not found:', userId);
//       return NextResponse.json(
//         {
//           success: false,
//           error: 'User not found'
//         },
//         { status: 404 }
//       );
//     }

//     const userData = userDoc.data();
//     console.log('User data retrieved for:', userData.email);

//     // Get course data from Firebase
//     console.log('Fetching course data for courseId:', courseId);
//     const courseDocRef = doc(db, 'courses', courseId);
//     const courseDoc = await getDoc(courseDocRef);

//     if (!courseDoc.exists()) {
//       console.error('Course not found:', courseId);
//       return NextResponse.json(
//         {
//           success: false,
//           error: 'Course not found'
//         },
//         { status: 404 }
//       );
//     }

//     const courseData = courseDoc.data();
//     console.log('Course data retrieved:', courseData.title);

//     // Check if user is already enrolled
//     console.log('Checking if user already enrolled in this course...');
//     const enrolledCourses = userData.enrolledCourses || [];
//     if (enrolledCourses.includes(courseId)) {
//       console.log('User already enrolled in course:', courseId);
//       return NextResponse.json(
//         {
//           success: false,
//           error: 'You are already enrolled in this course'
//         },
//         { status: 400 }
//       );
//     }

//     // Generate unique receipt ID
//     const timestamp = Date.now().toString().slice(-8);
//     const receipt = `${courseId.slice(0, 8)}_${userId.slice(0, 8)}_${timestamp}`;
//     console.log('Generated receipt:', receipt, '(Length:', receipt.length + ')');

//     // Create order document in Firebase first
//     const orderData = {
//       userId,
//       courseId,
//       courseName: courseData.title || courseName, // Use actual course title, fallback to provided courseName
//       price: price, // Use the price from request body
//       originalPrice: courseData.originalPrice || courseData.price || price,
//       currency: 'INR',
//       receipt,
//       status: 'created',
//       createdAt: new Date(),
//       userEmail: userData.email,
//       userName: userData.fullName || userData.name || 'Unknown',
//       courseCategory: courseData.category || 'Uncategorized',
//       courseLevel: courseData.level || 'Beginner',
//       courseDuration: courseData.duration || 'N/A',
//     };

//     await setDoc(doc(db, 'orders', receipt), orderData);
//     console.log('Order created in database with receipt:', receipt);

//     // Create Razorpay order
//     const razorpayOrderOptions = {
//       amount: price * 100, // Amount in paise
//       currency: 'INR',
//       receipt: receipt,
//       notes: {
//         courseId,
//         userId,
//         courseName: courseData.title || courseName,
//         userEmail: userData.email,
//         userName: userData.fullName || userData.name || 'Unknown',
//         dbOrderId: receipt
//       }
//     };

//     console.log('Creating Razorpay order with options:', {
//       amount: `₹${price} (${price * 100} paise)`,
//       currency: 'INR',
//       receipt: receipt,
//       notes: razorpayOrderOptions.notes
//     });

//     const razorpayOrder = await razorpay.orders.create(razorpayOrderOptions);
//     console.log('Razorpay order created successfully:', razorpayOrder.id);

//     // Update order with Razorpay order ID
//     await updateDoc(doc(db, 'orders', receipt), {
//       razorpayOrderId: razorpayOrder.id,
//       updatedAt: new Date(),
//     });

//     // Prepare response - THIS IS THE KEY PART
//     const response = {
//       success: true,
//       orderId: razorpayOrder.id,
//       amount: razorpayOrder.amount,
//       currency: razorpayOrder.currency,
//       key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
//       receipt: receipt,
//       dbOrderId: receipt,
//       notes: razorpayOrder.notes,
//     };

//     console.log('Sending response:', response);

//     return NextResponse.json(response, { status: 200 });

//   } catch (error) {
//     console.error('Create order error:', error);

//     // Handle specific Razorpay errors
//     if (error.error) {
//       console.error('Razorpay error details:', error.error);
//       return NextResponse.json(
//         {
//           success: false,
//           error: `Razorpay Error: ${error.error.description || error.error.code || error.message}`
//         },
//         { status: 400 }
//       );
//     }

//     return NextResponse.json(
//       {
//         success: false,
//         error: 'Failed to create order: ' + error.message
//       },
//       { status: 500 }
//     );
//   }
// }

// export const POST = withAuth(handler);
// ===== CREATE ORDER ROUTE (app/api/payments/create-order/route.js) =====
import { NextResponse } from 'next/server';
import { db } from '@/lib/firebase';
import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';
import Razorpay from 'razorpay';
import { withAuth } from '@/lib/middleware-auth';

// Initialize Razorpay
const razorpay = new Razorpay({
  key_id: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

async function handler(request) {
  try {
    console.log('=== CREATE ORDER API CALLED ===');

    const body = await request.json();
    const { courseId, price, courseName } = body;
    const userId = request.user.userId;

    console.log('Request body:', { courseId, price, courseName });
    console.log('Creating order for courseId:', courseId, 'userId:', userId);

    // Validate required fields
    if (!courseId || !price || !courseName) {
      console.error('Missing required fields:', { courseId, price, courseName });
      return NextResponse.json(
        {
          success: false,
          error: 'Missing required fields: courseId, price, or courseName'
        },
        { status: 400 }
      );
    }

    // Get user data
    const userDocRef = doc(db, 'users', userId);
    const userDoc = await getDoc(userDocRef);

    if (!userDoc.exists()) {
      console.error('User not found:', userId);
      return NextResponse.json(
        {
          success: false,
          error: 'User not found'
        },
        { status: 404 }
      );
    }

    const userData = userDoc.data();
    console.log('User data retrieved for:', userData.email);

    // Get course data from Firebase
    console.log('Fetching course data for courseId:', courseId);
    const courseDocRef = doc(db, 'courses', courseId);
    const courseDoc = await getDoc(courseDocRef);

    if (!courseDoc.exists()) {
      console.error('Course not found:', courseId);
      return NextResponse.json(
        {
          success: false,
          error: 'Course not found'
        },
        { status: 404 }
      );
    }

    const courseData = courseDoc.data();
    console.log('Course data retrieved:', courseData.title);

    // Check if user is already enrolled
    console.log('Checking if user already enrolled in this course...');
    const enrolledCourses = userData.enrolledCourses || [];
    if (enrolledCourses.includes(courseId)) {
      console.log('User already enrolled in course:', courseId);
      return NextResponse.json(
        {
          success: false,
          error: 'You are already enrolled in this course'
        },
        { status: 400 }
      );
    }

    // Generate unique receipt ID
    const timestamp = Date.now().toString().slice(-8);
    const receipt = `${courseId.slice(0, 8)}_${userId.slice(0, 8)}_${timestamp}`;
    console.log('Generated receipt:', receipt, '(Length:', receipt.length + ')');

    // Create Razorpay order first
    const razorpayOrderOptions = {
      amount: price * 100, // Amount in paise
      currency: 'INR',
      receipt: receipt,
      notes: {
        courseId,
        userId,
        courseName: courseData.title || courseName,
        userEmail: userData.email,
        userName: userData.fullName || userData.name || 'Unknown',
        dbOrderId: receipt
      }
    };

    console.log('Creating Razorpay order with options:', {
      amount: `₹${price} (${price * 100} paise)`,
      currency: 'INR',
      receipt: receipt,
      notes: razorpayOrderOptions.notes
    });

    const razorpayOrder = await razorpay.orders.create(razorpayOrderOptions);
    console.log('Razorpay order created successfully:', razorpayOrder.id);

    // Create order document in Firebase with Razorpay order ID
    const orderData = {
      userId,
      courseId,
      courseName: courseData.title || courseName,
      price: price,
      originalPrice: courseData.originalPrice || courseData.price || price,
      currency: 'INR',
      receipt,
      razorpayOrderId: razorpayOrder.id, // Store Razorpay order ID
      status: 'created',
      createdAt: new Date(),
      updatedAt: new Date(),
      userEmail: userData.email,
      userName: userData.fullName || userData.name || 'Unknown',
      courseCategory: courseData.category || 'Uncategorized',
      courseLevel: courseData.level || 'Beginner',
      courseDuration: courseData.duration || 'N/A',
    };

    await setDoc(doc(db, 'orders', receipt), orderData);
    console.log('Order created in database with receipt:', receipt, 'and razorpayOrderId:', razorpayOrder.id);

    // Prepare response
    const response = {
      success: true,
      orderId: razorpayOrder.id,
      amount: razorpayOrder.amount,
      currency: razorpayOrder.currency,
      key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
      receipt: receipt,
      dbOrderId: receipt,
      notes: razorpayOrder.notes,
    };

    console.log('Sending response:', response);
    return NextResponse.json(response, { status: 200 });

  } catch (error) {
    console.error('Create order error:', error);

    // Handle specific Razorpay errors
    if (error.error) {
      console.error('Razorpay error details:', error.error);
      return NextResponse.json(
        {
          success: false,
          error: `Razorpay Error: ${error.error.description || error.error.code || error.message}`
        },
        { status: 400 }
      );
    }

    return NextResponse.json(
      {
        success: false,
        error: 'Failed to create order: ' + error.message
      },
      { status: 500 }
    );
  }
}

export const POST = withAuth(handler);