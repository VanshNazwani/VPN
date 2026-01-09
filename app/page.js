import Navbar from '@/components/navbar';
import HeroSection from '@/components/hero-section';
import FeaturedCourses from '@/components/featured-courses';
import Categories from '@/components/categories';
import Testimonials from '@/components/testimonials';
import Stats from '@/components/stats';
import Footer from '@/components/footer';

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <HeroSection />
      {/* <Stats /> */}
      <FeaturedCourses />
      <Categories />
      <Testimonials />
      <Footer />
    </main>
  );
}