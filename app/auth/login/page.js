// // // // // // 'use client';

// // // // // // import { useState, useEffect } from 'react';
// // // // // // import { motion } from 'framer-motion';
// // // // // // import { useRouter } from 'next/navigation';
// // // // // // import Link from 'next/link';
// // // // // // import { toast } from 'sonner';
// // // // // // import { Eye, EyeOff, Mail, Lock, ArrowRight } from 'lucide-react';
// // // // // // import { Button } from '@/components/ui/button';
// // // // // // import { Input } from '@/components/ui/input';
// // // // // // import { Label } from '@/components/ui/label';
// // // // // // import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
// // // // // // import { useAuth } from '@/components/auth-provider';

// // // // // // export default function LoginPage() {
// // // // // //   const [email, setEmail] = useState('');
// // // // // //   const [password, setPassword] = useState('');
// // // // // //   const [showPassword, setShowPassword] = useState(false);
// // // // // //   const [isLoading, setIsLoading] = useState(false);
// // // // // //   const [turnstileToken, setTurnstileToken] = useState('');
// // // // // //   const router = useRouter();
// // // // // //   const { user } = useAuth();

// // // // // //   useEffect(() => {
// // // // // //     if (user) {
// // // // // //       router.push('/dashboard');
// // // // // //     }
// // // // // //   }, [user, router]);

// // // // // //   useEffect(() => {
// // // // // //     // Load Cloudflare Turnstile script
// // // // // //     const script = document.createElement('script');
// // // // // //     script.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js';
// // // // // //     script.async = true;
// // // // // //     document.head.appendChild(script);

// // // // // //     return () => {
// // // // // //       document.head.removeChild(script);
// // // // // //     };
// // // // // //   }, []);

// // // // // //   const handleSubmit = async (e) => {
// // // // // //     e.preventDefault();

// // // // // //     if (!email || !password) {
// // // // // //       toast.error('Please fill in all fields');
// // // // // //       return;
// // // // // //     }

// // // // // //     if (!turnstileToken) {
// // // // // //       toast.error('Please complete the verification');
// // // // // //       return;
// // // // // //     }

// // // // // //     setIsLoading(true);

// // // // // //     try {
// // // // // //       const response = await fetch('/api/auth/login', {
// // // // // //         method: 'POST',
// // // // // //         headers: {
// // // // // //           'Content-Type': 'application/json',
// // // // // //         },
// // // // // //         body: JSON.stringify({
// // // // // //           email,
// // // // // //           password,
// // // // // //           turnstileToken,
// // // // // //         }),
// // // // // //       });

// // // // // //       const data = await response.json();

// // // // // //       if (response.ok) {
// // // // // //         toast.success('Login successful!');

// // // // // //         // Set auth cookie
// // // // // //         document.cookie = `auth-token=${data.token}; path=/; max-age=${7 * 24 * 60 * 60}`;

// // // // // //         // Redirect based on role
// // // // // //         if (data.user.role === 'admin') {
// // // // // //           router.push('/admin');
// // // // // //         } else {
// // // // // //           router.push('/dashboard');
// // // // // //         }
// // // // // //       } else {
// // // // // //         toast.error(data.message || 'Login failed');
// // // // // //       }
// // // // // //     } catch (error) {
// // // // // //       console.error('Login error:', error);
// // // // // //       toast.error('Something went wrong. Please try again.');
// // // // // //     } finally {
// // // // // //       setIsLoading(false);
// // // // // //     }
// // // // // //   };

// // // // // //   return (
// // // // // //     <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/10 via-background to-secondary/10 p-4">
// // // // // //       <motion.div
// // // // // //         initial={{ opacity: 0, y: 30 }}
// // // // // //         animate={{ opacity: 1, y: 0 }}
// // // // // //         transition={{ duration: 0.6 }}
// // // // // //         className="w-full max-w-md"
// // // // // //       >
// // // // // //         <Card className="shadow-xl">
// // // // // //           <CardHeader className="text-center">
// // // // // //             <CardTitle className="text-2xl font-bold">Welcome Back</CardTitle>
// // // // // //             <CardDescription>
// // // // // //               Sign in to your account to continue learning
// // // // // //             </CardDescription>
// // // // // //           </CardHeader>

// // // // // //           <CardContent>
// // // // // //             <form onSubmit={handleSubmit} className="space-y-6">
// // // // // //               <div className="space-y-2">
// // // // // //                 <Label htmlFor="email">Email</Label>
// // // // // //                 <div className="relative">
// // // // // //                   <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
// // // // // //                   <Input
// // // // // //                     id="email"
// // // // // //                     type="email"
// // // // // //                     placeholder="Enter your email"
// // // // // //                     value={email}
// // // // // //                     onChange={(e) => setEmail(e.target.value)}
// // // // // //                     className="pl-10"
// // // // // //                     required
// // // // // //                   />
// // // // // //                 </div>
// // // // // //               </div>

// // // // // //               <div className="space-y-2">
// // // // // //                 <Label htmlFor="password">Password</Label>
// // // // // //                 <div className="relative">
// // // // // //                   <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
// // // // // //                   <Input
// // // // // //                     id="password"
// // // // // //                     type={showPassword ? 'text' : 'password'}
// // // // // //                     placeholder="Enter your password"
// // // // // //                     value={password}
// // // // // //                     onChange={(e) => setPassword(e.target.value)}
// // // // // //                     className="pl-10 pr-10"
// // // // // //                     required
// // // // // //                   />
// // // // // //                   <button
// // // // // //                     type="button"
// // // // // //                     onClick={() => setShowPassword(!showPassword)}
// // // // // //                     className="absolute right-3 top-3 text-muted-foreground hover:text-primary"
// // // // // //                   >
// // // // // //                     {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
// // // // // //                   </button>
// // // // // //                 </div>
// // // // // //               </div>

// // // // // //               {/* Cloudflare Turnstile */}
// // // // // //               <div className="flex justify-center">
// // // // // //                 <div 
// // // // // //                   className="cf-turnstile"
// // // // // //                   data-sitekey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY}
// // // // // //                   data-callback={(token) => setTurnstileToken(token)}
// // // // // //                 ></div>
// // // // // //               </div>

// // // // // //               <Button type="submit" className="w-full" disabled={isLoading}>
// // // // // //                 {isLoading ? (
// // // // // //                   'Signing in...'
// // // // // //                 ) : (
// // // // // //                   <>
// // // // // //                     Sign In
// // // // // //                     <ArrowRight className="ml-2 h-4 w-4" />
// // // // // //                   </>
// // // // // //                 )}
// // // // // //               </Button>
// // // // // //             </form>
// // // // // //           </CardContent>

// // // // // //           <div className="px-6 pb-4">
// // // // // //             <div className="relative">
// // // // // //               <div className="absolute inset-0 flex items-center">
// // // // // //                 <span className="w-full border-t" />
// // // // // //               </div>
// // // // // //               <div className="relative flex justify-center text-xs uppercase">
// // // // // //                 <span className="bg-background px-2 text-muted-foreground">
// // // // // //                   Or continue with
// // // // // //                 </span>
// // // // // //               </div>
// // // // // //             </div>
// // // // // //             <Button
// // // // // //               type="button"
// // // // // //               variant="outline"
// // // // // //               className="w-full mt-4"
// // // // // //               onClick={() => toast.info('Google Auth integration coming soon!')}
// // // // // //             >
// // // // // //               <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
// // // // // //                 <path
// // // // // //                   fill="currentColor"
// // // // // //                   d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
// // // // // //                 />
// // // // // //                 <path
// // // // // //                   fill="currentColor"
// // // // // //                   d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
// // // // // //                 />
// // // // // //                 <path
// // // // // //                   fill="currentColor"
// // // // // //                   d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
// // // // // //                 />
// // // // // //                 <path
// // // // // //                   fill="currentColor"
// // // // // //                   d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
// // // // // //                 />
// // // // // //               </svg>
// // // // // //               Continue with Google
// // // // // //             </Button>
// // // // // //           </div>

// // // // // //           <CardFooter className="text-center">
// // // // // //             <p className="text-sm text-muted-foreground">
// // // // // //               Don&apos;t have an account?{' '}
// // // // // //               <Link href="/auth/register" className="text-primary hover:underline">
// // // // // //                 Sign up
// // // // // //               </Link>
// // // // // //             </p>
// // // // // //           </CardFooter>
// // // // // //         </Card>

// // // // // //         {/* Demo Credentials */}
// // // // // //         <Card className="mt-4 bg-muted/50">
// // // // // //           <CardContent className="p-4">
// // // // // //             <p className="text-sm text-center text-muted-foreground mb-2">Demo Credentials:</p>
// // // // // //             <div className="text-xs space-y-1">
// // // // // //               <p><strong>Student:</strong> student@demo.com / password123</p>
// // // // // //               <p><strong>Admin:</strong> admin@demo.com / admin123</p>
// // // // // //             </div>
// // // // // //           </CardContent>
// // // // // //         </Card>
// // // // // //       </motion.div>
// // // // // //     </div>
// // // // // //   );
// // // // // // }

// // // // // 'use client';

// // // // // import { useState, useEffect } from 'react';
// // // // // import { motion } from 'framer-motion';
// // // // // import { useRouter } from 'next/navigation';
// // // // // import Link from 'next/link';
// // // // // import { toast } from 'sonner';
// // // // // import { Eye, EyeOff, Mail, Lock, ArrowRight } from 'lucide-react';
// // // // // import { Button } from '@/components/ui/button';
// // // // // import { Input } from '@/components/ui/input';
// // // // // import { Label } from '@/components/ui/label';
// // // // // import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
// // // // // import { useAuth } from '@/components/auth-provider';

// // // // // export default function LoginPage() {
// // // // //   const [email, setEmail] = useState('');
// // // // //   const [password, setPassword] = useState('');
// // // // //   const [showPassword, setShowPassword] = useState(false);
// // // // //   const [isLoading, setIsLoading] = useState(false);
// // // // //   const [turnstileLoaded, setTurnstileLoaded] = useState(false);
// // // // //   const [turnstileToken, setTurnstileToken] = useState('');
// // // // //   const router = useRouter();
// // // // //   const { user, login } = useAuth();

// // // // //   useEffect(() => {
// // // // //     if (user) {
// // // // //       router.push('/dashboard');
// // // // //     }
// // // // //   }, [user, router]);

// // // // //   useEffect(() => {
// // // // //     // Load Cloudflare Turnstile script
// // // // //     if (!window.turnstile) {
// // // // //       const script = document.createElement('script');
// // // // //       script.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js';
// // // // //       script.async = true;
// // // // //       script.onload = () => {
// // // // //         setTurnstileLoaded(true);
// // // // //       };
// // // // //       document.head.appendChild(script);

// // // // //       return () => {
// // // // //         if (document.head.contains(script)) {
// // // // //           document.head.removeChild(script);
// // // // //         }
// // // // //       };
// // // // //     } else {
// // // // //       setTurnstileLoaded(true);
// // // // //     }
// // // // //   }, []);

// // // // //   useEffect(() => {
// // // // //     if (turnstileLoaded && window.turnstile) {
// // // // //       // Render turnstile widget
// // // // //       window.turnstile.render('.cf-turnstile', {
// // // // //         sitekey: process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY,
// // // // //         callback: function(token) {
// // // // //           setTurnstileToken(token);
// // // // //         },
// // // // //       });
// // // // //     }
// // // // //   }, [turnstileLoaded]);

// // // // //   const handleSubmit = async (e) => {
// // // // //     e.preventDefault();

// // // // //     if (!email || !password) {
// // // // //       toast.error('Please fill in all fields');
// // // // //       return;
// // // // //     }

// // // // //     if (!turnstileToken) {
// // // // //       toast.error('Please complete the verification');
// // // // //       return;
// // // // //     }

// // // // //     setIsLoading(true);

// // // // //     try {
// // // // //       const response = await fetch('/api/auth/login', {
// // // // //         method: 'POST',
// // // // //         headers: {
// // // // //           'Content-Type': 'application/json',
// // // // //         },
// // // // //         body: JSON.stringify({
// // // // //           email,
// // // // //           password,
// // // // //           turnstileToken,
// // // // //         }),
// // // // //       });

// // // // //       const data = await response.json();

// // // // //       if (response.ok) {
// // // // //         toast.success('Login successful!');

// // // // //         // Use the auth context login method
// // // // //         login(data.user, data.token);

// // // // //         // Redirect based on role
// // // // //         if (data.user.role === 'admin') {
// // // // //           router.push('/admin');
// // // // //         } else {
// // // // //           router.push('/dashboard');
// // // // //         }
// // // // //       } else {
// // // // //         toast.error(data.message || 'Login failed');
// // // // //         // Reset turnstile
// // // // //         if (window.turnstile) {
// // // // //           window.turnstile.reset('.cf-turnstile');
// // // // //           setTurnstileToken('');
// // // // //         }
// // // // //       }
// // // // //     } catch (error) {
// // // // //       console.error('Login error:', error);
// // // // //       toast.error('Something went wrong. Please try again.');
// // // // //     } finally {
// // // // //       setIsLoading(false);
// // // // //     }
// // // // //   };

// // // // //   return (
// // // // //     <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/10 via-background to-secondary/10 p-4">
// // // // //       <motion.div
// // // // //         initial={{ opacity: 0, y: 30 }}
// // // // //         animate={{ opacity: 1, y: 0 }}
// // // // //         transition={{ duration: 0.6 }}
// // // // //         className="w-full max-w-md"
// // // // //       >
// // // // //         <Card className="shadow-xl">
// // // // //           <CardHeader className="text-center">
// // // // //             <CardTitle className="text-2xl font-bold">Welcome Back</CardTitle>
// // // // //             <CardDescription>
// // // // //               Sign in to your account to continue learning
// // // // //             </CardDescription>
// // // // //           </CardHeader>

// // // // //           <CardContent>
// // // // //             <form onSubmit={handleSubmit} className="space-y-6">
// // // // //               <div className="space-y-2">
// // // // //                 <Label htmlFor="email">Email</Label>
// // // // //                 <div className="relative">
// // // // //                   <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
// // // // //                   <Input
// // // // //                     id="email"
// // // // //                     type="email"
// // // // //                     placeholder="Enter your email"
// // // // //                     value={email}
// // // // //                     onChange={(e) => setEmail(e.target.value)}
// // // // //                     className="pl-10"
// // // // //                     required
// // // // //                   />
// // // // //                 </div>
// // // // //               </div>

// // // // //               <div className="space-y-2">
// // // // //                 <Label htmlFor="password">Password</Label>
// // // // //                 <div className="relative">
// // // // //                   <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
// // // // //                   <Input
// // // // //                     id="password"
// // // // //                     type={showPassword ? 'text' : 'password'}
// // // // //                     placeholder="Enter your password"
// // // // //                     value={password}
// // // // //                     onChange={(e) => setPassword(e.target.value)}
// // // // //                     className="pl-10 pr-10"
// // // // //                     required
// // // // //                   />
// // // // //                   <button
// // // // //                     type="button"
// // // // //                     onClick={() => setShowPassword(!showPassword)}
// // // // //                     className="absolute right-3 top-3 text-muted-foreground hover:text-primary"
// // // // //                   >
// // // // //                     {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
// // // // //                   </button>
// // // // //                 </div>
// // // // //               </div>

// // // // //               {/* Cloudflare Turnstile */}
// // // // //               <div className="flex justify-center">
// // // // //                 <div className="cf-turnstile"></div>
// // // // //               </div>

// // // // //               <Button type="submit" className="w-full" disabled={isLoading}>
// // // // //                 {isLoading ? (
// // // // //                   'Signing in...'
// // // // //                 ) : (
// // // // //                   <>
// // // // //                     Sign In
// // // // //                     <ArrowRight className="ml-2 h-4 w-4" />
// // // // //                   </>
// // // // //                 )}
// // // // //               </Button>
// // // // //             </form>
// // // // //           </CardContent>

// // // // //           <CardFooter className="text-center">
// // // // //             <p className="text-sm text-muted-foreground">
// // // // //               Don&apos;t have an account?{' '}
// // // // //               <Link href="/auth/register" className="text-primary hover:underline">
// // // // //                 Sign up
// // // // //               </Link>
// // // // //             </p>
// // // // //           </CardFooter>
// // // // //         </Card>

// // // // //         {/* Demo Credentials */}
// // // // //         <Card className="mt-4 bg-muted/50">
// // // // //           <CardContent className="p-4">
// // // // //             <p className="text-sm text-center text-muted-foreground mb-2">Demo Credentials:</p>
// // // // //             <div className="text-xs space-y-1">
// // // // //               <p><strong>Student:</strong> student@demo.com / password123</p>
// // // // //               <p><strong>Admin:</strong> admin@demo.com / admin123</p>
// // // // //             </div>
// // // // //           </CardContent>
// // // // //         </Card>
// // // // //       </motion.div>
// // // // //     </div>
// // // // //   );
// // // // // }

// // // // 'use client';

// // // // import { useState, useEffect } from 'react';
// // // // import { motion } from 'framer-motion';
// // // // import { useRouter } from 'next/navigation';
// // // // import Link from 'next/link';
// // // // import { toast } from 'sonner';
// // // // import { Eye, EyeOff, Mail, Lock, ArrowRight } from 'lucide-react';
// // // // import { Button } from '@/components/ui/button';
// // // // import { Input } from '@/components/ui/input';
// // // // import { Label } from '@/components/ui/label';
// // // // import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
// // // // import { useAuth } from '@/components/auth-provider';

// // // // export default function LoginPage() {
// // // //   const [email, setEmail] = useState('');
// // // //   const [password, setPassword] = useState('');
// // // //   const [showPassword, setShowPassword] = useState(false);
// // // //   const [isLoading, setIsLoading] = useState(false);
// // // //   const [turnstileLoaded, setTurnstileLoaded] = useState(false);
// // // //   const [turnstileToken, setTurnstileToken] = useState('');
// // // //   const router = useRouter();
// // // //   const { user, login } = useAuth();

// // // //   // Redirect if already logged in
// // // //   useEffect(() => {
// // // //     if (!isLoading && user) {
// // // //       console.log('User state:', user);
// // // //       console.log('Redirecting to dashboard...');
// // // //       router.push(user.role === 'admin' ? '/admin' : '/dashboard');

// // // //     }
// // // //   }, [user, router]);

// // // //   // Load Cloudflare Turnstile script
// // // //   useEffect(() => {
// // // //     if (!window.turnstile) {
// // // //       const script = document.createElement('script');
// // // //       script.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js';
// // // //       script.async = true;
// // // //       script.onload = () => {
// // // //         setTurnstileLoaded(true);
// // // //       };
// // // //       script.onerror = () => {
// // // //         toast.error('Failed to load verification script');
// // // //       };
// // // //       document.head.appendChild(script);

// // // //       return () => {
// // // //         if (document.head.contains(script)) {
// // // //           document.head.removeChild(script);
// // // //         }
// // // //       };
// // // //     } else {
// // // //       setTurnstileLoaded(true);
// // // //     }
// // // //   }, []);

// // // //   // Render Turnstile widget
// // // //   useEffect(() => {
// // // //     if (turnstileLoaded && window.turnstile) {
// // // //       window.turnstile.render('.cf-turnstile', {
// // // //         sitekey: process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY,
// // // //         callback: function (token) {
// // // //           console.log('Turnstile token:', token);
// // // //           setTurnstileToken(token);
// // // //         },
// // // //       });
// // // //     }
// // // //   }, [turnstileLoaded]);

// // // //   const handleSubmit = async (e) => {
// // // //     e.preventDefault();

// // // //     if (!email || !password) {
// // // //       toast.error('Please fill in all fields');
// // // //       return;
// // // //     }

// // // //     if (!turnstileToken) {
// // // //       toast.error('Please complete the verification');
// // // //       return;
// // // //     }

// // // //     setIsLoading(true);

// // // //     try {
// // // //       const response = await fetch('/api/auth/login', {
// // // //         method: 'POST',
// // // //         headers: {
// // // //           'Content-Type': 'application/json',
// // // //         },
// // // //         body: JSON.stringify({
// // // //           email,
// // // //           password,
// // // //           turnstileToken,
// // // //         }),
// // // //       });

// // // //       const data = await response.json();
// // // //       console.log('API response:', data);

// // // //       if (response.ok) {
// // // //         if (!data.user || !data.token) {
// // // //           throw new Error('Invalid response data');
// // // //         }

// // // //         toast.success('Login successful!');
// // // //         await login(data.user, data.token); // Ensure login completes
// // // //         console.log('Login called with:', data.user, data.token);

// // // //         // Redirect based on role
// // // //          router.push(data.user.role === 'admin' ? '/admin' : '/dashboard');
// // // //         //window.location.href = data.user.role === 'admin' ? '/admin' : '/dashboard';
// // // //       } else {
// // // //         toast.error(data.message || 'Login failed');
// // // //         if (window.turnstile) {
// // // //           window.turnstile.reset('.cf-turnstile');
// // // //           setTurnstileToken('');
// // // //         }
// // // //       }
// // // //     } catch (error) {
// // // //       console.error('Login error:', error);
// // // //       toast.error('Something went wrong. Please try again.');
// // // //       if (window.turnstile) {
// // // //         window.turnstile.reset('.cf-turnstile');
// // // //         setTurnstileToken('');
// // // //       }
// // // //     } finally {
// // // //       setIsLoading(false);
// // // //     }
// // // //   };

// // // //   return (
// // // //     <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/10 via-background to-secondary/10 p-4">
// // // //       <motion.div
// // // //         initial={{ opacity: 0, y: 30 }}
// // // //         animate={{ opacity: 1, y: 0 }}
// // // //         transition={{ duration: 0.6 }}
// // // //         className="w-full max-w-md"
// // // //       >
// // // //         <Card className="shadow-xl">
// // // //           <CardHeader className="text-center">
// // // //             <CardTitle className="text-2xl font-bold">Welcome Back</CardTitle>
// // // //             <CardDescription>
// // // //               Sign in to your account to continue learning
// // // //             </CardDescription>
// // // //           </CardHeader>

// // // //           <CardContent>
// // // //             <form onSubmit={handleSubmit} className="space-y-6">
// // // //               <div className="space-y-2">
// // // //                 <Label htmlFor="email">Email</Label>
// // // //                 <div className="relative">
// // // //                   <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
// // // //                   <Input
// // // //                     id="email"
// // // //                     type="email"
// // // //                     placeholder="Enter your email"
// // // //                     value={email}
// // // //                     onChange={(e) => setEmail(e.target.value)}
// // // //                     className="pl-10"
// // // //                     required
// // // //                     disabled={isLoading}
// // // //                   />
// // // //                 </div>
// // // //               </div>

// // // //               <div className="space-y-2">
// // // //                 <Label htmlFor="password">Password</Label>
// // // //                 <div className="relative">
// // // //                   <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
// // // //                   <Input
// // // //                     id="password"
// // // //                     type={showPassword ? 'text' : 'password'}
// // // //                     placeholder="Enter your password"
// // // //                     value={password}
// // // //                     onChange={(e) => setPassword(e.target.value)}
// // // //                     className="pl-10 pr-10"
// // // //                     required
// // // //                     disabled={isLoading}
// // // //                   />
// // // //                   <button
// // // //                     type="button"
// // // //                     onClick={() => setShowPassword(!showPassword)}
// // // //                     className="absolute right-3 top-3 text-muted-foreground hover:text-primary"
// // // //                     disabled={isLoading}
// // // //                   >
// // // //                     {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
// // // //                   </button>
// // // //                 </div>
// // // //               </div>

// // // //               {/* Cloudflare Turnstile */}
// // // //               <div className="flex justify-center">
// // // //                 <div className="cf-turnstile" data-theme="auto"></div>
// // // //               </div>

// // // //               <Button type="submit" className="w-full" disabled={isLoading || !turnstileToken}>
// // // //                 {isLoading ? (
// // // //                   'Signing in...'
// // // //                 ) : (
// // // //                   <>
// // // //                     Sign In
// // // //                     <ArrowRight className="ml-2 h-4 w-4" />
// // // //                   </>
// // // //                 )}
// // // //               </Button>
// // // //             </form>
// // // //           </CardContent>

// // // //           <CardFooter className="text-center">
// // // //             <p className="text-sm text-muted-foreground">
// // // //               Don&apos;t have an account?{' '}
// // // //               <Link href="/auth/register" className="text-primary hover:underline">
// // // //                 Sign up
// // // //               </Link>
// // // //             </p>
// // // //           </CardFooter>
// // // //         </Card>

// // // //         {/* Demo Credentials */}
// // // //         <Card className="mt-4 bg-muted/50">
// // // //           <CardContent className="p-4">
// // // //             <p className="text-sm text-center text-muted-foreground mb-2">Demo Credentials:</p>
// // // //             <div className="text-xs space-y-1">
// // // //               <p><strong>Student:</strong> student@demo.com / password123</p>
// // // //               <p><strong>Admin:</strong> admin@demo.com / admin123</p>
// // // //             </div>
// // // //           </CardContent>
// // // //         </Card>
// // // //       </motion.div>
// // // //     </div>
// // // //   );
// // // // }

// // // 'use client';

// // // import { useState, useEffect } from 'react';
// // // import { motion } from 'framer-motion';
// // // import { useRouter } from 'next/navigation';
// // // import Link from 'next/link';
// // // import { toast } from 'sonner';
// // // import { Eye, EyeOff, Mail, Lock, ArrowRight } from 'lucide-react';
// // // import { Button } from '@/components/ui/button';
// // // import { Input } from '@/components/ui/input';
// // // import { Label } from '@/components/ui/label';
// // // import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
// // // import { useAuth } from '@/components/auth-provider';

// // // export default function LoginPage() {
// // //   const [email, setEmail] = useState('');
// // //   const [password, setPassword] = useState('');
// // //   const [showPassword, setShowPassword] = useState(false);
// // //   const [isLoading, setIsLoading] = useState(false);
// // //   const [turnstileLoaded, setTurnstileLoaded] = useState(false);
// // //   const [turnstileToken, setTurnstileToken] = useState('');
// // //   const router = useRouter();
// // //   const { user, login } = useAuth();

// // //   // Redirect if already logged in
// // //   useEffect(() => {
// // //     if (user && !isLoading) {
// // //       const redirectPath = user.role === 'admin' ? '/admin' : '/dashboard';
// // //       router.push(redirectPath);
// // //     }
// // //   }, [user, router, isLoading]);

// // //   // Load Cloudflare Turnstile script once
// // //   useEffect(() => {
// // //     if (typeof window !== 'undefined' && !window.turnstile && !turnstileLoaded) {
// // //       const script = document.createElement('script');
// // //       script.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js';
// // //       script.async = true;
// // //       script.onload = () => {
// // //         setTurnstileLoaded(true);
// // //       };
// // //       script.onerror = () => {
// // //         toast.error('Failed to load verification script');
// // //       };
// // //       document.head.appendChild(script);

// // //       return () => {
// // //         if (document.head.contains(script)) {
// // //           document.head.removeChild(script);
// // //         }
// // //       };
// // //     } else if (window.turnstile) {
// // //       setTurnstileLoaded(true);
// // //     }
// // //   }, [turnstileLoaded]);

// // //   // Render Turnstile widget when loaded
// // //   useEffect(() => {
// // //     if (turnstileLoaded && window.turnstile) {
// // //       // Clear any existing widget
// // //       const container = document.querySelector('.cf-turnstile');
// // //       if (container) {
// // //         container.innerHTML = '';
// // //       }

// // //       // Render new widget
// // //       setTimeout(() => {
// // //         if (window.turnstile && document.querySelector('.cf-turnstile')) {
// // //           window.turnstile.render('.cf-turnstile', {
// // //             sitekey: process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY,
// // //             callback: function (token) {
// // //               setTurnstileToken(token);
// // //             },
// // //             'error-callback': function () {
// // //               toast.error('Verification failed. Please try again.');
// // //               setTurnstileToken('');
// // //             },
// // //           });
// // //         }
// // //       }, 100);
// // //     }
// // //   }, [turnstileLoaded]);

// // //   const handleSubmit = async (e) => {
// // //     e.preventDefault();

// // //     if (!email || !password) {
// // //       toast.error('Please fill in all fields');
// // //       return;
// // //     }

// // //     if (!turnstileToken) {
// // //       toast.error('Please complete the verification');
// // //       return;
// // //     }

// // //     setIsLoading(true);

// // //     try {
// // //       const response = await fetch('/api/auth/login', {
// // //         method: 'POST',
// // //         headers: {
// // //           'Content-Type': 'application/json',
// // //         },
// // //         body: JSON.stringify({
// // //           email,
// // //           password,
// // //           turnstileToken,
// // //         }),
// // //       });

// // //       const data = await response.json();

// // //       if (response.ok) {
// // //         if (!data.user || !data.token) {
// // //           throw new Error('Invalid response data');
// // //         }

// // //         toast.success('Login successful!');

// // //         // Use the login function from AuthProvider
// // //         const loginSuccess = await login(data.user, data.token);

// // //         if (loginSuccess) {
// // //           // Navigate based on role
// // //           const redirectPath = data.user.role === 'admin' ? '/admin' : '/dashboard';
// // //           router.push(redirectPath);
// // //         } else {
// // //           throw new Error('Failed to set authentication');
// // //         }
// // //       } else {
// // //         toast.error(data.message || 'Login failed');
// // //         // Reset Turnstile
// // //         if (window.turnstile) {
// // //           window.turnstile.reset();
// // //           setTurnstileToken('');
// // //         }
// // //       }
// // //     } catch (error) {
// // //       console.error('Login error:', error);
// // //       toast.error('Something went wrong. Please try again.');
// // //       // Reset Turnstile
// // //       if (window.turnstile) {
// // //         window.turnstile.reset();
// // //         setTurnstileToken('');
// // //       }
// // //     } finally {
// // //       setIsLoading(false);
// // //     }
// // //   };

// // //   return (
// // //     <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/10 via-background to-secondary/10 p-4">
// // //       <motion.div
// // //         initial={{ opacity: 0, y: 30 }}
// // //         animate={{ opacity: 1, y: 0 }}
// // //         transition={{ duration: 0.6 }}
// // //         className="w-full max-w-md"
// // //       >
// // //         <Card className="shadow-xl">
// // //           <CardHeader className="text-center">
// // //             <CardTitle className="text-2xl font-bold">Welcome Back</CardTitle>
// // //             <CardDescription>
// // //               Sign in to your account to continue learning
// // //             </CardDescription>
// // //           </CardHeader>

// // //           <CardContent>
// // //             <form onSubmit={handleSubmit} className="space-y-6">
// // //               <div className="space-y-2">
// // //                 <Label htmlFor="email">Email</Label>
// // //                 <div className="relative">
// // //                   <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
// // //                   <Input
// // //                     id="email"
// // //                     type="email"
// // //                     placeholder="Enter your email"
// // //                     value={email}
// // //                     onChange={(e) => setEmail(e.target.value)}
// // //                     className="pl-10"
// // //                     required
// // //                     disabled={isLoading}
// // //                   />
// // //                 </div>
// // //               </div>

// // //               <div className="space-y-2">
// // //                 <Label htmlFor="password">Password</Label>
// // //                 <div className="relative">
// // //                   <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
// // //                   <Input
// // //                     id="password"
// // //                     type={showPassword ? 'text' : 'password'}
// // //                     placeholder="Enter your password"
// // //                     value={password}
// // //                     onChange={(e) => setPassword(e.target.value)}
// // //                     className="pl-10 pr-10"
// // //                     required
// // //                     disabled={isLoading}
// // //                   />
// // //                   <button
// // //                     type="button"
// // //                     onClick={() => setShowPassword(!showPassword)}
// // //                     className="absolute right-3 top-3 text-muted-foreground hover:text-primary"
// // //                     disabled={isLoading}
// // //                   >
// // //                     {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
// // //                   </button>
// // //                 </div>
// // //               </div>

// // //               {/* Cloudflare Turnstile */}
// // //               <div className="flex justify-center">
// // //                 <div className="cf-turnstile" data-theme="auto"></div>
// // //               </div>

// // //               <Button type="submit" className="w-full" disabled={isLoading || !turnstileToken}>
// // //                 {isLoading ? (
// // //                   'Signing in...'
// // //                 ) : (
// // //                   <>
// // //                     Sign In
// // //                     <ArrowRight className="ml-2 h-4 w-4" />
// // //                   </>
// // //                 )}
// // //               </Button>
// // //             </form>
// // //           </CardContent>

// // //           <CardFooter className="text-center">
// // //             <p className="text-sm text-muted-foreground">
// // //               Don&apos;t have an account?{' '}
// // //               <Link href="/auth/register" className="text-primary hover:underline">
// // //                 Sign up
// // //               </Link>
// // //             </p>
// // //           </CardFooter>
// // //         </Card>

// // //         {/* Demo Credentials */}
// // //         <Card className="mt-4 bg-muted/50">
// // //           <CardContent className="p-4">
// // //             <p className="text-sm text-center text-muted-foreground mb-2">Demo Credentials:</p>
// // //             <div className="text-xs space-y-1">
// // //               <p><strong>Student:</strong> student@demo.com / password123</p>
// // //               <p><strong>Admin:</strong> admin@demo.com / admin123</p>
// // //             </div>
// // //           </CardContent>
// // //         </Card>
// // //       </motion.div>
// // //     </div>
// // //   );
// // // }
// // 'use client';

// // import { useState, useEffect } from 'react';
// // import { motion } from 'framer-motion';
// // import { useRouter } from 'next/navigation';
// // import Link from 'next/link';
// // import { toast } from 'sonner';
// // import { Eye, EyeOff, Mail, Lock, ArrowRight } from 'lucide-react';
// // import { Button } from '@/components/ui/button';
// // import { Input } from '@/components/ui/input';
// // import { Label } from '@/components/ui/label';
// // import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
// // import { useAuth } from '@/components/auth-provider';

// // export default function LoginPage() {
// //   const [email, setEmail] = useState('');
// //   const [password, setPassword] = useState('');
// //   const [showPassword, setShowPassword] = useState(false);
// //   const [isLoading, setIsLoading] = useState(false);
// //   const [turnstileLoaded, setTurnstileLoaded] = useState(false);
// //   const [turnstileToken, setTurnstileToken] = useState('');
// //   const router = useRouter();
// //   const { user, login } = useAuth();

// //   // Redirect if already logged in
// //   useEffect(() => {
// //     if (user) {
// //       console.log('User already logged in, redirecting...');
// //       const redirectPath = user.role === 'admin' ? '/admin' : '/dashboard';
// //       router.push(redirectPath);
// //     }
// //   }, [user, router]);

// //   // Load Cloudflare Turnstile script only once
// //   useEffect(() => {
// //     if (!window.turnstile && !document.querySelector('script[src*="turnstile"]')) {
// //       const script = document.createElement('script');
// //       script.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js';
// //       script.async = true;
// //       script.onload = () => {
// //         setTurnstileLoaded(true);
// //       };
// //       script.onerror = () => {
// //         toast.error('Failed to load verification script');
// //       };
// //       document.head.appendChild(script);

// //       return () => {
// //         if (document.head.contains(script)) {
// //           document.head.removeChild(script);
// //         }
// //       };
// //     } else {
// //       setTurnstileLoaded(true);
// //     }
// //   }, []);

// //   // Render Turnstile widget once script is loaded
// //   useEffect(() => {
// //     if (turnstileLoaded && window.turnstile && !turnstileToken) {
// //       const existingWidget = document.querySelector('.cf-turnstile');
// //       if (existingWidget && !existingWidget.hasChildNodes()) {
// //         try {
// //           window.turnstile.render('.cf-turnstile', {
// //             sitekey: process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY,
// //             callback: function (token) {
// //               console.log('Turnstile token:', token);
// //               setTurnstileToken(token);
// //             },
// //             'error-callback': function (error) {
// //               console.error('Turnstile error:', error);
// //               toast.error('Verification failed. Please refresh the page.');
// //             }
// //           });
// //         } catch (error) {
// //           console.error('Error rendering Turnstile:', error);
// //         }
// //       }
// //     }
// //   }, [turnstileLoaded, turnstileToken]);

// //   const handleSubmit = async (e) => {
// //     e.preventDefault();

// //     if (!email || !password) {
// //       toast.error('Please fill in all fields');
// //       return;
// //     }

// //     if (!turnstileToken) {
// //       toast.error('Please complete the verification');
// //       return;
// //     }

// //     setIsLoading(true);

// //     try {
// //       const response = await fetch('/api/auth/login', {
// //         method: 'POST',
// //         headers: {
// //           'Content-Type': 'application/json',
// //         },
// //         body: JSON.stringify({
// //           email,
// //           password,
// //           turnstileToken,
// //         }),
// //       });

// //       const data = await response.json();
// //       console.log('Login API response:', data);

// //       if (response.ok) {
// //         if (!data.user || !data.token) {
// //           throw new Error('Invalid response data');
// //         }

// //         toast.success('Login successful!');

// //         // Update auth state
// //         await login(data.user, data.token);

// //         // Navigate based on role
// //         const redirectPath = data.user.role === 'admin' ? '/admin' : '/dashboard';
// //         console.log('Redirecting to:', redirectPath);

// //         // Use replace to prevent back navigation issues
// //         router.replace(redirectPath);

// //       } else {
// //         toast.error(data.message || 'Login failed');
// //         // Reset Turnstile on error
// //         if (window.turnstile) {
// //           window.turnstile.reset('.cf-turnstile');
// //           setTurnstileToken('');
// //         }
// //       }
// //     } catch (error) {
// //       console.error('Login error:', error);
// //       toast.error('Something went wrong. Please try again.');
// //       // Reset Turnstile on error
// //       if (window.turnstile) {
// //         window.turnstile.reset('.cf-turnstile');
// //         setTurnstileToken('');
// //       }
// //     } finally {
// //       setIsLoading(false);
// //     }
// //   };

// //   return (
// //     <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/10 via-background to-secondary/10 p-4">
// //       <motion.div
// //         initial={{ opacity: 0, y: 30 }}
// //         animate={{ opacity: 1, y: 0 }}
// //         transition={{ duration: 0.6 }}
// //         className="w-full max-w-md"
// //       >
// //         <Card className="shadow-xl">
// //           <CardHeader className="text-center">
// //             <CardTitle className="text-2xl font-bold">Welcome Back</CardTitle>
// //             <CardDescription>
// //               Sign in to your account to continue learning
// //             </CardDescription>
// //           </CardHeader>

// //           <CardContent>
// //             <form onSubmit={handleSubmit} className="space-y-6">
// //               <div className="space-y-2">
// //                 <Label htmlFor="email">Email</Label>
// //                 <div className="relative">
// //                   <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
// //                   <Input
// //                     id="email"
// //                     type="email"
// //                     placeholder="Enter your email"
// //                     value={email}
// //                     onChange={(e) => setEmail(e.target.value)}
// //                     className="pl-10"
// //                     required
// //                     disabled={isLoading}
// //                   />
// //                 </div>
// //               </div>

// //               <div className="space-y-2">
// //                 <Label htmlFor="password">Password</Label>
// //                 <div className="relative">
// //                   <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
// //                   <Input
// //                     id="password"
// //                     type={showPassword ? 'text' : 'password'}
// //                     placeholder="Enter your password"
// //                     value={password}
// //                     onChange={(e) => setPassword(e.target.value)}
// //                     className="pl-10 pr-10"
// //                     required
// //                     disabled={isLoading}
// //                   />
// //                   <button
// //                     type="button"
// //                     onClick={() => setShowPassword(!showPassword)}
// //                     className="absolute right-3 top-3 text-muted-foreground hover:text-primary"
// //                     disabled={isLoading}
// //                   >
// //                     {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
// //                   </button>
// //                 </div>
// //               </div>

// //               {/* Single Cloudflare Turnstile */}
// //               <div className="flex justify-center">
// //                 <div className="cf-turnstile"></div>
// //               </div>

// //               <Button type="submit" className="w-full" disabled={isLoading || !turnstileToken}>
// //                 {isLoading ? (
// //                   'Signing in...'
// //                 ) : (
// //                   <>
// //                     Sign In
// //                     <ArrowRight className="ml-2 h-4 w-4" />
// //                   </>
// //                 )}
// //               </Button>
// //             </form>
// //           </CardContent>

// //           <CardFooter className="text-center">
// //             <p className="text-sm text-muted-foreground">
// //               Don&apos;t have an account?{' '}
// //               <Link href="/auth/register" className="text-primary hover:underline">
// //                 Sign up
// //               </Link>
// //             </p>
// //           </CardFooter>
// //         </Card>

// //         {/* Demo Credentials */}
// //         <Card className="mt-4 bg-muted/50">
// //           <CardContent className="p-4">
// //             <p className="text-sm text-center text-muted-foreground mb-2">Demo Credentials:</p>
// //             <div className="text-xs space-y-1">
// //               <p><strong>Student:</strong> student@demo.com / password123</p>
// //               <p><strong>Admin:</strong> admin@demo.com / admin123</p>
// //             </div>
// //           </CardContent>
// //         </Card>
// //       </motion.div>
// //     </div>
// //   );
// // }
// 'use client';

// import { useState, useEffect } from 'react';
// import { motion } from 'framer-motion';
// import { useRouter } from 'next/navigation';
// import Link from 'next/link';
// import { toast } from 'sonner';
// import { Eye, EyeOff, Mail, Lock, ArrowRight } from 'lucide-react';
// import { Button } from '@/components/ui/button';
// import { Input } from '@/components/ui/input';
// import { Label } from '@/components/ui/label';
// import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
// import { useAuth } from '@/components/auth-provider';

// export default function LoginPage() {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [showPassword, setShowPassword] = useState(false);
//   const [isLoading, setIsLoading] = useState(false);
//   const [turnstileLoaded, setTurnstileLoaded] = useState(false);
//   const [turnstileToken, setTurnstileToken] = useState('');
//   const router = useRouter();
//   const { user, login } = useAuth();

//   // Redirect if already logged in
//   useEffect(() => {
//     if (user) {
//       console.log('User already logged in, redirecting...');
//       const redirectPath = user.role === 'admin' ? '/admin' : '/dashboard';
//       router.replace(redirectPath);
//     }
//   }, [user, router]);

//   // Load Cloudflare Turnstile script
//   useEffect(() => {
//     if (!window.turnstile && !document.querySelector('script[src*="turnstile"]')) {
//       const script = document.createElement('script');
//       script.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js';
//       script.async = true;
//       script.onload = () => {
//         setTurnstileLoaded(true);
//       };
//       script.onerror = () => {
//         console.warn('Turnstile failed to load - continuing without it');
//         setTurnstileLoaded(true);
//       };
//       document.head.appendChild(script);

//       return () => {
//         if (document.head.contains(script)) {
//           document.head.removeChild(script);
//         }
//       };
//     } else {
//       setTurnstileLoaded(true);
//     }
//   }, []);

//   // Render Turnstile widget
//   useEffect(() => {
//     if (turnstileLoaded && window.turnstile && !turnstileToken) {
//       const existingWidget = document.querySelector('.cf-turnstile');
//       if (existingWidget && !existingWidget.hasChildNodes()) {
//         try {
//           window.turnstile.render('.cf-turnstile', {
//             sitekey: process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY,
//             callback: function (token) {
//               console.log('Turnstile token received');
//               setTurnstileToken(token);
//             },
//             'error-callback': function (error) {
//               console.error('Turnstile error:', error);
//               toast.error('Verification failed. Continuing without verification.');
//               setTurnstileToken('failed'); // Allow login without turnstile
//             }
//           });
//         } catch (error) {
//           console.error('Error rendering Turnstile:', error);
//           setTurnstileToken('failed'); // Allow login without turnstile
//         }
//       }
//     }
//   }, [turnstileLoaded, turnstileToken]);

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!email || !password) {
//       toast.error('Please fill in all fields');
//       return;
//     }

//     setIsLoading(true);

//     try {
//       const response = await fetch('/api/auth/login', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           email,
//           password,
//           turnstileToken: turnstileToken === 'failed' ? null : turnstileToken,
//         }),
//       });

//       const data = await response.json();

//       if (response.ok) {
//         if (!data.user) {
//           throw new Error('Invalid response data');
//         }

//         toast.success('Login successful!');

//         // Update auth state
//         await login(data.user);

//         // Navigate based on role
//         const redirectPath = data.user.role === 'admin' ? '/admin' : '/dashboard';
//         console.log('Redirecting to:', redirectPath);

//         // Use setTimeout to ensure state updates before navigation
//         setTimeout(() => {
//           router.push(redirectPath);
//         }, 2000);

//       } else {
//         toast.error(data.message || 'Login failed');
//         // Reset Turnstile on error
//         if (window.turnstile && turnstileToken !== 'failed') {
//           try {
//             window.turnstile.reset('.cf-turnstile');
//             setTurnstileToken('');
//           } catch (e) {
//             console.warn('Could not reset turnstile:', e);
//           }
//         }
//       }
//     } catch (error) {
//       console.error('Login error:', error);
//       toast.error('Something went wrong. Please try again.');
//       // Reset Turnstile on error
//       if (window.turnstile && turnstileToken !== 'failed') {
//         try {
//           window.turnstile.reset('.cf-turnstile');
//           setTurnstileToken('');
//         } catch (e) {
//           console.warn('Could not reset turnstile:', e);
//         }
//       }
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/10 via-background to-secondary/10 p-4">
//       <motion.div
//         initial={{ opacity: 0, y: 30 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.6 }}
//         className="w-full max-w-md"
//       >
//         <Card className="shadow-xl">
//           <CardHeader className="text-center">
//             <CardTitle className="text-2xl font-bold">Welcome Back</CardTitle>
//             <CardDescription>
//               Sign in to your account to continue learning
//             </CardDescription>
//           </CardHeader>

//           <CardContent>
//             <form onSubmit={handleSubmit} className="space-y-6">
//               <div className="space-y-2">
//                 <Label htmlFor="email">Email</Label>
//                 <div className="relative">
//                   <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
//                   <Input
//                     id="email"
//                     type="email"
//                     placeholder="Enter your email"
//                     value={email}
//                     onChange={(e) => setEmail(e.target.value)}
//                     className="pl-10"
//                     required
//                     disabled={isLoading}
//                   />
//                 </div>
//               </div>

//               <div className="space-y-2">
//                 <Label htmlFor="password">Password</Label>
//                 <div className="relative">
//                   <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
//                   <Input
//                     id="password"
//                     type={showPassword ? 'text' : 'password'}
//                     placeholder="Enter your password"
//                     value={password}
//                     onChange={(e) => setPassword(e.target.value)}
//                     className="pl-10 pr-10"
//                     required
//                     disabled={isLoading}
//                   />
//                   <button
//                     type="button"
//                     onClick={() => setShowPassword(!showPassword)}
//                     className="absolute right-3 top-3 text-muted-foreground hover:text-primary"
//                     disabled={isLoading}
//                   >
//                     {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
//                   </button>
//                 </div>
//               </div>

//               {/* Turnstile Widget */}
//               <div className="flex justify-center">
//                 <div className="cf-turnstile"></div>
//               </div>

//               <Button type="submit" className="w-full" disabled={isLoading}>
//                 {isLoading ? (
//                   'Signing in...'
//                 ) : (
//                   <>
//                     Sign In
//                     <ArrowRight className="ml-2 h-4 w-4" />
//                   </>
//                 )}
//               </Button>
//             </form>
//           </CardContent>

//           <CardFooter className="text-center">
//             <p className="text-sm text-muted-foreground">
//               Don&apos;t have an account?{' '}
//               <Link href="/auth/register" className="text-primary hover:underline">
//                 Sign up
//               </Link>
//             </p>
//           </CardFooter>
//         </Card>

//         {/* Demo Credentials */}
//         <Card className="mt-4 bg-muted/50">
//           <CardContent className="p-4">
//             <p className="text-sm text-center text-muted-foreground mb-2">Demo Credentials:</p>
//             <div className="text-xs space-y-1">
//               <p><strong>Student:</strong> student@demo.com / password123</p>
//               <p><strong>Admin:</strong> admin@demo.com / admin123</p>
//             </div>
//           </CardContent>
//         </Card>
//       </motion.div>
//     </div>
//   );
// }

'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { toast } from 'sonner';
import { Eye, EyeOff, Mail, Lock, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/components/auth-provider';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [turnstileLoaded, setTurnstileLoaded] = useState(false);
  const [turnstileToken, setTurnstileToken] = useState('');
  const router = useRouter();
  const { user, login } = useAuth();

  // Redirect if already logged in
  useEffect(() => {
    if (user) {
      console.log('User already logged in, redirecting...');
      const redirectPath = user.role === "admin" ? "/admin" : "/dashboard";
      // setTimeout(()=>{
      //    router.replace(redirectPath);
      // },1000)
      router.replace(redirectPath);
    }
  }, [user, router]);

  // Load Cloudflare Turnstile script only once
  useEffect(() => {
    if (!window.turnstile && !document.querySelector('script[src*="turnstile"]')) {
      const script = document.createElement('script');
      script.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js';
      script.async = true;
      script.onload = () => {
        setTurnstileLoaded(true);
      };
      script.onerror = () => {
        toast.error('Failed to load verification script');
      };
      document.head.appendChild(script);

      return () => {
        if (document.head.contains(script)) {
          document.head.removeChild(script);
        }
      };
    } else {
      setTurnstileLoaded(true);
    }
  }, []);

  // Render Turnstile widget once script is loaded
  useEffect(() => {
    if (turnstileLoaded && window.turnstile && !turnstileToken) {
      const existingWidget = document.querySelector('.cf-turnstile');
      if (existingWidget && !existingWidget.hasChildNodes()) {
        try {
          window.turnstile.render('.cf-turnstile', {
            sitekey: process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY,
            callback: function (token) {
              console.log('Turnstile token received');
              setTurnstileToken(token);
            },
            'error-callback': function (error) {
              console.error('Turnstile error:', error);
              toast.error('Verification failed. Please refresh the page.');
            }
          });
        } catch (error) {
          console.error('Error rendering Turnstile:', error);
        }
      }
    }
  }, [turnstileLoaded, turnstileToken]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      toast.error('Please fill in all fields');
      return;
    }

    if (!turnstileToken) {
      toast.error('Please complete the verification');
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
          turnstileToken,
        }),
      });

      const data = await response.json();
      console.log('Login API response:', data);

      if (response.ok) {
        if (!data.user || !data.token) {
          throw new Error('Invalid response data');
        }

        console.log('Login successful, calling login function...');
        toast.success('Login successful!');

        // Call login function from auth provider
        const loginSuccess = await login(data.user, data.token);
        
        if (!loginSuccess) {
          throw new Error('Failed to set authentication state');
        }

      } else {
        toast.error(data.message || 'Login failed');
        // Reset Turnstile on error
        if (window.turnstile) {
          window.turnstile.reset('.cf-turnstile');
          setTurnstileToken('');
        }
      }
    } catch (error) {
      console.error('Login error:', error);
      toast.error('Something went wrong. Please try again.');
      // Reset Turnstile on error
      if (window.turnstile) {
        window.turnstile.reset('.cf-turnstile');
        setTurnstileToken('');
      }
    } finally {
      setIsLoading(false);
    }
  };

  // Show loading if user is already authenticated
  if (user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/10 via-background to-secondary/10 p-4">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md"
      >
        <Card className="shadow-xl">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold">Welcome Back</CardTitle>
            <CardDescription>
              Sign in to your account to continue learning
            </CardDescription>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10"
                    required
                    disabled={isLoading}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-10 pr-10"
                    required
                    disabled={isLoading}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-3 text-muted-foreground hover:text-primary"
                    disabled={isLoading}
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              {/* Single Cloudflare Turnstile */}
              <div className="flex justify-center">
                <div className="cf-turnstile"></div>
              </div>

              <Button type="submit" className="w-full" disabled={isLoading || !turnstileToken}>
                {isLoading ? (
                  'Signing in...'
                ) : (
                  <>
                    Sign In
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </>
                )}
              </Button>
            </form>
          </CardContent>

          <CardFooter className="text-center">
            <p className="text-sm text-muted-foreground">
              Don&apos;t have an account?{' '}
              <Link href="/auth/register" className="text-primary hover:underline">
                Sign up
              </Link>
            </p>
          </CardFooter>
        </Card>

        {/* Demo Credentials */}
        <Card className="mt-4 bg-muted/50">
          <CardContent className="p-4">
            <p className="text-sm text-center text-muted-foreground mb-2">Demo Credentials:</p>
            <div className="text-xs space-y-1">
              <p><strong>Student:</strong> student@demo.com / password123</p>
              <p><strong>Admin:</strong> admin@demo.com / admin123</p>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}