'use client';

import { useState, useEffect } from 'react';

const CookieConsent = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check if user has already made a choice
    const hasConsent = localStorage.getItem('cookieConsent');
    if (!hasConsent) {
      setIsVisible(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('cookieConsent', 'accepted');
    setIsVisible(false);
  };

  const handleReject = () => {
    localStorage.setItem('cookieConsent', 'rejected');
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-8 right-8 max-w-md bg-white rounded-2xl shadow-xl p-8 z-50 animate-fade-in">
      <h3 className="text-[1.375rem] leading-[1.75rem] font-medium text-gray-900 mb-4">
        We waarderen je privacy
      </h3>
      <p className="text-gray-600 text-base mb-6">
        We gebruiken cookies om je browse-ervaring te verbeteren, gepersonaliseerde advertenties of content te tonen en ons verkeer te analyseren. Door op "Alles accepteren" te klikken, stem je in met ons gebruik van cookies en ga je akkoord met onze privacy verklaring.
      </p>
      <div className="flex gap-4">
        <button
          onClick={handleReject}
          className="flex-1 px-6 py-3 rounded-xl border-2 border-gray-200 text-gray-900 hover:bg-gray-50 transition-colors"
        >
          Alles weigeren
        </button>
        <button
          onClick={handleAccept}
          className="flex-1 px-6 py-3 rounded-xl bg-[#0063f2] text-white hover:bg-[#004dbd] transition-colors"
        >
          Alles accepteren
        </button>
      </div>
    </div>
  );
};

export default CookieConsent; 