// // // // // // // // // 'use client';

// // // // // // // // // import { useState } from 'react';
// // // // // // // // // import { motion } from 'framer-motion';
// // // // // // // // // import { useRouter } from 'next/navigation';
// // // // // // // // // import { ArrowLeft, Plus, Trash2, Upload, Link as LinkIcon } from 'lucide-react';
// // // // // // // // // import { Button } from '@/components/ui/button';
// // // // // // // // // import { Input } from '@/components/ui/input';
// // // // // // // // // import { Label } from '@/components/ui/label';
// // // // // // // // // import { Textarea } from '@/components/ui/textarea';
// // // // // // // // // import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
// // // // // // // // // import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
// // // // // // // // // import { Badge } from '@/components/ui/badge';
// // // // // // // // // import { Separator } from '@/components/ui/separator';
// // // // // // // // // import { toast } from 'sonner';
// // // // // // // // // import Link from 'next/link';
// // // // // // // // // import Navbar from '@/components/navbar';

// // // // // // // // // const categories = [
// // // // // // // // //   'Web Development',
// // // // // // // // //   'Data Science',
// // // // // // // // //   'Digital Marketing',
// // // // // // // // //   'Mobile Development',
// // // // // // // // //   'UI/UX Design',
// // // // // // // // //   'Business',
// // // // // // // // //   'AI & Machine Learning',
// // // // // // // // //   'Cybersecurity'
// // // // // // // // // ];

// // // // // // // // // const levels = ['Beginner', 'Intermediate', 'Advanced'];

// // // // // // // // // export default function CreateCoursePage() {
// // // // // // // // //   const [courseData, setCourseData] = useState({
// // // // // // // // //     title: '',
// // // // // // // // //     description: '',
// // // // // // // // //     category: '',
// // // // // // // // //     level: '',
// // // // // // // // //     price: '',
// // // // // // // // //     originalPrice: '',
// // // // // // // // //     duration: '',
// // // // // // // // //     thumbnail: '',
// // // // // // // // //     features: [],
// // // // // // // // //     learningOutcomes: []
// // // // // // // // //   });

// // // // // // // // //   const [courseContent, setCourseContent] = useState([]);
// // // // // // // // //   const [newFeature, setNewFeature] = useState('');
// // // // // // // // //   const [newOutcome, setNewOutcome] = useState('');
// // // // // // // // //   const [isLoading, setIsLoading] = useState(false);
// // // // // // // // //   const [thumbnailFile, setThumbnailFile] = useState(null);
// // // // // // // // //   const router = useRouter();

// // // // // // // // //   const handleInputChange = (field, value) => {
// // // // // // // // //     setCourseData(prev => ({
// // // // // // // // //       ...prev,
// // // // // // // // //       [field]: value
// // // // // // // // //     }));
// // // // // // // // //   };

// // // // // // // // //   const addFeature = () => {
// // // // // // // // //     if (newFeature.trim()) {
// // // // // // // // //       setCourseData(prev => ({
// // // // // // // // //         ...prev,
// // // // // // // // //         features: [...prev.features, newFeature.trim()]
// // // // // // // // //       }));
// // // // // // // // //       setNewFeature('');
// // // // // // // // //     }
// // // // // // // // //   };

// // // // // // // // //   const removeFeature = (index) => {
// // // // // // // // //     setCourseData(prev => ({
// // // // // // // // //       ...prev,
// // // // // // // // //       features: prev.features.filter((_, i) => i !== index)
// // // // // // // // //     }));
// // // // // // // // //   };

// // // // // // // // //   const addOutcome = () => {
// // // // // // // // //     if (newOutcome.trim()) {
// // // // // // // // //       setCourseData(prev => ({
// // // // // // // // //         ...prev,
// // // // // // // // //         learningOutcomes: [...prev.learningOutcomes, newOutcome.trim()]
// // // // // // // // //       }));
// // // // // // // // //       setNewOutcome('');
// // // // // // // // //     }
// // // // // // // // //   };

// // // // // // // // //   const removeOutcome = (index) => {
// // // // // // // // //     setCourseData(prev => ({
// // // // // // // // //       ...prev,
// // // // // // // // //       learningOutcomes: prev.learningOutcomes.filter((_, i) => i !== index)
// // // // // // // // //     }));
// // // // // // // // //   };

// // // // // // // // //   const addContentSection = () => {
// // // // // // // // //     setCourseContent(prev => [...prev, {
// // // // // // // // //       id: Date.now(),
// // // // // // // // //       title: '',
// // // // // // // // //       description: '',
// // // // // // // // //       videoUrl: '',
// // // // // // // // //       resources: []
// // // // // // // // //     }]);
// // // // // // // // //   };

// // // // // // // // //   const updateContentSection = (id, field, value) => {
// // // // // // // // //     setCourseContent(prev => prev.map(section =>
// // // // // // // // //       section.id === id ? { ...section, [field]: value } : section
// // // // // // // // //     ));
// // // // // // // // //   };

// // // // // // // // //   const removeContentSection = (id) => {
// // // // // // // // //     setCourseContent(prev => prev.filter(section => section.id !== id));
// // // // // // // // //   };

// // // // // // // // //   const handleThumbnailUpload = async (file) => {
// // // // // // // // //     if (!file) return null;

// // // // // // // // //     const formData = new FormData();
// // // // // // // // //     formData.append('file', file);
// // // // // // // // //     formData.append('upload_preset', 'course_thumbnails');

// // // // // // // // //     try {
// // // // // // // // //       const response = await fetch(
// // // // // // // // //         `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
// // // // // // // // //         {
// // // // // // // // //           method: 'POST',
// // // // // // // // //           body: formData,
// // // // // // // // //         }
// // // // // // // // //       );

// // // // // // // // //       const data = await response.json();
// // // // // // // // //       return data.secure_url;
// // // // // // // // //     } catch (error) {
// // // // // // // // //       console.error('Thumbnail upload error:', error);
// // // // // // // // //       toast.error('Failed to upload thumbnail');
// // // // // // // // //       return null;
// // // // // // // // //     }
// // // // // // // // //   };

// // // // // // // // //   const handleSubmit = async (e) => {
// // // // // // // // //     e.preventDefault();

// // // // // // // // //     if (!courseData.title || !courseData.description || !courseData.category || !courseData.level || !courseData.price) {
// // // // // // // // //       toast.error('Please fill in all required fields');
// // // // // // // // //       return;
// // // // // // // // //     }

// // // // // // // // //     setIsLoading(true);

// // // // // // // // //     try {
// // // // // // // // //       let thumbnailUrl = courseData.thumbnail;

// // // // // // // // //       // Upload thumbnail if file is selected
// // // // // // // // //       if (thumbnailFile) {
// // // // // // // // //         thumbnailUrl = await handleThumbnailUpload(thumbnailFile);
// // // // // // // // //         if (!thumbnailUrl) {
// // // // // // // // //           setIsLoading(false);
// // // // // // // // //           return;
// // // // // // // // //         }
// // // // // // // // //       }

// // // // // // // // //       const response = await fetch('/api/admin/courses/create', {
// // // // // // // // //         method: 'POST',
// // // // // // // // //         headers: {
// // // // // // // // //           'Content-Type': 'application/json',
// // // // // // // // //           'Authorization': `Bearer ${document.cookie.split('auth-token=')[1]?.split(';')[0]}`,
// // // // // // // // //         },
// // // // // // // // //         body: JSON.stringify({
// // // // // // // // //           ...courseData,
// // // // // // // // //           thumbnail: thumbnailUrl,
// // // // // // // // //           content: courseContent,
// // // // // // // // //           price: parseFloat(courseData.price),
// // // // // // // // //           originalPrice: courseData.originalPrice ? parseFloat(courseData.originalPrice) : null,
// // // // // // // // //         }),
// // // // // // // // //       });

// // // // // // // // //       const data = await response.json();

// // // // // // // // //       if (response.ok) {
// // // // // // // // //         toast.success('Course created successfully!');
// // // // // // // // //         router.push('/admin');
// // // // // // // // //       } else {
// // // // // // // // //         toast.error(data.message || 'Failed to create course');
// // // // // // // // //       }
// // // // // // // // //     } catch (error) {
// // // // // // // // //       console.error('Course creation error:', error);
// // // // // // // // //       toast.error('Something went wrong. Please try again.');
// // // // // // // // //     } finally {
// // // // // // // // //       setIsLoading(false);
// // // // // // // // //     }
// // // // // // // // //   };

// // // // // // // // //   return (
// // // // // // // // //     <div className="min-h-screen bg-background">
// // // // // // // // //       <Navbar />

// // // // // // // // //       <main className="pt-20 pb-12">
// // // // // // // // //         <div className="container mx-auto px-4 max-w-4xl">
// // // // // // // // //           {/* Header */}
// // // // // // // // //           <motion.div
// // // // // // // // //             className="flex items-center gap-4 mb-8"
// // // // // // // // //             initial={{ opacity: 0, y: 20 }}
// // // // // // // // //             animate={{ opacity: 1, y: 0 }}
// // // // // // // // //             transition={{ duration: 0.6 }}
// // // // // // // // //           >
// // // // // // // // //             <Link href="/admin">
// // // // // // // // //               <Button variant="outline" size="icon">
// // // // // // // // //                 <ArrowLeft className="w-4 h-4" />
// // // // // // // // //               </Button>
// // // // // // // // //             </Link>
// // // // // // // // //             <div>
// // // // // // // // //               <h1 className="text-3xl font-bold">Create New Course</h1>
// // // // // // // // //               <p className="text-muted-foreground">
// // // // // // // // //                 Add a new course to your platform with content and resources.
// // // // // // // // //               </p>
// // // // // // // // //             </div>
// // // // // // // // //           </motion.div>

// // // // // // // // //           <form onSubmit={handleSubmit} className="space-y-8">
// // // // // // // // //             {/* Basic Information */}
// // // // // // // // //             <motion.div
// // // // // // // // //               initial={{ opacity: 0, y: 20 }}
// // // // // // // // //               animate={{ opacity: 1, y: 0 }}
// // // // // // // // //               transition={{ duration: 0.6, delay: 0.1 }}
// // // // // // // // //             >
// // // // // // // // //               <Card>
// // // // // // // // //                 <CardHeader>
// // // // // // // // //                   <CardTitle>Basic Information</CardTitle>
// // // // // // // // //                 </CardHeader>
// // // // // // // // //                 <CardContent className="space-y-6">
// // // // // // // // //                   <div className="grid md:grid-cols-2 gap-6">
// // // // // // // // //                     <div className="space-y-2">
// // // // // // // // //                       <Label htmlFor="title">Course Title *</Label>
// // // // // // // // //                       <Input
// // // // // // // // //                         id="title"
// // // // // // // // //                         placeholder="Enter course title"
// // // // // // // // //                         value={courseData.title}
// // // // // // // // //                         onChange={(e) => handleInputChange('title', e.target.value)}
// // // // // // // // //                         required
// // // // // // // // //                       />
// // // // // // // // //                     </div>
// // // // // // // // //                     <div className="space-y-2">
// // // // // // // // //                       <Label htmlFor="duration">Duration *</Label>
// // // // // // // // //                       <Input
// // // // // // // // //                         id="duration"
// // // // // // // // //                         placeholder="e.g., 40 hours"
// // // // // // // // //                         value={courseData.duration}
// // // // // // // // //                         onChange={(e) => handleInputChange('duration', e.target.value)}
// // // // // // // // //                         required
// // // // // // // // //                       />
// // // // // // // // //                     </div>
// // // // // // // // //                   </div>

// // // // // // // // //                   <div className="space-y-2">
// // // // // // // // //                     <Label htmlFor="description">Description *</Label>
// // // // // // // // //                     <Textarea
// // // // // // // // //                       id="description"
// // // // // // // // //                       placeholder="Describe what students will learn in this course"
// // // // // // // // //                       rows={4}
// // // // // // // // //                       value={courseData.description}
// // // // // // // // //                       onChange={(e) => handleInputChange('description', e.target.value)}
// // // // // // // // //                       required
// // // // // // // // //                     />
// // // // // // // // //                   </div>

// // // // // // // // //                   <div className="grid md:grid-cols-2 gap-6">
// // // // // // // // //                     <div className="space-y-2">
// // // // // // // // //                       <Label htmlFor="category">Category *</Label>
// // // // // // // // //                       <Select onValueChange={(value) => handleInputChange('category', value)}>
// // // // // // // // //                         <SelectTrigger>
// // // // // // // // //                           <SelectValue placeholder="Select category" />
// // // // // // // // //                         </SelectTrigger>
// // // // // // // // //                         <SelectContent>
// // // // // // // // //                           {categories.map((category) => (
// // // // // // // // //                             <SelectItem key={category} value={category}>
// // // // // // // // //                               {category}
// // // // // // // // //                             </SelectItem>
// // // // // // // // //                           ))}
// // // // // // // // //                         </SelectContent>
// // // // // // // // //                       </Select>
// // // // // // // // //                     </div>
// // // // // // // // //                     <div className="space-y-2">
// // // // // // // // //                       <Label htmlFor="level">Level *</Label>
// // // // // // // // //                       <Select onValueChange={(value) => handleInputChange('level', value)}>
// // // // // // // // //                         <SelectTrigger>
// // // // // // // // //                           <SelectValue placeholder="Select level" />
// // // // // // // // //                         </SelectTrigger>
// // // // // // // // //                         <SelectContent>
// // // // // // // // //                           {levels.map((level) => (
// // // // // // // // //                             <SelectItem key={level} value={level}>
// // // // // // // // //                               {level}
// // // // // // // // //                             </SelectItem>
// // // // // // // // //                           ))}
// // // // // // // // //                         </SelectContent>
// // // // // // // // //                       </Select>
// // // // // // // // //                     </div>
// // // // // // // // //                   </div>

// // // // // // // // //                   <div className="grid md:grid-cols-2 gap-6">
// // // // // // // // //                     <div className="space-y-2">
// // // // // // // // //                       <Label htmlFor="price">Price (₹) *</Label>
// // // // // // // // //                       <Input
// // // // // // // // //                         id="price"
// // // // // // // // //                         type="number"
// // // // // // // // //                         placeholder="2999"
// // // // // // // // //                         value={courseData.price}
// // // // // // // // //                         onChange={(e) => handleInputChange('price', e.target.value)}
// // // // // // // // //                         required
// // // // // // // // //                       />
// // // // // // // // //                     </div>
// // // // // // // // //                     <div className="space-y-2">
// // // // // // // // //                       <Label htmlFor="originalPrice">Original Price (₹)</Label>
// // // // // // // // //                       <Input
// // // // // // // // //                         id="originalPrice"
// // // // // // // // //                         type="number"
// // // // // // // // //                         placeholder="5999"
// // // // // // // // //                         value={courseData.originalPrice}
// // // // // // // // //                         onChange={(e) => handleInputChange('originalPrice', e.target.value)}
// // // // // // // // //                       />
// // // // // // // // //                     </div>
// // // // // // // // //                   </div>
// // // // // // // // //                 </CardContent>
// // // // // // // // //               </Card>
// // // // // // // // //             </motion.div>

// // // // // // // // //             {/* Thumbnail */}
// // // // // // // // //             <motion.div
// // // // // // // // //               initial={{ opacity: 0, y: 20 }}
// // // // // // // // //               animate={{ opacity: 1, y: 0 }}
// // // // // // // // //               transition={{ duration: 0.6, delay: 0.2 }}
// // // // // // // // //             >
// // // // // // // // //               <Card>
// // // // // // // // //                 <CardHeader>
// // // // // // // // //                   <CardTitle>Course Thumbnail</CardTitle>
// // // // // // // // //                 </CardHeader>
// // // // // // // // //                 <CardContent className="space-y-4">
// // // // // // // // //                   <div className="space-y-2">
// // // // // // // // //                     <Label htmlFor="thumbnail-file">Upload Thumbnail</Label>
// // // // // // // // //                     <Input
// // // // // // // // //                       id="thumbnail-file"
// // // // // // // // //                       type="file"
// // // // // // // // //                       accept="image/*"
// // // // // // // // //                       onChange={(e) => setThumbnailFile(e.target.files[0])}
// // // // // // // // //                     />
// // // // // // // // //                   </div>
// // // // // // // // //                   <div className="text-center text-muted-foreground">OR</div>
// // // // // // // // //                   <div className="space-y-2">
// // // // // // // // //                     <Label htmlFor="thumbnail-url">Thumbnail URL</Label>
// // // // // // // // //                     <Input
// // // // // // // // //                       id="thumbnail-url"
// // // // // // // // //                       placeholder="https://example.com/image.jpg"
// // // // // // // // //                       value={courseData.thumbnail}
// // // // // // // // //                       onChange={(e) => handleInputChange('thumbnail', e.target.value)}
// // // // // // // // //                     />
// // // // // // // // //                   </div>
// // // // // // // // //                 </CardContent>
// // // // // // // // //               </Card>
// // // // // // // // //             </motion.div>

// // // // // // // // //             {/* Features */}
// // // // // // // // //             <motion.div
// // // // // // // // //               initial={{ opacity: 0, y: 20 }}
// // // // // // // // //               animate={{ opacity: 1, y: 0 }}
// // // // // // // // //               transition={{ duration: 0.6, delay: 0.3 }}
// // // // // // // // //             >
// // // // // // // // //               <Card>
// // // // // // // // //                 <CardHeader>
// // // // // // // // //                   <CardTitle>Course Features</CardTitle>
// // // // // // // // //                 </CardHeader>
// // // // // // // // //                 <CardContent className="space-y-4">
// // // // // // // // //                   <div className="flex gap-2">
// // // // // // // // //                     <Input
// // // // // // // // //                       placeholder="Add a course feature"
// // // // // // // // //                       value={newFeature}
// // // // // // // // //                       onChange={(e) => setNewFeature(e.target.value)}
// // // // // // // // //                       onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addFeature())}
// // // // // // // // //                     />
// // // // // // // // //                     <Button type="button" onClick={addFeature}>
// // // // // // // // //                       <Plus className="w-4 h-4" />
// // // // // // // // //                     </Button>
// // // // // // // // //                   </div>
// // // // // // // // //                   <div className="flex flex-wrap gap-2">
// // // // // // // // //                     {courseData.features.map((feature, index) => (
// // // // // // // // //                       <Badge key={index} variant="secondary" className="flex items-center gap-2">
// // // // // // // // //                         {feature}
// // // // // // // // //                         <button
// // // // // // // // //                           type="button"
// // // // // // // // //                           onClick={() => removeFeature(index)}
// // // // // // // // //                           className="text-xs hover:text-destructive"
// // // // // // // // //                         >
// // // // // // // // //                           ×
// // // // // // // // //                         </button>
// // // // // // // // //                       </Badge>
// // // // // // // // //                     ))}
// // // // // // // // //                   </div>
// // // // // // // // //                 </CardContent>
// // // // // // // // //               </Card>
// // // // // // // // //             </motion.div>

// // // // // // // // //             {/* Learning Outcomes */}
// // // // // // // // //             <motion.div
// // // // // // // // //               initial={{ opacity: 0, y: 20 }}
// // // // // // // // //               animate={{ opacity: 1, y: 0 }}
// // // // // // // // //               transition={{ duration: 0.6, delay: 0.4 }}
// // // // // // // // //             >
// // // // // // // // //               <Card>
// // // // // // // // //                 <CardHeader>
// // // // // // // // //                   <CardTitle>Learning Outcomes</CardTitle>
// // // // // // // // //                 </CardHeader>
// // // // // // // // //                 <CardContent className="space-y-4">
// // // // // // // // //                   <div className="flex gap-2">
// // // // // // // // //                     <Input
// // // // // // // // //                       placeholder="What will students learn?"
// // // // // // // // //                       value={newOutcome}
// // // // // // // // //                       onChange={(e) => setNewOutcome(e.target.value)}
// // // // // // // // //                       onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addOutcome())}
// // // // // // // // //                     />
// // // // // // // // //                     <Button type="button" onClick={addOutcome}>
// // // // // // // // //                       <Plus className="w-4 h-4" />
// // // // // // // // //                     </Button>
// // // // // // // // //                   </div>
// // // // // // // // //                   <div className="space-y-2">
// // // // // // // // //                     {courseData.learningOutcomes.map((outcome, index) => (
// // // // // // // // //                       <div key={index} className="flex items-center gap-2 p-2 bg-muted rounded">
// // // // // // // // //                         <span className="flex-1">{outcome}</span>
// // // // // // // // //                         <Button
// // // // // // // // //                           type="button"
// // // // // // // // //                           variant="ghost"
// // // // // // // // //                           size="sm"
// // // // // // // // //                           onClick={() => removeOutcome(index)}
// // // // // // // // //                         >
// // // // // // // // //                           <Trash2 className="w-4 h-4" />
// // // // // // // // //                         </Button>
// // // // // // // // //                       </div>
// // // // // // // // //                     ))}
// // // // // // // // //                   </div>
// // // // // // // // //                 </CardContent>
// // // // // // // // //               </Card>
// // // // // // // // //             </motion.div>

// // // // // // // // //             {/* Course Content */}
// // // // // // // // //             <motion.div
// // // // // // // // //               initial={{ opacity: 0, y: 20 }}
// // // // // // // // //               animate={{ opacity: 1, y: 0 }}
// // // // // // // // //               transition={{ duration: 0.6, delay: 0.5 }}
// // // // // // // // //             >
// // // // // // // // //               <Card>
// // // // // // // // //                 <CardHeader>
// // // // // // // // //                   <div className="flex items-center justify-between">
// // // // // // // // //                     <CardTitle>Course Content</CardTitle>
// // // // // // // // //                     <Button type="button" onClick={addContentSection} variant="outline">
// // // // // // // // //                       <Plus className="w-4 h-4 mr-2" />
// // // // // // // // //                       Add Section
// // // // // // // // //                     </Button>
// // // // // // // // //                   </div>
// // // // // // // // //                 </CardHeader>
// // // // // // // // //                 <CardContent className="space-y-6">
// // // // // // // // //                   {courseContent.map((section, index) => (
// // // // // // // // //                     <div key={section.id} className="border rounded-lg p-4 space-y-4">
// // // // // // // // //                       <div className="flex items-center justify-between">
// // // // // // // // //                         <h4 className="font-medium">Section {index + 1}</h4>
// // // // // // // // //                         <Button
// // // // // // // // //                           type="button"
// // // // // // // // //                           variant="ghost"
// // // // // // // // //                           size="sm"
// // // // // // // // //                           onClick={() => removeContentSection(section.id)}
// // // // // // // // //                         >
// // // // // // // // //                           <Trash2 className="w-4 h-4" />
// // // // // // // // //                         </Button>
// // // // // // // // //                       </div>

// // // // // // // // //                       <div className="grid md:grid-cols-2 gap-4">
// // // // // // // // //                         <div className="space-y-2">
// // // // // // // // //                           <Label>Section Title</Label>
// // // // // // // // //                           <Input
// // // // // // // // //                             placeholder="Enter section title"
// // // // // // // // //                             value={section.title}
// // // // // // // // //                             onChange={(e) => updateContentSection(section.id, 'title', e.target.value)}
// // // // // // // // //                           />
// // // // // // // // //                         </div>
// // // // // // // // //                         <div className="space-y-2">
// // // // // // // // //                           <Label>Video URL</Label>
// // // // // // // // //                           <div className="relative">
// // // // // // // // //                             <LinkIcon className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
// // // // // // // // //                             <Input
// // // // // // // // //                               placeholder="YouTube video URL"
// // // // // // // // //                               value={section.videoUrl}
// // // // // // // // //                               onChange={(e) => updateContentSection(section.id, 'videoUrl', e.target.value)}
// // // // // // // // //                               className="pl-10"
// // // // // // // // //                             />
// // // // // // // // //                           </div>
// // // // // // // // //                         </div>
// // // // // // // // //                       </div>

// // // // // // // // //                       <div className="space-y-2">
// // // // // // // // //                         <Label>Section Description</Label>
// // // // // // // // //                         <Textarea
// // // // // // // // //                           placeholder="Describe what this section covers"
// // // // // // // // //                           rows={3}
// // // // // // // // //                           value={section.description}
// // // // // // // // //                           onChange={(e) => updateContentSection(section.id, 'description', e.target.value)}
// // // // // // // // //                         />
// // // // // // // // //                       </div>
// // // // // // // // //                     </div>
// // // // // // // // //                   ))}

// // // // // // // // //                   {courseContent.length === 0 && (
// // // // // // // // //                     <div className="text-center py-8 text-muted-foreground">
// // // // // // // // //                       <p>No content sections added yet.</p>
// // // // // // // // //                       <p className="text-sm">Click "Add Section" to start building your course content.</p>
// // // // // // // // //                     </div>
// // // // // // // // //                   )}
// // // // // // // // //                 </CardContent>
// // // // // // // // //               </Card>
// // // // // // // // //             </motion.div>

// // // // // // // // //             {/* Submit Button */}
// // // // // // // // //             <motion.div
// // // // // // // // //               className="flex justify-end gap-4"
// // // // // // // // //               initial={{ opacity: 0, y: 20 }}
// // // // // // // // //               animate={{ opacity: 1, y: 0 }}
// // // // // // // // //               transition={{ duration: 0.6, delay: 0.6 }}
// // // // // // // // //             >
// // // // // // // // //               <Link href="/admin">
// // // // // // // // //                 <Button type="button" variant="outline">
// // // // // // // // //                   Cancel
// // // // // // // // //                 </Button>
// // // // // // // // //               </Link>
// // // // // // // // //               <Button type="submit" disabled={isLoading} className="bg-purple-600 hover:bg-purple-700">
// // // // // // // // //                 {isLoading ? 'Creating Course...' : 'Create Course'}
// // // // // // // // //               </Button>
// // // // // // // // //             </motion.div>
// // // // // // // // //           </form>
// // // // // // // // //         </div>
// // // // // // // // //       </main>
// // // // // // // // //     </div>
// // // // // // // // //   );
// // // // // // // // // }
// // // // // // // // 'use client';

// // // // // // // // import { useState } from 'react';
// // // // // // // // import { motion } from 'framer-motion';
// // // // // // // // import { useRouter } from 'next/navigation';
// // // // // // // // import { ArrowLeft, Plus, Trash2, Upload, Link as LinkIcon } from 'lucide-react';
// // // // // // // // import { Button } from '@/components/ui/button';
// // // // // // // // import { Input } from '@/components/ui/input';
// // // // // // // // import { Label } from '@/components/ui/label';
// // // // // // // // import { Textarea } from '@/components/ui/textarea';
// // // // // // // // import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
// // // // // // // // import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
// // // // // // // // import { Badge } from '@/components/ui/badge';
// // // // // // // // import { toast } from 'sonner';
// // // // // // // // import Link from 'next/link';
// // // // // // // // import AdminNavbar from '@/components/admin-navbar';

// // // // // // // // const categories = [
// // // // // // // //   'Web Development',
// // // // // // // //   'Data Science',
// // // // // // // //   'Digital Marketing',
// // // // // // // //   'Mobile Development',
// // // // // // // //   'UI/UX Design',
// // // // // // // //   'Business',
// // // // // // // //   'AI & Machine Learning',
// // // // // // // //   'Cybersecurity'
// // // // // // // // ];

// // // // // // // // const levels = ['Beginner', 'Intermediate', 'Advanced'];

// // // // // // // // export default function CreateCoursePage() {
// // // // // // // //   const [courseData, setCourseData] = useState({
// // // // // // // //     title: '',
// // // // // // // //     description: '',
// // // // // // // //     category: '',
// // // // // // // //     level: '',
// // // // // // // //     price: '',
// // // // // // // //     originalPrice: '',
// // // // // // // //     duration: '',
// // // // // // // //     thumbnail: '',
// // // // // // // //     features: [],
// // // // // // // //     learningOutcomes: []
// // // // // // // //   });

// // // // // // // //   const [courseContent, setCourseContent] = useState([]);
// // // // // // // //   const [newFeature, setNewFeature] = useState('');
// // // // // // // //   const [newOutcome, setNewOutcome] = useState('');
// // // // // // // //   const [isLoading, setIsLoading] = useState(false);
// // // // // // // //   const [thumbnailFile, setThumbnailFile] = useState(null);
// // // // // // // //   const router = useRouter();

// // // // // // // //   const handleInputChange = (field, value) => {
// // // // // // // //     setCourseData(prev => ({
// // // // // // // //       ...prev,
// // // // // // // //       [field]: value
// // // // // // // //     }));
// // // // // // // //   };

// // // // // // // //   const addFeature = () => {
// // // // // // // //     if (newFeature.trim()) {
// // // // // // // //       setCourseData(prev => ({
// // // // // // // //         ...prev,
// // // // // // // //         features: [...prev.features, newFeature.trim()]
// // // // // // // //       }));
// // // // // // // //       setNewFeature('');
// // // // // // // //     }
// // // // // // // //   };

// // // // // // // //   const removeFeature = (index) => {
// // // // // // // //     setCourseData(prev => ({
// // // // // // // //       ...prev,
// // // // // // // //       features: prev.features.filter((_, i) => i !== index)
// // // // // // // //     }));
// // // // // // // //   };

// // // // // // // //   const addOutcome = () => {
// // // // // // // //     if (newOutcome.trim()) {
// // // // // // // //       setCourseData(prev => ({
// // // // // // // //         ...prev,
// // // // // // // //         learningOutcomes: [...prev.learningOutcomes, newOutcome.trim()]
// // // // // // // //       }));
// // // // // // // //       setNewOutcome('');
// // // // // // // //     }
// // // // // // // //   };

// // // // // // // //   const removeOutcome = (index) => {
// // // // // // // //     setCourseData(prev => ({
// // // // // // // //       ...prev,
// // // // // // // //       learningOutcomes: prev.learningOutcomes.filter((_, i) => i !== index)
// // // // // // // //     }));
// // // // // // // //   };

// // // // // // // //   const addContentSection = () => {
// // // // // // // //     setCourseContent(prev => [...prev, {
// // // // // // // //       id: Date.now(),
// // // // // // // //       title: '',
// // // // // // // //       description: '',
// // // // // // // //       videoUrl: '',
// // // // // // // //       resources: []
// // // // // // // //     }]);
// // // // // // // //   };

// // // // // // // //   const updateContentSection = (id, field, value) => {
// // // // // // // //     setCourseContent(prev => prev.map(section =>
// // // // // // // //       section.id === id ? { ...section, [field]: value } : section
// // // // // // // //     ));
// // // // // // // //   };

// // // // // // // //   const removeContentSection = (id) => {
// // // // // // // //     setCourseContent(prev => prev.filter(section => section.id !== id));
// // // // // // // //   };

// // // // // // // //   const handleThumbnailUpload = async (file) => {
// // // // // // // //     if (!file) return null;

// // // // // // // //     const formData = new FormData();
// // // // // // // //     formData.append('file', file);
// // // // // // // //     formData.append('upload_preset', 'course_thumbnails');

// // // // // // // //     try {
// // // // // // // //       const response = await fetch(
// // // // // // // //         `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
// // // // // // // //         {
// // // // // // // //           method: 'POST',
// // // // // // // //           body: formData,
// // // // // // // //         }
// // // // // // // //       );

// // // // // // // //       const data = await response.json();
// // // // // // // //       return data.secure_url;
// // // // // // // //     } catch (error) {
// // // // // // // //       console.error('Thumbnail upload error:', error);
// // // // // // // //       toast.error('Failed to upload thumbnail');
// // // // // // // //       return null;
// // // // // // // //     }
// // // // // // // //   };

// // // // // // // //   const handleSubmit = async () => {
// // // // // // // //     if (!courseData.title || !courseData.description || !courseData.category || !courseData.level || !courseData.price) {
// // // // // // // //       toast.error('Please fill in all required fields');
// // // // // // // //       return;
// // // // // // // //     }

// // // // // // // //     setIsLoading(true);

// // // // // // // //     try {
// // // // // // // //       let thumbnailUrl = courseData.thumbnail;

// // // // // // // //       // Upload thumbnail if file is selected
// // // // // // // //       if (thumbnailFile) {
// // // // // // // //         thumbnailUrl = await handleThumbnailUpload(thumbnailFile);
// // // // // // // //         if (!thumbnailUrl) {
// // // // // // // //           setIsLoading(false);
// // // // // // // //           return;
// // // // // // // //         }
// // // // // // // //       }

// // // // // // // //       const response = await fetch('/api/admin/courses/create', {
// // // // // // // //         method: 'POST',
// // // // // // // //         headers: {
// // // // // // // //           'Content-Type': 'application/json',
// // // // // // // //           'Authorization': `Bearer ${document.cookie.split('auth-token=')[1]?.split(';')[0]}`,
// // // // // // // //         },
// // // // // // // //         body: JSON.stringify({
// // // // // // // //           ...courseData,
// // // // // // // //           thumbnail: thumbnailUrl,
// // // // // // // //           content: courseContent,
// // // // // // // //           price: parseFloat(courseData.price),
// // // // // // // //           originalPrice: courseData.originalPrice ? parseFloat(courseData.originalPrice) : null,
// // // // // // // //         }),
// // // // // // // //       });

// // // // // // // //       const data = await response.json();

// // // // // // // //       if (response.ok) {
// // // // // // // //         toast.success('Course created successfully!');
// // // // // // // //         router.push('/admin');
// // // // // // // //       } else {
// // // // // // // //         toast.error(data.message || 'Failed to create course');
// // // // // // // //       }
// // // // // // // //     } catch (error) {
// // // // // // // //       console.error('Course creation error:', error);
// // // // // // // //       toast.error('Something went wrong. Please try again.');
// // // // // // // //     } finally {
// // // // // // // //       setIsLoading(false);
// // // // // // // //     }
// // // // // // // //   };

// // // // // // // //   return (
// // // // // // // //     <div className="min-h-screen bg-background">
// // // // // // // //       <AdminNavbar />

// // // // // // // //       <main className="pt-20 pb-12">
// // // // // // // //         <div className="container mx-auto px-4 max-w-4xl">
// // // // // // // //           {/* Header */}
// // // // // // // //           <motion.div
// // // // // // // //             className="flex items-center gap-4 mb-8"
// // // // // // // //             initial={{ opacity: 0, y: 20 }}
// // // // // // // //             animate={{ opacity: 1, y: 0 }}
// // // // // // // //             transition={{ duration: 0.6 }}
// // // // // // // //           >
// // // // // // // //             <Link href="/admin">
// // // // // // // //               <Button variant="outline" size="icon">
// // // // // // // //                 <ArrowLeft className="w-4 h-4" />
// // // // // // // //               </Button>
// // // // // // // //             </Link>
// // // // // // // //             <div>
// // // // // // // //               <h1 className="text-3xl font-bold">Create New Course</h1>
// // // // // // // //               <p className="text-muted-foreground">
// // // // // // // //                 Add a new course to your platform with content and resources.
// // // // // // // //               </p>
// // // // // // // //             </div>
// // // // // // // //           </motion.div>

// // // // // // // //           <div className="space-y-8">
// // // // // // // //             {/* Basic Information */}
// // // // // // // //             <motion.div
// // // // // // // //               initial={{ opacity: 0, y: 20 }}
// // // // // // // //               animate={{ opacity: 1, y: 0 }}
// // // // // // // //               transition={{ duration: 0.6, delay: 0.1 }}
// // // // // // // //             >
// // // // // // // //               <Card>
// // // // // // // //                 <CardHeader>
// // // // // // // //                   <CardTitle>Basic Information</CardTitle>
// // // // // // // //                 </CardHeader>
// // // // // // // //                 <CardContent className="space-y-6">
// // // // // // // //                   <div className="grid md:grid-cols-2 gap-6">
// // // // // // // //                     <div className="space-y-2">
// // // // // // // //                       <Label htmlFor="title">Course Title *</Label>
// // // // // // // //                       <Input
// // // // // // // //                         id="title"
// // // // // // // //                         placeholder="Enter course title"
// // // // // // // //                         value={courseData.title}
// // // // // // // //                         onChange={(e) => handleInputChange('title', e.target.value)}
// // // // // // // //                         required
// // // // // // // //                       />
// // // // // // // //                     </div>
// // // // // // // //                     <div className="space-y-2">
// // // // // // // //                       <Label htmlFor="duration">Duration *</Label>
// // // // // // // //                       <Input
// // // // // // // //                         id="duration"
// // // // // // // //                         placeholder="e.g., 40 hours"
// // // // // // // //                         value={courseData.duration}
// // // // // // // //                         onChange={(e) => handleInputChange('duration', e.target.value)}
// // // // // // // //                         required
// // // // // // // //                       />
// // // // // // // //                     </div>
// // // // // // // //                   </div>

// // // // // // // //                   <div className="space-y-2">
// // // // // // // //                     <Label htmlFor="description">Description *</Label>
// // // // // // // //                     <Textarea
// // // // // // // //                       id="description"
// // // // // // // //                       placeholder="Describe what students will learn in this course"
// // // // // // // //                       rows={4}
// // // // // // // //                       value={courseData.description}
// // // // // // // //                       onChange={(e) => handleInputChange('description', e.target.value)}
// // // // // // // //                       required
// // // // // // // //                     />
// // // // // // // //                   </div>

// // // // // // // //                   <div className="grid md:grid-cols-2 gap-6">
// // // // // // // //                     <div className="space-y-2">
// // // // // // // //                       <Label htmlFor="category">Category *</Label>
// // // // // // // //                       <Select onValueChange={(value) => handleInputChange('category', value)}>
// // // // // // // //                         <SelectTrigger>
// // // // // // // //                           <SelectValue placeholder="Select category" />
// // // // // // // //                         </SelectTrigger>
// // // // // // // //                         <SelectContent>
// // // // // // // //                           {categories.map((category) => (
// // // // // // // //                             <SelectItem key={category} value={category}>
// // // // // // // //                               {category}
// // // // // // // //                             </SelectItem>
// // // // // // // //                           ))}
// // // // // // // //                         </SelectContent>
// // // // // // // //                       </Select>
// // // // // // // //                     </div>
// // // // // // // //                     <div className="space-y-2">
// // // // // // // //                       <Label htmlFor="level">Level *</Label>
// // // // // // // //                       <Select onValueChange={(value) => handleInputChange('level', value)}>
// // // // // // // //                         <SelectTrigger>
// // // // // // // //                           <SelectValue placeholder="Select level" />
// // // // // // // //                         </SelectTrigger>
// // // // // // // //                         <SelectContent>
// // // // // // // //                           {levels.map((level) => (
// // // // // // // //                             <SelectItem key={level} value={level}>
// // // // // // // //                               {level}
// // // // // // // //                             </SelectItem>
// // // // // // // //                           ))}
// // // // // // // //                         </SelectContent>
// // // // // // // //                       </Select>
// // // // // // // //                     </div>
// // // // // // // //                   </div>

// // // // // // // //                   <div className="grid md:grid-cols-2 gap-6">
// // // // // // // //                     <div className="space-y-2">
// // // // // // // //                       <Label htmlFor="price">Price (₹) *</Label>
// // // // // // // //                       <Input
// // // // // // // //                         id="price"
// // // // // // // //                         type="number"
// // // // // // // //                         placeholder="2999"
// // // // // // // //                         value={courseData.price}
// // // // // // // //                         onChange={(e) => handleInputChange('price', e.target.value)}
// // // // // // // //                         required
// // // // // // // //                       />
// // // // // // // //                     </div>
// // // // // // // //                     <div className="space-y-2">
// // // // // // // //                       <Label htmlFor="originalPrice">Original Price (₹)</Label>
// // // // // // // //                       <Input
// // // // // // // //                         id="originalPrice"
// // // // // // // //                         type="number"
// // // // // // // //                         placeholder="5999"
// // // // // // // //                         value={courseData.originalPrice}
// // // // // // // //                         onChange={(e) => handleInputChange('originalPrice', e.target.value)}
// // // // // // // //                       />
// // // // // // // //                     </div>
// // // // // // // //                   </div>
// // // // // // // //                 </CardContent>
// // // // // // // //               </Card>
// // // // // // // //             </motion.div>

// // // // // // // //             {/* Thumbnail */}
// // // // // // // //             <motion.div
// // // // // // // //               initial={{ opacity: 0, y: 20 }}
// // // // // // // //               animate={{ opacity: 1, y: 0 }}
// // // // // // // //               transition={{ duration: 0.6, delay: 0.2 }}
// // // // // // // //             >
// // // // // // // //               <Card>
// // // // // // // //                 <CardHeader>
// // // // // // // //                   <CardTitle>Course Thumbnail</CardTitle>
// // // // // // // //                 </CardHeader>
// // // // // // // //                 <CardContent className="space-y-4">
// // // // // // // //                   <div className="space-y-2">
// // // // // // // //                     <Label htmlFor="thumbnail-file">Upload Thumbnail</Label>
// // // // // // // //                     <Input
// // // // // // // //                       id="thumbnail-file"
// // // // // // // //                       type="file"
// // // // // // // //                       accept="image/*"
// // // // // // // //                       onChange={(e) => setThumbnailFile(e.target.files[0])}
// // // // // // // //                     />
// // // // // // // //                   </div>
// // // // // // // //                   <div className="text-center text-muted-foreground">OR</div>
// // // // // // // //                   <div className="space-y-2">
// // // // // // // //                     <Label htmlFor="thumbnail-url">Thumbnail URL</Label>
// // // // // // // //                     <Input
// // // // // // // //                       id="thumbnail-url"
// // // // // // // //                       placeholder="https://example.com/image.jpg"
// // // // // // // //                       value={courseData.thumbnail}
// // // // // // // //                       onChange={(e) => handleInputChange('thumbnail', e.target.value)}
// // // // // // // //                     />
// // // // // // // //                   </div>
// // // // // // // //                 </CardContent>
// // // // // // // //               </Card>
// // // // // // // //             </motion.div>

// // // // // // // //             {/* Features */}
// // // // // // // //             <motion.div
// // // // // // // //               initial={{ opacity: 0, y: 20 }}
// // // // // // // //               animate={{ opacity: 1, y: 0 }}
// // // // // // // //               transition={{ duration: 0.6, delay: 0.3 }}
// // // // // // // //             >
// // // // // // // //               <Card>
// // // // // // // //                 <CardHeader>
// // // // // // // //                   <CardTitle>Course Features</CardTitle>
// // // // // // // //                 </CardHeader>
// // // // // // // //                 <CardContent className="space-y-4">
// // // // // // // //                   <div className="flex gap-2">
// // // // // // // //                     <Input
// // // // // // // //                       placeholder="Add a course feature"
// // // // // // // //                       value={newFeature}
// // // // // // // //                       onChange={(e) => setNewFeature(e.target.value)}
// // // // // // // //                       onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addFeature())}
// // // // // // // //                     />
// // // // // // // //                     <Button type="button" onClick={addFeature}>
// // // // // // // //                       <Plus className="w-4 h-4" />
// // // // // // // //                     </Button>
// // // // // // // //                   </div>
// // // // // // // //                   <div className="flex flex-wrap gap-2">
// // // // // // // //                     {courseData.features.map((feature, index) => (
// // // // // // // //                       <Badge key={index} variant="secondary" className="flex items-center gap-2">
// // // // // // // //                         {feature}
// // // // // // // //                         <button
// // // // // // // //                           type="button"
// // // // // // // //                           onClick={() => removeFeature(index)}
// // // // // // // //                           className="text-xs hover:text-destructive"
// // // // // // // //                         >
// // // // // // // //                           ×
// // // // // // // //                         </button>
// // // // // // // //                       </Badge>
// // // // // // // //                     ))}
// // // // // // // //                   </div>
// // // // // // // //                 </CardContent>
// // // // // // // //               </Card>
// // // // // // // //             </motion.div>

// // // // // // // //             {/* Learning Outcomes */}
// // // // // // // //             <motion.div
// // // // // // // //               initial={{ opacity: 0, y: 20 }}
// // // // // // // //               animate={{ opacity: 1, y: 0 }}
// // // // // // // //               transition={{ duration: 0.6, delay: 0.4 }}
// // // // // // // //             >
// // // // // // // //               <Card>
// // // // // // // //                 <CardHeader>
// // // // // // // //                   <CardTitle>Learning Outcomes</CardTitle>
// // // // // // // //                 </CardHeader>
// // // // // // // //                 <CardContent className="space-y-4">
// // // // // // // //                   <div className="flex gap-2">
// // // // // // // //                     <Input
// // // // // // // //                       placeholder="What will students learn?"
// // // // // // // //                       value={newOutcome}
// // // // // // // //                       onChange={(e) => setNewOutcome(e.target.value)}
// // // // // // // //                       onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addOutcome())}
// // // // // // // //                     />
// // // // // // // //                     <Button type="button" onClick={addOutcome}>
// // // // // // // //                       <Plus className="w-4 h-4" />
// // // // // // // //                     </Button>
// // // // // // // //                   </div>
// // // // // // // //                   <div className="space-y-2">
// // // // // // // //                     {courseData.learningOutcomes.map((outcome, index) => (
// // // // // // // //                       <div key={index} className="flex items-center gap-2 p-2 bg-muted rounded">
// // // // // // // //                         <span className="flex-1">{outcome}</span>
// // // // // // // //                         <Button
// // // // // // // //                           type="button"
// // // // // // // //                           variant="ghost"
// // // // // // // //                           size="sm"
// // // // // // // //                           onClick={() => removeOutcome(index)}
// // // // // // // //                         >
// // // // // // // //                           <Trash2 className="w-4 h-4" />
// // // // // // // //                         </Button>
// // // // // // // //                       </div>
// // // // // // // //                     ))}
// // // // // // // //                   </div>
// // // // // // // //                 </CardContent>
// // // // // // // //               </Card>
// // // // // // // //             </motion.div>

// // // // // // // //             {/* Course Content */}
// // // // // // // //             <motion.div
// // // // // // // //               initial={{ opacity: 0, y: 20 }}
// // // // // // // //               animate={{ opacity: 1, y: 0 }}
// // // // // // // //               transition={{ duration: 0.6, delay: 0.5 }}
// // // // // // // //             >
// // // // // // // //               <Card>
// // // // // // // //                 <CardHeader>
// // // // // // // //                   <div className="flex items-center justify-between">
// // // // // // // //                     <CardTitle>Course Content</CardTitle>
// // // // // // // //                     <Button type="button" onClick={addContentSection} variant="outline">
// // // // // // // //                       <Plus className="w-4 h-4 mr-2" />
// // // // // // // //                       Add Section
// // // // // // // //                     </Button>
// // // // // // // //                   </div>
// // // // // // // //                 </CardHeader>
// // // // // // // //                 <CardContent className="space-y-6">
// // // // // // // //                   {courseContent.map((section, index) => (
// // // // // // // //                     <div key={section.id} className="border rounded-lg p-4 space-y-4">
// // // // // // // //                       <div className="flex items-center justify-between">
// // // // // // // //                         <h4 className="font-medium">Section {index + 1}</h4>
// // // // // // // //                         <Button
// // // // // // // //                           type="button"
// // // // // // // //                           variant="ghost"
// // // // // // // //                           size="sm"
// // // // // // // //                           onClick={() => removeContentSection(section.id)}
// // // // // // // //                         >
// // // // // // // //                           <Trash2 className="w-4 h-4" />
// // // // // // // //                         </Button>
// // // // // // // //                       </div>

// // // // // // // //                       <div className="grid md:grid-cols-2 gap-4">
// // // // // // // //                         <div className="space-y-2">
// // // // // // // //                           <Label>Section Title</Label>
// // // // // // // //                           <Input
// // // // // // // //                             placeholder="Enter section title"
// // // // // // // //                             value={section.title}
// // // // // // // //                             onChange={(e) => updateContentSection(section.id, 'title', e.target.value)}
// // // // // // // //                           />
// // // // // // // //                         </div>
// // // // // // // //                         <div className="space-y-2">
// // // // // // // //                           <Label>Video URL</Label>
// // // // // // // //                           <div className="relative">
// // // // // // // //                             <LinkIcon className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
// // // // // // // //                             <Input
// // // // // // // //                               placeholder="YouTube video URL"
// // // // // // // //                               value={section.videoUrl}
// // // // // // // //                               onChange={(e) => updateContentSection(section.id, 'videoUrl', e.target.value)}
// // // // // // // //                               className="pl-10"
// // // // // // // //                             />
// // // // // // // //                           </div>
// // // // // // // //                         </div>
// // // // // // // //                       </div>

// // // // // // // //                       <div className="space-y-2">
// // // // // // // //                         <Label>Section Description</Label>
// // // // // // // //                         <Textarea
// // // // // // // //                           placeholder="Describe what this section covers"
// // // // // // // //                           rows={3}
// // // // // // // //                           value={section.description}
// // // // // // // //                           onChange={(e) => updateContentSection(section.id, 'description', e.target.value)}
// // // // // // // //                         />
// // // // // // // //                       </div>
// // // // // // // //                     </div>
// // // // // // // //                   ))}

// // // // // // // //                   {courseContent.length === 0 && (
// // // // // // // //                     <div className="text-center py-8 text-muted-foreground">
// // // // // // // //                       <p>No content sections added yet.</p>
// // // // // // // //                       <p className="text-sm">Click "Add Section" to start building your course content.</p>
// // // // // // // //                     </div>
// // // // // // // //                   )}
// // // // // // // //                 </CardContent>
// // // // // // // //               </Card>
// // // // // // // //             </motion.div>

// // // // // // // //             {/* Submit Button */}
// // // // // // // //             <motion.div
// // // // // // // //               className="flex justify-end gap-4"
// // // // // // // //               initial={{ opacity: 0, y: 20 }}
// // // // // // // //               animate={{ opacity: 1, y: 0 }}
// // // // // // // //               transition={{ duration: 0.6, delay: 0.6 }}
// // // // // // // //             >
// // // // // // // //               <Link href="/admin">
// // // // // // // //                 <Button type="button" variant="outline">
// // // // // // // //                   Cancel
// // // // // // // //                 </Button>
// // // // // // // //               </Link>
// // // // // // // //               <Button onClick={handleSubmit} disabled={isLoading} className="bg-purple-600 hover:bg-purple-700">
// // // // // // // //                 {isLoading ? 'Creating Course...' : 'Create Course'}
// // // // // // // //               </Button>
// // // // // // // //             </motion.div>
// // // // // // // //           </div>
// // // // // // // //         </div>
// // // // // // // //       </main>
// // // // // // // //     </div>
// // // // // // // //   );
// // // // // // // // }

// // // // // // // 'use client';

// // // // // // // import { useState } from 'react';
// // // // // // // import { motion } from 'framer-motion';
// // // // // // // import { useRouter } from 'next/navigation';
// // // // // // // import { ArrowLeft, Plus, Trash2, Upload, Link as LinkIcon } from 'lucide-react';
// // // // // // // import { Button } from '@/components/ui/button';
// // // // // // // import { Input } from '@/components/ui/input';
// // // // // // // import { Label } from '@/components/ui/label';
// // // // // // // import { Textarea } from '@/components/ui/textarea';
// // // // // // // import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
// // // // // // // import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
// // // // // // // import { Badge } from '@/components/ui/badge';
// // // // // // // import { toast } from 'sonner';
// // // // // // // import Link from 'next/link';
// // // // // // // import AdminNavbar from '@/components/admin-navbar';

// // // // // // // const categories = [
// // // // // // //   'Web Development',
// // // // // // //   'Data Science',
// // // // // // //   'Digital Marketing',
// // // // // // //   'Mobile Development',
// // // // // // //   'UI/UX Design',
// // // // // // //   'Business',
// // // // // // //   'AI & Machine Learning',
// // // // // // //   'Cybersecurity'
// // // // // // // ];

// // // // // // // const levels = ['Beginner', 'Intermediate', 'Advanced'];

// // // // // // // export default function CreateCoursePage() {
// // // // // // //   const [courseData, setCourseData] = useState({
// // // // // // //     title: '',
// // // // // // //     description: '',
// // // // // // //     category: '',
// // // // // // //     level: '',
// // // // // // //     price: '',
// // // // // // //     originalPrice: '',
// // // // // // //     duration: '',
// // // // // // //     thumbnail: '',
// // // // // // //     features: [],
// // // // // // //     learningOutcomes: []
// // // // // // //   });

// // // // // // //   const [courseContent, setCourseContent] = useState([]);
// // // // // // //   const [newFeature, setNewFeature] = useState('');
// // // // // // //   const [newOutcome, setNewOutcome] = useState('');
// // // // // // //   const [isLoading, setIsLoading] = useState(false);
// // // // // // //   const [thumbnailFile, setThumbnailFile] = useState(null);
// // // // // // //   const router = useRouter();

// // // // // // //   const handleInputChange = (field, value) => {
// // // // // // //     setCourseData(prev => ({
// // // // // // //       ...prev,
// // // // // // //       [field]: value
// // // // // // //     }));
// // // // // // //   };

// // // // // // //   const addFeature = () => {
// // // // // // //     if (newFeature.trim()) {
// // // // // // //       setCourseData(prev => ({
// // // // // // //         ...prev,
// // // // // // //         features: [...prev.features, newFeature.trim()]
// // // // // // //       }));
// // // // // // //       setNewFeature('');
// // // // // // //     }
// // // // // // //   };

// // // // // // //   const removeFeature = (index) => {
// // // // // // //     setCourseData(prev => ({
// // // // // // //       ...prev,
// // // // // // //       features: prev.features.filter((_, i) => i !== index)
// // // // // // //     }));
// // // // // // //   };

// // // // // // //   const addOutcome = () => {
// // // // // // //     if (newOutcome.trim()) {
// // // // // // //       setCourseData(prev => ({
// // // // // // //         ...prev,
// // // // // // //         learningOutcomes: [...prev.learningOutcomes, newOutcome.trim()]
// // // // // // //       }));
// // // // // // //       setNewOutcome('');
// // // // // // //     }
// // // // // // //   };

// // // // // // //   const removeOutcome = (index) => {
// // // // // // //     setCourseData(prev => ({
// // // // // // //       ...prev,
// // // // // // //       learningOutcomes: prev.learningOutcomes.filter((_, i) => i !== index)
// // // // // // //     }));
// // // // // // //   };

// // // // // // //   const addContentSection = () => {
// // // // // // //     setCourseContent(prev => [...prev, {
// // // // // // //       id: Date.now(),
// // // // // // //       title: '',
// // // // // // //       description: '',
// // // // // // //       videoUrl: '',
// // // // // // //       resources: []
// // // // // // //     }]);
// // // // // // //   };

// // // // // // //   const updateContentSection = (id, field, value) => {
// // // // // // //     setCourseContent(prev => prev.map(section =>
// // // // // // //       section.id === id ? { ...section, [field]: value } : section
// // // // // // //     ));
// // // // // // //   };

// // // // // // //   const removeContentSection = (id) => {
// // // // // // //     setCourseContent(prev => prev.filter(section => section.id !== id));
// // // // // // //   };

// // // // // // //   const handleThumbnailUpload = async (file) => {
// // // // // // //     if (!file) return null;

// // // // // // //     const formData = new FormData();
// // // // // // //     formData.append('file', file);
// // // // // // //     formData.append('upload_preset', 'course_thumbnails');

// // // // // // //     try {
// // // // // // //       const response = await fetch(
// // // // // // //         `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
// // // // // // //         {
// // // // // // //           method: 'POST',
// // // // // // //           body: formData,
// // // // // // //         }
// // // // // // //       );

// // // // // // //       const data = await response.json();
// // // // // // //       return data.secure_url;
// // // // // // //     } catch (error) {
// // // // // // //       console.error('Thumbnail upload error:', error);
// // // // // // //       toast.error('Failed to upload thumbnail');
// // // // // // //       return null;
// // // // // // //     }
// // // // // // //   };

// // // // // // //   const getAuthToken = () => {
// // // // // // //     // Try to get token from localStorage first, then cookies
// // // // // // //     if (typeof window !== 'undefined') {
// // // // // // //       return localStorage.getItem('auth-token') ||
// // // // // // //              document.cookie.split('auth-token=')[1]?.split(';')[0] ||
// // // // // // //              null;
// // // // // // //     }
// // // // // // //     return null;
// // // // // // //   };

// // // // // // //   const handleSubmit = async (e) => {
// // // // // // //     // Prevent any default form submission if this was triggered by a form
// // // // // // //     if (e && e.preventDefault) {
// // // // // // //       e.preventDefault();
// // // // // // //     }

// // // // // // //     console.log('Submit button clicked'); // Debug log

// // // // // // //     // Validation with detailed logging
// // // // // // //     if (!courseData.title) {
// // // // // // //       console.log('Validation failed: title missing');
// // // // // // //       toast.error('Course title is required');
// // // // // // //       return;
// // // // // // //     }
// // // // // // //     if (!courseData.description) {
// // // // // // //       console.log('Validation failed: description missing');
// // // // // // //       toast.error('Course description is required');
// // // // // // //       return;
// // // // // // //     }
// // // // // // //     if (!courseData.category) {
// // // // // // //       console.log('Validation failed: category missing');
// // // // // // //       toast.error('Course category is required');
// // // // // // //       return;
// // // // // // //     }
// // // // // // //     if (!courseData.level) {
// // // // // // //       console.log('Validation failed: level missing');
// // // // // // //       toast.error('Course level is required');
// // // // // // //       return;
// // // // // // //     }
// // // // // // //     if (!courseData.price) {
// // // // // // //       console.log('Validation failed: price missing');
// // // // // // //       toast.error('Course price is required');
// // // // // // //       return;
// // // // // // //     }
// // // // // // //     if (!courseData.duration) {
// // // // // // //       console.log('Validation failed: duration missing');
// // // // // // //       toast.error('Course duration is required');
// // // // // // //       return;
// // // // // // //     }

// // // // // // //     console.log('Validation passed, starting submission...'); // Debug log
// // // // // // //     setIsLoading(true);

// // // // // // //     try {
// // // // // // //       let thumbnailUrl = courseData.thumbnail;

// // // // // // //       // Upload thumbnail if file is selected
// // // // // // //       if (thumbnailFile) {
// // // // // // //         console.log('Uploading thumbnail...'); // Debug log
// // // // // // //         thumbnailUrl = await handleThumbnailUpload(thumbnailFile);
// // // // // // //         if (!thumbnailUrl) {
// // // // // // //           console.log('Thumbnail upload failed'); // Debug log
// // // // // // //           setIsLoading(false);
// // // // // // //           return;
// // // // // // //         }
// // // // // // //         console.log('Thumbnail uploaded successfully:', thumbnailUrl); // Debug log
// // // // // // //       }

// // // // // // //       const authToken = getAuthToken();
// // // // // // //       console.log('Auth token:', authToken ? 'Found' : 'Not found'); // Debug log

// // // // // // //       if (!authToken) {
// // // // // // //         console.log('No auth token found, redirecting to login'); // Debug log
// // // // // // //         toast.error('Authentication required. Please log in again.');
// // // // // // //         router.push('/admin/login');
// // // // // // //         setIsLoading(false);
// // // // // // //         return;
// // // // // // //       }

// // // // // // //       const payload = {
// // // // // // //         ...courseData,
// // // // // // //         thumbnail: thumbnailUrl,
// // // // // // //         content: courseContent,
// // // // // // //         price: parseFloat(courseData.price),
// // // // // // //         originalPrice: courseData.originalPrice ? parseFloat(courseData.originalPrice) : null,
// // // // // // //       };

// // // // // // //       console.log('Sending API request with payload:', payload); // Debug log

// // // // // // //       const response = await fetch('/api/admin/courses/create', {
// // // // // // //         method: 'POST',
// // // // // // //         headers: {
// // // // // // //           'Content-Type': 'application/json',
// // // // // // //           'Authorization': `Bearer ${authToken}`,
// // // // // // //         },
// // // // // // //         body: JSON.stringify(payload),
// // // // // // //       });

// // // // // // //       console.log('API response status:', response.status); // Debug log

// // // // // // //       const data = await response.json();
// // // // // // //       console.log('API response data:', data); // Debug log

// // // // // // //       if (response.ok) {
// // // // // // //         toast.success('Course created successfully!');
// // // // // // //         router.push('/admin');
// // // // // // //       } else {
// // // // // // //         console.error('API error:', data);
// // // // // // //         toast.error(data.message || 'Failed to create course');
// // // // // // //       }
// // // // // // //     } catch (error) {
// // // // // // //       console.error('Course creation error:', error);
// // // // // // //       toast.error('Something went wrong. Please try again.');
// // // // // // //     } finally {
// // // // // // //       setIsLoading(false);
// // // // // // //     }
// // // // // // //   };

// // // // // // //   return (
// // // // // // //     <div className="min-h-screen bg-background">
// // // // // // //       <AdminNavbar />

// // // // // // //       <main className="pt-20 pb-12">
// // // // // // //         <div className="container mx-auto px-4 max-w-4xl">
// // // // // // //           {/* Header */}
// // // // // // //           <motion.div
// // // // // // //             className="flex items-center gap-4 mb-8"
// // // // // // //             initial={{ opacity: 0, y: 20 }}
// // // // // // //             animate={{ opacity: 1, y: 0 }}
// // // // // // //             transition={{ duration: 0.6 }}
// // // // // // //           >
// // // // // // //             <Link href="/admin">
// // // // // // //               <Button variant="outline" size="icon">
// // // // // // //                 <ArrowLeft className="w-4 h-4" />
// // // // // // //               </Button>
// // // // // // //             </Link>
// // // // // // //             <div>
// // // // // // //               <h1 className="text-3xl font-bold">Create New Course</h1>
// // // // // // //               <p className="text-muted-foreground">
// // // // // // //                 Add a new course to your platform with content and resources.
// // // // // // //               </p>
// // // // // // //             </div>
// // // // // // //           </motion.div>

// // // // // // //           {/* Wrap everything in a form for better semantics */}
// // // // // // //           <form onSubmit={handleSubmit} className="space-y-8">
// // // // // // //             {/* Basic Information */}
// // // // // // //             <motion.div
// // // // // // //               initial={{ opacity: 0, y: 20 }}
// // // // // // //               animate={{ opacity: 1, y: 0 }}
// // // // // // //               transition={{ duration: 0.6, delay: 0.1 }}
// // // // // // //             >
// // // // // // //               <Card>
// // // // // // //                 <CardHeader>
// // // // // // //                   <CardTitle>Basic Information</CardTitle>
// // // // // // //                 </CardHeader>
// // // // // // //                 <CardContent className="space-y-6">
// // // // // // //                   <div className="grid md:grid-cols-2 gap-6">
// // // // // // //                     <div className="space-y-2">
// // // // // // //                       <Label htmlFor="title">Course Title *</Label>
// // // // // // //                       <Input
// // // // // // //                         id="title"
// // // // // // //                         placeholder="Enter course title"
// // // // // // //                         value={courseData.title}
// // // // // // //                         onChange={(e) => handleInputChange('title', e.target.value)}
// // // // // // //                         required
// // // // // // //                       />
// // // // // // //                     </div>
// // // // // // //                     <div className="space-y-2">
// // // // // // //                       <Label htmlFor="duration">Duration *</Label>
// // // // // // //                       <Input
// // // // // // //                         id="duration"
// // // // // // //                         placeholder="e.g., 40 hours"
// // // // // // //                         value={courseData.duration}
// // // // // // //                         onChange={(e) => handleInputChange('duration', e.target.value)}
// // // // // // //                         required
// // // // // // //                       />
// // // // // // //                     </div>
// // // // // // //                   </div>

// // // // // // //                   <div className="space-y-2">
// // // // // // //                     <Label htmlFor="description">Description *</Label>
// // // // // // //                     <Textarea
// // // // // // //                       id="description"
// // // // // // //                       placeholder="Describe what students will learn in this course"
// // // // // // //                       rows={4}
// // // // // // //                       value={courseData.description}
// // // // // // //                       onChange={(e) => handleInputChange('description', e.target.value)}
// // // // // // //                       required
// // // // // // //                     />
// // // // // // //                   </div>

// // // // // // //                   <div className="grid md:grid-cols-2 gap-6">
// // // // // // //                     <div className="space-y-2">
// // // // // // //                       <Label htmlFor="category">Category *</Label>
// // // // // // //                       <Select onValueChange={(value) => handleInputChange('category', value)} required>
// // // // // // //                         <SelectTrigger>
// // // // // // //                           <SelectValue placeholder="Select category" />
// // // // // // //                         </SelectTrigger>
// // // // // // //                         <SelectContent>
// // // // // // //                           {categories.map((category) => (
// // // // // // //                             <SelectItem key={category} value={category}>
// // // // // // //                               {category}
// // // // // // //                             </SelectItem>
// // // // // // //                           ))}
// // // // // // //                         </SelectContent>
// // // // // // //                       </Select>
// // // // // // //                     </div>
// // // // // // //                     <div className="space-y-2">
// // // // // // //                       <Label htmlFor="level">Level *</Label>
// // // // // // //                       <Select onValueChange={(value) => handleInputChange('level', value)} required>
// // // // // // //                         <SelectTrigger>
// // // // // // //                           <SelectValue placeholder="Select level" />
// // // // // // //                         </SelectTrigger>
// // // // // // //                         <SelectContent>
// // // // // // //                           {levels.map((level) => (
// // // // // // //                             <SelectItem key={level} value={level}>
// // // // // // //                               {level}
// // // // // // //                             </SelectItem>
// // // // // // //                           ))}
// // // // // // //                         </SelectContent>
// // // // // // //                       </Select>
// // // // // // //                     </div>
// // // // // // //                   </div>

// // // // // // //                   <div className="grid md:grid-cols-2 gap-6">
// // // // // // //                     <div className="space-y-2">
// // // // // // //                       <Label htmlFor="price">Price (₹) *</Label>
// // // // // // //                       <Input
// // // // // // //                         id="price"
// // // // // // //                         type="number"
// // // // // // //                         placeholder="2999"
// // // // // // //                         value={courseData.price}
// // // // // // //                         onChange={(e) => handleInputChange('price', e.target.value)}
// // // // // // //                         required
// // // // // // //                       />
// // // // // // //                     </div>
// // // // // // //                     <div className="space-y-2">
// // // // // // //                       <Label htmlFor="originalPrice">Original Price (₹)</Label>
// // // // // // //                       <Input
// // // // // // //                         id="originalPrice"
// // // // // // //                         type="number"
// // // // // // //                         placeholder="5999"
// // // // // // //                         value={courseData.originalPrice}
// // // // // // //                         onChange={(e) => handleInputChange('originalPrice', e.target.value)}
// // // // // // //                       />
// // // // // // //                     </div>
// // // // // // //                   </div>
// // // // // // //                 </CardContent>
// // // // // // //               </Card>
// // // // // // //             </motion.div>

// // // // // // //             {/* Thumbnail */}
// // // // // // //             <motion.div
// // // // // // //               initial={{ opacity: 0, y: 20 }}
// // // // // // //               animate={{ opacity: 1, y: 0 }}
// // // // // // //               transition={{ duration: 0.6, delay: 0.2 }}
// // // // // // //             >
// // // // // // //               <Card>
// // // // // // //                 <CardHeader>
// // // // // // //                   <CardTitle>Course Thumbnail</CardTitle>
// // // // // // //                 </CardHeader>
// // // // // // //                 <CardContent className="space-y-4">
// // // // // // //                   <div className="space-y-2">
// // // // // // //                     <Label htmlFor="thumbnail-file">Upload Thumbnail</Label>
// // // // // // //                     <Input
// // // // // // //                       id="thumbnail-file"
// // // // // // //                       type="file"
// // // // // // //                       accept="image/*"
// // // // // // //                       onChange={(e) => setThumbnailFile(e.target.files?.[0] || null)}
// // // // // // //                     />
// // // // // // //                   </div>
// // // // // // //                   <div className="text-center text-muted-foreground">OR</div>
// // // // // // //                   <div className="space-y-2">
// // // // // // //                     <Label htmlFor="thumbnail-url">Thumbnail URL</Label>
// // // // // // //                     <Input
// // // // // // //                       id="thumbnail-url"
// // // // // // //                       placeholder="https://example.com/image.jpg"
// // // // // // //                       value={courseData.thumbnail}
// // // // // // //                       onChange={(e) => handleInputChange('thumbnail', e.target.value)}
// // // // // // //                     />
// // // // // // //                   </div>
// // // // // // //                 </CardContent>
// // // // // // //               </Card>
// // // // // // //             </motion.div>

// // // // // // //             {/* Features */}
// // // // // // //             <motion.div
// // // // // // //               initial={{ opacity: 0, y: 20 }}
// // // // // // //               animate={{ opacity: 1, y: 0 }}
// // // // // // //               transition={{ duration: 0.6, delay: 0.3 }}
// // // // // // //             >
// // // // // // //               <Card>
// // // // // // //                 <CardHeader>
// // // // // // //                   <CardTitle>Course Features</CardTitle>
// // // // // // //                 </CardHeader>
// // // // // // //                 <CardContent className="space-y-4">
// // // // // // //                   <div className="flex gap-2">
// // // // // // //                     <Input
// // // // // // //                       placeholder="Add a course feature"
// // // // // // //                       value={newFeature}
// // // // // // //                       onChange={(e) => setNewFeature(e.target.value)}
// // // // // // //                       onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addFeature())}
// // // // // // //                     />
// // // // // // //                     <Button type="button" onClick={addFeature}>
// // // // // // //                       <Plus className="w-4 h-4" />
// // // // // // //                     </Button>
// // // // // // //                   </div>
// // // // // // //                   <div className="flex flex-wrap gap-2">
// // // // // // //                     {courseData.features.map((feature, index) => (
// // // // // // //                       <Badge key={index} variant="secondary" className="flex items-center gap-2">
// // // // // // //                         {feature}
// // // // // // //                         <button
// // // // // // //                           type="button"
// // // // // // //                           onClick={() => removeFeature(index)}
// // // // // // //                           className="text-xs hover:text-destructive"
// // // // // // //                         >
// // // // // // //                           ×
// // // // // // //                         </button>
// // // // // // //                       </Badge>
// // // // // // //                     ))}
// // // // // // //                   </div>
// // // // // // //                 </CardContent>
// // // // // // //               </Card>
// // // // // // //             </motion.div>

// // // // // // //             {/* Learning Outcomes */}
// // // // // // //             <motion.div
// // // // // // //               initial={{ opacity: 0, y: 20 }}
// // // // // // //               animate={{ opacity: 1, y: 0 }}
// // // // // // //               transition={{ duration: 0.6, delay: 0.4 }}
// // // // // // //             >
// // // // // // //               <Card>
// // // // // // //                 <CardHeader>
// // // // // // //                   <CardTitle>Learning Outcomes</CardTitle>
// // // // // // //                 </CardHeader>
// // // // // // //                 <CardContent className="space-y-4">
// // // // // // //                   <div className="flex gap-2">
// // // // // // //                     <Input
// // // // // // //                       placeholder="What will students learn?"
// // // // // // //                       value={newOutcome}
// // // // // // //                       onChange={(e) => setNewOutcome(e.target.value)}
// // // // // // //                       onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addOutcome())}
// // // // // // //                     />
// // // // // // //                     <Button type="button" onClick={addOutcome}>
// // // // // // //                       <Plus className="w-4 h-4" />
// // // // // // //                     </Button>
// // // // // // //                   </div>
// // // // // // //                   <div className="space-y-2">
// // // // // // //                     {courseData.learningOutcomes.map((outcome, index) => (
// // // // // // //                       <div key={index} className="flex items-center gap-2 p-2 bg-muted rounded">
// // // // // // //                         <span className="flex-1">{outcome}</span>
// // // // // // //                         <Button
// // // // // // //                           type="button"
// // // // // // //                           variant="ghost"
// // // // // // //                           size="sm"
// // // // // // //                           onClick={() => removeOutcome(index)}
// // // // // // //                         >
// // // // // // //                           <Trash2 className="w-4 h-4" />
// // // // // // //                         </Button>
// // // // // // //                       </div>
// // // // // // //                     ))}
// // // // // // //                   </div>
// // // // // // //                 </CardContent>
// // // // // // //               </Card>
// // // // // // //             </motion.div>

// // // // // // //             {/* Course Content */}
// // // // // // //             <motion.div
// // // // // // //               initial={{ opacity: 0, y: 20 }}
// // // // // // //               animate={{ opacity: 1, y: 0 }}
// // // // // // //               transition={{ duration: 0.6, delay: 0.5 }}
// // // // // // //             >
// // // // // // //               <Card>
// // // // // // //                 <CardHeader>
// // // // // // //                   <div className="flex items-center justify-between">
// // // // // // //                     <CardTitle>Course Content</CardTitle>
// // // // // // //                     <Button type="button" onClick={addContentSection} variant="outline">
// // // // // // //                       <Plus className="w-4 h-4 mr-2" />
// // // // // // //                       Add Section
// // // // // // //                     </Button>
// // // // // // //                   </div>
// // // // // // //                 </CardHeader>
// // // // // // //                 <CardContent className="space-y-6">
// // // // // // //                   {courseContent.map((section, index) => (
// // // // // // //                     <div key={section.id} className="border rounded-lg p-4 space-y-4">
// // // // // // //                       <div className="flex items-center justify-between">
// // // // // // //                         <h4 className="font-medium">Section {index + 1}</h4>
// // // // // // //                         <Button
// // // // // // //                           type="button"
// // // // // // //                           variant="ghost"
// // // // // // //                           size="sm"
// // // // // // //                           onClick={() => removeContentSection(section.id)}
// // // // // // //                         >
// // // // // // //                           <Trash2 className="w-4 h-4" />
// // // // // // //                         </Button>
// // // // // // //                       </div>

// // // // // // //                       <div className="grid md:grid-cols-2 gap-4">
// // // // // // //                         <div className="space-y-2">
// // // // // // //                           <Label>Section Title</Label>
// // // // // // //                           <Input
// // // // // // //                             placeholder="Enter section title"
// // // // // // //                             value={section.title}
// // // // // // //                             onChange={(e) => updateContentSection(section.id, 'title', e.target.value)}
// // // // // // //                           />
// // // // // // //                         </div>
// // // // // // //                         <div className="space-y-2">
// // // // // // //                           <Label>Video URL</Label>
// // // // // // //                           <div className="relative">
// // // // // // //                             <LinkIcon className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
// // // // // // //                             <Input
// // // // // // //                               placeholder="YouTube video URL"
// // // // // // //                               value={section.videoUrl}
// // // // // // //                               onChange={(e) => updateContentSection(section.id, 'videoUrl', e.target.value)}
// // // // // // //                               className="pl-10"
// // // // // // //                             />
// // // // // // //                           </div>
// // // // // // //                         </div>
// // // // // // //                       </div>

// // // // // // //                       <div className="space-y-2">
// // // // // // //                         <Label>Section Description</Label>
// // // // // // //                         <Textarea
// // // // // // //                           placeholder="Describe what this section covers"
// // // // // // //                           rows={3}
// // // // // // //                           value={section.description}
// // // // // // //                           onChange={(e) => updateContentSection(section.id, 'description', e.target.value)}
// // // // // // //                         />
// // // // // // //                       </div>
// // // // // // //                     </div>
// // // // // // //                   ))}

// // // // // // //                   {courseContent.length === 0 && (
// // // // // // //                     <div className="text-center py-8 text-muted-foreground">
// // // // // // //                       <p>No content sections added yet.</p>
// // // // // // //                       <p className="text-sm">Click "Add Section" to start building your course content.</p>
// // // // // // //                     </div>
// // // // // // //                   )}
// // // // // // //                 </CardContent>
// // // // // // //               </Card>
// // // // // // //             </motion.div>

// // // // // // //             {/* Submit Button */}
// // // // // // //             <motion.div
// // // // // // //               className="flex justify-end gap-4"
// // // // // // //               initial={{ opacity: 0, y: 20 }}
// // // // // // //               animate={{ opacity: 1, y: 0 }}
// // // // // // //               transition={{ duration: 0.6, delay: 0.6 }}
// // // // // // //             >
// // // // // // //               <Link href="/admin">
// // // // // // //                 <Button type="button" variant="outline">
// // // // // // //                   Cancel
// // // // // // //                 </Button>
// // // // // // //               </Link>
// // // // // // //               <Button
// // // // // // //                 type="submit"
// // // // // // //                 disabled={isLoading}
// // // // // // //                 className="bg-purple-600 hover:bg-purple-700"
// // // // // // //               >
// // // // // // //                 {isLoading ? 'Creating Course...' : 'Create Course'}
// // // // // // //               </Button>
// // // // // // //             </motion.div>
// // // // // // //           </form>
// // // // // // //         </div>
// // // // // // //       </main>
// // // // // // //     </div>
// // // // // // //   );
// // // // // // // }

// // // // // // 'use client';

// // // // // // import { useState, useRef } from 'react';
// // // // // // import { motion } from 'framer-motion';
// // // // // // import { useRouter } from 'next/navigation';
// // // // // // import { ArrowLeft, Plus, Trash2, Upload, Link as LinkIcon, Image as ImageIcon } from 'lucide-react';
// // // // // // import { Button } from '@/components/ui/button';
// // // // // // import { Input } from '@/components/ui/input';
// // // // // // import { Label } from '@/components/ui/label';
// // // // // // import { Textarea } from '@/components/ui/textarea';
// // // // // // import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
// // // // // // import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
// // // // // // import { Badge } from '@/components/ui/badge';
// // // // // // import { toast } from 'sonner';
// // // // // // import Link from 'next/link';
// // // // // // import AdminNavbar from '@/components/admin-navbar';
// // // // // // import uploader from '@/lib/cloudinary';

// // // // // // const categories = [
// // // // // //   'Web Development',
// // // // // //   'Data Science',
// // // // // //   'Digital Marketing',
// // // // // //   'Mobile Development',
// // // // // //   'UI/UX Design',
// // // // // //   'Business',
// // // // // //   'AI & Machine Learning',
// // // // // //   'Cybersecurity'
// // // // // // ];

// // // // // // const levels = ['Beginner', 'Intermediate', 'Advanced'];

// // // // // // export default function CreateCoursePage() {
// // // // // //   const fileInputRef = useRef(null);
// // // // // //   const [selectedFile, setSelectedFile] = useState(null);
// // // // // //   const [isUploading, setIsUploading] = useState(false);

// // // // // //   const [courseData, setCourseData] = useState({
// // // // // //     title: '',
// // // // // //     description: '',
// // // // // //     category: '',
// // // // // //     level: '',
// // // // // //     price: '',
// // // // // //     originalPrice: '',
// // // // // //     duration: '',
// // // // // //     thumbnail: '',
// // // // // //     features: [],
// // // // // //     learningOutcomes: []
// // // // // //   });

// // // // // //   const [courseContent, setCourseContent] = useState([]);
// // // // // //   const [newFeature, setNewFeature] = useState('');
// // // // // //   const [newOutcome, setNewOutcome] = useState('');
// // // // // //   const [isLoading, setIsLoading] = useState(false);
// // // // // //   const router = useRouter();

// // // // // //   const handleInputChange = (field, value) => {
// // // // // //     setCourseData(prev => ({
// // // // // //       ...prev,
// // // // // //       [field]: value
// // // // // //     }));
// // // // // //   };

// // // // // //   const handleFileChange = (event) => {
// // // // // //     const files = event.target.files;
// // // // // //     if (files.length > 0) {
// // // // // //       const file = files[0];
// // // // // //       if (!file.type.includes('image')) {
// // // // // //         toast.error('Invalid file type. Please select an image.');
// // // // // //         return;
// // // // // //       }

// // // // // //       const fileSizeInMB = file.size / (1024 * 1024);
// // // // // //       if (fileSizeInMB > 3) {
// // // // // //         toast.error("The image size is greater than 3 MB. Please select a smaller image.");
// // // // // //         event.target.value = "";
// // // // // //         return;
// // // // // //       }

// // // // // //       setSelectedFile(file);
// // // // // //       console.log('Image selected:', file.name);
// // // // // //     }
// // // // // //   };

// // // // // //   const addFeature = () => {
// // // // // //     if (newFeature.trim()) {
// // // // // //       setCourseData(prev => ({
// // // // // //         ...prev,
// // // // // //         features: [...prev.features, newFeature.trim()]
// // // // // //       }));
// // // // // //       setNewFeature('');
// // // // // //     }
// // // // // //   };

// // // // // //   const removeFeature = (index) => {
// // // // // //     setCourseData(prev => ({
// // // // // //       ...prev,
// // // // // //       features: prev.features.filter((_, i) => i !== index)
// // // // // //     }));
// // // // // //   };

// // // // // //   const addOutcome = () => {
// // // // // //     if (newOutcome.trim()) {
// // // // // //       setCourseData(prev => ({
// // // // // //         ...prev,
// // // // // //         learningOutcomes: [...prev.learningOutcomes, newOutcome.trim()]
// // // // // //       }));
// // // // // //       setNewOutcome('');
// // // // // //     }
// // // // // //   };

// // // // // //   const removeOutcome = (index) => {
// // // // // //     setCourseData(prev => ({
// // // // // //       ...prev,
// // // // // //       learningOutcomes: prev.learningOutcomes.filter((_, i) => i !== index)
// // // // // //     }));
// // // // // //   };

// // // // // //   const addContentSection = () => {
// // // // // //     setCourseContent(prev => [...prev, {
// // // // // //       id: Date.now(),
// // // // // //       title: '',
// // // // // //       description: '',
// // // // // //       videoUrl: '',
// // // // // //       resources: []
// // // // // //     }]);
// // // // // //   };

// // // // // //   const updateContentSection = (id, field, value) => {
// // // // // //     setCourseContent(prev => prev.map(section =>
// // // // // //       section.id === id ? { ...section, [field]: value } : section
// // // // // //     ));
// // // // // //   };

// // // // // //   const removeContentSection = (id) => {
// // // // // //     setCourseContent(prev => prev.filter(section => section.id !== id));
// // // // // //   };

// // // // // //   const getAuthToken = () => {
// // // // // //     // Try to get token from localStorage first, then cookies
// // // // // //     if (typeof window !== 'undefined') {
// // // // // //       return localStorage.getItem('auth-token') ||
// // // // // //         document.cookie.split('auth-token=')[1]?.split(';')[0] ||
// // // // // //         null;
// // // // // //     }
// // // // // //     return null;
// // // // // //   };

// // // // // //   const validateForm = () => {
// // // // // //     if (!courseData.title.trim()) {
// // // // // //       toast.error("Course title is required");
// // // // // //       return false;
// // // // // //     }
// // // // // //     if (!courseData.description.trim()) {
// // // // // //       toast.error("Course description is required");
// // // // // //       return false;
// // // // // //     }
// // // // // //     if (!courseData.category) {
// // // // // //       toast.error("Course category is required");
// // // // // //       return false;
// // // // // //     }
// // // // // //     if (!courseData.level) {
// // // // // //       toast.error("Course level is required");
// // // // // //       return false;
// // // // // //     }
// // // // // //     if (!courseData.price) {
// // // // // //       toast.error("Course price is required");
// // // // // //       return false;
// // // // // //     }
// // // // // //     if (!courseData.duration.trim()) {
// // // // // //       toast.error("Course duration is required");
// // // // // //       return false;
// // // // // //     }
// // // // // //     if (!selectedFile && !courseData.thumbnail) {
// // // // // //       toast.error("Course thumbnail is required");
// // // // // //       return false;
// // // // // //     }
// // // // // //     return true;
// // // // // //   };

// // // // // //   const handleSubmit = async (e) => {
// // // // // //     if (e && e.preventDefault) {
// // // // // //       e.preventDefault();
// // // // // //     }

// // // // // //     console.log('Submit button clicked');

// // // // // //     if (!validateForm()) {
// // // // // //       return;
// // // // // //     }

// // // // // //     console.log('Validation passed, starting submission...');
// // // // // //     setIsLoading(true);
// // // // // //     setIsUploading(true);

// // // // // //     try {
// // // // // //       let thumbnailUrl = courseData.thumbnail;

// // // // // //       // Upload thumbnail if file is selected
// // // // // //       if (selectedFile) {
// // // // // //         console.log('Uploading thumbnail...');
// // // // // //         const formDataOBJ = new FormData();
// // // // // //         formDataOBJ.append('file', selectedFile);

// // // // // //         const imgLinkObj = await uploader(formDataOBJ);
// // // // // //         console.log('Upload response:', imgLinkObj);

// // // // // //         if (imgLinkObj.status === 200 && imgLinkObj.imgLinkArray.length) {
// // // // // //           thumbnailUrl = imgLinkObj.imgLinkArray[0];
// // // // // //           console.log('Thumbnail uploaded successfully:', thumbnailUrl);
// // // // // //         } else {
// // // // // //           toast.error("Failed to upload thumbnail");
// // // // // //           setIsLoading(false);
// // // // // //           setIsUploading(false);
// // // // // //           return;
// // // // // //         }
// // // // // //       }

// // // // // //       const authToken = getAuthToken();
// // // // // //       console.log('Auth token:', authToken ? 'Found' : 'Not found');

// // // // // //       if (!authToken) {
// // // // // //         console.log('No auth token found, redirecting to login');
// // // // // //         toast.error('Authentication required. Please log in again.');
// // // // // //         router.push('/admin/login');
// // // // // //         setIsLoading(false);
// // // // // //         setIsUploading(false);
// // // // // //         return;
// // // // // //       }

// // // // // //       const payload = {
// // // // // //         ...courseData,
// // // // // //         thumbnail: thumbnailUrl,
// // // // // //         content: courseContent,
// // // // // //         price: parseFloat(courseData.price),
// // // // // //         originalPrice: courseData.originalPrice ? parseFloat(courseData.originalPrice) : null,
// // // // // //       };

// // // // // //       console.log('Sending API request with payload:', payload);

// // // // // //       const response = await fetch('/api/admin/courses/create', {
// // // // // //         method: 'POST',
// // // // // //         headers: {
// // // // // //           'Content-Type': 'application/json',
// // // // // //           'Authorization': `Bearer ${authToken}`,
// // // // // //         },
// // // // // //         body: JSON.stringify(payload),
// // // // // //       });

// // // // // //       console.log('API response status:', response.status);

// // // // // //       const data = await response.json();
// // // // // //       console.log('API response data:', data);

// // // // // //       if (response.ok) {
// // // // // //         toast.success('Course created successfully!');

// // // // // //         // Reset form
// // // // // //         setCourseData({
// // // // // //           title: '',
// // // // // //           description: '',
// // // // // //           category: '',
// // // // // //           level: '',
// // // // // //           price: '',
// // // // // //           originalPrice: '',
// // // // // //           duration: '',
// // // // // //           thumbnail: '',
// // // // // //           features: [],
// // // // // //           learningOutcomes: []
// // // // // //         });
// // // // // //         setCourseContent([]);
// // // // // //         setSelectedFile(null);
// // // // // //         if (fileInputRef.current) {
// // // // // //           fileInputRef.current.value = "";
// // // // // //         }

// // // // // //         router.push('/admin');
// // // // // //       } else {
// // // // // //         console.error('API error:', data);
// // // // // //         toast.error(data.message || 'Failed to create course');
// // // // // //       }
// // // // // //     } catch (error) {
// // // // // //       console.error('Course creation error:', error);
// // // // // //       toast.error('Something went wrong. Please try again.');
// // // // // //     } finally {
// // // // // //       setIsLoading(false);
// // // // // //       setIsUploading(false);
// // // // // //     }
// // // // // //   };

// // // // // //   return (
// // // // // //     <div className="min-h-screen bg-background">
// // // // // //       <AdminNavbar />

// // // // // //       <main className="pt-20 pb-12">
// // // // // //         <div className="container mx-auto px-4 max-w-4xl">
// // // // // //           {/* Header */}
// // // // // //           <motion.div
// // // // // //             className="flex items-center gap-4 mb-8"
// // // // // //             initial={{ opacity: 0, y: 20 }}
// // // // // //             animate={{ opacity: 1, y: 0 }}
// // // // // //             transition={{ duration: 0.6 }}
// // // // // //           >
// // // // // //             <Link href="/admin">
// // // // // //               <Button variant="outline" size="icon">
// // // // // //                 <ArrowLeft className="w-4 h-4" />
// // // // // //               </Button>
// // // // // //             </Link>
// // // // // //             <div>
// // // // // //               <h1 className="text-3xl font-bold">Create New Course</h1>
// // // // // //               <p className="text-muted-foreground">
// // // // // //                 Add a new course to your platform with content and resources.
// // // // // //               </p>
// // // // // //             </div>
// // // // // //           </motion.div>

// // // // // //           {/* Wrap everything in a form for better semantics */}
// // // // // //           <form onSubmit={handleSubmit} className="space-y-8">
// // // // // //             {/* Basic Information */}
// // // // // //             <motion.div
// // // // // //               initial={{ opacity: 0, y: 20 }}
// // // // // //               animate={{ opacity: 1, y: 0 }}
// // // // // //               transition={{ duration: 0.6, delay: 0.1 }}
// // // // // //             >
// // // // // //               <Card>
// // // // // //                 <CardHeader>
// // // // // //                   <CardTitle>Basic Information</CardTitle>
// // // // // //                 </CardHeader>
// // // // // //                 <CardContent className="space-y-6">
// // // // // //                   <div className="grid md:grid-cols-2 gap-6">
// // // // // //                     <div className="space-y-2">
// // // // // //                       <Label htmlFor="title">Course Title *</Label>
// // // // // //                       <Input
// // // // // //                         id="title"
// // // // // //                         placeholder="Enter course title"
// // // // // //                         value={courseData.title}
// // // // // //                         onChange={(e) => handleInputChange('title', e.target.value)}
// // // // // //                         required
// // // // // //                       />
// // // // // //                     </div>
// // // // // //                     <div className="space-y-2">
// // // // // //                       <Label htmlFor="duration">Duration *</Label>
// // // // // //                       <Input
// // // // // //                         id="duration"
// // // // // //                         placeholder="e.g., 40 hours"
// // // // // //                         value={courseData.duration}
// // // // // //                         onChange={(e) => handleInputChange('duration', e.target.value)}
// // // // // //                         required
// // // // // //                       />
// // // // // //                     </div>
// // // // // //                   </div>

// // // // // //                   <div className="space-y-2">
// // // // // //                     <Label htmlFor="description">Description *</Label>
// // // // // //                     <Textarea
// // // // // //                       id="description"
// // // // // //                       placeholder="Describe what students will learn in this course"
// // // // // //                       rows={4}
// // // // // //                       value={courseData.description}
// // // // // //                       onChange={(e) => handleInputChange('description', e.target.value)}
// // // // // //                       required
// // // // // //                     />
// // // // // //                   </div>

// // // // // //                   <div className="grid md:grid-cols-2 gap-6">
// // // // // //                     <div className="space-y-2">
// // // // // //                       <Label htmlFor="category">Category *</Label>
// // // // // //                       <Select onValueChange={(value) => handleInputChange('category', value)} required>
// // // // // //                         <SelectTrigger>
// // // // // //                           <SelectValue placeholder="Select category" />
// // // // // //                         </SelectTrigger>
// // // // // //                         <SelectContent>
// // // // // //                           {categories.map((category) => (
// // // // // //                             <SelectItem key={category} value={category}>
// // // // // //                               {category}
// // // // // //                             </SelectItem>
// // // // // //                           ))}
// // // // // //                         </SelectContent>
// // // // // //                       </Select>
// // // // // //                     </div>
// // // // // //                     <div className="space-y-2">
// // // // // //                       <Label htmlFor="level">Level *</Label>
// // // // // //                       <Select onValueChange={(value) => handleInputChange('level', value)} required>
// // // // // //                         <SelectTrigger>
// // // // // //                           <SelectValue placeholder="Select level" />
// // // // // //                         </SelectTrigger>
// // // // // //                         <SelectContent>
// // // // // //                           {levels.map((level) => (
// // // // // //                             <SelectItem key={level} value={level}>
// // // // // //                               {level}
// // // // // //                             </SelectItem>
// // // // // //                           ))}
// // // // // //                         </SelectContent>
// // // // // //                       </Select>
// // // // // //                     </div>
// // // // // //                   </div>

// // // // // //                   <div className="grid md:grid-cols-2 gap-6">
// // // // // //                     <div className="space-y-2">
// // // // // //                       <Label htmlFor="price">Price (₹) *</Label>
// // // // // //                       <Input
// // // // // //                         id="price"
// // // // // //                         type="number"
// // // // // //                         placeholder="2999"
// // // // // //                         value={courseData.price}
// // // // // //                         onChange={(e) => handleInputChange('price', e.target.value)}
// // // // // //                         required
// // // // // //                       />
// // // // // //                     </div>
// // // // // //                     <div className="space-y-2">
// // // // // //                       <Label htmlFor="originalPrice">Original Price (₹)</Label>
// // // // // //                       <Input
// // // // // //                         id="originalPrice"
// // // // // //                         type="number"
// // // // // //                         placeholder="5999"
// // // // // //                         value={courseData.originalPrice}
// // // // // //                         onChange={(e) => handleInputChange('originalPrice', e.target.value)}
// // // // // //                       />
// // // // // //                     </div>
// // // // // //                   </div>
// // // // // //                 </CardContent>
// // // // // //               </Card>
// // // // // //             </motion.div>

// // // // // //             {/* Thumbnail */}
// // // // // //             <motion.div
// // // // // //               initial={{ opacity: 0, y: 20 }}
// // // // // //               animate={{ opacity: 1, y: 0 }}
// // // // // //               transition={{ duration: 0.6, delay: 0.2 }}
// // // // // //             >
// // // // // //               <Card>
// // // // // //                 <CardHeader>
// // // // // //                   <CardTitle>Course Thumbnail *</CardTitle>
// // // // // //                 </CardHeader>
// // // // // //                 <CardContent className="space-y-4">
// // // // // //                   <div className="space-y-2">
// // // // // //                     <Label htmlFor="thumbnail-file">Upload Thumbnail</Label>
// // // // // //                     <div className="file-upload-area">
// // // // // //                       <input
// // // // // //                         ref={fileInputRef}
// // // // // //                         id="thumbnail-file"
// // // // // //                         type="file"
// // // // // //                         accept="image/*"
// // // // // //                         onChange={handleFileChange}
// // // // // //                         className="hidden"
// // // // // //                         required={!courseData.thumbnail}
// // // // // //                       />
// // // // // //                       <div
// // // // // //                         className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center cursor-pointer hover:border-gray-400 transition-colors"
// // // // // //                         onClick={() => fileInputRef.current?.click()}
// // // // // //                       >
// // // // // //                         {selectedFile ? (
// // // // // //                           <div className="flex flex-col items-center gap-2">
// // // // // //                             <ImageIcon className="w-8 h-8 text-green-600" />
// // // // // //                             <span className="text-sm font-medium text-green-600">
// // // // // //                               {selectedFile.name}
// // // // // //                             </span>
// // // // // //                             <span className="text-xs text-gray-500">
// // // // // //                               Click to change image
// // // // // //                             </span>
// // // // // //                           </div>
// // // // // //                         ) : (
// // // // // //                           <div className="flex flex-col items-center gap-2">
// // // // // //                             <Upload className="w-8 h-8 text-gray-400" />
// // // // // //                             <span className="text-sm font-medium">
// // // // // //                               Click to upload thumbnail
// // // // // //                             </span>
// // // // // //                             <span className="text-xs text-gray-500">
// // // // // //                               PNG, JPG, JPEG up to 3MB
// // // // // //                             </span>
// // // // // //                           </div>
// // // // // //                         )}
// // // // // //                       </div>
// // // // // //                     </div>
// // // // // //                   </div>
// // // // // //                   <div className="text-center text-muted-foreground">OR</div>
// // // // // //                   <div className="space-y-2">
// // // // // //                     <Label htmlFor="thumbnail-url">Thumbnail URL</Label>
// // // // // //                     <Input
// // // // // //                       id="thumbnail-url"
// // // // // //                       placeholder="https://example.com/image.jpg"
// // // // // //                       value={courseData.thumbnail}
// // // // // //                       onChange={(e) => handleInputChange('thumbnail', e.target.value)}
// // // // // //                     />
// // // // // //                   </div>
// // // // // //                 </CardContent>
// // // // // //               </Card>
// // // // // //             </motion.div>

// // // // // //             {/* Features */}
// // // // // //             <motion.div
// // // // // //               initial={{ opacity: 0, y: 20 }}
// // // // // //               animate={{ opacity: 1, y: 0 }}
// // // // // //               transition={{ duration: 0.6, delay: 0.3 }}
// // // // // //             >
// // // // // //               <Card>
// // // // // //                 <CardHeader>
// // // // // //                   <CardTitle>Course Features</CardTitle>
// // // // // //                 </CardHeader>
// // // // // //                 <CardContent className="space-y-4">
// // // // // //                   <div className="flex gap-2">
// // // // // //                     <Input
// // // // // //                       placeholder="Add a course feature"
// // // // // //                       value={newFeature}
// // // // // //                       onChange={(e) => setNewFeature(e.target.value)}
// // // // // //                       onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addFeature())}
// // // // // //                     />
// // // // // //                     <Button type="button" onClick={addFeature}>
// // // // // //                       <Plus className="w-4 h-4" />
// // // // // //                     </Button>
// // // // // //                   </div>
// // // // // //                   <div className="flex flex-wrap gap-2">
// // // // // //                     {courseData.features.map((feature, index) => (
// // // // // //                       <Badge key={index} variant="secondary" className="flex items-center gap-2">
// // // // // //                         {feature}
// // // // // //                         <button
// // // // // //                           type="button"
// // // // // //                           onClick={() => removeFeature(index)}
// // // // // //                           className="text-xs hover:text-destructive"
// // // // // //                         >
// // // // // //                           ×
// // // // // //                         </button>
// // // // // //                       </Badge>
// // // // // //                     ))}
// // // // // //                   </div>
// // // // // //                 </CardContent>
// // // // // //               </Card>
// // // // // //             </motion.div>

// // // // // //             {/* Learning Outcomes */}
// // // // // //             <motion.div
// // // // // //               initial={{ opacity: 0, y: 20 }}
// // // // // //               animate={{ opacity: 1, y: 0 }}
// // // // // //               transition={{ duration: 0.6, delay: 0.4 }}
// // // // // //             >
// // // // // //               <Card>
// // // // // //                 <CardHeader>
// // // // // //                   <CardTitle>Learning Outcomes</CardTitle>
// // // // // //                 </CardHeader>
// // // // // //                 <CardContent className="space-y-4">
// // // // // //                   <div className="flex gap-2">
// // // // // //                     <Input
// // // // // //                       placeholder="What will students learn?"
// // // // // //                       value={newOutcome}
// // // // // //                       onChange={(e) => setNewOutcome(e.target.value)}
// // // // // //                       onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addOutcome())}
// // // // // //                     />
// // // // // //                     <Button type="button" onClick={addOutcome}>
// // // // // //                       <Plus className="w-4 h-4" />
// // // // // //                     </Button>
// // // // // //                   </div>
// // // // // //                   <div className="space-y-2">
// // // // // //                     {courseData.learningOutcomes.map((outcome, index) => (
// // // // // //                       <div key={index} className="flex items-center gap-2 p-2 bg-muted rounded">
// // // // // //                         <span className="flex-1">{outcome}</span>
// // // // // //                         <Button
// // // // // //                           type="button"
// // // // // //                           variant="ghost"
// // // // // //                           size="sm"
// // // // // //                           onClick={() => removeOutcome(index)}
// // // // // //                         >
// // // // // //                           <Trash2 className="w-4 h-4" />
// // // // // //                         </Button>
// // // // // //                       </div>
// // // // // //                     ))}
// // // // // //                   </div>
// // // // // //                 </CardContent>
// // // // // //               </Card>
// // // // // //             </motion.div>

// // // // // //             {/* Course Content */}
// // // // // //             <motion.div
// // // // // //               initial={{ opacity: 0, y: 20 }}
// // // // // //               animate={{ opacity: 1, y: 0 }}
// // // // // //               transition={{ duration: 0.6, delay: 0.5 }}
// // // // // //             >
// // // // // //               <Card>
// // // // // //                 <CardHeader>
// // // // // //                   <div className="flex items-center justify-between">
// // // // // //                     <CardTitle>Course Content</CardTitle>
// // // // // //                     <Button type="button" onClick={addContentSection} variant="outline">
// // // // // //                       <Plus className="w-4 h-4 mr-2" />
// // // // // //                       Add Section
// // // // // //                     </Button>
// // // // // //                   </div>
// // // // // //                 </CardHeader>
// // // // // //                 <CardContent className="space-y-6">
// // // // // //                   {courseContent.map((section, index) => (
// // // // // //                     <div key={section.id} className="border rounded-lg p-4 space-y-4">
// // // // // //                       <div className="flex items-center justify-between">
// // // // // //                         <h4 className="font-medium">Section {index + 1}</h4>
// // // // // //                         <Button
// // // // // //                           type="button"
// // // // // //                           variant="ghost"
// // // // // //                           size="sm"
// // // // // //                           onClick={() => removeContentSection(section.id)}
// // // // // //                         >
// // // // // //                           <Trash2 className="w-4 h-4" />
// // // // // //                         </Button>
// // // // // //                       </div>

// // // // // //                       <div className="grid md:grid-cols-2 gap-4">
// // // // // //                         <div className="space-y-2">
// // // // // //                           <Label>Section Title</Label>
// // // // // //                           <Input
// // // // // //                             placeholder="Enter section title"
// // // // // //                             value={section.title}
// // // // // //                             onChange={(e) => updateContentSection(section.id, 'title', e.target.value)}
// // // // // //                           />
// // // // // //                         </div>
// // // // // //                         <div className="space-y-2">
// // // // // //                           <Label>Video URL</Label>
// // // // // //                           <div className="relative">
// // // // // //                             <LinkIcon className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
// // // // // //                             <Input
// // // // // //                               placeholder="YouTube video URL"
// // // // // //                               value={section.videoUrl}
// // // // // //                               onChange={(e) => updateContentSection(section.id, 'videoUrl', e.target.value)}
// // // // // //                               className="pl-10"
// // // // // //                             />
// // // // // //                           </div>
// // // // // //                         </div>
// // // // // //                       </div>

// // // // // //                       <div className="space-y-2">
// // // // // //                         <Label>Section Description</Label>
// // // // // //                         <Textarea
// // // // // //                           placeholder="Describe what this section covers"
// // // // // //                           rows={3}
// // // // // //                           value={section.description}
// // // // // //                           onChange={(e) => updateContentSection(section.id, 'description', e.target.value)}
// // // // // //                         />
// // // // // //                       </div>
// // // // // //                     </div>
// // // // // //                   ))}

// // // // // //                   {courseContent.length === 0 && (
// // // // // //                     <div className="text-center py-8 text-muted-foreground">
// // // // // //                       <p>No content sections added yet.</p>
// // // // // //                       <p className="text-sm">Click "Add Section" to start building your course content.</p>
// // // // // //                     </div>
// // // // // //                   )}
// // // // // //                 </CardContent>
// // // // // //               </Card>
// // // // // //             </motion.div>

// // // // // //             {/* Submit Button */}
// // // // // //             <motion.div
// // // // // //               className="flex justify-end gap-4"
// // // // // //               initial={{ opacity: 0, y: 20 }}
// // // // // //               animate={{ opacity: 1, y: 0 }}
// // // // // //               transition={{ duration: 0.6, delay: 0.6 }}
// // // // // //             >
// // // // // //               <Link href="/admin">
// // // // // //                 <Button type="button" variant="outline">
// // // // // //                   Cancel
// // // // // //                 </Button>
// // // // // //               </Link>
// // // // // //               <Button
// // // // // //                 type="submit"
// // // // // //                 disabled={isLoading}
// // // // // //                 className="bg-purple-600 hover:bg-purple-700"
// // // // // //               >
// // // // // //                 {isUploading ? (
// // // // // //                   <>
// // // // // //                     <div className="inline-flex items-center">
// // // // // //                       <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
// // // // // //                       <span>Creating Course...</span>
// // // // // //                     </div>
// // // // // //                   </>
// // // // // //                 ) : (
// // // // // //                   <>
// // // // // //                     <Upload className="w-4 h-4 mr-2" />
// // // // // //                     <span>Create Course</span>
// // // // // //                   </>
// // // // // //                 )}
// // // // // //               </Button>
// // // // // //             </motion.div>
// // // // // //           </form>
// // // // // //         </div>
// // // // // //       </main>
// // // // // //     </div>
// // // // // //   );
// // // // // // }

// // // // // 'use client';

// // // // // import { useState, useRef } from 'react';
// // // // // import { motion } from 'framer-motion';
// // // // // import { useRouter } from 'next/navigation';
// // // // // import { ArrowLeft, Plus, Trash2, Upload, Link as LinkIcon, Image as ImageIcon } from 'lucide-react';
// // // // // import { Button } from '@/components/ui/button';
// // // // // import { Input } from '@/components/ui/input';
// // // // // import { Label } from '@/components/ui/label';
// // // // // import { Textarea } from '@/components/ui/textarea';
// // // // // import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
// // // // // import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
// // // // // import { Badge } from '@/components/ui/badge';
// // // // // import { toast } from 'sonner';
// // // // // import Link from 'next/link';
// // // // // import AdminNavbar from '@/components/admin-navbar';
// // // // // import uploader from '@/lib/cloudinary';

// // // // // const categories = [
// // // // //   'Web Development',
// // // // //   'Data Science',
// // // // //   'Digital Marketing',
// // // // //   'Mobile Development',
// // // // //   'UI/UX Design',
// // // // //   'Business',
// // // // //   'AI & Machine Learning',
// // // // //   'Cybersecurity'
// // // // // ];

// // // // // const levels = ['Beginner', 'Intermediate', 'Advanced'];

// // // // // export default function CreateCoursePage() {
// // // // //   const fileInputRef = useRef(null);
// // // // //   const [selectedFile, setSelectedFile] = useState(null);
// // // // //   const [isUploading, setIsUploading] = useState(false);

// // // // //   const [courseData, setCourseData] = useState({
// // // // //     title: '',
// // // // //     description: '',
// // // // //     category: '',
// // // // //     level: '',
// // // // //     price: '',
// // // // //     originalPrice: '',
// // // // //     duration: '',
// // // // //     thumbnail: '',
// // // // //     features: [],
// // // // //     learningOutcomes: []
// // // // //   });

// // // // //   const [courseContent, setCourseContent] = useState([]);
// // // // //   const [newFeature, setNewFeature] = useState('');
// // // // //   const [newOutcome, setNewOutcome] = useState('');
// // // // //   const [isLoading, setIsLoading] = useState(false);
// // // // //   const router = useRouter();

// // // // //   const handleInputChange = (field, value) => {
// // // // //     setCourseData(prev => ({
// // // // //       ...prev,
// // // // //       [field]: value
// // // // //     }));
// // // // //   };

// // // // //   const handleFileChange = (event) => {
// // // // //     const files = event.target.files;
// // // // //     if (files.length > 0) {
// // // // //       const file = files[0];
// // // // //       if (!file.type.includes('image')) {
// // // // //         toast.error('Invalid file type. Please select an image.');
// // // // //         return;
// // // // //       }

// // // // //       const fileSizeInMB = file.size / (1024 * 1024);
// // // // //       if (fileSizeInMB > 3) {
// // // // //         toast.error("The image size is greater than 3 MB. Please select a smaller image.");
// // // // //         event.target.value = "";
// // // // //         return;
// // // // //       }

// // // // //       setSelectedFile(file);
// // // // //       console.log('Image selected:', file.name);
// // // // //     }
// // // // //   };

// // // // //   const addFeature = () => {
// // // // //     if (newFeature.trim()) {
// // // // //       setCourseData(prev => ({
// // // // //         ...prev,
// // // // //         features: [...prev.features, newFeature.trim()]
// // // // //       }));
// // // // //       setNewFeature('');
// // // // //     }
// // // // //   };

// // // // //   const removeFeature = (index) => {
// // // // //     setCourseData(prev => ({
// // // // //       ...prev,
// // // // //       features: prev.features.filter((_, i) => i !== index)
// // // // //     }));
// // // // //   };

// // // // //   const addOutcome = () => {
// // // // //     if (newOutcome.trim()) {
// // // // //       setCourseData(prev => ({
// // // // //         ...prev,
// // // // //         learningOutcomes: [...prev.learningOutcomes, newOutcome.trim()]
// // // // //       }));
// // // // //       setNewOutcome('');
// // // // //     }
// // // // //   };

// // // // //   const removeOutcome = (index) => {
// // // // //     setCourseData(prev => ({
// // // // //       ...prev,
// // // // //       learningOutcomes: prev.learningOutcomes.filter((_, i) => i !== index)
// // // // //     }));
// // // // //   };

// // // // //   const addContentSection = () => {
// // // // //     setCourseContent(prev => [...prev, {
// // // // //       id: Date.now(),
// // // // //       title: '',
// // // // //       description: '',
// // // // //       videoUrl: '',
// // // // //       resources: []
// // // // //     }]);
// // // // //   };

// // // // //   const updateContentSection = (id, field, value) => {
// // // // //     setCourseContent(prev => prev.map(section =>
// // // // //       section.id === id ? { ...section, [field]: value } : section
// // // // //     ));
// // // // //   };

// // // // //   const removeContentSection = (id) => {
// // // // //     setCourseContent(prev => prev.filter(section => section.id !== id));
// // // // //   };

// // // // //   const validateForm = () => {
// // // // //     if (!courseData.title.trim()) {
// // // // //       toast.error("Course title is required");
// // // // //       return false;
// // // // //     }
// // // // //     if (!courseData.description.trim()) {
// // // // //       toast.error("Course description is required");
// // // // //       return false;
// // // // //     }
// // // // //     if (!courseData.category) {
// // // // //       toast.error("Course category is required");
// // // // //       return false;
// // // // //     }
// // // // //     if (!courseData.level) {
// // // // //       toast.error("Course level is required");
// // // // //       return false;
// // // // //     }
// // // // //     if (!courseData.price) {
// // // // //       toast.error("Course price is required");
// // // // //       return false;
// // // // //     }
// // // // //     if (!courseData.duration.trim()) {
// // // // //       toast.error("Course duration is required");
// // // // //       return false;
// // // // //     }
// // // // //     if (!selectedFile && !courseData.thumbnail) {
// // // // //       toast.error("Course thumbnail is required");
// // // // //       return false;
// // // // //     }
// // // // //     return true;
// // // // //   };

// // // // //   const handleSubmit = async (e) => {
// // // // //     if (e && e.preventDefault) {
// // // // //       e.preventDefault();
// // // // //     }

// // // // //     console.log('Submit button clicked');

// // // // //     if (!validateForm()) {
// // // // //       return;
// // // // //     }

// // // // //     console.log('Validation passed, starting submission...');
// // // // //     setIsLoading(true);
// // // // //     setIsUploading(true);

// // // // //     try {
// // // // //       let thumbnailUrl = courseData.thumbnail;

// // // // //       // Upload thumbnail if file is selected
// // // // //       if (selectedFile) {
// // // // //         console.log('Uploading thumbnail...');
// // // // //         const formDataOBJ = new FormData();
// // // // //         formDataOBJ.append('file', selectedFile);

// // // // //         const imgLinkObj = await uploader(formDataOBJ);
// // // // //         console.log('Upload response:', imgLinkObj);

// // // // //         if (imgLinkObj.status === 200 && imgLinkObj.imgLinkArray.length) {
// // // // //           thumbnailUrl = imgLinkObj.imgLinkArray[0];
// // // // //           console.log('Thumbnail uploaded successfully:', thumbnailUrl);
// // // // //         } else {
// // // // //           toast.error("Failed to upload thumbnail");
// // // // //           setIsLoading(false);
// // // // //           setIsUploading(false);
// // // // //           return;
// // // // //         }
// // // // //       }

// // // // //       const payload = {
// // // // //         ...courseData,
// // // // //         thumbnail: thumbnailUrl,
// // // // //         content: courseContent,
// // // // //         price: parseFloat(courseData.price),
// // // // //         originalPrice: courseData.originalPrice ? parseFloat(courseData.originalPrice) : null,
// // // // //       };

// // // // //       console.log('Sending API request with payload:', payload);

// // // // //       const response = await fetch('/api/admin/courses/create', {
// // // // //         method: 'POST',
// // // // //         headers: {
// // // // //           'Content-Type': 'application/json',
// // // // //         },
// // // // //         body: JSON.stringify(payload),
// // // // //       });

// // // // //       console.log('API response status:', response.status);

// // // // //       const data = await response.json();
// // // // //       console.log('API response data:', data);

// // // // //       if (response.ok) {
// // // // //         toast.success('Course created successfully!');

// // // // //         // Reset form
// // // // //         setCourseData({
// // // // //           title: '',
// // // // //           description: '',
// // // // //           category: '',
// // // // //           level: '',
// // // // //           price: '',
// // // // //           originalPrice: '',
// // // // //           duration: '',
// // // // //           thumbnail: '',
// // // // //           features: [],
// // // // //           learningOutcomes: []
// // // // //         });
// // // // //         setCourseContent([]);
// // // // //         setSelectedFile(null);
// // // // //         if (fileInputRef.current) {
// // // // //           fileInputRef.current.value = "";
// // // // //         }

// // // // //         router.push('/admin');
// // // // //       } else {
// // // // //         console.error('API error:', data);
// // // // //         toast.error(data.message || 'Failed to create course');
// // // // //       }
// // // // //     } catch (error) {
// // // // //       console.error('Course creation error:', error);
// // // // //       toast.error('Something went wrong. Please try again.');
// // // // //     } finally {
// // // // //       setIsLoading(false);
// // // // //       setIsUploading(false);
// // // // //     }
// // // // //   };

// // // // //   return (
// // // // //     <div className="min-h-screen bg-background">
// // // // //       <AdminNavbar />

// // // // //       <main className="pt-20 pb-12">
// // // // //         <div className="container mx-auto px-4 max-w-4xl">
// // // // //           {/* Header */}
// // // // //           <motion.div
// // // // //             className="flex items-center gap-4 mb-8"
// // // // //             initial={{ opacity: 0, y: 20 }}
// // // // //             animate={{ opacity: 1, y: 0 }}
// // // // //             transition={{ duration: 0.6 }}
// // // // //           >
// // // // //             <Link href="/admin">
// // // // //               <Button variant="outline" size="icon">
// // // // //                 <ArrowLeft className="w-4 h-4" />
// // // // //               </Button>
// // // // //             </Link>
// // // // //             <div>
// // // // //               <h1 className="text-3xl font-bold">Create New Course</h1>
// // // // //               <p className="text-muted-foreground">
// // // // //                 Add a new course to your platform with content and resources.
// // // // //               </p>
// // // // //             </div>
// // // // //           </motion.div>

// // // // //           {/* Wrap everything in a form for better semantics */}
// // // // //           <form onSubmit={handleSubmit} className="space-y-8">
// // // // //             {/* Basic Information */}
// // // // //             <motion.div
// // // // //               initial={{ opacity: 0, y: 20 }}
// // // // //               animate={{ opacity: 1, y: 0 }}
// // // // //               transition={{ duration: 0.6, delay: 0.1 }}
// // // // //             >
// // // // //               <Card>
// // // // //                 <CardHeader>
// // // // //                   <CardTitle>Basic Information</CardTitle>
// // // // //                 </CardHeader>
// // // // //                 <CardContent className="space-y-6">
// // // // //                   <div className="grid md:grid-cols-2 gap-6">
// // // // //                     <div className="space-y-2">
// // // // //                       <Label htmlFor="title">Course Title *</Label>
// // // // //                       <Input
// // // // //                         id="title"
// // // // //                         placeholder="Enter course title"
// // // // //                         value={courseData.title}
// // // // //                         onChange={(e) => handleInputChange('title', e.target.value)}
// // // // //                         required
// // // // //                       />
// // // // //                     </div>
// // // // //                     <div className="space-y-2">
// // // // //                       <Label htmlFor="duration">Duration *</Label>
// // // // //                       <Input
// // // // //                         id="duration"
// // // // //                         placeholder="e.g., 40 hours"
// // // // //                         value={courseData.duration}
// // // // //                         onChange={(e) => handleInputChange('duration', e.target.value)}
// // // // //                         required
// // // // //                       />
// // // // //                     </div>
// // // // //                   </div>

// // // // //                   <div className="space-y-2">
// // // // //                     <Label htmlFor="description">Description *</Label>
// // // // //                     <Textarea
// // // // //                       id="description"
// // // // //                       placeholder="Describe what students will learn in this course"
// // // // //                       rows={4}
// // // // //                       value={courseData.description}
// // // // //                       onChange={(e) => handleInputChange('description', e.target.value)}
// // // // //                       required
// // // // //                     />
// // // // //                   </div>

// // // // //                   <div className="grid md:grid-cols-2 gap-6">
// // // // //                     <div className="space-y-2">
// // // // //                       <Label htmlFor="category">Category *</Label>
// // // // //                       <Select onValueChange={(value) => handleInputChange('category', value)} required>
// // // // //                         <SelectTrigger>
// // // // //                           <SelectValue placeholder="Select category" />
// // // // //                         </SelectTrigger>
// // // // //                         <SelectContent>
// // // // //                           {categories.map((category) => (
// // // // //                             <SelectItem key={category} value={category}>
// // // // //                               {category}
// // // // //                             </SelectItem>
// // // // //                           ))}
// // // // //                         </SelectContent>
// // // // //                       </Select>
// // // // //                     </div>
// // // // //                     <div className="space-y-2">
// // // // //                       <Label htmlFor="level">Level *</Label>
// // // // //                       <Select onValueChange={(value) => handleInputChange('level', value)} required>
// // // // //                         <SelectTrigger>
// // // // //                           <SelectValue placeholder="Select level" />
// // // // //                         </SelectTrigger>
// // // // //                         <SelectContent>
// // // // //                           {levels.map((level) => (
// // // // //                             <SelectItem key={level} value={level}>
// // // // //                               {level}
// // // // //                             </SelectItem>
// // // // //                           ))}
// // // // //                         </SelectContent>
// // // // //                       </Select>
// // // // //                     </div>
// // // // //                   </div>

// // // // //                   <div className="grid md:grid-cols-2 gap-6">
// // // // //                     <div className="space-y-2">
// // // // //                       <Label htmlFor="price">Price (₹) *</Label>
// // // // //                       <Input
// // // // //                         id="price"
// // // // //                         type="number"
// // // // //                         placeholder="2999"
// // // // //                         value={courseData.price}
// // // // //                         onChange={(e) => handleInputChange('price', e.target.value)}
// // // // //                         required
// // // // //                       />
// // // // //                     </div>
// // // // //                     <div className="space-y-2">
// // // // //                       <Label htmlFor="originalPrice">Original Price (₹)</Label>
// // // // //                       <Input
// // // // //                         id="originalPrice"
// // // // //                         type="number"
// // // // //                         placeholder="5999"
// // // // //                         value={courseData.originalPrice}
// // // // //                         onChange={(e) => handleInputChange('originalPrice', e.target.value)}
// // // // //                       />
// // // // //                     </div>
// // // // //                   </div>
// // // // //                 </CardContent>
// // // // //               </Card>
// // // // //             </motion.div>

// // // // //             {/* Thumbnail */}
// // // // //             <motion.div
// // // // //               initial={{ opacity: 0, y: 20 }}
// // // // //               animate={{ opacity: 1, y: 0 }}
// // // // //               transition={{ duration: 0.6, delay: 0.2 }}
// // // // //             >
// // // // //               <Card>
// // // // //                 <CardHeader>
// // // // //                   <CardTitle>Course Thumbnail *</CardTitle>
// // // // //                 </CardHeader>
// // // // //                 <CardContent className="space-y-4">
// // // // //                   <div className="space-y-2">
// // // // //                     <Label htmlFor="thumbnail-file">Upload Thumbnail</Label>
// // // // //                     <div className="file-upload-area">
// // // // //                       <input
// // // // //                         ref={fileInputRef}
// // // // //                         id="thumbnail-file"
// // // // //                         type="file"
// // // // //                         accept="image/*"
// // // // //                         onChange={handleFileChange}
// // // // //                         className="hidden"
// // // // //                         required={!courseData.thumbnail}
// // // // //                       />
// // // // //                       <div
// // // // //                         className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center cursor-pointer hover:border-gray-400 transition-colors"
// // // // //                         onClick={() => fileInputRef.current?.click()}
// // // // //                       >
// // // // //                         {selectedFile ? (
// // // // //                           <div className="flex flex-col items-center gap-2">
// // // // //                             <ImageIcon className="w-8 h-8 text-green-600" />
// // // // //                             <span className="text-sm font-medium text-green-600">
// // // // //                               {selectedFile.name}
// // // // //                             </span>
// // // // //                             <span className="text-xs text-gray-500">
// // // // //                               Click to change image
// // // // //                             </span>
// // // // //                           </div>
// // // // //                         ) : (
// // // // //                           <div className="flex flex-col items-center gap-2">
// // // // //                             <Upload className="w-8 h-8 text-gray-400" />
// // // // //                             <span className="text-sm font-medium">
// // // // //                               Click to upload thumbnail
// // // // //                             </span>
// // // // //                             <span className="text-xs text-gray-500">
// // // // //                               PNG, JPG, JPEG up to 3MB
// // // // //                             </span>
// // // // //                           </div>
// // // // //                         )}
// // // // //                       </div>
// // // // //                     </div>
// // // // //                   </div>
// // // // //                   <div className="text-center text-muted-foreground">OR</div>
// // // // //                   <div className="space-y-2">
// // // // //                     <Label htmlFor="thumbnail-url">Thumbnail URL</Label>
// // // // //                     <Input
// // // // //                       id="thumbnail-url"
// // // // //                       placeholder="https://example.com/image.jpg"
// // // // //                       value={courseData.thumbnail}
// // // // //                       onChange={(e) => handleInputChange('thumbnail', e.target.value)}
// // // // //                     />
// // // // //                   </div>
// // // // //                 </CardContent>
// // // // //               </Card>
// // // // //             </motion.div>

// // // // //             {/* Features */}
// // // // //             <motion.div
// // // // //               initial={{ opacity: 0, y: 20 }}
// // // // //               animate={{ opacity: 1, y: 0 }}
// // // // //               transition={{ duration: 0.6, delay: 0.3 }}
// // // // //             >
// // // // //               <Card>
// // // // //                 <CardHeader>
// // // // //                   <CardTitle>Course Features</CardTitle>
// // // // //                 </CardHeader>
// // // // //                 <CardContent className="space-y-4">
// // // // //                   <div className="flex gap-2">
// // // // //                     <Input
// // // // //                       placeholder="Add a course feature"
// // // // //                       value={newFeature}
// // // // //                       onChange={(e) => setNewFeature(e.target.value)}
// // // // //                       onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addFeature())}
// // // // //                     />
// // // // //                     <Button type="button" onClick={addFeature}>
// // // // //                       <Plus className="w-4 h-4" />
// // // // //                     </Button>
// // // // //                   </div>
// // // // //                   <div className="flex flex-wrap gap-2">
// // // // //                     {courseData.features.map((feature, index) => (
// // // // //                       <Badge key={index} variant="secondary" className="flex items-center gap-2">
// // // // //                         {feature}
// // // // //                         <button
// // // // //                           type="button"
// // // // //                           onClick={() => removeFeature(index)}
// // // // //                           className="text-xs hover:text-destructive"
// // // // //                         >
// // // // //                           ×
// // // // //                         </button>
// // // // //                       </Badge>
// // // // //                     ))}
// // // // //                   </div>
// // // // //                 </CardContent>
// // // // //               </Card>
// // // // //             </motion.div>

// // // // //             {/* Learning Outcomes */}
// // // // //             <motion.div
// // // // //               initial={{ opacity: 0, y: 20 }}
// // // // //               animate={{ opacity: 1, y: 0 }}
// // // // //               transition={{ duration: 0.6, delay: 0.4 }}
// // // // //             >
// // // // //               <Card>
// // // // //                 <CardHeader>
// // // // //                   <CardTitle>Learning Outcomes</CardTitle>
// // // // //                 </CardHeader>
// // // // //                 <CardContent className="space-y-4">
// // // // //                   <div className="flex gap-2">
// // // // //                     <Input
// // // // //                       placeholder="What will students learn?"
// // // // //                       value={newOutcome}
// // // // //                       onChange={(e) => setNewOutcome(e.target.value)}
// // // // //                       onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addOutcome())}
// // // // //                     />
// // // // //                     <Button type="button" onClick={addOutcome}>
// // // // //                       <Plus className="w-4 h-4" />
// // // // //                     </Button>
// // // // //                   </div>
// // // // //                   <div className="space-y-2">
// // // // //                     {courseData.learningOutcomes.map((outcome, index) => (
// // // // //                       <div key={index} className="flex items-center gap-2 p-2 bg-muted rounded">
// // // // //                         <span className="flex-1">{outcome}</span>
// // // // //                         <Button
// // // // //                           type="button"
// // // // //                           variant="ghost"
// // // // //                           size="sm"
// // // // //                           onClick={() => removeOutcome(index)}
// // // // //                         >
// // // // //                           <Trash2 className="w-4 h-4" />
// // // // //                         </Button>
// // // // //                       </div>
// // // // //                     ))}
// // // // //                   </div>
// // // // //                 </CardContent>
// // // // //               </Card>
// // // // //             </motion.div>

// // // // //             {/* Course Content */}
// // // // //             <motion.div
// // // // //               initial={{ opacity: 0, y: 20 }}
// // // // //               animate={{ opacity: 1, y: 0 }}
// // // // //               transition={{ duration: 0.6, delay: 0.5 }}
// // // // //             >
// // // // //               <Card>
// // // // //                 <CardHeader>
// // // // //                   <div className="flex items-center justify-between">
// // // // //                     <CardTitle>Course Content</CardTitle>
// // // // //                     <Button type="button" onClick={addContentSection} variant="outline">
// // // // //                       <Plus className="w-4 h-4 mr-2" />
// // // // //                       Add Section
// // // // //                     </Button>
// // // // //                   </div>
// // // // //                 </CardHeader>
// // // // //                 <CardContent className="space-y-6">
// // // // //                   {courseContent.map((section, index) => (
// // // // //                     <div key={section.id} className="border rounded-lg p-4 space-y-4">
// // // // //                       <div className="flex items-center justify-between">
// // // // //                         <h4 className="font-medium">Section {index + 1}</h4>
// // // // //                         <Button
// // // // //                           type="button"
// // // // //                           variant="ghost"
// // // // //                           size="sm"
// // // // //                           onClick={() => removeContentSection(section.id)}
// // // // //                         >
// // // // //                           <Trash2 className="w-4 h-4" />
// // // // //                         </Button>
// // // // //                       </div>

// // // // //                       <div className="grid md:grid-cols-2 gap-4">
// // // // //                         <div className="space-y-2">
// // // // //                           <Label>Section Title</Label>
// // // // //                           <Input
// // // // //                             placeholder="Enter section title"
// // // // //                             value={section.title}
// // // // //                             onChange={(e) => updateContentSection(section.id, 'title', e.target.value)}
// // // // //                           />
// // // // //                         </div>
// // // // //                         <div className="space-y-2">
// // // // //                           <Label>Video URL</Label>
// // // // //                           <div className="relative">
// // // // //                             <LinkIcon className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
// // // // //                             <Input
// // // // //                               placeholder="YouTube video URL"
// // // // //                               value={section.videoUrl}
// // // // //                               onChange={(e) => updateContentSection(section.id, 'videoUrl', e.target.value)}
// // // // //                               className="pl-10"
// // // // //                             />
// // // // //                           </div>
// // // // //                         </div>
// // // // //                       </div>

// // // // //                       <div className="space-y-2">
// // // // //                         <Label>Section Description</Label>
// // // // //                         <Textarea
// // // // //                           placeholder="Describe what this section covers"
// // // // //                           rows={3}
// // // // //                           value={section.description}
// // // // //                           onChange={(e) => updateContentSection(section.id, 'description', e.target.value)}
// // // // //                         />
// // // // //                       </div>
// // // // //                     </div>
// // // // //                   ))}

// // // // //                   {courseContent.length === 0 && (
// // // // //                     <div className="text-center py-8 text-muted-foreground">
// // // // //                       <p>No content sections added yet.</p>
// // // // //                       <p className="text-sm">Click "Add Section" to start building your course content.</p>
// // // // //                     </div>
// // // // //                   )}
// // // // //                 </CardContent>
// // // // //               </Card>
// // // // //             </motion.div>

// // // // //             {/* Submit Button */}
// // // // //             <motion.div
// // // // //               className="flex justify-end gap-4"
// // // // //               initial={{ opacity: 0, y: 20 }}
// // // // //               animate={{ opacity: 1, y: 0 }}
// // // // //               transition={{ duration: 0.6, delay: 0.6 }}
// // // // //             >
// // // // //               <Link href="/admin">
// // // // //                 <Button type="button" variant="outline">
// // // // //                   Cancel
// // // // //                 </Button>
// // // // //               </Link>
// // // // //               <Button
// // // // //                 type="submit"
// // // // //                 disabled={isLoading}
// // // // //                 className="bg-purple-600 hover:bg-purple-700"
// // // // //               >
// // // // //                 {isUploading ? (
// // // // //                   <>
// // // // //                     <div className="inline-flex items-center">
// // // // //                       <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
// // // // //                       <span>Creating Course...</span>
// // // // //                     </div>
// // // // //                   </>
// // // // //                 ) : (
// // // // //                   <>
// // // // //                     <Upload className="w-4 h-4 mr-2" />
// // // // //                     <span>Create Course</span>
// // // // //                   </>
// // // // //                 )}
// // // // //               </Button>
// // // // //             </motion.div>
// // // // //           </form>
// // // // //         </div>
// // // // //       </main>
// // // // //     </div>
// // // // //   );
// // // // // }

// // // // 'use client';

// // // // import { useState, useRef } from 'react';
// // // // import { motion } from 'framer-motion';
// // // // import { useRouter } from 'next/navigation';
// // // // import { ArrowLeft, Plus, Trash2, Upload, Link as LinkIcon, Image as ImageIcon } from 'lucide-react';
// // // // import { Button } from '@/components/ui/button';
// // // // import { Input } from '@/components/ui/input';
// // // // import { Label } from '@/components/ui/label';
// // // // import { Textarea } from '@/components/ui/textarea';
// // // // import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
// // // // import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
// // // // import { Badge } from '@/components/ui/badge';
// // // // import { toast } from 'sonner';
// // // // import Link from 'next/link';
// // // // import AdminNavbar from '@/components/admin-navbar';
// // // // import uploader from '@/lib/cloudinary';

// // // // const categories = [
// // // //   'Web Development',
// // // //   'Data Science',
// // // //   'Digital Marketing',
// // // //   'Mobile Development',
// // // //   'UI/UX Design',
// // // //   'Business',
// // // //   'AI & Machine Learning',
// // // //   'Cybersecurity'
// // // // ];

// // // // const levels = ['Beginner', 'Intermediate', 'Advanced'];

// // // // export default function CreateCoursePage() {
// // // //   const fileInputRef = useRef(null);
// // // //   const [selectedFile, setSelectedFile] = useState(null);
// // // //   const [isUploading, setIsUploading] = useState(false);

// // // //   const [courseData, setCourseData] = useState({
// // // //     title: '',
// // // //     description: '',
// // // //     category: '',
// // // //     level: '',
// // // //     price: '',
// // // //     originalPrice: '',
// // // //     duration: '',
// // // //     thumbnail: '',
// // // //     features: [],
// // // //     learningOutcomes: []
// // // //   });

// // // //   const [courseContent, setCourseContent] = useState([]);
// // // //   const [newFeature, setNewFeature] = useState('');
// // // //   const [newOutcome, setNewOutcome] = useState('');
// // // //   const [isLoading, setIsLoading] = useState(false);
// // // //   const router = useRouter();

// // // //   const handleInputChange = (field, value) => {
// // // //     setCourseData(prev => ({
// // // //       ...prev,
// // // //       [field]: value
// // // //     }));
// // // //   };

// // // //   const handleFileChange = (event) => {
// // // //     const files = event.target.files;
// // // //     if (files.length > 0) {
// // // //       const file = files[0];
// // // //       if (!file.type.includes('image')) {
// // // //         toast.error('Invalid file type. Please select an image.');
// // // //         return;
// // // //       }

// // // //       const fileSizeInMB = file.size / (1024 * 1024);
// // // //       if (fileSizeInMB > 3) {
// // // //         toast.error("The image size is greater than 3 MB. Please select a smaller image.");
// // // //         event.target.value = "";
// // // //         return;
// // // //       }

// // // //       setSelectedFile(file);
// // // //       console.log('Image selected:', file.name);
// // // //     }
// // // //   };

// // // //   const addFeature = () => {
// // // //     if (newFeature.trim()) {
// // // //       setCourseData(prev => ({
// // // //         ...prev,
// // // //         features: [...prev.features, newFeature.trim()]
// // // //       }));
// // // //       setNewFeature('');
// // // //     }
// // // //   };

// // // //   const removeFeature = (index) => {
// // // //     setCourseData(prev => ({
// // // //       ...prev,
// // // //       features: prev.features.filter((_, i) => i !== index)
// // // //     }));
// // // //   };

// // // //   const addOutcome = () => {
// // // //     if (newOutcome.trim()) {
// // // //       setCourseData(prev => ({
// // // //         ...prev,
// // // //         learningOutcomes: [...prev.learningOutcomes, newOutcome.trim()]
// // // //       }));
// // // //       setNewOutcome('');
// // // //     }
// // // //   };

// // // //   const removeOutcome = (index) => {
// // // //     setCourseData(prev => ({
// // // //       ...prev,
// // // //       learningOutcomes: prev.learningOutcomes.filter((_, i) => i !== index)
// // // //     }));
// // // //   };

// // // //   const addContentSection = () => {
// // // //     setCourseContent(prev => [...prev, {
// // // //       id: Date.now(),
// // // //       title: '',
// // // //       description: '',
// // // //       videoUrl: '',
// // // //       resources: []
// // // //     }]);
// // // //   };

// // // //   const updateContentSection = (id, field, value) => {
// // // //     setCourseContent(prev => prev.map(section =>
// // // //       section.id === id ? { ...section, [field]: value } : section
// // // //     ));
// // // //   };

// // // //   const removeContentSection = (id) => {
// // // //     setCourseContent(prev => prev.filter(section => section.id !== id));
// // // //   };

// // // //   const validateForm = () => {
// // // //     if (!courseData.title.trim()) {
// // // //       toast.error("Course title is required");
// // // //       return false;
// // // //     }
// // // //     if (!courseData.description.trim()) {
// // // //       toast.error("Course description is required");
// // // //       return false;
// // // //     }
// // // //     if (!courseData.category) {
// // // //       toast.error("Course category is required");
// // // //       return false;
// // // //     }
// // // //     if (!courseData.level) {
// // // //       toast.error("Course level is required");
// // // //       return false;
// // // //     }
// // // //     if (!courseData.price) {
// // // //       toast.error("Course price is required");
// // // //       return false;
// // // //     }
// // // //     if (!courseData.duration.trim()) {
// // // //       toast.error("Course duration is required");
// // // //       return false;
// // // //     }
// // // //     // Remove thumbnail validation here - we'll handle it during upload
// // // //     return true;
// // // //   };

// // // //   const handleSubmit = async (e) => {
// // // //     if (e && e.preventDefault) {
// // // //       e.preventDefault();
// // // //     }

// // // //     console.log('Submit button clicked');

// // // //     if (!validateForm()) {
// // // //       return;
// // // //     }

// // // //     // Check if we have either a file or URL for thumbnail
// // // //     if (!selectedFile && !courseData.thumbnail.trim()) {
// // // //       toast.error("Course thumbnail is required - either upload a file or provide a URL");
// // // //       return;
// // // //     }

// // // //     console.log('Validation passed, starting submission...');
// // // //     setIsLoading(true);
// // // //     setIsUploading(true);

// // // //     try {
// // // //       let thumbnailUrl = courseData.thumbnail;

// // // //       // Upload thumbnail if file is selected
// // // //       if (selectedFile) {
// // // //         console.log('Starting thumbnail upload to Cloudinary...');
// // // //         const formDataOBJ = new FormData();
// // // //         formDataOBJ.append('file', selectedFile);

// // // //         const imgLinkObj = await uploader(formDataOBJ);
// // // //         console.log('Cloudinary upload response:', imgLinkObj);

// // // //         if (imgLinkObj.status === 200 && imgLinkObj.imgLinkArray && imgLinkObj.imgLinkArray.length > 0) {
// // // //           thumbnailUrl = imgLinkObj.imgLinkArray[0];
// // // //           console.log('Thumbnail uploaded successfully to Cloudinary:', thumbnailUrl);
// // // //         } else {
// // // //           console.error('Cloudinary upload failed:', imgLinkObj);
// // // //           toast.error("Failed to upload thumbnail to Cloudinary");
// // // //           setIsLoading(false);
// // // //           setIsUploading(false);
// // // //           return;
// // // //         }
// // // //       }

// // // //       // Verify we have a thumbnail URL before proceeding
// // // //       if (!thumbnailUrl || thumbnailUrl.trim() === '') {
// // // //         toast.error("Thumbnail URL is required");
// // // //         setIsLoading(false);
// // // //         setIsUploading(false);
// // // //         return;
// // // //       }

// // // //       const payload = {
// // // //         ...courseData,
// // // //         thumbnail: thumbnailUrl,
// // // //         content: courseContent,
// // // //         price: parseFloat(courseData.price),
// // // //         originalPrice: courseData.originalPrice ? parseFloat(courseData.originalPrice) : null,
// // // //       };

// // // //       console.log('Sending course creation request with payload:', payload);

// // // //       const response = await fetch('/api/admin/courses/create', {
// // // //         method: 'POST',
// // // //         headers: {
// // // //           'Content-Type': 'application/json',
// // // //         },
// // // //         body: JSON.stringify(payload),
// // // //       });

// // // //       console.log('Course creation API response status:', response.status);

// // // //       const data = await response.json();
// // // //       console.log('Course creation API response data:', data);

// // // //       if (response.ok) {
// // // //         toast.success('Course created successfully!');
// // // //         console.log('Course created with ID:', data.courseId);

// // // //         // Reset form
// // // //         setCourseData({
// // // //           title: '',
// // // //           description: '',
// // // //           category: '',
// // // //           level: '',
// // // //           price: '',
// // // //           originalPrice: '',
// // // //           duration: '',
// // // //           thumbnail: '',
// // // //           features: [],
// // // //           learningOutcomes: []
// // // //         });
// // // //         setCourseContent([]);
// // // //         setSelectedFile(null);
// // // //         if (fileInputRef.current) {
// // // //           fileInputRef.current.value = "";
// // // //         }

// // // //         // Small delay before redirect to ensure toast is visible
// // // //         setTimeout(() => {
// // // //           router.push('/admin');
// // // //         }, 1000);
// // // //       } else {
// // // //         console.error('Course creation API error:', data);
// // // //         toast.error(data.message || 'Failed to create course');
// // // //       }
// // // //     } catch (error) {
// // // //       console.error('Course creation error:', error);
// // // //       toast.error('Something went wrong. Please try again.');
// // // //     } finally {
// // // //       setIsLoading(false);
// // // //       setIsUploading(false);
// // // //     }
// // // //   };

// // // //   return (
// // // //     <div className="min-h-screen bg-background">
// // // //       <AdminNavbar />

// // // //       <main className="pt-20 pb-12">
// // // //         <div className="container mx-auto px-4 max-w-4xl">
// // // //           {/* Header */}
// // // //           <motion.div
// // // //             className="flex items-center gap-4 mb-8"
// // // //             initial={{ opacity: 0, y: 20 }}
// // // //             animate={{ opacity: 1, y: 0 }}
// // // //             transition={{ duration: 0.6 }}
// // // //           >
// // // //             <Link href="/admin">
// // // //               <Button variant="outline" size="icon">
// // // //                 <ArrowLeft className="w-4 h-4" />
// // // //               </Button>
// // // //             </Link>
// // // //             <div>
// // // //               <h1 className="text-3xl font-bold">Create New Course</h1>
// // // //               <p className="text-muted-foreground">
// // // //                 Add a new course to your platform with content and resources.
// // // //               </p>
// // // //             </div>
// // // //           </motion.div>

// // // //           {/* Wrap everything in a form for better semantics */}
// // // //           <form onSubmit={handleSubmit} className="space-y-8">
// // // //             {/* Basic Information */}
// // // //             <motion.div
// // // //               initial={{ opacity: 0, y: 20 }}
// // // //               animate={{ opacity: 1, y: 0 }}
// // // //               transition={{ duration: 0.6, delay: 0.1 }}
// // // //             >
// // // //               <Card>
// // // //                 <CardHeader>
// // // //                   <CardTitle>Basic Information</CardTitle>
// // // //                 </CardHeader>
// // // //                 <CardContent className="space-y-6">
// // // //                   <div className="grid md:grid-cols-2 gap-6">
// // // //                     <div className="space-y-2">
// // // //                       <Label htmlFor="title">Course Title *</Label>
// // // //                       <Input
// // // //                         id="title"
// // // //                         placeholder="Enter course title"
// // // //                         value={courseData.title}
// // // //                         onChange={(e) => handleInputChange('title', e.target.value)}
// // // //                         required
// // // //                       />
// // // //                     </div>
// // // //                     <div className="space-y-2">
// // // //                       <Label htmlFor="duration">Duration *</Label>
// // // //                       <Input
// // // //                         id="duration"
// // // //                         placeholder="e.g., 40 hours"
// // // //                         value={courseData.duration}
// // // //                         onChange={(e) => handleInputChange('duration', e.target.value)}
// // // //                         required
// // // //                       />
// // // //                     </div>
// // // //                   </div>

// // // //                   <div className="space-y-2">
// // // //                     <Label htmlFor="description">Description *</Label>
// // // //                     <Textarea
// // // //                       id="description"
// // // //                       placeholder="Describe what students will learn in this course"
// // // //                       rows={4}
// // // //                       value={courseData.description}
// // // //                       onChange={(e) => handleInputChange('description', e.target.value)}
// // // //                       required
// // // //                     />
// // // //                   </div>

// // // //                   <div className="grid md:grid-cols-2 gap-6">
// // // //                     <div className="space-y-2">
// // // //                       <Label htmlFor="category">Category *</Label>
// // // //                       <Select onValueChange={(value) => handleInputChange('category', value)} required>
// // // //                         <SelectTrigger>
// // // //                           <SelectValue placeholder="Select category" />
// // // //                         </SelectTrigger>
// // // //                         <SelectContent>
// // // //                           {categories.map((category) => (
// // // //                             <SelectItem key={category} value={category}>
// // // //                               {category}
// // // //                             </SelectItem>
// // // //                           ))}
// // // //                         </SelectContent>
// // // //                       </Select>
// // // //                     </div>
// // // //                     <div className="space-y-2">
// // // //                       <Label htmlFor="level">Level *</Label>
// // // //                       <Select onValueChange={(value) => handleInputChange('level', value)} required>
// // // //                         <SelectTrigger>
// // // //                           <SelectValue placeholder="Select level" />
// // // //                         </SelectTrigger>
// // // //                         <SelectContent>
// // // //                           {levels.map((level) => (
// // // //                             <SelectItem key={level} value={level}>
// // // //                               {level}
// // // //                             </SelectItem>
// // // //                           ))}
// // // //                         </SelectContent>
// // // //                       </Select>
// // // //                     </div>
// // // //                   </div>

// // // //                   <div className="grid md:grid-cols-2 gap-6">
// // // //                     <div className="space-y-2">
// // // //                       <Label htmlFor="price">Price (₹) *</Label>
// // // //                       <Input
// // // //                         id="price"
// // // //                         type="number"
// // // //                         placeholder="2999"
// // // //                         value={courseData.price}
// // // //                         onChange={(e) => handleInputChange('price', e.target.value)}
// // // //                         required
// // // //                       />
// // // //                     </div>
// // // //                     <div className="space-y-2">
// // // //                       <Label htmlFor="originalPrice">Original Price (₹)</Label>
// // // //                       <Input
// // // //                         id="originalPrice"
// // // //                         type="number"
// // // //                         placeholder="5999"
// // // //                         value={courseData.originalPrice}
// // // //                         onChange={(e) => handleInputChange('originalPrice', e.target.value)}
// // // //                       />
// // // //                     </div>
// // // //                   </div>
// // // //                 </CardContent>
// // // //               </Card>
// // // //             </motion.div>

// // // //             {/* Thumbnail */}
// // // //             <motion.div
// // // //               initial={{ opacity: 0, y: 20 }}
// // // //               animate={{ opacity: 1, y: 0 }}
// // // //               transition={{ duration: 0.6, delay: 0.2 }}
// // // //             >
// // // //               <Card>
// // // //                 <CardHeader>
// // // //                   <CardTitle>Course Thumbnail *</CardTitle>
// // // //                 </CardHeader>
// // // //                 <CardContent className="space-y-4">
// // // //                   <div className="space-y-2">
// // // //                     <Label htmlFor="thumbnail-file">Upload Thumbnail</Label>
// // // //                     <div className="file-upload-area">
// // // //                       <input
// // // //                         ref={fileInputRef}
// // // //                         id="thumbnail-file"
// // // //                         type="file"
// // // //                         accept="image/*"
// // // //                         onChange={handleFileChange}
// // // //                         className="hidden"
// // // //                       />
// // // //                       <div
// // // //                         className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center cursor-pointer hover:border-gray-400 transition-colors"
// // // //                         onClick={() => fileInputRef.current?.click()}
// // // //                       >
// // // //                         {selectedFile ? (
// // // //                           <div className="flex flex-col items-center gap-2">
// // // //                             <ImageIcon className="w-8 h-8 text-green-600" />
// // // //                             <span className="text-sm font-medium text-green-600">
// // // //                               {selectedFile.name}
// // // //                             </span>
// // // //                             <span className="text-xs text-gray-500">
// // // //                               Click to change image
// // // //                             </span>
// // // //                           </div>
// // // //                         ) : (
// // // //                           <div className="flex flex-col items-center gap-2">
// // // //                             <Upload className="w-8 h-8 text-gray-400" />
// // // //                             <span className="text-sm font-medium">
// // // //                               Click to upload thumbnail
// // // //                             </span>
// // // //                             <span className="text-xs text-gray-500">
// // // //                               PNG, JPG, JPEG up to 3MB
// // // //                             </span>
// // // //                           </div>
// // // //                         )}
// // // //                       </div>
// // // //                     </div>
// // // //                   </div>
// // // //                   <div className="text-center text-muted-foreground">OR</div>
// // // //                   <div className="space-y-2">
// // // //                     <Label htmlFor="thumbnail-url">Thumbnail URL</Label>
// // // //                     <Input
// // // //                       id="thumbnail-url"
// // // //                       placeholder="https://example.com/image.jpg"
// // // //                       value={courseData.thumbnail}
// // // //                       onChange={(e) => handleInputChange('thumbnail', e.target.value)}
// // // //                     />
// // // //                   </div>
// // // //                 </CardContent>
// // // //               </Card>
// // // //             </motion.div>

// // // //             {/* Features */}
// // // //             <motion.div
// // // //               initial={{ opacity: 0, y: 20 }}
// // // //               animate={{ opacity: 1, y: 0 }}
// // // //               transition={{ duration: 0.6, delay: 0.3 }}
// // // //             >
// // // //               <Card>
// // // //                 <CardHeader>
// // // //                   <CardTitle>Course Features</CardTitle>
// // // //                 </CardHeader>
// // // //                 <CardContent className="space-y-4">
// // // //                   <div className="flex gap-2">
// // // //                     <Input
// // // //                       placeholder="Add a course feature"
// // // //                       value={newFeature}
// // // //                       onChange={(e) => setNewFeature(e.target.value)}
// // // //                       onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addFeature())}
// // // //                     />
// // // //                     <Button type="button" onClick={addFeature}>
// // // //                       <Plus className="w-4 h-4" />
// // // //                     </Button>
// // // //                   </div>
// // // //                   <div className="flex flex-wrap gap-2">
// // // //                     {courseData.features.map((feature, index) => (
// // // //                       <Badge key={index} variant="secondary" className="flex items-center gap-2">
// // // //                         {feature}
// // // //                         <button
// // // //                           type="button"
// // // //                           onClick={() => removeFeature(index)}
// // // //                           className="text-xs hover:text-destructive"
// // // //                         >
// // // //                           ×
// // // //                         </button>
// // // //                       </Badge>
// // // //                     ))}
// // // //                   </div>
// // // //                 </CardContent>
// // // //               </Card>
// // // //             </motion.div>

// // // //             {/* Learning Outcomes */}
// // // //             <motion.div
// // // //               initial={{ opacity: 0, y: 20 }}
// // // //               animate={{ opacity: 1, y: 0 }}
// // // //               transition={{ duration: 0.6, delay: 0.4 }}
// // // //             >
// // // //               <Card>
// // // //                 <CardHeader>
// // // //                   <CardTitle>Learning Outcomes</CardTitle>
// // // //                 </CardHeader>
// // // //                 <CardContent className="space-y-4">
// // // //                   <div className="flex gap-2">
// // // //                     <Input
// // // //                       placeholder="What will students learn?"
// // // //                       value={newOutcome}
// // // //                       onChange={(e) => setNewOutcome(e.target.value)}
// // // //                       onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addOutcome())}
// // // //                     />
// // // //                     <Button type="button" onClick={addOutcome}>
// // // //                       <Plus className="w-4 h-4" />
// // // //                     </Button>
// // // //                   </div>
// // // //                   <div className="space-y-2">
// // // //                     {courseData.learningOutcomes.map((outcome, index) => (
// // // //                       <div key={index} className="flex items-center gap-2 p-2 bg-muted rounded">
// // // //                         <span className="flex-1">{outcome}</span>
// // // //                         <Button
// // // //                           type="button"
// // // //                           variant="ghost"
// // // //                           size="sm"
// // // //                           onClick={() => removeOutcome(index)}
// // // //                         >
// // // //                           <Trash2 className="w-4 h-4" />
// // // //                         </Button>
// // // //                       </div>
// // // //                     ))}
// // // //                   </div>
// // // //                 </CardContent>
// // // //               </Card>
// // // //             </motion.div>

// // // //             {/* Course Content */}
// // // //             <motion.div
// // // //               initial={{ opacity: 0, y: 20 }}
// // // //               animate={{ opacity: 1, y: 0 }}
// // // //               transition={{ duration: 0.6, delay: 0.5 }}
// // // //             >
// // // //               <Card>
// // // //                 <CardHeader>
// // // //                   <div className="flex items-center justify-between">
// // // //                     <CardTitle>Course Content</CardTitle>
// // // //                     <Button type="button" onClick={addContentSection} variant="outline">
// // // //                       <Plus className="w-4 h-4 mr-2" />
// // // //                       Add Section
// // // //                     </Button>
// // // //                   </div>
// // // //                 </CardHeader>
// // // //                 <CardContent className="space-y-6">
// // // //                   {courseContent.map((section, index) => (
// // // //                     <div key={section.id} className="border rounded-lg p-4 space-y-4">
// // // //                       <div className="flex items-center justify-between">
// // // //                         <h4 className="font-medium">Section {index + 1}</h4>
// // // //                         <Button
// // // //                           type="button"
// // // //                           variant="ghost"
// // // //                           size="sm"
// // // //                           onClick={() => removeContentSection(section.id)}
// // // //                         >
// // // //                           <Trash2 className="w-4 h-4" />
// // // //                         </Button>
// // // //                       </div>

// // // //                       <div className="grid md:grid-cols-2 gap-4">
// // // //                         <div className="space-y-2">
// // // //                           <Label>Section Title</Label>
// // // //                           <Input
// // // //                             placeholder="Enter section title"
// // // //                             value={section.title}
// // // //                             onChange={(e) => updateContentSection(section.id, 'title', e.target.value)}
// // // //                           />
// // // //                         </div>
// // // //                         <div className="space-y-2">
// // // //                           <Label>Video URL</Label>
// // // //                           <div className="relative">
// // // //                             <LinkIcon className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
// // // //                             <Input
// // // //                               placeholder="YouTube video URL"
// // // //                               value={section.videoUrl}
// // // //                               onChange={(e) => updateContentSection(section.id, 'videoUrl', e.target.value)}
// // // //                               className="pl-10"
// // // //                             />
// // // //                           </div>
// // // //                         </div>
// // // //                       </div>

// // // //                       <div className="space-y-2">
// // // //                         <Label>Section Description</Label>
// // // //                         <Textarea
// // // //                           placeholder="Describe what this section covers"
// // // //                           rows={3}
// // // //                           value={section.description}
// // // //                           onChange={(e) => updateContentSection(section.id, 'description', e.target.value)}
// // // //                         />
// // // //                       </div>
// // // //                     </div>
// // // //                   ))}

// // // //                   {courseContent.length === 0 && (
// // // //                     <div className="text-center py-8 text-muted-foreground">
// // // //                       <p>No content sections added yet.</p>
// // // //                       <p className="text-sm">Click "Add Section" to start building your course content.</p>
// // // //                     </div>
// // // //                   )}
// // // //                 </CardContent>
// // // //               </Card>
// // // //             </motion.div>

// // // //             {/* Submit Button */}
// // // //             <motion.div
// // // //               className="flex justify-end gap-4"
// // // //               initial={{ opacity: 0, y: 20 }}
// // // //               animate={{ opacity: 1, y: 0 }}
// // // //               transition={{ duration: 0.6, delay: 0.6 }}
// // // //             >
// // // //               <Link href="/admin">
// // // //                 <Button type="button" variant="outline">
// // // //                   Cancel
// // // //                 </Button>
// // // //               </Link>
// // // //               <Button
// // // //                 type="submit"
// // // //                 disabled={isLoading}
// // // //                 className="bg-purple-600 hover:bg-purple-700"
// // // //               >
// // // //                 {isUploading ? (
// // // //                   <>
// // // //                     <div className="inline-flex items-center">
// // // //                       <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
// // // //                       <span>Creating Course...</span>
// // // //                     </div>
// // // //                   </>
// // // //                 ) : (
// // // //                   <>
// // // //                     <Upload className="w-4 h-4 mr-2" />
// // // //                     <span>Create Course</span>
// // // //                   </>
// // // //                 )}
// // // //               </Button>
// // // //             </motion.div>
// // // //           </form>
// // // //         </div>
// // // //       </main>
// // // //     </div>
// // // //   );
// // // // }

// // // 'use client';

// // // import { useState, useRef } from 'react';
// // // import { motion } from 'framer-motion';
// // // import { useRouter } from 'next/navigation';
// // // import { ArrowLeft, Plus, Trash2, Upload, Link as LinkIcon, Image as ImageIcon } from 'lucide-react';
// // // import { Button } from '@/components/ui/button';
// // // import { Input } from '@/components/ui/input';
// // // import { Label } from '@/components/ui/label';
// // // import { Textarea } from '@/components/ui/textarea';
// // // import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
// // // import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
// // // import { Badge } from '@/components/ui/badge';
// // // import { toast } from 'sonner';
// // // import Link from 'next/link';
// // // import AdminNavbar from '@/components/admin-navbar';
// // // import uploader from '@/lib/cloudinary';

// // // const categories = [
// // //   'Web Development',
// // //   'Data Science',
// // //   'Digital Marketing',
// // //   'Mobile Development',
// // //   'UI/UX Design',
// // //   'Business',
// // //   'AI & Machine Learning',
// // //   'Cybersecurity'
// // // ];

// // // const levels = ['Beginner', 'Intermediate', 'Advanced'];

// // // export default function CreateCoursePage() {
// // //   const fileInputRef = useRef(null);
// // //   const [selectedFile, setSelectedFile] = useState(null);
// // //   const [isUploading, setIsUploading] = useState(false);
// // //   const [uploadProgress, setUploadProgress] = useState('');

// // //   const [courseData, setCourseData] = useState({
// // //     title: '',
// // //     description: '',
// // //     category: '',
// // //     level: '',
// // //     price: '',
// // //     originalPrice: '',
// // //     duration: '',
// // //     thumbnail: '',
// // //     features: [],
// // //     learningOutcomes: []
// // //   });

// // //   const [courseContent, setCourseContent] = useState([]);
// // //   const [newFeature, setNewFeature] = useState('');
// // //   const [newOutcome, setNewOutcome] = useState('');
// // //   const [isLoading, setIsLoading] = useState(false);
// // //   const router = useRouter();

// // //   const handleInputChange = (field, value) => {
// // //     setCourseData(prev => ({
// // //       ...prev,
// // //       [field]: value
// // //     }));
// // //   };

// // //   const handleFileChange = (event) => {
// // //     const files = event.target.files;
// // //     if (files.length > 0) {
// // //       const file = files[0];
// // //       if (!file.type.includes('image')) {
// // //         toast.error('Invalid file type. Please select an image.');
// // //         return;
// // //       }

// // //       const fileSizeInMB = file.size / (1024 * 1024);
// // //       if (fileSizeInMB > 3) {
// // //         toast.error("The image size is greater than 3 MB. Please select a smaller image.");
// // //         event.target.value = "";
// // //         return;
// // //       }

// // //       setSelectedFile(file);
// // //       // Clear thumbnail URL when file is selected
// // //       setCourseData(prev => ({
// // //         ...prev,
// // //         thumbnail: ''
// // //       }));
// // //       console.log('Image file selected:', file.name);
// // //     }
// // //   };

// // //   const addFeature = () => {
// // //     if (newFeature.trim()) {
// // //       setCourseData(prev => ({
// // //         ...prev,
// // //         features: [...prev.features, newFeature.trim()]
// // //       }));
// // //       setNewFeature('');
// // //     }
// // //   };

// // //   const removeFeature = (index) => {
// // //     setCourseData(prev => ({
// // //       ...prev,
// // //       features: prev.features.filter((_, i) => i !== index)
// // //     }));
// // //   };

// // //   const addOutcome = () => {
// // //     if (newOutcome.trim()) {
// // //       setCourseData(prev => ({
// // //         ...prev,
// // //         learningOutcomes: [...prev.learningOutcomes, newOutcome.trim()]
// // //       }));
// // //       setNewOutcome('');
// // //     }
// // //   };

// // //   const removeOutcome = (index) => {
// // //     setCourseData(prev => ({
// // //       ...prev,
// // //       learningOutcomes: prev.learningOutcomes.filter((_, i) => i !== index)
// // //     }));
// // //   };

// // //   const addContentSection = () => {
// // //     setCourseContent(prev => [...prev, {
// // //       id: Date.now(),
// // //       title: '',
// // //       description: '',
// // //       videoUrl: '',
// // //       resources: []
// // //     }]);
// // //   };

// // //   const updateContentSection = (id, field, value) => {
// // //     setCourseContent(prev => prev.map(section =>
// // //       section.id === id ? { ...section, [field]: value } : section
// // //     ));
// // //   };

// // //   const removeContentSection = (id) => {
// // //     setCourseContent(prev => prev.filter(section => section.id !== id));
// // //   };

// // //   const validateForm = () => {
// // //     if (!courseData.title.trim()) {
// // //       toast.error("Course title is required");
// // //       return false;
// // //     }
// // //     if (!courseData.description.trim()) {
// // //       toast.error("Course description is required");
// // //       return false;
// // //     }
// // //     if (!courseData.category) {
// // //       toast.error("Course category is required");
// // //       return false;
// // //     }
// // //     if (!courseData.level) {
// // //       toast.error("Course level is required");
// // //       return false;
// // //     }
// // //     if (!courseData.price) {
// // //       toast.error("Course price is required");
// // //       return false;
// // //     }
// // //     if (!courseData.duration.trim()) {
// // //       toast.error("Course duration is required");
// // //       return false;
// // //     }
// // //     // Check if we have either a file or URL for thumbnail
// // //     if (!selectedFile && !courseData.thumbnail.trim()) {
// // //       toast.error("Course thumbnail is required - either upload a file or provide a URL");
// // //       return false;
// // //     }
// // //     return true;
// // //   };

// // //   const uploadImageToCloudinary = async () => {
// // //     if (!selectedFile) return null;

// // //     try {
// // //       console.log('Starting Cloudinary upload for file:', selectedFile.name);
// // //       setUploadProgress('Preparing upload...');

// // //       const formDataOBJ = new FormData();
// // //       formDataOBJ.append('file', selectedFile);

// // //       setUploadProgress('Uploading to Cloudinary...');
// // //       const imgLinkObj = await uploader(formDataOBJ);
// // //       console.log('Cloudinary upload response:', imgLinkObj);

// // //       if (imgLinkObj.status === 200 && imgLinkObj.imgLinkArray && imgLinkObj.imgLinkArray.length > 0) {
// // //         const uploadedUrl = imgLinkObj.imgLinkArray[0];
// // //         console.log('Image uploaded successfully to Cloudinary:', uploadedUrl);

// // //         setUploadProgress('Upload complete, processing...');

// // //         // Add a 3-second delay to ensure Cloudinary processing is complete
// // //         await new Promise(resolve => setTimeout(resolve, 3000));

// // //         setUploadProgress('Verifying upload...');

// // //         // Verify the image is accessible
// // //         try {
// // //           const verifyResponse = await fetch(uploadedUrl, { method: 'HEAD' });
// // //           if (verifyResponse.ok) {
// // //             console.log('Image verified successfully on Cloudinary');
// // //             setUploadProgress('Upload verified successfully');
// // //             return uploadedUrl;
// // //           } else {
// // //             console.error('Image verification failed:', verifyResponse.status);
// // //             throw new Error('Image verification failed');
// // //           }
// // //         } catch (verifyError) {
// // //           console.error('Image verification error:', verifyError);
// // //           // Still return the URL even if verification fails
// // //           return uploadedUrl;
// // //         }
// // //       } else {
// // //         console.error('Cloudinary upload failed:', imgLinkObj);
// // //         throw new Error('Failed to upload image to Cloudinary');
// // //       }
// // //     } catch (error) {
// // //       console.error('Cloudinary upload error:', error);
// // //       throw error;
// // //     }
// // //   };

// // //   const handleSubmit = async (e) => {
// // //     if (e && e.preventDefault) {
// // //       e.preventDefault();
// // //     }

// // //     console.log('=== COURSE CREATION STARTED ===');

// // //     if (!validateForm()) {
// // //       console.log('Form validation failed');
// // //       return;
// // //     }

// // //     console.log('Form validation passed, starting course creation process...');
// // //     setIsLoading(true);
// // //     setIsUploading(true);
// // //     setUploadProgress('Starting...');

// // //     try {
// // //       let finalThumbnailUrl = '';

// // //       // Step 1: Handle thumbnail - either use URL directly or upload file
// // //       if (courseData.thumbnail.trim()) {
// // //         // Direct URL provided
// // //         finalThumbnailUrl = courseData.thumbnail.trim();
// // //         console.log('Using direct thumbnail URL:', finalThumbnailUrl);
// // //         setUploadProgress('Using provided URL...');
// // //       } else if (selectedFile) {
// // //         // File upload to Cloudinary
// // //         console.log('Starting file upload to Cloudinary...');
// // //         setUploadProgress('Uploading image...');

// // //         finalThumbnailUrl = await uploadImageToCloudinary();

// // //         if (!finalThumbnailUrl) {
// // //           toast.error("Failed to upload thumbnail to Cloudinary");
// // //           setIsLoading(false);
// // //           setIsUploading(false);
// // //           setUploadProgress('');
// // //           return;
// // //         }
// // //       } else {
// // //         toast.error("Course thumbnail is required");
// // //         setIsLoading(false);
// // //         setIsUploading(false);
// // //         setUploadProgress('');
// // //         return;
// // //       }

// // //       console.log('Final thumbnail URL ready:', finalThumbnailUrl);

// // //       // Step 2: Prepare course data
// // //       setUploadProgress('Preparing course data...');

// // //       const payload = {
// // //         ...courseData,
// // //         thumbnail: finalThumbnailUrl,
// // //         content: courseContent,
// // //         price: parseFloat(courseData.price),
// // //         originalPrice: courseData.originalPrice ? parseFloat(courseData.originalPrice) : null,
// // //       };

// // //       console.log('Course payload prepared:', payload);

// // //       // Step 3: Create course in database
// // //       setUploadProgress('Creating course...');

// // //       console.log('Sending course creation request to API...');

// // //       const response = await fetch('/api/admin/courses/create', {
// // //         method: 'POST',
// // //         headers: {
// // //           'Content-Type': 'application/json',
// // //         },
// // //         body: JSON.stringify(payload),
// // //       });

// // //       console.log('API response status:', response.status);

// // //       const data = await response.json();
// // //       console.log('API response data:', data);

// // //       if (response.ok) {
// // //         console.log('=== COURSE CREATED SUCCESSFULLY ===');
// // //         console.log('Course ID:', data.courseId);

// // //         setUploadProgress('Course created successfully!');
// // //         toast.success('Course created successfully!');

// // //         // Reset form after successful creation
// // //         setCourseData({
// // //           title: '',
// // //           description: '',
// // //           category: '',
// // //           level: '',
// // //           price: '',
// // //           originalPrice: '',
// // //           duration: '',
// // //           thumbnail: '',
// // //           features: [],
// // //           learningOutcomes: []
// // //         });
// // //         setCourseContent([]);
// // //         setSelectedFile(null);
// // //         if (fileInputRef.current) {
// // //           fileInputRef.current.value = "";
// // //         }

// // //         // Small delay before redirect to ensure toast is visible
// // //         setTimeout(() => {
// // //           router.push('/admin');
// // //         }, 2000);
// // //       } else {
// // //         console.error('=== COURSE CREATION FAILED ===');
// // //         console.error('API error:', data);
// // //         toast.error(data.message || 'Failed to create course');
// // //       }
// // //     } catch (error) {
// // //       console.error('=== COURSE CREATION ERROR ===');
// // //       console.error('Error details:', error);
// // //       toast.error('Something went wrong. Please try again.');
// // //     } finally {
// // //       setIsLoading(false);
// // //       setIsUploading(false);
// // //       setUploadProgress('');
// // //     }
// // //   };

// // //   return (
// // //     <div className="min-h-screen bg-background">
// // //       <AdminNavbar />

// // //       <main className="pt-20 pb-12">
// // //         <div className="container mx-auto px-4 max-w-4xl">
// // //           {/* Header */}
// // //           <motion.div
// // //             className="flex items-center gap-4 mb-8"
// // //             initial={{ opacity: 0, y: 20 }}
// // //             animate={{ opacity: 1, y: 0 }}
// // //             transition={{ duration: 0.6 }}
// // //           >
// // //             <Link href="/admin">
// // //               <Button variant="outline" size="icon">
// // //                 <ArrowLeft className="w-4 h-4" />
// // //               </Button>
// // //             </Link>
// // //             <div>
// // //               <h1 className="text-3xl font-bold">Create New Course</h1>
// // //               <p className="text-muted-foreground">
// // //                 Add a new course to your platform with content and resources.
// // //               </p>
// // //             </div>
// // //           </motion.div>

// // //           {/* Wrap everything in a form for better semantics */}
// // //           <form onSubmit={handleSubmit} className="space-y-8">
// // //             {/* Basic Information */}
// // //             <motion.div
// // //               initial={{ opacity: 0, y: 20 }}
// // //               animate={{ opacity: 1, y: 0 }}
// // //               transition={{ duration: 0.6, delay: 0.1 }}
// // //             >
// // //               <Card>
// // //                 <CardHeader>
// // //                   <CardTitle>Basic Information</CardTitle>
// // //                 </CardHeader>
// // //                 <CardContent className="space-y-6">
// // //                   <div className="grid md:grid-cols-2 gap-6">
// // //                     <div className="space-y-2">
// // //                       <Label htmlFor="title">Course Title *</Label>
// // //                       <Input
// // //                         id="title"
// // //                         placeholder="Enter course title"
// // //                         value={courseData.title}
// // //                         onChange={(e) => handleInputChange('title', e.target.value)}
// // //                         required
// // //                       />
// // //                     </div>
// // //                     <div className="space-y-2">
// // //                       <Label htmlFor="duration">Duration *</Label>
// // //                       <Input
// // //                         id="duration"
// // //                         placeholder="e.g., 40 hours"
// // //                         value={courseData.duration}
// // //                         onChange={(e) => handleInputChange('duration', e.target.value)}
// // //                         required
// // //                       />
// // //                     </div>
// // //                   </div>

// // //                   <div className="space-y-2">
// // //                     <Label htmlFor="description">Description *</Label>
// // //                     <Textarea
// // //                       id="description"
// // //                       placeholder="Describe what students will learn in this course"
// // //                       rows={4}
// // //                       value={courseData.description}
// // //                       onChange={(e) => handleInputChange('description', e.target.value)}
// // //                       required
// // //                     />
// // //                   </div>

// // //                   <div className="grid md:grid-cols-2 gap-6">
// // //                     <div className="space-y-2">
// // //                       <Label htmlFor="category">Category *</Label>
// // //                       <Select onValueChange={(value) => handleInputChange('category', value)} required>
// // //                         <SelectTrigger>
// // //                           <SelectValue placeholder="Select category" />
// // //                         </SelectTrigger>
// // //                         <SelectContent>
// // //                           {categories.map((category) => (
// // //                             <SelectItem key={category} value={category}>
// // //                               {category}
// // //                             </SelectItem>
// // //                           ))}
// // //                         </SelectContent>
// // //                       </Select>
// // //                     </div>
// // //                     <div className="space-y-2">
// // //                       <Label htmlFor="level">Level *</Label>
// // //                       <Select onValueChange={(value) => handleInputChange('level', value)} required>
// // //                         <SelectTrigger>
// // //                           <SelectValue placeholder="Select level" />
// // //                         </SelectTrigger>
// // //                         <SelectContent>
// // //                           {levels.map((level) => (
// // //                             <SelectItem key={level} value={level}>
// // //                               {level}
// // //                             </SelectItem>
// // //                           ))}
// // //                         </SelectContent>
// // //                       </Select>
// // //                     </div>
// // //                   </div>

// // //                   <div className="grid md:grid-cols-2 gap-6">
// // //                     <div className="space-y-2">
// // //                       <Label htmlFor="price">Price (₹) *</Label>
// // //                       <Input
// // //                         id="price"
// // //                         type="number"
// // //                         placeholder="2999"
// // //                         value={courseData.price}
// // //                         onChange={(e) => handleInputChange('price', e.target.value)}
// // //                         required
// // //                       />
// // //                     </div>
// // //                     <div className="space-y-2">
// // //                       <Label htmlFor="originalPrice">Original Price (₹)</Label>
// // //                       <Input
// // //                         id="originalPrice"
// // //                         type="number"
// // //                         placeholder="5999"
// // //                         value={courseData.originalPrice}
// // //                         onChange={(e) => handleInputChange('originalPrice', e.target.value)}
// // //                       />
// // //                     </div>
// // //                   </div>
// // //                 </CardContent>
// // //               </Card>
// // //             </motion.div>

// // //             {/* Thumbnail */}
// // //             <motion.div
// // //               initial={{ opacity: 0, y: 20 }}
// // //               animate={{ opacity: 1, y: 0 }}
// // //               transition={{ duration: 0.6, delay: 0.2 }}
// // //             >
// // //               <Card>
// // //                 <CardHeader>
// // //                   <CardTitle>Course Thumbnail *</CardTitle>
// // //                 </CardHeader>
// // //                 <CardContent className="space-y-4">
// // //                   <div className="space-y-2">
// // //                     <Label htmlFor="thumbnail-file">Upload Thumbnail</Label>
// // //                     <div className="file-upload-area">
// // //                       <input
// // //                         ref={fileInputRef}
// // //                         id="thumbnail-file"
// // //                         type="file"
// // //                         accept="image/*"
// // //                         onChange={handleFileChange}
// // //                         className="hidden"
// // //                       />
// // //                       <div
// // //                         className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center cursor-pointer hover:border-gray-400 transition-colors"
// // //                         onClick={() => fileInputRef.current?.click()}
// // //                       >
// // //                         {selectedFile ? (
// // //                           <div className="flex flex-col items-center gap-2">
// // //                             <ImageIcon className="w-8 h-8 text-green-600" />
// // //                             <span className="text-sm font-medium text-green-600">
// // //                               {selectedFile.name}
// // //                             </span>
// // //                             <span className="text-xs text-gray-500">
// // //                               Click to change image
// // //                             </span>
// // //                           </div>
// // //                         ) : (
// // //                           <div className="flex flex-col items-center gap-2">
// // //                             <Upload className="w-8 h-8 text-gray-400" />
// // //                             <span className="text-sm font-medium">
// // //                               Click to upload thumbnail
// // //                             </span>
// // //                             <span className="text-xs text-gray-500">
// // //                               PNG, JPG, JPEG up to 3MB
// // //                             </span>
// // //                           </div>
// // //                         )}
// // //                       </div>
// // //                     </div>
// // //                   </div>
// // //                   <div className="text-center text-muted-foreground">OR</div>
// // //                   <div className="space-y-2">
// // //                     <Label htmlFor="thumbnail-url">Thumbnail URL</Label>
// // //                     <Input
// // //                       id="thumbnail-url"
// // //                       placeholder="https://example.com/image.jpg"
// // //                       value={courseData.thumbnail}
// // //                       onChange={(e) => {
// // //                         handleInputChange('thumbnail', e.target.value);
// // //                         // Clear selected file when URL is entered
// // //                         if (e.target.value.trim()) {
// // //                           setSelectedFile(null);
// // //                           if (fileInputRef.current) {
// // //                             fileInputRef.current.value = "";
// // //                           }
// // //                         }
// // //                       }}
// // //                     />
// // //                   </div>
// // //                 </CardContent>
// // //               </Card>
// // //             </motion.div>

// // //             {/* Features */}
// // //             <motion.div
// // //               initial={{ opacity: 0, y: 20 }}
// // //               animate={{ opacity: 1, y: 0 }}
// // //               transition={{ duration: 0.6, delay: 0.3 }}
// // //             >
// // //               <Card>
// // //                 <CardHeader>
// // //                   <CardTitle>Course Features</CardTitle>
// // //                 </CardHeader>
// // //                 <CardContent className="space-y-4">
// // //                   <div className="flex gap-2">
// // //                     <Input
// // //                       placeholder="Add a course feature"
// // //                       value={newFeature}
// // //                       onChange={(e) => setNewFeature(e.target.value)}
// // //                       onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addFeature())}
// // //                     />
// // //                     <Button type="button" onClick={addFeature}>
// // //                       <Plus className="w-4 h-4" />
// // //                     </Button>
// // //                   </div>
// // //                   <div className="flex flex-wrap gap-2">
// // //                     {courseData.features.map((feature, index) => (
// // //                       <Badge key={index} variant="secondary" className="flex items-center gap-2">
// // //                         {feature}
// // //                         <button
// // //                           type="button"
// // //                           onClick={() => removeFeature(index)}
// // //                           className="text-xs hover:text-destructive"
// // //                         >
// // //                           ×
// // //                         </button>
// // //                       </Badge>
// // //                     ))}
// // //                   </div>
// // //                 </CardContent>
// // //               </Card>
// // //             </motion.div>

// // //             {/* Learning Outcomes */}
// // //             <motion.div
// // //               initial={{ opacity: 0, y: 20 }}
// // //               animate={{ opacity: 1, y: 0 }}
// // //               transition={{ duration: 0.6, delay: 0.4 }}
// // //             >
// // //               <Card>
// // //                 <CardHeader>
// // //                   <CardTitle>Learning Outcomes</CardTitle>
// // //                 </CardHeader>
// // //                 <CardContent className="space-y-4">
// // //                   <div className="flex gap-2">
// // //                     <Input
// // //                       placeholder="What will students learn?"
// // //                       value={newOutcome}
// // //                       onChange={(e) => setNewOutcome(e.target.value)}
// // //                       onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addOutcome())}
// // //                     />
// // //                     <Button type="button" onClick={addOutcome}>
// // //                       <Plus className="w-4 h-4" />
// // //                     </Button>
// // //                   </div>
// // //                   <div className="space-y-2">
// // //                     {courseData.learningOutcomes.map((outcome, index) => (
// // //                       <div key={index} className="flex items-center gap-2 p-2 bg-muted rounded">
// // //                         <span className="flex-1">{outcome}</span>
// // //                         <Button
// // //                           type="button"
// // //                           variant="ghost"
// // //                           size="sm"
// // //                           onClick={() => removeOutcome(index)}
// // //                         >
// // //                           <Trash2 className="w-4 h-4" />
// // //                         </Button>
// // //                       </div>
// // //                     ))}
// // //                   </div>
// // //                 </CardContent>
// // //               </Card>
// // //             </motion.div>

// // //             {/* Course Content */}
// // //             <motion.div
// // //               initial={{ opacity: 0, y: 20 }}
// // //               animate={{ opacity: 1, y: 0 }}
// // //               transition={{ duration: 0.6, delay: 0.5 }}
// // //             >
// // //               <Card>
// // //                 <CardHeader>
// // //                   <div className="flex items-center justify-between">
// // //                     <CardTitle>Course Content</CardTitle>
// // //                     <Button type="button" onClick={addContentSection} variant="outline">
// // //                       <Plus className="w-4 h-4 mr-2" />
// // //                       Add Section
// // //                     </Button>
// // //                   </div>
// // //                 </CardHeader>
// // //                 <CardContent className="space-y-6">
// // //                   {courseContent.map((section, index) => (
// // //                     <div key={section.id} className="border rounded-lg p-4 space-y-4">
// // //                       <div className="flex items-center justify-between">
// // //                         <h4 className="font-medium">Section {index + 1}</h4>
// // //                         <Button
// // //                           type="button"
// // //                           variant="ghost"
// // //                           size="sm"
// // //                           onClick={() => removeContentSection(section.id)}
// // //                         >
// // //                           <Trash2 className="w-4 h-4" />
// // //                         </Button>
// // //                       </div>

// // //                       <div className="grid md:grid-cols-2 gap-4">
// // //                         <div className="space-y-2">
// // //                           <Label>Section Title</Label>
// // //                           <Input
// // //                             placeholder="Enter section title"
// // //                             value={section.title}
// // //                             onChange={(e) => updateContentSection(section.id, 'title', e.target.value)}
// // //                           />
// // //                         </div>
// // //                         <div className="space-y-2">
// // //                           <Label>Video URL</Label>
// // //                           <div className="relative">
// // //                             <LinkIcon className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
// // //                             <Input
// // //                               placeholder="YouTube video URL"
// // //                               value={section.videoUrl}
// // //                               onChange={(e) => updateContentSection(section.id, 'videoUrl', e.target.value)}
// // //                               className="pl-10"
// // //                             />
// // //                           </div>
// // //                         </div>
// // //                       </div>

// // //                       <div className="space-y-2">
// // //                         <Label>Section Description</Label>
// // //                         <Textarea
// // //                           placeholder="Describe what this section covers"
// // //                           rows={3}
// // //                           value={section.description}
// // //                           onChange={(e) => updateContentSection(section.id, 'description', e.target.value)}
// // //                         />
// // //                       </div>
// // //                     </div>
// // //                   ))}

// // //                   {courseContent.length === 0 && (
// // //                     <div className="text-center py-8 text-muted-foreground">
// // //                       <p>No content sections added yet.</p>
// // //                       <p className="text-sm">Click "Add Section" to start building your course content.</p>
// // //                     </div>
// // //                   )}
// // //                 </CardContent>
// // //               </Card>
// // //             </motion.div>

// // //             {/* Submit Button */}
// // //             <motion.div
// // //               className="flex justify-end gap-4"
// // //               initial={{ opacity: 0, y: 20 }}
// // //               animate={{ opacity: 1, y: 0 }}
// // //               transition={{ duration: 0.6, delay: 0.6 }}
// // //             >
// // //               <Link href="/admin">
// // //                 <Button type="button" variant="outline" disabled={isLoading}>
// // //                   Cancel
// // //                 </Button>
// // //               </Link>
// // //               <Button
// // //                 type="submit"
// // //                 disabled={isLoading}
// // //                 className="bg-purple-600 hover:bg-purple-700"
// // //               >
// // //                 {isUploading ? (
// // //                   <div className="inline-flex items-center">
// // //                     <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
// // //                     <span>{uploadProgress || 'Creating Course...'}</span>
// // //                   </div>
// // //                 ) : (
// // //                   <>
// // //                     <Upload className="w-4 h-4 mr-2" />
// // //                     <span>Create Course</span>
// // //                   </>
// // //                 )}
// // //               </Button>
// // //             </motion.div>
// // //           </form>
// // //         </div>
// // //       </main>
// // //     </div>
// // //   );
// // // }

// // 'use client';

// // import { useState, useRef } from 'react';
// // import { motion } from 'framer-motion';
// // import { useRouter } from 'next/navigation';
// // import { ArrowLeft, Plus, Trash2, Upload, Link as LinkIcon, Image as ImageIcon } from 'lucide-react';
// // import { Button } from '@/components/ui/button';
// // import { Input } from '@/components/ui/input';
// // import { Label } from '@/components/ui/label';
// // import { Textarea } from '@/components/ui/textarea';
// // import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
// // import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
// // import { Badge } from '@/components/ui/badge';
// // import { toast } from 'sonner';
// // import Link from 'next/link';
// // import AdminNavbar from '@/components/admin-navbar';
// // import uploader from '@/lib/cloudinary';

// // const categories = [
// //   'Web Development',
// //   'Data Science',
// //   'Digital Marketing',
// //   'Mobile Development',
// //   'UI/UX Design',
// //   'Business',
// //   'AI & Machine Learning',
// //   'Cybersecurity'
// // ];

// // const levels = ['Beginner', 'Intermediate', 'Advanced'];

// // export default function CreateCoursePage() {
// //   const fileInputRef = useRef(null);
// //   const [selectedFile, setSelectedFile] = useState(null);
// //   const [isUploading, setIsUploading] = useState(false);
// //   const [uploadProgress, setUploadProgress] = useState('');

// //   const [courseData, setCourseData] = useState({
// //     title: '',
// //     description: '',
// //     category: '',
// //     level: '',
// //     price: '',
// //     originalPrice: '',
// //     duration: '',
// //     thumbnail: '',
// //     features: [],
// //     learningOutcomes: []
// //   });

// //   const [courseContent, setCourseContent] = useState([]);
// //   const [newFeature, setNewFeature] = useState('');
// //   const [newOutcome, setNewOutcome] = useState('');
// //   const [isLoading, setIsLoading] = useState(false);
// //   const router = useRouter();

// //   const handleInputChange = (field, value) => {
// //     setCourseData(prev => ({
// //       ...prev,
// //       [field]: value
// //     }));
// //   };

// //   const handleFileChange = (event) => {
// //     const files = event.target.files;
// //     if (files.length > 0) {
// //       const file = files[0];
// //       if (!file.type.includes('image')) {
// //         toast.error('Invalid file type. Please select an image.');
// //         return;
// //       }

// //       const fileSizeInMB = file.size / (1024 * 1024);
// //       if (fileSizeInMB > 3) {
// //         toast.error("The image size is greater than 3 MB. Please select a smaller image.");
// //         event.target.value = "";
// //         return;
// //       }

// //       setSelectedFile(file);
// //       // Clear thumbnail URL when file is selected
// //       setCourseData(prev => ({
// //         ...prev,
// //         thumbnail: ''
// //       }));
// //       console.log('Image file selected:', file.name);
// //     }
// //   };

// //   const addFeature = () => {
// //     if (newFeature.trim()) {
// //       setCourseData(prev => ({
// //         ...prev,
// //         features: [...prev.features, newFeature.trim()]
// //       }));
// //       setNewFeature('');
// //     }
// //   };

// //   const removeFeature = (index) => {
// //     setCourseData(prev => ({
// //       ...prev,
// //       features: prev.features.filter((_, i) => i !== index)
// //     }));
// //   };

// //   const addOutcome = () => {
// //     if (newOutcome.trim()) {
// //       setCourseData(prev => ({
// //         ...prev,
// //         learningOutcomes: [...prev.learningOutcomes, newOutcome.trim()]
// //       }));
// //       setNewOutcome('');
// //     }
// //   };

// //   const removeOutcome = (index) => {
// //     setCourseData(prev => ({
// //       ...prev,
// //       learningOutcomes: prev.learningOutcomes.filter((_, i) => i !== index)
// //     }));
// //   };

// //   const addContentSection = () => {
// //     setCourseContent(prev => [...prev, {
// //       id: Date.now(),
// //       title: '',
// //       description: '',
// //       videoUrl: '',
// //       resources: []
// //     }]);
// //   };

// //   const updateContentSection = (id, field, value) => {
// //     setCourseContent(prev => prev.map(section =>
// //       section.id === id ? { ...section, [field]: value } : section
// //     ));
// //   };

// //   const removeContentSection = (id) => {
// //     setCourseContent(prev => prev.filter(section => section.id !== id));
// //   };

// //   const validateForm = () => {
// //     if (!courseData.title.trim()) {
// //       toast.error("Course title is required");
// //       return false;
// //     }
// //     if (!courseData.description.trim()) {
// //       toast.error("Course description is required");
// //       return false;
// //     }
// //     if (!courseData.category) {
// //       toast.error("Course category is required");
// //       return false;
// //     }
// //     if (!courseData.level) {
// //       toast.error("Course level is required");
// //       return false;
// //     }
// //     if (!courseData.price) {
// //       toast.error("Course price is required");
// //       return false;
// //     }
// //     if (!courseData.duration.trim()) {
// //       toast.error("Course duration is required");
// //       return false;
// //     }
// //     // Check if we have either a file or URL for thumbnail
// //     if (!selectedFile && !courseData.thumbnail.trim()) {
// //       toast.error("Course thumbnail is required - either upload a file or provide a URL");
// //       return false;
// //     }
// //     return true;
// //   };

// //   const uploadImageToCloudinary = async () => {
// //     if (!selectedFile) return null;

// //     try {
// //       console.log('Starting Cloudinary upload for file:', selectedFile.name);
// //       setUploadProgress('Preparing upload...');

// //       const formDataOBJ = new FormData();
// //       formDataOBJ.append('file', selectedFile);

// //       setUploadProgress('Uploading to Cloudinary...');
// //       const imgLinkObj = await uploader(formDataOBJ);
// //       console.log('Cloudinary upload response:', imgLinkObj);

// //       if (imgLinkObj.status === 200 && imgLinkObj.imgLinkArray && imgLinkObj.imgLinkArray.length > 0) {
// //         const uploadedUrl = imgLinkObj.imgLinkArray[0];
// //         console.log('Image uploaded successfully to Cloudinary:', uploadedUrl);

// //         setUploadProgress('Upload complete, processing...');

// //         // Add a 3-second delay to ensure Cloudinary processing is complete
// //         await new Promise(resolve => setTimeout(resolve, 3000));

// //         setUploadProgress('Verifying upload...');

// //         // Verify the image is accessible
// //         try {
// //           const verifyResponse = await fetch(uploadedUrl, { method: 'HEAD' });
// //           if (verifyResponse.ok) {
// //             console.log('Image verified successfully on Cloudinary');
// //             setUploadProgress('Upload verified successfully');
// //             return uploadedUrl;
// //           } else {
// //             console.error('Image verification failed:', verifyResponse.status);
// //             throw new Error('Image verification failed');
// //           }
// //         } catch (verifyError) {
// //           console.error('Image verification error:', verifyError);
// //           // Still return the URL even if verification fails
// //           return uploadedUrl;
// //         }
// //       } else {
// //         console.error('Cloudinary upload failed:', imgLinkObj);
// //         throw new Error('Failed to upload image to Cloudinary');
// //       }
// //     } catch (error) {
// //       console.error('Cloudinary upload error:', error);
// //       throw error;
// //     }
// //   };

// //   const handleSubmit = async (e) => {
// //     if (e && e.preventDefault) {
// //       e.preventDefault();
// //     }

// //     console.log('=== COURSE CREATION STARTED ===');

// //     if (!validateForm()) {
// //       console.log('Form validation failed');
// //       return;
// //     }

// //     console.log('Form validation passed, starting course creation process...');
// //     setIsLoading(true);
// //     setIsUploading(true);
// //     setUploadProgress('Starting...');

// //     try {
// //       let finalThumbnailUrl = '';

// //       // Step 1: Handle thumbnail - either use URL directly or upload file
// //       if (courseData.thumbnail.trim()) {
// //         // Direct URL provided
// //         finalThumbnailUrl = courseData.thumbnail.trim();
// //         console.log('Using direct thumbnail URL:', finalThumbnailUrl);
// //         setUploadProgress('Using provided URL...');
// //       } else if (selectedFile) {
// //         // File upload to Cloudinary
// //         console.log('Starting file upload to Cloudinary...');
// //         setUploadProgress('Uploading image...');

// //         finalThumbnailUrl = await uploadImageToCloudinary();

// //         if (!finalThumbnailUrl) {
// //           toast.error("Failed to upload thumbnail to Cloudinary");
// //           setIsLoading(false);
// //           setIsUploading(false);
// //           setUploadProgress('');
// //           return;
// //         }
// //       } else {
// //         toast.error("Course thumbnail is required");
// //         setIsLoading(false);
// //         setIsUploading(false);
// //         setUploadProgress('');
// //         return;
// //       }

// //       console.log('Final thumbnail URL ready:', finalThumbnailUrl);

// //       // Step 2: Prepare course data
// //       setUploadProgress('Preparing course data...');

// //       const payload = {
// //         ...courseData,
// //         thumbnail: finalThumbnailUrl,
// //         content: courseContent,
// //         price: parseFloat(courseData.price),
// //         originalPrice: courseData.originalPrice ? parseFloat(courseData.originalPrice) : null,
// //       };

// //       console.log('Course payload prepared:', payload);

// //       // Step 3: Create course in database
// //       setUploadProgress('Creating course...');

// //       console.log('Sending course creation request to API...');

// //       const response = await fetch('/api/admin/courses/create', {
// //         method: 'POST',
// //         headers: {
// //           'Content-Type': 'application/json',
// //         },
// //         body: JSON.stringify(payload),
// //       });

// //       console.log('API response status:', response.status);

// //       const data = await response.json();
// //       console.log('API response data:', data);

// //       if (response.ok) {
// //         console.log('=== COURSE CREATED SUCCESSFULLY ===');
// //         console.log('Course ID:', data.courseId);

// //         setUploadProgress('Course created successfully!');
// //         toast.success('Course created successfully!');

// //         // Reset form after successful creation
// //         setCourseData({
// //           title: '',
// //           description: '',
// //           category: '',
// //           level: '',
// //           price: '',
// //           originalPrice: '',
// //           duration: '',
// //           thumbnail: '',
// //           features: [],
// //           learningOutcomes: []
// //         });
// //         setCourseContent([]);
// //         setSelectedFile(null);
// //         if (fileInputRef.current) {
// //           fileInputRef.current.value = "";
// //         }

// //         // Small delay before redirect to ensure toast is visible
// //         setTimeout(() => {
// //           router.push('/admin');
// //         }, 2000);
// //       } else {
// //         console.error('=== COURSE CREATION FAILED ===');
// //         console.error('API error:', data);
// //         toast.error(data.message || 'Failed to create course');
// //       }
// //     } catch (error) {
// //       console.error('=== COURSE CREATION ERROR ===');
// //       console.error('Error details:', error);
// //       toast.error('Something went wrong. Please try again.');
// //     } finally {
// //       setIsLoading(false);
// //       setIsUploading(false);
// //       setUploadProgress('');
// //     }
// //   };

// //   return (
// //     <div className="min-h-screen bg-background">
// //       <AdminNavbar />

// //       <main className="pt-20 pb-12">
// //         <div className="container mx-auto px-4 max-w-4xl">
// //           {/* Header */}
// //           <motion.div
// //             className="flex items-center gap-4 mb-8"
// //             initial={{ opacity: 0, y: 20 }}
// //             animate={{ opacity: 1, y: 0 }}
// //             transition={{ duration: 0.6 }}
// //           >
// //             <Link href="/admin">
// //               <Button variant="outline" size="icon">
// //                 <ArrowLeft className="w-4 h-4" />
// //               </Button>
// //             </Link>
// //             <div>
// //               <h1 className="text-3xl font-bold">Create New Course</h1>
// //               <p className="text-muted-foreground">
// //                 Add a new course to your platform with content and resources.
// //               </p>
// //             </div>
// //           </motion.div>

// //           {/* Wrap everything in a form for better semantics */}
// //           <form onSubmit={handleSubmit} className="space-y-8">
// //             {/* Basic Information */}
// //             <motion.div
// //               initial={{ opacity: 0, y: 20 }}
// //               animate={{ opacity: 1, y: 0 }}
// //               transition={{ duration: 0.6, delay: 0.1 }}
// //             >
// //               <Card>
// //                 <CardHeader>
// //                   <CardTitle>Basic Information</CardTitle>
// //                 </CardHeader>
// //                 <CardContent className="space-y-6">
// //                   <div className="grid md:grid-cols-2 gap-6">
// //                     <div className="space-y-2">
// //                       <Label htmlFor="title">Course Title *</Label>
// //                       <Input
// //                         id="title"
// //                         placeholder="Enter course title"
// //                         value={courseData.title}
// //                         onChange={(e) => handleInputChange('title', e.target.value)}
// //                         required
// //                       />
// //                     </div>
// //                     <div className="space-y-2">
// //                       <Label htmlFor="duration">Duration *</Label>
// //                       <Input
// //                         id="duration"
// //                         placeholder="e.g., 40 hours"
// //                         value={courseData.duration}
// //                         onChange={(e) => handleInputChange('duration', e.target.value)}
// //                         required
// //                       />
// //                     </div>
// //                   </div>

// //                   <div className="space-y-2">
// //                     <Label htmlFor="description">Description *</Label>
// //                     <Textarea
// //                       id="description"
// //                       placeholder="Describe what students will learn in this course"
// //                       rows={4}
// //                       value={courseData.description}
// //                       onChange={(e) => handleInputChange('description', e.target.value)}
// //                       required
// //                     />
// //                   </div>

// //                   <div className="grid md:grid-cols-2 gap-6">
// //                     <div className="space-y-2">
// //                       <Label htmlFor="category">Category *</Label>
// //                       <Select onValueChange={(value) => handleInputChange('category', value)} required>
// //                         <SelectTrigger>
// //                           <SelectValue placeholder="Select category" />
// //                         </SelectTrigger>
// //                         <SelectContent>
// //                           {categories.map((category) => (
// //                             <SelectItem key={category} value={category}>
// //                               {category}
// //                             </SelectItem>
// //                           ))}
// //                         </SelectContent>
// //                       </Select>
// //                     </div>
// //                     <div className="space-y-2">
// //                       <Label htmlFor="level">Level *</Label>
// //                       <Select onValueChange={(value) => handleInputChange('level', value)} required>
// //                         <SelectTrigger>
// //                           <SelectValue placeholder="Select level" />
// //                         </SelectTrigger>
// //                         <SelectContent>
// //                           {levels.map((level) => (
// //                             <SelectItem key={level} value={level}>
// //                               {level}
// //                             </SelectItem>
// //                           ))}
// //                         </SelectContent>
// //                       </Select>
// //                     </div>
// //                   </div>

// //                   <div className="grid md:grid-cols-2 gap-6">
// //                     <div className="space-y-2">
// //                       <Label htmlFor="price">Price (₹) *</Label>
// //                       <Input
// //                         id="price"
// //                         type="number"
// //                         placeholder="2999"
// //                         value={courseData.price}
// //                         onChange={(e) => handleInputChange('price', e.target.value)}
// //                         required
// //                       />
// //                     </div>
// //                     <div className="space-y-2">
// //                       <Label htmlFor="originalPrice">Original Price (₹)</Label>
// //                       <Input
// //                         id="originalPrice"
// //                         type="number"
// //                         placeholder="5999"
// //                         value={courseData.originalPrice}
// //                         onChange={(e) => handleInputChange('originalPrice', e.target.value)}
// //                       />
// //                     </div>
// //                   </div>
// //                 </CardContent>
// //               </Card>
// //             </motion.div>

// //             {/* Thumbnail */}
// //             <motion.div
// //               initial={{ opacity: 0, y: 20 }}
// //               animate={{ opacity: 1, y: 0 }}
// //               transition={{ duration: 0.6, delay: 0.2 }}
// //             >
// //               <Card>
// //                 <CardHeader>
// //                   <CardTitle>Course Thumbnail *</CardTitle>
// //                 </CardHeader>
// //                 <CardContent className="space-y-4">
// //                   <div className="space-y-2">
// //                     <Label htmlFor="thumbnail-file">Upload Thumbnail</Label>
// //                     <div className="file-upload-area">
// //                       <input
// //                         ref={fileInputRef}
// //                         id="thumbnail-file"
// //                         type="file"
// //                         accept="image/*"
// //                         onChange={handleFileChange}
// //                         className="hidden"
// //                       />
// //                       <div 
// //                         className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center cursor-pointer hover:border-gray-400 transition-colors"
// //                         onClick={() => fileInputRef.current?.click()}
// //                       >
// //                         {selectedFile ? (
// //                           <div className="flex flex-col items-center gap-2">
// //                             <ImageIcon className="w-8 h-8 text-green-600" />
// //                             <span className="text-sm font-medium text-green-600">
// //                               {selectedFile.name}
// //                             </span>
// //                             <span className="text-xs text-gray-500">
// //                               Click to change image
// //                             </span>
// //                           </div>
// //                         ) : (
// //                           <div className="flex flex-col items-center gap-2">
// //                             <Upload className="w-8 h-8 text-gray-400" />
// //                             <span className="text-sm font-medium">
// //                               Click to upload thumbnail
// //                             </span>
// //                             <span className="text-xs text-gray-500">
// //                               PNG, JPG, JPEG up to 3MB
// //                             </span>
// //                           </div>
// //                         )}
// //                       </div>
// //                     </div>
// //                   </div>
// //                   <div className="text-center text-muted-foreground">OR</div>
// //                   <div className="space-y-2">
// //                     <Label htmlFor="thumbnail-url">Thumbnail URL</Label>
// //                     <Input
// //                       id="thumbnail-url"
// //                       placeholder="https://example.com/image.jpg"
// //                       value={courseData.thumbnail}
// //                       onChange={(e) => {
// //                         handleInputChange('thumbnail', e.target.value);
// //                         // Clear selected file when URL is entered
// //                         if (e.target.value.trim()) {
// //                           setSelectedFile(null);
// //                           if (fileInputRef.current) {
// //                             fileInputRef.current.value = "";
// //                           }
// //                         }
// //                       }}
// //                     />
// //                   </div>
// //                 </CardContent>
// //               </Card>
// //             </motion.div>

// //             {/* Features */}
// //             <motion.div
// //               initial={{ opacity: 0, y: 20 }}
// //               animate={{ opacity: 1, y: 0 }}
// //               transition={{ duration: 0.6, delay: 0.3 }}
// //             >
// //               <Card>
// //                 <CardHeader>
// //                   <CardTitle>Course Features</CardTitle>
// //                 </CardHeader>
// //                 <CardContent className="space-y-4">
// //                   <div className="flex gap-2">
// //                     <Input
// //                       placeholder="Add a course feature"
// //                       value={newFeature}
// //                       onChange={(e) => setNewFeature(e.target.value)}
// //                       onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addFeature())}
// //                     />
// //                     <Button type="button" onClick={addFeature}>
// //                       <Plus className="w-4 h-4" />
// //                     </Button>
// //                   </div>
// //                   <div className="flex flex-wrap gap-2">
// //                     {courseData.features.map((feature, index) => (
// //                       <Badge key={index} variant="secondary" className="flex items-center gap-2">
// //                         {feature}
// //                         <button
// //                           type="button"
// //                           onClick={() => removeFeature(index)}
// //                           className="text-xs hover:text-destructive"
// //                         >
// //                           ×
// //                         </button>
// //                       </Badge>
// //                     ))}
// //                   </div>
// //                 </CardContent>
// //               </Card>
// //             </motion.div>

// //             {/* Learning Outcomes */}
// //             <motion.div
// //               initial={{ opacity: 0, y: 20 }}
// //               animate={{ opacity: 1, y: 0 }}
// //               transition={{ duration: 0.6, delay: 0.4 }}
// //             >
// //               <Card>
// //                 <CardHeader>
// //                   <CardTitle>Learning Outcomes</CardTitle>
// //                 </CardHeader>
// //                 <CardContent className="space-y-4">
// //                   <div className="flex gap-2">
// //                     <Input
// //                       placeholder="What will students learn?"
// //                       value={newOutcome}
// //                       onChange={(e) => setNewOutcome(e.target.value)}
// //                       onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addOutcome())}
// //                     />
// //                     <Button type="button" onClick={addOutcome}>
// //                       <Plus className="w-4 h-4" />
// //                     </Button>
// //                   </div>
// //                   <div className="space-y-2">
// //                     {courseData.learningOutcomes.map((outcome, index) => (
// //                       <div key={index} className="flex items-center gap-2 p-2 bg-muted rounded">
// //                         <span className="flex-1">{outcome}</span>
// //                         <Button
// //                           type="button"
// //                           variant="ghost"
// //                           size="sm"
// //                           onClick={() => removeOutcome(index)}
// //                         >
// //                           <Trash2 className="w-4 h-4" />
// //                         </Button>
// //                       </div>
// //                     ))}
// //                   </div>
// //                 </CardContent>
// //               </Card>
// //             </motion.div>

// //             {/* Course Content */}
// //             <motion.div
// //               initial={{ opacity: 0, y: 20 }}
// //               animate={{ opacity: 1, y: 0 }}
// //               transition={{ duration: 0.6, delay: 0.5 }}
// //             >
// //               <Card>
// //                 <CardHeader>
// //                   <div className="flex items-center justify-between">
// //                     <CardTitle>Course Content</CardTitle>
// //                     <Button type="button" onClick={addContentSection} variant="outline">
// //                       <Plus className="w-4 h-4 mr-2" />
// //                       Add Section
// //                     </Button>
// //                   </div>
// //                 </CardHeader>
// //                 <CardContent className="space-y-6">
// //                   {courseContent.map((section, index) => (
// //                     <div key={section.id} className="border rounded-lg p-4 space-y-4">
// //                       <div className="flex items-center justify-between">
// //                         <h4 className="font-medium">Section {index + 1}</h4>
// //                         <Button
// //                           type="button"
// //                           variant="ghost"
// //                           size="sm"
// //                           onClick={() => removeContentSection(section.id)}
// //                         >
// //                           <Trash2 className="w-4 h-4" />
// //                         </Button>
// //                       </div>

// //                       <div className="grid md:grid-cols-2 gap-4">
// //                         <div className="space-y-2">
// //                           <Label>Section Title</Label>
// //                           <Input
// //                             placeholder="Enter section title"
// //                             value={section.title}
// //                             onChange={(e) => updateContentSection(section.id, 'title', e.target.value)}
// //                           />
// //                         </div>
// //                         <div className="space-y-2">
// //                           <Label>Video URL</Label>
// //                           <div className="relative">
// //                             <LinkIcon className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
// //                             <Input
// //                               placeholder="YouTube video URL"
// //                               value={section.videoUrl}
// //                               onChange={(e) => updateContentSection(section.id, 'videoUrl', e.target.value)}
// //                               className="pl-10"
// //                             />
// //                           </div>
// //                         </div>
// //                       </div>

// //                       <div className="space-y-2">
// //                         <Label>Section Description</Label>
// //                         <Textarea
// //                           placeholder="Describe what this section covers"
// //                           rows={3}
// //                           value={section.description}
// //                           onChange={(e) => updateContentSection(section.id, 'description', e.target.value)}
// //                         />
// //                       </div>
// //                     </div>
// //                   ))}

// //                   {courseContent.length === 0 && (
// //                     <div className="text-center py-8 text-muted-foreground">
// //                       <p>No content sections added yet.</p>
// //                       <p className="text-sm">Click "Add Section" to start building your course content.</p>
// //                     </div>
// //                   )}
// //                 </CardContent>
// //               </Card>
// //             </motion.div>

// //             {/* Submit Button */}
// //             <motion.div
// //               className="flex justify-end gap-4"
// //               initial={{ opacity: 0, y: 20 }}
// //               animate={{ opacity: 1, y: 0 }}
// //               transition={{ duration: 0.6, delay: 0.6 }}
// //             >
// //               <Link href="/admin">
// //                 <Button type="button" variant="outline" disabled={isLoading}>
// //                   Cancel
// //                 </Button>
// //               </Link>
// //               <Button
// //                 type="submit"
// //                 disabled={isLoading}
// //                 className="bg-purple-600 hover:bg-purple-700"
// //               >
// //                 {isUploading ? (
// //                   <div className="inline-flex items-center">
// //                     <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
// //                     <span>{uploadProgress || 'Creating Course...'}</span>
// //                   </div>
// //                 ) : (
// //                   <>
// //                     <Upload className="w-4 h-4 mr-2" />
// //                     <span>Create Course</span>
// //                   </>
// //                 )}
// //               </Button>
// //             </motion.div>
// //           </form>
// //         </div>
// //       </main>
// //     </div>
// //   );
// // }

// 'use client';

// import { useState, useRef } from 'react';
// import { motion } from 'framer-motion';
// import { useRouter } from 'next/navigation';
// import { ArrowLeft, Plus, Trash2, Upload, Link as LinkIcon, Image as ImageIcon } from 'lucide-react';
// import { Button } from '@/components/ui/button';
// import { Input } from '@/components/ui/input';
// import { Label } from '@/components/ui/label';
// import { Textarea } from '@/components/ui/textarea';
// import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
// import { Badge } from '@/components/ui/badge';
// import { toast } from 'sonner';
// import Link from 'next/link';
// import AdminNavbar from '@/components/admin-navbar';
// import uploader from '@/lib/cloudinary';

// const categories = [
//   'Web Development',
//   'Data Science',
//   'Digital Marketing',
//   'Mobile Development',
//   'UI/UX Design',
//   'Business',
//   'AI & Machine Learning',
//   'Cybersecurity'
// ];

// const levels = ['Beginner', 'Intermediate', 'Advanced'];

// export default function CreateCoursePage() {
//   const fileInputRef = useRef(null);
//   const [selectedFile, setSelectedFile] = useState(null);
//   const [isUploading, setIsUploading] = useState(false);
//   const [uploadProgress, setUploadProgress] = useState('');

//   const [courseData, setCourseData] = useState({
//     title: '',
//     description: '',
//     category: '',
//     level: '',
//     price: '',
//     originalPrice: '',
//     duration: '',
//     thumbnail: '',
//     features: [],
//     learningOutcomes: []
//   });

//   const [courseContent, setCourseContent] = useState([]);
//   const [newFeature, setNewFeature] = useState('');
//   const [newOutcome, setNewOutcome] = useState('');
//   const [isLoading, setIsLoading] = useState(false);
//   const router = useRouter();

//   const handleInputChange = (field, value) => {
//     setCourseData(prev => ({
//       ...prev,
//       [field]: value
//     }));
//   };

//   const handleFileChange = (event) => {
//     const files = event.target.files;
//     if (files.length > 0) {
//       const file = files[0];
//       if (!file.type.includes('image')) {
//         toast.error('Invalid file type. Please select an image.');
//         return;
//       }

//       const fileSizeInMB = file.size / (1024 * 1024);
//       if (fileSizeInMB > 3) {
//         toast.error("The image size is greater than 3 MB. Please select a smaller image.");
//         event.target.value = "";
//         return;
//       }

//       setSelectedFile(file);
//       // Clear thumbnail URL when file is selected
//       setCourseData(prev => ({
//         ...prev,
//         thumbnail: ''
//       }));
//       console.log('Image file selected:', file.name);
//     }
//   };

//   const addFeature = () => {
//     if (newFeature.trim()) {
//       setCourseData(prev => ({
//         ...prev,
//         features: [...prev.features, newFeature.trim()]
//       }));
//       setNewFeature('');
//     }
//   };

//   const removeFeature = (index) => {
//     setCourseData(prev => ({
//       ...prev,
//       features: prev.features.filter((_, i) => i !== index)
//     }));
//   };

//   const addOutcome = () => {
//     if (newOutcome.trim()) {
//       setCourseData(prev => ({
//         ...prev,
//         learningOutcomes: [...prev.learningOutcomes, newOutcome.trim()]
//       }));
//       setNewOutcome('');
//     }
//   };

//   const removeOutcome = (index) => {
//     setCourseData(prev => ({
//       ...prev,
//       learningOutcomes: prev.learningOutcomes.filter((_, i) => i !== index)
//     }));
//   };

//   const addContentSection = () => {
//     setCourseContent(prev => [...prev, {
//       id: Date.now(),
//       title: '',
//       description: '',
//       videoUrl: '',
//       resources: []
//     }]);
//   };

//   const updateContentSection = (id, field, value) => {
//     setCourseContent(prev => prev.map(section =>
//       section.id === id ? { ...section, [field]: value } : section
//     ));
//   };

//   const removeContentSection = (id) => {
//     setCourseContent(prev => prev.filter(section => section.id !== id));
//   };

//   const validateForm = () => {
//     if (!courseData.title.trim()) {
//       toast.error("Course title is required");
//       return false;
//     }
//     if (!courseData.description.trim()) {
//       toast.error("Course description is required");
//       return false;
//     }
//     if (!courseData.category) {
//       toast.error("Course category is required");
//       return false;
//     }
//     if (!courseData.level) {
//       toast.error("Course level is required");
//       return false;
//     }
//     if (!courseData.price) {
//       toast.error("Course price is required");
//       return false;
//     }
//     if (!courseData.duration.trim()) {
//       toast.error("Course duration is required");
//       return false;
//     }
//     // Check if we have either a file or URL for thumbnail
//     if (!selectedFile && !courseData.thumbnail.trim()) {
//       toast.error("Course thumbnail is required - either upload a file or provide a URL");
//       return false;
//     }
//     return true;
//   };

//   const handleSubmit = async (e) => {
//     if (e && e.preventDefault) {
//       e.preventDefault();
//     }

//     console.log('=== COURSE CREATION STARTED ===');

//     if (!validateForm()) {
//       console.log('Form validation failed');
//       return;
//     }

//     console.log('Form validation passed, starting course creation process...');
//     setIsLoading(true);
//     setIsUploading(true);
//     setUploadProgress('Starting...');

//     try {
//       let finalThumbnailUrl = '';

//       // Step 1: Handle thumbnail - either use URL directly or upload file
//       if (courseData.thumbnail.trim()) {
//         // Direct URL provided
//         finalThumbnailUrl = courseData.thumbnail.trim();
//         console.log('Using direct thumbnail URL:', finalThumbnailUrl);
//         setUploadProgress('Using provided URL...');
//       } else if (selectedFile) {
//         // File upload to Cloudinary
//         console.log('Starting file upload to Cloudinary...');
//         setUploadProgress('Uploading image to Cloudinary...');

//         const formDataOBJ = new FormData();
//         formDataOBJ.append('file', selectedFile);

//         const imgLinkObj = await uploader(formDataOBJ);
//         console.log('Cloudinary upload response:', imgLinkObj);

//         if (imgLinkObj.status === 200 && imgLinkObj.imgLinkArray && imgLinkObj.imgLinkArray.length > 0) {
//           finalThumbnailUrl = imgLinkObj.imgLinkArray[0];
//           console.log('Image uploaded successfully to Cloudinary:', finalThumbnailUrl);
//           setUploadProgress('Image uploaded successfully...');
//         } else {
//           console.error('Cloudinary upload failed:', imgLinkObj);
//           toast.error("Failed to upload thumbnail to Cloudinary");
//           setIsLoading(false);
//           setIsUploading(false);
//           setUploadProgress('');
//           return;
//         }
//       } else {
//         toast.error("Course thumbnail is required");
//         setIsLoading(false);
//         setIsUploading(false);
//         setUploadProgress('');
//         return;
//       }

//       console.log('Final thumbnail URL ready:', finalThumbnailUrl);

//       // Step 2: Prepare course data
//       setUploadProgress('Preparing course data...');

//       const payload = {
//         ...courseData,
//         thumbnail: finalThumbnailUrl,
//         content: courseContent,
//         price: parseFloat(courseData.price),
//         originalPrice: courseData.originalPrice ? parseFloat(courseData.originalPrice) : null,
//       };

//       console.log('Course payload prepared:', payload);

//       // Step 3: Create course in database
//       setUploadProgress('Creating course...');

//       console.log('Sending course creation request to API...');

//       const response = await fetch('/api/admin/courses/create', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(payload),
//       });

//       console.log('API response status:', response.status);

//       const data = await response.json();
//       console.log('API response data:', data);

//       if (response.ok) {
//         console.log('=== COURSE CREATED SUCCESSFULLY ===');
//         console.log('Course ID:', data.courseId);

//         setUploadProgress('Course created successfully!');
//         toast.success('Course created successfully!');

//         // Reset form after successful creation
//         setCourseData({
//           title: '',
//           description: '',
//           category: '',
//           level: '',
//           price: '',
//           originalPrice: '',
//           duration: '',
//           thumbnail: '',
//           features: [],
//           learningOutcomes: []
//         });
//         setCourseContent([]);
//         setSelectedFile(null);
//         if (fileInputRef.current) {
//           fileInputRef.current.value = "";
//         }

//         // Small delay before redirect to ensure toast is visible
//         setTimeout(() => {
//           router.push('/admin');
//         }, 2000);
//       } else {
//         console.error('=== COURSE CREATION FAILED ===');
//         console.error('API error:', data);
//         toast.error(data.message || 'Failed to create course');
//       }
//     } catch (error) {
//       console.error('=== COURSE CREATION ERROR ===');
//       console.error('Error details:', error);
//       toast.error('Something went wrong. Please try again.');
//     } finally {
//       setIsLoading(false);
//       setIsUploading(false);
//       setUploadProgress('');
//     }
//   };

//   return (
//     <div className="min-h-screen bg-background">
//       <AdminNavbar />

//       <main className="pt-20 pb-12">
//         <div className="container mx-auto px-4 max-w-4xl">
//           {/* Header */}
//           <motion.div
//             className="flex items-center gap-4 mb-8"
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.6 }}
//           >
//             <Link href="/admin">
//               <Button variant="outline" size="icon">
//                 <ArrowLeft className="w-4 h-4" />
//               </Button>
//             </Link>
//             <div>
//               <h1 className="text-3xl font-bold">Create New Course</h1>
//               <p className="text-muted-foreground">
//                 Add a new course to your platform with content and resources.
//               </p>
//             </div>
//           </motion.div>

//           {/* Wrap everything in a form for better semantics */}
//           <form onSubmit={handleSubmit} className="space-y-8">
//             {/* Basic Information */}
//             <motion.div
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.6, delay: 0.1 }}
//             >
//               <Card>
//                 <CardHeader>
//                   <CardTitle>Basic Information</CardTitle>
//                 </CardHeader>
//                 <CardContent className="space-y-6">
//                   <div className="grid md:grid-cols-2 gap-6">
//                     <div className="space-y-2">
//                       <Label htmlFor="title">Course Title *</Label>
//                       <Input
//                         id="title"
//                         placeholder="Enter course title"
//                         value={courseData.title}
//                         onChange={(e) => handleInputChange('title', e.target.value)}
//                         required
//                       />
//                     </div>
//                     <div className="space-y-2">
//                       <Label htmlFor="duration">Duration *</Label>
//                       <Input
//                         id="duration"
//                         placeholder="e.g., 40 hours"
//                         value={courseData.duration}
//                         onChange={(e) => handleInputChange('duration', e.target.value)}
//                         required
//                       />
//                     </div>
//                   </div>

//                   <div className="space-y-2">
//                     <Label htmlFor="description">Description *</Label>
//                     <Textarea
//                       id="description"
//                       placeholder="Describe what students will learn in this course"
//                       rows={4}
//                       value={courseData.description}
//                       onChange={(e) => handleInputChange('description', e.target.value)}
//                       required
//                     />
//                   </div>

//                   <div className="grid md:grid-cols-2 gap-6">
//                     <div className="space-y-2">
//                       <Label htmlFor="category">Category *</Label>
//                       <Select onValueChange={(value) => handleInputChange('category', value)} required>
//                         <SelectTrigger>
//                           <SelectValue placeholder="Select category" />
//                         </SelectTrigger>
//                         <SelectContent>
//                           {categories.map((category) => (
//                             <SelectItem key={category} value={category}>
//                               {category}
//                             </SelectItem>
//                           ))}
//                         </SelectContent>
//                       </Select>
//                     </div>
//                     <div className="space-y-2">
//                       <Label htmlFor="level">Level *</Label>
//                       <Select onValueChange={(value) => handleInputChange('level', value)} required>
//                         <SelectTrigger>
//                           <SelectValue placeholder="Select level" />
//                         </SelectTrigger>
//                         <SelectContent>
//                           {levels.map((level) => (
//                             <SelectItem key={level} value={level}>
//                               {level}
//                             </SelectItem>
//                           ))}
//                         </SelectContent>
//                       </Select>
//                     </div>
//                   </div>

//                   <div className="grid md:grid-cols-2 gap-6">
//                     <div className="space-y-2">
//                       <Label htmlFor="price">Price (₹) *</Label>
//                       <Input
//                         id="price"
//                         type="number"
//                         placeholder="2999"
//                         value={courseData.price}
//                         onChange={(e) => handleInputChange('price', e.target.value)}
//                         required
//                       />
//                     </div>
//                     <div className="space-y-2">
//                       <Label htmlFor="originalPrice">Original Price (₹)</Label>
//                       <Input
//                         id="originalPrice"
//                         type="number"
//                         placeholder="5999"
//                         value={courseData.originalPrice}
//                         onChange={(e) => handleInputChange('originalPrice', e.target.value)}
//                       />
//                     </div>
//                   </div>
//                 </CardContent>
//               </Card>
//             </motion.div>

//             {/* Thumbnail */}
//             <motion.div
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.6, delay: 0.2 }}
//             >
//               <Card>
//                 <CardHeader>
//                   <CardTitle>Course Thumbnail *</CardTitle>
//                 </CardHeader>
//                 <CardContent className="space-y-4">
//                   <div className="space-y-2">
//                     <Label htmlFor="thumbnail-file">Upload Thumbnail</Label>
//                     <div className="file-upload-area">
//                       <input
//                         ref={fileInputRef}
//                         id="thumbnail-file"
//                         type="file"
//                         accept="image/*"
//                         onChange={handleFileChange}
//                         className="hidden"
//                       />
//                       <div
//                         className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center cursor-pointer hover:border-gray-400 transition-colors"
//                         onClick={() => fileInputRef.current?.click()}
//                       >
//                         {selectedFile ? (
//                           <div className="flex flex-col items-center gap-2">
//                             <ImageIcon className="w-8 h-8 text-green-600" />
//                             <span className="text-sm font-medium text-green-600">
//                               {selectedFile.name}
//                             </span>
//                             <span className="text-xs text-gray-500">
//                               Click to change image
//                             </span>
//                           </div>
//                         ) : (
//                           <div className="flex flex-col items-center gap-2">
//                             <Upload className="w-8 h-8 text-gray-400" />
//                             <span className="text-sm font-medium">
//                               Click to upload thumbnail
//                             </span>
//                             <span className="text-xs text-gray-500">
//                               PNG, JPG, JPEG up to 3MB
//                             </span>
//                           </div>
//                         )}
//                       </div>
//                     </div>
//                   </div>
//                   <div className="text-center text-muted-foreground">OR</div>
//                   <div className="space-y-2">
//                     <Label htmlFor="thumbnail-url">Thumbnail URL</Label>
//                     <Input
//                       id="thumbnail-url"
//                       placeholder="https://example.com/image.jpg"
//                       value={courseData.thumbnail}
//                       onChange={(e) => {
//                         handleInputChange('thumbnail', e.target.value);
//                         // Clear selected file when URL is entered
//                         if (e.target.value.trim()) {
//                           setSelectedFile(null);
//                           if (fileInputRef.current) {
//                             fileInputRef.current.value = "";
//                           }
//                         }
//                       }}
//                     />
//                   </div>
//                 </CardContent>
//               </Card>
//             </motion.div>

//             {/* Features */}
//             <motion.div
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.6, delay: 0.3 }}
//             >
//               <Card>
//                 <CardHeader>
//                   <CardTitle>Course Features</CardTitle>
//                 </CardHeader>
//                 <CardContent className="space-y-4">
//                   <div className="flex gap-2">
//                     <Input
//                       placeholder="Add a course feature"
//                       value={newFeature}
//                       onChange={(e) => setNewFeature(e.target.value)}
//                       onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addFeature())}
//                     />
//                     <Button type="button" onClick={addFeature}>
//                       <Plus className="w-4 h-4" />
//                     </Button>
//                   </div>
//                   <div className="flex flex-wrap gap-2">
//                     {courseData.features.map((feature, index) => (
//                       <Badge key={index} variant="secondary" className="flex items-center gap-2">
//                         {feature}
//                         <button
//                           type="button"
//                           onClick={() => removeFeature(index)}
//                           className="text-xs hover:text-destructive"
//                         >
//                           ×
//                         </button>
//                       </Badge>
//                     ))}
//                   </div>
//                 </CardContent>
//               </Card>
//             </motion.div>

//             {/* Learning Outcomes */}
//             <motion.div
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.6, delay: 0.4 }}
//             >
//               <Card>
//                 <CardHeader>
//                   <CardTitle>Learning Outcomes</CardTitle>
//                 </CardHeader>
//                 <CardContent className="space-y-4">
//                   <div className="flex gap-2">
//                     <Input
//                       placeholder="What will students learn?"
//                       value={newOutcome}
//                       onChange={(e) => setNewOutcome(e.target.value)}
//                       onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addOutcome())}
//                     />
//                     <Button type="button" onClick={addOutcome}>
//                       <Plus className="w-4 h-4" />
//                     </Button>
//                   </div>
//                   <div className="space-y-2">
//                     {courseData.learningOutcomes.map((outcome, index) => (
//                       <div key={index} className="flex items-center gap-2 p-2 bg-muted rounded">
//                         <span className="flex-1">{outcome}</span>
//                         <Button
//                           type="button"
//                           variant="ghost"
//                           size="sm"
//                           onClick={() => removeOutcome(index)}
//                         >
//                           <Trash2 className="w-4 h-4" />
//                         </Button>
//                       </div>
//                     ))}
//                   </div>
//                 </CardContent>
//               </Card>
//             </motion.div>

//             {/* Course Content */}
//             <motion.div
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.6, delay: 0.5 }}
//             >
//               <Card>
//                 <CardHeader>
//                   <div className="flex items-center justify-between">
//                     <CardTitle>Course Content</CardTitle>
//                     <Button type="button" onClick={addContentSection} variant="outline">
//                       <Plus className="w-4 h-4 mr-2" />
//                       Add Section
//                     </Button>
//                   </div>
//                 </CardHeader>
//                 <CardContent className="space-y-6">
//                   {courseContent.map((section, index) => (
//                     <div key={section.id} className="border rounded-lg p-4 space-y-4">
//                       <div className="flex items-center justify-between">
//                         <h4 className="font-medium">Section {index + 1}</h4>
//                         <Button
//                           type="button"
//                           variant="ghost"
//                           size="sm"
//                           onClick={() => removeContentSection(section.id)}
//                         >
//                           <Trash2 className="w-4 h-4" />
//                         </Button>
//                       </div>

//                       <div className="grid md:grid-cols-2 gap-4">
//                         <div className="space-y-2">
//                           <Label>Section Title</Label>
//                           <Input
//                             placeholder="Enter section title"
//                             value={section.title}
//                             onChange={(e) => updateContentSection(section.id, 'title', e.target.value)}
//                           />
//                         </div>
//                         <div className="space-y-2">
//                           <Label>Video URL</Label>
//                           <div className="relative">
//                             <LinkIcon className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
//                             <Input
//                               placeholder="YouTube video URL"
//                               value={section.videoUrl}
//                               onChange={(e) => updateContentSection(section.id, 'videoUrl', e.target.value)}
//                               className="pl-10"
//                             />
//                           </div>
//                         </div>
//                       </div>

//                       <div className="space-y-2">
//                         <Label>Section Description</Label>
//                         <Textarea
//                           placeholder="Describe what this section covers"
//                           rows={3}
//                           value={section.description}
//                           onChange={(e) => updateContentSection(section.id, 'description', e.target.value)}
//                         />
//                       </div>
//                     </div>
//                   ))}

//                   {courseContent.length === 0 && (
//                     <div className="text-center py-8 text-muted-foreground">
//                       <p>No content sections added yet.</p>
//                       <p className="text-sm">Click "Add Section" to start building your course content.</p>
//                     </div>
//                   )}
//                 </CardContent>
//               </Card>
//             </motion.div>

//             {/* Submit Button */}
//             <motion.div
//               className="flex justify-end gap-4"
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.6, delay: 0.6 }}
//             >
//               <Link href="/admin">
//                 <Button type="button" variant="outline" disabled={isLoading}>
//                   Cancel
//                 </Button>
//               </Link>
//               <Button
//                 type="submit"
//                 disabled={isLoading}
//                 className="bg-purple-600 hover:bg-purple-700"
//               >
//                 {isUploading ? (
//                   <div className="inline-flex items-center">
//                     <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
//                     <span>{uploadProgress || 'Creating Course...'}</span>
//                   </div>
//                 ) : (
//                   <>
//                     <Upload className="w-4 h-4 mr-2" />
//                     <span>Create Course</span>
//                   </>
//                 )}
//               </Button>
//             </motion.div>
//           </form>
//         </div>
//       </main>
//     </div>
//   );
// }

'use client';

import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Plus, Trash2, Upload, Link as LinkIcon, Image as ImageIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';
import Link from 'next/link';
import AdminNavbar from '@/components/admin-navbar';
import uploader from '@/lib/cloudinary';

const categories = [
  'Web Development',
  'Data Science',
  'Digital Marketing',
  'Mobile Development',
  'UI/UX Design',
  'Business',
  'AI & Machine Learning',
  'Cybersecurity'
];

const levels = ['Beginner', 'Intermediate', 'Advanced'];

export default function CreateCoursePage() {
  const fileInputRef = useRef(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState('');

  const [courseData, setCourseData] = useState({
    title: '',
    description: '',
    category: '',
    level: '',
    price: '',
    originalPrice: '',
    duration: '',
    thumbnail: '',
    features: [],
    learningOutcomes: []
  });

  const [courseContent, setCourseContent] = useState([]);
  const [newFeature, setNewFeature] = useState('');
  const [newOutcome, setNewOutcome] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleInputChange = (field, value) => {
    setCourseData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleFileChange = (event) => {
    const files = event.target.files;
    if (files.length > 0) {
      const file = files[0];
      if (!file.type.includes('image')) {
        toast.error('Invalid file type. Please select an image.');
        return;
      }

      const fileSizeInMB = file.size / (1024 * 1024);
      if (fileSizeInMB > 3) {
        toast.error("The image size is greater than 3 MB. Please select a smaller image.");
        event.target.value = "";
        return;
      }

      setSelectedFile(file);
      // Clear thumbnail URL when file is selected
      setCourseData(prev => ({
        ...prev,
        thumbnail: ''
      }));
      console.log('Image file selected:', file.name);
    }
  };

  const addFeature = () => {
    if (newFeature.trim()) {
      setCourseData(prev => ({
        ...prev,
        features: [...prev.features, newFeature.trim()]
      }));
      setNewFeature('');
    }
  };

  const removeFeature = (index) => {
    setCourseData(prev => ({
      ...prev,
      features: prev.features.filter((_, i) => i !== index)
    }));
  };

  const addOutcome = () => {
    if (newOutcome.trim()) {
      setCourseData(prev => ({
        ...prev,
        learningOutcomes: [...prev.learningOutcomes, newOutcome.trim()]
      }));
      setNewOutcome('');
    }
  };

  const removeOutcome = (index) => {
    setCourseData(prev => ({
      ...prev,
      learningOutcomes: prev.learningOutcomes.filter((_, i) => i !== index)
    }));
  };

  const addContentSection = () => {
    setCourseContent(prev => [...prev, {
      id: Date.now(),
      title: '',
      description: '',
      videoUrl: '',
      resources: []
    }]);
  };

  const updateContentSection = (id, field, value) => {
    setCourseContent(prev => prev.map(section =>
      section.id === id ? { ...section, [field]: value } : section
    ));
  };

  const removeContentSection = (id) => {
    setCourseContent(prev => prev.filter(section => section.id !== id));
  };

  const validateForm = () => {
    if (!courseData.title.trim()) {
      toast.error("Course title is required");
      return false;
    }
    if (!courseData.description.trim()) {
      toast.error("Course description is required");
      return false;
    }
    if (!courseData.category) {
      toast.error("Course category is required");
      return false;
    }
    if (!courseData.level) {
      toast.error("Course level is required");
      return false;
    }
    if (!courseData.price) {
      toast.error("Course price is required");
      return false;
    }
    if (!courseData.duration.trim()) {
      toast.error("Course duration is required");
      return false;
    }
    // Check if we have either a file or URL for thumbnail
    if (!selectedFile && !courseData.thumbnail.trim()) {
      toast.error("Course thumbnail is required - either upload a file or provide a URL");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    if (e && e.preventDefault) {
      e.preventDefault();
    }

    console.log('=== COURSE CREATION STARTED ===');

    if (!validateForm()) {
      console.log('Form validation failed');
      return;
    }

    console.log('Form validation passed, starting course creation process...');
    setIsLoading(true);
    setIsUploading(true);
    setUploadProgress('Starting...');

    try {
      let finalThumbnailUrl = '';

      // Step 1: Handle thumbnail - either use URL directly or upload file
      if (courseData.thumbnail.trim()) {
        // Direct URL provided
        finalThumbnailUrl = courseData.thumbnail.trim();
        console.log('Using direct thumbnail URL:', finalThumbnailUrl);
        setUploadProgress('Using provided URL...');
      } else if (selectedFile) {
        // File upload to Cloudinary
        console.log('Starting file upload to Cloudinary...');
        setUploadProgress('Uploading image to Cloudinary...');

        const formDataOBJ = new FormData();
        formDataOBJ.append('file', selectedFile);

        const imgLinkObj = await uploader(formDataOBJ);
        console.log('Cloudinary upload response:', imgLinkObj);

        if (imgLinkObj.status === 200 && imgLinkObj.imgLinkArray && imgLinkObj.imgLinkArray.length > 0) {
          finalThumbnailUrl = imgLinkObj.imgLinkArray[0];
          console.log('Image uploaded successfully to Cloudinary:', finalThumbnailUrl);
          setUploadProgress('Image uploaded successfully...');
        } else {
          console.error('Cloudinary upload failed:', imgLinkObj);
          toast.error("Failed to upload thumbnail to Cloudinary");
          setIsLoading(false);
          setIsUploading(false);
          setUploadProgress('');
          return;
        }
      } else {
        toast.error("Course thumbnail is required");
        setIsLoading(false);
        setIsUploading(false);
        setUploadProgress('');
        return;
      }

      console.log('Final thumbnail URL ready:', finalThumbnailUrl);

      // Step 2: Prepare course data
      setUploadProgress('Preparing course data...');

      const payload = {
        ...courseData,
        thumbnail: finalThumbnailUrl,
        content: courseContent,
        price: parseFloat(courseData.price),
        originalPrice: courseData.originalPrice ? parseFloat(courseData.originalPrice) : null,
      };

      console.log('Course payload prepared:', payload);

      // Step 3: Create course in database
      setUploadProgress('Creating course...');

      console.log('Sending course creation request to API...');

      const response = await fetch('/api/admin/courses/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      console.log('API response status:', response.status);

      const data = await response.json();
      console.log('API response data:', data);

      if (response.ok) {
        console.log('=== COURSE CREATED SUCCESSFULLY ===');
        console.log('Course ID:', data.courseId);

        setUploadProgress('Course created successfully!');
        toast.success('Course created successfully!');

        // Reset form after successful creation
        setCourseData({
          title: '',
          description: '',
          category: '',
          level: '',
          price: '',
          originalPrice: '',
          duration: '',
          thumbnail: '',
          features: [],
          learningOutcomes: []
        });
        setCourseContent([]);
        setSelectedFile(null);
        if (fileInputRef.current) {
          fileInputRef.current.value = "";
        }

        // Small delay before redirect to ensure toast is visible
        setTimeout(() => {
          router.push('/admin');
        }, 2000);
      } else {
        console.error('=== COURSE CREATION FAILED ===');
        console.error('API error:', data);
        toast.error(data.message || 'Failed to create course');
      }
    } catch (error) {
      console.error('=== COURSE CREATION ERROR ===');
      console.error('Error details:', error);
      toast.error('Something went wrong. Please try again.');
    } finally {
      setIsLoading(false);
      setIsUploading(false);
      setUploadProgress('');
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <AdminNavbar />

      <main className="pt-20 pb-12">
        <div className="container mx-auto px-4 max-w-4xl">
          {/* Header */}
          <motion.div
            className="flex items-center gap-4 mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Link href="/admin">
              <Button variant="outline" size="icon">
                <ArrowLeft className="w-4 h-4" />
              </Button>
            </Link>
            <div>
              <h1 className="text-3xl font-bold">Create New Course</h1>
              <p className="text-muted-foreground">
                Add a new course to your platform with content and resources.
              </p>
            </div>
          </motion.div>

          {/* Wrap everything in a form for better semantics */}
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Basic Information */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle>Basic Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="title">Course Title *</Label>
                      <Input
                        id="title"
                        placeholder="Enter course title"
                        value={courseData.title}
                        onChange={(e) => handleInputChange('title', e.target.value)}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="duration">Duration *</Label>
                      <Input
                        id="duration"
                        placeholder="e.g., 40 hours"
                        value={courseData.duration}
                        onChange={(e) => handleInputChange('duration', e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="description">Description *</Label>
                    <Textarea
                      id="description"
                      placeholder="Describe what students will learn in this course"
                      rows={4}
                      value={courseData.description}
                      onChange={(e) => handleInputChange('description', e.target.value)}
                      required
                    />
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="category">Category *</Label>
                      <Select onValueChange={(value) => handleInputChange('category', value)} required>
                        <SelectTrigger>
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                          {categories.map((category) => (
                            <SelectItem key={category} value={category}>
                              {category}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="level">Level *</Label>
                      <Select onValueChange={(value) => handleInputChange('level', value)} required>
                        <SelectTrigger>
                          <SelectValue placeholder="Select level" />
                        </SelectTrigger>
                        <SelectContent>
                          {levels.map((level) => (
                            <SelectItem key={level} value={level}>
                              {level}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="price">Price (₹) *</Label>
                      <Input
                        id="price"
                        type="number"
                        placeholder="2999"
                        value={courseData.price}
                        onChange={(e) => handleInputChange('price', e.target.value)}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="originalPrice">Original Price (₹)</Label>
                      <Input
                        id="originalPrice"
                        type="number"
                        placeholder="5999"
                        value={courseData.originalPrice}
                        onChange={(e) => handleInputChange('originalPrice', e.target.value)}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Thumbnail */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle>Course Thumbnail *</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="thumbnail-file">Upload Thumbnail</Label>
                    <div className="file-upload-area">
                      <input
                        ref={fileInputRef}
                        id="thumbnail-file"
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                        className="hidden"
                      />
                      <div
                        className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center cursor-pointer hover:border-gray-400 transition-colors"
                        onClick={() => fileInputRef.current?.click()}
                      >
                        {selectedFile ? (
                          <div className="flex flex-col items-center gap-2">
                            <ImageIcon className="w-8 h-8 text-green-600" />
                            <span className="text-sm font-medium text-green-600">
                              {selectedFile.name}
                            </span>
                            <span className="text-xs text-gray-500">
                              Click to change image
                            </span>
                          </div>
                        ) : (
                          <div className="flex flex-col items-center gap-2">
                            <Upload className="w-8 h-8 text-gray-400" />
                            <span className="text-sm font-medium">
                              Click to upload thumbnail
                            </span>
                            <span className="text-xs text-gray-500">
                              PNG, JPG, JPEG up to 3MB
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="text-center text-muted-foreground">OR</div>
                  <div className="space-y-2">
                    <Label htmlFor="thumbnail-url">Thumbnail URL</Label>
                    <Input
                      id="thumbnail-url"
                      placeholder="https://example.com/image.jpg"
                      value={courseData.thumbnail}
                      onChange={(e) => {
                        handleInputChange('thumbnail', e.target.value);
                        // Clear selected file when URL is entered
                        if (e.target.value.trim()) {
                          setSelectedFile(null);
                          if (fileInputRef.current) {
                            fileInputRef.current.value = "";
                          }
                        }
                      }}
                    />
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Features */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle>Course Features</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex gap-2">
                    <Input
                      placeholder="Add a course feature"
                      value={newFeature}
                      onChange={(e) => setNewFeature(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addFeature())}
                    />
                    <Button type="button" onClick={addFeature}>
                      <Plus className="w-4 h-4" />
                    </Button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {courseData.features.map((feature, index) => (
                      <Badge key={index} variant="secondary" className="flex items-center gap-2">
                        {feature}
                        <button
                          type="button"
                          onClick={() => removeFeature(index)}
                          className="text-xs hover:text-destructive"
                        >
                          ×
                        </button>
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Learning Outcomes */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle>Learning Outcomes</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex gap-2">
                    <Input
                      placeholder="What will students learn?"
                      value={newOutcome}
                      onChange={(e) => setNewOutcome(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addOutcome())}
                    />
                    <Button type="button" onClick={addOutcome}>
                      <Plus className="w-4 h-4" />
                    </Button>
                  </div>
                  <div className="space-y-2">
                    {courseData.learningOutcomes.map((outcome, index) => (
                      <div key={index} className="flex items-center gap-2 p-2 bg-muted rounded">
                        <span className="flex-1">{outcome}</span>
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => removeOutcome(index)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Course Content */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>Course Content</CardTitle>
                    <Button type="button" onClick={addContentSection} variant="outline">
                      <Plus className="w-4 h-4 mr-2" />
                      Add Section
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  {courseContent.map((section, index) => (
                    <div key={section.id} className="border rounded-lg p-4 space-y-4">
                      <div className="flex items-center justify-between">
                        <h4 className="font-medium">Section {index + 1}</h4>
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => removeContentSection(section.id)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>

                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label>Section Title</Label>
                          <Input
                            placeholder="Enter section title"
                            value={section.title}
                            onChange={(e) => updateContentSection(section.id, 'title', e.target.value)}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>Video URL</Label>
                          <div className="relative">
                            <LinkIcon className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                            <Input
                              placeholder="YouTube video URL"
                              value={section.videoUrl}
                              onChange={(e) => updateContentSection(section.id, 'videoUrl', e.target.value)}
                              className="pl-10"
                            />
                          </div>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label>Section Description</Label>
                        <Textarea
                          placeholder="Describe what this section covers"
                          rows={3}
                          value={section.description}
                          onChange={(e) => updateContentSection(section.id, 'description', e.target.value)}
                        />
                      </div>
                    </div>
                  ))}

                  {courseContent.length === 0 && (
                    <div className="text-center py-8 text-muted-foreground">
                      <p>No content sections added yet.</p>
                      <p className="text-sm">Click "Add Section" to start building your course content.</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </motion.div>

            {/* Submit Button */}
            <motion.div
              className="flex justify-end gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <Link href="/admin">
                <Button type="button" variant="outline" disabled={isLoading}>
                  Cancel
                </Button>
              </Link>
              <Button
                type="submit"
                disabled={isLoading}
                className="bg-purple-600 hover:bg-purple-700"
              >
                {isUploading ? (
                  <div className="inline-flex items-center">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    <span>{uploadProgress || 'Creating Course...'}</span>
                  </div>
                ) : (
                  <>
                    <Upload className="w-4 h-4 mr-2" />
                    <span>Create Course</span>
                  </>
                )}
              </Button>
            </motion.div>
          </form>
        </div>
      </main>
    </div>
  );
}