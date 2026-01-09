import { collection, query, where, getDocs, updateDoc, doc, deleteDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';

export async function POST(request) {
  try {
    const { email, otp } = await request.json();

    console.log('Admin OTP verification attempt for:', email);

    // Find OTP record
    const otpQuery = query(
      collection(db, 'adminOtpStore'),
      where('email', '==', email),
      where('otp', '==', otp)
    );
    
    const otpSnapshot = await getDocs(otpQuery);

    if (otpSnapshot.empty) {
      console.log('Invalid OTP for admin:', email);
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
      await deleteDoc(doc(db, 'adminOtpStore', otpDoc.id));
      console.log('Expired OTP for admin:', email);
      return Response.json(
        { message: 'OTP has expired. Please request a new one.' },
        { status: 400 }
      );
    }

    // Update admin verification status using Firebase UID
    if (otpData.firebaseUid) {
      await updateDoc(doc(db, 'admins', otpData.firebaseUid), {
        isVerified: true,
        verifiedAt: new Date(),
      });
      console.log('Admin verified:', email);
    } else {
      // Fallback: Find admin by email (for backward compatibility)
      const adminsQuery = query(collection(db, 'admins'), where('email', '==', email));
      const adminsSnapshot = await getDocs(adminsQuery);

      if (!adminsSnapshot.empty) {
        const adminDoc = adminsSnapshot.docs[0];
        await updateDoc(doc(db, 'admins', adminDoc.id), {
          isVerified: true,
          verifiedAt: new Date(),
        });
        console.log('Admin verified (fallback):', email);
      }
    }

    // Delete OTP after successful verification
    await deleteDoc(doc(db, 'adminOtpStore', otpDoc.id));

    return Response.json(
      { message: 'Admin account verified successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Admin OTP verification error:', error);
    return Response.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}