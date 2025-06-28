
import React from 'react';
import Header from '../components/Header';
import Hero from '../components/Hero';
import Dashboard from '../components/Dashboard';
import Features from '../components/Features';
import Footer from '../components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <Header />
      <Hero />
      <Dashboard />
      <Features />
      <Footer />
    </div>
  );
};

export default Index;
