
import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import HeroBanner from '@/components/HeroBanner';
import NewsSection from '@/components/NewsSection';
import SchoolsSection from '@/components/SchoolsSection';
import ContactSection from '@/components/ContactSection';
import Footer from '@/components/Footer';

const Home = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <HeroBanner />
      <NewsSection />
      <SchoolsSection />
      <ContactSection />
      <Footer />
    </div>
  );
};

export default Home;
