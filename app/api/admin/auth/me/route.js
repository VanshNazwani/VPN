import { getCurrentUser } from '@/lib/auth';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';

export async function GET() {
  try {
    const currentUser = await getCurrentUser();
    
    if (!currentUser) {
      return Response.json(
        { message: 'Not authenticated' },
        { status: 401 }
      );
    }

    // Check if user is admin
    if (currentUser.role !== 'admin') {
      return Response.json(
        { message: 'Admin access required' },
        { status: 403 }
      );
    }

    // Get fresh admin data from Firestore
    const adminDoc = await getDoc(doc(db, 'admins', currentUser.userId));
    if (!adminDoc.exists()) {
      return Response.json(
        { message: 'Admin not found' },
        { status: 404 }
      );
    }

    const adminData = adminDoc.data();
    
    // Check if admin is still verified and active
    if (!adminData.isVerified || !adminData.isActive) {
      return Response.json(
        { message: 'Admin account not verified or deactivated' },
        { status: 401 }
      );
    }

    const { password, ...adminWithoutPassword } = adminData;

    return Response.json({
      user: {
        id: adminDoc.id,
        ...adminWithoutPassword,
      },
    });
  } catch (error) {
    console.error('Admin auth check error:', error);
    return Response.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}