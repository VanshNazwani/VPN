// // import { NextResponse } from 'next/server';
// // import { db } from '@/lib/firebase';
// // import { doc, getDoc, updateDoc, setDoc } from 'firebase/firestore';
// // import { withAuth } from '@/lib/middleware-auth';

// // // Configurable completion threshold (can be changed as needed)
// // const CERTIFICATE_THRESHOLD = 40; // Percentage required for certificate eligibility

// // async function handler(request, { params }) {
// //   try {
// //     const { courseId } = params;
// //     const userId = request.user.userId;
// //     const { sectionIndex, action } = await request.json();

// //     console.log(`Updating progress for course: ${courseId}, user: ${userId}, section: ${sectionIndex}, action: ${action}`);

// //     // Validate input
// //     if (action !== 'complete' && action !== 'uncomplete') {
// //       return NextResponse.json(
// //         { error: 'Invalid action. Must be "complete" or "uncomplete"' },
// //         { status: 400 }
// //       );
// //     }

// //     // Check if user is enrolled in this course
// //     const userDocRef = doc(db, 'users', userId);
// //     const userDoc = await getDoc(userDocRef);

// //     if (!userDoc.exists()) {
// //       return NextResponse.json(
// //         { error: 'User not found' },
// //         { status: 404 }
// //       );
// //     }

// //     const userData = userDoc.data();
// //     const enrolledCourses = userData.enrolledCourses || [];

// //     if (!enrolledCourses.includes(courseId)) {
// //       return NextResponse.json(
// //         { error: 'You are not enrolled in this course' },
// //         { status: 403 }
// //       );
// //     }

// //     // Get course data to know total sections
// //     const courseDocRef = doc(db, 'courses', courseId);
// //     const courseDoc = await getDoc(courseDocRef);

// //     if (!courseDoc.exists()) {
// //       return NextResponse.json(
// //         { error: 'Course not found' },
// //         { status: 404 }
// //       );
// //     }

// //     const courseData = courseDoc.data();
// //     const totalSections = courseData.content ? courseData.content.length : 0;

// //     // Validate section index
// //     if (sectionIndex < 0 || sectionIndex >= totalSections) {
// //       return NextResponse.json(
// //         { error: 'Invalid section index' },
// //         { status: 400 }
// //       );
// //     }

// //     // Get or create progress document
// //     const progressRef = doc(db, 'user_course_progress', `${userId}_${courseId}`);
// //     const progressDoc = await getDoc(progressRef);

// //     let progressData = {
// //       userId,
// //       courseId,
// //       completedSections: [],
// //       progress: 0,
// //       totalSections,
// //       enrolledAt: new Date(),
// //       lastAccessed: new Date(),
// //       certificateEligible: false,
// //       certificateIssued: false
// //     };

// //     if (progressDoc.exists()) {
// //       progressData = { ...progressData, ...progressDoc.data() };
// //     }

// //     // Update completed sections
// //     let completedSections = progressData.completedSections || [];

// //     if (action === 'complete') {
// //       // Add section if not already completed
// //       if (!completedSections.includes(sectionIndex)) {
// //         completedSections.push(sectionIndex);
// //       }
// //     } else if (action === 'uncomplete') {
// //       // Remove section from completed
// //       completedSections = completedSections.filter(index => index !== sectionIndex);
// //     }

// //     // Calculate progress percentage
// //     const progressPercentage = totalSections > 0 ? Math.round((completedSections.length / totalSections) * 100) : 0;

// //     // Check certificate eligibility
// //     const certificateEligible = progressPercentage >= CERTIFICATE_THRESHOLD;

// //     // Update progress data
// //     const updatedProgressData = {
// //       ...progressData,
// //       completedSections,
// //       progress: progressPercentage,
// //       lastAccessed: new Date(),
// //       certificateEligible,
// //       // Issue certificate if eligible and not already issued
// //       certificateIssued: certificateEligible ? (progressData.certificateIssued || false) : false
// //     };

// //     // If certificate is newly eligible, mark it as issued
// //     if (certificateEligible && !progressData.certificateEligible) {
// //       updatedProgressData.certificateIssued = true;
// //       updatedProgressData.certificateIssuedAt = new Date();
// //     }

// //     // Save updated progress
// //     await setDoc(progressRef, updatedProgressData);

// //     console.log('Progress updated successfully:', {
// //       progress: progressPercentage,
// //       completedSections: completedSections.length,
// //       totalSections,
// //       certificateEligible
// //     });

// //     return NextResponse.json({
// //       success: true,
// //       progress: updatedProgressData
// //     });

// //   } catch (error) {
// //     console.error('Error updating course progress:', error);
// //     return NextResponse.json(
// //       { error: 'Failed to update progress' },
// //       { status: 500 }
// //     );
// //   }
// // }

// // export const POST = withAuth(handler);

// import { NextResponse } from 'next/server';
// import { db } from '@/lib/firebase';
// import { doc, getDoc, updateDoc, setDoc } from 'firebase/firestore';
// import { withAuth } from '@/lib/middleware-auth';

// // Configurable completion threshold (can be changed as needed)
// const CERTIFICATE_THRESHOLD = 40; // Percentage required for certificate eligibility

// async function handler(request, { params }) {
//   try {
//     const { courseId } = params;
//     const userId = request.user.userId;
//     const { sectionIndex, action } = await request.json();

//     console.log(`Updating progress for course: ${courseId}, user: ${userId}, section: ${sectionIndex}, action: ${action}`);

//     // Validate input
//     if (action !== 'complete' && action !== 'uncomplete') {
//       return NextResponse.json(
//         { error: 'Invalid action. Must be "complete" or "uncomplete"' },
//         { status: 400 }
//       );
//     }

//     if (typeof sectionIndex !== 'number' || sectionIndex < 0) {
//       return NextResponse.json(
//         { error: 'Invalid section index' },
//         { status: 400 }
//       );
//     }

//     // Check if user is enrolled in this course
//     const userDocRef = doc(db, 'users', userId);
//     const userDoc = await getDoc(userDocRef);

//     if (!userDoc.exists()) {
//       return NextResponse.json(
//         { error: 'User not found' },
//         { status: 404 }
//       );
//     }

//     const userData = userDoc.data();
//     const enrolledCourses = userData.enrolledCourses || [];

//     if (!enrolledCourses.includes(courseId)) {
//       return NextResponse.json(
//         { error: 'You are not enrolled in this course' },
//         { status: 403 }
//       );
//     }

//     // Get course data to know total sections
//     const courseDocRef = doc(db, 'courses', courseId);
//     const courseDoc = await getDoc(courseDocRef);

//     if (!courseDoc.exists()) {
//       return NextResponse.json(
//         { error: 'Course not found' },
//         { status: 404 }
//       );
//     }

//     const courseData = courseDoc.data();
//     const totalSections = courseData.content ? courseData.content.length : 0;

//     // Validate section index against course content
//     if (sectionIndex >= totalSections) {
//       return NextResponse.json(
//         { error: 'Invalid section index for this course' },
//         { status: 400 }
//       );
//     }

//     // Get or create progress document
//     const progressRef = doc(db, 'user_course_progress', `${userId}_${courseId}`);
//     const progressDoc = await getDoc(progressRef);

//     let progressData = {
//       userId,
//       courseId,
//       completedSections: [],
//       progress: 0,
//       totalSections,
//       enrolledAt: new Date(),
//       lastAccessed: new Date(),
//       certificateEligible: false,
//       certificateIssued: false
//     };

//     if (progressDoc.exists()) {
//       const existingData = progressDoc.data();
//       progressData = { 
//         ...progressData, 
//         ...existingData,
//         // Ensure completedSections is always an array
//         completedSections: existingData.completedSections || []
//       };
//     }

//     // Update completed sections
//     let completedSections = [...(progressData.completedSections || [])];

//     if (action === 'complete') {
//       // Add section if not already completed
//       if (!completedSections.includes(sectionIndex)) {
//         completedSections.push(sectionIndex);
//         completedSections.sort((a, b) => a - b); // Keep sorted
//       }
//     } else if (action === 'uncomplete') {
//       // Remove section from completed
//       completedSections = completedSections.filter(index => index !== sectionIndex);
//     }

//     // Calculate progress percentage
//     const progressPercentage = totalSections > 0 ? Math.round((completedSections.length / totalSections) * 100) : 0;

//     // Check certificate eligibility
//     const certificateEligible = progressPercentage >= CERTIFICATE_THRESHOLD;

//     // Update progress data
//     const updatedProgressData = {
//       ...progressData,
//       completedSections,
//       progress: progressPercentage,
//       lastAccessed: new Date(),
//       certificateEligible,
//       totalSections
//     };

//     // If certificate is newly eligible, mark it as issued
//     if (certificateEligible && !progressData.certificateEligible) {
//       updatedProgressData.certificateIssued = true;
//       updatedProgressData.certificateIssuedAt = new Date();
//     }

//     // Save updated progress
//     await setDoc(progressRef, updatedProgressData, { merge: true });

//     console.log('Progress updated successfully:', {
//       progress: progressPercentage,
//       completedSections: completedSections.length,
//       totalSections,
//       certificateEligible
//     });

//     return NextResponse.json({
//       success: true,
//       progress: updatedProgressData
//     });

//   } catch (error) {
//     console.error('Error updating course progress:', error);
//     return NextResponse.json(
//       { error: 'Failed to update progress', details: error.message },
//       { status: 500 }
//     );
//   }
// }

// export const POST = withAuth(handler);

import { NextResponse } from 'next/server';
import { db } from '@/lib/firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { withAuth } from '@/lib/middleware-auth';

// Configurable completion threshold (can be changed as needed)
const CERTIFICATE_THRESHOLD = 40; // Percentage required for certificate eligibility

async function handler(request) {
  try {
    // ✅ Extract courseId from URL instead of params
    const url = new URL(request.url);
    const segments = url.pathname.split('/');
    const courseId = segments[segments.indexOf('courses') + 1];

    const userId = request.user.userId;
    const { sectionIndex, action } = await request.json();

    console.log(
      `Updating progress for course: ${courseId}, user: ${userId}, section: ${sectionIndex}, action: ${action}`
    );

    // Validate input
    if (action !== 'complete' && action !== 'uncomplete') {
      return NextResponse.json(
        { error: 'Invalid action. Must be "complete" or "uncomplete"' },
        { status: 400 }
      );
    }

    if (typeof sectionIndex !== 'number' || sectionIndex < 0) {
      return NextResponse.json(
        { error: 'Invalid section index' },
        { status: 400 }
      );
    }

    // Check if user exists
    const userDocRef = doc(db, 'users', userId);
    const userDoc = await getDoc(userDocRef);

    if (!userDoc.exists()) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    const userData = userDoc.data();
    const enrolledCourses = userData.enrolledCourses || [];

    if (!enrolledCourses.includes(courseId)) {
      return NextResponse.json(
        { error: 'You are not enrolled in this course' },
        { status: 403 }
      );
    }

    // Get course data to know total sections
    const courseDocRef = doc(db, 'courses', courseId);
    const courseDoc = await getDoc(courseDocRef);

    if (!courseDoc.exists()) {
      return NextResponse.json({ error: 'Course not found' }, { status: 404 });
    }

    const courseData = courseDoc.data();
    const totalSections = courseData.content ? courseData.content.length : 0;

    // Validate section index against course content
    if (sectionIndex >= totalSections) {
      return NextResponse.json(
        { error: 'Invalid section index for this course' },
        { status: 400 }
      );
    }

    // Get or create progress document
    const progressRef = doc(db, 'user_course_progress', `${userId}_${courseId}`);
    const progressDoc = await getDoc(progressRef);

    let progressData = {
      userId,
      courseId,
      completedSections: [],
      progress: 0,
      totalSections,
      enrolledAt: new Date(),
      lastAccessed: new Date(),
      certificateEligible: false,
      certificateIssued: false,
    };

    if (progressDoc.exists()) {
      const existingData = progressDoc.data();
      progressData = {
        ...progressData,
        ...existingData,
        completedSections: existingData.completedSections || [],
      };
    }

    // Update completed sections
    let completedSections = [...(progressData.completedSections || [])];

    if (action === 'complete') {
      if (!completedSections.includes(sectionIndex)) {
        completedSections.push(sectionIndex);
        completedSections.sort((a, b) => a - b); // Keep sorted
      }
    } else if (action === 'uncomplete') {
      completedSections = completedSections.filter(
        (index) => index !== sectionIndex
      );
    }

    // Calculate progress percentage
    const progressPercentage =
      totalSections > 0
        ? Math.round((completedSections.length / totalSections) * 100)
        : 0;

    // Check certificate eligibility
    const certificateEligible = progressPercentage >= CERTIFICATE_THRESHOLD;

    // Update progress data
    const updatedProgressData = {
      ...progressData,
      completedSections,
      progress: progressPercentage,
      lastAccessed: new Date(),
      certificateEligible,
      totalSections,
    };

    // If certificate is newly eligible, mark it as issued
    if (certificateEligible && !progressData.certificateEligible) {
      updatedProgressData.certificateIssued = true;
      updatedProgressData.certificateIssuedAt = new Date();
    }

    // Save updated progress
    await setDoc(progressRef, updatedProgressData, { merge: true });

    console.log('Progress updated successfully:', {
      progress: progressPercentage,
      completedSections: completedSections.length,
      totalSections,
      certificateEligible,
    });

    return NextResponse.json({
      success: true,
      progress: updatedProgressData,
    });
  } catch (error) {
    console.error('Error updating course progress:', error);
    return NextResponse.json(
      { error: 'Failed to update progress', details: error.message },
      { status: 500 }
    );
  }
}

export const POST = withAuth(handler);
