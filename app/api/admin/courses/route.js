import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { NextResponse } from 'next/server';

export async function GET(request) {
  try {
    // Fetch all courses (both active and inactive) for admin
    const coursesRef = collection(db, 'courses');
    const q = query(coursesRef, orderBy('createdAt', 'desc'));
    const querySnapshot = await getDocs(q);

    const courses = [];
    querySnapshot.forEach((doc) => {
      const courseData = doc.data();
      courses.push({
        id: doc.id,
        ...courseData,
        createdAt: courseData.createdAt?.toDate?.() || courseData.createdAt,
        updatedAt: courseData.updatedAt?.toDate?.() || courseData.updatedAt,
      });
    });

    // Add mock courses for demo purposes
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
        isActive: false,
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
        isActive: true,
        enrolledCount: 950
      }
    ];

    // Combine real courses with mock courses
    const allCourses = [...courses, ...mockCourses];

    return NextResponse.json({
      courses: allCourses
    });
  } catch (error) {
    console.error('Error fetching admin courses:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}