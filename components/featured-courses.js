'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import CourseCard from '@/components/course-card';
import Link from 'next/link';

const dummyCourses = [
  {
    id: 1,
    title: 'Complete Web Development Bootcamp',
    description: 'Learn HTML, CSS, JavaScript, React, Node.js and build amazing websites',
    thumbnail: 'https://images.pexels.com/photos/11035380/pexels-photo-11035380.jpeg',
    price: 4999,
    originalPrice: 9999,
    rating: 4.8,
    duration: '40 hours',
    enrolled: 1200,
    level: 'Beginner',
    category: 'Web Development'
  },
  {
    id: 2,
    title: 'Python for Data Science',
    description: 'Master Python programming and data analysis with real-world projects',
    thumbnail: 'https://images.pexels.com/photos/1181677/pexels-photo-1181677.jpeg',
    price: 3999,
    originalPrice: 7999,
    rating: 4.9,
    duration: '35 hours',
    enrolled: 850,
    level: 'Intermediate',
    category: 'Data Science'
  },
  {
    id: 3,
    title: 'Digital Marketing Mastery',
    description: 'Complete guide to SEO, SEM, Social Media Marketing and Analytics',
    thumbnail: 'https://images.pexels.com/photos/265087/pexels-photo-265087.jpeg',
    price: 2999,
    originalPrice: 5999,
    rating: 4.7,
    duration: '25 hours',
    enrolled: 950,
    level: 'Beginner',
    category: 'Marketing'
  },
  {
    id: 4,
    title: 'Mobile App Development with React Native',
    description: 'Build cross-platform mobile apps for iOS and Android',
    thumbnail: 'https://images.pexels.com/photos/147413/twitter-facebook-together-exchange-of-information-147413.jpeg',
    price: 5999,
    originalPrice: 11999,
    rating: 4.8,
    duration: '50 hours',
    enrolled: 650,
    level: 'Advanced',
    category: 'Mobile Development'
  }
];

export default function FeaturedCourses() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    // In a real app, you'd fetch from your API
    setCourses(dummyCourses);
  }, []);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % Math.max(1, courses.length - 2));
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => 
      prev === 0 ? Math.max(0, courses.length - 3) : prev - 1
    );
  };

  if (courses.length === 0) {
    return (
      <section className="py-20 bg-secondary/20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <div className="h-8 bg-muted rounded w-64 mx-auto mb-4" />
            <div className="h-4 bg-muted rounded w-96 mx-auto" />
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-96 bg-muted rounded-lg animate-pulse" />
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-secondary/20">
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Featured Courses
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Discover our most popular courses designed by industry experts to help you 
            advance your career and achieve your goals.
          </p>
        </motion.div>

        {/* Desktop Carousel */}
        <div className="hidden md:block relative overflow-hidden">
          <motion.div 
            className="flex transition-transform duration-500 ease-in-out"
            style={{ transform: `translateX(-${currentIndex * (100 / 3)}%)` }}
          >
            {courses.map((course, index) => (
              <div key={course.id} className="w-1/3 flex-shrink-0 px-3">
                <CourseCard course={course} index={index} />
              </div>
            ))}
          </motion.div>

          {/* Navigation Arrows */}
          <Button
            variant="outline"
            size="icon"
            className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-background shadow-lg"
            onClick={prevSlide}
            disabled={currentIndex === 0}
          >
            <ChevronLeft className="w-4 h-4" />
          </Button>
          
          <Button
            variant="outline"
            size="icon"
            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-background shadow-lg"
            onClick={nextSlide}
            disabled={currentIndex >= courses.length - 3}
          >
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>

        {/* Mobile Grid */}
        <div className="grid md:hidden grid-cols-1 sm:grid-cols-2 gap-6">
          {courses.slice(0, 4).map((course, index) => (
            <CourseCard key={course.id} course={course} index={index} />
          ))}
        </div>

        {/* View All Button */}
        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <Link href="/courses">
            <Button size="lg" variant="outline" className="group">
              View All Courses
              <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}