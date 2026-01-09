import { cookies } from 'next/headers';

export async function POST() {
  try {
    const cookieStore = cookies();
    
    // Delete the auth token cookie
    cookieStore.delete('auth-token');
    
    return Response.json(
      { message: 'Logged out successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Logout error:', error);
    return Response.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}