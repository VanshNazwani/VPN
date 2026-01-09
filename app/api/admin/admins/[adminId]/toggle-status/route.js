// // import { doc, updateDoc, getDoc } from 'firebase/firestore';
// // import { db } from '@/lib/firebase';
// // import { withAdminAuth } from '@/lib/middleware-auth';

// // async function handler(request, { params }) {
// //   try {
// //     const { adminId } = params;
// //     const currentUser = request.user;

// //     // Prevent self-deactivation
// //     if (currentUser.userId === adminId) {
// //       return Response.json(
// //         { message: 'You cannot deactivate your own account' },
// //         { status: 400 }
// //       );
// //     }

// //     const adminRef = doc(db, 'admins', adminId);
// //     const adminSnap = await getDoc(adminRef);

// //     if (!adminSnap.exists()) {
// //       return Response.json(
// //         { message: 'Administrator not found' },
// //         { status: 404 }
// //       );
// //     }

// //     const adminData = adminSnap.data();
// //     const newStatus = !adminData.isActive;

// //     await updateDoc(adminRef, {
// //       isActive: newStatus,
// //       updatedAt: new Date(),
// //       updatedBy: currentUser.userId
// //     });

// //     return Response.json({
// //       message: `Administrator ${newStatus ? 'activated' : 'deactivated'} successfully`,
// //     });
// //   } catch (error) {
// //     console.error('Error toggling admin status:', error);
// //     return Response.json(
// //       { message: 'Internal server error' },
// //       { status: 500 }
// //     );
// //   }
// // }

// // export const PUT = withAdminAuth(handler);

// import { doc, updateDoc, getDoc } from 'firebase/firestore';
// import { db } from '@/lib/firebase';
// import { withAdminAuth } from '@/lib/middleware-auth';

// async function handler(request, context) {
//   try {
//     const { adminId } = context.params;
//     const currentUser = request.user;

//     // Prevent self-deactivation
//     if (currentUser.userId === adminId) {
//       return Response.json(
//         { message: 'You cannot deactivate your own account' },
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

//     const adminData = adminSnap.data();
//     const newStatus = !adminData.isActive;

//     await updateDoc(adminRef, {
//       isActive: newStatus,
//       updatedAt: new Date(),
//       updatedBy: currentUser.userId
//     });

//     return Response.json({
//       message: `Administrator ${newStatus ? 'activated' : 'deactivated'} successfully`,
//     });
//   } catch (error) {
//     console.error('Error toggling admin status:', error);
//     return Response.json(
//       { message: 'Internal server error' },
//       { status: 500 }
//     );
//   }
// }

// export const PUT = withAdminAuth(handler);

import { doc, updateDoc, getDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { adminAuth } from '@/lib/firebase-admin';
import { withAdminAuth } from '@/lib/middleware-auth';

async function handler(request, context) {
  try {
    const { adminId } = context.params;
    const currentUser = request.user;

    // Prevent self-deactivation
    if (currentUser.userId === adminId) {
      return Response.json(
        { message: 'You cannot deactivate your own account' },
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
    const newStatus = !adminData.isActive;

    // Update Firebase Auth user status
    if (adminData.firebaseUid) {
      try {
        await adminAuth.updateUser(adminData.firebaseUid, {
          disabled: !newStatus
        });
      } catch (authError) {
        console.error('Firebase Auth update error:', authError);
        return Response.json(
          { message: 'Failed to update authentication status' },
          { status: 500 }
        );
      }
    }

    // Update Firestore document
    await updateDoc(adminRef, {
      isActive: newStatus,
      updatedAt: new Date(),
      updatedBy: currentUser.userId
    });

    return Response.json({
      message: `Administrator ${newStatus ? 'activated' : 'deactivated'} successfully`,
    });
  } catch (error) {
    console.error('Error toggling admin status:', error);
    return Response.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}

export const PUT = withAdminAuth(handler);