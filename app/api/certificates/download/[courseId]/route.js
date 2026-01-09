// import { NextResponse } from 'next/server';
// import { db } from '@/lib/firebase';
// import { doc, getDoc } from 'firebase/firestore';
// import { withAuth } from '@/lib/middleware-auth';
// import { jsPDF } from 'jspdf';

// async function handler(request, { params }) {
//     try {
//         const { courseId } = params;
//         const userId = request.user.userId;

//         console.log(`Generating certificate for course: ${courseId}, user: ${userId}`);

//         // Check if user is enrolled and eligible for certificate
//         const userDocRef = doc(db, 'users', userId);
//         const userDoc = await getDoc(userDocRef);

//         if (!userDoc.exists()) {
//             return NextResponse.json(
//                 { error: 'User not found' },
//                 { status: 404 }
//             );
//         }

//         const userData = userDoc.data();
//         const enrolledCourses = userData.enrolledCourses || [];

//         if (!enrolledCourses.includes(courseId)) {
//             return NextResponse.json(
//                 { error: 'You are not enrolled in this course' },
//                 { status: 403 }
//             );
//         }

//         // Get progress data
//         const progressRef = doc(db, 'user_course_progress', `${userId}_${courseId}`);
//         const progressDoc = await getDoc(progressRef);

//         if (!progressDoc.exists()) {
//             return NextResponse.json(
//                 { error: 'No progress data found' },
//                 { status: 404 }
//             );
//         }

//         const progressData = progressDoc.data();

//         if (!progressData.certificateEligible) {
//             return NextResponse.json(
//                 { error: 'Certificate not yet available. Complete more sections to unlock.' },
//                 { status: 403 }
//             );
//         }

//         // Get course data
//         const courseDocRef = doc(db, 'courses', courseId);
//         const courseDoc = await getDoc(courseDocRef);

//         if (!courseDoc.exists()) {
//             return NextResponse.json(
//                 { error: 'Course not found' },
//                 { status: 404 }
//             );
//         }

//         const courseData = courseDoc.data();

//         // Generate certificate PDF
//         const pdf = new jsPDF({
//             orientation: 'landscape',
//             unit: 'mm',
//             format: 'a4'
//         });

//         // Certificate design
//         const pageWidth = pdf.internal.pageSize.getWidth();
//         const pageHeight = pdf.internal.pageSize.getHeight();

//         // Background
//         pdf.setFillColor(248, 249, 250);
//         pdf.rect(0, 0, pageWidth, pageHeight, 'F');

//         // Border
//         pdf.setDrawColor(79, 70, 229);
//         pdf.setLineWidth(2);
//         pdf.rect(10, 10, pageWidth - 20, pageHeight - 20);

//         // Header
//         pdf.setFontSize(24);
//         pdf.setFont('helvetica', 'bold');
//         pdf.setTextColor(79, 70, 229);
//         pdf.text('Certificate of Completion', pageWidth / 2, 40, { align: 'center' });

//         // VPN Academy
//         pdf.setFontSize(16);
//         pdf.setFont('helvetica', 'normal');
//         pdf.setTextColor(107, 114, 128);
//         pdf.text('VPN Academy', pageWidth / 2, 55, { align: 'center' });

//         // This certifies that
//         pdf.setFontSize(14);
//         pdf.setTextColor(75, 85, 99);
//         pdf.text('This certifies that', pageWidth / 2, 80, { align: 'center' });

//         // Student name
//         pdf.setFontSize(28);
//         pdf.setFont('helvetica', 'bold');
//         pdf.setTextColor(17, 24, 39);
//         pdf.text(userData.fullName, pageWidth / 2, 105, { align: 'center' });

//         // Has successfully completed
//         pdf.setFontSize(14);
//         pdf.setFont('helvetica', 'normal');
//         pdf.setTextColor(75, 85, 99);
//         pdf.text('has successfully completed the course', pageWidth / 2, 125, { align: 'center' });

//         // Course name
//         pdf.setFontSize(20);
//         pdf.setFont('helvetica', 'bold');
//         pdf.setTextColor(79, 70, 229);

//         // Handle long course titles
//         const courseTitle = courseData.title;
//         if (courseTitle.length > 40) {
//             const words = courseTitle.split(' ');
//             let line1 = '';
//             let line2 = '';

//             for (let i = 0; i < words.length; i++) {
//                 if ((line1 + words[i]).length < 40) {
//                     line1 += (line1 ? ' ' : '') + words[i];
//                 } else {
//                     line2 += (line2 ? ' ' : '') + words[i];
//                 }
//             }

//             pdf.text(line1, pageWidth / 2, 145, { align: 'center' });
//             if (line2) {
//                 pdf.text(line2, pageWidth / 2, 160, { align: 'center' });
//             }
//         } else {
//             pdf.text(courseTitle, pageWidth / 2, 150, { align: 'center' });
//         }

//         // Date and progress info
//         const completionDate = new Date().toLocaleDateString('en-US', {
//             year: 'numeric',
//             month: 'long',
//             day: 'numeric'
//         });

//         pdf.setFontSize(12);
//         pdf.setFont('helvetica', 'normal');
//         pdf.setTextColor(107, 114, 128);
//         pdf.text(`Date of Completion: ${completionDate}`, pageWidth / 2, 180, { align: 'center' });
//         pdf.text(`Course Progress: ${progressData.progress}%`, pageWidth / 2, 190, { align: 'center' });

//         // Certificate ID
//         const certificateId = `VPN-${courseId.slice(0, 6).toUpperCase()}-${userId.slice(0, 6).toUpperCase()}-${Date.now().toString().slice(-6)}`;
//         pdf.setFontSize(10);
//         pdf.text(`Certificate ID: ${certificateId}`, pageWidth / 2, 205, { align: 'center' });

//         // Generate PDF buffer
//         const pdfBuffer = pdf.output('arraybuffer');

//         return new NextResponse(pdfBuffer, {
//             status: 200,
//             headers: {
//                 'Content-Type': 'application/pdf',
//                 'Content-Disposition': `attachment; filename="${courseData.title}-certificate.pdf"`,
//             },
//         });

//     } catch (error) {
//         console.error('Error generating certificate:', error);
//         return NextResponse.json(
//             { error: 'Failed to generate certificate' },
//             { status: 500 }
//         );
//     }
// }

// export const GET = withAuth(handler);

import { NextResponse } from 'next/server';
import { db } from '@/lib/firebase';
import { doc, getDoc } from 'firebase/firestore';
import { withAuth } from '@/lib/middleware-auth';
import { jsPDF } from 'jspdf';

async function handler(request, context) {
    try {
        // Extract params from context, with fallback to prevent destructuring error
        const params = context?.params || {};
        const { courseId } = params;
        
        // Additional check to ensure courseId exists
        if (!courseId) {
            return NextResponse.json(
                { error: 'Course ID is required' },
                { status: 400 }
            );
        }

        const userId = request.user.userId;

        console.log(`Generating certificate for course: ${courseId}, user: ${userId}`);

        // Check if user is enrolled and eligible for certificate
        const userDocRef = doc(db, 'users', userId);
        const userDoc = await getDoc(userDocRef);

        if (!userDoc.exists()) {
            return NextResponse.json(
                { error: 'User not found' },
                { status: 404 }
            );
        }

        const userData = userDoc.data();
        const enrolledCourses = userData.enrolledCourses || [];

        if (!enrolledCourses.includes(courseId)) {
            return NextResponse.json(
                { error: 'You are not enrolled in this course' },
                { status: 403 }
            );
        }

        // Get progress data
        const progressRef = doc(db, 'user_course_progress', `${userId}_${courseId}`);
        const progressDoc = await getDoc(progressRef);

        if (!progressDoc.exists()) {
            return NextResponse.json(
                { error: 'No progress data found' },
                { status: 404 }
            );
        }

        const progressData = progressDoc.data();

        if (!progressData.certificateEligible) {
            return NextResponse.json(
                { error: 'Certificate not yet available. Complete more sections to unlock.' },
                { status: 403 }
            );
        }

        // Get course data
        const courseDocRef = doc(db, 'courses', courseId);
        const courseDoc = await getDoc(courseDocRef);

        if (!courseDoc.exists()) {
            return NextResponse.json(
                { error: 'Course not found' },
                { status: 404 }
            );
        }

        const courseData = courseDoc.data();

        // Generate certificate PDF
        const pdf = new jsPDF({
            orientation: 'landscape',
            unit: 'mm',
            format: 'a4'
        });

        // Certificate design
        const pageWidth = pdf.internal.pageSize.getWidth();
        const pageHeight = pdf.internal.pageSize.getHeight();

        // Background
        pdf.setFillColor(248, 249, 250);
        pdf.rect(0, 0, pageWidth, pageHeight, 'F');

        // Border
        pdf.setDrawColor(79, 70, 229);
        pdf.setLineWidth(2);
        pdf.rect(10, 10, pageWidth - 20, pageHeight - 20);

        // Header
        pdf.setFontSize(24);
        pdf.setFont('helvetica', 'bold');
        pdf.setTextColor(79, 70, 229);
        pdf.text('Certificate of Completion', pageWidth / 2, 40, { align: 'center' });

        // VPN Academy
        pdf.setFontSize(16);
        pdf.setFont('helvetica', 'normal');
        pdf.setTextColor(107, 114, 128);
        pdf.text('VPN Academy', pageWidth / 2, 55, { align: 'center' });

        // This certifies that
        pdf.setFontSize(14);
        pdf.setTextColor(75, 85, 99);
        pdf.text('This certifies that', pageWidth / 2, 80, { align: 'center' });

        // Student name
        pdf.setFontSize(28);
        pdf.setFont('helvetica', 'bold');
        pdf.setTextColor(17, 24, 39);
        pdf.text(userData.fullName, pageWidth / 2, 105, { align: 'center' });

        // Has successfully completed
        pdf.setFontSize(14);
        pdf.setFont('helvetica', 'normal');
        pdf.setTextColor(75, 85, 99);
        pdf.text('has successfully completed the course', pageWidth / 2, 125, { align: 'center' });

        // Course name
        pdf.setFontSize(20);
        pdf.setFont('helvetica', 'bold');
        pdf.setTextColor(79, 70, 229);

        // Handle long course titles
        const courseTitle = courseData.title;
        if (courseTitle.length > 40) {
            const words = courseTitle.split(' ');
            let line1 = '';
            let line2 = '';

            for (let i = 0; i < words.length; i++) {
                if ((line1 + words[i]).length < 40) {
                    line1 += (line1 ? ' ' : '') + words[i];
                } else {
                    line2 += (line2 ? ' ' : '') + words[i];
                }
            }

            pdf.text(line1, pageWidth / 2, 145, { align: 'center' });
            if (line2) {
                pdf.text(line2, pageWidth / 2, 160, { align: 'center' });
            }
        } else {
            pdf.text(courseTitle, pageWidth / 2, 150, { align: 'center' });
        }

        // Date and progress info
        const completionDate = new Date().toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });

        pdf.setFontSize(12);
        pdf.setFont('helvetica', 'normal');
        pdf.setTextColor(107, 114, 128);
        pdf.text(`Date of Completion: ${completionDate}`, pageWidth / 2, 180, { align: 'center' });
        pdf.text(`Course Progress: ${progressData.progress}%`, pageWidth / 2, 190, { align: 'center' });

        // Certificate ID
        const certificateId = `VPN-${courseId.slice(0, 6).toUpperCase()}-${userId.slice(0, 6).toUpperCase()}-${Date.now().toString().slice(-6)}`;
        pdf.setFontSize(10);
        pdf.text(`Certificate ID: ${certificateId}`, pageWidth / 2, 205, { align: 'center' });

        // Generate PDF buffer
        const pdfBuffer = pdf.output('arraybuffer');

        return new NextResponse(pdfBuffer, {
            status: 200,
            headers: {
                'Content-Type': 'application/pdf',
                'Content-Disposition': `attachment; filename="${courseData.title}-certificate.pdf"`,
            },
        });

    } catch (error) {
        console.error('Error generating certificate:', error);
        return NextResponse.json(
            { error: 'Failed to generate certificate' },
            { status: 500 }
        );
    }
}

export const GET = withAuth(handler);