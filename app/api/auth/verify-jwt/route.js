import { verifyToken } from '@/lib/auth';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';

export async function POST(request) {
  try {
    const authHeader = request.headers.get('authorization');
    const token = authHeader?.replace('Bearer ', '');

    if (!token) {
      return Response.json(
        { message: 'No token provided' },
        { status: 401 }
      );
    }

    // Verify JWT token
    const decoded = verifyToken(token);
    if (!decoded) {
      return Response.json(
        { message: 'Invalid or expired token' },
        { status: 401 }
      );
    }

    // Get fresh user data from Firestore
    const userDoc = await getDoc(doc(db, 'users', decoded.userId));
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
    console.error('JWT verification error:', error);
    return Response.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}