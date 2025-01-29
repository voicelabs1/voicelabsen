'use client';

import { useState, useEffect } from 'react';

interface CookieSettings {
  necessary: boolean;
  analytics: boolean;
  marketing: boolean;
}

interface CookieSettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const CookieSettingsModal = ({ isOpen, onClose }: CookieSettingsModalProps) => {
  const [settings, setSettings] = useState<CookieSettings>({
    necessary: true,
    analytics: false,
    marketing: false
  });

  useEffect(() => {
    if (isOpen) {
      const savedSettings = localStorage.getItem('cookieSettings');
      if (savedSettings) {
        setSettings(JSON.parse(savedSettings));
      }
    }
  }, [isOpen]);

  const handleSave = () => {
    localStorage.setItem('cookieSettings', JSON.stringify(settings));
    localStorage.setItem('cookieConsent', 'custom');
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-end sm:items-center justify-center z-50 p-4 sm:p-8">
      <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full animate-fade-in">
        <h3 className="text-[1.375rem] leading-[1.75rem] font-medium text-gray-900 mb-4">
          Cookie Instellingen
        </h3>
        
        <div className="space-y-6">
          {/* Necessary Cookies */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <h4 className="text-base font-medium text-gray-900">Noodzakelijke cookies</h4>
              <input
                type="checkbox"
                checked={settings.necessary}
                disabled
                className="w-4 h-4 text-[#0063f2] border-gray-300 rounded cursor-not-allowed"
              />
            </div>
            <p className="text-gray-600 text-sm">
              Deze cookies zijn nodig om de website te laten werken en kunnen niet worden uitgeschakeld.
            </p>
          </div>

          {/* Analytics Cookies */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <h4 className="text-base font-medium text-gray-900">Analytische cookies</h4>
              <input
                type="checkbox"
                checked={settings.analytics}
                onChange={(e) => setSettings({ ...settings, analytics: e.target.checked })}
                className="w-4 h-4 text-[#0063f2] border-gray-300 rounded cursor-pointer"
              />
            </div>
            <p className="text-gray-600 text-sm">
              Deze cookies helpen ons te begrijpen hoe bezoekers onze website gebruiken.
            </p>
          </div>

          {/* Marketing Cookies */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <h4 className="text-base font-medium text-gray-900">Marketing cookies</h4>
              <input
                type="checkbox"
                checked={settings.marketing}
                onChange={(e) => setSettings({ ...settings, marketing: e.target.checked })}
                className="w-4 h-4 text-[#0063f2] border-gray-300 rounded cursor-pointer"
              />
            </div>
            <p className="text-gray-600 text-sm">
              Deze cookies worden gebruikt om advertenties relevanter te maken voor u.
            </p>
          </div>
        </div>

        <div className="mt-6 flex flex-col gap-3">
          <button
            onClick={handleSave}
            className="w-full px-6 py-3 rounded-xl bg-[#0063f2] text-white hover:bg-[#004dbd] transition-colors"
          >
            Instellingen opslaan
          </button>
          <button
            onClick={onClose}
            className="w-full px-6 py-3 rounded-xl border-2 border-gray-200 text-gray-900 hover:bg-gray-50 transition-colors"
          >
            Annuleren
          </button>
        </div>
      </div>
    </div>
  );
};

export default CookieSettingsModal; 