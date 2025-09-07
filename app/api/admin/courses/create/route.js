// // // // // // // import { NextResponse } from 'next/server';
// // // // // // // import { collection, addDoc } from 'firebase/firestore';
// // // // // // // import { db } from '@/lib/firebase';
// // // // // // // import { withAdminAuth } from '@/lib/middleware-auth';

// // // // // // // async function handler(request) {
// // // // // // //   try {
// // // // // // //     const courseData = await request.json();

// // // // // // //     // Validate required fields
// // // // // // //     const requiredFields = ['title', 'description', 'category', 'level', 'price'];
// // // // // // //     for (const field of requiredFields) {
// // // // // // //       if (!courseData[field]) {
// // // // // // //         return NextResponse.json(
// // // // // // //           { message: `${field} is required` },
// // // // // // //           { status: 400 }
// // // // // // //         );
// // // // // // //       }
// // // // // // //     }

// // // // // // //     // Create course document
// // // // // // //     const course = {
// // // // // // //       ...courseData,
// // // // // // //       createdAt: new Date(),
// // // // // // //       updatedAt: new Date(),
// // // // // // //       createdBy: request.user.userId,
// // // // // // //       enrolled: 0,
// // // // // // //       rating: 0,
// // // // // // //       reviews: [],
// // // // // // //       isActive: true,
// // // // // // //     };

// // // // // // //     const docRef = await addDoc(collection(db, 'courses'), course);

// // // // // // //     return NextResponse.json({
// // // // // // //       message: 'Course created successfully',
// // // // // // //       courseId: docRef.id,
// // // // // // //     }, { status: 201 });
// // // // // // //   } catch (error) {
// // // // // // //     console.error('Course creation error:', error);
// // // // // // //     return NextResponse.json(
// // // // // // //       { message: 'Internal server error' },
// // // // // // //       { status: 500 }
// // // // // // //     );
// // // // // // //   }
// // // // // // // }

// // // // // // // export const POST = withAdminAuth(handler);

// // // // // // import { NextResponse } from 'next/server';
// // // // // // import { collection, addDoc } from 'firebase/firestore';
// // // // // // import { db } from '@/lib/firebase';
// // // // // // import { withAdminAuth } from '@/lib/middleware-auth';

// // // // // // async function handler(request) {
// // // // // //   try {
// // // // // //     const courseData = await request.json();

// // // // // //     // Validate required fields
// // // // // //     const requiredFields = ['title', 'description', 'category', 'level', 'price'];
// // // // // //     for (const field of requiredFields) {
// // // // // //       if (!courseData[field]) {
// // // // // //         return NextResponse.json(
// // // // // //           { message: `${field} is required` },
// // // // // //           { status: 400 }
// // // // // //         );
// // // // // //       }
// // // // // //     }

// // // // // //     // Create course document
// // // // // //     const course = {
// // // // // //       ...courseData,
// // // // // //       createdAt: new Date(),
// // // // // //       updatedAt: new Date(),
// // // // // //       createdBy: request.user.userId,
// // // // // //       enrolled: 0,
// // // // // //       rating: 0,
// // // // // //       reviews: [],
// // // // // //       isActive: true,
// // // // // //       enrolledCount: 0,
// // // // // //       instructor: request.user.fullName,
// // // // // //     };

// // // // // //     const docRef = await addDoc(collection(db, 'courses'), course);

// // // // // //     return NextResponse.json({
// // // // // //       message: 'Course created successfully',
// // // // // //       courseId: docRef.id,
// // // // // //     }, { status: 201 });
// // // // // //   } catch (error) {
// // // // // //     console.error('Course creation error:', error);
// // // // // //     return NextResponse.json(
// // // // // //       { message: 'Internal server error' },
// // // // // //       { status: 500 }
// // // // // //     );
// // // // // //   }
// // // // // // }

// // // // // // export const POST = withAdminAuth(handler);

// // // // // import { NextResponse } from 'next/server';
// // // // // import { collection, addDoc } from 'firebase/firestore';
// // // // // import { db } from '@/lib/firebase';
// // // // // import { withAdminAuth } from '@/lib/middleware-auth';

// // // // // async function handler(request) {
// // // // //   try {
// // // // //     const courseData = await request.json();

// // // // //     // Validate required fields
// // // // //     const requiredFields = ['title', 'description', 'category', 'level', 'price'];
// // // // //     for (const field of requiredFields) {
// // // // //       if (!courseData[field]) {
// // // // //         return NextResponse.json(
// // // // //           { message: `${field} is required` },
// // // // //           { status: 400 }
// // // // //         );
// // // // //       }
// // // // //     }

// // // // //     // Create course document
// // // // //     const course = {
// // // // //       ...courseData,
// // // // //       createdAt: new Date(),
// // // // //       updatedAt: new Date(),
// // // // //       createdBy: request.user.userId,
// // // // //       enrolled: 0,
// // // // //       rating: 0,
// // // // //       reviews: [],
// // // // //       isActive: true,
// // // // //       enrolledCount: 0,
// // // // //       instructor: request.user.fullName || 'Admin',
// // // // //     };

// // // // //     const docRef = await addDoc(collection(db, 'courses'), course);

// // // // //     return NextResponse.json({
// // // // //       message: 'Course created successfully',
// // // // //       courseId: docRef.id,
// // // // //     }, { status: 201 });
// // // // //   } catch (error) {
// // // // //     console.error('Course creation error:', error);
// // // // //     return NextResponse.json(
// // // // //       { message: 'Internal server error' },
// // // // //       { status: 500 }
// // // // //     );
// // // // //   }
// // // // // }

// // // // // export const POST = withAdminAuth(handler);

// // // // import { NextResponse } from 'next/server';
// // // // import { collection, addDoc } from 'firebase/firestore';
// // // // import { db } from '@/lib/firebase';
// // // // import { withAdminAuth } from '@/lib/middleware-auth';

// // // // async function handler(request) {
// // // //   try {
// // // //     const courseData = await request.json();
// // // //     console.log('Received course data:', courseData);

// // // //     // Validate required fields - matching your frontend
// // // //     const requiredFields = ['title', 'description', 'category', 'level', 'price', 'duration'];
// // // //     for (const field of requiredFields) {
// // // //       if (!courseData[field]) {
// // // //         return NextResponse.json(
// // // //           { message: `${field} is required` },
// // // //           { status: 400 }
// // // //         );
// // // //       }
// // // //     }

// // // //     // Validate thumbnail (either file upload result or URL)
// // // //     if (!courseData.thumbnail) {
// // // //       return NextResponse.json(
// // // //         { message: 'Course thumbnail is required' },
// // // //         { status: 400 }
// // // //       );
// // // //     }

// // // //     // Create course document with all the fields your frontend sends
// // // //     const course = {
// // // //       title: courseData.title,
// // // //       description: courseData.description,
// // // //       category: courseData.category,
// // // //       level: courseData.level,
// // // //       price: parseFloat(courseData.price),
// // // //       originalPrice: courseData.originalPrice ? parseFloat(courseData.originalPrice) : null,
// // // //       duration: courseData.duration,
// // // //       thumbnail: courseData.thumbnail,
// // // //       features: courseData.features || [],
// // // //       learningOutcomes: courseData.learningOutcomes || [],
// // // //       content: courseData.content || [],
// // // //       createdAt: new Date(),
// // // //       updatedAt: new Date(),
// // // //       createdBy: request.user.userId,
// // // //       enrolled: 0,
// // // //       rating: 0,
// // // //       reviews: [],
// // // //       isActive: true,
// // // //       enrolledCount: 0,
// // // //       instructor: request.user.fullName || courseData.instructorName || 'Admin',
// // // //     };

// // // //     console.log('Creating course with data:', course);

// // // //     const docRef = await addDoc(collection(db, 'courses'), course);

// // // //     return NextResponse.json({
// // // //       status: 201,
// // // //       message: 'Course created successfully',
// // // //       courseId: docRef.id,
// // // //     }, { status: 201 });
// // // //   } catch (error) {
// // // //     console.error('Course creation error:', error);
// // // //     return NextResponse.json(
// // // //       { 
// // // //         status: 500,
// // // //         message: 'Internal server error',
// // // //         error: error.message 
// // // //       },
// // // //       { status: 500 }
// // // //     );
// // // //   }
// // // // }

// // // // export const POST = withAdminAuth(handler);

// // // import { NextResponse } from 'next/server';
// // // import { collection, addDoc } from 'firebase/firestore';
// // // import { db } from '@/lib/firebase';

// // // export async function POST(request) {
// // //   try {
// // //     const courseData = await request.json();
// // //     console.log('Received course data:', courseData);

// // //     // Validate required fields
// // //     const requiredFields = ['title', 'description', 'category', 'level', 'price', 'duration'];
// // //     for (const field of requiredFields) {
// // //       if (!courseData[field]) {
// // //         return NextResponse.json(
// // //           { message: `${field} is required` },
// // //           { status: 400 }
// // //         );
// // //       }
// // //     }

// // //     // Validate thumbnail
// // //     if (!courseData.thumbnail) {
// // //       return NextResponse.json(
// // //         { message: 'Course thumbnail is required' },
// // //         { status: 400 }
// // //       );
// // //     }

// // //     // Create course document
// // //     const course = {
// // //       title: courseData.title,
// // //       description: courseData.description,
// // //       category: courseData.category,
// // //       level: courseData.level,
// // //       price: parseFloat(courseData.price),
// // //       originalPrice: courseData.originalPrice ? parseFloat(courseData.originalPrice) : null,
// // //       duration: courseData.duration,
// // //       thumbnail: courseData.thumbnail,
// // //       features: courseData.features || [],
// // //       learningOutcomes: courseData.learningOutcomes || [],
// // //       content: courseData.content || [],
// // //       createdAt: new Date(),
// // //       updatedAt: new Date(),
// // //       enrolled: 0,
// // //       rating: 0,
// // //       reviews: [],
// // //       isActive: true,
// // //       enrolledCount: 0,
// // //       instructor: 'Admin', // Default instructor name
// // //     };

// // //     console.log('Creating course with data:', course);

// // //     const docRef = await addDoc(collection(db, 'courses'), course);

// // //     return NextResponse.json({
// // //       status: 201,
// // //       message: 'Course created successfully',
// // //       courseId: docRef.id,
// // //     }, { status: 201 });
// // //   } catch (error) {
// // //     console.error('Course creation error:', error);
// // //     return NextResponse.json(
// // //       { 
// // //         status: 500,
// // //         message: 'Internal server error',
// // //         error: error.message 
// // //       },
// // //       { status: 500 }
// // //     );
// // //   }
// // // }

// // import { NextResponse } from 'next/server';
// // import { collection, addDoc } from 'firebase/firestore';
// // import { db } from '@/lib/firebase';

// // export async function POST(request) {
// //   try {
// //     const courseData = await request.json();
// //     console.log('Received course data for creation:', courseData);

// //     // Validate required fields
// //     const requiredFields = ['title', 'description', 'category', 'level', 'price', 'duration'];
// //     for (const field of requiredFields) {
// //       if (!courseData[field]) {
// //         console.error(`Missing required field: ${field}`);
// //         return NextResponse.json(
// //           { message: `${field} is required` },
// //           { status: 400 }
// //         );
// //       }
// //     }

// //     // Validate thumbnail - must be present after upload
// //     if (!courseData.thumbnail || courseData.thumbnail.trim() === '') {
// //       console.error('Course thumbnail is missing');
// //       return NextResponse.json(
// //         { message: 'Course thumbnail is required' },
// //         { status: 400 }
// //       );
// //     }

// //     console.log('All validation passed, creating course...');

// //     // Create course document
// //     const course = {
// //       title: courseData.title,
// //       description: courseData.description,
// //       category: courseData.category,
// //       level: courseData.level,
// //       price: parseFloat(courseData.price),
// //       originalPrice: courseData.originalPrice ? parseFloat(courseData.originalPrice) : null,
// //       duration: courseData.duration,
// //       thumbnail: courseData.thumbnail,
// //       features: courseData.features || [],
// //       learningOutcomes: courseData.learningOutcomes || [],
// //       content: courseData.content || [],
// //       createdAt: new Date(),
// //       updatedAt: new Date(),
// //       enrolled: 0,
// //       rating: 0,
// //       reviews: [],
// //       isActive: true,
// //       enrolledCount: 0,
// //       instructor: 'Admin',
// //     };

// //     console.log('Creating course in Firebase with data:', course);

// //     const docRef = await addDoc(collection(db, 'courses'), course);

// //     console.log('Course created successfully with ID:', docRef.id);

// //     return NextResponse.json({
// //       status: 201,
// //       message: 'Course created successfully',
// //       courseId: docRef.id,
// //     }, { status: 201 });
// //   } catch (error) {
// //     console.error('Course creation error:', error);
// //     return NextResponse.json(
// //       { 
// //         status: 500,
// //         message: 'Internal server error',
// //         error: error.message 
// //       },
// //       { status: 500 }
// //     );
// //   }
// // }

// import { NextResponse } from 'next/server';
// import { collection, addDoc } from 'firebase/firestore';
// import { db } from '@/lib/firebase';

// export async function POST(request) {
//   try {
//     console.log('=== COURSE CREATION API CALLED ===');

//     const courseData = await request.json();
//     console.log('Received course data for creation:', courseData);

//     // Validate required fields
//     const requiredFields = ['title', 'description', 'category', 'level', 'price', 'duration', 'thumbnail'];
//     for (const field of requiredFields) {
//       if (!courseData[field]) {
//         console.error(`Missing required field: ${field}`);
//         return NextResponse.json(
//           { message: `${field} is required` },
//           { status: 400 }
//         );
//       }
//     }

//     console.log('All required fields validated successfully');

//     // Validate thumbnail URL format
//     const thumbnailUrl = courseData.thumbnail.trim();
//     if (!thumbnailUrl.startsWith('http://') && !thumbnailUrl.startsWith('https://')) {
//       console.error('Invalid thumbnail URL format:', thumbnailUrl);
//       return NextResponse.json(
//         { message: 'Invalid thumbnail URL format' },
//         { status: 400 }
//       );
//     }

//     console.log('Thumbnail URL validated:', thumbnailUrl);

//     // Create course document
//     const course = {
//       title: courseData.title.trim(),
//       description: courseData.description.trim(),
//       category: courseData.category,
//       level: courseData.level,
//       price: parseFloat(courseData.price),
//       originalPrice: courseData.originalPrice ? parseFloat(courseData.originalPrice) : null,
//       duration: courseData.duration.trim(),
//       thumbnail: thumbnailUrl,
//       features: courseData.features || [],
//       learningOutcomes: courseData.learningOutcomes || [],
//       content: courseData.content || [],
//       createdAt: new Date(),
//       updatedAt: new Date(),
//       enrolled: 0,
//       rating: 0,
//       reviews: [],
//       isActive: true,
//       enrolledCount: 0,
//       instructor: 'Admin',
//     };

//     console.log('Creating course in Firebase with data:', {
//       ...course,
//       thumbnail: course.thumbnail.substring(0, 50) + '...' // Log truncated URL for readability
//     });

//     const docRef = await addDoc(collection(db, 'courses'), course);

//     console.log('=== COURSE CREATED SUCCESSFULLY ===');
//     console.log('Course ID:', docRef.id);

//     return NextResponse.json({
//       status: 201,
//       message: 'Course created successfully',
//       courseId: docRef.id,
//     }, { status: 201 });
//   } catch (error) {
//     console.error('=== COURSE CREATION ERROR ===');
//     console.error('Error details:', error);
//     return NextResponse.json(
//       { 
//         status: 500,
//         message: 'Internal server error',
//         error: error.message 
//       },
//       { status: 500 }
//     );
//   }
// }

import { NextResponse } from 'next/server';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';

export async function POST(request) {
  try {
    console.log('=== COURSE CREATION API CALLED ===');

    const courseData = await request.json();
    console.log('Received course data for creation:', courseData);

    // Validate required fields
    const requiredFields = ['title', 'description', 'category', 'level', 'price', 'duration', 'thumbnail'];
    for (const field of requiredFields) {
      if (!courseData[field]) {
        console.error(`Missing required field: ${field}`);
        return NextResponse.json(
          { message: `${field} is required` },
          { status: 400 }
        );
      }
    }

    console.log('All required fields validated successfully');

    // Validate thumbnail URL format
    const thumbnailUrl = courseData.thumbnail.trim();
    if (!thumbnailUrl.startsWith('http://') && !thumbnailUrl.startsWith('https://')) {
      console.error('Invalid thumbnail URL format:', thumbnailUrl);
      return NextResponse.json(
        { message: 'Invalid thumbnail URL format' },
        { status: 400 }
      );
    }

    console.log('Thumbnail URL validated:', thumbnailUrl);

    // Create course document
    const course = {
      title: courseData.title.trim(),
      description: courseData.description.trim(),
      category: courseData.category,
      level: courseData.level,
      price: parseFloat(courseData.price),
      originalPrice: courseData.originalPrice ? parseFloat(courseData.originalPrice) : null,
      duration: courseData.duration.trim(),
      thumbnail: thumbnailUrl,
      features: courseData.features || [],
      learningOutcomes: courseData.learningOutcomes || [],
      content: courseData.content || [],
      createdAt: new Date(),
      updatedAt: new Date(),
      enrolled: 0,
      rating: 0,
      reviews: [],
      isActive: true,
      enrolledCount: 0,
      instructor: 'Admin',
    };

    console.log('Creating course in Firebase with data:', {
      ...course,
      thumbnail: course.thumbnail.substring(0, 50) + '...' // Log truncated URL for readability
    });

    const docRef = await addDoc(collection(db, 'courses'), course);

    console.log('=== COURSE CREATED SUCCESSFULLY ===');
    console.log('Course ID:', docRef.id);

    return NextResponse.json({
      status: 201,
      message: 'Course created successfully',
      courseId: docRef.id,
    }, { status: 201 });
  } catch (error) {
    console.error('=== COURSE CREATION ERROR ===');
    console.error('Error details:', error);
    return NextResponse.json(
      {
        status: 500,
        message: 'Internal server error',
        error: error.message
      },
      { status: 500 }
    );
  }
}