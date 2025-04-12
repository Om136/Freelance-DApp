'use client';
import { useEffect } from 'react';
import Navbar from '@/components/navbar';
import Hero from '@/components/hero';
import Features from '@/components/features';
import HowItWorks from '@/components/howitworks';
import Categories from '@/components/categories';
import CallToAction from '@/components/calltoaction';
import Footer from '@/components/footer';

const Index = () => {
  useEffect(() => {
    document.title = 'DeciFreelance | Decentralized Freelancer Marketplace';
  }, []);

  return (
    <div className="min-h-screen overflow-x-hidden">
      <Navbar />
      <Hero />
      <Features />
      <HowItWorks />
      <Categories />
      <CallToAction />
      <Footer />
    </div>
  );
};

export default Index;