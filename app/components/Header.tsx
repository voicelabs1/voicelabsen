'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

const Header = () => {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    } else if (pathname !== '/') {
      window.location.href = `/#${sectionId}`;
    }
    setIsMenuOpen(false);
  };

  return (
    <header className="fixed w-full z-50 px-4 pt-4">
      <div className="max-w-7xl mx-auto">
        <div className="backdrop-blur-md bg-white/70 rounded-2xl border border-gray-100/50">
          <div className="px-4 lg:px-8">
            <div className="flex justify-between items-center h-20">
              {/* Logo */}
              <div className="flex-shrink-0 -ml-6 md:ml-0">
                <Link href="/">
                  <div className="h-[70px] w-[200px] relative">
                    <Image
                      src="/images/logovoicelabs.svg"
                      alt="Voicelabs"
                      fill
                      className="object-contain"
                      priority
                    />
                  </div>
                </Link>
              </div>

              {/* Navigation - Desktop */}
              <nav className="hidden md:flex items-center space-x-8">
                <Link href="/" className="text-[15px] text-gray-700 hover:text-gray-900">
                  Home
                </Link>
                <button 
                  onClick={() => scrollToSection('solutions')} 
                  className="text-[15px] text-gray-700 hover:text-gray-900"
                >
                  Solutions
                </button>
                <button 
                  onClick={() => scrollToSection('pricing')} 
                  className="text-[15px] text-gray-700 hover:text-gray-900"
                >
                  Pricing
                </button>
                <Link href="/news" className="text-[15px] text-gray-700 hover:text-gray-900">
                  News
                </Link>
                <Link href="/contact" className="text-[15px] text-gray-700 hover:text-gray-900">
                  Contact
                </Link>
                <Link
                  href="/consult"
                  className="bg-[#0063f2] text-white text-[15px] px-6 py-2.5 rounded-xl hover:bg-blue-600 transition-colors font-medium"
                >
                  Get Started
                </Link>
              </nav>

              {/* Mobile CTA and Menu */}
              <div className="flex md:hidden items-center gap-2">
                <Link
                  href="/consult"
                  className="bg-[#0063f2] text-white text-[13px] sm:text-[15px] px-4 sm:px-6 py-2 sm:py-2.5 rounded-xl hover:bg-blue-600 transition-colors font-medium whitespace-nowrap"
                >
                  Get Started
                </Link>
                {/* Mobile menu button */}
                <button
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  className="p-1.5 sm:p-2 rounded-lg hover:bg-gray-100/50 transition-colors"
                  aria-label="Toggle menu"
                >
                  <svg
                    className="w-5 sm:w-6 h-5 sm:h-6 text-gray-700"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    {isMenuOpen ? (
                      <path d="M6 18L18 6M6 6l12 12" />
                    ) : (
                      <path d="M4 6h16M4 12h16M4 18h16" />
                    )}
                  </svg>
                </button>
              </div>
            </div>
          </div>

          {/* Mobile menu */}
          <div
            className={`md:hidden transition-all duration-300 ease-in-out ${
              isMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
            } overflow-hidden`}
          >
            <nav className="px-4 pb-4 space-y-3">
              <Link
                href="/"
                className="block text-[15px] text-gray-700 hover:text-gray-900 py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <button 
                onClick={() => scrollToSection('solutions')}
                className="block w-full text-left text-[15px] text-gray-700 hover:text-gray-900 py-2"
              >
                Solutions
              </button>
              <button 
                onClick={() => scrollToSection('pricing')}
                className="block w-full text-left text-[15px] text-gray-700 hover:text-gray-900 py-2"
              >
                Pricing
              </button>
              <Link
                href="/news"
                className="block text-[15px] text-gray-700 hover:text-gray-900 py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                News
              </Link>
              <Link
                href="/contact"
                className="block text-[15px] text-gray-700 hover:text-gray-900 py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Contact
              </Link>
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header; 