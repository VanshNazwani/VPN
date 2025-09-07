// // import { doc, deleteDoc, getDoc } from 'firebase/firestore';
// // import { db } from '@/lib/firebase';
// // import { withAdminAuth } from '@/lib/middleware-auth';

// // async function handler(request, { params }) {
// //   try {
// //     const { courseId } = params;

// //     const courseRef = doc(db, 'courses', courseId);
// //     const courseSnap = await getDoc(courseRef);

// //     if (!courseSnap.exists()) {
// //       return Response.json(
// //         { message: 'Course not found' },
// //         { status: 404 }
// //       );
// //     }

// //     await deleteDoc(courseRef);

// //     return Response.json({
// //       message: 'Course deleted successfully',
// //     });
// //   } catch (error) {
// //     console.error('Error deleting course:', error);
// //     return Response.json(
// //       { message: 'Internal server error' },
// //       { status: 500 }
// //     );
// //   }
// // }

// // export const DELETE = withAdminAuth(handler);

// import { doc, deleteDoc, getDoc } from 'firebase/firestore';
// import { db } from '@/lib/firebase';
// import { withAdminAuth } from '@/lib/middleware-auth';

// async function handler(request, context) {
//   try {
//     const { courseId } = context.params;

//     const courseRef = doc(db, 'courses', courseId);
//     const courseSnap = await getDoc(courseRef);

//     if (!courseSnap.exists()) {
//       return Response.json(
//         { message: 'Course not found' },
//         { status: 404 }
//       );
//     }

//     await deleteDoc(courseRef);

//     return Response.json({
//       message: 'Course deleted successfully',
//     });
//   } catch (error) {
//     console.error('Error deleting course:', error);
//     return Response.json(
//       { message: 'Internal server error' },
//       { status: 500 }
//     );
//   }
// }

// export const DELETE = withAdminAuth(handler);

import { doc, deleteDoc, getDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { NextResponse } from 'next/server';

export async function GET(request, { params }) {
  try {
    const { courseId } = params;
    console.log('Fetching course with ID:', courseId);

    // Check if it's a mock course ID
    if (courseId.startsWith('mock-')) {
      const mockCourses = {
        'mock-1': {
          id: 'mock-1',
          title: 'Complete Web Development Bootcamp',
          description: 'Learn HTML, CSS, JavaScript, React, Node.js and build amazing websites. This comprehensive course covers everything from frontend to backend development.',
          thumbnail: 'https://images.pexels.com/photos/11035380/pexels-photo-11035380.jpeg',
          price: 4999,
          originalPrice: 9999,
          rating: 4.8,
          duration: '40 hours',
          enrolled: 1200,
          level: 'Beginner',
          category: 'Web Development',
          instructor: 'John Smith',
          createdAt: new Date('2024-01-15'),
          features: ['Lifetime Access', 'Certificate', '24/7 Support', 'Projects'],
          learningOutcomes: ['Build responsive websites', 'Master React framework', 'Create full-stack applications'],
          content: [
            {
              id: 1,
              title: 'HTML Fundamentals',
              description: 'Learn the basics of HTML structure and semantics',
              videoUrl: 'https://youtube.com/watch?v=example1'
            },
            {
              id: 2,
              title: 'CSS Styling',
              description: 'Master CSS for beautiful web designs',
              videoUrl: 'https://youtube.com/watch?v=example2'
            }
          ],
          isActive: true,
          enrolledCount: 1200
        },
        'mock-2': {
          id: 'mock-2',
          title: 'Python for Data Science',
          description: 'Master Python programming and data analysis with real-world projects. Learn pandas, numpy, matplotlib, and machine learning basics.',
          thumbnail: 'https://images.pexels.com/photos/1181677/pexels-photo-1181677.jpeg',
          price: 3999,
          originalPrice: 7999,
          rating: 4.9,
          duration: '35 hours',
          enrolled: 850,
          level: 'Intermediate',
          category: 'Data Science',
          instructor: 'Sarah Johnson',
          createdAt: new Date('2024-01-20'),
          features: ['Hands-on Projects', 'Certificate', 'Career Support', 'Live Sessions'],
          learningOutcomes: ['Master Python programming', 'Analyze data with pandas', 'Create visualizations'],
          content: [
            {
              id: 1,
              title: 'Python Basics',
              description: 'Introduction to Python programming',
              videoUrl: 'https://youtube.com/watch?v=example3'
            }
          ],
          isActive: true,
          enrolledCount: 850
        },
        'mock-3': {
          id: 'mock-3',
          title: 'Digital Marketing Mastery',
          description: 'Complete guide to SEO, SEM, Social Media Marketing, Email Marketing and Analytics. Become a digital marketing expert.',
          thumbnail: 'https://images.pexels.com/photos/265087/pexels-photo-265087.jpeg',
          price: 2999,
          originalPrice: 5999,
          rating: 4.7,
          duration: '25 hours',
          enrolled: 950,
          level: 'Beginner',
          category: 'Digital Marketing',
          instructor: 'Mike Davis',
          createdAt: new Date('2024-01-25'),
          features: ['Case Studies', 'Certificate', 'Tools Access', 'Community'],
          learningOutcomes: ['Master SEO techniques', 'Run effective ad campaigns', 'Analyze marketing metrics'],
          content: [
            {
              id: 1,
              title: 'SEO Fundamentals',
              description: 'Learn search engine optimization basics',
              videoUrl: 'https://youtube.com/watch?v=example4'
            }
          ],
          isActive: true,
          enrolledCount: 950
        }
      };

      const mockCourse = mockCourses[courseId];
      if (mockCourse) {
        return NextResponse.json({
          course: mockCourse
        });
      }
    }

    // Fetch from Firebase for real courses
    const courseRef = doc(db, 'courses', courseId);
    const courseSnap = await getDoc(courseRef);

    if (!courseSnap.exists()) {
      return NextResponse.json(
        { message: 'Course not found' },
        { status: 404 }
      );
    }

    const courseData = courseSnap.data();
    const course = {
      id: courseSnap.id,
      ...courseData,
      createdAt: courseData.createdAt?.toDate?.() || courseData.createdAt,
      updatedAt: courseData.updatedAt?.toDate?.() || courseData.updatedAt,
    };

    return NextResponse.json({
      course
    });
  } catch (error) {
    console.error('Error fetching course:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function DELETE(request, { params }) {
  try {
    const { courseId } = params;

    // Don't allow deletion of mock courses
    if (courseId.startsWith('mock-')) {
      return NextResponse.json(
        { message: 'Cannot delete demo courses' },
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

    await deleteDoc(courseRef);

    return NextResponse.json({
      message: 'Course deleted successfully',
    });
  } catch (error) {
    console.error('Error deleting course:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}