'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import Link from 'next/link';
import { Clock, Users, Star, IndianRupee, Play } from 'lucide-react';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import CourseDetailModal from './course-detail-modal';

export default function CourseCard({ course, index = 0 }) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -5 }}
      className="h-full"
    >
      <Card className="overflow-hidden h-full hover:shadow-lg transition-all duration-300 group">
        <div className="relative overflow-hidden">
          <img
            src={course.thumbnail || 'https://images.pexels.com/photos/5212345/pexels-photo-5212345.jpeg'}
            alt={course.title}
            className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
          />
          
          {/* Play Button Overlay */}
          <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
            <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
              <Play className="w-6 h-6 text-white ml-1" />
            </div>
          </div>

          {/* Course Level Badge */}
          <Badge className="absolute top-3 left-3" variant={course.level === 'Beginner' ? 'secondary' : course.level === 'Intermediate' ? 'default' : 'destructive'}>
            {course.level}
          </Badge>

          {/* Rating */}
          <div className="absolute top-3 right-3 bg-black/50 backdrop-blur-sm rounded-full px-2 py-1 flex items-center space-x-1">
            <Star className="w-3 h-3 text-yellow-400 fill-current" />
            <span className="text-white text-xs font-medium">{course.rating}</span>
          </div>
        </div>

        <CardContent className="p-6">
          <div className="mb-3">
            <Badge variant="outline" className="text-xs">
              {course.category}
            </Badge>
          </div>
          
          <h3 className="font-semibold text-lg mb-2 line-clamp-2 group-hover:text-primary transition-colors">
            {course.title}
          </h3>
          
          <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
            {course.description}
          </p>

          <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
            <div className="flex items-center space-x-1">
              <Clock className="w-4 h-4" />
              <span>{course.duration}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Users className="w-4 h-4" />
              <span>{course.enrolled} students</span>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-1">
              <IndianRupee className="w-4 h-4" />
              <span className="text-2xl font-bold">{course.price}</span>
              {course.originalPrice && (
                <span className="text-sm text-muted-foreground line-through ml-2">
                  ₹{course.originalPrice}
                </span>
              )}
            </div>
          </div>
        </CardContent>

        <CardFooter className="p-6 pt-0">
          <Button 
            className="w-full group"
            onClick={() => setShowModal(true)}
          >
              Learn More
              <motion.div
                className="ml-2"
                whileHover={{ x: 5 }}
                transition={{ type: "spring", stiffness: 400 }}
              >
                →
              </motion.div>
            </Button>
        </CardFooter>
      </Card>
    </motion.div>
    
    <CourseDetailModal 
      course={course}
      isOpen={showModal}
      onClose={() => setShowModal(false)}
    />
    </>
  );
}