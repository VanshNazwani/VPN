// import { doc, updateDoc, getDoc } from 'firebase/firestore';
// import { db } from '@/lib/firebase';
// import { withAdminAuth } from '@/lib/middleware-auth';

// async function handler(request, { params }) {
//   try {
//     const { courseId } = params;

//     const courseRef = doc(db, 'courses', courseId);
//     const courseSnap = await getDoc(courseRef);

//     if (!courseSnap.exists()) {
//       return Response.json(
//         { message: 'Course not found' },
//         { status: 404 }
//       );
//     }

//     const courseData = courseSnap.data();
//     const newStatus = !courseData.isActive;

//     await updateDoc(courseRef, {
//       isActive: newStatus,
//       updatedAt: new Date(),
//       updatedBy: request.user.userId
//     });

//     return Response.json({
//       message: `Course ${newStatus ? 'activated' : 'deactivated'} successfully`,
//     });
//   } catch (error) {
//     console.error('Error toggling course status:', error);
//     return Response.json(
//       { message: 'Internal server error' },
//       { status: 500 }
//     );
//   }
// }

// export const PUT = withAdminAuth(handler);

import { doc, updateDoc, getDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { NextResponse } from 'next/server';

export async function PUT(request, { params }) {
  try {
    const { courseId } = params;

    // Don't allow status changes for mock courses
    if (courseId.startsWith('mock-')) {
      return NextResponse.json(
        { message: 'Cannot modify demo courses' },
        { status: 400 }
      );
    }

    const courseRef = doc(db, 'courses', courseId);
    const courseSnap = await getDoc(courseRef);

    if (!courseSnap.exists()) {
      return NextResponse.json(
        { message: 'Course not found' },
        { status: 404 }
      );
    }

    const courseData = courseSnap.data();
    const newStatus = !courseData.isActive;

    await updateDoc(courseRef, {
      isActive: newStatus,
      updatedAt: new Date(),
    });

    return NextResponse.json({
      message: `Course ${newStatus ? 'activated' : 'deactivated'} successfully`,
    });
  } catch (error) {
    console.error('Error toggling course status:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}