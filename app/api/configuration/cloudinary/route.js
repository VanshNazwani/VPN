// // // import { NextResponse } from 'next/server';

// // // export async function GET() {
// // //   try {
// // //      console.log('Cloudinary configuration requested');
// // //     // Return Cloudinary configuration
// // //     const config = {
// // //       cloudinaryCloudName: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
// // //       uploadPreset: process.env.CLOUDINARY_UPLOAD_PRESET || 'course_thumbnails'
// // //     };
// // //      console.log('Cloudinary config:', {
// // //       cloudName: config.cloudinaryCloudName ? 'Set' : 'Missing',
// // //       uploadPreset: config.uploadPreset
// // //     });
// // //     if (!config.cloudinaryCloudName) {
// // //          console.error('Cloudinary cloud name is missing from environment variables');
// // //       return NextResponse.json(
// // //         { message: 'Cloudinary configuration missing' },
// // //         { status: 500 }
// // //       );
// // //     }
// // // console.log('Returning Cloudinary configuration successfully');
// // //     return NextResponse.json({
// // //       status: 200,
// // //       data: config
// // //     });
// // //   } catch (error) {
// // //     console.error('Cloudinary config error:', error);
// // //     return NextResponse.json(
// // //       { message: 'Failed to get Cloudinary configuration' },
// // //       { status: 500 }
// // //     );
// // //   }
// // // }

// // import { NextResponse } from 'next/server';

// // export async function GET() {
// //   try {
// //     console.log('=== CLOUDINARY CONFIGURATION REQUESTED ===');

// //     console.log('Cloudinary configuration requested');

// //     // Return Cloudinary configuration
// //     const config = {
// //       cloudinaryCloudName: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
// //       uploadPreset: process.env.CLOUDINARY_UPLOAD_PRESET || 'course_thumbnails'
// //     };

// //     console.log('Cloudinary config check:', {
// //       cloudName: config.cloudinaryCloudName ? 'Set' : 'Missing',
// //       uploadPreset: config.uploadPreset
// //     });
// //     console.log('Cloudinary config:', {
// //       cloudName: config.cloudinaryCloudName ? 'Set' : 'Missing',
// //       uploadPreset: config.uploadPreset
// //     });

// //     if (!config.cloudinaryCloudName) {
// //       console.error('Cloudinary cloud name is missing from environment variables');
// //       console.error('Cloudinary cloud name is missing from environment variables');
// //       return NextResponse.json(
// //         { message: 'Cloudinary configuration missing' },
// //         { status: 500 }
// //       );
// //     }

// //     console.log('Returning Cloudinary configuration successfully');
// //     return NextResponse.json({
// //       status: 200,
// //       data: config
// //     });
// //   } catch (error) {
// //     console.error('=== CLOUDINARY CONFIG ERROR ===');
// //     console.error('Cloudinary config error:', error);
// //     return NextResponse.json(
// //       { message: 'Failed to get Cloudinary configuration' },
// //       { status: 500 }
// //     );
// //   }
// // }

// import { NextResponse } from 'next/server';

// export async function GET() {
//     try {
//         console.log('=== CLOUDINARY CONFIGURATION REQUESTED ===');

//         // Return Cloudinary configuration
//         const config = {
//             cloudinaryCloudName: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
//             uploadPreset: process.env.CLOUDINARY_UPLOAD_PRESET || 'course_thumbnails'
//         };

//         console.log('Cloudinary config check:', {
//             cloudName: config.cloudinaryCloudName ? 'Set' : 'Missing',
//             uploadPreset: config.uploadPreset
//         });

//         if (!config.cloudinaryCloudName) {
//             console.error('Cloudinary cloud name is missing from environment variables');
//             return NextResponse.json(
//                 { message: 'Cloudinary configuration missing' },
//                 { status: 500 }
//             );
//         }

//         console.log('Returning Cloudinary configuration successfully');
//         return NextResponse.json({
//             status: 200,
//             data: config
//         });
//     } catch (error) {
//         console.error('=== CLOUDINARY CONFIG ERROR ===');
//         console.error('Cloudinary config error:', error);
//         return NextResponse.json(
//             { message: 'Failed to get Cloudinary configuration' },
//             { status: 500 }
//         );
//     }
// }

import { NextResponse } from 'next/server';

export async function GET() {
    try {
        console.log('=== CLOUDINARY CONFIGURATION REQUESTED ===');

        // Return Cloudinary configuration without folder specification
        const config = {
            cloudinaryCloudName: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
            uploadPreset: process.env.CLOUDINARY_UPLOAD_PRESET
        };

        console.log('Cloudinary config check:', {
            cloudName: config.cloudinaryCloudName ? 'Set' : 'Missing',
            uploadPreset: config.uploadPreset ? 'Set' : 'Missing'
        });

        if (!config.cloudinaryCloudName) {
            console.error('Cloudinary cloud name is missing from environment variables');
            return NextResponse.json(
                { message: 'Cloudinary configuration missing' },
                { status: 500 }
            );
        }

        if (!config.uploadPreset) {
            console.error('Cloudinary upload preset is missing from environment variables');
            return NextResponse.json(
                { message: 'Cloudinary upload preset missing' },
                { status: 500 }
            );
        }

        console.log('Returning Cloudinary configuration successfully');
        return NextResponse.json({
            status: 200,
            data: config
        });
    } catch (error) {
        console.error('=== CLOUDINARY CONFIG ERROR ===');
        console.error('Cloudinary config error:', error);
        return NextResponse.json(
            { message: 'Failed to get Cloudinary configuration' },
            { status: 500 }
        );
    }
}