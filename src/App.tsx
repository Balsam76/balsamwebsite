import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import HeroSection from './components/HeroSection';
import AboutSection from './components/AboutSection';
import FeaturesSection from './components/FeaturesSection';
import DownloadSection from './components/DownloadSection';
import Footer from './components/Footer';
import VoiceSessionRedirect from './components/VoiceSessionRedirect';

function HomePage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-white">
      <Header mobileMenuOpen={mobileMenuOpen} setMobileMenuOpen={setMobileMenuOpen} />
      <main>
        <HeroSection />
        {/* Removed StatsSection per request */}
        <AboutSection />
        <FeaturesSection />
        <DownloadSection />
      </main>
      <Footer />
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/voice-session/:sessionId" element={<VoiceSessionRedirect />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
