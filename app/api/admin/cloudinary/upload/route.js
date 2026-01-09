import { uploadToCloudinary } from '@/lib/cloudinary';
import { withAdminAuth } from '@/lib/middleware-auth';

async function handler(request) {
  try {
    const formData = await request.formData();
    const file = formData.get('file');
    const folder = formData.get('folder') || 'courses';

    if (!file) {
      return Response.json(
        { message: 'No file provided' },
        { status: 400 }
      );
    }

    // Convert file to base64 for Cloudinary
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const base64 = `data:${file.type};base64,${buffer.toString('base64')}`;

    const result = await uploadToCloudinary(base64, folder);

    return Response.json({
      message: 'File uploaded successfully',
      url: result.url,
      publicId: result.public_id,
    });
  } catch (error) {
    console.error('Upload error:', error);
    return Response.json(
      { message: 'Upload failed' },
      { status: 500 }
    );
  }
}

export const POST = withAdminAuth(handler);