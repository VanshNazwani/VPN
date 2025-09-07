// // // import { NextResponse } from 'next/server';
// // // import { db } from '@/lib/firebase';
// // // import { doc, getDoc } from 'firebase/firestore';
// // // import { withAuth } from '@/lib/middleware-auth';

// // // async function handler(request, { params }) {
// // //   try {
// // //     const { courseId } = params;
// // //     const userId = request.user.userId;

// // //     console.log('Fetching course view data for:', courseId, 'user:', userId);

// // //     // Check if user is enrolled in this course
// // //     const userDocRef = doc(db, 'users', userId);
// // //     const userDoc = await getDoc(userDocRef);
    
// // //     if (!userDoc.exists()) {
// // //       return NextResponse.json(
// // //         { error: 'User not found' },
// // //         { status: 404 }
// // //       );
// // //     }

// // //     const userData = userDoc.data();
// // //     const enrolledCourses = userData.enrolledCourses || [];
    
// // //     if (!enrolledCourses.includes(courseId)) {
// // //       return NextResponse.json(
// // //         { error: 'You are not enrolled in this course' },
// // //         { status: 403 }
// // //       );
// // //     }

// // //     // Get course data
// // //     const courseDocRef = doc(db, 'courses', courseId);
// // //     const courseDoc = await getDoc(courseDocRef);
    
// // //     if (!courseDoc.exists()) {
// // //       return NextResponse.json(
// // //         { error: 'Course not found' },
// // //         { status: 404 }
// // //       );
// // //     }

// // //     const courseData = courseDoc.data();

// // //     // Get progress data
// // //     const progressRef = doc(db, 'user_course_progress', `${userId}_${courseId}`);
// // //     const progressDoc = await getDoc(progressRef);
    
// // //     let progressData = {
// // //       progress: 0,
// // //       completedSections: [],
// // //       certificateEligible: false,
// // //       certificateIssued: false,
// // //       lastAccessed: new Date(),
// // //       totalSections: courseData.content ? courseData.content.length : 0
// // //     };

// // //     if (progressDoc.exists()) {
// // //       progressData = { ...progressData, ...progressDoc.data() };
// // //     }

// // //     return NextResponse.json({
// // //       success: true,
// // //       course: {
// // //         id: courseId,
// // //         ...courseData
// // //       },
// // //       progress: progressData
// // //     });

// // //   } catch (error) {
// // //     console.error('Error fetching course view data:', error);
// // //     return NextResponse.json(
// // //       { error: 'Failed to fetch course data' },
// // //       { status: 500 }
// // //     );
// // //   }
// // // }

// // // export const GET = withAuth(handler);

// // import { NextResponse } from 'next/server';
// // import { db } from '@/lib/firebase';
// // import { doc, getDoc } from 'firebase/firestore';
// // import { withAuth } from '@/lib/middleware-auth';

// // async function handler(request, { params }) {
// //   try {
// //     const { courseId } = params;
// //     const userId = request.user.userId;

// //     console.log('Fetching course view data for:', courseId, 'user:', userId);

// //     // Check if user is enrolled in this course
// //     const userDocRef = doc(db, 'users', userId);
// //     const userDoc = await getDoc(userDocRef);
    
// //     if (!userDoc.exists()) {
// //       console.error('User not found:', userId);
// //       return NextResponse.json(
// //         { error: 'User not found' },
// //         { status: 404 }
// //       );
// //     }

// //     const userData = userDoc.data();
// //     const enrolledCourses = userData.enrolledCourses || [];
    
// //     if (!enrolledCourses.includes(courseId)) {
// //       console.error('User not enrolled in course:', courseId, 'enrolled courses:', enrolledCourses);
// //       return NextResponse.json(
// //         { error: 'You are not enrolled in this course' },
// //         { status: 403 }
// //       );
// //     }

// //     // Get course data
// //     const courseDocRef = doc(db, 'courses', courseId);
// //     const courseDoc = await getDoc(courseDocRef);
    
// //     if (!courseDoc.exists()) {
// //       console.error('Course not found:', courseId);
// //       return NextResponse.json(
// //         { error: 'Course not found' },
// //         { status: 404 }
// //       );
// //     }

// //     const courseData = courseDoc.data();
// //     console.log('Course data retrieved:', courseData.title);

// //     // Get progress data
// //     const progressRef = doc(db, 'user_course_progress', `${userId}_${courseId}`);
// //     const progressDoc = await getDoc(progressRef);
    
// //     let progressData = {
// //       progress: 0,
// //       completedSections: [],
// //       certificateEligible: false,
// //       certificateIssued: false,
// //       lastAccessed: new Date(),
// //       totalSections: courseData.content ? courseData.content.length : 0
// //     };

// //     if (progressDoc.exists()) {
// //       const existingProgress = progressDoc.data();
// //       progressData = { 
// //         ...progressData, 
// //         ...existingProgress,
// //         // Ensure completedSections is always an array
// //         completedSections: existingProgress.completedSections || []
// //       };
// //     }

// //     console.log('Progress data:', progressData);

// //     // Update last accessed time
// //     try {
// //       await setDoc(progressRef, {
// //         ...progressData,
// //         lastAccessed: new Date()
// //       }, { merge: true });
// //     } catch (updateError) {
// //       console.error('Error updating last accessed time:', updateError);
// //       // Don't fail the request if we can't update last accessed
// //     }

// //     return NextResponse.json({
// //       success: true,
// //       course: {
// //         id: courseId,
// //         title: courseData.title,
// //         description: courseData.description,
// //         thumbnail: courseData.thumbnail,
// //         category: courseData.category,
// //         duration: courseData.duration,
// //         content: courseData.content || [],
// //         instructor: courseData.instructor,
// //         price: courseData.price
// //       },
// //       progress: progressData
// //     });

// //   } catch (error) {
// //     console.error('Error fetching course view data:', error);
// //     return NextResponse.json(
// //       { error: 'Failed to fetch course data', details: error.message },
// //       { status: 500 }
// //     );
// //   }
// // }

// // export const GET = withAuth(handler);

// import { NextResponse } from 'next/server';
// import { db } from '@/lib/firebase';
// import { doc, getDoc, setDoc } from 'firebase/firestore';
// import { withAuth } from '@/lib/middleware-auth';

// async function handler(request, context) {
//   try {
//     // Extract courseId from URL pathname - this is the correct way with middleware
//     const url = new URL(request.url);
//     const pathSegments = url.pathname.split('/');
//     const courseId = pathSegments[pathSegments.findIndex(segment => segment === 'courses') + 1];
    
//     // Alternative method: extract from context if available
//     const contextCourseId = context?.params?.courseId;
//     const finalCourseId = contextCourseId || courseId;
    
//     if (!finalCourseId) {
//       console.error('CourseId not found in URL:', url.pathname);
//       return NextResponse.json(
//         { error: 'Course ID is required' },
//         { status: 400 }
//       );
//     }

//     const userId = request.user.userId;

//     console.log('Fetching course view data for:', finalCourseId, 'user:', userId);
//     console.log('URL pathname:', url.pathname);

//     // Check if user is enrolled in this course
//     const userDocRef = doc(db, 'users', userId);
//     const userDoc = await getDoc(userDocRef);
        
//     if (!userDoc.exists()) {
//       console.error('User not found:', userId);
//       return NextResponse.json(
//         { error: 'User not found' },
//         { status: 404 }
//       );
//     }

//     const userData = userDoc.data();
//     const enrolledCourses = userData.enrolledCourses || [];
        
//     if (!enrolledCourses.includes(finalCourseId)) {
//       console.error('User not enrolled in course:', finalCourseId, 'enrolled courses:', enrolledCourses);
//       return NextResponse.json(
//         { error: 'You are not enrolled in this course' },
//         { status: 403 }
//       );
//     }

//     // Get course data
//     const courseDocRef = doc(db, 'courses', finalCourseId);
//     const courseDoc = await getDoc(courseDocRef);
        
//     if (!courseDoc.exists()) {
//       console.error('Course not found:', finalCourseId);
//       return NextResponse.json(
//         { error: 'Course not found' },
//         { status: 404 }
//       );
//     }

//     const courseData = courseDoc.data();
//     console.log('Course data retrieved:', courseData.title);

//     // Get progress data
//     const progressRef = doc(db, 'user_course_progress', `${userId}_${finalCourseId}`);
//     const progressDoc = await getDoc(progressRef);
        
//     let progressData = {
//       progress: 0,
//       completedSections: [],
//       certificateEligible: false,
//       certificateIssued: false,
//       lastAccessed: new Date(),
//       totalSections: courseData.content ? courseData.content.length : 0
//     };

//     if (progressDoc.exists()) {
//       const existingProgress = progressDoc.data();
//       progressData = {
//         ...progressData,
//         ...existingProgress,
//         // Ensure completedSections is always an array
//         completedSections: existingProgress.completedSections || []
//       };
//     }

//     console.log('Progress data:', progressData);

//     // Update last accessed time
//     try {
//       await setDoc(progressRef, {
//         ...progressData,
//         lastAccessed: new Date()
//       }, { merge: true });
//       console.log('Last accessed time updated successfully');
//     } catch (updateError) {
//       console.error('Error updating last accessed time:', updateError);
//       // Don't fail the request if we can't update last accessed
//     }

//     return NextResponse.json({
//       success: true,
//       course: {
//         id: finalCourseId,
//         title: courseData.title,
//         description: courseData.description,
//         thumbnail: courseData.thumbnail,
//         category: courseData.category,
//         duration: courseData.duration,
//         content: courseData.content || [],
//         instructor: courseData.instructor,
//         price: courseData.price,
//         level: courseData.level,
//         originalPrice: courseData.originalPrice
//       },
//       progress: progressData
//     });

//   } catch (error) {
//     console.error('Error fetching course view data:', error);
//     return NextResponse.json(
//       { error: 'Failed to fetch course data', details: error.message },
//       { status: 500 }
//     );
//   }
// }

// export const GET = withAuth(handler);

import { NextResponse } from 'next/server';
import { db } from '@/lib/firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { withAuth } from '@/lib/middleware-auth';

async function handler(request, context) {
  try {
    // Extract courseId from URL pathname - this is the correct way with middleware
    const url = new URL(request.url);
    const pathSegments = url.pathname.split('/');
    const courseId = pathSegments[pathSegments.findIndex(segment => segment === 'courses') + 1];
    
    // Alternative method: extract from context if available
    const contextCourseId = context?.params?.courseId;
    const finalCourseId = contextCourseId || courseId;
    
    if (!finalCourseId) {
      console.error('CourseId not found in URL:', url.pathname);
      return NextResponse.json(
        { error: 'Course ID is required' },
        { status: 400 }
      );
    }

    const userId = request.user.userId;

    console.log('Fetching course view data for:', finalCourseId, 'user:', userId);
    console.log('URL pathname:', url.pathname);

    // Check if user is enrolled in this course
    const userDocRef = doc(db, 'users', userId);
    const userDoc = await getDoc(userDocRef);
        
    if (!userDoc.exists()) {
      console.error('User not found:', userId);
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    const userData = userDoc.data();
    const enrolledCourses = userData.enrolledCourses || [];
        
    if (!enrolledCourses.includes(finalCourseId)) {
      console.error('User not enrolled in course:', finalCourseId, 'enrolled courses:', enrolledCourses);
      return NextResponse.json(
        { error: 'You are not enrolled in this course' },
        { status: 403 }
      );
    }

    // Get course data
    const courseDocRef = doc(db, 'courses', finalCourseId);
    const courseDoc = await getDoc(courseDocRef);
        
    if (!courseDoc.exists()) {
      console.error('Course not found:', finalCourseId);
      return NextResponse.json(
        { error: 'Course not found' },
        { status: 404 }
      );
    }

    const courseData = courseDoc.data();
    console.log('Course data retrieved:', courseData.title);
    console.log('Course content structure:', JSON.stringify(courseData.content, null, 2));

    // Get progress data
    const progressRef = doc(db, 'user_course_progress', `${userId}_${finalCourseId}`);
    const progressDoc = await getDoc(progressRef);
        
    let progressData = {
      progress: 0,
      completedSections: [],
      certificateEligible: false,
      certificateIssued: false,
      lastAccessed: new Date(),
      totalSections: courseData.content ? courseData.content.length : 0
    };

    if (progressDoc.exists()) {
      const existingProgress = progressDoc.data();
      progressData = {
        ...progressData,
        ...existingProgress,
        // Ensure completedSections is always an array
        completedSections: existingProgress.completedSections || []
      };
    }

    console.log('Progress data:', progressData);

    // Update last accessed time
    try {
      await setDoc(progressRef, {
        ...progressData,
        lastAccessed: new Date()
      }, { merge: true });
      console.log('Last accessed time updated successfully');
    } catch (updateError) {
      console.error('Error updating last accessed time:', updateError);
      // Don't fail the request if we can't update last accessed
    }

    // Ensure content structure is preserved with all nested fields including videoUrl
    const processedContent = courseData.content ? courseData.content.map((section, index) => ({
      id: section.id || index,
      title: section.title || `Section ${index + 1}`,
      description: section.description || '',
      videoUrl: section.videoUrl || null, // Explicitly ensure videoUrl is included
      content: section.content || '',
      resources: section.resources || [],
      duration: section.duration || null,
      order: section.order || index
    })) : [];

    console.log('Processed content with videoUrls:', JSON.stringify(processedContent.map(s => ({
      title: s.title,
      videoUrl: s.videoUrl
    })), null, 2));

    return NextResponse.json({
      success: true,
      course: {
        id: finalCourseId,
        title: courseData.title,
        description: courseData.description,
        thumbnail: courseData.thumbnail,
        category: courseData.category,
        duration: courseData.duration,
        content: processedContent, // Use processed content that ensures videoUrl is present
        instructor: courseData.instructor,
        price: courseData.price,
        level: courseData.level,
        originalPrice: courseData.originalPrice,
        features: courseData.features || [],
        learningOutcomes: courseData.learningOutcomes || [],
        rating: courseData.rating || 0,
        enrolled: courseData.enrolled || 0,
        isActive: courseData.isActive
      },
      progress: progressData
    });

  } catch (error) {
    console.error('Error fetching course view data:', error);
    return NextResponse.json(
      { error: 'Failed to fetch course data', details: error.message },
      { status: 500 }
    );
  }
}

export const GET = withAuth(handler);