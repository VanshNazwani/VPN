// // // 'use client';

// // // import { useState, useEffect } from 'react';
// // // import { motion } from 'framer-motion';
// // // import { useRouter, useParams } from 'next/navigation';
// // // import {
// // //   ArrowLeft,
// // //   Play,
// // //   CheckCircle,
// // //   Circle,
// // //   Download,
// // //   Award,
// // //   Clock,
// // //   Users,
// // //   Star,
// // //   BookOpen,
// // //   FileText,
// // //   Link as LinkIcon,
// // //   Menu,
// // //   X
// // // } from 'lucide-react';
// // // import { Button } from '@/components/ui/button';
// // // import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
// // // import { Badge } from '@/components/ui/badge';
// // // import { Progress } from '@/components/ui/progress';
// // // import { Separator } from '@/components/ui/separator';
// // // import { toast } from 'sonner';
// // // import { useAuth } from '@/components/auth-provider';
// // // import Navbar from '@/components/navbar';

// // // export default function CoursePage() {
// // //   const { courseId } = useParams();
// // //   const { user, loading } = useAuth();
// // //   const router = useRouter();

// // //   const [course, setCourse] = useState(null);
// // //   const [progress, setProgress] = useState(null);
// // //   const [currentSection, setCurrentSection] = useState(0);
// // //   const [isSidebarOpen, setIsSidebarOpen] = useState(false);
// // //   const [isLoading, setIsLoading] = useState(true);

// // //   useEffect(() => {
// // //     if (!loading && !user) {
// // //       router.replace('/auth/login');
// // //       return;
// // //     }

// // //     if (user && courseId) {
// // //       fetchCourseData();
// // //     }
// // //   }, [user, loading, courseId, router]);

// // //   const fetchCourseData = async () => {
// // //     try {
// // //       setIsLoading(true);

// // //       const response = await fetch(`/api/courses/${courseId}/view`, {
// // //         credentials: 'include',
// // //       });

// // //       if (response.ok) {
// // //         const data = await response.json();
// // //         setCourse(data.course);
// // //         setProgress(data.progress);

// // //         // Set current section based on progress
// // //         if (data.progress && data.progress.completedSections.length > 0) {
// // //           const lastCompletedIndex = Math.max(...data.progress.completedSections);
// // //           setCurrentSection(Math.min(lastCompletedIndex + 1, data.course.content.length - 1));
// // //         }
// // //       } else if (response.status === 403) {
// // //         toast.error('You are not enrolled in this course');
// // //         router.push('/dashboard');
// // //       } else if (response.status === 401) {
// // //         router.replace('/auth/login');
// // //       } else {
// // //         toast.error('Failed to load course data');
// // //         router.push('/dashboard');
// // //       }
// // //     } catch (error) {
// // //       console.error('Error fetching course data:', error);
// // //       toast.error('Something went wrong');
// // //       router.push('/dashboard');
// // //     } finally {
// // //       setIsLoading(false);
// // //     }
// // //   };

// // //   const markSectionComplete = async (sectionIndex) => {
// // //     try {
// // //       const response = await fetch(`/api/courses/${courseId}/progress`, {
// // //         method: 'POST',
// // //         headers: {
// // //           'Content-Type': 'application/json',
// // //         },
// // //         credentials: 'include',
// // //         body: JSON.stringify({
// // //           sectionIndex,
// // //           action: 'complete'
// // //         }),
// // //       });

// // //       if (response.ok) {
// // //         const data = await response.json();
// // //         setProgress(data.progress);

// // //         // Show success message
// // //         toast.success('Section marked as complete!');

// // //         // Check if certificate is now available
// // //         if (data.progress.certificateEligible && !progress?.certificateEligible) {
// // //           toast.success('🎉 Congratulations! You can now download your certificate!');
// // //         }
// // //       } else {
// // //         toast.error('Failed to update progress');
// // //       }
// // //     } catch (error) {
// // //       console.error('Error updating progress:', error);
// // //       toast.error('Something went wrong');
// // //     }
// // //   };

// // //   const downloadCertificate = async () => {
// // //     try {
// // //       const response = await fetch(`/api/certificates/download/${courseId}`, {
// // //         credentials: 'include',
// // //       });

// // //       if (response.ok) {
// // //         const blob = await response.blob();
// // //         const url = window.URL.createObjectURL(blob);
// // //         const a = document.createElement('a');
// // //         a.style.display = 'none';
// // //         a.href = url;
// // //         a.download = `${course.title}-certificate.pdf`;
// // //         document.body.appendChild(a);
// // //         a.click();
// // //         window.URL.revokeObjectURL(url);
// // //         document.body.removeChild(a);
// // //         toast.success('Certificate downloaded successfully!');
// // //       } else {
// // //         const data = await response.json();
// // //         toast.error(data.error || 'Error downloading certificate');
// // //       }
// // //     } catch (error) {
// // //       console.error('Error downloading certificate:', error);
// // //       toast.error('Error downloading certificate');
// // //     }
// // //   };

// // //   if (loading || isLoading) {
// // //     return (
// // //       <div className="min-h-screen bg-background">
// // //         <Navbar />
// // //         <div className="pt-20 flex items-center justify-center h-[calc(100vh-80px)]">
// // //           <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
// // //         </div>
// // //       </div>
// // //     );
// // //   }

// // //   if (!course) {
// // //     return (
// // //       <div className="min-h-screen bg-background">
// // //         <Navbar />
// // //         <div className="pt-20 flex items-center justify-center h-[calc(100vh-80px)]">
// // //           <p className="text-muted-foreground">Course not found</p>
// // //         </div>
// // //       </div>
// // //     );
// // //   }

// // //   const currentSectionData = course.content[currentSection];
// // //   const isCurrentSectionCompleted = progress?.completedSections.includes(currentSection);

// // //   return (
// // //     <div className="min-h-screen bg-background">
// // //       <Navbar />

// // //       {/* Mobile Menu Button */}
// // //       <Button
// // //         variant="outline"
// // //         size="icon"
// // //         className="lg:hidden fixed top-20 left-4 z-40"
// // //         onClick={() => setIsSidebarOpen(true)}
// // //       >
// // //         <Menu className="h-4 w-4" />
// // //       </Button>

// // //       <div className="pt-16 lg:flex">
// // //         {/* Sidebar */}
// // //         <motion.div
// // //           className={`lg:w-80 bg-card border-r ${
// // //             isSidebarOpen ? 'fixed inset-y-0 left-0 z-50' : 'hidden'
// // //           } lg:block overflow-y-auto`}
// // //           initial={{ x: -320 }}
// // //           animate={{ x: isSidebarOpen ? 0 : 0 }}
// // //           transition={{ type: 'spring', damping: 20 }}
// // //         >
// // //           {/* Mobile close button */}
// // //           <div className="lg:hidden flex justify-between items-center p-4 border-b">
// // //             <h3 className="font-semibold">Course Content</h3>
// // //             <Button
// // //               variant="ghost"
// // //               size="icon"
// // //               onClick={() => setIsSidebarOpen(false)}
// // //             >
// // //               <X className="h-4 w-4" />
// // //             </Button>
// // //           </div>

// // //           <div className="p-4">
// // //             {/* Course Info */}
// // //             <div className="mb-6">
// // //               <img
// // //                 src={course.thumbnail}
// // //                 alt={course.title}
// // //                 className="w-full h-32 object-cover rounded-lg mb-3"
// // //               />
// // //               <h2 className="font-bold text-lg mb-2">{course.title}</h2>

// // //               {/* Progress */}
// // //               <div className="space-y-2">
// // //                 <div className="flex justify-between items-center text-sm">
// // //                   <span>Course Progress</span>
// // //                   <span className="font-medium">{progress?.progress || 0}%</span>
// // //                 </div>
// // //                 <Progress value={progress?.progress || 0} className="w-full" />
// // //               </div>

// // //               {/* Certificate Status */}
// // //               {progress?.certificateEligible && (
// // //                 <div className="mt-4">
// // //                   <Button 
// // //                     onClick={downloadCertificate}
// // //                     className="w-full flex items-center gap-2"
// // //                     variant="outline"
// // //                   >
// // //                     <Award className="w-4 h-4" />
// // //                     Download Certificate
// // //                   </Button>
// // //                 </div>
// // //               )}
// // //             </div>

// // //             <Separator className="my-4" />

// // //             {/* Course Sections */}
// // //             <div className="space-y-2">
// // //               <h3 className="font-semibold text-sm text-muted-foreground uppercase tracking-wide">
// // //                 Course Content
// // //               </h3>

// // //               {course.content.map((section, index) => (
// // //                 <div
// // //                   key={section.id || index}
// // //                   className={`p-3 rounded-lg border cursor-pointer transition-colors ${
// // //                     currentSection === index
// // //                       ? 'bg-primary/10 border-primary'
// // //                       : 'hover:bg-muted/50 border-transparent'
// // //                   }`}
// // //                   onClick={() => setCurrentSection(index)}
// // //                 >
// // //                   <div className="flex items-start gap-3">
// // //                     <div className="flex-shrink-0 mt-1">
// // //                       {progress?.completedSections.includes(index) ? (
// // //                         <CheckCircle className="w-4 h-4 text-green-500" />
// // //                       ) : (
// // //                         <Circle className="w-4 h-4 text-muted-foreground" />
// // //                       )}
// // //                     </div>
// // //                     <div className="flex-1 min-w-0">
// // //                       <p className="font-medium text-sm truncate">
// // //                         {index + 1}. {section.title}
// // //                       </p>
// // //                       <p className="text-xs text-muted-foreground truncate">
// // //                         {section.description}
// // //                       </p>
// // //                     </div>
// // //                     <Play className="w-3 h-3 text-muted-foreground flex-shrink-0 mt-1" />
// // //                   </div>
// // //                 </div>
// // //               ))}
// // //             </div>
// // //           </div>
// // //         </motion.div>

// // //         {/* Main Content */}
// // //         <div className="flex-1 lg:pl-0 pl-0">
// // //           {/* Header */}
// // //           <div className="bg-card border-b px-4 lg:px-8 py-4">
// // //             <div className="flex items-center justify-between">
// // //               <div className="flex items-center gap-4">
// // //                 <Button
// // //                   variant="ghost"
// // //                   size="icon"
// // //                   onClick={() => router.push('/dashboard')}
// // //                 >
// // //                   <ArrowLeft className="w-4 h-4" />
// // //                 </Button>
// // //                 <div className="hidden sm:block">
// // //                   <h1 className="font-bold text-xl">
// // //                     {currentSectionData?.title || 'Course Content'}
// // //                   </h1>
// // //                   <p className="text-sm text-muted-foreground">
// // //                     Section {currentSection + 1} of {course.content.length}
// // //                   </p>
// // //                 </div>
// // //               </div>

// // //               <div className="flex items-center gap-2">
// // //                 {!isCurrentSectionCompleted && (
// // //                   <Button
// // //                     onClick={() => markSectionComplete(currentSection)}
// // //                     className="flex items-center gap-2"
// // //                   >
// // //                     <CheckCircle className="w-4 h-4" />
// // //                     Mark Complete
// // //                   </Button>
// // //                 )}
// // //                 {isCurrentSectionCompleted && (
// // //                   <Badge variant="secondary" className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100">
// // //                     <CheckCircle className="w-3 h-3 mr-1" />
// // //                     Completed
// // //                   </Badge>
// // //                 )}
// // //               </div>
// // //             </div>
// // //           </div>

// // //           {/* Video Player */}
// // //           <div className="p-4 lg:p-8">
// // //             {currentSectionData && (
// // //               <motion.div
// // //                 key={currentSection}
// // //                 initial={{ opacity: 0, y: 20 }}
// // //                 animate={{ opacity: 1, y: 0 }}
// // //                 transition={{ duration: 0.3 }}
// // //               >
// // //                 <Card className="mb-6">
// // //                   <CardContent className="p-0">
// // //                     {currentSectionData.videoUrl ? (
// // //                       <div className="aspect-video">
// // //                         <iframe
// // //                           src={currentSectionData.videoUrl.replace('watch?v=', 'embed/')}
// // //                           title={currentSectionData.title}
// // //                           className="w-full h-full rounded-t-lg"
// // //                           allowFullScreen
// // //                         />
// // //                       </div>
// // //                     ) : (
// // //                       <div className="aspect-video bg-muted rounded-t-lg flex items-center justify-center">
// // //                         <div className="text-center">
// // //                           <Play className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
// // //                           <p className="text-muted-foreground">No video available for this section</p>
// // //                         </div>
// // //                       </div>
// // //                     )}
// // //                   </CardContent>
// // //                 </Card>

// // //                 {/* Section Details */}
// // //                 <Card>
// // //                   <CardHeader>
// // //                     <div className="flex items-start justify-between">
// // //                       <div className="flex-1">
// // //                         <CardTitle className="text-2xl mb-2">
// // //                           {currentSectionData.title}
// // //                         </CardTitle>
// // //                         <p className="text-muted-foreground">
// // //                           {currentSectionData.description}
// // //                         </p>
// // //                       </div>
// // //                     </div>
// // //                   </CardHeader>

// // //                   <CardContent>
// // //                     {/* Navigation */}
// // //                     <div className="flex items-center justify-between pt-4 border-t">
// // //                       <Button
// // //                         variant="outline"
// // //                         onClick={() => setCurrentSection(Math.max(0, currentSection - 1))}
// // //                         disabled={currentSection === 0}
// // //                       >
// // //                         <ArrowLeft className="w-4 h-4 mr-2" />
// // //                         Previous
// // //                       </Button>

// // //                       <div className="text-sm text-muted-foreground">
// // //                         {currentSection + 1} of {course.content.length}
// // //                       </div>

// // //                       <Button
// // //                         onClick={() => setCurrentSection(Math.min(course.content.length - 1, currentSection + 1))}
// // //                         disabled={currentSection === course.content.length - 1}
// // //                       >
// // //                         Next
// // //                         <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
// // //                       </Button>
// // //                     </div>
// // //                   </CardContent>
// // //                 </Card>

// // //                 {/* Resources */}
// // //                 {currentSectionData.resources && currentSectionData.resources.length > 0 && (
// // //                   <Card className="mt-6">
// // //                     <CardHeader>
// // //                       <CardTitle className="flex items-center gap-2">
// // //                         <FileText className="w-5 h-5" />
// // //                         Resources
// // //                       </CardTitle>
// // //                     </CardHeader>
// // //                     <CardContent>
// // //                       <div className="space-y-2">
// // //                         {currentSectionData.resources.map((resource, index) => (
// // //                           <div key={index} className="flex items-center gap-3 p-2 bg-muted/30 rounded">
// // //                             <Download className="w-4 h-4 text-muted-foreground" />
// // //                             <span className="text-sm">{resource.title || `Resource ${index + 1}`}</span>
// // //                             <Button size="sm" variant="ghost">
// // //                               Download
// // //                             </Button>
// // //                           </div>
// // //                         ))}
// // //                       </div>
// // //                     </CardContent>
// // //                   </Card>
// // //                 )}
// // //               </motion.div>
// // //             )}
// // //           </div>
// // //         </div>
// // //       </div>

// // //       {/* Mobile Sidebar Overlay */}
// // //       {isSidebarOpen && (
// // //         <div
// // //           className="lg:hidden fixed inset-0 bg-black/50 z-40"
// // //           onClick={() => setIsSidebarOpen(false)}
// // //         />
// // //       )}
// // //     </div>
// // //   );
// // // }

// // 'use client';

// // import { useState, useEffect } from 'react';
// // import { motion } from 'framer-motion';
// // import { useRouter, useParams } from 'next/navigation';
// // import {
// //   ArrowLeft,
// //   Play,
// //   CheckCircle,
// //   Circle,
// //   Download,
// //   Award,
// //   Clock,
// //   Users,
// //   Star,
// //   BookOpen,
// //   FileText,
// //   Link as LinkIcon,
// //   Menu,
// //   X
// // } from 'lucide-react';
// // import { Button } from '@/components/ui/button';
// // import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
// // import { Badge } from '@/components/ui/badge';
// // import { Progress } from '@/components/ui/progress';
// // import { Separator } from '@/components/ui/separator';
// // import { toast } from 'sonner';
// // import { useAuth } from '@/components/auth-provider';
// // import Navbar from '@/components/navbar';

// // export default function CoursePage() {
// //   const params = useParams();
// //   const courseId = params?.courseId;
// //   const { user, loading } = useAuth();
// //   const router = useRouter();

// //   const [course, setCourse] = useState(null);
// //   const [progress, setProgress] = useState(null);
// //   const [currentSection, setCurrentSection] = useState(0);
// //   const [isSidebarOpen, setIsSidebarOpen] = useState(false);
// //   const [isLoading, setIsLoading] = useState(true);

// //   useEffect(() => {
// //     if (!loading && !user) {
// //       console.log('User not authenticated, redirecting to login');
// //       router.replace('/auth/login');
// //       return;
// //     }

// //     if (user && courseId) {
// //       console.log('Fetching course data for:', courseId);
// //       fetchCourseData();
// //     }
// //   }, [user, loading, courseId, router]);

// //   const fetchCourseData = async () => {
// //     try {
// //       setIsLoading(true);
// //       console.log('Making API request to:', `/api/courses/${courseId}/view`);

// //       const response = await fetch(`/api/courses/${courseId}/view`, {
// //         method: 'GET',
// //         headers: {
// //           'Content-Type': 'application/json',
// //         },
// //         credentials: 'include',
// //       });

// //       console.log('API Response status:', response.status);

// //       if (response.ok) {
// //         const data = await response.json();
// //         console.log('Course data received:', data);

// //         setCourse(data.course);
// //         setProgress(data.progress);

// //         // Set current section based on progress
// //         if (data.progress && data.progress.completedSections && data.progress.completedSections.length > 0) {
// //           const lastCompletedIndex = Math.max(...data.progress.completedSections);
// //           setCurrentSection(Math.min(lastCompletedIndex + 1, data.course.content.length - 1));
// //         }
// //       } else if (response.status === 403) {
// //         const errorData = await response.json();
// //         console.error('Access denied:', errorData);
// //         toast.error('You are not enrolled in this course');
// //         router.push('/dashboard');
// //       } else if (response.status === 401) {
// //         console.log('Unauthorized, redirecting to login');
// //         router.replace('/auth/login');
// //       } else {
// //         const errorData = await response.json();
// //         console.error('API Error:', errorData);
// //         toast.error('Failed to load course data');
// //         router.push('/dashboard');
// //       }
// //     } catch (error) {
// //       console.error('Error fetching course data:', error);
// //       toast.error('Something went wrong while loading the course');
// //       router.push('/dashboard');
// //     } finally {
// //       setIsLoading(false);
// //     }
// //   };

// //   const markSectionComplete = async (sectionIndex) => {
// //     try {
// //       console.log('Marking section complete:', sectionIndex);

// //       const response = await fetch(`/api/courses/${courseId}/progress`, {
// //         method: 'POST',
// //         headers: {
// //           'Content-Type': 'application/json',
// //         },
// //         credentials: 'include',
// //         body: JSON.stringify({
// //           sectionIndex,
// //           action: 'complete'
// //         }),
// //       });

// //       if (response.ok) {
// //         const data = await response.json();
// //         console.log('Progress updated:', data);
// //         setProgress(data.progress);

// //         // Show success message
// //         toast.success('Section marked as complete!');

// //         // Check if certificate is now available
// //         if (data.progress.certificateEligible && !progress?.certificateEligible) {
// //           toast.success('🎉 Congratulations! You can now download your certificate!');
// //         }
// //       } else {
// //         const errorData = await response.json();
// //         console.error('Progress update error:', errorData);
// //         toast.error('Failed to update progress');
// //       }
// //     } catch (error) {
// //       console.error('Error updating progress:', error);
// //       toast.error('Something went wrong');
// //     }
// //   };

// //   const downloadCertificate = async () => {
// //     try {
// //       const response = await fetch(`/api/certificates/download/${courseId}`, {
// //         credentials: 'include',
// //       });

// //       if (response.ok) {
// //         const blob = await response.blob();
// //         const url = window.URL.createObjectURL(blob);
// //         const a = document.createElement('a');
// //         a.style.display = 'none';
// //         a.href = url;
// //         a.download = `${course.title}-certificate.pdf`;
// //         document.body.appendChild(a);
// //         a.click();
// //         window.URL.revokeObjectURL(url);
// //         document.body.removeChild(a);
// //         toast.success('Certificate downloaded successfully!');
// //       } else {
// //         const data = await response.json();
// //         toast.error(data.error || 'Error downloading certificate');
// //       }
// //     } catch (error) {
// //       console.error('Error downloading certificate:', error);
// //       toast.error('Error downloading certificate');
// //     }
// //   };

// //   if (loading || isLoading) {
// //     return (
// //       <div className="min-h-screen bg-background">
// //         <Navbar />
// //         <div className="pt-20 flex items-center justify-center h-[calc(100vh-80px)]">
// //           <div className="flex flex-col items-center gap-4">
// //             <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
// //             <p className="text-muted-foreground">Loading course...</p>
// //           </div>
// //         </div>
// //       </div>
// //     );
// //   }

// //   if (!course) {
// //     return (
// //       <div className="min-h-screen bg-background">
// //         <Navbar />
// //         <div className="pt-20 flex items-center justify-center h-[calc(100vh-80px)]">
// //           <div className="text-center">
// //             <BookOpen className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
// //             <p className="text-muted-foreground text-lg">Course not found</p>
// //             <Button 
// //               variant="outline" 
// //               className="mt-4"
// //               onClick={() => router.push('/dashboard')}
// //             >
// //               <ArrowLeft className="w-4 h-4 mr-2" />
// //               Back to Dashboard
// //             </Button>
// //           </div>
// //         </div>
// //       </div>
// //     );
// //   }

// //   const currentSectionData = course.content?.[currentSection];
// //   const isCurrentSectionCompleted = progress?.completedSections?.includes(currentSection);

// //   return (
// //     <div className="min-h-screen bg-background">
// //       <Navbar />

// //       {/* Mobile Menu Button */}
// //       <Button
// //         variant="outline"
// //         size="icon"
// //         className="lg:hidden fixed top-20 left-4 z-40"
// //         onClick={() => setIsSidebarOpen(true)}
// //       >
// //         <Menu className="h-4 w-4" />
// //       </Button>

// //       <div className="pt-16 lg:flex">
// //         {/* Sidebar */}
// //         <motion.div
// //           className={`lg:w-80 bg-card border-r ${
// //             isSidebarOpen ? 'fixed inset-y-0 left-0 z-50' : 'hidden'
// //           } lg:block overflow-y-auto`}
// //           initial={{ x: -320 }}
// //           animate={{ x: isSidebarOpen ? 0 : 0 }}
// //           transition={{ type: 'spring', damping: 20 }}
// //         >
// //           {/* Mobile close button */}
// //           <div className="lg:hidden flex justify-between items-center p-4 border-b">
// //             <h3 className="font-semibold">Course Content</h3>
// //             <Button
// //               variant="ghost"
// //               size="icon"
// //               onClick={() => setIsSidebarOpen(false)}
// //             >
// //               <X className="h-4 w-4" />
// //             </Button>
// //           </div>

// //           <div className="p-4">
// //             {/* Course Info */}
// //             <div className="mb-6">
// //               <img
// //                 src={course.thumbnail || 'https://images.pexels.com/photos/5212345/pexels-photo-5212345.jpeg'}
// //                 alt={course.title}
// //                 className="w-full h-32 object-cover rounded-lg mb-3"
// //               />
// //               <h2 className="font-bold text-lg mb-2">{course.title}</h2>

// //               {/* Progress */}
// //               <div className="space-y-2">
// //                 <div className="flex justify-between items-center text-sm">
// //                   <span>Course Progress</span>
// //                   <span className="font-medium">{progress?.progress || 0}%</span>
// //                 </div>
// //                 <Progress value={progress?.progress || 0} className="w-full" />
// //               </div>

// //               {/* Certificate Status */}
// //               {progress?.certificateEligible && (
// //                 <div className="mt-4">
// //                   <Button 
// //                     onClick={downloadCertificate}
// //                     className="w-full flex items-center gap-2"
// //                     variant="outline"
// //                   >
// //                     <Award className="w-4 h-4" />
// //                     Download Certificate
// //                   </Button>
// //                 </div>
// //               )}
// //             </div>

// //             <Separator className="my-4" />

// //             {/* Course Sections */}
// //             <div className="space-y-2">
// //               <h3 className="font-semibold text-sm text-muted-foreground uppercase tracking-wide">
// //                 Course Content
// //               </h3>

// //               {course.content?.map((section, index) => (
// //                 <div
// //                   key={section.id || index}
// //                   className={`p-3 rounded-lg border cursor-pointer transition-colors ${
// //                     currentSection === index
// //                       ? 'bg-primary/10 border-primary'
// //                       : 'hover:bg-muted/50 border-transparent'
// //                   }`}
// //                   onClick={() => setCurrentSection(index)}
// //                 >
// //                   <div className="flex items-start gap-3">
// //                     <div className="flex-shrink-0 mt-1">
// //                       {progress?.completedSections?.includes(index) ? (
// //                         <CheckCircle className="w-4 h-4 text-green-500" />
// //                       ) : (
// //                         <Circle className="w-4 h-4 text-muted-foreground" />
// //                       )}
// //                     </div>
// //                     <div className="flex-1 min-w-0">
// //                       <p className="font-medium text-sm truncate">
// //                         {index + 1}. {section.title}
// //                       </p>
// //                       <p className="text-xs text-muted-foreground truncate">
// //                         {section.description}
// //                       </p>
// //                     </div>
// //                     <Play className="w-3 h-3 text-muted-foreground flex-shrink-0 mt-1" />
// //                   </div>
// //                 </div>
// //               )) || (
// //                 <p className="text-sm text-muted-foreground text-center py-4">
// //                   No course content available
// //                 </p>
// //               )}
// //             </div>
// //           </div>
// //         </motion.div>

// //         {/* Main Content */}
// //         <div className="flex-1 lg:pl-0 pl-0">
// //           {/* Header */}
// //           <div className="bg-card border-b px-4 lg:px-8 py-4">
// //             <div className="flex items-center justify-between">
// //               <div className="flex items-center gap-4">
// //                 <Button
// //                   variant="ghost"
// //                   size="icon"
// //                   onClick={() => router.push('/dashboard')}
// //                 >
// //                   <ArrowLeft className="w-4 h-4" />
// //                 </Button>
// //                 <div className="hidden sm:block">
// //                   <h1 className="font-bold text-xl">
// //                     {currentSectionData?.title || course?.title || 'Course Content'}
// //                   </h1>
// //                   <p className="text-sm text-muted-foreground">
// //                     Section {currentSection + 1} of {course?.content?.length || 0}
// //                   </p>
// //                 </div>
// //               </div>

// //               <div className="flex items-center gap-2">
// //                 {currentSectionData && !isCurrentSectionCompleted && (
// //                   <Button
// //                     onClick={() => markSectionComplete(currentSection)}
// //                     className="flex items-center gap-2"
// //                   >
// //                     <CheckCircle className="w-4 h-4" />
// //                     Mark Complete
// //                   </Button>
// //                 )}
// //                 {isCurrentSectionCompleted && (
// //                   <Badge variant="secondary" className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100">
// //                     <CheckCircle className="w-3 h-3 mr-1" />
// //                     Completed
// //                   </Badge>
// //                 )}
// //               </div>
// //             </div>
// //           </div>

// //           {/* Video Player */}
// //           <div className="p-4 lg:p-8">
// //             {currentSectionData ? (
// //               <motion.div
// //                 key={currentSection}
// //                 initial={{ opacity: 0, y: 20 }}
// //                 animate={{ opacity: 1, y: 0 }}
// //                 transition={{ duration: 0.3 }}
// //               >
// //                 <Card className="mb-6">
// //                   <CardContent className="p-0">
// //                     {currentSectionData.videoUrl ? (
// //                       <div className="aspect-video">
// //                         <iframe
// //                           src={currentSectionData.videoUrl.includes('youtube.com/watch') 
// //                             ? currentSectionData.videoUrl.replace('watch?v=', 'embed/') 
// //                             : currentSectionData.videoUrl}
// //                           title={currentSectionData.title}
// //                           className="w-full h-full rounded-t-lg"
// //                           allowFullScreen
// //                         />
// //                       </div>
// //                     ) : (
// //                       <div className="aspect-video bg-muted rounded-t-lg flex items-center justify-center">
// //                         <div className="text-center">
// //                           <Play className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
// //                           <p className="text-muted-foreground">No video available for this section</p>
// //                         </div>
// //                       </div>
// //                     )}
// //                   </CardContent>
// //                 </Card>

// //                 {/* Section Details */}
// //                 <Card>
// //                   <CardHeader>
// //                     <div className="flex items-start justify-between">
// //                       <div className="flex-1">
// //                         <CardTitle className="text-2xl mb-2">
// //                           {currentSectionData.title}
// //                         </CardTitle>
// //                         <p className="text-muted-foreground">
// //                           {currentSectionData.description}
// //                         </p>
// //                         {currentSectionData.content && (
// //                           <div className="mt-4 prose prose-sm max-w-none">
// //                             <div dangerouslySetInnerHTML={{ __html: currentSectionData.content }} />
// //                           </div>
// //                         )}
// //                       </div>
// //                     </div>
// //                   </CardHeader>

// //                   <CardContent>
// //                     {/* Navigation */}
// //                     <div className="flex items-center justify-between pt-4 border-t">
// //                       <Button
// //                         variant="outline"
// //                         onClick={() => setCurrentSection(Math.max(0, currentSection - 1))}
// //                         disabled={currentSection === 0}
// //                       >
// //                         <ArrowLeft className="w-4 h-4 mr-2" />
// //                         Previous
// //                       </Button>

// //                       <div className="text-sm text-muted-foreground">
// //                         {currentSection + 1} of {course?.content?.length || 0}
// //                       </div>

// //                       <Button
// //                         onClick={() => setCurrentSection(Math.min((course?.content?.length || 1) - 1, currentSection + 1))}
// //                         disabled={currentSection === (course?.content?.length || 1) - 1}
// //                       >
// //                         Next
// //                         <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
// //                       </Button>
// //                     </div>
// //                   </CardContent>
// //                 </Card>

// //                 {/* Resources */}
// //                 {currentSectionData.resources && currentSectionData.resources.length > 0 && (
// //                   <Card className="mt-6">
// //                     <CardHeader>
// //                       <CardTitle className="flex items-center gap-2">
// //                         <FileText className="w-5 h-5" />
// //                         Resources
// //                       </CardTitle>
// //                     </CardHeader>
// //                     <CardContent>
// //                       <div className="space-y-2">
// //                         {currentSectionData.resources.map((resource, index) => (
// //                           <div key={index} className="flex items-center gap-3 p-2 bg-muted/30 rounded">
// //                             <Download className="w-4 h-4 text-muted-foreground" />
// //                             <span className="text-sm">{resource.title || `Resource ${index + 1}`}</span>
// //                             <Button size="sm" variant="ghost" asChild>
// //                               <a href={resource.url} target="_blank" rel="noopener noreferrer">
// //                                 Download
// //                               </a>
// //                             </Button>
// //                           </div>
// //                         ))}
// //                       </div>
// //                     </CardContent>
// //                   </Card>
// //                 )}
// //               </motion.div>
// //             ) : (
// //               <Card>
// //                 <CardContent className="p-12 text-center">
// //                   <BookOpen className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
// //                   <p className="text-muted-foreground">No content available for this course</p>
// //                 </CardContent>
// //               </Card>
// //             )}
// //           </div>
// //         </div>
// //       </div>

// //       {/* Mobile Sidebar Overlay */}
// //       {isSidebarOpen && (
// //         <div
// //           className="lg:hidden fixed inset-0 bg-black/50 z-40"
// //           onClick={() => setIsSidebarOpen(false)}
// //         />
// //       )}
// //     </div>
// //   );
// // }

// 'use client';

// import { useState, useEffect } from 'react';
// import { motion } from 'framer-motion';
// import { useRouter, useParams } from 'next/navigation';
// import {
//   ArrowLeft,
//   Play,
//   CheckCircle,
//   Circle,
//   Download,
//   Award,
//   Clock,
//   Users,
//   Star,
//   BookOpen,
//   FileText,
//   Link as LinkIcon,
//   Menu,
//   X,
//   ExternalLink
// } from 'lucide-react';
// import { Button } from '@/components/ui/button';
// import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
// import { Badge } from '@/components/ui/badge';
// import { Progress } from '@/components/ui/progress';
// import { Separator } from '@/components/ui/separator';
// import { toast } from 'sonner';
// import { useAuth } from '@/components/auth-provider';
// import Navbar from '@/components/navbar';

// // Utility function to extract YouTube video ID and create embed URL
// const getYouTubeEmbedUrl = (url) => {
//   if (!url) return null;

//   try {
//     // Handle different YouTube URL formats
//     let videoId = null;

//     // Standard watch URL: https://www.youtube.com/watch?v=VIDEO_ID
//     if (url.includes('youtube.com/watch?v=')) {
//       const urlParams = new URLSearchParams(new URL(url).search);
//       videoId = urlParams.get('v');
//     }
//     // Short URL: https://youtu.be/VIDEO_ID
//     else if (url.includes('youtu.be/')) {
//       videoId = url.split('youtu.be/')[1].split('?')[0];
//     }
//     // Already an embed URL
//     else if (url.includes('youtube.com/embed/')) {
//       return url;
//     }

//     if (videoId) {
//       // Clean video ID (remove any additional parameters)
//       videoId = videoId.split('&')[0].split('#')[0];
//       return `https://www.youtube.com/embed/${videoId}?rel=0&modestbranding=1&showinfo=0`;
//     }

//     // If not a YouTube URL, return as is
//     return url;
//   } catch (error) {
//     console.error('Error parsing YouTube URL:', error);
//     return url;
//   }
// };

// export default function CoursePage() {
//   const params = useParams();
//   const courseId = params?.courseId;
//   const { user, loading } = useAuth();
//   const router = useRouter();

//   const [course, setCourse] = useState(null);
//   const [progress, setProgress] = useState(null);
//   const [currentSection, setCurrentSection] = useState(0);
//   const [isSidebarOpen, setIsSidebarOpen] = useState(false);
//   const [isLoading, setIsLoading] = useState(true);

//   useEffect(() => {
//     if (!loading && !user) {
//       console.log('User not authenticated, redirecting to login');
//       router.replace('/auth/login');
//       return;
//     }

//     if (user && courseId) {
//       console.log('Fetching course data for:', courseId);
//       fetchCourseData();
//     }
//   }, [user, loading, courseId, router]);

//   const fetchCourseData = async () => {
//     try {
//       setIsLoading(true);
//       console.log('Making API request to:', `/api/courses/${courseId}/view`);

//       const response = await fetch(`/api/courses/${courseId}/view`, {
//         method: 'GET',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         credentials: 'include',
//       });

//       console.log('API Response status:', response.status);

//       if (response.ok) {
//         const data = await response.json();
//         console.log('Course data received:', data);

//         setCourse(data.course);
//         setProgress(data.progress);

//         // Set current section based on progress
//         if (data.progress && data.progress.completedSections && data.progress.completedSections.length > 0) {
//           const lastCompletedIndex = Math.max(...data.progress.completedSections);
//           setCurrentSection(Math.min(lastCompletedIndex + 1, data.course.content.length - 1));
//         }
//       } else if (response.status === 403) {
//         const errorData = await response.json();
//         console.error('Access denied:', errorData);
//         toast.error('You are not enrolled in this course');
//         router.push('/dashboard');
//       } else if (response.status === 401) {
//         console.log('Unauthorized, redirecting to login');
//         router.replace('/auth/login');
//       } else {
//         const errorData = await response.json();
//         console.error('API Error:', errorData);
//         toast.error('Failed to load course data');
//         router.push('/dashboard');
//       }
//     } catch (error) {
//       console.error('Error fetching course data:', error);
//       toast.error('Something went wrong while loading the course');
//       router.push('/dashboard');
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const markSectionComplete = async (sectionIndex) => {
//     try {
//       console.log('Marking section complete:', sectionIndex);

//       const response = await fetch(`/api/courses/${courseId}/progress`, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         credentials: 'include',
//         body: JSON.stringify({
//           sectionIndex,
//           action: 'complete'
//         }),
//       });

//       if (response.ok) {
//         const data = await response.json();
//         console.log('Progress updated:', data);
//         setProgress(data.progress);

//         // Show success message
//         toast.success('Section marked as complete!');

//         // Check if certificate is now available
//         if (data.progress.certificateEligible && !progress?.certificateEligible) {
//           toast.success('🎉 Congratulations! You can now download your certificate!');
//         }
//       } else {
//         const errorData = await response.json();
//         console.error('Progress update error:', errorData);
//         toast.error('Failed to update progress');
//       }
//     } catch (error) {
//       console.error('Error updating progress:', error);
//       toast.error('Something went wrong');
//     }
//   };

//   const downloadCertificate = async () => {
//     try {
//       const response = await fetch(`/api/certificates/download/${courseId}`, {
//         credentials: 'include',
//       });

//       if (response.ok) {
//         const blob = await response.blob();
//         const url = window.URL.createObjectURL(blob);
//         const a = document.createElement('a');
//         a.style.display = 'none';
//         a.href = url;
//         a.download = `${course.title}-certificate.pdf`;
//         document.body.appendChild(a);
//         a.click();
//         window.URL.revokeObjectURL(url);
//         document.body.removeChild(a);
//         toast.success('Certificate downloaded successfully!');
//       } else {
//         const data = await response.json();
//         toast.error(data.error || 'Error downloading certificate');
//       }
//     } catch (error) {
//       console.error('Error downloading certificate:', error);
//       toast.error('Error downloading certificate');
//     }
//   };

//   if (loading || isLoading) {
//     return (
//       <div className="min-h-screen bg-background">
//         <Navbar />
//         <div className="pt-20 flex items-center justify-center h-[calc(100vh-80px)]">
//           <div className="flex flex-col items-center gap-4">
//             <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
//             <p className="text-muted-foreground">Loading course...</p>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   if (!course) {
//     return (
//       <div className="min-h-screen bg-background">
//         <Navbar />
//         <div className="pt-20 flex items-center justify-center h-[calc(100vh-80px)]">
//           <div className="text-center">
//             <BookOpen className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
//             <p className="text-muted-foreground text-lg">Course not found</p>
//             <Button
//               variant="outline"
//               className="mt-4"
//               onClick={() => router.push('/dashboard')}
//             >
//               <ArrowLeft className="w-4 h-4 mr-2" />
//               Back to Dashboard
//             </Button>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   const currentSectionData = course.content?.[currentSection];
//   const isCurrentSectionCompleted = progress?.completedSections?.includes(currentSection);

//   return (
//     <div className="min-h-screen bg-background">
//       <Navbar />

//       {/* Mobile Menu Button */}
//       <Button
//         variant="outline"
//         size="icon"
//         className="lg:hidden fixed top-20 left-4 z-40 bg-background shadow-lg"
//         onClick={() => setIsSidebarOpen(true)}
//       >
//         <Menu className="h-4 w-4" />
//       </Button>

//       <div className="pt-16 flex h-[calc(100vh-4rem)]">
//         {/* Fixed Sidebar */}
//         <motion.div
//           className={`lg:w-80 bg-card border-r flex flex-col ${isSidebarOpen ? 'fixed inset-y-0 left-0 z-50 w-80' : 'hidden'
//             } lg:flex`}
//           initial={{ x: -320 }}
//           animate={{ x: isSidebarOpen ? 0 : 0 }}
//           transition={{ type: 'spring', damping: 20 }}
//           style={{ height: '100vh', paddingTop: '4rem' }}
//         >
//           {/* Mobile close button - Fixed at top */}
//           <div className="lg:hidden flex justify-between items-center p-4 border-b bg-card">
//             <h3 className="font-semibold">Course Content</h3>
//             <Button
//               variant="ghost"
//               size="icon"
//               onClick={() => setIsSidebarOpen(false)}
//             >
//               <X className="h-4 w-4" />
//             </Button>
//           </div>

//           {/* Scrollable content */}
//           <div className="flex-1 overflow-y-auto">
//             <div className="p-4">
//               {/* Course Info */}
//               <div className="mb-6">
//                 <img
//                   src={course.thumbnail || 'https://images.pexels.com/photos/5212345/pexels-photo-5212345.jpeg'}
//                   alt={course.title}
//                   className="w-full h-32 object-cover rounded-lg mb-3"
//                 />
//                 <h2 className="font-bold text-lg mb-2">{course.title}</h2>

//                 {/* Progress */}
//                 <div className="space-y-2">
//                   <div className="flex justify-between items-center text-sm">
//                     <span>Course Progress</span>
//                     <span className="font-medium">{progress?.progress || 0}%</span>
//                   </div>
//                   <Progress value={progress?.progress || 0} className="w-full" />
//                 </div>

//                 {/* Certificate Status */}
//                 {progress?.certificateEligible && (
//                   <div className="mt-4">
//                     <Button
//                       onClick={downloadCertificate}
//                       className="w-full flex items-center gap-2"
//                       variant="outline"
//                     >
//                       <Award className="w-4 h-4" />
//                       Download Certificate
//                     </Button>
//                   </div>
//                 )}
//               </div>

//               <Separator className="my-4" />

//               {/* Course Sections */}
//               <div className="space-y-2">
//                 <h3 className="font-semibold text-sm text-muted-foreground uppercase tracking-wide">
//                   Course Content
//                 </h3>

//                 {course.content?.map((section, index) => (
//                   <div
//                     key={section.id || index}
//                     className={`p-3 rounded-lg border cursor-pointer transition-colors ${currentSection === index
//                       ? 'bg-primary/10 border-primary'
//                       : 'hover:bg-muted/50 border-transparent'
//                       }`}
//                     onClick={() => {
//                       setCurrentSection(index);
//                       setIsSidebarOpen(false); // Close sidebar on mobile after selection
//                     }}
//                   >
//                     <div className="flex items-start gap-3">
//                       <div className="flex-shrink-0 mt-1">
//                         {progress?.completedSections?.includes(index) ? (
//                           <CheckCircle className="w-4 h-4 text-green-500" />
//                         ) : (
//                           <Circle className="w-4 h-4 text-muted-foreground" />
//                         )}
//                       </div>
//                       <div className="flex-1 min-w-0">
//                         <p className="font-medium text-sm truncate">
//                           {index + 1}. {section.title}
//                         </p>
//                         <p className="text-xs text-muted-foreground truncate">
//                           {section.description}
//                         </p>
//                       </div>
//                       <Play className="w-3 h-3 text-muted-foreground flex-shrink-0 mt-1" />
//                     </div>
//                   </div>
//                 )) || (
//                     <p className="text-sm text-muted-foreground text-center py-4">
//                       No course content available
//                     </p>
//                   )}
//               </div>
//             </div>
//           </div>
//         </motion.div>

//         {/* Main Content */}
//         <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
//           {/* Header - Fixed */}
//           <div className="bg-card border-b px-4 lg:px-8 py-4 flex-shrink-0">
//             <div className="flex items-center justify-between">
//               <div className="flex items-center gap-4">
//                 <Button
//                   variant="ghost"
//                   size="icon"
//                   onClick={() => router.push('/dashboard')}
//                 >
//                   <ArrowLeft className="w-4 h-4" />
//                 </Button>
//                 <div className="hidden sm:block">
//                   <h1 className="font-bold text-xl">
//                     {currentSectionData?.title || course?.title || 'Course Content'}
//                   </h1>
//                   <p className="text-sm text-muted-foreground">
//                     Section {currentSection + 1} of {course?.content?.length || 0}
//                   </p>
//                 </div>
//               </div>

//               <div className="flex items-center gap-2">
//                 {currentSectionData && !isCurrentSectionCompleted && (
//                   <Button
//                     onClick={() => markSectionComplete(currentSection)}
//                     className="flex items-center gap-2"
//                   >
//                     <CheckCircle className="w-4 h-4" />
//                     Mark Complete
//                   </Button>
//                 )}
//                 {isCurrentSectionCompleted && (
//                   <Badge variant="secondary" className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100">
//                     <CheckCircle className="w-3 h-3 mr-1" />
//                     Completed
//                   </Badge>
//                 )}
//               </div>
//             </div>
//           </div>

//           {/* Scrollable Content */}
//           <div className="flex-1 overflow-y-auto">
//             <div className="p-4 lg:p-8">
//               {currentSectionData ? (
//                 <motion.div
//                   key={currentSection}
//                   initial={{ opacity: 0, y: 20 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   transition={{ duration: 0.3 }}
//                 >
//                   <Card className="mb-6">
//                     <CardContent className="p-0">
//                       {currentSectionData.videoUrl ? (
//                         <div className="aspect-video bg-black rounded-t-lg overflow-hidden">
//                           <VideoPlayer
//                             videoUrl={currentSectionData.videoUrl}
//                             title={currentSectionData.title}
//                           />
//                         </div>
//                       ) : (
//                         <div className="aspect-video bg-muted rounded-t-lg flex items-center justify-center">
//                           <div className="text-center">
//                             <Play className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
//                             <p className="text-muted-foreground">No video available for this section</p>
//                           </div>
//                         </div>
//                       )}
//                     </CardContent>
//                   </Card>

//                   {/* Section Details */}
//                   <Card>
//                     <CardHeader>
//                       <div className="flex items-start justify-between">
//                         <div className="flex-1">
//                           <CardTitle className="text-2xl mb-2">
//                             {currentSectionData.title}
//                           </CardTitle>
//                           <p className="text-muted-foreground">
//                             {currentSectionData.description}
//                           </p>
//                           {currentSectionData.content && (
//                             <div className="mt-4 prose prose-sm max-w-none dark:prose-invert">
//                               <div dangerouslySetInnerHTML={{ __html: currentSectionData.content }} />
//                             </div>
//                           )}
//                         </div>
//                       </div>
//                     </CardHeader>

//                     <CardContent>
//                       {/* Navigation */}
//                       <div className="flex items-center justify-between pt-4 border-t">
//                         <Button
//                           variant="outline"
//                           onClick={() => setCurrentSection(Math.max(0, currentSection - 1))}
//                           disabled={currentSection === 0}
//                         >
//                           <ArrowLeft className="w-4 h-4 mr-2" />
//                           Previous
//                         </Button>

//                         <div className="text-sm text-muted-foreground">
//                           {currentSection + 1} of {course?.content?.length || 0}
//                         </div>

//                         <Button
//                           onClick={() => setCurrentSection(Math.min((course?.content?.length || 1) - 1, currentSection + 1))}
//                           disabled={currentSection === (course?.content?.length || 1) - 1}
//                         >
//                           Next
//                           <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
//                         </Button>
//                       </div>
//                     </CardContent>
//                   </Card>

//                   {/* Resources */}
//                   {currentSectionData.resources && currentSectionData.resources.length > 0 && (
//                     <Card className="mt-6">
//                       <CardHeader>
//                         <CardTitle className="flex items-center gap-2">
//                           <FileText className="w-5 h-5" />
//                           Resources
//                         </CardTitle>
//                       </CardHeader>
//                       <CardContent>
//                         <div className="space-y-2">
//                           {currentSectionData.resources.map((resource, index) => (
//                             <div key={index} className="flex items-center gap-3 p-2 bg-muted/30 rounded">
//                               <Download className="w-4 h-4 text-muted-foreground" />
//                               <span className="text-sm">{resource.title || `Resource ${index + 1}`}</span>
//                               <Button size="sm" variant="ghost" asChild>
//                                 <a href={resource.url} target="_blank" rel="noopener noreferrer">
//                                   Download
//                                 </a>
//                               </Button>
//                             </div>
//                           ))}
//                         </div>
//                       </CardContent>
//                     </Card>
//                   )}
//                 </motion.div>
//               ) : (
//                 <Card>
//                   <CardContent className="p-12 text-center">
//                     <BookOpen className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
//                     <p className="text-muted-foreground">No content available for this course</p>
//                   </CardContent>
//                 </Card>
//               )}
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Mobile Sidebar Overlay */}
//       {isSidebarOpen && (
//         <div
//           className="lg:hidden fixed inset-0 bg-black/50 z-40"
//           onClick={() => setIsSidebarOpen(false)}
//         />
//       )}
//     </div>
//   );
// }

// // Video Player Component
// function VideoPlayer({ videoUrl, title }) {
//   const [embedUrl, setEmbedUrl] = useState('');
//   const [showFallback, setShowFallback] = useState(false);

//   useEffect(() => {
//     if (videoUrl) {
//       const processedUrl = getYouTubeEmbedUrl(videoUrl);
//       setEmbedUrl(processedUrl);
//     }
//   }, [videoUrl]);

//   const handleIframeError = () => {
//     console.error('Failed to load video iframe');
//     setShowFallback(true);
//   };

//   if (showFallback || !embedUrl) {
//     return (
//       <div className="w-full h-full flex items-center justify-center bg-black text-white">
//         <div className="text-center">
//           <Play className="w-16 h-16 mx-auto mb-4 opacity-60" />
//           <p className="mb-4">Unable to embed video</p>
//           <Button
//             variant="secondary"
//             asChild
//             className="flex items-center gap-2"
//           >
//             <a
//               href={videoUrl}
//               target="_blank"
//               rel="noopener noreferrer"
//             >
//               <ExternalLink className="w-4 h-4" />
//               Watch on YouTube
//             </a>
//           </Button>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <iframe
//       src={embedUrl}
//       title={title}
//       className="w-full h-full"
//       allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
//       allowFullScreen
//       frameBorder="0"
//       onError={handleIframeError}
//     />
//   );
// }


'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useRouter, useParams } from 'next/navigation';
import {
  ArrowLeft,
  Play,
  CheckCircle,
  Circle,
  Download,
  Award,
  Clock,
  Users,
  Star,
  BookOpen,
  FileText,
  Link as LinkIcon,
  Menu,
  X,
  ExternalLink
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import { toast } from 'sonner';
import { useAuth } from '@/components/auth-provider';
import Navbar from '@/components/navbar';

// Utility function to extract YouTube video ID and create embed URL
const getYouTubeEmbedUrl = (url) => {
  if (!url) return null;

  try {
    // Handle different YouTube URL formats
    let videoId = null;

    // Standard watch URL: https://www.youtube.com/watch?v=VIDEO_ID
    if (url.includes('youtube.com/watch?v=')) {
      const urlParams = new URLSearchParams(new URL(url).search);
      videoId = urlParams.get('v');
    }
    // Short URL: https://youtu.be/VIDEO_ID
    else if (url.includes('youtu.be/')) {
      videoId = url.split('youtu.be/')[1].split('?')[0];
    }
    // Already an embed URL
    else if (url.includes('youtube.com/embed/')) {
      return url;
    }

    if (videoId) {
      // Clean video ID (remove any additional parameters)
      videoId = videoId.split('&')[0].split('#')[0];
      return `https://www.youtube.com/embed/${videoId}?rel=0&modestbranding=1&showinfo=0`;
    }

    // If not a YouTube URL, return as is
    return url;
  } catch (error) {
    console.error('Error parsing YouTube URL:', error);
    return url;
  }
};

export default function CoursePage() {
  const params = useParams();
  const courseId = params?.courseId;
  const { user, loading } = useAuth();
  const router = useRouter();

  const [course, setCourse] = useState(null);
  const [progress, setProgress] = useState(null);
  const [currentSection, setCurrentSection] = useState(0);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!loading && !user) {
      console.log('User not authenticated, redirecting to login');
      router.replace('/auth/login');
      return;
    }

    if (user && courseId) {
      console.log('Fetching course data for:', courseId);
      fetchCourseData();
    }
  }, [user, loading, courseId, router]);

  const fetchCourseData = async () => {
    try {
      setIsLoading(true);
      console.log('Making API request to:', `/api/courses/${courseId}/view`);

      const response = await fetch(`/api/courses/${courseId}/view`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      });

      console.log('API Response status:', response.status);

      if (response.ok) {
        const data = await response.json();
        console.log('Course data received:', data);

        setCourse(data.course);
        setProgress(data.progress);

        // Set current section based on progress
        if (data.progress && data.progress.completedSections && data.progress.completedSections.length > 0) {
          const lastCompletedIndex = Math.max(...data.progress.completedSections);
          setCurrentSection(Math.min(lastCompletedIndex + 1, data.course.content.length - 1));
        }
      } else if (response.status === 403) {
        const errorData = await response.json();
        console.error('Access denied:', errorData);
        toast.error('You are not enrolled in this course');
        router.push('/dashboard');
      } else if (response.status === 401) {
        console.log('Unauthorized, redirecting to login');
        router.replace('/auth/login');
      } else {
        const errorData = await response.json();
        console.error('API Error:', errorData);
        toast.error('Failed to load course data');
        router.push('/dashboard');
      }
    } catch (error) {
      console.error('Error fetching course data:', error);
      toast.error('Something went wrong while loading the course');
      router.push('/dashboard');
    } finally {
      setIsLoading(false);
    }
  };

  const markSectionComplete = async (sectionIndex) => {
    try {
      console.log('Marking section complete:', sectionIndex);

      const response = await fetch(`/api/courses/${courseId}/progress`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
          sectionIndex,
          action: 'complete'
        }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Progress updated:', data);
        setProgress(data.progress);

        // Show success message
        toast.success('Section marked as complete!');

        // Check if certificate is now available
        if (data.progress.certificateEligible && !progress?.certificateEligible) {
          toast.success('🎉 Congratulations! You can now download your certificate!');
        }
      } else {
        const errorData = await response.json();
        console.error('Progress update error:', errorData);
        toast.error('Failed to update progress');
      }
    } catch (error) {
      console.error('Error updating progress:', error);
      toast.error('Something went wrong');
    }
  };

  const downloadCertificate = async () => {
    try {
      const response = await fetch(`/api/certificates/download/${courseId}`, {
        credentials: 'include',
      });

      if (response.ok) {
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.style.display = 'none';
        a.href = url;
        a.download = `${course.title}-certificate.pdf`;
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
        toast.success('Certificate downloaded successfully!');
      } else {
        const data = await response.json();
        toast.error(data.error || 'Error downloading certificate');
      }
    } catch (error) {
      console.error('Error downloading certificate:', error);
      toast.error('Error downloading certificate');
    }
  };

  if (loading || isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="pt-20 flex items-center justify-center h-[calc(100vh-80px)]">
          <div className="flex flex-col items-center gap-4">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
            <p className="text-muted-foreground">Loading course...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!course) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="pt-20 flex items-center justify-center h-[calc(100vh-80px)]">
          <div className="text-center">
            <BookOpen className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground text-lg">Course not found</p>
            <Button
              variant="outline"
              className="mt-4"
              onClick={() => router.push('/dashboard')}
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Dashboard
            </Button>
          </div>
        </div>
      </div>
    );
  }

  const currentSectionData = course.content?.[currentSection];
  const isCurrentSectionCompleted = progress?.completedSections?.includes(currentSection);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Mobile Menu Button */}
      <Button
        variant="outline"
        size="icon"
        className="lg:hidden fixed top-20 left-4 z-40 bg-background shadow-lg"
        onClick={() => setIsSidebarOpen(true)}
      >
        <Menu className="h-4 w-4" />
      </Button>

      <div className="pt-16 flex h-[calc(100vh-4rem)]">
        {/* Fixed Sidebar */}
        <motion.div
          className={`lg:w-80 bg-card border-r flex flex-col ${isSidebarOpen ? 'fixed inset-y-0 left-0 z-50 w-80' : 'hidden'
            } lg:flex`}
          initial={{ x: -320 }}
          animate={{ x: isSidebarOpen ? 0 : 0 }}
          transition={{ type: 'spring', damping: 20 }}
          style={{ height: '100vh', paddingTop: '4rem' }}
        >
          {/* Mobile close button - Fixed at top */}
          <div className="lg:hidden flex justify-between items-center p-4 border-b bg-card">
            <h3 className="font-semibold">Course Content</h3>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsSidebarOpen(false)}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>

          {/* Scrollable content */}
          <div className="flex-1 overflow-y-auto">
            <div className="p-4">
              {/* Course Info */}
              <div className="mb-6">
                <img
                  src={course.thumbnail || 'https://images.pexels.com/photos/5212345/pexels-photo-5212345.jpeg'}
                  alt={course.title}
                  className="w-full h-32 object-cover rounded-lg mb-3"
                />
                <h2 className="font-bold text-lg mb-2">{course.title}</h2>

                {/* Progress */}
                <div className="space-y-2">
                  <div className="flex justify-between items-center text-sm">
                    <span>Course Progress</span>
                    <span className="font-medium">{progress?.progress || 0}%</span>
                  </div>
                  <Progress value={progress?.progress || 0} className="w-full" />
                </div>

                {/* Certificate Status */}
                {progress?.certificateEligible && (
                  <div className="mt-4">
                    <Button
                      onClick={downloadCertificate}
                      className="w-full flex items-center gap-2"
                      variant="outline"
                    >
                      <Award className="w-4 h-4" />
                      Download Certificate
                    </Button>
                  </div>
                )}
              </div>

              <Separator className="my-4" />

              {/* Course Sections */}
              <div className="space-y-2">
                <h3 className="font-semibold text-sm text-muted-foreground uppercase tracking-wide">
                  Course Content
                </h3>

                {course.content?.map((section, index) => (
                  <div
                    key={section.id || index}
                    className={`p-3 rounded-lg border cursor-pointer transition-colors ${currentSection === index
                      ? 'bg-primary/10 border-primary'
                      : 'hover:bg-muted/50 border-transparent'
                      }`}
                    onClick={() => {
                      setCurrentSection(index);
                      setIsSidebarOpen(false); // Close sidebar on mobile after selection
                    }}
                  >
                    <div className="flex items-start gap-3">
                      <div className="flex-shrink-0 mt-1">
                        {progress?.completedSections?.includes(index) ? (
                          <CheckCircle className="w-4 h-4 text-green-500" />
                        ) : (
                          <Circle className="w-4 h-4 text-muted-foreground" />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-sm truncate">
                          {index + 1}. {section.title}
                        </p>
                        <p className="text-xs text-muted-foreground truncate">
                          {section.description}
                        </p>
                      </div>
                      <Play className="w-3 h-3 text-muted-foreground flex-shrink-0 mt-1" />
                    </div>
                  </div>
                )) || (
                    <p className="text-sm text-muted-foreground text-center py-4">
                      No course content available
                    </p>
                  )}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Main Content */}
        <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
          {/* Header - Fixed */}
          <div className="bg-card border-b px-4 lg:px-8 py-4 flex-shrink-0">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => router.push('/dashboard')}
                >
                  <ArrowLeft className="w-4 h-4" />
                </Button>
                <div className="hidden sm:block">
                  <h1 className="font-bold text-xl">
                    {currentSectionData?.title || course?.title || 'Course Content'}
                  </h1>
                  <p className="text-sm text-muted-foreground">
                    Section {currentSection + 1} of {course?.content?.length || 0}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                {currentSectionData && !isCurrentSectionCompleted && (
                  <Button
                    onClick={() => markSectionComplete(currentSection)}
                    className="flex items-center gap-2"
                  >
                    <CheckCircle className="w-4 h-4" />
                    Mark Complete
                  </Button>
                )}
                {isCurrentSectionCompleted && (
                  <Badge variant="secondary" className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100">
                    <CheckCircle className="w-3 h-3 mr-1" />
                    Completed
                  </Badge>
                )}
              </div>
            </div>
          </div>

          {/* Scrollable Content */}
          <div className="flex-1 overflow-y-auto">
            <div className="p-4 lg:p-8">
              {currentSectionData ? (
                <motion.div
                  key={currentSection}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <Card className="mb-6">
                    <CardContent className="p-0">
                      {currentSectionData.videoUrl ? (
                        <div className="aspect-video bg-black rounded-t-lg overflow-hidden">
                          <VideoPlayer
                            videoUrl={currentSectionData.videoUrl}
                            title={currentSectionData.title}
                            originalVideoUrl={currentSectionData.videoUrl}
                          />
                        </div>
                      ) : (
                        <div className="aspect-video bg-muted rounded-t-lg flex items-center justify-center">
                          <div className="text-center">
                            <Play className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                            <p className="text-muted-foreground">No video available for this section</p>
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>

                  {/* Section Details */}
                  <Card>
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <CardTitle className="text-2xl mb-2">
                            {currentSectionData.title}
                          </CardTitle>
                          <p className="text-muted-foreground">
                            {currentSectionData.description}
                          </p>
                          {currentSectionData.content && (
                            <div className="mt-4 prose prose-sm max-w-none dark:prose-invert">
                              <div dangerouslySetInnerHTML={{ __html: currentSectionData.content }} />
                            </div>
                          )}
                        </div>
                      </div>
                    </CardHeader>

                    <CardContent>
                      {/* Navigation */}
                      <div className="flex items-center justify-between pt-4 border-t">
                        <Button
                          variant="outline"
                          onClick={() => setCurrentSection(Math.max(0, currentSection - 1))}
                          disabled={currentSection === 0}
                        >
                          <ArrowLeft className="w-4 h-4 mr-2" />
                          Previous
                        </Button>

                        <div className="text-sm text-muted-foreground">
                          {currentSection + 1} of {course?.content?.length || 0}
                        </div>

                        <Button
                          onClick={() => setCurrentSection(Math.min((course?.content?.length || 1) - 1, currentSection + 1))}
                          disabled={currentSection === (course?.content?.length || 1) - 1}
                        >
                          Next
                          <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Resources */}
                  {currentSectionData.resources && currentSectionData.resources.length > 0 && (
                    <Card className="mt-6">
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <FileText className="w-5 h-5" />
                          Resources
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-2">
                          {currentSectionData.resources.map((resource, index) => (
                            <div key={index} className="flex items-center gap-3 p-2 bg-muted/30 rounded">
                              <Download className="w-4 h-4 text-muted-foreground" />
                              <span className="text-sm">{resource.title || `Resource ${index + 1}`}</span>
                              <Button size="sm" variant="ghost" asChild>
                                <a href={resource.url} target="_blank" rel="noopener noreferrer">
                                  Download
                                </a>
                              </Button>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  )}
                </motion.div>
              ) : (
                <Card>
                  <CardContent className="p-12 text-center">
                    <BookOpen className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                    <p className="text-muted-foreground">No content available for this course</p>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 z-40"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}
    </div>
  );
}

// Video Player Component
function VideoPlayer({ videoUrl, title, originalVideoUrl }) {
  const [embedUrl, setEmbedUrl] = useState('');
  const [showFallback, setShowFallback] = useState(false);

  useEffect(() => {
    if (videoUrl) {
      const processedUrl = getYouTubeEmbedUrl(videoUrl);
      setEmbedUrl(processedUrl);
    }
  }, [videoUrl]);

  const handleIframeError = () => {
    console.error('Failed to load video iframe');
    setShowFallback(true);
  };

  if (showFallback || !embedUrl) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-black text-white">
        <div className="text-center">
          <Play className="w-16 h-16 mx-auto mb-4 opacity-60" />
          <p className="mb-4">Unable to embed video</p>
          <Button
            variant="secondary"
            asChild
            className="flex items-center gap-2"
          >
            <a
              href={originalVideoUrl || videoUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              <ExternalLink className="w-4 h-4" />
              Watch on YouTube
            </a>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <iframe
      src={embedUrl}
      title={title}
      className="w-full h-full"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      allowFullScreen
      frameBorder="0"
      onError={handleIframeError}
    />
  );
}