// // // // // // 'use client';

// // // // // // import { useState, useEffect } from 'react';
// // // // // // import { motion } from 'framer-motion';
// // // // // // import {
// // // // // //   BarChart3,
// // // // // //   Users,
// // // // // //   BookOpen,
// // // // // //   DollarSign,
// // // // // //   Plus,
// // // // // //   Search,
// // // // // //   Filter,
// // // // // //   MoreVertical,
// // // // // //   Edit,
// // // // // //   Trash2,
// // // // // //   Eye,
// // // // // //   TrendingUp,
// // // // // //   TrendingDown,
// // // // // //   Award
// // // // // // } from 'lucide-react';
// // // // // // import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
// // // // // // import { Button } from '@/components/ui/button';
// // // // // // import { Input } from '@/components/ui/input';
// // // // // // import { Badge } from '@/components/ui/badge';
// // // // // // import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
// // // // // // import {
// // // // // //   DropdownMenu,
// // // // // //   DropdownMenuContent,
// // // // // //   DropdownMenuItem,
// // // // // //   DropdownMenuTrigger,
// // // // // // } from '@/components/ui/dropdown-menu';
// // // // // // import { toast } from 'sonner';
// // // // // // import Link from 'next/link';
// // // // // // import Navbar from '@/components/navbar';

// // // // // // export default function AdminDashboard() {
// // // // // //   const [stats, setStats] = useState({
// // // // // //     totalUsers: 0,
// // // // // //     totalCourses: 0,
// // // // // //     totalRevenue: 0,
// // // // // //     activeStudents: 0,
// // // // // //     completionRate: 0,
// // // // // //     newEnrollments: 0
// // // // // //   });
// // // // // //   const [courses, setCourses] = useState([]);
// // // // // //   const [users, setUsers] = useState([]);
// // // // // //   const [recentOrders, setRecentOrders] = useState([]);
// // // // // //   const [loading, setLoading] = useState(true);

// // // // // //   useEffect(() => {
// // // // // //     fetchAdminData();
// // // // // //   }, []);

// // // // // //   const fetchAdminData = async () => {
// // // // // //     try {
// // // // // //       const response = await fetch('/api/admin/dashboard', {
// // // // // //         headers: {
// // // // // //           'Authorization': `Bearer ${document.cookie.split('auth-token=')[1]?.split(';')[0]}`,
// // // // // //         },
// // // // // //       });

// // // // // //       if (response.ok) {
// // // // // //         const data = await response.json();
// // // // // //         setStats(data.stats);
// // // // // //         setCourses(data.courses);
// // // // // //         setUsers(data.users);
// // // // // //         setRecentOrders(data.recentOrders);
// // // // // //       }
// // // // // //     } catch (error) {
// // // // // //       console.error('Error fetching admin data:', error);
// // // // // //       toast.error('Error loading dashboard data');
// // // // // //     } finally {
// // // // // //       setLoading(false);
// // // // // //     }
// // // // // //   };

// // // // // //   const deleteCourse = async (courseId) => {
// // // // // //     if (!confirm('Are you sure you want to delete this course?')) return;

// // // // // //     try {
// // // // // //       const response = await fetch(`/api/admin/courses/${courseId}`, {
// // // // // //         method: 'DELETE',
// // // // // //         headers: {
// // // // // //           'Authorization': `Bearer ${document.cookie.split('auth-token=')[1]?.split(';')[0]}`,
// // // // // //         },
// // // // // //       });

// // // // // //       if (response.ok) {
// // // // // //         toast.success('Course deleted successfully');
// // // // // //         fetchAdminData();
// // // // // //       } else {
// // // // // //         toast.error('Error deleting course');
// // // // // //       }
// // // // // //     } catch (error) {
// // // // // //       console.error('Error deleting course:', error);
// // // // // //       toast.error('Error deleting course');
// // // // // //     }
// // // // // //   };

// // // // // //   const adminStats = [
// // // // // //     {
// // // // // //       title: 'Total Users',
// // // // // //       value: stats.totalUsers,
// // // // // //       icon: Users,
// // // // // //       color: 'text-blue-600',
// // // // // //       bgColor: 'bg-blue-50 dark:bg-blue-950',
// // // // // //       change: '+12.5%',
// // // // // //       trend: 'up'
// // // // // //     },
// // // // // //     {
// // // // // //       title: 'Total Courses',
// // // // // //       value: stats.totalCourses,
// // // // // //       icon: BookOpen,
// // // // // //       color: 'text-green-600',
// // // // // //       bgColor: 'bg-green-50 dark:bg-green-950',
// // // // // //       change: '+8.2%',
// // // // // //       trend: 'up'
// // // // // //     },
// // // // // //     {
// // // // // //       title: 'Total Revenue',
// // // // // //       value: `₹${stats.totalRevenue.toLocaleString()}`,
// // // // // //       icon: DollarSign,
// // // // // //       color: 'text-purple-600',
// // // // // //       bgColor: 'bg-purple-50 dark:bg-purple-950',
// // // // // //       change: '+23.1%',
// // // // // //       trend: 'up'
// // // // // //     },
// // // // // //     {
// // // // // //       title: 'Active Students',
// // // // // //       value: stats.activeStudents,
// // // // // //       icon: Award,
// // // // // //       color: 'text-orange-600',
// // // // // //       bgColor: 'bg-orange-50 dark:bg-orange-950',
// // // // // //       change: '+5.4%',
// // // // // //       trend: 'up'
// // // // // //     }
// // // // // //   ];

// // // // // //   if (loading) {
// // // // // //     return (
// // // // // //       <div className="min-h-screen flex items-center justify-center">
// // // // // //         <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
// // // // // //       </div>
// // // // // //     );
// // // // // //   }

// // // // // //   return (
// // // // // //     <div className="min-h-screen bg-background">
// // // // // //       <Navbar />

// // // // // //       <main className="pt-20 pb-12">
// // // // // //         <div className="container mx-auto px-4">
// // // // // //           {/* Header */}
// // // // // //           <motion.div
// // // // // //             className="flex justify-between items-center mb-8"
// // // // // //             initial={{ opacity: 0, y: 20 }}
// // // // // //             animate={{ opacity: 1, y: 0 }}
// // // // // //             transition={{ duration: 0.6 }}
// // // // // //           >
// // // // // //             <div>
// // // // // //               <h1 className="text-3xl font-bold mb-2">Admin Dashboard</h1>
// // // // // //               <p className="text-muted-foreground">
// // // // // //                 Manage your courses, users, and track platform performance.
// // // // // //               </p>
// // // // // //             </div>
// // // // // //             <Link href="/admin/courses/create">
// // // // // //               <Button className="flex items-center gap-2">
// // // // // //                 <Plus className="w-4 h-4" />
// // // // // //                 Add Course
// // // // // //               </Button>
// // // // // //             </Link>
// // // // // //           </motion.div>

// // // // // //           {/* Stats Cards */}
// // // // // //           <motion.div
// // // // // //             className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
// // // // // //             initial={{ opacity: 0, y: 20 }}
// // // // // //             animate={{ opacity: 1, y: 0 }}
// // // // // //             transition={{ duration: 0.6, delay: 0.1 }}
// // // // // //           >
// // // // // //             {adminStats.map((stat, index) => (
// // // // // //               <Card key={stat.title} className="hover:shadow-lg transition-shadow">
// // // // // //                 <CardContent className="p-6">
// // // // // //                   <div className="flex items-center justify-between mb-4">
// // // // // //                     <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${stat.bgColor}`}>
// // // // // //                       <stat.icon className={`w-6 h-6 ${stat.color}`} />
// // // // // //                     </div>
// // // // // //                     <div className={`flex items-center gap-1 text-xs ${
// // // // // //                       stat.trend === 'up' ? 'text-green-600' : 'text-red-600'
// // // // // //                     }`}>
// // // // // //                       {stat.trend === 'up' ? (
// // // // // //                         <TrendingUp className="w-3 h-3" />
// // // // // //                       ) : (
// // // // // //                         <TrendingDown className="w-3 h-3" />
// // // // // //                       )}
// // // // // //                       {stat.change}
// // // // // //                     </div>
// // // // // //                   </div>
// // // // // //                   <div>
// // // // // //                     <p className="text-2xl font-bold mb-1">{stat.value}</p>
// // // // // //                     <p className="text-sm text-muted-foreground">{stat.title}</p>
// // // // // //                   </div>
// // // // // //                 </CardContent>
// // // // // //               </Card>
// // // // // //             ))}
// // // // // //           </motion.div>

// // // // // //           {/* Main Content */}
// // // // // //           <motion.div
// // // // // //             initial={{ opacity: 0, y: 20 }}
// // // // // //             animate={{ opacity: 1, y: 0 }}
// // // // // //             transition={{ duration: 0.6, delay: 0.2 }}
// // // // // //           >
// // // // // //             <Tabs defaultValue="courses" className="w-full">
// // // // // //               <TabsList className="grid w-full grid-cols-4">
// // // // // //                 <TabsTrigger value="courses">Courses</TabsTrigger>
// // // // // //                 <TabsTrigger value="users">Users</TabsTrigger>
// // // // // //                 <TabsTrigger value="orders">Orders</TabsTrigger>
// // // // // //                 <TabsTrigger value="analytics">Analytics</TabsTrigger>
// // // // // //               </TabsList>

// // // // // //               {/* Courses Tab */}
// // // // // //               <TabsContent value="courses" className="mt-6">
// // // // // //                 <Card>
// // // // // //                   <CardHeader>
// // // // // //                     <div className="flex justify-between items-center">
// // // // // //                       <div>
// // // // // //                         <CardTitle>Course Management</CardTitle>
// // // // // //                         <CardDescription>
// // // // // //                           Manage your courses, content, and pricing
// // // // // //                         </CardDescription>
// // // // // //                       </div>
// // // // // //                       <div className="flex gap-2">
// // // // // //                         <div className="relative">
// // // // // //                           <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
// // // // // //                           <Input
// // // // // //                             placeholder="Search courses..."
// // // // // //                             className="pl-10 w-64"
// // // // // //                           />
// // // // // //                         </div>
// // // // // //                         <Button variant="outline" size="icon">
// // // // // //                           <Filter className="h-4 w-4" />
// // // // // //                         </Button>
// // // // // //                       </div>
// // // // // //                     </div>
// // // // // //                   </CardHeader>
// // // // // //                   <CardContent>
// // // // // //                     <div className="space-y-4">
// // // // // //                       {courses.map((course) => (
// // // // // //                         <div
// // // // // //                           key={course.id}
// // // // // //                           className="flex items-center gap-4 p-4 border rounded-lg hover:bg-muted/50 transition-colors"
// // // // // //                         >
// // // // // //                           <img
// // // // // //                             src={course.thumbnail || 'https://images.pexels.com/photos/5212345/pexels-photo-5212345.jpeg'}
// // // // // //                             alt={course.title}
// // // // // //                             className="w-16 h-16 rounded-lg object-cover"
// // // // // //                           />
// // // // // //                           <div className="flex-1">
// // // // // //                             <h3 className="font-semibold mb-1">{course.title}</h3>
// // // // // //                             <p className="text-sm text-muted-foreground mb-2">
// // // // // //                               {course.description?.substring(0, 100)}...
// // // // // //                             </p>
// // // // // //                             <div className="flex items-center gap-4">
// // // // // //                               <Badge variant="secondary">{course.category}</Badge>
// // // // // //                               <span className="text-sm text-muted-foreground">
// // // // // //                                 ₹{course.price}
// // // // // //                               </span>
// // // // // //                               <span className="text-sm text-muted-foreground">
// // // // // //                                 {course.enrolledCount} enrolled
// // // // // //                               </span>
// // // // // //                             </div>
// // // // // //                           </div>
// // // // // //                           <DropdownMenu>
// // // // // //                             <DropdownMenuTrigger asChild>
// // // // // //                               <Button variant="ghost" size="icon">
// // // // // //                                 <MoreVertical className="h-4 w-4" />
// // // // // //                               </Button>
// // // // // //                             </DropdownMenuTrigger>
// // // // // //                             <DropdownMenuContent align="end">
// // // // // //                               <DropdownMenuItem asChild>
// // // // // //                                 <Link href={`/admin/courses/${course.id}`}>
// // // // // //                                   <Eye className="mr-2 h-4 w-4" />
// // // // // //                                   View
// // // // // //                                 </Link>
// // // // // //                               </DropdownMenuItem>
// // // // // //                               <DropdownMenuItem asChild>
// // // // // //                                 <Link href={`/admin/courses/${course.id}/edit`}>
// // // // // //                                   <Edit className="mr-2 h-4 w-4" />
// // // // // //                                   Edit
// // // // // //                                 </Link>
// // // // // //                               </DropdownMenuItem>
// // // // // //                               <DropdownMenuItem
// // // // // //                                 onClick={() => deleteCourse(course.id)}
// // // // // //                                 className="text-red-600"
// // // // // //                               >
// // // // // //                                 <Trash2 className="mr-2 h-4 w-4" />
// // // // // //                                 Delete
// // // // // //                               </DropdownMenuItem>
// // // // // //                             </DropdownMenuContent>
// // // // // //                           </DropdownMenu>
// // // // // //                         </div>
// // // // // //                       ))}
// // // // // //                     </div>
// // // // // //                   </CardContent>
// // // // // //                 </Card>
// // // // // //               </TabsContent>

// // // // // //               {/* Users Tab */}
// // // // // //               <TabsContent value="users" className="mt-6">
// // // // // //                 <Card>
// // // // // //                   <CardHeader>
// // // // // //                     <CardTitle>User Management</CardTitle>
// // // // // //                     <CardDescription>
// // // // // //                       View and manage registered users
// // // // // //                     </CardDescription>
// // // // // //                   </CardHeader>
// // // // // //                   <CardContent>
// // // // // //                     <div className="space-y-4">
// // // // // //                       {users.map((user) => (
// // // // // //                         <div
// // // // // //                           key={user.id}
// // // // // //                           className="flex items-center gap-4 p-4 border rounded-lg"
// // // // // //                         >
// // // // // //                           <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
// // // // // //                             <Users className="w-6 h-6 text-primary" />
// // // // // //                           </div>
// // // // // //                           <div className="flex-1">
// // // // // //                             <h3 className="font-semibold">{user.fullName}</h3>
// // // // // //                             <p className="text-sm text-muted-foreground">{user.email}</p>
// // // // // //                             <p className="text-sm text-muted-foreground">
// // // // // //                               Joined {new Date(user.createdAt).toLocaleDateString()}
// // // // // //                             </p>
// // // // // //                           </div>
// // // // // //                           <div className="text-right">
// // // // // //                             <Badge
// // // // // //                               variant={user.isVerified ? 'default' : 'secondary'}
// // // // // //                             >
// // // // // //                               {user.isVerified ? 'Verified' : 'Pending'}
// // // // // //                             </Badge>
// // // // // //                             <p className="text-sm text-muted-foreground mt-1">
// // // // // //                               {user.enrolledCourses?.length || 0} courses
// // // // // //                             </p>
// // // // // //                           </div>
// // // // // //                         </div>
// // // // // //                       ))}
// // // // // //                     </div>
// // // // // //                   </CardContent>
// // // // // //                 </Card>
// // // // // //               </TabsContent>

// // // // // //               {/* Orders Tab */}
// // // // // //               <TabsContent value="orders" className="mt-6">
// // // // // //                 <Card>
// // // // // //                   <CardHeader>
// // // // // //                     <CardTitle>Recent Orders</CardTitle>
// // // // // //                     <CardDescription>
// // // // // //                       Track course purchases and payments
// // // // // //                     </CardDescription>
// // // // // //                   </CardHeader>
// // // // // //                   <CardContent>
// // // // // //                     <div className="space-y-4">
// // // // // //                       {recentOrders.map((order) => (
// // // // // //                         <div
// // // // // //                           key={order.id}
// // // // // //                           className="flex items-center gap-4 p-4 border rounded-lg"
// // // // // //                         >
// // // // // //                           <div className="w-12 h-12 bg-green-50 dark:bg-green-950 rounded-full flex items-center justify-center">
// // // // // //                             <DollarSign className="w-6 h-6 text-green-600" />
// // // // // //                           </div>
// // // // // //                           <div className="flex-1">
// // // // // //                             <h3 className="font-semibold">{order.courseName}</h3>
// // // // // //                             <p className="text-sm text-muted-foreground">
// // // // // //                               by {order.userName}
// // // // // //                             </p>
// // // // // //                             <p className="text-sm text-muted-foreground">
// // // // // //                               {new Date(order.createdAt).toLocaleDateString()}
// // // // // //                             </p>
// // // // // //                           </div>
// // // // // //                           <div className="text-right">
// // // // // //                             <p className="font-semibold">₹{order.amount}</p>
// // // // // //                             <Badge
// // // // // //                               variant={
// // // // // //                                 order.status === 'completed'
// // // // // //                                   ? 'default'
// // // // // //                                   : order.status === 'pending'
// // // // // //                                   ? 'secondary'
// // // // // //                                   : 'destructive'
// // // // // //                               }
// // // // // //                             >
// // // // // //                               {order.status}
// // // // // //                             </Badge>
// // // // // //                           </div>
// // // // // //                         </div>
// // // // // //                       ))}
// // // // // //                     </div>
// // // // // //                   </CardContent>
// // // // // //                 </Card>
// // // // // //               </TabsContent>

// // // // // //               {/* Analytics Tab */}
// // // // // //               <TabsContent value="analytics" className="mt-6">
// // // // // //                 <div className="grid md:grid-cols-2 gap-6">
// // // // // //                   <Card>
// // // // // //                     <CardHeader>
// // // // // //                       <CardTitle>Revenue Overview</CardTitle>
// // // // // //                       <CardDescription>
// // // // // //                         Monthly revenue and growth trends
// // // // // //                       </CardDescription>
// // // // // //                     </CardHeader>
// // // // // //                     <CardContent>
// // // // // //                       <div className="h-64 flex items-center justify-center text-muted-foreground">
// // // // // //                         <BarChart3 className="w-12 h-12 mb-4" />
// // // // // //                         <p>Revenue chart would be integrated here</p>
// // // // // //                       </div>
// // // // // //                     </CardContent>
// // // // // //                   </Card>

// // // // // //                   <Card>
// // // // // //                     <CardHeader>
// // // // // //                       <CardTitle>Course Performance</CardTitle>
// // // // // //                       <CardDescription>
// // // // // //                         Top performing courses by enrollment
// // // // // //                       </CardDescription>
// // // // // //                     </CardHeader>
// // // // // //                     <CardContent>
// // // // // //                       <div className="space-y-4">
// // // // // //                         {courses.slice(0, 5).map((course, index) => (
// // // // // //                           <div key={course.id} className="flex items-center gap-3">
// // // // // //                             <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-sm font-medium">
// // // // // //                               {index + 1}
// // // // // //                             </div>
// // // // // //                             <div className="flex-1">
// // // // // //                               <p className="font-medium text-sm">{course.title}</p>
// // // // // //                               <p className="text-xs text-muted-foreground">
// // // // // //                                 {course.enrolledCount} students
// // // // // //                               </p>
// // // // // //                             </div>
// // // // // //                             <Badge variant="outline">
// // // // // //                               ₹{course.price}
// // // // // //                             </Badge>
// // // // // //                           </div>
// // // // // //                         ))}
// // // // // //                       </div>
// // // // // //                     </CardContent>
// // // // // //                   </Card>
// // // // // //                 </div>
// // // // // //               </TabsContent>
// // // // // //             </Tabs>
// // // // // //           </motion.div>
// // // // // //         </div>
// // // // // //       </main>
// // // // // //     </div>
// // // // // //   );
// // // // // // }

// // // // // 'use client';

// // // // // import { useState, useEffect } from 'react';
// // // // // import { motion } from 'framer-motion';
// // // // // import {
// // // // //   BarChart3,
// // // // //   Users,
// // // // //   BookOpen,
// // // // //   DollarSign,
// // // // //   Plus,
// // // // //   Search,
// // // // //   Filter,
// // // // //   MoreVertical,
// // // // //   Edit,
// // // // //   Trash2,
// // // // //   Eye,
// // // // //   TrendingUp,
// // // // //   TrendingDown,
// // // // //   Award,
// // // // //   Shield,
// // // // //   UserPlus,
// // // // //   Settings,
// // // // //   Bell,
// // // // //   Download,
// // // // //   Calendar
// // // // // } from 'lucide-react';
// // // // // import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
// // // // // import { Button } from '@/components/ui/button';
// // // // // import { Input } from '@/components/ui/input';
// // // // // import { Badge } from '@/components/ui/badge';
// // // // // import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
// // // // // import {
// // // // //   DropdownMenu,
// // // // //   DropdownMenuContent,
// // // // //   DropdownMenuItem,
// // // // //   DropdownMenuTrigger,
// // // // // } from '@/components/ui/dropdown-menu';
// // // // // import { toast } from 'sonner';
// // // // // import Link from 'next/link';
// // // // // import Navbar from '@/components/navbar';

// // // // // export default function AdminDashboard() {
// // // // //   const [stats, setStats] = useState({
// // // // //     totalUsers: 0,
// // // // //     totalCourses: 0,
// // // // //     totalRevenue: 0,
// // // // //     activeStudents: 0,
// // // // //     completionRate: 0,
// // // // //     newEnrollments: 0,
// // // // //     totalAdmins: 0,
// // // // //     activeAdmins: 0
// // // // //   });
// // // // //   const [courses, setCourses] = useState([]);
// // // // //   const [users, setUsers] = useState([]);
// // // // //   const [recentOrders, setRecentOrders] = useState([]);
// // // // //   const [recentAdmins, setRecentAdmins] = useState([]);
// // // // //   const [loading, setLoading] = useState(true);
// // // // //   const [searchTerm, setSearchTerm] = useState('');

// // // // //   useEffect(() => {
// // // // //     fetchAdminData();
// // // // //   }, []);

// // // // //   const fetchAdminData = async () => {
// // // // //     try {
// // // // //       const response = await fetch('/api/admin/dashboard', {
// // // // //         headers: {
// // // // //           'Authorization': `Bearer ${document.cookie.split('auth-token=')[1]?.split(';')[0]}`,
// // // // //         },
// // // // //       });

// // // // //       if (response.ok) {
// // // // //         const data = await response.json();
// // // // //         setStats(data.stats);
// // // // //         setCourses(data.courses);
// // // // //         setUsers(data.users);
// // // // //         setRecentOrders(data.recentOrders);
// // // // //         setRecentAdmins(data.recentAdmins || []);
// // // // //       } else {
// // // // //         toast.error('Failed to load dashboard data');
// // // // //       }
// // // // //     } catch (error) {
// // // // //       console.error('Error fetching admin data:', error);
// // // // //       toast.error('Error loading dashboard data');
// // // // //     } finally {
// // // // //       setLoading(false);
// // // // //     }
// // // // //   };

// // // // //   const deleteCourse = async (courseId) => {
// // // // //     if (!confirm('Are you sure you want to delete this course?')) return;

// // // // //     try {
// // // // //       const response = await fetch(`/api/admin/courses/${courseId}`, {
// // // // //         method: 'DELETE',
// // // // //         headers: {
// // // // //           'Authorization': `Bearer ${document.cookie.split('auth-token=')[1]?.split(';')[0]}`,
// // // // //         },
// // // // //       });

// // // // //       if (response.ok) {
// // // // //         toast.success('Course deleted successfully');
// // // // //         fetchAdminData();
// // // // //       } else {
// // // // //         toast.error('Error deleting course');
// // // // //       }
// // // // //     } catch (error) {
// // // // //       console.error('Error deleting course:', error);
// // // // //       toast.error('Error deleting course');
// // // // //     }
// // // // //   };

// // // // //   const toggleCourseStatus = async (courseId, currentStatus) => {
// // // // //     try {
// // // // //       const response = await fetch(`/api/admin/courses/${courseId}/toggle-status`, {
// // // // //         method: 'PUT',
// // // // //         headers: {
// // // // //           'Authorization': `Bearer ${document.cookie.split('auth-token=')[1]?.split(';')[0]}`,
// // // // //         },
// // // // //       });

// // // // //       if (response.ok) {
// // // // //         toast.success(`Course ${currentStatus ? 'deactivated' : 'activated'} successfully`);
// // // // //         fetchAdminData();
// // // // //       } else {
// // // // //         toast.error('Error updating course status');
// // // // //       }
// // // // //     } catch (error) {
// // // // //       console.error('Error toggling course status:', error);
// // // // //       toast.error('Error updating course status');
// // // // //     }
// // // // //   };

// // // // //   const filteredCourses = courses.filter(course =>
// // // // //     course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
// // // // //     course.category.toLowerCase().includes(searchTerm.toLowerCase())
// // // // //   );

// // // // //   const filteredUsers = users.filter(user =>
// // // // //     user.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
// // // // //     user.email.toLowerCase().includes(searchTerm.toLowerCase())
// // // // //   );

// // // // //   const adminStats = [
// // // // //     {
// // // // //       title: 'Total Users',
// // // // //       value: stats.totalUsers,
// // // // //       icon: Users,
// // // // //       color: 'text-blue-600',
// // // // //       bgColor: 'bg-blue-50 dark:bg-blue-950',
// // // // //       change: '+12.5%',
// // // // //       trend: 'up'
// // // // //     },
// // // // //     {
// // // // //       title: 'Total Courses',
// // // // //       value: stats.totalCourses,
// // // // //       icon: BookOpen,
// // // // //       color: 'text-green-600',
// // // // //       bgColor: 'bg-green-50 dark:bg-green-950',
// // // // //       change: '+8.2%',
// // // // //       trend: 'up'
// // // // //     },
// // // // //     {
// // // // //       title: 'Total Revenue',
// // // // //       value: `₹${stats.totalRevenue.toLocaleString()}`,
// // // // //       icon: DollarSign,
// // // // //       color: 'text-purple-600',
// // // // //       bgColor: 'bg-purple-50 dark:bg-purple-950',
// // // // //       change: '+23.1%',
// // // // //       trend: 'up'
// // // // //     },
// // // // //     {
// // // // //       title: 'Active Students',
// // // // //       value: stats.activeStudents,
// // // // //       icon: Award,
// // // // //       color: 'text-orange-600',
// // // // //       bgColor: 'bg-orange-50 dark:bg-orange-950',
// // // // //       change: '+5.4%',
// // // // //       trend: 'up'
// // // // //     }
// // // // //   ];

// // // // //   if (loading) {
// // // // //     return (
// // // // //       <div className="min-h-screen flex items-center justify-center">
// // // // //         <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
// // // // //       </div>
// // // // //     );
// // // // //   }

// // // // //   return (
// // // // //     <div className="min-h-screen bg-background">
// // // // //       <Navbar />

// // // // //       <main className="pt-20 pb-12">
// // // // //         <div className="container mx-auto px-4">
// // // // //           {/* Header */}
// // // // //           <motion.div
// // // // //             className="flex justify-between items-center mb-8"
// // // // //             initial={{ opacity: 0, y: 20 }}
// // // // //             animate={{ opacity: 1, y: 0 }}
// // // // //             transition={{ duration: 0.6 }}
// // // // //           >
// // // // //             <div>
// // // // //               <h1 className="text-3xl font-bold mb-2">Admin Dashboard</h1>
// // // // //               <p className="text-muted-foreground">
// // // // //                 Manage your courses, users, and track platform performance.
// // // // //               </p>
// // // // //             </div>
// // // // //             <div className="flex items-center gap-3">
// // // // //               <Link href="/admin/admins">
// // // // //                 <Button variant="outline" className="flex items-center gap-2">
// // // // //                   <Shield className="w-4 h-4" />
// // // // //                   Manage Admins
// // // // //                 </Button>
// // // // //               </Link>
// // // // //               <Link href="/admin/courses/create">
// // // // //                 <Button className="flex items-center gap-2">
// // // // //                   <Plus className="w-4 h-4" />
// // // // //                   Add Course
// // // // //                 </Button>
// // // // //               </Link>
// // // // //             </div>
// // // // //           </motion.div>

// // // // //           {/* Stats Cards */}
// // // // //           <motion.div
// // // // //             className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
// // // // //             initial={{ opacity: 0, y: 20 }}
// // // // //             animate={{ opacity: 1, y: 0 }}
// // // // //             transition={{ duration: 0.6, delay: 0.1 }}
// // // // //           >
// // // // //             {adminStats.map((stat, index) => (
// // // // //               <Card key={stat.title} className="hover:shadow-lg transition-shadow">
// // // // //                 <CardContent className="p-6">
// // // // //                   <div className="flex items-center justify-between mb-4">
// // // // //                     <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${stat.bgColor}`}>
// // // // //                       <stat.icon className={`w-6 h-6 ${stat.color}`} />
// // // // //                     </div>
// // // // //                     <div className={`flex items-center gap-1 text-xs ${stat.trend === 'up' ? 'text-green-600' : 'text-red-600'
// // // // //                       }`}>
// // // // //                       {stat.trend === 'up' ? (
// // // // //                         <TrendingUp className="w-3 h-3" />
// // // // //                       ) : (
// // // // //                         <TrendingDown className="w-3 h-3" />
// // // // //                       )}
// // // // //                       {stat.change}
// // // // //                     </div>
// // // // //                   </div>
// // // // //                   <div>
// // // // //                     <p className="text-2xl font-bold mb-1">{stat.value}</p>
// // // // //                     <p className="text-sm text-muted-foreground">{stat.title}</p>
// // // // //                   </div>
// // // // //                 </CardContent>
// // // // //               </Card>
// // // // //             ))}
// // // // //           </motion.div>

// // // // //           {/* Quick Actions */}
// // // // //           <motion.div
// // // // //             className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8"
// // // // //             initial={{ opacity: 0, y: 20 }}
// // // // //             animate={{ opacity: 1, y: 0 }}
// // // // //             transition={{ duration: 0.6, delay: 0.2 }}
// // // // //           >
// // // // //             <Card className="hover:shadow-lg transition-shadow cursor-pointer">
// // // // //               <Link href="/admin/admins">
// // // // //                 <CardContent className="p-6">
// // // // //                   <div className="flex items-center gap-4">
// // // // //                     <div className="w-12 h-12 bg-purple-50 dark:bg-purple-950 rounded-lg flex items-center justify-center">
// // // // //                       <UserPlus className="w-6 h-6 text-purple-600" />
// // // // //                     </div>
// // // // //                     <div>
// // // // //                       <h3 className="font-semibold mb-1">Administrator Management</h3>
// // // // //                       <p className="text-sm text-muted-foreground">
// // // // //                         Add and manage admin accounts
// // // // //                       </p>
// // // // //                       <Badge variant="secondary" className="mt-2">
// // // // //                         {stats.totalAdmins || 0} Admins
// // // // //                       </Badge>
// // // // //                     </div>
// // // // //                   </div>
// // // // //                 </CardContent>
// // // // //               </Link>
// // // // //             </Card>

// // // // //             <Card className="hover:shadow-lg transition-shadow cursor-pointer">
// // // // //               <Link href="/admin/courses/create">
// // // // //                 <CardContent className="p-6">
// // // // //                   <div className="flex items-center gap-4">
// // // // //                     <div className="w-12 h-12 bg-green-50 dark:bg-green-950 rounded-lg flex items-center justify-center">
// // // // //                       <Plus className="w-6 h-6 text-green-600" />
// // // // //                     </div>
// // // // //                     <div>
// // // // //                       <h3 className="font-semibold mb-1">Create New Course</h3>
// // // // //                       <p className="text-sm text-muted-foreground">
// // // // //                         Add courses with content and pricing
// // // // //                       </p>
// // // // //                       <Badge variant="secondary" className="mt-2">
// // // // //                         Quick Action
// // // // //                       </Badge>
// // // // //                     </div>
// // // // //                   </div>
// // // // //                 </CardContent>
// // // // //               </Link>
// // // // //             </Card>

// // // // //             <Card className="hover:shadow-lg transition-shadow">
// // // // //               <CardContent className="p-6">
// // // // //                 <div className="flex items-center gap-4">
// // // // //                   <div className="w-12 h-12 bg-blue-50 dark:bg-blue-950 rounded-lg flex items-center justify-center">
// // // // //                     <BarChart3 className="w-6 h-6 text-blue-600" />
// // // // //                   </div>
// // // // //                   <div>
// // // // //                     <h3 className="font-semibold mb-1">Analytics Overview</h3>
// // // // //                     <p className="text-sm text-muted-foreground">
// // // // //                       View detailed platform analytics
// // // // //                     </p>
// // // // //                     <Badge variant="secondary" className="mt-2">
// // // // //                       Coming Soon
// // // // //                     </Badge>
// // // // //                   </div>
// // // // //                 </div>
// // // // //               </CardContent>
// // // // //             </Card>
// // // // //           </motion.div>

// // // // //           {/* Main Content */}
// // // // //           <motion.div
// // // // //             initial={{ opacity: 0, y: 20 }}
// // // // //             animate={{ opacity: 1, y: 0 }}
// // // // //             transition={{ duration: 0.6, delay: 0.3 }}
// // // // //           >
// // // // //             <Tabs defaultValue="courses" className="w-full">
// // // // //               <TabsList className="grid w-full grid-cols-5">
// // // // //                 <TabsTrigger value="courses">Courses</TabsTrigger>
// // // // //                 <TabsTrigger value="users">Users</TabsTrigger>
// // // // //                 <TabsTrigger value="orders">Orders</TabsTrigger>
// // // // //                 <TabsTrigger value="admins">Admins</TabsTrigger>
// // // // //                 <TabsTrigger value="analytics">Analytics</TabsTrigger>
// // // // //               </TabsList>

// // // // //               {/* Courses Tab */}
// // // // //               <TabsContent value="courses" className="mt-6">
// // // // //                 <Card>
// // // // //                   <CardHeader>
// // // // //                     <div className="flex justify-between items-center">
// // // // //                       <div>
// // // // //                         <CardTitle>Course Management</CardTitle>
// // // // //                         <CardDescription>
// // // // //                           Manage your courses, content, and pricing
// // // // //                         </CardDescription>
// // // // //                       </div>
// // // // //                       <div className="flex gap-2">
// // // // //                         <div className="relative">
// // // // //                           <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
// // // // //                           <Input
// // // // //                             placeholder="Search courses..."
// // // // //                             className="pl-10 w-64"
// // // // //                             value={searchTerm}
// // // // //                             onChange={(e) => setSearchTerm(e.target.value)}
// // // // //                           />
// // // // //                         </div>
// // // // //                         <Button variant="outline" size="icon">
// // // // //                           <Filter className="h-4 w-4" />
// // // // //                         </Button>
// // // // //                       </div>
// // // // //                     </div>
// // // // //                   </CardHeader>
// // // // //                   <CardContent>
// // // // //                     <div className="space-y-4">
// // // // //                       {filteredCourses.map((course) => (
// // // // //                         <div
// // // // //                           key={course.id}
// // // // //                           className="flex items-center gap-4 p-4 border rounded-lg hover:bg-muted/50 transition-colors"
// // // // //                         >
// // // // //                           <img
// // // // //                             src={course.thumbnail || 'https://images.pexels.com/photos/5212345/pexels-photo-5212345.jpeg'}
// // // // //                             alt={course.title}
// // // // //                             className="w-16 h-16 rounded-lg object-cover"
// // // // //                           />
// // // // //                           <div className="flex-1">
// // // // //                             <h3 className="font-semibold mb-1">{course.title}</h3>
// // // // //                             <p className="text-sm text-muted-foreground mb-2">
// // // // //                               {course.description?.substring(0, 100)}...
// // // // //                             </p>
// // // // //                             <div className="flex items-center gap-4">
// // // // //                               <Badge variant="secondary">{course.category}</Badge>
// // // // //                               <Badge variant={course.isActive ? 'default' : 'destructive'}>
// // // // //                                 {course.isActive ? 'Active' : 'Inactive'}
// // // // //                               </Badge>
// // // // //                               <span className="text-sm text-muted-foreground">
// // // // //                                 ₹{course.price}
// // // // //                               </span>
// // // // //                               <span className="text-sm text-muted-foreground">
// // // // //                                 {course.enrolledCount || 0} enrolled
// // // // //                               </span>
// // // // //                             </div>
// // // // //                           </div>
// // // // //                           <DropdownMenu>
// // // // //                             <DropdownMenuTrigger asChild>
// // // // //                               <Button variant="ghost" size="icon">
// // // // //                                 <MoreVertical className="h-4 w-4" />
// // // // //                               </Button>
// // // // //                             </DropdownMenuTrigger>
// // // // //                             <DropdownMenuContent align="end">
// // // // //                               <DropdownMenuItem asChild>
// // // // //                                 <Link href={`/admin/courses/${course.id}`}>
// // // // //                                   <Eye className="mr-2 h-4 w-4" />
// // // // //                                   View
// // // // //                                 </Link>
// // // // //                               </DropdownMenuItem>
// // // // //                               <DropdownMenuItem asChild>
// // // // //                                 <Link href={`/admin/courses/${course.id}/edit`}>
// // // // //                                   <Edit className="mr-2 h-4 w-4" />
// // // // //                                   Edit
// // // // //                                 </Link>
// // // // //                               </DropdownMenuItem>
// // // // //                               <DropdownMenuItem
// // // // //                                 onClick={() => toggleCourseStatus(course.id, course.isActive)}
// // // // //                               >
// // // // //                                 <Settings className="mr-2 h-4 w-4" />
// // // // //                                 {course.isActive ? 'Deactivate' : 'Activate'}
// // // // //                               </DropdownMenuItem>
// // // // //                               <DropdownMenuItem
// // // // //                                 onClick={() => deleteCourse(course.id)}
// // // // //                                 className="text-red-600"
// // // // //                               >
// // // // //                                 <Trash2 className="mr-2 h-4 w-4" />
// // // // //                                 Delete
// // // // //                               </DropdownMenuItem>
// // // // //                             </DropdownMenuContent>
// // // // //                           </DropdownMenu>
// // // // //                         </div>
// // // // //                       ))}

// // // // //                       {filteredCourses.length === 0 && (
// // // // //                         <div className="text-center py-8 text-muted-foreground">
// // // // //                           <BookOpen className="w-12 h-12 mx-auto mb-4 opacity-50" />
// // // // //                           <p>No courses found.</p>
// // // // //                           {searchTerm && (
// // // // //                             <p className="text-sm">Try adjusting your search criteria.</p>
// // // // //                           )}
// // // // //                         </div>
// // // // //                       )}
// // // // //                     </div>
// // // // //                   </CardContent>
// // // // //                 </Card>
// // // // //               </TabsContent>

// // // // //               {/* Users Tab */}
// // // // //               <TabsContent value="users" className="mt-6">
// // // // //                 <Card>
// // // // //                   <CardHeader>
// // // // //                     <div className="flex justify-between items-center">
// // // // //                       <div>
// // // // //                         <CardTitle>User Management</CardTitle>
// // // // //                         <CardDescription>
// // // // //                           View and manage registered users
// // // // //                         </CardDescription>
// // // // //                       </div>
// // // // //                       <div className="relative">
// // // // //                         <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
// // // // //                         <Input
// // // // //                           placeholder="Search users..."
// // // // //                           className="pl-10 w-64"
// // // // //                           value={searchTerm}
// // // // //                           onChange={(e) => setSearchTerm(e.target.value)}
// // // // //                         />
// // // // //                       </div>
// // // // //                     </div>
// // // // //                   </CardHeader>
// // // // //                   <CardContent>
// // // // //                     <div className="space-y-4">
// // // // //                       {filteredUsers.map((user) => (
// // // // //                         <div
// // // // //                           key={user.id}
// // // // //                           className="flex items-center gap-4 p-4 border rounded-lg hover:bg-muted/50 transition-colors"
// // // // //                         >
// // // // //                           <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
// // // // //                             <Users className="w-6 h-6 text-primary" />
// // // // //                           </div>
// // // // //                           <div className="flex-1">
// // // // //                             <h3 className="font-semibold">{user.fullName}</h3>
// // // // //                             <p className="text-sm text-muted-foreground">{user.email}</p>
// // // // //                             <p className="text-sm text-muted-foreground">
// // // // //                               {user.location && `${user.location} • `}
// // // // //                               Joined {new Date(user.createdAt).toLocaleDateString()}
// // // // //                             </p>
// // // // //                           </div>
// // // // //                           <div className="text-right">
// // // // //                             <Badge
// // // // //                               variant={user.isVerified ? 'default' : 'secondary'}
// // // // //                             >
// // // // //                               {user.isVerified ? 'Verified' : 'Pending'}
// // // // //                             </Badge>
// // // // //                             <p className="text-sm text-muted-foreground mt-1">
// // // // //                               {user.enrolledCourses?.length || 0} courses
// // // // //                             </p>
// // // // //                             {user.credits > 0 && (
// // // // //                               <p className="text-sm text-green-600 mt-1">
// // // // //                                 ₹{user.credits} credits
// // // // //                               </p>
// // // // //                             )}
// // // // //                           </div>
// // // // //                         </div>
// // // // //                       ))}

// // // // //                       {filteredUsers.length === 0 && (
// // // // //                         <div className="text-center py-8 text-muted-foreground">
// // // // //                           <Users className="w-12 h-12 mx-auto mb-4 opacity-50" />
// // // // //                           <p>No users found.</p>
// // // // //                           {searchTerm && (
// // // // //                             <p className="text-sm">Try adjusting your search criteria.</p>
// // // // //                           )}
// // // // //                         </div>
// // // // //                       )}
// // // // //                     </div>
// // // // //                   </CardContent>
// // // // //                 </Card>
// // // // //               </TabsContent>

// // // // //               {/* Orders Tab */}
// // // // //               <TabsContent value="orders" className="mt-6">
// // // // //                 <Card>
// // // // //                   <CardHeader>
// // // // //                     <CardTitle>Recent Orders</CardTitle>
// // // // //                     <CardDescription>
// // // // //                       Track course purchases and payments
// // // // //                     </CardDescription>
// // // // //                   </CardHeader>
// // // // //                   <CardContent>
// // // // //                     <div className="space-y-4">
// // // // //                       {recentOrders.map((order) => (
// // // // //                         <div
// // // // //                           key={order.id}
// // // // //                           className="flex items-center gap-4 p-4 border rounded-lg hover:bg-muted/50 transition-colors"
// // // // //                         >
// // // // //                           <div className="w-12 h-12 bg-green-50 dark:bg-green-950 rounded-full flex items-center justify-center">
// // // // //                             <DollarSign className="w-6 h-6 text-green-600" />
// // // // //                           </div>
// // // // //                           <div className="flex-1">
// // // // //                             <h3 className="font-semibold">{order.courseName}</h3>
// // // // //                             <p className="text-sm text-muted-foreground">
// // // // //                               by {order.userName}
// // // // //                             </p>
// // // // //                             <p className="text-sm text-muted-foreground">
// // // // //                               {new Date(order.createdAt).toLocaleDateString()}
// // // // //                             </p>
// // // // //                           </div>
// // // // //                           <div className="text-right">
// // // // //                             <p className="font-semibold">₹{order.amount}</p>
// // // // //                             <Badge
// // // // //                               variant={
// // // // //                                 order.status === 'completed'
// // // // //                                   ? 'default'
// // // // //                                   : order.status === 'pending'
// // // // //                                     ? 'secondary'
// // // // //                                     : 'destructive'
// // // // //                               }
// // // // //                             >
// // // // //                               {order.status}
// // // // //                             </Badge>
// // // // //                           </div>
// // // // //                         </div>
// // // // //                       ))}

// // // // //                       {recentOrders.length === 0 && (
// // // // //                         <div className="text-center py-8 text-muted-foreground">
// // // // //                           <DollarSign className="w-12 h-12 mx-auto mb-4 opacity-50" />
// // // // //                           <p>No recent orders found.</p>
// // // // //                         </div>
// // // // //                       )}
// // // // //                     </div>
// // // // //                   </CardContent>
// // // // //                 </Card>
// // // // //               </TabsContent>

// // // // //               {/* Admins Tab */}
// // // // //               <TabsContent value="admins" className="mt-6">
// // // // //                 <Card>
// // // // //                   <CardHeader>
// // // // //                     <div className="flex justify-between items-center">
// // // // //                       <div>
// // // // //                         <CardTitle>Administrator Overview</CardTitle>
// // // // //                         <CardDescription>
// // // // //                           Quick view of admin accounts and recent activity
// // // // //                         </CardDescription>
// // // // //                       </div>
// // // // //                       <Link href="/admin/admins">
// // // // //                         <Button className="flex items-center gap-2">
// // // // //                           <Shield className="w-4 h-4" />
// // // // //                           Manage All Admins
// // // // //                         </Button>
// // // // //                       </Link>
// // // // //                     </div>
// // // // //                   </CardHeader>
// // // // //                   <CardContent>
// // // // //                     <div className="grid md:grid-cols-2 gap-6 mb-6">
// // // // //                       <div className="p-4 bg-purple-50 dark:bg-purple-950/50 rounded-lg">
// // // // //                         <div className="flex items-center gap-3">
// // // // //                           <Shield className="w-8 h-8 text-purple-600" />
// // // // //                           <div>
// // // // //                             <p className="text-2xl font-bold">{stats.totalAdmins || 0}</p>
// // // // //                             <p className="text-sm text-muted-foreground">Total Administrators</p>
// // // // //                           </div>
// // // // //                         </div>
// // // // //                       </div>
// // // // //                       <div className="p-4 bg-green-50 dark:bg-green-950/50 rounded-lg">
// // // // //                         <div className="flex items-center gap-3">
// // // // //                           <UserPlus className="w-8 h-8 text-green-600" />
// // // // //                           <div>
// // // // //                             <p className="text-2xl font-bold">{stats.activeAdmins || 0}</p>
// // // // //                             <p className="text-sm text-muted-foreground">Active Administrators</p>
// // // // //                           </div>
// // // // //                         </div>
// // // // //                       </div>
// // // // //                     </div>

// // // // //                     <div className="space-y-4">
// // // // //                       <h4 className="font-semibold">Recent Admin Activity</h4>
// // // // //                       {recentAdmins.slice(0, 3).map((admin) => (
// // // // //                         <div
// // // // //                           key={admin.id}
// // // // //                           className="flex items-center gap-4 p-3 border rounded-lg"
// // // // //                         >
// // // // //                           <div className="w-10 h-10 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center">
// // // // //                             <Shield className="w-5 h-5 text-purple-600" />
// // // // //                           </div>
// // // // //                           <div className="flex-1">
// // // // //                             <h5 className="font-medium">{admin.fullName}</h5>
// // // // //                             <p className="text-sm text-muted-foreground">{admin.email}</p>
// // // // //                           </div>
// // // // //                           <Badge variant={admin.isActive ? 'default' : 'secondary'}>
// // // // //                             {admin.isActive ? 'Active' : 'Inactive'}
// // // // //                           </Badge>
// // // // //                         </div>
// // // // //                       ))}

// // // // //                       {recentAdmins.length === 0 && (
// // // // //                         <div className="text-center py-6 text-muted-foreground">
// // // // //                           <Shield className="w-8 h-8 mx-auto mb-2 opacity-50" />
// // // // //                           <p className="text-sm">No admin data available</p>
// // // // //                         </div>
// // // // //                       )}
// // // // //                     </div>
// // // // //                   </CardContent>
// // // // //                 </Card>
// // // // //               </TabsContent>

// // // // //               {/* Analytics Tab */}
// // // // //               <TabsContent value="analytics" className="mt-6">
// // // // //                 <div className="grid md:grid-cols-2 gap-6">
// // // // //                   <Card>
// // // // //                     <CardHeader>
// // // // //                       <CardTitle>Revenue Overview</CardTitle>
// // // // //                       <CardDescription>
// // // // //                         Monthly revenue and growth trends
// // // // //                       </CardDescription>
// // // // //                     </CardHeader>
// // // // //                     <CardContent>
// // // // //                       <div className="h-64 flex flex-col items-center justify-center text-muted-foreground">
// // // // //                         <BarChart3 className="w-12 h-12 mb-4" />
// // // // //                         <p>Revenue chart integration coming soon</p>
// // // // //                         <p className="text-sm">Connect with analytics service</p>
// // // // //                       </div>
// // // // //                     </CardContent>
// // // // //                   </Card>

// // // // //                   <Card>
// // // // //                     <CardHeader>
// // // // //                       <CardTitle>Course Performance</CardTitle>
// // // // //                       <CardDescription>
// // // // //                         Top performing courses by enrollment
// // // // //                       </CardDescription>
// // // // //                     </CardHeader>
// // // // //                     <CardContent>
// // // // //                       <div className="space-y-4">
// // // // //                         {courses.slice(0, 5).map((course, index) => (
// // // // //                           <div key={course.id} className="flex items-center gap-3">
// // // // //                             <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-sm font-medium">
// // // // //                               {index + 1}
// // // // //                             </div>
// // // // //                             <div className="flex-1">
// // // // //                               <p className="font-medium text-sm">{course.title}</p>
// // // // //                               <p className="text-xs text-muted-foreground">
// // // // //                                 {course.enrolledCount || 0} students
// // // // //                               </p>
// // // // //                             </div>
// // // // //                             <Badge variant="outline">
// // // // //                               ₹{course.price}
// // // // //                             </Badge>
// // // // //                           </div>
// // // // //                         ))}

// // // // //                         {courses.length === 0 && (
// // // // //                           <div className="text-center py-6 text-muted-foreground">
// // // // //                             <BookOpen className="w-8 h-8 mx-auto mb-2 opacity-50" />
// // // // //                             <p className="text-sm">No course data available</p>
// // // // //                           </div>
// // // // //                         )}
// // // // //                       </div>
// // // // //                     </CardContent>
// // // // //                   </Card>
// // // // //                 </div>
// // // // //               </TabsContent>
// // // // //             </Tabs>
// // // // //           </motion.div>
// // // // //         </div>
// // // // //       </main>
// // // // //     </div>
// // // // //   );
// // // // // }

// // // // 'use client';

// // // // import { useState, useEffect } from 'react';
// // // // import { motion } from 'framer-motion';
// // // // import {
// // // //   BarChart3,
// // // //   Users,
// // // //   BookOpen,
// // // //   DollarSign,
// // // //   Plus,
// // // //   Search,
// // // //   Filter,
// // // //   MoreVertical,
// // // //   Edit,
// // // //   Trash2,
// // // //   Eye,
// // // //   TrendingUp,
// // // //   TrendingDown,
// // // //   Award,
// // // //   Shield,
// // // //   UserPlus,
// // // //   Settings,
// // // // } from 'lucide-react';
// // // // import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
// // // // import { Button } from '@/components/ui/button';
// // // // import { Input } from '@/components/ui/input';
// // // // import { Badge } from '@/components/ui/badge';
// // // // import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
// // // // import {
// // // //   DropdownMenu,
// // // //   DropdownMenuContent,
// // // //   DropdownMenuItem,
// // // //   DropdownMenuTrigger,
// // // // } from '@/components/ui/dropdown-menu';
// // // // import { toast } from 'sonner';
// // // // import Link from 'next/link';
// // // // import AdminNavbar from '@/components/admin-navbar';

// // // // export default function AdminDashboard() {
// // // //   const [stats, setStats] = useState({
// // // //     totalUsers: 0,
// // // //     totalCourses: 0,
// // // //     totalRevenue: 0,
// // // //     activeStudents: 0,
// // // //     completionRate: 0,
// // // //     newEnrollments: 0,
// // // //     totalAdmins: 0,
// // // //     activeAdmins: 0
// // // //   });
// // // //   const [courses, setCourses] = useState([]);
// // // //   const [users, setUsers] = useState([]);
// // // //   const [recentOrders, setRecentOrders] = useState([]);
// // // //   const [recentAdmins, setRecentAdmins] = useState([]);
// // // //   const [loading, setLoading] = useState(true);
// // // //   const [searchTerm, setSearchTerm] = useState('');

// // // //   useEffect(() => {
// // // //     fetchAdminData();
// // // //   }, []);

// // // //   const fetchAdminData = async () => {
// // // //     try {
// // // //       const response = await fetch('/api/admin/dashboard', {
// // // //         headers: {
// // // //           'Authorization': `Bearer ${document.cookie.split('auth-token=')[1]?.split(';')[0]}`,
// // // //         },
// // // //       });

// // // //       if (response.ok) {
// // // //         const data = await response.json();
// // // //         setStats(data.stats);
// // // //         setCourses(data.courses);
// // // //         setUsers(data.users);
// // // //         setRecentOrders(data.recentOrders);
// // // //         setRecentAdmins(data.recentAdmins || []);
// // // //       } else {
// // // //         toast.error('Failed to load dashboard data');
// // // //       }
// // // //     } catch (error) {
// // // //       console.error('Error fetching admin data:', error);
// // // //       toast.error('Error loading dashboard data');
// // // //     } finally {
// // // //       setLoading(false);
// // // //     }
// // // //   };

// // // //   const deleteCourse = async (courseId) => {
// // // //     if (!confirm('Are you sure you want to delete this course?')) return;

// // // //     try {
// // // //       const response = await fetch(`/api/admin/courses/${courseId}`, {
// // // //         method: 'DELETE',
// // // //         headers: {
// // // //           'Authorization': `Bearer ${document.cookie.split('auth-token=')[1]?.split(';')[0]}`,
// // // //         },
// // // //       });

// // // //       if (response.ok) {
// // // //         toast.success('Course deleted successfully');
// // // //         fetchAdminData();
// // // //       } else {
// // // //         toast.error('Error deleting course');
// // // //       }
// // // //     } catch (error) {
// // // //       console.error('Error deleting course:', error);
// // // //       toast.error('Error deleting course');
// // // //     }
// // // //   };

// // // //   const toggleCourseStatus = async (courseId, currentStatus) => {
// // // //     try {
// // // //       const response = await fetch(`/api/admin/courses/${courseId}/toggle-status`, {
// // // //         method: 'PUT',
// // // //         headers: {
// // // //           'Authorization': `Bearer ${document.cookie.split('auth-token=')[1]?.split(';')[0]}`,
// // // //         },
// // // //       });

// // // //       if (response.ok) {
// // // //         toast.success(`Course ${currentStatus ? 'deactivated' : 'activated'} successfully`);
// // // //         fetchAdminData();
// // // //       } else {
// // // //         toast.error('Error updating course status');
// // // //       }
// // // //     } catch (error) {
// // // //       console.error('Error toggling course status:', error);
// // // //       toast.error('Error updating course status');
// // // //     }
// // // //   };

// // // //   const filteredCourses = courses.filter(course =>
// // // //     course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
// // // //     course.category.toLowerCase().includes(searchTerm.toLowerCase())
// // // //   );

// // // //   const filteredUsers = users.filter(user =>
// // // //     user.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
// // // //     user.email.toLowerCase().includes(searchTerm.toLowerCase())
// // // //   );

// // // //   const adminStats = [
// // // //     {
// // // //       title: 'Total Users',
// // // //       value: stats.totalUsers,
// // // //       icon: Users,
// // // //       color: 'text-blue-600',
// // // //       bgColor: 'bg-blue-50 dark:bg-blue-950',
// // // //       change: '+12.5%',
// // // //       trend: 'up'
// // // //     },
// // // //     {
// // // //       title: 'Total Courses',
// // // //       value: stats.totalCourses,
// // // //       icon: BookOpen,
// // // //       color: 'text-green-600',
// // // //       bgColor: 'bg-green-50 dark:bg-green-950',
// // // //       change: '+8.2%',
// // // //       trend: 'up'
// // // //     },
// // // //     {
// // // //       title: 'Total Revenue',
// // // //       value: `₹${stats.totalRevenue.toLocaleString()}`,
// // // //       icon: DollarSign,
// // // //       color: 'text-purple-600',
// // // //       bgColor: 'bg-purple-50 dark:bg-purple-950',
// // // //       change: '+23.1%',
// // // //       trend: 'up'
// // // //     },
// // // //     {
// // // //       title: 'Active Students',
// // // //       value: stats.activeStudents,
// // // //       icon: Award,
// // // //       color: 'text-orange-600',
// // // //       bgColor: 'bg-orange-50 dark:bg-orange-950',
// // // //       change: '+5.4%',
// // // //       trend: 'up'
// // // //     }
// // // //   ];

// // // //   if (loading) {
// // // //     return (
// // // //       <div className="min-h-screen flex items-center justify-center">
// // // //         <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
// // // //       </div>
// // // //     );
// // // //   }

// // // //   return (
// // // //     <div className="min-h-screen bg-background">
// // // //       <AdminNavbar />

// // // //       <main className="pt-20 pb-12">
// // // //         <div className="container mx-auto px-4">
// // // //           {/* Header */}
// // // //           <motion.div
// // // //             className="flex justify-between items-center mb-8"
// // // //             initial={{ opacity: 0, y: 20 }}
// // // //             animate={{ opacity: 1, y: 0 }}
// // // //             transition={{ duration: 0.6 }}
// // // //           >
// // // //             <div>
// // // //               <h1 className="text-3xl font-bold mb-2">Admin Dashboard</h1>
// // // //               <p className="text-muted-foreground">
// // // //                 Manage your courses, users, and track platform performance.
// // // //               </p>
// // // //             </div>
// // // //             <div className="flex items-center gap-3">
// // // //               <Link href="/admin/admins">
// // // //                 <Button variant="outline" className="flex items-center gap-2">
// // // //                   <Shield className="w-4 h-4" />
// // // //                   Manage Admins
// // // //                 </Button>
// // // //               </Link>
// // // //               <Link href="/admin/courses/create">
// // // //                 <Button className="flex items-center gap-2">
// // // //                   <Plus className="w-4 h-4" />
// // // //                   Add Course
// // // //                 </Button>
// // // //               </Link>
// // // //             </div>
// // // //           </motion.div>

// // // //           {/* Stats Cards */}
// // // //           <motion.div
// // // //             className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
// // // //             initial={{ opacity: 0, y: 20 }}
// // // //             animate={{ opacity: 1, y: 0 }}
// // // //             transition={{ duration: 0.6, delay: 0.1 }}
// // // //           >
// // // //             {adminStats.map((stat, index) => (
// // // //               <Card key={stat.title} className="hover:shadow-lg transition-shadow">
// // // //                 <CardContent className="p-6">
// // // //                   <div className="flex items-center justify-between mb-4">
// // // //                     <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${stat.bgColor}`}>
// // // //                       <stat.icon className={`w-6 h-6 ${stat.color}`} />
// // // //                     </div>
// // // //                     <div className={`flex items-center gap-1 text-xs ${stat.trend === 'up' ? 'text-green-600' : 'text-red-600'
// // // //                       }`}>
// // // //                       {stat.trend === 'up' ? (
// // // //                         <TrendingUp className="w-3 h-3" />
// // // //                       ) : (
// // // //                         <TrendingDown className="w-3 h-3" />
// // // //                       )}
// // // //                       {stat.change}
// // // //                     </div>
// // // //                   </div>
// // // //                   <div>
// // // //                     <p className="text-2xl font-bold mb-1">{stat.value}</p>
// // // //                     <p className="text-sm text-muted-foreground">{stat.title}</p>
// // // //                   </div>
// // // //                 </CardContent>
// // // //               </Card>
// // // //             ))}
// // // //           </motion.div>

// // // //           {/* Quick Actions */}
// // // //           <motion.div
// // // //             className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8"
// // // //             initial={{ opacity: 0, y: 20 }}
// // // //             animate={{ opacity: 1, y: 0 }}
// // // //             transition={{ duration: 0.6, delay: 0.2 }}
// // // //           >
// // // //             <Card className="hover:shadow-lg transition-shadow cursor-pointer">
// // // //               <Link href="/admin/admins">
// // // //                 <CardContent className="p-6">
// // // //                   <div className="flex items-center gap-4">
// // // //                     <div className="w-12 h-12 bg-purple-50 dark:bg-purple-950 rounded-lg flex items-center justify-center">
// // // //                       <UserPlus className="w-6 h-6 text-purple-600" />
// // // //                     </div>
// // // //                     <div>
// // // //                       <h3 className="font-semibold mb-1">Administrator Management</h3>
// // // //                       <p className="text-sm text-muted-foreground">
// // // //                         Add and manage admin accounts
// // // //                       </p>
// // // //                       <Badge variant="secondary" className="mt-2">
// // // //                         {stats.totalAdmins || 0} Admins
// // // //                       </Badge>
// // // //                     </div>
// // // //                   </div>
// // // //                 </CardContent>
// // // //               </Link>
// // // //             </Card>

// // // //             <Card className="hover:shadow-lg transition-shadow cursor-pointer">
// // // //               <Link href="/admin/courses/create">
// // // //                 <CardContent className="p-6">
// // // //                   <div className="flex items-center gap-4">
// // // //                     <div className="w-12 h-12 bg-green-50 dark:bg-green-950 rounded-lg flex items-center justify-center">
// // // //                       <Plus className="w-6 h-6 text-green-600" />
// // // //                     </div>
// // // //                     <div>
// // // //                       <h3 className="font-semibold mb-1">Create New Course</h3>
// // // //                       <p className="text-sm text-muted-foreground">
// // // //                         Add courses with content and pricing
// // // //                       </p>
// // // //                       <Badge variant="secondary" className="mt-2">
// // // //                         Quick Action
// // // //                       </Badge>
// // // //                     </div>
// // // //                   </div>
// // // //                 </CardContent>
// // // //               </Link>
// // // //             </Card>

// // // //             <Card className="hover:shadow-lg transition-shadow">
// // // //               <CardContent className="p-6">
// // // //                 <div className="flex items-center gap-4">
// // // //                   <div className="w-12 h-12 bg-blue-50 dark:bg-blue-950 rounded-lg flex items-center justify-center">
// // // //                     <BarChart3 className="w-6 h-6 text-blue-600" />
// // // //                   </div>
// // // //                   <div>
// // // //                     <h3 className="font-semibold mb-1">Analytics Overview</h3>
// // // //                     <p className="text-sm text-muted-foreground">
// // // //                       View detailed platform analytics
// // // //                     </p>
// // // //                     <Badge variant="secondary" className="mt-2">
// // // //                       Coming Soon
// // // //                     </Badge>
// // // //                   </div>
// // // //                 </div>
// // // //               </CardContent>
// // // //             </Card>
// // // //           </motion.div>

// // // //           {/* Main Content */}
// // // //           <motion.div
// // // //             initial={{ opacity: 0, y: 20 }}
// // // //             animate={{ opacity: 1, y: 0 }}
// // // //             transition={{ duration: 0.6, delay: 0.3 }}
// // // //           >
// // // //             <Tabs defaultValue="courses" className="w-full">
// // // //               <TabsList className="grid w-full grid-cols-5">
// // // //                 <TabsTrigger value="courses">Courses</TabsTrigger>
// // // //                 <TabsTrigger value="users">Users</TabsTrigger>
// // // //                 <TabsTrigger value="orders">Orders</TabsTrigger>
// // // //                 <TabsTrigger value="admins">Admins</TabsTrigger>
// // // //                 <TabsTrigger value="analytics">Analytics</TabsTrigger>
// // // //               </TabsList>

// // // //               {/* Courses Tab */}
// // // //               <TabsContent value="courses" className="mt-6">
// // // //                 <Card>
// // // //                   <CardHeader>
// // // //                     <div className="flex justify-between items-center">
// // // //                       <div>
// // // //                         <CardTitle>Course Management</CardTitle>
// // // //                         <CardDescription>
// // // //                           Manage your courses, content, and pricing
// // // //                         </CardDescription>
// // // //                       </div>
// // // //                       <div className="flex gap-2">
// // // //                         <div className="relative">
// // // //                           <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
// // // //                           <Input
// // // //                             placeholder="Search courses..."
// // // //                             className="pl-10 w-64"
// // // //                             value={searchTerm}
// // // //                             onChange={(e) => setSearchTerm(e.target.value)}
// // // //                           />
// // // //                         </div>
// // // //                         <Button variant="outline" size="icon">
// // // //                           <Filter className="h-4 w-4" />
// // // //                         </Button>
// // // //                       </div>
// // // //                     </div>
// // // //                   </CardHeader>
// // // //                   <CardContent>
// // // //                     <div className="space-y-4">
// // // //                       {filteredCourses.map((course) => (
// // // //                         <div
// // // //                           key={course.id}
// // // //                           className="flex items-center gap-4 p-4 border rounded-lg hover:bg-muted/50 transition-colors"
// // // //                         >
// // // //                           <img
// // // //                             src={course.thumbnail || 'https://images.pexels.com/photos/5212345/pexels-photo-5212345.jpeg'}
// // // //                             alt={course.title}
// // // //                             className="w-16 h-16 rounded-lg object-cover"
// // // //                           />
// // // //                           <div className="flex-1">
// // // //                             <h3 className="font-semibold mb-1">{course.title}</h3>
// // // //                             <p className="text-sm text-muted-foreground mb-2">
// // // //                               {course.description?.substring(0, 100)}...
// // // //                             </p>
// // // //                             <div className="flex items-center gap-4">
// // // //                               <Badge variant="secondary">{course.category}</Badge>
// // // //                               <Badge variant={course.isActive ? 'default' : 'destructive'}>
// // // //                                 {course.isActive ? 'Active' : 'Inactive'}
// // // //                               </Badge>
// // // //                               <span className="text-sm text-muted-foreground">
// // // //                                 ₹{course.price}
// // // //                               </span>
// // // //                               <span className="text-sm text-muted-foreground">
// // // //                                 {course.enrolledCount || 0} enrolled
// // // //                               </span>
// // // //                             </div>
// // // //                           </div>
// // // //                           <DropdownMenu>
// // // //                             <DropdownMenuTrigger asChild>
// // // //                               <Button variant="ghost" size="icon">
// // // //                                 <MoreVertical className="h-4 w-4" />
// // // //                               </Button>
// // // //                             </DropdownMenuTrigger>
// // // //                             <DropdownMenuContent align="end">
// // // //                               <DropdownMenuItem asChild>
// // // //                                 <Link href={`/admin/courses/${course.id}`}>
// // // //                                   <Eye className="mr-2 h-4 w-4" />
// // // //                                   View
// // // //                                 </Link>
// // // //                               </DropdownMenuItem>
// // // //                               <DropdownMenuItem asChild>
// // // //                                 <Link href={`/admin/courses/${course.id}/edit`}>
// // // //                                   <Edit className="mr-2 h-4 w-4" />
// // // //                                   Edit
// // // //                                 </Link>
// // // //                               </DropdownMenuItem>
// // // //                               <DropdownMenuItem
// // // //                                 onClick={() => toggleCourseStatus(course.id, course.isActive)}
// // // //                               >
// // // //                                 <Settings className="mr-2 h-4 w-4" />
// // // //                                 {course.isActive ? 'Deactivate' : 'Activate'}
// // // //                               </DropdownMenuItem>
// // // //                               <DropdownMenuItem
// // // //                                 onClick={() => deleteCourse(course.id)}
// // // //                                 className="text-red-600"
// // // //                               >
// // // //                                 <Trash2 className="mr-2 h-4 w-4" />
// // // //                                 Delete
// // // //                               </DropdownMenuItem>
// // // //                             </DropdownMenuContent>
// // // //                           </DropdownMenu>
// // // //                         </div>
// // // //                       ))}

// // // //                       {filteredCourses.length === 0 && (
// // // //                         <div className="text-center py-8 text-muted-foreground">
// // // //                           <BookOpen className="w-12 h-12 mx-auto mb-4 opacity-50" />
// // // //                           <p>No courses found.</p>
// // // //                           {searchTerm && (
// // // //                             <p className="text-sm">Try adjusting your search criteria.</p>
// // // //                           )}
// // // //                         </div>
// // // //                       )}
// // // //                     </div>
// // // //                   </CardContent>
// // // //                 </Card>
// // // //               </TabsContent>

// // // //               {/* Users Tab */}
// // // //               <TabsContent value="users" className="mt-6">
// // // //                 <Card>
// // // //                   <CardHeader>
// // // //                     <div className="flex justify-between items-center">
// // // //                       <div>
// // // //                         <CardTitle>User Management</CardTitle>
// // // //                         <CardDescription>
// // // //                           View and manage registered users
// // // //                         </CardDescription>
// // // //                       </div>
// // // //                       <div className="relative">
// // // //                         <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
// // // //                         <Input
// // // //                           placeholder="Search users..."
// // // //                           className="pl-10 w-64"
// // // //                           value={searchTerm}
// // // //                           onChange={(e) => setSearchTerm(e.target.value)}
// // // //                         />
// // // //                       </div>
// // // //                     </div>
// // // //                   </CardHeader>
// // // //                   <CardContent>
// // // //                     <div className="space-y-4">
// // // //                       {filteredUsers.map((user) => (
// // // //                         <div
// // // //                           key={user.id}
// // // //                           className="flex items-center gap-4 p-4 border rounded-lg hover:bg-muted/50 transition-colors"
// // // //                         >
// // // //                           <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
// // // //                             <Users className="w-6 h-6 text-primary" />
// // // //                           </div>
// // // //                           <div className="flex-1">
// // // //                             <h3 className="font-semibold">{user.fullName}</h3>
// // // //                             <p className="text-sm text-muted-foreground">{user.email}</p>
// // // //                             <p className="text-sm text-muted-foreground">
// // // //                               {user.location && `${user.location} • `}
// // // //                               Joined {new Date(user.createdAt).toLocaleDateString()}
// // // //                             </p>
// // // //                           </div>
// // // //                           <div className="text-right">
// // // //                             <Badge
// // // //                               variant={user.isVerified ? 'default' : 'secondary'}
// // // //                             >
// // // //                               {user.isVerified ? 'Verified' : 'Pending'}
// // // //                             </Badge>
// // // //                             <p className="text-sm text-muted-foreground mt-1">
// // // //                               {user.enrolledCourses?.length || 0} courses
// // // //                             </p>
// // // //                             {user.credits > 0 && (
// // // //                               <p className="text-sm text-green-600 mt-1">
// // // //                                 ₹{user.credits} credits
// // // //                               </p>
// // // //                             )}
// // // //                           </div>
// // // //                         </div>
// // // //                       ))}

// // // //                       {filteredUsers.length === 0 && (
// // // //                         <div className="text-center py-8 text-muted-foreground">
// // // //                           <Users className="w-12 h-12 mx-auto mb-4 opacity-50" />
// // // //                           <p>No users found.</p>
// // // //                           {searchTerm && (
// // // //                             <p className="text-sm">Try adjusting your search criteria.</p>
// // // //                           )}
// // // //                         </div>
// // // //                       )}
// // // //                     </div>
// // // //                   </CardContent>
// // // //                 </Card>
// // // //               </TabsContent>

// // // //               {/* Orders Tab */}
// // // //               <TabsContent value="orders" className="mt-6">
// // // //                 <Card>
// // // //                   <CardHeader>
// // // //                     <CardTitle>Recent Orders</CardTitle>
// // // //                     <CardDescription>
// // // //                       Track course purchases and payments
// // // //                     </CardDescription>
// // // //                   </CardHeader>
// // // //                   <CardContent>
// // // //                     <div className="space-y-4">
// // // //                       {recentOrders.map((order) => (
// // // //                         <div
// // // //                           key={order.id}
// // // //                           className="flex items-center gap-4 p-4 border rounded-lg hover:bg-muted/50 transition-colors"
// // // //                         >
// // // //                           <div className="w-12 h-12 bg-green-50 dark:bg-green-950 rounded-full flex items-center justify-center">
// // // //                             <DollarSign className="w-6 h-6 text-green-600" />
// // // //                           </div>
// // // //                           <div className="flex-1">
// // // //                             <h3 className="font-semibold">{order.courseName}</h3>
// // // //                             <p className="text-sm text-muted-foreground">
// // // //                               by {order.userName}
// // // //                             </p>
// // // //                             <p className="text-sm text-muted-foreground">
// // // //                               {new Date(order.createdAt).toLocaleDateString()}
// // // //                             </p>
// // // //                           </div>
// // // //                           <div className="text-right">
// // // //                             <p className="font-semibold">₹{order.amount}</p>
// // // //                             <Badge
// // // //                               variant={
// // // //                                 order.status === 'completed'
// // // //                                   ? 'default'
// // // //                                   : order.status === 'pending'
// // // //                                     ? 'secondary'
// // // //                                     : 'destructive'
// // // //                               }
// // // //                             >
// // // //                               {order.status}
// // // //                             </Badge>
// // // //                           </div>
// // // //                         </div>
// // // //                       ))}

// // // //                       {recentOrders.length === 0 && (
// // // //                         <div className="text-center py-8 text-muted-foreground">
// // // //                           <DollarSign className="w-12 h-12 mx-auto mb-4 opacity-50" />
// // // //                           <p>No recent orders found.</p>
// // // //                         </div>
// // // //                       )}
// // // //                     </div>
// // // //                   </CardContent>
// // // //                 </Card>
// // // //               </TabsContent>

// // // //               {/* Admins Tab */}
// // // //               <TabsContent value="admins" className="mt-6">
// // // //                 <Card>
// // // //                   <CardHeader>
// // // //                     <div className="flex justify-between items-center">
// // // //                       <div>
// // // //                         <CardTitle>Administrator Overview</CardTitle>
// // // //                         <CardDescription>
// // // //                           Quick view of admin accounts and recent activity
// // // //                         </CardDescription>
// // // //                       </div>
// // // //                       <Link href="/admin/admins">
// // // //                         <Button className="flex items-center gap-2">
// // // //                           <Shield className="w-4 h-4" />
// // // //                           Manage All Admins
// // // //                         </Button>
// // // //                       </Link>
// // // //                     </div>
// // // //                   </CardHeader>
// // // //                   <CardContent>
// // // //                     <div className="grid md:grid-cols-2 gap-6 mb-6">
// // // //                       <div className="p-4 bg-purple-50 dark:bg-purple-950/50 rounded-lg">
// // // //                         <div className="flex items-center gap-3">
// // // //                           <Shield className="w-8 h-8 text-purple-600" />
// // // //                           <div>
// // // //                             <p className="text-2xl font-bold">{stats.totalAdmins || 0}</p>
// // // //                             <p className="text-sm text-muted-foreground">Total Administrators</p>
// // // //                           </div>
// // // //                         </div>
// // // //                       </div>
// // // //                       <div className="p-4 bg-green-50 dark:bg-green-950/50 rounded-lg">
// // // //                         <div className="flex items-center gap-3">
// // // //                           <UserPlus className="w-8 h-8 text-green-600" />
// // // //                           <div>
// // // //                             <p className="text-2xl font-bold">{stats.activeAdmins || 0}</p>
// // // //                             <p className="text-sm text-muted-foreground">Active Administrators</p>
// // // //                           </div>
// // // //                         </div>
// // // //                       </div>
// // // //                     </div>

// // // //                     <div className="space-y-4">
// // // //                       <h4 className="font-semibold">Recent Admin Activity</h4>
// // // //                       {recentAdmins.slice(0, 3).map((admin) => (
// // // //                         <div
// // // //                           key={admin.id}
// // // //                           className="flex items-center gap-4 p-3 border rounded-lg"
// // // //                         >
// // // //                           <div className="w-10 h-10 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center">
// // // //                             <Shield className="w-5 h-5 text-purple-600" />
// // // //                           </div>
// // // //                           <div className="flex-1">
// // // //                             <h5 className="font-medium">{admin.fullName}</h5>
// // // //                             <p className="text-sm text-muted-foreground">{admin.email}</p>
// // // //                           </div>
// // // //                           <Badge variant={admin.isActive ? 'default' : 'secondary'}>
// // // //                             {admin.isActive ? 'Active' : 'Inactive'}
// // // //                           </Badge>
// // // //                         </div>
// // // //                       ))}

// // // //                       {recentAdmins.length === 0 && (
// // // //                         <div className="text-center py-6 text-muted-foreground">
// // // //                           <Shield className="w-8 h-8 mx-auto mb-2 opacity-50" />
// // // //                           <p className="text-sm">No admin data available</p>
// // // //                         </div>
// // // //                       )}
// // // //                     </div>
// // // //                   </CardContent>
// // // //                 </Card>
// // // //               </TabsContent>

// // // //               {/* Analytics Tab */}
// // // //               <TabsContent value="analytics" className="mt-6">
// // // //                 <div className="grid md:grid-cols-2 gap-6">
// // // //                   <Card>
// // // //                     <CardHeader>
// // // //                       <CardTitle>Revenue Overview</CardTitle>
// // // //                       <CardDescription>
// // // //                         Monthly revenue and growth trends
// // // //                       </CardDescription>
// // // //                     </CardHeader>
// // // //                     <CardContent>
// // // //                       <div className="h-64 flex flex-col items-center justify-center text-muted-foreground">
// // // //                         <BarChart3 className="w-12 h-12 mb-4" />
// // // //                         <p>Revenue chart integration coming soon</p>
// // // //                         <p className="text-sm">Connect with analytics service</p>
// // // //                       </div>
// // // //                     </CardContent>
// // // //                   </Card>

// // // //                   <Card>
// // // //                     <CardHeader>
// // // //                       <CardTitle>Course Performance</CardTitle>
// // // //                       <CardDescription>
// // // //                         Top performing courses by enrollment
// // // //                       </CardDescription>
// // // //                     </CardHeader>
// // // //                     <CardContent>
// // // //                       <div className="space-y-4">
// // // //                         {courses.slice(0, 5).map((course, index) => (
// // // //                           <div key={course.id} className="flex items-center gap-3">
// // // //                             <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-sm font-medium">
// // // //                               {index + 1}
// // // //                             </div>
// // // //                             <div className="flex-1">
// // // //                               <p className="font-medium text-sm">{course.title}</p>
// // // //                               <p className="text-xs text-muted-foreground">
// // // //                                 {course.enrolledCount || 0} students
// // // //                               </p>
// // // //                             </div>
// // // //                             <Badge variant="outline">
// // // //                               ₹{course.price}
// // // //                             </Badge>
// // // //                           </div>
// // // //                         ))}

// // // //                         {courses.length === 0 && (
// // // //                           <div className="text-center py-6 text-muted-foreground">
// // // //                             <BookOpen className="w-8 h-8 mx-auto mb-2 opacity-50" />
// // // //                             <p className="text-sm">No course data available</p>
// // // //                           </div>
// // // //                         )}
// // // //                       </div>
// // // //                     </CardContent>
// // // //                   </Card>
// // // //                 </div>
// // // //               </TabsContent>
// // // //             </Tabs>
// // // //           </motion.div>
// // // //         </div>
// // // //       </main>
// // // //     </div>
// // // //   );
// // // // }

// // // 'use client';

// // // import { useState, useEffect } from 'react';
// // // import { motion } from 'framer-motion';
// // // import {
// // //   BarChart3,
// // //   Users,
// // //   BookOpen,
// // //   DollarSign,
// // //   Plus,
// // //   Search,
// // //   Filter,
// // //   MoreVertical,
// // //   Edit,
// // //   Trash2,
// // //   Eye,
// // //   TrendingUp,
// // //   TrendingDown,
// // //   Award,
// // //   Shield,
// // //   UserPlus,
// // //   Settings,
// // // } from 'lucide-react';
// // // import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
// // // import { Button } from '@/components/ui/button';
// // // import { Input } from '@/components/ui/input';
// // // import { Badge } from '@/components/ui/badge';
// // // import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
// // // import {
// // //   DropdownMenu,
// // //   DropdownMenuContent,
// // //   DropdownMenuItem,
// // //   DropdownMenuTrigger,
// // // } from '@/components/ui/dropdown-menu';
// // // import { toast } from 'sonner';
// // // import Link from 'next/link';
// // // import AdminNavbar from '@/components/admin-navbar';
// // // import CustomConfirmDialog, { useConfirmDialog } from '@/components/custom-confirm-dialog';

// // // export default function AdminDashboard() {
// // //   const confirm = useConfirmDialog();
// // //   const [stats, setStats] = useState({
// // //     totalUsers: 0,
// // //     totalCourses: 0,
// // //     totalRevenue: 0,
// // //     activeStudents: 0,
// // //     completionRate: 0,
// // //     newEnrollments: 0,
// // //     totalAdmins: 0,
// // //     activeAdmins: 0
// // //   });
// // //   const [courses, setCourses] = useState([]);
// // //   const [users, setUsers] = useState([]);
// // //   const [recentOrders, setRecentOrders] = useState([]);
// // //   const [recentAdmins, setRecentAdmins] = useState([]);
// // //   const [loading, setLoading] = useState(true);
// // //   const [searchTerm, setSearchTerm] = useState('');

// // //   useEffect(() => {
// // //     fetchAdminData();
// // //   }, []);

// // //   const fetchAdminData = async () => {
// // //     try {
// // //       // Fetch courses from the courses API
// // //       const coursesResponse = await fetch('/api/courses');
// // //       if (coursesResponse.ok) {
// // //         const coursesData = await coursesResponse.json();
// // //         setCourses(coursesData.courses || []);
// // //       }

// // //       // Fetch dashboard data
// // //       const response = await fetch('/api/admin/dashboard', {
// // //         headers: {
// // //           'Authorization': `Bearer ${document.cookie.split('auth-token=')[1]?.split(';')[0]}`,
// // //         },
// // //       });

// // //       if (response.ok) {
// // //         const data = await response.json();
// // //         setStats(data.stats);
// // //         setUsers(data.users);
// // //         setRecentOrders(data.recentOrders);
// // //         setRecentAdmins(data.recentAdmins || []);
// // //       } else {
// // //         toast.error('Failed to load dashboard data');
// // //       }
// // //     } catch (error) {
// // //       console.error('Error fetching admin data:', error);
// // //       toast.error('Error loading dashboard data');
// // //     } finally {
// // //       setLoading(false);
// // //     }
// // //   };

// // //   const deleteCourse = async (courseId, courseTitle) => {
// // //     const confirmed = await confirm(
// // //       `Are you sure you want to delete "${courseTitle}"? This action cannot be undone and will remove all associated data.`,
// // //       'Delete Course'
// // //     );
    
// // //     if (!confirmed) return;

// // //     try {
// // //       const response = await fetch(`/api/admin/courses/${courseId}`, {
// // //         method: 'DELETE',
// // //         headers: {
// // //           'Authorization': `Bearer ${document.cookie.split('auth-token=')[1]?.split(';')[0]}`,
// // //         },
// // //       });

// // //       if (response.ok) {
// // //         toast.success('Course deleted successfully');
// // //         fetchAdminData();
// // //       } else {
// // //         toast.error('Error deleting course');
// // //       }
// // //     } catch (error) {
// // //       console.error('Error deleting course:', error);
// // //       toast.error('Error deleting course');
// // //     }
// // //   };

// // //   const toggleCourseStatus = async (courseId, currentStatus, courseTitle) => {
// // //     const action = currentStatus ? 'deactivate' : 'activate';
// // //     const confirmed = await confirm(
// // //       `Are you sure you want to ${action} "${courseTitle}"? ${currentStatus ? 'Students will no longer be able to enroll in this course.' : 'This course will become available for enrollment.'}`,
// // //       `${action.charAt(0).toUpperCase() + action.slice(1)} Course`
// // //     );
    
// // //     if (!confirmed) return;

// // //     try {
// // //       const response = await fetch(`/api/admin/courses/${courseId}/toggle-status`, {
// // //         method: 'PUT',
// // //         headers: {
// // //           'Authorization': `Bearer ${document.cookie.split('auth-token=')[1]?.split(';')[0]}`,
// // //         },
// // //       });

// // //       if (response.ok) {
// // //         toast.success(`Course ${currentStatus ? 'deactivated' : 'activated'} successfully`);
// // //         fetchAdminData();
// // //       } else {
// // //         toast.error('Error updating course status');
// // //       }
// // //     } catch (error) {
// // //       console.error('Error toggling course status:', error);
// // //       toast.error('Error updating course status');
// // //     }
// // //   };

// // //   const filteredCourses = courses.filter(course =>
// // //     course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
// // //     course.category.toLowerCase().includes(searchTerm.toLowerCase())
// // //   );

// // //   const filteredUsers = users.filter(user =>
// // //     user.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
// // //     user.email.toLowerCase().includes(searchTerm.toLowerCase())
// // //   );

// // //   const adminStats = [
// // //     {
// // //       title: 'Total Users',
// // //       value: stats.totalUsers,
// // //       icon: Users,
// // //       color: 'text-blue-600',
// // //       bgColor: 'bg-blue-50 dark:bg-blue-950',
// // //       change: '+12.5%',
// // //       trend: 'up'
// // //     },
// // //     {
// // //       title: 'Total Courses',
// // //       value: stats.totalCourses,
// // //       icon: BookOpen,
// // //       color: 'text-green-600',
// // //       bgColor: 'bg-green-50 dark:bg-green-950',
// // //       change: '+8.2%',
// // //       trend: 'up'
// // //     },
// // //     {
// // //       title: 'Total Revenue',
// // //       value: `₹${stats.totalRevenue.toLocaleString()}`,
// // //       icon: DollarSign,
// // //       color: 'text-purple-600',
// // //       bgColor: 'bg-purple-50 dark:bg-purple-950',
// // //       change: '+23.1%',
// // //       trend: 'up'
// // //     },
// // //     {
// // //       title: 'Active Students',
// // //       value: stats.activeStudents,
// // //       icon: Award,
// // //       color: 'text-orange-600',
// // //       bgColor: 'bg-orange-50 dark:bg-orange-950',
// // //       change: '+5.4%',
// // //       trend: 'up'
// // //     }
// // //   ];

// // //   if (loading) {
// // //     return (
// // //       <div className="min-h-screen flex items-center justify-center">
// // //         <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
// // //       </div>
// // //     );
// // //   }

// // //   return (
// // //     <div className="min-h-screen bg-background">
// // //       <AdminNavbar />
// // //       <CustomConfirmDialog />

// // //       <main className="pt-20 pb-12">
// // //         <div className="container mx-auto px-4">
// // //           {/* Header */}
// // //           <motion.div
// // //             className="flex justify-between items-center mb-8"
// // //             initial={{ opacity: 0, y: 20 }}
// // //             animate={{ opacity: 1, y: 0 }}
// // //             transition={{ duration: 0.6 }}
// // //           >
// // //             <div>
// // //               <h1 className="text-3xl font-bold mb-2">Admin Dashboard</h1>
// // //               <p className="text-muted-foreground">
// // //                 Manage your courses, users, and track platform performance.
// // //               </p>
// // //             </div>
// // //             <div className="flex items-center gap-3">
// // //               <Link href="/admin/admins">
// // //                 <Button variant="outline" className="flex items-center gap-2">
// // //                   <Shield className="w-4 h-4" />
// // //                   Manage Admins
// // //                 </Button>
// // //               </Link>
// // //               <Link href="/admin/courses/create">
// // //                 <Button className="flex items-center gap-2">
// // //                   <Plus className="w-4 h-4" />
// // //                   Add Course
// // //                 </Button>
// // //               </Link>
// // //             </div>
// // //           </motion.div>

// // //           {/* Stats Cards */}
// // //           <motion.div
// // //             className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
// // //             initial={{ opacity: 0, y: 20 }}
// // //             animate={{ opacity: 1, y: 0 }}
// // //             transition={{ duration: 0.6, delay: 0.1 }}
// // //           >
// // //             {adminStats.map((stat, index) => (
// // //               <Card key={stat.title} className="hover:shadow-lg transition-shadow">
// // //                 <CardContent className="p-6">
// // //                   <div className="flex items-center justify-between mb-4">
// // //                     <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${stat.bgColor}`}>
// // //                       <stat.icon className={`w-6 h-6 ${stat.color}`} />
// // //                     </div>
// // //                     <div className={`flex items-center gap-1 text-xs ${stat.trend === 'up' ? 'text-green-600' : 'text-red-600'
// // //                       }`}>
// // //                       {stat.trend === 'up' ? (
// // //                         <TrendingUp className="w-3 h-3" />
// // //                       ) : (
// // //                         <TrendingDown className="w-3 h-3" />
// // //                       )}
// // //                       {stat.change}
// // //                     </div>
// // //                   </div>
// // //                   <div>
// // //                     <p className="text-2xl font-bold mb-1">{stat.value}</p>
// // //                     <p className="text-sm text-muted-foreground">{stat.title}</p>
// // //                   </div>
// // //                 </CardContent>
// // //               </Card>
// // //             ))}
// // //           </motion.div>

// // //           {/* Quick Actions */}
// // //           <motion.div
// // //             className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8"
// // //             initial={{ opacity: 0, y: 20 }}
// // //             animate={{ opacity: 1, y: 0 }}
// // //             transition={{ duration: 0.6, delay: 0.2 }}
// // //           >
// // //             <Card className="hover:shadow-lg transition-shadow cursor-pointer">
// // //               <Link href="/admin/admins">
// // //                 <CardContent className="p-6">
// // //                   <div className="flex items-center gap-4">
// // //                     <div className="w-12 h-12 bg-purple-50 dark:bg-purple-950 rounded-lg flex items-center justify-center">
// // //                       <UserPlus className="w-6 h-6 text-purple-600" />
// // //                     </div>
// // //                     <div>
// // //                       <h3 className="font-semibold mb-1">Administrator Management</h3>
// // //                       <p className="text-sm text-muted-foreground">
// // //                         Add and manage admin accounts
// // //                       </p>
// // //                       <Badge variant="secondary" className="mt-2">
// // //                         {stats.totalAdmins || 0} Admins
// // //                       </Badge>
// // //                     </div>
// // //                   </div>
// // //                 </CardContent>
// // //               </Link>
// // //             </Card>

// // //             <Card className="hover:shadow-lg transition-shadow cursor-pointer">
// // //               <Link href="/admin/courses/create">
// // //                 <CardContent className="p-6">
// // //                   <div className="flex items-center gap-4">
// // //                     <div className="w-12 h-12 bg-green-50 dark:bg-green-950 rounded-lg flex items-center justify-center">
// // //                       <Plus className="w-6 h-6 text-green-600" />
// // //                     </div>
// // //                     <div>
// // //                       <h3 className="font-semibold mb-1">Create New Course</h3>
// // //                       <p className="text-sm text-muted-foreground">
// // //                         Add courses with content and pricing
// // //                       </p>
// // //                       <Badge variant="secondary" className="mt-2">
// // //                         Quick Action
// // //                       </Badge>
// // //                     </div>
// // //                   </div>
// // //                 </CardContent>
// // //               </Link>
// // //             </Card>

// // //             <Card className="hover:shadow-lg transition-shadow">
// // //               <CardContent className="p-6">
// // //                 <div className="flex items-center gap-4">
// // //                   <div className="w-12 h-12 bg-blue-50 dark:bg-blue-950 rounded-lg flex items-center justify-center">
// // //                     <BarChart3 className="w-6 h-6 text-blue-600" />
// // //                   </div>
// // //                   <div>
// // //                     <h3 className="font-semibold mb-1">Analytics Overview</h3>
// // //                     <p className="text-sm text-muted-foreground">
// // //                       View detailed platform analytics
// // //                     </p>
// // //                     <Badge variant="secondary" className="mt-2">
// // //                       Coming Soon
// // //                     </Badge>
// // //                   </div>
// // //                 </div>
// // //               </CardContent>
// // //             </Card>
// // //           </motion.div>

// // //           {/* Main Content */}
// // //           <motion.div
// // //             initial={{ opacity: 0, y: 20 }}
// // //             animate={{ opacity: 1, y: 0 }}
// // //             transition={{ duration: 0.6, delay: 0.3 }}
// // //           >
// // //             <Tabs defaultValue="courses" className="w-full">
// // //               <TabsList className="grid w-full grid-cols-5">
// // //                 <TabsTrigger value="courses">Courses</TabsTrigger>
// // //                 <TabsTrigger value="users">Users</TabsTrigger>
// // //                 <TabsTrigger value="orders">Orders</TabsTrigger>
// // //                 <TabsTrigger value="admins">Admins</TabsTrigger>
// // //                 <TabsTrigger value="analytics">Analytics</TabsTrigger>
// // //               </TabsList>

// // //               {/* Courses Tab */}
// // //               <TabsContent value="courses" className="mt-6">
// // //                 <Card>
// // //                   <CardHeader>
// // //                     <div className="flex justify-between items-center">
// // //                       <div>
// // //                         <CardTitle>Course Management</CardTitle>
// // //                         <CardDescription>
// // //                           Manage your courses, content, and pricing
// // //                         </CardDescription>
// // //                       </div>
// // //                       <div className="flex gap-2">
// // //                         <div className="relative">
// // //                           <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
// // //                           <Input
// // //                             placeholder="Search courses..."
// // //                             className="pl-10 w-64"
// // //                             value={searchTerm}
// // //                             onChange={(e) => setSearchTerm(e.target.value)}
// // //                           />
// // //                         </div>
// // //                         <Button variant="outline" size="icon">
// // //                           <Filter className="h-4 w-4" />
// // //                         </Button>
// // //                       </div>
// // //                     </div>
// // //                   </CardHeader>
// // //                   <CardContent>
// // //                     <div className="space-y-4">
// // //                       {filteredCourses.map((course) => (
// // //                         <div
// // //                           key={course.id}
// // //                           className="flex items-center gap-4 p-4 border rounded-lg hover:bg-muted/50 transition-colors"
// // //                         >
// // //                           <img
// // //                             src={course.thumbnail || 'https://images.pexels.com/photos/5212345/pexels-photo-5212345.jpeg'}
// // //                             alt={course.title}
// // //                             className="w-16 h-16 rounded-lg object-cover"
// // //                           />
// // //                           <div className="flex-1">
// // //                             <h3 className="font-semibold mb-1">{course.title}</h3>
// // //                             <p className="text-sm text-muted-foreground mb-2">
// // //                               {course.description?.substring(0, 100)}...
// // //                             </p>
// // //                             <div className="flex items-center gap-4">
// // //                               <Badge variant="secondary">{course.category}</Badge>
// // //                               <Badge variant={course.isActive ? 'default' : 'destructive'}>
// // //                                 {course.isActive ? 'Active' : 'Inactive'}
// // //                               </Badge>
// // //                               <span className="text-sm text-muted-foreground">
// // //                                 ₹{course.price}
// // //                               </span>
// // //                               <span className="text-sm text-muted-foreground">
// // //                                 {course.enrolledCount || 0} enrolled
// // //                               </span>
// // //                             </div>
// // //                           </div>
// // //                           <DropdownMenu>
// // //                             <DropdownMenuTrigger asChild>
// // //                               <Button variant="ghost" size="icon">
// // //                                 <MoreVertical className="h-4 w-4" />
// // //                               </Button>
// // //                             </DropdownMenuTrigger>
// // //                             <DropdownMenuContent align="end">
// // //                               <DropdownMenuItem asChild>
// // //                                 <Link href={`/admin/courses/${course.id}`}>
// // //                                   <Eye className="mr-2 h-4 w-4" />
// // //                                   View
// // //                                 </Link>
// // //                               </DropdownMenuItem>
// // //                               <DropdownMenuItem asChild>
// // //                                 <Link href={`/admin/courses/${course.id}/edit`}>
// // //                                   <Edit className="mr-2 h-4 w-4" />
// // //                                   Edit
// // //                                 </Link>
// // //                               </DropdownMenuItem>
// // //                               <DropdownMenuItem
// // //                                 onClick={() => toggleCourseStatus(course.id, course.isActive, course.title)}
// // //                               >
// // //                                 <Settings className="mr-2 h-4 w-4" />
// // //                                 {course.isActive ? 'Deactivate' : 'Activate'}
// // //                               </DropdownMenuItem>
// // //                               <DropdownMenuItem
// // //                                 onClick={() => deleteCourse(course.id, course.title)}
// // //                                 className="text-red-600"
// // //                               >
// // //                                 <Trash2 className="mr-2 h-4 w-4" />
// // //                                 Delete
// // //                               </DropdownMenuItem>
// // //                             </DropdownMenuContent>
// // //                           </DropdownMenu>
// // //                         </div>
// // //                       ))}

// // //                       {filteredCourses.length === 0 && (
// // //                         <div className="text-center py-8 text-muted-foreground">
// // //                           <BookOpen className="w-12 h-12 mx-auto mb-4 opacity-50" />
// // //                           <p>No courses found.</p>
// // //                           {searchTerm && (
// // //                             <p className="text-sm">Try adjusting your search criteria.</p>
// // //                           )}
// // //                         </div>
// // //                       )}
// // //                     </div>
// // //                   </CardContent>
// // //                 </Card>
// // //               </TabsContent>

// // //               {/* Users Tab */}
// // //               <TabsContent value="users" className="mt-6">
// // //                 <Card>
// // //                   <CardHeader>
// // //                     <div className="flex justify-between items-center">
// // //                       <div>
// // //                         <CardTitle>User Management</CardTitle>
// // //                         <CardDescription>
// // //                           View and manage registered users
// // //                         </CardDescription>
// // //                       </div>
// // //                       <div className="relative">
// // //                         <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
// // //                         <Input
// // //                           placeholder="Search users..."
// // //                           className="pl-10 w-64"
// // //                           value={searchTerm}
// // //                           onChange={(e) => setSearchTerm(e.target.value)}
// // //                         />
// // //                       </div>
// // //                     </div>
// // //                   </CardHeader>
// // //                   <CardContent>
// // //                     <div className="space-y-4">
// // //                       {filteredUsers.map((user) => (
// // //                         <div
// // //                           key={user.id}
// // //                           className="flex items-center gap-4 p-4 border rounded-lg hover:bg-muted/50 transition-colors"
// // //                         >
// // //                           <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
// // //                             <Users className="w-6 h-6 text-primary" />
// // //                           </div>
// // //                           <div className="flex-1">
// // //                             <h3 className="font-semibold">{user.fullName}</h3>
// // //                             <p className="text-sm text-muted-foreground">{user.email}</p>
// // //                             <p className="text-sm text-muted-foreground">
// // //                               {user.location && `${user.location} • `}
// // //                               Joined {new Date(user.createdAt).toLocaleDateString()}
// // //                             </p>
// // //                           </div>
// // //                           <div className="text-right">
// // //                             <Badge
// // //                               variant={user.isVerified ? 'default' : 'secondary'}
// // //                             >
// // //                               {user.isVerified ? 'Verified' : 'Pending'}
// // //                             </Badge>
// // //                             <p className="text-sm text-muted-foreground mt-1">
// // //                               {user.enrolledCourses?.length || 0} courses
// // //                             </p>
// // //                             {user.credits > 0 && (
// // //                               <p className="text-sm text-green-600 mt-1">
// // //                                 ₹{user.credits} credits
// // //                               </p>
// // //                             )}
// // //                           </div>
// // //                         </div>
// // //                       ))}

// // //                       {filteredUsers.length === 0 && (
// // //                         <div className="text-center py-8 text-muted-foreground">
// // //                           <Users className="w-12 h-12 mx-auto mb-4 opacity-50" />
// // //                           <p>No users found.</p>
// // //                           {searchTerm && (
// // //                             <p className="text-sm">Try adjusting your search criteria.</p>
// // //                           )}
// // //                         </div>
// // //                       )}
// // //                     </div>
// // //                   </CardContent>
// // //                 </Card>
// // //               </TabsContent>

// // //               {/* Orders Tab */}
// // //               <TabsContent value="orders" className="mt-6">
// // //                 <Card>
// // //                   <CardHeader>
// // //                     <CardTitle>Recent Orders</CardTitle>
// // //                     <CardDescription>
// // //                       Track course purchases and payments
// // //                     </CardDescription>
// // //                   </CardHeader>
// // //                   <CardContent>
// // //                     <div className="space-y-4">
// // //                       {recentOrders.map((order) => (
// // //                         <div
// // //                           key={order.id}
// // //                           className="flex items-center gap-4 p-4 border rounded-lg hover:bg-muted/50 transition-colors"
// // //                         >
// // //                           <div className="w-12 h-12 bg-green-50 dark:bg-green-950 rounded-full flex items-center justify-center">
// // //                             <DollarSign className="w-6 h-6 text-green-600" />
// // //                           </div>
// // //                           <div className="flex-1">
// // //                             <h3 className="font-semibold">{order.courseName}</h3>
// // //                             <p className="text-sm text-muted-foreground">
// // //                               by {order.userName}
// // //                             </p>
// // //                             <p className="text-sm text-muted-foreground">
// // //                               {new Date(order.createdAt).toLocaleDateString()}
// // //                             </p>
// // //                           </div>
// // //                           <div className="text-right">
// // //                             <p className="font-semibold">₹{order.amount}</p>
// // //                             <Badge
// // //                               variant={
// // //                                 order.status === 'completed'
// // //                                   ? 'default'
// // //                                   : order.status === 'pending'
// // //                                     ? 'secondary'
// // //                                     : 'destructive'
// // //                               }
// // //                             >
// // //                               {order.status}
// // //                             </Badge>
// // //                           </div>
// // //                         </div>
// // //                       ))}

// // //                       {recentOrders.length === 0 && (
// // //                         <div className="text-center py-8 text-muted-foreground">
// // //                           <DollarSign className="w-12 h-12 mx-auto mb-4 opacity-50" />
// // //                           <p>No recent orders found.</p>
// // //                         </div>
// // //                       )}
// // //                     </div>
// // //                   </CardContent>
// // //                 </Card>
// // //               </TabsContent>

// // //               {/* Admins Tab */}
// // //               <TabsContent value="admins" className="mt-6">
// // //                 <Card>
// // //                   <CardHeader>
// // //                     <div className="flex justify-between items-center">
// // //                       <div>
// // //                         <CardTitle>Administrator Overview</CardTitle>
// // //                         <CardDescription>
// // //                           Quick view of admin accounts and recent activity
// // //                         </CardDescription>
// // //                       </div>
// // //                       <Link href="/admin/admins">
// // //                         <Button className="flex items-center gap-2">
// // //                           <Shield className="w-4 h-4" />
// // //                           Manage All Admins
// // //                         </Button>
// // //                       </Link>
// // //                     </div>
// // //                   </CardHeader>
// // //                   <CardContent>
// // //                     <div className="grid md:grid-cols-2 gap-6 mb-6">
// // //                       <div className="p-4 bg-purple-50 dark:bg-purple-950/50 rounded-lg">
// // //                         <div className="flex items-center gap-3">
// // //                           <Shield className="w-8 h-8 text-purple-600" />
// // //                           <div>
// // //                             <p className="text-2xl font-bold">{stats.totalAdmins || 0}</p>
// // //                             <p className="text-sm text-muted-foreground">Total Administrators</p>
// // //                           </div>
// // //                         </div>
// // //                       </div>
// // //                       <div className="p-4 bg-green-50 dark:bg-green-950/50 rounded-lg">
// // //                         <div className="flex items-center gap-3">
// // //                           <UserPlus className="w-8 h-8 text-green-600" />
// // //                           <div>
// // //                             <p className="text-2xl font-bold">{stats.activeAdmins || 0}</p>
// // //                             <p className="text-sm text-muted-foreground">Active Administrators</p>
// // //                           </div>
// // //                         </div>
// // //                       </div>
// // //                     </div>

// // //                     <div className="space-y-4">
// // //                       <h4 className="font-semibold">Recent Admin Activity</h4>
// // //                       {recentAdmins.slice(0, 3).map((admin) => (
// // //                         <div
// // //                           key={admin.id}
// // //                           className="flex items-center gap-4 p-3 border rounded-lg"
// // //                         >
// // //                           <div className="w-10 h-10 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center">
// // //                             <Shield className="w-5 h-5 text-purple-600" />
// // //                           </div>
// // //                           <div className="flex-1">
// // //                             <h5 className="font-medium">{admin.fullName}</h5>
// // //                             <p className="text-sm text-muted-foreground">{admin.email}</p>
// // //                           </div>
// // //                           <Badge variant={admin.isActive ? 'default' : 'secondary'}>
// // //                             {admin.isActive ? 'Active' : 'Inactive'}
// // //                           </Badge>
// // //                         </div>
// // //                       ))}

// // //                       {recentAdmins.length === 0 && (
// // //                         <div className="text-center py-6 text-muted-foreground">
// // //                           <Shield className="w-8 h-8 mx-auto mb-2 opacity-50" />
// // //                           <p className="text-sm">No admin data available</p>
// // //                         </div>
// // //                       )}
// // //                     </div>
// // //                   </CardContent>
// // //                 </Card>
// // //               </TabsContent>

// // //               {/* Analytics Tab */}
// // //               <TabsContent value="analytics" className="mt-6">
// // //                 <div className="grid md:grid-cols-2 gap-6">
// // //                   <Card>
// // //                     <CardHeader>
// // //                       <CardTitle>Revenue Overview</CardTitle>
// // //                       <CardDescription>
// // //                         Monthly revenue and growth trends
// // //                       </CardDescription>
// // //                     </CardHeader>
// // //                     <CardContent>
// // //                       <div className="h-64 flex flex-col items-center justify-center text-muted-foreground">
// // //                         <BarChart3 className="w-12 h-12 mb-4" />
// // //                         <p>Revenue chart integration coming soon</p>
// // //                         <p className="text-sm">Connect with analytics service</p>
// // //                       </div>
// // //                     </CardContent>
// // //                   </Card>

// // //                   <Card>
// // //                     <CardHeader>
// // //                       <CardTitle>Course Performance</CardTitle>
// // //                       <CardDescription>
// // //                         Top performing courses by enrollment
// // //                       </CardDescription>
// // //                     </CardHeader>
// // //                     <CardContent>
// // //                       <div className="space-y-4">
// // //                         {courses.slice(0, 5).map((course, index) => (
// // //                           <div key={course.id} className="flex items-center gap-3">
// // //                             <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-sm font-medium">
// // //                               {index + 1}
// // //                             </div>
// // //                             <div className="flex-1">
// // //                               <p className="font-medium text-sm">{course.title}</p>
// // //                               <p className="text-xs text-muted-foreground">
// // //                                 {course.enrolledCount || 0} students
// // //                               </p>
// // //                             </div>
// // //                             <Badge variant="outline">
// // //                               ₹{course.price}
// // //                             </Badge>
// // //                           </div>
// // //                         ))}

// // //                         {courses.length === 0 && (
// // //                           <div className="text-center py-6 text-muted-foreground">
// // //                             <BookOpen className="w-8 h-8 mx-auto mb-2 opacity-50" />
// // //                             <p className="text-sm">No course data available</p>
// // //                           </div>
// // //                         )}
// // //                       </div>
// // //                     </CardContent>
// // //                   </Card>
// // //                 </div>
// // //               </TabsContent>
// // //             </Tabs>
// // //           </motion.div>
// // //         </div>
// // //       </main>
// // //     </div>
// // //   );
// // // }
// // 'use client';

// // import { useState, useEffect } from 'react';
// // import { motion } from 'framer-motion';
// // import {
// //   BarChart3,
// //   Users,
// //   BookOpen,
// //   DollarSign,
// //   Plus,
// //   Search,
// //   Filter,
// //   MoreVertical,
// //   Edit,
// //   Trash2,
// //   Eye,
// //   TrendingUp,
// //   TrendingDown,
// //   Award,
// //   Shield,
// //   UserPlus,
// //   Settings,
// // } from 'lucide-react';
// // import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
// // import { Button } from '@/components/ui/button';
// // import { Input } from '@/components/ui/input';
// // import { Badge } from '@/components/ui/badge';
// // import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
// // import {
// //   DropdownMenu,
// //   DropdownMenuContent,
// //   DropdownMenuItem,
// //   DropdownMenuTrigger,
// // } from '@/components/ui/dropdown-menu';
// // import { toast } from 'sonner';
// // import Link from 'next/link';
// // import AdminNavbar from '@/components/admin-navbar';
// // import CustomConfirmDialog, { useConfirmDialog } from '@/components/custom-confirm-dialog';

// // export default function AdminDashboard() {
// //   const confirm = useConfirmDialog();
// //   const [stats, setStats] = useState({
// //     totalUsers: 0,
// //     totalCourses: 0,
// //     totalRevenue: 0,
// //     activeStudents: 0,
// //     completionRate: 0,
// //     newEnrollments: 0,
// //     totalAdmins: 0,
// //     activeAdmins: 0
// //   });
// //   const [courses, setCourses] = useState([]);
// //   const [users, setUsers] = useState([]);
// //   const [recentOrders, setRecentOrders] = useState([]);
// //   const [recentAdmins, setRecentAdmins] = useState([]);
// //   const [loading, setLoading] = useState(true);
// //   const [searchTerm, setSearchTerm] = useState('');

// //   useEffect(() => {
// //     fetchAdminData();
// //   }, []);

// //   const fetchAdminData = async () => {
// //     try {
// //       // Fetch all courses (both active and inactive) from the admin courses API
// //       const coursesResponse = await fetch('/api/admin/courses');
// //       if (coursesResponse.ok) {
// //         const coursesData = await coursesResponse.json();
// //         setCourses(coursesData.courses || []);
// //       }

// //       // Fetch dashboard data
// //       const response = await fetch('/api/admin/dashboard', {
// //         headers: {
// //           'Authorization': `Bearer ${document.cookie.split('auth-token=')[1]?.split(';')[0]}`,
// //         },
// //       });

// //       if (response.ok) {
// //         const data = await response.json();
// //         setStats(data.stats);
// //         setUsers(data.users);
// //         setRecentOrders(data.recentOrders);
// //         setRecentAdmins(data.recentAdmins || []);
// //       } else {
// //         toast.error('Failed to load dashboard data');
// //       }
// //     } catch (error) {
// //       console.error('Error fetching admin data:', error);
// //       toast.error('Error loading dashboard data');
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   const deleteCourse = async (courseId, courseTitle) => {
// //     const confirmed = await confirm(
// //       `Are you sure you want to delete "${courseTitle}"? This action cannot be undone and will remove all associated data.`,
// //       'Delete Course'
// //     );
    
// //     if (!confirmed) return;

// //     try {
// //       const response = await fetch(`/api/admin/courses/${courseId}`, {
// //         method: 'DELETE',
// //         headers: {
// //           'Authorization': `Bearer ${document.cookie.split('auth-token=')[1]?.split(';')[0]}`,
// //         },
// //       });

// //       if (response.ok) {
// //         toast.success('Course deleted successfully');
// //         fetchAdminData();
// //       } else {
// //         toast.error('Error deleting course');
// //       }
// //     } catch (error) {
// //       console.error('Error deleting course:', error);
// //       toast.error('Error deleting course');
// //     }
// //   };

// //   const toggleCourseStatus = async (courseId, currentStatus, courseTitle) => {
// //     const action = currentStatus ? 'deactivate' : 'activate';
// //     const confirmed = await confirm(
// //       `Are you sure you want to ${action} "${courseTitle}"? ${currentStatus ? 'Students will no longer be able to enroll in this course.' : 'This course will become available for enrollment.'}`,
// //       `${action.charAt(0).toUpperCase() + action.slice(1)} Course`
// //     );
    
// //     if (!confirmed) return;

// //     try {
// //       const response = await fetch(`/api/admin/courses/${courseId}/toggle-status`, {
// //         method: 'PUT',
// //         headers: {
// //           'Authorization': `Bearer ${document.cookie.split('auth-token=')[1]?.split(';')[0]}`,
// //         },
// //       });

// //       if (response.ok) {
// //         toast.success(`Course ${currentStatus ? 'deactivated' : 'activated'} successfully`);
// //         fetchAdminData();
// //       } else {
// //         toast.error('Error updating course status');
// //       }
// //     } catch (error) {
// //       console.error('Error toggling course status:', error);
// //       toast.error('Error updating course status');
// //     }
// //   };

// //   const filteredCourses = courses.filter(course =>
// //     course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
// //     course.category.toLowerCase().includes(searchTerm.toLowerCase())
// //   );

// //   const filteredUsers = users.filter(user =>
// //     user.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
// //     user.email.toLowerCase().includes(searchTerm.toLowerCase())
// //   );

// //   const adminStats = [
// //     {
// //       title: 'Total Users',
// //       value: stats.totalUsers,
// //       icon: Users,
// //       color: 'text-blue-600',
// //       bgColor: 'bg-blue-50 dark:bg-blue-950',
// //       change: '+12.5%',
// //       trend: 'up'
// //     },
// //     {
// //       title: 'Total Courses',
// //       value: stats.totalCourses,
// //       icon: BookOpen,
// //       color: 'text-green-600',
// //       bgColor: 'bg-green-50 dark:bg-green-950',
// //       change: '+8.2%',
// //       trend: 'up'
// //     },
// //     {
// //       title: 'Total Revenue',
// //       value: `₹${stats.totalRevenue.toLocaleString()}`,
// //       icon: DollarSign,
// //       color: 'text-purple-600',
// //       bgColor: 'bg-purple-50 dark:bg-purple-950',
// //       change: '+23.1%',
// //       trend: 'up'
// //     },
// //     {
// //       title: 'Active Students',
// //       value: stats.activeStudents,
// //       icon: Award,
// //       color: 'text-orange-600',
// //       bgColor: 'bg-orange-50 dark:bg-orange-950',
// //       change: '+5.4%',
// //       trend: 'up'
// //     }
// //   ];

// //   if (loading) {
// //     return (
// //       <div className="min-h-screen flex items-center justify-center">
// //         <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
// //       </div>
// //     );
// //   }

// //   return (
// //     <div className="min-h-screen bg-background">
// //       <AdminNavbar />
// //       <CustomConfirmDialog />

// //       <main className="pt-20 pb-12">
// //         <div className="container mx-auto px-4">
// //           {/* Header */}
// //           <motion.div
// //             className="flex justify-between items-center mb-8"
// //             initial={{ opacity: 0, y: 20 }}
// //             animate={{ opacity: 1, y: 0 }}
// //             transition={{ duration: 0.6 }}
// //           >
// //             <div>
// //               <h1 className="text-3xl font-bold mb-2">Admin Dashboard</h1>
// //               <p className="text-muted-foreground">
// //                 Manage your courses, users, and track platform performance.
// //               </p>
// //             </div>
// //             <div className="flex items-center gap-3">
// //               <Link href="/admin/admins">
// //                 <Button variant="outline" className="flex items-center gap-2">
// //                   <Shield className="w-4 h-4" />
// //                   Manage Admins
// //                 </Button>
// //               </Link>
// //               <Link href="/admin/courses/create">
// //                 <Button className="flex items-center gap-2">
// //                   <Plus className="w-4 h-4" />
// //                   Add Course
// //                 </Button>
// //               </Link>
// //             </div>
// //           </motion.div>

// //           {/* Stats Cards */}
// //           <motion.div
// //             className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
// //             initial={{ opacity: 0, y: 20 }}
// //             animate={{ opacity: 1, y: 0 }}
// //             transition={{ duration: 0.6, delay: 0.1 }}
// //           >
// //             {adminStats.map((stat, index) => (
// //               <Card key={stat.title} className="hover:shadow-lg transition-shadow">
// //                 <CardContent className="p-6">
// //                   <div className="flex items-center justify-between mb-4">
// //                     <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${stat.bgColor}`}>
// //                       <stat.icon className={`w-6 h-6 ${stat.color}`} />
// //                     </div>
// //                     <div className={`flex items-center gap-1 text-xs ${stat.trend === 'up' ? 'text-green-600' : 'text-red-600'
// //                       }`}>
// //                       {stat.trend === 'up' ? (
// //                         <TrendingUp className="w-3 h-3" />
// //                       ) : (
// //                         <TrendingDown className="w-3 h-3" />
// //                       )}
// //                       {stat.change}
// //                     </div>
// //                   </div>
// //                   <div>
// //                     <p className="text-2xl font-bold mb-1">{stat.value}</p>
// //                     <p className="text-sm text-muted-foreground">{stat.title}</p>
// //                   </div>
// //                 </CardContent>
// //               </Card>
// //             ))}
// //           </motion.div>

// //           {/* Quick Actions */}
// //           <motion.div
// //             className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8"
// //             initial={{ opacity: 0, y: 20 }}
// //             animate={{ opacity: 1, y: 0 }}
// //             transition={{ duration: 0.6, delay: 0.2 }}
// //           >
// //             <Card className="hover:shadow-lg transition-shadow cursor-pointer">
// //               <Link href="/admin/admins">
// //                 <CardContent className="p-6">
// //                   <div className="flex items-center gap-4">
// //                     <div className="w-12 h-12 bg-purple-50 dark:bg-purple-950 rounded-lg flex items-center justify-center">
// //                       <UserPlus className="w-6 h-6 text-purple-600" />
// //                     </div>
// //                     <div>
// //                       <h3 className="font-semibold mb-1">Administrator Management</h3>
// //                       <p className="text-sm text-muted-foreground">
// //                         Add and manage admin accounts
// //                       </p>
// //                       <Badge variant="secondary" className="mt-2">
// //                         {stats.totalAdmins || 0} Admins
// //                       </Badge>
// //                     </div>
// //                   </div>
// //                 </CardContent>
// //               </Link>
// //             </Card>

// //             <Card className="hover:shadow-lg transition-shadow cursor-pointer">
// //               <Link href="/admin/courses/create">
// //                 <CardContent className="p-6">
// //                   <div className="flex items-center gap-4">
// //                     <div className="w-12 h-12 bg-green-50 dark:bg-green-950 rounded-lg flex items-center justify-center">
// //                       <Plus className="w-6 h-6 text-green-600" />
// //                     </div>
// //                     <div>
// //                       <h3 className="font-semibold mb-1">Create New Course</h3>
// //                       <p className="text-sm text-muted-foreground">
// //                         Add courses with content and pricing
// //                       </p>
// //                       <Badge variant="secondary" className="mt-2">
// //                         Quick Action
// //                       </Badge>
// //                     </div>
// //                   </div>
// //                 </CardContent>
// //               </Link>
// //             </Card>

// //             <Card className="hover:shadow-lg transition-shadow">
// //               <CardContent className="p-6">
// //                 <div className="flex items-center gap-4">
// //                   <div className="w-12 h-12 bg-blue-50 dark:bg-blue-950 rounded-lg flex items-center justify-center">
// //                     <BarChart3 className="w-6 h-6 text-blue-600" />
// //                   </div>
// //                   <div>
// //                     <h3 className="font-semibold mb-1">Analytics Overview</h3>
// //                     <p className="text-sm text-muted-foreground">
// //                       View detailed platform analytics
// //                     </p>
// //                     <Badge variant="secondary" className="mt-2">
// //                       Coming Soon
// //                     </Badge>
// //                   </div>
// //                 </div>
// //               </CardContent>
// //             </Card>
// //           </motion.div>

// //           {/* Main Content */}
// //           <motion.div
// //             initial={{ opacity: 0, y: 20 }}
// //             animate={{ opacity: 1, y: 0 }}
// //             transition={{ duration: 0.6, delay: 0.3 }}
// //           >
// //             <Tabs defaultValue="courses" className="w-full">
// //               <TabsList className="grid w-full grid-cols-5">
// //                 <TabsTrigger value="courses">Courses</TabsTrigger>
// //                 <TabsTrigger value="users">Users</TabsTrigger>
// //                 <TabsTrigger value="orders">Orders</TabsTrigger>
// //                 <TabsTrigger value="admins">Admins</TabsTrigger>
// //                 <TabsTrigger value="analytics">Analytics</TabsTrigger>
// //               </TabsList>

// //               {/* Courses Tab */}
// //               <TabsContent value="courses" className="mt-6">
// //                 <Card>
// //                   <CardHeader>
// //                     <div className="flex justify-between items-center">
// //                       <div>
// //                         <CardTitle>Course Management</CardTitle>
// //                         <CardDescription>
// //                           Manage your courses, content, and pricing (showing all courses)
// //                         </CardDescription>
// //                       </div>
// //                       <div className="flex gap-2">
// //                         <div className="relative">
// //                           <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
// //                           <Input
// //                             placeholder="Search courses..."
// //                             className="pl-10 w-64"
// //                             value={searchTerm}
// //                             onChange={(e) => setSearchTerm(e.target.value)}
// //                           />
// //                         </div>
// //                         <Button variant="outline" size="icon">
// //                           <Filter className="h-4 w-4" />
// //                         </Button>
// //                       </div>
// //                     </div>
// //                   </CardHeader>
// //                   <CardContent>
// //                     <div className="space-y-4">
// //                       {filteredCourses.map((course) => (
// //                         <div
// //                           key={course.id}
// //                           className="flex items-center gap-4 p-4 border rounded-lg hover:bg-muted/50 transition-colors"
// //                         >
// //                           <img
// //                             src={course.thumbnail || 'https://images.pexels.com/photos/5212345/pexels-photo-5212345.jpeg'}
// //                             alt={course.title}
// //                             className="w-16 h-16 rounded-lg object-cover"
// //                           />
// //                           <div className="flex-1">
// //                             <h3 className="font-semibold mb-1">{course.title}</h3>
// //                             <p className="text-sm text-muted-foreground mb-2">
// //                               {course.description?.substring(0, 100)}...
// //                             </p>
// //                             <div className="flex items-center gap-4">
// //                               <Badge variant="secondary">{course.category}</Badge>
// //                               <Badge variant={course.isActive ? 'default' : 'destructive'}>
// //                                 {course.isActive ? 'Active' : 'Inactive'}
// //                               </Badge>
// //                               <span className="text-sm text-muted-foreground">
// //                                 ₹{course.price}
// //                               </span>
// //                               <span className="text-sm text-muted-foreground">
// //                                 {course.enrolledCount || 0} enrolled
// //                               </span>
// //                             </div>
// //                           </div>
// //                           <DropdownMenu>
// //                             <DropdownMenuTrigger asChild>
// //                               <Button variant="ghost" size="icon">
// //                                 <MoreVertical className="h-4 w-4" />
// //                               </Button>
// //                             </DropdownMenuTrigger>
// //                             <DropdownMenuContent align="end">
// //                               <DropdownMenuItem asChild>
// //                                 <Link href={`/admin/courses/${course.id}`}>
// //                                   <Eye className="mr-2 h-4 w-4" />
// //                                   View
// //                                 </Link>
// //                               </DropdownMenuItem>
// //                               <DropdownMenuItem asChild>
// //                                 <Link href={`/admin/courses/${course.id}/edit`}>
// //                                   <Edit className="mr-2 h-4 w-4" />
// //                                   Edit
// //                                 </Link>
// //                               </DropdownMenuItem>
// //                               <DropdownMenuItem
// //                                 onClick={() => toggleCourseStatus(course.id, course.isActive, course.title)}
// //                               >
// //                                 <Settings className="mr-2 h-4 w-4" />
// //                                 {course.isActive ? 'Deactivate' : 'Activate'}
// //                               </DropdownMenuItem>
// //                               <DropdownMenuItem
// //                                 onClick={() => deleteCourse(course.id, course.title)}
// //                                 className="text-red-600"
// //                               >
// //                                 <Trash2 className="mr-2 h-4 w-4" />
// //                                 Delete
// //                               </DropdownMenuItem>
// //                             </DropdownMenuContent>
// //                           </DropdownMenu>
// //                         </div>
// //                       ))}

// //                       {filteredCourses.length === 0 && (
// //                         <div className="text-center py-8 text-muted-foreground">
// //                           <BookOpen className="w-12 h-12 mx-auto mb-4 opacity-50" />
// //                           <p>No courses found.</p>
// //                           {searchTerm && (
// //                             <p className="text-sm">Try adjusting your search criteria.</p>
// //                           )}
// //                         </div>
// //                       )}
// //                     </div>
// //                   </CardContent>
// //                 </Card>
// //               </TabsContent>

// //               {/* Users Tab */}
// //               <TabsContent value="users" className="mt-6">
// //                 <Card>
// //                   <CardHeader>
// //                     <div className="flex justify-between items-center">
// //                       <div>
// //                         <CardTitle>User Management</CardTitle>
// //                         <CardDescription>
// //                           View and manage registered users
// //                         </CardDescription>
// //                       </div>
// //                       <div className="relative">
// //                         <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
// //                         <Input
// //                           placeholder="Search users..."
// //                           className="pl-10 w-64"
// //                           value={searchTerm}
// //                           onChange={(e) => setSearchTerm(e.target.value)}
// //                         />
// //                       </div>
// //                     </div>
// //                   </CardHeader>
// //                   <CardContent>
// //                     <div className="space-y-4">
// //                       {filteredUsers.map((user) => (
// //                         <div
// //                           key={user.id}
// //                           className="flex items-center gap-4 p-4 border rounded-lg hover:bg-muted/50 transition-colors"
// //                         >
// //                           <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
// //                             <Users className="w-6 h-6 text-primary" />
// //                           </div>
// //                           <div className="flex-1">
// //                             <h3 className="font-semibold">{user.fullName}</h3>
// //                             <p className="text-sm text-muted-foreground">{user.email}</p>
// //                             <p className="text-sm text-muted-foreground">
// //                               {user.location && `${user.location} • `}
// //                               Joined {new Date(user.createdAt).toLocaleDateString()}
// //                             </p>
// //                           </div>
// //                           <div className="text-right">
// //                             <Badge
// //                               variant={user.isVerified ? 'default' : 'secondary'}
// //                             >
// //                               {user.isVerified ? 'Verified' : 'Pending'}
// //                             </Badge>
// //                             <p className="text-sm text-muted-foreground mt-1">
// //                               {user.enrolledCourses?.length || 0} courses
// //                             </p>
// //                             {user.credits > 0 && (
// //                               <p className="text-sm text-green-600 mt-1">
// //                                 ₹{user.credits} credits
// //                               </p>
// //                             )}
// //                           </div>
// //                         </div>
// //                       ))}

// //                       {filteredUsers.length === 0 && (
// //                         <div className="text-center py-8 text-muted-foreground">
// //                           <Users className="w-12 h-12 mx-auto mb-4 opacity-50" />
// //                           <p>No users found.</p>
// //                           {searchTerm && (
// //                             <p className="text-sm">Try adjusting your search criteria.</p>
// //                           )}
// //                         </div>
// //                       )}
// //                     </div>
// //                   </CardContent>
// //                 </Card>
// //               </TabsContent>

// //               {/* Orders Tab */}
// //               <TabsContent value="orders" className="mt-6">
// //                 <Card>
// //                   <CardHeader>
// //                     <CardTitle>Recent Orders</CardTitle>
// //                     <CardDescription>
// //                       Track course purchases and payments
// //                     </CardDescription>
// //                   </CardHeader>
// //                   <CardContent>
// //                     <div className="space-y-4">
// //                       {recentOrders.map((order) => (
// //                         <div
// //                           key={order.id}
// //                           className="flex items-center gap-4 p-4 border rounded-lg hover:bg-muted/50 transition-colors"
// //                         >
// //                           <div className="w-12 h-12 bg-green-50 dark:bg-green-950 rounded-full flex items-center justify-center">
// //                             <DollarSign className="w-6 h-6 text-green-600" />
// //                           </div>
// //                           <div className="flex-1">
// //                             <h3 className="font-semibold">{order.courseName}</h3>
// //                             <p className="text-sm text-muted-foreground">
// //                               by {order.userName}
// //                             </p>
// //                             <p className="text-sm text-muted-foreground">
// //                               {new Date(order.createdAt).toLocaleDateString()}
// //                             </p>
// //                           </div>
// //                           <div className="text-right">
// //                             <p className="font-semibold">₹{order.amount}</p>
// //                             <Badge
// //                               variant={
// //                                 order.status === 'completed'
// //                                   ? 'default'
// //                                   : order.status === 'pending'
// //                                     ? 'secondary'
// //                                     : 'destructive'
// //                               }
// //                             >
// //                               {order.status}
// //                             </Badge>
// //                           </div>
// //                         </div>
// //                       ))}

// //                       {recentOrders.length === 0 && (
// //                         <div className="text-center py-8 text-muted-foreground">
// //                           <DollarSign className="w-12 h-12 mx-auto mb-4 opacity-50" />
// //                           <p>No recent orders found.</p>
// //                         </div>
// //                       )}
// //                     </div>
// //                   </CardContent>
// //                 </Card>
// //               </TabsContent>

// //               {/* Admins Tab */}
// //               <TabsContent value="admins" className="mt-6">
// //                 <Card>
// //                   <CardHeader>
// //                     <div className="flex justify-between items-center">
// //                       <div>
// //                         <CardTitle>Administrator Overview</CardTitle>
// //                         <CardDescription>
// //                           Quick view of admin accounts and recent activity
// //                         </CardDescription>
// //                       </div>
// //                       <Link href="/admin/admins">
// //                         <Button className="flex items-center gap-2">
// //                           <Shield className="w-4 h-4" />
// //                           Manage All Admins
// //                         </Button>
// //                       </Link>
// //                     </div>
// //                   </CardHeader>
// //                   <CardContent>
// //                     <div className="grid md:grid-cols-2 gap-6 mb-6">
// //                       <div className="p-4 bg-purple-50 dark:bg-purple-950/50 rounded-lg">
// //                         <div className="flex items-center gap-3">
// //                           <Shield className="w-8 h-8 text-purple-600" />
// //                           <div>
// //                             <p className="text-2xl font-bold">{stats.totalAdmins || 0}</p>
// //                             <p className="text-sm text-muted-foreground">Total Administrators</p>
// //                           </div>
// //                         </div>
// //                       </div>
// //                       <div className="p-4 bg-green-50 dark:bg-green-950/50 rounded-lg">
// //                         <div className="flex items-center gap-3">
// //                           <UserPlus className="w-8 h-8 text-green-600" />
// //                           <div>
// //                             <p className="text-2xl font-bold">{stats.activeAdmins || 0}</p>
// //                             <p className="text-sm text-muted-foreground">Active Administrators</p>
// //                           </div>
// //                         </div>
// //                       </div>
// //                     </div>

// //                     <div className="space-y-4">
// //                       <h4 className="font-semibold">Recent Admin Activity</h4>
// //                       {recentAdmins.slice(0, 3).map((admin) => (
// //                         <div
// //                           key={admin.id}
// //                           className="flex items-center gap-4 p-3 border rounded-lg"
// //                         >
// //                           <div className="w-10 h-10 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center">
// //                             <Shield className="w-5 h-5 text-purple-600" />
// //                           </div>
// //                           <div className="flex-1">
// //                             <h5 className="font-medium">{admin.fullName}</h5>
// //                             <p className="text-sm text-muted-foreground">{admin.email}</p>
// //                           </div>
// //                           <Badge variant={admin.isActive ? 'default' : 'secondary'}>
// //                             {admin.isActive ? 'Active' : 'Inactive'}
// //                           </Badge>
// //                         </div>
// //                       ))}

// //                       {recentAdmins.length === 0 && (
// //                         <div className="text-center py-6 text-muted-foreground">
// //                           <Shield className="w-8 h-8 mx-auto mb-2 opacity-50" />
// //                           <p className="text-sm">No admin data available</p>
// //                         </div>
// //                       )}
// //                     </div>
// //                   </CardContent>
// //                 </Card>
// //               </TabsContent>

// //               {/* Analytics Tab */}
// //               <TabsContent value="analytics" className="mt-6">
// //                 <div className="grid md:grid-cols-2 gap-6">
// //                   <Card>
// //                     <CardHeader>
// //                       <CardTitle>Revenue Overview</CardTitle>
// //                       <CardDescription>
// //                         Monthly revenue and growth trends
// //                       </CardDescription>
// //                     </CardHeader>
// //                     <CardContent>
// //                       <div className="h-64 flex flex-col items-center justify-center text-muted-foreground">
// //                         <BarChart3 className="w-12 h-12 mb-4" />
// //                         <p>Revenue chart integration coming soon</p>
// //                         <p className="text-sm">Connect with analytics service</p>
// //                       </div>
// //                     </CardContent>
// //                   </Card>

// //                   <Card>
// //                     <CardHeader>
// //                       <CardTitle>Course Performance</CardTitle>
// //                       <CardDescription>
// //                         Top performing courses by enrollment
// //                       </CardDescription>
// //                     </CardHeader>
// //                     <CardContent>
// //                       <div className="space-y-4">
// //                         {courses.slice(0, 5).map((course, index) => (
// //                           <div key={course.id} className="flex items-center gap-3">
// //                             <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-sm font-medium">
// //                               {index + 1}
// //                             </div>
// //                             <div className="flex-1">
// //                               <p className="font-medium text-sm">{course.title}</p>
// //                               <p className="text-xs text-muted-foreground">
// //                                 {course.enrolledCount || 0} students
// //                               </p>
// //                             </div>
// //                             <Badge variant="outline">
// //                               ₹{course.price}
// //                             </Badge>
// //                           </div>
// //                         ))}

// //                         {courses.length === 0 && (
// //                           <div className="text-center py-6 text-muted-foreground">
// //                             <BookOpen className="w-8 h-8 mx-auto mb-2 opacity-50" />
// //                             <p className="text-sm">No course data available</p>
// //                           </div>
// //                         )}
// //                       </div>
// //                     </CardContent>
// //                   </Card>
// //                 </div>
// //               </TabsContent>
// //             </Tabs>
// //           </motion.div>
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
//   BarChart3,
//   Users,
//   BookOpen,
//   DollarSign,
//   Plus,
//   Search,
//   Filter,
//   MoreVertical,
//   Edit,
//   Trash2,
//   Eye,
//   TrendingUp,
//   TrendingDown,
//   Award,
//   Shield,
//   UserPlus,
//   Settings,
//   Lock,
//   Mail,
//   LogOut,
// } from 'lucide-react';
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
// import { Button } from '@/components/ui/button';
// import { Input } from '@/components/ui/input';
// import { Badge } from '@/components/ui/badge';
// import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
// import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuTrigger,
// } from '@/components/ui/dropdown-menu';
// import { toast } from 'sonner';
// import Link from 'next/link';
// import AdminNavbar from '@/components/admin-navbar';
// import CustomConfirmDialog, { useConfirmDialog } from '@/components/custom-confirm-dialog';
// import { useAuth } from '@/components/auth-provider';

// export default function AdminDashboard() {
//   const confirm = useConfirmDialog();
//   const { user, logout } = useAuth();
//   const [stats, setStats] = useState({
//     totalUsers: 0,
//     totalCourses: 0,
//     totalRevenue: 0,
//     activeStudents: 0,
//     completionRate: 0,
//     newEnrollments: 0,
//     totalAdmins: 0,
//     activeAdmins: 0
//   });
//   const [courses, setCourses] = useState([]);
//   const [users, setUsers] = useState([]);
//   const [recentOrders, setRecentOrders] = useState([]);
//   const [recentAdmins, setRecentAdmins] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [isPasswordDialogOpen, setIsPasswordDialogOpen] = useState(false);
//   const [isLoading, setIsLoading] = useState(false);

//   useEffect(() => {
//     fetchAdminData();
//   }, []);

//   const fetchAdminData = async () => {
//     try {
//       // Fetch all courses (both active and inactive) from the admin courses API
//       const coursesResponse = await fetch('/api/admin/courses');
//       if (coursesResponse.ok) {
//         const coursesData = await coursesResponse.json();
//         setCourses(coursesData.courses || []);
//       }

//       // Fetch dashboard data
//       const response = await fetch('/api/admin/dashboard', {
//         headers: {
//           'Authorization': `Bearer ${document.cookie.split('auth-token=')[1]?.split(';')[0]}`,
//         },
//       });

//       if (response.ok) {
//         const data = await response.json();
//         setStats(data.stats);
//         setUsers(data.users);
//         setRecentOrders(data.recentOrders);
//         setRecentAdmins(data.recentAdmins || []);
//       } else {
//         toast.error('Failed to load dashboard data');
//       }
//     } catch (error) {
//       console.error('Error fetching admin data:', error);
//       toast.error('Error loading dashboard data');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const sendPasswordResetLink = async () => {
//     if (!user?.email) {
//       toast.error('Admin email not found');
//       return;
//     }

//     setIsLoading(true);
//     try {
//       await sendPasswordResetEmail(auth, user.email);
//       toast.success('Password reset link sent to your email address!');
//       setIsPasswordDialogOpen(false);
//     } catch (error) {
//       console.error('Error sending password reset email:', error);
//       let errorMessage = 'Failed to send password reset email';
      
//       if (error.code === 'auth/user-not-found') {
//         errorMessage = 'No account found with this email address';
//       } else if (error.code === 'auth/too-many-requests') {
//         errorMessage = 'Too many requests. Please wait before trying again';
//       } else if (error.code === 'auth/invalid-email') {
//         errorMessage = 'Invalid email address';
//       }
      
//       toast.error(errorMessage);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const handleLogout = async () => {
//     try {
//       await logout();
//       toast.success('Logged out successfully');
//     } catch (error) {
//       console.error('Logout error:', error);
//       toast.error('Error logging out');
//     }
//   };

//   const deleteCourse = async (courseId, courseTitle) => {
//     const confirmed = await confirm(
//       `Are you sure you want to delete "${courseTitle}"? This action cannot be undone and will remove all associated data.`,
//       'Delete Course'
//     );
    
//     if (!confirmed) return;

//     try {
//       const response = await fetch(`/api/admin/courses/${courseId}`, {
//         method: 'DELETE',
//         headers: {
//           'Authorization': `Bearer ${document.cookie.split('auth-token=')[1]?.split(';')[0]}`,
//         },
//       });

//       if (response.ok) {
//         toast.success('Course deleted successfully');
//         fetchAdminData();
//       } else {
//         toast.error('Error deleting course');
//       }
//     } catch (error) {
//       console.error('Error deleting course:', error);
//       toast.error('Error deleting course');
//     }
//   };

//   const toggleCourseStatus = async (courseId, currentStatus, courseTitle) => {
//     const action = currentStatus ? 'deactivate' : 'activate';
//     const confirmed = await confirm(
//       `Are you sure you want to ${action} "${courseTitle}"? ${currentStatus ? 'Students will no longer be able to enroll in this course.' : 'This course will become available for enrollment.'}`,
//       `${action.charAt(0).toUpperCase() + action.slice(1)} Course`
//     );
    
//     if (!confirmed) return;

//     try {
//       const response = await fetch(`/api/admin/courses/${courseId}/toggle-status`, {
//         method: 'PUT',
//         headers: {
//           'Authorization': `Bearer ${document.cookie.split('auth-token=')[1]?.split(';')[0]}`,
//         },
//       });

//       if (response.ok) {
//         toast.success(`Course ${currentStatus ? 'deactivated' : 'activated'} successfully`);
//         fetchAdminData();
//       } else {
//         toast.error('Error updating course status');
//       }
//     } catch (error) {
//       console.error('Error toggling course status:', error);
//       toast.error('Error updating course status');
//     }
//   };

//   const filteredCourses = courses.filter(course =>
//     course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
//     course.category.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   const filteredUsers = users.filter(user =>
//     user.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
//     user.email.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   const adminStats = [
//     {
//       title: 'Total Users',
//       value: stats.totalUsers,
//       icon: Users,
//       color: 'text-blue-600',
//       bgColor: 'bg-blue-50 dark:bg-blue-950',
//       change: '+12.5%',
//       trend: 'up'
//     },
//     {
//       title: 'Total Courses',
//       value: stats.totalCourses,
//       icon: BookOpen,
//       color: 'text-green-600',
//       bgColor: 'bg-green-50 dark:bg-green-950',
//       change: '+8.2%',
//       trend: 'up'
//     },
//     {
//       title: 'Total Revenue',
//       value: `₹${stats.totalRevenue.toLocaleString()}`,
//       icon: DollarSign,
//       color: 'text-purple-600',
//       bgColor: 'bg-purple-50 dark:bg-purple-950',
//       change: '+23.1%',
//       trend: 'up'
//     },
//     {
//       title: 'Active Students',
//       value: stats.activeStudents,
//       icon: Award,
//       color: 'text-orange-600',
//       bgColor: 'bg-orange-50 dark:bg-orange-950',
//       change: '+5.4%',
//       trend: 'up'
//     }
//   ];

//   if (loading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center">
//         <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-background">
//       <AdminNavbar />
//       <CustomConfirmDialog />

//       <main className="pt-20 pb-12">
//         <div className="container mx-auto px-4">
//           {/* Header */}
//           <motion.div
//             className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 mb-8"
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.6 }}
//           >
//             <div>
//               <h1 className="text-2xl sm:text-3xl font-bold mb-2">Admin Dashboard</h1>
//               <p className="text-muted-foreground">
//                 Manage your courses, users, and track platform performance.
//               </p>
//             </div>
//             <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full lg:w-auto">
//               <Dialog open={isPasswordDialogOpen} onOpenChange={setIsPasswordDialogOpen}>
//                 <DialogTrigger asChild>
//                   <Button variant="outline" className="flex items-center gap-2">
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
//                           <p className="text-sm text-muted-foreground">{user?.email}</p>
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

//               <Link href="/admin/admins" className="w-full sm:w-auto">
//                 <Button variant="outline" className="flex items-center gap-2 w-full">
//                   <Shield className="w-4 h-4" />
//                   Manage Admins
//                 </Button>
//               </Link>

//               <Link href="/admin/courses/create" className="w-full sm:w-auto">
//                 <Button className="flex items-center gap-2 w-full">
//                   <Plus className="w-4 h-4" />
//                   Add Course
//                 </Button>
//               </Link>
//             </div>
//           </motion.div>

//           {/* Stats Cards */}
//           <motion.div
//             className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 mb-8"
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.6, delay: 0.1 }}
//           >
//             {adminStats.map((stat, index) => (
//               <Card key={stat.title} className="hover:shadow-lg transition-shadow">
//                 <CardContent className="p-4 sm:p-6">
//                   <div className="flex items-center justify-between mb-4">
//                     <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-lg flex items-center justify-center ${stat.bgColor}`}>
//                       <stat.icon className={`w-5 h-5 sm:w-6 sm:h-6 ${stat.color}`} />
//                     </div>
//                     <div className={`flex items-center gap-1 text-xs ${stat.trend === 'up' ? 'text-green-600' : 'text-red-600'
//                       }`}>
//                       {stat.trend === 'up' ? (
//                         <TrendingUp className="w-3 h-3" />
//                       ) : (
//                         <TrendingDown className="w-3 h-3" />
//                       )}
//                       {stat.change}
//                     </div>
//                   </div>
//                   <div>
//                     <p className="text-xl sm:text-2xl font-bold mb-1">{stat.value}</p>
//                     <p className="text-sm text-muted-foreground">{stat.title}</p>
//                   </div>
//                 </CardContent>
//               </Card>
//             ))}
//           </motion.div>

//           {/* Quick Actions */}
//           <motion.div
//             className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mb-8"
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.6, delay: 0.2 }}
//           >
//             <Card className="hover:shadow-lg transition-shadow cursor-pointer">
//               <Link href="/admin/admins">
//                 <CardContent className="p-4 sm:p-6">
//                   <div className="flex items-center gap-4">
//                     <div className="w-10 h-10 sm:w-12 sm:h-12 bg-purple-50 dark:bg-purple-950 rounded-lg flex items-center justify-center">
//                       <UserPlus className="w-5 h-5 sm:w-6 sm:h-6 text-purple-600" />
//                     </div>
//                     <div>
//                       <h3 className="font-semibold mb-1">Administrator Management</h3>
//                       <p className="text-sm text-muted-foreground">
//                         Add and manage admin accounts
//                       </p>
//                       <Badge variant="secondary" className="mt-2">
//                         {stats.totalAdmins || 0} Admins
//                       </Badge>
//                     </div>
//                   </div>
//                 </CardContent>
//               </Link>
//             </Card>

//             <Card className="hover:shadow-lg transition-shadow cursor-pointer">
//               <Link href="/admin/courses/create">
//                 <CardContent className="p-4 sm:p-6">
//                   <div className="flex items-center gap-4">
//                     <div className="w-10 h-10 sm:w-12 sm:h-12 bg-green-50 dark:bg-green-950 rounded-lg flex items-center justify-center">
//                       <Plus className="w-5 h-5 sm:w-6 sm:h-6 text-green-600" />
//                     </div>
//                     <div>
//                       <h3 className="font-semibold mb-1">Create New Course</h3>
//                       <p className="text-sm text-muted-foreground">
//                         Add courses with content and pricing
//                       </p>
//                       <Badge variant="secondary" className="mt-2">
//                         Quick Action
//                       </Badge>
//                     </div>
//                   </div>
//                 </CardContent>
//               </Link>
//             </Card>

//             <Card className="hover:shadow-lg transition-shadow">
//               <CardContent className="p-4 sm:p-6">
//                 <div className="flex items-center gap-4">
//                   <div className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-50 dark:bg-blue-950 rounded-lg flex items-center justify-center">
//                     <BarChart3 className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600" />
//                   </div>
//                   <div>
//                     <h3 className="font-semibold mb-1">Analytics Overview</h3>
//                     <p className="text-sm text-muted-foreground">
//                       View detailed platform analytics
//                     </p>
//                     <Badge variant="secondary" className="mt-2">
//                       Coming Soon
//                     </Badge>
//                   </div>
//                 </div>
//               </CardContent>
//             </Card>
//           </motion.div>

//           {/* Main Content */}
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.6, delay: 0.3 }}
//           >
//             <Tabs defaultValue="courses" className="w-full">
//               <TabsList className="grid w-full grid-cols-5 mb-6">
//                 <TabsTrigger value="courses" className="text-xs sm:text-sm">Courses</TabsTrigger>
//                 <TabsTrigger value="users" className="text-xs sm:text-sm">Users</TabsTrigger>
//                 <TabsTrigger value="orders" className="text-xs sm:text-sm">Orders</TabsTrigger>
//                 <TabsTrigger value="admins" className="text-xs sm:text-sm">Admins</TabsTrigger>
//                 <TabsTrigger value="analytics" className="text-xs sm:text-sm">Analytics</TabsTrigger>
//               </TabsList>

//               {/* Courses Tab */}
//               <TabsContent value="courses" className="mt-6">
//                 <Card>
//                   <CardHeader>
//                     <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
//                       <div>
//                         <CardTitle>Course Management</CardTitle>
//                         <CardDescription>
//                           Manage your courses, content, and pricing (showing all courses)
//                         </CardDescription>
//                       </div>
//                       <div className="flex flex-col sm:flex-row gap-2 w-full lg:w-auto">
//                         <div className="relative">
//                           <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
//                           <Input
//                             placeholder="Search courses..."
//                             className="pl-10 w-full sm:w-64"
//                             value={searchTerm}
//                             onChange={(e) => setSearchTerm(e.target.value)}
//                           />
//                         </div>
//                         <Button variant="outline" size="icon">
//                           <Filter className="h-4 w-4" />
//                         </Button>
//                       </div>
//                     </div>
//                   </CardHeader>
//                   <CardContent>
//                     <div className="space-y-4">
//                       {filteredCourses.map((course) => (
//                         <div
//                           key={course.id}
//                           className="flex flex-col sm:flex-row items-start gap-4 p-4 border rounded-lg hover:bg-muted/50 transition-colors"
//                         >
//                           <img
//                             src={course.thumbnail || 'https://images.pexels.com/photos/5212345/pexels-photo-5212345.jpeg'}
//                             alt={course.title}
//                             className="w-full sm:w-16 h-40 sm:h-16 rounded-lg object-cover"
//                           />
//                           <div className="flex-1 w-full">
//                             <h3 className="font-semibold mb-1">{course.title}</h3>
//                             <p className="text-sm text-muted-foreground mb-2">
//                               {course.description?.substring(0, 100)}...
//                             </p>
//                             <div className="flex flex-wrap items-center gap-2 sm:gap-4">
//                               <Badge variant="secondary">{course.category}</Badge>
//                               <Badge variant={course.isActive ? 'default' : 'destructive'}>
//                                 {course.isActive ? 'Active' : 'Inactive'}
//                               </Badge>
//                               <span className="text-sm text-muted-foreground">
//                                 ₹{course.price}
//                               </span>
//                               <span className="text-sm text-muted-foreground">
//                                 {course.enrolledCount || 0} enrolled
//                               </span>
//                             </div>
//                           </div>
//                           <DropdownMenu>
//                             <DropdownMenuTrigger asChild>
//                               <Button variant="ghost" size="icon" className="mt-2 sm:mt-0">
//                                 <MoreVertical className="h-4 w-4" />
//                               </Button>
//                             </DropdownMenuTrigger>
//                             <DropdownMenuContent align="end">
//                               <DropdownMenuItem asChild>
//                                 <Link href={`/admin/courses/${course.id}`}>
//                                   <Eye className="mr-2 h-4 w-4" />
//                                   View
//                                 </Link>
//                               </DropdownMenuItem>
//                               <DropdownMenuItem asChild>
//                                 <Link href={`/admin/courses/${course.id}/edit`}>
//                                   <Edit className="mr-2 h-4 w-4" />
//                                   Edit
//                                 </Link>
//                               </DropdownMenuItem>
//                               <DropdownMenuItem
//                                 onClick={() => toggleCourseStatus(course.id, course.isActive, course.title)}
//                               >
//                                 <Settings className="mr-2 h-4 w-4" />
//                                 {course.isActive ? 'Deactivate' : 'Activate'}
//                               </DropdownMenuItem>
//                               <DropdownMenuItem
//                                 onClick={() => deleteCourse(course.id, course.title)}
//                                 className="text-red-600"
//                               >
//                                 <Trash2 className="mr-2 h-4 w-4" />
//                                 Delete
//                               </DropdownMenuItem>
//                             </DropdownMenuContent>
//                           </DropdownMenu>
//                         </div>
//                       ))}

//                       {filteredCourses.length === 0 && (
//                         <div className="text-center py-8 text-muted-foreground">
//                           <BookOpen className="w-12 h-12 mx-auto mb-4 opacity-50" />
//                           <p>No courses found.</p>
//                           {searchTerm && (
//                             <p className="text-sm">Try adjusting your search criteria.</p>
//                           )}
//                         </div>
//                       )}
//                     </div>
//                   </CardContent>
//                 </Card>
//               </TabsContent>

//               {/* Users Tab */}
//               <TabsContent value="users" className="mt-6">
//                 <Card>
//                   <CardHeader>
//                     <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
//                       <div>
//                         <CardTitle>User Management</CardTitle>
//                         <CardDescription>
//                           View and manage registered users
//                         </CardDescription>
//                       </div>
//                       <div className="relative w-full lg:w-auto">
//                         <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
//                         <Input
//                           placeholder="Search users..."
//                           className="pl-10 w-full sm:w-64"
//                           value={searchTerm}
//                           onChange={(e) => setSearchTerm(e.target.value)}
//                         />
//                       </div>
//                     </div>
//                   </CardHeader>
//                   <CardContent>
//                     <div className="space-y-4">
//                       {filteredUsers.map((user) => (
//                         <div
//                           key={user.id}
//                           className="flex flex-col sm:flex-row items-start sm:items-center gap-4 p-4 border rounded-lg hover:bg-muted/50 transition-colors"
//                         >
//                           <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
//                             <Users className="w-6 h-6 text-primary" />
//                           </div>
//                           <div className="flex-1">
//                             <h3 className="font-semibold">{user.fullName}</h3>
//                             <p className="text-sm text-muted-foreground">{user.email}</p>
//                             <p className="text-sm text-muted-foreground">
//                               {user.location && `${user.location} • `}
//                               Joined {new Date(user.createdAt).toLocaleDateString()}
//                             </p>
//                           </div>
//                           <div className="text-left sm:text-right w-full sm:w-auto">
//                             <Badge
//                               variant={user.isVerified ? 'default' : 'secondary'}
//                               className="mb-2 sm:mb-1"
//                             >
//                               {user.isVerified ? 'Verified' : 'Pending'}
//                             </Badge>
//                             <p className="text-sm text-muted-foreground">
//                               {user.enrolledCourses?.length || 0} courses
//                             </p>
//                             {user.credits > 0 && (
//                               <p className="text-sm text-green-600">
//                                 ₹{user.credits} credits
//                               </p>
//                             )}
//                           </div>
//                         </div>
//                       ))}

//                       {filteredUsers.length === 0 && (
//                         <div className="text-center py-8 text-muted-foreground">
//                           <Users className="w-12 h-12 mx-auto mb-4 opacity-50" />
//                           <p>No users found.</p>
//                           {searchTerm && (
//                             <p className="text-sm">Try adjusting your search criteria.</p>
//                           )}
//                         </div>
//                       )}
//                     </div>
//                   </CardContent>
//                 </Card>
//               </TabsContent>

//               {/* Orders Tab */}
//               <TabsContent value="orders" className="mt-6">
//                 <Card>
//                   <CardHeader>
//                     <CardTitle>Recent Orders</CardTitle>
//                     <CardDescription>
//                       Track course purchases and payments
//                     </CardDescription>
//                   </CardHeader>
//                   <CardContent>
//                     <div className="space-y-4">
//                       {recentOrders.map((order) => (
//                         <div
//                           key={order.id}
//                           className="flex flex-col sm:flex-row items-start sm:items-center gap-4 p-4 border rounded-lg hover:bg-muted/50 transition-colors"
//                         >
//                           <div className="w-12 h-12 bg-green-50 dark:bg-green-950 rounded-full flex items-center justify-center">
//                             <DollarSign className="w-6 h-6 text-green-600" />
//                           </div>
//                           <div className="flex-1">
//                             <h3 className="font-semibold">{order.courseName}</h3>
//                             <p className="text-sm text-muted-foreground">
//                               by {order.userName}
//                             </p>
//                             <p className="text-sm text-muted-foreground">
//                               {new Date(order.createdAt).toLocaleDateString()}
//                             </p>
//                           </div>
//                           <div className="text-left sm:text-right w-full sm:w-auto">
//                             <p className="font-semibold mb-1">₹{order.amount}</p>
//                             <Badge
//                               variant={
//                                 order.status === 'completed'
//                                   ? 'default'
//                                   : order.status === 'pending'
//                                     ? 'secondary'
//                                     : 'destructive'
//                               }
//                             >
//                               {order.status}
//                             </Badge>
//                           </div>
//                         </div>
//                       ))}

//                       {recentOrders.length === 0 && (
//                         <div className="text-center py-8 text-muted-foreground">
//                           <DollarSign className="w-12 h-12 mx-auto mb-4 opacity-50" />
//                           <p>No recent orders found.</p>
//                         </div>
//                       )}
//                     </div>
//                   </CardContent>
//                 </Card>
//               </TabsContent>

//               {/* Admins Tab */}
//               <TabsContent value="admins" className="mt-6">
//                 <Card>
//                   <CardHeader>
//                     <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
//                       <div>
//                         <CardTitle>Administrator Overview</CardTitle>
//                         <CardDescription>
//                           Quick view of admin accounts and recent activity
//                         </CardDescription>
//                       </div>
//                       <Link href="/admin/admins" className="w-full lg:w-auto">
//                         <Button className="flex items-center gap-2 w-full">
//                           <Shield className="w-4 h-4" />
//                           Manage All Admins
//                         </Button>
//                       </Link>
//                     </div>
//                   </CardHeader>
//                   <CardContent>
//                     <div className="grid sm:grid-cols-2 gap-6 mb-6">
//                       <div className="p-4 bg-purple-50 dark:bg-purple-950/50 rounded-lg">
//                         <div className="flex items-center gap-3">
//                           <Shield className="w-8 h-8 text-purple-600" />
//                           <div>
//                             <p className="text-2xl font-bold">{stats.totalAdmins || 0}</p>
//                             <p className="text-sm text-muted-foreground">Total Administrators</p>
//                           </div>
//                         </div>
//                       </div>
//                       <div className="p-4 bg-green-50 dark:bg-green-950/50 rounded-lg">
//                         <div className="flex items-center gap-3">
//                           <UserPlus className="w-8 h-8 text-green-600" />
//                           <div>
//                             <p className="text-2xl font-bold">{stats.activeAdmins || 0}</p>
//                             <p className="text-sm text-muted-foreground">Active Administrators</p>
//                           </div>
//                         </div>
//                       </div>
//                     </div>

//                     <div className="space-y-4">
//                       <h4 className="font-semibold">Recent Admin Activity</h4>
//                       {recentAdmins.slice(0, 3).map((admin) => (
//                         <div
//                           key={admin.id}
//                           className="flex items-center gap-4 p-3 border rounded-lg"
//                         >
//                           <div className="w-10 h-10 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center">
//                             <Shield className="w-5 h-5 text-purple-600" />
//                           </div>
//                           <div className="flex-1">
//                             <h5 className="font-medium">{admin.fullName}</h5>
//                             <p className="text-sm text-muted-foreground">{admin.email}</p>
//                           </div>
//                           <Badge variant={admin.isActive ? 'default' : 'secondary'}>
//                             {admin.isActive ? 'Active' : 'Inactive'}
//                           </Badge>
//                         </div>
//                       ))}

//                       {recentAdmins.length === 0 && (
//                         <div className="text-center py-6 text-muted-foreground">
//                           <Shield className="w-8 h-8 mx-auto mb-2 opacity-50" />
//                           <p className="text-sm">No admin data available</p>
//                         </div>
//                       )}
//                     </div>
//                   </CardContent>
//                 </Card>
//               </TabsContent>

//               {/* Analytics Tab */}
//               <TabsContent value="analytics" className="mt-6">
//                 <div className="grid md:grid-cols-2 gap-6">
//                   <Card>
//                     <CardHeader>
//                       <CardTitle>Revenue Overview</CardTitle>
//                       <CardDescription>
//                         Monthly revenue and growth trends
//                       </CardDescription>
//                     </CardHeader>
//                     <CardContent>
//                       <div className="h-64 flex flex-col items-center justify-center text-muted-foreground">
//                         <BarChart3 className="w-12 h-12 mb-4" />
//                         <p>Revenue chart integration coming soon</p>
//                         <p className="text-sm">Connect with analytics service</p>
//                       </div>
//                     </CardContent>
//                   </Card>

//                   <Card>
//                     <CardHeader>
//                       <CardTitle>Course Performance</CardTitle>
//                       <CardDescription>
//                         Top performing courses by enrollment
//                       </CardDescription>
//                     </CardHeader>
//                     <CardContent>
//                       <div className="space-y-4">
//                         {courses.slice(0, 5).map((course, index) => (
//                           <div key={course.id} className="flex items-center gap-3">
//                             <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-sm font-medium">
//                               {index + 1}
//                             </div>
//                             <div className="flex-1">
//                               <p className="font-medium text-sm">{course.title}</p>
//                               <p className="text-xs text-muted-foreground">
//                                 {course.enrolledCount || 0} students
//                               </p>
//                             </div>
//                             <Badge variant="outline">
//                               ₹{course.price}
//                             </Badge>
//                           </div>
//                         ))}

//                         {courses.length === 0 && (
//                           <div className="text-center py-6 text-muted-foreground">
//                             <BookOpen className="w-8 h-8 mx-auto mb-2 opacity-50" />
//                             <p className="text-sm">No course data available</p>
//                           </div>
//                         )}
//                       </div>
//                     </CardContent>
//                   </Card>
//                 </div>
//               </TabsContent>
//             </Tabs>
//           </motion.div>
//         </div>
//       </main>
//     </div>
//   );
// }

'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import {
  BarChart3,
  Users,
  BookOpen,
  DollarSign,
  Plus,
  Search,
  Filter,
  MoreVertical,
  Edit,
  Trash2,
  Eye,
  TrendingUp,
  TrendingDown,
  Award,
  Shield,
  UserPlus,
  Settings,
  Lock,
  Mail,
  LogOut,
  Lock,
  Mail,
  LogOut,
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { toast } from 'sonner';
import Link from 'next/link';
import AdminNavbar from '@/components/admin-navbar';
import CustomConfirmDialog, { useConfirmDialog } from '@/components/custom-confirm-dialog';
import { useAuth } from '@/components/auth-provider';
import { useAuth } from '@/components/auth-provider';

export default function AdminDashboard() {
  const confirm = useConfirmDialog();
  const { user, logout } = useAuth();
  const { user, logout } = useAuth();
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalCourses: 0,
    totalRevenue: 0,
    activeStudents: 0,
    completionRate: 0,
    newEnrollments: 0,
    totalAdmins: 0,
    activeAdmins: 0
  });
  const [courses, setCourses] = useState([]);
  const [users, setUsers] = useState([]);
  const [recentOrders, setRecentOrders] = useState([]);
  const [recentAdmins, setRecentAdmins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [isPasswordDialogOpen, setIsPasswordDialogOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const sendPasswordResetLink = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/admin/send-password-reset', {
        method: 'POST',
        credentials: 'include',
      });

      const data = await response.json();

      if (response.ok) {
        toast.success(data.message);
      } else {
        toast.error(data.message || 'Failed to send password reset email');
      }
      
      setIsPasswordDialogOpen(false);
    } catch (error) {
      console.error('Error sending password reset email:', error);
      toast.error('Something went wrong. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchAdminData();
  }, []);

  const fetchAdminData = async () => {
    try {
      // Fetch all courses (both active and inactive) from the admin courses API
      const coursesResponse = await fetch('/api/admin/courses');
      if (coursesResponse.ok) {
        const coursesData = await coursesResponse.json();
        setCourses(coursesData.courses || []);
      }

      // Fetch dashboard data
      const response = await fetch('/api/admin/dashboard', {
        headers: {
          'Authorization': `Bearer ${document.cookie.split('auth-token=')[1]?.split(';')[0]}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setStats(data.stats);
        setUsers(data.users);
        setRecentOrders(data.recentOrders);
        setRecentAdmins(data.recentAdmins || []);
      } else {
        toast.error('Failed to load dashboard data');
      }
    } catch (error) {
      console.error('Error fetching admin data:', error);
      toast.error('Error loading dashboard data');
    } finally {
      setLoading(false);
    }
  };

  const sendPasswordResetLink = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/admin/send-password-reset', {
        method: 'POST',
        credentials: 'include',
      });

      const data = await response.json();

      if (response.ok) {
        toast.success(data.message);
      } else {
        toast.error(data.message || 'Failed to send password reset email');
      }
      
      setIsPasswordDialogOpen(false);
    } catch (error) {
      console.error('Error sending password reset email:', error);
      toast.error('Something went wrong. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
      toast.success('Logged out successfully');
    } catch (error) {
      console.error('Logout error:', error);
      toast.error('Error logging out');
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
      toast.success('Logged out successfully');
    } catch (error) {
      console.error('Logout error:', error);
      toast.error('Error logging out');
    }
  };

  const deleteCourse = async (courseId, courseTitle) => {
    const confirmed = await confirm(
      `Are you sure you want to delete "${courseTitle}"? This action cannot be undone and will remove all associated data.`,
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
        fetchAdminData();
      } else {
        toast.error('Error deleting course');
      }
    } catch (error) {
      console.error('Error deleting course:', error);
      toast.error('Error deleting course');
    }
  };

  const toggleCourseStatus = async (courseId, currentStatus, courseTitle) => {
    const action = currentStatus ? 'deactivate' : 'activate';
    const confirmed = await confirm(
      `Are you sure you want to ${action} "${courseTitle}"? ${currentStatus ? 'Students will no longer be able to enroll in this course.' : 'This course will become available for enrollment.'}`,
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
        toast.success(`Course ${currentStatus ? 'deactivated' : 'activated'} successfully`);
        fetchAdminData();
      } else {
        toast.error('Error updating course status');
      }
    } catch (error) {
      console.error('Error toggling course status:', error);
      toast.error('Error updating course status');
    }
  };

  const filteredCourses = courses.filter(course =>
    course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    course.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredUsers = users.filter(user =>
    user.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const adminStats = [
    {
      title: 'Total Users',
      value: stats.totalUsers,
      icon: Users,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50 dark:bg-blue-950',
      change: '+12.5%',
      trend: 'up'
    },
    {
      title: 'Total Courses',
      value: stats.totalCourses,
      icon: BookOpen,
      color: 'text-green-600',
      bgColor: 'bg-green-50 dark:bg-green-950',
      change: '+8.2%',
      trend: 'up'
    },
    {
      title: 'Total Revenue',
      value: `₹${stats.totalRevenue.toLocaleString()}`,
      icon: DollarSign,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50 dark:bg-purple-950',
      change: '+23.1%',
      trend: 'up'
    },
    {
      title: 'Active Students',
      value: stats.activeStudents,
      icon: Award,
      color: 'text-orange-600',
      bgColor: 'bg-orange-50 dark:bg-orange-950',
      change: '+5.4%',
      trend: 'up'
    }
  ];

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <AdminNavbar />
      <CustomConfirmDialog />

      <main className="pt-20 pb-12">
        <div className="container mx-auto px-4">
          {/* Header */}
          <motion.div
            className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold mb-2">Admin Dashboard</h1>
              <p className="text-muted-foreground">
                Manage your courses, users, and track platform performance.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full lg:w-auto">
              <Dialog open={isPasswordDialogOpen} onOpenChange={setIsPasswordDialogOpen}>
                <DialogTrigger asChild>
                  <Button variant="outline" className="flex items-center gap-2">
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

              <Link href="/admin/admins" className="w-full sm:w-auto">
                <Button variant="outline" className="flex items-center gap-2 w-full">
                  <Shield className="w-4 h-4" />
                  Manage Admins
                </Button>
              </Link>

              <Link href="/admin/courses/create" className="w-full sm:w-auto">
                <Button className="flex items-center gap-2 w-full">
                  <Plus className="w-4 h-4" />
                  Add Course
                </Button>
              </Link>

              <Button variant="outline" onClick={handleLogout} className="flex items-center gap-2 text-red-600 hover:text-red-700 w-full sm:w-auto">
                <LogOut className="w-4 h-4" />
                Logout
              </Button>

              <Button variant="outline" onClick={handleLogout} className="flex items-center gap-2 text-red-600 hover:text-red-700 w-full sm:w-auto">
                <LogOut className="w-4 h-4" />
                Logout
              </Button>
            </div>
          </motion.div>

          {/* Stats Cards */}
          <motion.div
            className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            {adminStats.map((stat, index) => (
              <Card key={stat.title} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-4 sm:p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-lg flex items-center justify-center ${stat.bgColor}`}>
                      <stat.icon className={`w-5 h-5 sm:w-6 sm:h-6 ${stat.color}`} />
                    </div>
                    <div className={`flex items-center gap-1 text-xs ${stat.trend === 'up' ? 'text-green-600' : 'text-red-600'
                      }`}>
                      {stat.trend === 'up' ? (
                        <TrendingUp className="w-3 h-3" />
                      ) : (
                        <TrendingDown className="w-3 h-3" />
                      )}
                      {stat.change}
                    </div>
                  </div>
                  <div>
                    <p className="text-xl sm:text-2xl font-bold mb-1">{stat.value}</p>
                    <p className="text-sm text-muted-foreground">{stat.title}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </motion.div>

          {/* Quick Actions */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
              <Link href="/admin/admins">
                <CardContent className="p-4 sm:p-6">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-purple-50 dark:bg-purple-950 rounded-lg flex items-center justify-center">
                      <UserPlus className="w-5 h-5 sm:w-6 sm:h-6 text-purple-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">Administrator Management</h3>
                      <p className="text-sm text-muted-foreground">
                        Add and manage admin accounts
                      </p>
                      <Badge variant="secondary" className="mt-2">
                        {stats.totalAdmins || 0} Admins
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Link>
            </Card>

            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
              <Link href="/admin/courses/create">
                <CardContent className="p-4 sm:p-6">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-green-50 dark:bg-green-950 rounded-lg flex items-center justify-center">
                      <Plus className="w-5 h-5 sm:w-6 sm:h-6 text-green-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">Create New Course</h3>
                      <p className="text-sm text-muted-foreground">
                        Add courses with content and pricing
                      </p>
                      <Badge variant="secondary" className="mt-2">
                        Quick Action
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Link>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="p-4 sm:p-6">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-50 dark:bg-blue-950 rounded-lg flex items-center justify-center">
                    <BarChart3 className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Analytics Overview</h3>
                    <p className="text-sm text-muted-foreground">
                      View detailed platform analytics
                    </p>
                    <Badge variant="secondary" className="mt-2">
                      Coming Soon
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Main Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <Tabs defaultValue="courses" className="w-full">
              <TabsList className="grid w-full grid-cols-5 mb-6">
                <TabsTrigger value="courses" className="text-xs sm:text-sm">Courses</TabsTrigger>
                <TabsTrigger value="users" className="text-xs sm:text-sm">Users</TabsTrigger>
                <TabsTrigger value="orders" className="text-xs sm:text-sm">Orders</TabsTrigger>
                <TabsTrigger value="admins" className="text-xs sm:text-sm">Admins</TabsTrigger>
                <TabsTrigger value="analytics" className="text-xs sm:text-sm">Analytics</TabsTrigger>
              </TabsList>

              {/* Courses Tab */}
              <TabsContent value="courses" className="mt-6">
                <Card>
                  <CardHeader>
                    <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
                      <div>
                        <CardTitle>Course Management</CardTitle>
                        <CardDescription>
                          Manage your courses, content, and pricing (showing all courses)
                        </CardDescription>
                      </div>
                      <div className="flex flex-col sm:flex-row gap-2 w-full lg:w-auto">
                        <div className="relative">
                          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                          <Input
                            placeholder="Search courses..."
                            className="pl-10 w-full sm:w-64"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                          />
                        </div>
                        <Button variant="outline" size="icon">
                          <Filter className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {filteredCourses.map((course) => (
                        <div
                          key={course.id}
                          className="flex flex-col sm:flex-row items-start gap-4 p-4 border rounded-lg hover:bg-muted/50 transition-colors"
                        >
                          <img
                            src={course.thumbnail || 'https://images.pexels.com/photos/5212345/pexels-photo-5212345.jpeg'}
                            alt={course.title}
                            className="w-full sm:w-16 h-40 sm:h-16 rounded-lg object-cover"
                          />
                          <div className="flex-1 w-full">
                            <h3 className="font-semibold mb-1">{course.title}</h3>
                            <p className="text-sm text-muted-foreground mb-2">
                              {course.description?.substring(0, 100)}...
                            </p>
                            <div className="flex flex-wrap items-center gap-2 sm:gap-4">
                              <Badge variant="secondary">{course.category}</Badge>
                              <Badge variant={course.isActive ? 'default' : 'destructive'}>
                                {course.isActive ? 'Active' : 'Inactive'}
                              </Badge>
                              <span className="text-sm text-muted-foreground">
                                ₹{course.price}
                              </span>
                              <span className="text-sm text-muted-foreground">
                                {course.enrolledCount || 0} enrolled
                              </span>
                            </div>
                          </div>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon" className="mt-2 sm:mt-0">
                                <MoreVertical className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem asChild>
                                <Link href={`/admin/courses/${course.id}`}>
                                  <Eye className="mr-2 h-4 w-4" />
                                  View
                                </Link>
                              </DropdownMenuItem>
                              <DropdownMenuItem asChild>
                                <Link href={`/admin/courses/${course.id}/edit`}>
                                  <Edit className="mr-2 h-4 w-4" />
                                  Edit
                                </Link>
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                onClick={() => toggleCourseStatus(course.id, course.isActive, course.title)}
                              >
                                <Settings className="mr-2 h-4 w-4" />
                                {course.isActive ? 'Deactivate' : 'Activate'}
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                onClick={() => deleteCourse(course.id, course.title)}
                                className="text-red-600"
                              >
                                <Trash2 className="mr-2 h-4 w-4" />
                                Delete
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      ))}

                      {filteredCourses.length === 0 && (
                        <div className="text-center py-8 text-muted-foreground">
                          <BookOpen className="w-12 h-12 mx-auto mb-4 opacity-50" />
                          <p>No courses found.</p>
                          {searchTerm && (
                            <p className="text-sm">Try adjusting your search criteria.</p>
                          )}
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Users Tab */}
              <TabsContent value="users" className="mt-6">
                <Card>
                  <CardHeader>
                    <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
                      <div>
                        <CardTitle>User Management</CardTitle>
                        <CardDescription>
                          View and manage registered users
                        </CardDescription>
                      </div>
                      <div className="relative w-full lg:w-auto">
                        <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input
                          placeholder="Search users..."
                          className="pl-10 w-full sm:w-64"
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                        />
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {filteredUsers.map((user) => (
                        <div
                          key={user.id}
                          className="flex flex-col sm:flex-row items-start sm:items-center gap-4 p-4 border rounded-lg hover:bg-muted/50 transition-colors"
                        >
                          <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                            <Users className="w-6 h-6 text-primary" />
                          </div>
                          <div className="flex-1">
                            <h3 className="font-semibold">{user.fullName}</h3>
                            <p className="text-sm text-muted-foreground">{user.email}</p>
                            <p className="text-sm text-muted-foreground">
                              {user.location && `${user.location} • `}
                              Joined {new Date(user.createdAt).toLocaleDateString()}
                            </p>
                          </div>
                          <div className="text-left sm:text-right w-full sm:w-auto">
                            <Badge
                              variant={user.isVerified ? 'default' : 'secondary'}
                              className="mb-2 sm:mb-1"
                            >
                              {user.isVerified ? 'Verified' : 'Pending'}
                            </Badge>
                            <p className="text-sm text-muted-foreground">
                              {user.enrolledCourses?.length || 0} courses
                            </p>
                            {user.credits > 0 && (
                              <p className="text-sm text-green-600">
                                ₹{user.credits} credits
                              </p>
                            )}
                          </div>
                        </div>
                      ))}

                      {filteredUsers.length === 0 && (
                        <div className="text-center py-8 text-muted-foreground">
                          <Users className="w-12 h-12 mx-auto mb-4 opacity-50" />
                          <p>No users found.</p>
                          {searchTerm && (
                            <p className="text-sm">Try adjusting your search criteria.</p>
                          )}
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Orders Tab */}
              <TabsContent value="orders" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Recent Orders</CardTitle>
                    <CardDescription>
                      Track course purchases and payments
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {recentOrders.map((order) => (
                        <div
                          key={order.id}
                          className="flex flex-col sm:flex-row items-start sm:items-center gap-4 p-4 border rounded-lg hover:bg-muted/50 transition-colors"
                        >
                          <div className="w-12 h-12 bg-green-50 dark:bg-green-950 rounded-full flex items-center justify-center">
                            <DollarSign className="w-6 h-6 text-green-600" />
                          </div>
                          <div className="flex-1">
                            <h3 className="font-semibold">{order.courseName}</h3>
                            <p className="text-sm text-muted-foreground">
                              by {order.userName}
                            </p>
                            <p className="text-sm text-muted-foreground">
                              {new Date(order.createdAt).toLocaleDateString()}
                            </p>
                          </div>
                          <div className="text-left sm:text-right w-full sm:w-auto">
                            <p className="font-semibold mb-1">₹{order.amount}</p>
                            <Badge
                              variant={
                                order.status === 'completed'
                                  ? 'default'
                                  : order.status === 'pending'
                                    ? 'secondary'
                                    : 'destructive'
                              }
                            >
                              {order.status}
                            </Badge>
                          </div>
                        </div>
                      ))}

                      {recentOrders.length === 0 && (
                        <div className="text-center py-8 text-muted-foreground">
                          <DollarSign className="w-12 h-12 mx-auto mb-4 opacity-50" />
                          <p>No recent orders found.</p>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Admins Tab */}
              <TabsContent value="admins" className="mt-6">
                <Card>
                  <CardHeader>
                    <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
                      <div>
                        <CardTitle>Administrator Overview</CardTitle>
                        <CardDescription>
                          Quick view of admin accounts and recent activity
                        </CardDescription>
                      </div>
                      <Link href="/admin/admins" className="w-full lg:w-auto">
                        <Button className="flex items-center gap-2 w-full">
                          <Shield className="w-4 h-4" />
                          Manage All Admins
                        </Button>
                      </Link>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid sm:grid-cols-2 gap-6 mb-6">
                      <div className="p-4 bg-purple-50 dark:bg-purple-950/50 rounded-lg">
                        <div className="flex items-center gap-3">
                          <Shield className="w-8 h-8 text-purple-600" />
                          <div>
                            <p className="text-2xl font-bold">{stats.totalAdmins || 0}</p>
                            <p className="text-sm text-muted-foreground">Total Administrators</p>
                          </div>
                        </div>
                      </div>
                      <div className="p-4 bg-green-50 dark:bg-green-950/50 rounded-lg">
                        <div className="flex items-center gap-3">
                          <UserPlus className="w-8 h-8 text-green-600" />
                          <div>
                            <p className="text-2xl font-bold">{stats.activeAdmins || 0}</p>
                            <p className="text-sm text-muted-foreground">Active Administrators</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <h4 className="font-semibold">Recent Admin Activity</h4>
                      {recentAdmins.slice(0, 3).map((admin) => (
                        <div
                          key={admin.id}
                          className="flex items-center gap-4 p-3 border rounded-lg"
                        >
                          <div className="w-10 h-10 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center">
                            <Shield className="w-5 h-5 text-purple-600" />
                          </div>
                          <div className="flex-1">
                            <h5 className="font-medium">{admin.fullName}</h5>
                            <p className="text-sm text-muted-foreground">{admin.email}</p>
                          </div>
                          <Badge variant={admin.isActive ? 'default' : 'secondary'}>
                            {admin.isActive ? 'Active' : 'Inactive'}
                          </Badge>
                        </div>
                      ))}

                      {recentAdmins.length === 0 && (
                        <div className="text-center py-6 text-muted-foreground">
                          <Shield className="w-8 h-8 mx-auto mb-2 opacity-50" />
                          <p className="text-sm">No admin data available</p>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Analytics Tab */}
              <TabsContent value="analytics" className="mt-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Revenue Overview</CardTitle>
                      <CardDescription>
                        Monthly revenue and growth trends
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="h-64 flex flex-col items-center justify-center text-muted-foreground">
                        <BarChart3 className="w-12 h-12 mb-4" />
                        <p>Revenue chart integration coming soon</p>
                        <p className="text-sm">Connect with analytics service</p>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Course Performance</CardTitle>
                      <CardDescription>
                        Top performing courses by enrollment
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {courses.slice(0, 5).map((course, index) => (
                          <div key={course.id} className="flex items-center gap-3">
                            <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-sm font-medium">
                              {index + 1}
                            </div>
                            <div className="flex-1">
                              <p className="font-medium text-sm">{course.title}</p>
                              <p className="text-xs text-muted-foreground">
                                {course.enrolledCount || 0} students
                              </p>
                            </div>
                            <Badge variant="outline">
                              ₹{course.price}
                            </Badge>
                          </div>
                        ))}

                        {courses.length === 0 && (
                          <div className="text-center py-6 text-muted-foreground">
                            <BookOpen className="w-8 h-8 mx-auto mb-2 opacity-50" />
                            <p className="text-sm">No course data available</p>
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
            </Tabs>
          </motion.div>
        </div>
      </main>
    </div>
  );
}