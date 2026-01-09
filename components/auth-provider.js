// // // // // // // // 'use client';

// // // // // // // // import { createContext, useContext, useEffect, useState } from 'react';
// // // // // // // // import { onAuthStateChanged } from 'firebase/auth';
// // // // // // // // import { doc, getDoc } from 'firebase/firestore';
// // // // // // // // import { auth, db } from '@/lib/firebase';

// // // // // // // // const AuthContext = createContext({});

// // // // // // // // export function AuthProvider({ children }) {
// // // // // // // //   const [user, setUser] = useState(null);
// // // // // // // //   const [loading, setLoading] = useState(true);

// // // // // // // //   useEffect(() => {
// // // // // // // //     const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
// // // // // // // //       if (firebaseUser) {
// // // // // // // //         // Get additional user data from Firestore
// // // // // // // //         const userDoc = await getDoc(doc(db, 'users', firebaseUser.uid));
// // // // // // // //         const userData = userDoc.data();

// // // // // // // //         setUser({
// // // // // // // //           ...firebaseUser,
// // // // // // // //           ...userData,
// // // // // // // //         });
// // // // // // // //       } else {
// // // // // // // //         setUser(null);
// // // // // // // //       }
// // // // // // // //       setLoading(false);
// // // // // // // //     });

// // // // // // // //     return () => unsubscribe();
// // // // // // // //   }, []);

// // // // // // // //   return (
// // // // // // // //     <AuthContext.Provider value={{ user, loading, setUser }}>
// // // // // // // //       {children}
// // // // // // // //     </AuthContext.Provider>
// // // // // // // //   );
// // // // // // // // }

// // // // // // // // export const useAuth = () => useContext(AuthContext);


// // // // // // // 'use client';

// // // // // // // import { createContext, useContext, useEffect, useState } from 'react';
// // // // // // // import { useRouter } from 'next/navigation';

// // // // // // // const AuthContext = createContext({});

// // // // // // // export function AuthProvider({ children }) {
// // // // // // //   const [user, setUser] = useState(null);
// // // // // // //   const [loading, setLoading] = useState(true);
// // // // // // //   const router = useRouter();

// // // // // // //   useEffect(() => {
// // // // // // //     checkAuth();
// // // // // // //   }, []);

// // // // // // //   const checkAuth = async () => {
// // // // // // //     try {
// // // // // // //       const token = getTokenFromCookie();
// // // // // // //       if (!token) {
// // // // // // //         setLoading(false);
// // // // // // //         return;
// // // // // // //       }

// // // // // // //       const response = await fetch('/api/auth/verify', {
// // // // // // //         headers: {
// // // // // // //           'Authorization': `Bearer ${token}`,
// // // // // // //         },
// // // // // // //       });

// // // // // // //       if (response.ok) {
// // // // // // //         const userData = await response.json();
// // // // // // //         setUser(userData.user);
// // // // // // //       } else {
// // // // // // //         // Clear invalid token
// // // // // // //         clearAuth();
// // // // // // //       }
// // // // // // //     } catch (error) {
// // // // // // //       console.error('Auth check error:', error);
// // // // // // //       clearAuth();
// // // // // // //     } finally {
// // // // // // //       setLoading(false);
// // // // // // //     }
// // // // // // //   };

// // // // // // //   const login = (userData, token) => {
// // // // // // //     setUser(userData);
// // // // // // //     document.cookie = `auth-token=${token}; path=/; max-age=${7 * 24 * 60 * 60}; secure; samesite=strict`;
// // // // // // //   };

// // // // // // //   const logout = () => {
// // // // // // //     setUser(null);
// // // // // // //     document.cookie = 'auth-token=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT';
// // // // // // //     router.push('/');
// // // // // // //   };

// // // // // // //   const clearAuth = () => {
// // // // // // //     setUser(null);
// // // // // // //     document.cookie = 'auth-token=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT';
// // // // // // //   };

// // // // // // //   const getTokenFromCookie = () => {
// // // // // // //     if (typeof document !== 'undefined') {
// // // // // // //       const cookies = document.cookie.split(';');
// // // // // // //       for (let cookie of cookies) {
// // // // // // //         const [name, value] = cookie.trim().split('=');
// // // // // // //         if (name === 'auth-token') {
// // // // // // //           return value;
// // // // // // //         }
// // // // // // //       }
// // // // // // //     }
// // // // // // //     return null;
// // // // // // //   };

// // // // // // //   const getAuthToken = () => {
// // // // // // //     return getTokenFromCookie();
// // // // // // //   };

// // // // // // //   const value = {
// // // // // // //     user,
// // // // // // //     loading,
// // // // // // //     login,
// // // // // // //     logout,
// // // // // // //     getAuthToken,
// // // // // // //   };

// // // // // // //   return (
// // // // // // //     <AuthContext.Provider value={value}>
// // // // // // //       {children}
// // // // // // //     </AuthContext.Provider>
// // // // // // //   );
// // // // // // // }

// // // // // // // export const useAuth = () => {
// // // // // // //   const context = useContext(AuthContext);
// // // // // // //   if (!context) {
// // // // // // //     throw new Error('useAuth must be used within an AuthProvider');
// // // // // // //   }
// // // // // // //   return context;
// // // // // // // };

// // // // // // 'use client';

// // // // // // import { createContext, useContext, useEffect, useState } from 'react';
// // // // // // import { useRouter } from 'next/navigation';

// // // // // // const AuthContext = createContext({});

// // // // // // export function AuthProvider({ children }) {
// // // // // //   const [user, setUser] = useState(null);
// // // // // //   const [loading, setLoading] = useState(true);
// // // // // //   const router = useRouter();

// // // // // //   useEffect(() => {
// // // // // //     checkAuth();
// // // // // //   }, []);

// // // // // //   const checkAuth = async () => {
// // // // // //     try {
// // // // // //       const token = getTokenFromCookie();
// // // // // //       if (!token) {
// // // // // //         setLoading(false);
// // // // // //         return;
// // // // // //       }

// // // // // //       const response = await fetch('/api/auth/verify', {
// // // // // //         headers: {
// // // // // //           'Authorization': `Bearer ${token}`,
// // // // // //         },
// // // // // //       });

// // // // // //       if (response.ok) {
// // // // // //         const userData = await response.json();
// // // // // //         setUser(userData.user);
// // // // // //       } else {
// // // // // //         // Clear invalid token
// // // // // //         clearAuth();
// // // // // //       }
// // // // // //     } catch (error) {
// // // // // //       console.error('Auth check error:', error);
// // // // // //       clearAuth();
// // // // // //     } finally {
// // // // // //       setLoading(false);
// // // // // //     }
// // // // // //   };

// // // // // //   const login = (userData, token) => {
// // // // // //     setUser(userData);
// // // // // //     document.cookie = `auth-token=${token}; path=/; max-age=${7 * 24 * 60 * 60}; secure; samesite=strict`;
// // // // // //   };

// // // // // //   const logout = () => {
// // // // // //     setUser(null);
// // // // // //     document.cookie = 'auth-token=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT';
// // // // // //     router.push('/');
// // // // // //   };

// // // // // //   const clearAuth = () => {
// // // // // //     setUser(null);
// // // // // //     document.cookie = 'auth-token=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT';
// // // // // //   };

// // // // // //   const getTokenFromCookie = () => {
// // // // // //     if (typeof document !== 'undefined') {
// // // // // //       const cookies = document.cookie.split(';');
// // // // // //       for (let cookie of cookies) {
// // // // // //         const [name, value] = cookie.trim().split('=');
// // // // // //         if (name === 'auth-token') {
// // // // // //           return value;
// // // // // //         }
// // // // // //       }
// // // // // //     }
// // // // // //     return null;
// // // // // //   };

// // // // // //   const getAuthToken = () => {
// // // // // //     return getTokenFromCookie();
// // // // // //   };

// // // // // //   const value = {
// // // // // //     user,
// // // // // //     loading,
// // // // // //     login,
// // // // // //     logout,
// // // // // //     getAuthToken,
// // // // // //   };

// // // // // //   return (
// // // // // //     <AuthContext.Provider value={value}>
// // // // // //       {children}
// // // // // //     </AuthContext.Provider>
// // // // // //   );
// // // // // // }

// // // // // // export const useAuth = () => {
// // // // // //   const context = useContext(AuthContext);
// // // // // //   if (!context) {
// // // // // //     throw new Error('useAuth must be used within an AuthProvider');
// // // // // //   }
// // // // // //   return context;
// // // // // // };

// // // // // 'use client';

// // // // // import { createContext, useContext, useEffect, useState } from 'react';
// // // // // import { useRouter } from 'next/navigation';

// // // // // const AuthContext = createContext({});

// // // // // export function AuthProvider({ children }) {
// // // // //   const [user, setUser] = useState(null);
// // // // //   const [loading, setLoading] = useState(true);
// // // // //   const router = useRouter();

// // // // //   useEffect(() => {
// // // // //     checkAuth();
// // // // //   }, []);

// // // // //   const checkAuth = async () => {
// // // // //     try {
// // // // //       const token = getTokenFromCookie();
// // // // //       console.log('checkAuth - token:', token);
// // // // //       if (!token) {
// // // // //         setLoading(false);
// // // // //         return;
// // // // //       }

// // // // //       const response = await fetch('/api/auth/verify', {
// // // // //         method: 'POST', // Changed to POST to match sample verify endpoint
// // // // //         headers: {
// // // // //           'Authorization': `Bearer ${token}`,
// // // // //           'Content-Type': 'application/json',
// // // // //         },
// // // // //       });
// // // // //       console.log('checkAuth - response:', response.status, await response.text());

// // // // //       if (response.ok) {
// // // // //         const userData = await response.json();
// // // // //         console.log('checkAuth - userData:', userData);
// // // // //         setUser(userData.user);
// // // // //       } else {
// // // // //         clearAuth();
// // // // //       }
// // // // //     } catch (error) {
// // // // //       console.error('Auth check error:', error);
// // // // //       clearAuth();
// // // // //     } finally {
// // // // //       setLoading(false);
// // // // //     }
// // // // //   };

// // // // //   const login = async (userData, token) => {
// // // // //     console.log('AuthProvider login called with:', { userData, token });
// // // // //     setUser(userData);
// // // // //     document.cookie = `auth-token=${token}; path=/; max-age=${7 * 24 * 60 * 60}; secure; samesite=strict`;
// // // // //     console.log('Cookie set:', document.cookie);
// // // // //   };

// // // // //   const logout = () => {
// // // // //     console.log('Logging out');
// // // // //     setUser(null);
// // // // //     document.cookie = 'auth-token=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT';
// // // // //     router.push('/');
// // // // //   };

// // // // //   const clearAuth = () => {
// // // // //     console.log('Clearing auth');
// // // // //     setUser(null);
// // // // //     document.cookie = 'auth-token=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT';
// // // // //   };

// // // // //   const getTokenFromCookie = () => {
// // // // //     if (typeof document !== 'undefined') {
// // // // //       const cookies = document.cookie.split(';');
// // // // //       for (let cookie of cookies) {
// // // // //         const [name, value] = cookie.trim().split('=');
// // // // //         if (name === 'auth-token') {
// // // // //           return value;
// // // // //         }
// // // // //       }
// // // // //     }
// // // // //     return null;
// // // // //   };

// // // // //   const getAuthToken = () => {
// // // // //     const token = getTokenFromCookie();
// // // // //     console.log('getAuthToken:', token);
// // // // //     return token;
// // // // //   };

// // // // //   const value = {
// // // // //     user,
// // // // //     loading,
// // // // //     login,
// // // // //     logout,
// // // // //     getAuthToken,
// // // // //   };

// // // // //   return (
// // // // //     <AuthContext.Provider value={value}>
// // // // //       {children}
// // // // //     </AuthContext.Provider>
// // // // //   );
// // // // // }

// // // // // export const useAuth = () => {
// // // // //   const context = useContext(AuthContext);
// // // // //   if (!context) {
// // // // //     throw new Error('useAuth must be used within an AuthProvider');
// // // // //   }
// // // // //   return context;
// // // // // };
// // // // 'use client';

// // // // import { createContext, useContext, useEffect, useState } from 'react';
// // // // import { useRouter } from 'next/navigation';

// // // // const AuthContext = createContext({});

// // // // export function AuthProvider({ children }) {
// // // //   const [user, setUser] = useState(null);
// // // //   const [loading, setLoading] = useState(true);
// // // //   const router = useRouter();

// // // //   useEffect(() => {
// // // //     checkAuth();
// // // //   }, []);

// // // //   const checkAuth = async () => {
// // // //     try {
// // // //       const token = getTokenFromCookie();
// // // //       if (!token) {
// // // //         setLoading(false);
// // // //         return;
// // // //       }

// // // //       const response = await fetch('/api/auth/verify', {
// // // //         method: 'POST',
// // // //         headers: {
// // // //           'Authorization': `Bearer ${token}`,
// // // //           'Content-Type': 'application/json',
// // // //         },
// // // //       });

// // // //       if (response.ok) {
// // // //         const userData = await response.json();
// // // //         setUser(userData.user);
// // // //       } else {
// // // //         clearAuth();
// // // //       }
// // // //     } catch (error) {
// // // //       console.error('Auth check error:', error);
// // // //       clearAuth();
// // // //     } finally {
// // // //       setLoading(false);
// // // //     }
// // // //   };

// // // //   const login = async (userData, token) => {
// // // //     try {
// // // //       // Set user state first
// // // //       setUser(userData);

// // // //       // Set cookie with proper settings
// // // //       const cookieValue = `auth-token=${token}; path=/; max-age=${7 * 24 * 60 * 60}; SameSite=Strict`;
// // // //       document.cookie = cookieValue;

// // // //       // Small delay to ensure state is updated
// // // //       await new Promise(resolve => setTimeout(resolve, 100));

// // // //       return true;
// // // //     } catch (error) {
// // // //       console.error('Login error:', error);
// // // //       return false;
// // // //     }
// // // //   };

// // // //   const logout = () => {
// // // //     setUser(null);
// // // //     document.cookie = 'auth-token=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT; SameSite=Strict';
// // // //     router.push('/');
// // // //   };

// // // //   const clearAuth = () => {
// // // //     setUser(null);
// // // //     document.cookie = 'auth-token=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT; SameSite=Strict';
// // // //   };

// // // //   const getTokenFromCookie = () => {
// // // //     if (typeof document !== 'undefined') {
// // // //       const cookies = document.cookie.split(';');
// // // //       for (let cookie of cookies) {
// // // //         const [name, value] = cookie.trim().split('=');
// // // //         if (name === 'auth-token') {
// // // //           return value;
// // // //         }
// // // //       }
// // // //     }
// // // //     return null;
// // // //   };

// // // //   const getAuthToken = () => {
// // // //     return getTokenFromCookie();
// // // //   };

// // // //   const value = {
// // // //     user,
// // // //     loading,
// // // //     login,
// // // //     logout,
// // // //     getAuthToken,
// // // //   };

// // // //   return (
// // // //     <AuthContext.Provider value={value}>
// // // //       {children}
// // // //     </AuthContext.Provider>
// // // //   );
// // // // }

// // // // export const useAuth = () => {
// // // //   const context = useContext(AuthContext);
// // // //   if (!context) {
// // // //     throw new Error('useAuth must be used within an AuthProvider');
// // // //   }
// // // //   return context;
// // // // };

// // // 'use client';

// // // import { createContext, useContext, useEffect, useState } from 'react';
// // // import { useRouter } from 'next/navigation';
// // // import { onAuthStateChanged, signOut } from 'firebase/auth';
// // // import { auth } from '@/lib/firebase';

// // // const AuthContext = createContext({});

// // // export function AuthProvider({ children }) {
// // //   const [user, setUser] = useState(null);
// // //   const [loading, setLoading] = useState(true);
// // //   const router = useRouter();

// // //   useEffect(() => {
// // //     const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
// // //       console.log('Firebase auth state changed:', firebaseUser);

// // //       if (firebaseUser) {
// // //         // Firebase user exists, get additional data from our API
// // //         try {
// // //           const token = await firebaseUser.getIdToken();
// // //           const response = await fetch('/api/auth/verify', {
// // //             method: 'POST',
// // //             headers: {
// // //               'Authorization': `Bearer ${token}`,
// // //               'Content-Type': 'application/json',
// // //             },
// // //           });

// // //           if (response.ok) {
// // //             const userData = await response.json();
// // //             setUser(userData.user);
// // //             // Store our custom JWT token
// // //             if (userData.customToken) {
// // //               document.cookie = `auth-token=${userData.customToken}; path=/; max-age=${7 * 24 * 60 * 60}; secure; samesite=strict`;
// // //             }
// // //           } else {
// // //             await signOut(auth);
// // //             setUser(null);
// // //           }
// // //         } catch (error) {
// // //           console.error('Error verifying user:', error);
// // //           setUser(null);
// // //         }
// // //       } else {
// // //         setUser(null);
// // //         clearAuth();
// // //       }
// // //       setLoading(false);
// // //     });

// // //     return unsubscribe;
// // //   }, []);

// // //   const login = async (userData, customToken) => {
// // //     console.log('AuthProvider login called with:', { userData, customToken });
// // //     setUser(userData);
// // //     if (customToken) {
// // //       document.cookie = `auth-token=${customToken}; path=/; max-age=${7 * 24 * 60 * 60}; secure; samesite=strict`;
// // //     }
// // //   };

// // //   const logout = async () => {
// // //     console.log('Logging out');
// // //     try {
// // //       await signOut(auth);
// // //       setUser(null);
// // //       clearAuth();
// // //       router.push('/');
// // //     } catch (error) {
// // //       console.error('Logout error:', error);
// // //     }
// // //   };

// // //   const clearAuth = () => {
// // //     console.log('Clearing auth');
// // //     document.cookie = 'auth-token=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT';
// // //   };

// // //   const getTokenFromCookie = () => {
// // //     if (typeof document !== 'undefined') {
// // //       const cookies = document.cookie.split(';');
// // //       for (let cookie of cookies) {
// // //         const [name, value] = cookie.trim().split('=');
// // //         if (name === 'auth-token') {
// // //           return value;
// // //         }
// // //       }
// // //     }
// // //     return null;
// // //   };

// // //   const getAuthToken = () => {
// // //     const token = getTokenFromCookie();
// // //     console.log('getAuthToken:', token);
// // //     return token;
// // //   };

// // //   const value = {
// // //     user,
// // //     loading,
// // //     login,
// // //     logout,
// // //     getAuthToken,
// // //   };

// // //   return (
// // //     <AuthContext.Provider value={value}>
// // //       {children}
// // //     </AuthContext.Provider>
// // //   );
// // // }

// // // export const useAuth = () => {
// // //   const context = useContext(AuthContext);
// // //   if (!context) {
// // //     throw new Error('useAuth must be used within an AuthProvider');
// // //   }
// // //   return context;
// // // };
// // 'use client';

// // import { createContext, useContext, useEffect, useState } from 'react';
// // import { useRouter } from 'next/navigation';
// // import { onAuthStateChanged, signOut } from 'firebase/auth';
// // import { auth } from '@/lib/firebase';

// // const AuthContext = createContext({});

// // export function AuthProvider({ children }) {
// //   const [user, setUser] = useState(null);
// //   const [loading, setLoading] = useState(true);
// //   const router = useRouter();

// //   useEffect(() => {
// //     const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
// //       console.log('Firebase auth state changed:', firebaseUser?.uid);

// //       if (firebaseUser) {
// //         // Firebase user exists, get additional data from our API
// //         try {
// //           const token = await firebaseUser.getIdToken();
// //           const response = await fetch('/api/auth/verify', {
// //             method: 'POST',
// //             headers: {
// //               'Authorization': `Bearer ${token}`,
// //               'Content-Type': 'application/json',
// //             },
// //           });

// //           if (response.ok) {
// //             const userData = await response.json();
// //             console.log('User data verified:', userData.user.email);
// //             setUser(userData.user);
// //           } else {
// //             console.log('Verification failed, signing out');
// //             await signOut(auth);
// //             setUser(null);
// //           }
// //         } catch (error) {
// //           console.error('Error verifying user:', error);
// //           setUser(null);
// //         }
// //       } else {
// //         setUser(null);
// //         // Clear auth token on client side as well
// //         document.cookie = 'auth-token=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT';
// //       }
// //       setLoading(false);
// //     });

// //     return unsubscribe;
// //   }, []);

// //   const login = async (userData) => {
// //     console.log('AuthProvider login called with:', userData);
// //     setUser(userData);
// //     // Don't set cookies here - they're set server-side now
// //   };

// //   const logout = async () => {
// //     console.log('Logging out');
// //     try {
// //       // Call logout API to clear server-side cookie
// //       await fetch('/api/auth/logout', { method: 'POST' });

// //       // Sign out from Firebase
// //       await signOut(auth);

// //       setUser(null);

// //       // Clear client-side cookie as backup
// //       document.cookie = 'auth-token=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT';

// //       router.push('/');
// //     } catch (error) {
// //       console.error('Logout error:', error);
// //     }
// //   };

// //   const value = {
// //     user,
// //     loading,
// //     login,
// //     logout,
// //   };

// //   return (
// //     <AuthContext.Provider value={value}>
// //       {children}
// //     </AuthContext.Provider>
// //   );
// // }

// // export const useAuth = () => {
// //   const context = useContext(AuthContext);
// //   if (!context) {
// //     throw new Error('useAuth must be used within an AuthProvider');
// //   }
// //   return context;
// // };

// 'use client';

// import { createContext, useContext, useEffect, useState } from 'react';
// import { useRouter } from 'next/navigation';
// import { onAuthStateChanged, signOut } from 'firebase/auth';
// import { auth } from '@/lib/firebase';

// const AuthContext = createContext({});

// export function AuthProvider({ children }) {
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const router = useRouter();

//   // Set auth token as httpOnly-style cookie
//   const setAuthCookie = (token) => {
//     if (typeof document !== 'undefined') {
//       const expires = new Date();
//       expires.setTime(expires.getTime() + (7 * 24 * 60 * 60 * 1000)); // 7 days
//       document.cookie = `auth-token=${token}; expires=${expires.toUTCString()}; path=/; secure; samesite=strict`;
//     }
//   };

//   // Clear auth cookie
//   const clearAuthCookie = () => {
//     if (typeof document !== 'undefined') {
//       document.cookie = 'auth-token=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT; secure; samesite=strict';
//     }
//   };

//   // Get token from cookie
//   const getTokenFromCookie = () => {
//     if (typeof document !== 'undefined') {
//       const cookies = document.cookie.split(';');
//       for (let cookie of cookies) {
//         const [name, value] = cookie.trim().split('=');
//         if (name === 'auth-token') {
//           return value;
//         }
//       }
//     }
//     return null;
//   };

//   // Initialize auth state
//   useEffect(() => {
//     const initializeAuth = async () => {
//       try {
//         // First check if we have a stored JWT token
//         const storedToken = getTokenFromCookie();

//         if (storedToken) {
//           // Verify the stored token
//           const response = await fetch('/api/auth/verify-jwt', {
//             method: 'POST',
//             headers: {
//               'Content-Type': 'application/json',
//               'Authorization': `Bearer ${storedToken}`,
//             },
//           });

//           if (response.ok) {
//             const userData = await response.json();
//             setUser(userData.user);
//             setLoading(false);
//             return;
//           } else {
//             // Token is invalid, clear it
//             clearAuthCookie();
//           }
//         }

//         // If no valid stored token, listen to Firebase auth state
//         const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
//           console.log('Firebase auth state changed:', firebaseUser?.uid);

//           if (firebaseUser && firebaseUser.emailVerified) {
//             try {
//               // Get Firebase ID token
//               const idToken = await firebaseUser.getIdToken();

//               // Verify with our backend and get custom JWT
//               const response = await fetch('/api/auth/verify', {
//                 method: 'POST',
//                 headers: {
//                   'Authorization': `Bearer ${idToken}`,
//                   'Content-Type': 'application/json',
//                 },
//               });

//               if (response.ok) {
//                 const data = await response.json();
//                 setUser(data.user);
//                 if (data.customToken) {
//                   setAuthCookie(data.customToken);
//                 }
//               } else {
//                 console.log('Token verification failed');
//                 await signOut(auth);
//                 setUser(null);
//                 clearAuthCookie();
//               }
//             } catch (error) {
//               console.error('Error verifying Firebase user:', error);
//               setUser(null);
//               clearAuthCookie();
//             }
//           } else {
//             console.log('No Firebase user or email not verified');
//             setUser(null);
//             clearAuthCookie();
//           }
//           setLoading(false);
//         });

//         return unsubscribe;
//       } catch (error) {
//         console.error('Auth initialization error:', error);
//         setLoading(false);
//       }
//     };

//     initializeAuth();
//   }, []);

//   const login = async (userData, customToken) => {
//     console.log('AuthProvider login called with:', { userData: userData?.id, hasToken: !!customToken });

//     try {
//       setUser(userData);
//       if (customToken) {
//         setAuthCookie(customToken);
//       }

//       // Navigate based on role
//       const redirectPath = userData.role === "admin" ? "/admin" : "/dashboard";
//       console.log('Navigating to:', redirectPath);

//       // Use replace to prevent back button issues
//       setTimeout(() => {
//         router.replace(redirectPath);
//       }, 1000);

//       return true;
//     } catch (error) {
//       console.error('Login error in AuthProvider:', error);
//       return false;
//     }
//   };

//   const logout = async () => {
//     console.log('Logging out...');
//     try {
//       // Sign out from Firebase
//       await signOut(auth);

//       // Clear local state
//       setUser(null);
//       clearAuthCookie();

//       // Navigate to home
//       router.push('/');

//       console.log('Logout completed');
//     } catch (error) {
//       console.error('Logout error:', error);
//     }
//   };

//   const getAuthToken = () => {
//     return getTokenFromCookie();
//   };

//   const value = {
//     user,
//     loading,
//     login,
//     logout,
//     getAuthToken,
//   };

//   return (
//     <AuthContext.Provider value={value}>
//       {children}
//     </AuthContext.Provider>
//   );
// }

// export const useAuth = () => {
//   const context = useContext(AuthContext);
//   if (!context) {
//     throw new Error('useAuth must be used within an AuthProvider');
//   }
//   return context;
// };

'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

const AuthContext = createContext({});

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  // Initialize auth state on mount
  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    try {
      // Check if user is authenticated by calling a protected endpoint
      const response = await fetch('/api/auth/me', {
        credentials: 'include',
      });

      if (response.ok) {
        const userData = await response.json();
        setUser(userData.user);
      } else {
        setUser(null);
      }
    } catch (error) {
      console.error('Error checking auth status:', error);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const login = async (userData, customToken) => {
    console.log('AuthProvider login called with:', { userData: userData?.id, hasToken: !!customToken });

    try {
      setUser(userData);

      // Navigate based on role
      const redirectPath = "/dashboard";
      console.log('Navigating to:', redirectPath);

      // Use replace to prevent back button issues
      router.replace(redirectPath);
      return true;
    } catch (error) {
      console.error('Login error in AuthProvider:', error);
      return false;
    }
  };

  const logout = async () => {
    console.log('Logging out...');
    try {
      // Call logout API to clear server-side cookies
      await fetch('/api/auth/logout', {
        method: 'POST',
        credentials: 'include',
      });

      // Clear local state
      setUser(null);

      // Navigate to home
      router.push('/auth/login');

      console.log('Logout completed');
    } catch (error) {
      console.error('Logout error:', error);
      // Even if API call fails, clear local state and redirect
      setUser(null);
      router.push('/auth/login');
    }
  };

  const getAuthToken = () => {
    // Since we're using httpOnly cookies, we can't access the token client-side
    // This function is kept for compatibility but returns null
    return null;
  };

  const value = {
    user,
    loading,
    login,
    logout,
    getAuthToken,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};