// // // // // // // // // // // // 'use client';

// // // // // // // // // // // // import { useState, useEffect } from 'react';
// // // // // // // // // // // // import { motion } from 'framer-motion';
// // // // // // // // // // // // import { 
// // // // // // // // // // // //   BookOpen, 
// // // // // // // // // // // //   Award, 
// // // // // // // // // // // //   Clock, 
// // // // // // // // // // // //   TrendingUp, 
// // // // // // // // // // // //   Play, 
// // // // // // // // // // // //   Download,
// // // // // // // // // // // //   Users,
// // // // // // // // // // // //   Star,
// // // // // // // // // // // //   Gift,
// // // // // // // // // // // //   Copy,
// // // // // // // // // // // //   CheckCircle
// // // // // // // // // // // // } from 'lucide-react';
// // // // // // // // // // // // import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
// // // // // // // // // // // // import { Button } from '@/components/ui/button';
// // // // // // // // // // // // import { Badge } from '@/components/ui/badge';
// // // // // // // // // // // // import { Progress } from '@/components/ui/progress';
// // // // // // // // // // // // import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
// // // // // // // // // // // // import { toast } from 'sonner';
// // // // // // // // // // // // import { useAuth } from '@/components/auth-provider';
// // // // // // // // // // // // import Navbar from '@/components/navbar';

// // // // // // // // // // // // export default function Dashboard() {
// // // // // // // // // // // //   const { user } = useAuth();
// // // // // // // // // // // //   const [userStats, setUserStats] = useState({
// // // // // // // // // // // //     enrolledCourses: 0,
// // // // // // // // // // // //     completedCourses: 0,
// // // // // // // // // // // //     certificatesEarned: 0,
// // // // // // // // // // // //     totalWatchTime: 0,
// // // // // // // // // // // //     credits: 0
// // // // // // // // // // // //   });
// // // // // // // // // // // //   const [enrolledCourses, setEnrolledCourses] = useState([]);
// // // // // // // // // // // //   const [recentActivity, setRecentActivity] = useState([]);
// // // // // // // // // // // //   const [referralCode, setReferralCode] = useState('');

// // // // // // // // // // // //   useEffect(() => {
// // // // // // // // // // // //     if (user) {
// // // // // // // // // // // //       fetchUserData();
// // // // // // // // // // // //       setReferralCode(user.referralCode || '');
// // // // // // // // // // // //     }
// // // // // // // // // // // //   }, [user]);

// // // // // // // // // // // //   const fetchUserData = async () => {
// // // // // // // // // // // //     try {
// // // // // // // // // // // //       const response = await fetch('/api/user/dashboard', {
// // // // // // // // // // // //         headers: {
// // // // // // // // // // // //           'Authorization': `Bearer ${document.cookie.split('auth-token=')[1]?.split(';')[0]}`,
// // // // // // // // // // // //         },
// // // // // // // // // // // //       });

// // // // // // // // // // // //       if (response.ok) {
// // // // // // // // // // // //         const data = await response.json();
// // // // // // // // // // // //         setUserStats(data.stats);
// // // // // // // // // // // //         setEnrolledCourses(data.enrolledCourses);
// // // // // // // // // // // //         setRecentActivity(data.recentActivity);
// // // // // // // // // // // //       }
// // // // // // // // // // // //     } catch (error) {
// // // // // // // // // // // //       console.error('Error fetching user data:', error);
// // // // // // // // // // // //     }
// // // // // // // // // // // //   };

// // // // // // // // // // // //   const copyReferralLink = () => {
// // // // // // // // // // // //     const referralLink = `${window.location.origin}/auth/register?ref=${referralCode}`;
// // // // // // // // // // // //     navigator.clipboard.writeText(referralLink);
// // // // // // // // // // // //     toast.success('Referral link copied to clipboard!');
// // // // // // // // // // // //   };

// // // // // // // // // // // //   const downloadCertificate = async (courseId) => {
// // // // // // // // // // // //     try {
// // // // // // // // // // // //       const response = await fetch(`/api/certificates/download/${courseId}`, {
// // // // // // // // // // // //         headers: {
// // // // // // // // // // // //           'Authorization': `Bearer ${document.cookie.split('auth-token=')[1]?.split(';')[0]}`,
// // // // // // // // // // // //         },
// // // // // // // // // // // //       });

// // // // // // // // // // // //       if (response.ok) {
// // // // // // // // // // // //         const blob = await response.blob();
// // // // // // // // // // // //         const url = window.URL.createObjectURL(blob);
// // // // // // // // // // // //         const a = document.createElement('a');
// // // // // // // // // // // //         a.style.display = 'none';
// // // // // // // // // // // //         a.href = url;
// // // // // // // // // // // //         a.download = `certificate-${courseId}.pdf`;
// // // // // // // // // // // //         document.body.appendChild(a);
// // // // // // // // // // // //         a.click();
// // // // // // // // // // // //         window.URL.revokeObjectURL(url);
// // // // // // // // // // // //         toast.success('Certificate downloaded successfully!');
// // // // // // // // // // // //       } else {
// // // // // // // // // // // //         toast.error('Error downloading certificate');
// // // // // // // // // // // //       }
// // // // // // // // // // // //     } catch (error) {
// // // // // // // // // // // //       console.error('Error downloading certificate:', error);
// // // // // // // // // // // //       toast.error('Error downloading certificate');
// // // // // // // // // // // //     }
// // // // // // // // // // // //   };

// // // // // // // // // // // //   const stats = [
// // // // // // // // // // // //     {
// // // // // // // // // // // //       title: 'Enrolled Courses',
// // // // // // // // // // // //       value: userStats.enrolledCourses,
// // // // // // // // // // // //       icon: BookOpen,
// // // // // // // // // // // //       color: 'text-blue-600',
// // // // // // // // // // // //       bgColor: 'bg-blue-50 dark:bg-blue-950'
// // // // // // // // // // // //     },
// // // // // // // // // // // //     {
// // // // // // // // // // // //       title: 'Completed',
// // // // // // // // // // // //       value: userStats.completedCourses,
// // // // // // // // // // // //       icon: CheckCircle,
// // // // // // // // // // // //       color: 'text-green-600',
// // // // // // // // // // // //       bgColor: 'bg-green-50 dark:bg-green-950'
// // // // // // // // // // // //     },
// // // // // // // // // // // //     {
// // // // // // // // // // // //       title: 'Certificates',
// // // // // // // // // // // //       value: userStats.certificatesEarned,
// // // // // // // // // // // //       icon: Award,
// // // // // // // // // // // //       color: 'text-purple-600',
// // // // // // // // // // // //       bgColor: 'bg-purple-50 dark:bg-purple-950'
// // // // // // // // // // // //     },
// // // // // // // // // // // //     {
// // // // // // // // // // // //       title: 'Credits',
// // // // // // // // // // // //       value: userStats.credits,
// // // // // // // // // // // //       icon: Gift,
// // // // // // // // // // // //       color: 'text-orange-600',
// // // // // // // // // // // //       bgColor: 'bg-orange-50 dark:bg-orange-950'
// // // // // // // // // // // //     }
// // // // // // // // // // // //   ];

// // // // // // // // // // // //   if (!user) {
// // // // // // // // // // // //     return (
// // // // // // // // // // // //       <div className="min-h-screen flex items-center justify-center">
// // // // // // // // // // // //         <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
// // // // // // // // // // // //       </div>
// // // // // // // // // // // //     );
// // // // // // // // // // // //   }

// // // // // // // // // // // //   return (
// // // // // // // // // // // //     <div className="min-h-screen bg-background">
// // // // // // // // // // // //       <Navbar />

// // // // // // // // // // // //       <main className="pt-20 pb-12">
// // // // // // // // // // // //         <div className="container mx-auto px-4">
// // // // // // // // // // // //           {/* Header */}
// // // // // // // // // // // //           <motion.div
// // // // // // // // // // // //             className="mb-8"
// // // // // // // // // // // //             initial={{ opacity: 0, y: 20 }}
// // // // // // // // // // // //             animate={{ opacity: 1, y: 0 }}
// // // // // // // // // // // //             transition={{ duration: 0.6 }}
// // // // // // // // // // // //           >
// // // // // // // // // // // //             <h1 className="text-3xl font-bold mb-2">
// // // // // // // // // // // //               Welcome back, {user.fullName}! 👋
// // // // // // // // // // // //             </h1>
// // // // // // // // // // // //             <p className="text-muted-foreground">
// // // // // // // // // // // //               Continue your learning journey and track your progress.
// // // // // // // // // // // //             </p>
// // // // // // // // // // // //           </motion.div>

// // // // // // // // // // // //           {/* Stats Cards */}
// // // // // // // // // // // //           <motion.div
// // // // // // // // // // // //             className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
// // // // // // // // // // // //             initial={{ opacity: 0, y: 20 }}
// // // // // // // // // // // //             animate={{ opacity: 1, y: 0 }}
// // // // // // // // // // // //             transition={{ duration: 0.6, delay: 0.1 }}
// // // // // // // // // // // //           >
// // // // // // // // // // // //             {stats.map((stat, index) => (
// // // // // // // // // // // //               <Card key={stat.title} className="hover:shadow-lg transition-shadow">
// // // // // // // // // // // //                 <CardContent className="p-6">
// // // // // // // // // // // //                   <div className="flex items-center justify-between">
// // // // // // // // // // // //                     <div>
// // // // // // // // // // // //                       <p className="text-sm text-muted-foreground mb-1">{stat.title}</p>
// // // // // // // // // // // //                       <p className="text-2xl font-bold">{stat.value}</p>
// // // // // // // // // // // //                     </div>
// // // // // // // // // // // //                     <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${stat.bgColor}`}>
// // // // // // // // // // // //                       <stat.icon className={`w-6 h-6 ${stat.color}`} />
// // // // // // // // // // // //                     </div>
// // // // // // // // // // // //                   </div>
// // // // // // // // // // // //                 </CardContent>
// // // // // // // // // // // //               </Card>
// // // // // // // // // // // //             ))}
// // // // // // // // // // // //           </motion.div>

// // // // // // // // // // // //           <div className="grid lg:grid-cols-3 gap-8">
// // // // // // // // // // // //             {/* Main Content */}
// // // // // // // // // // // //             <div className="lg:col-span-2 space-y-8">
// // // // // // // // // // // //               {/* Course Tabs */}
// // // // // // // // // // // //               <motion.div
// // // // // // // // // // // //                 initial={{ opacity: 0, y: 20 }}
// // // // // // // // // // // //                 animate={{ opacity: 1, y: 0 }}
// // // // // // // // // // // //                 transition={{ duration: 0.6, delay: 0.2 }}
// // // // // // // // // // // //               >
// // // // // // // // // // // //                 <Tabs defaultValue="enrolled" className="w-full">
// // // // // // // // // // // //                   <TabsList className="grid w-full grid-cols-3">
// // // // // // // // // // // //                     <TabsTrigger value="enrolled">Enrolled</TabsTrigger>
// // // // // // // // // // // //                     <TabsTrigger value="completed">Completed</TabsTrigger>
// // // // // // // // // // // //                     <TabsTrigger value="certificates">Certificates</TabsTrigger>
// // // // // // // // // // // //                   </TabsList>

// // // // // // // // // // // //                   <TabsContent value="enrolled" className="mt-6">
// // // // // // // // // // // //                     <div className="space-y-4">
// // // // // // // // // // // //                       {enrolledCourses.filter(course => !course.completed).map((course) => (
// // // // // // // // // // // //                         <Card key={course.id} className="hover:shadow-lg transition-shadow">
// // // // // // // // // // // //                           <CardContent className="p-6">
// // // // // // // // // // // //                             <div className="flex items-start gap-4">
// // // // // // // // // // // //                               <img
// // // // // // // // // // // //                                 src={course.thumbnail || 'https://images.pexels.com/photos/5212345/pexels-photo-5212345.jpeg'}
// // // // // // // // // // // //                                 alt={course.title}
// // // // // // // // // // // //                                 className="w-20 h-20 rounded-lg object-cover"
// // // // // // // // // // // //                               />
// // // // // // // // // // // //                               <div className="flex-1">
// // // // // // // // // // // //                                 <h3 className="font-semibold text-lg mb-2">{course.title}</h3>
// // // // // // // // // // // //                                 <p className="text-muted-foreground text-sm mb-3">{course.description}</p>
// // // // // // // // // // // //                                 <div className="flex items-center gap-4 mb-3">
// // // // // // // // // // // //                                   <Badge variant="secondary">{course.category}</Badge>
// // // // // // // // // // // //                                   <div className="flex items-center gap-1 text-sm text-muted-foreground">
// // // // // // // // // // // //                                     <Clock className="w-4 h-4" />
// // // // // // // // // // // //                                     {course.duration}
// // // // // // // // // // // //                                   </div>
// // // // // // // // // // // //                                 </div>
// // // // // // // // // // // //                                 <div className="space-y-2">
// // // // // // // // // // // //                                   <div className="flex justify-between items-center text-sm">
// // // // // // // // // // // //                                     <span>Progress</span>
// // // // // // // // // // // //                                     <span>{course.progress}%</span>
// // // // // // // // // // // //                                   </div>
// // // // // // // // // // // //                                   <Progress value={course.progress} className="w-full" />
// // // // // // // // // // // //                                 </div>
// // // // // // // // // // // //                               </div>
// // // // // // // // // // // //                               <div className="flex flex-col gap-2">
// // // // // // // // // // // //                                 <Button className="flex items-center gap-2">
// // // // // // // // // // // //                                 <Play className="w-4 h-4" />
// // // // // // // // // // // //                                 Continue
// // // // // // // // // // // //                               </Button>
// // // // // // // // // // // //                                 <Button variant="outline" size="sm" className="text-xs">
// // // // // // // // // // // //                                   View Content
// // // // // // // // // // // //                                 </Button>
// // // // // // // // // // // //                               </div>
// // // // // // // // // // // //                             </div>
// // // // // // // // // // // //                           </CardContent>
// // // // // // // // // // // //                         </Card>
// // // // // // // // // // // //                       ))}

// // // // // // // // // // // //                       {enrolledCourses.filter(course => !course.completed).length === 0 && (
// // // // // // // // // // // //                         <Card>
// // // // // // // // // // // //                           <CardContent className="p-12 text-center">
// // // // // // // // // // // //                             <BookOpen className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
// // // // // // // // // // // //                             <p className="text-muted-foreground">No enrolled courses yet.</p>
// // // // // // // // // // // //                             <Button className="mt-4">Browse Courses</Button>
// // // // // // // // // // // //                           </CardContent>
// // // // // // // // // // // //                         </Card>
// // // // // // // // // // // //                       )}
// // // // // // // // // // // //                     </div>
// // // // // // // // // // // //                   </TabsContent>

// // // // // // // // // // // //                   <TabsContent value="completed" className="mt-6">
// // // // // // // // // // // //                     <div className="space-y-4">
// // // // // // // // // // // //                       {enrolledCourses.filter(course => course.completed).map((course) => (
// // // // // // // // // // // //                         <Card key={course.id} className="hover:shadow-lg transition-shadow">
// // // // // // // // // // // //                           <CardContent className="p-6">
// // // // // // // // // // // //                             <div className="flex items-start gap-4">
// // // // // // // // // // // //                               <img
// // // // // // // // // // // //                                 src={course.thumbnail || 'https://images.pexels.com/photos/5212345/pexels-photo-5212345.jpeg'}
// // // // // // // // // // // //                                 alt={course.title}
// // // // // // // // // // // //                                 className="w-20 h-20 rounded-lg object-cover"
// // // // // // // // // // // //                               />
// // // // // // // // // // // //                               <div className="flex-1">
// // // // // // // // // // // //                                 <h3 className="font-semibold text-lg mb-2">{course.title}</h3>
// // // // // // // // // // // //                                 <p className="text-muted-foreground text-sm mb-3">{course.description}</p>
// // // // // // // // // // // //                                 <div className="flex items-center gap-4">
// // // // // // // // // // // //                                   <Badge variant="secondary" className="bg-green-100 text-green-800">
// // // // // // // // // // // //                                     Completed
// // // // // // // // // // // //                                   </Badge>
// // // // // // // // // // // //                                   <div className="flex items-center gap-1 text-sm text-muted-foreground">
// // // // // // // // // // // //                                     <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
// // // // // // // // // // // //                                     Rate Course
// // // // // // // // // // // //                                   </div>
// // // // // // // // // // // //                                 </div>
// // // // // // // // // // // //                               </div>
// // // // // // // // // // // //                               <Button
// // // // // // // // // // // //                                 variant="outline"
// // // // // // // // // // // //                                 className="flex items-center gap-2"
// // // // // // // // // // // //                                 onClick={() => downloadCertificate(course.id)}
// // // // // // // // // // // //                                 disabled={!course.canDownloadCertificate}
// // // // // // // // // // // //                               >
// // // // // // // // // // // //                                 <Download className="w-4 h-4" />
// // // // // // // // // // // //                                 Certificate
// // // // // // // // // // // //                               </Button>
// // // // // // // // // // // //                             </div>
// // // // // // // // // // // //                           </CardContent>
// // // // // // // // // // // //                         </Card>
// // // // // // // // // // // //                       ))}

// // // // // // // // // // // //                       {enrolledCourses.filter(course => course.completed).length === 0 && (
// // // // // // // // // // // //                         <Card>
// // // // // // // // // // // //                           <CardContent className="p-12 text-center">
// // // // // // // // // // // //                             <Award className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
// // // // // // // // // // // //                             <p className="text-muted-foreground">No completed courses yet.</p>
// // // // // // // // // // // //                           </CardContent>
// // // // // // // // // // // //                         </Card>
// // // // // // // // // // // //                       )}
// // // // // // // // // // // //                     </div>
// // // // // // // // // // // //                   </TabsContent>

// // // // // // // // // // // //                   <TabsContent value="certificates" className="mt-6">
// // // // // // // // // // // //                     <div className="space-y-4">
// // // // // // // // // // // //                       {enrolledCourses.filter(course => course.completed && course.canDownloadCertificate).map((course) => (
// // // // // // // // // // // //                         <Card key={course.id} className="hover:shadow-lg transition-shadow">
// // // // // // // // // // // //                           <CardContent className="p-6">
// // // // // // // // // // // //                             <div className="flex items-center justify-between">
// // // // // // // // // // // //                               <div className="flex items-center gap-4">
// // // // // // // // // // // //                                 <div className="w-16 h-16 bg-gradient-to-br from-primary to-blue-600 rounded-lg flex items-center justify-center">
// // // // // // // // // // // //                                   <Award className="w-8 h-8 text-white" />
// // // // // // // // // // // //                                 </div>
// // // // // // // // // // // //                                 <div>
// // // // // // // // // // // //                                   <h3 className="font-semibold text-lg">{course.title}</h3>
// // // // // // // // // // // //                                   <p className="text-muted-foreground">
// // // // // // // // // // // //                                     Completed on {new Date(course.completedAt).toLocaleDateString()}
// // // // // // // // // // // //                                   </p>
// // // // // // // // // // // //                                   <p className="text-sm text-muted-foreground">
// // // // // // // // // // // //                                     Credential ID: {course.credentialId}
// // // // // // // // // // // //                                   </p>
// // // // // // // // // // // //                                 </div>
// // // // // // // // // // // //                               </div>
// // // // // // // // // // // //                               <Button
// // // // // // // // // // // //                                 className="flex items-center gap-2"
// // // // // // // // // // // //                                 onClick={() => downloadCertificate(course.id)}
// // // // // // // // // // // //                               >
// // // // // // // // // // // //                                 <Download className="w-4 h-4" />
// // // // // // // // // // // //                                 Download
// // // // // // // // // // // //                               </Button>
// // // // // // // // // // // //                             </div>
// // // // // // // // // // // //                           </CardContent>
// // // // // // // // // // // //                         </Card>
// // // // // // // // // // // //                       ))}

// // // // // // // // // // // //                       {enrolledCourses.filter(course => course.completed && course.canDownloadCertificate).length === 0 && (
// // // // // // // // // // // //                         <Card>
// // // // // // // // // // // //                           <CardContent className="p-12 text-center">
// // // // // // // // // // // //                             <Award className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
// // // // // // // // // // // //                             <p className="text-muted-foreground">No certificates available yet.</p>
// // // // // // // // // // // //                             <p className="text-sm text-muted-foreground mt-2">
// // // // // // // // // // // //                               Certificates become available 30 days after course completion.
// // // // // // // // // // // //                             </p>
// // // // // // // // // // // //                           </CardContent>
// // // // // // // // // // // //                         </Card>
// // // // // // // // // // // //                       )}
// // // // // // // // // // // //                     </div>
// // // // // // // // // // // //                   </TabsContent>
// // // // // // // // // // // //                 </Tabs>
// // // // // // // // // // // //               </motion.div>
// // // // // // // // // // // //             </div>

// // // // // // // // // // // //             {/* Sidebar */}
// // // // // // // // // // // //             <div className="space-y-6">
// // // // // // // // // // // //               {/* Referral Card */}
// // // // // // // // // // // //               <motion.div
// // // // // // // // // // // //                 initial={{ opacity: 0, x: 20 }}
// // // // // // // // // // // //                 animate={{ opacity: 1, x: 0 }}
// // // // // // // // // // // //                 transition={{ duration: 0.6, delay: 0.3 }}
// // // // // // // // // // // //               >
// // // // // // // // // // // //                 <Card>
// // // // // // // // // // // //                   <CardHeader>
// // // // // // // // // // // //                     <CardTitle className="flex items-center gap-2">
// // // // // // // // // // // //                       <Gift className="w-5 h-5" />
// // // // // // // // // // // //                       Refer & Earn
// // // // // // // // // // // //                     </CardTitle>
// // // // // // // // // // // //                     <CardDescription>
// // // // // // // // // // // //                       Earn credits when your friends join and purchase courses
// // // // // // // // // // // //                     </CardDescription>
// // // // // // // // // // // //                   </CardHeader>
// // // // // // // // // // // //                   <CardContent className="space-y-4">
// // // // // // // // // // // //                     <div className="p-3 bg-primary/10 rounded-lg text-center">
// // // // // // // // // // // //                       <p className="text-2xl font-bold text-primary">{userStats.credits}</p>
// // // // // // // // // // // //                       <p className="text-sm text-muted-foreground">Available Credits</p>
// // // // // // // // // // // //                     </div>

// // // // // // // // // // // //                     <div className="space-y-2">
// // // // // // // // // // // //                       <Label htmlFor="referral-code">Your Referral Code</Label>
// // // // // // // // // // // //                       <div className="flex gap-2">
// // // // // // // // // // // //                         <Input
// // // // // // // // // // // //                           id="referral-code"
// // // // // // // // // // // //                           value={referralCode}
// // // // // // // // // // // //                           readOnly
// // // // // // // // // // // //                           className="font-mono"
// // // // // // // // // // // //                         />
// // // // // // // // // // // //                         <Button
// // // // // // // // // // // //                           size="sm"
// // // // // // // // // // // //                           variant="outline"
// // // // // // // // // // // //                           onClick={copyReferralLink}
// // // // // // // // // // // //                         >
// // // // // // // // // // // //                           <Copy className="w-4 h-4" />
// // // // // // // // // // // //                         </Button>
// // // // // // // // // // // //                       </div>
// // // // // // // // // // // //                     </div>

// // // // // // // // // // // //                     <div className="text-sm text-muted-foreground">
// // // // // // // // // // // //                       <p>• Earn 100 credits per successful referral</p>
// // // // // // // // // // // //                       <p>• Use credits for discounts on courses</p>
// // // // // // // // // // // //                     </div>
// // // // // // // // // // // //                   </CardContent>
// // // // // // // // // // // //                 </Card>
// // // // // // // // // // // //               </motion.div>

// // // // // // // // // // // //               {/* Recent Activity */}
// // // // // // // // // // // //               <motion.div
// // // // // // // // // // // //                 initial={{ opacity: 0, x: 20 }}
// // // // // // // // // // // //                 animate={{ opacity: 1, x: 0 }}
// // // // // // // // // // // //                 transition={{ duration: 0.6, delay: 0.4 }}
// // // // // // // // // // // //               >
// // // // // // // // // // // //                 <Card>
// // // // // // // // // // // //                   <CardHeader>
// // // // // // // // // // // //                     <CardTitle className="flex items-center gap-2">
// // // // // // // // // // // //                       <TrendingUp className="w-5 h-5" />
// // // // // // // // // // // //                       Recent Activity
// // // // // // // // // // // //                     </CardTitle>
// // // // // // // // // // // //                   </CardHeader>
// // // // // // // // // // // //                   <CardContent className="space-y-4">
// // // // // // // // // // // //                     {recentActivity.length > 0 ? (
// // // // // // // // // // // //                       recentActivity.map((activity, index) => (
// // // // // // // // // // // //                         <div key={index} className="flex items-start gap-3 p-3 rounded-lg bg-muted/50">
// // // // // // // // // // // //                           <div className="w-2 h-2 bg-primary rounded-full mt-2" />
// // // // // // // // // // // //                           <div className="flex-1">
// // // // // // // // // // // //                             <p className="text-sm font-medium">{activity.title}</p>
// // // // // // // // // // // //                             <p className="text-xs text-muted-foreground">{activity.description}</p>
// // // // // // // // // // // //                             <p className="text-xs text-muted-foreground mt-1">{activity.timestamp}</p>
// // // // // // // // // // // //                           </div>
// // // // // // // // // // // //                         </div>
// // // // // // // // // // // //                       ))
// // // // // // // // // // // //                     ) : (
// // // // // // // // // // // //                       <p className="text-sm text-muted-foreground text-center py-4">
// // // // // // // // // // // //                         No recent activity
// // // // // // // // // // // //                       </p>
// // // // // // // // // // // //                     )}
// // // // // // // // // // // //                   </CardContent>
// // // // // // // // // // // //                 </Card>
// // // // // // // // // // // //               </motion.div>
// // // // // // // // // // // //             </div>
// // // // // // // // // // // //           </div>
// // // // // // // // // // // //         </div>
// // // // // // // // // // // //       </main>
// // // // // // // // // // // //     </div>
// // // // // // // // // // // //   );
// // // // // // // // // // // // }

// // // // // // // // // // // 'use client';

// // // // // // // // // // // import { useState, useEffect } from 'react';
// // // // // // // // // // // import { motion } from 'framer-motion';
// // // // // // // // // // // import { 
// // // // // // // // // // //   BookOpen, 
// // // // // // // // // // //   Award, 
// // // // // // // // // // //   Clock, 
// // // // // // // // // // //   TrendingUp, 
// // // // // // // // // // //   Play, 
// // // // // // // // // // //   Download,
// // // // // // // // // // //   Users,
// // // // // // // // // // //   Star,
// // // // // // // // // // //   Gift,
// // // // // // // // // // //   Copy,
// // // // // // // // // // //   CheckCircle,
// // // // // // // // // // //   Settings,
// // // // // // // // // // //   User,
// // // // // // // // // // //   CreditCard,
// // // // // // // // // // //   Bell,
// // // // // // // // // // //   Lock,
// // // // // // // // // // //   Eye,
// // // // // // // // // // //   EyeOff
// // // // // // // // // // // } from 'lucide-react';
// // // // // // // // // // // import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
// // // // // // // // // // // import { Button } from '@/components/ui/button';
// // // // // // // // // // // import { Badge } from '@/components/ui/badge';
// // // // // // // // // // // import { Progress } from '@/components/ui/progress';
// // // // // // // // // // // import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
// // // // // // // // // // // import { Input } from '@/components/ui/input';
// // // // // // // // // // // import { Label } from '@/components/ui/label';
// // // // // // // // // // // import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
// // // // // // // // // // // import { toast } from 'sonner';
// // // // // // // // // // // import { useAuth } from '@/components/auth-provider';
// // // // // // // // // // // import Navbar from '@/components/navbar';

// // // // // // // // // // // export default function Dashboard() {
// // // // // // // // // // //   const { user, getAuthToken } = useAuth();
// // // // // // // // // // //   const [userStats, setUserStats] = useState({
// // // // // // // // // // //     enrolledCourses: 0,
// // // // // // // // // // //     completedCourses: 0,
// // // // // // // // // // //     certificatesEarned: 0,
// // // // // // // // // // //     totalWatchTime: 0,
// // // // // // // // // // //     credits: 0
// // // // // // // // // // //   });
// // // // // // // // // // //   const [enrolledCourses, setEnrolledCourses] = useState([]);
// // // // // // // // // // //   const [recentActivity, setRecentActivity] = useState([]);
// // // // // // // // // // //   const [referralCode, setReferralCode] = useState('');
// // // // // // // // // // //   const [profileData, setProfileData] = useState({
// // // // // // // // // // //     fullName: '',
// // // // // // // // // // //     email: '',
// // // // // // // // // // //     location: '',
// // // // // // // // // // //   });
// // // // // // // // // // //   const [passwordData, setPasswordData] = useState({
// // // // // // // // // // //     currentPassword: '',
// // // // // // // // // // //     newPassword: '',
// // // // // // // // // // //     confirmPassword: '',
// // // // // // // // // // //   });
// // // // // // // // // // //   const [showPasswords, setShowPasswords] = useState({
// // // // // // // // // // //     current: false,
// // // // // // // // // // //     new: false,
// // // // // // // // // // //     confirm: false,
// // // // // // // // // // //   });
// // // // // // // // // // //   const [isProfileDialogOpen, setIsProfileDialogOpen] = useState(false);
// // // // // // // // // // //   const [isPasswordDialogOpen, setIsPasswordDialogOpen] = useState(false);
// // // // // // // // // // //   const [isLoading, setIsLoading] = useState(false);

// // // // // // // // // // //   useEffect(() => {
// // // // // // // // // // //     if (user) {
// // // // // // // // // // //       fetchUserData();
// // // // // // // // // // //       setReferralCode(user.referralCode || '');
// // // // // // // // // // //       setProfileData({
// // // // // // // // // // //         fullName: user.fullName || '',
// // // // // // // // // // //         email: user.email || '',
// // // // // // // // // // //         location: user.location || '',
// // // // // // // // // // //       });
// // // // // // // // // // //     }
// // // // // // // // // // //   }, [user]);

// // // // // // // // // // //   const fetchUserData = async () => {
// // // // // // // // // // //     try {
// // // // // // // // // // //       const token = getAuthToken();
// // // // // // // // // // //       const response = await fetch('/api/user/dashboard', {
// // // // // // // // // // //         headers: {
// // // // // // // // // // //           'Authorization': `Bearer ${token}`,
// // // // // // // // // // //         },
// // // // // // // // // // //       });

// // // // // // // // // // //       if (response.ok) {
// // // // // // // // // // //         const data = await response.json();
// // // // // // // // // // //         setUserStats(data.stats);
// // // // // // // // // // //         setEnrolledCourses(data.enrolledCourses);
// // // // // // // // // // //         setRecentActivity(data.recentActivity);
// // // // // // // // // // //       }
// // // // // // // // // // //     } catch (error) {
// // // // // // // // // // //       console.error('Error fetching user data:', error);
// // // // // // // // // // //     }
// // // // // // // // // // //   };

// // // // // // // // // // //   const updateProfile = async () => {
// // // // // // // // // // //     if (!profileData.fullName || !profileData.location) {
// // // // // // // // // // //       toast.error('Please fill in all required fields');
// // // // // // // // // // //       return;
// // // // // // // // // // //     }

// // // // // // // // // // //     setIsLoading(true);
// // // // // // // // // // //     try {
// // // // // // // // // // //       const token = getAuthToken();
// // // // // // // // // // //       const response = await fetch('/api/user/profile', {
// // // // // // // // // // //         method: 'PUT',
// // // // // // // // // // //         headers: {
// // // // // // // // // // //           'Content-Type': 'application/json',
// // // // // // // // // // //           'Authorization': `Bearer ${token}`,
// // // // // // // // // // //         },
// // // // // // // // // // //         body: JSON.stringify(profileData),
// // // // // // // // // // //       });

// // // // // // // // // // //       if (response.ok) {
// // // // // // // // // // //         toast.success('Profile updated successfully!');
// // // // // // // // // // //         setIsProfileDialogOpen(false);
// // // // // // // // // // //         // Refresh user data
// // // // // // // // // // //         fetchUserData();
// // // // // // // // // // //       } else {
// // // // // // // // // // //         const data = await response.json();
// // // // // // // // // // //         toast.error(data.message || 'Failed to update profile');
// // // // // // // // // // //       }
// // // // // // // // // // //     } catch (error) {
// // // // // // // // // // //       console.error('Error updating profile:', error);
// // // // // // // // // // //       toast.error('Something went wrong. Please try again.');
// // // // // // // // // // //     } finally {
// // // // // // // // // // //       setIsLoading(false);
// // // // // // // // // // //     }
// // // // // // // // // // //   };

// // // // // // // // // // //   const changePassword = async () => {
// // // // // // // // // // //     if (!passwordData.currentPassword || !passwordData.newPassword || !passwordData.confirmPassword) {
// // // // // // // // // // //       toast.error('Please fill in all fields');
// // // // // // // // // // //       return;
// // // // // // // // // // //     }

// // // // // // // // // // //     if (passwordData.newPassword !== passwordData.confirmPassword) {
// // // // // // // // // // //       toast.error('New passwords do not match');
// // // // // // // // // // //       return;
// // // // // // // // // // //     }

// // // // // // // // // // //     if (passwordData.newPassword.length < 6) {
// // // // // // // // // // //       toast.error('Password must be at least 6 characters long');
// // // // // // // // // // //       return;
// // // // // // // // // // //     }

// // // // // // // // // // //     setIsLoading(true);
// // // // // // // // // // //     try {
// // // // // // // // // // //       const token = getAuthToken();
// // // // // // // // // // //       const response = await fetch('/api/user/change-password', {
// // // // // // // // // // //         method: 'POST',
// // // // // // // // // // //         headers: {
// // // // // // // // // // //           'Content-Type': 'application/json',
// // // // // // // // // // //           'Authorization': `Bearer ${token}`,
// // // // // // // // // // //         },
// // // // // // // // // // //         body: JSON.stringify(passwordData),
// // // // // // // // // // //       });

// // // // // // // // // // //       if (response.ok) {
// // // // // // // // // // //         toast.success('Password changed successfully!');
// // // // // // // // // // //         setIsPasswordDialogOpen(false);
// // // // // // // // // // //         setPasswordData({
// // // // // // // // // // //           currentPassword: '',
// // // // // // // // // // //           newPassword: '',
// // // // // // // // // // //           confirmPassword: '',
// // // // // // // // // // //         });
// // // // // // // // // // //       } else {
// // // // // // // // // // //         const data = await response.json();
// // // // // // // // // // //         toast.error(data.message || 'Failed to change password');
// // // // // // // // // // //       }
// // // // // // // // // // //     } catch (error) {
// // // // // // // // // // //       console.error('Error changing password:', error);
// // // // // // // // // // //       toast.error('Something went wrong. Please try again.');
// // // // // // // // // // //     } finally {
// // // // // // // // // // //       setIsLoading(false);
// // // // // // // // // // //     }
// // // // // // // // // // //   };

// // // // // // // // // // //   const copyReferralLink = () => {
// // // // // // // // // // //     const referralLink = `${window.location.origin}/auth/register?ref=${referralCode}`;
// // // // // // // // // // //     navigator.clipboard.writeText(referralLink);
// // // // // // // // // // //     toast.success('Referral link copied to clipboard!');
// // // // // // // // // // //   };

// // // // // // // // // // //   const downloadCertificate = async (courseId) => {
// // // // // // // // // // //     try {
// // // // // // // // // // //       const token = getAuthToken();
// // // // // // // // // // //       const response = await fetch(`/api/certificates/download/${courseId}`, {
// // // // // // // // // // //         headers: {
// // // // // // // // // // //           'Authorization': `Bearer ${token}`,
// // // // // // // // // // //         },
// // // // // // // // // // //       });

// // // // // // // // // // //       if (response.ok) {
// // // // // // // // // // //         const blob = await response.blob();
// // // // // // // // // // //         const url = window.URL.createObjectURL(blob);
// // // // // // // // // // //         const a = document.createElement('a');
// // // // // // // // // // //         a.style.display = 'none';
// // // // // // // // // // //         a.href = url;
// // // // // // // // // // //         a.download = `certificate-${courseId}.pdf`;
// // // // // // // // // // //         document.body.appendChild(a);
// // // // // // // // // // //         a.click();
// // // // // // // // // // //         window.URL.revokeObjectURL(url);
// // // // // // // // // // //         toast.success('Certificate downloaded successfully!');
// // // // // // // // // // //       } else {
// // // // // // // // // // //         toast.error('Error downloading certificate');
// // // // // // // // // // //       }
// // // // // // // // // // //     } catch (error) {
// // // // // // // // // // //       console.error('Error downloading certificate:', error);
// // // // // // // // // // //       toast.error('Error downloading certificate');
// // // // // // // // // // //     }
// // // // // // // // // // //   };

// // // // // // // // // // //   const stats = [
// // // // // // // // // // //     {
// // // // // // // // // // //       title: 'Enrolled Courses',
// // // // // // // // // // //       value: userStats.enrolledCourses,
// // // // // // // // // // //       icon: BookOpen,
// // // // // // // // // // //       color: 'text-blue-600',
// // // // // // // // // // //       bgColor: 'bg-blue-50 dark:bg-blue-950'
// // // // // // // // // // //     },
// // // // // // // // // // //     {
// // // // // // // // // // //       title: 'Completed',
// // // // // // // // // // //       value: userStats.completedCourses,
// // // // // // // // // // //       icon: CheckCircle,
// // // // // // // // // // //       color: 'text-green-600',
// // // // // // // // // // //       bgColor: 'bg-green-50 dark:bg-green-950'
// // // // // // // // // // //     },
// // // // // // // // // // //     {
// // // // // // // // // // //       title: 'Certificates',
// // // // // // // // // // //       value: userStats.certificatesEarned,
// // // // // // // // // // //       icon: Award,
// // // // // // // // // // //       color: 'text-purple-600',
// // // // // // // // // // //       bgColor: 'bg-purple-50 dark:bg-purple-950'
// // // // // // // // // // //     },
// // // // // // // // // // //     {
// // // // // // // // // // //       title: 'Credits',
// // // // // // // // // // //       value: userStats.credits,
// // // // // // // // // // //       icon: Gift,
// // // // // // // // // // //       color: 'text-orange-600',
// // // // // // // // // // //       bgColor: 'bg-orange-50 dark:bg-orange-950'
// // // // // // // // // // //     }
// // // // // // // // // // //   ];

// // // // // // // // // // //   if (!user) {
// // // // // // // // // // //     return (
// // // // // // // // // // //       <div className="min-h-screen flex items-center justify-center">
// // // // // // // // // // //         <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
// // // // // // // // // // //       </div>
// // // // // // // // // // //     );
// // // // // // // // // // //   }

// // // // // // // // // // //   return (
// // // // // // // // // // //     <div className="min-h-screen bg-background">
// // // // // // // // // // //       <Navbar />

// // // // // // // // // // //       <main className="pt-20 pb-12">
// // // // // // // // // // //         <div className="container mx-auto px-4">
// // // // // // // // // // //           {/* Header with Profile Actions */}
// // // // // // // // // // //           <motion.div
// // // // // // // // // // //             className="mb-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4"
// // // // // // // // // // //             initial={{ opacity: 0, y: 20 }}
// // // // // // // // // // //             animate={{ opacity: 1, y: 0 }}
// // // // // // // // // // //             transition={{ duration: 0.6 }}
// // // // // // // // // // //           >
// // // // // // // // // // //             <div>
// // // // // // // // // // //               <h1 className="text-3xl font-bold mb-2">
// // // // // // // // // // //                 Welcome back, {user.fullName}! 👋
// // // // // // // // // // //               </h1>
// // // // // // // // // // //               <p className="text-muted-foreground">
// // // // // // // // // // //                 Continue your learning journey and track your progress.
// // // // // // // // // // //               </p>
// // // // // // // // // // //             </div>
// // // // // // // // // // //             <div className="flex gap-2">
// // // // // // // // // // //               <Dialog open={isProfileDialogOpen} onOpenChange={setIsProfileDialogOpen}>
// // // // // // // // // // //                 <DialogTrigger asChild>
// // // // // // // // // // //                   <Button variant="outline" className="flex items-center gap-2">
// // // // // // // // // // //                     <User className="w-4 h-4" />
// // // // // // // // // // //                     Profile
// // // // // // // // // // //                   </Button>
// // // // // // // // // // //                 </DialogTrigger>
// // // // // // // // // // //                 <DialogContent>
// // // // // // // // // // //                   <DialogHeader>
// // // // // // // // // // //                     <DialogTitle>Edit Profile</DialogTitle>
// // // // // // // // // // //                     <DialogDescription>
// // // // // // // // // // //                       Update your profile information
// // // // // // // // // // //                     </DialogDescription>
// // // // // // // // // // //                   </DialogHeader>
// // // // // // // // // // //                   <div className="space-y-4">
// // // // // // // // // // //                     <div className="space-y-2">
// // // // // // // // // // //                       <Label htmlFor="fullName">Full Name</Label>
// // // // // // // // // // //                       <Input
// // // // // // // // // // //                         id="fullName"
// // // // // // // // // // //                         value={profileData.fullName}
// // // // // // // // // // //                         onChange={(e) => setProfileData(prev => ({ ...prev, fullName: e.target.value }))}
// // // // // // // // // // //                         placeholder="Enter your full name"
// // // // // // // // // // //                       />
// // // // // // // // // // //                     </div>
// // // // // // // // // // //                     <div className="space-y-2">
// // // // // // // // // // //                       <Label htmlFor="email">Email (Cannot be changed)</Label>
// // // // // // // // // // //                       <Input
// // // // // // // // // // //                         id="email"
// // // // // // // // // // //                         value={profileData.email}
// // // // // // // // // // //                         disabled
// // // // // // // // // // //                         className="bg-muted"
// // // // // // // // // // //                       />
// // // // // // // // // // //                     </div>
// // // // // // // // // // //                     <div className="space-y-2">
// // // // // // // // // // //                       <Label htmlFor="location">Location</Label>
// // // // // // // // // // //                       <Input
// // // // // // // // // // //                         id="location"
// // // // // // // // // // //                         value={profileData.location}
// // // // // // // // // // //                         onChange={(e) => setProfileData(prev => ({ ...prev, location: e.target.value }))}
// // // // // // // // // // //                         placeholder="Enter your location"
// // // // // // // // // // //                       />
// // // // // // // // // // //                     </div>
// // // // // // // // // // //                     <div className="flex gap-2">
// // // // // // // // // // //                       <Button onClick={updateProfile} disabled={isLoading} className="flex-1">
// // // // // // // // // // //                         {isLoading ? 'Updating...' : 'Update Profile'}
// // // // // // // // // // //                       </Button>
// // // // // // // // // // //                       <Button variant="outline" onClick={() => setIsProfileDialogOpen(false)}>
// // // // // // // // // // //                         Cancel
// // // // // // // // // // //                       </Button>
// // // // // // // // // // //                     </div>
// // // // // // // // // // //                   </div>
// // // // // // // // // // //                 </DialogContent>
// // // // // // // // // // //               </Dialog>

// // // // // // // // // // //               <Dialog open={isPasswordDialogOpen} onOpenChange={setIsPasswordDialogOpen}>
// // // // // // // // // // //                 <DialogTrigger asChild>
// // // // // // // // // // //                   <Button variant="outline" className="flex items-center gap-2">
// // // // // // // // // // //                     <Lock className="w-4 h-4" />
// // // // // // // // // // //                     Change Password
// // // // // // // // // // //                   </Button>
// // // // // // // // // // //                 </DialogTrigger>
// // // // // // // // // // //                 <DialogContent>
// // // // // // // // // // //                   <DialogHeader>
// // // // // // // // // // //                     <DialogTitle>Change Password</DialogTitle>
// // // // // // // // // // //                     <DialogDescription>
// // // // // // // // // // //                       Enter your current password and choose a new one
// // // // // // // // // // //                     </DialogDescription>
// // // // // // // // // // //                   </DialogHeader>
// // // // // // // // // // //                   <div className="space-y-4">
// // // // // // // // // // //                     <div className="space-y-2">
// // // // // // // // // // //                       <Label htmlFor="currentPassword">Current Password</Label>
// // // // // // // // // // //                       <div className="relative">
// // // // // // // // // // //                         <Input
// // // // // // // // // // //                           id="currentPassword"
// // // // // // // // // // //                           type={showPasswords.current ? 'text' : 'password'}
// // // // // // // // // // //                           value={passwordData.currentPassword}
// // // // // // // // // // //                           onChange={(e) => setPasswordData(prev => ({ ...prev, currentPassword: e.target.value }))}
// // // // // // // // // // //                           placeholder="Enter current password"
// // // // // // // // // // //                           className="pr-10"
// // // // // // // // // // //                         />
// // // // // // // // // // //                         <button
// // // // // // // // // // //                           type="button"
// // // // // // // // // // //                           onClick={() => setShowPasswords(prev => ({ ...prev, current: !prev.current }))}
// // // // // // // // // // //                           className="absolute right-3 top-3 text-muted-foreground hover:text-primary"
// // // // // // // // // // //                         >
// // // // // // // // // // //                           {showPasswords.current ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
// // // // // // // // // // //                         </button>
// // // // // // // // // // //                       </div>
// // // // // // // // // // //                     </div>
// // // // // // // // // // //                     <div className="space-y-2">
// // // // // // // // // // //                       <Label htmlFor="newPassword">New Password</Label>
// // // // // // // // // // //                       <div className="relative">
// // // // // // // // // // //                         <Input
// // // // // // // // // // //                           id="newPassword"
// // // // // // // // // // //                           type={showPasswords.new ? 'text' : 'password'}
// // // // // // // // // // //                           value={passwordData.newPassword}
// // // // // // // // // // //                           onChange={(e) => setPasswordData(prev => ({ ...prev, newPassword: e.target.value }))}
// // // // // // // // // // //                           placeholder="Enter new password"
// // // // // // // // // // //                           className="pr-10"
// // // // // // // // // // //                         />
// // // // // // // // // // //                         <button
// // // // // // // // // // //                           type="button"
// // // // // // // // // // //                           onClick={() => setShowPasswords(prev => ({ ...prev, new: !prev.new }))}
// // // // // // // // // // //                           className="absolute right-3 top-3 text-muted-foreground hover:text-primary"
// // // // // // // // // // //                         >
// // // // // // // // // // //                           {showPasswords.new ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
// // // // // // // // // // //                         </button>
// // // // // // // // // // //                       </div>
// // // // // // // // // // //                     </div>
// // // // // // // // // // //                     <div className="space-y-2">
// // // // // // // // // // //                       <Label htmlFor="confirmPassword">Confirm New Password</Label>
// // // // // // // // // // //                       <div className="relative">
// // // // // // // // // // //                         <Input
// // // // // // // // // // //                           id="confirmPassword"
// // // // // // // // // // //                           type={showPasswords.confirm ? 'text' : 'password'}
// // // // // // // // // // //                           value={passwordData.confirmPassword}
// // // // // // // // // // //                           onChange={(e) => setPasswordData(prev => ({ ...prev, confirmPassword: e.target.value }))}
// // // // // // // // // // //                           placeholder="Confirm new password"
// // // // // // // // // // //                           className="pr-10"
// // // // // // // // // // //                         />
// // // // // // // // // // //                         <button
// // // // // // // // // // //                           type="button"
// // // // // // // // // // //                           onClick={() => setShowPasswords(prev => ({ ...prev, confirm: !prev.confirm }))}
// // // // // // // // // // //                           className="absolute right-3 top-3 text-muted-foreground hover:text-primary"
// // // // // // // // // // //                         >
// // // // // // // // // // //                           {showPasswords.confirm ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
// // // // // // // // // // //                         </button>
// // // // // // // // // // //                       </div>
// // // // // // // // // // //                     </div>
// // // // // // // // // // //                     <div className="flex gap-2">
// // // // // // // // // // //                       <Button onClick={changePassword} disabled={isLoading} className="flex-1">
// // // // // // // // // // //                         {isLoading ? 'Changing...' : 'Change Password'}
// // // // // // // // // // //                       </Button>
// // // // // // // // // // //                       <Button variant="outline" onClick={() => setIsPasswordDialogOpen(false)}>
// // // // // // // // // // //                         Cancel
// // // // // // // // // // //                       </Button>
// // // // // // // // // // //                     </div>
// // // // // // // // // // //                   </div>
// // // // // // // // // // //                 </DialogContent>
// // // // // // // // // // //               </Dialog>
// // // // // // // // // // //             </div>
// // // // // // // // // // //           </motion.div>

// // // // // // // // // // //           {/* Stats Cards */}
// // // // // // // // // // //           <motion.div
// // // // // // // // // // //             className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
// // // // // // // // // // //             initial={{ opacity: 0, y: 20 }}
// // // // // // // // // // //             animate={{ opacity: 1, y: 0 }}
// // // // // // // // // // //             transition={{ duration: 0.6, delay: 0.1 }}
// // // // // // // // // // //           >
// // // // // // // // // // //             {stats.map((stat, index) => (
// // // // // // // // // // //               <Card key={stat.title} className="hover:shadow-lg transition-shadow">
// // // // // // // // // // //                 <CardContent className="p-6">
// // // // // // // // // // //                   <div className="flex items-center justify-between">
// // // // // // // // // // //                     <div>
// // // // // // // // // // //                       <p className="text-sm text-muted-foreground mb-1">{stat.title}</p>
// // // // // // // // // // //                       <p className="text-2xl font-bold">{stat.value}</p>
// // // // // // // // // // //                     </div>
// // // // // // // // // // //                     <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${stat.bgColor}`}>
// // // // // // // // // // //                       <stat.icon className={`w-6 h-6 ${stat.color}`} />
// // // // // // // // // // //                     </div>
// // // // // // // // // // //                   </div>
// // // // // // // // // // //                 </CardContent>
// // // // // // // // // // //               </Card>
// // // // // // // // // // //             ))}
// // // // // // // // // // //           </motion.div>

// // // // // // // // // // //           <div className="grid lg:grid-cols-3 gap-8">
// // // // // // // // // // //             {/* Main Content */}
// // // // // // // // // // //             <div className="lg:col-span-2 space-y-8">
// // // // // // // // // // //               {/* Course Tabs */}
// // // // // // // // // // //               <motion.div
// // // // // // // // // // //                 initial={{ opacity: 0, y: 20 }}
// // // // // // // // // // //                 animate={{ opacity: 1, y: 0 }}
// // // // // // // // // // //                 transition={{ duration: 0.6, delay: 0.2 }}
// // // // // // // // // // //               >
// // // // // // // // // // //                 <Tabs defaultValue="enrolled" className="w-full">
// // // // // // // // // // //                   <TabsList className="grid w-full grid-cols-3">
// // // // // // // // // // //                     <TabsTrigger value="enrolled">Enrolled</TabsTrigger>
// // // // // // // // // // //                     <TabsTrigger value="completed">Completed</TabsTrigger>
// // // // // // // // // // //                     <TabsTrigger value="certificates">Certificates</TabsTrigger>
// // // // // // // // // // //                   </TabsList>

// // // // // // // // // // //                   <TabsContent value="enrolled" className="mt-6">
// // // // // // // // // // //                     <div className="space-y-4">
// // // // // // // // // // //                       {enrolledCourses.filter(course => !course.completed).map((course) => (
// // // // // // // // // // //                         <Card key={course.id} className="hover:shadow-lg transition-shadow">
// // // // // // // // // // //                           <CardContent className="p-6">
// // // // // // // // // // //                             <div className="flex items-start gap-4">
// // // // // // // // // // //                               <img
// // // // // // // // // // //                                 src={course.thumbnail || 'https://images.pexels.com/photos/5212345/pexels-photo-5212345.jpeg'}
// // // // // // // // // // //                                 alt={course.title}
// // // // // // // // // // //                                 className="w-20 h-20 rounded-lg object-cover"
// // // // // // // // // // //                               />
// // // // // // // // // // //                               <div className="flex-1">
// // // // // // // // // // //                                 <h3 className="font-semibold text-lg mb-2">{course.title}</h3>
// // // // // // // // // // //                                 <p className="text-muted-foreground text-sm mb-3">{course.description}</p>
// // // // // // // // // // //                                 <div className="flex items-center gap-4 mb-3">
// // // // // // // // // // //                                   <Badge variant="secondary">{course.category}</Badge>
// // // // // // // // // // //                                   <div className="flex items-center gap-1 text-sm text-muted-foreground">
// // // // // // // // // // //                                     <Clock className="w-4 h-4" />
// // // // // // // // // // //                                     {course.duration}
// // // // // // // // // // //                                   </div>
// // // // // // // // // // //                                 </div>
// // // // // // // // // // //                                 <div className="space-y-2">
// // // // // // // // // // //                                   <div className="flex justify-between items-center text-sm">
// // // // // // // // // // //                                     <span>Progress</span>
// // // // // // // // // // //                                     <span>{course.progress}%</span>
// // // // // // // // // // //                                   </div>
// // // // // // // // // // //                                   <Progress value={course.progress} className="w-full" />
// // // // // // // // // // //                                 </div>
// // // // // // // // // // //                               </div>
// // // // // // // // // // //                               <div className="flex flex-col gap-2">
// // // // // // // // // // //                                 <Button className="flex items-center gap-2">
// // // // // // // // // // //                                   <Play className="w-4 h-4" />
// // // // // // // // // // //                                   Continue
// // // // // // // // // // //                                 </Button>
// // // // // // // // // // //                                 <Button variant="outline" size="sm" className="text-xs">
// // // // // // // // // // //                                   View Content
// // // // // // // // // // //                                 </Button>
// // // // // // // // // // //                               </div>
// // // // // // // // // // //                             </div>
// // // // // // // // // // //                           </CardContent>
// // // // // // // // // // //                         </Card>
// // // // // // // // // // //                       ))}

// // // // // // // // // // //                       {enrolledCourses.filter(course => !course.completed).length === 0 && (
// // // // // // // // // // //                         <Card>
// // // // // // // // // // //                           <CardContent className="p-12 text-center">
// // // // // // // // // // //                             <BookOpen className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
// // // // // // // // // // //                             <p className="text-muted-foreground">No enrolled courses yet.</p>
// // // // // // // // // // //                             <Button className="mt-4">Browse Courses</Button>
// // // // // // // // // // //                           </CardContent>
// // // // // // // // // // //                         </Card>
// // // // // // // // // // //                       )}
// // // // // // // // // // //                     </div>
// // // // // // // // // // //                   </TabsContent>

// // // // // // // // // // //                   <TabsContent value="completed" className="mt-6">
// // // // // // // // // // //                     <div className="space-y-4">
// // // // // // // // // // //                       {enrolledCourses.filter(course => course.completed).map((course) => (
// // // // // // // // // // //                         <Card key={course.id} className="hover:shadow-lg transition-shadow">
// // // // // // // // // // //                           <CardContent className="p-6">
// // // // // // // // // // //                             <div className="flex items-start gap-4">
// // // // // // // // // // //                               <img
// // // // // // // // // // //                                 src={course.thumbnail || 'https://images.pexels.com/photos/5212345/pexels-photo-5212345.jpeg'}
// // // // // // // // // // //                                 alt={course.title}
// // // // // // // // // // //                                 className="w-20 h-20 rounded-lg object-cover"
// // // // // // // // // // //                               />
// // // // // // // // // // //                               <div className="flex-1">
// // // // // // // // // // //                                 <h3 className="font-semibold text-lg mb-2">{course.title}</h3>
// // // // // // // // // // //                                 <p className="text-muted-foreground text-sm mb-3">{course.description}</p>
// // // // // // // // // // //                                 <div className="flex items-center gap-4">
// // // // // // // // // // //                                   <Badge variant="secondary" className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100">
// // // // // // // // // // //                                     Completed
// // // // // // // // // // //                                   </Badge>
// // // // // // // // // // //                                   <div className="flex items-center gap-1 text-sm text-muted-foreground">
// // // // // // // // // // //                                     <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
// // // // // // // // // // //                                     Rate Course
// // // // // // // // // // //                                   </div>
// // // // // // // // // // //                                 </div>
// // // // // // // // // // //                               </div>
// // // // // // // // // // //                               <Button
// // // // // // // // // // //                                 variant="outline"
// // // // // // // // // // //                                 className="flex items-center gap-2"
// // // // // // // // // // //                                 onClick={() => downloadCertificate(course.id)}
// // // // // // // // // // //                                 disabled={!course.canDownloadCertificate}
// // // // // // // // // // //                               >
// // // // // // // // // // //                                 <Download className="w-4 h-4" />
// // // // // // // // // // //                                 Certificate
// // // // // // // // // // //                               </Button>
// // // // // // // // // // //                             </div>
// // // // // // // // // // //                           </CardContent>
// // // // // // // // // // //                         </Card>
// // // // // // // // // // //                       ))}

// // // // // // // // // // //                       {enrolledCourses.filter(course => course.completed).length === 0 && (
// // // // // // // // // // //                         <Card>
// // // // // // // // // // //                           <CardContent className="p-12 text-center">
// // // // // // // // // // //                             <Award className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
// // // // // // // // // // //                             <p className="text-muted-foreground">No completed courses yet.</p>
// // // // // // // // // // //                           </CardContent>
// // // // // // // // // // //                         </Card>
// // // // // // // // // // //                       )}
// // // // // // // // // // //                     </div>
// // // // // // // // // // //                   </TabsContent>

// // // // // // // // // // //                   <TabsContent value="certificates" className="mt-6">
// // // // // // // // // // //                     <div className="space-y-4">
// // // // // // // // // // //                       {enrolledCourses.filter(course => course.completed && course.canDownloadCertificate).map((course) => (
// // // // // // // // // // //                         <Card key={course.id} className="hover:shadow-lg transition-shadow">
// // // // // // // // // // //                           <CardContent className="p-6">
// // // // // // // // // // //                             <div className="flex items-center justify-between">
// // // // // // // // // // //                               <div className="flex items-center gap-4">
// // // // // // // // // // //                                 <div className="w-16 h-16 bg-gradient-to-br from-primary to-blue-600 rounded-lg flex items-center justify-center">
// // // // // // // // // // //                                   <Award className="w-8 h-8 text-white" />
// // // // // // // // // // //                                 </div>
// // // // // // // // // // //                                 <div>
// // // // // // // // // // //                                   <h3 className="font-semibold text-lg">{course.title}</h3>
// // // // // // // // // // //                                   <p className="text-muted-foreground">
// // // // // // // // // // //                                     Completed on {new Date(course.completedAt).toLocaleDateString()}
// // // // // // // // // // //                                   </p>
// // // // // // // // // // //                                   <p className="text-sm text-muted-foreground">
// // // // // // // // // // //                                     Credential ID: {course.credentialId}
// // // // // // // // // // //                                   </p>
// // // // // // // // // // //                                 </div>
// // // // // // // // // // //                               </div>
// // // // // // // // // // //                               <Button
// // // // // // // // // // //                                 className="flex items-center gap-2"
// // // // // // // // // // //                                 onClick={() => downloadCertificate(course.id)}
// // // // // // // // // // //                               >
// // // // // // // // // // //                                 <Download className="w-4 h-4" />
// // // // // // // // // // //                                 Download
// // // // // // // // // // //                               </Button>
// // // // // // // // // // //                             </div>
// // // // // // // // // // //                           </CardContent>
// // // // // // // // // // //                         </Card>
// // // // // // // // // // //                       ))}

// // // // // // // // // // //                       {enrolledCourses.filter(course => course.completed && course.canDownloadCertificate).length === 0 && (
// // // // // // // // // // //                         <Card>
// // // // // // // // // // //                           <CardContent className="p-12 text-center">
// // // // // // // // // // //                             <Award className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
// // // // // // // // // // //                             <p className="text-muted-foreground">No certificates available yet.</p>
// // // // // // // // // // //                             <p className="text-sm text-muted-foreground mt-2">
// // // // // // // // // // //                               Certificates become available 30 days after course completion.
// // // // // // // // // // //                             </p>
// // // // // // // // // // //                           </CardContent>
// // // // // // // // // // //                         </Card>
// // // // // // // // // // //                       )}
// // // // // // // // // // //                     </div>
// // // // // // // // // // //                   </TabsContent>
// // // // // // // // // // //                 </Tabs>
// // // // // // // // // // //               </motion.div>
// // // // // // // // // // //             </div>

// // // // // // // // // // //             {/* Sidebar */}
// // // // // // // // // // //             <div className="space-y-6">
// // // // // // // // // // //               {/* Referral Card */}
// // // // // // // // // // //               <motion.div
// // // // // // // // // // //                 initial={{ opacity: 0, x: 20 }}
// // // // // // // // // // //                 animate={{ opacity: 1, x: 0 }}
// // // // // // // // // // //                 transition={{ duration: 0.6, delay: 0.3 }}
// // // // // // // // // // //               >
// // // // // // // // // // //                 <Card>
// // // // // // // // // // //                   <CardHeader>
// // // // // // // // // // //                     <CardTitle className="flex items-center gap-2">
// // // // // // // // // // //                       <Gift className="w-5 h-5" />
// // // // // // // // // // //                       Refer & Earn
// // // // // // // // // // //                     </CardTitle>
// // // // // // // // // // //                     <CardDescription>
// // // // // // // // // // //                       Earn credits when your friends join and purchase courses
// // // // // // // // // // //                     </CardDescription>
// // // // // // // // // // //                   </CardHeader>
// // // // // // // // // // //                   <CardContent className="space-y-4">
// // // // // // // // // // //                     <div className="p-3 bg-primary/10 rounded-lg text-center">
// // // // // // // // // // //                       <p className="text-2xl font-bold text-primary">{userStats.credits}</p>
// // // // // // // // // // //                       <p className="text-sm text-muted-foreground">Available Credits</p>
// // // // // // // // // // //                     </div>

// // // // // // // // // // //                     <div className="space-y-2">
// // // // // // // // // // //                       <Label htmlFor="referral-code">Your Referral Code</Label>
// // // // // // // // // // //                       <div className="flex gap-2">
// // // // // // // // // // //                         <Input
// // // // // // // // // // //                           id="referral-code"
// // // // // // // // // // //                           value={referralCode}
// // // // // // // // // // //                           readOnly
// // // // // // // // // // //                           className="font-mono"
// // // // // // // // // // //                         />
// // // // // // // // // // //                         <Button
// // // // // // // // // // //                           size="sm"
// // // // // // // // // // //                           variant="outline"
// // // // // // // // // // //                           onClick={copyReferralLink}
// // // // // // // // // // //                         >
// // // // // // // // // // //                           <Copy className="w-4 h-4" />
// // // // // // // // // // //                         </Button>
// // // // // // // // // // //                       </div>
// // // // // // // // // // //                     </div>

// // // // // // // // // // //                     <div className="text-sm text-muted-foreground">
// // // // // // // // // // //                       <p>• Earn 100 credits per successful referral</p>
// // // // // // // // // // //                       <p>• Use credits for discounts on courses</p>
// // // // // // // // // // //                     </div>
// // // // // // // // // // //                   </CardContent>
// // // // // // // // // // //                 </Card>
// // // // // // // // // // //               </motion.div>

// // // // // // // // // // //               {/* Recent Activity */}
// // // // // // // // // // //               <motion.div
// // // // // // // // // // //                 initial={{ opacity: 0, x: 20 }}
// // // // // // // // // // //                 animate={{ opacity: 1, x: 0 }}
// // // // // // // // // // //                 transition={{ duration: 0.6, delay: 0.4 }}
// // // // // // // // // // //               >
// // // // // // // // // // //                 <Card>
// // // // // // // // // // //                   <CardHeader>
// // // // // // // // // // //                     <CardTitle className="flex items-center gap-2">
// // // // // // // // // // //                       <TrendingUp className="w-5 h-5" />
// // // // // // // // // // //                       Recent Activity
// // // // // // // // // // //                     </CardTitle>
// // // // // // // // // // //                   </CardHeader>
// // // // // // // // // // //                   <CardContent className="space-y-4">
// // // // // // // // // // //                     {recentActivity.length > 0 ? (
// // // // // // // // // // //                       recentActivity.map((activity, index) => (
// // // // // // // // // // //                         <div key={index} className="flex items-start gap-3 p-3 rounded-lg bg-muted/50">
// // // // // // // // // // //                           <div className="w-2 h-2 bg-primary rounded-full mt-2" />
// // // // // // // // // // //                           <div className="flex-1">
// // // // // // // // // // //                             <p className="text-sm font-medium">{activity.title}</p>
// // // // // // // // // // //                             <p className="text-xs text-muted-foreground">{activity.description}</p>
// // // // // // // // // // //                             <p className="text-xs text-muted-foreground mt-1">{activity.timestamp}</p>
// // // // // // // // // // //                           </div>
// // // // // // // // // // //                         </div>
// // // // // // // // // // //                       ))
// // // // // // // // // // //                     ) : (
// // // // // // // // // // //                       <p className="text-sm text-muted-foreground text-center py-4">
// // // // // // // // // // //                         No recent activity
// // // // // // // // // // //                       </p>
// // // // // // // // // // //                     )}
// // // // // // // // // // //                   </CardContent>
// // // // // // // // // // //                 </Card>
// // // // // // // // // // //               </motion.div>
// // // // // // // // // // //             </div>
// // // // // // // // // // //           </div>
// // // // // // // // // // //         </div>
// // // // // // // // // // //       </main>
// // // // // // // // // // //     </div>
// // // // // // // // // // //   );
// // // // // // // // // // // }

// // // // // // // // // // 'use client';

// // // // // // // // // // import { useState, useEffect } from 'react';
// // // // // // // // // // import { motion } from 'framer-motion';
// // // // // // // // // // import { 
// // // // // // // // // //   BookOpen, 
// // // // // // // // // //   Award, 
// // // // // // // // // //   Clock, 
// // // // // // // // // //   TrendingUp, 
// // // // // // // // // //   Play, 
// // // // // // // // // //   Download,
// // // // // // // // // //   Users,
// // // // // // // // // //   Star,
// // // // // // // // // //   Gift,
// // // // // // // // // //   Copy,
// // // // // // // // // //   CheckCircle,
// // // // // // // // // //   Settings,
// // // // // // // // // //   User,
// // // // // // // // // //   CreditCard,
// // // // // // // // // //   Bell,
// // // // // // // // // //   Lock,
// // // // // // // // // //   Eye,
// // // // // // // // // //   EyeOff
// // // // // // // // // //   Settings,
// // // // // // // // // //   User,
// // // // // // // // // //   CreditCard,
// // // // // // // // // //   Bell,
// // // // // // // // // //   Lock,
// // // // // // // // // //   Eye,
// // // // // // // // // //   EyeOff
// // // // // // // // // // } from 'lucide-react';
// // // // // // // // // // import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
// // // // // // // // // // import { Button } from '@/components/ui/button';
// // // // // // // // // // import { Badge } from '@/components/ui/badge';
// // // // // // // // // // import { Progress } from '@/components/ui/progress';
// // // // // // // // // // import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
// // // // // // // // // // import { Input } from '@/components/ui/input';
// // // // // // // // // // import { Label } from '@/components/ui/label';
// // // // // // // // // // import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
// // // // // // // // // // import { Input } from '@/components/ui/input';
// // // // // // // // // // import { Label } from '@/components/ui/label';
// // // // // // // // // // import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
// // // // // // // // // // import { toast } from 'sonner';
// // // // // // // // // // import { useAuth } from '@/components/auth-provider';
// // // // // // // // // // import Navbar from '@/components/navbar';

// // // // // // // // // // export default function Dashboard() {
// // // // // // // // // //   const { user, getAuthToken } = useAuth();
// // // // // // // // // //   const [userStats, setUserStats] = useState({
// // // // // // // // // //     enrolledCourses: 0,
// // // // // // // // // //     completedCourses: 0,
// // // // // // // // // //     certificatesEarned: 0,
// // // // // // // // // //     totalWatchTime: 0,
// // // // // // // // // //     credits: 0
// // // // // // // // // //   });
// // // // // // // // // //   const [enrolledCourses, setEnrolledCourses] = useState([]);
// // // // // // // // // //   const [recentActivity, setRecentActivity] = useState([]);
// // // // // // // // // //   const [referralCode, setReferralCode] = useState('');
// // // // // // // // // //   const [profileData, setProfileData] = useState({
// // // // // // // // // //     fullName: '',
// // // // // // // // // //     email: '',
// // // // // // // // // //     location: '',
// // // // // // // // // //   });
// // // // // // // // // //   const [passwordData, setPasswordData] = useState({
// // // // // // // // // //     currentPassword: '',
// // // // // // // // // //     newPassword: '',
// // // // // // // // // //     confirmPassword: '',
// // // // // // // // // //   });
// // // // // // // // // //   const [showPasswords, setShowPasswords] = useState({
// // // // // // // // // //     current: false,
// // // // // // // // // //     new: false,
// // // // // // // // // //     confirm: false,
// // // // // // // // // //   });
// // // // // // // // // //   const [isProfileDialogOpen, setIsProfileDialogOpen] = useState(false);
// // // // // // // // // //   const [isPasswordDialogOpen, setIsPasswordDialogOpen] = useState(false);
// // // // // // // // // //   const [isLoading, setIsLoading] = useState(false);
// // // // // // // // // //   const [profileData, setProfileData] = useState({
// // // // // // // // // //     fullName: '',
// // // // // // // // // //     email: '',
// // // // // // // // // //     location: '',
// // // // // // // // // //   });
// // // // // // // // // //   const [passwordData, setPasswordData] = useState({
// // // // // // // // // //     currentPassword: '',
// // // // // // // // // //     newPassword: '',
// // // // // // // // // //     confirmPassword: '',
// // // // // // // // // //   });
// // // // // // // // // //   const [showPasswords, setShowPasswords] = useState({
// // // // // // // // // //     current: false,
// // // // // // // // // //     new: false,
// // // // // // // // // //     confirm: false,
// // // // // // // // // //   });
// // // // // // // // // //   const [isProfileDialogOpen, setIsProfileDialogOpen] = useState(false);
// // // // // // // // // //   const [isPasswordDialogOpen, setIsPasswordDialogOpen] = useState(false);
// // // // // // // // // //   const [isLoading, setIsLoading] = useState(false);

// // // // // // // // // //   useEffect(() => {
// // // // // // // // // //     if (user) {
// // // // // // // // // //       fetchUserData();
// // // // // // // // // //       setReferralCode(user.referralCode || '');
// // // // // // // // // //       setProfileData({
// // // // // // // // // //         fullName: user.fullName || '',
// // // // // // // // // //         email: user.email || '',
// // // // // // // // // //         location: user.location || '',
// // // // // // // // // //       });
// // // // // // // // // //       setProfileData({
// // // // // // // // // //         fullName: user.fullName || '',
// // // // // // // // // //         email: user.email || '',
// // // // // // // // // //         location: user.location || '',
// // // // // // // // // //       });
// // // // // // // // // //     }
// // // // // // // // // //   }, [user]);

// // // // // // // // // //   const fetchUserData = async () => {
// // // // // // // // // //     try {
// // // // // // // // // //       const token = getAuthToken();
// // // // // // // // // //       const token = getAuthToken();
// // // // // // // // // //       const response = await fetch('/api/user/dashboard', {
// // // // // // // // // //         headers: {
// // // // // // // // // //           'Authorization': `Bearer ${token}`,
// // // // // // // // // //         },
// // // // // // // // // //       });

// // // // // // // // // //       if (response.ok) {
// // // // // // // // // //         const data = await response.json();
// // // // // // // // // //         setUserStats(data.stats);
// // // // // // // // // //         setEnrolledCourses(data.enrolledCourses);
// // // // // // // // // //         setRecentActivity(data.recentActivity);
// // // // // // // // // //       }
// // // // // // // // // //     } catch (error) {
// // // // // // // // // //       console.error('Error fetching user data:', error);
// // // // // // // // // //     }
// // // // // // // // // //   };

// // // // // // // // // //   const updateProfile = async () => {
// // // // // // // // // //     if (!profileData.fullName || !profileData.location) {
// // // // // // // // // //       toast.error('Please fill in all required fields');
// // // // // // // // // //       return;
// // // // // // // // // //     }

// // // // // // // // // //     setIsLoading(true);
// // // // // // // // // //     try {
// // // // // // // // // //       const token = getAuthToken();
// // // // // // // // // //       const response = await fetch('/api/user/profile', {
// // // // // // // // // //         method: 'PUT',
// // // // // // // // // //         headers: {
// // // // // // // // // //           'Content-Type': 'application/json',
// // // // // // // // // //           'Authorization': `Bearer ${token}`,
// // // // // // // // // //         },
// // // // // // // // // //         body: JSON.stringify(profileData),
// // // // // // // // // //       });

// // // // // // // // // //       if (response.ok) {
// // // // // // // // // //         toast.success('Profile updated successfully!');
// // // // // // // // // //         setIsProfileDialogOpen(false);
// // // // // // // // // //         // Refresh user data
// // // // // // // // // //         fetchUserData();
// // // // // // // // // //       } else {
// // // // // // // // // //         const data = await response.json();
// // // // // // // // // //         toast.error(data.message || 'Failed to update profile');
// // // // // // // // // //       }
// // // // // // // // // //     } catch (error) {
// // // // // // // // // //       console.error('Error updating profile:', error);
// // // // // // // // // //       toast.error('Something went wrong. Please try again.');
// // // // // // // // // //     } finally {
// // // // // // // // // //       setIsLoading(false);
// // // // // // // // // //     }
// // // // // // // // // //   };

// // // // // // // // // //   const changePassword = async () => {
// // // // // // // // // //     if (!passwordData.currentPassword || !passwordData.newPassword || !passwordData.confirmPassword) {
// // // // // // // // // //       toast.error('Please fill in all fields');
// // // // // // // // // //       return;
// // // // // // // // // //     }

// // // // // // // // // //     if (passwordData.newPassword !== passwordData.confirmPassword) {
// // // // // // // // // //       toast.error('New passwords do not match');
// // // // // // // // // //       return;
// // // // // // // // // //     }

// // // // // // // // // //     if (passwordData.newPassword.length < 6) {
// // // // // // // // // //       toast.error('Password must be at least 6 characters long');
// // // // // // // // // //       return;
// // // // // // // // // //     }

// // // // // // // // // //     setIsLoading(true);
// // // // // // // // // //     try {
// // // // // // // // // //       const token = getAuthToken();
// // // // // // // // // //       const response = await fetch('/api/user/change-password', {
// // // // // // // // // //         method: 'POST',
// // // // // // // // // //         headers: {
// // // // // // // // // //           'Content-Type': 'application/json',
// // // // // // // // // //           'Authorization': `Bearer ${token}`,
// // // // // // // // // //         },
// // // // // // // // // //         body: JSON.stringify(passwordData),
// // // // // // // // // //       });

// // // // // // // // // //       if (response.ok) {
// // // // // // // // // //         toast.success('Password changed successfully!');
// // // // // // // // // //         setIsPasswordDialogOpen(false);
// // // // // // // // // //         setPasswordData({
// // // // // // // // // //           currentPassword: '',
// // // // // // // // // //           newPassword: '',
// // // // // // // // // //           confirmPassword: '',
// // // // // // // // // //         });
// // // // // // // // // //       } else {
// // // // // // // // // //         const data = await response.json();
// // // // // // // // // //         toast.error(data.message || 'Failed to change password');
// // // // // // // // // //       }
// // // // // // // // // //     } catch (error) {
// // // // // // // // // //       console.error('Error changing password:', error);
// // // // // // // // // //       toast.error('Something went wrong. Please try again.');
// // // // // // // // // //     } finally {
// // // // // // // // // //       setIsLoading(false);
// // // // // // // // // //     }
// // // // // // // // // //   };

// // // // // // // // // //   const updateProfile = async () => {
// // // // // // // // // //     if (!profileData.fullName || !profileData.location) {
// // // // // // // // // //       toast.error('Please fill in all required fields');
// // // // // // // // // //       return;
// // // // // // // // // //     }

// // // // // // // // // //     setIsLoading(true);
// // // // // // // // // //     try {
// // // // // // // // // //       const token = getAuthToken();
// // // // // // // // // //       const response = await fetch('/api/user/profile', {
// // // // // // // // // //         method: 'PUT',
// // // // // // // // // //         headers: {
// // // // // // // // // //           'Content-Type': 'application/json',
// // // // // // // // // //           'Authorization': `Bearer ${token}`,
// // // // // // // // // //         },
// // // // // // // // // //         body: JSON.stringify(profileData),
// // // // // // // // // //       });

// // // // // // // // // //       if (response.ok) {
// // // // // // // // // //         toast.success('Profile updated successfully!');
// // // // // // // // // //         setIsProfileDialogOpen(false);
// // // // // // // // // //         // Refresh user data
// // // // // // // // // //         fetchUserData();
// // // // // // // // // //       } else {
// // // // // // // // // //         const data = await response.json();
// // // // // // // // // //         toast.error(data.message || 'Failed to update profile');
// // // // // // // // // //       }
// // // // // // // // // //     } catch (error) {
// // // // // // // // // //       console.error('Error updating profile:', error);
// // // // // // // // // //       toast.error('Something went wrong. Please try again.');
// // // // // // // // // //     } finally {
// // // // // // // // // //       setIsLoading(false);
// // // // // // // // // //     }
// // // // // // // // // //   };

// // // // // // // // // //   const changePassword = async () => {
// // // // // // // // // //     if (!passwordData.currentPassword || !passwordData.newPassword || !passwordData.confirmPassword) {
// // // // // // // // // //       toast.error('Please fill in all fields');
// // // // // // // // // //       return;
// // // // // // // // // //     }

// // // // // // // // // //     if (passwordData.newPassword !== passwordData.confirmPassword) {
// // // // // // // // // //       toast.error('New passwords do not match');
// // // // // // // // // //       return;
// // // // // // // // // //     }

// // // // // // // // // //     if (passwordData.newPassword.length < 6) {
// // // // // // // // // //       toast.error('Password must be at least 6 characters long');
// // // // // // // // // //       return;
// // // // // // // // // //     }

// // // // // // // // // //     setIsLoading(true);
// // // // // // // // // //     try {
// // // // // // // // // //       const token = getAuthToken();
// // // // // // // // // //       const response = await fetch('/api/user/change-password', {
// // // // // // // // // //         method: 'POST',
// // // // // // // // // //         headers: {
// // // // // // // // // //           'Content-Type': 'application/json',
// // // // // // // // // //           'Authorization': `Bearer ${token}`,
// // // // // // // // // //         },
// // // // // // // // // //         body: JSON.stringify(passwordData),
// // // // // // // // // //       });

// // // // // // // // // //       if (response.ok) {
// // // // // // // // // //         toast.success('Password changed successfully!');
// // // // // // // // // //         setIsPasswordDialogOpen(false);
// // // // // // // // // //         setPasswordData({
// // // // // // // // // //           currentPassword: '',
// // // // // // // // // //           newPassword: '',
// // // // // // // // // //           confirmPassword: '',
// // // // // // // // // //         });
// // // // // // // // // //       } else {
// // // // // // // // // //         const data = await response.json();
// // // // // // // // // //         toast.error(data.message || 'Failed to change password');
// // // // // // // // // //       }
// // // // // // // // // //     } catch (error) {
// // // // // // // // // //       console.error('Error changing password:', error);
// // // // // // // // // //       toast.error('Something went wrong. Please try again.');
// // // // // // // // // //     } finally {
// // // // // // // // // //       setIsLoading(false);
// // // // // // // // // //     }
// // // // // // // // // //   };

// // // // // // // // // //   const copyReferralLink = () => {
// // // // // // // // // //     const referralLink = `${window.location.origin}/auth/register?ref=${referralCode}`;
// // // // // // // // // //     navigator.clipboard.writeText(referralLink);
// // // // // // // // // //     toast.success('Referral link copied to clipboard!');
// // // // // // // // // //   };

// // // // // // // // // //   const downloadCertificate = async (courseId) => {
// // // // // // // // // //     try {
// // // // // // // // // //       const token = getAuthToken();
// // // // // // // // // //       const token = getAuthToken();
// // // // // // // // // //       const response = await fetch(`/api/certificates/download/${courseId}`, {
// // // // // // // // // //         headers: {
// // // // // // // // // //           'Authorization': `Bearer ${token}`,
// // // // // // // // // //         },
// // // // // // // // // //       });

// // // // // // // // // //       if (response.ok) {
// // // // // // // // // //         const blob = await response.blob();
// // // // // // // // // //         const url = window.URL.createObjectURL(blob);
// // // // // // // // // //         const a = document.createElement('a');
// // // // // // // // // //         a.style.display = 'none';
// // // // // // // // // //         a.href = url;
// // // // // // // // // //         a.download = `certificate-${courseId}.pdf`;
// // // // // // // // // //         document.body.appendChild(a);
// // // // // // // // // //         a.click();
// // // // // // // // // //         window.URL.revokeObjectURL(url);
// // // // // // // // // //         toast.success('Certificate downloaded successfully!');
// // // // // // // // // //       } else {
// // // // // // // // // //         toast.error('Error downloading certificate');
// // // // // // // // // //       }
// // // // // // // // // //     } catch (error) {
// // // // // // // // // //       console.error('Error downloading certificate:', error);
// // // // // // // // // //       toast.error('Error downloading certificate');
// // // // // // // // // //     }
// // // // // // // // // //   };

// // // // // // // // // //   const stats = [
// // // // // // // // // //     {
// // // // // // // // // //       title: 'Enrolled Courses',
// // // // // // // // // //       value: userStats.enrolledCourses,
// // // // // // // // // //       icon: BookOpen,
// // // // // // // // // //       color: 'text-blue-600',
// // // // // // // // // //       bgColor: 'bg-blue-50 dark:bg-blue-950'
// // // // // // // // // //     },
// // // // // // // // // //     {
// // // // // // // // // //       title: 'Completed',
// // // // // // // // // //       value: userStats.completedCourses,
// // // // // // // // // //       icon: CheckCircle,
// // // // // // // // // //       color: 'text-green-600',
// // // // // // // // // //       bgColor: 'bg-green-50 dark:bg-green-950'
// // // // // // // // // //     },
// // // // // // // // // //     {
// // // // // // // // // //       title: 'Certificates',
// // // // // // // // // //       value: userStats.certificatesEarned,
// // // // // // // // // //       icon: Award,
// // // // // // // // // //       color: 'text-purple-600',
// // // // // // // // // //       bgColor: 'bg-purple-50 dark:bg-purple-950'
// // // // // // // // // //     },
// // // // // // // // // //     {
// // // // // // // // // //       title: 'Credits',
// // // // // // // // // //       value: userStats.credits,
// // // // // // // // // //       icon: Gift,
// // // // // // // // // //       color: 'text-orange-600',
// // // // // // // // // //       bgColor: 'bg-orange-50 dark:bg-orange-950'
// // // // // // // // // //     }
// // // // // // // // // //   ];

// // // // // // // // // //   if (!user) {
// // // // // // // // // //     return (
// // // // // // // // // //       <div className="min-h-screen flex items-center justify-center">
// // // // // // // // // //         <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
// // // // // // // // // //       </div>
// // // // // // // // // //     );
// // // // // // // // // //   }

// // // // // // // // // //   return (
// // // // // // // // // //     <div className="min-h-screen bg-background">
// // // // // // // // // //       <Navbar />

// // // // // // // // // //       <main className="pt-20 pb-12">
// // // // // // // // // //         <div className="container mx-auto px-4">
// // // // // // // // // //           {/* Header with Profile Actions */}
// // // // // // // // // //           <motion.div
// // // // // // // // // //             className="mb-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4"
// // // // // // // // // //             initial={{ opacity: 0, y: 20 }}
// // // // // // // // // //             animate={{ opacity: 1, y: 0 }}
// // // // // // // // // //             transition={{ duration: 0.6 }}
// // // // // // // // // //           >
// // // // // // // // // //             <div>
// // // // // // // // // //               <h1 className="text-3xl font-bold mb-2">
// // // // // // // // // //                 Welcome back, {user.fullName}! 👋
// // // // // // // // // //               </h1>
// // // // // // // // // //               <p className="text-muted-foreground">
// // // // // // // // // //                 Continue your learning journey and track your progress.
// // // // // // // // // //               </p>
// // // // // // // // // //             </div>
// // // // // // // // // //             <div className="flex gap-2">
// // // // // // // // // //               <Dialog open={isProfileDialogOpen} onOpenChange={setIsProfileDialogOpen}>
// // // // // // // // // //                 <DialogTrigger asChild>
// // // // // // // // // //                   <Button variant="outline" className="flex items-center gap-2">
// // // // // // // // // //                     <User className="w-4 h-4" />
// // // // // // // // // //                     Profile
// // // // // // // // // //                   </Button>
// // // // // // // // // //                 </DialogTrigger>
// // // // // // // // // //                 <DialogContent>
// // // // // // // // // //                   <DialogHeader>
// // // // // // // // // //                     <DialogTitle>Edit Profile</DialogTitle>
// // // // // // // // // //                     <DialogDescription>
// // // // // // // // // //                       Update your profile information
// // // // // // // // // //                     </DialogDescription>
// // // // // // // // // //                   </DialogHeader>
// // // // // // // // // //                   <div className="space-y-4">
// // // // // // // // // //                     <div className="space-y-2">
// // // // // // // // // //                       <Label htmlFor="fullName">Full Name</Label>
// // // // // // // // // //                       <Input
// // // // // // // // // //                         id="fullName"
// // // // // // // // // //                         value={profileData.fullName}
// // // // // // // // // //                         onChange={(e) => setProfileData(prev => ({ ...prev, fullName: e.target.value }))}
// // // // // // // // // //                         placeholder="Enter your full name"
// // // // // // // // // //                       />
// // // // // // // // // //                     </div>
// // // // // // // // // //                     <div className="space-y-2">
// // // // // // // // // //                       <Label htmlFor="email">Email (Cannot be changed)</Label>
// // // // // // // // // //                       <Input
// // // // // // // // // //                         id="email"
// // // // // // // // // //                         value={profileData.email}
// // // // // // // // // //                         disabled
// // // // // // // // // //                         className="bg-muted"
// // // // // // // // // //                       />
// // // // // // // // // //                     </div>
// // // // // // // // // //                     <div className="space-y-2">
// // // // // // // // // //                       <Label htmlFor="location">Location</Label>
// // // // // // // // // //                       <Input
// // // // // // // // // //                         id="location"
// // // // // // // // // //                         value={profileData.location}
// // // // // // // // // //                         onChange={(e) => setProfileData(prev => ({ ...prev, location: e.target.value }))}
// // // // // // // // // //                         placeholder="Enter your location"
// // // // // // // // // //                       />
// // // // // // // // // //                     </div>
// // // // // // // // // //                     <div className="flex gap-2">
// // // // // // // // // //                       <Button onClick={updateProfile} disabled={isLoading} className="flex-1">
// // // // // // // // // //                         {isLoading ? 'Updating...' : 'Update Profile'}
// // // // // // // // // //                       </Button>
// // // // // // // // // //                       <Button variant="outline" onClick={() => setIsProfileDialogOpen(false)}>
// // // // // // // // // //                         Cancel
// // // // // // // // // //                       </Button>
// // // // // // // // // //                     </div>
// // // // // // // // // //                   </div>
// // // // // // // // // //                 </DialogContent>
// // // // // // // // // //               </Dialog>

// // // // // // // // // //               <Dialog open={isPasswordDialogOpen} onOpenChange={setIsPasswordDialogOpen}>
// // // // // // // // // //                 <DialogTrigger asChild>
// // // // // // // // // //                   <Button variant="outline" className="flex items-center gap-2">
// // // // // // // // // //                     <Lock className="w-4 h-4" />
// // // // // // // // // //                     Change Password
// // // // // // // // // //                   </Button>
// // // // // // // // // //                 </DialogTrigger>
// // // // // // // // // //                 <DialogContent>
// // // // // // // // // //                   <DialogHeader>
// // // // // // // // // //                     <DialogTitle>Change Password</DialogTitle>
// // // // // // // // // //                     <DialogDescription>
// // // // // // // // // //                       Enter your current password and choose a new one
// // // // // // // // // //                     </DialogDescription>
// // // // // // // // // //                   </DialogHeader>
// // // // // // // // // //                   <div className="space-y-4">
// // // // // // // // // //                     <div className="space-y-2">
// // // // // // // // // //                       <Label htmlFor="currentPassword">Current Password</Label>
// // // // // // // // // //                       <div className="relative">
// // // // // // // // // //                         <Input
// // // // // // // // // //                           id="currentPassword"
// // // // // // // // // //                           type={showPasswords.current ? 'text' : 'password'}
// // // // // // // // // //                           value={passwordData.currentPassword}
// // // // // // // // // //                           onChange={(e) => setPasswordData(prev => ({ ...prev, currentPassword: e.target.value }))}
// // // // // // // // // //                           placeholder="Enter current password"
// // // // // // // // // //                           className="pr-10"
// // // // // // // // // //                         />
// // // // // // // // // //                         <button
// // // // // // // // // //                           type="button"
// // // // // // // // // //                           onClick={() => setShowPasswords(prev => ({ ...prev, current: !prev.current }))}
// // // // // // // // // //                           className="absolute right-3 top-3 text-muted-foreground hover:text-primary"
// // // // // // // // // //                         >
// // // // // // // // // //                           {showPasswords.current ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
// // // // // // // // // //                         </button>
// // // // // // // // // //                       </div>
// // // // // // // // // //                     </div>
// // // // // // // // // //                     <div className="space-y-2">
// // // // // // // // // //                       <Label htmlFor="newPassword">New Password</Label>
// // // // // // // // // //                       <div className="relative">
// // // // // // // // // //                         <Input
// // // // // // // // // //                           id="newPassword"
// // // // // // // // // //                           type={showPasswords.new ? 'text' : 'password'}
// // // // // // // // // //                           value={passwordData.newPassword}
// // // // // // // // // //                           onChange={(e) => setPasswordData(prev => ({ ...prev, newPassword: e.target.value }))}
// // // // // // // // // //                           placeholder="Enter new password"
// // // // // // // // // //                           className="pr-10"
// // // // // // // // // //                         />
// // // // // // // // // //                         <button
// // // // // // // // // //                           type="button"
// // // // // // // // // //                           onClick={() => setShowPasswords(prev => ({ ...prev, new: !prev.new }))}
// // // // // // // // // //                           className="absolute right-3 top-3 text-muted-foreground hover:text-primary"
// // // // // // // // // //                         >
// // // // // // // // // //                           {showPasswords.new ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
// // // // // // // // // //                         </button>
// // // // // // // // // //                       </div>
// // // // // // // // // //                     </div>
// // // // // // // // // //                     <div className="space-y-2">
// // // // // // // // // //                       <Label htmlFor="confirmPassword">Confirm New Password</Label>
// // // // // // // // // //                       <div className="relative">
// // // // // // // // // //                         <Input
// // // // // // // // // //                           id="confirmPassword"
// // // // // // // // // //                           type={showPasswords.confirm ? 'text' : 'password'}
// // // // // // // // // //                           value={passwordData.confirmPassword}
// // // // // // // // // //                           onChange={(e) => setPasswordData(prev => ({ ...prev, confirmPassword: e.target.value }))}
// // // // // // // // // //                           placeholder="Confirm new password"
// // // // // // // // // //                           className="pr-10"
// // // // // // // // // //                         />
// // // // // // // // // //                         <button
// // // // // // // // // //                           type="button"
// // // // // // // // // //                           onClick={() => setShowPasswords(prev => ({ ...prev, confirm: !prev.confirm }))}
// // // // // // // // // //                           className="absolute right-3 top-3 text-muted-foreground hover:text-primary"
// // // // // // // // // //                         >
// // // // // // // // // //                           {showPasswords.confirm ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
// // // // // // // // // //                         </button>
// // // // // // // // // //                       </div>
// // // // // // // // // //                     </div>
// // // // // // // // // //                     <div className="flex gap-2">
// // // // // // // // // //                       <Button onClick={changePassword} disabled={isLoading} className="flex-1">
// // // // // // // // // //                         {isLoading ? 'Changing...' : 'Change Password'}
// // // // // // // // // //                       </Button>
// // // // // // // // // //                       <Button variant="outline" onClick={() => setIsPasswordDialogOpen(false)}>
// // // // // // // // // //                         Cancel
// // // // // // // // // //             <div>
// // // // // // // // // //               <h1 className="text-3xl font-bold mb-2">
// // // // // // // // // //                 Welcome back, {user.fullName}! 👋
// // // // // // // // // //               </h1>
// // // // // // // // // //               <p className="text-muted-foreground">
// // // // // // // // // //                 Continue your learning journey and track your progress.
// // // // // // // // // //               </p>
// // // // // // // // // //             </div>
// // // // // // // // // //             <div className="flex gap-2">
// // // // // // // // // //               <Dialog open={isProfileDialogOpen} onOpenChange={setIsProfileDialogOpen}>
// // // // // // // // // //                 <DialogTrigger asChild>
// // // // // // // // // //                   <Button variant="outline" className="flex items-center gap-2">
// // // // // // // // // //                     <User className="w-4 h-4" />
// // // // // // // // // //                     Profile
// // // // // // // // // //                   </Button>
// // // // // // // // // //                 </DialogTrigger>
// // // // // // // // // //                 <DialogContent>
// // // // // // // // // //                   <DialogHeader>
// // // // // // // // // //                     <DialogTitle>Edit Profile</DialogTitle>
// // // // // // // // // //                     <DialogDescription>
// // // // // // // // // //                       Update your profile information
// // // // // // // // // //                     </DialogDescription>
// // // // // // // // // //                   </DialogHeader>
// // // // // // // // // //                   <div className="space-y-4">
// // // // // // // // // //                     <div className="space-y-2">
// // // // // // // // // //                       <Label htmlFor="fullName">Full Name</Label>
// // // // // // // // // //                       <Input
// // // // // // // // // //                         id="fullName"
// // // // // // // // // //                         value={profileData.fullName}
// // // // // // // // // //                         onChange={(e) => setProfileData(prev => ({ ...prev, fullName: e.target.value }))}
// // // // // // // // // //                         placeholder="Enter your full name"
// // // // // // // // // //                       />
// // // // // // // // // //                     </div>
// // // // // // // // // //                     <div className="space-y-2">
// // // // // // // // // //                       <Label htmlFor="email">Email (Cannot be changed)</Label>
// // // // // // // // // //                       <Input
// // // // // // // // // //                         id="email"
// // // // // // // // // //                         value={profileData.email}
// // // // // // // // // //                         disabled
// // // // // // // // // //                         className="bg-muted"
// // // // // // // // // //                       />
// // // // // // // // // //                     </div>
// // // // // // // // // //                     <div className="space-y-2">
// // // // // // // // // //                       <Label htmlFor="location">Location</Label>
// // // // // // // // // //                       <Input
// // // // // // // // // //                         id="location"
// // // // // // // // // //                         value={profileData.location}
// // // // // // // // // //                         onChange={(e) => setProfileData(prev => ({ ...prev, location: e.target.value }))}
// // // // // // // // // //                         placeholder="Enter your location"
// // // // // // // // // //                       />
// // // // // // // // // //                     </div>
// // // // // // // // // //                     <div className="flex gap-2">
// // // // // // // // // //                       <Button onClick={updateProfile} disabled={isLoading} className="flex-1">
// // // // // // // // // //                         {isLoading ? 'Updating...' : 'Update Profile'}
// // // // // // // // // //                       </Button>
// // // // // // // // // //                       <Button variant="outline" onClick={() => setIsProfileDialogOpen(false)}>
// // // // // // // // // //                         Cancel
// // // // // // // // // //                       </Button>
// // // // // // // // // //                     </div>
// // // // // // // // // //                   </div>
// // // // // // // // // //                 </DialogContent>
// // // // // // // // // //               </Dialog>

// // // // // // // // // //               <Dialog open={isPasswordDialogOpen} onOpenChange={setIsPasswordDialogOpen}>
// // // // // // // // // //                 <DialogTrigger asChild>
// // // // // // // // // //                   <Button variant="outline" className="flex items-center gap-2">
// // // // // // // // // //                     <Lock className="w-4 h-4" />
// // // // // // // // // //                     Change Password
// // // // // // // // // //                   </Button>
// // // // // // // // // //                 </DialogTrigger>
// // // // // // // // // //                 <DialogContent>
// // // // // // // // // //                   <DialogHeader>
// // // // // // // // // //                     <DialogTitle>Change Password</DialogTitle>
// // // // // // // // // //                     <DialogDescription>
// // // // // // // // // //                       Enter your current password and choose a new one
// // // // // // // // // //                     </DialogDescription>
// // // // // // // // // //                   </DialogHeader>
// // // // // // // // // //                   <div className="space-y-4">
// // // // // // // // // //                     <div className="space-y-2">
// // // // // // // // // //                       <Label htmlFor="currentPassword">Current Password</Label>
// // // // // // // // // //                       <div className="relative">
// // // // // // // // // //                         <Input
// // // // // // // // // //                           id="currentPassword"
// // // // // // // // // //                           type={showPasswords.current ? 'text' : 'password'}
// // // // // // // // // //                           value={passwordData.currentPassword}
// // // // // // // // // //                           onChange={(e) => setPasswordData(prev => ({ ...prev, currentPassword: e.target.value }))}
// // // // // // // // // //                           placeholder="Enter current password"
// // // // // // // // // //                           className="pr-10"
// // // // // // // // // //                         />
// // // // // // // // // //                         <button
// // // // // // // // // //                           type="button"
// // // // // // // // // //                           onClick={() => setShowPasswords(prev => ({ ...prev, current: !prev.current }))}
// // // // // // // // // //                           className="absolute right-3 top-3 text-muted-foreground hover:text-primary"
// // // // // // // // // //                         >
// // // // // // // // // //                           {showPasswords.current ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
// // // // // // // // // //                         </button>
// // // // // // // // // //                       </div>
// // // // // // // // // //                     </div>
// // // // // // // // // //                     <div className="space-y-2">
// // // // // // // // // //                       <Label htmlFor="newPassword">New Password</Label>
// // // // // // // // // //                       <div className="relative">
// // // // // // // // // //                         <Input
// // // // // // // // // //                           id="newPassword"
// // // // // // // // // //                           type={showPasswords.new ? 'text' : 'password'}
// // // // // // // // // //                           value={passwordData.newPassword}
// // // // // // // // // //                           onChange={(e) => setPasswordData(prev => ({ ...prev, newPassword: e.target.value }))}
// // // // // // // // // //                           placeholder="Enter new password"
// // // // // // // // // //                           className="pr-10"
// // // // // // // // // //                         />
// // // // // // // // // //                         <button
// // // // // // // // // //                           type="button"
// // // // // // // // // //                           onClick={() => setShowPasswords(prev => ({ ...prev, new: !prev.new }))}
// // // // // // // // // //                           className="absolute right-3 top-3 text-muted-foreground hover:text-primary"
// // // // // // // // // //                         >
// // // // // // // // // //                           {showPasswords.new ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
// // // // // // // // // //                         </button>
// // // // // // // // // //                       </div>
// // // // // // // // // //                     </div>
// // // // // // // // // //                     <div className="space-y-2">
// // // // // // // // // //                       <Label htmlFor="confirmPassword">Confirm New Password</Label>
// // // // // // // // // //                       <div className="relative">
// // // // // // // // // //                         <Input
// // // // // // // // // //                           id="confirmPassword"
// // // // // // // // // //                           type={showPasswords.confirm ? 'text' : 'password'}
// // // // // // // // // //                           value={passwordData.confirmPassword}
// // // // // // // // // //                           onChange={(e) => setPasswordData(prev => ({ ...prev, confirmPassword: e.target.value }))}
// // // // // // // // // //                           placeholder="Confirm new password"
// // // // // // // // // //                           className="pr-10"
// // // // // // // // // //                         />
// // // // // // // // // //                         <button
// // // // // // // // // //                           type="button"
// // // // // // // // // //                           onClick={() => setShowPasswords(prev => ({ ...prev, confirm: !prev.confirm }))}
// // // // // // // // // //                           className="absolute right-3 top-3 text-muted-foreground hover:text-primary"
// // // // // // // // // //                         >
// // // // // // // // // //                           {showPasswords.confirm ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
// // // // // // // // // //                         </button>
// // // // // // // // // //                       </div>
// // // // // // // // // //                     </div>
// // // // // // // // // //                     <div className="flex gap-2">
// // // // // // // // // //                       <Button onClick={changePassword} disabled={isLoading} className="flex-1">
// // // // // // // // // //                         {isLoading ? 'Changing...' : 'Change Password'}
// // // // // // // // // //                       </Button>
// // // // // // // // // //                       <Button variant="outline" onClick={() => setIsPasswordDialogOpen(false)}>
// // // // // // // // // //                         Cancel
// // // // // // // // // //                       </Button>
// // // // // // // // // //                     </div>
// // // // // // // // // //                   </div>
// // // // // // // // // //                 </DialogContent>
// // // // // // // // // //               </Dialog>
// // // // // // // // // //             </div>
// // // // // // // // // //           </motion.div>

// // // // // // // // // //           {/* Stats Cards */}
// // // // // // // // // //           <motion.div
// // // // // // // // // //             className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
// // // // // // // // // //             initial={{ opacity: 0, y: 20 }}
// // // // // // // // // //             animate={{ opacity: 1, y: 0 }}
// // // // // // // // // //             transition={{ duration: 0.6, delay: 0.1 }}
// // // // // // // // // //           >
// // // // // // // // // //             {stats.map((stat, index) => (
// // // // // // // // // //               <Card key={stat.title} className="hover:shadow-lg transition-shadow">
// // // // // // // // // //                 <CardContent className="p-6">
// // // // // // // // // //                   <div className="flex items-center justify-between">
// // // // // // // // // //                     <div>
// // // // // // // // // //                       <p className="text-sm text-muted-foreground mb-1">{stat.title}</p>
// // // // // // // // // //                       <p className="text-2xl font-bold">{stat.value}</p>
// // // // // // // // // //                     </div>
// // // // // // // // // //                     <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${stat.bgColor}`}>
// // // // // // // // // //                       <stat.icon className={`w-6 h-6 ${stat.color}`} />
// // // // // // // // // //                     </div>
// // // // // // // // // //                   </div>
// // // // // // // // // //                 </CardContent>
// // // // // // // // // //               </Card>
// // // // // // // // // //             ))}
// // // // // // // // // //           </motion.div>

// // // // // // // // // //           <div className="grid lg:grid-cols-3 gap-8">
// // // // // // // // // //             {/* Main Content */}
// // // // // // // // // //             <div className="lg:col-span-2 space-y-8">
// // // // // // // // // //               {/* Course Tabs */}
// // // // // // // // // //               <motion.div
// // // // // // // // // //                 initial={{ opacity: 0, y: 20 }}
// // // // // // // // // //                 animate={{ opacity: 1, y: 0 }}
// // // // // // // // // //                 transition={{ duration: 0.6, delay: 0.2 }}
// // // // // // // // // //               >
// // // // // // // // // //                 <Tabs defaultValue="enrolled" className="w-full">
// // // // // // // // // //                   <TabsList className="grid w-full grid-cols-3">
// // // // // // // // // //                     <TabsTrigger value="enrolled">Enrolled</TabsTrigger>
// // // // // // // // // //                     <TabsTrigger value="completed">Completed</TabsTrigger>
// // // // // // // // // //                     <TabsTrigger value="certificates">Certificates</TabsTrigger>
// // // // // // // // // //                   </TabsList>

// // // // // // // // // //                   <TabsContent value="enrolled" className="mt-6">
// // // // // // // // // //                     <div className="space-y-4">
// // // // // // // // // //                       {enrolledCourses.filter(course => !course.completed).map((course) => (
// // // // // // // // // //                         <Card key={course.id} className="hover:shadow-lg transition-shadow">
// // // // // // // // // //                           <CardContent className="p-6">
// // // // // // // // // //                             <div className="flex items-start gap-4">
// // // // // // // // // //                               <img
// // // // // // // // // //                                 src={course.thumbnail || 'https://images.pexels.com/photos/5212345/pexels-photo-5212345.jpeg'}
// // // // // // // // // //                                 alt={course.title}
// // // // // // // // // //                                 className="w-20 h-20 rounded-lg object-cover"
// // // // // // // // // //                               />
// // // // // // // // // //                               <div className="flex-1">
// // // // // // // // // //                                 <h3 className="font-semibold text-lg mb-2">{course.title}</h3>
// // // // // // // // // //                                 <p className="text-muted-foreground text-sm mb-3">{course.description}</p>
// // // // // // // // // //                                 <div className="flex items-center gap-4 mb-3">
// // // // // // // // // //                                   <Badge variant="secondary">{course.category}</Badge>
// // // // // // // // // //                                   <div className="flex items-center gap-1 text-sm text-muted-foreground">
// // // // // // // // // //                                     <Clock className="w-4 h-4" />
// // // // // // // // // //                                     {course.duration}
// // // // // // // // // //                                   </div>
// // // // // // // // // //                                 </div>
// // // // // // // // // //                                 <div className="space-y-2">
// // // // // // // // // //                                   <div className="flex justify-between items-center text-sm">
// // // // // // // // // //                                     <span>Progress</span>
// // // // // // // // // //                                     <span>{course.progress}%</span>
// // // // // // // // // //                                   </div>
// // // // // // // // // //                                   <Progress value={course.progress} className="w-full" />
// // // // // // // // // //                                 </div>
// // // // // // // // // //                               </div>
// // // // // // // // // //                               <div className="flex flex-col gap-2">
// // // // // // // // // //                                 <Button className="flex items-center gap-2">
// // // // // // // // // //                                   <Play className="w-4 h-4" />
// // // // // // // // // //                                   Continue
// // // // // // // // // //                                 </Button>
// // // // // // // // // //                                 <Button variant="outline" size="sm" className="text-xs">
// // // // // // // // // //                                   View Content
// // // // // // // // // //                                 </Button>
// // // // // // // // // //                               </div>
// // // // // // // // // //                             </div>
// // // // // // // // // //                           </CardContent>
// // // // // // // // // //                         </Card>
// // // // // // // // // //                       ))}

// // // // // // // // // //                       {enrolledCourses.filter(course => !course.completed).length === 0 && (
// // // // // // // // // //                         <Card>
// // // // // // // // // //                           <CardContent className="p-12 text-center">
// // // // // // // // // //                             <BookOpen className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
// // // // // // // // // //                             <p className="text-muted-foreground">No enrolled courses yet.</p>
// // // // // // // // // //                             <Button className="mt-4">Browse Courses</Button>
// // // // // // // // // //                           </CardContent>
// // // // // // // // // //                         </Card>
// // // // // // // // // //                       )}
// // // // // // // // // //                     </div>
// // // // // // // // // //                   </TabsContent>

// // // // // // // // // //                   <TabsContent value="completed" className="mt-6">
// // // // // // // // // //                     <div className="space-y-4">
// // // // // // // // // //                       {enrolledCourses.filter(course => course.completed).map((course) => (
// // // // // // // // // //                         <Card key={course.id} className="hover:shadow-lg transition-shadow">
// // // // // // // // // //                           <CardContent className="p-6">
// // // // // // // // // //                             <div className="flex items-start gap-4">
// // // // // // // // // //                               <img
// // // // // // // // // //                                 src={course.thumbnail || 'https://images.pexels.com/photos/5212345/pexels-photo-5212345.jpeg'}
// // // // // // // // // //                                 alt={course.title}
// // // // // // // // // //                                 className="w-20 h-20 rounded-lg object-cover"
// // // // // // // // // //                               />
// // // // // // // // // //                               <div className="flex-1">
// // // // // // // // // //                                 <h3 className="font-semibold text-lg mb-2">{course.title}</h3>
// // // // // // // // // //                                 <p className="text-muted-foreground text-sm mb-3">{course.description}</p>
// // // // // // // // // //                                 <div className="flex items-center gap-4">
// // // // // // // // // //                                   <Badge variant="secondary" className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100">
// // // // // // // // // //                                     Completed
// // // // // // // // // //                                   </Badge>
// // // // // // // // // //                                   <div className="flex items-center gap-1 text-sm text-muted-foreground">
// // // // // // // // // //                                     <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
// // // // // // // // // //                                     Rate Course
// // // // // // // // // //                                   </div>
// // // // // // // // // //                                 </div>
// // // // // // // // // //                               </div>
// // // // // // // // // //                               <Button
// // // // // // // // // //                                 variant="outline"
// // // // // // // // // //                                 className="flex items-center gap-2"
// // // // // // // // // //                                 onClick={() => downloadCertificate(course.id)}
// // // // // // // // // //                                 disabled={!course.canDownloadCertificate}
// // // // // // // // // //                               >
// // // // // // // // // //                                 <Download className="w-4 h-4" />
// // // // // // // // // //                                 Certificate
// // // // // // // // // //                               </Button>
// // // // // // // // // //                             </div>
// // // // // // // // // //                           </CardContent>
// // // // // // // // // //                         </Card>
// // // // // // // // // //                       ))}

// // // // // // // // // //                       {enrolledCourses.filter(course => course.completed).length === 0 && (
// // // // // // // // // //                         <Card>
// // // // // // // // // //                           <CardContent className="p-12 text-center">
// // // // // // // // // //                             <Award className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
// // // // // // // // // //                             <p className="text-muted-foreground">No completed courses yet.</p>
// // // // // // // // // //                           </CardContent>
// // // // // // // // // //                         </Card>
// // // // // // // // // //                       )}
// // // // // // // // // //                     </div>
// // // // // // // // // //                   </TabsContent>

// // // // // // // // // //                   <TabsContent value="certificates" className="mt-6">
// // // // // // // // // //                     <div className="space-y-4">
// // // // // // // // // //                       {enrolledCourses.filter(course => course.completed && course.canDownloadCertificate).map((course) => (
// // // // // // // // // //                         <Card key={course.id} className="hover:shadow-lg transition-shadow">
// // // // // // // // // //                           <CardContent className="p-6">
// // // // // // // // // //                             <div className="flex items-center justify-between">
// // // // // // // // // //                               <div className="flex items-center gap-4">
// // // // // // // // // //                                 <div className="w-16 h-16 bg-gradient-to-br from-primary to-blue-600 rounded-lg flex items-center justify-center">
// // // // // // // // // //                                   <Award className="w-8 h-8 text-white" />
// // // // // // // // // //                                 </div>
// // // // // // // // // //                                 <div>
// // // // // // // // // //                                   <h3 className="font-semibold text-lg">{course.title}</h3>
// // // // // // // // // //                                   <p className="text-muted-foreground">
// // // // // // // // // //                                     Completed on {new Date(course.completedAt).toLocaleDateString()}
// // // // // // // // // //                                   </p>
// // // // // // // // // //                                   <p className="text-sm text-muted-foreground">
// // // // // // // // // //                                     Credential ID: {course.credentialId}
// // // // // // // // // //                                   </p>
// // // // // // // // // //                                 </div>
// // // // // // // // // //                               </div>
// // // // // // // // // //                               <Button
// // // // // // // // // //                                 className="flex items-center gap-2"
// // // // // // // // // //                                 onClick={() => downloadCertificate(course.id)}
// // // // // // // // // //                               >
// // // // // // // // // //                                 <Download className="w-4 h-4" />
// // // // // // // // // //                                 Download
// // // // // // // // // //                               </Button>
// // // // // // // // // //                             </div>
// // // // // // // // // //                           </CardContent>
// // // // // // // // // //                         </Card>
// // // // // // // // // //                       ))}

// // // // // // // // // //                       {enrolledCourses.filter(course => course.completed && course.canDownloadCertificate).length === 0 && (
// // // // // // // // // //                         <Card>
// // // // // // // // // //                           <CardContent className="p-12 text-center">
// // // // // // // // // //                             <Award className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
// // // // // // // // // //                             <p className="text-muted-foreground">No certificates available yet.</p>
// // // // // // // // // //                             <p className="text-sm text-muted-foreground mt-2">
// // // // // // // // // //                               Certificates become available 30 days after course completion.
// // // // // // // // // //                             </p>
// // // // // // // // // //                           </CardContent>
// // // // // // // // // //                         </Card>
// // // // // // // // // //                       )}
// // // // // // // // // //                     </div>
// // // // // // // // // //                   </TabsContent>
// // // // // // // // // //                 </Tabs>
// // // // // // // // // //               </motion.div>
// // // // // // // // // //             </div>

// // // // // // // // // //             {/* Sidebar */}
// // // // // // // // // //             <div className="space-y-6">
// // // // // // // // // //               {/* Referral Card */}
// // // // // // // // // //               <motion.div
// // // // // // // // // //                 initial={{ opacity: 0, x: 20 }}
// // // // // // // // // //                 animate={{ opacity: 1, x: 0 }}
// // // // // // // // // //                 transition={{ duration: 0.6, delay: 0.3 }}
// // // // // // // // // //               >
// // // // // // // // // //                 <Card>
// // // // // // // // // //                   <CardHeader>
// // // // // // // // // //                     <CardTitle className="flex items-center gap-2">
// // // // // // // // // //                       <Gift className="w-5 h-5" />
// // // // // // // // // //                       Refer & Earn
// // // // // // // // // //                     </CardTitle>
// // // // // // // // // //                     <CardDescription>
// // // // // // // // // //                       Earn credits when your friends join and purchase courses
// // // // // // // // // //                     </CardDescription>
// // // // // // // // // //                   </CardHeader>
// // // // // // // // // //                   <CardContent className="space-y-4">
// // // // // // // // // //                     <div className="p-3 bg-primary/10 rounded-lg text-center">
// // // // // // // // // //                       <p className="text-2xl font-bold text-primary">{userStats.credits}</p>
// // // // // // // // // //                       <p className="text-sm text-muted-foreground">Available Credits</p>
// // // // // // // // // //                     </div>

// // // // // // // // // //                     <div className="space-y-2">
// // // // // // // // // //                       <Label htmlFor="referral-code">Your Referral Code</Label>
// // // // // // // // // //                       <div className="flex gap-2">
// // // // // // // // // //                         <Input
// // // // // // // // // //                           id="referral-code"
// // // // // // // // // //                           value={referralCode}
// // // // // // // // // //                           readOnly
// // // // // // // // // //                           className="font-mono"
// // // // // // // // // //                         />
// // // // // // // // // //                         <Button
// // // // // // // // // //                           size="sm"
// // // // // // // // // //                           variant="outline"
// // // // // // // // // //                           onClick={copyReferralLink}
// // // // // // // // // //                         >
// // // // // // // // // //                           <Copy className="w-4 h-4" />
// // // // // // // // // //                         </Button>
// // // // // // // // // //                       </div>
// // // // // // // // // //                     </div>

// // // // // // // // // //                     <div className="text-sm text-muted-foreground">
// // // // // // // // // //                       <p>• Earn 100 credits per successful referral</p>
// // // // // // // // // //                       <p>• Use credits for discounts on courses</p>
// // // // // // // // // //                     </div>
// // // // // // // // // //                   </CardContent>
// // // // // // // // // //                 </Card>
// // // // // // // // // //               </motion.div>

// // // // // // // // // //               {/* Recent Activity */}
// // // // // // // // // //               <motion.div
// // // // // // // // // //                 initial={{ opacity: 0, x: 20 }}
// // // // // // // // // //                 animate={{ opacity: 1, x: 0 }}
// // // // // // // // // //                 transition={{ duration: 0.6, delay: 0.4 }}
// // // // // // // // // //               >
// // // // // // // // // //                 <Card>
// // // // // // // // // //                   <CardHeader>
// // // // // // // // // //                     <CardTitle className="flex items-center gap-2">
// // // // // // // // // //                       <TrendingUp className="w-5 h-5" />
// // // // // // // // // //                       Recent Activity
// // // // // // // // // //                     </CardTitle>
// // // // // // // // // //                   </CardHeader>
// // // // // // // // // //                   <CardContent className="space-y-4">
// // // // // // // // // //                     {recentActivity.length > 0 ? (
// // // // // // // // // //                       recentActivity.map((activity, index) => (
// // // // // // // // // //                         <div key={index} className="flex items-start gap-3 p-3 rounded-lg bg-muted/50">
// // // // // // // // // //                           <div className="w-2 h-2 bg-primary rounded-full mt-2" />
// // // // // // // // // //                           <div className="flex-1">
// // // // // // // // // //                             <p className="text-sm font-medium">{activity.title}</p>
// // // // // // // // // //                             <p className="text-xs text-muted-foreground">{activity.description}</p>
// // // // // // // // // //                             <p className="text-xs text-muted-foreground mt-1">{activity.timestamp}</p>
// // // // // // // // // //                           </div>
// // // // // // // // // //                         </div>
// // // // // // // // // //                       ))
// // // // // // // // // //                     ) : (
// // // // // // // // // //                       <p className="text-sm text-muted-foreground text-center py-4">
// // // // // // // // // //                         No recent activity
// // // // // // // // // //                       </p>
// // // // // // // // // //                     )}
// // // // // // // // // //                   </CardContent>
// // // // // // // // // //                 </Card>
// // // // // // // // // //               </motion.div>
// // // // // // // // // //             </div>
// // // // // // // // // //           </div>
// // // // // // // // // //         </div>
// // // // // // // // // //       </main>
// // // // // // // // // //     </div>
// // // // // // // // // //   );
// // // // // // // // // // };

// // // // // // // // // 'use client';

// // // // // // // // // import { useState, useEffect } from 'react';
// // // // // // // // // import { motion } from 'framer-motion';
// // // // // // // // // import {
// // // // // // // // //   BookOpen,
// // // // // // // // //   Award,
// // // // // // // // //   Clock,
// // // // // // // // //   TrendingUp,
// // // // // // // // //   Play,
// // // // // // // // //   Download,
// // // // // // // // //   Users,
// // // // // // // // //   Star,
// // // // // // // // //   Gift,
// // // // // // // // //   Copy,
// // // // // // // // //   CheckCircle,
// // // // // // // // //   Settings,
// // // // // // // // //   User,
// // // // // // // // //   CreditCard,
// // // // // // // // //   Bell,
// // // // // // // // //   Lock,
// // // // // // // // //   Eye,
// // // // // // // // //   EyeOff
// // // // // // // // // } from 'lucide-react';
// // // // // // // // // import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
// // // // // // // // // import { Button } from '@/components/ui/button';
// // // // // // // // // import { Badge } from '@/components/ui/badge';
// // // // // // // // // import { Progress } from '@/components/ui/progress';
// // // // // // // // // import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
// // // // // // // // // import { Input } from '@/components/ui/input';
// // // // // // // // // import { Label } from '@/components/ui/label';
// // // // // // // // // import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
// // // // // // // // // import { toast } from 'sonner';
// // // // // // // // // import { useAuth } from '@/components/auth-provider';
// // // // // // // // // import Navbar from '@/components/navbar';

// // // // // // // // // export default function Dashboard() {
// // // // // // // // //   const { user, getAuthToken } = useAuth();
// // // // // // // // //   const [userStats, setUserStats] = useState({
// // // // // // // // //     enrolledCourses: 0,
// // // // // // // // //     completedCourses: 0,
// // // // // // // // //     certificatesEarned: 0,
// // // // // // // // //     totalWatchTime: 0,
// // // // // // // // //     credits: 0
// // // // // // // // //   });
// // // // // // // // //   const [enrolledCourses, setEnrolledCourses] = useState([]);
// // // // // // // // //   const [recentActivity, setRecentActivity] = useState([]);
// // // // // // // // //   const [referralCode, setReferralCode] = useState('');
// // // // // // // // //   const [profileData, setProfileData] = useState({
// // // // // // // // //     fullName: '',
// // // // // // // // //     email: '',
// // // // // // // // //     location: '',
// // // // // // // // //   });
// // // // // // // // //   const [passwordData, setPasswordData] = useState({
// // // // // // // // //     currentPassword: '',
// // // // // // // // //     newPassword: '',
// // // // // // // // //     confirmPassword: '',
// // // // // // // // //   });
// // // // // // // // //   const [showPasswords, setShowPasswords] = useState({
// // // // // // // // //     current: false,
// // // // // // // // //     new: false,
// // // // // // // // //     confirm: false,
// // // // // // // // //   });
// // // // // // // // //   const [isProfileDialogOpen, setIsProfileDialogOpen] = useState(false);
// // // // // // // // //   const [isPasswordDialogOpen, setIsPasswordDialogOpen] = useState(false);
// // // // // // // // //   const [isLoading, setIsLoading] = useState(false);

// // // // // // // // //   useEffect(() => {
// // // // // // // // //     if (!isLoading && user) {
// // // // // // // // //       console.log('Dashboard useEffect - user:', user);
// // // // // // // // //       fetchUserData();
// // // // // // // // //       setReferralCode(user.referralCode || '');
// // // // // // // // //       setProfileData({
// // // // // // // // //         fullName: user.fullName || '',
// // // // // // // // //         email: user.email || '',
// // // // // // // // //         location: user.location || '',
// // // // // // // // //       });
// // // // // // // // //     }
// // // // // // // // //   }, [user, isLoading]);

// // // // // // // // //   useEffect(() => {
// // // // // // // // //     if (user) {
// // // // // // // // //       fetchUserData();
// // // // // // // // //       setReferralCode(user.referralCode || '');
// // // // // // // // //       setProfileData({
// // // // // // // // //         fullName: user.fullName || '',
// // // // // // // // //         email: user.email || '',
// // // // // // // // //         location: user.location || '',
// // // // // // // // //       });
// // // // // // // // //     }
// // // // // // // // //   }, [user]);

// // // // // // // // //   const fetchUserData = async () => {
// // // // // // // // //     try {
// // // // // // // // //       const token = getAuthToken();
// // // // // // // // //       const response = await fetch('/api/user/dashboard', {
// // // // // // // // //         headers: {
// // // // // // // // //           'Authorization': `Bearer ${token}`,
// // // // // // // // //         },
// // // // // // // // //       });

// // // // // // // // //       if (response.ok) {
// // // // // // // // //         const data = await response.json();
// // // // // // // // //         setUserStats(data.stats);
// // // // // // // // //         setEnrolledCourses(data.enrolledCourses);
// // // // // // // // //         setRecentActivity(data.recentActivity);
// // // // // // // // //       }
// // // // // // // // //     } catch (error) {
// // // // // // // // //       console.error('Error fetching user data:', error);
// // // // // // // // //     }
// // // // // // // // //   };

// // // // // // // // //   const updateProfile = async () => {
// // // // // // // // //     if (!profileData.fullName || !profileData.location) {
// // // // // // // // //       toast.error('Please fill in all required fields');
// // // // // // // // //       return;
// // // // // // // // //     }

// // // // // // // // //     setIsLoading(true);
// // // // // // // // //     try {
// // // // // // // // //       const token = getAuthToken();
// // // // // // // // //       const response = await fetch('/api/user/profile', {
// // // // // // // // //         method: 'PUT',
// // // // // // // // //         headers: {
// // // // // // // // //           'Content-Type': 'application/json',
// // // // // // // // //           'Authorization': `Bearer ${token}`,
// // // // // // // // //         },
// // // // // // // // //         body: JSON.stringify(profileData),
// // // // // // // // //       });

// // // // // // // // //       if (response.ok) {
// // // // // // // // //         toast.success('Profile updated successfully!');
// // // // // // // // //         setIsProfileDialogOpen(false);
// // // // // // // // //         // Refresh user data
// // // // // // // // //         fetchUserData();
// // // // // // // // //       } else {
// // // // // // // // //         const data = await response.json();
// // // // // // // // //         toast.error(data.message || 'Failed to update profile');
// // // // // // // // //       }
// // // // // // // // //     } catch (error) {
// // // // // // // // //       console.error('Error updating profile:', error);
// // // // // // // // //       toast.error('Something went wrong. Please try again.');
// // // // // // // // //     } finally {
// // // // // // // // //       setIsLoading(false);
// // // // // // // // //     }
// // // // // // // // //   };

// // // // // // // // //   const changePassword = async () => {
// // // // // // // // //     if (!passwordData.currentPassword || !passwordData.newPassword || !passwordData.confirmPassword) {
// // // // // // // // //       toast.error('Please fill in all fields');
// // // // // // // // //       return;
// // // // // // // // //     }

// // // // // // // // //     if (passwordData.newPassword !== passwordData.confirmPassword) {
// // // // // // // // //       toast.error('New passwords do not match');
// // // // // // // // //       return;
// // // // // // // // //     }

// // // // // // // // //     if (passwordData.newPassword.length < 6) {
// // // // // // // // //       toast.error('Password must be at least 6 characters long');
// // // // // // // // //       return;
// // // // // // // // //     }

// // // // // // // // //     setIsLoading(true);
// // // // // // // // //     try {
// // // // // // // // //       const token = getAuthToken();
// // // // // // // // //       const response = await fetch('/api/user/change-password', {
// // // // // // // // //         method: 'POST',
// // // // // // // // //         headers: {
// // // // // // // // //           'Content-Type': 'application/json',
// // // // // // // // //           'Authorization': `Bearer ${token}`,
// // // // // // // // //         },
// // // // // // // // //         body: JSON.stringify(passwordData),
// // // // // // // // //       });

// // // // // // // // //       if (response.ok) {
// // // // // // // // //         toast.success('Password changed successfully!');
// // // // // // // // //         setIsPasswordDialogOpen(false);
// // // // // // // // //         setPasswordData({
// // // // // // // // //           currentPassword: '',
// // // // // // // // //           newPassword: '',
// // // // // // // // //           confirmPassword: '',
// // // // // // // // //         });
// // // // // // // // //       } else {
// // // // // // // // //         const data = await response.json();
// // // // // // // // //         toast.error(data.message || 'Failed to change password');
// // // // // // // // //       }
// // // // // // // // //     } catch (error) {
// // // // // // // // //       console.error('Error changing password:', error);
// // // // // // // // //       toast.error('Something went wrong. Please try again.');
// // // // // // // // //     } finally {
// // // // // // // // //       setIsLoading(false);
// // // // // // // // //     }
// // // // // // // // //   };

// // // // // // // // //   const copyReferralLink = () => {
// // // // // // // // //     const referralLink = `${window.location.origin}/auth/register?ref=${referralCode}`;
// // // // // // // // //     navigator.clipboard.writeText(referralLink);
// // // // // // // // //     toast.success('Referral link copied to clipboard!');
// // // // // // // // //   };

// // // // // // // // //   const downloadCertificate = async (courseId) => {
// // // // // // // // //     try {
// // // // // // // // //       const token = getAuthToken();
// // // // // // // // //       const response = await fetch(`/api/certificates/download/${courseId}`, {
// // // // // // // // //         headers: {
// // // // // // // // //           'Authorization': `Bearer ${token}`,
// // // // // // // // //         },
// // // // // // // // //       });

// // // // // // // // //       if (response.ok) {
// // // // // // // // //         const blob = await response.blob();
// // // // // // // // //         const url = window.URL.createObjectURL(blob);
// // // // // // // // //         const a = document.createElement('a');
// // // // // // // // //         a.style.display = 'none';
// // // // // // // // //         a.href = url;
// // // // // // // // //         a.download = `certificate-${courseId}.pdf`;
// // // // // // // // //         document.body.appendChild(a);
// // // // // // // // //         a.click();
// // // // // // // // //         window.URL.revokeObjectURL(url);
// // // // // // // // //         toast.success('Certificate downloaded successfully!');
// // // // // // // // //       } else {
// // // // // // // // //         toast.error('Error downloading certificate');
// // // // // // // // //       }
// // // // // // // // //     } catch (error) {
// // // // // // // // //       console.error('Error downloading certificate:', error);
// // // // // // // // //       toast.error('Error downloading certificate');
// // // // // // // // //     }
// // // // // // // // //   };

// // // // // // // // //   const stats = [
// // // // // // // // //     {
// // // // // // // // //       title: 'Enrolled Courses',
// // // // // // // // //       value: userStats.enrolledCourses,
// // // // // // // // //       icon: BookOpen,
// // // // // // // // //       color: 'text-blue-600',
// // // // // // // // //       bgColor: 'bg-blue-50 dark:bg-blue-950'
// // // // // // // // //     },
// // // // // // // // //     {
// // // // // // // // //       title: 'Completed',
// // // // // // // // //       value: userStats.completedCourses,
// // // // // // // // //       icon: CheckCircle,
// // // // // // // // //       color: 'text-green-600',
// // // // // // // // //       bgColor: 'bg-green-50 dark:bg-green-950'
// // // // // // // // //     },
// // // // // // // // //     {
// // // // // // // // //       title: 'Certificates',
// // // // // // // // //       value: userStats.certificatesEarned,
// // // // // // // // //       icon: Award,
// // // // // // // // //       color: 'text-purple-600',
// // // // // // // // //       bgColor: 'bg-purple-50 dark:bg-purple-950'
// // // // // // // // //     },
// // // // // // // // //     {
// // // // // // // // //       title: 'Credits',
// // // // // // // // //       value: userStats.credits,
// // // // // // // // //       icon: Gift,
// // // // // // // // //       color: 'text-orange-600',
// // // // // // // // //       bgColor: 'bg-orange-50 dark:bg-orange-950'
// // // // // // // // //     }
// // // // // // // // //   ];

// // // // // // // // //   if (isLoading || !user) {
// // // // // // // // //     return (
// // // // // // // // //       <div className="min-h-screen flex items-center justify-center">
// // // // // // // // //         <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
// // // // // // // // //       </div>
// // // // // // // // //     );
// // // // // // // // //   }

// // // // // // // // //   return (
// // // // // // // // //     <div className="min-h-screen bg-background">
// // // // // // // // //       <Navbar />

// // // // // // // // //       <main className="pt-20 pb-12">
// // // // // // // // //         <div className="container mx-auto px-4">
// // // // // // // // //           {/* Header with Profile Actions */}
// // // // // // // // //           <motion.div
// // // // // // // // //             className="mb-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4"
// // // // // // // // //             initial={{ opacity: 0, y: 20 }}
// // // // // // // // //             animate={{ opacity: 1, y: 0 }}
// // // // // // // // //             transition={{ duration: 0.6 }}
// // // // // // // // //           >
// // // // // // // // //             <div>
// // // // // // // // //               <h1 className="text-3xl font-bold mb-2">
// // // // // // // // //                 Welcome back, {user.fullName}! 👋
// // // // // // // // //               </h1>
// // // // // // // // //               <p className="text-muted-foreground">
// // // // // // // // //                 Continue your learning journey and track your progress.
// // // // // // // // //               </p>
// // // // // // // // //             </div>
// // // // // // // // //             <div className="flex gap-2">
// // // // // // // // //               <Dialog open={isProfileDialogOpen} onOpenChange={setIsProfileDialogOpen}>
// // // // // // // // //                 <DialogTrigger asChild>
// // // // // // // // //                   <Button variant="outline" className="flex items-center gap-2">
// // // // // // // // //                     <User className="w-4 h-4" />
// // // // // // // // //                     Profile
// // // // // // // // //                   </Button>
// // // // // // // // //                 </DialogTrigger>
// // // // // // // // //                 <DialogContent>
// // // // // // // // //                   <DialogHeader>
// // // // // // // // //                     <DialogTitle>Edit Profile</DialogTitle>
// // // // // // // // //                     <DialogDescription>
// // // // // // // // //                       Update your profile information
// // // // // // // // //                     </DialogDescription>
// // // // // // // // //                   </DialogHeader>
// // // // // // // // //                   <div className="space-y-4">
// // // // // // // // //                     <div className="space-y-2">
// // // // // // // // //                       <Label htmlFor="fullName">Full Name</Label>
// // // // // // // // //                       <Input
// // // // // // // // //                         id="fullName"
// // // // // // // // //                         value={profileData.fullName}
// // // // // // // // //                         onChange={(e) => setProfileData(prev => ({ ...prev, fullName: e.target.value }))}
// // // // // // // // //                         placeholder="Enter your full name"
// // // // // // // // //                       />
// // // // // // // // //                     </div>
// // // // // // // // //                     <div className="space-y-2">
// // // // // // // // //                       <Label htmlFor="email">Email (Cannot be changed)</Label>
// // // // // // // // //                       <Input
// // // // // // // // //                         id="email"
// // // // // // // // //                         value={profileData.email}
// // // // // // // // //                         disabled
// // // // // // // // //                         className="bg-muted"
// // // // // // // // //                       />
// // // // // // // // //                     </div>
// // // // // // // // //                     <div className="space-y-2">
// // // // // // // // //                       <Label htmlFor="location">Location</Label>
// // // // // // // // //                       <Input
// // // // // // // // //                         id="location"
// // // // // // // // //                         value={profileData.location}
// // // // // // // // //                         onChange={(e) => setProfileData(prev => ({ ...prev, location: e.target.value }))}
// // // // // // // // //                         placeholder="Enter your location"
// // // // // // // // //                       />
// // // // // // // // //                     </div>
// // // // // // // // //                     <div className="flex gap-2">
// // // // // // // // //                       <Button onClick={updateProfile} disabled={isLoading} className="flex-1">
// // // // // // // // //                         {isLoading ? 'Updating...' : 'Update Profile'}
// // // // // // // // //                       </Button>
// // // // // // // // //                       <Button variant="outline" onClick={() => setIsProfileDialogOpen(false)}>
// // // // // // // // //                         Cancel
// // // // // // // // //                       </Button>
// // // // // // // // //                     </div>
// // // // // // // // //                   </div>
// // // // // // // // //                 </DialogContent>
// // // // // // // // //               </Dialog>

// // // // // // // // //               <Dialog open={isPasswordDialogOpen} onOpenChange={setIsPasswordDialogOpen}>
// // // // // // // // //                 <DialogTrigger asChild>
// // // // // // // // //                   <Button variant="outline" className="flex items-center gap-2">
// // // // // // // // //                     <Lock className="w-4 h-4" />
// // // // // // // // //                     Change Password
// // // // // // // // //                   </Button>
// // // // // // // // //                 </DialogTrigger>
// // // // // // // // //                 <DialogContent>
// // // // // // // // //                   <DialogHeader>
// // // // // // // // //                     <DialogTitle>Change Password</DialogTitle>
// // // // // // // // //                     <DialogDescription>
// // // // // // // // //                       Enter your current password and choose a new one
// // // // // // // // //                     </DialogDescription>
// // // // // // // // //                   </DialogHeader>
// // // // // // // // //                   <div className="space-y-4">
// // // // // // // // //                     <div className="space-y-2">
// // // // // // // // //                       <Label htmlFor="currentPassword">Current Password</Label>
// // // // // // // // //                       <div className="relative">
// // // // // // // // //                         <Input
// // // // // // // // //                           id="currentPassword"
// // // // // // // // //                           type={showPasswords.current ? 'text' : 'password'}
// // // // // // // // //                           value={passwordData.currentPassword}
// // // // // // // // //                           onChange={(e) => setPasswordData(prev => ({ ...prev, currentPassword: e.target.value }))}
// // // // // // // // //                           placeholder="Enter current password"
// // // // // // // // //                           className="pr-10"
// // // // // // // // //                         />
// // // // // // // // //                         <button
// // // // // // // // //                           type="button"
// // // // // // // // //                           onClick={() => setShowPasswords(prev => ({ ...prev, current: !prev.current }))}
// // // // // // // // //                           className="absolute right-3 top-3 text-muted-foreground hover:text-primary"
// // // // // // // // //                         >
// // // // // // // // //                           {showPasswords.current ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
// // // // // // // // //                         </button>
// // // // // // // // //                       </div>
// // // // // // // // //                     </div>
// // // // // // // // //                     <div className="space-y-2">
// // // // // // // // //                       <Label htmlFor="newPassword">New Password</Label>
// // // // // // // // //                       <div className="relative">
// // // // // // // // //                         <Input
// // // // // // // // //                           id="newPassword"
// // // // // // // // //                           type={showPasswords.new ? 'text' : 'password'}
// // // // // // // // //                           value={passwordData.newPassword}
// // // // // // // // //                           onChange={(e) => setPasswordData(prev => ({ ...prev, newPassword: e.target.value }))}
// // // // // // // // //                           placeholder="Enter new password"
// // // // // // // // //                           className="pr-10"
// // // // // // // // //                         />
// // // // // // // // //                         <button
// // // // // // // // //                           type="button"
// // // // // // // // //                           onClick={() => setShowPasswords(prev => ({ ...prev, new: !prev.new }))}
// // // // // // // // //                           className="absolute right-3 top-3 text-muted-foreground hover:text-primary"
// // // // // // // // //                         >
// // // // // // // // //                           {showPasswords.new ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
// // // // // // // // //                         </button>
// // // // // // // // //                       </div>
// // // // // // // // //                     </div>
// // // // // // // // //                     <div className="space-y-2">
// // // // // // // // //                       <Label htmlFor="confirmPassword">Confirm New Password</Label>
// // // // // // // // //                       <div className="relative">
// // // // // // // // //                         <Input
// // // // // // // // //                           id="confirmPassword"
// // // // // // // // //                           type={showPasswords.confirm ? 'text' : 'password'}
// // // // // // // // //                           value={passwordData.confirmPassword}
// // // // // // // // //                           onChange={(e) => setPasswordData(prev => ({ ...prev, confirmPassword: e.target.value }))}
// // // // // // // // //                           placeholder="Confirm new password"
// // // // // // // // //                           className="pr-10"
// // // // // // // // //                         />
// // // // // // // // //                         <button
// // // // // // // // //                           type="button"
// // // // // // // // //                           onClick={() => setShowPasswords(prev => ({ ...prev, confirm: !prev.confirm }))}
// // // // // // // // //                           className="absolute right-3 top-3 text-muted-foreground hover:text-primary"
// // // // // // // // //                         >
// // // // // // // // //                           {showPasswords.confirm ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
// // // // // // // // //                         </button>
// // // // // // // // //                       </div>
// // // // // // // // //                     </div>
// // // // // // // // //                     <div className="flex gap-2">
// // // // // // // // //                       <Button onClick={changePassword} disabled={isLoading} className="flex-1">
// // // // // // // // //                         {isLoading ? 'Changing...' : 'Change Password'}
// // // // // // // // //                       </Button>
// // // // // // // // //                       <Button variant="outline" onClick={() => setIsPasswordDialogOpen(false)}>
// // // // // // // // //                         Cancel
// // // // // // // // //                       </Button>
// // // // // // // // //                     </div>
// // // // // // // // //                   </div>
// // // // // // // // //                 </DialogContent>
// // // // // // // // //               </Dialog>
// // // // // // // // //             </div>
// // // // // // // // //           </motion.div>

// // // // // // // // //           {/* Stats Cards */}
// // // // // // // // //           <motion.div
// // // // // // // // //             className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
// // // // // // // // //             initial={{ opacity: 0, y: 20 }}
// // // // // // // // //             animate={{ opacity: 1, y: 0 }}
// // // // // // // // //             transition={{ duration: 0.6, delay: 0.1 }}
// // // // // // // // //           >
// // // // // // // // //             {stats.map((stat, index) => (
// // // // // // // // //               <Card key={stat.title} className="hover:shadow-lg transition-shadow">
// // // // // // // // //                 <CardContent className="p-6">
// // // // // // // // //                   <div className="flex items-center justify-between">
// // // // // // // // //                     <div>
// // // // // // // // //                       <p className="text-sm text-muted-foreground mb-1">{stat.title}</p>
// // // // // // // // //                       <p className="text-2xl font-bold">{stat.value}</p>
// // // // // // // // //                     </div>
// // // // // // // // //                     <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${stat.bgColor}`}>
// // // // // // // // //                       <stat.icon className={`w-6 h-6 ${stat.color}`} />
// // // // // // // // //                     </div>
// // // // // // // // //                   </div>
// // // // // // // // //                 </CardContent>
// // // // // // // // //               </Card>
// // // // // // // // //             ))}
// // // // // // // // //           </motion.div>

// // // // // // // // //           <div className="grid lg:grid-cols-3 gap-8">
// // // // // // // // //             {/* Main Content */}
// // // // // // // // //             <div className="lg:col-span-2 space-y-8">
// // // // // // // // //               {/* Course Tabs */}
// // // // // // // // //               <motion.div
// // // // // // // // //                 initial={{ opacity: 0, y: 20 }}
// // // // // // // // //                 animate={{ opacity: 1, y: 0 }}
// // // // // // // // //                 transition={{ duration: 0.6, delay: 0.2 }}
// // // // // // // // //               >
// // // // // // // // //                 <Tabs defaultValue="enrolled" className="w-full">
// // // // // // // // //                   <TabsList className="grid w-full grid-cols-3">
// // // // // // // // //                     <TabsTrigger value="enrolled">Enrolled</TabsTrigger>
// // // // // // // // //                     <TabsTrigger value="completed">Completed</TabsTrigger>
// // // // // // // // //                     <TabsTrigger value="certificates">Certificates</TabsTrigger>
// // // // // // // // //                   </TabsList>

// // // // // // // // //                   <TabsContent value="enrolled" className="mt-6">
// // // // // // // // //                     <div className="space-y-4">
// // // // // // // // //                       {enrolledCourses.filter(course => !course.completed).map((course) => (
// // // // // // // // //                         <Card key={course.id} className="hover:shadow-lg transition-shadow">
// // // // // // // // //                           <CardContent className="p-6">
// // // // // // // // //                             <div className="flex items-start gap-4">
// // // // // // // // //                               <img
// // // // // // // // //                                 src={course.thumbnail || 'https://images.pexels.com/photos/5212345/pexels-photo-5212345.jpeg'}
// // // // // // // // //                                 alt={course.title}
// // // // // // // // //                                 className="w-20 h-20 rounded-lg object-cover"
// // // // // // // // //                               />
// // // // // // // // //                               <div className="flex-1">
// // // // // // // // //                                 <h3 className="font-semibold text-lg mb-2">{course.title}</h3>
// // // // // // // // //                                 <p className="text-muted-foreground text-sm mb-3">{course.description}</p>
// // // // // // // // //                                 <div className="flex items-center gap-4 mb-3">
// // // // // // // // //                                   <Badge variant="secondary">{course.category}</Badge>
// // // // // // // // //                                   <div className="flex items-center gap-1 text-sm text-muted-foreground">
// // // // // // // // //                                     <Clock className="w-4 h-4" />
// // // // // // // // //                                     {course.duration}
// // // // // // // // //                                   </div>
// // // // // // // // //                                 </div>
// // // // // // // // //                                 <div className="space-y-2">
// // // // // // // // //                                   <div className="flex justify-between items-center text-sm">
// // // // // // // // //                                     <span>Progress</span>
// // // // // // // // //                                     <span>{course.progress}%</span>
// // // // // // // // //                                   </div>
// // // // // // // // //                                   <Progress value={course.progress} className="w-full" />
// // // // // // // // //                                 </div>
// // // // // // // // //                               </div>
// // // // // // // // //                               <div className="flex flex-col gap-2">
// // // // // // // // //                                 <Button className="flex items-center gap-2">
// // // // // // // // //                                   <Play className="w-4 h-4" />
// // // // // // // // //                                   Continue
// // // // // // // // //                                 </Button>
// // // // // // // // //                                 <Button variant="outline" size="sm" className="text-xs">
// // // // // // // // //                                   View Content
// // // // // // // // //                                 </Button>
// // // // // // // // //                               </div>
// // // // // // // // //                             </div>
// // // // // // // // //                           </CardContent>
// // // // // // // // //                         </Card>
// // // // // // // // //                       ))}

// // // // // // // // //                       {enrolledCourses.filter(course => !course.completed).length === 0 && (
// // // // // // // // //                         <Card>
// // // // // // // // //                           <CardContent className="p-12 text-center">
// // // // // // // // //                             <BookOpen className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
// // // // // // // // //                             <p className="text-muted-foreground">No enrolled courses yet.</p>
// // // // // // // // //                             <Button className="mt-4">Browse Courses</Button>
// // // // // // // // //                           </CardContent>
// // // // // // // // //                         </Card>
// // // // // // // // //                       )}
// // // // // // // // //                     </div>
// // // // // // // // //                   </TabsContent>

// // // // // // // // //                   <TabsContent value="completed" className="mt-6">
// // // // // // // // //                     <div className="space-y-4">
// // // // // // // // //                       {enrolledCourses.filter(course => course.completed).map((course) => (
// // // // // // // // //                         <Card key={course.id} className="hover:shadow-lg transition-shadow">
// // // // // // // // //                           <CardContent className="p-6">
// // // // // // // // //                             <div className="flex items-start gap-4">
// // // // // // // // //                               <img
// // // // // // // // //                                 src={course.thumbnail || 'https://images.pexels.com/photos/5212345/pexels-photo-5212345.jpeg'}
// // // // // // // // //                                 alt={course.title}
// // // // // // // // //                                 className="w-20 h-20 rounded-lg object-cover"
// // // // // // // // //                               />
// // // // // // // // //                               <div className="flex-1">
// // // // // // // // //                                 <h3 className="font-semibold text-lg mb-2">{course.title}</h3>
// // // // // // // // //                                 <p className="text-muted-foreground text-sm mb-3">{course.description}</p>
// // // // // // // // //                                 <div className="flex items-center gap-4">
// // // // // // // // //                                   <Badge variant="secondary" className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100">
// // // // // // // // //                                     Completed
// // // // // // // // //                                   </Badge>
// // // // // // // // //                                   <div className="flex items-center gap-1 text-sm text-muted-foreground">
// // // // // // // // //                                     <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
// // // // // // // // //                                     Rate Course
// // // // // // // // //                                   </div>
// // // // // // // // //                                 </div>
// // // // // // // // //                               </div>
// // // // // // // // //                               <Button
// // // // // // // // //                                 variant="outline"
// // // // // // // // //                                 className="flex items-center gap-2"
// // // // // // // // //                                 onClick={() => downloadCertificate(course.id)}
// // // // // // // // //                                 disabled={!course.canDownloadCertificate}
// // // // // // // // //                               >
// // // // // // // // //                                 <Download className="w-4 h-4" />
// // // // // // // // //                                 Certificate
// // // // // // // // //                               </Button>
// // // // // // // // //                             </div>
// // // // // // // // //                           </CardContent>
// // // // // // // // //                         </Card>
// // // // // // // // //                       ))}

// // // // // // // // //                       {enrolledCourses.filter(course => course.completed).length === 0 && (
// // // // // // // // //                         <Card>
// // // // // // // // //                           <CardContent className="p-12 text-center">
// // // // // // // // //                             <Award className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
// // // // // // // // //                             <p className="text-muted-foreground">No completed courses yet.</p>
// // // // // // // // //                           </CardContent>
// // // // // // // // //                         </Card>
// // // // // // // // //                       )}
// // // // // // // // //                     </div>
// // // // // // // // //                   </TabsContent>

// // // // // // // // //                   <TabsContent value="certificates" className="mt-6">
// // // // // // // // //                     <div className="space-y-4">
// // // // // // // // //                       {enrolledCourses.filter(course => course.completed && course.canDownloadCertificate).map((course) => (
// // // // // // // // //                         <Card key={course.id} className="hover:shadow-lg transition-shadow">
// // // // // // // // //                           <CardContent className="p-6">
// // // // // // // // //                             <div className="flex items-center justify-between">
// // // // // // // // //                               <div className="flex items-center gap-4">
// // // // // // // // //                                 <div className="w-16 h-16 bg-gradient-to-br from-primary to-blue-600 rounded-lg flex items-center justify-center">
// // // // // // // // //                                   <Award className="w-8 h-8 text-white" />
// // // // // // // // //                                 </div>
// // // // // // // // //                                 <div>
// // // // // // // // //                                   <h3 className="font-semibold text-lg">{course.title}</h3>
// // // // // // // // //                                   <p className="text-muted-foreground">
// // // // // // // // //                                     Completed on {new Date(course.completedAt).toLocaleDateString()}
// // // // // // // // //                                   </p>
// // // // // // // // //                                   <p className="text-sm text-muted-foreground">
// // // // // // // // //                                     Credential ID: {course.credentialId}
// // // // // // // // //                                   </p>
// // // // // // // // //                                 </div>
// // // // // // // // //                               </div>
// // // // // // // // //                               <Button
// // // // // // // // //                                 className="flex items-center gap-2"
// // // // // // // // //                                 onClick={() => downloadCertificate(course.id)}
// // // // // // // // //                               >
// // // // // // // // //                                 <Download className="w-4 h-4" />
// // // // // // // // //                                 Download
// // // // // // // // //                               </Button>
// // // // // // // // //                             </div>
// // // // // // // // //                           </CardContent>
// // // // // // // // //                         </Card>
// // // // // // // // //                       ))}

// // // // // // // // //                       {enrolledCourses.filter(course => course.completed && course.canDownloadCertificate).length === 0 && (
// // // // // // // // //                         <Card>
// // // // // // // // //                           <CardContent className="p-12 text-center">
// // // // // // // // //                             <Award className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
// // // // // // // // //                             <p className="text-muted-foreground">No certificates available yet.</p>
// // // // // // // // //                             <p className="text-sm text-muted-foreground mt-2">
// // // // // // // // //                               Certificates become available 30 days after course completion.
// // // // // // // // //                             </p>
// // // // // // // // //                           </CardContent>
// // // // // // // // //                         </Card>
// // // // // // // // //                       )}
// // // // // // // // //                     </div>
// // // // // // // // //                   </TabsContent>
// // // // // // // // //                 </Tabs>
// // // // // // // // //               </motion.div>
// // // // // // // // //             </div>

// // // // // // // // //             {/* Sidebar */}
// // // // // // // // //             <div className="space-y-6">
// // // // // // // // //               {/* Referral Card */}
// // // // // // // // //               <motion.div
// // // // // // // // //                 initial={{ opacity: 0, x: 20 }}
// // // // // // // // //                 animate={{ opacity: 1, x: 0 }}
// // // // // // // // //                 transition={{ duration: 0.6, delay: 0.3 }}
// // // // // // // // //               >
// // // // // // // // //                 <Card>
// // // // // // // // //                   <CardHeader>
// // // // // // // // //                     <CardTitle className="flex items-center gap-2">
// // // // // // // // //                       <Gift className="w-5 h-5" />
// // // // // // // // //                       Refer & Earn
// // // // // // // // //                     </CardTitle>
// // // // // // // // //                     <CardDescription>
// // // // // // // // //                       Earn credits when your friends join and purchase courses
// // // // // // // // //                     </CardDescription>
// // // // // // // // //                   </CardHeader>
// // // // // // // // //                   <CardContent className="space-y-4">
// // // // // // // // //                     <div className="p-3 bg-primary/10 rounded-lg text-center">
// // // // // // // // //                       <p className="text-2xl font-bold text-primary">{userStats.credits}</p>
// // // // // // // // //                       <p className="text-sm text-muted-foreground">Available Credits</p>
// // // // // // // // //                     </div>

// // // // // // // // //                     <div className="space-y-2">
// // // // // // // // //                       <Label htmlFor="referral-code">Your Referral Code</Label>
// // // // // // // // //                       <div className="flex gap-2">
// // // // // // // // //                         <Input
// // // // // // // // //                           id="referral-code"
// // // // // // // // //                           value={referralCode}
// // // // // // // // //                           readOnly
// // // // // // // // //                           className="font-mono"
// // // // // // // // //                         />
// // // // // // // // //                         <Button
// // // // // // // // //                           size="sm"
// // // // // // // // //                           variant="outline"
// // // // // // // // //                           onClick={copyReferralLink}
// // // // // // // // //                         >
// // // // // // // // //                           <Copy className="w-4 h-4" />
// // // // // // // // //                         </Button>
// // // // // // // // //                       </div>
// // // // // // // // //                     </div>

// // // // // // // // //                     <div className="text-sm text-muted-foreground">
// // // // // // // // //                       <p>• Earn 100 credits per successful referral</p>
// // // // // // // // //                       <p>• Use credits for discounts on courses</p>
// // // // // // // // //                     </div>
// // // // // // // // //                   </CardContent>
// // // // // // // // //                 </Card>
// // // // // // // // //               </motion.div>

// // // // // // // // //               {/* Recent Activity */}
// // // // // // // // //               <motion.div
// // // // // // // // //                 initial={{ opacity: 0, x: 20 }}
// // // // // // // // //                 animate={{ opacity: 1, x: 0 }}
// // // // // // // // //                 transition={{ duration: 0.6, delay: 0.4 }}
// // // // // // // // //               >
// // // // // // // // //                 <Card>
// // // // // // // // //                   <CardHeader>
// // // // // // // // //                     <CardTitle className="flex items-center gap-2">
// // // // // // // // //                       <TrendingUp className="w-5 h-5" />
// // // // // // // // //                       Recent Activity
// // // // // // // // //                     </CardTitle>
// // // // // // // // //                   </CardHeader>
// // // // // // // // //                   <CardContent className="space-y-4">
// // // // // // // // //                     {recentActivity.length > 0 ? (
// // // // // // // // //                       recentActivity.map((activity, index) => (
// // // // // // // // //                         <div key={index} className="flex items-start gap-3 p-3 rounded-lg bg-muted/50">
// // // // // // // // //                           <div className="w-2 h-2 bg-primary rounded-full mt-2" />
// // // // // // // // //                           <div className="flex-1">
// // // // // // // // //                             <p className="text-sm font-medium">{activity.title}</p>
// // // // // // // // //                             <p className="text-xs text-muted-foreground">{activity.description}</p>
// // // // // // // // //                             <p className="text-xs text-muted-foreground mt-1">{activity.timestamp}</p>
// // // // // // // // //                           </div>
// // // // // // // // //                         </div>
// // // // // // // // //                       ))
// // // // // // // // //                     ) : (
// // // // // // // // //                       <p className="text-sm text-muted-foreground text-center py-4">
// // // // // // // // //                         No recent activity
// // // // // // // // //                       </p>
// // // // // // // // //                     )}
// // // // // // // // //                   </CardContent>
// // // // // // // // //                 </Card>
// // // // // // // // //               </motion.div>
// // // // // // // // //             </div>
// // // // // // // // //           </div>
// // // // // // // // //         </div>
// // // // // // // // //       </main>
// // // // // // // // //     </div>
// // // // // // // // //   );
// // // // // // // // // }

// // // // // // // // 'use client';

// // // // // // // // import { useState, useEffect } from 'react';
// // // // // // // // import { useRouter } from 'next/navigation';
// // // // // // // // import { motion } from 'framer-motion';
// // // // // // // // import {
// // // // // // // //   BookOpen,
// // // // // // // //   Award,
// // // // // // // //   Clock,
// // // // // // // //   TrendingUp,
// // // // // // // //   Play,
// // // // // // // //   Download,
// // // // // // // //   Users,
// // // // // // // //   Star,
// // // // // // // //   Gift,
// // // // // // // //   Copy,
// // // // // // // //   CheckCircle,
// // // // // // // //   Settings,
// // // // // // // //   User,
// // // // // // // //   CreditCard,
// // // // // // // //   Bell,
// // // // // // // //   Lock,
// // // // // // // //   Eye,
// // // // // // // //   EyeOff
// // // // // // // // } from 'lucide-react';
// // // // // // // // import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
// // // // // // // // import { Button } from '@/components/ui/button';
// // // // // // // // import { Badge } from '@/components/ui/badge';
// // // // // // // // import { Progress } from '@/components/ui/progress';
// // // // // // // // import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
// // // // // // // // import { Input } from '@/components/ui/input';
// // // // // // // // import { Label } from '@/components/ui/label';
// // // // // // // // import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
// // // // // // // // import { toast } from 'sonner';
// // // // // // // // import { useAuth } from '@/components/auth-provider';
// // // // // // // // import Navbar from '@/components/navbar';

// // // // // // // // export default function Dashboard() {
// // // // // // // //   const { user, loading } = useAuth();
// // // // // // // //   const router = useRouter();
// // // // // // // //   const [userStats, setUserStats] = useState({
// // // // // // // //     enrolledCourses: 0,
// // // // // // // //     completedCourses: 0,
// // // // // // // //     certificatesEarned: 0,
// // // // // // // //     totalWatchTime: 0,
// // // // // // // //     credits: 0
// // // // // // // //   });
// // // // // // // //   const [enrolledCourses, setEnrolledCourses] = useState([]);
// // // // // // // //   const [recentActivity, setRecentActivity] = useState([]);
// // // // // // // //   const [referralCode, setReferralCode] = useState('');
// // // // // // // //   const [profileData, setProfileData] = useState({
// // // // // // // //     fullName: '',
// // // // // // // //     email: '',
// // // // // // // //     location: '',
// // // // // // // //   });
// // // // // // // //   const [passwordData, setPasswordData] = useState({
// // // // // // // //     currentPassword: '',
// // // // // // // //     newPassword: '',
// // // // // // // //     confirmPassword: '',
// // // // // // // //   });
// // // // // // // //   const [showPasswords, setShowPasswords] = useState({
// // // // // // // //     current: false,
// // // // // // // //     new: false,
// // // // // // // //     confirm: false,
// // // // // // // //   });
// // // // // // // //   const [isProfileDialogOpen, setIsProfileDialogOpen] = useState(false);
// // // // // // // //   const [isPasswordDialogOpen, setIsPasswordDialogOpen] = useState(false);
// // // // // // // //   const [isOperationLoading, setIsOperationLoading] = useState(false);
// // // // // // // //   const [dataLoaded, setDataLoaded] = useState(false);

// // // // // // // //   // Redirect if not logged in
// // // // // // // //   useEffect(() => {
// // // // // // // //     if (!loading && !user) {
// // // // // // // //       router.replace('/auth/login');
// // // // // // // //     }
// // // // // // // //   }, [loading, user, router]);

// // // // // // // //   // Load user data when user is available
// // // // // // // //   useEffect(() => {
// // // // // // // //     if (user && !dataLoaded) {
// // // // // // // //       console.log('Loading dashboard data for user:', user.email);
// // // // // // // //       fetchUserData();
// // // // // // // //       setReferralCode(user.referralCode || '');
// // // // // // // //       setProfileData({
// // // // // // // //         fullName: user.fullName || '',
// // // // // // // //         email: user.email || '',
// // // // // // // //         location: user.location || '',
// // // // // // // //       });
// // // // // // // //       setDataLoaded(true);
// // // // // // // //     }
// // // // // // // //   }, [user, dataLoaded]);

// // // // // // // //   const getAuthToken = () => {
// // // // // // // //     // Try to get token from cookie
// // // // // // // //     if (typeof document !== 'undefined') {
// // // // // // // //       const cookies = document.cookie.split(';');
// // // // // // // //       for (let cookie of cookies) {
// // // // // // // //         const [name, value] = cookie.trim().split('=');
// // // // // // // //         if (name === 'auth-token') {
// // // // // // // //           return value;
// // // // // // // //         }
// // // // // // // //       }
// // // // // // // //     }
// // // // // // // //     return null;
// // // // // // // //   };

// // // // // // // //   const fetchUserData = async () => {
// // // // // // // //     try {
// // // // // // // //       const token = getAuthToken();
// // // // // // // //       const response = await fetch('/api/user/dashboard', {
// // // // // // // //         headers: {
// // // // // // // //           'Authorization': `Bearer ${token}`,
// // // // // // // //         },
// // // // // // // //       });

// // // // // // // //       if (response.ok) {
// // // // // // // //         const data = await response.json();
// // // // // // // //         setUserStats(data.stats);
// // // // // // // //         setEnrolledCourses(data.enrolledCourses);
// // // // // // // //         setRecentActivity(data.recentActivity);
// // // // // // // //       } else {
// // // // // // // //         console.error('Failed to fetch dashboard data');
// // // // // // // //         toast.error('Failed to load dashboard data');
// // // // // // // //       }
// // // // // // // //     } catch (error) {
// // // // // // // //       console.error('Error fetching user data:', error);
// // // // // // // //       toast.error('Error loading data');
// // // // // // // //     }
// // // // // // // //   };

// // // // // // // //   const updateProfile = async () => {
// // // // // // // //     if (!profileData.fullName || !profileData.location) {
// // // // // // // //       toast.error('Please fill in all required fields');
// // // // // // // //       return;
// // // // // // // //     }

// // // // // // // //     setIsOperationLoading(true);
// // // // // // // //     try {
// // // // // // // //       const token = getAuthToken();
// // // // // // // //       const response = await fetch('/api/user/profile', {
// // // // // // // //         method: 'PUT',
// // // // // // // //         headers: {
// // // // // // // //           'Content-Type': 'application/json',
// // // // // // // //           'Authorization': `Bearer ${token}`,
// // // // // // // //         },
// // // // // // // //         body: JSON.stringify(profileData),
// // // // // // // //       });

// // // // // // // //       if (response.ok) {
// // // // // // // //         toast.success('Profile updated successfully!');
// // // // // // // //         setIsProfileDialogOpen(false);
// // // // // // // //         // Refresh user data
// // // // // // // //         fetchUserData();
// // // // // // // //       } else {
// // // // // // // //         const data = await response.json();
// // // // // // // //         toast.error(data.message || 'Failed to update profile');
// // // // // // // //       }
// // // // // // // //     } catch (error) {
// // // // // // // //       console.error('Error updating profile:', error);
// // // // // // // //       toast.error('Something went wrong. Please try again.');
// // // // // // // //     } finally {
// // // // // // // //       setIsOperationLoading(false);
// // // // // // // //     }
// // // // // // // //   };

// // // // // // // //   const changePassword = async () => {
// // // // // // // //     if (!passwordData.currentPassword || !passwordData.newPassword || !passwordData.confirmPassword) {
// // // // // // // //       toast.error('Please fill in all fields');
// // // // // // // //       return;
// // // // // // // //     }

// // // // // // // //     if (passwordData.newPassword !== passwordData.confirmPassword) {
// // // // // // // //       toast.error('New passwords do not match');
// // // // // // // //       return;
// // // // // // // //     }

// // // // // // // //     if (passwordData.newPassword.length < 6) {
// // // // // // // //       toast.error('Password must be at least 6 characters long');
// // // // // // // //       return;
// // // // // // // //     }

// // // // // // // //     setIsOperationLoading(true);
// // // // // // // //     try {
// // // // // // // //       const token = getAuthToken();
// // // // // // // //       const response = await fetch('/api/user/change-password', {
// // // // // // // //         method: 'POST',
// // // // // // // //         headers: {
// // // // // // // //           'Content-Type': 'application/json',
// // // // // // // //           'Authorization': `Bearer ${token}`,
// // // // // // // //         },
// // // // // // // //         body: JSON.stringify(passwordData),
// // // // // // // //       });

// // // // // // // //       if (response.ok) {
// // // // // // // //         toast.success('Password changed successfully!');
// // // // // // // //         setIsPasswordDialogOpen(false);
// // // // // // // //         setPasswordData({
// // // // // // // //           currentPassword: '',
// // // // // // // //           newPassword: '',
// // // // // // // //           confirmPassword: '',
// // // // // // // //         });
// // // // // // // //       } else {
// // // // // // // //         const data = await response.json();
// // // // // // // //         toast.error(data.message || 'Failed to change password');
// // // // // // // //       }
// // // // // // // //     } catch (error) {
// // // // // // // //       console.error('Error changing password:', error);
// // // // // // // //       toast.error('Something went wrong. Please try again.');
// // // // // // // //     } finally {
// // // // // // // //       setIsOperationLoading(false);
// // // // // // // //     }
// // // // // // // //   };

// // // // // // // //   const copyReferralLink = () => {
// // // // // // // //     const referralLink = `${window.location.origin}/auth/register?ref=${referralCode}`;
// // // // // // // //     navigator.clipboard.writeText(referralLink);
// // // // // // // //     toast.success('Referral link copied to clipboard!');
// // // // // // // //   };

// // // // // // // //   const downloadCertificate = async (courseId) => {
// // // // // // // //     try {
// // // // // // // //       const token = getAuthToken();
// // // // // // // //       const response = await fetch(`/api/certificates/download/${courseId}`, {
// // // // // // // //         headers: {
// // // // // // // //           'Authorization': `Bearer ${token}`,
// // // // // // // //         },
// // // // // // // //       });

// // // // // // // //       if (response.ok) {
// // // // // // // //         const blob = await response.blob();
// // // // // // // //         const url = window.URL.createObjectURL(blob);
// // // // // // // //         const a = document.createElement('a');
// // // // // // // //         a.style.display = 'none';
// // // // // // // //         a.href = url;
// // // // // // // //         a.download = `certificate-${courseId}.pdf`;
// // // // // // // //         document.body.appendChild(a);
// // // // // // // //         a.click();
// // // // // // // //         window.URL.revokeObjectURL(url);
// // // // // // // //         toast.success('Certificate downloaded successfully!');
// // // // // // // //       } else {
// // // // // // // //         toast.error('Error downloading certificate');
// // // // // // // //       }
// // // // // // // //     } catch (error) {
// // // // // // // //       console.error('Error downloading certificate:', error);
// // // // // // // //       toast.error('Error downloading certificate');
// // // // // // // //     }
// // // // // // // //   };

// // // // // // // //   const stats = [
// // // // // // // //     {
// // // // // // // //       title: 'Enrolled Courses',
// // // // // // // //       value: userStats.enrolledCourses,
// // // // // // // //       icon: BookOpen,
// // // // // // // //       color: 'text-blue-600',
// // // // // // // //       bgColor: 'bg-blue-50 dark:bg-blue-950'
// // // // // // // //     },
// // // // // // // //     {
// // // // // // // //       title: 'Completed',
// // // // // // // //       value: userStats.completedCourses,
// // // // // // // //       icon: CheckCircle,
// // // // // // // //       color: 'text-green-600',
// // // // // // // //       bgColor: 'bg-green-50 dark:bg-green-950'
// // // // // // // //     },
// // // // // // // //     {
// // // // // // // //       title: 'Certificates',
// // // // // // // //       value: userStats.certificatesEarned,
// // // // // // // //       icon: Award,
// // // // // // // //       color: 'text-purple-600',
// // // // // // // //       bgColor: 'bg-purple-50 dark:bg-purple-950'
// // // // // // // //     },
// // // // // // // //     {
// // // // // // // //       title: 'Credits',
// // // // // // // //       value: userStats.credits,
// // // // // // // //       icon: Gift,
// // // // // // // //       color: 'text-orange-600',
// // // // // // // //       bgColor: 'bg-orange-50 dark:bg-orange-950'
// // // // // // // //     }
// // // // // // // //   ];

// // // // // // // //   if (loading) {
// // // // // // // //     return (
// // // // // // // //       <div className="min-h-screen flex items-center justify-center">
// // // // // // // //         <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
// // // // // // // //       </div>
// // // // // // // //     );
// // // // // // // //   }

// // // // // // // //   if (!user) {
// // // // // // // //     return null; // Will redirect via useEffect
// // // // // // // //   }

// // // // // // // //   return (
// // // // // // // //     <div className="min-h-screen bg-background">
// // // // // // // //       <Navbar />

// // // // // // // //       <main className="pt-20 pb-12">
// // // // // // // //         <div className="container mx-auto px-4">
// // // // // // // //           {/* Header with Profile Actions */}
// // // // // // // //           <motion.div
// // // // // // // //             className="mb-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4"
// // // // // // // //             initial={{ opacity: 0, y: 20 }}
// // // // // // // //             animate={{ opacity: 1, y: 0 }}
// // // // // // // //             transition={{ duration: 0.6 }}
// // // // // // // //           >
// // // // // // // //             <div>
// // // // // // // //               <h1 className="text-3xl font-bold mb-2">
// // // // // // // //                 Welcome back, {user.fullName}! 👋
// // // // // // // //               </h1>
// // // // // // // //               <p className="text-muted-foreground">
// // // // // // // //                 Continue your learning journey and track your progress.
// // // // // // // //               </p>
// // // // // // // //             </div>
// // // // // // // //             <div className="flex gap-2">
// // // // // // // //               <Dialog open={isProfileDialogOpen} onOpenChange={setIsProfileDialogOpen}>
// // // // // // // //                 <DialogTrigger asChild>
// // // // // // // //                   <Button variant="outline" className="flex items-center gap-2">
// // // // // // // //                     <User className="w-4 h-4" />
// // // // // // // //                     Profile
// // // // // // // //                   </Button>
// // // // // // // //                 </DialogTrigger>
// // // // // // // //                 <DialogContent>
// // // // // // // //                   <DialogHeader>
// // // // // // // //                     <DialogTitle>Edit Profile</DialogTitle>
// // // // // // // //                     <DialogDescription>
// // // // // // // //                       Update your profile information
// // // // // // // //                     </DialogDescription>
// // // // // // // //                   </DialogHeader>
// // // // // // // //                   <div className="space-y-4">
// // // // // // // //                     <div className="space-y-2">
// // // // // // // //                       <Label htmlFor="fullName">Full Name</Label>
// // // // // // // //                       <Input
// // // // // // // //                         id="fullName"
// // // // // // // //                         value={profileData.fullName}
// // // // // // // //                         onChange={(e) => setProfileData(prev => ({ ...prev, fullName: e.target.value }))}
// // // // // // // //                         placeholder="Enter your full name"
// // // // // // // //                       />
// // // // // // // //                     </div>
// // // // // // // //                     <div className="space-y-2">
// // // // // // // //                       <Label htmlFor="email">Email (Cannot be changed)</Label>
// // // // // // // //                       <Input
// // // // // // // //                         id="email"
// // // // // // // //                         value={profileData.email}
// // // // // // // //                         disabled
// // // // // // // //                         className="bg-muted"
// // // // // // // //                       />
// // // // // // // //                     </div>
// // // // // // // //                     <div className="space-y-2">
// // // // // // // //                       <Label htmlFor="location">Location</Label>
// // // // // // // //                       <Input
// // // // // // // //                         id="location"
// // // // // // // //                         value={profileData.location}
// // // // // // // //                         onChange={(e) => setProfileData(prev => ({ ...prev, location: e.target.value }))}
// // // // // // // //                         placeholder="Enter your location"
// // // // // // // //                       />
// // // // // // // //                     </div>
// // // // // // // //                     <div className="flex gap-2">
// // // // // // // //                       <Button onClick={updateProfile} disabled={isOperationLoading} className="flex-1">
// // // // // // // //                         {isOperationLoading ? 'Updating...' : 'Update Profile'}
// // // // // // // //                       </Button>
// // // // // // // //                       <Button variant="outline" onClick={() => setIsProfileDialogOpen(false)}>
// // // // // // // //                         Cancel
// // // // // // // //                       </Button>
// // // // // // // //                     </div>
// // // // // // // //                   </div>
// // // // // // // //                 </DialogContent>
// // // // // // // //               </Dialog>

// // // // // // // //               <Dialog open={isPasswordDialogOpen} onOpenChange={setIsPasswordDialogOpen}>
// // // // // // // //                 <DialogTrigger asChild>
// // // // // // // //                   <Button variant="outline" className="flex items-center gap-2">
// // // // // // // //                     <Lock className="w-4 h-4" />
// // // // // // // //                     Change Password
// // // // // // // //                   </Button>
// // // // // // // //                 </DialogTrigger>
// // // // // // // //                 <DialogContent>
// // // // // // // //                   <DialogHeader>
// // // // // // // //                     <DialogTitle>Change Password</DialogTitle>
// // // // // // // //                     <DialogDescription>
// // // // // // // //                       Enter your current password and choose a new one
// // // // // // // //                     </DialogDescription>
// // // // // // // //                   </DialogHeader>
// // // // // // // //                   <div className="space-y-4">
// // // // // // // //                     <div className="space-y-2">
// // // // // // // //                       <Label htmlFor="currentPassword">Current Password</Label>
// // // // // // // //                       <div className="relative">
// // // // // // // //                         <Input
// // // // // // // //                           id="currentPassword"
// // // // // // // //                           type={showPasswords.current ? 'text' : 'password'}
// // // // // // // //                           value={passwordData.currentPassword}
// // // // // // // //                           onChange={(e) => setPasswordData(prev => ({ ...prev, currentPassword: e.target.value }))}
// // // // // // // //                           placeholder="Enter current password"
// // // // // // // //                           className="pr-10"
// // // // // // // //                         />
// // // // // // // //                         <button
// // // // // // // //                           type="button"
// // // // // // // //                           onClick={() => setShowPasswords(prev => ({ ...prev, current: !prev.current }))}
// // // // // // // //                           className="absolute right-3 top-3 text-muted-foreground hover:text-primary"
// // // // // // // //                         >
// // // // // // // //                           {showPasswords.current ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
// // // // // // // //                         </button>
// // // // // // // //                       </div>
// // // // // // // //                     </div>
// // // // // // // //                     <div className="space-y-2">
// // // // // // // //                       <Label htmlFor="newPassword">New Password</Label>
// // // // // // // //                       <div className="relative">
// // // // // // // //                         <Input
// // // // // // // //                           id="newPassword"
// // // // // // // //                           type={showPasswords.new ? 'text' : 'password'}
// // // // // // // //                           value={passwordData.newPassword}
// // // // // // // //                           onChange={(e) => setPasswordData(prev => ({ ...prev, newPassword: e.target.value }))}
// // // // // // // //                           placeholder="Enter new password"
// // // // // // // //                           className="pr-10"
// // // // // // // //                         />
// // // // // // // //                         <button
// // // // // // // //                           type="button"
// // // // // // // //                           onClick={() => setShowPasswords(prev => ({ ...prev, new: !prev.new }))}
// // // // // // // //                           className="absolute right-3 top-3 text-muted-foreground hover:text-primary"
// // // // // // // //                         >
// // // // // // // //                           {showPasswords.new ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
// // // // // // // //                         </button>
// // // // // // // //                       </div>
// // // // // // // //                     </div>
// // // // // // // //                     <div className="space-y-2">
// // // // // // // //                       <Label htmlFor="confirmPassword">Confirm New Password</Label>
// // // // // // // //                       <div className="relative">
// // // // // // // //                         <Input
// // // // // // // //                           id="confirmPassword"
// // // // // // // //                           type={showPasswords.confirm ? 'text' : 'password'}
// // // // // // // //                           value={passwordData.confirmPassword}
// // // // // // // //                           onChange={(e) => setPasswordData(prev => ({ ...prev, confirmPassword: e.target.value }))}
// // // // // // // //                           placeholder="Confirm new password"
// // // // // // // //                           className="pr-10"
// // // // // // // //                         />
// // // // // // // //                         <button
// // // // // // // //                           type="button"
// // // // // // // //                           onClick={() => setShowPasswords(prev => ({ ...prev, confirm: !prev.confirm }))}
// // // // // // // //                           className="absolute right-3 top-3 text-muted-foreground hover:text-primary"
// // // // // // // //                         >
// // // // // // // //                           {showPasswords.confirm ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
// // // // // // // //                         </button>
// // // // // // // //                       </div>
// // // // // // // //                     </div>
// // // // // // // //                     <div className="flex gap-2">
// // // // // // // //                       <Button onClick={changePassword} disabled={isOperationLoading} className="flex-1">
// // // // // // // //                         {isOperationLoading ? 'Changing...' : 'Change Password'}
// // // // // // // //                       </Button>
// // // // // // // //                       <Button variant="outline" onClick={() => setIsPasswordDialogOpen(false)}>
// // // // // // // //                         Cancel
// // // // // // // //                       </Button>
// // // // // // // //                     </div>
// // // // // // // //                   </div>
// // // // // // // //                 </DialogContent>
// // // // // // // //               </Dialog>
// // // // // // // //             </div>
// // // // // // // //           </motion.div>

// // // // // // // //           {/* Stats Cards */}
// // // // // // // //           <motion.div
// // // // // // // //             className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
// // // // // // // //             initial={{ opacity: 0, y: 20 }}
// // // // // // // //             animate={{ opacity: 1, y: 0 }}
// // // // // // // //             transition={{ duration: 0.6, delay: 0.1 }}
// // // // // // // //           >
// // // // // // // //             {stats.map((stat, index) => (
// // // // // // // //               <Card key={stat.title} className="hover:shadow-lg transition-shadow">
// // // // // // // //                 <CardContent className="p-6">
// // // // // // // //                   <div className="flex items-center justify-between">
// // // // // // // //                     <div>
// // // // // // // //                       <p className="text-sm text-muted-foreground mb-1">{stat.title}</p>
// // // // // // // //                       <p className="text-2xl font-bold">{stat.value}</p>
// // // // // // // //                     </div>
// // // // // // // //                     <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${stat.bgColor}`}>
// // // // // // // //                       <stat.icon className={`w-6 h-6 ${stat.color}`} />
// // // // // // // //                     </div>
// // // // // // // //                   </div>
// // // // // // // //                 </CardContent>
// // // // // // // //               </Card>
// // // // // // // //             ))}
// // // // // // // //           </motion.div>

// // // // // // // //           <div className="grid lg:grid-cols-3 gap-8">
// // // // // // // //             {/* Main Content */}
// // // // // // // //             <div className="lg:col-span-2 space-y-8">
// // // // // // // //               {/* Course Tabs */}
// // // // // // // //               <motion.div
// // // // // // // //                 initial={{ opacity: 0, y: 20 }}
// // // // // // // //                 animate={{ opacity: 1, y: 0 }}
// // // // // // // //                 transition={{ duration: 0.6, delay: 0.2 }}
// // // // // // // //               >
// // // // // // // //                 <Tabs defaultValue="enrolled" className="w-full">
// // // // // // // //                   <TabsList className="grid w-full grid-cols-3">
// // // // // // // //                     <TabsTrigger value="enrolled">Enrolled</TabsTrigger>
// // // // // // // //                     <TabsTrigger value="completed">Completed</TabsTrigger>
// // // // // // // //                     <TabsTrigger value="certificates">Certificates</TabsTrigger>
// // // // // // // //                   </TabsList>

// // // // // // // //                   <TabsContent value="enrolled" className="mt-6">
// // // // // // // //                     <div className="space-y-4">
// // // // // // // //                       {enrolledCourses.filter(course => !course.completed).map((course) => (
// // // // // // // //                         <Card key={course.id} className="hover:shadow-lg transition-shadow">
// // // // // // // //                           <CardContent className="p-6">
// // // // // // // //                             <div className="flex items-start gap-4">
// // // // // // // //                               <img
// // // // // // // //                                 src={course.thumbnail || 'https://images.pexels.com/photos/5212345/pexels-photo-5212345.jpeg'}
// // // // // // // //                                 alt={course.title}
// // // // // // // //                                 className="w-20 h-20 rounded-lg object-cover"
// // // // // // // //                               />
// // // // // // // //                               <div className="flex-1">
// // // // // // // //                                 <h3 className="font-semibold text-lg mb-2">{course.title}</h3>
// // // // // // // //                                 <p className="text-muted-foreground text-sm mb-3">{course.description}</p>
// // // // // // // //                                 <div className="flex items-center gap-4 mb-3">
// // // // // // // //                                   <Badge variant="secondary">{course.category}</Badge>
// // // // // // // //                                   <div className="flex items-center gap-1 text-sm text-muted-foreground">
// // // // // // // //                                     <Clock className="w-4 h-4" />
// // // // // // // //                                     {course.duration}
// // // // // // // //                                   </div>
// // // // // // // //                                 </div>
// // // // // // // //                                 <div className="space-y-2">
// // // // // // // //                                   <div className="flex justify-between items-center text-sm">
// // // // // // // //                                     <span>Progress</span>
// // // // // // // //                                     <span>{course.progress}%</span>
// // // // // // // //                                   </div>
// // // // // // // //                                   <Progress value={course.progress} className="w-full" />
// // // // // // // //                                 </div>
// // // // // // // //                               </div>
// // // // // // // //                               <div className="flex flex-col gap-2">
// // // // // // // //                                 <Button className="flex items-center gap-2">
// // // // // // // //                                   <Play className="w-4 h-4" />
// // // // // // // //                                   Continue
// // // // // // // //                                 </Button>
// // // // // // // //                                 <Button variant="outline" size="sm" className="text-xs">
// // // // // // // //                                   View Content
// // // // // // // //                                 </Button>
// // // // // // // //                               </div>
// // // // // // // //                             </div>
// // // // // // // //                           </CardContent>
// // // // // // // //                         </Card>
// // // // // // // //                       ))}

// // // // // // // //                       {enrolledCourses.filter(course => !course.completed).length === 0 && (
// // // // // // // //                         <Card>
// // // // // // // //                           <CardContent className="p-12 text-center">
// // // // // // // //                             <BookOpen className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
// // // // // // // //                             <p className="text-muted-foreground">No enrolled courses yet.</p>
// // // // // // // //                             <Button className="mt-4">Browse Courses</Button>
// // // // // // // //                           </CardContent>
// // // // // // // //                         </Card>
// // // // // // // //                       )}
// // // // // // // //                     </div>
// // // // // // // //                   </TabsContent>

// // // // // // // //                   <TabsContent value="completed" className="mt-6">
// // // // // // // //                     <div className="space-y-4">
// // // // // // // //                       {enrolledCourses.filter(course => course.completed).map((course) => (
// // // // // // // //                         <Card key={course.id} className="hover:shadow-lg transition-shadow">
// // // // // // // //                           <CardContent className="p-6">
// // // // // // // //                             <div className="flex items-start gap-4">
// // // // // // // //                               <img
// // // // // // // //                                 src={course.thumbnail || 'https://images.pexels.com/photos/5212345/pexels-photo-5212345.jpeg'}
// // // // // // // //                                 alt={course.title}
// // // // // // // //                                 className="w-20 h-20 rounded-lg object-cover"
// // // // // // // //                               />
// // // // // // // //                               <div className="flex-1">
// // // // // // // //                                 <h3 className="font-semibold text-lg mb-2">{course.title}</h3>
// // // // // // // //                                 <p className="text-muted-foreground text-sm mb-3">{course.description}</p>
// // // // // // // //                                 <div className="flex items-center gap-4">
// // // // // // // //                                   <Badge variant="secondary" className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100">
// // // // // // // //                                     Completed
// // // // // // // //                                   </Badge>
// // // // // // // //                                   <div className="flex items-center gap-1 text-sm text-muted-foreground">
// // // // // // // //                                     <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
// // // // // // // //                                     Rate Course
// // // // // // // //                                   </div>
// // // // // // // //                                 </div>
// // // // // // // //                               </div>
// // // // // // // //                               <Button
// // // // // // // //                                 variant="outline"
// // // // // // // //                                 className="flex items-center gap-2"
// // // // // // // //                                 onClick={() => downloadCertificate(course.id)}
// // // // // // // //                                 disabled={!course.canDownloadCertificate}
// // // // // // // //                               >
// // // // // // // //                                 <Download className="w-4 h-4" />
// // // // // // // //                                 Certificate
// // // // // // // //                               </Button>
// // // // // // // //                             </div>
// // // // // // // //                           </CardContent>
// // // // // // // //                         </Card>
// // // // // // // //                       ))}

// // // // // // // //                       {enrolledCourses.filter(course => course.completed).length === 0 && (
// // // // // // // //                         <Card>
// // // // // // // //                           <CardContent className="p-12 text-center">
// // // // // // // //                             <Award className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
// // // // // // // //                             <p className="text-muted-foreground">No completed courses yet.</p>
// // // // // // // //                           </CardContent>
// // // // // // // //                         </Card>
// // // // // // // //                       )}
// // // // // // // //                     </div>
// // // // // // // //                   </TabsContent>

// // // // // // // //                   <TabsContent value="certificates" className="mt-6">
// // // // // // // //                     <div className="space-y-4">
// // // // // // // //                       {enrolledCourses.filter(course => course.completed && course.canDownloadCertificate).map((course) => (
// // // // // // // //                         <Card key={course.id} className="hover:shadow-lg transition-shadow">
// // // // // // // //                           <CardContent className="p-6">
// // // // // // // //                             <div className="flex items-center justify-between">
// // // // // // // //                               <div className="flex items-center gap-4">
// // // // // // // //                                 <div className="w-16 h-16 bg-gradient-to-br from-primary to-blue-600 rounded-lg flex items-center justify-center">
// // // // // // // //                                   <Award className="w-8 h-8 text-white" />
// // // // // // // //                                 </div>
// // // // // // // //                                 <div>
// // // // // // // //                                   <h3 className="font-semibold text-lg">{course.title}</h3>
// // // // // // // //                                   <p className="text-muted-foreground">
// // // // // // // //                                     Completed on {new Date(course.completedAt).toLocaleDateString()}
// // // // // // // //                                   </p>
// // // // // // // //                                   <p className="text-sm text-muted-foreground">
// // // // // // // //                                     Credential ID: {course.credentialId}
// // // // // // // //                                   </p>
// // // // // // // //                                 </div>
// // // // // // // //                               </div>
// // // // // // // //                               <Button
// // // // // // // //                                 className="flex items-center gap-2"
// // // // // // // //                                 onClick={() => downloadCertificate(course.id)}
// // // // // // // //                               >
// // // // // // // //                                 <Download className="w-4 h-4" />
// // // // // // // //                                 Download
// // // // // // // //                               </Button>
// // // // // // // //                             </div>
// // // // // // // //                           </CardContent>
// // // // // // // //                         </Card>
// // // // // // // //                       ))}

// // // // // // // //                       {enrolledCourses.filter(course => course.completed && course.canDownloadCertificate).length === 0 && (
// // // // // // // //                         <Card>
// // // // // // // //                           <CardContent className="p-12 text-center">
// // // // // // // //                             <Award className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
// // // // // // // //                             <p className="text-muted-foreground">No certificates available yet.</p>
// // // // // // // //                             <p className="text-sm text-muted-foreground mt-2">
// // // // // // // //                               Certificates become available 30 days after course completion.
// // // // // // // //                             </p>
// // // // // // // //                           </CardContent>
// // // // // // // //                         </Card>
// // // // // // // //                       )}
// // // // // // // //                     </div>
// // // // // // // //                   </TabsContent>
// // // // // // // //                 </Tabs>
// // // // // // // //               </motion.div>
// // // // // // // //             </div>

// // // // // // // //             {/* Sidebar */}
// // // // // // // //             <div className="space-y-6">
// // // // // // // //               {/* Referral Card */}
// // // // // // // //               <motion.div
// // // // // // // //                 initial={{ opacity: 0, x: 20 }}
// // // // // // // //                 animate={{ opacity: 1, x: 0 }}
// // // // // // // //                 transition={{ duration: 0.6, delay: 0.3 }}
// // // // // // // //               >
// // // // // // // //                 <Card>
// // // // // // // //                   <CardHeader>
// // // // // // // //                     <CardTitle className="flex items-center gap-2">
// // // // // // // //                       <Gift className="w-5 h-5" />
// // // // // // // //                       Refer & Earn
// // // // // // // //                     </CardTitle>
// // // // // // // //                     <CardDescription>
// // // // // // // //                       Earn credits when your friends join and purchase courses
// // // // // // // //                     </CardDescription>
// // // // // // // //                   </CardHeader>
// // // // // // // //                   <CardContent className="space-y-4">
// // // // // // // //                     <div className="p-3 bg-primary/10 rounded-lg text-center">
// // // // // // // //                       <p className="text-2xl font-bold text-primary">{userStats.credits}</p>
// // // // // // // //                       <p className="text-sm text-muted-foreground">Available Credits</p>
// // // // // // // //                     </div>

// // // // // // // //                     <div className="space-y-2">
// // // // // // // //                       <Label htmlFor="referral-code">Your Referral Code</Label>
// // // // // // // //                       <div className="flex gap-2">
// // // // // // // //                         <Input
// // // // // // // //                           id="referral-code"
// // // // // // // //                           value={referralCode}
// // // // // // // //                           readOnly
// // // // // // // //                           className="font-mono"
// // // // // // // //                         />
// // // // // // // //                         <Button
// // // // // // // //                           size="sm"
// // // // // // // //                           variant="outline"
// // // // // // // //                           onClick={copyReferralLink}
// // // // // // // //                         >
// // // // // // // //                           <Copy className="w-4 h-4" />
// // // // // // // //                         </Button>
// // // // // // // //                       </div>
// // // // // // // //                     </div>

// // // // // // // //                     <div className="text-sm text-muted-foreground">
// // // // // // // //                       <p>• Earn 100 credits per successful referral</p>
// // // // // // // //                       <p>• Use credits for discounts on courses</p>
// // // // // // // //                     </div>
// // // // // // // //                   </CardContent>
// // // // // // // //                 </Card>
// // // // // // // //               </motion.div>

// // // // // // // //               {/* Recent Activity */}
// // // // // // // //               <motion.div
// // // // // // // //                 initial={{ opacity: 0, x: 20 }}
// // // // // // // //                 animate={{ opacity: 1, x: 0 }}
// // // // // // // //                 transition={{ duration: 0.6, delay: 0.4 }}
// // // // // // // //               >
// // // // // // // //                 <Card>
// // // // // // // //                   <CardHeader>
// // // // // // // //                     <CardTitle className="flex items-center gap-2">
// // // // // // // //                       <TrendingUp className="w-5 h-5" />
// // // // // // // //                       Recent Activity
// // // // // // // //                     </CardTitle>
// // // // // // // //                   </CardHeader>
// // // // // // // //                   <CardContent className="space-y-4">
// // // // // // // //                     {recentActivity.length > 0 ? (
// // // // // // // //                       recentActivity.map((activity, index) => (
// // // // // // // //                         <div key={index} className="flex items-start gap-3 p-3 rounded-lg bg-muted/50">
// // // // // // // //                           <div className="w-2 h-2 bg-primary rounded-full mt-2" />
// // // // // // // //                           <div className="flex-1">
// // // // // // // //                             <p className="text-sm font-medium">{activity.title}</p>
// // // // // // // //                             <p className="text-xs text-muted-foreground">{activity.description}</p>
// // // // // // // //                             <p className="text-xs text-muted-foreground mt-1">{activity.timestamp}</p>
// // // // // // // //                           </div>
// // // // // // // //                         </div>
// // // // // // // //                       ))
// // // // // // // //                     ) : (
// // // // // // // //                       <p className="text-sm text-muted-foreground text-center py-4">
// // // // // // // //                         No recent activity
// // // // // // // //                       </p>
// // // // // // // //                     )}
// // // // // // // //                   </CardContent>
// // // // // // // //                 </Card>
// // // // // // // //               </motion.div>
// // // // // // // //             </div>
// // // // // // // //           </div>
// // // // // // // //         </div>
// // // // // // // //       </main>
// // // // // // // //     </div>
// // // // // // // //   );
// // // // // // // // }
// // // // // // // 'use client';

// // // // // // // import { useState, useEffect } from 'react';
// // // // // // // import { motion } from 'framer-motion';
// // // // // // // import {
// // // // // // //   BookOpen,
// // // // // // //   Award,
// // // // // // //   Clock,
// // // // // // //   TrendingUp,
// // // // // // //   Play,
// // // // // // //   Download,
// // // // // // //   Users,
// // // // // // //   Star,
// // // // // // //   Gift,
// // // // // // //   Copy,
// // // // // // //   CheckCircle,
// // // // // // //   Settings,
// // // // // // //   User,
// // // // // // //   CreditCard,
// // // // // // //   Bell,
// // // // // // //   Lock,
// // // // // // //   Eye,
// // // // // // //   EyeOff,
// // // // // // //   LogOut
// // // // // // // } from 'lucide-react';
// // // // // // // import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
// // // // // // // import { Button } from '@/components/ui/button';
// // // // // // // import { Badge } from '@/components/ui/badge';
// // // // // // // import { Progress } from '@/components/ui/progress';
// // // // // // // import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
// // // // // // // import { Input } from '@/components/ui/input';
// // // // // // // import { Label } from '@/components/ui/label';
// // // // // // // import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
// // // // // // // import { toast } from 'sonner';
// // // // // // // import { useAuth } from '@/components/auth-provider';
// // // // // // // import Navbar from '@/components/navbar';
// // // // // // // import { useRouter } from 'next/navigation';

// // // // // // // export default function Dashboard() {
// // // // // // //   const { user, getAuthToken, logout, loading } = useAuth();
// // // // // // //   const router = useRouter();
// // // // // // //   const [userStats, setUserStats] = useState({
// // // // // // //     enrolledCourses: 0,
// // // // // // //     completedCourses: 0,
// // // // // // //     certificatesEarned: 0,
// // // // // // //     totalWatchTime: 0,
// // // // // // //     credits: 0
// // // // // // //   });
// // // // // // //   const [enrolledCourses, setEnrolledCourses] = useState([]);
// // // // // // //   const [recentActivity, setRecentActivity] = useState([]);
// // // // // // //   const [referralCode, setReferralCode] = useState('');
// // // // // // //   const [profileData, setProfileData] = useState({
// // // // // // //     fullName: '',
// // // // // // //     email: '',
// // // // // // //     location: '',
// // // // // // //   });
// // // // // // //   const [passwordData, setPasswordData] = useState({
// // // // // // //     currentPassword: '',
// // // // // // //     newPassword: '',
// // // // // // //     confirmPassword: '',
// // // // // // //   });
// // // // // // //   const [showPasswords, setShowPasswords] = useState({
// // // // // // //     current: false,
// // // // // // //     new: false,
// // // // // // //     confirm: false,
// // // // // // //   });
// // // // // // //   const [isProfileDialogOpen, setIsProfileDialogOpen] = useState(false);
// // // // // // //   const [isPasswordDialogOpen, setIsPasswordDialogOpen] = useState(false);
// // // // // // //   const [isLoading, setIsLoading] = useState(false);

// // // // // // //   // Redirect to login if not authenticated
// // // // // // //   useEffect(() => {
// // // // // // //     if (!loading && !user) {
// // // // // // //       console.log('User not authenticated, redirecting to login');
// // // // // // //       router.replace('/auth/login');
// // // // // // //       return;
// // // // // // //     }

// // // // // // //     if (user) {
// // // // // // //       console.log('Dashboard loaded for user:', user.id);
// // // // // // //       fetchUserData();
// // // // // // //       setReferralCode(user.referralCode || '');
// // // // // // //       setProfileData({
// // // // // // //         fullName: user.fullName || '',
// // // // // // //         email: user.email || '',
// // // // // // //         location: user.location || '',
// // // // // // //       });
// // // // // // //     }
// // // // // // //   }, [user, loading, router]);

// // // // // // //   const fetchUserData = async () => {
// // // // // // //     try {
// // // // // // //       const token = getAuthToken();
// // // // // // //       if (!token) {
// // // // // // //         console.log('No auth token available');
// // // // // // //         return;
// // // // // // //       }

// // // // // // //       const response = await fetch('/api/user/dashboard', {
// // // // // // //         headers: {
// // // // // // //           'Authorization': `Bearer ${token}`,
// // // // // // //         },
// // // // // // //       });

// // // // // // //       if (response.ok) {
// // // // // // //         const data = await response.json();
// // // // // // //         setUserStats(data.stats);
// // // // // // //         setEnrolledCourses(data.enrolledCourses);
// // // // // // //         setRecentActivity(data.recentActivity);
// // // // // // //       } else if (response.status === 401) {
// // // // // // //         // Token expired, logout user
// // // // // // //         console.log('Token expired, logging out');
// // // // // // //         logout();
// // // // // // //       }
// // // // // // //     } catch (error) {
// // // // // // //       console.error('Error fetching user data:', error);
// // // // // // //     }
// // // // // // //   };

// // // // // // //   const updateProfile = async () => {
// // // // // // //     if (!profileData.fullName || !profileData.location) {
// // // // // // //       toast.error('Please fill in all required fields');
// // // // // // //       return;
// // // // // // //     }

// // // // // // //     setIsLoading(true);
// // // // // // //     try {
// // // // // // //       const token = getAuthToken();
// // // // // // //       const response = await fetch('/api/user/profile', {
// // // // // // //         method: 'PUT',
// // // // // // //         headers: {
// // // // // // //           'Content-Type': 'application/json',
// // // // // // //           'Authorization': `Bearer ${token}`,
// // // // // // //         },
// // // // // // //         body: JSON.stringify(profileData),
// // // // // // //       });

// // // // // // //       if (response.ok) {
// // // // // // //         toast.success('Profile updated successfully!');
// // // // // // //         setIsProfileDialogOpen(false);
// // // // // // //         // Refresh user data
// // // // // // //         fetchUserData();
// // // // // // //       } else {
// // // // // // //         const data = await response.json();
// // // // // // //         toast.error(data.message || 'Failed to update profile');
// // // // // // //       }
// // // // // // //     } catch (error) {
// // // // // // //       console.error('Error updating profile:', error);
// // // // // // //       toast.error('Something went wrong. Please try again.');
// // // // // // //     } finally {
// // // // // // //       setIsLoading(false);
// // // // // // //     }
// // // // // // //   };

// // // // // // //   const changePassword = async () => {
// // // // // // //     if (!passwordData.currentPassword || !passwordData.newPassword || !passwordData.confirmPassword) {
// // // // // // //       toast.error('Please fill in all fields');
// // // // // // //       return;
// // // // // // //     }

// // // // // // //     if (passwordData.newPassword !== passwordData.confirmPassword) {
// // // // // // //       toast.error('New passwords do not match');
// // // // // // //       return;
// // // // // // //     }

// // // // // // //     if (passwordData.newPassword.length < 6) {
// // // // // // //       toast.error('Password must be at least 6 characters long');
// // // // // // //       return;
// // // // // // //     }

// // // // // // //     setIsLoading(true);
// // // // // // //     try {
// // // // // // //       const token = getAuthToken();
// // // // // // //       const response = await fetch('/api/user/change-password', {
// // // // // // //         method: 'POST',
// // // // // // //         headers: {
// // // // // // //           'Content-Type': 'application/json',
// // // // // // //           'Authorization': `Bearer ${token}`,
// // // // // // //         },
// // // // // // //         body: JSON.stringify(passwordData),
// // // // // // //       });

// // // // // // //       if (response.ok) {
// // // // // // //         toast.success('Password changed successfully!');
// // // // // // //         setIsPasswordDialogOpen(false);
// // // // // // //         setPasswordData({
// // // // // // //           currentPassword: '',
// // // // // // //           newPassword: '',
// // // // // // //           confirmPassword: '',
// // // // // // //         });
// // // // // // //       } else {
// // // // // // //         const data = await response.json();
// // // // // // //         toast.error(data.message || 'Failed to change password');
// // // // // // //       }
// // // // // // //     } catch (error) {
// // // // // // //       console.error('Error changing password:', error);
// // // // // // //       toast.error('Something went wrong. Please try again.');
// // // // // // //     } finally {
// // // // // // //       setIsLoading(false);
// // // // // // //     }
// // // // // // //   };

// // // // // // //   const copyReferralLink = () => {
// // // // // // //     const referralLink = `${window.location.origin}/auth/register?ref=${referralCode}`;
// // // // // // //     navigator.clipboard.writeText(referralLink);
// // // // // // //     toast.success('Referral link copied to clipboard!');
// // // // // // //   };

// // // // // // //   const downloadCertificate = async (courseId) => {
// // // // // // //     try {
// // // // // // //       const token = getAuthToken();
// // // // // // //       const response = await fetch(`/api/certificates/download/${courseId}`, {
// // // // // // //         headers: {
// // // // // // //           'Authorization': `Bearer ${token}`,
// // // // // // //         },
// // // // // // //       });

// // // // // // //       if (response.ok) {
// // // // // // //         const blob = await response.blob();
// // // // // // //         const url = window.URL.createObjectURL(blob);
// // // // // // //         const a = document.createElement('a');
// // // // // // //         a.style.display = 'none';
// // // // // // //         a.href = url;
// // // // // // //         a.download = `certificate-${courseId}.pdf`;
// // // // // // //         document.body.appendChild(a);
// // // // // // //         a.click();
// // // // // // //         window.URL.revokeObjectURL(url);
// // // // // // //         toast.success('Certificate downloaded successfully!');
// // // // // // //       } else {
// // // // // // //         toast.error('Error downloading certificate');
// // // // // // //       }
// // // // // // //     } catch (error) {
// // // // // // //       console.error('Error downloading certificate:', error);
// // // // // // //       toast.error('Error downloading certificate');
// // // // // // //     }
// // // // // // //   };

// // // // // // //   const handleLogout = async () => {
// // // // // // //     try {
// // // // // // //       console.log('Logging out from dashboard...');
// // // // // // //       await logout();
// // // // // // //       toast.success('Logged out successfully');
// // // // // // //     } catch (error) {
// // // // // // //       console.error('Logout error:', error);
// // // // // // //       toast.error('Error logging out');
// // // // // // //     }
// // // // // // //   };

// // // // // // //   const stats = [
// // // // // // //     {
// // // // // // //       title: 'Enrolled Courses',
// // // // // // //       value: userStats.enrolledCourses,
// // // // // // //       icon: BookOpen,
// // // // // // //       color: 'text-blue-600',
// // // // // // //       bgColor: 'bg-blue-50 dark:bg-blue-950'
// // // // // // //     },
// // // // // // //     {
// // // // // // //       title: 'Completed',
// // // // // // //       value: userStats.completedCourses,
// // // // // // //       icon: CheckCircle,
// // // // // // //       color: 'text-green-600',
// // // // // // //       bgColor: 'bg-green-50 dark:bg-green-950'
// // // // // // //     },
// // // // // // //     {
// // // // // // //       title: 'Certificates',
// // // // // // //       value: userStats.certificatesEarned,
// // // // // // //       icon: Award,
// // // // // // //       color: 'text-purple-600',
// // // // // // //       bgColor: 'bg-purple-50 dark:bg-purple-950'
// // // // // // //     },
// // // // // // //     {
// // // // // // //       title: 'Credits',
// // // // // // //       value: userStats.credits,
// // // // // // //       icon: Gift,
// // // // // // //       color: 'text-orange-600',
// // // // // // //       bgColor: 'bg-orange-50 dark:bg-orange-950'
// // // // // // //     }
// // // // // // //   ];

// // // // // // //   if (loading) {
// // // // // // //     return (
// // // // // // //       <div className="min-h-screen flex items-center justify-center">
// // // // // // //         <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
// // // // // // //       </div>
// // // // // // //     );
// // // // // // //   }

// // // // // // //   if (!user) {
// // // // // // //     return null; // Will redirect in useEffect
// // // // // // //   }

// // // // // // //   return (
// // // // // // //     <div className="min-h-screen bg-background">
// // // // // // //       <Navbar />

// // // // // // //       <main className="pt-20 pb-12">
// // // // // // //         <div className="container mx-auto px-4">
// // // // // // //           {/* Header with Profile Actions */}
// // // // // // //           <motion.div
// // // // // // //             className="mb-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4"
// // // // // // //             initial={{ opacity: 0, y: 20 }}
// // // // // // //             animate={{ opacity: 1, y: 0 }}
// // // // // // //             transition={{ duration: 0.6 }}
// // // // // // //           >
// // // // // // //             <div>
// // // // // // //               <h1 className="text-3xl font-bold mb-2">
// // // // // // //                 Welcome back, {user.fullName}! 👋
// // // // // // //               </h1>
// // // // // // //               <p className="text-muted-foreground">
// // // // // // //                 Continue your learning journey and track your progress.
// // // // // // //               </p>
// // // // // // //             </div>
// // // // // // //             <div className="flex gap-2 flex-wrap">
// // // // // // //               <Dialog open={isProfileDialogOpen} onOpenChange={setIsProfileDialogOpen}>
// // // // // // //                 <DialogTrigger asChild>
// // // // // // //                   <Button variant="outline" className="flex items-center gap-2">
// // // // // // //                     <User className="w-4 h-4" />
// // // // // // //                     Profile
// // // // // // //                   </Button>
// // // // // // //                 </DialogTrigger>
// // // // // // //                 <DialogContent>
// // // // // // //                   <DialogHeader>
// // // // // // //                     <DialogTitle>Edit Profile</DialogTitle>
// // // // // // //                     <DialogDescription>
// // // // // // //                       Update your profile information
// // // // // // //                     </DialogDescription>
// // // // // // //                   </DialogHeader>
// // // // // // //                   <div className="space-y-4">
// // // // // // //                     <div className="space-y-2">
// // // // // // //                       <Label htmlFor="fullName">Full Name</Label>
// // // // // // //                       <Input
// // // // // // //                         id="fullName"
// // // // // // //                         value={profileData.fullName}
// // // // // // //                         onChange={(e) => setProfileData(prev => ({ ...prev, fullName: e.target.value }))}
// // // // // // //                         placeholder="Enter your full name"
// // // // // // //                       />
// // // // // // //                     </div>
// // // // // // //                     <div className="space-y-2">
// // // // // // //                       <Label htmlFor="email">Email (Cannot be changed)</Label>
// // // // // // //                       <Input
// // // // // // //                         id="email"
// // // // // // //                         value={profileData.email}
// // // // // // //                         disabled
// // // // // // //                         className="bg-muted"
// // // // // // //                       />
// // // // // // //                     </div>
// // // // // // //                     <div className="space-y-2">
// // // // // // //                       <Label htmlFor="location">Location</Label>
// // // // // // //                       <Input
// // // // // // //                         id="location"
// // // // // // //                         value={profileData.location}
// // // // // // //                         onChange={(e) => setProfileData(prev => ({ ...prev, location: e.target.value }))}
// // // // // // //                         placeholder="Enter your location"
// // // // // // //                       />
// // // // // // //                     </div>
// // // // // // //                     <div className="flex gap-2">
// // // // // // //                       <Button onClick={updateProfile} disabled={isLoading} className="flex-1">
// // // // // // //                         {isLoading ? 'Updating...' : 'Update Profile'}
// // // // // // //                       </Button>
// // // // // // //                       <Button variant="outline" onClick={() => setIsProfileDialogOpen(false)}>
// // // // // // //                         Cancel
// // // // // // //                       </Button>
// // // // // // //                     </div>
// // // // // // //                   </div>
// // // // // // //                 </DialogContent>
// // // // // // //               </Dialog>

// // // // // // //               <Dialog open={isPasswordDialogOpen} onOpenChange={setIsPasswordDialogOpen}>
// // // // // // //                 <DialogTrigger asChild>
// // // // // // //                   <Button variant="outline" className="flex items-center gap-2">
// // // // // // //                     <Lock className="w-4 h-4" />
// // // // // // //                     Change Password
// // // // // // //                   </Button>
// // // // // // //                 </DialogTrigger>
// // // // // // //                 <DialogContent>
// // // // // // //                   <DialogHeader>
// // // // // // //                     <DialogTitle>Change Password</DialogTitle>
// // // // // // //                     <DialogDescription>
// // // // // // //                       Enter your current password and choose a new one
// // // // // // //                     </DialogDescription>
// // // // // // //                   </DialogHeader>
// // // // // // //                   <div className="space-y-4">
// // // // // // //                     <div className="space-y-2">
// // // // // // //                       <Label htmlFor="currentPassword">Current Password</Label>
// // // // // // //                       <div className="relative">
// // // // // // //                         <Input
// // // // // // //                           id="currentPassword"
// // // // // // //                           type={showPasswords.current ? 'text' : 'password'}
// // // // // // //                           value={passwordData.currentPassword}
// // // // // // //                           onChange={(e) => setPasswordData(prev => ({ ...prev, currentPassword: e.target.value }))}
// // // // // // //                           placeholder="Enter current password"
// // // // // // //                           className="pr-10"
// // // // // // //                         />
// // // // // // //                         <button
// // // // // // //                           type="button"
// // // // // // //                           onClick={() => setShowPasswords(prev => ({ ...prev, current: !prev.current }))}
// // // // // // //                           className="absolute right-3 top-3 text-muted-foreground hover:text-primary"
// // // // // // //                         >
// // // // // // //                           {showPasswords.current ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
// // // // // // //                         </button>
// // // // // // //                       </div>
// // // // // // //                     </div>
// // // // // // //                     <div className="space-y-2">
// // // // // // //                       <Label htmlFor="newPassword">New Password</Label>
// // // // // // //                       <div className="relative">
// // // // // // //                         <Input
// // // // // // //                           id="newPassword"
// // // // // // //                           type={showPasswords.new ? 'text' : 'password'}
// // // // // // //                           value={passwordData.newPassword}
// // // // // // //                           onChange={(e) => setPasswordData(prev => ({ ...prev, newPassword: e.target.value }))}
// // // // // // //                           placeholder="Enter new password"
// // // // // // //                           className="pr-10"
// // // // // // //                         />
// // // // // // //                         <button
// // // // // // //                           type="button"
// // // // // // //                           onClick={() => setShowPasswords(prev => ({ ...prev, new: !prev.new }))}
// // // // // // //                           className="absolute right-3 top-3 text-muted-foreground hover:text-primary"
// // // // // // //                         >
// // // // // // //                           {showPasswords.new ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
// // // // // // //                         </button>
// // // // // // //                       </div>
// // // // // // //                     </div>
// // // // // // //                     <div className="space-y-2">
// // // // // // //                       <Label htmlFor="confirmPassword">Confirm New Password</Label>
// // // // // // //                       <div className="relative">
// // // // // // //                         <Input
// // // // // // //                           id="confirmPassword"
// // // // // // //                           type={showPasswords.confirm ? 'text' : 'password'}
// // // // // // //                           value={passwordData.confirmPassword}
// // // // // // //                           onChange={(e) => setPasswordData(prev => ({ ...prev, confirmPassword: e.target.value }))}
// // // // // // //                           placeholder="Confirm new password"
// // // // // // //                           className="pr-10"
// // // // // // //                         />
// // // // // // //                         <button
// // // // // // //                           type="button"
// // // // // // //                           onClick={() => setShowPasswords(prev => ({ ...prev, confirm: !prev.confirm }))}
// // // // // // //                           className="absolute right-3 top-3 text-muted-foreground hover:text-primary"
// // // // // // //                         >
// // // // // // //                           {showPasswords.confirm ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
// // // // // // //                         </button>
// // // // // // //                       </div>
// // // // // // //                     </div>
// // // // // // //                     <div className="flex gap-2">
// // // // // // //                       <Button onClick={changePassword} disabled={isLoading} className="flex-1">
// // // // // // //                         {isLoading ? 'Changing...' : 'Change Password'}
// // // // // // //                       </Button>
// // // // // // //                       <Button variant="outline" onClick={() => setIsPasswordDialogOpen(false)}>
// // // // // // //                         Cancel
// // // // // // //                       </Button>
// // // // // // //                     </div>
// // // // // // //                   </div>
// // // // // // //                 </DialogContent>
// // // // // // //               </Dialog>

// // // // // // //               <Button variant="outline" onClick={handleLogout} className="flex items-center gap-2 text-red-600 hover:text-red-700">
// // // // // // //                 <LogOut className="w-4 h-4" />
// // // // // // //                 Logout
// // // // // // //               </Button>
// // // // // // //             </div>
// // // // // // //           </motion.div>

// // // // // // //           {/* Stats Cards */}
// // // // // // //           <motion.div
// // // // // // //             className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
// // // // // // //             initial={{ opacity: 0, y: 20 }}
// // // // // // //             animate={{ opacity: 1, y: 0 }}
// // // // // // //             transition={{ duration: 0.6, delay: 0.1 }}
// // // // // // //           >
// // // // // // //             {stats.map((stat, index) => (
// // // // // // //               <Card key={stat.title} className="hover:shadow-lg transition-shadow">
// // // // // // //                 <CardContent className="p-6">
// // // // // // //                   <div className="flex items-center justify-between">
// // // // // // //                     <div>
// // // // // // //                       <p className="text-sm text-muted-foreground mb-1">{stat.title}</p>
// // // // // // //                       <p className="text-2xl font-bold">{stat.value}</p>
// // // // // // //                     </div>
// // // // // // //                     <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${stat.bgColor}`}>
// // // // // // //                       <stat.icon className={`w-6 h-6 ${stat.color}`} />
// // // // // // //                     </div>
// // // // // // //                   </div>
// // // // // // //                 </CardContent>
// // // // // // //               </Card>
// // // // // // //             ))}
// // // // // // //           </motion.div>

// // // // // // //           <div className="grid lg:grid-cols-3 gap-8">
// // // // // // //             {/* Main Content */}
// // // // // // //             <div className="lg:col-span-2 space-y-8">
// // // // // // //               {/* Course Tabs */}
// // // // // // //               <motion.div
// // // // // // //                 initial={{ opacity: 0, y: 20 }}
// // // // // // //                 animate={{ opacity: 1, y: 0 }}
// // // // // // //                 transition={{ duration: 0.6, delay: 0.2 }}
// // // // // // //               >
// // // // // // //                 <Tabs defaultValue="enrolled" className="w-full">
// // // // // // //                   <TabsList className="grid w-full grid-cols-3">
// // // // // // //                     <TabsTrigger value="enrolled">Enrolled</TabsTrigger>
// // // // // // //                     <TabsTrigger value="completed">Completed</TabsTrigger>
// // // // // // //                     <TabsTrigger value="certificates">Certificates</TabsTrigger>
// // // // // // //                   </TabsList>

// // // // // // //                   <TabsContent value="enrolled" className="mt-6">
// // // // // // //                     <div className="space-y-4">
// // // // // // //                       {enrolledCourses.filter(course => !course.completed).map((course) => (
// // // // // // //                         <Card key={course.id} className="hover:shadow-lg transition-shadow">
// // // // // // //                           <CardContent className="p-6">
// // // // // // //                             <div className="flex items-start gap-4">
// // // // // // //                               <img
// // // // // // //                                 src={course.thumbnail || 'https://images.pexels.com/photos/5212345/pexels-photo-5212345.jpeg'}
// // // // // // //                                 alt={course.title}
// // // // // // //                                 className="w-20 h-20 rounded-lg object-cover"
// // // // // // //                               />
// // // // // // //                               <div className="flex-1">
// // // // // // //                                 <h3 className="font-semibold text-lg mb-2">{course.title}</h3>
// // // // // // //                                 <p className="text-muted-foreground text-sm mb-3">{course.description}</p>
// // // // // // //                                 <div className="flex items-center gap-4 mb-3">
// // // // // // //                                   <Badge variant="secondary">{course.category}</Badge>
// // // // // // //                                   <div className="flex items-center gap-1 text-sm text-muted-foreground">
// // // // // // //                                     <Clock className="w-4 h-4" />
// // // // // // //                                     {course.duration}
// // // // // // //                                   </div>
// // // // // // //                                 </div>
// // // // // // //                                 <div className="space-y-2">
// // // // // // //                                   <div className="flex justify-between items-center text-sm">
// // // // // // //                                     <span>Progress</span>
// // // // // // //                                     <span>{course.progress}%</span>
// // // // // // //                                   </div>
// // // // // // //                                   <Progress value={course.progress} className="w-full" />
// // // // // // //                                 </div>
// // // // // // //                               </div>
// // // // // // //                               <div className="flex flex-col gap-2">
// // // // // // //                                 <Button className="flex items-center gap-2">
// // // // // // //                                   <Play className="w-4 h-4" />
// // // // // // //                                   Continue
// // // // // // //                                 </Button>
// // // // // // //                                 <Button variant="outline" size="sm" className="text-xs">
// // // // // // //                                   View Content
// // // // // // //                                 </Button>
// // // // // // //                               </div>
// // // // // // //                             </div>
// // // // // // //                           </CardContent>
// // // // // // //                         </Card>
// // // // // // //                       ))}

// // // // // // //                       {enrolledCourses.filter(course => !course.completed).length === 0 && (
// // // // // // //                         <Card>
// // // // // // //                           <CardContent className="p-12 text-center">
// // // // // // //                             <BookOpen className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
// // // // // // //                             <p className="text-muted-foreground">No enrolled courses yet.</p>
// // // // // // //                             <Button className="mt-4">Browse Courses</Button>
// // // // // // //                           </CardContent>
// // // // // // //                         </Card>
// // // // // // //                       )}
// // // // // // //                     </div>
// // // // // // //                   </TabsContent>

// // // // // // //                   <TabsContent value="completed" className="mt-6">
// // // // // // //                     <div className="space-y-4">
// // // // // // //                       {enrolledCourses.filter(course => course.completed).map((course) => (
// // // // // // //                         <Card key={course.id} className="hover:shadow-lg transition-shadow">
// // // // // // //                           <CardContent className="p-6">
// // // // // // //                             <div className="flex items-start gap-4">
// // // // // // //                               <img
// // // // // // //                                 src={course.thumbnail || 'https://images.pexels.com/photos/5212345/pexels-photo-5212345.jpeg'}
// // // // // // //                                 alt={course.title}
// // // // // // //                                 className="w-20 h-20 rounded-lg object-cover"
// // // // // // //                               />
// // // // // // //                               <div className="flex-1">
// // // // // // //                                 <h3 className="font-semibold text-lg mb-2">{course.title}</h3>
// // // // // // //                                 <p className="text-muted-foreground text-sm mb-3">{course.description}</p>
// // // // // // //                                 <div className="flex items-center gap-4">
// // // // // // //                                   <Badge variant="secondary" className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100">
// // // // // // //                                     Completed
// // // // // // //                                   </Badge>
// // // // // // //                                   <div className="flex items-center gap-1 text-sm text-muted-foreground">
// // // // // // //                                     <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
// // // // // // //                                     Rate Course
// // // // // // //                                   </div>
// // // // // // //                                 </div>
// // // // // // //                               </div>
// // // // // // //                               <Button
// // // // // // //                                 variant="outline"
// // // // // // //                                 className="flex items-center gap-2"
// // // // // // //                                 onClick={() => downloadCertificate(course.id)}
// // // // // // //                                 disabled={!course.canDownloadCertificate}
// // // // // // //                               >
// // // // // // //                                 <Download className="w-4 h-4" />
// // // // // // //                                 Certificate
// // // // // // //                               </Button>
// // // // // // //                             </div>
// // // // // // //                           </CardContent>
// // // // // // //                         </Card>
// // // // // // //                       ))}

// // // // // // //                       {enrolledCourses.filter(course => course.completed).length === 0 && (
// // // // // // //                         <Card>
// // // // // // //                           <CardContent className="p-12 text-center">
// // // // // // //                             <Award className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
// // // // // // //                             <p className="text-muted-foreground">No completed courses yet.</p>
// // // // // // //                           </CardContent>
// // // // // // //                         </Card>
// // // // // // //                       )}
// // // // // // //                     </div>
// // // // // // //                   </TabsContent>

// // // // // // //                   <TabsContent value="certificates" className="mt-6">
// // // // // // //                     <div className="space-y-4">
// // // // // // //                       {enrolledCourses.filter(course => course.completed && course.canDownloadCertificate).map((course) => (
// // // // // // //                         <Card key={course.id} className="hover:shadow-lg transition-shadow">
// // // // // // //                           <CardContent className="p-6">
// // // // // // //                             <div className="flex items-center justify-between">
// // // // // // //                               <div className="flex items-center gap-4">
// // // // // // //                                 <div className="w-16 h-16 bg-gradient-to-br from-primary to-blue-600 rounded-lg flex items-center justify-center">
// // // // // // //                                   <Award className="w-8 h-8 text-white" />
// // // // // // //                                 </div>
// // // // // // //                                 <div>
// // // // // // //                                   <h3 className="font-semibold text-lg">{course.title}</h3>
// // // // // // //                                   <p className="text-muted-foreground">
// // // // // // //                                     Completed on {new Date(course.completedAt).toLocaleDateString()}
// // // // // // //                                   </p>
// // // // // // //                                   <p className="text-sm text-muted-foreground">
// // // // // // //                                     Credential ID: {course.credentialId}
// // // // // // //                                   </p>
// // // // // // //                                 </div>
// // // // // // //                               </div>
// // // // // // //                               <Button
// // // // // // //                                 className="flex items-center gap-2"
// // // // // // //                                 onClick={() => downloadCertificate(course.id)}
// // // // // // //                               >
// // // // // // //                                 <Download className="w-4 h-4" />
// // // // // // //                                 Download
// // // // // // //                               </Button>
// // // // // // //                             </div>
// // // // // // //                           </CardContent>
// // // // // // //                         </Card>
// // // // // // //                       ))}

// // // // // // //                       {enrolledCourses.filter(course => course.completed && course.canDownloadCertificate).length === 0 && (
// // // // // // //                         <Card>
// // // // // // //                           <CardContent className="p-12 text-center">
// // // // // // //                             <Award className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
// // // // // // //                             <p className="text-muted-foreground">No certificates available yet.</p>
// // // // // // //                             <p className="text-sm text-muted-foreground mt-2">
// // // // // // //                               Certificates become available 30 days after course completion.
// // // // // // //                             </p>
// // // // // // //                           </CardContent>
// // // // // // //                         </Card>
// // // // // // //                       )}
// // // // // // //                     </div>
// // // // // // //                   </TabsContent>
// // // // // // //                 </Tabs>
// // // // // // //               </motion.div>
// // // // // // //             </div>

// // // // // // //             {/* Sidebar */}
// // // // // // //             <div className="space-y-6">
// // // // // // //               {/* Referral Card */}
// // // // // // //               <motion.div
// // // // // // //                 initial={{ opacity: 0, x: 20 }}
// // // // // // //                 animate={{ opacity: 1, x: 0 }}
// // // // // // //                 transition={{ duration: 0.6, delay: 0.3 }}
// // // // // // //               >
// // // // // // //                 <Card>
// // // // // // //                   <CardHeader>
// // // // // // //                     <CardTitle className="flex items-center gap-2">
// // // // // // //                       <Gift className="w-5 h-5" />
// // // // // // //                       Refer & Earn
// // // // // // //                     </CardTitle>
// // // // // // //                     <CardDescription>
// // // // // // //                       Earn credits when your friends join and purchase courses
// // // // // // //                     </CardDescription>
// // // // // // //                   </CardHeader>
// // // // // // //                   <CardContent className="space-y-4">
// // // // // // //                     <div className="p-3 bg-primary/10 rounded-lg text-center">
// // // // // // //                       <p className="text-2xl font-bold text-primary">{userStats.credits}</p>
// // // // // // //                       <p className="text-sm text-muted-foreground">Available Credits</p>
// // // // // // //                     </div>

// // // // // // //                     <div className="space-y-2">
// // // // // // //                       <Label htmlFor="referral-code">Your Referral Code</Label>
// // // // // // //                       <div className="flex gap-2">
// // // // // // //                         <Input
// // // // // // //                           id="referral-code"
// // // // // // //                           value={referralCode}
// // // // // // //                           readOnly
// // // // // // //                           className="font-mono"
// // // // // // //                         />
// // // // // // //                         <Button
// // // // // // //                           size="sm"
// // // // // // //                           variant="outline"
// // // // // // //                           onClick={copyReferralLink}
// // // // // // //                         >
// // // // // // //                           <Copy className="w-4 h-4" />
// // // // // // //                         </Button>
// // // // // // //                       </div>
// // // // // // //                     </div>

// // // // // // //                     <div className="text-sm text-muted-foreground">
// // // // // // //                       <p>• Earn 100 credits per successful referral</p>
// // // // // // //                       <p>• Use credits for discounts on courses</p>
// // // // // // //                     </div>
// // // // // // //                   </CardContent>
// // // // // // //                 </Card>
// // // // // // //               </motion.div>

// // // // // // //               {/* Recent Activity */}
// // // // // // //               <motion.div
// // // // // // //                 initial={{ opacity: 0, x: 20 }}
// // // // // // //                 animate={{ opacity: 1, x: 0 }}
// // // // // // //                 transition={{ duration: 0.6, delay: 0.4 }}
// // // // // // //               >
// // // // // // //                 <Card>
// // // // // // //                   <CardHeader>
// // // // // // //                     <CardTitle className="flex items-center gap-2">
// // // // // // //                       <TrendingUp className="w-5 h-5" />
// // // // // // //                       Recent Activity
// // // // // // //                     </CardTitle>
// // // // // // //                   </CardHeader>
// // // // // // //                   <CardContent className="space-y-4">
// // // // // // //                     {recentActivity.length > 0 ? (
// // // // // // //                       recentActivity.map((activity, index) => (
// // // // // // //                         <div key={index} className="flex items-start gap-3 p-3 rounded-lg bg-muted/50">
// // // // // // //                           <div className="w-2 h-2 bg-primary rounded-full mt-2" />
// // // // // // //                           <div className="flex-1">
// // // // // // //                             <p className="text-sm font-medium">{activity.title}</p>
// // // // // // //                             <p className="text-xs text-muted-foreground">{activity.description}</p>
// // // // // // //                             <p className="text-xs text-muted-foreground mt-1">{activity.timestamp}</p>
// // // // // // //                           </div>
// // // // // // //                         </div>
// // // // // // //                       ))
// // // // // // //                     ) : (
// // // // // // //                       <p className="text-sm text-muted-foreground text-center py-4">
// // // // // // //                         No recent activity
// // // // // // //                       </p>
// // // // // // //                     )}
// // // // // // //                   </CardContent>
// // // // // // //                 </Card>
// // // // // // //               </motion.div>
// // // // // // //             </div>
// // // // // // //           </div>
// // // // // // //         </div>
// // // // // // //       </main>
// // // // // // //     </div>
// // // // // // //   );
// // // // // // // }

// // // // // // 'use client';

// // // // // // import { useState, useEffect } from 'react';
// // // // // // import { motion } from 'framer-motion';
// // // // // // import {
// // // // // //   BookOpen,
// // // // // //   Award,
// // // // // //   Clock,
// // // // // //   TrendingUp,
// // // // // //   Play,
// // // // // //   Download,
// // // // // //   Users,
// // // // // //   Star,
// // // // // //   Gift,
// // // // // //   Copy,
// // // // // //   CheckCircle,
// // // // // //   Settings,
// // // // // //   User,
// // // // // //   CreditCard,
// // // // // //   Bell,
// // // // // //   Lock,
// // // // // //   Eye,
// // // // // //   EyeOff,
// // // // // //   LogOut
// // // // // // } from 'lucide-react';
// // // // // // import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
// // // // // // import { Button } from '@/components/ui/button';
// // // // // // import { Badge } from '@/components/ui/badge';
// // // // // // import { Progress } from '@/components/ui/progress';
// // // // // // import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
// // // // // // import { Input } from '@/components/ui/input';
// // // // // // import { Label } from '@/components/ui/label';
// // // // // // import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
// // // // // // import { toast } from 'sonner';
// // // // // // import { useAuth } from '@/components/auth-provider';
// // // // // // import Navbar from '@/components/navbar';
// // // // // // import { useRouter } from 'next/navigation';

// // // // // // export default function Dashboard() {
// // // // // //   const { user, logout, loading } = useAuth();
// // // // // //   const router = useRouter();
// // // // // //   const [userStats, setUserStats] = useState({
// // // // // //     enrolledCourses: 0,
// // // // // //     completedCourses: 0,
// // // // // //     certificatesEarned: 0,
// // // // // //     totalWatchTime: 0,
// // // // // //     credits: 0
// // // // // //   });
// // // // // //   const [enrolledCourses, setEnrolledCourses] = useState([]);
// // // // // //   const [recentActivity, setRecentActivity] = useState([]);
// // // // // //   const [referralCode, setReferralCode] = useState('');
// // // // // //   const [profileData, setProfileData] = useState({
// // // // // //     fullName: '',
// // // // // //     email: '',
// // // // // //     location: '',
// // // // // //   });
// // // // // //   const [passwordData, setPasswordData] = useState({
// // // // // //     currentPassword: '',
// // // // // //     newPassword: '',
// // // // // //     confirmPassword: '',
// // // // // //   });
// // // // // //   const [showPasswords, setShowPasswords] = useState({
// // // // // //     current: false,
// // // // // //     new: false,
// // // // // //     confirm: false,
// // // // // //   });
// // // // // //   const [isProfileDialogOpen, setIsProfileDialogOpen] = useState(false);
// // // // // //   const [isPasswordDialogOpen, setIsPasswordDialogOpen] = useState(false);
// // // // // //   const [isLoading, setIsLoading] = useState(false);

// // // // // //   // Redirect to login if not authenticated
// // // // // //   useEffect(() => {
// // // // // //     if (!loading && !user) {
// // // // // //       console.log('User not authenticated, redirecting to login');
// // // // // //       router.replace('/auth/login');
// // // // // //       return;
// // // // // //     }

// // // // // //     if (user) {
// // // // // //       console.log('Dashboard loaded for user:', user.id);
// // // // // //       fetchUserData();
// // // // // //       setReferralCode(user.referralCode || '');
// // // // // //       setProfileData({
// // // // // //         fullName: user.fullName || '',
// // // // // //         email: user.email || '',
// // // // // //         location: user.location || '',
// // // // // //       });
// // // // // //     }
// // // // // //   }, [user, loading, router]);

// // // // // //   const fetchUserData = async () => {
// // // // // //     try {
// // // // // //       const response = await fetch('/api/user/dashboard', {
// // // // // //         credentials: 'include',
// // // // // //       });

// // // // // //       if (response.ok) {
// // // // // //         const data = await response.json();
// // // // // //         setUserStats(data.stats);
// // // // // //         setEnrolledCourses(data.enrolledCourses);
// // // // // //         setRecentActivity(data.recentActivity);
// // // // // //       } else if (response.status === 401) {
// // // // // //         // Token expired, logout user
// // // // // //         console.log('Token expired, logging out');
// // // // // //         logout();
// // // // // //       }
// // // // // //     } catch (error) {
// // // // // //       console.error('Error fetching user data:', error);
// // // // // //     }
// // // // // //   };

// // // // // //   const updateProfile = async () => {
// // // // // //     if (!profileData.fullName || !profileData.location) {
// // // // // //       toast.error('Please fill in all required fields');
// // // // // //       return;
// // // // // //     }

// // // // // //     setIsLoading(true);
// // // // // //     try {
// // // // // //       const response = await fetch('/api/user/profile', {
// // // // // //         method: 'PUT',
// // // // // //         headers: {
// // // // // //           'Content-Type': 'application/json',
// // // // // //         },
// // // // // //         credentials: 'include',
// // // // // //         body: JSON.stringify(profileData),
// // // // // //       });

// // // // // //       if (response.ok) {
// // // // // //         toast.success('Profile updated successfully!');
// // // // // //         setIsProfileDialogOpen(false);
// // // // // //         // Refresh user data
// // // // // //         fetchUserData();
// // // // // //       } else {
// // // // // //         const data = await response.json();
// // // // // //         toast.error(data.message || 'Failed to update profile');
// // // // // //       }
// // // // // //     } catch (error) {
// // // // // //       console.error('Error updating profile:', error);
// // // // // //       toast.error('Something went wrong. Please try again.');
// // // // // //     } finally {
// // // // // //       setIsLoading(false);
// // // // // //     }
// // // // // //   };

// // // // // //   const changePassword = async () => {
// // // // // //     if (!passwordData.currentPassword || !passwordData.newPassword || !passwordData.confirmPassword) {
// // // // // //       toast.error('Please fill in all fields');
// // // // // //       return;
// // // // // //     }

// // // // // //     if (passwordData.newPassword !== passwordData.confirmPassword) {
// // // // // //       toast.error('New passwords do not match');
// // // // // //       return;
// // // // // //     }

// // // // // //     if (passwordData.newPassword.length < 6) {
// // // // // //       toast.error('Password must be at least 6 characters long');
// // // // // //       return;
// // // // // //     }

// // // // // //     setIsLoading(true);
// // // // // //     try {
// // // // // //       const response = await fetch('/api/user/change-password', {
// // // // // //         method: 'POST',
// // // // // //         headers: {
// // // // // //           'Content-Type': 'application/json',
// // // // // //         },
// // // // // //         credentials: 'include',
// // // // // //         body: JSON.stringify(passwordData),
// // // // // //       });

// // // // // //       if (response.ok) {
// // // // // //         toast.success('Password changed successfully!');
// // // // // //         setIsPasswordDialogOpen(false);
// // // // // //         setPasswordData({
// // // // // //           currentPassword: '',
// // // // // //           newPassword: '',
// // // // // //           confirmPassword: '',
// // // // // //         });
// // // // // //       } else {
// // // // // //         const data = await response.json();
// // // // // //         toast.error(data.message || 'Failed to change password');
// // // // // //       }
// // // // // //     } catch (error) {
// // // // // //       console.error('Error changing password:', error);
// // // // // //       toast.error('Something went wrong. Please try again.');
// // // // // //     } finally {
// // // // // //       setIsLoading(false);
// // // // // //     }
// // // // // //   };

// // // // // //   const copyReferralLink = () => {
// // // // // //     const referralLink = `${window.location.origin}/auth/register?ref=${referralCode}`;
// // // // // //     navigator.clipboard.writeText(referralLink);
// // // // // //     toast.success('Referral link copied to clipboard!');
// // // // // //   };

// // // // // //   const downloadCertificate = async (courseId) => {
// // // // // //     try {
// // // // // //       const response = await fetch(`/api/certificates/download/${courseId}`, {
// // // // // //         credentials: 'include',
// // // // // //       });

// // // // // //       if (response.ok) {
// // // // // //         const blob = await response.blob();
// // // // // //         const url = window.URL.createObjectURL(blob);
// // // // // //         const a = document.createElement('a');
// // // // // //         a.style.display = 'none';
// // // // // //         a.href = url;
// // // // // //         a.download = `certificate-${courseId}.pdf`;
// // // // // //         document.body.appendChild(a);
// // // // // //         a.click();
// // // // // //         window.URL.revokeObjectURL(url);
// // // // // //         toast.success('Certificate downloaded successfully!');
// // // // // //       } else {
// // // // // //         toast.error('Error downloading certificate');
// // // // // //       }
// // // // // //     } catch (error) {
// // // // // //       console.error('Error downloading certificate:', error);
// // // // // //       toast.error('Error downloading certificate');
// // // // // //     }
// // // // // //   };

// // // // // //   const handleLogout = async () => {
// // // // // //     try {
// // // // // //       console.log('Logging out from dashboard...');
// // // // // //       await logout();
// // // // // //       toast.success('Logged out successfully');
// // // // // //     } catch (error) {
// // // // // //       console.error('Logout error:', error);
// // // // // //       toast.error('Error logging out');
// // // // // //     }
// // // // // //   };

// // // // // //   const stats = [
// // // // // //     {
// // // // // //       title: 'Enrolled Courses',
// // // // // //       value: userStats.enrolledCourses,
// // // // // //       icon: BookOpen,
// // // // // //       color: 'text-blue-600',
// // // // // //       bgColor: 'bg-blue-50 dark:bg-blue-950'
// // // // // //     },
// // // // // //     {
// // // // // //       title: 'Completed',
// // // // // //       value: userStats.completedCourses,
// // // // // //       icon: CheckCircle,
// // // // // //       color: 'text-green-600',
// // // // // //       bgColor: 'bg-green-50 dark:bg-green-950'
// // // // // //     },
// // // // // //     {
// // // // // //       title: 'Certificates',
// // // // // //       value: userStats.certificatesEarned,
// // // // // //       icon: Award,
// // // // // //       color: 'text-purple-600',
// // // // // //       bgColor: 'bg-purple-50 dark:bg-purple-950'
// // // // // //     },
// // // // // //     {
// // // // // //       title: 'Credits',
// // // // // //       value: userStats.credits,
// // // // // //       icon: Gift,
// // // // // //       color: 'text-orange-600',
// // // // // //       bgColor: 'bg-orange-50 dark:bg-orange-950'
// // // // // //     }
// // // // // //   ];

// // // // // //   if (loading) {
// // // // // //     return (
// // // // // //       <div className="min-h-screen flex items-center justify-center">
// // // // // //         <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
// // // // // //       </div>
// // // // // //     );
// // // // // //   }

// // // // // //   if (!user) {
// // // // // //     return null; // Will redirect in useEffect
// // // // // //   }

// // // // // //   return (
// // // // // //     <div className="min-h-screen bg-background">
// // // // // //       <Navbar />

// // // // // //       <main className="pt-20 pb-12">
// // // // // //         <div className="container mx-auto px-4">
// // // // // //           {/* Header with Profile Actions */}
// // // // // //           <motion.div
// // // // // //             className="mb-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4"
// // // // // //             initial={{ opacity: 0, y: 20 }}
// // // // // //             animate={{ opacity: 1, y: 0 }}
// // // // // //             transition={{ duration: 0.6 }}
// // // // // //           >
// // // // // //             <div>
// // // // // //               <h1 className="text-3xl font-bold mb-2">
// // // // // //                 Welcome back, {user.fullName}! 👋
// // // // // //               </h1>
// // // // // //               <p className="text-muted-foreground">
// // // // // //                 Continue your learning journey and track your progress.
// // // // // //               </p>
// // // // // //             </div>
// // // // // //             <div className="flex gap-2 flex-wrap">
// // // // // //               <Dialog open={isProfileDialogOpen} onOpenChange={setIsProfileDialogOpen}>
// // // // // //                 <DialogTrigger asChild>
// // // // // //                   <Button variant="outline" className="flex items-center gap-2">
// // // // // //                     <User className="w-4 h-4" />
// // // // // //                     Profile
// // // // // //                   </Button>
// // // // // //                 </DialogTrigger>
// // // // // //                 <DialogContent>
// // // // // //                   <DialogHeader>
// // // // // //                     <DialogTitle>Edit Profile</DialogTitle>
// // // // // //                     <DialogDescription>
// // // // // //                       Update your profile information
// // // // // //                     </DialogDescription>
// // // // // //                   </DialogHeader>
// // // // // //                   <div className="space-y-4">
// // // // // //                     <div className="space-y-2">
// // // // // //                       <Label htmlFor="fullName">Full Name</Label>
// // // // // //                       <Input
// // // // // //                         id="fullName"
// // // // // //                         value={profileData.fullName}
// // // // // //                         onChange={(e) => setProfileData(prev => ({ ...prev, fullName: e.target.value }))}
// // // // // //                         placeholder="Enter your full name"
// // // // // //                       />
// // // // // //                     </div>
// // // // // //                     <div className="space-y-2">
// // // // // //                       <Label htmlFor="email">Email (Cannot be changed)</Label>
// // // // // //                       <Input
// // // // // //                         id="email"
// // // // // //                         value={profileData.email}
// // // // // //                         disabled
// // // // // //                         className="bg-muted"
// // // // // //                       />
// // // // // //                     </div>
// // // // // //                     <div className="space-y-2">
// // // // // //                       <Label htmlFor="location">Location</Label>
// // // // // //                       <Input
// // // // // //                         id="location"
// // // // // //                         value={profileData.location}
// // // // // //                         onChange={(e) => setProfileData(prev => ({ ...prev, location: e.target.value }))}
// // // // // //                         placeholder="Enter your location"
// // // // // //                       />
// // // // // //                     </div>
// // // // // //                     <div className="flex gap-2">
// // // // // //                       <Button onClick={updateProfile} disabled={isLoading} className="flex-1">
// // // // // //                         {isLoading ? 'Updating...' : 'Update Profile'}
// // // // // //                       </Button>
// // // // // //                       <Button variant="outline" onClick={() => setIsProfileDialogOpen(false)}>
// // // // // //                         Cancel
// // // // // //                       </Button>
// // // // // //                     </div>
// // // // // //                   </div>
// // // // // //                 </DialogContent>
// // // // // //               </Dialog>

// // // // // //               <Dialog open={isPasswordDialogOpen} onOpenChange={setIsPasswordDialogOpen}>
// // // // // //                 <DialogTrigger asChild>
// // // // // //                   <Button variant="outline" className="flex items-center gap-2">
// // // // // //                     <Lock className="w-4 h-4" />
// // // // // //                     Change Password
// // // // // //                   </Button>
// // // // // //                 </DialogTrigger>
// // // // // //                 <DialogContent>
// // // // // //                   <DialogHeader>
// // // // // //                     <DialogTitle>Change Password</DialogTitle>
// // // // // //                     <DialogDescription>
// // // // // //                       Enter your current password and choose a new one
// // // // // //                     </DialogDescription>
// // // // // //                   </DialogHeader>
// // // // // //                   <div className="space-y-4">
// // // // // //                     <div className="space-y-2">
// // // // // //                       <Label htmlFor="currentPassword">Current Password</Label>
// // // // // //                       <div className="relative">
// // // // // //                         <Input
// // // // // //                           id="currentPassword"
// // // // // //                           type={showPasswords.current ? 'text' : 'password'}
// // // // // //                           value={passwordData.currentPassword}
// // // // // //                           onChange={(e) => setPasswordData(prev => ({ ...prev, currentPassword: e.target.value }))}
// // // // // //                           placeholder="Enter current password"
// // // // // //                           className="pr-10"
// // // // // //                         />
// // // // // //                         <button
// // // // // //                           type="button"
// // // // // //                           onClick={() => setShowPasswords(prev => ({ ...prev, current: !prev.current }))}
// // // // // //                           className="absolute right-3 top-3 text-muted-foreground hover:text-primary"
// // // // // //                         >
// // // // // //                           {showPasswords.current ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
// // // // // //                         </button>
// // // // // //                       </div>
// // // // // //                     </div>
// // // // // //                     <div className="space-y-2">
// // // // // //                       <Label htmlFor="newPassword">New Password</Label>
// // // // // //                       <div className="relative">
// // // // // //                         <Input
// // // // // //                           id="newPassword"
// // // // // //                           type={showPasswords.new ? 'text' : 'password'}
// // // // // //                           value={passwordData.newPassword}
// // // // // //                           onChange={(e) => setPasswordData(prev => ({ ...prev, newPassword: e.target.value }))}
// // // // // //                           placeholder="Enter new password"
// // // // // //                           className="pr-10"
// // // // // //                         />
// // // // // //                         <button
// // // // // //                           type="button"
// // // // // //                           onClick={() => setShowPasswords(prev => ({ ...prev, new: !prev.new }))}
// // // // // //                           className="absolute right-3 top-3 text-muted-foreground hover:text-primary"
// // // // // //                         >
// // // // // //                           {showPasswords.new ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
// // // // // //                         </button>
// // // // // //                       </div>
// // // // // //                     </div>
// // // // // //                     <div className="space-y-2">
// // // // // //                       <Label htmlFor="confirmPassword">Confirm New Password</Label>
// // // // // //                       <div className="relative">
// // // // // //                         <Input
// // // // // //                           id="confirmPassword"
// // // // // //                           type={showPasswords.confirm ? 'text' : 'password'}
// // // // // //                           value={passwordData.confirmPassword}
// // // // // //                           onChange={(e) => setPasswordData(prev => ({ ...prev, confirmPassword: e.target.value }))}
// // // // // //                           placeholder="Confirm new password"
// // // // // //                           className="pr-10"
// // // // // //                         />
// // // // // //                         <button
// // // // // //                           type="button"
// // // // // //                           onClick={() => setShowPasswords(prev => ({ ...prev, confirm: !prev.confirm }))}
// // // // // //                           className="absolute right-3 top-3 text-muted-foreground hover:text-primary"
// // // // // //                         >
// // // // // //                           {showPasswords.confirm ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
// // // // // //                         </button>
// // // // // //                       </div>
// // // // // //                     </div>
// // // // // //                     <div className="flex gap-2">
// // // // // //                       <Button onClick={changePassword} disabled={isLoading} className="flex-1">
// // // // // //                         {isLoading ? 'Changing...' : 'Change Password'}
// // // // // //                       </Button>
// // // // // //                       <Button variant="outline" onClick={() => setIsPasswordDialogOpen(false)}>
// // // // // //                         Cancel
// // // // // //                       </Button>
// // // // // //                     </div>
// // // // // //                   </div>
// // // // // //                 </DialogContent>
// // // // // //               </Dialog>

// // // // // //               <Button variant="outline" onClick={handleLogout} className="flex items-center gap-2 text-red-600 hover:text-red-700">
// // // // // //                 <LogOut className="w-4 h-4" />
// // // // // //                 Logout
// // // // // //               </Button>
// // // // // //             </div>
// // // // // //           </motion.div>

// // // // // //           {/* Stats Cards */}
// // // // // //           <motion.div
// // // // // //             className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
// // // // // //             initial={{ opacity: 0, y: 20 }}
// // // // // //             animate={{ opacity: 1, y: 0 }}
// // // // // //             transition={{ duration: 0.6, delay: 0.1 }}
// // // // // //           >
// // // // // //             {stats.map((stat, index) => (
// // // // // //               <Card key={stat.title} className="hover:shadow-lg transition-shadow">
// // // // // //                 <CardContent className="p-6">
// // // // // //                   <div className="flex items-center justify-between">
// // // // // //                     <div>
// // // // // //                       <p className="text-sm text-muted-foreground mb-1">{stat.title}</p>
// // // // // //                       <p className="text-2xl font-bold">{stat.value}</p>
// // // // // //                     </div>
// // // // // //                     <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${stat.bgColor}`}>
// // // // // //                       <stat.icon className={`w-6 h-6 ${stat.color}`} />
// // // // // //                     </div>
// // // // // //                   </div>
// // // // // //                 </CardContent>
// // // // // //               </Card>
// // // // // //             ))}
// // // // // //           </motion.div>

// // // // // //           <div className="grid lg:grid-cols-3 gap-8">
// // // // // //             {/* Main Content */}
// // // // // //             <div className="lg:col-span-2 space-y-8">
// // // // // //               {/* Course Tabs */}
// // // // // //               <motion.div
// // // // // //                 initial={{ opacity: 0, y: 20 }}
// // // // // //                 animate={{ opacity: 1, y: 0 }}
// // // // // //                 transition={{ duration: 0.6, delay: 0.2 }}
// // // // // //               >
// // // // // //                 <Tabs defaultValue="enrolled" className="w-full">
// // // // // //                   <TabsList className="grid w-full grid-cols-3">
// // // // // //                     <TabsTrigger value="enrolled">Enrolled</TabsTrigger>
// // // // // //                     <TabsTrigger value="completed">Completed</TabsTrigger>
// // // // // //                     <TabsTrigger value="certificates">Certificates</TabsTrigger>
// // // // // //                   </TabsList>

// // // // // //                   <TabsContent value="enrolled" className="mt-6">
// // // // // //                     <div className="space-y-4">
// // // // // //                       {enrolledCourses.filter(course => !course.completed).map((course) => (
// // // // // //                         <Card key={course.id} className="hover:shadow-lg transition-shadow">
// // // // // //                           <CardContent className="p-6">
// // // // // //                             <div className="flex items-start gap-4">
// // // // // //                               <img
// // // // // //                                 src={course.thumbnail || 'https://images.pexels.com/photos/5212345/pexels-photo-5212345.jpeg'}
// // // // // //                                 alt={course.title}
// // // // // //                                 className="w-20 h-20 rounded-lg object-cover"
// // // // // //                               />
// // // // // //                               <div className="flex-1">
// // // // // //                                 <h3 className="font-semibold text-lg mb-2">{course.title}</h3>
// // // // // //                                 <p className="text-muted-foreground text-sm mb-3">{course.description}</p>
// // // // // //                                 <div className="flex items-center gap-4 mb-3">
// // // // // //                                   <Badge variant="secondary">{course.category}</Badge>
// // // // // //                                   <div className="flex items-center gap-1 text-sm text-muted-foreground">
// // // // // //                                     <Clock className="w-4 h-4" />
// // // // // //                                     {course.duration}
// // // // // //                                   </div>
// // // // // //                                 </div>
// // // // // //                                 <div className="space-y-2">
// // // // // //                                   <div className="flex justify-between items-center text-sm">
// // // // // //                                     <span>Progress</span>
// // // // // //                                     <span>{course.progress}%</span>
// // // // // //                                   </div>
// // // // // //                                   <Progress value={course.progress} className="w-full" />
// // // // // //                                 </div>
// // // // // //                               </div>
// // // // // //                               <div className="flex flex-col gap-2">
// // // // // //                                 <Button className="flex items-center gap-2">
// // // // // //                                   <Play className="w-4 h-4" />
// // // // // //                                   Continue
// // // // // //                                 </Button>
// // // // // //                                 <Button variant="outline" size="sm" className="text-xs">
// // // // // //                                   View Content
// // // // // //                                 </Button>
// // // // // //                               </div>
// // // // // //                             </div>
// // // // // //                           </CardContent>
// // // // // //                         </Card>
// // // // // //                       ))}

// // // // // //                       {enrolledCourses.filter(course => !course.completed).length === 0 && (
// // // // // //                         <Card>
// // // // // //                           <CardContent className="p-12 text-center">
// // // // // //                             <BookOpen className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
// // // // // //                             <p className="text-muted-foreground">No enrolled courses yet.</p>
// // // // // //                             <Button className="mt-4">Browse Courses</Button>
// // // // // //                           </CardContent>
// // // // // //                         </Card>
// // // // // //                       )}
// // // // // //                     </div>
// // // // // //                   </TabsContent>

// // // // // //                   <TabsContent value="completed" className="mt-6">
// // // // // //                     <div className="space-y-4">
// // // // // //                       {enrolledCourses.filter(course => course.completed).map((course) => (
// // // // // //                         <Card key={course.id} className="hover:shadow-lg transition-shadow">
// // // // // //                           <CardContent className="p-6">
// // // // // //                             <div className="flex items-start gap-4">
// // // // // //                               <img
// // // // // //                                 src={course.thumbnail || 'https://images.pexels.com/photos/5212345/pexels-photo-5212345.jpeg'}
// // // // // //                                 alt={course.title}
// // // // // //                                 className="w-20 h-20 rounded-lg object-cover"
// // // // // //                               />
// // // // // //                               <div className="flex-1">
// // // // // //                                 <h3 className="font-semibold text-lg mb-2">{course.title}</h3>
// // // // // //                                 <p className="text-muted-foreground text-sm mb-3">{course.description}</p>
// // // // // //                                 <div className="flex items-center gap-4">
// // // // // //                                   <Badge variant="secondary" className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100">
// // // // // //                                     Completed
// // // // // //                                   </Badge>
// // // // // //                                   <div className="flex items-center gap-1 text-sm text-muted-foreground">
// // // // // //                                     <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
// // // // // //                                     Rate Course
// // // // // //                                   </div>
// // // // // //                                 </div>
// // // // // //                               </div>
// // // // // //                               <Button
// // // // // //                                 variant="outline"
// // // // // //                                 className="flex items-center gap-2"
// // // // // //                                 onClick={() => downloadCertificate(course.id)}
// // // // // //                                 disabled={!course.canDownloadCertificate}
// // // // // //                               >
// // // // // //                                 <Download className="w-4 h-4" />
// // // // // //                                 Certificate
// // // // // //                               </Button>
// // // // // //                             </div>
// // // // // //                           </CardContent>
// // // // // //                         </Card>
// // // // // //                       ))}

// // // // // //                       {enrolledCourses.filter(course => course.completed).length === 0 && (
// // // // // //                         <Card>
// // // // // //                           <CardContent className="p-12 text-center">
// // // // // //                             <Award className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
// // // // // //                             <p className="text-muted-foreground">No completed courses yet.</p>
// // // // // //                           </CardContent>
// // // // // //                         </Card>
// // // // // //                       )}
// // // // // //                     </div>
// // // // // //                   </TabsContent>

// // // // // //                   <TabsContent value="certificates" className="mt-6">
// // // // // //                     <div className="space-y-4">
// // // // // //                       {enrolledCourses.filter(course => course.completed && course.canDownloadCertificate).map((course) => (
// // // // // //                         <Card key={course.id} className="hover:shadow-lg transition-shadow">
// // // // // //                           <CardContent className="p-6">
// // // // // //                             <div className="flex items-center justify-between">
// // // // // //                               <div className="flex items-center gap-4">
// // // // // //                                 <div className="w-16 h-16 bg-gradient-to-br from-primary to-blue-600 rounded-lg flex items-center justify-center">
// // // // // //                                   <Award className="w-8 h-8 text-white" />
// // // // // //                                 </div>
// // // // // //                                 <div>
// // // // // //                                   <h3 className="font-semibold text-lg">{course.title}</h3>
// // // // // //                                   <p className="text-muted-foreground">
// // // // // //                                     Completed on {new Date(course.completedAt).toLocaleDateString()}
// // // // // //                                   </p>
// // // // // //                                   <p className="text-sm text-muted-foreground">
// // // // // //                                     Credential ID: {course.credentialId}
// // // // // //                                   </p>
// // // // // //                                 </div>
// // // // // //                               </div>
// // // // // //                               <Button
// // // // // //                                 className="flex items-center gap-2"
// // // // // //                                 onClick={() => downloadCertificate(course.id)}
// // // // // //                               >
// // // // // //                                 <Download className="w-4 h-4" />
// // // // // //                                 Download
// // // // // //                               </Button>
// // // // // //                             </div>
// // // // // //                           </CardContent>
// // // // // //                         </Card>
// // // // // //                       ))}

// // // // // //                       {enrolledCourses.filter(course => course.completed && course.canDownloadCertificate).length === 0 && (
// // // // // //                         <Card>
// // // // // //                           <CardContent className="p-12 text-center">
// // // // // //                             <Award className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
// // // // // //                             <p className="text-muted-foreground">No certificates available yet.</p>
// // // // // //                             <p className="text-sm text-muted-foreground mt-2">
// // // // // //                               Certificates become available 30 days after course completion.
// // // // // //                             </p>
// // // // // //                           </CardContent>
// // // // // //                         </Card>
// // // // // //                       )}
// // // // // //                     </div>
// // // // // //                   </TabsContent>
// // // // // //                 </Tabs>
// // // // // //               </motion.div>
// // // // // //             </div>

// // // // // //             {/* Sidebar */}
// // // // // //             <div className="space-y-6">
// // // // // //               {/* Referral Card */}
// // // // // //               <motion.div
// // // // // //                 initial={{ opacity: 0, x: 20 }}
// // // // // //                 animate={{ opacity: 1, x: 0 }}
// // // // // //                 transition={{ duration: 0.6, delay: 0.3 }}
// // // // // //               >
// // // // // //                 <Card>
// // // // // //                   <CardHeader>
// // // // // //                     <CardTitle className="flex items-center gap-2">
// // // // // //                       <Gift className="w-5 h-5" />
// // // // // //                       Refer & Earn
// // // // // //                     </CardTitle>
// // // // // //                     <CardDescription>
// // // // // //                       Earn credits when your friends join and purchase courses
// // // // // //                     </CardDescription>
// // // // // //                   </CardHeader>
// // // // // //                   <CardContent className="space-y-4">
// // // // // //                     <div className="p-3 bg-primary/10 rounded-lg text-center">
// // // // // //                       <p className="text-2xl font-bold text-primary">{userStats.credits}</p>
// // // // // //                       <p className="text-sm text-muted-foreground">Available Credits</p>
// // // // // //                     </div>

// // // // // //                     <div className="space-y-2">
// // // // // //                       <Label htmlFor="referral-code">Your Referral Code</Label>
// // // // // //                       <div className="flex gap-2">
// // // // // //                         <Input
// // // // // //                           id="referral-code"
// // // // // //                           value={referralCode}
// // // // // //                           readOnly
// // // // // //                           className="font-mono"
// // // // // //                         />
// // // // // //                         <Button
// // // // // //                           size="sm"
// // // // // //                           variant="outline"
// // // // // //                           onClick={copyReferralLink}
// // // // // //                         >
// // // // // //                           <Copy className="w-4 h-4" />
// // // // // //                         </Button>
// // // // // //                       </div>
// // // // // //                     </div>

// // // // // //                     <div className="text-sm text-muted-foreground">
// // // // // //                       <p>• Earn 100 credits per successful referral</p>
// // // // // //                       <p>• Use credits for discounts on courses</p>
// // // // // //                     </div>
// // // // // //                   </CardContent>
// // // // // //                 </Card>
// // // // // //               </motion.div>

// // // // // //               {/* Recent Activity */}
// // // // // //               <motion.div
// // // // // //                 initial={{ opacity: 0, x: 20 }}
// // // // // //                 animate={{ opacity: 1, x: 0 }}
// // // // // //                 transition={{ duration: 0.6, delay: 0.4 }}
// // // // // //               >
// // // // // //                 <Card>
// // // // // //                   <CardHeader>
// // // // // //                     <CardTitle className="flex items-center gap-2">
// // // // // //                       <TrendingUp className="w-5 h-5" />
// // // // // //                       Recent Activity
// // // // // //                     </CardTitle>
// // // // // //                   </CardHeader>
// // // // // //                   <CardContent className="space-y-4">
// // // // // //                     {recentActivity.length > 0 ? (
// // // // // //                       recentActivity.map((activity, index) => (
// // // // // //                         <div key={index} className="flex items-start gap-3 p-3 rounded-lg bg-muted/50">
// // // // // //                           <div className="w-2 h-2 bg-primary rounded-full mt-2" />
// // // // // //                           <div className="flex-1">
// // // // // //                             <p className="text-sm font-medium">{activity.title}</p>
// // // // // //                             <p className="text-xs text-muted-foreground">{activity.description}</p>
// // // // // //                             <p className="text-xs text-muted-foreground mt-1">{activity.timestamp}</p>
// // // // // //                           </div>
// // // // // //                         </div>
// // // // // //                       ))
// // // // // //                     ) : (
// // // // // //                       <p className="text-sm text-muted-foreground text-center py-4">
// // // // // //                         No recent activity
// // // // // //                       </p>
// // // // // //                     )}
// // // // // //                   </CardContent>
// // // // // //                 </Card>
// // // // // //               </motion.div>
// // // // // //             </div>
// // // // // //           </div>
// // // // // //         </div>
// // // // // //       </main>
// // // // // //     </div>
// // // // // //   );
// // // // // // }

// // // // // 'use client';

// // // // // import { useState, useEffect } from 'react';
// // // // // import { motion } from 'framer-motion';
// // // // // import {
// // // // //   BookOpen,
// // // // //   Award,
// // // // //   Clock,
// // // // //   TrendingUp,
// // // // //   Play,
// // // // //   Download,
// // // // //   Users,
// // // // //   Star,
// // // // //   Gift,
// // // // //   Copy,
// // // // //   CheckCircle,
// // // // //   Settings,
// // // // //   User,
// // // // //   CreditCard,
// // // // //   Bell,
// // // // //   Lock,
// // // // //   Eye,
// // // // //   EyeOff,
// // // // //   LogOut,
// // // // //   ExternalLink
// // // // // } from 'lucide-react';
// // // // // import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
// // // // // import { Button } from '@/components/ui/button';
// // // // // import { Badge } from '@/components/ui/badge';
// // // // // import { Progress } from '@/components/ui/progress';
// // // // // import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
// // // // // import { Input } from '@/components/ui/input';
// // // // // import { Label } from '@/components/ui/label';
// // // // // import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
// // // // // import { toast } from 'sonner';
// // // // // import { useAuth } from '@/components/auth-provider';
// // // // // import Navbar from '@/components/navbar';
// // // // // import { useRouter } from 'next/navigation';
// // // // // import Link from 'next/link';

// // // // // export default function Dashboard() {
// // // // //   const { user, logout, loading } = useAuth();
// // // // //   const router = useRouter();
// // // // //   const [userStats, setUserStats] = useState({
// // // // //     enrolledCourses: 0,
// // // // //     completedCourses: 0,
// // // // //     certificatesEarned: 0,
// // // // //     totalWatchTime: 0,
// // // // //     credits: 0
// // // // //   });
// // // // //   const [enrolledCourses, setEnrolledCourses] = useState([]);
// // // // //   const [recentActivity, setRecentActivity] = useState([]);
// // // // //   const [referralCode, setReferralCode] = useState('');
// // // // //   const [profileData, setProfileData] = useState({
// // // // //     fullName: '',
// // // // //     email: '',
// // // // //     location: '',
// // // // //   });
// // // // //   const [passwordData, setPasswordData] = useState({
// // // // //     currentPassword: '',
// // // // //     newPassword: '',
// // // // //     confirmPassword: '',
// // // // //   });
// // // // //   const [showPasswords, setShowPasswords] = useState({
// // // // //     current: false,
// // // // //     new: false,
// // // // //     confirm: false,
// // // // //   });
// // // // //   const [isProfileDialogOpen, setIsProfileDialogOpen] = useState(false);
// // // // //   const [isPasswordDialogOpen, setIsPasswordDialogOpen] = useState(false);
// // // // //   const [isLoading, setIsLoading] = useState(false);

// // // // //   // Redirect to login if not authenticated
// // // // //   useEffect(() => {
// // // // //     if (!loading && !user) {
// // // // //       console.log('User not authenticated, redirecting to login');
// // // // //       router.replace('/auth/login');
// // // // //       return;
// // // // //     }

// // // // //     if (user) {
// // // // //       console.log('Dashboard loaded for user:', user.id);
// // // // //       fetchUserData();
// // // // //       setReferralCode(user.referralCode || '');
// // // // //       setProfileData({
// // // // //         fullName: user.fullName || '',
// // // // //         email: user.email || '',
// // // // //         location: user.location || '',
// // // // //       });
// // // // //     }
// // // // //   }, [user, loading, router]);

// // // // //   const fetchUserData = async () => {
// // // // //     try {
// // // // //       const response = await fetch('/api/user/dashboard', {
// // // // //         credentials: 'include',
// // // // //       });

// // // // //       if (response.ok) {
// // // // //         const data = await response.json();
// // // // //         setUserStats(data.stats);
// // // // //         setEnrolledCourses(data.enrolledCourses);
// // // // //         setRecentActivity(data.recentActivity);
// // // // //       } else if (response.status === 401) {
// // // // //         // Token expired, logout user
// // // // //         console.log('Token expired, logging out');
// // // // //         logout();
// // // // //       }
// // // // //     } catch (error) {
// // // // //       console.error('Error fetching user data:', error);
// // // // //     }
// // // // //   };

// // // // //   const updateProfile = async () => {
// // // // //     if (!profileData.fullName || !profileData.location) {
// // // // //       toast.error('Please fill in all required fields');
// // // // //       return;
// // // // //     }

// // // // //     setIsLoading(true);
// // // // //     try {
// // // // //       const response = await fetch('/api/user/profile', {
// // // // //         method: 'PUT',
// // // // //         headers: {
// // // // //           'Content-Type': 'application/json',
// // // // //         },
// // // // //         credentials: 'include',
// // // // //         body: JSON.stringify(profileData),
// // // // //       });

// // // // //       if (response.ok) {
// // // // //         toast.success('Profile updated successfully!');
// // // // //         setIsProfileDialogOpen(false);
// // // // //         // Refresh user data
// // // // //         fetchUserData();
// // // // //       } else {
// // // // //         const data = await response.json();
// // // // //         toast.error(data.message || 'Failed to update profile');
// // // // //       }
// // // // //     } catch (error) {
// // // // //       console.error('Error updating profile:', error);
// // // // //       toast.error('Something went wrong. Please try again.');
// // // // //     } finally {
// // // // //       setIsLoading(false);
// // // // //     }
// // // // //   };

// // // // //   const changePassword = async () => {
// // // // //     if (!passwordData.currentPassword || !passwordData.newPassword || !passwordData.confirmPassword) {
// // // // //       toast.error('Please fill in all fields');
// // // // //       return;
// // // // //     }

// // // // //     if (passwordData.newPassword !== passwordData.confirmPassword) {
// // // // //       toast.error('New passwords do not match');
// // // // //       return;
// // // // //     }

// // // // //     if (passwordData.newPassword.length < 6) {
// // // // //       toast.error('Password must be at least 6 characters long');
// // // // //       return;
// // // // //     }

// // // // //     setIsLoading(true);
// // // // //     try {
// // // // //       const response = await fetch('/api/user/change-password', {
// // // // //         method: 'POST',
// // // // //         headers: {
// // // // //           'Content-Type': 'application/json',
// // // // //         },
// // // // //         credentials: 'include',
// // // // //         body: JSON.stringify(passwordData),
// // // // //       });

// // // // //       if (response.ok) {
// // // // //         toast.success('Password changed successfully!');
// // // // //         setIsPasswordDialogOpen(false);
// // // // //         setPasswordData({
// // // // //           currentPassword: '',
// // // // //           newPassword: '',
// // // // //           confirmPassword: '',
// // // // //         });
// // // // //       } else {
// // // // //         const data = await response.json();
// // // // //         toast.error(data.message || 'Failed to change password');
// // // // //       }
// // // // //     } catch (error) {
// // // // //       console.error('Error changing password:', error);
// // // // //       toast.error('Something went wrong. Please try again.');
// // // // //     } finally {
// // // // //       setIsLoading(false);
// // // // //     }
// // // // //   };

// // // // //   const copyReferralLink = () => {
// // // // //     const referralLink = `${window.location.origin}/auth/register?ref=${referralCode}`;
// // // // //     navigator.clipboard.writeText(referralLink);
// // // // //     toast.success('Referral link copied to clipboard!');
// // // // //   };

// // // // //   const downloadCertificate = async (courseId) => {
// // // // //     try {
// // // // //       const response = await fetch(`/api/certificates/download/${courseId}`, {
// // // // //         credentials: 'include',
// // // // //       });

// // // // //       if (response.ok) {
// // // // //         const blob = await response.blob();
// // // // //         const url = window.URL.createObjectURL(blob);
// // // // //         const a = document.createElement('a');
// // // // //         a.style.display = 'none';
// // // // //         a.href = url;

// // // // //         // Get course name for filename
// // // // //         const course = enrolledCourses.find(c => c.id === courseId);
// // // // //         const filename = `${course?.title || 'course'}-certificate.pdf`;

// // // // //         a.download = filename;
// // // // //         document.body.appendChild(a);
// // // // //         a.click();
// // // // //         window.URL.revokeObjectURL(url);
// // // // //         document.body.removeChild(a);
// // // // //         toast.success('Certificate downloaded successfully!');
// // // // //       } else {
// // // // //         const data = await response.json();
// // // // //         toast.error(data.error || 'Error downloading certificate');
// // // // //       }
// // // // //     } catch (error) {
// // // // //       console.error('Error downloading certificate:', error);
// // // // //       toast.error('Error downloading certificate');
// // // // //     }
// // // // //   };

// // // // //   const handleLogout = async () => {
// // // // //     try {
// // // // //       console.log('Logging out from dashboard...');
// // // // //       await logout();
// // // // //       toast.success('Logged out successfully');
// // // // //     } catch (error) {
// // // // //       console.error('Logout error:', error);
// // // // //       toast.error('Error logging out');
// // // // //     }
// // // // //   };

// // // // //   const stats = [
// // // // //     {
// // // // //       title: 'Enrolled Courses',
// // // // //       value: userStats.enrolledCourses,
// // // // //       icon: BookOpen,
// // // // //       color: 'text-blue-600',
// // // // //       bgColor: 'bg-blue-50 dark:bg-blue-950'
// // // // //     },
// // // // //     {
// // // // //       title: 'Completed',
// // // // //       value: userStats.completedCourses,
// // // // //       icon: CheckCircle,
// // // // //       color: 'text-green-600',
// // // // //       bgColor: 'bg-green-50 dark:bg-green-950'
// // // // //     },
// // // // //     {
// // // // //       title: 'Certificates',
// // // // //       value: userStats.certificatesEarned,
// // // // //       icon: Award,
// // // // //       color: 'text-purple-600',
// // // // //       bgColor: 'bg-purple-50 dark:bg-purple-950'
// // // // //     },
// // // // //     {
// // // // //       title: 'Credits',
// // // // //       value: userStats.credits,
// // // // //       icon: Gift,
// // // // //       color: 'text-orange-600',
// // // // //       bgColor: 'bg-orange-50 dark:bg-orange-950'
// // // // //     }
// // // // //   ];

// // // // //   if (loading) {
// // // // //     return (
// // // // //       <div className="min-h-screen flex items-center justify-center">
// // // // //         <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
// // // // //       </div>
// // // // //     );
// // // // //   }

// // // // //   if (!user) {
// // // // //     return null; // Will redirect in useEffect
// // // // //   }

// // // // //   return (
// // // // //     <div className="min-h-screen bg-background">
// // // // //       <Navbar />

// // // // //       <main className="pt-20 pb-12">
// // // // //         <div className="container mx-auto px-4">
// // // // //           {/* Header with Profile Actions */}
// // // // //           <motion.div
// // // // //             className="mb-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4"
// // // // //             initial={{ opacity: 0, y: 20 }}
// // // // //             animate={{ opacity: 1, y: 0 }}
// // // // //             transition={{ duration: 0.6 }}
// // // // //           >
// // // // //             <div>
// // // // //               <h1 className="text-3xl font-bold mb-2">
// // // // //                 Welcome back, {user.fullName}! 👋
// // // // //               </h1>
// // // // //               <p className="text-muted-foreground">
// // // // //                 Continue your learning journey and track your progress.
// // // // //               </p>
// // // // //             </div>
// // // // //             <div className="flex gap-2 flex-wrap">
// // // // //               <Dialog open={isProfileDialogOpen} onOpenChange={setIsProfileDialogOpen}>
// // // // //                 <DialogTrigger asChild>
// // // // //                   <Button variant="outline" className="flex items-center gap-2">
// // // // //                     <User className="w-4 h-4" />
// // // // //                     Profile
// // // // //                   </Button>
// // // // //                 </DialogTrigger>
// // // // //                 <DialogContent>
// // // // //                   <DialogHeader>
// // // // //                     <DialogTitle>Edit Profile</DialogTitle>
// // // // //                     <DialogDescription>
// // // // //                       Update your profile information
// // // // //                     </DialogDescription>
// // // // //                   </DialogHeader>
// // // // //                   <div className="space-y-4">
// // // // //                     <div className="space-y-2">
// // // // //                       <Label htmlFor="fullName">Full Name</Label>
// // // // //                       <Input
// // // // //                         id="fullName"
// // // // //                         value={profileData.fullName}
// // // // //                         onChange={(e) => setProfileData(prev => ({ ...prev, fullName: e.target.value }))}
// // // // //                         placeholder="Enter your full name"
// // // // //                       />
// // // // //                     </div>
// // // // //                     <div className="space-y-2">
// // // // //                       <Label htmlFor="email">Email (Cannot be changed)</Label>
// // // // //                       <Input
// // // // //                         id="email"
// // // // //                         value={profileData.email}
// // // // //                         disabled
// // // // //                         className="bg-muted"
// // // // //                       />
// // // // //                     </div>
// // // // //                     <div className="space-y-2">
// // // // //                       <Label htmlFor="location">Location</Label>
// // // // //                       <Input
// // // // //                         id="location"
// // // // //                         value={profileData.location}
// // // // //                         onChange={(e) => setProfileData(prev => ({ ...prev, location: e.target.value }))}
// // // // //                         placeholder="Enter your location"
// // // // //                       />
// // // // //                     </div>
// // // // //                     <div className="flex gap-2">
// // // // //                       <Button onClick={updateProfile} disabled={isLoading} className="flex-1">
// // // // //                         {isLoading ? 'Updating...' : 'Update Profile'}
// // // // //                       </Button>
// // // // //                       <Button variant="outline" onClick={() => setIsProfileDialogOpen(false)}>
// // // // //                         Cancel
// // // // //                       </Button>
// // // // //                     </div>
// // // // //                   </div>
// // // // //                 </DialogContent>
// // // // //               </Dialog>

// // // // //               <Dialog open={isPasswordDialogOpen} onOpenChange={setIsPasswordDialogOpen}>
// // // // //                 <DialogTrigger asChild>
// // // // //                   <Button variant="outline" className="flex items-center gap-2">
// // // // //                     <Lock className="w-4 h-4" />
// // // // //                     Change Password
// // // // //                   </Button>
// // // // //                 </DialogTrigger>
// // // // //                 <DialogContent>
// // // // //                   <DialogHeader>
// // // // //                     <DialogTitle>Change Password</DialogTitle>
// // // // //                     <DialogDescription>
// // // // //                       Enter your current password and choose a new one
// // // // //                     </DialogDescription>
// // // // //                   </DialogHeader>
// // // // //                   <div className="space-y-4">
// // // // //                     <div className="space-y-2">
// // // // //                       <Label htmlFor="currentPassword">Current Password</Label>
// // // // //                       <div className="relative">
// // // // //                         <Input
// // // // //                           id="currentPassword"
// // // // //                           type={showPasswords.current ? 'text' : 'password'}
// // // // //                           value={passwordData.currentPassword}
// // // // //                           onChange={(e) => setPasswordData(prev => ({ ...prev, currentPassword: e.target.value }))}
// // // // //                           placeholder="Enter current password"
// // // // //                           className="pr-10"
// // // // //                         />
// // // // //                         <button
// // // // //                           type="button"
// // // // //                           onClick={() => setShowPasswords(prev => ({ ...prev, current: !prev.current }))}
// // // // //                           className="absolute right-3 top-3 text-muted-foreground hover:text-primary"
// // // // //                         >
// // // // //                           {showPasswords.current ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
// // // // //                         </button>
// // // // //                       </div>
// // // // //                     </div>
// // // // //                     <div className="space-y-2">
// // // // //                       <Label htmlFor="newPassword">New Password</Label>
// // // // //                       <div className="relative">
// // // // //                         <Input
// // // // //                           id="newPassword"
// // // // //                           type={showPasswords.new ? 'text' : 'password'}
// // // // //                           value={passwordData.newPassword}
// // // // //                           onChange={(e) => setPasswordData(prev => ({ ...prev, newPassword: e.target.value }))}
// // // // //                           placeholder="Enter new password"
// // // // //                           className="pr-10"
// // // // //                         />
// // // // //                         <button
// // // // //                           type="button"
// // // // //                           onClick={() => setShowPasswords(prev => ({ ...prev, new: !prev.new }))}
// // // // //                           className="absolute right-3 top-3 text-muted-foreground hover:text-primary"
// // // // //                         >
// // // // //                           {showPasswords.new ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
// // // // //                         </button>
// // // // //                       </div>
// // // // //                     </div>
// // // // //                     <div className="space-y-2">
// // // // //                       <Label htmlFor="confirmPassword">Confirm New Password</Label>
// // // // //                       <div className="relative">
// // // // //                         <Input
// // // // //                           id="confirmPassword"
// // // // //                           type={showPasswords.confirm ? 'text' : 'password'}
// // // // //                           value={passwordData.confirmPassword}
// // // // //                           onChange={(e) => setPasswordData(prev => ({ ...prev, confirmPassword: e.target.value }))}
// // // // //                           placeholder="Confirm new password"
// // // // //                           className="pr-10"
// // // // //                         />
// // // // //                         <button
// // // // //                           type="button"
// // // // //                           onClick={() => setShowPasswords(prev => ({ ...prev, confirm: !prev.confirm }))}
// // // // //                           className="absolute right-3 top-3 text-muted-foreground hover:text-primary"
// // // // //                         >
// // // // //                           {showPasswords.confirm ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
// // // // //                         </button>
// // // // //                       </div>
// // // // //                     </div>
// // // // //                     <div className="flex gap-2">
// // // // //                       <Button onClick={changePassword} disabled={isLoading} className="flex-1">
// // // // //                         {isLoading ? 'Changing...' : 'Change Password'}
// // // // //                       </Button>
// // // // //                       <Button variant="outline" onClick={() => setIsPasswordDialogOpen(false)}>
// // // // //                         Cancel
// // // // //                       </Button>
// // // // //                     </div>
// // // // //                   </div>
// // // // //                 </DialogContent>
// // // // //               </Dialog>

// // // // //               <Button variant="outline" onClick={handleLogout} className="flex items-center gap-2 text-red-600 hover:text-red-700">
// // // // //                 <LogOut className="w-4 h-4" />
// // // // //                 Logout
// // // // //               </Button>
// // // // //             </div>
// // // // //           </motion.div>

// // // // //           {/* Stats Cards */}
// // // // //           <motion.div
// // // // //             className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
// // // // //             initial={{ opacity: 0, y: 20 }}
// // // // //             animate={{ opacity: 1, y: 0 }}
// // // // //             transition={{ duration: 0.6, delay: 0.1 }}
// // // // //           >
// // // // //             {stats.map((stat, index) => (
// // // // //               <Card key={stat.title} className="hover:shadow-lg transition-shadow">
// // // // //                 <CardContent className="p-6">
// // // // //                   <div className="flex items-center justify-between">
// // // // //                     <div>
// // // // //                       <p className="text-sm text-muted-foreground mb-1">{stat.title}</p>
// // // // //                       <p className="text-2xl font-bold">{stat.value}</p>
// // // // //                     </div>
// // // // //                     <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${stat.bgColor}`}>
// // // // //                       <stat.icon className={`w-6 h-6 ${stat.color}`} />
// // // // //                     </div>
// // // // //                   </div>
// // // // //                 </CardContent>
// // // // //               </Card>
// // // // //             ))}
// // // // //           </motion.div>

// // // // //           <div className="grid lg:grid-cols-3 gap-8">
// // // // //             {/* Main Content */}
// // // // //             <div className="lg:col-span-2 space-y-8">
// // // // //               {/* Course Tabs */}
// // // // //               <motion.div
// // // // //                 initial={{ opacity: 0, y: 20 }}
// // // // //                 animate={{ opacity: 1, y: 0 }}
// // // // //                 transition={{ duration: 0.6, delay: 0.2 }}
// // // // //               >
// // // // //                 <Tabs defaultValue="enrolled" className="w-full">
// // // // //                   <TabsList className="grid w-full grid-cols-3">
// // // // //                     <TabsTrigger value="enrolled">Enrolled</TabsTrigger>
// // // // //                     <TabsTrigger value="completed">Completed</TabsTrigger>
// // // // //                     <TabsTrigger value="certificates">Certificates</TabsTrigger>
// // // // //                   </TabsList>

// // // // //                   <TabsContent value="enrolled" className="mt-6">
// // // // //                     <div className="space-y-4">
// // // // //                       {enrolledCourses.filter(course => !course.completed).map((course) => (
// // // // //                         <Card key={course.id} className="hover:shadow-lg transition-shadow">
// // // // //                           <CardContent className="p-6">
// // // // //                             <div className="flex items-start gap-4">
// // // // //                               <img
// // // // //                                 src={course.thumbnail || 'https://images.pexels.com/photos/5212345/pexels-photo-5212345.jpeg'}
// // // // //                                 alt={course.title}
// // // // //                                 className="w-20 h-20 rounded-lg object-cover"
// // // // //                               />
// // // // //                               <div className="flex-1">
// // // // //                                 <h3 className="font-semibold text-lg mb-2">{course.title}</h3>
// // // // //                                 <p className="text-muted-foreground text-sm mb-3 line-clamp-2">{course.description}</p>
// // // // //                                 <div className="flex items-center gap-4 mb-3">
// // // // //                                   <Badge variant="secondary">{course.category}</Badge>
// // // // //                                   <div className="flex items-center gap-1 text-sm text-muted-foreground">
// // // // //                                     <Clock className="w-4 h-4" />
// // // // //                                     {course.duration}
// // // // //                                   </div>
// // // // //                                   {course.certificateEligible && (
// // // // //                                     <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100">
// // // // //                                       <Award className="w-3 h-3 mr-1" />
// // // // //                                       Certificate Ready
// // // // //                                     </Badge>
// // // // //                                   )}
// // // // //                                 </div>
// // // // //                                 <div className="space-y-2">
// // // // //                                   <div className="flex justify-between items-center text-sm">
// // // // //                                     <span>Progress</span>
// // // // //                                     <span>{course.progress}%</span>
// // // // //                                   </div>
// // // // //                                   <Progress value={course.progress} className="w-full" />
// // // // //                                 </div>
// // // // //                               </div>
// // // // //                               <div className="flex flex-col gap-2">
// // // // //                                 <Link href={`/course/${course.id}`}>
// // // // //                                   <Button className="flex items-center gap-2 w-full">
// // // // //                                     <Play className="w-4 h-4" />
// // // // //                                     Continue
// // // // //                                   </Button>
// // // // //                                 </Link>
// // // // //                                 {course.certificateEligible && (
// // // // //                                   <Button 
// // // // //                                     variant="outline" 
// // // // //                                     size="sm" 
// // // // //                                     className="text-xs"
// // // // //                                     onClick={() => downloadCertificate(course.id)}
// // // // //                                   >
// // // // //                                     <Download className="w-3 h-3 mr-1" />
// // // // //                                     Certificate
// // // // //                                   </Button>
// // // // //                                 )}
// // // // //                               </div>
// // // // //                             </div>
// // // // //                           </CardContent>
// // // // //                         </Card>
// // // // //                       ))}

// // // // //                       {enrolledCourses.filter(course => !course.completed).length === 0 && (
// // // // //                         <Card>
// // // // //                           <CardContent className="p-12 text-center">
// // // // //                             <BookOpen className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
// // // // //                             <p className="text-muted-foreground mb-4">No enrolled courses yet.</p>
// // // // //                             <Link href="/courses">
// // // // //                               <Button>Browse Courses</Button>
// // // // //                             </Link>
// // // // //                           </CardContent>
// // // // //                         </Card>
// // // // //                       )}
// // // // //                     </div>
// // // // //                   </TabsContent>

// // // // //                   <TabsContent value="completed" className="mt-6">
// // // // //                     <div className="space-y-4">
// // // // //                       {enrolledCourses.filter(course => course.completed).map((course) => (
// // // // //                         <Card key={course.id} className="hover:shadow-lg transition-shadow">
// // // // //                           <CardContent className="p-6">
// // // // //                             <div className="flex items-start gap-4">
// // // // //                               <img
// // // // //                                 src={course.thumbnail || 'https://images.pexels.com/photos/5212345/pexels-photo-5212345.jpeg'}
// // // // //                                 alt={course.title}
// // // // //                                 className="w-20 h-20 rounded-lg object-cover"
// // // // //                               />
// // // // //                               <div className="flex-1">
// // // // //                                 <h3 className="font-semibold text-lg mb-2">{course.title}</h3>
// // // // //                                 <p className="text-muted-foreground text-sm mb-3 line-clamp-2">{course.description}</p>
// // // // //                                 <div className="flex items-center gap-4">
// // // // //                                   <Badge variant="secondary" className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100">
// // // // //                                     <CheckCircle className="w-3 h-3 mr-1" />
// // // // //                                     Completed
// // // // //                                   </Badge>
// // // // //                                   <div className="flex items-center gap-1 text-sm text-muted-foreground">
// // // // //                                     <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
// // // // //                                     Rate Course
// // // // //                                   </div>
// // // // //                                 </div>
// // // // //                               </div>
// // // // //                               <div className="flex flex-col gap-2">
// // // // //                                 <Link href={`/course/${course.id}`}>
// // // // //                                   <Button variant="outline" className="flex items-center gap-2">
// // // // //                                     <ExternalLink className="w-4 h-4" />
// // // // //                                     Review
// // // // //                                   </Button>
// // // // //                                 </Link>
// // // // //                                 <Button
// // // // //                                   variant="outline"
// // // // //                                   className="flex items-center gap-2"
// // // // //                                   onClick={() => downloadCertificate(course.id)}
// // // // //                                   disabled={!course.canDownloadCertificate}
// // // // //                                 >
// // // // //                                   <Download className="w-4 h-4" />
// // // // //                                   Certificate
// // // // //                                 </Button>
// // // // //                               </div>
// // // // //                             </div>
// // // // //                           </CardContent>
// // // // //                         </Card>
// // // // //                       ))}

// // // // //                       {enrolledCourses.filter(course => course.completed).length === 0 && (
// // // // //                         <Card>
// // // // //                           <CardContent className="p-12 text-center">
// // // // //                             <Award className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
// // // // //                             <p className="text-muted-foreground">No completed courses yet.</p>
// // // // //                             <p className="text-sm text-muted-foreground mt-2">
// // // // //                               Complete your enrolled courses to earn certificates!
// // // // //                             </p>
// // // // //                           </CardContent>
// // // // //                         </Card>
// // // // //                       )}
// // // // //                     </div>
// // // // //                   </TabsContent>

// // // // //                   <TabsContent value="certificates" className="mt-6">
// // // // //                     <div className="space-y-4">
// // // // //                       {enrolledCourses.filter(course => course.canDownloadCertificate || course.certificateEligible).map((course) => (
// // // // //                         <Card key={course.id} className="hover:shadow-lg transition-shadow">
// // // // //                           <CardContent className="p-6">
// // // // //                             <div className="flex items-center justify-between">
// // // // //                               <div className="flex items-center gap-4">
// // // // //                                 <div className="w-16 h-16 bg-gradient-to-br from-primary to-blue-600 rounded-lg flex items-center justify-center">
// // // // //                                   <Award className="w-8 h-8 text-white" />
// // // // //                                 </div>
// // // // //                                 <div>
// // // // //                                   <h3 className="font-semibold text-lg">{course.title}</h3>
// // // // //                                   <p className="text-muted-foreground">
// // // // //                                     Progress: {course.progress}%
// // // // //                                   </p>
// // // // //                                   <p className="text-sm text-muted-foreground">
// // // // //                                     {course.completed ? 'Course Completed' : 'Certificate Available'}
// // // // //                                   </p>
// // // // //                                 </div>
// // // // //                               </div>
// // // // //                               <div className="flex flex-col gap-2">
// // // // //                                 <Button
// // // // //                                   className="flex items-center gap-2"
// // // // //                                   onClick={() => downloadCertificate(course.id)}
// // // // //                                 >
// // // // //                                   <Download className="w-4 h-4" />
// // // // //                                   Download
// // // // //                                 </Button>
// // // // //                                 <Link href={`/course/${course.id}`}>
// // // // //                                   <Button variant="outline" size="sm" className="w-full">
// // // // //                                     View Course
// // // // //                                   </Button>
// // // // //                                 </Link>
// // // // //                               </div>
// // // // //                             </div>
// // // // //                           </CardContent>
// // // // //                         </Card>
// // // // //                       ))}

// // // // //                       {enrolledCourses.filter(course => course.canDownloadCertificate || course.certificateEligible).length === 0 && (
// // // // //                         <Card>
// // // // //                           <CardContent className="p-12 text-center">
// // // // //                             <Award className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
// // // // //                             <p className="text-muted-foreground">No certificates available yet.</p>
// // // // //                             <p className="text-sm text-muted-foreground mt-2">
// // // // //                               Certificates become available after completing 40% of a course.
// // // // //                             </p>
// // // // //                           </CardContent>
// // // // //                         </Card>
// // // // //                       )}
// // // // //                     </div>
// // // // //                   </TabsContent>
// // // // //                 </Tabs>
// // // // //               </motion.div>
// // // // //             </div>

// // // // //             {/* Sidebar */}
// // // // //             <div className="space-y-6">
// // // // //               {/* Referral Card */}
// // // // //               <motion.div
// // // // //                 initial={{ opacity: 0, x: 20 }}
// // // // //                 animate={{ opacity: 1, x: 0 }}
// // // // //                 transition={{ duration: 0.6, delay: 0.3 }}
// // // // //               >
// // // // //                 <Card>
// // // // //                   <CardHeader>
// // // // //                     <CardTitle className="flex items-center gap-2">
// // // // //                       <Gift className="w-5 h-5" />
// // // // //                       Refer & Earn
// // // // //                     </CardTitle>
// // // // //                     <CardDescription>
// // // // //                       Earn credits when your friends join and purchase courses
// // // // //                     </CardDescription>
// // // // //                   </CardHeader>
// // // // //                   <CardContent className="space-y-4">
// // // // //                     <div className="p-3 bg-primary/10 rounded-lg text-center">
// // // // //                       <p className="text-2xl font-bold text-primary">{userStats.credits}</p>
// // // // //                       <p className="text-sm text-muted-foreground">Available Credits</p>
// // // // //                     </div>

// // // // //                     <div className="space-y-2">
// // // // //                       <Label htmlFor="referral-code">Your Referral Code</Label>
// // // // //                       <div className="flex gap-2">
// // // // //                         <Input
// // // // //                           id="referral-code"
// // // // //                           value={referralCode}
// // // // //                           readOnly
// // // // //                           className="font-mono"
// // // // //                         />
// // // // //                         <Button
// // // // //                           size="sm"
// // // // //                           variant="outline"
// // // // //                           onClick={copyReferralLink}
// // // // //                         >
// // // // //                           <Copy className="w-4 h-4" />
// // // // //                         </Button>
// // // // //                       </div>
// // // // //                     </div>

// // // // //                     <div className="text-sm text-muted-foreground">
// // // // //                       <p>• Earn 100 credits per successful referral</p>
// // // // //                       <p>• Use credits for discounts on courses</p>
// // // // //                     </div>
// // // // //                   </CardContent>
// // // // //                 </Card>
// // // // //               </motion.div>

// // // // //               {/* Recent Activity */}
// // // // //               <motion.div
// // // // //                 initial={{ opacity: 0, x: 20 }}
// // // // //                 animate={{ opacity: 1, x: 0 }}
// // // // //                 transition={{ duration: 0.6, delay: 0.4 }}
// // // // //               >
// // // // //                 <Card>
// // // // //                   <CardHeader>
// // // // //                     <CardTitle className="flex items-center gap-2">
// // // // //                       <TrendingUp className="w-5 h-5" />
// // // // //                       Recent Activity
// // // // //                     </CardTitle>
// // // // //                   </CardHeader>
// // // // //                   <CardContent className="space-y-4">
// // // // //                     {recentActivity.length > 0 ? (
// // // // //                       recentActivity.map((activity, index) => (
// // // // //                         <div key={index} className="flex items-start gap-3 p-3 rounded-lg bg-muted/50">
// // // // //                           <div className="w-2 h-2 bg-primary rounded-full mt-2" />
// // // // //                           <div className="flex-1">
// // // // //                             <p className="text-sm font-medium">{activity.title}</p>
// // // // //                             <p className="text-xs text-muted-foreground">{activity.description}</p>
// // // // //                             <p className="text-xs text-muted-foreground mt-1">{activity.timestamp}</p>
// // // // //                           </div>
// // // // //                         </div>
// // // // //                       ))
// // // // //                     ) : (
// // // // //                       <p className="text-sm text-muted-foreground text-center py-4">
// // // // //                         No recent activity
// // // // //                       </p>
// // // // //                     )}
// // // // //                   </CardContent>
// // // // //                 </Card>
// // // // //               </motion.div>
// // // // //             </div>
// // // // //           </div>
// // // // //         </div>
// // // // //       </main>
// // // // //     </div>
// // // // //   );
// // // // // }

// // // // 'use client';

// // // // import { useState, useEffect } from 'react';
// // // // import { motion } from 'framer-motion';
// // // // import {
// // // //   BookOpen,
// // // //   Award,
// // // //   Clock,
// // // //   TrendingUp,
// // // //   Play,
// // // //   Download,
// // // //   Users,
// // // //   Star,
// // // //   Gift,
// // // //   Copy,
// // // //   CheckCircle,
// // // //   Settings,
// // // //   User,
// // // //   CreditCard,
// // // //   Bell,
// // // //   Lock,
// // // //   Eye,
// // // //   EyeOff,
// // // //   LogOut,
// // // //   ExternalLink
// // // // } from 'lucide-react';
// // // // import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
// // // // import { Button } from '@/components/ui/button';
// // // // import { Badge } from '@/components/ui/badge';
// // // // import { Progress } from '@/components/ui/progress';
// // // // import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
// // // // import { Input } from '@/components/ui/input';
// // // // import { Label } from '@/components/ui/label';
// // // // import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
// // // // import { toast } from 'sonner';
// // // // import { useAuth } from '@/components/auth-provider';
// // // // import Navbar from '@/components/navbar';
// // // // import { useRouter } from 'next/navigation';
// // // // import Link from 'next/link';

// // // // export default function Dashboard() {
// // // //   const { user, logout, loading } = useAuth();
// // // //   const router = useRouter();
// // // //   const [userStats, setUserStats] = useState({
// // // //     enrolledCourses: 0,
// // // //     completedCourses: 0,
// // // //     certificatesEarned: 0,
// // // //     totalWatchTime: 0,
// // // //     credits: 0
// // // //   });
// // // //   const [enrolledCourses, setEnrolledCourses] = useState([]);
// // // //   const [recentActivity, setRecentActivity] = useState([]);
// // // //   const [referralCode, setReferralCode] = useState('');
// // // //   const [profileData, setProfileData] = useState({
// // // //     fullName: '',
// // // //     email: '',
// // // //     location: '',
// // // //   });
// // // //   const [passwordData, setPasswordData] = useState({
// // // //     currentPassword: '',
// // // //     newPassword: '',
// // // //     confirmPassword: '',
// // // //   });
// // // //   const [showPasswords, setShowPasswords] = useState({
// // // //     current: false,
// // // //     new: false,
// // // //     confirm: false,
// // // //   });
// // // //   const [isProfileDialogOpen, setIsProfileDialogOpen] = useState(false);
// // // //   const [isPasswordDialogOpen, setIsPasswordDialogOpen] = useState(false);
// // // //   const [isLoading, setIsLoading] = useState(false);
// // // //   const [isDashboardLoading, setIsDashboardLoading] = useState(true);

// // // //   // Redirect to login if not authenticated
// // // //   useEffect(() => {
// // // //     if (!loading && !user) {
// // // //       console.log('User not authenticated, redirecting to login');
// // // //       router.replace('/auth/login');
// // // //       return;
// // // //     }

// // // //     if (user) {
// // // //       console.log('Dashboard loaded for user:', user.id);
// // // //       fetchUserData();
// // // //       setReferralCode(user.referralCode || '');
// // // //       setProfileData({
// // // //         fullName: user.fullName || '',
// // // //         email: user.email || '',
// // // //         location: user.location || '',
// // // //       });
// // // //     }
// // // //   }, [user, loading, router]);

// // // //   const fetchUserData = async () => {
// // // //     try {
// // // //       setIsDashboardLoading(true);

// // // //       const response = await fetch('/api/user/dashboard', {
// // // //         credentials: 'include',
// // // //       });

// // // //       if (response.ok) {
// // // //         const data = await response.json();
// // // //         console.log('Dashboard data received:', data);
// // // //         setUserStats(data.stats);
// // // //         setEnrolledCourses(data.enrolledCourses);
// // // //         setRecentActivity(data.recentActivity);
// // // //       } else if (response.status === 401) {
// // // //         // Token expired, logout user
// // // //         console.log('Token expired, logging out');
// // // //         logout();
// // // //       } else {
// // // //         const errorData = await response.json();
// // // //         console.error('Dashboard API error:', errorData);
// // // //         toast.error('Failed to load dashboard data');
// // // //       }
// // // //     } catch (error) {
// // // //       console.error('Error fetching user data:', error);
// // // //       toast.error('Something went wrong while loading your dashboard');
// // // //     } finally {
// // // //       setIsDashboardLoading(false);
// // // //     }
// // // //   };

// // // //   const updateProfile = async () => {
// // // //     if (!profileData.fullName || !profileData.location) {
// // // //       toast.error('Please fill in all required fields');
// // // //       return;
// // // //     }

// // // //     setIsLoading(true);
// // // //     try {
// // // //       const response = await fetch('/api/user/profile', {
// // // //         method: 'PUT',
// // // //         headers: {
// // // //           'Content-Type': 'application/json',
// // // //         },
// // // //         credentials: 'include',
// // // //         body: JSON.stringify(profileData),
// // // //       });

// // // //       if (response.ok) {
// // // //         toast.success('Profile updated successfully!');
// // // //         setIsProfileDialogOpen(false);
// // // //         // Refresh user data
// // // //         fetchUserData();
// // // //       } else {
// // // //         const data = await response.json();
// // // //         toast.error(data.message || 'Failed to update profile');
// // // //       }
// // // //     } catch (error) {
// // // //       console.error('Error updating profile:', error);
// // // //       toast.error('Something went wrong. Please try again.');
// // // //     } finally {
// // // //       setIsLoading(false);
// // // //     }
// // // //   };
// // // //   const changePassword = async () => {
// // // //     if (!passwordData.currentPassword || !passwordData.newPassword || !passwordData.confirmPassword) {
// // // //       toast.error('Please fill in all fields');
// // // //       return;
// // // //     }

// // // //     if (passwordData.newPassword !== passwordData.confirmPassword) {
// // // //       toast.error('New passwords do not match');
// // // //       return;
// // // //     }

// // // //     if (passwordData.newPassword.length < 6) {
// // // //       toast.error('Password must be at least 6 characters long');
// // // //       return;
// // // //     }

// // // //     setIsLoading(true);
// // // //     try {
// // // //       const response = await fetch('/api/user/change-password', {
// // // //         method: 'POST',
// // // //         headers: {
// // // //           'Content-Type': 'application/json',
// // // //         },
// // // //         credentials: 'include',
// // // //         body: JSON.stringify({
// // // //           currentPassword: passwordData.currentPassword,
// // // //           newPassword: passwordData.newPassword,
// // // //         }),
// // // //       });

// // // //       const data = await response.json();

// // // //       if (response.ok && data.requireOTP) {
// // // //         // Show OTP input
// // // //         const otp = prompt('Enter the OTP sent to your email:');
// // // //         if (otp) {
// // // //           await verifyOtpAndChangePassword(otp);
// // // //         }
// // // //       } else if (response.ok) {
// // // //         toast.success('Password changed successfully!');
// // // //         setIsPasswordDialogOpen(false);
// // // //         setPasswordData({
// // // //           currentPassword: '',
// // // //           newPassword: '',
// // // //           confirmPassword: '',
// // // //         });
// // // //       } else {
// // // //         toast.error(data.message || 'Failed to change password');
// // // //       }
// // // //     } catch (error) {
// // // //       console.error('Error changing password:', error);
// // // //       toast.error('Something went wrong. Please try again.');
// // // //     } finally {
// // // //       setIsLoading(false);
// // // //     }
// // // //   };

// // // //   const verifyOtpAndChangePassword = async (otp) => {
// // // //     try {
// // // //       const response = await fetch('/api/user/change-password', {
// // // //         method: 'POST',
// // // //         headers: {
// // // //           'Content-Type': 'application/json',
// // // //         },
// // // //         credentials: 'include',
// // // //         body: JSON.stringify({
// // // //           otp,
// // // //           isOtpVerification: true,
// // // //         }),
// // // //       });

// // // //       const data = await response.json();

// // // //       if (response.ok) {
// // // //         toast.success('Password changed successfully!');
// // // //         setIsPasswordDialogOpen(false);
// // // //         setPasswordData({
// // // //           currentPassword: '',
// // // //           newPassword: '',
// // // //           confirmPassword: '',
// // // //         });
// // // //       } else {
// // // //         toast.error(data.message || 'OTP verification failed');
// // // //       }
// // // //     } catch (error) {
// // // //       console.error('Error verifying OTP:', error);
// // // //       toast.error('Something went wrong. Please try again.');
// // // //     }
// // // //   };
// // // //   // const changePassword = async () => {
// // // //   //   if (!passwordData.currentPassword || !passwordData.newPassword || !passwordData.confirmPassword) {
// // // //   //     toast.error('Please fill in all fields');
// // // //   //     return;
// // // //   //   }

// // // //   //   if (passwordData.newPassword !== passwordData.confirmPassword) {
// // // //   //     toast.error('New passwords do not match');
// // // //   //     return;
// // // //   //   }

// // // //   //   if (passwordData.newPassword.length < 6) {
// // // //   //     toast.error('Password must be at least 6 characters long');
// // // //   //     return;
// // // //   //   }

// // // //   //   setIsLoading(true);
// // // //   //   try {
// // // //   //     const response = await fetch('/api/user/change-password', {
// // // //   //       method: 'POST',
// // // //   //       headers: {
// // // //   //         'Content-Type': 'application/json',
// // // //   //       },
// // // //   //       credentials: 'include',
// // // //   //       body: JSON.stringify(passwordData),
// // // //   //     });

// // // //   //     if (response.ok) {
// // // //   //       toast.success('Password changed successfully!');
// // // //   //       setIsPasswordDialogOpen(false);
// // // //   //       setPasswordData({
// // // //   //         currentPassword: '',
// // // //   //         newPassword: '',
// // // //   //         confirmPassword: '',
// // // //   //       });
// // // //   //     } else {
// // // //   //       const data = await response.json();
// // // //   //       toast.error(data.message || 'Failed to change password');
// // // //   //     }
// // // //   //   } catch (error) {
// // // //   //     console.error('Error changing password:', error);
// // // //   //     toast.error('Something went wrong. Please try again.');
// // // //   //   } finally {
// // // //   //     setIsLoading(false);
// // // //   //   }
// // // //   // };

// // // //   const copyReferralLink = () => {
// // // //     const referralLink = `${window.location.origin}/auth/register?ref=${referralCode}`;
// // // //     navigator.clipboard.writeText(referralLink);
// // // //     toast.success('Referral link copied to clipboard!');
// // // //   };

// // // //   // const downloadCertificate = async (courseId) => {
// // // //   //   try {
// // // //   //     const response = await fetch(`/api/certificates/download/${courseId}`, {
// // // //   //       credentials: 'include',
// // // //   //     });

// // // //   //     if (response.ok) {
// // // //   //       const blob = await response.blob();
// // // //   //       const url = window.URL.createObjectURL(blob);
// // // //   //       const a = document.createElement('a');
// // // //   //       a.style.display = 'none';
// // // //   //       a.href = url;

// // // //   //       // Get course name for filename
// // // //   //       const course = enrolledCourses.find(c => c.id === courseId);
// // // //   //       const filename = `${course?.title || 'course'}-certificate.pdf`;

// // // //   //       a.download = filename;
// // // //   //       document.body.appendChild(a);
// // // //   //       a.click();
// // // //   //       window.URL.revokeObjectURL(url);
// // // //   //       document.body.removeChild(a);
// // // //   //       toast.success('Certificate downloaded successfully!');
// // // //   //     } else {
// // // //   //       const data = await response.json();
// // // //   //       toast.error(data.error || 'Error downloading certificate');
// // // //   //     }
// // // //   //   } catch (error) {
// // // //   //     console.error('Error downloading certificate:', error);
// // // //   //     toast.error('Error downloading certificate');
// // // //   //   }
// // // //   // };
// // // //   const downloadCertificate = async (courseId) => {
// // // //     try {
// // // //       console.log('Downloading certificate for courseId:', courseId);

// // // //       if (!courseId) {
// // // //         toast.error('Invalid course ID');
// // // //         return;
// // // //       }

// // // //       const url = `/api/certificates/download/${courseId}`;
// // // //       console.log('Making request to:', url);

// // // //       const response = await fetch(url, {
// // // //         credentials: 'include',
// // // //       });

// // // //       console.log('Response status:', response.status);
// // // //       console.log('Response headers:', response.headers);

// // // //       if (response.ok) {
// // // //         const blob = await response.blob();
// // // //         const url = window.URL.createObjectURL(blob);
// // // //         const a = document.createElement('a');
// // // //         a.style.display = 'none';
// // // //         a.href = url;

// // // //         // Get course name for filename
// // // //         const course = enrolledCourses.find(c => c.id === courseId);
// // // //         const filename = `${course?.title || 'course'}-certificate.pdf`;

// // // //         a.download = filename;
// // // //         document.body.appendChild(a);
// // // //         a.click();
// // // //         window.URL.revokeObjectURL(url);
// // // //         document.body.removeChild(a);
// // // //         toast.success('Certificate downloaded successfully!');
// // // //       } else {
// // // //         const data = await response.json();
// // // //         console.error('Error response:', data);
// // // //         toast.error(data.error || 'Error downloading certificate');
// // // //       }
// // // //     } catch (error) {
// // // //       console.error('Error downloading certificate:', error);
// // // //       toast.error('Error downloading certificate');
// // // //     }
// // // //   };
// // // //   const handleLogout = async () => {
// // // //     try {
// // // //       console.log('Logging out from dashboard...');
// // // //       await logout();
// // // //       toast.success('Logged out successfully');
// // // //     } catch (error) {
// // // //       console.error('Logout error:', error);
// // // //       toast.error('Error logging out');
// // // //     }
// // // //   };

// // // //   const handleContinueCourse = (courseId) => {
// // // //     console.log('Navigating to course:', courseId);
// // // //     router.push(`/course/${courseId}`);
// // // //   };

// // // //   const stats = [
// // // //     {
// // // //       title: 'Enrolled Courses',
// // // //       value: userStats.enrolledCourses,
// // // //       icon: BookOpen,
// // // //       color: 'text-blue-600',
// // // //       bgColor: 'bg-blue-50 dark:bg-blue-950'
// // // //     },
// // // //     {
// // // //       title: 'Completed',
// // // //       value: userStats.completedCourses,
// // // //       icon: CheckCircle,
// // // //       color: 'text-green-600',
// // // //       bgColor: 'bg-green-50 dark:bg-green-950'
// // // //     },
// // // //     {
// // // //       title: 'Certificates',
// // // //       value: userStats.certificatesEarned,
// // // //       icon: Award,
// // // //       color: 'text-purple-600',
// // // //       bgColor: 'bg-purple-50 dark:bg-purple-950'
// // // //     },
// // // //     {
// // // //       title: 'Credits',
// // // //       value: userStats.credits,
// // // //       icon: Gift,
// // // //       color: 'text-orange-600',
// // // //       bgColor: 'bg-orange-50 dark:bg-orange-950'
// // // //     }
// // // //   ];

// // // //   if (loading || isDashboardLoading) {
// // // //     return (
// // // //       <div className="min-h-screen flex items-center justify-center">
// // // //         <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
// // // //       </div>
// // // //     );
// // // //   }

// // // //   if (!user) {
// // // //     return null; // Will redirect in useEffect
// // // //   }

// // // //   return (
// // // //     <div className="min-h-screen bg-background">
// // // //       <Navbar />

// // // //       <main className="pt-20 pb-12">
// // // //         <div className="container mx-auto px-4">
// // // //           {/* Header with Profile Actions */}
// // // //           <motion.div
// // // //             className="mb-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4"
// // // //             initial={{ opacity: 0, y: 20 }}
// // // //             animate={{ opacity: 1, y: 0 }}
// // // //             transition={{ duration: 0.6 }}
// // // //           >
// // // //             <div>
// // // //               <h1 className="text-3xl font-bold mb-2">
// // // //                 Welcome back, {user.fullName}! 👋
// // // //               </h1>
// // // //               <p className="text-muted-foreground">
// // // //                 Continue your learning journey and track your progress.
// // // //               </p>
// // // //             </div>
// // // //             <div className="flex gap-2 flex-wrap">
// // // //               <Dialog open={isProfileDialogOpen} onOpenChange={setIsProfileDialogOpen}>
// // // //                 <DialogTrigger asChild>
// // // //                   <Button variant="outline" className="flex items-center gap-2">
// // // //                     <User className="w-4 h-4" />
// // // //                     Profile
// // // //                   </Button>
// // // //                 </DialogTrigger>
// // // //                 <DialogContent>
// // // //                   <DialogHeader>
// // // //                     <DialogTitle>Edit Profile</DialogTitle>
// // // //                     <DialogDescription>
// // // //                       Update your profile information
// // // //                     </DialogDescription>
// // // //                   </DialogHeader>
// // // //                   <div className="space-y-4">
// // // //                     <div className="space-y-2">
// // // //                       <Label htmlFor="fullName">Full Name</Label>
// // // //                       <Input
// // // //                         id="fullName"
// // // //                         value={profileData.fullName}
// // // //                         onChange={(e) => setProfileData(prev => ({ ...prev, fullName: e.target.value }))}
// // // //                         placeholder="Enter your full name"
// // // //                       />
// // // //                     </div>
// // // //                     <div className="space-y-2">
// // // //                       <Label htmlFor="email">Email (Cannot be changed)</Label>
// // // //                       <Input
// // // //                         id="email"
// // // //                         value={profileData.email}
// // // //                         disabled
// // // //                         className="bg-muted"
// // // //                       />
// // // //                     </div>
// // // //                     <div className="space-y-2">
// // // //                       <Label htmlFor="location">Location</Label>
// // // //                       <Input
// // // //                         id="location"
// // // //                         value={profileData.location}
// // // //                         onChange={(e) => setProfileData(prev => ({ ...prev, location: e.target.value }))}
// // // //                         placeholder="Enter your location"
// // // //                       />
// // // //                     </div>
// // // //                     <div className="flex gap-2">
// // // //                       <Button onClick={updateProfile} disabled={isLoading} className="flex-1">
// // // //                         {isLoading ? 'Updating...' : 'Update Profile'}
// // // //                       </Button>
// // // //                       <Button variant="outline" onClick={() => setIsProfileDialogOpen(false)}>
// // // //                         Cancel
// // // //                       </Button>
// // // //                     </div>
// // // //                   </div>
// // // //                 </DialogContent>
// // // //               </Dialog>

// // // //               <Dialog open={isPasswordDialogOpen} onOpenChange={setIsPasswordDialogOpen}>
// // // //                 <DialogTrigger asChild>
// // // //                   <Button variant="outline" className="flex items-center gap-2">
// // // //                     <Lock className="w-4 h-4" />
// // // //                     Change Password
// // // //                   </Button>
// // // //                 </DialogTrigger>
// // // //                 <DialogContent>
// // // //                   <DialogHeader>
// // // //                     <DialogTitle>Change Password</DialogTitle>
// // // //                     <DialogDescription>
// // // //                       Enter your current password and choose a new one
// // // //                     </DialogDescription>
// // // //                   </DialogHeader>
// // // //                   <div className="space-y-4">
// // // //                     <div className="space-y-2">
// // // //                       <Label htmlFor="currentPassword">Current Password</Label>
// // // //                       <div className="relative">
// // // //                         <Input
// // // //                           id="currentPassword"
// // // //                           type={showPasswords.current ? 'text' : 'password'}
// // // //                           value={passwordData.currentPassword}
// // // //                           onChange={(e) => setPasswordData(prev => ({ ...prev, currentPassword: e.target.value }))}
// // // //                           placeholder="Enter current password"
// // // //                           className="pr-10"
// // // //                         />
// // // //                         <button
// // // //                           type="button"
// // // //                           onClick={() => setShowPasswords(prev => ({ ...prev, current: !prev.current }))}
// // // //                           className="absolute right-3 top-3 text-muted-foreground hover:text-primary"
// // // //                         >
// // // //                           {showPasswords.current ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
// // // //                         </button>
// // // //                       </div>
// // // //                     </div>
// // // //                     <div className="space-y-2">
// // // //                       <Label htmlFor="newPassword">New Password</Label>
// // // //                       <div className="relative">
// // // //                         <Input
// // // //                           id="newPassword"
// // // //                           type={showPasswords.new ? 'text' : 'password'}
// // // //                           value={passwordData.newPassword}
// // // //                           onChange={(e) => setPasswordData(prev => ({ ...prev, newPassword: e.target.value }))}
// // // //                           placeholder="Enter new password"
// // // //                           className="pr-10"
// // // //                         />
// // // //                         <button
// // // //                           type="button"
// // // //                           onClick={() => setShowPasswords(prev => ({ ...prev, new: !prev.new }))}
// // // //                           className="absolute right-3 top-3 text-muted-foreground hover:text-primary"
// // // //                         >
// // // //                           {showPasswords.new ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
// // // //                         </button>
// // // //                       </div>
// // // //                     </div>
// // // //                     <div className="space-y-2">
// // // //                       <Label htmlFor="confirmPassword">Confirm New Password</Label>
// // // //                       <div className="relative">
// // // //                         <Input
// // // //                           id="confirmPassword"
// // // //                           type={showPasswords.confirm ? 'text' : 'password'}
// // // //                           value={passwordData.confirmPassword}
// // // //                           onChange={(e) => setPasswordData(prev => ({ ...prev, confirmPassword: e.target.value }))}
// // // //                           placeholder="Confirm new password"
// // // //                           className="pr-10"
// // // //                         />
// // // //                         <button
// // // //                           type="button"
// // // //                           onClick={() => setShowPasswords(prev => ({ ...prev, confirm: !prev.confirm }))}
// // // //                           className="absolute right-3 top-3 text-muted-foreground hover:text-primary"
// // // //                         >
// // // //                           {showPasswords.confirm ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
// // // //                         </button>
// // // //                       </div>
// // // //                     </div>
// // // //                     <div className="flex gap-2">
// // // //                       <Button onClick={changePassword} disabled={isLoading} className="flex-1">
// // // //                         {isLoading ? 'Changing...' : 'Change Password'}
// // // //                       </Button>
// // // //                       <Button variant="outline" onClick={() => setIsPasswordDialogOpen(false)}>
// // // //                         Cancel
// // // //                       </Button>
// // // //                     </div>
// // // //                   </div>
// // // //                 </DialogContent>
// // // //               </Dialog>

// // // //               <Button variant="outline" onClick={handleLogout} className="flex items-center gap-2 text-red-600 hover:text-red-700">
// // // //                 <LogOut className="w-4 h-4" />
// // // //                 Logout
// // // //               </Button>
// // // //             </div>
// // // //           </motion.div>

// // // //           {/* Stats Cards */}
// // // //           <motion.div
// // // //             className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
// // // //             initial={{ opacity: 0, y: 20 }}
// // // //             animate={{ opacity: 1, y: 0 }}
// // // //             transition={{ duration: 0.6, delay: 0.1 }}
// // // //           >
// // // //             {stats.map((stat, index) => (
// // // //               <Card key={stat.title} className="hover:shadow-lg transition-shadow">
// // // //                 <CardContent className="p-6">
// // // //                   <div className="flex items-center justify-between">
// // // //                     <div>
// // // //                       <p className="text-sm text-muted-foreground mb-1">{stat.title}</p>
// // // //                       <p className="text-2xl font-bold">{stat.value}</p>
// // // //                     </div>
// // // //                     <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${stat.bgColor}`}>
// // // //                       <stat.icon className={`w-6 h-6 ${stat.color}`} />
// // // //                     </div>
// // // //                   </div>
// // // //                 </CardContent>
// // // //               </Card>
// // // //             ))}
// // // //           </motion.div>

// // // //           <div className="grid lg:grid-cols-3 gap-8">
// // // //             {/* Main Content */}
// // // //             <div className="lg:col-span-2 space-y-8">
// // // //               {/* Course Tabs */}
// // // //               <motion.div
// // // //                 initial={{ opacity: 0, y: 20 }}
// // // //                 animate={{ opacity: 1, y: 0 }}
// // // //                 transition={{ duration: 0.6, delay: 0.2 }}
// // // //               >
// // // //                 <Tabs defaultValue="enrolled" className="w-full">
// // // //                   <TabsList className="grid w-full grid-cols-3">
// // // //                     <TabsTrigger value="enrolled">Enrolled</TabsTrigger>
// // // //                     <TabsTrigger value="completed">Completed</TabsTrigger>
// // // //                     <TabsTrigger value="certificates">Certificates</TabsTrigger>
// // // //                   </TabsList>

// // // //                   <TabsContent value="enrolled" className="mt-6">
// // // //                     <div className="space-y-4">
// // // //                       {enrolledCourses.filter(course => !course.completed).map((course) => (
// // // //                         <Card key={course.id} className="hover:shadow-lg transition-shadow">
// // // //                           <CardContent className="p-6">
// // // //                             <div className="flex items-start gap-4">
// // // //                               <img
// // // //                                 src={course.thumbnail || 'https://images.pexels.com/photos/5212345/pexels-photo-5212345.jpeg'}
// // // //                                 alt={course.title}
// // // //                                 className="w-20 h-20 rounded-lg object-cover"
// // // //                               />
// // // //                               <div className="flex-1">
// // // //                                 <h3 className="font-semibold text-lg mb-2">{course.title}</h3>
// // // //                                 <p className="text-muted-foreground text-sm mb-3 line-clamp-2">{course.description}</p>
// // // //                                 <div className="flex items-center gap-4 mb-3">
// // // //                                   <Badge variant="secondary">{course.category}</Badge>
// // // //                                   <div className="flex items-center gap-1 text-sm text-muted-foreground">
// // // //                                     <Clock className="w-4 h-4" />
// // // //                                     {course.duration}
// // // //                                   </div>
// // // //                                   {course.certificateEligible && (
// // // //                                     <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100">
// // // //                                       <Award className="w-3 h-3 mr-1" />
// // // //                                       Certificate Ready
// // // //                                     </Badge>
// // // //                                   )}
// // // //                                 </div>
// // // //                                 <div className="space-y-2">
// // // //                                   <div className="flex justify-between items-center text-sm">
// // // //                                     <span>Progress</span>
// // // //                                     <span>{course.progress}%</span>
// // // //                                   </div>
// // // //                                   <Progress value={course.progress} className="w-full" />
// // // //                                 </div>
// // // //                               </div>
// // // //                               <div className="flex flex-col gap-2">
// // // //                                 <Button
// // // //                                   className="flex items-center gap-2"
// // // //                                   onClick={() => handleContinueCourse(course.id)}
// // // //                                 >
// // // //                                   <Play className="w-4 h-4" />
// // // //                                   Continue
// // // //                                 </Button>
// // // //                                 {course.certificateEligible && (
// // // //                                   <Button
// // // //                                     variant="outline"
// // // //                                     size="sm"
// // // //                                     className="text-xs"
// // // //                                     onClick={() => downloadCertificate(course.id)}
// // // //                                   >
// // // //                                     <Download className="w-3 h-3 mr-1" />
// // // //                                     Certificate
// // // //                                   </Button>
// // // //                                 )}
// // // //                               </div>
// // // //                             </div>
// // // //                           </CardContent>
// // // //                         </Card>
// // // //                       ))}

// // // //                       {enrolledCourses.filter(course => !course.completed).length === 0 && (
// // // //                         <Card>
// // // //                           <CardContent className="p-12 text-center">
// // // //                             <BookOpen className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
// // // //                             <p className="text-muted-foreground mb-4">No enrolled courses yet.</p>
// // // //                             <Link href="/courses">
// // // //                               <Button>Browse Courses</Button>
// // // //                             </Link>
// // // //                           </CardContent>
// // // //                         </Card>
// // // //                       )}
// // // //                     </div>
// // // //                   </TabsContent>

// // // //                   <TabsContent value="completed" className="mt-6">
// // // //                     <div className="space-y-4">
// // // //                       {enrolledCourses.filter(course => course.completed).map((course) => (
// // // //                         <Card key={course.id} className="hover:shadow-lg transition-shadow">
// // // //                           <CardContent className="p-6">
// // // //                             <div className="flex items-start gap-4">
// // // //                               <img
// // // //                                 src={course.thumbnail || 'https://images.pexels.com/photos/5212345/pexels-photo-5212345.jpeg'}
// // // //                                 alt={course.title}
// // // //                                 className="w-20 h-20 rounded-lg object-cover"
// // // //                               />
// // // //                               <div className="flex-1">
// // // //                                 <h3 className="font-semibold text-lg mb-2">{course.title}</h3>
// // // //                                 <p className="text-muted-foreground text-sm mb-3 line-clamp-2">{course.description}</p>
// // // //                                 <div className="flex items-center gap-4">
// // // //                                   <Badge variant="secondary" className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100">
// // // //                                     <CheckCircle className="w-3 h-3 mr-1" />
// // // //                                     Completed
// // // //                                   </Badge>
// // // //                                   <div className="flex items-center gap-1 text-sm text-muted-foreground">
// // // //                                     <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
// // // //                                     Rate Course
// // // //                                   </div>
// // // //                                 </div>
// // // //                               </div>
// // // //                               <div className="flex flex-col gap-2">
// // // //                                 <Button
// // // //                                   variant="outline"
// // // //                                   className="flex items-center gap-2"
// // // //                                   onClick={() => handleContinueCourse(course.id)}
// // // //                                 >
// // // //                                   <ExternalLink className="w-4 h-4" />
// // // //                                   Review
// // // //                                 </Button>
// // // //                                 <Button
// // // //                                   variant="outline"
// // // //                                   className="flex items-center gap-2"
// // // //                                   onClick={() => downloadCertificate(course.id)}
// // // //                                   disabled={!course.canDownloadCertificate}
// // // //                                 >
// // // //                                   <Download className="w-4 h-4" />
// // // //                                   Certificate
// // // //                                 </Button>
// // // //                               </div>
// // // //                             </div>
// // // //                           </CardContent>
// // // //                         </Card>
// // // //                       ))}

// // // //                       {enrolledCourses.filter(course => course.completed).length === 0 && (
// // // //                         <Card>
// // // //                           <CardContent className="p-12 text-center">
// // // //                             <Award className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
// // // //                             <p className="text-muted-foreground">No completed courses yet.</p>
// // // //                             <p className="text-sm text-muted-foreground mt-2">
// // // //                               Complete your enrolled courses to earn certificates!
// // // //                             </p>
// // // //                           </CardContent>
// // // //                         </Card>
// // // //                       )}
// // // //                     </div>
// // // //                   </TabsContent>

// // // //                   <TabsContent value="certificates" className="mt-6">
// // // //                     <div className="space-y-4">
// // // //                       {enrolledCourses.filter(course => course.canDownloadCertificate || course.certificateEligible).map((course) => (
// // // //                         <Card key={course.id} className="hover:shadow-lg transition-shadow">
// // // //                           <CardContent className="p-6">
// // // //                             <div className="flex items-center justify-between">
// // // //                               <div className="flex items-center gap-4">
// // // //                                 <div className="w-16 h-16 bg-gradient-to-br from-primary to-blue-600 rounded-lg flex items-center justify-center">
// // // //                                   <Award className="w-8 h-8 text-white" />
// // // //                                 </div>
// // // //                                 <div>
// // // //                                   <h3 className="font-semibold text-lg">{course.title}</h3>
// // // //                                   <p className="text-muted-foreground">
// // // //                                     Progress: {course.progress}%
// // // //                                   </p>
// // // //                                   <p className="text-sm text-muted-foreground">
// // // //                                     {course.completed ? 'Course Completed' : 'Certificate Available'}
// // // //                                   </p>
// // // //                                 </div>
// // // //                               </div>
// // // //                               <div className="flex flex-col gap-2">
// // // //                                 <Button
// // // //                                   className="flex items-center gap-2"
// // // //                                   onClick={() => downloadCertificate(course.id)}
// // // //                                 >
// // // //                                   <Download className="w-4 h-4" />
// // // //                                   Download
// // // //                                 </Button>
// // // //                                 <Button
// // // //                                   variant="outline"
// // // //                                   size="sm"
// // // //                                   className="w-full"
// // // //                                   onClick={() => handleContinueCourse(course.id)}
// // // //                                 >
// // // //                                   View Course
// // // //                                 </Button>
// // // //                               </div>
// // // //                             </div>
// // // //                           </CardContent>
// // // //                         </Card>
// // // //                       ))}

// // // //                       {enrolledCourses.filter(course => course.canDownloadCertificate || course.certificateEligible).length === 0 && (
// // // //                         <Card>
// // // //                           <CardContent className="p-12 text-center">
// // // //                             <Award className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
// // // //                             <p className="text-muted-foreground">No certificates available yet.</p>
// // // //                             <p className="text-sm text-muted-foreground mt-2">
// // // //                               Certificates become available after completing 40% of a course.
// // // //                             </p>
// // // //                           </CardContent>
// // // //                         </Card>
// // // //                       )}
// // // //                     </div>
// // // //                   </TabsContent>
// // // //                 </Tabs>
// // // //               </motion.div>
// // // //             </div>

// // // //             {/* Sidebar */}
// // // //             <div className="space-y-6">
// // // //               {/* Referral Card */}
// // // //               <motion.div
// // // //                 initial={{ opacity: 0, x: 20 }}
// // // //                 animate={{ opacity: 1, x: 0 }}
// // // //                 transition={{ duration: 0.6, delay: 0.3 }}
// // // //               >
// // // //                 <Card>
// // // //                   <CardHeader>
// // // //                     <CardTitle className="flex items-center gap-2">
// // // //                       <Gift className="w-5 h-5" />
// // // //                       Refer & Earn
// // // //                     </CardTitle>
// // // //                     <CardDescription>
// // // //                       Earn credits when your friends join and purchase courses
// // // //                     </CardDescription>
// // // //                   </CardHeader>
// // // //                   <CardContent className="space-y-4">
// // // //                     <div className="p-3 bg-primary/10 rounded-lg text-center">
// // // //                       <p className="text-2xl font-bold text-primary">{userStats.credits}</p>
// // // //                       <p className="text-sm text-muted-foreground">Available Credits</p>
// // // //                     </div>

// // // //                     <div className="space-y-2">
// // // //                       <Label htmlFor="referral-code">Your Referral Code</Label>
// // // //                       <div className="flex gap-2">
// // // //                         <Input
// // // //                           id="referral-code"
// // // //                           value={referralCode}
// // // //                           readOnly
// // // //                           className="font-mono"
// // // //                         />
// // // //                         <Button
// // // //                           size="sm"
// // // //                           variant="outline"
// // // //                           onClick={copyReferralLink}
// // // //                         >
// // // //                           <Copy className="w-4 h-4" />
// // // //                         </Button>
// // // //                       </div>
// // // //                     </div>

// // // //                     <div className="text-sm text-muted-foreground">
// // // //                       <p>• Earn 100 credits per successful referral</p>
// // // //                       <p>• Use credits for discounts on courses</p>
// // // //                     </div>
// // // //                   </CardContent>
// // // //                 </Card>
// // // //               </motion.div>

// // // //               {/* Recent Activity */}
// // // //               <motion.div
// // // //                 initial={{ opacity: 0, x: 20 }}
// // // //                 animate={{ opacity: 1, x: 0 }}
// // // //                 transition={{ duration: 0.6, delay: 0.4 }}
// // // //               >
// // // //                 <Card>
// // // //                   <CardHeader>
// // // //                     <CardTitle className="flex items-center gap-2">
// // // //                       <TrendingUp className="w-5 h-5" />
// // // //                       Recent Activity
// // // //                     </CardTitle>
// // // //                   </CardHeader>
// // // //                   <CardContent className="space-y-4">
// // // //                     {recentActivity.length > 0 ? (
// // // //                       recentActivity.map((activity, index) => (
// // // //                         <div key={index} className="flex items-start gap-3 p-3 rounded-lg bg-muted/50">
// // // //                           <div className="w-2 h-2 bg-primary rounded-full mt-2" />
// // // //                           <div className="flex-1">
// // // //                             <p className="text-sm font-medium">{activity.title}</p>
// // // //                             <p className="text-xs text-muted-foreground">{activity.description}</p>
// // // //                             <p className="text-xs text-muted-foreground mt-1">{activity.timestamp}</p>
// // // //                           </div>
// // // //                         </div>
// // // //                       ))
// // // //                     ) : (
// // // //                       <p className="text-sm text-muted-foreground text-center py-4">
// // // //                         No recent activity
// // // //                       </p>
// // // //                     )}
// // // //                   </CardContent>
// // // //                 </Card>
// // // //               </motion.div>
// // // //             </div>
// // // //           </div>
// // // //         </div>
// // // //       </main>
// // // //     </div>
// // // //   );
// // // // }

// // // 'use client';

// // // import { useState, useEffect } from 'react';
// // // import { motion } from 'framer-motion';
// // // import {
// // //   BookOpen,
// // //   Award,
// // //   Clock,
// // //   TrendingUp,
// // //   Play,
// // //   Download,
// // //   Users,
// // //   Star,
// // //   Gift,
// // //   Copy,
// // //   CheckCircle,
// // //   Settings,
// // //   User,
// // //   CreditCard,
// // //   Bell,
// // //   Lock,
// // //   Eye,
// // //   EyeOff,
// // //   LogOut,
// // //   ExternalLink,
// // //   Shield
// // // } from 'lucide-react';
// // // import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
// // // import { Button } from '@/components/ui/button';
// // // import { Badge } from '@/components/ui/badge';
// // // import { Progress } from '@/components/ui/progress';
// // // import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
// // // import { Input } from '@/components/ui/input';
// // // import { Label } from '@/components/ui/label';
// // // import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
// // // import { OTPInput } from '@/components/ui/otp-input';
// // // import { toast } from 'sonner';
// // // import { useAuth } from '@/components/auth-provider';
// // // import Navbar from '@/components/navbar';
// // // import { useRouter } from 'next/navigation';
// // // import Link from 'next/link';

// // // export default function Dashboard() {
// // //   const { user, logout, loading } = useAuth();
// // //   const router = useRouter();
// // //   const [userStats, setUserStats] = useState({
// // //     enrolledCourses: 0,
// // //     completedCourses: 0,
// // //     certificatesEarned: 0,
// // //     totalWatchTime: 0,
// // //     credits: 0
// // //   });
// // //   const [enrolledCourses, setEnrolledCourses] = useState([]);
// // //   const [recentActivity, setRecentActivity] = useState([]);
// // //   const [referralCode, setReferralCode] = useState('');
// // //   const [profileData, setProfileData] = useState({
// // //     fullName: '',
// // //     email: '',
// // //     location: '',
// // //   });
// // //   const [passwordData, setPasswordData] = useState({
// // //     currentPassword: '',
// // //     newPassword: '',
// // //     confirmPassword: '',
// // //   });
// // //   const [showPasswords, setShowPasswords] = useState({
// // //     current: false,
// // //     new: false,
// // //     confirm: false,
// // //   });
// // //   const [isProfileDialogOpen, setIsProfileDialogOpen] = useState(false);
// // //   const [isPasswordDialogOpen, setIsPasswordDialogOpen] = useState(false);
// // //   const [passwordChangeStep, setPasswordChangeStep] = useState(1); // 1: Password form, 2: OTP verification
// // //   const [otp, setOtp] = useState('');
// // //   const [isLoading, setIsLoading] = useState(false);
// // //   const [isDashboardLoading, setIsDashboardLoading] = useState(true);

// // //   // Redirect to login if not authenticated
// // //   useEffect(() => {
// // //     if (!loading && !user) {
// // //       console.log('User not authenticated, redirecting to login');
// // //       router.replace('/auth/login');
// // //       return;
// // //     }

// // //     if (user) {
// // //       console.log('Dashboard loaded for user:', user.id);
// // //       fetchUserData();
// // //       setReferralCode(user.referralCode || '');
// // //       setProfileData({
// // //         fullName: user.fullName || '',
// // //         email: user.email || '',
// // //         location: user.location || '',
// // //       });
// // //     }
// // //   }, [user, loading, router]);

// // //   const fetchUserData = async () => {
// // //     try {
// // //       setIsDashboardLoading(true);

// // //       const response = await fetch('/api/user/dashboard', {
// // //         credentials: 'include',
// // //       });

// // //       if (response.ok) {
// // //         const data = await response.json();
// // //         console.log('Dashboard data received:', data);
// // //         setUserStats(data.stats);
// // //         setEnrolledCourses(data.enrolledCourses);
// // //         setRecentActivity(data.recentActivity);
// // //       } else if (response.status === 401) {
// // //         // Token expired, logout user
// // //         console.log('Token expired, logging out');
// // //         logout();
// // //       } else {
// // //         const errorData = await response.json();
// // //         console.error('Dashboard API error:', errorData);
// // //         toast.error('Failed to load dashboard data');
// // //       }
// // //     } catch (error) {
// // //       console.error('Error fetching user data:', error);
// // //       toast.error('Something went wrong while loading your dashboard');
// // //     } finally {
// // //       setIsDashboardLoading(false);
// // //     }
// // //   };

// // //   const updateProfile = async () => {
// // //     if (!profileData.fullName || !profileData.location) {
// // //       toast.error('Please fill in all required fields');
// // //       return;
// // //     }

// // //     setIsLoading(true);
// // //     try {
// // //       const response = await fetch('/api/user/profile', {
// // //         method: 'PUT',
// // //         headers: {
// // //           'Content-Type': 'application/json',
// // //         },
// // //         credentials: 'include',
// // //         body: JSON.stringify(profileData),
// // //       });

// // //       if (response.ok) {
// // //         toast.success('Profile updated successfully!');
// // //         setIsProfileDialogOpen(false);
// // //         // Refresh user data
// // //         fetchUserData();
// // //       } else {
// // //         const data = await response.json();
// // //         toast.error(data.message || 'Failed to update profile');
// // //       }
// // //     } catch (error) {
// // //       console.error('Error updating profile:', error);
// // //       toast.error('Something went wrong. Please try again.');
// // //     } finally {
// // //       setIsLoading(false);
// // //     }
// // //   };

// // //   const changePassword = async () => {
// // //     if (!passwordData.currentPassword || !passwordData.newPassword || !passwordData.confirmPassword) {
// // //       toast.error('Please fill in all fields');
// // //       return;
// // //     }

// // //     if (passwordData.newPassword !== passwordData.confirmPassword) {
// // //       toast.error('New passwords do not match');
// // //       return;
// // //     }

// // //     if (passwordData.newPassword.length < 6) {
// // //       toast.error('Password must be at least 6 characters long');
// // //       return;
// // //     }

// // //     setIsLoading(true);
// // //     try {
// // //       const response = await fetch('/api/user/change-password', {
// // //         method: 'POST',
// // //         headers: {
// // //           'Content-Type': 'application/json',
// // //         },
// // //         credentials: 'include',
// // //         body: JSON.stringify({
// // //           currentPassword: passwordData.currentPassword,
// // //           newPassword: passwordData.newPassword,
// // //         }),
// // //       });

// // //       const data = await response.json();

// // //       if (response.ok && data.requireOTP) {
// // //         toast.success('OTP sent to your email. Please verify to complete password change.');
// // //         setPasswordChangeStep(2);
// // //       } else if (response.ok) {
// // //         toast.success('Password changed successfully!');
// // //         setIsPasswordDialogOpen(false);
// // //         resetPasswordDialog();
// // //       } else {
// // //         toast.error(data.message || 'Failed to change password');
// // //       }
// // //     } catch (error) {
// // //       console.error('Error changing password:', error);
// // //       toast.error('Something went wrong. Please try again.');
// // //     } finally {
// // //       setIsLoading(false);
// // //     }
// // //   };

// // //   const verifyOtpAndChangePassword = async () => {
// // //     if (!otp || otp.length !== 6) {
// // //       toast.error('Please enter a valid 6-digit OTP');
// // //       return;
// // //     }

// // //     setIsLoading(true);
// // //     try {
// // //       const response = await fetch('/api/user/change-password', {
// // //         method: 'POST',
// // //         headers: {
// // //           'Content-Type': 'application/json',
// // //         },
// // //         credentials: 'include',
// // //         body: JSON.stringify({
// // //           otp,
// // //           isOtpVerification: true,
// // //         }),
// // //       });

// // //       const data = await response.json();

// // //       if (response.ok) {
// // //         toast.success('Password changed successfully!');
// // //         setIsPasswordDialogOpen(false);
// // //         resetPasswordDialog();
// // //       } else {
// // //         toast.error(data.message || 'OTP verification failed');
// // //       }
// // //     } catch (error) {
// // //       console.error('Error verifying OTP:', error);
// // //       toast.error('Something went wrong. Please try again.');
// // //     } finally {
// // //       setIsLoading(false);
// // //     }
// // //   };

// // //   const resetPasswordDialog = () => {
// // //     setPasswordData({
// // //       currentPassword: '',
// // //       newPassword: '',
// // //       confirmPassword: '',
// // //     });
// // //     setOtp('');
// // //     setPasswordChangeStep(1);
// // //     setShowPasswords({
// // //       current: false,
// // //       new: false,
// // //       confirm: false,
// // //     });
// // //   };

// // //   const resendOTP = async () => {
// // //     setIsLoading(true);
// // //     try {
// // //       await changePassword();
// // //     } finally {
// // //       setIsLoading(false);
// // //     }
// // //   };

// // //   const copyReferralLink = () => {
// // //     const referralLink = `${window.location.origin}/auth/register?ref=${referralCode}`;
// // //     navigator.clipboard.writeText(referralLink);
// // //     toast.success('Referral link copied to clipboard!');
// // //   };

// // //   const downloadCertificate = async (courseId) => {
// // //     try {
// // //       console.log('Downloading certificate for courseId:', courseId);

// // //       if (!courseId) {
// // //         toast.error('Invalid course ID');
// // //         return;
// // //       }

// // //       const url = `/api/certificates/download/${courseId}`;
// // //       console.log('Making request to:', url);

// // //       const response = await fetch(url, {
// // //         credentials: 'include',
// // //       });

// // //       console.log('Response status:', response.status);
// // //       console.log('Response headers:', response.headers);

// // //       if (response.ok) {
// // //         const blob = await response.blob();
// // //         const url = window.URL.createObjectURL(blob);
// // //         const a = document.createElement('a');
// // //         a.style.display = 'none';
// // //         a.href = url;

// // //         // Get course name for filename
// // //         const course = enrolledCourses.find(c => c.id === courseId);
// // //         const filename = `${course?.title || 'course'}-certificate.pdf`;

// // //         a.download = filename;
// // //         document.body.appendChild(a);
// // //         a.click();
// // //         window.URL.revokeObjectURL(url);
// // //         document.body.removeChild(a);
// // //         toast.success('Certificate downloaded successfully!');
// // //       } else {
// // //         const data = await response.json();
// // //         console.error('Error response:', data);
// // //         toast.error(data.error || 'Error downloading certificate');
// // //       }
// // //     } catch (error) {
// // //       console.error('Error downloading certificate:', error);
// // //       toast.error('Error downloading certificate');
// // //     }
// // //   };

// // //   const handleLogout = async () => {
// // //     try {
// // //       console.log('Logging out from dashboard...');
// // //       await logout();
// // //       toast.success('Logged out successfully');
// // //     } catch (error) {
// // //       console.error('Logout error:', error);
// // //       toast.error('Error logging out');
// // //     }
// // //   };

// // //   const handleContinueCourse = (courseId) => {
// // //     console.log('Navigating to course:', courseId);
// // //     router.push(`/course/${courseId}`);
// // //   };

// // //   const stats = [
// // //     {
// // //       title: 'Enrolled Courses',
// // //       value: userStats.enrolledCourses,
// // //       icon: BookOpen,
// // //       color: 'text-blue-600',
// // //       bgColor: 'bg-blue-50 dark:bg-blue-950'
// // //     },
// // //     {
// // //       title: 'Completed',
// // //       value: userStats.completedCourses,
// // //       icon: CheckCircle,
// // //       color: 'text-green-600',
// // //       bgColor: 'bg-green-50 dark:bg-green-950'
// // //     },
// // //     {
// // //       title: 'Certificates',
// // //       value: userStats.certificatesEarned,
// // //       icon: Award,
// // //       color: 'text-purple-600',
// // //       bgColor: 'bg-purple-50 dark:bg-purple-950'
// // //     },
// // //     {
// // //       title: 'Credits',
// // //       value: userStats.credits,
// // //       icon: Gift,
// // //       color: 'text-orange-600',
// // //       bgColor: 'bg-orange-50 dark:bg-orange-950'
// // //     }
// // //   ];

// // //   if (loading || isDashboardLoading) {
// // //     return (
// // //       <div className="min-h-screen flex items-center justify-center">
// // //         <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
// // //       </div>
// // //     );
// // //   }

// // //   if (!user) {
// // //     return null; // Will redirect in useEffect
// // //   }

// // //   return (
// // //     <div className="min-h-screen bg-background">
// // //       <Navbar />

// // //       <main className="pt-20 pb-12">
// // //         <div className="container mx-auto px-4">
// // //           {/* Header with Profile Actions */}
// // //           <motion.div
// // //             className="mb-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4"
// // //             initial={{ opacity: 0, y: 20 }}
// // //             animate={{ opacity: 1, y: 0 }}
// // //             transition={{ duration: 0.6 }}
// // //           >
// // //             <div>
// // //               <h1 className="text-3xl font-bold mb-2">
// // //                 Welcome back, {user.fullName}! 👋
// // //               </h1>
// // //               <p className="text-muted-foreground">
// // //                 Continue your learning journey and track your progress.
// // //               </p>
// // //             </div>
// // //             <div className="flex gap-2 flex-wrap">
// // //               <Dialog open={isProfileDialogOpen} onOpenChange={(open) => {
// // //                 setIsProfileDialogOpen(open);
// // //                 if (!open) {
// // //                   // Reset form when dialog closes
// // //                   setProfileData({
// // //                     fullName: user.fullName || '',
// // //                     email: user.email || '',
// // //                     location: user.location || '',
// // //                   });
// // //                 }
// // //               }}>
// // //                 <DialogTrigger asChild>
// // //                   <Button variant="outline" className="flex items-center gap-2">
// // //                     <User className="w-4 h-4" />
// // //                     Profile
// // //                   </Button>
// // //                 </DialogTrigger>
// // //                 <DialogContent>
// // //                   <DialogHeader>
// // //                     <DialogTitle>Edit Profile</DialogTitle>
// // //                     <DialogDescription>
// // //                       Update your profile information
// // //                     </DialogDescription>
// // //                   </DialogHeader>
// // //                   <div className="space-y-4">
// // //                     <div className="space-y-2">
// // //                       <Label htmlFor="fullName">Full Name</Label>
// // //                       <Input
// // //                         id="fullName"
// // //                         value={profileData.fullName}
// // //                         onChange={(e) => setProfileData(prev => ({ ...prev, fullName: e.target.value }))}
// // //                         placeholder="Enter your full name"
// // //                       />
// // //                     </div>
// // //                     <div className="space-y-2">
// // //                       <Label htmlFor="email">Email (Cannot be changed)</Label>
// // //                       <Input
// // //                         id="email"
// // //                         value={profileData.email}
// // //                         disabled
// // //                         className="bg-muted"
// // //                       />
// // //                     </div>
// // //                     <div className="space-y-2">
// // //                       <Label htmlFor="location">Location</Label>
// // //                       <Input
// // //                         id="location"
// // //                         value={profileData.location}
// // //                         onChange={(e) => setProfileData(prev => ({ ...prev, location: e.target.value }))}
// // //                         placeholder="Enter your location"
// // //                       />
// // //                     </div>
// // //                     <div className="flex gap-2">
// // //                       <Button onClick={updateProfile} disabled={isLoading} className="flex-1">
// // //                         {isLoading ? 'Updating...' : 'Update Profile'}
// // //                       </Button>
// // //                       <Button variant="outline" onClick={() => setIsProfileDialogOpen(false)}>
// // //                         Cancel
// // //                       </Button>
// // //                     </div>
// // //                   </div>
// // //                 </DialogContent>
// // //               </Dialog>

// // //               <Dialog open={isPasswordDialogOpen} onOpenChange={(open) => {
// // //                 setIsPasswordDialogOpen(open);
// // //                 if (!open) {
// // //                   resetPasswordDialog();
// // //                 }
// // //               }}>
// // //                 <DialogTrigger asChild>
// // //                   <Button variant="outline" className="flex items-center gap-2">
// // //                     <Lock className="w-4 h-4" />
// // //                     Change Password
// // //                   </Button>
// // //                 </DialogTrigger>
// // //                 <DialogContent className="sm:max-w-md">
// // //                   {passwordChangeStep === 1 ? (
// // //                     <>
// // //                       <DialogHeader>
// // //                         <DialogTitle>Change Password</DialogTitle>
// // //                         <DialogDescription>
// // //                           Enter your current password and choose a new one
// // //                         </DialogDescription>
// // //                       </DialogHeader>
// // //                       <div className="space-y-4">
// // //                         <div className="space-y-2">
// // //                           <Label htmlFor="currentPassword">Current Password</Label>
// // //                           <div className="relative">
// // //                             <Input
// // //                               id="currentPassword"
// // //                               type={showPasswords.current ? 'text' : 'password'}
// // //                               value={passwordData.currentPassword}
// // //                               onChange={(e) => setPasswordData(prev => ({ ...prev, currentPassword: e.target.value }))}
// // //                               placeholder="Enter current password"
// // //                               className="pr-10"
// // //                             />
// // //                             <button
// // //                               type="button"
// // //                               onClick={() => setShowPasswords(prev => ({ ...prev, current: !prev.current }))}
// // //                               className="absolute right-3 top-3 text-muted-foreground hover:text-primary"
// // //                             >
// // //                               {showPasswords.current ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
// // //                             </button>
// // //                           </div>
// // //                         </div>
// // //                         <div className="space-y-2">
// // //                           <Label htmlFor="newPassword">New Password</Label>
// // //                           <div className="relative">
// // //                             <Input
// // //                               id="newPassword"
// // //                               type={showPasswords.new ? 'text' : 'password'}
// // //                               value={passwordData.newPassword}
// // //                               onChange={(e) => setPasswordData(prev => ({ ...prev, newPassword: e.target.value }))}
// // //                               placeholder="Enter new password"
// // //                               className="pr-10"
// // //                             />
// // //                             <button
// // //                               type="button"
// // //                               onClick={() => setShowPasswords(prev => ({ ...prev, new: !prev.new }))}
// // //                               className="absolute right-3 top-3 text-muted-foreground hover:text-primary"
// // //                             >
// // //                               {showPasswords.new ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
// // //                             </button>
// // //                           </div>
// // //                         </div>
// // //                         <div className="space-y-2">
// // //                           <Label htmlFor="confirmPassword">Confirm New Password</Label>
// // //                           <div className="relative">
// // //                             <Input
// // //                               id="confirmPassword"
// // //                               type={showPasswords.confirm ? 'text' : 'password'}
// // //                               value={passwordData.confirmPassword}
// // //                               onChange={(e) => setPasswordData(prev => ({ ...prev, confirmPassword: e.target.value }))}
// // //                               placeholder="Confirm new password"
// // //                               className="pr-10"
// // //                             />
// // //                             <button
// // //                               type="button"
// // //                               onClick={() => setShowPasswords(prev => ({ ...prev, confirm: !prev.confirm }))}
// // //                               className="absolute right-3 top-3 text-muted-foreground hover:text-primary"
// // //                             >
// // //                               {showPasswords.confirm ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
// // //                             </button>
// // //                           </div>
// // //                         </div>
// // //                         <div className="flex gap-2">
// // //                           <Button onClick={changePassword} disabled={isLoading} className="flex-1">
// // //                             {isLoading ? 'Sending OTP...' : 'Send Verification OTP'}
// // //                           </Button>
// // //                           <Button variant="outline" onClick={() => setIsPasswordDialogOpen(false)}>
// // //                             Cancel
// // //                           </Button>
// // //                         </div>
// // //                       </div>
// // //                     </>
// // //                   ) : (
// // //                     <>
// // //                       <DialogHeader className="text-center">
// // //                         <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mx-auto mb-4">
// // //                           <Shield className="w-8 h-8 text-blue-600 dark:text-blue-400" />
// // //                         </div>
// // //                         <DialogTitle>Verify Password Change</DialogTitle>
// // //                         <DialogDescription>
// // //                           We've sent a 6-digit OTP to your email address. Please enter it below to complete your password change.
// // //                         </DialogDescription>
// // //                       </DialogHeader>
// // //                       <div className="space-y-6">
// // //                         <div className="space-y-4">
// // //                           <Label className="text-center block">Enter 6-digit OTP</Label>
// // //                           <OTPInput
// // //                             value={otp}
// // //                             onChange={setOtp}
// // //                             length={6}
// // //                             disabled={isLoading}
// // //                           />
// // //                         </div>

// // //                         <div className="space-y-3">
// // //                           <Button 
// // //                             onClick={verifyOtpAndChangePassword} 
// // //                             disabled={isLoading || otp.length !== 6} 
// // //                             className="w-full"
// // //                           >
// // //                             {isLoading ? 'Verifying...' : 'Verify & Change Password'}
// // //                           </Button>

// // //                           <div className="flex justify-between items-center text-sm">
// // //                             <button
// // //                               onClick={resendOTP}
// // //                               className="text-blue-600 hover:underline disabled:text-muted-foreground"
// // //                               disabled={isLoading}
// // //                             >
// // //                               Resend OTP
// // //                             </button>
// // //                             <button
// // //                               onClick={() => setPasswordChangeStep(1)}
// // //                               className="text-muted-foreground hover:text-primary"
// // //                               disabled={isLoading}
// // //                             >
// // //                               Back to form
// // //                             </button>
// // //                           </div>
// // //                         </div>
// // //                       </div>
// // //                     </>
// // //                   )}
// // //                 </DialogContent>
// // //               </Dialog>

// // //               <Button variant="outline" onClick={handleLogout} className="flex items-center gap-2 text-red-600 hover:text-red-700">
// // //                 <LogOut className="w-4 h-4" />
// // //                 Logout
// // //               </Button>
// // //             </div>
// // //           </motion.div>

// // //           {/* Stats Cards */}
// // //           <motion.div
// // //             className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
// // //             initial={{ opacity: 0, y: 20 }}
// // //             animate={{ opacity: 1, y: 0 }}
// // //             transition={{ duration: 0.6, delay: 0.1 }}
// // //           >
// // //             {stats.map((stat, index) => (
// // //               <Card key={stat.title} className="hover:shadow-lg transition-shadow">
// // //                 <CardContent className="p-6">
// // //                   <div className="flex items-center justify-between">
// // //                     <div>
// // //                       <p className="text-sm text-muted-foreground mb-1">{stat.title}</p>
// // //                       <p className="text-2xl font-bold">{stat.value}</p>
// // //                     </div>
// // //                     <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${stat.bgColor}`}>
// // //                       <stat.icon className={`w-6 h-6 ${stat.color}`} />
// // //                     </div>
// // //                   </div>
// // //                 </CardContent>
// // //               </Card>
// // //             ))}
// // //           </motion.div>

// // //           <div className="grid lg:grid-cols-3 gap-8">
// // //             {/* Main Content */}
// // //             <div className="lg:col-span-2 space-y-8">
// // //               {/* Course Tabs */}
// // //               <motion.div
// // //                 initial={{ opacity: 0, y: 20 }}
// // //                 animate={{ opacity: 1, y: 0 }}
// // //                 transition={{ duration: 0.6, delay: 0.2 }}
// // //               >
// // //                 <Tabs defaultValue="enrolled" className="w-full">
// // //                   <TabsList className="grid w-full grid-cols-3">
// // //                     <TabsTrigger value="enrolled">Enrolled</TabsTrigger>
// // //                     <TabsTrigger value="completed">Completed</TabsTrigger>
// // //                     <TabsTrigger value="certificates">Certificates</TabsTrigger>
// // //                   </TabsList>

// // //                   <TabsContent value="enrolled" className="mt-6">
// // //                     <div className="space-y-4">
// // //                       {enrolledCourses.filter(course => !course.completed).map((course) => (
// // //                         <Card key={course.id} className="hover:shadow-lg transition-shadow">
// // //                           <CardContent className="p-6">
// // //                             <div className="flex items-start gap-4">
// // //                               <img
// // //                                 src={course.thumbnail || 'https://images.pexels.com/photos/5212345/pexels-photo-5212345.jpeg'}
// // //                                 alt={course.title}
// // //                                 className="w-20 h-20 rounded-lg object-cover"
// // //                               />
// // //                               <div className="flex-1">
// // //                                 <h3 className="font-semibold text-lg mb-2">{course.title}</h3>
// // //                                 <p className="text-muted-foreground text-sm mb-3 line-clamp-2">{course.description}</p>
// // //                                 <div className="flex items-center gap-4 mb-3">
// // //                                   <Badge variant="secondary">{course.category}</Badge>
// // //                                   <div className="flex items-center gap-1 text-sm text-muted-foreground">
// // //                                     <Clock className="w-4 h-4" />
// // //                                     {course.duration}
// // //                                   </div>
// // //                                   {course.certificateEligible && (
// // //                                     <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100">
// // //                                       <Award className="w-3 h-3 mr-1" />
// // //                                       Certificate Ready
// // //                                     </Badge>
// // //                                   )}
// // //                                 </div>
// // //                                 <div className="space-y-2">
// // //                                   <div className="flex justify-between items-center text-sm">
// // //                                     <span>Progress</span>
// // //                                     <span>{course.progress}%</span>
// // //                                   </div>
// // //                                   <Progress value={course.progress} className="w-full" />
// // //                                 </div>
// // //                               </div>
// // //                               <div className="flex flex-col gap-2">
// // //                                 <Button
// // //                                   className="flex items-center gap-2"
// // //                                   onClick={() => handleContinueCourse(course.id)}
// // //                                 >
// // //                                   <Play className="w-4 h-4" />
// // //                                   Continue
// // //                                 </Button>
// // //                                 {course.certificateEligible && (
// // //                                   <Button
// // //                                     variant="outline"
// // //                                     size="sm"
// // //                                     className="text-xs"
// // //                                     onClick={() => downloadCertificate(course.id)}
// // //                                   >
// // //                                     <Download className="w-3 h-3 mr-1" />
// // //                                     Certificate
// // //                                   </Button>
// // //                                 )}
// // //                               </div>
// // //                             </div>
// // //                           </CardContent>
// // //                         </Card>
// // //                       ))}

// // //                       {enrolledCourses.filter(course => !course.completed).length === 0 && (
// // //                         <Card>
// // //                           <CardContent className="p-12 text-center">
// // //                             <BookOpen className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
// // //                             <p className="text-muted-foreground mb-4">No enrolled courses yet.</p>
// // //                             <Link href="/courses">
// // //                               <Button>Browse Courses</Button>
// // //                             </Link>
// // //                           </CardContent>
// // //                         </Card>
// // //                       )}
// // //                     </div>
// // //                   </TabsContent>

// // //                   <TabsContent value="completed" className="mt-6">
// // //                     <div className="space-y-4">
// // //                       {enrolledCourses.filter(course => course.completed).map((course) => (
// // //                         <Card key={course.id} className="hover:shadow-lg transition-shadow">
// // //                           <CardContent className="p-6">
// // //                             <div className="flex items-start gap-4">
// // //                               <img
// // //                                 src={course.thumbnail || 'https://images.pexels.com/photos/5212345/pexels-photo-5212345.jpeg'}
// // //                                 alt={course.title}
// // //                                 className="w-20 h-20 rounded-lg object-cover"
// // //                               />
// // //                               <div className="flex-1">
// // //                                 <h3 className="font-semibold text-lg mb-2">{course.title}</h3>
// // //                                 <p className="text-muted-foreground text-sm mb-3 line-clamp-2">{course.description}</p>
// // //                                 <div className="flex items-center gap-4">
// // //                                   <Badge variant="secondary" className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100">
// // //                                     <CheckCircle className="w-3 h-3 mr-1" />
// // //                                     Completed
// // //                                   </Badge>
// // //                                   <div className="flex items-center gap-1 text-sm text-muted-foreground">
// // //                                     <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
// // //                                     Rate Course
// // //                                   </div>
// // //                                 </div>
// // //                               </div>
// // //                               <div className="flex flex-col gap-2">
// // //                                 <Button
// // //                                   variant="outline"
// // //                                   className="flex items-center gap-2"
// // //                                   onClick={() => handleContinueCourse(course.id)}
// // //                                 >
// // //                                   <ExternalLink className="w-4 h-4" />
// // //                                   Review
// // //                                 </Button>
// // //                                 <Button
// // //                                   variant="outline"
// // //                                   className="flex items-center gap-2"
// // //                                   onClick={() => downloadCertificate(course.id)}
// // //                                   disabled={!course.canDownloadCertificate}
// // //                                 >
// // //                                   <Download className="w-4 h-4" />
// // //                                   Certificate
// // //                                 </Button>
// // //                               </div>
// // //                             </div>
// // //                           </CardContent>
// // //                         </Card>
// // //                       ))}

// // //                       {enrolledCourses.filter(course => course.completed).length === 0 && (
// // //                         <Card>
// // //                           <CardContent className="p-12 text-center">
// // //                             <Award className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
// // //                             <p className="text-muted-foreground">No completed courses yet.</p>
// // //                             <p className="text-sm text-muted-foreground mt-2">
// // //                               Complete your enrolled courses to earn certificates!
// // //                             </p>
// // //                           </CardContent>
// // //                         </Card>
// // //                       )}
// // //                     </div>
// // //                   </TabsContent>

// // //                   <TabsContent value="certificates" className="mt-6">
// // //                     <div className="space-y-4">
// // //                       {enrolledCourses.filter(course => course.canDownloadCertificate || course.certificateEligible).map((course) => (
// // //                         <Card key={course.id} className="hover:shadow-lg transition-shadow">
// // //                           <CardContent className="p-6">
// // //                             <div className="flex items-center justify-between">
// // //                               <div className="flex items-center gap-4">
// // //                                 <div className="w-16 h-16 bg-gradient-to-br from-primary to-blue-600 rounded-lg flex items-center justify-center">
// // //                                   <Award className="w-8 h-8 text-white" />
// // //                                 </div>
// // //                                 <div>
// // //                                   <h3 className="font-semibold text-lg">{course.title}</h3>
// // //                                   <p className="text-muted-foreground">
// // //                                     Progress: {course.progress}%
// // //                                   </p>
// // //                                   <p className="text-sm text-muted-foreground">
// // //                                     {course.completed ? 'Course Completed' : 'Certificate Available'}
// // //                                   </p>
// // //                                 </div>
// // //                               </div>
// // //                               <div className="flex flex-col gap-2">
// // //                                 <Button
// // //                                   className="flex items-center gap-2"
// // //                                   onClick={() => downloadCertificate(course.id)}
// // //                                 >
// // //                                   <Download className="w-4 h-4" />
// // //                                   Download
// // //                                 </Button>
// // //                                 <Button
// // //                                   variant="outline"
// // //                                   size="sm"
// // //                                   className="w-full"
// // //                                   onClick={() => handleContinueCourse(course.id)}
// // //                                 >
// // //                                   View Course
// // //                                 </Button>
// // //                               </div>
// // //                             </div>
// // //                           </CardContent>
// // //                         </Card>
// // //                       ))}

// // //                       {enrolledCourses.filter(course => course.canDownloadCertificate || course.certificateEligible).length === 0 && (
// // //                         <Card>
// // //                           <CardContent className="p-12 text-center">
// // //                             <Award className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
// // //                             <p className="text-muted-foreground">No certificates available yet.</p>
// // //                             <p className="text-sm text-muted-foreground mt-2">
// // //                               Certificates become available after completing 40% of a course.
// // //                             </p>
// // //                           </CardContent>
// // //                         </Card>
// // //                       )}
// // //                     </div>
// // //                   </TabsContent>
// // //                 </Tabs>
// // //               </motion.div>
// // //             </div>

// // //             {/* Sidebar */}
// // //             <div className="space-y-6">
// // //               {/* Referral Card */}
// // //               <motion.div
// // //                 initial={{ opacity: 0, x: 20 }}
// // //                 animate={{ opacity: 1, x: 0 }}
// // //                 transition={{ duration: 0.6, delay: 0.3 }}
// // //               >
// // //                 <Card>
// // //                   <CardHeader>
// // //                     <CardTitle className="flex items-center gap-2">
// // //                       <Gift className="w-5 h-5" />
// // //                       Refer & Earn
// // //                     </CardTitle>
// // //                     <CardDescription>
// // //                       Earn credits when your friends join and purchase courses
// // //                     </CardDescription>
// // //                   </CardHeader>
// // //                   <CardContent className="space-y-4">
// // //                     <div className="p-3 bg-primary/10 rounded-lg text-center">
// // //                       <p className="text-2xl font-bold text-primary">{userStats.credits}</p>
// // //                       <p className="text-sm text-muted-foreground">Available Credits</p>
// // //                     </div>

// // //                     <div className="space-y-2">
// // //                       <Label htmlFor="referral-code">Your Referral Code</Label>
// // //                       <div className="flex gap-2">
// // //                         <Input
// // //                           id="referral-code"
// // //                           value={referralCode}
// // //                           readOnly
// // //                           className="font-mono"
// // //                         />
// // //                         <Button
// // //                           size="sm"
// // //                           variant="outline"
// // //                           onClick={copyReferralLink}
// // //                         >
// // //                           <Copy className="w-4 h-4" />
// // //                         </Button>
// // //                       </div>
// // //                     </div>

// // //                     <div className="text-sm text-muted-foreground">
// // //                       <p>• Earn 100 credits per successful referral</p>
// // //                       <p>• Use credits for discounts on courses</p>
// // //                     </div>
// // //                   </CardContent>
// // //                 </Card>
// // //               </motion.div>

// // //               {/* Recent Activity */}
// // //               <motion.div
// // //                 initial={{ opacity: 0, x: 20 }}
// // //                 animate={{ opacity: 1, x: 0 }}
// // //                 transition={{ duration: 0.6, delay: 0.4 }}
// // //               >
// // //                 <Card>
// // //                   <CardHeader>
// // //                     <CardTitle className="flex items-center gap-2">
// // //                       <TrendingUp className="w-5 h-5" />
// // //                       Recent Activity
// // //                     </CardTitle>
// // //                   </CardHeader>
// // //                   <CardContent className="space-y-4">
// // //                     {recentActivity.length > 0 ? (
// // //                       recentActivity.map((activity, index) => (
// // //                         <div key={index} className="flex items-start gap-3 p-3 rounded-lg bg-muted/50">
// // //                           <div className="w-2 h-2 bg-primary rounded-full mt-2" />
// // //                           <div className="flex-1">
// // //                             <p className="text-sm font-medium">{activity.title}</p>
// // //                             <p className="text-xs text-muted-foreground">{activity.description}</p>
// // //                             <p className="text-xs text-muted-foreground mt-1">{activity.timestamp}</p>
// // //                           </div>
// // //                         </div>
// // //                       ))
// // //                     ) : (
// // //                       <p className="text-sm text-muted-foreground text-center py-4">
// // //                         No recent activity
// // //                       </p>
// // //                     )}
// // //                   </CardContent>
// // //                 </Card>
// // //               </motion.div>
// // //             </div>
// // //           </div>
// // //         </div>
// // //       </main>
// // //     </div>
// // //   );
// // // }

// // 'use client';

// // import { useState, useEffect } from 'react';
// // import { motion } from 'framer-motion';
// // import { sendPasswordResetEmail } from 'firebase/auth';
// // import { auth } from '@/lib/firebase';
// // import {
// //   BookOpen,
// //   Award,
// //   Clock,
// //   TrendingUp,
// //   Play,
// //   Download,
// //   Users,
// //   Star,
// //   Gift,
// //   Copy,
// //   CheckCircle,
// //   Settings,
// //   User,
// //   CreditCard,
// //   Bell,
// //   Lock,
// //   Eye,
// //   EyeOff,
// //   LogOut,
// //   ExternalLink,
// //   Shield,
// //   Mail
// // } from 'lucide-react';
// // import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
// // import { Button } from '@/components/ui/button';
// // import { Badge } from '@/components/ui/badge';
// // import { Progress } from '@/components/ui/progress';
// // import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
// // import { Input } from '@/components/ui/input';
// // import { Label } from '@/components/ui/label';
// // import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
// // import { toast } from 'sonner';
// // import { useAuth } from '@/components/auth-provider';
// // import Navbar from '@/components/navbar';
// // import { useRouter } from 'next/navigation';
// // import Link from 'next/link';

// // export default function Dashboard() {
// //   const { user, logout, loading } = useAuth();
// //   const router = useRouter();
// //   const [userStats, setUserStats] = useState({
// //     enrolledCourses: 0,
// //     completedCourses: 0,
// //     certificatesEarned: 0,
// //     totalWatchTime: 0,
// //     credits: 0
// //   });
// //   const [enrolledCourses, setEnrolledCourses] = useState([]);
// //   const [recentActivity, setRecentActivity] = useState([]);
// //   const [referralCode, setReferralCode] = useState('');
// //   const [profileData, setProfileData] = useState({
// //     fullName: '',
// //     email: '',
// //     location: '',
// //   });
// //   const [isProfileDialogOpen, setIsProfileDialogOpen] = useState(false);
// //   const [isPasswordDialogOpen, setIsPasswordDialogOpen] = useState(false);
// //   const [isLoading, setIsLoading] = useState(false);
// //   const [isDashboardLoading, setIsDashboardLoading] = useState(true);

// //   // Redirect to login if not authenticated
// //   useEffect(() => {
// //     if (!loading && !user) {
// //       console.log('User not authenticated, redirecting to login');
// //       router.replace('/auth/login');
// //       return;
// //     }

// //     if (user) {
// //       console.log('Dashboard loaded for user:', user.id);
// //       fetchUserData();
// //       setReferralCode(user.referralCode || '');
// //       setProfileData({
// //         fullName: user.fullName || '',
// //         email: user.email || '',
// //         location: user.location || '',
// //       });
// //     }
// //   }, [user, loading, router]);

// //   const fetchUserData = async () => {
// //     try {
// //       setIsDashboardLoading(true);

// //       const response = await fetch('/api/user/dashboard', {
// //         credentials: 'include',
// //       });

// //       if (response.ok) {
// //         const data = await response.json();
// //         console.log('Dashboard data received:', data);
// //         setUserStats(data.stats);
// //         setEnrolledCourses(data.enrolledCourses);
// //         setRecentActivity(data.recentActivity);
// //       } else if (response.status === 401) {
// //         // Token expired, logout user
// //         console.log('Token expired, logging out');
// //         logout();
// //       } else {
// //         const errorData = await response.json();
// //         console.error('Dashboard API error:', errorData);
// //         toast.error('Failed to load dashboard data');
// //       }
// //     } catch (error) {
// //       console.error('Error fetching user data:', error);
// //       toast.error('Something went wrong while loading your dashboard');
// //     } finally {
// //       setIsDashboardLoading(false);
// //     }
// //   };

// //   const updateProfile = async () => {
// //     if (!profileData.fullName || !profileData.location) {
// //       toast.error('Please fill in all required fields');
// //       return;
// //     }

// //     setIsLoading(true);
// //     try {
// //       const response = await fetch('/api/user/profile', {
// //         method: 'PUT',
// //         headers: {
// //           'Content-Type': 'application/json',
// //         },
// //         credentials: 'include',
// //         body: JSON.stringify(profileData),
// //       });

// //       if (response.ok) {
// //         toast.success('Profile updated successfully!');
// //         setIsProfileDialogOpen(false);
// //         // Refresh user data
// //         fetchUserData();
// //       } else {
// //         const data = await response.json();
// //         toast.error(data.message || 'Failed to update profile');
// //       }
// //     } catch (error) {
// //       console.error('Error updating profile:', error);
// //       toast.error('Something went wrong. Please try again.');
// //     } finally {
// //       setIsLoading(false);
// //     }
// //   };

// //   const sendPasswordResetLink = async () => {
// //     if (!user?.email) {
// //       toast.error('User email not found');
// //       return;
// //     }

// //     setIsLoading(true);
// //     try {
// //       await sendPasswordResetEmail(auth, user.email);
// //       toast.success('Password reset link sent to your email address!');
// //       setIsPasswordDialogOpen(false);
// //     } catch (error) {
// //       console.error('Error sending password reset email:', error);
// //       let errorMessage = 'Failed to send password reset email';

// //       if (error.code === 'auth/user-not-found') {
// //         errorMessage = 'No account found with this email address';
// //       } else if (error.code === 'auth/too-many-requests') {
// //         errorMessage = 'Too many requests. Please wait before trying again';
// //       } else if (error.code === 'auth/invalid-email') {
// //         errorMessage = 'Invalid email address';
// //       }

// //       toast.error(errorMessage);
// //     } finally {
// //       setIsLoading(false);
// //     }
// //   };

// //   const copyReferralLink = () => {
// //     const referralLink = `${window.location.origin}/auth/register?ref=${referralCode}`;
// //     navigator.clipboard.writeText(referralLink);
// //     toast.success('Referral link copied to clipboard!');
// //   };

// //   const downloadCertificate = async (courseId) => {
// //     try {
// //       console.log('Downloading certificate for courseId:', courseId);

// //       if (!courseId) {
// //         toast.error('Invalid course ID');
// //         return;
// //       }

// //       const url = `/api/certificates/download/${courseId}`;
// //       console.log('Making request to:', url);

// //       const response = await fetch(url, {
// //         credentials: 'include',
// //       });

// //       console.log('Response status:', response.status);
// //       console.log('Response headers:', response.headers);

// //       if (response.ok) {
// //         const blob = await response.blob();
// //         const url = window.URL.createObjectURL(blob);
// //         const a = document.createElement('a');
// //         a.style.display = 'none';
// //         a.href = url;

// //         // Get course name for filename
// //         const course = enrolledCourses.find(c => c.id === courseId);
// //         const filename = `${course?.title || 'course'}-certificate.pdf`;

// //         a.download = filename;
// //         document.body.appendChild(a);
// //         a.click();
// //         window.URL.revokeObjectURL(url);
// //         document.body.removeChild(a);
// //         toast.success('Certificate downloaded successfully!');
// //       } else {
// //         const data = await response.json();
// //         console.error('Error response:', data);
// //         toast.error(data.error || 'Error downloading certificate');
// //       }
// //     } catch (error) {
// //       console.error('Error downloading certificate:', error);
// //       toast.error('Error downloading certificate');
// //     }
// //   };

// //   const handleLogout = async () => {
// //     try {
// //       console.log('Logging out from dashboard...');
// //       await logout();
// //       toast.success('Logged out successfully');
// //     } catch (error) {
// //       console.error('Logout error:', error);
// //       toast.error('Error logging out');
// //     }
// //   };

// //   const handleContinueCourse = (courseId) => {
// //     console.log('Navigating to course:', courseId);
// //     router.push(`/course/${courseId}`);
// //   };

// //   const stats = [
// //     {
// //       title: 'Enrolled Courses',
// //       value: userStats.enrolledCourses,
// //       icon: BookOpen,
// //       color: 'text-blue-600',
// //       bgColor: 'bg-blue-50 dark:bg-blue-950'
// //     },
// //     {
// //       title: 'Completed',
// //       value: userStats.completedCourses,
// //       icon: CheckCircle,
// //       color: 'text-green-600',
// //       bgColor: 'bg-green-50 dark:bg-green-950'
// //     },
// //     {
// //       title: 'Certificates',
// //       value: userStats.certificatesEarned,
// //       icon: Award,
// //       color: 'text-purple-600',
// //       bgColor: 'bg-purple-50 dark:bg-purple-950'
// //     },
// //     {
// //       title: 'Credits',
// //       value: userStats.credits,
// //       icon: Gift,
// //       color: 'text-orange-600',
// //       bgColor: 'bg-orange-50 dark:bg-orange-950'
// //     }
// //   ];

// //   if (loading || isDashboardLoading) {
// //     return (
// //       <div className="min-h-screen flex items-center justify-center">
// //         <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
// //       </div>
// //     );
// //   }

// //   if (!user) {
// //     return null; // Will redirect in useEffect
// //   }

// //   return (
// //     <div className="min-h-screen bg-background">
// //       <Navbar />

// //       <main className="pt-20 pb-12">
// //         <div className="container mx-auto px-4">
// //           {/* Header with Profile Actions */}
// //           <motion.div
// //             className="mb-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4"
// //             initial={{ opacity: 0, y: 20 }}
// //             animate={{ opacity: 1, y: 0 }}
// //             transition={{ duration: 0.6 }}
// //           >
// //             <div>
// //               <h1 className="text-2xl sm:text-3xl font-bold mb-2">
// //                 Welcome back, {user.fullName}! 👋
// //               </h1>
// //               <p className="text-muted-foreground">
// //                 Continue your learning journey and track your progress.
// //               </p>
// //             </div>
// //             <div className="flex gap-2 flex-wrap w-full sm:w-auto">
// //               <Dialog open={isProfileDialogOpen} onOpenChange={(open) => {
// //                 setIsProfileDialogOpen(open);
// //                 if (!open) {
// //                   // Reset form when dialog closes
// //                   setProfileData({
// //                     fullName: user.fullName || '',
// //                     email: user.email || '',
// //                     location: user.location || '',
// //                   });
// //                 }
// //               }}>
// //                 <DialogTrigger asChild>
// //                   <Button variant="outline" className="flex items-center gap-2 flex-1 sm:flex-none">
// //                     <User className="w-4 h-4" />
// //                     Profile
// //                   </Button>
// //                 </DialogTrigger>
// //                 <DialogContent className="sm:max-w-md">
// //                   <DialogHeader>
// //                     <DialogTitle>Edit Profile</DialogTitle>
// //                     <DialogDescription>
// //                       Update your profile information
// //                     </DialogDescription>
// //                   </DialogHeader>
// //                   <div className="space-y-4">
// //                     <div className="space-y-2">
// //                       <Label htmlFor="fullName">Full Name</Label>
// //                       <Input
// //                         id="fullName"
// //                         value={profileData.fullName}
// //                         onChange={(e) => setProfileData(prev => ({ ...prev, fullName: e.target.value }))}
// //                         placeholder="Enter your full name"
// //                       />
// //                     </div>
// //                     <div className="space-y-2">
// //                       <Label htmlFor="email">Email (Cannot be changed)</Label>
// //                       <Input
// //                         id="email"
// //                         value={profileData.email}
// //                         disabled
// //                         className="bg-muted"
// //                       />
// //                     </div>
// //                     <div className="space-y-2">
// //                       <Label htmlFor="location">Location</Label>
// //                       <Input
// //                         id="location"
// //                         value={profileData.location}
// //                         onChange={(e) => setProfileData(prev => ({ ...prev, location: e.target.value }))}
// //                         placeholder="Enter your location"
// //                       />
// //                     </div>
// //                     <div className="flex gap-2">
// //                       <Button onClick={updateProfile} disabled={isLoading} className="flex-1">
// //                         {isLoading ? 'Updating...' : 'Update Profile'}
// //                       </Button>
// //                       <Button variant="outline" onClick={() => setIsProfileDialogOpen(false)}>
// //                         Cancel
// //                       </Button>
// //                     </div>
// //                   </div>
// //                 </DialogContent>
// //               </Dialog>

// //               <Dialog open={isPasswordDialogOpen} onOpenChange={setIsPasswordDialogOpen}>
// //                 <DialogTrigger asChild>
// //                   <Button variant="outline" className="flex items-center gap-2 flex-1 sm:flex-none">
// //                     <Lock className="w-4 h-4" />
// //                     Change Password
// //                   </Button>
// //                 </DialogTrigger>
// //                 <DialogContent className="sm:max-w-md">
// //                   <DialogHeader className="text-center">
// //                     <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mx-auto mb-4">
// //                       <Mail className="w-8 h-8 text-blue-600 dark:text-blue-400" />
// //                     </div>
// //                     <DialogTitle>Change Your Password</DialogTitle>
// //                     <DialogDescription>
// //                       We'll send a secure password reset link to your email address. Click the link in your email to create a new password.
// //                     </DialogDescription>
// //                   </DialogHeader>

// //                   <div className="space-y-6">
// //                     <div className="p-4 bg-blue-50 dark:bg-blue-950/50 rounded-lg">
// //                       <div className="flex items-center gap-3">
// //                         <Mail className="w-5 h-5 text-blue-600" />
// //                         <div>
// //                           <p className="font-medium text-sm">Reset link will be sent to:</p>
// //                           <p className="text-sm text-muted-foreground">{user.email}</p>
// //                         </div>
// //                       </div>
// //                     </div>

// //                     <div className="space-y-3">
// //                       <Button 
// //                         onClick={sendPasswordResetLink} 
// //                         disabled={isLoading} 
// //                         className="w-full"
// //                       >
// //                         {isLoading ? 'Sending...' : 'Send Password Reset Link'}
// //                       </Button>

// //                       <Button 
// //                         variant="outline" 
// //                         onClick={() => setIsPasswordDialogOpen(false)}
// //                         className="w-full"
// //                         disabled={isLoading}
// //                       >
// //                         Cancel
// //                       </Button>
// //                     </div>

// //                     <div className="text-xs text-muted-foreground space-y-1">
// //                       <p>• Check your email inbox and spam folder</p>
// //                       <p>• The reset link expires in 1 hour</p>
// //                       <p>• You can request a new link if needed</p>
// //                     </div>
// //                   </div>
// //                 </DialogContent>
// //               </Dialog>

// //               <Button variant="outline" onClick={handleLogout} className="flex items-center gap-2 text-red-600 hover:text-red-700 flex-1 sm:flex-none">
// //                 <LogOut className="w-4 h-4" />
// //                 Logout
// //               </Button>
// //             </div>
// //           </motion.div>

// //           {/* Stats Cards */}
// //           <motion.div
// //             className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8"
// //             initial={{ opacity: 0, y: 20 }}
// //             animate={{ opacity: 1, y: 0 }}
// //             transition={{ duration: 0.6, delay: 0.1 }}
// //           >
// //             {stats.map((stat, index) => (
// //               <Card key={stat.title} className="hover:shadow-lg transition-shadow">
// //                 <CardContent className="p-4 sm:p-6">
// //                   <div className="flex items-center justify-between">
// //                     <div>
// //                       <p className="text-sm text-muted-foreground mb-1">{stat.title}</p>
// //                       <p className="text-xl sm:text-2xl font-bold">{stat.value}</p>
// //                     </div>
// //                     <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-lg flex items-center justify-center ${stat.bgColor}`}>
// //                       <stat.icon className={`w-5 h-5 sm:w-6 sm:h-6 ${stat.color}`} />
// //                     </div>
// //                   </div>
// //                 </CardContent>
// //               </Card>
// //             ))}
// //           </motion.div>

// //           <div className="grid lg:grid-cols-3 gap-6 lg:gap-8">
// //             {/* Main Content */}
// //             <div className="lg:col-span-2 space-y-6 lg:space-y-8">
// //               {/* Course Tabs */}
// //               <motion.div
// //                 initial={{ opacity: 0, y: 20 }}
// //                 animate={{ opacity: 1, y: 0 }}
// //                 transition={{ duration: 0.6, delay: 0.2 }}
// //               >
// //                 <Tabs defaultValue="enrolled" className="w-full">
// //                   <TabsList className="grid w-full grid-cols-3">
// //                     <TabsTrigger value="enrolled" className="text-xs sm:text-sm">Enrolled</TabsTrigger>
// //                     <TabsTrigger value="completed" className="text-xs sm:text-sm">Completed</TabsTrigger>
// //                     <TabsTrigger value="certificates" className="text-xs sm:text-sm">Certificates</TabsTrigger>
// //                   </TabsList>

// //                   <TabsContent value="enrolled" className="mt-6">
// //                     <div className="space-y-4">
// //                       {enrolledCourses.filter(course => !course.completed).map((course) => (
// //                         <Card key={course.id} className="hover:shadow-lg transition-shadow">
// //                           <CardContent className="p-4 sm:p-6">
// //                             <div className="flex flex-col sm:flex-row items-start gap-4">
// //                               <img
// //                                 src={course.thumbnail || 'https://images.pexels.com/photos/5212345/pexels-photo-5212345.jpeg'}
// //                                 alt={course.title}
// //                                 className="w-full sm:w-20 h-40 sm:h-20 rounded-lg object-cover"
// //                               />
// //                               <div className="flex-1 w-full">
// //                                 <h3 className="font-semibold text-lg mb-2">{course.title}</h3>
// //                                 <p className="text-muted-foreground text-sm mb-3 line-clamp-2">{course.description}</p>
// //                                 <div className="flex flex-wrap items-center gap-2 sm:gap-4 mb-3">
// //                                   <Badge variant="secondary">{course.category}</Badge>
// //                                   <div className="flex items-center gap-1 text-sm text-muted-foreground">
// //                                     <Clock className="w-4 h-4" />
// //                                     {course.duration}
// //                                   </div>
// //                                   {course.certificateEligible && (
// //                                     <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100">
// //                                       <Award className="w-3 h-3 mr-1" />
// //                                       Certificate Ready
// //                                     </Badge>
// //                                   )}
// //                                 </div>
// //                                 <div className="space-y-2">
// //                                   <div className="flex justify-between items-center text-sm">
// //                                     <span>Progress</span>
// //                                     <span>{course.progress}%</span>
// //                                   </div>
// //                                   <Progress value={course.progress} className="w-full" />
// //                                 </div>
// //                               </div>
// //                               <div className="flex flex-row sm:flex-col gap-2 w-full sm:w-auto">
// //                                 <Button
// //                                   className="flex items-center gap-2 flex-1 sm:flex-none"
// //                                   onClick={() => handleContinueCourse(course.id)}
// //                                 >
// //                                   <Play className="w-4 h-4" />
// //                                   Continue
// //                                 </Button>
// //                                 {course.certificateEligible && (
// //                                   <Button
// //                                     variant="outline"
// //                                     size="sm"
// //                                     className="text-xs flex-1 sm:flex-none"
// //                                     onClick={() => downloadCertificate(course.id)}
// //                                   >
// //                                     <Download className="w-3 h-3 mr-1" />
// //                                     Certificate
// //                                   </Button>
// //                                 )}
// //                               </div>
// //                             </div>
// //                           </CardContent>
// //                         </Card>
// //                       ))}

// //                       {enrolledCourses.filter(course => !course.completed).length === 0 && (
// //                         <Card>
// //                           <CardContent className="p-12 text-center">
// //                             <BookOpen className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
// //                             <p className="text-muted-foreground mb-4">No enrolled courses yet.</p>
// //                             <Link href="/courses">
// //                               <Button>Browse Courses</Button>
// //                             </Link>
// //                           </CardContent>
// //                         </Card>
// //                       )}
// //                     </div>
// //                   </TabsContent>

// //                   <TabsContent value="completed" className="mt-6">
// //                     <div className="space-y-4">
// //                       {enrolledCourses.filter(course => course.completed).map((course) => (
// //                         <Card key={course.id} className="hover:shadow-lg transition-shadow">
// //                           <CardContent className="p-4 sm:p-6">
// //                             <div className="flex flex-col sm:flex-row items-start gap-4">
// //                               <img
// //                                 src={course.thumbnail || 'https://images.pexels.com/photos/5212345/pexels-photo-5212345.jpeg'}
// //                                 alt={course.title}
// //                                 className="w-full sm:w-20 h-40 sm:h-20 rounded-lg object-cover"
// //                               />
// //                               <div className="flex-1 w-full">
// //                                 <h3 className="font-semibold text-lg mb-2">{course.title}</h3>
// //                                 <p className="text-muted-foreground text-sm mb-3 line-clamp-2">{course.description}</p>
// //                                 <div className="flex flex-wrap items-center gap-2 sm:gap-4">
// //                                   <Badge variant="secondary" className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100">
// //                                     <CheckCircle className="w-3 h-3 mr-1" />
// //                                     Completed
// //                                   </Badge>
// //                                   <div className="flex items-center gap-1 text-sm text-muted-foreground">
// //                                     <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
// //                                     Rate Course
// //                                   </div>
// //                                 </div>
// //                               </div>
// //                               <div className="flex flex-row sm:flex-col gap-2 w-full sm:w-auto">
// //                                 <Button
// //                                   variant="outline"
// //                                   className="flex items-center gap-2 flex-1 sm:flex-none"
// //                                   onClick={() => handleContinueCourse(course.id)}
// //                                 >
// //                                   <ExternalLink className="w-4 h-4" />
// //                                   Review
// //                                 </Button>
// //                                 <Button
// //                                   variant="outline"
// //                                   className="flex items-center gap-2 flex-1 sm:flex-none"
// //                                   onClick={() => downloadCertificate(course.id)}
// //                                   disabled={!course.canDownloadCertificate}
// //                                 >
// //                                   <Download className="w-4 h-4" />
// //                                   Certificate
// //                                 </Button>
// //                               </div>
// //                             </div>
// //                           </CardContent>
// //                         </Card>
// //                       ))}

// //                       {enrolledCourses.filter(course => course.completed).length === 0 && (
// //                         <Card>
// //                           <CardContent className="p-12 text-center">
// //                             <Award className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
// //                             <p className="text-muted-foreground">No completed courses yet.</p>
// //                             <p className="text-sm text-muted-foreground mt-2">
// //                               Complete your enrolled courses to earn certificates!
// //                             </p>
// //                           </CardContent>
// //                         </Card>
// //                       )}
// //                     </div>
// //                   </TabsContent>

// //                   <TabsContent value="certificates" className="mt-6">
// //                     <div className="space-y-4">
// //                       {enrolledCourses.filter(course => course.canDownloadCertificate || course.certificateEligible).map((course) => (
// //                         <Card key={course.id} className="hover:shadow-lg transition-shadow">
// //                           <CardContent className="p-4 sm:p-6">
// //                             <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
// //                               <div className="flex flex-col sm:flex-row items-center gap-4 w-full">
// //                                 <div className="w-16 h-16 bg-gradient-to-br from-primary to-blue-600 rounded-lg flex items-center justify-center">
// //                                   <Award className="w-8 h-8 text-white" />
// //                                 </div>
// //                                 <div className="text-center sm:text-left">
// //                                   <h3 className="font-semibold text-lg">{course.title}</h3>
// //                                   <p className="text-muted-foreground">
// //                                     Progress: {course.progress}%
// //                                   </p>
// //                                   <p className="text-sm text-muted-foreground">
// //                                     {course.completed ? 'Course Completed' : 'Certificate Available'}
// //                                   </p>
// //                                 </div>
// //                               </div>
// //                               <div className="flex flex-row sm:flex-col gap-2 w-full sm:w-auto">
// //                                 <Button
// //                                   className="flex items-center gap-2 flex-1 sm:flex-none"
// //                                   onClick={() => downloadCertificate(course.id)}
// //                                 >
// //                                   <Download className="w-4 h-4" />
// //                                   Download
// //                                 </Button>
// //                                 <Button
// //                                   variant="outline"
// //                                   size="sm"
// //                                   className="flex-1 sm:w-full"
// //                                   onClick={() => handleContinueCourse(course.id)}
// //                                 >
// //                                   View Course
// //                                 </Button>
// //                               </div>
// //                             </div>
// //                           </CardContent>
// //                         </Card>
// //                       ))}

// //                       {enrolledCourses.filter(course => course.canDownloadCertificate || course.certificateEligible).length === 0 && (
// //                         <Card>
// //                           <CardContent className="p-12 text-center">
// //                             <Award className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
// //                             <p className="text-muted-foreground">No certificates available yet.</p>
// //                             <p className="text-sm text-muted-foreground mt-2">
// //                               Certificates become available after completing 40% of a course.
// //                             </p>
// //                           </CardContent>
// //                         </Card>
// //                       )}
// //                     </div>
// //                   </TabsContent>
// //                 </Tabs>
// //               </motion.div>
// //             </div>

// //             {/* Sidebar */}
// //             <div className="space-y-6">
// //               {/* Referral Card */}
// //               <motion.div
// //                 initial={{ opacity: 0, x: 20 }}
// //                 animate={{ opacity: 1, x: 0 }}
// //                 transition={{ duration: 0.6, delay: 0.3 }}
// //               >
// //                 <Card>
// //                   <CardHeader>
// //                     <CardTitle className="flex items-center gap-2">
// //                       <Gift className="w-5 h-5" />
// //                       Refer & Earn
// //                     </CardTitle>
// //                     <CardDescription>
// //                       Earn credits when your friends join and purchase courses
// //                     </CardDescription>
// //                   </CardHeader>
// //                   <CardContent className="space-y-4">
// //                     <div className="p-3 bg-primary/10 rounded-lg text-center">
// //                       <p className="text-2xl font-bold text-primary">{userStats.credits}</p>
// //                       <p className="text-sm text-muted-foreground">Available Credits</p>
// //                     </div>

// //                     <div className="space-y-2">
// //                       <Label htmlFor="referral-code">Your Referral Code</Label>
// //                       <div className="flex gap-2">
// //                         <Input
// //                           id="referral-code"
// //                           value={referralCode}
// //                           readOnly
// //                           className="font-mono text-sm"
// //                         />
// //                         <Button
// //                           size="sm"
// //                           variant="outline"
// //                           onClick={copyReferralLink}
// //                         >
// //                           <Copy className="w-4 h-4" />
// //                         </Button>
// //                       </div>
// //                     </div>

// //                     <div className="text-sm text-muted-foreground space-y-1">
// //                       <p>• Earn 100 credits per successful referral</p>
// //                       <p>• Use credits for discounts on courses</p>
// //                     </div>
// //                   </CardContent>
// //                 </Card>
// //               </motion.div>

// //               {/* Recent Activity */}
// //               <motion.div
// //                 initial={{ opacity: 0, x: 20 }}
// //                 animate={{ opacity: 1, x: 0 }}
// //                 transition={{ duration: 0.6, delay: 0.4 }}
// //               >
// //                 <Card>
// //                   <CardHeader>
// //                     <CardTitle className="flex items-center gap-2">
// //                       <TrendingUp className="w-5 h-5" />
// //                       Recent Activity
// //                     </CardTitle>
// //                   </CardHeader>
// //                   <CardContent className="space-y-4">
// //                     {recentActivity.length > 0 ? (
// //                       recentActivity.map((activity, index) => (
// //                         <div key={index} className="flex items-start gap-3 p-3 rounded-lg bg-muted/50">
// //                           <div className="w-2 h-2 bg-primary rounded-full mt-2" />
// //                           <div className="flex-1">
// //                             <p className="text-sm font-medium">{activity.title}</p>
// //                             <p className="text-xs text-muted-foreground">{activity.description}</p>
// //                             <p className="text-xs text-muted-foreground mt-1">{activity.timestamp}</p>
// //                           </div>
// //                         </div>
// //                       ))
// //                     ) : (
// //                       <p className="text-sm text-muted-foreground text-center py-4">
// //                         No recent activity
// //                       </p>
// //                     )}
// //                   </CardContent>
// //                 </Card>
// //               </motion.div>
// //             </div>
// //           </div>
// //         </div>
// //       </main>
// //     </div>
// //   );
// // }

// 'use client';

// import { useState, useEffect } from 'react';
// import { motion } from 'framer-motion';
// import { sendPasswordResetEmail } from 'firebase/auth';
// import { auth } from '@/lib/firebase';
// import {
//   BookOpen,
//   Award,
//   Clock,
//   TrendingUp,
//   Play,
//   Download,
//   Users,
//   Star,
//   Gift,
//   Copy,
//   CheckCircle,
//   Settings,
//   User,
//   CreditCard,
//   Bell,
//   Lock,
//   Eye,
//   EyeOff,
//   LogOut,
//   ExternalLink,
//   Shield,
//   Mail
// } from 'lucide-react';
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
// import { Button } from '@/components/ui/button';
// import { Badge } from '@/components/ui/badge';
// import { Progress } from '@/components/ui/progress';
// import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
// import { Input } from '@/components/ui/input';
// import { Label } from '@/components/ui/label';
// import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
// import { toast } from 'sonner';
// import { useAuth } from '@/components/auth-provider';
// import Navbar from '@/components/navbar';
// import { useRouter } from 'next/navigation';
// import Link from 'next/link';

// export default function Dashboard() {
//   const { user, logout, loading } = useAuth();
//   const router = useRouter();
//   const [userStats, setUserStats] = useState({
//     enrolledCourses: 0,
//     completedCourses: 0,
//     certificatesEarned: 0,
//     totalWatchTime: 0,
//     credits: 0
//   });
//   const [enrolledCourses, setEnrolledCourses] = useState([]);
//   const [recentActivity, setRecentActivity] = useState([]);
//   const [referralCode, setReferralCode] = useState('');
//   const [profileData, setProfileData] = useState({
//     fullName: '',
//     email: '',
//     location: '',
//   });
//   const [isProfileDialogOpen, setIsProfileDialogOpen] = useState(false);
//   const [isPasswordDialogOpen, setIsPasswordDialogOpen] = useState(false);
//   const [isLoading, setIsLoading] = useState(false);
//   const [isDashboardLoading, setIsDashboardLoading] = useState(true);

//   // Redirect to login if not authenticated
//   useEffect(() => {
//     if (!loading && !user) {
//       console.log('User not authenticated, redirecting to login');
//       router.replace('/auth/login');
//       return;
//     }

//     if (user) {
//       console.log('Dashboard loaded for user:', user.id);
//       fetchUserData();
//       setReferralCode(user.referralCode || '');
//       setProfileData({
//         fullName: user.fullName || '',
//         email: user.email || '',
//         location: user.location || '',
//       });
//     }
//   }, [user, loading, router]);

//   const fetchUserData = async () => {
//     try {
//       setIsDashboardLoading(true);

//       const response = await fetch('/api/user/dashboard', {
//         credentials: 'include',
//       });

//       if (response.ok) {
//         const data = await response.json();
//         console.log('Dashboard data received:', data);
//         setUserStats(data.stats);
//         setEnrolledCourses(data.enrolledCourses);
//         setRecentActivity(data.recentActivity);
//       } else if (response.status === 401) {
//         // Token expired, logout user
//         console.log('Token expired, logging out');
//         logout();
//       } else {
//         const errorData = await response.json();
//         console.error('Dashboard API error:', errorData);
//         toast.error('Failed to load dashboard data');
//       }
//     } catch (error) {
//       console.error('Error fetching user data:', error);
//       toast.error('Something went wrong while loading your dashboard');
//     } finally {
//       setIsDashboardLoading(false);
//     }
//   };

//   const updateProfile = async () => {
//     if (!profileData.fullName || !profileData.location) {
//       toast.error('Please fill in all required fields');
//       return;
//     }

//     setIsLoading(true);
//     try {
//       const response = await fetch('/api/user/profile', {
//         method: 'PUT',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         credentials: 'include',
//         body: JSON.stringify(profileData),
//       });

//       if (response.ok) {
//         toast.success('Profile updated successfully!');
//         setIsProfileDialogOpen(false);
//         // Refresh user data
//         fetchUserData();
//       } else {
//         const data = await response.json();
//         toast.error(data.message || 'Failed to update profile');
//       }
//     } catch (error) {
//       console.error('Error updating profile:', error);
//       toast.error('Something went wrong. Please try again.');
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const sendPasswordResetLink = async () => {
//     setIsLoading(true);
//     try {
//       const response = await fetch('/api/user/send-password-reset', {
//         method: 'POST',
//         credentials: 'include',
//       });

//       const data = await response.json();

//       if (response.ok) {
//         toast.success(data.message);
//       } else {
//         toast.error(data.message || 'Failed to send password reset email');
//       }

//       setIsPasswordDialogOpen(false);
//     } catch (error) {
//       console.error('Error sending password reset email:', error);
//       toast.error('Something went wrong. Please try again.');
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const copyReferralLink = () => {
//     const referralLink = `${window.location.origin}/auth/register?ref=${referralCode}`;
//     navigator.clipboard.writeText(referralLink);
//     toast.success('Referral link copied to clipboard!');
//   };

//   const downloadCertificate = async (courseId) => {
//     try {
//       console.log('Downloading certificate for courseId:', courseId);

//       if (!courseId) {
//         toast.error('Invalid course ID');
//         return;
//       }

//       const url = `/api/certificates/download/${courseId}`;
//       console.log('Making request to:', url);

//       const response = await fetch(url, {
//         credentials: 'include',
//       });

//       console.log('Response status:', response.status);
//       console.log('Response headers:', response.headers);

//       if (response.ok) {
//         const blob = await response.blob();
//         const url = window.URL.createObjectURL(blob);
//         const a = document.createElement('a');
//         a.style.display = 'none';
//         a.href = url;

//         // Get course name for filename
//         const course = enrolledCourses.find(c => c.id === courseId);
//         const filename = `${course?.title || 'course'}-certificate.pdf`;

//         a.download = filename;
//         document.body.appendChild(a);
//         a.click();
//         window.URL.revokeObjectURL(url);
//         document.body.removeChild(a);
//         toast.success('Certificate downloaded successfully!');
//       } else {
//         const data = await response.json();
//         console.error('Error response:', data);
//         toast.error(data.error || 'Error downloading certificate');
//       }
//     } catch (error) {
//       console.error('Error downloading certificate:', error);
//       toast.error('Error downloading certificate');
//     }
//   };

//   const handleLogout = async () => {
//     try {
//       console.log('Logging out from dashboard...');
//       await logout();
//       toast.success('Logged out successfully');
//     } catch (error) {
//       console.error('Logout error:', error);
//       toast.error('Error logging out');
//     }
//   };

//   const handleContinueCourse = (courseId) => {
//     console.log('Navigating to course:', courseId);
//     router.push(`/course/${courseId}`);
//   };

//   const stats = [
//     {
//       title: 'Enrolled Courses',
//       value: userStats.enrolledCourses,
//       icon: BookOpen,
//       color: 'text-blue-600',
//       bgColor: 'bg-blue-50 dark:bg-blue-950'
//     },
//     {
//       title: 'Completed',
//       value: userStats.completedCourses,
//       icon: CheckCircle,
//       color: 'text-green-600',
//       bgColor: 'bg-green-50 dark:bg-green-950'
//     },
//     {
//       title: 'Certificates',
//       value: userStats.certificatesEarned,
//       icon: Award,
//       color: 'text-purple-600',
//       bgColor: 'bg-purple-50 dark:bg-purple-950'
//     },
//     {
//       title: 'Credits',
//       value: userStats.credits,
//       icon: Gift,
//       color: 'text-orange-600',
//       bgColor: 'bg-orange-50 dark:bg-orange-950'
//     }
//   ];

//   if (loading || isDashboardLoading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center">
//         <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
//       </div>
//     );
//   }

//   if (!user) {
//     return null; // Will redirect in useEffect
//   }

//   return (
//     <div className="min-h-screen bg-background">
//       <Navbar />

//       <main className="pt-20 pb-12">
//         <div className="container mx-auto px-4">
//           {/* Header with Profile Actions */}
//           <motion.div
//             className="mb-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4"
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.6 }}
//           >
//             <div>
//               <h1 className="text-2xl sm:text-3xl font-bold mb-2">
//                 Welcome back, {user.fullName}! 👋
//               </h1>
//               <p className="text-muted-foreground">
//                 Continue your learning journey and track your progress.
//               </p>
//             </div>
//             <div className="flex gap-2 flex-wrap w-full sm:w-auto">
//               <Dialog open={isProfileDialogOpen} onOpenChange={(open) => {
//                 setIsProfileDialogOpen(open);
//                 if (!open) {
//                   // Reset form when dialog closes
//                   setProfileData({
//                     fullName: user.fullName || '',
//                     email: user.email || '',
//                     location: user.location || '',
//                   });
//                 }
//               }}>
//                 <DialogTrigger asChild>
//                   <Button variant="outline" className="flex items-center gap-2 flex-1 sm:flex-none">
//                     <User className="w-4 h-4" />
//                     Profile
//                   </Button>
//                 </DialogTrigger>
//                 <DialogContent className="sm:max-w-md">
//                   <DialogHeader>
//                     <DialogTitle>Edit Profile</DialogTitle>
//                     <DialogDescription>
//                       Update your profile information
//                     </DialogDescription>
//                   </DialogHeader>
//                   <div className="space-y-4">
//                     <div className="space-y-2">
//                       <Label htmlFor="fullName">Full Name</Label>
//                       <Input
//                         id="fullName"
//                         value={profileData.fullName}
//                         onChange={(e) => setProfileData(prev => ({ ...prev, fullName: e.target.value }))}
//                         placeholder="Enter your full name"
//                       />
//                     </div>
//                     <div className="space-y-2">
//                       <Label htmlFor="email">Email (Cannot be changed)</Label>
//                       <Input
//                         id="email"
//                         value={profileData.email}
//                         disabled
//                         className="bg-muted"
//                       />
//                     </div>
//                     <div className="space-y-2">
//                       <Label htmlFor="location">Location</Label>
//                       <Input
//                         id="location"
//                         value={profileData.location}
//                         onChange={(e) => setProfileData(prev => ({ ...prev, location: e.target.value }))}
//                         placeholder="Enter your location"
//                       />
//                     </div>
//                     <div className="flex gap-2">
//                       <Button onClick={updateProfile} disabled={isLoading} className="flex-1">
//                         {isLoading ? 'Updating...' : 'Update Profile'}
//                       </Button>
//                       <Button variant="outline" onClick={() => setIsProfileDialogOpen(false)}>
//                         Cancel
//                       </Button>
//                     </div>
//                   </div>
//                 </DialogContent>
//               </Dialog>

//               <Dialog open={isPasswordDialogOpen} onOpenChange={setIsPasswordDialogOpen}>
//                 <DialogTrigger asChild>
//                   <Button variant="outline" className="flex items-center gap-2 flex-1 sm:flex-none">
//                     <Lock className="w-4 h-4" />
//                     Change Password
//                   </Button>
//                 </DialogTrigger>
//                 <DialogContent className="sm:max-w-md">
//                   <DialogHeader className="text-center">
//                     <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mx-auto mb-4">
//                       <Mail className="w-8 h-8 text-blue-600 dark:text-blue-400" />
//                     </div>
//                     <DialogTitle>Change Your Password</DialogTitle>
//                     <DialogDescription>
//                       We'll send a secure password reset link to your email address. Click the link in your email to create a new password.
//                     </DialogDescription>
//                   </DialogHeader>

//                   <div className="space-y-6">
//                     <div className="p-4 bg-blue-50 dark:bg-blue-950/50 rounded-lg">
//                       <div className="flex items-center gap-3">
//                         <Mail className="w-5 h-5 text-blue-600" />
//                         <div>
//                           <p className="font-medium text-sm">Reset link will be sent to:</p>
//                           <p className="text-sm text-muted-foreground">{user.email}</p>
//                         </div>
//                       </div>
//                     </div>

//                     <div className="space-y-3">
//                       <Button 
//                         onClick={sendPasswordResetLink} 
//                         disabled={isLoading} 
//                         className="w-full"
//                       >
//                         {isLoading ? 'Sending...' : 'Send Password Reset Link'}
//                       </Button>

//                       <Button 
//                         variant="outline" 
//                         onClick={() => setIsPasswordDialogOpen(false)}
//                         className="w-full"
//                         disabled={isLoading}
//                       >
//                         Cancel
//                       </Button>
//                     </div>

//                     <div className="text-xs text-muted-foreground space-y-1">
//                       <p>• Check your email inbox and spam folder</p>
//                       <p>• The reset link expires in 1 hour</p>
//                       <p>• You can request a new link if needed</p>
//                     </div>
//                   </div>
//                 </DialogContent>
//               </Dialog>

//               <Button variant="outline" onClick={handleLogout} className="flex items-center gap-2 text-red-600 hover:text-red-700 flex-1 sm:flex-none">
//                 <LogOut className="w-4 h-4" />
//                 Logout
//               </Button>
//             </div>
//           </motion.div>

//           {/* Stats Cards */}
//           <motion.div
//             className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8"
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.6, delay: 0.1 }}
//           >
//             {stats.map((stat, index) => (
//               <Card key={stat.title} className="hover:shadow-lg transition-shadow">
//                 <CardContent className="p-4 sm:p-6">
//                   <div className="flex items-center justify-between">
//                     <div>
//                       <p className="text-sm text-muted-foreground mb-1">{stat.title}</p>
//                       <p className="text-xl sm:text-2xl font-bold">{stat.value}</p>
//                     </div>
//                     <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-lg flex items-center justify-center ${stat.bgColor}`}>
//                       <stat.icon className={`w-5 h-5 sm:w-6 sm:h-6 ${stat.color}`} />
//                     </div>
//                   </div>
//                 </CardContent>
//               </Card>
//             ))}
//           </motion.div>

//           <div className="grid lg:grid-cols-3 gap-6 lg:gap-8">
//             {/* Main Content */}
//             <div className="lg:col-span-2 space-y-6 lg:space-y-8">
//               {/* Course Tabs */}
//               <motion.div
//                 initial={{ opacity: 0, y: 20 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ duration: 0.6, delay: 0.2 }}
//               >
//                 <Tabs defaultValue="enrolled" className="w-full">
//                   <TabsList className="grid w-full grid-cols-3">
//                     <TabsTrigger value="enrolled" className="text-xs sm:text-sm">Enrolled</TabsTrigger>
//                     <TabsTrigger value="completed" className="text-xs sm:text-sm">Completed</TabsTrigger>
//                     <TabsTrigger value="certificates" className="text-xs sm:text-sm">Certificates</TabsTrigger>
//                   </TabsList>

//                   <TabsContent value="enrolled" className="mt-6">
//                     <div className="space-y-4">
//                       {enrolledCourses.filter(course => !course.completed).map((course) => (
//                         <Card key={course.id} className="hover:shadow-lg transition-shadow">
//                           <CardContent className="p-4 sm:p-6">
//                             <div className="flex flex-col sm:flex-row items-start gap-4">
//                               <img
//                                 src={course.thumbnail || 'https://images.pexels.com/photos/5212345/pexels-photo-5212345.jpeg'}
//                                 alt={course.title}
//                                 className="w-full sm:w-20 h-40 sm:h-20 rounded-lg object-cover"
//                               />
//                               <div className="flex-1 w-full">
//                                 <h3 className="font-semibold text-lg mb-2">{course.title}</h3>
//                                 <p className="text-muted-foreground text-sm mb-3 line-clamp-2">{course.description}</p>
//                                 <div className="flex flex-wrap items-center gap-2 sm:gap-4 mb-3">
//                                   <Badge variant="secondary">{course.category}</Badge>
//                                   <div className="flex items-center gap-1 text-sm text-muted-foreground">
//                                     <Clock className="w-4 h-4" />
//                                     {course.duration}
//                                   </div>
//                                   {course.certificateEligible && (
//                                     <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100">
//                                       <Award className="w-3 h-3 mr-1" />
//                                       Certificate Ready
//                                     </Badge>
//                                   )}
//                                 </div>
//                                 <div className="space-y-2">
//                                   <div className="flex justify-between items-center text-sm">
//                                     <span>Progress</span>
//                                     <span>{course.progress}%</span>
//                                   </div>
//                                   <Progress value={course.progress} className="w-full" />
//                                 </div>
//                               </div>
//                               <div className="flex flex-row sm:flex-col gap-2 w-full sm:w-auto">
//                                 <Button
//                                   className="flex items-center gap-2 flex-1 sm:flex-none"
//                                   onClick={() => handleContinueCourse(course.id)}
//                                 >
//                                   <Play className="w-4 h-4" />
//                                   Continue
//                                 </Button>
//                                 {course.certificateEligible && (
//                                   <Button
//                                     variant="outline"
//                                     size="sm"
//                                     className="text-xs flex-1 sm:flex-none"
//                                     onClick={() => downloadCertificate(course.id)}
//                                   >
//                                     <Download className="w-3 h-3 mr-1" />
//                                     Certificate
//                                   </Button>
//                                 )}
//                               </div>
//                             </div>
//                           </CardContent>
//                         </Card>
//                       ))}

//                       {enrolledCourses.filter(course => !course.completed).length === 0 && (
//                         <Card>
//                           <CardContent className="p-12 text-center">
//                             <BookOpen className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
//                             <p className="text-muted-foreground mb-4">No enrolled courses yet.</p>
//                             <Link href="/courses">
//                               <Button>Browse Courses</Button>
//                             </Link>
//                           </CardContent>
//                         </Card>
//                       )}
//                     </div>
//                   </TabsContent>

//                   <TabsContent value="completed" className="mt-6">
//                     <div className="space-y-4">
//                       {enrolledCourses.filter(course => course.completed).map((course) => (
//                         <Card key={course.id} className="hover:shadow-lg transition-shadow">
//                           <CardContent className="p-4 sm:p-6">
//                             <div className="flex flex-col sm:flex-row items-start gap-4">
//                               <img
//                                 src={course.thumbnail || 'https://images.pexels.com/photos/5212345/pexels-photo-5212345.jpeg'}
//                                 alt={course.title}
//                                 className="w-full sm:w-20 h-40 sm:h-20 rounded-lg object-cover"
//                               />
//                               <div className="flex-1 w-full">
//                                 <h3 className="font-semibold text-lg mb-2">{course.title}</h3>
//                                 <p className="text-muted-foreground text-sm mb-3 line-clamp-2">{course.description}</p>
//                                 <div className="flex flex-wrap items-center gap-2 sm:gap-4">
//                                   <Badge variant="secondary" className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100">
//                                     <CheckCircle className="w-3 h-3 mr-1" />
//                                     Completed
//                                   </Badge>
//                                   <div className="flex items-center gap-1 text-sm text-muted-foreground">
//                                     <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
//                                     Rate Course
//                                   </div>
//                                 </div>
//                               </div>
//                               <div className="flex flex-row sm:flex-col gap-2 w-full sm:w-auto">
//                                 <Button
//                                   variant="outline"
//                                   className="flex items-center gap-2 flex-1 sm:flex-none"
//                                   onClick={() => handleContinueCourse(course.id)}
//                                 >
//                                   <ExternalLink className="w-4 h-4" />
//                                   Review
//                                 </Button>
//                                 <Button
//                                   variant="outline"
//                                   className="flex items-center gap-2 flex-1 sm:flex-none"
//                                   onClick={() => downloadCertificate(course.id)}
//                                   disabled={!course.canDownloadCertificate}
//                                 >
//                                   <Download className="w-4 h-4" />
//                                   Certificate
//                                 </Button>
//                               </div>
//                             </div>
//                           </CardContent>
//                         </Card>
//                       ))}

//                       {enrolledCourses.filter(course => course.completed).length === 0 && (
//                         <Card>
//                           <CardContent className="p-12 text-center">
//                             <Award className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
//                             <p className="text-muted-foreground">No completed courses yet.</p>
//                             <p className="text-sm text-muted-foreground mt-2">
//                               Complete your enrolled courses to earn certificates!
//                             </p>
//                           </CardContent>
//                         </Card>
//                       )}
//                     </div>
//                   </TabsContent>

//                   <TabsContent value="certificates" className="mt-6">
//                     <div className="space-y-4">
//                       {enrolledCourses.filter(course => course.canDownloadCertificate || course.certificateEligible).map((course) => (
//                         <Card key={course.id} className="hover:shadow-lg transition-shadow">
//                           <CardContent className="p-4 sm:p-6">
//                             <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
//                               <div className="flex flex-col sm:flex-row items-center gap-4 w-full">
//                                 <div className="w-16 h-16 bg-gradient-to-br from-primary to-blue-600 rounded-lg flex items-center justify-center">
//                                   <Award className="w-8 h-8 text-white" />
//                                 </div>
//                                 <div className="text-center sm:text-left">
//                                   <h3 className="font-semibold text-lg">{course.title}</h3>
//                                   <p className="text-muted-foreground">
//                                     Progress: {course.progress}%
//                                   </p>
//                                   <p className="text-sm text-muted-foreground">
//                                     {course.completed ? 'Course Completed' : 'Certificate Available'}
//                                   </p>
//                                 </div>
//                               </div>
//                               <div className="flex flex-row sm:flex-col gap-2 w-full sm:w-auto">
//                                 <Button
//                                   className="flex items-center gap-2 flex-1 sm:flex-none"
//                                   onClick={() => downloadCertificate(course.id)}
//                                 >
//                                   <Download className="w-4 h-4" />
//                                   Download
//                                 </Button>
//                                 <Button
//                                   variant="outline"
//                                   size="sm"
//                                   className="flex-1 sm:w-full"
//                                   onClick={() => handleContinueCourse(course.id)}
//                                 >
//                                   View Course
//                                 </Button>
//                               </div>
//                             </div>
//                           </CardContent>
//                         </Card>
//                       ))}

//                       {enrolledCourses.filter(course => course.canDownloadCertificate || course.certificateEligible).length === 0 && (
//                         <Card>
//                           <CardContent className="p-12 text-center">
//                             <Award className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
//                             <p className="text-muted-foreground">No certificates available yet.</p>
//                             <p className="text-sm text-muted-foreground mt-2">
//                               Certificates become available after completing 40% of a course.
//                             </p>
//                           </CardContent>
//                         </Card>
//                       )}
//                     </div>
//                   </TabsContent>
//                 </Tabs>
//               </motion.div>
//             </div>

//             {/* Sidebar */}
//             <div className="space-y-6">
//               {/* Referral Card */}
//               <motion.div
//                 initial={{ opacity: 0, x: 20 }}
//                 animate={{ opacity: 1, x: 0 }}
//                 transition={{ duration: 0.6, delay: 0.3 }}
//               >
//                 <Card>
//                   <CardHeader>
//                     <CardTitle className="flex items-center gap-2">
//                       <Gift className="w-5 h-5" />
//                       Refer & Earn
//                     </CardTitle>
//                     <CardDescription>
//                       Earn credits when your friends join and purchase courses
//                     </CardDescription>
//                   </CardHeader>
//                   <CardContent className="space-y-4">
//                     <div className="p-3 bg-primary/10 rounded-lg text-center">
//                       <p className="text-2xl font-bold text-primary">{userStats.credits}</p>
//                       <p className="text-sm text-muted-foreground">Available Credits</p>
//                     </div>

//                     <div className="space-y-2">
//                       <Label htmlFor="referral-code">Your Referral Code</Label>
//                       <div className="flex gap-2">
//                         <Input
//                           id="referral-code"
//                           value={referralCode}
//                           readOnly
//                           className="font-mono text-sm"
//                         />
//                         <Button
//                           size="sm"
//                           variant="outline"
//                           onClick={copyReferralLink}
//                         >
//                           <Copy className="w-4 h-4" />
//                         </Button>
//                       </div>
//                     </div>

//                     <div className="text-sm text-muted-foreground space-y-1">
//                       <p>• Earn 100 credits per successful referral</p>
//                       <p>• Use credits for discounts on courses</p>
//                     </div>
//                   </CardContent>
//                 </Card>
//               </motion.div>

//               {/* Recent Activity */}
//               <motion.div
//                 initial={{ opacity: 0, x: 20 }}
//                 animate={{ opacity: 1, x: 0 }}
//                 transition={{ duration: 0.6, delay: 0.4 }}
//               >
//                 <Card>
//                   <CardHeader>
//                     <CardTitle className="flex items-center gap-2">
//                       <TrendingUp className="w-5 h-5" />
//                       Recent Activity
//                     </CardTitle>
//                   </CardHeader>
//                   <CardContent className="space-y-4">
//                     {recentActivity.length > 0 ? (
//                       recentActivity.map((activity, index) => (
//                         <div key={index} className="flex items-start gap-3 p-3 rounded-lg bg-muted/50">
//                           <div className="w-2 h-2 bg-primary rounded-full mt-2" />
//                           <div className="flex-1">
//                             <p className="text-sm font-medium">{activity.title}</p>
//                             <p className="text-xs text-muted-foreground">{activity.description}</p>
//                             <p className="text-xs text-muted-foreground mt-1">{activity.timestamp}</p>
//                           </div>
//                         </div>
//                       ))
//                     ) : (
//                       <p className="text-sm text-muted-foreground text-center py-4">
//                         No recent activity
//                       </p>
//                     )}
//                   </CardContent>
//                 </Card>
//               </motion.div>
//             </div>
//           </div>
//         </div>
//       </main>
//     </div>
//   );
// }

'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "@/lib/firebase";
import {
  BookOpen,
  Award,
  Clock,
  TrendingUp,
  Play,
  Download,
  Users,
  Star,
  Gift,
  Copy,
  CheckCircle,
  Settings,
  User,
  CreditCard,
  Bell,
  Lock,
  Eye,
  EyeOff,
  LogOut,
  ExternalLink,
  Shield,
  Mail
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { toast } from 'sonner';
import { useAuth } from '@/components/auth-provider';
import Navbar from '@/components/navbar';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function Dashboard() {
  const { user, logout, loading } = useAuth();
  const router = useRouter();
  const [userStats, setUserStats] = useState({
    enrolledCourses: 0,
    completedCourses: 0,
    certificatesEarned: 0,
    totalWatchTime: 0,
    credits: 0
  });
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [recentActivity, setRecentActivity] = useState([]);
  const [referralCode, setReferralCode] = useState('');
  const [profileData, setProfileData] = useState({
    fullName: '',
    email: '',
    location: '',
  });
  const [isProfileDialogOpen, setIsProfileDialogOpen] = useState(false);
  const [isPasswordDialogOpen, setIsPasswordDialogOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isDashboardLoading, setIsDashboardLoading] = useState(true);

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!loading && !user) {
      console.log('User not authenticated, redirecting to login');
      router.replace('/auth/login');
      return;
    }

    if (user) {
      console.log('Dashboard loaded for user:', user.id);
      fetchUserData();
      setReferralCode(user.referralCode || '');
      setProfileData({
        fullName: user.fullName || '',
        email: user.email || '',
        location: user.location || '',
      });
    }
  }, [user, loading, router]);

  const fetchUserData = async () => {
    try {
      setIsDashboardLoading(true);

      const response = await fetch('/api/user/dashboard', {
        credentials: 'include',
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Dashboard data received:', data);
        setUserStats(data.stats);
        setEnrolledCourses(data.enrolledCourses);
        setRecentActivity(data.recentActivity);
      } else if (response.status === 401) {
        // Token expired, logout user
        console.log('Token expired, logging out');
        logout();
      } else {
        const errorData = await response.json();
        console.error('Dashboard API error:', errorData);
        toast.error('Failed to load dashboard data');
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
      toast.error('Something went wrong while loading your dashboard');
    } finally {
      setIsDashboardLoading(false);
    }
  };

  const updateProfile = async () => {
    if (!profileData.fullName || !profileData.location) {
      toast.error('Please fill in all required fields');
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch('/api/user/profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(profileData),
      });

      if (response.ok) {
        toast.success('Profile updated successfully!');
        setIsProfileDialogOpen(false);
        // Refresh user data
        fetchUserData();
      } else {
        const data = await response.json();
        toast.error(data.message || 'Failed to update profile');
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      toast.error('Something went wrong. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  //   const sendPasswordResetLink = async () => {
  //     if (!user?.email) {
  //       toast.error('User email not found');
  //       return; 
  //     }

  //     setIsLoading(true);
  //     try {
  //       const response = await fetch('/api/auth/reset-password', {
  //         method: 'POST',
  //         headers: {
  //           'Content-Type': 'application/json',
  //         },
  //         credentials: 'include',
  //  body: JSON.stringify({
  //         email: user.email, // ✅ send email in request body
  //       }),
  //       });

  //       const data = await response.json();

  //       if (response.ok) {
  //         toast.success(data.message || 'Password reset link sent to your email address!');
  //         setIsPasswordDialogOpen(false);
  //       } else {
  //         toast.error(data.message || 'Failed to send password reset email');
  //       }
  //     } catch (error) {
  //       console.error('Error sending password reset email:', error);
  //       toast.error('Something went wrong. Please try again.');
  //     } finally {
  //       setIsLoading(false);
  //     }
  //   };


  const sendPasswordResetLink = async () => {
    if (!user?.email) {
      toast.error("User email not found");
      return;
    }

    setIsLoading(true);
    try {
      await sendPasswordResetEmail(auth, user.email);
      toast.success("Password reset link sent!");
      setIsPasswordDialogOpen(false);
    } catch (error) {
      console.error("Reset error:", error.code, error.message);
      toast.error(error.message || "Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };
  const copyReferralLink = () => {
    const referralLink = `${window.location.origin}/auth/register?ref=${referralCode}`;
    navigator.clipboard.writeText(referralLink);
    toast.success('Referral link copied to clipboard!');
  };

  const downloadCertificate = async (courseId) => {
    try {
      console.log('Downloading certificate for courseId:', courseId);

      if (!courseId) {
        toast.error('Invalid course ID');
        return;
      }

      const url = `/api/certificates/download/${courseId}`;
      console.log('Making request to:', url);

      const response = await fetch(url, {
        credentials: 'include',
      });

      console.log('Response status:', response.status);
      console.log('Response headers:', response.headers);

      if (response.ok) {
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.style.display = 'none';
        a.href = url;

        // Get course name for filename
        const course = enrolledCourses.find(c => c.id === courseId);
        const filename = `${course?.title || 'course'}-certificate.pdf`;

        a.download = filename;
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
        toast.success('Certificate downloaded successfully!');
      } else {
        const data = await response.json();
        console.error('Error response:', data);
        toast.error(data.error || 'Error downloading certificate');
      }
    } catch (error) {
      console.error('Error downloading certificate:', error);
      toast.error('Error downloading certificate');
    }
  };

  const handleLogout = async () => {
    try {
      console.log('Logging out from dashboard...');
      await logout();
      toast.success('Logged out successfully');
    } catch (error) {
      console.error('Logout error:', error);
      toast.error('Error logging out');
    }
  };

  const handleContinueCourse = (courseId) => {
    console.log('Navigating to course:', courseId);
    router.push(`/course/${courseId}`);
  };

  const stats = [
    {
      title: 'Enrolled Courses',
      value: userStats.enrolledCourses,
      icon: BookOpen,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50 dark:bg-blue-950'
    },
    {
      title: 'Completed',
      value: userStats.completedCourses,
      icon: CheckCircle,
      color: 'text-green-600',
      bgColor: 'bg-green-50 dark:bg-green-950'
    },
    {
      title: 'Certificates',
      value: userStats.certificatesEarned,
      icon: Award,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50 dark:bg-purple-950'
    },
    {
      title: 'Credits',
      value: userStats.credits,
      icon: Gift,
      color: 'text-orange-600',
      bgColor: 'bg-orange-50 dark:bg-orange-950'
    }
  ];

  if (loading || isDashboardLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!user) {
    return null; // Will redirect in useEffect
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="pt-20 pb-12">
        <div className="container mx-auto px-4">
          {/* Header with Profile Actions */}
          <motion.div
            className="mb-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold mb-2">
                Welcome back, {user.fullName}! 👋
              </h1>
              <p className="text-muted-foreground">
                Continue your learning journey and track your progress.
              </p>
            </div>
            <div className="flex gap-2 flex-wrap w-full sm:w-auto">
              <Dialog open={isProfileDialogOpen} onOpenChange={(open) => {
                setIsProfileDialogOpen(open);
                if (!open) {
                  // Reset form when dialog closes
                  setProfileData({
                    fullName: user.fullName || '',
                    email: user.email || '',
                    location: user.location || '',
                  });
                }
              }}>
                <DialogTrigger asChild>
                  <Button variant="outline" className="flex items-center gap-2 flex-1 sm:flex-none">
                    <User className="w-4 h-4" />
                    Profile
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-md">
                  <DialogHeader>
                    <DialogTitle>Edit Profile</DialogTitle>
                    <DialogDescription>
                      Update your profile information
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="fullName">Full Name</Label>
                      <Input
                        id="fullName"
                        value={profileData.fullName}
                        onChange={(e) => setProfileData(prev => ({ ...prev, fullName: e.target.value }))}
                        placeholder="Enter your full name"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email (Cannot be changed)</Label>
                      <Input
                        id="email"
                        value={profileData.email}
                        disabled
                        className="bg-muted"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="location">Location</Label>
                      <Input
                        id="location"
                        value={profileData.location}
                        onChange={(e) => setProfileData(prev => ({ ...prev, location: e.target.value }))}
                        placeholder="Enter your location"
                      />
                    </div>
                    <div className="flex gap-2">
                      <Button onClick={updateProfile} disabled={isLoading} className="flex-1">
                        {isLoading ? 'Updating...' : 'Update Profile'}
                      </Button>
                      <Button variant="outline" onClick={() => setIsProfileDialogOpen(false)}>
                        Cancel
                      </Button>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>

              <Dialog open={isPasswordDialogOpen} onOpenChange={setIsPasswordDialogOpen}>
                <DialogTrigger asChild>
                  <Button variant="outline" className="flex items-center gap-2 flex-1 sm:flex-none">
                    <Lock className="w-4 h-4" />
                    Change Password
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-md">
                  <DialogHeader className="text-center">
                    <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Mail className="w-8 h-8 text-blue-600 dark:text-blue-400" />
                    </div>
                    <DialogTitle>Change Your Password</DialogTitle>
                    <DialogDescription>
                      We'll send a secure password reset link to your email address. Click the link in your email to create a new password.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-6">
                    <div className="p-4 bg-blue-50 dark:bg-blue-950/50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <Mail className="w-5 h-5 text-blue-600" />
                        <div>
                          <p className="font-medium text-sm">Reset link will be sent to:</p>
                          <p className="text-sm text-muted-foreground">{user?.email}</p>
                        </div>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <Button
                        onClick={sendPasswordResetLink}
                        disabled={isLoading}
                        className="w-full"
                      >
                        {isLoading ? 'Sending...' : 'Send Password Reset Link'}
                      </Button>
                      <Button
                        variant="outline"
                        onClick={() => setIsPasswordDialogOpen(false)}
                        className="w-full"
                        disabled={isLoading}
                      >
                        Cancel
                      </Button>
                    </div>

                    <div className="text-xs text-muted-foreground space-y-1">
                      <p>• Check your email inbox and spam folder</p>
                      <p>• The reset link expires in 1 hour</p>
                      <p>• You can request a new link if needed</p>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>

              <Button variant="outline" onClick={handleLogout} className="flex items-center gap-2 text-red-600 hover:text-red-700 flex-1 sm:flex-none">
                <LogOut className="w-4 h-4" />
                Logout
              </Button>
            </div>
          </motion.div>

          {/* Stats Cards */}
          <motion.div
            className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            {stats.map((stat, index) => (
              <Card key={stat.title} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-4 sm:p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">{stat.title}</p>
                      <p className="text-xl sm:text-2xl font-bold">{stat.value}</p>
                    </div>
                    <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-lg flex items-center justify-center ${stat.bgColor}`}>
                      <stat.icon className={`w-5 h-5 sm:w-6 sm:h-6 ${stat.color}`} />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </motion.div>

          <div className="grid lg:grid-cols-3 gap-6 lg:gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6 lg:space-y-8">
              {/* Course Tabs */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <Tabs defaultValue="enrolled" className="w-full">
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="enrolled" className="text-xs sm:text-sm">Enrolled</TabsTrigger>
                    <TabsTrigger value="completed" className="text-xs sm:text-sm">Completed</TabsTrigger>
                    <TabsTrigger value="certificates" className="text-xs sm:text-sm">Certificates</TabsTrigger>
                  </TabsList>

                  <TabsContent value="enrolled" className="mt-6">
                    <div className="space-y-4">
                      {enrolledCourses.filter(course => !course.completed).map((course) => (
                        <Card key={course.id} className="hover:shadow-lg transition-shadow">
                          <CardContent className="p-4 sm:p-6">
                            <div className="flex flex-col sm:flex-row items-start gap-4">
                              <img
                                src={course.thumbnail || 'https://images.pexels.com/photos/5212345/pexels-photo-5212345.jpeg'}
                                alt={course.title}
                                className="w-full sm:w-20 h-40 sm:h-20 rounded-lg object-cover"
                              />
                              <div className="flex-1 w-full">
                                <h3 className="font-semibold text-lg mb-2">{course.title}</h3>
                                <p className="text-muted-foreground text-sm mb-3 line-clamp-2">{course.description}</p>
                                <div className="flex flex-wrap items-center gap-2 sm:gap-4 mb-3">
                                  <Badge variant="secondary">{course.category}</Badge>
                                  <div className="flex items-center gap-1 text-sm text-muted-foreground">
                                    <Clock className="w-4 h-4" />
                                    {course.duration}
                                  </div>
                                  {course.certificateEligible && (
                                    <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100">
                                      <Award className="w-3 h-3 mr-1" />
                                      Certificate Ready
                                    </Badge>
                                  )}
                                </div>
                                <div className="space-y-2">
                                  <div className="flex justify-between items-center text-sm">
                                    <span>Progress</span>
                                    <span>{course.progress}%</span>
                                  </div>
                                  <Progress value={course.progress} className="w-full" />
                                </div>
                              </div>
                              <div className="flex flex-row sm:flex-col gap-2 w-full sm:w-auto">
                                <Button
                                  className="flex items-center gap-2 flex-1 sm:flex-none"
                                  onClick={() => handleContinueCourse(course.id)}
                                >
                                  <Play className="w-4 h-4" />
                                  Continue
                                </Button>
                                {course.certificateEligible && (
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    className="text-xs flex-1 sm:flex-none"
                                    onClick={() => downloadCertificate(course.id)}
                                  >
                                    <Download className="w-3 h-3 mr-1" />
                                    Certificate
                                  </Button>
                                )}
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}

                      {enrolledCourses.filter(course => !course.completed).length === 0 && (
                        <Card>
                          <CardContent className="p-12 text-center">
                            <BookOpen className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                            <p className="text-muted-foreground mb-4">No enrolled courses yet.</p>
                            <Link href="/courses">
                              <Button>Browse Courses</Button>
                            </Link>
                          </CardContent>
                        </Card>
                      )}
                    </div>
                  </TabsContent>

                  <TabsContent value="completed" className="mt-6">
                    <div className="space-y-4">
                      {enrolledCourses.filter(course => course.completed).map((course) => (
                        <Card key={course.id} className="hover:shadow-lg transition-shadow">
                          <CardContent className="p-4 sm:p-6">
                            <div className="flex flex-col sm:flex-row items-start gap-4">
                              <img
                                src={course.thumbnail || 'https://images.pexels.com/photos/5212345/pexels-photo-5212345.jpeg'}
                                alt={course.title}
                                className="w-full sm:w-20 h-40 sm:h-20 rounded-lg object-cover"
                              />
                              <div className="flex-1 w-full">
                                <h3 className="font-semibold text-lg mb-2">{course.title}</h3>
                                <p className="text-muted-foreground text-sm mb-3 line-clamp-2">{course.description}</p>
                                <div className="flex flex-wrap items-center gap-2 sm:gap-4">
                                  <Badge variant="secondary" className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100">
                                    <CheckCircle className="w-3 h-3 mr-1" />
                                    Completed
                                  </Badge>
                                  <div className="flex items-center gap-1 text-sm text-muted-foreground">
                                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                                    Rate Course
                                  </div>
                                </div>
                              </div>
                              <div className="flex flex-row sm:flex-col gap-2 w-full sm:w-auto">
                                <Button
                                  variant="outline"
                                  className="flex items-center gap-2 flex-1 sm:flex-none"
                                  onClick={() => handleContinueCourse(course.id)}
                                >
                                  <ExternalLink className="w-4 h-4" />
                                  Review
                                </Button>
                                <Button
                                  variant="outline"
                                  className="flex items-center gap-2 flex-1 sm:flex-none"
                                  onClick={() => downloadCertificate(course.id)}
                                  disabled={!course.canDownloadCertificate}
                                >
                                  <Download className="w-4 h-4" />
                                  Certificate
                                </Button>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}

                      {enrolledCourses.filter(course => course.completed).length === 0 && (
                        <Card>
                          <CardContent className="p-12 text-center">
                            <Award className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                            <p className="text-muted-foreground">No completed courses yet.</p>
                            <p className="text-sm text-muted-foreground mt-2">
                              Complete your enrolled courses to earn certificates!
                            </p>
                          </CardContent>
                        </Card>
                      )}
                    </div>
                  </TabsContent>

                  <TabsContent value="certificates" className="mt-6">
                    <div className="space-y-4">
                      {enrolledCourses.filter(course => course.canDownloadCertificate || course.certificateEligible).map((course) => (
                        <Card key={course.id} className="hover:shadow-lg transition-shadow">
                          <CardContent className="p-4 sm:p-6">
                            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                              <div className="flex flex-col sm:flex-row items-center gap-4 w-full">
                                <div className="w-16 h-16 bg-gradient-to-br from-primary to-blue-600 rounded-lg flex items-center justify-center">
                                  <Award className="w-8 h-8 text-white" />
                                </div>
                                <div className="text-center sm:text-left">
                                  <h3 className="font-semibold text-lg">{course.title}</h3>
                                  <p className="text-muted-foreground">
                                    Progress: {course.progress}%
                                  </p>
                                  <p className="text-sm text-muted-foreground">
                                    {course.completed ? 'Course Completed' : 'Certificate Available'}
                                  </p>
                                </div>
                              </div>
                              <div className="flex flex-row sm:flex-col gap-2 w-full sm:w-auto">
                                <Button
                                  className="flex items-center gap-2 flex-1 sm:flex-none"
                                  onClick={() => downloadCertificate(course.id)}
                                >
                                  <Download className="w-4 h-4" />
                                  Download
                                </Button>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  className="flex-1 sm:w-full"
                                  onClick={() => handleContinueCourse(course.id)}
                                >
                                  View Course
                                </Button>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}

                      {enrolledCourses.filter(course => course.canDownloadCertificate || course.certificateEligible).length === 0 && (
                        <Card>
                          <CardContent className="p-12 text-center">
                            <Award className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                            <p className="text-muted-foreground">No certificates available yet.</p>
                            <p className="text-sm text-muted-foreground mt-2">
                              Certificates become available after completing 40% of a course.
                            </p>
                          </CardContent>
                        </Card>
                      )}
                    </div>
                  </TabsContent>
                </Tabs>
              </motion.div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Referral Card */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Gift className="w-5 h-5" />
                      Refer & Earn
                    </CardTitle>
                    <CardDescription>
                      Earn credits when your friends join and purchase courses
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="p-3 bg-primary/10 rounded-lg text-center">
                      <p className="text-2xl font-bold text-primary">{userStats.credits}</p>
                      <p className="text-sm text-muted-foreground">Available Credits</p>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="referral-code">Your Referral Code</Label>
                      <div className="flex gap-2">
                        <Input
                          id="referral-code"
                          value={referralCode}
                          readOnly
                          className="font-mono text-sm"
                        />
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={copyReferralLink}
                        >
                          <Copy className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>

                    <div className="text-sm text-muted-foreground space-y-1">
                      <p>• Earn 100 credits per successful referral</p>
                      <p>• Use credits for discounts on courses</p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Recent Activity */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <TrendingUp className="w-5 h-5" />
                      Recent Activity
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {recentActivity.length > 0 ? (
                      recentActivity.map((activity, index) => (
                        <div key={index} className="flex items-start gap-3 p-3 rounded-lg bg-muted/50">
                          <div className="w-2 h-2 bg-primary rounded-full mt-2" />
                          <div className="flex-1">
                            <p className="text-sm font-medium">{activity.title}</p>
                            <p className="text-xs text-muted-foreground">{activity.description}</p>
                            <p className="text-xs text-muted-foreground mt-1">{activity.timestamp}</p>
                          </div>
                        </div>
                      ))
                    ) : (
                      <p className="text-sm text-muted-foreground text-center py-4">
                        No recent activity
                      </p>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}