// // // // import { NextResponse } from 'next/server';
// // // // import { collection, query, where, getDocs, updateDoc, doc, deleteDoc } from 'firebase/firestore';
// // // // import { db } from '@/lib/firebase';

// // // // export async function POST(request) {
// // // //   try {
// // // //     const { email, otp } = await request.json();

// // // //     // Find OTP record
// // // //     const otpRef = collection(db, 'otpStore');
// // // //     const otpQuery = query(
// // // //       otpRef, 
// // // //       where('email', '==', email),
// // // //       where('otp', '==', otp)
// // // //     );
// // // //     const otpSnapshot = await getDocs(otpQuery);

// // // //     if (otpSnapshot.empty) {
// // // //       return NextResponse.json(
// // // //         { message: 'Invalid OTP' },
// // // //         { status: 400 }
// // // //       );
// // // //     }

// // // //     const otpDoc = otpSnapshot.docs[0];
// // // //     const otpData = otpDoc.data();

// // // //     // Check if OTP is expired
// // // //     if (new Date() > otpData.expiryAt.toDate()) {
// // // //       await deleteDoc(doc(db, 'otpStore', otpDoc.id));
// // // //       return NextResponse.json(
// // // //         { message: 'OTP has expired' },
// // // //         { status: 400 }
// // // //       );
// // // //     }

// // // //     // Find and update user
// // // //     const usersRef = collection(db, 'users');
// // // //     const userQuery = query(usersRef, where('email', '==', email));
// // // //     const userSnapshot = await getDocs(userQuery);

// // // //     if (userSnapshot.empty) {
// // // //       return NextResponse.json(
// // // //         { message: 'User not found' },
// // // //         { status: 404 }
// // // //       );
// // // //     }

// // // //     const userDoc = userSnapshot.docs[0];
// // // //     await updateDoc(doc(db, 'users', userDoc.id), {
// // // //       isVerified: true,
// // // //       verifiedAt: new Date(),
// // // //     });

// // // //     // Delete OTP record
// // // //     await deleteDoc(doc(db, 'otpStore', otpDoc.id));

// // // //     return NextResponse.json(
// // // //       { message: 'Email verified successfully' },
// // // //       { status: 200 }
// // // //     );
// // // //   } catch (error) {
// // // //     console.error('OTP verification error:', error);
// // // //     return NextResponse.json(
// // // //       { message: 'Internal server error' },
// // // //       { status: 500 }
// // // //     );
// // // //   }
// // // // }

// // // import { NextResponse } from 'next/server';
// // // import { collection, query, where, getDocs, updateDoc, doc, deleteDoc } from 'firebase/firestore';
// // // import { db } from '@/lib/firebase';

// // // export async function POST(request) {
// // //   try {
// // //     const { email, otp } = await request.json();

// // //     // Find OTP record
// // //     const otpQuery = query(
// // //       collection(db, 'otpStore'),
// // //       where('email', '==', email),
// // //       where('otp', '==', otp)
// // //     );
    
// // //     const otpSnapshot = await getDocs(otpQuery);

// // //     if (otpSnapshot.empty) {
// // //       return NextResponse.json(
// // //         { message: 'Invalid OTP' },
// // //         { status: 400 }
// // //       );
// // //     }

// // //     const otpDoc = otpSnapshot.docs[0];
// // //     const otpData = otpDoc.data();

// // //     // Check if OTP has expired
// // //     if (new Date() > otpData.expiryAt.toDate()) {
// // //       // Delete expired OTP
// // //       await deleteDoc(doc(db, 'otpStore', otpDoc.id));
// // //       return NextResponse.json(
// // //         { message: 'OTP has expired' },
// // //         { status: 400 }
// // //       );
// // //     }

// // //     // Find user and update verification status
// // //     const usersQuery = query(collection(db, 'users'), where('email', '==', email));
// // //     const usersSnapshot = await getDocs(usersQuery);

// // //     if (!usersSnapshot.empty) {
// // //       const userDoc = usersSnapshot.docs[0];
// // //       await updateDoc(doc(db, 'users', userDoc.id), {
// // //         isVerified: true,
// // //         verifiedAt: new Date(),
// // //       });
// // //     }

// // //     // Delete OTP after successful verification
// // //     await deleteDoc(doc(db, 'otpStore', otpDoc.id));

// // //     return NextResponse.json(
// // //       { message: 'Email verified successfully' },
// // //       { status: 200 }
// // //     );
// // //   } catch (error) {
// // //     console.error('OTP verification error:', error);
// // //     return NextResponse.json(
// // //       { message: 'Internal server error' },
// // //       { status: 500 }
// // //     );
// // //   }
// // // }

// // // Remove NextResponse import - using native Response API instead
// // import { collection, query, where, getDocs, updateDoc, doc, deleteDoc } from 'firebase/firestore';
// // import { db } from '@/lib/firebase';

// // export async function POST(request) {
// //   try {
// //     const { email, otp } = await request.json();

// //     // Find OTP record
// //     const otpQuery = query(
// //       collection(db, 'otpStore'),
// //       where('email', '==', email),
// //       where('otp', '==', otp)
// //     );
    
// //     const otpSnapshot = await getDocs(otpQuery);

// //     if (otpSnapshot.empty) {
// //       return new Response(
// //         JSON.stringify({ message: 'Invalid OTP' }),
// //         { 
// //           status: 400,
// //           headers: { 'Content-Type': 'application/json' }
// //         }
// //       );
// //     }

// //     const otpDoc = otpSnapshot.docs[0];
// //     const otpData = otpDoc.data();

// //     // Check if OTP has expired
// //     if (new Date() > otpData.expiryAt.toDate()) {
// //       // Delete expired OTP
// //       await deleteDoc(doc(db, 'otpStore', otpDoc.id));
// //       return new Response(
// //         JSON.stringify({ message: 'OTP has expired' }),
// //         { 
// //           status: 400,
// //           headers: { 'Content-Type': 'application/json' }
// //         }
// //       );
// //     }

// //     // Find user and update verification status
// //     const usersQuery = query(collection(db, 'users'), where('email', '==', email));
// //     const usersSnapshot = await getDocs(usersQuery);

// //     if (!usersSnapshot.empty) {
// //       const userDoc = usersSnapshot.docs[0];
// //       await updateDoc(doc(db, 'users', userDoc.id), {
// //         isVerified: true,
// //         verifiedAt: new Date(),
// //       });
// //     }

// //     // Delete OTP after successful verification
// //     await deleteDoc(doc(db, 'otpStore', otpDoc.id));

// //     return new Response(
// //       JSON.stringify({ message: 'Email verified successfully' }),
// //       { 
// //         status: 200,
// //         headers: { 'Content-Type': 'application/json' }
// //       }
// //     );
// //   } catch (error) {
// //     console.error('OTP verification error:', error);
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
// import { collection, query, where, getDocs, updateDoc, doc, deleteDoc } from 'firebase/firestore';
// import { db } from '@/lib/firebase';

// export async function POST(request) {
//   try {
//     const { email, otp } = await request.json();

//     console.log('OTP verification attempt for:', email);

//     // Find OTP record
//     const otpQuery = query(
//       collection(db, 'otpStore'),
//       where('email', '==', email),
//       where('otp', '==', otp)
//     );
    
//     const otpSnapshot = await getDocs(otpQuery);

//     if (otpSnapshot.empty) {
//       console.log('Invalid OTP for:', email);
//       return NextResponse.json(
//         { message: 'Invalid OTP' },
//         { status: 400 }
//       );
//     }

//     const otpDoc = otpSnapshot.docs[0];
//     const otpData = otpDoc.data();

//     // Check if OTP has expired
//     if (new Date() > otpData.expiryAt.toDate()) {
//       // Delete expired OTP
//       await deleteDoc(doc(db, 'otpStore', otpDoc.id));
//       console.log('Expired OTP for:', email);
//       return NextResponse.json(
//         { message: 'OTP has expired. Please request a new one.' },
//         { status: 400 }
//       );
//     }

//     // Update user verification status using Firebase UID
//     if (otpData.firebaseUid) {
//       await updateDoc(doc(db, 'users', otpData.firebaseUid), {
//         isVerified: true,
//         verifiedAt: new Date(),
//       });
//       console.log('User verified:', email);
//     } else {
//       // Fallback: Find user by email (for backward compatibility)
//       const usersQuery = query(collection(db, 'users'), where('email', '==', email));
//       const usersSnapshot = await getDocs(usersQuery);

//       if (!usersSnapshot.empty) {
//         const userDoc = usersSnapshot.docs[0];
//         await updateDoc(doc(db, 'users', userDoc.id), {
//           isVerified: true,
//           verifiedAt: new Date(),
//         });
//         console.log('User verified (fallback):', email);
//       }
//     }

//     // Delete OTP after successful verification
//     await deleteDoc(doc(db, 'otpStore', otpDoc.id));

//     return NextResponse.json(
//       { message: 'Email verified successfully' },
//       { status: 200 }
//     );
//   } catch (error) {
//     console.error('OTP verification error:', error);
//     return NextResponse.json(
//       { message: 'Internal server error' },
//       { status: 500 }
//     );
//   }
// }
import { collection, query, where, getDocs, updateDoc, doc, deleteDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';

export async function POST(request) {
  try {
    const { email, otp } = await request.json();

    console.log('OTP verification attempt for:', email);

    // Find OTP record
    const otpQuery = query(
      collection(db, 'otpStore'),
      where('email', '==', email),
      where('otp', '==', otp)
    );
    
    const otpSnapshot = await getDocs(otpQuery);

    if (otpSnapshot.empty) {
      console.log('Invalid OTP for:', email);
      return Response.json(
        { message: 'Invalid OTP' },
        { status: 400 }
      );
    }

    const otpDoc = otpSnapshot.docs[0];
    const otpData = otpDoc.data();

    // Check if OTP has expired
    if (new Date() > otpData.expiryAt.toDate()) {
      // Delete expired OTP
      await deleteDoc(doc(db, 'otpStore', otpDoc.id));
      console.log('Expired OTP for:', email);
      return Response.json(
        { message: 'OTP has expired. Please request a new one.' },
        { status: 400 }
      );
    }

    // Update user verification status using Firebase UID
    if (otpData.firebaseUid) {
      await updateDoc(doc(db, 'users', otpData.firebaseUid), {
        isVerified: true,
        verifiedAt: new Date(),
      });
      console.log('User verified:', email);
    } else {
      // Fallback: Find user by email (for backward compatibility)
      const usersQuery = query(collection(db, 'users'), where('email', '==', email));
      const usersSnapshot = await getDocs(usersQuery);

      if (!usersSnapshot.empty) {
        const userDoc = usersSnapshot.docs[0];
        await updateDoc(doc(db, 'users', userDoc.id), {
          isVerified: true,
          verifiedAt: new Date(),
        });
        console.log('User verified (fallback):', email);
      }
    }

    // Delete OTP after successful verification
    await deleteDoc(doc(db, 'otpStore', otpDoc.id));

    return Response.json(
      { message: 'Email verified successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('OTP verification error:', error);
    return Response.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}
