'use client';

import { useState, useEffect } from 'react';
import CookieSettingsModal from './CookieSettings';

const CookieConsent = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  useEffect(() => {
    // Check if user has already made a choice
    const hasConsent = localStorage.getItem('cookieConsent');
    if (!hasConsent) {
      setIsVisible(true);
    }
  }, []);

  const handleAccept = () => {
    // Accept all cookies
    const settings = {
      necessary: true,
      analytics: true,
      marketing: true
    };
    localStorage.setItem('cookieSettings', JSON.stringify(settings));
    localStorage.setItem('cookieConsent', 'accepted');
    setIsVisible(false);
    // Here you would typically initialize your analytics and marketing tools
  };

  const handleReject = () => {
    // Only accept necessary cookies
    const settings = {
      necessary: true,
      analytics: false,
      marketing: false
    };
    localStorage.setItem('cookieSettings', JSON.stringify(settings));
    localStorage.setItem('cookieConsent', 'rejected');
    setIsVisible(false);
  };

  const handleCustomize = () => {
    setIsSettingsOpen(true);
    setIsVisible(false);
  };

  if (!isVisible) return <CookieSettingsModal isOpen={isSettingsOpen} onClose={() => setIsSettingsOpen(false)} />;

  return (
    <>
      <div className="fixed bottom-8 right-8 max-w-md bg-white rounded-2xl shadow-xl p-8 z-50 animate-fade-in">
        <h3 className="text-[1.375rem] leading-[1.75rem] font-medium text-gray-900 mb-4">
          We value your privacy
        </h3>
        <p className="text-gray-600 text-base mb-6">
          We use cookies to enhance your browsing experience, display personalized ads or content, and analyze our traffic. By clicking "Accept All", you consent to our use of cookies.
        </p>
        <div className="flex flex-col gap-3">
          <button
            onClick={handleAccept}
            className="w-full px-6 py-3 rounded-xl bg-[#0063f2] text-white hover:bg-[#004dbd] transition-colors"
          >
            Accept All
          </button>
          <div className="flex gap-3">
            <button
              onClick={handleReject}
              className="flex-1 px-6 py-3 rounded-xl border-2 border-gray-200 text-gray-900 hover:bg-gray-50 transition-colors"
            >
              Reject All
            </button>
            <button
              onClick={handleCustomize}
              className="flex-1 px-6 py-3 rounded-xl border-2 border-gray-200 text-gray-900 hover:bg-gray-50 transition-colors"
            >
              Customize
            </button>
          </div>
        </div>
      </div>
      <CookieSettingsModal isOpen={isSettingsOpen} onClose={() => setIsSettingsOpen(false)} />
    </>
  );
};

export default CookieConsent; 