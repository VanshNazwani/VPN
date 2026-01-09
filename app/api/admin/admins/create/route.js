// // import { collection, addDoc, query, where, getDocs } from 'firebase/firestore';
// // import { db } from '@/lib/firebase';
// // import bcrypt from 'bcryptjs';
// // import { sendAdminCreatedEmail } from '@/lib/email';
// // import { withAdminAuth } from '@/lib/middleware-auth';

// // async function handler(request) {
// //   try {
// //     const { fullName, email, password } = await request.json();
// //     const creatorInfo = request.user; // From auth middleware

// //     // Check if admin already exists
// //     const adminsRef = collection(db, 'admins');
// //     const q = query(adminsRef, where('email', '==', email));
// //     const querySnapshot = await getDocs(q);

// //     if (!querySnapshot.empty) {
// //       return Response.json(
// //         { message: 'Admin with this email already exists' },
// //         { status: 400 }
// //       );
// //     }

// //     // Hash password
// //     const saltRounds = 12;
// //     const hashedPassword = await bcrypt.hash(password, saltRounds);

// //     // Create admin document
// //     const adminData = {
// //       fullName,
// //       email,
// //       password: hashedPassword,
// //       role: 'admin',
// //       isVerified: true,
// //       isActive: true,
// //       createdAt: new Date(),
// //       updatedAt: new Date(),
// //       createdBy: creatorInfo.userId,
// //       permissions: {
// //         canCreateCourses: true,
// //         canManageUsers: true,
// //         canViewAnalytics: true,
// //         canManageAdmins: true,
// //         canManageOrders: true
// //       }
// //     };

// //     const docRef = await addDoc(collection(db, 'admins'), adminData);

// //     // Send email notification to new admin
// //     try {
// //       await sendAdminCreatedEmail({
// //         to: email,
// //         adminName: fullName,
// //         createdBy: creatorInfo.fullName || creatorInfo.email
// //       });
// //     } catch (emailError) {
// //       console.error('Failed to send admin creation email:', emailError);
// //       // Don't fail the creation if email fails
// //     }

// //     return Response.json({
// //       message: 'Administrator created successfully',
// //       adminId: docRef.id,
// //     }, { status: 201 });

// //   } catch (error) {
// //     console.error('Admin creation error:', error);
// //     return Response.json(
// //       { message: 'Internal server error' },
// //       { status: 500 }
// //     );
// //   }
// // }

// // export const POST = withAdminAuth(handler);

// import { collection, addDoc, query, where, getDocs } from 'firebase/firestore';
// import { db } from '@/lib/firebase';
// import { adminAuth } from '@/lib/firebase-admin';
// import { sendAdminCreatedEmail } from '@/lib/email';
// import { withAdminAuth } from '@/lib/middleware-auth';

// // Generate a secure random password
// function generateSecurePassword(length = 12) {
//   const charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*';
//   let password = '';
//   for (let i = 0; i < length; i++) {
//     password += charset.charAt(Math.floor(Math.random() * charset.length));
//   }
//   return password;
// }

// async function handler(request) {
//   try {
//     const { fullName, email } = await request.json();
//     const creatorInfo = request.user; // From auth middleware

//     // Validate input
//     if (!fullName || !email) {
//       return Response.json(
//         { message: 'Full name and email are required' },
//         { status: 400 }
//       );
//     }

//     // Check if admin already exists in Firestore
//     const adminsRef = collection(db, 'admins');
//     const q = query(adminsRef, where('email', '==', email));
//     const querySnapshot = await getDocs(q);

//     if (!querySnapshot.empty) {
//       return Response.json(
//         { message: 'Admin with this email already exists' },
//         { status: 400 }
//       );
//     }

//     // Generate a temporary password
//     const temporaryPassword = generateSecurePassword();

//     // Create user in Firebase Auth
//     let firebaseUser;
//     try {
//       firebaseUser = await adminAuth.createUser({
//         email: email,
//         password: temporaryPassword,
//         displayName: fullName,
//         emailVerified: false
//       });
//     } catch (authError) {
//       console.error('Firebase Auth error:', authError);
//       if (authError.code === 'auth/email-already-exists') {
//         return Response.json(
//           { message: 'An account with this email already exists' },
//           { status: 400 }
//         );
//       }
//       return Response.json(
//         { message: 'Failed to create user account' },
//         { status: 500 }
//       );
//     }

//     // Create admin document in Firestore (without password)
//     const adminData = {
//       firebaseUid: firebaseUser.uid,
//       fullName,
//       email,
//       role: 'admin',
//       isVerified: true,
//       isActive: true,
//       createdAt: new Date(),
//       updatedAt: new Date(),
//       createdBy: creatorInfo.userId,
//       permissions: {
//         canCreateCourses: true,
//         canManageUsers: true,
//         canViewAnalytics: true,
//         canManageAdmins: true,
//         canManageOrders: true
//       }
//     };

//     const docRef = await addDoc(collection(db, 'admins'), adminData);

//     // Send email notification to new admin with temporary password
//     try {
//       await sendAdminCreatedEmail({
//         to: email,
//         adminName: fullName,
//         temporaryPassword: temporaryPassword,
//         createdBy: creatorInfo.fullName || creatorInfo.email
//       });
//     } catch (emailError) {
//       console.error('Failed to send admin creation email:', emailError);
//       // If email fails, we should delete the created user to maintain consistency
//       try {
//         await adminAuth.deleteUser(firebaseUser.uid);
//         await deleteDoc(doc(db, 'admins', docRef.id));
//       } catch (cleanupError) {
//         console.error('Failed to cleanup after email error:', cleanupError);
//       }
//       return Response.json(
//         { message: 'Failed to send login credentials. Admin account not created.' },
//         { status: 500 }
//       );
//     }

//     return Response.json({
//       message: 'Administrator created successfully',
//       adminId: docRef.id,
//     }, { status: 201 });
//   } catch (error) {
//     console.error('Admin creation error:', error);
//     return Response.json(
//       { message: 'Internal server error' },
//       { status: 500 }
//     );
//   }
// }

// export const POST = withAdminAuth(handler);

import { collection, addDoc, query, where, getDocs, doc, setDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { adminAuth } from '@/lib/firebase-admin';
import { sendAdminCreatedEmail } from '@/lib/email';
import { withAdminAuth } from '@/lib/middleware-auth';

// Generate a secure random password
function generateSecurePassword(length = 12) {
  const charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*';
  let password = '';
  for (let i = 0; i < length; i++) {
    password += charset.charAt(Math.floor(Math.random() * charset.length));
  }
  return password;
}

async function handler(request) {
  try {
    const { fullName, email } = await request.json();
    const creatorInfo = request.user; // From auth middleware

    // Validate input
    if (!fullName || !email) {
      return Response.json(
        { message: 'Full name and email are required' },
        { status: 400 }
      );
    }

    // Check if admin already exists in Firestore (by email)
    const adminsRef = collection(db, 'admins');
    const q = query(adminsRef, where('email', '==', email));
    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      return Response.json(
        { message: 'Admin with this email already exists' },
        { status: 400 }
      );
    }

    // Generate a temporary password
    const temporaryPassword = generateSecurePassword();

    // Create user in Firebase Auth
    let firebaseUser;
    try {
      firebaseUser = await adminAuth.createUser({
        email: email,
        password: temporaryPassword,
        displayName: fullName,
        emailVerified: true // Set to true since we're creating admin accounts
      });
    } catch (authError) {
      console.error('Firebase Auth error:', authError);
      if (authError.code === 'auth/email-already-exists') {
        return Response.json(
          { message: 'An account with this email already exists' },
          { status: 400 }
        );
      }
      return Response.json(
        { message: 'Failed to create user account' },
        { status: 500 }
      );
    }

    // Create admin document in Firestore using Firebase Auth UID as document ID
    const adminData = {
      fullName,
      email,
      role: 'admin',
      isVerified: true,
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date(),
      createdBy: creatorInfo.userId,
      hasTemporaryPassword: true, // Flag to track temporary password
      permissions: {
        canCreateCourses: true,
        canManageUsers: true,
        canViewAnalytics: true,
        canManageAdmins: true,
        canManageOrders: true
      }
    };

    // Use setDoc with the Firebase Auth UID as the document ID
    await setDoc(doc(db, 'admins', firebaseUser.uid), adminData);

    // Send email notification to new admin with temporary password
    try {
      await sendAdminCreatedEmail({
        to: email,
        adminName: fullName,
        temporaryPassword: temporaryPassword,
        createdBy: creatorInfo.fullName || creatorInfo.email
      });
    } catch (emailError) {
      console.error('Failed to send admin creation email:', emailError);
      // If email fails, we should delete the created user to maintain consistency
      try {
        await adminAuth.deleteUser(firebaseUser.uid);
        await deleteDoc(doc(db, 'admins', firebaseUser.uid));
      } catch (cleanupError) {
        console.error('Failed to cleanup after email error:', cleanupError);
      }
      return Response.json(
        { message: 'Failed to send login credentials. Admin account not created.' },
        { status: 500 }
      );
    }

    return Response.json({
      message: 'Administrator created successfully',
      adminId: firebaseUser.uid, // Return the Firebase Auth UID as the admin ID
    }, { status: 201 });
  } catch (error) {
    console.error('Admin creation error:', error);
    return Response.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}

export const POST = withAdminAuth(handler);