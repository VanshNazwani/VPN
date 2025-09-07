// // import { sendPasswordResetEmailToUser } from '@/lib/auth';
// // import { withAuth } from '@/lib/middleware-auth';

// // async function handler(request) {
// //     try {
// //         const userEmail = request.user.email;

// //         if (!userEmail) {
// //             return Response.json(
// //                 { message: 'User email not found' },
// //                 { status: 400 }
// //             );
// //         }

// //         const result = await sendPasswordResetEmailToUser(userEmail);

// //         if (result.success) {
// //             return Response.json({
// //                 message: 'Password reset link sent to your email address!',
// //                 email: userEmail
// //             });
// //         } else {
// //             return Response.json(
// //                 { message: result.error },
// //                 { status: 400 }
// //             );
// //         }

// //     } catch (error) {
// //         console.error('Error in send password reset:', error);
// //         return Response.json(
// //             { message: 'Internal server error' },
// //             { status: 500 }
// //         );
// //     }
// // }

// // export const POST = withAuth(handler);

// import { sendPasswordResetEmailToUser } from '@/lib/auth';
// import { withAuth } from '@/lib/middleware-auth';

// async function handler(request) {
//   try {
//     const userEmail = request.user.email;

//     if (!userEmail) {
//       return Response.json(
//         { message: 'User email not found' },
//         { status: 400 }
//       );
//     }

//     const result = await sendPasswordResetEmailToUser(userEmail);

//     if (result.success) {
//       return Response.json({
//         message: 'Password reset link sent to your email address!',
//         email: userEmail
//       });
//     } else {
//       return Response.json(
//         { message: result.error },
//         { status: 400 }
//       );
//     }

//   } catch (error) {
//     console.error('Error in send password reset:', error);
//     return Response.json(
//       { message: 'Internal server error' },
//       { status: 500 }
//     );
//   }
// }

// export const POST = withAuth(handler);

import { sendPasswordResetEmailToUser } from '@/lib/auth';
import { withAuth } from '@/lib/middleware-auth';

async function handler(request) {
  try {
    const userEmail = request.user.email;

    if (!userEmail) {
      return Response.json(
        { message: 'User email not found' },
        { status: 400 }
      );
    }

    const result = await sendPasswordResetEmailToUser(userEmail);

    if (result.success) {
      return Response.json({
        message: 'Password reset link sent to your email address!',
        email: userEmail
      });
    } else {
      return Response.json(
        { message: result.error },
        { status: 400 }
      );
    }

  } catch (error) {
    console.error('Error in send password reset:', error);
    return Response.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}

export const POST = withAuth(handler);