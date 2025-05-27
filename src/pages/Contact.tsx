
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ContactSection from '@/components/ContactSection';

const Contact = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-education-primary mb-8 text-center">Entre em Contato</h1>
        <ContactSection />
      </div>
      <Footer />
    </div>
  );
};

export default Contact;
