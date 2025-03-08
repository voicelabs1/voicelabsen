'use client';

import Link from 'next/link';
import { useState } from 'react';
import CookieSettingsModal from './CookieSettings';

const Footer = () => {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  return (
    <footer className="bg-[#004dbd] text-white relative overflow-hidden">
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover"
        >
          <source src="/comps/bg.mp4" type="video/mp4" />
        </video>
      </div>
      <div className="max-w-7xl mx-auto px-4 py-8 relative z-10">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="text-white/90 text-sm text-center sm:text-left">
            Powered by Voicelabs
          </div>
          
          <div className="text-white/90 text-sm text-center sm:text-left">
            <a href="mailto:contact@voicelabs.agency" className="hover:text-white transition-colors">
              contact@voicelabs.agency
            </a>
          </div>

          <nav className="flex flex-wrap justify-center sm:justify-end items-center gap-4 sm:gap-6">
            <Link href="/terms-and-conditions" className="text-sm text-white/90 hover:text-white transition-colors">
              Terms and Conditions
            </Link>
            <Link href="/privacy-policy" className="text-sm text-white/90 hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <Link href="/ethical-framework" className="text-sm text-white/90 hover:text-white transition-colors">
              Ethical Framework
            </Link>
            <button 
              onClick={() => setIsSettingsOpen(true)}
              className="text-sm text-white/90 hover:text-white transition-colors"
            >
              Cookie Settings
            </button>
          </nav>
        </div>
      </div>
      <CookieSettingsModal isOpen={isSettingsOpen} onClose={() => setIsSettingsOpen(false)} />
    </footer>
  );
};

export default Footer; 