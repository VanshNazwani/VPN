// 'use client';

// import { useState, useEffect } from 'react';
// import { motion } from 'framer-motion';
// import { useRouter } from 'next/navigation';
// import Link from 'next/link';
// import { toast } from 'sonner';
// import { Eye, EyeOff, Mail, Lock, User, ArrowRight, Shield, UserPlus } from 'lucide-react';
// import { Button } from '@/components/ui/button';
// import { Input } from '@/components/ui/input';
// import { Label } from '@/components/ui/label';
// import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

// export default function AdminRegisterPage() {
//   const [formData, setFormData] = useState({
//     fullName: '',
//     email: '',
//     password: '',
//     confirmPassword: ''
//   });
//   const [showPassword, setShowPassword] = useState(false);
//   const [showConfirmPassword, setShowConfirmPassword] = useState(false);
//   const [isLoading, setIsLoading] = useState(false);
//   const [turnstileToken, setTurnstileToken] = useState('');
//   const [turnstileLoaded, setTurnstileLoaded] = useState(false);
//   const router = useRouter();

//   // useEffect(() => {
//   //   if (!window.turnstile && !document.querySelector('script[src*="turnstile"]')) {
//   //     const script = document.createElement('script');
//   //     script.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js';
//   //     script.async = true;
//   //     script.onload = () => {
//   //       setTurnstileLoaded(true);
//   //     };
//   //     script.onerror = () => {
//   //       toast.error('Failed to load verification script');
//   //     };
//   //     document.head.appendChild(script);

//   //     return () => {
//   //       if (document.head.contains(script)) {
//   //         document.head.removeChild(script);
//   //       }
//   //     };
//   //   } else {
//   //     setTurnstileLoaded(true);
//   //   }
//   // }, []);

//   // // Render Turnstile widget once script is loaded
//   // useEffect(() => {
//   //   if (turnstileLoaded && window.turnstile && !turnstileToken) {
//   //     const existingWidget = document.querySelector('.cf-turnstile');
//   //     if (existingWidget && !existingWidget.hasChildNodes()) {
//   //       try {
//   //         window.turnstile.render('.cf-turnstile', {
//   //           sitekey: process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY,
//   //           callback: function (token) {
//   //             console.log('Turnstile token:', token);
//   //             setTurnstileToken(token);
//   //           },
//   //           'error-callback': function (error) {
//   //             console.error('Turnstile error:', error);
//   //             toast.error('Verification failed. Please refresh the page.');
//   //           }
//   //         });
//   //       } catch (error) {
//   //         console.error('Error rendering Turnstile:', error);
//   //       }
//   //     }
//   //   }
//   // }, [turnstileLoaded, turnstileToken]);
//   // useEffect(() => {
//   //   // Load Cloudflare Turnstile script
//   //   const script = document.createElement('script');
//   //   script.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js';
//   //   script.async = true;
//   //   document.head.appendChild(script);

//   //   return () => {
//   //     if (document.head.contains(script)) {
//   //       document.head.removeChild(script);
//   //     }
//   //   };
//   // }, []);

//   const handleInputChange = (field, value) => {
//     setFormData(prev => ({
//       ...prev,
//       [field]: value
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!formData.fullName || !formData.email || !formData.password || !formData.confirmPassword) {
//       toast.error('Please fill in all fields');
//       return;
//     }

//     if (formData.password !== formData.confirmPassword) {
//       toast.error('Passwords do not match');
//       return;
//     }

//     if (formData.password.length < 8) {
//       toast.error('Password must be at least 8 characters');
//       return;
//     }

//     // if (!turnstileToken) {
//     //   toast.error('Please complete the verification');
//     //   return;
//     // }

//     setIsLoading(true);

//     try {
//       const response = await fetch('/api/admin/auth/register', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           ...formData,
//           //turnstileToken,
//         }),
//       });

//       const data = await response.json();

//       if (response.ok) {
//         toast.success('Admin account created successfully!');
//         toast.success('Login credentials have been sent to the admin email.');
//         router.push('/admin/login');
//       } else {
//         toast.error(data.message || 'Registration failed');
//       }
//     } catch (error) {
//       console.error('Admin registration error:', error);
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
//               <UserPlus className="w-8 h-8 text-purple-600 dark:text-purple-400" />
//             </div>
//             <CardTitle className="text-2xl font-bold">Create Admin Account</CardTitle>
//             <CardDescription>
//               Register as an admin to manage the platform
//             </CardDescription>
//           </CardHeader>

//           <CardContent>
//             <form onSubmit={handleSubmit} className="space-y-6">
//               <div className="space-y-2">
//                 <Label htmlFor="fullName">Full Name</Label>
//                 <div className="relative">
//                   <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
//                   <Input
//                     id="fullName"
//                     type="text"
//                     placeholder="Enter full name"
//                     value={formData.fullName}
//                     onChange={(e) => handleInputChange('fullName', e.target.value)}
//                     className="pl-10"
//                     required
//                   />
//                 </div>
//               </div>

//               <div className="space-y-2">
//                 <Label htmlFor="email">Admin Email</Label>
//                 <div className="relative">
//                   <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
//                   <Input
//                     id="email"
//                     type="email"
//                     placeholder="Enter admin email"
//                     value={formData.email}
//                     onChange={(e) => handleInputChange('email', e.target.value)}
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
//                     placeholder="Enter password (min 8 characters)"
//                     value={formData.password}
//                     onChange={(e) => handleInputChange('password', e.target.value)}
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

//               <div className="space-y-2">
//                 <Label htmlFor="confirmPassword">Confirm Password</Label>
//                 <div className="relative">
//                   <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
//                   <Input
//                     id="confirmPassword"
//                     type={showConfirmPassword ? 'text' : 'password'}
//                     placeholder="Confirm password"
//                     value={formData.confirmPassword}
//                     onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
//                     className="pl-10 pr-10"
//                     required
//                   />
//                   <button
//                     type="button"
//                     onClick={() => setShowConfirmPassword(!showConfirmPassword)}
//                     className="absolute right-3 top-3 text-muted-foreground hover:text-primary"
//                   >
//                     {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
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
//                   'Creating Admin Account...'
//                 ) : (
//                   <>
//                     Create Admin Account
//                     <ArrowRight className="ml-2 h-4 w-4" />
//                   </>
//                 )}
//               </Button>
//             </form>
//           </CardContent>

//           <CardFooter className="text-center">
//             <p className="text-sm text-muted-foreground">
//               Already have an admin account?{' '}
//               <Link href="/admin/login" className="text-purple-600 hover:underline">
//                 Sign In
//               </Link>
//             </p>
//           </CardFooter>
//         </Card>

//         {/* Security Notice */}
//         <Card className="mt-4 bg-red-50 dark:bg-red-950/50 border-red-200 dark:border-red-800">
//           <CardContent className="p-4">
//             <div className="flex items-center gap-2 text-red-700 dark:text-red-300">
//               <Shield className="w-4 h-4" />
//               <p className="text-sm font-medium">Temporary Registration</p>
//             </div>
//             <p className="text-xs text-red-600 dark:text-red-400 mt-1">
//               This registration page is for initial setup only. After creating the first admin, use the admin panel to add new administrators.
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
import { Eye, EyeOff, Mail, Lock, User, ArrowRight, Shield, UserPlus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

export default function AdminRegisterPage() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [turnstileToken, setTurnstileToken] = useState('');
  const [turnstileLoaded, setTurnstileLoaded] = useState(false);
  const [step, setStep] = useState(1); // 1: Registration, 2: OTP Verification
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
  }, [turnstileLoaded, turnstileToken, step]);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.fullName || !formData.email || !formData.password || !formData.confirmPassword) {
      toast.error('Please fill in all fields');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    if (formData.password.length < 8) {
      toast.error('Password must be at least 8 characters');
      return;
    }

    if (!turnstileToken) {
      toast.error('Please complete the verification');
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch('/api/admin/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          turnstileToken,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success('Registration successful! Please check your email for OTP.');
        setStep(2);
      } else {
        toast.error(data.message || 'Registration failed');
        // Reset Turnstile
        if (window.turnstile) {
          window.turnstile.reset('.cf-turnstile');
          setTurnstileToken('');
        }
      }
    } catch (error) {
      console.error('Admin registration error:', error);
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
      const response = await fetch('/api/admin/auth/verify-otp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: formData.email,
          otp,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success('Admin account verified successfully!');
        router.push('/admin/login');
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
              <CardTitle className="text-2xl font-bold">Verify Admin Email</CardTitle>
              <CardDescription>
                We've sent a 6-digit OTP to {formData.email}
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
                  {isLoading ? 'Verifying...' : 'Verify Admin Account'}
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
              <UserPlus className="w-8 h-8 text-purple-600 dark:text-purple-400" />
            </div>
            <CardTitle className="text-2xl font-bold">Create Admin Account</CardTitle>
            <CardDescription>
              Register as an admin to manage the platform
            </CardDescription>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="fullName">Full Name *</Label>
                <div className="relative">
                  <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="fullName"
                    type="text"
                    placeholder="Enter full name"
                    value={formData.fullName}
                    onChange={(e) => handleInputChange('fullName', e.target.value)}
                    className="pl-10"
                    required
                    disabled={isLoading}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Admin Email *</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter admin email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
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
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Enter password (min 8 characters)"
                    value={formData.password}
                    onChange={(e) => handleInputChange('password', e.target.value)}
                    className="pl-10 pr-10"
                    required
                    disabled={isLoading}
                    minLength={8}
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
                <Label htmlFor="confirmPassword">Confirm Password *</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="confirmPassword"
                    type={showConfirmPassword ? 'text' : 'password'}
                    placeholder="Confirm password"
                    value={formData.confirmPassword}
                    onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                    className="pl-10 pr-10"
                    required
                    disabled={isLoading}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-3 text-muted-foreground hover:text-primary"
                    disabled={isLoading}
                  >
                    {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              {/* Cloudflare Turnstile */}
              <div className="flex justify-center">
                <div className="cf-turnstile"></div>
              </div>

              <Button type="submit" className="w-full bg-purple-600 hover:bg-purple-700" disabled={isLoading || !turnstileToken}>
                {isLoading ? (
                  'Creating Admin Account...'
                ) : (
                  <>
                    Create Admin Account
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </>
                )}
              </Button>
            </form>
          </CardContent>

          <CardFooter className="text-center">
            <p className="text-sm text-muted-foreground">
              Already have an admin account?{' '}
              <Link href="/admin/login" className="text-purple-600 hover:underline">
                Sign In
              </Link>
            </p>
          </CardFooter>
        </Card>

        {/* Security Notice */}
        <Card className="mt-4 bg-red-50 dark:bg-red-950/50 border-red-200 dark:border-red-800">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 text-red-700 dark:text-red-300">
              <Shield className="w-4 h-4" />
              <p className="text-sm font-medium">Temporary Registration</p>
            </div>
            <p className="text-xs text-red-600 dark:text-red-400 mt-1">
              This registration page is for initial setup only. After creating the first admin, use the admin panel to add new administrators.
            </p>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}