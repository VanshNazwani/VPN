// // // // // // import { NextResponse } from 'next/server';
// // // // // // import jwt from 'jsonwebtoken';

// // // // // // export function middleware(request) {
// // // // // //   const { pathname } = request.nextUrl;

// // // // // //   // Protected routes
// // // // // //   const protectedRoutes = ['/dashboard', '/courses/purchased'];
// // // // // //   const adminRoutes = ['/admin'];

// // // // // //   // Check if route needs protection
// // // // // //   const isProtectedRoute = protectedRoutes.some(route => pathname.startsWith(route));
// // // // // //   const isAdminRoute = adminRoutes.some(route => pathname.startsWith(route));

// // // // // //   if (isProtectedRoute || isAdminRoute) {
// // // // // //     const token = request.cookies.get('auth-token');

// // // // // //     if (!token) {
// // // // // //       return NextResponse.redirect(new URL('/auth/login', request.url));
// // // // // //     }

// // // // // //     try {
// // // // // //       const decoded = jwt.verify(token.value, process.env.JWT_SECRET);

// // // // // //       // Check admin access for admin routes
// // // // // //       if (isAdminRoute && decoded.role !== 'admin') {
// // // // // //         return NextResponse.redirect(new URL('/auth/login', request.url));
// // // // // //       }

// // // // // //     } catch (error) {
// // // // // //       return NextResponse.redirect(new URL('/auth/login', request.url));
// // // // // //     }
// // // // // //   }

// // // // // //   return NextResponse.next();
// // // // // // }

// // // // // // export const config = {
// // // // // //   matcher: ['/dashboard/:path*', '/courses/purchased/:path*']
// // // // // // };

// // // // // import { NextResponse } from 'next/server';
// // // // // import jwt from 'jsonwebtoken';

// // // // // export function middleware(request) {
// // // // //   const { pathname } = request.nextUrl;

// // // // //   // Public routes that don't need authentication
// // // // //   const publicRoutes = [
// // // // //     '/',
// // // // //     '/auth/login',
// // // // //     '/auth/register',
// // // // //     '/courses',
// // // // //     '/about',
// // // // //     '/contact',
// // // // //     '/api/auth/login',
// // // // //     '/api/auth/register',
// // // // //     '/api/auth/verify-otp'
// // // // //   ];

// // // // //   // Protected routes
// // // // //   const protectedRoutes = ['/dashboard', '/courses/purchased'];
// // // // //   const adminRoutes = ['/admin'];

// // // // //   // Check if route is public
// // // // //   const isPublicRoute = publicRoutes.some(route => 
// // // // //     pathname === route || pathname.startsWith('/api/auth/')
// // // // //   );

// // // // //   if (isPublicRoute) {
// // // // //     return NextResponse.next();
// // // // //   }

// // // // //   // Check if route needs protection
// // // // //   const isProtectedRoute = protectedRoutes.some(route => pathname.startsWith(route));
// // // // //   const isAdminRoute = adminRoutes.some(route => pathname.startsWith(route));

// // // // //   if (isProtectedRoute || isAdminRoute) {
// // // // //     const token = request.cookies.get('auth-token');
// // // // //     //console.log(token.value);
// // // // //     if (!token.value) {
// // // // //       return NextResponse.redirect(new URL('/auth/login', request.url));
// // // // //     }
// // // // //     try {
// // // // //       const decoded = jwt.verify(token.value, process.env.JWT_SECRET);

// // // // //       // Check admin access for admin routes
// // // // //       if (isAdminRoute && decoded.role !== 'admin') {
// // // // //         return NextResponse.redirect(new URL('/auth/login', request.url));
// // // // //       }

// // // // //     } catch (error) {
// // // // //       return NextResponse.redirect(new URL('/auth/login', request.url));
// // // // //     }
// // // // //   }

// // // // //   return NextResponse.next();
// // // // // }

// // // // // export const config = {
// // // // //   matcher: [
// // // // //     '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
// // // // //   ],
// // // // // };

// // // // import { NextResponse } from 'next/server';
// // // // import { verifyToken } from './lib/auth';

// // // // export function middleware(request) {
// // // //   const { pathname } = request.nextUrl;

// // // //   // Public routes that don't need authentication
// // // //   const publicRoutes = [
// // // //     '/',
// // // //     '/auth/login',
// // // //     '/auth/register',
// // // //     '/courses',
// // // //     '/about',
// // // //     '/contact'
// // // //   ];

// // // //   // API routes that don't need auth
// // // //   const publicApiRoutes = [
// // // //     '/api/auth/login',
// // // //     '/api/auth/register',
// // // //     '/api/auth/verify-otp',
// // // //     '/api/auth/logout'
// // // //   ];

// // // //   // Protected routes
// // // //   const protectedRoutes = ['/courses/purchased'];
// // // //   const adminRoutes = ['/admin'];

// // // //   // Check if route is public
// // // //   const isPublicRoute = publicRoutes.some(route => pathname === route) || 
// // // //                        publicApiRoutes.some(route => pathname.startsWith(route));

// // // //   if (isPublicRoute) {
// // // //     return NextResponse.next();
// // // //   }

// // // //   // Check if route needs protection
// // // //   const isProtectedRoute = protectedRoutes.some(route => pathname.startsWith(route));
// // // //   const isAdminRoute = adminRoutes.some(route => pathname.startsWith(route));

// // // //   if (isProtectedRoute || isAdminRoute) {
// // // //     const token = request.cookies.get('auth-token');

// // // //     if (!token || !token.value) {
// // // //       return NextResponse.redirect(new URL('/auth/login', request.url));
// // // //     }

// // // //     try {
// // // //       const decoded = verifyToken(token.value);

// // // //       if (!decoded) {
// // // //         return NextResponse.redirect(new URL('/auth/login', request.url));
// // // //       }

// // // //       // Check admin access for admin routes
// // // //       if (isAdminRoute && decoded.role !== 'admin') {
// // // //         return NextResponse.redirect(new URL('/auth/login', request.url));
// // // //       }

// // // //     } catch (error) {
// // // //       console.error('Middleware token verification error:', error);
// // // //       return NextResponse.redirect(new URL('/auth/login', request.url));
// // // //     }
// // // //   }

// // // //   return NextResponse.next();
// // // // }

// // // // export const config = {
// // // //   matcher: [
// // // //     '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
// // // //   ],
// // // // };

// // // import { NextResponse } from 'next/server';
// // // import { verifyToken } from './lib/auth';

// // // export function middleware(request) {
// // //   const { pathname } = request.nextUrl;

// // //   // Public routes that don't need authentication
// // //   const publicRoutes = [
// // //     '/',
// // //     '/auth/login',
// // //     '/auth/register',
// // //     '/courses',
// // //     '/about',
// // //     '/contact',
// // //     '/admin/login', // Allow admin login page
// // //     '/admin/register' // Allow admin registration (temporary)
// // //   ];

// // //   // API routes that don't need auth
// // //   const publicApiRoutes = [
// // //     '/api/auth/login',
// // //     '/api/auth/register',
// // //     '/api/auth/verify-otp',
// // //     '/api/auth/logout',
// // //     '/api/admin/auth/login', // Allow admin login API
// // //     '/api/admin/auth/register', // Allow admin registration API (temporary)
// // //     // 'admin/courses/create',
// // //     '/api/admin/courses/create'
// // //   ];

// // //   // Protected routes
// // //   const protectedRoutes = ['/courses/purchased', '/dashboard'];
// // //   const adminRoutes = ['/admin'];

// // //   // Check if route is public
// // //   const isPublicRoute = publicRoutes.some(route => pathname === route || pathname.startsWith(route)) ||
// // //     publicApiRoutes.some(route => pathname.startsWith(route));

// // //   if (isPublicRoute) {
// // //     return NextResponse.next();
// // //   }

// // //   // Check if route needs protection
// // //   const isProtectedRoute = protectedRoutes.some(route => pathname.startsWith(route));
// // //   const isAdminRoute = adminRoutes.some(route => pathname.startsWith(route)) &&
// // //     !pathname.startsWith('/admin/login') &&
// // //     !pathname.startsWith('/admin/register');

// // //   if (isProtectedRoute || isAdminRoute) {
// // //     const token = request.cookies.get('auth-token');

// // //     if (!token || !token.value) {
// // //       if (isAdminRoute) {
// // //         return NextResponse.redirect(new URL('/admin/login', request.url));
// // //       }
// // //       return NextResponse.redirect(new URL('/auth/login', request.url));
// // //     }

// // //     try {
// // //       const decoded = verifyToken(token.value);

// // //       if (!decoded) {
// // //         if (isAdminRoute) {
// // //           return NextResponse.redirect(new URL('/admin/login', request.url));
// // //         }
// // //         return NextResponse.redirect(new URL('/auth/login', request.url));
// // //       }

// // //       // Check admin access for admin routes
// // //       if (isAdminRoute && decoded.role !== 'admin') {
// // //         return NextResponse.redirect(new URL('/admin/login', request.url));
// // //       }

// // //     } catch (error) {
// // //       console.error('Middleware token verification error:', error);
// // //       if (isAdminRoute) {
// // //         return NextResponse.redirect(new URL('/admin/login', request.url));
// // //       }
// // //       return NextResponse.redirect(new URL('/auth/login', request.url));
// // //     }
// // //   }

// // //   return NextResponse.next();
// // // }

// // // export const config = {
// // //   matcher: [
// // //     '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
// // //   ],
// // // };

// // import { NextResponse } from 'next/server';
// // import { verifyToken } from './lib/auth';

// // export function middleware(request) {
// //   const { pathname } = request.nextUrl;

// //   // Public routes that don't need authentication
// //   const publicRoutes = [
// //     '/',
// //     '/auth/login',
// //     '/auth/register',
// //     '/courses',
// //     '/about',
// //     '/contact',
// //     '/admin/login',
// //     '/admin/register'
// //   ];

// //   // API routes that don't need auth
// //   const publicApiRoutes = [
// //     '/api/auth/login',
// //     '/api/auth/register',
// //     '/api/auth/verify-otp',
// //     '/api/auth/logout',
// //     '/api/admin/auth/login',
// //     '/api/admin/auth/register',
// //     '/api/admin/courses/create' // Fixed: Added leading slash
// //   ];

// //   // Protected routes
// //   const protectedRoutes = ['/courses/purchased', '/dashboard'];
// //   const adminRoutes = ['/admin'];

// //   // Check if route is public
// //   const isPublicRoute = publicRoutes.some(route => pathname === route || pathname.startsWith(route)) ||
// //     publicApiRoutes.some(route => pathname.startsWith(route));

// //   if (isPublicRoute) {
// //     return NextResponse.next();
// //   }

// //   // Check if route needs protection
// //   const isProtectedRoute = protectedRoutes.some(route => pathname.startsWith(route));
// //   const isAdminRoute = adminRoutes.some(route => pathname.startsWith(route)) &&
// //     !pathname.startsWith('/admin/login') &&
// //     !pathname.startsWith('/admin/register');

// //   if (isProtectedRoute || isAdminRoute) {
// //     const token = request.cookies.get('auth-token');

// //     if (!token || !token.value) {
// //       if (isAdminRoute) {
// //         return NextResponse.redirect(new URL('/admin/login', request.url));
// //       }
// //       return NextResponse.redirect(new URL('/auth/login', request.url));
// //     }

// //     try {
// //       const decoded = verifyToken(token.value);

// //       if (!decoded) {
// //         if (isAdminRoute) {
// //           return NextResponse.redirect(new URL('/admin/login', request.url));
// //         }
// //         return NextResponse.redirect(new URL('/auth/login', request.url));
// //       }

// //       // Check admin access for admin routes
// //       if (isAdminRoute && decoded.role !== 'admin') {
// //         return NextResponse.redirect(new URL('/admin/login', request.url));
// //       }

// //     } catch (error) {
// //       console.error('Middleware token verification error:', error);
// //       if (isAdminRoute) {
// //         return NextResponse.redirect(new URL('/admin/login', request.url));
// //       }
// //       return NextResponse.redirect(new URL('/auth/login', request.url));
// //     }
// //   }

// //   return NextResponse.next();
// // }

// // export const config = {
// //   matcher: [
// //     '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
// //   ],
// // };

// import { NextResponse } from 'next/server';
// import { verifyToken } from './lib/auth';

// export function middleware(request) {
//   const { pathname } = request.nextUrl;

//   // Public routes that don't need authentication
//   const publicRoutes = [
//     '/',
//     '/auth/login',
//     '/auth/register',
//     '/courses',
//     '/about',
//     '/contact',
//     '/admin/login',
//     '/admin/register'
//   ];

//   // API routes that don't need auth
//   const publicApiRoutes = [
//     '/api/auth/login',
//     '/api/auth/register',
//     '/api/auth/verify-otp',
//     '/api/auth/logout',
//     '/api/admin/auth/login',
//     '/api/admin/auth/register',
//     '/api/admin/courses/create',
//     '/api/configuration/cloudinary'
//   ];

//   // Protected routes
//   const protectedRoutes = ['/courses/purchased', '/dashboard'];
//   const adminRoutes = ['/admin'];

//   // Check if route is public
//   const isPublicRoute = publicRoutes.some(route => pathname === route || pathname.startsWith(route)) ||
//     publicApiRoutes.some(route => pathname.startsWith(route));

//   if (isPublicRoute) {
//     return NextResponse.next();
//   }

//   // Check if route needs protection
//   const isProtectedRoute = protectedRoutes.some(route => pathname.startsWith(route));
//   const isAdminRoute = adminRoutes.some(route => pathname.startsWith(route)) &&
//     !pathname.startsWith('/admin/login') &&
//     !pathname.startsWith('/admin/register');

//   if (isProtectedRoute || isAdminRoute) {
//     const token = request.cookies.get('auth-token');

//     if (!token || !token.value) {
//       if (isAdminRoute) {
//         return NextResponse.redirect(new URL('/admin/login', request.url));
//       }
//       return NextResponse.redirect(new URL('/auth/login', request.url));
//     }

//     try {
//       const decoded = verifyToken(token.value);

//       if (!decoded) {
//         if (isAdminRoute) {
//           return NextResponse.redirect(new URL('/admin/login', request.url));
//         }
//         return NextResponse.redirect(new URL('/auth/login', request.url));
//       }

//       // Check admin access for admin routes
//       if (isAdminRoute && decoded.role !== 'admin') {
//         return NextResponse.redirect(new URL('/admin/login', request.url));
//       }

//     } catch (error) {
//       console.error('Middleware token verification error:', error);
//       if (isAdminRoute) {
//         return NextResponse.redirect(new URL('/admin/login', request.url));
//       }
//       return NextResponse.redirect(new URL('/auth/login', request.url));
//     }
//   }

//   return NextResponse.next();
// }

// export const config = {
//   matcher: [
//     '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
//   ],
// };

import { NextResponse } from 'next/server';
import { verifyToken } from './lib/auth';

export function middleware(request) {
  const { pathname } = request.nextUrl;

  // Public routes that don't need authentication
  const publicRoutes = [
    '/',
    '/auth/login',
    '/auth/register',
    '/courses',
    '/about',
    '/contact',
    '/admin/login',
    '/admin/register'
  ];

  // API routes that don't need auth
  const publicApiRoutes = [
    '/api/auth/login',
    '/api/auth/register',
    '/api/auth/verify-otp',
    '/api/auth/logout',
    '/api/admin/auth/login',
    '/api/admin/auth/register',
    '/api/admin/courses/create',
    '/api/configuration/cloudinary',
    '/api/configuration/cloudinary'
  ];

  // Protected routes
  const protectedRoutes = ['/courses/purchased', '/dashboard'];
  const adminRoutes = ['/admin'];

  // Check if route is public
  const isPublicRoute = publicRoutes.some(route => pathname === route || pathname.startsWith(route)) ||
    publicApiRoutes.some(route => pathname.startsWith(route));

  if (isPublicRoute) {
    return NextResponse.next();
  }

  // Check if route needs protection
  const isProtectedRoute = protectedRoutes.some(route => pathname.startsWith(route));
  const isAdminRoute = adminRoutes.some(route => pathname.startsWith(route)) &&
    !pathname.startsWith('/admin/login') &&
    !pathname.startsWith('/admin/register');

  if (isProtectedRoute || isAdminRoute) {
    const token = request.cookies.get('auth-token');

    if (!token || !token.value) {
      if (isAdminRoute) {
        return NextResponse.redirect(new URL('/admin/login', request.url));
      }
      return NextResponse.redirect(new URL('/auth/login', request.url));
    }

    try {
      const decoded = verifyToken(token.value);

      if (!decoded) {
        if (isAdminRoute) {
          return NextResponse.redirect(new URL('/admin/login', request.url));
        }
        return NextResponse.redirect(new URL('/auth/login', request.url));
      }

      // Check admin access for admin routes
      if (isAdminRoute && decoded.role !== 'admin') {
        return NextResponse.redirect(new URL('/admin/login', request.url));
      }

    } catch (error) {
      console.error('Middleware token verification error:', error);
      if (isAdminRoute) {
        return NextResponse.redirect(new URL('/admin/login', request.url));
      }
      return NextResponse.redirect(new URL('/auth/login', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};