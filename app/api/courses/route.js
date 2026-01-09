// // import { NextResponse } from 'next/server';
// // import { collection, getDocs, query, orderBy } from 'firebase/firestore';
// // import { db } from '@/lib/firebase';

// // export async function GET() {
// //   try {
// //     // For demo purposes, return mock data
// //     // In production, this would fetch from Firebase
// //     const mockCourses = [
// //       {
// //         id: 1,
// //         title: 'Complete Web Development Bootcamp',
// //         description: 'Learn HTML, CSS, JavaScript, React, Node.js and build amazing websites. This comprehensive course covers everything from frontend to backend development.',
// //         thumbnail: 'https://images.pexels.com/photos/11035380/pexels-photo-11035380.jpeg',
// //         price: 4999,
// //         originalPrice: 9999,
// //         rating: 4.8,
// //         duration: '40 hours',
// //         enrolled: 1200,
// //         level: 'Beginner',
// //         category: 'Web Development',
// //         instructor: 'John Smith',
// //         createdAt: new Date('2024-01-15'),
// //         features: ['Lifetime Access', 'Certificate', '24/7 Support', 'Projects']
// //       },
// //       {
// //         id: 2,
// //         title: 'Python for Data Science',
// //         description: 'Master Python programming and data analysis with real-world projects. Learn pandas, numpy, matplotlib, and machine learning basics.',
// //         thumbnail: 'https://images.pexels.com/photos/1181677/pexels-photo-1181677.jpeg',
// //         price: 3999,
// //         originalPrice: 7999,
// //         rating: 4.9,
// //         duration: '35 hours',
// //         enrolled: 850,
// //         level: 'Intermediate',
// //         category: 'Data Science',
// //         instructor: 'Sarah Johnson',
// //         createdAt: new Date('2024-01-20'),
// //         features: ['Hands-on Projects', 'Certificate', 'Career Support', 'Live Sessions']
// //       },
// //       {
// //         id: 3,
// //         title: 'Digital Marketing Mastery',
// //         description: 'Complete guide to SEO, SEM, Social Media Marketing, Email Marketing and Analytics. Become a digital marketing expert.',
// //         thumbnail: 'https://images.pexels.com/photos/265087/pexels-photo-265087.jpeg',
// //         price: 2999,
// //         originalPrice: 5999,
// //         rating: 4.7,
// //         duration: '25 hours',
// //         enrolled: 950,
// //         level: 'Beginner',
// //         category: 'Digital Marketing',
// //         instructor: 'Mike Davis',
// //         createdAt: new Date('2024-01-25'),
// //         features: ['Case Studies', 'Certificate', 'Tools Access', 'Community']
// //       },
// //       {
// //         id: 4,
// //         title: 'Mobile App Development with React Native',
// //         description: 'Build cross-platform mobile apps for iOS and Android using React Native. Learn navigation, state management, and deployment.',
// //         thumbnail: 'https://images.pexels.com/photos/147413/twitter-facebook-together-exchange-of-information-147413.jpeg',
// //         price: 5999,
// //         originalPrice: 11999,
// //         rating: 4.8,
// //         duration: '50 hours',
// //         enrolled: 650,
// //         level: 'Advanced',
// //         category: 'Mobile Development',
// //         instructor: 'Lisa Chen',
// //         createdAt: new Date('2024-02-01'),
// //         features: ['Real Apps', 'Certificate', 'Code Reviews', 'Job Assistance']
// //       },
// //       {
// //         id: 5,
// //         title: 'UI/UX Design Fundamentals',
// //         description: 'Learn user interface and user experience design principles. Master Figma, create wireframes, prototypes, and design systems.',
// //         thumbnail: 'https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg',
// //         price: 3499,
// //         originalPrice: 6999,
// //         rating: 4.6,
// //         duration: '30 hours',
// //         enrolled: 780,
// //         level: 'Beginner',
// //         category: 'UI/UX Design',
// //         instructor: 'Alex Rodriguez',
// //         createdAt: new Date('2024-02-05'),
// //         features: ['Design Projects', 'Certificate', 'Figma Access', 'Portfolio Review']
// //       },
// //       {
// //         id: 6,
// //         title: 'Business Analytics with Excel',
// //         description: 'Master data analysis using Excel. Learn advanced formulas, pivot tables, charts, and dashboard creation for business insights.',
// //         thumbnail: 'https://images.pexels.com/photos/590022/pexels-photo-590022.jpeg',
// //         price: 1999,
// //         originalPrice: 3999,
// //         rating: 4.5,
// //         duration: '20 hours',
// //         enrolled: 1100,
// //         level: 'Beginner',
// //         category: 'Business',
// //         instructor: 'David Wilson',
// //         createdAt: new Date('2024-02-10'),
// //         features: ['Excel Templates', 'Certificate', 'Case Studies', 'Q&A Sessions']
// //       }
// //     ];

// //     return NextResponse.json({
// //       courses: mockCourses,
// //       total: mockCourses.length
// //     });
// //   } catch (error) {
// //     console.error('Error fetching courses:', error);
// //     return NextResponse.json(
// //       { message: 'Internal server error' },
// //       { status: 500 }
// //     );
// //   }
// // }
// import { NextResponse } from 'next/server';
// import { collection, getDocs, query, orderBy, where } from 'firebase/firestore';
// import { db } from '@/lib/firebase';

// export async function GET() {
//   try {
//     // Fetch courses from Firebase Firestore
//     const coursesRef = collection(db, 'courses');
//     const q = query(
//       coursesRef, 
//       where('isActive', '==', true),
//       orderBy('createdAt', 'desc')
//     );
    
//     const querySnapshot = await getDocs(q);
//     const courses = [];

//     querySnapshot.forEach((doc) => {
//       const data = doc.data();
//       courses.push({
//         id: doc.id,
//         ...data,
//         // Convert Firestore Timestamp to Date string
//         createdAt: data.createdAt?.toDate?.() || data.createdAt,
//         updatedAt: data.updatedAt?.toDate?.() || data.updatedAt,
//       });
//     });

//     return NextResponse.json({
//       courses,
//       total: courses.length
//     });
//   } catch (error) {
//     console.error('Error fetching courses:', error);
    
//     // Return mock data as fallback
//     const mockCourses = [
//       {
//         id: 1,
//         title: 'Complete Web Development Bootcamp',
//         description: 'Learn HTML, CSS, JavaScript, React, Node.js and build amazing websites. This comprehensive course covers everything from frontend to backend development.',
//         thumbnail: 'https://images.pexels.com/photos/11035380/pexels-photo-11035380.jpeg',
//         price: 4999,
//         originalPrice: 9999,
//         rating: 4.8,
//         duration: '40 hours',
//         enrolled: 1200,
//         level: 'Beginner',
//         category: 'Web Development',
//         instructor: 'John Smith',
//         createdAt: new Date('2024-01-15'),
//         features: ['Lifetime Access', 'Certificate', '24/7 Support', 'Projects']
//       },
//       {
//         id: 2,
//         title: 'Python for Data Science',
//         description: 'Master Python programming and data analysis with real-world projects. Learn pandas, numpy, matplotlib, and machine learning basics.',
//         thumbnail: 'https://images.pexels.com/photos/1181677/pexels-photo-1181677.jpeg',
//         price: 3999,
//         originalPrice: 7999,
//         rating: 4.9,
//         duration: '35 hours',
//         enrolled: 850,
//         level: 'Intermediate',
//         category: 'Data Science',
//         instructor: 'Sarah Johnson',
//         createdAt: new Date('2024-01-20'),
//         features: ['Hands-on Projects', 'Certificate', 'Career Support', 'Live Sessions']
//       },
//       {
//         id: 3,
//         title: 'Digital Marketing Mastery',
//         description: 'Complete guide to SEO, SEM, Social Media Marketing, Email Marketing and Analytics. Become a digital marketing expert.',
//         thumbnail: 'https://images.pexels.com/photos/265087/pexels-photo-265087.jpeg',
//         price: 2999,
//         originalPrice: 5999,
//         rating: 4.7,
//         duration: '25 hours',
//         enrolled: 950,
//         level: 'Beginner',
//         category: 'Digital Marketing',
//         instructor: 'Mike Davis',
//         createdAt: new Date('2024-01-25'),
//         features: ['Case Studies', 'Certificate', 'Tools Access', 'Community']
//       }
//     ];

//     return NextResponse.json({
//       courses: mockCourses,
//       total: mockCourses.length
//     });
//   }
// }

import { NextResponse } from 'next/server';
import { collection, getDocs, query, orderBy, where } from 'firebase/firestore';
import { db } from '@/lib/firebase';

export async function GET() {
  try {
    console.log('=== FETCHING COURSES FROM DATABASE ===');
    
    // Fetch courses from Firebase Firestore
    const coursesRef = collection(db, 'courses');
    const q = query(
      coursesRef, 
      where('isActive', '==', true),
      orderBy('createdAt', 'desc')
    );
    
    const querySnapshot = await getDocs(q);
    const dbCourses = [];

    querySnapshot.forEach((doc) => {
      const data = doc.data();
      dbCourses.push({
        id: doc.id,
        ...data,
        // Convert Firestore Timestamp to Date string
        createdAt: data.createdAt?.toDate?.() || data.createdAt,
        updatedAt: data.updatedAt?.toDate?.() || data.updatedAt,
      });
    });

    console.log('Database courses fetched:', dbCourses.length);

    // Mock data as fallback/additional content
    const mockCourses = [
      {
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
        isActive: true,
        enrolledCount: 1200
      },
      {
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
        isActive: true,
        enrolledCount: 850
      },
      {
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
        isActive: true,
        enrolledCount: 950
      }
    ];

    // Combine database courses with mock courses
    const allCourses = [...dbCourses, ...mockCourses];

    console.log('Total courses returned:', allCourses.length);

    return NextResponse.json({
      courses: allCourses,
      total: allCourses.length,
      dbCourses: dbCourses.length,
      mockCourses: mockCourses.length
    });
  } catch (error) {
    console.error('=== ERROR FETCHING COURSES ===');
    console.error('Error fetching courses:', error);
    
    // Return mock data as fallback
    const mockCourses = [
      {
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
        isActive: true,
        enrolledCount: 1200
      },
      {
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
        isActive: true,
        enrolledCount: 850
      },
      {
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
        isActive: true,
        enrolledCount: 950
      }
    ];

    return NextResponse.json({
      courses: mockCourses,
      total: mockCourses.length,
      dbCourses: 0,
      mockCourses: mockCourses.length
    });
  }
}