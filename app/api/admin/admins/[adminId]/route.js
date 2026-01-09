// import { doc, deleteDoc, getDoc } from 'firebase/firestore';
// import { db } from '@/lib/firebase';
// import { withAdminAuth } from '@/lib/middleware-auth';

// async function handler(request, { params }) {
//   try {
//     const { adminId } = params;
//     const currentUser = request.user;

//     // Prevent self-deletion
//     if (currentUser.userId === adminId) {
//       return Response.json(
//         { message: 'You cannot delete your own account' },
//         { status: 400 }
//       );
//     }

//     const adminRef = doc(db, 'admins', adminId);
//     const adminSnap = await getDoc(adminRef);

//     if (!adminSnap.exists()) {
//       return Response.json(
//         { message: 'Administrator not found' },
//         { status: 404 }
//       );
//     }

//     await deleteDoc(adminRef);

//     return Response.json({
//       message: 'Administrator deleted successfully',
//     });
//   } catch (error) {
//     console.error('Error deleting admin:', error);
//     return Response.json(
//       { message: 'Internal server error' },
//       { status: 500 }
//     );
//   }
// }

// export const DELETE = withAdminAuth(handler);

import { doc, deleteDoc, getDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { adminAuth } from '@/lib/firebase-admin';
import { withAdminAuth } from '@/lib/middleware-auth';

async function handler(request, { params }) {
  try {
    const { adminId } = params;
    const currentUser = request.user;

    // Prevent self-deletion
    if (currentUser.userId === adminId) {
      return Response.json(
        { message: 'You cannot delete your own account' },
        { status: 400 }
      );
    }

    const adminRef = doc(db, 'admins', adminId);
    const adminSnap = await getDoc(adminRef);

    if (!adminSnap.exists()) {
      return Response.json(
        { message: 'Administrator not found' },
        { status: 404 }
      );
    }

    const adminData = adminSnap.data();

    // Delete from Firebase Auth first
    if (adminData.firebaseUid) {
      try {
        await adminAuth.deleteUser(adminData.firebaseUid);
      } catch (authError) {
        console.error('Firebase Auth deletion error:', authError);
        // Continue with Firestore deletion even if Auth deletion fails
      }
    }

    // Delete from Firestore
    await deleteDoc(adminRef);

    return Response.json({
      message: 'Administrator deleted successfully',
    });
  } catch (error) {
    console.error('Error deleting admin:', error);
    return Response.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}

export const DELETE = withAdminAuth(handler);