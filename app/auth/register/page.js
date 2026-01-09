// // // 'use client';

// // // import { useState, useEffect } from 'react';
// // // import { motion } from 'framer-motion';
// // // import { useRouter } from 'next/navigation';
// // // import Link from 'next/link';
// // // import { toast } from 'sonner';
// // // import { Eye, EyeOff, Mail, Lock, User, MapPin, ArrowRight } from 'lucide-react';
// // // import { Button } from '@/components/ui/button';
// // // import { Input } from '@/components/ui/input';
// // // import { Label } from '@/components/ui/label';
// // // import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
// // // import { useAuth } from '@/components/auth-provider';

// // // export default function RegisterPage() {
// // //   const [formData, setFormData] = useState({
// // //     fullName: '',
// // //     email: '',
// // //     password: '',
// // //     location: '',
// // //     referralCode: ''
// // //   });
// // //   const [showPassword, setShowPassword] = useState(false);
// // //   const [isLoading, setIsLoading] = useState(false);
// // //   const [turnstileToken, setTurnstileToken] = useState('');
// // //   const [step, setStep] = useState(1); // 1: Registration, 2: OTP Verification
// // //   const [otp, setOtp] = useState('');
// // //   const router = useRouter();
// // //   const { user } = useAuth();

// // //   useEffect(() => {
// // //     if (user) {
// // //       router.push('/dashboard');
// // //     }
// // //   }, [user, router]);

// // //   useEffect(() => {
// // //     // Load Cloudflare Turnstile script
// // //     // const script = document.createElement('script');
// // //     // script.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js';
// // //     // script.async = true;
// // //     if (!window.turnstile) {
// // //       const script = document.createElement('script');
// // //       script.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js';
// // //       script.async = true;
// // //       script.onload = () => {
// // //         // Render turnstile widget after script loads
// // //         setTimeout(() => {
// // //           if (window.turnstile) {
// // //             window.turnstile.render('.cf-turnstile', {
// // //               sitekey: process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY,
// // //               callback: function (token) {
// // //                 setTurnstileToken(token);
// // //               },
// // //             });
// // //           }
// // //         }, 100);
// // //       };

// // //       document.head.appendChild(script);
// // //   return () => {
// // //         if (document.head.contains(script)) {
// // //           document.head.removeChild(script);
// // //         }
// // //       };
// // //    }
// // // }, []);

// // //   const handleInputChange = (e) => {
// // //     const { name, value } = e.target;
// // //     setFormData(prev => ({
// // //       ...prev,
// // //       [name]: value
// // //     }));
// // //   };

// // //   const handleSubmit = async (e) => {
// // //     e.preventDefault();

// // //     if (!formData.fullName || !formData.email || !formData.password || !formData.location) {
// // //       toast.error('Please fill in all required fields');
// // //       return;
// // //     }

// // //     if (!turnstileToken) {
// // //       toast.error('Please complete the verification');
// // //       return;
// // //     }

// // //     setIsLoading(true);

// // //     try {
// // //       const response = await fetch('/api/auth/register', {
// // //         method: 'POST',
// // //         headers: {
// // //           'Content-Type': 'application/json',
// // //         },
// // //         body: JSON.stringify({
// // //           ...formData,
// // //           turnstileToken,
// // //         }),
// // //       });

// // //       const data = await response.json();

// // //       if (response.ok) {
// // //         toast.success('Registration successful! Please check your email for OTP.');
// // //         setStep(2);
// // //       } else {
// // //         toast.error(data.message || 'Registration failed');
// // //       }
// // //     } catch (error) {
// // //       console.error('Registration error:', error);
// // //       toast.error('Something went wrong. Please try again.');
// // //     } finally {
// // //       setIsLoading(false);
// // //     }
// // //   };

// // //   const handleOTPVerification = async (e) => {
// // //     e.preventDefault();

// // //     if (!otp || otp.length !== 6) {
// // //       toast.error('Please enter a valid 6-digit OTP');
// // //       return;
// // //     }

// // //     setIsLoading(true);

// // //     try {
// // //       const response = await fetch('/api/auth/verify-otp', {
// // //         method: 'POST',
// // //         headers: {
// // //           'Content-Type': 'application/json',
// // //         },
// // //         body: JSON.stringify({
// // //           email: formData.email,
// // //           otp,
// // //         }),
// // //       });

// // //       const data = await response.json();

// // //       if (response.ok) {
// // //         toast.success('Email verified successfully! You can now sign in.');
// // //         router.push('/auth/login');
// // //       } else {
// // //         toast.error(data.message || 'OTP verification failed');
// // //       }
// // //     } catch (error) {
// // //       console.error('OTP verification error:', error);
// // //       toast.error('Something went wrong. Please try again.');
// // //     } finally {
// // //       setIsLoading(false);
// // //     }
// // //   };

// // //   if (step === 2) {
// // //     return (
// // //       <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/10 via-background to-secondary/10 p-4">
// // //         <motion.div
// // //           initial={{ opacity: 0, y: 30 }}
// // //           animate={{ opacity: 1, y: 0 }}
// // //           transition={{ duration: 0.6 }}
// // //           className="w-full max-w-md"
// // //         >
// // //           <Card className="shadow-xl">
// // //             <CardHeader className="text-center">
// // //               <CardTitle className="text-2xl font-bold">Verify Your Email</CardTitle>
// // //               <CardDescription>
// // //                 We&apos;ve sent a 6-digit OTP to {formData.email}
// // //               </CardDescription>
// // //             </CardHeader>

// // //             <CardContent>
// // //               <form onSubmit={handleOTPVerification} className="space-y-6">
// // //                 <div className="space-y-2">
// // //                   <Label htmlFor="otp">Enter OTP</Label>
// // //                   <Input
// // //                     id="otp"
// // //                     type="text"
// // //                     placeholder="Enter 6-digit OTP"
// // //                     value={otp}
// // //                     onChange={(e) => setOtp(e.target.value)}
// // //                     maxLength={6}
// // //                     className="text-center text-lg font-mono"
// // //                     required
// // //                   />
// // //                 </div>

// // //                 <Button type="submit" className="w-full" disabled={isLoading}>
// // //                   {isLoading ? 'Verifying...' : 'Verify Email'}
// // //                 </Button>
// // //               </form>
// // //             </CardContent>

// // //             <CardFooter className="text-center">
// // //               <p className="text-sm text-muted-foreground">
// // //                 Didn&apos;t receive the OTP?{' '}
// // //                 <button
// // //                   onClick={() => handleSubmit()}
// // //                   className="text-primary hover:underline"
// // //                 >
// // //                   Resend
// // //                 </button>
// // //               </p>
// // //             </CardFooter>
// // //           </Card>
// // //         </motion.div>
// // //       </div>
// // //     );
// // //   }

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
// // //             <CardTitle className="text-2xl font-bold">Create Account</CardTitle>
// // //             <CardDescription>
// // //               Join thousands of learners and start your journey today
// // //             </CardDescription>
// // //           </CardHeader>

// // //           <CardContent>
// // //             <form onSubmit={handleSubmit} className="space-y-4">
// // //               <div className="space-y-2">
// // //                 <Label htmlFor="fullName">Full Name *</Label>
// // //                 <div className="relative">
// // //                   <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
// // //                   <Input
// // //                     id="fullName"
// // //                     name="fullName"
// // //                     type="text"
// // //                     placeholder="Enter your full name"
// // //                     value={formData.fullName}
// // //                     onChange={handleInputChange}
// // //                     className="pl-10"
// // //                     required
// // //                   />
// // //                 </div>
// // //               </div>

// // //               <div className="space-y-2">
// // //                 <Label htmlFor="email">Email Address *</Label>
// // //                 <div className="relative">
// // //                   <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
// // //                   <Input
// // //                     id="email"
// // //                     name="email"
// // //                     type="email"
// // //                     placeholder="Enter your email"
// // //                     value={formData.email}
// // //                     onChange={handleInputChange}
// // //                     className="pl-10"
// // //                     required
// // //                   />
// // //                 </div>
// // //               </div>

// // //               <div className="space-y-2">
// // //                 <Label htmlFor="password">Password *</Label>
// // //                 <div className="relative">
// // //                   <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
// // //                   <Input
// // //                     id="password"
// // //                     name="password"
// // //                     type={showPassword ? 'text' : 'password'}
// // //                     placeholder="Create a password"
// // //                     value={formData.password}
// // //                     onChange={handleInputChange}
// // //                     className="pl-10 pr-10"
// // //                     required
// // //                   />
// // //                   <button
// // //                     type="button"
// // //                     onClick={() => setShowPassword(!showPassword)}
// // //                     className="absolute right-3 top-3 text-muted-foreground hover:text-primary"
// // //                   >
// // //                     {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
// // //                   </button>
// // //                 </div>
// // //               </div>

// // //               <div className="space-y-2">
// // //                 <Label htmlFor="location">Location *</Label>
// // //                 <div className="relative">
// // //                   <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
// // //                   <Input
// // //                     id="location"
// // //                     name="location"
// // //                     type="text"
// // //                     placeholder="City, Country"
// // //                     value={formData.location}
// // //                     onChange={handleInputChange}
// // //                     className="pl-10"
// // //                     required
// // //                   />
// // //                 </div>
// // //               </div>

// // //               <div className="space-y-2">
// // //                 <Label htmlFor="referralCode">Referral Code (Optional)</Label>
// // //                 <Input
// // //                   id="referralCode"
// // //                   name="referralCode"
// // //                   type="text"
// // //                   placeholder="Enter referral code"
// // //                   value={formData.referralCode}
// // //                   onChange={handleInputChange}
// // //                 />
// // //               </div>

// // //               {/* Cloudflare Turnstile */}
// // //               <div className="flex justify-center">
// // //                 <div
// // //                   className="cf-turnstile"
// // //                   data-sitekey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY}
// // //                   data-callback={(token) => setTurnstileToken(token)}
// // //                 ></div>
// // //               </div>

// // //               <Button type="submit" className="w-full" disabled={isLoading}>
// // //                 {isLoading ? (
// // //                   'Creating Account...'
// // //                 ) : (
// // //                   <>
// // //                     Create Account
// // //                     <ArrowRight className="ml-2 h-4 w-4" />
// // //                   </>
// // //                 )}
// // //               </Button>
// // //             </form>
// // //           </CardContent>

// // //           <div className="px-6 pb-4">
// // //             <div className="relative">
// // //               <div className="absolute inset-0 flex items-center">
// // //                 <span className="w-full border-t" />
// // //               </div>
// // //               <div className="relative flex justify-center text-xs uppercase">
// // //                 <span className="bg-background px-2 text-muted-foreground">
// // //                   Or continue with
// // //                 </span>
// // //               </div>
// // //             </div>
// // //             <Button
// // //               type="button"
// // //               variant="outline"
// // //               className="w-full mt-4"
// // //               onClick={() => toast.info('Google Auth integration coming soon!')}
// // //             >
// // //               <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
// // //                 <path
// // //                   fill="currentColor"
// // //                   d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
// // //                 />
// // //                 <path
// // //                   fill="currentColor"
// // //                   d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
// // //                 />
// // //                 <path
// // //                   fill="currentColor"
// // //                   d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
// // //                 />
// // //                 <path
// // //                   fill="currentColor"
// // //                   d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
// // //                 />
// // //               </svg>
// // //               Continue with Google
// // //             </Button>
// // //           </div>

// // //           <CardFooter className="text-center">
// // //             <p className="text-sm text-muted-foreground">
// // //               Already have an account?{' '}
// // //               <Link href="/auth/login" className="text-primary hover:underline">
// // //                 Sign in
// // //               </Link>
// // //             </p>
// // //           </CardFooter>
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
// // import { Eye, EyeOff, Mail, Lock, User, MapPin, ArrowRight } from 'lucide-react';
// // import { Button } from '@/components/ui/button';
// // import { Input } from '@/components/ui/input';
// // import { Label } from '@/components/ui/label';
// // import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
// // import { useAuth } from '@/components/auth-provider';

// // export default function RegisterPage() {
// //   const [formData, setFormData] = useState({
// //     fullName: '',
// //     email: '',
// //     password: '',
// //     location: '',
// //     referralCode: ''
// //   });
// //   const [showPassword, setShowPassword] = useState(false);
// //   const [isLoading, setIsLoading] = useState(false);
// //   const [turnstileToken, setTurnstileToken] = useState('');
// //   const [turnstileLoaded, setTurnstileLoaded] = useState(false);
// //   const [step, setStep] = useState(1); // 1: Registration, 2: OTP Verification
// //   const [otp, setOtp] = useState('');
// //   const router = useRouter();
// //   const { user } = useAuth();

// //   useEffect(() => {
// //     if (user) {
// //       router.push('/dashboard');
// //     }
// //   }, [user, router]);

// //   // Load Cloudflare Turnstile script once
// //   useEffect(() => {
// //     if (typeof window !== 'undefined' && !window.turnstile && !turnstileLoaded) {
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
// //     } else if (window.turnstile) {
// //       setTurnstileLoaded(true);
// //     }
// //   }, [turnstileLoaded]);

// //   // Render Turnstile widget when loaded
// //   useEffect(() => {
// //     if (turnstileLoaded && window.turnstile && step === 1) {
// //       // Clear any existing widget
// //       const container = document.querySelector('.cf-turnstile');
// //       if (container) {
// //         container.innerHTML = '';
// //       }

// //       // Render new widget
// //       setTimeout(() => {
// //         if (window.turnstile && document.querySelector('.cf-turnstile')) {
// //           window.turnstile.render('.cf-turnstile', {
// //             sitekey: process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY,
// //             callback: function (token) {
// //               setTurnstileToken(token);
// //             },
// //             'error-callback': function () {
// //               toast.error('Verification failed. Please try again.');
// //               setTurnstileToken('');
// //             },
// //           });
// //         }
// //       }, 100);
// //     }
// //   }, [turnstileLoaded, step]);

// //   const handleInputChange = (e) => {
// //     const { name, value } = e.target;
// //     setFormData(prev => ({
// //       ...prev,
// //       [name]: value
// //     }));
// //   };

// //   const handleSubmit = async (e) => {
// //     e.preventDefault();

// //     if (!formData.fullName || !formData.email || !formData.password || !formData.location) {
// //       toast.error('Please fill in all required fields');
// //       return;
// //     }

// //     if (formData.password.length < 6) {
// //       toast.error('Password must be at least 6 characters long');
// //       return;
// //     }

// //     if (!turnstileToken) {
// //       toast.error('Please complete the verification');
// //       return;
// //     }

// //     setIsLoading(true);

// //     try {
// //       const response = await fetch('/api/auth/register', {
// //         method: 'POST',
// //         headers: {
// //           'Content-Type': 'application/json',
// //         },
// //         body: JSON.stringify({
// //           ...formData,
// //           turnstileToken,
// //         }),
// //       });

// //       const data = await response.json();

// //       if (response.ok) {
// //         toast.success('Registration successful! Please check your email for OTP.');
// //         setStep(2);
// //       } else {
// //         toast.error(data.message || 'Registration failed');
// //         // Reset Turnstile
// //         if (window.turnstile) {
// //           window.turnstile.reset();
// //           setTurnstileToken('');
// //         }
// //       }
// //     } catch (error) {
// //       console.error('Registration error:', error);
// //       toast.error('Something went wrong. Please try again.');
// //       // Reset Turnstile
// //       if (window.turnstile) {
// //         window.turnstile.reset();
// //         setTurnstileToken('');
// //       }
// //     } finally {
// //       setIsLoading(false);
// //     }
// //   };

// //   const handleOTPVerification = async (e) => {
// //     e.preventDefault();

// //     if (!otp || otp.length !== 6) {
// //       toast.error('Please enter a valid 6-digit OTP');
// //       return;
// //     }

// //     setIsLoading(true);

// //     try {
// //       const response = await fetch('/api/auth/verify-otp', {
// //         method: 'POST',
// //         headers: {
// //           'Content-Type': 'application/json',
// //         },
// //         body: JSON.stringify({
// //           email: formData.email,
// //           otp,
// //         }),
// //       });

// //       const data = await response.json();

// //       if (response.ok) {
// //         toast.success('Email verified successfully! You can now sign in.');
// //         router.push('/auth/login');
// //       } else {
// //         toast.error(data.message || 'OTP verification failed');
// //       }
// //     } catch (error) {
// //       console.error('OTP verification error:', error);
// //       toast.error('Something went wrong. Please try again.');
// //     } finally {
// //       setIsLoading(false);
// //     }
// //   };

// //   const resendOTP = async () => {
// //     if (!turnstileToken) {
// //       toast.error('Please complete the verification first');
// //       return;
// //     }
// //     await handleSubmit({ preventDefault: () => { } });
// //   };

// //   if (step === 2) {
// //     return (
// //       <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/10 via-background to-secondary/10 p-4">
// //         <motion.div
// //           initial={{ opacity: 0, y: 30 }}
// //           animate={{ opacity: 1, y: 0 }}
// //           transition={{ duration: 0.6 }}
// //           className="w-full max-w-md"
// //         >
// //           <Card className="shadow-xl">
// //             <CardHeader className="text-center">
// //               <CardTitle className="text-2xl font-bold">Verify Your Email</CardTitle>
// //               <CardDescription>
// //                 We&apos;ve sent a 6-digit OTP to {formData.email}
// //               </CardDescription>
// //             </CardHeader>

// //             <CardContent>
// //               <form onSubmit={handleOTPVerification} className="space-y-6">
// //                 <div className="space-y-2">
// //                   <Label htmlFor="otp">Enter OTP</Label>
// //                   <Input
// //                     id="otp"
// //                     type="text"
// //                     placeholder="Enter 6-digit OTP"
// //                     value={otp}
// //                     onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
// //                     maxLength={6}
// //                     className="text-center text-lg font-mono"
// //                     required
// //                     disabled={isLoading}
// //                   />
// //                 </div>

// //                 <Button type="submit" className="w-full" disabled={isLoading || otp.length !== 6}>
// //                   {isLoading ? 'Verifying...' : 'Verify Email'}
// //                 </Button>
// //               </form>
// //             </CardContent>

// //             <CardFooter className="text-center">
// //               <p className="text-sm text-muted-foreground">
// //                 Didn&apos;t receive the OTP?{' '}
// //                 <button
// //                   onClick={resendOTP}
// //                   className="text-primary hover:underline"
// //                   disabled={isLoading}
// //                 >
// //                   Resend
// //                 </button>
// //               </p>
// //             </CardFooter>
// //           </Card>
// //         </motion.div>
// //       </div>
// //     );
// //   }

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
// //             <CardTitle className="text-2xl font-bold">Create Account</CardTitle>
// //             <CardDescription>
// //               Join thousands of learners and start your journey today
// //             </CardDescription>
// //           </CardHeader>

// //           <CardContent>
// //             <form onSubmit={handleSubmit} className="space-y-4">
// //               <div className="space-y-2">
// //                 <Label htmlFor="fullName">Full Name *</Label>
// //                 <div className="relative">
// //                   <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
// //                   <Input
// //                     id="fullName"
// //                     name="fullName"
// //                     type="text"
// //                     placeholder="Enter your full name"
// //                     value={formData.fullName}
// //                     onChange={handleInputChange}
// //                     className="pl-10"
// //                     required
// //                     disabled={isLoading}
// //                   />
// //                 </div>
// //               </div>

// //               <div className="space-y-2">
// //                 <Label htmlFor="email">Email Address *</Label>
// //                 <div className="relative">
// //                   <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
// //                   <Input
// //                     id="email"
// //                     name="email"
// //                     type="email"
// //                     placeholder="Enter your email"
// //                     value={formData.email}
// //                     onChange={handleInputChange}
// //                     className="pl-10"
// //                     required
// //                     disabled={isLoading}
// //                   />
// //                 </div>
// //               </div>

// //               <div className="space-y-2">
// //                 <Label htmlFor="password">Password *</Label>
// //                 <div className="relative">
// //                   <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
// //                   <Input
// //                     id="password"
// //                     name="password"
// //                     type={showPassword ? 'text' : 'password'}
// //                     placeholder="Create a password (min 6 characters)"
// //                     value={formData.password}
// //                     onChange={handleInputChange}
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

// //               <div className="space-y-2">
// //                 <Label htmlFor="location">Location *</Label>
// //                 <div className="relative">
// //                   <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
// //                   <Input
// //                     id="location"
// //                     name="location"
// //                     type="text"
// //                     placeholder="City, Country"
// //                     value={formData.location}
// //                     onChange={handleInputChange}
// //                     className="pl-10"
// //                     required
// //                     disabled={isLoading}
// //                   />
// //                 </div>
// //               </div>

// //               <div className="space-y-2">
// //                 <Label htmlFor="referralCode">Referral Code (Optional)</Label>
// //                 <Input
// //                   id="referralCode"
// //                   name="referralCode"
// //                   type="text"
// //                   placeholder="Enter referral code"
// //                   value={formData.referralCode}
// //                   onChange={handleInputChange}
// //                   disabled={isLoading}
// //                 />
// //               </div>

// //               {/* Cloudflare Turnstile */}
// //               <div className="flex justify-center">
// //                 <div className="cf-turnstile" data-theme="auto"></div>
// //               </div>

// //               <Button type="submit" className="w-full" disabled={isLoading || !turnstileToken}>
// //                 {isLoading ? (
// //                   'Creating Account...'
// //                 ) : (
// //                   <>
// //                     Create Account
// //                     <ArrowRight className="ml-2 h-4 w-4" />
// //                   </>
// //                 )}
// //               </Button>
// //             </form>
// //           </CardContent>

// //           <CardFooter className="text-center">
// //             <p className="text-sm text-muted-foreground">
// //               Already have an account?{' '}
// //               <Link href="/auth/login" className="text-primary hover:underline">
// //                 Sign in
// //               </Link>
// //             </p>
// //           </CardFooter>
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
// import { Eye, EyeOff, Mail, Lock, User, MapPin, ArrowRight } from 'lucide-react';
// import { Button } from '@/components/ui/button';
// import { Input } from '@/components/ui/input';
// import { Label } from '@/components/ui/label';
// import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
// import { useAuth } from '@/components/auth-provider';

// export default function RegisterPage() {
//   const [formData, setFormData] = useState({
//     fullName: '',
//     email: '',
//     password: '',
//     location: '',
//     referralCode: ''
//   });
//   const [showPassword, setShowPassword] = useState(false);
//   const [isLoading, setIsLoading] = useState(false);
//   const [turnstileToken, setTurnstileToken] = useState('');
//   const [turnstileLoaded, setTurnstileLoaded] = useState(false);
//   const [step, setStep] = useState(1); // 1: Registration, 2: OTP Verification
//   const [otp, setOtp] = useState('');
//   const router = useRouter();
//   const { user } = useAuth();

//   useEffect(() => {
//     if (user) {
//       router.push('/dashboard');
//     }
//   }, [user, router]);

//   // Load Cloudflare Turnstile script only once
//   useEffect(() => {
//     if (!window.turnstile && !document.querySelector('script[src*="turnstile"]')) {
//       const script = document.createElement('script');
//       script.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js';
//       script.async = true;
//       script.onload = () => {
//         setTurnstileLoaded(true);
//       };
//       script.onerror = () => {
//         toast.error('Failed to load verification script');
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

//   // Render Turnstile widget once script is loaded
//   useEffect(() => {
//     if (turnstileLoaded && window.turnstile && !turnstileToken) {
//       const existingWidget = document.querySelector('.cf-turnstile');
//       if (existingWidget && !existingWidget.hasChildNodes()) {
//         try {
//           window.turnstile.render('.cf-turnstile', {
//             sitekey: process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY,
//             callback: function (token) {
//               console.log('Turnstile token:', token);
//               setTurnstileToken(token);
//             },
//             'error-callback': function (error) {
//               console.error('Turnstile error:', error);
//               toast.error('Verification failed. Please refresh the page.');
//             }
//           });
//         } catch (error) {
//           console.error('Error rendering Turnstile:', error);
//         }
//       }
//     }
//   }, [turnstileLoaded, turnstileToken]);

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({
//       ...prev,
//       [name]: value
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!formData.fullName || !formData.email || !formData.password || !formData.location) {
//       toast.error('Please fill in all required fields');
//       return;
//     }

//     if (!turnstileToken) {
//       toast.error('Please complete the verification');
//       return;
//     }

//     setIsLoading(true);

//     try {
//       const response = await fetch('/api/auth/register', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           ...formData,
//           turnstileToken,
//         }),
//       });

//       const data = await response.json();

//       if (response.ok) {
//         toast.success('Registration successful! Please check your email for OTP.');
//         setStep(2);
//       } else {
//         toast.error(data.message || 'Registration failed');
//         // Reset Turnstile
//         if (window.turnstile) {
//           window.turnstile.reset('.cf-turnstile');
//           setTurnstileToken('');
//         }
//       }
//     } catch (error) {
//       console.error('Registration error:', error);
//       toast.error('Something went wrong. Please try again.');
//       // Reset Turnstile
//       if (window.turnstile) {
//         window.turnstile.reset('.cf-turnstile');
//         setTurnstileToken('');
//       }
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const handleOTPVerification = async (e) => {
//     e.preventDefault();

//     if (!otp || otp.length !== 6) {
//       toast.error('Please enter a valid 6-digit OTP');
//       return;
//     }

//     setIsLoading(true);

//     try {
//       const response = await fetch('/api/auth/verify-otp', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           email: formData.email,
//           otp,
//         }),
//       });

//       const data = await response.json();

//       if (response.ok) {
//         toast.success('Email verified successfully! You can now sign in.');
//         router.push('/auth/login');
//       } else {
//         toast.error(data.message || 'OTP verification failed');
//       }
//     } catch (error) {
//       console.error('OTP verification error:', error);
//       toast.error('Something went wrong. Please try again.');
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const resendOTP = async () => {
//     setIsLoading(true);
//     try {
//       await handleSubmit({ preventDefault: () => { } });
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   if (step === 2) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/10 via-background to-secondary/10 p-4">
//         <motion.div
//           initial={{ opacity: 0, y: 30 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.6 }}
//           className="w-full max-w-md"
//         >
//           <Card className="shadow-xl">
//             <CardHeader className="text-center">
//               <CardTitle className="text-2xl font-bold">Verify Your Email</CardTitle>
//               <CardDescription>
//                 We&apos;ve sent a 6-digit OTP to {formData.email}
//               </CardDescription>
//             </CardHeader>

//             <CardContent>
//               <form onSubmit={handleOTPVerification} className="space-y-6">
//                 <div className="space-y-2">
//                   <Label htmlFor="otp">Enter OTP</Label>
//                   <Input
//                     id="otp"
//                     type="text"
//                     placeholder="Enter 6-digit OTP"
//                     value={otp}
//                     onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
//                     maxLength={6}
//                     className="text-center text-lg font-mono"
//                     required
//                     disabled={isLoading}
//                   />
//                 </div>

//                 <Button type="submit" className="w-full" disabled={isLoading}>
//                   {isLoading ? 'Verifying...' : 'Verify Email'}
//                 </Button>
//               </form>
//             </CardContent>

//             <CardFooter className="text-center">
//               <p className="text-sm text-muted-foreground">
//                 Didn&apos;t receive the OTP?{' '}
//                 <button
//                   onClick={resendOTP}
//                   className="text-primary hover:underline"
//                   disabled={isLoading}
//                 >
//                   Resend
//                 </button>
//               </p>
//             </CardFooter>
//           </Card>
//         </motion.div>
//       </div>
//     );
//   }

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
//             <CardTitle className="text-2xl font-bold">Create Account</CardTitle>
//             <CardDescription>
//               Join thousands of learners and start your journey today
//             </CardDescription>
//           </CardHeader>

//           <CardContent>
//             <form onSubmit={handleSubmit} className="space-y-4">
//               <div className="space-y-2">
//                 <Label htmlFor="fullName">Full Name *</Label>
//                 <div className="relative">
//                   <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
//                   <Input
//                     id="fullName"
//                     name="fullName"
//                     type="text"
//                     placeholder="Enter your full name"
//                     value={formData.fullName}
//                     onChange={handleInputChange}
//                     className="pl-10"
//                     required
//                     disabled={isLoading}
//                   />
//                 </div>
//               </div>

//               <div className="space-y-2">
//                 <Label htmlFor="email">Email Address *</Label>
//                 <div className="relative">
//                   <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
//                   <Input
//                     id="email"
//                     name="email"
//                     type="email"
//                     placeholder="Enter your email"
//                     value={formData.email}
//                     onChange={handleInputChange}
//                     className="pl-10"
//                     required
//                     disabled={isLoading}
//                   />
//                 </div>
//               </div>

//               <div className="space-y-2">
//                 <Label htmlFor="password">Password *</Label>
//                 <div className="relative">
//                   <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
//                   <Input
//                     id="password"
//                     name="password"
//                     type={showPassword ? 'text' : 'password'}
//                     placeholder="Create a password (min 6 characters)"
//                     value={formData.password}
//                     onChange={handleInputChange}
//                     className="pl-10 pr-10"
//                     required
//                     disabled={isLoading}
//                     minLength={6}
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

//               <div className="space-y-2">
//                 <Label htmlFor="location">Location *</Label>
//                 <div className="relative">
//                   <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
//                   <Input
//                     id="location"
//                     name="location"
//                     type="text"
//                     placeholder="City, Country"
//                     value={formData.location}
//                     onChange={handleInputChange}
//                     className="pl-10"
//                     required
//                     disabled={isLoading}
//                   />
//                 </div>
//               </div>

//               <div className="space-y-2">
//                 <Label htmlFor="referralCode">Referral Code (Optional)</Label>
//                 <Input
//                   id="referralCode"
//                   name="referralCode"
//                   type="text"
//                   placeholder="Enter referral code"
//                   value={formData.referralCode}
//                   onChange={handleInputChange}
//                   disabled={isLoading}
//                 />
//               </div>

//               {/* Single Cloudflare Turnstile */}
//               <div className="flex justify-center">
//                 <div className="cf-turnstile"></div>
//               </div>

//               <Button type="submit" className="w-full" disabled={isLoading || !turnstileToken}>
//                 {isLoading ? (
//                   'Creating Account...'
//                 ) : (
//                   <>
//                     Create Account
//                     <ArrowRight className="ml-2 h-4 w-4" />
//                   </>
//                 )}
//               </Button>
//             </form>
//           </CardContent>

//           <CardFooter className="text-center">
//             <p className="text-sm text-muted-foreground">
//               Already have an account?{' '}
//               <Link href="/auth/login" className="text-primary hover:underline">
//                 Sign in
//               </Link>
//             </p>
//           </CardFooter>
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
import { Eye, EyeOff, Mail, Lock, User, MapPin, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/components/auth-provider';

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    location: '',
    referralCode: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [turnstileToken, setTurnstileToken] = useState('');
  const [turnstileLoaded, setTurnstileLoaded] = useState(false);
  const [step, setStep] = useState(1); // 1: Registration Form, 2: OTP Verification
  const [otp, setOtp] = useState('');
  const [tempUserId, setTempUserId] = useState(''); // Store temp user ID for verification
  const router = useRouter();
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      router.push('/dashboard');
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
              console.log('Turnstile token:', token);
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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.fullName || !formData.email || !formData.password || !formData.location) {
      toast.error('Please fill in all required fields');
      return;
    }

    if (!turnstileToken) {
      toast.error('Please complete the verification');
      return;
    }

    setIsLoading(true);

    try {
      // Send OTP without creating user account (use a new endpoint)
      const response = await fetch('/api/auth/send-otp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: formData.email,
          fullName: formData.fullName,
          turnstileToken,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success('OTP sent to your email! Please check your inbox.');
        setStep(2);
        // Store temporary user ID if returned
        if (data.tempUserId) {
          setTempUserId(data.tempUserId);
        }
      } else {
        toast.error(data.message || 'Failed to send OTP');
        // Reset Turnstile
        if (window.turnstile) {
          window.turnstile.reset('.cf-turnstile');
          setTurnstileToken('');
        }
      }
    } catch (error) {
      console.error('Send OTP error:', error);
      toast.error('Something went wrong. Please try again.');
      // Reset Turnstile
      if (window.turnstile) {
        window.turnstile.reset('.cf-turnstile');
        setTurnstileToken('');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleOTPVerification = async (e) => {
    e.preventDefault();

    if (!otp || otp.length !== 6) {
      toast.error('Please enter a valid 6-digit OTP');
      return;
    }

    setIsLoading(true);

    try {
      // Verify OTP and complete registration
      const response = await fetch('/api/auth/complete-registration', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          otp,
          tempUserId: tempUserId,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success('Registration successful! You can now sign in.');
        router.push('/auth/login');
      } else {
        toast.error(data.message || 'OTP verification failed');
      }
    } catch (error) {
      console.error('OTP verification error:', error);
      toast.error('Something went wrong. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const resendOTP = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/auth/send-otp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: formData.email,
          fullName: formData.fullName,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success('OTP resent to your email!');
      } else {
        toast.error(data.message || 'Failed to resend OTP');
      }
    } catch (error) {
      console.error('Resend OTP error:', error);
      toast.error('Something went wrong. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  if (step === 2) {
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
              <CardTitle className="text-2xl font-bold">Verify Your Email</CardTitle>
              <CardDescription>
                We&apos;ve sent a 6-digit OTP to {formData.email}
              </CardDescription>
            </CardHeader>

            <CardContent>
              <form onSubmit={handleOTPVerification} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="otp">Enter OTP</Label>
                  <Input
                    id="otp"
                    type="text"
                    placeholder="Enter 6-digit OTP"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
                    maxLength={6}
                    className="text-center text-lg font-mono"
                    required
                    disabled={isLoading}
                  />
                </div>

                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? 'Verifying & Creating Account...' : 'Verify & Create Account'}
                </Button>
              </form>
            </CardContent>

            <CardFooter className="text-center">
              <p className="text-sm text-muted-foreground">
                Didn&apos;t receive the OTP?{' '}
                <button
                  onClick={resendOTP}
                  className="text-primary hover:underline"
                  disabled={isLoading}
                >
                  Resend
                </button>
              </p>
            </CardFooter>
          </Card>
        </motion.div>
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
            <CardTitle className="text-2xl font-bold">Create Account</CardTitle>
            <CardDescription>
              Join thousands of learners and start your journey today
            </CardDescription>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="fullName">Full Name *</Label>
                <div className="relative">
                  <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="fullName"
                    name="fullName"
                    type="text"
                    placeholder="Enter your full name"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    className="pl-10"
                    required
                    disabled={isLoading}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email Address *</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="pl-10"
                    required
                    disabled={isLoading}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password *</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="password"
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Create a password (min 6 characters)"
                    value={formData.password}
                    onChange={handleInputChange}
                    className="pl-10 pr-10"
                    required
                    disabled={isLoading}
                    minLength={6}
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

              <div className="space-y-2">
                <Label htmlFor="location">Location *</Label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="location"
                    name="location"
                    type="text"
                    placeholder="City, Country"
                    value={formData.location}
                    onChange={handleInputChange}
                    className="pl-10"
                    required
                    disabled={isLoading}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="referralCode">Referral Code (Optional)</Label>
                <Input
                  id="referralCode"
                  name="referralCode"
                  type="text"
                  placeholder="Enter referral code"
                  value={formData.referralCode}
                  onChange={handleInputChange}
                  disabled={isLoading}
                />
              </div>

              {/* Single Cloudflare Turnstile */}
              <div className="flex justify-center">
                <div className="cf-turnstile"></div>
              </div>

              <Button type="submit" className="w-full" disabled={isLoading || !turnstileToken}>
                {isLoading ? (
                  'Sending OTP...'
                ) : (
                  <>
                    Send Verification Code
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </>
                )}
              </Button>
            </form>
          </CardContent>

          <CardFooter className="text-center">
            <p className="text-sm text-muted-foreground">
              Already have an account?{' '}
              <Link href="/auth/login" className="text-primary hover:underline">
                Sign in
              </Link>
            </p>
          </CardFooter>
        </Card>
      </motion.div>
    </div>
  );
}