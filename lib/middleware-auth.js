// // // // // // export function withAuth(handler) {
// // // // // //   return async (req) => {
// // // // // //     const token = req.cookies.get('auth-token');

// // // // // //     if (!token) {
// // // // // //       return new Response(JSON.stringify({ error: 'Unauthorized' }), {
// // // // // //         status: 401,
// // // // // //         headers: { 'Content-Type': 'application/json' }
// // // // // //       });
// // // // // //     }

// // // // // //     try {
// // // // // //       const decoded = jwt.verify(token.value, process.env.JWT_SECRET);
// // // // // //       req.user = decoded;
// // // // // //       return handler(req);
// // // // // //     } catch (error) {
// // // // // //       return new Response(JSON.stringify({ error: 'Invalid token' }), {
// // // // // //         status: 401,
// // // // // //         headers: { 'Content-Type': 'application/json' }
// // // // // //       });
// // // // // //     }
// // // // // //   };
// // // // // // }
// // // // // import { NextResponse } from 'next/server';
// // // // // import { verifyToken } from './auth';

// // // // // export function withAuth(handler) {
// // // // //   return async (request) => {
// // // // //     try {
// // // // //       const authHeader = request.headers.get('authorization');
// // // // //       const token = authHeader?.replace('Bearer ', '');

// // // // //       if (!token) {
// // // // //         return NextResponse.json(
// // // // //           { message: 'Access denied. No token provided.' },
// // // // //           { status: 401 }
// // // // //         );
// // // // //       }

// // // // //       const decoded = verifyToken(token);
// // // // //       if (!decoded) {
// // // // //         return NextResponse.json(
// // // // //           { message: 'Invalid token.' },
// // // // //           { status: 401 }
// // // // //         );
// // // // //       }

// // // // //       request.user = decoded;
// // // // //       return handler(request);
// // // // //     } catch (error) {
// // // // //       console.error('Auth middleware error:', error);
// // // // //       return NextResponse.json(
// // // // //         { message: 'Internal server error' },
// // // // //         { status: 500 }
// // // // //       );
// // // // //     }
// // // // //   };
// // // // // }
// // // // // export function withAdminAuth(handler) {
// // // // //   return async (req) => {
// // // // //     const token = req.cookies.get('auth-token');

// // // // //     if (!token) {
// // // // //       return new Response(JSON.stringify({ error: 'Unauthorized' }), {
// // // // //         status: 401,
// // // // //         headers: { 'Content-Type': 'application/json' }
// // // // //       });
// // // // //     }

// // // // //     try {
// // // // //       const decoded = jwt.verify(token.value, process.env.JWT_SECRET);

// // // // //       if (decoded.role !== 'admin') {
// // // // //         return new Response(JSON.stringify({ error: 'Admin access required' }), {
// // // // //           status: 403,
// // // // //           headers: { 'Content-Type': 'application/json' }
// // // // //         });
// // // // //       }

// // // // //       req.user = decoded;
// // // // //       return handler(req);
// // // // //     } catch (error) {
// // // // //       return new Response(JSON.stringify({ error: 'Invalid token' }), {
// // // // //         status: 401,
// // // // //         headers: { 'Content-Type': 'application/json' }
// // // // //       });
// // // // //     }
// // // // //   };
// // // // // }

// // // // import { NextResponse } from 'next/server';
// // // // import { verifyToken } from './auth';

// // // // export function withAuth(handler) {
// // // //   return async (request) => {
// // // //     try {
// // // //       const authHeader = request.headers.get('authorization');
// // // //       const token = authHeader?.replace('Bearer ', '');

// // // //       if (!token) {
// // // //         return NextResponse.json(
// // // //           { message: 'Access denied. No token provided.' },
// // // //           { status: 401 }
// // // //         );
// // // //       }

// // // //       const decoded = verifyToken(token);
// // // //       if (!decoded) {
// // // //         return NextResponse.json(
// // // //           { message: 'Invalid or expired token.' },
// // // //           { status: 401 }
// // // //         );
// // // //       }

// // // //       // Add user info to request
// // // //       request.user = decoded;
// // // //       return handler(request);
// // // //     } catch (error) {
// // // //       console.error('Auth middleware error:', error);
// // // //       return NextResponse.json(
// // // //         { message: 'Internal server error' },
// // // //         { status: 500 }
// // // //       );
// // // //     }
// // // //   };
// // // // }

// // // // export function withAdminAuth(handler) {
// // // //   return withAuth(async (request) => {
// // // //     if (request.user.role !== 'admin') {
// // // //       return NextResponse.json(
// // // //         { message: 'Admin access required' },
// // // //         { status: 403 }
// // // //       );
// // // //     }

// // // //     return handler(request);
// // // //   });
// // // // }

// // // import { verifyToken } from './auth';

// // // export function withAuth(handler) {
// // //   return async (request) => {
// // //     try {
// // //       // Get token from cookies
// // //       const cookie = request.headers.get('cookie');
// // //       let token = null;

// // //       if (cookie) {
// // //         const cookies = cookie.split(';');
// // //         for (let c of cookies) {
// // //           const [name, value] = c.trim().split('=');
// // //           if (name === 'auth-token') {
// // //             token = value;
// // //             break;
// // //           }
// // //         }
// // //       }

// // //       // Also check Authorization header as fallback
// // //       if (!token) {
// // //         const authHeader = request.headers.get('authorization');
// // //         token = authHeader?.replace('Bearer ', '');
// // //       }

// // //       if (!token) {
// // //         return Response.json(
// // //           { message: 'Access denied. No token provided.' },
// // //           { status: 401 }
// // //         );
// // //       }

// // //       const decoded = verifyToken(token);
// // //       if (!decoded) {
// // //         return Response.json(
// // //           { message: 'Invalid or expired token.' },
// // //           { status: 401 }
// // //         );
// // //       }

// // //       // Add user info to request
// // //       request.user = decoded;
// // //       return handler(request);
// // //     } catch (error) {
// // //       console.error('Auth middleware error:', error);
// // //       return Response.json(
// // //         { message: 'Internal server error' },
// // //         { status: 500 }
// // //       );
// // //     }
// // //   };
// // // }

// // // export function withAdminAuth(handler) {
// // //   return withAuth(async (request) => {
// // //     if (request.user.role !== 'admin') {
// // //       return Response.json(
// // //         { message: 'Admin access required' },
// // //         { status: 403 }
// // //       );
// // //     }

// // //     return handler(request);
// // //   });
// // // }

// // import { verifyToken } from './auth';

// // export function withAuth(handler) {
// //   return async (request) => {
// //     try {
// //       const authHeader = request.headers.get('authorization');
// //       const token = authHeader?.replace('Bearer ', '');

// //       if (!token) {
// //         return Response.json(
// //           { message: 'Access denied. No token provided.' },
// //           { status: 401 }
// //         );
// //       }

// //       const decoded = verifyToken(token);
// //       if (!decoded) {
// //         return Response.json(
// //           { message: 'Invalid or expired token.' },
// //           { status: 401 }
// //         );
// //       }

// //       // Add user info to request
// //       request.user = decoded;
// //       return handler(request);
// //     } catch (error) {
// //       console.error('Auth middleware error:', error);
// //       return Response.json(
// //         { message: 'Internal server error' },
// //         { status: 500 }
// //       );
// //     }
// //   };
// // }

// // export function withAdminAuth(handler) {
// //   return withAuth(async (request) => {
// //     if (request.user.role !== 'admin') {
// //       return Response.json(
// //         { message: 'Admin access required' },
// //         { status: 403 }
// //       );
// //     }

// //     return handler(request);
// //   });
// // }

// import { getCurrentUser } from './auth';

// export function withAuth(handler) {
//   return async (request) => {
//     try {
//       const currentUser = await getCurrentUser();

//       if (!currentUser) {
//         return Response.json(
//           { message: 'Access denied. No token provided.' },
//           { status: 401 }
//         );
//       }

//       // Add user info to request
//       request.user = currentUser;
//       return handler(request);
//     } catch (error) {
//       console.error('Auth middleware error:', error);
//       return Response.json(
//         { message: 'Internal server error' },
//         { status: 500 }
//       );
//     }
//   };
// }

// export function withAdminAuth(handler) {
//   return withAuth(async (request) => {
//     if (request.user.role !== 'admin') {
//       return Response.json(
//         { message: 'Admin access required' },
//         { status: 403 }
//       );
//     }

//     return handler(request);
//   });
// }

import { getCurrentUser } from './auth';

export function withAuth(handler) {
  return async (request, context) => {  // Added context parameter
    try {
      const currentUser = await getCurrentUser();

      if (!currentUser) {
        return Response.json(
          { message: 'Access denied. No token provided.' },
          { status: 401 }
        );
      }

      // Add user info to request
      request.user = currentUser;
      return handler(request, context);  // Pass context to handler
    } catch (error) {
      console.error('Auth middleware error:', error);
      return Response.json(
        { message: 'Internal server error' },
        { status: 500 }
      );
    }
  };
}

export function withAdminAuth(handler) {
  return withAuth(async (request, context) => {  // Added context parameter
    if (request.user.role !== 'admin') {
      return Response.json(
        { message: 'Admin access required' },
        { status: 403 }
      );
    }

    return handler(request, context);  // Pass context to handler
  });
}