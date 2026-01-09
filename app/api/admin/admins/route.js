import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { withAdminAuth } from '@/lib/middleware-auth';

async function handler(request) {
  try {
    // Fetch all admins
    const adminsSnapshot = await getDocs(collection(db, 'admins'));
    const admins = adminsSnapshot.docs.map(doc => {
      const data = doc.data();
      // Remove password from response
      const { password, ...adminWithoutPassword } = data;
      return {
        id: doc.id,
        ...adminWithoutPassword,
        createdAt: data.createdAt?.toDate?.()?.toISOString() || new Date().toISOString()
      };
    });

    return Response.json({
      admins
    });
  } catch (error) {
    console.error('Error fetching admins:', error);
    return Response.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}

export const GET = withAdminAuth(handler);

// import { collection, getDocs, query, where } from 'firebase/firestore';
// import { db } from '@/lib/firebase';
// import { adminAuth } from '@/lib/firebase-admin';
// import { withAdminAuth } from '@/lib/middleware-auth';

// async function handler(request) {
//   try {
//     // Fetch all admins from Firestore
//     const adminsSnapshot = await getDocs(collection(db, 'admins'));
//     const firestoreAdmins = adminsSnapshot.docs.map(doc => ({
//       id: doc.id,
//       ...doc.data(),
//       createdAt: doc.data().createdAt?.toDate?.()?.toISOString() || new Date().toISOString()
//     }));

//     // Get Firebase Auth user data for each admin
//     const adminsWithAuthData = await Promise.all(
//       firestoreAdmins.map(async (admin) => {
//         try {
//           const userRecord = await adminAuth.getUser(admin.firebaseUid);
//           return {
//             ...admin,
//             emailVerified: userRecord.emailVerified,
//             lastSignIn: userRecord.metadata.lastSignInTime,
//             disabled: userRecord.disabled
//           };
//         } catch (error) {
//           // If user doesn't exist in Firebase Auth, mark as inactive
//           console.warn(`Firebase Auth user not found for admin ${admin.id}:`, error.message);
//           return {
//             ...admin,
//             emailVerified: false,
//             isActive: false,
//             disabled: true
//           };
//         }
//       })
//     );

//     return Response.json({
//       admins: adminsWithAuthData
//     });
//   } catch (error) {
//     console.error('Error fetching admins:', error);
//     return Response.json(
//       { message: 'Internal server error' },
//       { status: 500 }
//     );
//   }
// }

// export const GET = withAdminAuth(handler);