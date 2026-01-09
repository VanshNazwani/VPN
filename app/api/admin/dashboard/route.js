// import { NextResponse } from 'next/server';
// import { collection, getDocs, query, where, orderBy, limit } from 'firebase/firestore';
// import { db } from '@/lib/firebase';
// import { withAdminAuth } from '@/lib/middleware-auth';

// async function handler(request) {
//   try {
//     // Fetch all users
//     const usersSnapshot = await getDocs(collection(db, 'users'));
//     const users = usersSnapshot.docs.map(doc => ({
//       id: doc.id,
//       ...doc.data(),
//       createdAt: doc.data().createdAt?.toDate?.()?.toISOString() || new Date().toISOString()
//     }));

//     // Fetch all courses
//     const coursesSnapshot = await getDocs(collection(db, 'courses'));
//     const courses = coursesSnapshot.docs.map(doc => ({
//       id: doc.id,
//       ...doc.data(),
//       createdAt: doc.data().createdAt?.toDate?.()?.toISOString() || new Date().toISOString()
//     }));

//     // Fetch recent orders
//     const ordersQuery = query(
//       collection(db, 'orders'),
//       orderBy('createdAt', 'desc'),
//       limit(10)
//     );
//     const ordersSnapshot = await getDocs(ordersQuery);
//     const recentOrders = ordersSnapshot.docs.map(doc => ({
//       id: doc.id,
//       ...doc.data(),
//       createdAt: doc.data().createdAt?.toDate?.()?.toISOString() || new Date().toISOString()
//     }));

//     // Calculate stats
//     const totalUsers = users.length;
//     const totalCourses = courses.length;
//     const totalRevenue = recentOrders.reduce((sum, order) => {
//       return order.status === 'completed' ? sum + (order.amount || 0) : sum;
//     }, 0);
//     const activeStudents = users.filter(user => user.enrolledCourses?.length > 0).length;

//     const stats = {
//       totalUsers,
//       totalCourses,
//       totalRevenue,
//       activeStudents,
//       completionRate: 85, // This would be calculated based on actual completion data
//       newEnrollments: 45 // This would be calculated based on recent enrollments
//     };

//     // Add enrollment count to courses
//     const coursesWithStats = courses.map(course => ({
//       ...course,
//       enrolledCount: users.reduce((count, user) => {
//         return user.enrolledCourses?.includes(course.id) ? count + 1 : count;
//       }, 0)
//     }));

//     return NextResponse.json({
//       stats,
//       courses: coursesWithStats,
//       users: users.filter(user => user.role !== 'admin'), // Don't show admin users
//       recentOrders
//     });
//   } catch (error) {
//     console.error('Error fetching admin dashboard data:', error);
//     return NextResponse.json(
//       { message: 'Internal server error' },
//       { status: 500 }
//     );
//   }
// }

// export const GET = withAdminAuth(handler);

import { collection, getDocs, query, orderBy, limit, where } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { withAdminAuth } from '@/lib/middleware-auth';

async function handler(request) {
  try {
    // Initialize stats
    const stats = {
      totalUsers: 0,
      totalCourses: 0,
      totalRevenue: 0,
      activeStudents: 0,
      completionRate: 85,
      newEnrollments: 0,
      totalAdmins: 0,
      activeAdmins: 0
    };

    // Fetch users
    const usersRef = collection(db, 'users');
    const usersSnapshot = await getDocs(usersRef);
    const users = [];
    usersSnapshot.forEach((doc) => {
      const data = doc.data();
      users.push({
        id: doc.id,
        ...data,
        createdAt: data.createdAt?.toDate?.() || data.createdAt,
      });
    });
    stats.totalUsers = users.length;
    stats.activeStudents = users.filter(u => u.isVerified).length;

    // Fetch courses
    const coursesRef = collection(db, 'courses');
    const coursesSnapshot = await getDocs(coursesRef);
    const courses = [];
    coursesSnapshot.forEach((doc) => {
      const data = doc.data();
      courses.push({
        id: doc.id,
        ...data,
        createdAt: data.createdAt?.toDate?.() || data.createdAt,
      });
    });
    stats.totalCourses = courses.length;

    // Calculate total revenue (mock calculation)
    stats.totalRevenue = courses.reduce((total, course) => {
      return total + ((course.enrolledCount || 0) * (course.price || 0));
    }, 0);

    // Fetch admins
    const adminsRef = collection(db, 'admins');
    const adminsSnapshot = await getDocs(adminsRef);
    const recentAdmins = [];
    adminsSnapshot.forEach((doc) => {
      const data = doc.data();
      recentAdmins.push({
        id: doc.id,
        ...data,
        createdAt: data.createdAt?.toDate?.() || data.createdAt,
      });
    });
    stats.totalAdmins = recentAdmins.length;
    stats.activeAdmins = recentAdmins.filter(a => a.isActive).length;

    // Mock recent orders data
    const recentOrders = [
      {
        id: '1',
        courseName: 'Web Development Bootcamp',
        userName: 'John Doe',
        amount: 4999,
        status: 'completed',
        createdAt: new Date(),
      }
    ];

    return Response.json({
      stats,
      courses: courses.slice(0, 10),
      users: users.slice(0, 10),
      recentOrders,
      recentAdmins: recentAdmins.slice(0, 5),
    });
  } catch (error) {
    console.error('Dashboard data fetch error:', error);
    
    // Return mock data as fallback
    return Response.json({
      stats: {
        totalUsers: 0,
        totalCourses: 0,
        totalRevenue: 0,
        activeStudents: 0,
        completionRate: 85,
        newEnrollments: 0,
        totalAdmins: 0,
        activeAdmins: 0
      },
      courses: [],
      users: [],
      recentOrders: [],
      recentAdmins: [],
    });
  }
}

export const GET = withAdminAuth(handler);