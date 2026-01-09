// // // import { NextResponse } from 'next/server';
// // // import { doc, updateDoc, getDoc } from 'firebase/firestore';
// // // import { db } from '@/lib/firebase';
// // // import { withAuth } from '@/lib/middleware-auth';

// // // async function handler(request) {
// // //   try {
// // //     const userId = request.user.userId;
// // //     const { fullName, location } = await request.json();

// // //     if (!fullName || !location) {
// // //       return NextResponse.json(
// // //         { message: 'Full name and location are required' },
// // //         { status: 400 }
// // //       );
// // //     }

// // //     // Update user profile
// // //     await updateDoc(doc(db, 'users', userId), {
// // //       fullName,
// // //       location,
// // //       updatedAt: new Date(),
// // //     });

// // //     // Get updated user data
// // //     const userDoc = await getDoc(doc(db, 'users', userId));
// // //     const userData = userDoc.data();
// // //     const { password, ...userWithoutPassword } = userData;

// // //     return NextResponse.json({
// // //       message: 'Profile updated successfully',
// // //       user: {
// // //         id: userDoc.id,
// // //         ...userWithoutPassword,
// // //       },
// // //     });
// // //   } catch (error) {
// // //     console.error('Error updating profile:', error);
// // //     return NextResponse.json(
// // //       { message: 'Internal server error' },
// // //       { status: 500 }
// // //     );
// // //   }
// // // }

// // // export const PUT = withAuth(handler);

// // import { doc, updateDoc, getDoc } from 'firebase/firestore';
// // import { db } from '@/lib/firebase';
// // import { withAuth } from '@/lib/middleware-auth';

// // async function handler(request) {
// //   try {
// //     const userId = request.user.userId;
// //     const { fullName, location } = await request.json();

// //     if (!fullName || !location) {
// //       return Response.json(
// //         { message: 'Full name and location are required' },
// //         { status: 400 }
// //       );
// //     }

// //     // Update user profile
// //     await updateDoc(doc(db, 'users', userId), {
// //       fullName,
// //       location,
// //       updatedAt: new Date(),
// //     });

// //     // Get updated user data
// //     const userDoc = await getDoc(doc(db, 'users', userId));
// //     const userData = userDoc.data();
// //     const { password, ...userWithoutPassword } = userData;

// //     return Response.json({
// //       message: 'Profile updated successfully',
// //       user: {
// //         id: userDoc.id,
// //         ...userWithoutPassword,
// //       },
// //     });
// //   } catch (error) {
// //     console.error('Error updating profile:', error);
// //     return Response.json(
// //       { message: 'Internal server error' },
// //       { status: 500 }
// //     );
// //   }
// // }

// // export const PUT = withAuth(handler);
// import { doc, updateDoc, getDoc } from 'firebase/firestore';
// import { db } from '@/lib/firebase';
// import { withAuth } from '@/lib/middleware-auth';

// async function handler(request) {
//   try {
//     const userId = request.user.userId;
//     const { fullName, location } = await request.json();

//     if (!fullName || !location) {
//       return Response.json(
//         { message: 'Full name and location are required' },
//         { status: 400 }
//       );
//     }

//     // Update user profile
//     await updateDoc(doc(db, 'users', userId), {
//       fullName,
//       location,
//       updatedAt: new Date(),
//     });

//     // Get updated user data
//     const userDoc = await getDoc(doc(db, 'users', userId));
//     const userData = userDoc.data();
//     const { password, ...userWithoutPassword } = userData;

//     return Response.json({
//       message: 'Profile updated successfully',
//       user: {
//         id: userDoc.id,
//         ...userWithoutPassword,
//       },
//     });
//   } catch (error) {
//     console.error('Error updating profile:', error);
//     return Response.json(
//       { message: 'Internal server error' },
//       { status: 500 }
//     );
//   }
// }

// export const PUT = withAuth(handler);

import { doc, updateDoc, getDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { withAuth } from '@/lib/middleware-auth';

async function handler(request) {
  try {
    const userId = request.user.userId;
    const { fullName, location } = await request.json();

    if (!fullName || !location) {
      return Response.json(
        { message: 'Full name and location are required' },
        { status: 400 }
      );
    }

    // Update user profile
    await updateDoc(doc(db, 'users', userId), {
      fullName,
      location,
      updatedAt: new Date(),
    });

    // Get updated user data
    const userDoc = await getDoc(doc(db, 'users', userId));
    const userData = userDoc.data();
    const { password, ...userWithoutPassword } = userData;

    return Response.json({
      message: 'Profile updated successfully',
      user: {
        id: userDoc.id,
        ...userWithoutPassword,
      },
    });
  } catch (error) {
    console.error('Error updating profile:', error);
    return Response.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}

export const PUT = withAuth(handler);