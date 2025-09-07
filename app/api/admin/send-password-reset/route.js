// import { sendPasswordResetEmailToUser } from '@/lib/auth';
// import { withAuth } from '@/lib/middleware-auth';

// async function handler(request) {
//     try {
//         const adminEmail = request.user.email;

//         if (!adminEmail) {
//             return Response.json(
//                 { message: 'Admin email not found' },
//                 { status: 400 }
//             );
//         }

//         const result = await sendPasswordResetEmailToUser(adminEmail);

//         if (result.success) {
//             return Response.json({
//                 message: 'Password reset link sent to your email address!',
//                 email: adminEmail
//             });
//         } else {
//             return Response.json(
//                 { message: result.error },
//                 { status: 400 }
//             );
//         }

//     } catch (error) {
//         console.error('Error in admin send password reset:', error);
//         return Response.json(
//             { message: 'Internal server error' },
//             { status: 500 }
//         );
//     }
// }

// export const POST = withAuth(handler);

import { sendPasswordResetEmailToUser } from '@/lib/auth';
import { withAuth } from '@/lib/middleware-auth';

async function handler(request) {
    try {
        const adminEmail = request.user.email;

        if (!adminEmail) {
            return Response.json(
                { message: 'Admin email not found' },
                { status: 400 }
            );
        }

        // Verify this is an admin user
        if (request.user.role !== 'admin') {
            return Response.json(
                { message: 'Unauthorized: Admin access required' },
                { status: 403 }
            );
        }

        const result = await sendPasswordResetEmailToUser(adminEmail);

        if (result.success) {
            return Response.json({
                message: 'Password reset link sent to your email address!',
                email: adminEmail
            });
        } else {
            return Response.json(
                { message: result.error },
                { status: 400 }
            );
        }

    } catch (error) {
        console.error('Error in admin send password reset:', error);
        return Response.json(
            { message: 'Internal server error' },
            { status: 500 }
        );
    }
}

export const POST = withAuth(handler);