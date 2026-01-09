'use client';

import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { useRouter, useParams } from 'next/navigation';
import { ArrowLeft, Plus, Trash2, Upload, Link as LinkIcon, Image as ImageIcon, Save, Power } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/switch';
import { toast } from 'sonner';
import Link from 'next/link';
import AdminNavbar from '@/components/admin-navbar';
import CustomConfirmDialog, { useConfirmDialog } from '@/components/custom-confirm-dialog';
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

export default function EditCoursePage() {
  const confirm = useConfirmDialog();
  const router = useRouter();
  const params = useParams();
  const courseId = params.courseId;
  
  const fileInputRef = useRef(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState('');
  const [isPageLoading, setIsPageLoading] = useState(true);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

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
    learningOutcomes: [],
    isActive: true
  });

  const [originalCourseData, setOriginalCourseData] = useState({});
  const [courseContent, setCourseContent] = useState([]);
  const [originalCourseContent, setOriginalCourseContent] = useState([]);
  const [newFeature, setNewFeature] = useState('');
  const [newOutcome, setNewOutcome] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchCourseData();
  }, [courseId]);

  // Track changes for unsaved changes warning
  useEffect(() => {
    const dataChanged = JSON.stringify(courseData) !== JSON.stringify(originalCourseData);
    const contentChanged = JSON.stringify(courseContent) !== JSON.stringify(originalCourseContent);
    setHasUnsavedChanges(dataChanged || contentChanged || selectedFile !== null);
  }, [courseData, courseContent, originalCourseData, originalCourseContent, selectedFile]);

  const fetchCourseData = async () => {
    try {
      console.log('Fetching course data for ID:', courseId);
      
      const response = await fetch(`/api/admin/courses/${courseId}`, {
        headers: {
          'Authorization': `Bearer ${document.cookie.split('auth-token=')[1]?.split(';')[0]}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        const course = data.course;
        
        console.log('Fetched course data:', course);

        const courseInfo = {
          title: course.title || '',
          description: course.description || '',
          category: course.category || '',
          level: course.level || '',
          price: course.price?.toString() || '',
          originalPrice: course.originalPrice?.toString() || '',
          duration: course.duration || '',
          thumbnail: course.thumbnail || '',
          features: course.features || [],
          learningOutcomes: course.learningOutcomes || [],
          isActive: course.isActive !== undefined ? course.isActive : true
        };

        setCourseData(courseInfo);
        setOriginalCourseData({ ...courseInfo });
        
        const content = course.content || [];
        setCourseContent(content);
        setOriginalCourseContent([...content]);
        
        console.log('Course data loaded successfully');
      } else {
        console.error('Failed to fetch course data:', response.status);
        toast.error('Failed to load course data');
        router.push('/admin');
      }
    } catch (error) {
      console.error('Error fetching course data:', error);
      toast.error('Error loading course data');
      router.push('/admin');
    } finally {
      setIsPageLoading(false);
    }
  };

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
      console.log('New image file selected:', file.name);
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

  const removeContentSection = async (id) => {
    const confirmed = await confirm(
      'Are you sure you want to remove this content section? This action cannot be undone.',
      'Remove Section'
    );
    
    if (!confirmed) return;

    setCourseContent(prev => prev.filter(section => section.id !== id));
  };

  const toggleCourseStatus = async () => {
    const action = courseData.isActive ? 'deactivate' : 'activate';
    const confirmed = await confirm(
      `Are you sure you want to ${action} this course? ${courseData.isActive ? 'Students will no longer be able to enroll in this course.' : 'This course will become available for enrollment.'}`,
      `${action.charAt(0).toUpperCase() + action.slice(1)} Course`
    );
    
    if (!confirmed) return;

    setCourseData(prev => ({
      ...prev,
      isActive: !prev.isActive
    }));
    
    toast.success(`Course status will be ${courseData.isActive ? 'deactivated' : 'activated'} when you save changes`);
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
    // For edit, we need either existing thumbnail, new file, or new URL
    if (!courseData.thumbnail.trim() && !selectedFile) {
      toast.error("Course thumbnail is required");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    if (e && e.preventDefault) {
      e.preventDefault();
    }

    console.log('=== COURSE UPDATE STARTED ===');

    if (!validateForm()) {
      console.log('Form validation failed');
      return;
    }

    console.log('Form validation passed, starting course update process...');
    setIsLoading(true);
    setIsUploading(true);
    setUploadProgress('Starting...');

    try {
      let finalThumbnailUrl = courseData.thumbnail;

      // Handle thumbnail update if new file selected
      if (selectedFile) {
        console.log('Uploading new thumbnail to Cloudinary...');
        setUploadProgress('Uploading new image to Cloudinary...');

        const formDataOBJ = new FormData();
        formDataOBJ.append('file', selectedFile);

        const imgLinkObj = await uploader(formDataOBJ);
        console.log('Cloudinary upload response:', imgLinkObj);

        if (imgLinkObj.status === 200 && imgLinkObj.imgLinkArray && imgLinkObj.imgLinkArray.length > 0) {
          finalThumbnailUrl = imgLinkObj.imgLinkArray[0];
          console.log('New image uploaded successfully to Cloudinary:', finalThumbnailUrl);
          setUploadProgress('Image uploaded successfully...');
        } else {
          console.error('Cloudinary upload failed:', imgLinkObj);
          toast.error("Failed to upload new thumbnail to Cloudinary");
          setIsLoading(false);
          setIsUploading(false);
          setUploadProgress('');
          return;
        }
      }

      console.log('Final thumbnail URL ready:', finalThumbnailUrl);

      // Prepare update payload
      setUploadProgress('Updating course...');

      const payload = {
        ...courseData,
        thumbnail: finalThumbnailUrl,
        content: courseContent,
        price: parseFloat(courseData.price),
        originalPrice: courseData.originalPrice ? parseFloat(courseData.originalPrice) : null,
      };

      console.log('Course update payload prepared:', payload);

      // Update course in database
      console.log('Sending course update request to API...');

      const response = await fetch(`/api/admin/courses/${courseId}/edit`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${document.cookie.split('auth-token=')[1]?.split(';')[0]}`,
        },
        body: JSON.stringify(payload),
      });

      console.log('API response status:', response.status);

      const data = await response.json();
      console.log('API response data:', data);

      if (response.ok) {
        console.log('=== COURSE UPDATED SUCCESSFULLY ===');
        console.log('Course ID:', courseId);

        setUploadProgress('Course updated successfully!');
        toast.success('Course updated successfully!');

        // Reset unsaved changes flags
        setHasUnsavedChanges(false);
        setSelectedFile(null);
        if (fileInputRef.current) {
          fileInputRef.current.value = "";
        }

        // Update original data to new values
        setOriginalCourseData({ ...courseData, thumbnail: finalThumbnailUrl });
        setOriginalCourseContent([...courseContent]);

        // Small delay before redirect
        setTimeout(() => {
          router.push('/admin');
        }, 2000);
      } else {
        console.error('=== COURSE UPDATE FAILED ===');
        console.error('API error:', data);
        toast.error(data.message || 'Failed to update course');
      }
    } catch (error) {
      console.error('=== COURSE UPDATE ERROR ===');
      console.error('Error details:', error);
      toast.error('Something went wrong. Please try again.');
    } finally {
      setIsLoading(false);
      setIsUploading(false);
      setUploadProgress('');
    }
  };

  const handleNavigation = async (e, href) => {
    if (hasUnsavedChanges) {
      e.preventDefault();
      
      const confirmed = await confirm(
        'You have unsaved changes. Are you sure you want to leave this page? All unsaved changes will be lost.',
        'Unsaved Changes'
      );
      
      if (confirmed) {
        router.push(href);
      }
    }
  };

  // Loading state
  if (isPageLoading) {
    return (
      <div className="min-h-screen bg-background">
        <AdminNavbar />
        <div className="pt-20 flex items-center justify-center min-h-[60vh]">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <AdminNavbar />
      <CustomConfirmDialog />

      <main className="pt-20 pb-12">
        <div className="container mx-auto px-4 max-w-4xl">
          {/* Header */}
          <motion.div
            className="flex items-center gap-4 mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Button 
              variant="outline" 
              size="icon"
              onClick={(e) => handleNavigation(e, '/admin')}
            >
              <ArrowLeft className="w-4 h-4" />
            </Button>
            <div className="flex-1">
              <h1 className="text-3xl font-bold">Edit Course</h1>
              <p className="text-muted-foreground">
                Update course information, content, and settings.
              </p>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex items-center space-x-2">
                <Switch
                  id="course-status"
                  checked={courseData.isActive}
                  onCheckedChange={toggleCourseStatus}
                />
                <Label htmlFor="course-status" className="text-sm font-medium">
                  Course {courseData.isActive ? 'Active' : 'Inactive'}
                </Label>
              </div>
              <Badge variant={courseData.isActive ? 'default' : 'destructive'}>
                {courseData.isActive ? 'Published' : 'Draft'}
              </Badge>
            </div>
          </motion.div>

          {/* Unsaved changes indicator */}
          {hasUnsavedChanges && (
            <motion.div
              className="mb-6 p-4 bg-orange-50 dark:bg-orange-950/50 border border-orange-200 dark:border-orange-800 rounded-lg"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <p className="text-sm text-orange-700 dark:text-orange-300">
                You have unsaved changes. Don't forget to save your work!
              </p>
            </motion.div>
          )}

          {/* Form */}
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
                      <Select 
                        value={courseData.category} 
                        onValueChange={(value) => handleInputChange('category', value)} 
                        required
                      >
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
                      <Select 
                        value={courseData.level} 
                        onValueChange={(value) => handleInputChange('level', value)} 
                        required
                      >
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
                  <CardTitle>Course Thumbnail</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Current thumbnail preview */}
                  {courseData.thumbnail && !selectedFile && (
                    <div className="space-y-2">
                      <div className="relative inline-block">
                        <img
                          src={courseData.thumbnail}
                          alt="Current thumbnail"
                          className="w-32 h-20 object-cover rounded-lg border"
                        />
                        <Badge className="absolute -top-2 -right-2 bg-green-600">
                          Current
                        </Badge>
                      </div>
                    </div>
                  )}

                  <div className="space-y-2">
                    <Label htmlFor="thumbnail-file">Upload New Thumbnail</Label>
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
                              Click to upload new thumbnail
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
                    <Label htmlFor="thumbnail-url">Update Thumbnail URL</Label>
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
              <Button 
                type="button" 
                variant="outline" 
                disabled={isLoading}
                onClick={(e) => handleNavigation(e, '/admin')}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={isLoading}
                className="bg-purple-600 hover:bg-purple-700"
              >
                {isUploading ? (
                  <div className="inline-flex items-center">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    <span>{uploadProgress || 'Updating Course...'}</span>
                  </div>
                ) : (
                  <>
                    <Save className="w-4 h-4 mr-2" />
                    <span>Update Course</span>
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