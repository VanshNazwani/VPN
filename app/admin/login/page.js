// 'use client';

// import { useState, useEffect } from 'react';
// import { motion } from 'framer-motion';
// import { useRouter } from 'next/navigation';
// import Link from 'next/link';
// import { toast } from 'sonner';
// import { Eye, EyeOff, Mail, Lock, ArrowRight, Shield } from 'lucide-react';
// import { Button } from '@/components/ui/button';
// import { Input } from '@/components/ui/input';
// import { Label } from '@/components/ui/label';
// import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

// export default function AdminLoginPage() {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [showPassword, setShowPassword] = useState(false);
//   const [isLoading, setIsLoading] = useState(false);
//   const [turnstileToken, setTurnstileToken] = useState('');
//   const router = useRouter();

//   // useEffect(() => {
//   //   // Load Cloudflare Turnstile script
//   //   const script = document.createElement('script');
//   //   script.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js';
//   //   script.async = true;
//   //   document.head.appendChild(script);

//   //   return () => {
//   //     document.head.removeChild(script);
//   //   };
//   // }, []);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
    
//     if (!email || !password) {
//       toast.error('Please fill in all fields');
//       return;
//     }

//     // if (!turnstileToken) {
//     //   toast.error('Please complete the verification');
//     //   return;
//     // }

//     setIsLoading(true);

//     try {
//       const response = await fetch('/api/admin/auth/login', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           email,
//           password,
//           //turnstileToken,
//         }),
//       });

//       const data = await response.json();

//       if (response.ok) {
//         toast.success('Admin login successful!');
        
//         // Set auth cookie
//         document.cookie = `auth-token=${data.token}; path=/; max-age=${7 * 24 * 60 * 60}`;
        
//         router.push('/admin');
//       } else {
//         toast.error(data.message || 'Login failed');
//       }
//     } catch (error) {
//       console.error('Admin login error:', error);
//       toast.error('Something went wrong. Please try again.');
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-500/10 via-background to-purple-600/10 p-4">
//       <motion.div
//         initial={{ opacity: 0, y: 30 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.6 }}
//         className="w-full max-w-md"
//       >
//         <Card className="shadow-xl border-purple-200 dark:border-purple-800">
//           <CardHeader className="text-center">
//             <div className="w-16 h-16 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center mx-auto mb-4">
//               <Shield className="w-8 h-8 text-purple-600 dark:text-purple-400" />
//             </div>
//             <CardTitle className="text-2xl font-bold">Admin Portal</CardTitle>
//             <CardDescription>
//               Sign in to access the admin dashboard
//             </CardDescription>
//           </CardHeader>
          
//           <CardContent>
//             <form onSubmit={handleSubmit} className="space-y-6">
//               <div className="space-y-2">
//                 <Label htmlFor="email">Admin Email</Label>
//                 <div className="relative">
//                   <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
//                   <Input
//                     id="email"
//                     type="email"
//                     placeholder="Enter admin email"
//                     value={email}
//                     onChange={(e) => setEmail(e.target.value)}
//                     className="pl-10"
//                     required
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
//                     placeholder="Enter password"
//                     value={password}
//                     onChange={(e) => setPassword(e.target.value)}
//                     className="pl-10 pr-10"
//                     required
//                   />
//                   <button
//                     type="button"
//                     onClick={() => setShowPassword(!showPassword)}
//                     className="absolute right-3 top-3 text-muted-foreground hover:text-primary"
//                   >
//                     {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
//                   </button>
//                 </div>
//               </div>

//               {/* Cloudflare Turnstile */}
//               {/* <div className="flex justify-center">
//                 <div 
//                   className="cf-turnstile"
//                   data-sitekey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY}
//                   data-callback={(token) => setTurnstileToken(token)}
//                 ></div>
//               </div> */}

//               <Button type="submit" className="w-full bg-purple-600 hover:bg-purple-700" disabled={isLoading}>
//                 {isLoading ? (
//                   'Signing in...'
//                 ) : (
//                   <>
//                     Sign In as Admin
//                     <ArrowRight className="ml-2 h-4 w-4" />
//                   </>
//                 )}
//               </Button>
//             </form>
//           </CardContent>

//           <CardFooter className="text-center">
//             <p className="text-sm text-muted-foreground">
//               Not an admin?{' '}
//               <Link href="/auth/login" className="text-purple-600 hover:underline">
//                 User Login
//               </Link>
//             </p>
//           </CardFooter>
//         </Card>

//         {/* Security Notice */}
//         <Card className="mt-4 bg-purple-50 dark:bg-purple-950/50 border-purple-200 dark:border-purple-800">
//           <CardContent className="p-4">
//             <div className="flex items-center gap-2 text-purple-700 dark:text-purple-300">
//               <Shield className="w-4 h-4" />
//               <p className="text-sm font-medium">Secure Admin Access</p>
//             </div>
//             <p className="text-xs text-purple-600 dark:text-purple-400 mt-1">
//               This portal is protected with advanced security measures. All login attempts are monitored.
//             </p>
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
import { Eye, EyeOff, Mail, Lock, ArrowRight, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

export default function AdminLoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [turnstileLoaded, setTurnstileLoaded] = useState(false);
  const [turnstileToken, setTurnstileToken] = useState('');
  const [step, setStep] = useState(1); // 1: Login, 2: OTP Verification
  const [otp, setOtp] = useState('');
  const router = useRouter();

  // Load Cloudflare Turnstile script
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
    if (turnstileLoaded && window.turnstile && !turnstileToken && step === 1) {
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
  }, [turnstileLoaded, turnstileToken, step]);

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
      const response = await fetch('/api/admin/auth/login', {
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

      if (response.ok) {
        if (data.requiresOTP) {
          toast.success('OTP sent to your email. Please verify to continue.');
          setStep(2);
        } else {
          toast.success('Admin login successful!');
          // Set auth cookie
          document.cookie = `auth-token=${data.token}; path=/; max-age=${7 * 24 * 60 * 60}`;
          router.push('/admin');
        }
      } else {
        toast.error(data.message || 'Login failed');
        // Reset Turnstile
        if (window.turnstile) {
          window.turnstile.reset('.cf-turnstile');
          setTurnstileToken('');
        }
      }
    } catch (error) {
      console.error('Admin login error:', error);
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
      const response = await fetch('/api/admin/auth/verify-login-otp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          otp,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success('Admin login successful!');
        // Set auth cookie
        document.cookie = `auth-token=${data.token}; path=/; max-age=${7 * 24 * 60 * 60}`;
        router.push('/admin');
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
      await handleSubmit({ preventDefault: () => { } });
    } finally {
      setIsLoading(false);
    }
  };

  if (step === 2) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-500/10 via-background to-purple-600/10 p-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-md"
        >
          <Card className="shadow-xl border-purple-200 dark:border-purple-800">
            <CardHeader className="text-center">
              <div className="w-16 h-16 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-purple-600 dark:text-purple-400" />
              </div>
              <CardTitle className="text-2xl font-bold">Verify Admin Login</CardTitle>
              <CardDescription>
                We've sent a 6-digit OTP to {email}
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

                <Button type="submit" className="w-full bg-purple-600 hover:bg-purple-700" disabled={isLoading}>
                  {isLoading ? 'Verifying...' : 'Verify & Sign In'}
                </Button>
              </form>
            </CardContent>

            <CardFooter className="text-center">
              <p className="text-sm text-muted-foreground">
                Didn't receive the OTP?{' '}
                <button
                  onClick={resendOTP}
                  className="text-purple-600 hover:underline"
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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-500/10 via-background to-purple-600/10 p-4">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md"
      >
        <Card className="shadow-xl border-purple-200 dark:border-purple-800">
          <CardHeader className="text-center">
            <div className="w-16 h-16 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center mx-auto mb-4">
              <Shield className="w-8 h-8 text-purple-600 dark:text-purple-400" />
            </div>
            <CardTitle className="text-2xl font-bold">Admin Portal</CardTitle>
            <CardDescription>
              Sign in to access the admin dashboard
            </CardDescription>
          </CardHeader>
          
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="email">Admin Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter admin email"
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
                    placeholder="Enter password"
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

              {/* Cloudflare Turnstile */}
              <div className="flex justify-center">
                <div className="cf-turnstile"></div>
              </div>

              <Button type="submit" className="w-full bg-purple-600 hover:bg-purple-700" disabled={isLoading || !turnstileToken}>
                {isLoading ? (
                  'Signing in...'
                ) : (
                  <>
                    Sign In as Admin
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </>
                )}
              </Button>
            </form>
          </CardContent>

          <CardFooter className="text-center">
            <p className="text-sm text-muted-foreground">
              Not an admin?{' '}
              <Link href="/auth/login" className="text-purple-600 hover:underline">
                User Login
              </Link>
            </p>
          </CardFooter>
        </Card>

        {/* Security Notice */}
        <Card className="mt-4 bg-purple-50 dark:bg-purple-950/50 border-purple-200 dark:border-purple-800">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 text-purple-700 dark:text-purple-300">
              <Shield className="w-4 h-4" />
              <p className="text-sm font-medium">Secure Admin Access</p>
            </div>
            <p className="text-xs text-purple-600 dark:text-purple-400 mt-1">
              This portal is protected with advanced security measures. All login attempts are monitored.
            </p>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}