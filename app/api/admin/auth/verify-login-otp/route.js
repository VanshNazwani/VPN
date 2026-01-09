import { collection, query, where, getDocs, deleteDoc, doc, getDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { generateToken } from '@/lib/auth';
import { cookies } from 'next/headers';

export async function POST(request) {
  try {
    const { email, otp } = await request.json();

    console.log('Admin login OTP verification attempt for:', email);

    // Find OTP record
    const otpQuery = query(
      collection(db, 'adminLoginOtpStore'),
      where('email', '==', email),
      where('otp', '==', otp)
    );
    
    const otpSnapshot = await getDocs(otpQuery);

    if (otpSnapshot.empty) {
      console.log('Invalid login OTP for admin:', email);
      return Response.json(
        { message: 'Invalid OTP' },
        { status: 400 }
      );
    }

    const otpDoc = otpSnapshot.docs[0];
    const otpData = otpDoc.data();

    // Check if OTP has expired
    if (new Date() > otpData.expiryAt.toDate()) {
      // Delete expired OTP
      await deleteDoc(doc(db, 'adminLoginOtpStore', otpDoc.id));
      console.log('Expired login OTP for admin:', email);
      return Response.json(
        { message: 'OTP has expired. Please request a new one.' },
        { status: 400 }
      );
    }

    // Get admin data from Firestore
    const adminDoc = await getDoc(doc(db, 'admins', otpData.firebaseUid));
    if (!adminDoc.exists()) {
      console.error('Admin document not found in Firestore');
      return Response.json(
        { message: 'Admin data not found' },
        { status: 404 }
      );
    }

    const adminData = adminDoc.data();

    // Generate custom JWT token for API authorization
    const customToken = generateToken({
      userId: otpData.firebaseUid,
      email: adminData.email,
      fullName: adminData.fullName,
      role: 'admin',
    });

    // Set httpOnly cookie
    const cookieStore = cookies();
    cookieStore.set('auth-token', customToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60, // 7 days
      path: '/',
    });

    // Delete OTP after successful verification
    await deleteDoc(doc(db, 'adminLoginOtpStore', otpDoc.id));

    // Remove password from admin data
    const { password, ...adminWithoutPassword } = adminData;

    const responseData = {
      message: 'Admin login successful',
      token: customToken,
      user: {
        id: otpData.firebaseUid,
        ...adminWithoutPassword,
      },
    };

    console.log('Admin login successful for:', email);

    return Response.json(responseData);
  } catch (error) {
    console.error('Admin login OTP verification error:', error);
    return Response.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}