'use client';

import { motion } from 'framer-motion';
import { Code, Database, Megaphone, Smartphone, Palette, TrendingUp, Brain, Shield } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const categories = [
  {
    name: 'Web Development',
    icon: Code,
    courses: 45,
    color: 'bg-blue-500/10 text-blue-600 dark:text-blue-400'
  },
  {
    name: 'Data Science',
    icon: Database,
    courses: 32,
    color: 'bg-purple-500/10 text-purple-600 dark:text-purple-400'
  },
  {
    name: 'Digital Marketing',
    icon: Megaphone,
    courses: 28,
    color: 'bg-pink-500/10 text-pink-600 dark:text-pink-400'
  },
  {
    name: 'Mobile Development',
    icon: Smartphone,
    courses: 23,
    color: 'bg-green-500/10 text-green-600 dark:text-green-400'
  },
  {
    name: 'UI/UX Design',
    icon: Palette,
    courses: 35,
    color: 'bg-orange-500/10 text-orange-600 dark:text-orange-400'
  },
  {
    name: 'Business',
    icon: TrendingUp,
    courses: 41,
    color: 'bg-red-500/10 text-red-600 dark:text-red-400'
  },
  {
    name: 'AI & Machine Learning',
    icon: Brain,
    courses: 19,
    color: 'bg-indigo-500/10 text-indigo-600 dark:text-indigo-400'
  },
  {
    name: 'Cybersecurity',
    icon: Shield,
    courses: 15,
    color: 'bg-yellow-500/10 text-yellow-600 dark:text-yellow-400'
  }
];

export default function Categories() {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Explore Categories
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Choose from our wide range of course categories and start your learning journey today.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {categories.map((category, index) => (
            <motion.div
              key={category.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
            >
              <Card className="h-full hover:shadow-lg transition-all duration-300 cursor-pointer group">
                <CardContent className="p-6 text-center">
                  <div className={`w-16 h-16 mx-auto mb-4 rounded-2xl flex items-center justify-center ${category.color} group-hover:scale-110 transition-transform duration-300`}>
                    <category.icon className="w-8 h-8" />
                  </div>
                  <h3 className="font-semibold text-lg mb-2 group-hover:text-primary transition-colors">
                    {category.name}
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    {category.courses} courses
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}