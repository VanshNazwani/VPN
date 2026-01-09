'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { 
  ArrowLeft, 
  Edit, 
  Trash2, 
  Settings, 
  Users, 
  Clock, 
  Star, 
  DollarSign,
  BookOpen,
  Play,
  Award,
  CheckCircle,
  Plus,
  Link as LinkIcon
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { toast } from 'sonner';
import Link from 'next/link';
import AdminNavbar from '@/components/admin-navbar';
import CustomConfirmDialog, { useConfirmDialog } from '@/components/custom-confirm-dialog';

export default function CourseViewPage({ params }) {
  const confirm = useConfirmDialog();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const { courseId } = params;

  useEffect(() => {
    fetchCourse();
  }, [courseId]);

  const fetchCourse = async () => {
    try {
      const response = await fetch(`/api/admin/courses/${courseId}`);
      if (response.ok) {
        const data = await response.json();
        setCourse(data.course);
      } else {
        toast.error('Course not found');
        router.push('/admin');
      }
    } catch (error) {
      console.error('Error fetching course:', error);
      toast.error('Error loading course');
      router.push('/admin');
    } finally {
      setLoading(false);
    }
  };

  const deleteCourse = async () => {
    const confirmed = await confirm(
      `Are you sure you want to delete "${course.title}"? This action cannot be undone and will remove all associated data.`,
      'Delete Course'
    );
    
    if (!confirmed) return;

    try {
      const response = await fetch(`/api/admin/courses/${courseId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${document.cookie.split('auth-token=')[1]?.split(';')[0]}`,
        },
      });

      if (response.ok) {
        toast.success('Course deleted successfully');
        router.push('/admin');
      } else {
        toast.error('Error deleting course');
      }
    } catch (error) {
      console.error('Error deleting course:', error);
      toast.error('Error deleting course');
    }
  };

  const toggleCourseStatus = async () => {
    const action = course.isActive ? 'deactivate' : 'activate';
    const confirmed = await confirm(
      `Are you sure you want to ${action} "${course.title}"? ${course.isActive ? 'Students will no longer be able to enroll in this course.' : 'This course will become available for enrollment.'}`,
      `${action.charAt(0).toUpperCase() + action.slice(1)} Course`
    );
    
    if (!confirmed) return;

    try {
      const response = await fetch(`/api/admin/courses/${courseId}/toggle-status`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${document.cookie.split('auth-token=')[1]?.split(';')[0]}`,
        },
      });

      if (response.ok) {
        toast.success(`Course ${course.isActive ? 'deactivated' : 'activated'} successfully`);
        setCourse(prev => ({ ...prev, isActive: !prev.isActive }));
      } else {
        toast.error('Error updating course status');
      }
    } catch (error) {
      console.error('Error toggling course status:', error);
      toast.error('Error updating course status');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!course) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <BookOpen className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
          <h2 className="text-2xl font-bold mb-2">Course Not Found</h2>
          <p className="text-muted-foreground mb-4">The course you're looking for doesn't exist.</p>
          <Link href="/admin">
            <Button>Back to Dashboard</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <AdminNavbar />
      <CustomConfirmDialog />

      <main className="pt-20 pb-12">
        <div className="container mx-auto px-4 max-w-6xl">
          {/* Header */}
          <motion.div
            className="flex items-center justify-between mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center gap-4">
              <Link href="/admin">
                <Button variant="outline" size="icon">
                  <ArrowLeft className="w-4 h-4" />
                </Button>
              </Link>
              <div>
                <h1 className="text-3xl font-bold">{course.title}</h1>
                <p className="text-muted-foreground">
                  Course details and management options
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Link href={`/admin/courses/${courseId}/edit`}>
                <Button variant="outline" className="flex items-center gap-2">
                  <Edit className="w-4 h-4" />
                  Edit
                </Button>
              </Link>
              <Button
                variant="outline"
                onClick={toggleCourseStatus}
                className="flex items-center gap-2"
              >
                <Settings className="w-4 h-4" />
                {course.isActive ? 'Deactivate' : 'Activate'}
              </Button>
              <Button
                variant="destructive"
                onClick={deleteCourse}
                className="flex items-center gap-2"
              >
                <Trash2 className="w-4 h-4" />
                Delete
              </Button>
            </div>
          </motion.div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Course Overview */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                <Card>
                  <CardHeader>
                    <CardTitle>Course Overview</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="aspect-video rounded-lg overflow-hidden">
                      <img
                        src={course.thumbnail}
                        alt={course.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    
                    <div className="flex flex-wrap gap-2">
                      <Badge variant="secondary">{course.category}</Badge>
                      <Badge variant="outline">{course.level}</Badge>
                      <Badge variant={course.isActive ? 'default' : 'destructive'}>
                        {course.isActive ? 'Active' : 'Inactive'}
                      </Badge>
                    </div>

                    <div>
                      <h3 className="font-semibold mb-2">Description</h3>
                      <p className="text-muted-foreground leading-relaxed">
                        {course.description}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Course Features */}
              {course.features && course.features.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                >
                  <Card>
                    <CardHeader>
                      <CardTitle>Course Features</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid md:grid-cols-2 gap-3">
                        {course.features.map((feature, index) => (
                          <div key={index} className="flex items-center gap-2">
                            <CheckCircle className="w-4 h-4 text-green-600" />
                            <span className="text-sm">{feature}</span>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              )}

              {/* Learning Outcomes */}
              {course.learningOutcomes && course.learningOutcomes.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                >
                  <Card>
                    <CardHeader>
                      <CardTitle>Learning Outcomes</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        {course.learningOutcomes.map((outcome, index) => (
                          <div key={index} className="flex items-start gap-3">
                            <Award className="w-5 h-5 text-purple-600 mt-0.5" />
                            <span className="text-sm">{outcome}</span>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              )}

              {/* Course Content */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle>Course Content</CardTitle>
                      <Button variant="outline" size="sm">
                        <Plus className="w-4 h-4 mr-2" />
                        Add Section
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    {course.content && course.content.length > 0 ? (
                      <div className="space-y-4">
                        {course.content.map((section, index) => (
                          <div key={section.id || index} className="border rounded-lg p-4">
                            <div className="flex items-center justify-between mb-3">
                              <h4 className="font-semibold">Section {index + 1}: {section.title}</h4>
                              <div className="flex items-center gap-2">
                                <Button variant="ghost" size="sm">
                                  <Edit className="w-4 h-4" />
                                </Button>
                                <Button variant="ghost" size="sm">
                                  <Trash2 className="w-4 h-4" />
                                </Button>
                              </div>
                            </div>
                            
                            {section.description && (
                              <p className="text-sm text-muted-foreground mb-3">
                                {section.description}
                              </p>
                            )}
                            
                            {section.videoUrl && (
                              <div className="flex items-center gap-2 text-sm">
                                <Play className="w-4 h-4 text-blue-600" />
                                <a 
                                  href={section.videoUrl} 
                                  target="_blank" 
                                  rel="noopener noreferrer"
                                  className="text-blue-600 hover:underline"
                                >
                                  Watch Video
                                </a>
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-8 text-muted-foreground">
                        <BookOpen className="w-12 h-12 mx-auto mb-4 opacity-50" />
                        <p>No content sections added yet.</p>
                        <p className="text-sm">Add sections to build your course content.</p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Course Stats */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                <Card>
                  <CardHeader>
                    <CardTitle>Course Statistics</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center gap-3">
                      <Users className="w-5 h-5 text-blue-600" />
                      <div>
                        <p className="font-semibold">{course.enrolledCount || 0}</p>
                        <p className="text-sm text-muted-foreground">Students Enrolled</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3">
                      <Star className="w-5 h-5 text-yellow-600" />
                      <div>
                        <p className="font-semibold">{course.rating || 0}/5</p>
                        <p className="text-sm text-muted-foreground">Average Rating</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3">
                      <Clock className="w-5 h-5 text-green-600" />
                      <div>
                        <p className="font-semibold">{course.duration}</p>
                        <p className="text-sm text-muted-foreground">Duration</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3">
                      <DollarSign className="w-5 h-5 text-purple-600" />
                      <div>
                        <p className="font-semibold">₹{course.price}</p>
                        <p className="text-sm text-muted-foreground">Current Price</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Course Details */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <Card>
                  <CardHeader>
                    <CardTitle>Course Details</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Instructor</p>
                      <p className="font-semibold">{course.instructor || 'Admin'}</p>
                    </div>
                    
                    <Separator />
                    
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Created</p>
                      <p className="font-semibold">
                        {new Date(course.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                    
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Last Updated</p>
                      <p className="font-semibold">
                        {new Date(course.updatedAt || course.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                    
                    {course.originalPrice && (
                      <>
                        <Separator />
                        <div>
                          <p className="text-sm font-medium text-muted-foreground">Original Price</p>
                          <p className="font-semibold text-muted-foreground line-through">
                            ₹{course.originalPrice}
                          </p>
                        </div>
                      </>
                    )}
                  </CardContent>
                </Card>
              </motion.div>

              {/* Quick Actions */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                <Card>
                  <CardHeader>
                    <CardTitle>Quick Actions</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <Link href={`/admin/courses/${courseId}/edit`}>
                      <Button variant="outline" className="w-full justify-start">
                        <Edit className="w-4 h-4 mr-2" />
                        Edit Course
                      </Button>
                    </Link>
                    
                    <Button
                      variant="outline"
                      onClick={toggleCourseStatus}
                      className="w-full justify-start"
                    >
                      <Settings className="w-4 h-4 mr-2" />
                      {course.isActive ? 'Deactivate' : 'Activate'} Course
                    </Button>
                    
                    <Button
                      variant="destructive"
                      onClick={deleteCourse}
                      className="w-full justify-start"
                    >
                      <Trash2 className="w-4 h-4 mr-2" />
                      Delete Course
                    </Button>
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