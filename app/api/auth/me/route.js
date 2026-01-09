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

    // Get fresh user data from Firestore
    const userDoc = await getDoc(doc(db, 'users', currentUser.userId));
    if (!userDoc.exists()) {
      return Response.json(
        { message: 'User not found' },
        { status: 404 }
      );
    }

    const userData = userDoc.data();
    
    // Check if user is still verified
    if (!userData.isVerified) {
      return Response.json(
        { message: 'Email not verified' },
        { status: 401 }
      );
    }

    const { password, ...userWithoutPassword } = userData;

    return Response.json({
      user: {
        id: userDoc.id,
        ...userWithoutPassword,
      },
    });
  } catch (error) {
    console.error('Auth check error:', error);
    return Response.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}