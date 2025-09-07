// // // import { NextResponse } from 'next/server';
// // // import { doc, getDoc, updateDoc, collection, query, where, getDocs, arrayUnion } from 'firebase/firestore';
// // // import { db } from '@/lib/firebase';
// // // import { withAuth } from '@/lib/middleware-auth';
// // // import crypto from 'crypto';
// // // import nodemailer from 'nodemailer';

// // // async function handler(request) {
// // //   try {
// // //     const { razorpay_order_id, razorpay_payment_id, razorpay_signature, courseId } = await request.json();

// // //     // Verify signature
// // //     const body = razorpay_order_id + '|' + razorpay_payment_id;
// // //     const expectedSignature = crypto
// // //       .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
// // //       .update(body.toString())
// // //       .digest('hex');

// // //     if (expectedSignature !== razorpay_signature) {
// // //       return NextResponse.json(
// // //         { message: 'Payment verification failed' },
// // //         { status: 400 }
// // //       );
// // //     }

// // //     // Update order status
// // //     const ordersRef = collection(db, 'orders');
// // //     const orderQuery = query(ordersRef, where('orderId', '==', razorpay_order_id));
// // //     const orderSnapshot = await getDocs(orderQuery);

// // //     if (!orderSnapshot.empty) {
// // //       const orderDoc = orderSnapshot.docs[0];
// // //       await updateDoc(doc(db, 'orders', orderDoc.id), {
// // //         status: 'completed',
// // //         paymentId: razorpay_payment_id,
// // //         signature: razorpay_signature,
// // //         completedAt: new Date(),
// // //       });
// // //     }

// // //     // Add course to user's enrolled courses
// // //     const userDoc = await getDoc(doc(db, 'users', request.user.userId));
// // //     if (userDoc.exists()) {
// // //       await updateDoc(doc(db, 'users', request.user.userId), {
// // //         enrolledCourses: arrayUnion(courseId),
// // //       });
// // //     }

// // //     // Get course details for email
// // //     const courseDoc = await getDoc(doc(db, 'courses', courseId));
// // //     const courseData = courseDoc.data();

// // //     // Send confirmation email
// // //     const transporter = nodemailer.createTransporter({
// // //       service: 'gmail',
// // //       auth: {
// // //         user: process.env.EMAIL_USER,
// // //         pass: process.env.EMAIL_PASS,
// // //       },
// // //     });

// // //     await transporter.sendMail({
// // //       from: process.env.EMAIL_USER,
// // //       to: request.user.email,
// // //       subject: 'Course Purchase Confirmation - VPN Academy',
// // //       html: `
// // //         <div style="max-width: 600px; margin: 0 auto; padding: 20px; font-family: Arial, sans-serif;">
// // //           <h2 style="color: #333;">Course Purchase Successful!</h2>
// // //           <p>Dear ${request.user.fullName},</p>
// // //           <p>Thank you for purchasing the course: <strong>${courseData.title}</strong></p>
// // //           <div style="background: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
// // //             <h3>Purchase Details:</h3>
// // //             <p><strong>Course:</strong> ${courseData.title}</p>
// // //             <p><strong>Amount Paid:</strong> ₹${orderSnapshot.docs[0].data().amount}</p>
// // //             <p><strong>Payment ID:</strong> ${razorpay_payment_id}</p>
// // //             <p><strong>Date:</strong> ${new Date().toLocaleDateString()}</p>
// // //           </div>
// // //           <p>You can now access your course from your dashboard.</p>
// // //           <p>Best regards,<br>The VPN Academy Team</p>
// // //         </div>
// // //       `,
// // //     });

// // //     return NextResponse.json({
// // //       message: 'Payment verified successfully',
// // //       success: true,
// // //     });
// // //   } catch (error) {
// // //     console.error('Payment verification error:', error);
// // //     return NextResponse.json(
// // //       { message: 'Payment verification failed' },
// // //       { status: 500 }
// // //     );
// // //   }
// // // }

// // // export const POST = withAuth(handler);

// // // api/payments/verify/route.js
// // import { NextResponse } from 'next/server';
// // import { doc, getDoc, updateDoc, collection, query, where, getDocs, arrayUnion } from 'firebase/firestore';
// // import { db } from '@/lib/firebase';
// // import { withAuth } from '@/lib/middleware-auth';
// // import crypto from 'crypto';
// // import nodemailer from 'nodemailer';

// // async function handler(request) {
// //   try {
// //     const { razorpay_order_id, razorpay_payment_id, razorpay_signature, courseId } = await request.json();

// //     console.log('Verifying payment for order:', razorpay_order_id);

// //     // Verify signature - THIS IS CRITICAL FOR SECURITY
// //     const body = razorpay_order_id + '|' + razorpay_payment_id;
// //     const expectedSignature = crypto
// //       .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
// //       .update(body.toString())
// //       .digest('hex');

// //     if (expectedSignature !== razorpay_signature) {
// //       console.error('Payment signature verification failed');
// //       return NextResponse.json(
// //         { message: 'Payment verification failed - Invalid signature' },
// //         { status: 400 }
// //       );
// //     }

// //     console.log('Payment signature verified successfully');

// //     // Find and update order status
// //     const ordersRef = collection(db, 'orders');
// //     const orderQuery = query(ordersRef, where('orderId', '==', razorpay_order_id));
// //     const orderSnapshot = await getDocs(orderQuery);

// //     if (orderSnapshot.empty) {
// //       console.error('Order not found in database:', razorpay_order_id);
// //       return NextResponse.json(
// //         { message: 'Order not found' },
// //         { status: 404 }
// //       );
// //     }

// //     const orderDoc = orderSnapshot.docs[0];
// //     const orderData = orderDoc.data();

// //     // Security check: Verify the courseId matches the order
// //     if (orderData.courseId !== courseId) {
// //       console.error('Course ID mismatch - possible tampering');
// //       return NextResponse.json(
// //         { message: 'Course ID mismatch' },
// //         { status: 400 }
// //       );
// //     }

// //     // Security check: Verify the user making the request owns this order
// //     if (orderData.userId !== request.user.userId) {
// //       console.error('User ID mismatch - unauthorized access attempt');
// //       return NextResponse.json(
// //         { message: 'Unauthorized - Order does not belong to user' },
// //         { status: 403 }
// //       );
// //     }

// //     // Check if payment is already completed
// //     if (orderData.status === 'completed') {
// //       console.log('Payment already completed for order:', razorpay_order_id);
// //       return NextResponse.json({
// //         message: 'Payment already verified',
// //         success: true,
// //       });
// //     }

// //     // Update order status to completed
// //     await updateDoc(doc(db, 'orders', orderDoc.id), {
// //       status: 'completed',
// //       paymentId: razorpay_payment_id,
// //       signature: razorpay_signature,
// //       completedAt: new Date(),
// //       updatedAt: new Date()
// //     });

// //     console.log('Order status updated to completed');

// //     // Add course to user's enrolled courses
// //     const userDocRef = doc(db, 'users', request.user.userId);
// //     const userDoc = await getDoc(userDocRef);
    
// //     if (userDoc.exists()) {
// //       const userData = userDoc.data();
// //       const enrolledCourses = userData.enrolledCourses || [];
      
// //       // Check if user is already enrolled (prevent duplicates)
// //       if (!enrolledCourses.includes(courseId)) {
// //         await updateDoc(userDocRef, {
// //           enrolledCourses: arrayUnion(courseId),
// //           updatedAt: new Date()
// //         });
// //         console.log('Course added to user enrolled courses');
// //       } else {
// //         console.log('User already enrolled in this course');
// //       }
// //     } else {
// //       console.error('User document not found:', request.user.userId);
// //       return NextResponse.json(
// //         { message: 'User not found' },
// //         { status: 404 }
// //       );
// //     }

// //     // Get course details for email
// //     const courseDoc = await getDoc(doc(db, 'courses', courseId));
// //     if (!courseDoc.exists()) {
// //       console.error('Course not found:', courseId);
// //       return NextResponse.json(
// //         { message: 'Course not found' },
// //         { status: 404 }
// //       );
// //     }
// //     const courseData = courseDoc.data();

// //     // Send confirmation email
// //     try {
// //       const transporter = nodemailer.createTransport({
// //         service: 'gmail',
// //         auth: {
// //           user: process.env.EMAIL_USER,
// //           pass: process.env.EMAIL_PASS,
// //         },
// //       });

// //       await transporter.sendMail({
// //         from: process.env.EMAIL_USER,
// //         to: request.user.email,
// //         subject: 'Course Purchase Confirmation - VPN Academy',
// //         html: `
// //           <div style="max-width: 600px; margin: 0 auto; padding: 20px; font-family: Arial, sans-serif;">
// //             <h2 style="color: #333;">Course Purchase Successful!</h2>
// //             <p>Dear ${request.user.fullName},</p>
// //             <p>Thank you for purchasing the course: <strong>${courseData.title}</strong></p>
// //             <div style="background: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
// //               <h3>Purchase Details:</h3>
// //               <p><strong>Course:</strong> ${courseData.title}</p>
// //               <p><strong>Amount Paid:</strong> ₹${orderData.price}</p>
// //               <p><strong>Payment ID:</strong> ${razorpay_payment_id}</p>
// //               <p><strong>Order ID:</strong> ${razorpay_order_id}</p>
// //               <p><strong>Date:</strong> ${new Date().toLocaleDateString()}</p>
// //             </div>
// //             <p>You can now access your course from your dashboard.</p>
// //             <p>Best regards,<br>The VPN Academy Team</p>
// //           </div>
// //         `,
// //       });

// //       console.log('Confirmation email sent successfully');
// //     } catch (emailError) {
// //       console.error('Failed to send confirmation email:', emailError);
// //       // Don't fail the entire request if email fails
// //     }

// //     return NextResponse.json({
// //       message: 'Payment verified successfully',
// //       success: true,
// //       courseId: courseId,
// //       orderId: razorpay_order_id
// //     });

// //   } catch (error) {
// //     console.error('Payment verification error:', error);
// //     return NextResponse.json(
// //       { message: 'Payment verification failed: ' + error.message },
// //       { status: 500 }
// //     );
// //   }
// // }

// // export const POST = withAuth(handler);

// import { NextResponse } from 'next/server';
// import { doc, getDoc, updateDoc, collection, query, where, getDocs, arrayUnion, setDoc } from 'firebase/firestore';
// import { db } from '@/lib/firebase';
// import { withAuth } from '@/lib/middleware-auth';
// import crypto from 'crypto';
// import nodemailer from 'nodemailer';

// async function handler(request) {
//   console.log('=== PAYMENT VERIFICATION STARTED ===');
  
//   try {
//     const { razorpay_order_id, razorpay_payment_id, razorpay_signature, courseId } = await request.json();

//     console.log('Verifying payment for order:', razorpay_order_id);
//     console.log('Payment ID:', razorpay_payment_id);
//     console.log('Course ID:', courseId);

//     // Verify signature - THIS IS CRITICAL FOR SECURITY
//     const body = razorpay_order_id + '|' + razorpay_payment_id;
//     const expectedSignature = crypto
//       .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
//       .update(body.toString())
//       .digest('hex');

//     if (expectedSignature !== razorpay_signature) {
//       console.error('Payment signature verification failed');
//       return NextResponse.json(
//         { message: 'Payment verification failed - Invalid signature' },
//         { status: 400 }
//       );
//     }

//     console.log('Payment signature verified successfully');

//     // Find and update order status
//     const ordersRef = collection(db, 'orders');
//     const orderQuery = query(ordersRef, where('orderId', '==', razorpay_order_id));
//     const orderSnapshot = await getDocs(orderQuery);

//     if (orderSnapshot.empty) {
//       console.error('Order not found in database:', razorpay_order_id);
//       return NextResponse.json(
//         { message: 'Order not found' },
//         { status: 404 }
//       );
//     }

//     const orderDoc = orderSnapshot.docs[0];
//     const orderData = orderDoc.data();

//     // Security check: Verify the courseId matches the order
//     if (orderData.courseId !== courseId) {
//       console.error('Course ID mismatch - possible tampering');
//       return NextResponse.json(
//         { message: 'Course ID mismatch' },
//         { status: 400 }
//       );
//     }

//     // Security check: Verify the user making the request owns this order
//     if (orderData.userId !== request.user.userId) {
//       console.error('User ID mismatch - unauthorized access attempt');
//       return NextResponse.json(
//         { message: 'Unauthorized - Order does not belong to user' },
//         { status: 403 }
//       );
//     }

//     // Check if payment is already completed
//     if (orderData.status === 'completed') {
//       console.log('Payment already completed for order:', razorpay_order_id);
//       return NextResponse.json({
//         message: 'Payment already verified',
//         success: true,
//       });
//     }

//     // Update order status to completed
//     await updateDoc(doc(db, 'orders', orderDoc.id), {
//       status: 'completed',
//       paymentId: razorpay_payment_id,
//       signature: razorpay_signature,
//       completedAt: new Date(),
//       updatedAt: new Date()
//     });

//     console.log('Order status updated to completed');

//     // Get course details for enrollment
//     const courseDoc = await getDoc(doc(db, 'courses', courseId));
//     if (!courseDoc.exists()) {
//       console.error('Course not found:', courseId);
//       return NextResponse.json(
//         { message: 'Course not found' },
//         { status: 404 }
//       );
//     }
//     const courseData = courseDoc.data();

//     // Add course to user's enrolled courses with progress tracking
//     const userDocRef = doc(db, 'users', request.user.userId);
//     const userDoc = await getDoc(userDocRef);
    
//     if (userDoc.exists()) {
//       const userData = userDoc.data();
//       const enrolledCourses = userData.enrolledCourses || [];
      
//       // Check if user is already enrolled (prevent duplicates)
//       if (!enrolledCourses.includes(courseId)) {
//         // Create initial progress tracking document
//         const progressData = {
//           userId: request.user.userId,
//           courseId: courseId,
//           completedSections: [],
//           progress: 0,
//           totalSections: courseData.content ? courseData.content.length : 0,
//           enrolledAt: new Date(),
//           lastAccessed: new Date(),
//           certificateEligible: false,
//           certificateIssued: false
//         };

//         // Save progress tracking
//         const progressRef = doc(db, 'user_course_progress', `${request.user.userId}_${courseId}`);
//         await setDoc(progressRef, progressData);

//         // Update user's enrolled courses
//         await updateDoc(userDocRef, {
//           enrolledCourses: arrayUnion(courseId),
//           updatedAt: new Date()
//         });
        
//         console.log('Course added to user enrolled courses with progress tracking');
//       } else {
//         console.log('User already enrolled in this course');
//       }
//     } else {
//       console.error('User document not found:', request.user.userId);
//       return NextResponse.json(
//         { message: 'User not found' },
//         { status: 404 }
//       );
//     }

//     // Send confirmation email
//     try {
//       if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
//         const transporter = nodemailer.createTransporter({
//           service: 'gmail',
//           auth: {
//             user: process.env.EMAIL_USER,
//             pass: process.env.EMAIL_PASS,
//           },
//         });

//         await transporter.sendMail({
//           from: process.env.EMAIL_USER,
//           to: request.user.email,
//           subject: 'Course Purchase Confirmation - VPN Academy',
//           html: `
//             <div style="max-width: 600px; margin: 0 auto; padding: 20px; font-family: Arial, sans-serif;">
//               <h2 style="color: #333;">Course Purchase Successful!</h2>
//               <p>Dear ${request.user.fullName},</p>
//               <p>Thank you for purchasing the course: <strong>${courseData.title}</strong></p>
//               <div style="background: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
//                 <h3>Purchase Details:</h3>
//                 <p><strong>Course:</strong> ${courseData.title}</p>
//                 <p><strong>Amount Paid:</strong> ₹${orderData.price}</p>
//                 <p><strong>Payment ID:</strong> ${razorpay_payment_id}</p>
//                 <p><strong>Order ID:</strong> ${razorpay_order_id}</p>
//                 <p><strong>Date:</strong> ${new Date().toLocaleDateString()}</p>
//               </div>
//               <p>You can now access your course from your dashboard.</p>
//               <p>Best regards,<br>The VPN Academy Team</p>
//             </div>
//           `,
//         });

//         console.log('Confirmation email sent successfully');
//       }
//     } catch (emailError) {
//       console.error('Failed to send confirmation email:', emailError);
//       // Don't fail the entire request if email fails
//     }

//     console.log('=== PAYMENT VERIFICATION COMPLETED SUCCESSFULLY ===');

//     return NextResponse.json({
//       message: 'Payment verified successfully',
//       success: true,
//       courseId: courseId,
//       orderId: razorpay_order_id
//     });

//   } catch (error) {
//     console.error('=== PAYMENT VERIFICATION ERROR ===');
//     console.error('Error details:', error);
//     return NextResponse.json(
//       { message: 'Payment verification failed: ' + error.message },
//       { status: 500 }
//     );
//   }
// }

// export const POST = withAuth(handler);

import { NextResponse } from 'next/server';
import { doc, getDoc, updateDoc, collection, query, where, getDocs, arrayUnion, setDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { withAuth } from '@/lib/middleware-auth';
import crypto from 'crypto';
import nodemailer from 'nodemailer';

async function verifyHandler(request) {
  console.log('=== PAYMENT VERIFICATION STARTED ===');
  
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature, courseId } = await request.json();

    console.log('Verifying payment for order:', razorpay_order_id);
    console.log('Payment ID:', razorpay_payment_id);
    console.log('Course ID:', courseId);

    // Verify signature - THIS IS CRITICAL FOR SECURITY
    const body = razorpay_order_id + '|' + razorpay_payment_id;
    const expectedSignature = crypto
      .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
      .update(body.toString())
      .digest('hex');

    if (expectedSignature !== razorpay_signature) {
      console.error('Payment signature verification failed');
      return NextResponse.json(
        { message: 'Payment verification failed - Invalid signature' },
        { status: 400 }
      );
    }

    console.log('Payment signature verified successfully');

    // Find order using razorpayOrderId (CORRECTED QUERY)
    const ordersRef = collection(db, 'orders');
    const orderQuery = query(ordersRef, where('razorpayOrderId', '==', razorpay_order_id));
    const orderSnapshot = await getDocs(orderQuery);

    if (orderSnapshot.empty) {
      console.error('Order not found in database with razorpayOrderId:', razorpay_order_id);
      console.log('Attempting to find order by receipt field as fallback...');
      
      // Fallback: try to find by receipt if the order was created with a different structure
      const receiptQuery = query(ordersRef, where('receipt', '==', razorpay_order_id));
      const receiptSnapshot = await getDocs(receiptQuery);
      
      if (receiptSnapshot.empty) {
        console.error('Order not found by receipt either');
        return NextResponse.json(
          { message: 'Order not found' },
          { status: 404 }
        );
      }
      
      console.log('Order found by receipt fallback');
      const orderDoc = receiptSnapshot.docs[0];
      const orderData = orderDoc.data();
    } else {
      console.log('Order found by razorpayOrderId');
    }

    const orderDoc = orderSnapshot.docs[0];
    const orderData = orderDoc.data();

    console.log('Order data found:', {
      courseId: orderData.courseId,
      userId: orderData.userId,
      status: orderData.status,
      price: orderData.price
    });

    // Security check: Verify the courseId matches the order
    if (orderData.courseId !== courseId) {
      console.error('Course ID mismatch - Order courseId:', orderData.courseId, 'Requested courseId:', courseId);
      return NextResponse.json(
        { message: 'Course ID mismatch' },
        { status: 400 }
      );
    }

    // Security check: Verify the user making the request owns this order
    if (orderData.userId !== request.user.userId) {
      console.error('User ID mismatch - Order userId:', orderData.userId, 'Request userId:', request.user.userId);
      return NextResponse.json(
        { message: 'Unauthorized - Order does not belong to user' },
        { status: 403 }
      );
    }

    // Check if payment is already completed
    if (orderData.status === 'completed') {
      console.log('Payment already completed for order:', razorpay_order_id);
      return NextResponse.json({
        message: 'Payment already verified',
        success: true,
      });
    }

    // Update order status to completed
    await updateDoc(orderDoc.ref, {
      status: 'completed',
      paymentId: razorpay_payment_id,
      signature: razorpay_signature,
      completedAt: new Date(),
      updatedAt: new Date()
    });

    console.log('Order status updated to completed');

    // Get course details for enrollment
    const courseDoc = await getDoc(doc(db, 'courses', courseId));
    if (!courseDoc.exists()) {
      console.error('Course not found:', courseId);
      return NextResponse.json(
        { message: 'Course not found' },
        { status: 404 }
      );
    }
    const courseData = courseDoc.data();

    // Add course to user's enrolled courses with progress tracking
    const userDocRef = doc(db, 'users', request.user.userId);
    const userDoc = await getDoc(userDocRef);
    
    if (userDoc.exists()) {
      const userData = userDoc.data();
      const enrolledCourses = userData.enrolledCourses || [];
      
      // Check if user is already enrolled (prevent duplicates)
      if (!enrolledCourses.includes(courseId)) {
        // Create initial progress tracking document
        const progressData = {
          userId: request.user.userId,
          courseId: courseId,
          completedSections: [],
          progress: 0,
          totalSections: courseData.content ? courseData.content.length : 0,
          enrolledAt: new Date(),
          lastAccessed: new Date(),
          certificateEligible: false,
          certificateIssued: false
        };

        // Save progress tracking
        const progressRef = doc(db, 'user_course_progress', `${request.user.userId}_${courseId}`);
        await setDoc(progressRef, progressData);

        // Update user's enrolled courses
        await updateDoc(userDocRef, {
          enrolledCourses: arrayUnion(courseId),
          updatedAt: new Date()
        });
        
        console.log('Course added to user enrolled courses with progress tracking');
      } else {
        console.log('User already enrolled in this course');
      }
    } else {
      console.error('User document not found:', request.user.userId);
      return NextResponse.json(
        { message: 'User not found' },
        { status: 404 }
      );
    }

    // Send confirmation email
    try {
      if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
        const transporter = nodemailer.createTransporter({
          service: 'gmail',
          auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
          },
        });

        await transporter.sendMail({
          from: process.env.EMAIL_USER,
          to: orderData.userEmail,
          subject: 'Course Purchase Confirmation - VPN Academy',
          html: `
            <div style="max-width: 600px; margin: 0 auto; padding: 20px; font-family: Arial, sans-serif;">
              <h2 style="color: #333;">Course Purchase Successful!</h2>
              <p>Dear ${orderData.userName},</p>
              <p>Thank you for purchasing the course: <strong>${courseData.title}</strong></p>
              <div style="background: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
                <h3>Purchase Details:</h3>
                <p><strong>Course:</strong> ${courseData.title}</p>
                <p><strong>Amount Paid:</strong> ₹${orderData.price}</p>
                <p><strong>Payment ID:</strong> ${razorpay_payment_id}</p>
                <p><strong>Order ID:</strong> ${razorpay_order_id}</p>
                <p><strong>Date:</strong> ${new Date().toLocaleDateString()}</p>
              </div>
              <p>You can now access your course from your dashboard.</p>
              <p>Best regards,<br>The VPN Academy Team</p>
            </div>
          `,
        });

        console.log('Confirmation email sent successfully');
      }
    } catch (emailError) {
      console.error('Failed to send confirmation email:', emailError);
      // Don't fail the entire request if email fails
    }

    console.log('=== PAYMENT VERIFICATION COMPLETED SUCCESSFULLY ===');

    return NextResponse.json({
      message: 'Payment verified successfully',
      success: true,
      courseId: courseId,
      orderId: razorpay_order_id
    });

  } catch (error) {
    console.error('=== PAYMENT VERIFICATION ERROR ===');
    console.error('Error details:', error);
    return NextResponse.json(
      { message: 'Payment verification failed: ' + error.message },
      { status: 500 }
    );
  }
}

export const POST = withAuth(verifyHandler);