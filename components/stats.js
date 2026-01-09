'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { Users, BookOpen, Award, Globe } from 'lucide-react';

const stats = [
  {
    icon: Users,
    value: 15000,
    label: 'Happy Students',
    suffix: '+'
  },
  {
    icon: BookOpen,
    value: 150,
    label: 'Quality Courses',
    suffix: '+'
  },
  {
    icon: Award,
    value: 98,
    label: 'Success Rate',
    suffix: '%'
  },
  {
    icon: Globe,
    value: 25,
    label: 'Countries',
    suffix: '+'
  }
];

function Counter({ target, suffix = '' }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const duration = 2000; // 2 seconds
    const steps = 60;
    const increment = target / steps;
    let current = 0;

    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, [target]);

  return (
    <span className="text-3xl md:text-4xl font-bold">
      {count.toLocaleString()}{suffix}
    </span>
  );
}

export default function Stats() {
  return (
    <section className="py-16 bg-primary text-primary-foreground">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              className="text-center"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <div className="flex justify-center mb-4">
                <div className="w-12 h-12 md:w-16 md:h-16 bg-white/10 rounded-full flex items-center justify-center">
                  <stat.icon className="w-6 h-6 md:w-8 md:h-8" />
                </div>
              </div>
              <Counter target={stat.value} suffix={stat.suffix} />
              <p className="text-primary-foreground/80 mt-2 text-sm md:text-base">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}