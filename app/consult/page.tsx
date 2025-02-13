'use client';

import Header from '../components/Header';
import Footer from '../components/Footer';
import { useEffect } from 'react';

declare global {
  interface Window {
    Cal?: any;
  }
}

const fadeSlideIn = {
  '@keyframes fadeSlideIn': {
    '0%': {
      opacity: '0',
      transform: 'translateX(20px)'
    },
    '100%': {
      opacity: '1',
      transform: 'translateX(0)'
    }
  },
  '.animate-fadeSlideIn': {
    animation: 'fadeSlideIn 0.5s ease-out forwards'
  }
};

export default function ConsultPage() {
  useEffect(() => {
    // Initialize Cal.com
    (function (C: any, A: string, L: string) {
      let p = function (a: any, ar: any) { a.q.push(ar); };
      let d = C.document;
      C.Cal = C.Cal || function () {
        let cal = C.Cal;
        let ar = arguments;
        if (!cal.loaded) {
          cal.ns = {};
          cal.q = cal.q || [];
          d.head.appendChild(d.createElement("script")).src = A;
          cal.loaded = true;
        }
        if (ar[0] === L) {
          const api = function () { p(api, arguments); };
          const namespace = ar[1];
          api.q = api.q || [];
          if (typeof namespace === "string") {
            cal.ns[namespace] = cal.ns[namespace] || api;
            p(cal.ns[namespace], ar);
            p(cal, ["initNamespace", namespace]);
          } else p(cal, ar);
          return;
        }
        p(cal, ar);
      };
    })(window, "https://app.cal.com/embed/embed.js", "init");

    // Initialize Cal
    if (window.Cal) {
      window.Cal("init", "15min", { origin: "https://cal.com" });

      window.Cal.ns["15min"]("inline", {
        elementOrSelector: "#my-cal-inline",
        config: { "layout": "month_view" },
        calLink: "voicelabs/15min",
      });

      window.Cal.ns["15min"]("ui", {
        "cssVarsPerTheme": {
          "light": { "cal-brand": "#0063f2" }
        },
        "hideEventTypeDetails": false,
        "layout": "month_view"
      });
    }
  }, []);

  // Add reveal on scroll functionality
  useEffect(() => {
    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
        }
      });
    };

    const observerOptions = {
      threshold: 0.1
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);
    const elements = document.querySelectorAll('.reveal');
    elements.forEach(el => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <main className="min-h-screen bg-white">
      <Header />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-16 bg-[#003366]">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover opacity-10"
        >
          <source src="/comps/bg.mp4" type="video/mp4" />
        </video>
        <div className="relative max-w-7xl mx-auto px-4">
          <div className="max-w-3xl">
            <h1 className="text-white mb-6 animate-fadeSlideIn [animation-duration:1.2s]">
              Boek een<br />
              <span className="text-[#0063f2]">vrijblijvend</span> consult
            </h1>
            <p className="paragraph text-white/80 mb-8 reveal">
              Benieuwd hoe onze AI-receptionisen uw bedrijf kunnen ondersteunen? Boek gemakkelijk een vrijblijvend consult met een van onze specialisten.
            </p>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="space-y-4 reveal">
              <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center">
                <svg className="w-6 h-6 text-[#0063f2]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3>Persoonlijk advies</h3>
              <p className="text-gray-600">Krijg direct inzicht in hoe AI-telefonie jouw specifieke situatie kan verbeteren.</p>
            </div>
            <div className="space-y-4 reveal">
              <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center">
                <svg className="w-6 h-6 text-[#0063f2]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
              <h3>Concreet voorstel</h3>
              <p className="text-gray-600">Ontdek praktische toepassingen en krijg een duidelijk implementatieplan.</p>
            </div>
            <div className="space-y-4 reveal">
              <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center">
                <svg className="w-6 h-6 text-[#0063f2]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3>Direct aan de slag</h3>
              <p className="text-gray-600">Akkoord? Na het gesprek gaan we meteen aan de slag voor je persoonlijke assistent en de nodige integraties.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Calendar Section with fade-in animation */}
      <section className="py-12 px-4 bg-gray-50 reveal">
        <div className="max-w-7xl mx-auto">
          <div className="relative">
            <div style={{ width: '100%', height: '1000px' }} id="my-cal-inline"></div>
          </div>
        </div>
      </section>

      <div className="h-[200px]"></div> {/* Extra space for time selection dropdown */}
      <Footer />

      <style jsx global>{`
        #my-cal-inline {
          min-height: 1000px !important;
        }
        #my-cal-inline iframe {
          width: 100% !important;
          height: 100% !important;
          border: none;
          background: transparent !important;
        }
        /* Ensure dropdowns and popovers appear above other content */
        .cal-com-popup-overlay {
          z-index: 100;
        }
        .cal-com-popup-content {
          z-index: 101;
        }
      `}</style>
    </main>
  );
} 