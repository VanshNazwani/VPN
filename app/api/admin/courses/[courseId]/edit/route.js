import { NextResponse } from 'next/server';
import { doc, updateDoc, getDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';

export async function PUT(request, { params }) {
  try {
    console.log('=== COURSE UPDATE API CALLED ===');

    const { courseId } = params;
    console.log('Updating course with ID:', courseId);

    // Don't allow editing of mock courses
    if (courseId.startsWith('mock-')) {
      console.log('Attempted to edit mock course, returning error');
      return NextResponse.json(
        { message: 'Cannot edit demo courses' },
        { status: 400 }
      );
    }

    const courseData = await request.json();
    console.log('Received course data for update:', courseData);

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

    // Check if course exists
    const courseRef = doc(db, 'courses', courseId);
    const courseSnap = await getDoc(courseRef);

    if (!courseSnap.exists()) {
      console.error('Course not found:', courseId);
      return NextResponse.json(
        { message: 'Course not found' },
        { status: 404 }
      );
    }

    console.log('Course found, proceeding with update...');

    // Prepare update data
    const updateData = {
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
      isActive: courseData.isActive !== undefined ? courseData.isActive : true,
      updatedAt: new Date(),
    };

    console.log('Updating course in Firebase with data:', {
      ...updateData,
      thumbnail: updateData.thumbnail.substring(0, 50) + '...' // Log truncated URL for readability
    });

    await updateDoc(courseRef, updateData);

    console.log('=== COURSE UPDATED SUCCESSFULLY ===');
    console.log('Course ID:', courseId);

    return NextResponse.json({
      status: 200,
      message: 'Course updated successfully',
      courseId: courseId,
    }, { status: 200 });
  } catch (error) {
    console.error('=== COURSE UPDATE ERROR ===');
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