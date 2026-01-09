// // // // // // import { NextResponse } from 'next/server';
// // // // // // import { collection, doc, getDoc, getDocs, query, where } from 'firebase/firestore';
// // // // // // import { db } from '@/lib/firebase';
// // // // // // import { withAuth } from '@/lib/middleware-auth';

// // // // // // async function handler(request) {
// // // // // //   try {
// // // // // //     const userId = request.user.userId;

// // // // // //     // Get user document
// // // // // //     const userDoc = await getDoc(doc(db, 'users', userId));
// // // // // //     if (!userDoc.exists()) {
// // // // // //       return NextResponse.json(
// // // // // //         { message: 'User not found' },
// // // // // //         { status: 404 }
// // // // // //       );
// // // // // //     }

// // // // // //     const userData = userDoc.data();

// // // // // //     // Get enrolled courses details
// // // // // //     const enrolledCourseIds = userData.enrolledCourses || [];
// // // // // //     const enrolledCourses = [];

// // // // // //     for (const courseId of enrolledCourseIds) {
// // // // // //       const courseDoc = await getDoc(doc(db, 'courses', courseId));
// // // // // //       if (courseDoc.exists()) {
// // // // // //         const courseData = courseDoc.data();

// // // // // //         // Get user's progress for this course (this would come from a progress collection)
// // // // // //         const progress = Math.floor(Math.random() * 100); // Mock progress
// // // // // //         const completed = progress === 100;
// // // // // //         const canDownloadCertificate = completed && 
// // // // // //           (new Date() - new Date(courseData.completedAt || 0)) > (30 * 24 * 60 * 60 * 1000); // 30 days

// // // // // //         enrolledCourses.push({
// // // // // //           id: courseDoc.id,
// // // // // //           ...courseData,
// // // // // //           progress,
// // // // // //           completed,
// // // // // //           canDownloadCertificate,
// // // // // //           credentialId: completed ? `VPN${Math.random().toString(36).substring(2, 12).toUpperCase()}` : null
// // // // // //         });
// // // // // //       }
// // // // // //     }

// // // // // //     // Calculate stats
// // // // // //     const stats = {
// // // // // //       enrolledCourses: enrolledCourses.length,
// // // // // //       completedCourses: enrolledCourses.filter(course => course.completed).length,
// // // // // //       certificatesEarned: enrolledCourses.filter(course => course.canDownloadCertificate).length,
// // // // // //       totalWatchTime: 0, // This would be calculated from actual viewing data
// // // // // //       credits: userData.credits || 0
// // // // // //     };

// // // // // //     // Mock recent activity
// // // // // //     const recentActivity = [
// // // // // //       {
// // // // // //         title: 'Course Progress',
// // // // // //         description: 'Completed lesson 5 of Web Development Bootcamp',
// // // // // //         timestamp: '2 hours ago'
// // // // // //       },
// // // // // //       {
// // // // // //         title: 'Certificate Earned',
// // // // // //         description: 'Received certificate for Python Data Science',
// // // // // //         timestamp: '1 day ago'
// // // // // //       },
// // // // // //       {
// // // // // //         title: 'New Enrollment',
// // // // // //         description: 'Enrolled in Digital Marketing course',
// // // // // //         timestamp: '3 days ago'
// // // // // //       }
// // // // // //     ];

// // // // // //     return NextResponse.json({
// // // // // //       stats,
// // // // // //       enrolledCourses,
// // // // // //       recentActivity
// // // // // //     });
// // // // // //   } catch (error) {
// // // // // //     console.error('Error fetching user dashboard data:', error);
// // // // // //     return NextResponse.json(
// // // // // //       { message: 'Internal server error' },
// // // // // //       { status: 500 }
// // // // // //     );
// // // // // //   }
// // // // // // }

// // // // // // export const GET = withAuth(handler);

// // // // // import { NextResponse } from 'next/server';
// // // // // import { collection, doc, getDoc, getDocs, query, where } from 'firebase/firestore';
// // // // // import { db } from '@/lib/firebase';
// // // // // import { withAuth } from '@/lib/middleware-auth';

// // // // // async function handler(request) {
// // // // //   try {
// // // // //     const userId = request.user.userId;

// // // // //     // Get user document
// // // // //     const userDoc = await getDoc(doc(db, 'users', userId));
// // // // //     if (!userDoc.exists()) {
// // // // //       return NextResponse.json(
// // // // //         { message: 'User not found' },
// // // // //         { status: 404 }
// // // // //       );
// // // // //     }

// // // // //     const userData = userDoc.data();

// // // // //     // Get enrolled courses details
// // // // //     const enrolledCourseIds = userData.enrolledCourses || [];
// // // // //     const enrolledCourses = [];

// // // // //     for (const courseId of enrolledCourseIds) {
// // // // //       const courseDoc = await getDoc(doc(db, 'courses', courseId));
// // // // //       if (courseDoc.exists()) {
// // // // //         const courseData = courseDoc.data();

// // // // //         // Get user's progress for this course (this would come from a progress collection)
// // // // //         const progress = Math.floor(Math.random() * 100); // Mock progress
// // // // //         const completed = progress === 100;
// // // // //         const canDownloadCertificate = completed &&
// // // // //           (new Date() - new Date(courseData.completedAt || 0)) > (30 * 24 * 60 * 60 * 1000); // 30 days

// // // // //         enrolledCourses.push({
// // // // //           id: courseDoc.id,
// // // // //           ...courseData,
// // // // //           progress,
// // // // //           completed,
// // // // //           canDownloadCertificate,
// // // // //           credentialId: completed ? `VPN${Math.random().toString(36).substring(2, 12).toUpperCase()}` : null
// // // // //         });
// // // // //       }
// // // // //     }

// // // // //     // Calculate stats
// // // // //     const stats = {
// // // // //       enrolledCourses: enrolledCourses.length,
// // // // //       completedCourses: enrolledCourses.filter(course => course.completed).length,
// // // // //       certificatesEarned: enrolledCourses.filter(course => course.canDownloadCertificate).length,
// // // // //       totalWatchTime: 0, // This would be calculated from actual viewing data
// // // // //       credits: userData.credits || 0
// // // // //     };

// // // // //     // Mock recent activity
// // // // //     const recentActivity = [
// // // // //       {
// // // // //         title: 'Course Progress',
// // // // //         description: 'Completed lesson 5 of Web Development Bootcamp',
// // // // //         timestamp: '2 hours ago'
// // // // //       },
// // // // //       {
// // // // //         title: 'Certificate Earned',
// // // // //         description: 'Received certificate for Python Data Science',
// // // // //         timestamp: '1 day ago'
// // // // //       },
// // // // //       {
// // // // //         title: 'New Enrollment',
// // // // //         description: 'Enrolled in Digital Marketing course',
// // // // //         timestamp: '3 days ago'
// // // // //       }
// // // // //     ];

// // // // //     return NextResponse.json({
// // // // //       stats,
// // // // //       enrolledCourses,
// // // // //       recentActivity
// // // // //     });
// // // // //   } catch (error) {
// // // // //     console.error('Error fetching user dashboard data:', error);
// // // // //     return NextResponse.json(
// // // // //       { message: 'Internal server error' },
// // // // //       { status: 500 }
// // // // //     );
// // // // //   }
// // // // // }

// // // // // export const GET = withAuth(handler);

// // // // import { collection, doc, getDoc, getDocs, query, where } from 'firebase/firestore';
// // // // import { db } from '@/lib/firebase';
// // // // import { withAuth } from '@/lib/middleware-auth';

// // // // async function handler(request) {
// // // //   try {
// // // //     const userId = request.user.userId;

// // // //     // Get user document
// // // //     const userDoc = await getDoc(doc(db, 'users', userId));
// // // //     if (!userDoc.exists()) {
// // // //       return Response.json(
// // // //         { message: 'User not found' },
// // // //         { status: 404 }
// // // //       );
// // // //     }

// // // //     const userData = userDoc.data();

// // // //     // Get enrolled courses details
// // // //     const enrolledCourseIds = userData.enrolledCourses || [];
// // // //     const enrolledCourses = [];

// // // //     for (const courseId of enrolledCourseIds) {
// // // //       const courseDoc = await getDoc(doc(db, 'courses', courseId));
// // // //       if (courseDoc.exists()) {
// // // //         const courseData = courseDoc.data();

// // // //         // Get user's progress for this course (this would come from a progress collection)
// // // //         const progress = Math.floor(Math.random() * 100); // Mock progress
// // // //         const completed = progress === 100;
// // // //         const canDownloadCertificate = completed &&
// // // //           (new Date() - new Date(courseData.completedAt || 0)) > (30 * 24 * 60 * 60 * 1000); // 30 days

// // // //         enrolledCourses.push({
// // // //           id: courseDoc.id,
// // // //           ...courseData,
// // // //           progress,
// // // //           completed,
// // // //           canDownloadCertificate,
// // // //           credentialId: completed ? `VPN${Math.random().toString(36).substring(2, 12).toUpperCase()}` : null
// // // //         });
// // // //       }
// // // //     }

// // // //     // Calculate stats
// // // //     const stats = {
// // // //       enrolledCourses: enrolledCourses.length,
// // // //       completedCourses: enrolledCourses.filter(course => course.completed).length,
// // // //       certificatesEarned: enrolledCourses.filter(course => course.canDownloadCertificate).length,
// // // //       totalWatchTime: 0, // This would be calculated from actual viewing data
// // // //       credits: userData.credits || 0
// // // //     };

// // // //     // Mock recent activity
// // // //     const recentActivity = [
// // // //       {
// // // //         title: 'Course Progress',
// // // //         description: 'Completed lesson 5 of Web Development Bootcamp',
// // // //         timestamp: '2 hours ago'
// // // //       },
// // // //       {
// // // //         title: 'Certificate Earned',
// // // //         description: 'Received certificate for Python Data Science',
// // // //         timestamp: '1 day ago'
// // // //       },
// // // //       {
// // // //         title: 'New Enrollment',
// // // //         description: 'Enrolled in Digital Marketing course',
// // // //         timestamp: '3 days ago'
// // // //       }
// // // //     ];

// // // //     return Response.json({
// // // //       stats,
// // // //       enrolledCourses,
// // // //       recentActivity
// // // //     });
// // // //   } catch (error) {
// // // //     console.error('Error fetching user dashboard data:', error);
// // // //     return Response.json(
// // // //       { message: 'Internal server error' },
// // // //       { status: 500 }
// // // //     );
// // // //   }
// // // // }

// // // // export const GET = withAuth(handler);
// // // import { collection, doc, getDoc, getDocs, query, where } from 'firebase/firestore';
// // // import { db } from '@/lib/firebase';
// // // import { withAuth } from '@/lib/middleware-auth';

// // // async function handler(request) {
// // //   try {
// // //     const userId = request.user.userId;

// // //     // Get user document
// // //     const userDoc = await getDoc(doc(db, 'users', userId));
// // //     if (!userDoc.exists()) {
// // //       return Response.json(
// // //         { message: 'User not found' },
// // //         { status: 404 }
// // //       );
// // //     }

// // //     const userData = userDoc.data();

// // //     // Get enrolled courses details
// // //     const enrolledCourseIds = userData.enrolledCourses || [];
// // //     const enrolledCourses = [];

// // //     for (const courseId of enrolledCourseIds) {
// // //       const courseDoc = await getDoc(doc(db, 'courses', courseId));
// // //       if (courseDoc.exists()) {
// // //         const courseData = courseDoc.data();

// // //         // Get user's progress for this course (this would come from a progress collection)
// // //         const progress = Math.floor(Math.random() * 100); // Mock progress
// // //         const completed = progress === 100;
// // //         const canDownloadCertificate = completed &&
// // //           (new Date() - new Date(courseData.completedAt || 0)) > (30 * 24 * 60 * 60 * 1000); // 30 days

// // //         enrolledCourses.push({
// // //           id: courseDoc.id,
// // //           ...courseData,
// // //           progress,
// // //           completed,
// // //           canDownloadCertificate,
// // //           credentialId: completed ? `VPN${Math.random().toString(36).substring(2, 12).toUpperCase()}` : null
// // //         });
// // //       }
// // //     }

// // //     // Calculate stats
// // //     const stats = {
// // //       enrolledCourses: enrolledCourses.length,
// // //       completedCourses: enrolledCourses.filter(course => course.completed).length,
// // //       certificatesEarned: enrolledCourses.filter(course => course.canDownloadCertificate).length,
// // //       totalWatchTime: 0, // This would be calculated from actual viewing data
// // //       credits: userData.credits || 0
// // //     };

// // //     // Mock recent activity
// // //     const recentActivity = [
// // //       {
// // //         title: 'Course Progress',
// // //         description: 'Completed lesson 5 of Web Development Bootcamp',
// // //         timestamp: '2 hours ago'
// // //       },
// // //       {
// // //         title: 'Certificate Earned',
// // //         description: 'Received certificate for Python Data Science',
// // //         timestamp: '1 day ago'
// // //       },
// // //       {
// // //         title: 'New Enrollment',
// // //         description: 'Enrolled in Digital Marketing course',
// // //         timestamp: '3 days ago'
// // //       }
// // //     ];

// // //     return Response.json({
// // //       stats,
// // //       enrolledCourses,
// // //       recentActivity
// // //     });
// // //   } catch (error) {
// // //     console.error('Error fetching user dashboard data:', error);
// // //     return Response.json(
// // //       { message: 'Internal server error' },
// // //       { status: 500 }
// // //     );
// // //   }
// // // }

// // // export const GET = withAuth(handler);
// // import { collection, doc, getDoc, getDocs, query, where } from 'firebase/firestore';
// // import { db } from '@/lib/firebase';
// // import { withAuth } from '@/lib/middleware-auth';

// // async function handler(request) {
// //   try {
// //     const userId = request.user.userId;

// //     // Get user document
// //     const userDoc = await getDoc(doc(db, 'users', userId));
// //     if (!userDoc.exists()) {
// //       return Response.json(
// //         { message: 'User not found' },
// //         { status: 404 }
// //       );
// //     }

// //     const userData = userDoc.data();

// //     // Get enrolled courses details
// //     const enrolledCourseIds = userData.enrolledCourses || [];
// //     const enrolledCourses = [];

// //     for (const courseId of enrolledCourseIds) {
// //       const courseDoc = await getDoc(doc(db, 'courses', courseId));
// //       if (courseDoc.exists()) {
// //         const courseData = courseDoc.data();

// //         // Get user's progress for this course (this would come from a progress collection)
// //         const progress = Math.floor(Math.random() * 100); // Mock progress
// //         const completed = progress === 100;
// //         const canDownloadCertificate = completed &&
// //           (new Date() - new Date(courseData.completedAt || 0)) > (30 * 24 * 60 * 60 * 1000); // 30 days

// //         enrolledCourses.push({
// //           id: courseDoc.id,
// //           ...courseData,
// //           progress,
// //           completed,
// //           canDownloadCertificate,
// //           credentialId: completed ? `VPN${Math.random().toString(36).substring(2, 12).toUpperCase()}` : null
// //         });
// //       }
// //     }

// //     // Calculate stats
// //     const stats = {
// //       enrolledCourses: enrolledCourses.length,
// //       completedCourses: enrolledCourses.filter(course => course.completed).length,
// //       certificatesEarned: enrolledCourses.filter(course => course.canDownloadCertificate).length,
// //       totalWatchTime: 0, // This would be calculated from actual viewing data
// //       credits: userData.credits || 0
// //     };

// //     // Mock recent activity
// //     const recentActivity = [
// //       {
// //         title: 'Course Progress',
// //         description: 'Completed lesson 5 of Web Development Bootcamp',
// //         timestamp: '2 hours ago'
// //       },
// //       {
// //         title: 'Certificate Earned',
// //         description: 'Received certificate for Python Data Science',
// //         timestamp: '1 day ago'
// //       },
// //       {
// //         title: 'New Enrollment',
// //         description: 'Enrolled in Digital Marketing course',
// //         timestamp: '3 days ago'
// //       }
// //     ];

// //     return Response.json({
// //       stats,
// //       enrolledCourses,
// //       recentActivity
// //     });
// //   } catch (error) {
// //     console.error('Error fetching user dashboard data:', error);
// //     return Response.json(
// //       { message: 'Internal server error' },
// //       { status: 500 }
// //     );
// //   }
// // }

// // export const GET = withAuth(handler);


// import { NextResponse } from 'next/server';
// import { db } from '@/lib/firebase';
// import { doc, getDoc, collection, query, where, getDocs, orderBy, limit } from 'firebase/firestore';
// import { withAuth } from '@/lib/middleware-auth';

// async function handler(request) {
//   try {
//     const userId = request.user.userId;
//     console.log('Fetching dashboard data for user:', userId);

//     // Get user document
//     const userDocRef = doc(db, 'users', userId);
//     const userDoc = await getDoc(userDocRef);
    
//     if (!userDoc.exists()) {
//       return NextResponse.json(
//         { error: 'User not found', message: 'User not found' },
//         { status: 404 }
//       );
//     }

//     const userData = userDoc.data();
//     const enrolledCourseIds = userData.enrolledCourses || [];

//     console.log('User enrolled course IDs:', enrolledCourseIds);

//     // Get enrolled courses with progress
//     const enrolledCoursesData = [];
//     let totalCompletedCourses = 0;
//     let certificatesEarned = 0;

//     for (const courseId of enrolledCourseIds) {
//       // Get course data
//       const courseDocRef = doc(db, 'courses', courseId);
//       const courseDoc = await getDoc(courseDocRef);
      
//       if (courseDoc.exists()) {
//         const courseData = courseDoc.data();
        
//         // Get progress data from user_course_progress collection
//         const progressRef = doc(db, 'user_course_progress', `${userId}_${courseId}`);
//         const progressDoc = await getDoc(progressRef);
        
//         let progressData = {
//           progress: 0,
//           completedSections: [],
//           certificateEligible: false,
//           certificateIssued: false,
//           lastAccessed: null
//         };

//         let progress = 0;
//         let completed = false;
//         let canDownloadCertificate = false;
//         let credentialId = null;

//         if (progressDoc.exists()) {
//           // Use real progress data if available
//           progressData = { ...progressData, ...progressDoc.data() };
//           progress = progressData.progress || 0;
//           completed = progress >= 100;
//           canDownloadCertificate = progressData.certificateEligible && progressData.certificateIssued;
          
//           if (canDownloadCertificate) {
//             credentialId = `VPN${Math.random().toString(36).substring(2, 12).toUpperCase()}`;
//           }
//         } else {
//           // Fallback to mock progress if no progress data exists (maintaining existing functionality)
//           progress = Math.floor(Math.random() * 100);
//           completed = progress === 100;
//           canDownloadCertificate = completed && 
//             (new Date() - new Date(courseData.completedAt || 0)) > (30 * 24 * 60 * 60 * 1000); // 30 days
          
//           if (completed) {
//             credentialId = `VPN${Math.random().toString(36).substring(2, 12).toUpperCase()}`;
//           }
//         }

//         const courseWithProgress = {
//           id: courseId,
//           ...courseData,
//           progress: progress,
//           completedSections: progressData.completedSections || [],
//           completed: completed,
//           lastAccessed: progressData.lastAccessed,
//           canDownloadCertificate: canDownloadCertificate,
//           certificateEligible: progressData.certificateEligible || completed,
//           credentialId: credentialId
//         };

//         if (courseWithProgress.completed) {
//           totalCompletedCourses++;
//         }

//         if (courseWithProgress.canDownloadCertificate) {
//           certificatesEarned++;
//         }

//         enrolledCoursesData.push(courseWithProgress);
//       }
//     }

//     // Get recent activity - enhanced version
//     let recentActivity = [];
    
//     // Try to get recent orders/enrollments from database
//     try {
//       const ordersRef = collection(db, 'orders');
//       const recentOrdersQuery = query(
//         ordersRef, 
//         where('userId', '==', userId),
//         where('status', '==', 'completed'),
//         orderBy('completedAt', 'desc'),
//         limit(5)
//       );
      
//       const ordersSnapshot = await getDocs(recentOrdersQuery);
      
//       ordersSnapshot.forEach((doc) => {
//         const orderData = doc.data();
//         recentActivity.push({
//           title: 'Course Purchased',
//           description: `Enrolled in ${orderData.courseName}`,
//           timestamp: orderData.completedAt ? orderData.completedAt.toDate().toLocaleDateString() : 'Recently'
//         });
//       });

//       // Add course progress activities
//       enrolledCoursesData.forEach(course => {
//         if (course.lastAccessed) {
//           recentActivity.push({
//             title: 'Course Progress',
//             description: `Continued learning ${course.title}`,
//             timestamp: course.lastAccessed.toDate ? course.lastAccessed.toDate().toLocaleDateString() : course.lastAccessed
//           });
//         }
//       });

//     } catch (activityError) {
//       console.log('Could not fetch recent activity from database:', activityError);
      
//       // Fallback to mock recent activity (maintaining existing functionality)
//       recentActivity = [
//         {
//           title: 'Course Progress',
//           description: 'Completed lesson 5 of Web Development Bootcamp',
//           timestamp: '2 hours ago'
//         },
//         {
//           title: 'Certificate Earned',
//           description: 'Received certificate for Python Data Science',
//           timestamp: '1 day ago'
//         },
//         {
//           title: 'New Enrollment',
//           description: 'Enrolled in Digital Marketing course',
//           timestamp: '3 days ago'
//         }
//       ];
//     }

//     // Sort recent activity by timestamp and limit to 5
//     recentActivity = recentActivity
//       .sort((a, b) => {
//         // Simple sorting - recent items first
//         if (a.timestamp.includes('ago') && !b.timestamp.includes('ago')) return -1;
//         if (!a.timestamp.includes('ago') && b.timestamp.includes('ago')) return 1;
//         return 0;
//       })
//       .slice(0, 5);

//     // Calculate comprehensive stats
//     const stats = {
//       enrolledCourses: enrolledCourseIds.length,
//       completedCourses: totalCompletedCourses,
//       certificatesEarned: certificatesEarned,
//       totalWatchTime: 0, // You can implement this later based on actual viewing data
//       credits: userData.credits || 0
//     };

//     console.log('Dashboard stats:', stats);

//     return NextResponse.json({
//       success: true,
//       stats,
//       enrolledCourses: enrolledCoursesData,
//       recentActivity: recentActivity
//     });

//   } catch (error) {
//     console.error('Dashboard data fetch error:', error);
//     console.error('Error fetching user dashboard data:', error);
//     return NextResponse.json(
//       { 
//         error: 'Failed to fetch dashboard data: ' + error.message,
//         message: 'Internal server error' 
//       },
//       { status: 500 }
//     );
//   }
// }

// export const GET = withAuth(handler);

import { NextResponse } from 'next/server';
import { db } from '@/lib/firebase';
import { doc, getDoc, collection, query, where, orderBy, limit, getDocs } from 'firebase/firestore';
import { withAuth } from '@/lib/middleware-auth';

async function handler(request) {
  try {
    const userId = request.user.userId;
    console.log('Fetching dashboard data for user:', userId);

    // Get user document
    const userDocRef = doc(db, 'users', userId);
    const userDoc = await getDoc(userDocRef);
    
    if (!userDoc.exists()) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    const userData = userDoc.data();
    const enrolledCourseIds = userData.enrolledCourses || [];
    console.log('User enrolled course IDs:', enrolledCourseIds);

    // Initialize stats
    let stats = {
      enrolledCourses: enrolledCourseIds.length,
      completedCourses: 0,
      certificatesEarned: 0,
      totalWatchTime: 0,
      credits: userData.credits || 0
    };

    // Get enrolled courses data
    let enrolledCourses = [];
    
    if (enrolledCourseIds.length > 0) {
      // Fetch each course individually to avoid query limitations
      for (const courseId of enrolledCourseIds) {
        try {
          const courseDocRef = doc(db, 'courses', courseId);
          const courseDoc = await getDoc(courseDocRef);
          
          if (courseDoc.exists()) {
            const courseData = courseDoc.data();
            
            // Get progress data
            const progressRef = doc(db, 'user_course_progress', `${userId}_${courseId}`);
            const progressDoc = await getDoc(progressRef);
            
            let progressData = {
              progress: 0,
              completedSections: [],
              certificateEligible: false,
              certificateIssued: false
            };

            if (progressDoc.exists()) {
              progressData = { ...progressData, ...progressDoc.data() };
            }

            // Determine if course is completed (100% progress)
            const isCompleted = progressData.progress >= 100;
            
            if (isCompleted) {
              stats.completedCourses++;
            }
            
            if (progressData.certificateEligible) {
              stats.certificatesEarned++;
            }

            enrolledCourses.push({
              id: courseId,
              title: courseData.title,
              description: courseData.description,
              category: courseData.category,
              duration: courseData.duration,
              thumbnail: courseData.thumbnail || 'https://images.pexels.com/photos/5212345/pexels-photo-5212345.jpeg',
              progress: progressData.progress,
              completed: isCompleted,
              certificateEligible: progressData.certificateEligible,
              canDownloadCertificate: progressData.certificateEligible
            });
          }
        } catch (error) {
          console.error(`Error fetching course ${courseId}:`, error);
        }
      }
    }

    // Get recent activity (simplified to avoid index requirements)
    let recentActivity = [];
    
    try {
      // Instead of complex queries, we'll create activity from recent course progress
      // This avoids the Firebase index requirement issue
      const recentProgressData = enrolledCourses
        .filter(course => course.progress > 0)
        .slice(0, 5)
        .map(course => ({
          id: `progress_${course.id}`,
          title: `Continued "${course.title}"`,
          description: `Progress: ${course.progress}%`,
          timestamp: 'Recently',
          type: 'course_progress'
        }));

      recentActivity = recentProgressData;
      
    } catch (error) {
      console.error('Could not fetch recent activity from database:', error);
      // Don't fail the entire request if recent activity fails
    }

    console.log('Dashboard stats:', stats);

    return NextResponse.json({
      success: true,
      stats,
      enrolledCourses,
      recentActivity
    });

  } catch (error) {
    console.error('Error in dashboard API:', error);
    return NextResponse.json(
      { error: 'Failed to fetch dashboard data' },
      { status: 500 }
    );
  }
}

export const GET = withAuth(handler);