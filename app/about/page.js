'use client';

import { motion } from 'framer-motion';
import { Award, Users, BookOpen, Star, Target, Heart, Zap } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Navbar from '@/components/navbar';
import Footer from '@/components/footer';

const stats = [
  { icon: Users, value: '15,000+', label: 'Students Worldwide' },
  { icon: BookOpen, value: '150+', label: 'Expert-Led Courses' },
  { icon: Award, value: '12,000+', label: 'Certificates Issued' },
  { icon: Star, value: '4.8/5', label: 'Average Rating' }
];

const values = [
  {
    icon: Target,
    title: 'Excellence in Education',
    description: 'We maintain the highest standards in course content and delivery, ensuring every student receives world-class education.'
  },
  {
    icon: Heart,
    title: 'Student-Centric Approach',
    description: 'Every decision we make is centered around student success. Your growth and achievement are our primary motivation.'
  },
  {
    icon: Zap,
    title: 'Innovation & Technology',
    description: 'We leverage cutting-edge technology to create immersive learning experiences that adapt to modern educational needs.'
  }
];

const team = [
  {
    name: 'Rajesh Kumar',
    role: 'Founder & CEO',
    image: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg',
    description: 'Former tech executive with 15+ years in EdTech and a passion for democratizing quality education.'
  },
  {
    name: 'Priya Sharma',
    role: 'Head of Curriculum',
    image: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg',
    description: 'Educational expert who has designed curricula for leading institutions and technology companies.'
  },
  {
    name: 'Arjun Singh',
    role: 'Chief Technology Officer',
    image: 'https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg',
    description: 'Full-stack developer and architect who builds the technology that powers our learning platform.'
  },
  {
    name: 'Sneha Patel',
    role: 'Student Success Manager',
    image: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg',
    description: 'Dedicated to ensuring every student achieves their learning goals and career aspirations.'
  }
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-20 pb-16 bg-gradient-to-br from-primary/10 via-background to-secondary/10">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Empowering Learners
              <span className="bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
                {' '}Worldwide
              </span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
              At VPN Digital Services Academy, we believe that quality education should be 
              accessible to everyone. Our mission is to bridge the skills gap and empower 
              individuals to achieve their career goals through comprehensive, industry-relevant courses.
            </p>
            <div className="flex justify-center">
              <Badge className="text-lg py-2 px-6">
                Transforming Lives Through Education Since 2020
              </Badge>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
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
                  <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center">
                    <stat.icon className="w-8 h-8" />
                  </div>
                </div>
                <h3 className="text-3xl font-bold mb-2">{stat.value}</h3>
                <p className="text-primary-foreground/80">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Our Story</h2>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  Founded in 2020 by a team of passionate educators and technology professionals, 
                  VPN Digital Services Academy emerged from a simple yet powerful vision: to make 
                  high-quality, industry-relevant education accessible to learners everywhere.
                </p>
                <p>
                  We recognized that the traditional education system wasn't keeping pace with 
                  the rapidly evolving demands of the digital economy. Students were graduating 
                  with degrees but lacking the practical skills employers desperately needed.
                </p>
                <p>
                  Our founders, having worked in leading technology companies and educational 
                  institutions, combined their expertise to create a learning platform that 
                  bridges this gap. We focus on practical, hands-on learning that translates 
                  directly into career success.
                </p>
                <p>
                  Today, we're proud to have helped thousands of students transform their careers, 
                  with many landing jobs at top companies or successfully launching their own ventures.
                </p>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="relative"
            >
              <img
                src="https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg"
                alt="Team collaboration"
                className="rounded-2xl shadow-2xl w-full h-[500px] object-cover"
              />
              <div className="absolute -bottom-6 -left-6 bg-background p-6 rounded-xl shadow-lg">
                <p className="text-2xl font-bold text-primary">4+ Years</p>
                <p className="text-sm text-muted-foreground">Of Educational Excellence</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-secondary/20">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Values</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              These core principles guide everything we do and shape the learning 
              experience we create for our students.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="h-full hover:shadow-lg transition-shadow">
                  <CardContent className="p-8 text-center">
                    <div className={`w-16 h-16 mx-auto mb-6 bg-primary/10 rounded-full flex items-center justify-center`}>
                      <value.icon className="w-8 h-8 text-primary" />
                    </div>
                    <h3 className="text-xl font-semibold mb-4">{value.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {value.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Meet Our Team</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              The passionate individuals behind VPN Academy who are dedicated to 
              your success and committed to delivering exceptional education.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6 text-center">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-24 h-24 rounded-full object-cover mx-auto mb-4 border-4 border-primary/20"
                    />
                    <h3 className="text-xl font-semibold mb-2">{member.name}</h3>
                    <p className="text-primary font-medium mb-3">{member.role}</p>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {member.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 bg-gradient-to-r from-primary to-blue-600 text-white">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Our Mission</h2>
            <p className="text-xl leading-relaxed mb-8 text-white/90">
              To democratize access to high-quality, industry-relevant education and 
              empower learners worldwide to achieve their career goals through practical, 
              hands-on learning experiences that bridge the gap between education and employment.
            </p>
            <div className="grid md:grid-cols-2 gap-8 text-left">
              <div>
                <h3 className="text-xl font-semibold mb-4">What We Do</h3>
                <ul className="space-y-2 text-white/90">
                  <li>• Create industry-relevant curriculum with experts</li>
                  <li>• Provide hands-on, project-based learning</li>
                  <li>• Offer career support and job placement assistance</li>
                  <li>• Build a supportive learning community</li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-4">Why We Do It</h3>
                <ul className="space-y-2 text-white/90">
                  <li>• Bridge the skills gap in the job market</li>
                  <li>• Make quality education accessible to all</li>
                  <li>• Empower career transformation</li>
                  <li>• Foster lifelong learning habits</li>
                </ul>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}