"use client";

import Image from "next/image";
import Link from 'next/link';
import Header from './components/Header';
import Footer from './components/Footer';
import { useState, useEffect } from 'react';
import Script from 'next/script';

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

const scrollAnimation = {
  '@keyframes scroll': {
    '0%': {
      transform: 'translateX(0)'
    },
    '100%': {
      transform: 'translateX(-50%)'
    }
  },
  '.animate-scroll': {
    animation: 'scroll 30s linear infinite'
  }
};

const spinAnimation = {
  '@keyframes spin': {
    '0%': {
      transform: 'rotate(0deg)'
    },
    '100%': {
      transform: 'rotate(360deg)'
    }
  },
  '.animate-spin-slow': {
    animation: 'spin 10s linear infinite'
  }
};

export default function Home() {
  const [activeStep, setActiveStep] = useState(1);
  const [isYearly, setIsYearly] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [phoneError, setPhoneError] = useState<string | null>(null);

  const prices = {
    basis: {
      monthly: 385,
      yearly: 345
    },
    business: {
      monthly: 850,
      yearly: 765
    }
  };

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const validatePhoneNumber = (phone: string) => {
    // Basic validation for Dutch phone numbers
    const phoneRegex = /^\+31[1-9][0-9]{8}$/;
    return phoneRegex.test(phone);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate phone number
    if (!validatePhoneNumber(formData.phone)) {
      setPhoneError('Telefoonnummer klopt niet. Gebruik format: +31612345678');
      return;
    }
    
    setIsSubmitting(true);
    setSubmitError(null);
    setPhoneError(null);
    setSubmitSuccess(false);

    try {
      const response = await fetch('/api/submit-contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Er is iets misgegaan. Probeer het later opnieuw.');
      }
      
      // Show success message
      setSubmitSuccess(true);
    } catch (error) {
      console.error('Error:', error);
      setSubmitError('Er is iets misgegaan. Probeer het later opnieuw.');
    } finally {
      setIsSubmitting(false);
    }
  };

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
    <main className="min-h-screen bg-white" role="main" aria-label="Voicelabs - AI-Gestuurde Telefonisten">
      <Header />

      {/* Add Organization Schema */}
      <Script id="organization-schema" type="application/ld+json">
        {JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'Organization',
          name: 'Voicelabs',
          url: 'https://voicelabs.nl',
          logo: 'https://voicelabs.nl/plaatjes/logovoicelabs.svg',
          description: 'Voicelabs levert AI-gestuurde telefonisten voor bedrijven, waarmee ze hun klantenservice kunnen automatiseren en optimaliseren.',
          address: {
            '@type': 'PostalAddress',
            addressLocality: 'Amsterdam',
            addressCountry: 'NL'
          },
          contactPoint: {
            '@type': 'ContactPoint',
            telephone: '',
            contactType: 'customer service',
            email: 'contact@voicelabs.nl'
          }
        })}
      </Script>

      {/* Add Product Schema */}
      <Script id="product-schema" type="application/ld+json">
        {JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'Product',
          name: 'AI-Telefonist',
          description: 'AI-gestuurde telefonist voor 24/7 professionele klantenservice',
          brand: {
            '@type': 'Brand',
            name: 'Voicelabs'
          },
          offers: {
            '@type': 'AggregateOffer',
            priceCurrency: 'EUR',
            lowPrice: prices.basis.yearly,
            highPrice: prices.business.monthly,
            priceValidUntil: new Date(new Date().setFullYear(new Date().getFullYear() + 1)).toISOString().split('T')[0],
            availability: 'https://schema.org/InStock'
          }
        })}
      </Script>

      {/* Add FAQ Schema */}
      <Script id="faq-schema" type="application/ld+json">
        {JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          mainEntity: [
            {
              '@type': 'Question',
              name: 'Wat is AI-telefonie?',
              acceptedAnswer: {
                '@type': 'Answer',
                text: 'AI-telefonie gebruikt kunstmatige intelligentie om telefoongesprekken te beheren. Het zorgt ervoor dat je bedrijf 24/7 bereikbaar is, gesprekken professioneel worden afgehandeld en je klantenservice wordt geautomatiseerd.'
              }
            },
            {
              '@type': 'Question',
              name: 'Wat is een AI-receptionist?',
              acceptedAnswer: {
                '@type': 'Answer',
                text: 'AI receptionisten zijn slimme digitale assistenten die net als mensen praten en begrijpen wat klanten willen. Ze nemen routinetaken over zoals afspraken maken en bestellingen opnemen.'
              }
            },
            {
              '@type': 'Question',
              name: 'Hoe werkt de onboarding?',
              acceptedAnswer: {
                '@type': 'Answer',
                text: 'De onboarding is simpel en snel - binnen een dag ben je live. We helpen je met het instellen van je bedrijfsgegevens, stem en doorschakeling.'
              }
            }
          ]
        })}
      </Script>

      {/* Hero Section */}
      <section className="relative pt-32 pb-16 px-4 overflow-hidden" aria-label="Hero sectie">
        <div className="absolute inset-0 bg-gradient-to-b from-white via-[#0063f2]/5 to-[#0063f2]/10 pointer-events-none" aria-hidden="true" />
        <div className="relative max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="text-sm font-medium text-gray-500 tracking-wide mb-6" role="doc-subtitle">
                VOOR VOORUITSTREVENDE BEDRIJVEN
              </div>
              <h1 className="mb-6 animate-fade-in [animation-duration:1.2s]">
                Ondersteun je klantenservice met <span className="text-[#0063f2]">AI.</span>
              </h1>
              <p className="paragraph text-gray-600 mb-10">
                Implementeer 24/7 professionele klantenservice binnen je bedrijf met onze AI-telefonisten. Bespaar tijd en kosten terwijl je je service naar een hoger niveau tilt.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link
                  href="/consult"
                  className="bg-[#0063f2] text-white px-8 py-4 rounded-xl text-lg hover:bg-blue-600 transition-colors inline-flex items-center gap-2"
                >
                  Start nu
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
                <Link
                  href="/how-it-works"
                  className="text-gray-600 hover:text-gray-900 px-6 py-4 text-[15px] font-medium transition-colors duration-300"
                  aria-label="Lees hoe Voicelabs werkt"
                >
                  Hoe werken wij?
                </Link>
              </div>
            </div>
            
            {/* Phone Container */}
            <div className="relative overflow-hidden -ml-[150px] lg:ml-0">
              <div className="relative w-[540px] h-[640px]">
                <Image
                  src="/comps/hand.png"
                  alt="Smartphone met de Voicelabs AI-telefonist interface"
                  fill
                  className="object-contain z-10 pointer-events-none"
                  priority
                />
              </div>

              {/* Contact Form */}
              <div className="absolute" style={{
                left: '250px',
                top: '40px',
                width: '240px',
                height: '500px'
              }}>
                <div className="bg-white rounded-lg p-6 h-full">
                  <h3 className="text-lg font-semibold mb-2 mt-4">Nieuwsgierig?</h3>
                  <p className="text-sm text-gray-600 mb-6">Ontvang direct een telefoontje van onze AI-telefonist!</p>
                  <form onSubmit={handleSubmit} className="space-y-4" aria-label="Contact formulier">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                        Naam
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        disabled={isSubmitting || submitSuccess}
                        aria-required="true"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-sm disabled:bg-gray-100 disabled:text-gray-500"
                        placeholder="John Doe"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                        E-mailadres
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        disabled={isSubmitting || submitSuccess}
                        aria-required="true"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-sm disabled:bg-gray-100 disabled:text-gray-500"
                        placeholder="john@example.com"
                      />
                    </div>
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                        Telefoonnummer
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        required
                        disabled={isSubmitting || submitSuccess}
                        aria-required="true"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-sm disabled:bg-gray-100 disabled:text-gray-500"
                        placeholder="+31612345678"
                      />
                      {phoneError && (
                        <p className="mt-1 text-sm text-red-600">{phoneError}</p>
                      )}
                    </div>
                    {submitError && (
                      <p className="text-red-500 text-sm">{submitError}</p>
                    )}
                    {submitSuccess ? (
                      <div className="text-emerald-600 text-sm font-medium p-3 bg-emerald-50 rounded-md">
                        Onze virtuele assistent neemt contact op.
                      </div>
                    ) : (
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full bg-[#0063f2] text-white px-4 py-2 rounded-md text-sm font-medium hover:opacity-90 transition-opacity disabled:opacity-50"
                        aria-label="Start direct gesprek met AI-telefonist"
                      >
                        {isSubmitting ? 'Even geduld...' : 'Probeer het uit'}
                      </button>
                    )}
                  </form>
                </div>
              </div>
            </div>
          </div>

          {/* Technology Partners Section */}
          <section className="relative w-full py-12 overflow-hidden reveal" aria-label="Technologie partners">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <h2 className="text-center mb-12 h3-small">
                De geavanceerde technologie achter onze AI-receptionisten
              </h2>
              
              <div className="relative mx-auto" style={{ width: "1000px" }}>
                {/* Partner logos carousel */}
                <div className="overflow-hidden relative" role="region" aria-label="Partner logos">
                  {/* Fade out edges */}
                  <div className="absolute left-0 top-0 bottom-0 w-[100px] bg-gradient-to-r from-[#f8f9fb] via-[#f8f9fb] to-transparent z-20 pointer-events-none" />
                  <div className="absolute right-0 top-0 bottom-0 w-[100px] bg-gradient-to-l from-[#f8f9fb] via-[#f8f9fb] to-transparent z-20 pointer-events-none" />
                  
                  <div className="flex animate-scroll">
                    {/* First set of logos */}
                    <div className="flex shrink-0 items-center gap-16 mr-16">
                      <Image
                        src="/partners/twilio.svg"
                        alt="Twilio - Communicatie platform partner"
                        width={120}
                        height={40}
                        className="grayscale hover:grayscale-0 transition-all object-contain"
                      />
                      <Image
                        src="/partners/vapi.svg"
                        alt="VAPI - AI-telefonie partner"
                        width={120}
                        height={40}
                        className="grayscale hover:grayscale-0 transition-all object-contain"
                      />
                      <Image
                        src="/partners/openai.svg"
                        alt="OpenAI - AI-model partner"
                        width={120}
                        height={40}
                        className="grayscale hover:grayscale-0 transition-all object-contain"
                      />
                      <Image
                        src="/partners/claude.svg"
                        alt="Claude - AI-telefonie partner"
                        width={120}
                        height={40}
                        className="grayscale hover:grayscale-0 transition-all object-contain"
                      />
                      <Image
                        src="/partners/cartesia.svg"
                        alt="Cartesia - AI-telefonie partner"
                        width={120}
                        height={40}
                        className="grayscale hover:grayscale-0 transition-all object-contain"
                      />
                      <Image
                        src="/partners/elevenlabs.png"
                        alt="ElevenLabs - AI-telefonie partner"
                        width={120}
                        height={40}
                        className="grayscale hover:grayscale-0 transition-all object-contain -mt-2"
                      />
                    </div>
                    {/* Duplicate set for infinite scroll */}
                    <div className="flex shrink-0 items-center gap-16 mr-16">
                      <Image
                        src="/partners/twilio.svg"
                        alt="Twilio - Communicatie platform partner"
                        width={120}
                        height={40}
                        className="grayscale hover:grayscale-0 transition-all object-contain"
                      />
                      <Image
                        src="/partners/vapi.svg"
                        alt="VAPI - AI-telefonie partner"
                        width={120}
                        height={40}
                        className="grayscale hover:grayscale-0 transition-all object-contain"
                      />
                      <Image
                        src="/partners/openai.svg"
                        alt="OpenAI - AI-model partner"
                        width={120}
                        height={40}
                        className="grayscale hover:grayscale-0 transition-all object-contain"
                      />
                      <Image
                        src="/partners/claude.svg"
                        alt="Claude - AI-telefonie partner"
                        width={120}
                        height={40}
                        className="grayscale hover:grayscale-0 transition-all object-contain"
                      />
                      <Image
                        src="/partners/cartesia.svg"
                        alt="Cartesia - AI-telefonie partner"
                        width={120}
                        height={40}
                        className="grayscale hover:grayscale-0 transition-all object-contain"
                      />
                      <Image
                        src="/partners/elevenlabs.png"
                        alt="ElevenLabs - AI-telefonie partner"
                        width={120}
                        height={40}
                        className="grayscale hover:grayscale-0 transition-all object-contain -mt-2"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* AI Receptionist Benefits Section */}
          <section id= "solutions" className="py-24">
            <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              {/* Left Column - Image */}
              <div className="relative reveal">
                <Image
                  src="/plaatjes/aireceptionist.webp"
                  alt="AI Receptioniste in actie"
                  width={600}
                  height={500}
                  className="rounded-2xl"
                />
                {/* Summary Card */}
                <div className="absolute bottom-8 right-0 bg-white rounded-xl shadow-lg p-6 max-w-sm transform translate-x-12 animate-slide-in-right">
                  <h4 className="text-lg font-medium text-gray-800 mb-4">Dagelijkse samenvatting</h4>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <div className="w-5 h-5 bg-blue-50 rounded flex items-center justify-center">
                        <svg className="w-3 h-3 text-[#0063f2]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <span className="text-sm text-gray-600">45 minuten bel-tijd bespaard</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-5 h-5 bg-blue-50 rounded flex items-center justify-center">
                        <svg className="w-3 h-3 text-[#0063f2]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                        </svg>
                      </div>
                      <span className="text-sm text-gray-600">7 boekingen gemaakt</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column - Content */}
              <div className="reveal">
                <h2 className="mb-8">
                  Met onze <span className="text-[#0063f2]">AI-receptionisten</span> kun je je concentreren op wat echt belangrijk is.
                </h2>

                <div className="space-y-12">
                  {/* Feature 1 */}
                  <div className="flex gap-6">
                    <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center shrink-0">
                      <svg className="w-6 h-6 text-[#0063f2]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="mb-2">24/7 Bereikbaar, zonder extra personeel</h3>
                      <p className="paragraph text-gray-600">Maak van elk moment een kans. Onze AI-receptioniste staat dag en nacht klaar, beantwoordt direct elke vraag en tilt klanttevredenheid naar een hoger niveau.</p>
                    </div>
                  </div>

                  {/* Feature 2 */}
                  <div className="flex gap-6">
                    <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center shrink-0">
                      <svg className="w-6 h-6 text-[#0063f2]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="mb-2">Minimaliseer dagelijkse ruis en frustratie</h3>
                      <p className="paragraph text-gray-600">Wij vangen alle gesprekken op, elimineren onnodige onderbrekingen en stroomlijnen communicatie zodat jouw bedrijf ongehinderd kan groeien.</p>
                    </div>
                  </div>

                  {/* Feature 3 */}
                  <div className="flex gap-6">
                    <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center shrink-0">
                      <svg className="w-6 h-6 text-[#0063f2]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="mb-2">Geen gemist gesprek = meer omzet</h3>
                      <p className="paragraph text-gray-600">Elke gemiste oproep is een gemiste kans. Vang elk potentieel contact, converteer elke lead en zie je boekingen direct groeien. Geen kans blijft onbenut.</p>
                    </div>
                  </div>

                  {/* Feature 4 */}
                  <div className="flex gap-6">
                    <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center shrink-0">
                      <svg className="w-6 h-6 text-[#0063f2]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="mb-2">Naadloze integratie in de workflow van jouw bedrijf</h3>
                      <p className="paragraph text-gray-600">Voicelabs verbindt moeiteloos met je belangrijkste tools. Gebruik je een minder bekend systeem? Geen zorgen - wij ontwikkelen een naadloze integratie op maat voor jouw specifieke bedrijfssoftware.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Features Grid Section */}
        </div>
      </section>

      {/* Black Features Section */}
      <div className="w-full bg-[#004dbd] relative overflow-hidden">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover opacity-10"
        >
          <source src="/comps/bg.mp4" type="video/mp4" />
        </video>
        <section className="text-white py-16 sm:py-24 relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-x-16">
              <div className="lg:col-span-4 reveal">
                <h2 className="text-center lg:text-left mb-8 lg:mb-0">
                  Ervaar de<br />toekomst van<br />klantenservice.
                </h2>
              </div>
              <div className="lg:col-span-8">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-x-16 sm:gap-y-12">
                  <div className="space-y-6 sm:space-y-8 reveal">
                    <div className="flex items-start gap-4">
                      <div className="mt-1 flex-shrink-0">
                        <div className="w-5 h-5 rounded-full bg-emerald-500 flex items-center justify-center">
                          <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                      </div>
                      <span className="paragraph text-white">Maakt en beheert afspraken en reserveringen</span>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="mt-1 flex-shrink-0">
                        <div className="w-5 h-5 rounded-full bg-emerald-500 flex items-center justify-center">
                          <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                      </div>
                      <span className="paragraph text-white">Beantwoordt alle veelgestelde vragen over jouw bedrijf</span>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="mt-1 flex-shrink-0">
                        <div className="w-5 h-5 rounded-full bg-emerald-500 flex items-center justify-center">
                          <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                      </div>
                      <span className="paragraph text-white">Automatische bevestigingen via WhatsApp</span>
                    </div>
                  </div>

                  <div className="space-y-6 sm:space-y-8 reveal [animation-delay:200ms]">
                    <div className="flex items-start gap-4">
                      <div className="mt-1 flex-shrink-0">
                        <div className="w-5 h-5 rounded-full bg-emerald-500 flex items-center justify-center">
                          <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                      </div>
                      <span className="paragraph text-white">Gemakkelijk doorschakelen naar een menselijke medewerker</span>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="mt-1 flex-shrink-0">
                        <div className="w-5 h-5 rounded-full bg-emerald-500 flex items-center justify-center">
                          <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                      </div>
                      <span className="paragraph text-white">Realtime inzicht in gesprekken via onze app</span>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="mt-1 flex-shrink-0">
                        <div className="w-5 h-5 rounded-full bg-emerald-500 flex items-center justify-center">
                          <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                      </div>
                      <span className="paragraph text-white">Slimme meldingen voor opvolging en acties</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Process Section */}
      <section className="py-24 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-center mb-4 reveal">Hoe het werkt</h2>
          <p className="paragraph text-gray-600 text-center mb-16 reveal">
            Samenwerken met Voicelabs is eenvoudig. Met onze heldere aanpak wordt je binnen kort tijd ondersteund bij al je telefonie-taken.
          </p>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Step Content */}
            <div className="space-y-8 reveal">
              <div className="flex gap-4">
                <button
                  className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                    activeStep === 1
                      ? "bg-[#0063f2] text-white"
                      : "text-gray-500 hover:text-gray-900"
                  }`}
                  onClick={() => setActiveStep(1)}
                >
                  1. Analyse
                </button>
                <button
                  className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                    activeStep === 2
                      ? "bg-[#0063f2] text-white"
                      : "text-gray-500 hover:text-gray-900"
                  }`}
                  onClick={() => setActiveStep(2)}
                >
                  2. Implementatie
                </button>
                <button
                  className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                    activeStep === 3
                      ? "bg-[#0063f2] text-white"
                      : "text-gray-500 hover:text-gray-900"
                  }`}
                  onClick={() => setActiveStep(3)}
                >
                  3. Optimalisatie
                </button>
              </div>

              {/* Progress Bar */}
              <div className="h-px bg-gray-200 relative">
                <div
                  className="absolute h-px bg-[#0063f2] transition-all duration-500"
                  style={{
                    width: `${(activeStep / 3) * 100}%`,
                  }}
                />
              </div>

              {/* Step Content */}
              <div className="min-h-[400px] relative">
                {activeStep === 1 && (
                  <div className="animate-fadeSlideIn absolute inset-0 transition-all duration-500 ease-in-out">
                    <h3 className="mb-4">Diepgaande analyse</h3>
                    <p className="paragraph text-gray-600">
                      We starten met een grondige analyse van uw bedrijf, processen en klantbehoeften. Ons team werkt nauw met u samen om de specifieke eisen en doelen van je bedrijf te begrijpen.
                    </p>
                    <ul className="mt-4 space-y-4">
                      <li className="paragraph text-gray-600 flex items-start gap-3">
                        <div className="w-6 h-6 mt-1 flex-shrink-0 rounded-full bg-[#0063f2]/10 flex items-center justify-center">
                          <svg className="w-4 h-4 text-[#0063f2]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                          </svg>
                        </div>
                        <span className="flex-1">De huidige CRM systemen die je bedrijf gebruikt</span>
                      </li>
                      <li className="paragraph text-gray-600 flex items-start gap-3">
                        <div className="w-6 h-6 mt-1 flex-shrink-0 rounded-full bg-[#0063f2]/10 flex items-center justify-center">
                          <svg className="w-4 h-4 text-[#0063f2]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
                          </svg>
                        </div>
                        <span className="flex-1">De gesprekken die je wilt automatiseren</span>
                      </li>
                      <li className="paragraph text-gray-600 flex items-start gap-3">
                        <div className="w-6 h-6 mt-1 flex-shrink-0 rounded-full bg-[#0063f2]/10 flex items-center justify-center">
                          <svg className="w-4 h-4 text-[#0063f2]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                        </div>
                        <span className="flex-1">Specifieke wensen zoals meertaligheid of integraties met bestaande systemen</span>
                      </li>
                    </ul>
                  </div>
                )}
                {activeStep === 2 && (
                  <div className="animate-fadeSlideIn absolute inset-0 transition-all duration-500 ease-in-out">
                    <h3 className="mb-4">Implementatie en Integratie</h3>
                    <p className="paragraph text-gray-600">
                      Zodra het maatwerkontwerp is goedgekeurd, gaan we aan de slag met de implementatie. Onze experts zorgen voor een probleemloze integratie met je huidige systemen, zoals CRM's, agenda's of andere tools.
                    </p>
                    <ul className="mt-4 space-y-4">
                      <li className="paragraph text-gray-600 flex items-start gap-3">
                        <div className="w-6 h-6 mt-1 flex-shrink-0 rounded-full bg-[#0063f2]/10 flex items-center justify-center">
                          <svg className="w-4 h-4 text-[#0063f2]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                          </svg>
                        </div>
                        <span className="flex-1">Je workflows te ondersteunen</span>
                      </li>
                      <li className="paragraph text-gray-600 flex items-start gap-3">
                        <div className="w-6 h-6 mt-1 flex-shrink-0 rounded-full bg-[#0063f2]/10 flex items-center justify-center">
                          <svg className="w-4 h-4 text-[#0063f2]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                          </svg>
                        </div>
                        <span className="flex-1">Direct operationeel te zijn</span>
                      </li>
                      <li className="paragraph text-gray-600 flex items-start gap-3">
                        <div className="w-6 h-6 mt-1 flex-shrink-0 rounded-full bg-[#0063f2]/10 flex items-center justify-center">
                          <svg className="w-4 h-4 text-[#0063f2]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                          </svg>
                        </div>
                        <span className="flex-1">Afspraken, leads of klantverzoeken te beheren volgens je specifieke wensen</span>
                      </li>
                    </ul>
                  </div>
                )}
                {activeStep === 3 && (
                  <div className="animate-fadeSlideIn absolute inset-0 transition-all duration-500 ease-in-out">
                    <h3 className="mb-4">Optimalisatie en ondersteuning</h3>
                    <p className="paragraph text-gray-600">
                      Na de lancering monitoren we de prestaties van je AI-telefonist zorgvuldig. Aan de hand van feedback van klanten en gebruikersdata blijven we optimaliseren om de efficiëntie en klanttevredenheid te verbeteren. Daarnaast bieden we doorlopende ondersteuning.
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Step Image */}
            <div className="relative aspect-[4/3] w-full reveal">
              <Image
                src={activeStep === 1 ? "/plaatjes/analyse.webp" : 
                     activeStep === 2 ? "/plaatjes/implementatie.jpg" : 
                     "/plaatjes/optimalisatie.webp"}
                alt={`Process step ${activeStep}`}
                fill
                className="rounded-2xl shadow-xl object-cover transition-all duration-500"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-24 relative overflow-hidden bg-white">
        <div className="max-w-7xl mx-auto px-4 relative">
          <h2 className="text-center mb-4 text-black reveal">Kies het pakket dat bij je bedrijf past</h2>
          <p className="paragraph text-black text-center mb-16 reveal">Selecteer uit onze best passende plannen. Andere wensen?<br />We maken graag een plan op maat!</p>

          {/* Pricing Toggle */}
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mb-16" role="group" aria-label="Betalingsperiode selectie">
            <div className="flex items-center gap-4">
              <span className={`text-sm sm:text-base whitespace-nowrap ${!isYearly ? 'text-black' : 'text-gray-500'}`}>
                Maandelijks betalen
              </span>
              <button 
                onClick={() => setIsYearly(!isYearly)}
                className={`w-12 h-6 rounded-full relative cursor-pointer transition-colors ${
                  isYearly ? 'bg-emerald-500' : 'bg-black/20'
                }`}
                role="switch"
                aria-checked={isYearly}
                aria-label="Schakel tussen maandelijks en jaarlijks betalen"
              >
                <div className={`w-4 h-4 bg-white rounded-full absolute top-1 transition-all duration-200 ${
                  isYearly ? 'left-7' : 'left-1'
                }`}></div>
              </button>
              <span className={`text-sm sm:text-base whitespace-nowrap ${isYearly ? 'text-black' : 'text-gray-500'}`}>
                Betaal per jaar
              </span>
            </div>
            <span className="text-sm text-emerald-600 font-medium whitespace-nowrap">
              (Bespaar 10%)
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8" role="list">
            {/* Basis Plan */}
            <div className="bg-white p-8 rounded-[20px] shadow-[0_2px_40px_rgba(0,0,0,0.06)] reveal" role="listitem">
              <div itemScope itemType="https://schema.org/Product">
                <meta itemProp="name" content="Basis Plan" />
                <meta itemProp="description" content="Start eenvoudig met AI-telefonie en verbeter direct je bereikbaarheid." />
                <div itemProp="offers" itemScope itemType="https://schema.org/Offer">
                  <meta itemProp="priceCurrency" content="EUR" />
                  <meta itemProp="price" content={String(isYearly ? prices.basis.yearly : prices.basis.monthly)} />
                  <meta itemProp="availability" content="https://schema.org/InStock" />
                </div>
                <div className="w-12 h-12 mb-6">
                  <svg viewBox="0 0 32 32" className="w-full h-full text-[#0063f2]" fill="currentColor" aria-hidden="true">
                    <path d="m16,23c-3.86,0-7-3.14-7-7H0c0,8.82,7.18,16,16,16s16-7.18,16-16h-9c0,3.86-3.14,7-7,7Z" />
                    <path d="m16,23c-3.86,0-7-3.14-7-7H0c0,8.82,7.18,16,16,16s16-7.18,16-16h-9c0,3.86-3.14,7-7,7Z" />
                    <path d="m16,16C24.82,16,32,8.82,32,0h-9c0,3.86-3.14,7-7,7S9,3.86,9,0H0C0,8.82,7.18,16,16,16Z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-semibold mb-4">Basis</h3>
                <div className="flex items-baseline gap-1 mb-6" aria-label="Prijs informatie">
                  <span className="text-4xl font-semibold">€{isYearly ? prices.basis.yearly : prices.basis.monthly}</span>
                  <span className="text-gray-600">/maand</span>
                </div>
                <p className="text-gray-600 mb-6">Start eenvoudig met AI-telefonie en verbeter direct je bereikbaarheid.</p>
                <Link 
                  href="/consult" 
                  className="block text-center bg-[#0063f2] text-white py-3 px-6 rounded-lg hover:opacity-90 transition-colors mb-8 inline-flex items-center justify-center gap-2 w-full"
                >
                  Direct aanvragen
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
                <ul className="space-y-3" aria-label="Basis pakket features">
                  <li className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-emerald-500 flex-shrink-0 flex items-center justify-center mt-0.5" aria-hidden="true">
                      <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className="text-gray-600 flex-1 text-[15px] leading-snug">Kan 5 gesprekken tegelijk behandelen</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-emerald-500 flex-shrink-0 flex items-center justify-center mt-0.5" aria-hidden="true">
                      <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className="text-gray-600 flex-1 text-[15px] leading-snug">Inbound gesprekken – De AI kan inbound gesprekken overnemen en doorzetten</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-emerald-500 flex-shrink-0 flex items-center justify-center mt-0.5" aria-hidden="true">
                      <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className="text-gray-600 flex-1 text-[15px] leading-snug">1000 belminuten, onbeperkte oproepen</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-emerald-500 flex-shrink-0 flex items-center justify-center mt-0.5" aria-hidden="true">
                      <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className="text-gray-600 flex-1 text-[15px] leading-snug">Directe koppeling met populaire tools (bijv. HubSpot, Salesforce, Cal etc)</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-emerald-500 flex-shrink-0 flex items-center justify-center mt-0.5" aria-hidden="true">
                      <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className="text-gray-600 flex-1 text-[15px] leading-snug">Transcripties per e-mail – alles overzichtelijk in uw inbox.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-emerald-500 flex-shrink-0 flex items-center justify-center mt-0.5" aria-hidden="true">
                      <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className="text-gray-600 flex-1 text-[15px] leading-snug">Geen technische kennis nodig – wij regelen en optimaliseren alles</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Business Plan */}
            <div className="relative bg-[#004dbd] p-8 rounded-[20px] shadow-[0_2px_40px_rgba(0,0,0,0.06)] overflow-hidden reveal [animation-delay:200ms]" role="listitem">
              {/* Video Background */}
              <video
                autoPlay
                loop
                muted
                playsInline
                className="absolute inset-0 w-full h-full object-cover opacity-20"
                style={{ zIndex: 0 }}
              >
                <source src="/comps/bg.mp4" type="video/mp4" />
              </video>
              <div className="relative z-10">
                <div itemScope itemType="https://schema.org/Product">
                  <meta itemProp="name" content="Business Plan" />
                  <meta itemProp="description" content="Automatiseer en schaal je klantenservice én sales met een krachtige AI-oplossing." />
                  <div itemProp="offers" itemScope itemType="https://schema.org/Offer">
                    <meta itemProp="priceCurrency" content="EUR" />
                    <meta itemProp="price" content={String(isYearly ? prices.business.yearly : prices.business.monthly)} />
                    <meta itemProp="availability" content="https://schema.org/InStock" />
                  </div>
                  <div className="w-12 h-12 mb-6">
                    <svg viewBox="0 0 32 32" className="w-full h-full text-white animate-spin-slow" fill="currentColor">
                      <path d="m11.05,11.05c.65-.64,1.39-1.15,2.23-1.5L9.77,1.26c-1.91.81-3.62,1.96-5.08,3.43-1.47,1.47-2.62,3.18-3.43,5.08l8.29,3.51c.35-.83.86-1.58,1.5-2.23Z" />
                      <path d="m11.05,20.95c-.64-.65-1.15-1.39-1.5-2.22-.36-.86-.55-1.78-.55-2.73H0c0,2.16.42,4.25,1.26,6.23.81,1.91,1.96,3.62,3.43,5.08,1.47,1.47,3.18,2.62,5.08,3.43,1.97.83,4.07,1.26,6.23,1.26v-9c-.95,0-1.86-.18-2.72-.55-.83-.35-1.58-.86-2.23-1.5Z" />
                      <path d="m30.74,9.77c-.81-1.91-1.96-3.62-3.43-5.08-1.47-1.47-3.18-2.62-5.08-3.43C20.25.42,18.16,0,16,0v9c.95,0,1.86.18,2.72.55.83.83.35,1.58.86,2.23,1.5.64.65,1.15,1.39,1.5,2.22.36.86.55,1.78.55,2.72s-.18,1.86-.55,2.72c-.35.83-.86,1.58-1.5,2.23-.65.64-1.39,1.15-2.23,1.5l3.51,8.29c1.91-.81,3.62-1.96,5.08-3.43,1.47-1.47,2.62-3.18,3.43-5.09.83-1.98,1.26-4.07,1.26-6.23s-.42-4.25-1.26-6.23Z" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-semibold mb-4 text-white">Business</h3>
                  <div className="flex items-baseline gap-1 mb-6">
                    <span className="text-4xl font-semibold text-white">€{isYearly ? prices.business.yearly : prices.business.monthly}</span>
                    <span className="text-white/90">/maand</span>
                  </div>
                  <p className="text-white/90 mb-6">Automatiseer en schaal je klantenservice én sales met een krachtige AI-oplossing.</p>
                  <Link
                    href="/consult"
                    className="bg-white text-[#0063f2] px-6 py-3 rounded-xl hover:bg-gray-100 transition-colors inline-flex items-center justify-center gap-2 w-full mb-8"
                  >
                    Start nu
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3">
                      <div className="w-5 h-5 rounded-full bg-emerald-500 flex-shrink-0 flex items-center justify-center mt-0.5">
                        <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <span className="text-white/90 flex-1 text-[15px] leading-snug">Kan 10 gesprekken tegelijk behandelen</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-5 h-5 rounded-full bg-emerald-500 flex-shrink-0 flex items-center justify-center mt-0.5">
                        <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <span className="text-white/90 flex-1 text-[15px] leading-snug">Inbound en outbound gesprekken</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-5 h-5 rounded-full bg-emerald-500 flex-shrink-0 flex items-center justify-center mt-0.5">
                        <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <span className="text-white/90 flex-1 text-[15px] leading-snug">2000 belminuten, onbeperkte oproepen</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-5 h-5 rounded-full bg-emerald-500 flex-shrink-0 flex items-center justify-center mt-0.5">
                        <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <span className="text-white/90 flex-1 text-[15px] leading-snug">Geavanceerde CRM-integratie – volledige automatisatie van klantgegevens</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-5 h-5 rounded-full bg-emerald-500 flex-shrink-0 flex items-center justify-center mt-0.5">
                        <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <span className="text-white/90 flex-1 text-[15px] leading-snug">Meerdere telefoonnummers koppelen – ideaal voor grote teams of vestigingen.</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-5 h-5 rounded-full bg-emerald-500 flex-shrink-0 flex items-center justify-center mt-0.5">
                        <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <span className="text-white/90 flex-1 text-[15px] leading-snug">Follow-up workflows: e-mail, Whatsapp, SMS</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-5 h-5 rounded-full bg-emerald-500 flex-shrink-0 flex items-center justify-center mt-0.5">
                        <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <span className="text-white/90 flex-1 text-[15px] leading-snug">Altijd inzicht met een realtime dashboard en uitgebreide rapporten</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-5 h-5 rounded-full bg-emerald-500 flex-shrink-0 flex items-center justify-center mt-0.5">
                        <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <span className="text-white/90 flex-1 text-[15px] leading-snug">Geen technische kennis nodig – wij regelen en optimaliseren alles</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Enterprise Plan */}
            <div className="bg-white p-8 rounded-[20px] shadow-[0_2px_40px_rgba(0,0,0,0.06)] reveal [animation-delay:400ms]" role="listitem">
              <div itemScope itemType="https://schema.org/Product">
                <meta itemProp="name" content="Enterprise Plan" />
                <meta itemProp="description" content="Volledig op maat gemaakte automatiseringen voor je bedrijfsprocessen." />
                <div itemProp="offers" itemScope itemType="https://schema.org/Offer">
                  <meta itemProp="priceCurrency" content="EUR" />
                  <meta itemProp="availability" content="https://schema.org/InStock" />
                </div>
                <div className="w-12 h-12 mb-6">
                  <svg viewBox="0 0 32 32" className="w-full h-full text-[#0063f2]" fill="currentColor">
                    <path d="m24.5,15c4.14,0,7.5-3.36,7.5-7.5S28.64,0,24.5,0s-7.5,3.36-7.5,7.5,3.36,7.5,7.5,7.5Zm0-10c1.38,0,2.5,1.12,2.5,2.5s-1.12,2.5-2.5,2.5-2.5-1.12-2.5-2.5,1.12-2.5,2.5-2.5Z" />
                    <path d="m7.5,17c-4.14,0-7.5,3.36-7.5,7.5s3.36,7.5,7.5,7.5,7.5-3.36,7.5-7.5-3.36-7.5-7.5-7.5Zm0,10c-1.38,0-2.5-1.12-2.5-2.5s1.12-2.5,2.5-2.5,2.5,1.12,2.5,2.5-1.12,2.5-2.5,2.5Z" />
                    <circle cx="7.5" cy="7.5" r="7.5" />
                    <circle cx="24.5" cy="24.5" r="7.5" />
                  </svg>
                </div>
                <h3 className="text-2xl font-semibold mb-4">Enterprise</h3>
                <div className="flex items-baseline gap-1 mb-6">
                  <span className="text-4xl font-semibold">Op aanvraag</span>
                </div>
                <p className="text-gray-600 mb-6">Volledig op maat gemaakte automatiseringen voor je bedrijfsprocessen.</p>
                <Link
                  href="/consult"
                  className="block text-center bg-[#0063f2] text-white py-3 px-6 rounded-lg hover:opacity-90 transition-colors mb-8 inline-flex items-center justify-center gap-2 w-full"
                >
                  Wordt partner
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-emerald-500 flex-shrink-0 flex items-center justify-center mt-0.5">
                      <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className="text-gray-600 flex-1 text-[15px] leading-snug">Alles van het Business-pakket</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-emerald-500 flex-shrink-0 flex items-center justify-center mt-0.5">
                      <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className="text-gray-600 flex-1 text-[15px] leading-snug">Meerdere telefoonnummers koppelen – ideaal voor grote teams of vestigingen.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-emerald-500 flex-shrink-0 flex items-center justify-center mt-0.5">
                      <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className="text-gray-600 flex-1 text-[15px] leading-snug">Geavanceerde workflows – volledig afgestemd op uw specifieke bedrijfsprocessen.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-emerald-500 flex-shrink-0 flex items-center justify-center mt-0.5">
                      <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className="text-gray-600 flex-1 text-[15px] leading-snug">Strategische consultancy – onze AI-experts helpen u processen te optimaliseren en te automatiseren.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-emerald-500 flex-shrink-0 flex items-center justify-center mt-0.5">
                      <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className="text-gray-600 flex-1 text-[15px] leading-snug">En nog veel meer..</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 px-4 bg-gradient-to-b from-white to-[#dfe3e9]/15">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-center mb-4 reveal">Veelgestelde vragen</h2>
          <p className="paragraph text-gray-600 text-center mb-12 reveal">
            Dit zijn de meest gestelde vragen over onze AI-telefonisten.
            <br />
            Andere vragen? <Link href="/contact" className="text-[#0063f2] hover:opacity-80">Neem contact op met ons team!</Link>
          </p>

          {/* FAQ Items */}
          <div className="space-y-4">
            {/* Basic Concepts */}
            <div className="border border-gray-200 rounded-lg overflow-hidden reveal">
              <button 
                onClick={() => toggleFaq(0)}
                className="w-full flex items-start justify-between p-6 text-left hover:bg-gray-50 transition-colors"
              >
                <div className="flex gap-4">
                  <span className="flex-shrink-0 w-6 h-6 bg-[#0063f2]/10 rounded-full flex items-center justify-center">
                    <svg className={`w-4 h-4 text-[#0063f2] transition-transform duration-200 ${openFaq === 0 ? 'rotate-45' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                  </span>
                  <span className="h3-small text-gray-900">Wat is AI-telefonie?</span>
                </div>
              </button>
              <div className={`transition-all duration-200 ease-in-out ${openFaq === 0 ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'} overflow-hidden`}>
                <div className="px-6 pb-6 pt-2">
                  <p className="paragraph text-gray-600 ml-10">
                    AI-telefonie gebruikt kunstmatige intelligentie om telefoongesprekken te beheren. Het zorgt ervoor dat je bedrijf 24/7 bereikbaar is, gesprekken professioneel worden afgehandeld en je klantenservice wordt geautomatiseerd. De AI begrijpt natuurlijke taal, kan normale gesprekken voeren en regelt praktische zaken zoals afspraken inplannen of informatie geven.
                  </p>
                </div>
              </div>
            </div>

            <div className="border border-gray-200 rounded-lg overflow-hidden reveal">
              <button 
                onClick={() => toggleFaq(1)}
                className="w-full flex items-start justify-between p-6 text-left hover:bg-gray-50 transition-colors"
              >
                <div className="flex gap-4">
                  <span className="flex-shrink-0 w-6 h-6 bg-[#0063f2]/10 rounded-full flex items-center justify-center">
                    <svg className={`w-4 h-4 text-[#0063f2] transition-transform duration-200 ${openFaq === 1 ? 'rotate-45' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                  </span>
                  <span className="h3-small text-gray-900">Wat is een AI-receptionist?</span>
                </div>
              </button>
              <div className={`transition-all duration-200 ease-in-out ${openFaq === 1 ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'} overflow-hidden`}>
                <div className="px-6 pb-6 pt-2">
                  <p className="paragraph text-gray-600 ml-10">
                    AI receptionisten zijn slimme digitale assistenten die net als mensen praten en begrijpen wat klanten willen. Ze nemen routinetaken over zoals afspraken maken en bestellingen opnemen. Zo bespaar je tijd en geld, en heb je minder stress over gemiste telefoontjes.
                  </p>
                </div>
              </div>
            </div>

            <div className="border border-gray-200 rounded-lg overflow-hidden reveal">
              <button 
                onClick={() => toggleFaq(2)}
                className="w-full flex items-start justify-between p-6 text-left hover:bg-gray-50 transition-colors"
              >
                <div className="flex gap-4">
                  <span className="flex-shrink-0 w-6 h-6 bg-[#0063f2]/10 rounded-full flex items-center justify-center">
                    <svg className={`w-4 h-4 text-[#0063f2] transition-transform duration-200 ${openFaq === 2 ? 'rotate-45' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                  </span>
                  <span className="h3-small text-gray-900">Wat is Conversational AI?</span>
                </div>
              </button>
              <div className={`transition-all duration-200 ease-in-out ${openFaq === 2 ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'} overflow-hidden`}>
                <div className="px-6 pb-6 pt-2">
                  <p className="paragraph text-gray-600 ml-10">
                    Conversational AI maakt het mogelijk dat computers normaal met mensen kunnen praten. Het is geen simpele 'ja/nee' computer meer, maar een systeem dat echt begrijpt wat je zegt en bedoelt. Dit zorgt voor natuurlijke gesprekken, of je nu chat of belt.
                  </p>
                </div>
              </div>
            </div>

            {/* Implementation & Usage */}
            <div className="border border-gray-200 rounded-lg overflow-hidden reveal">
              <button 
                onClick={() => toggleFaq(3)}
                className="w-full flex items-start justify-between p-6 text-left hover:bg-gray-50 transition-colors"
              >
                <div className="flex gap-4">
                  <span className="flex-shrink-0 w-6 h-6 bg-[#0063f2]/10 rounded-full flex items-center justify-center">
                    <svg className={`w-4 h-4 text-[#0063f2] transition-transform duration-200 ${openFaq === 3 ? 'rotate-45' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                  </span>
                  <span className="h3-small text-gray-900">Hoe werkt de onboarding?</span>
                </div>
              </button>
              <div className={`transition-all duration-200 ease-in-out ${openFaq === 3 ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'} overflow-hidden`}>
                <div className="px-6 pb-6 pt-2">
                  <p className="paragraph text-gray-600 ml-10">
                    De onboarding is simpel en snel - binnen een dag ben je live. We helpen je met het instellen van je bedrijfsgegevens, stem en doorschakeling. Alles wordt stap voor stap uitgelegd, zodat je AI-assistent perfect aansluit bij je bedrijf.
                  </p>
                </div>
              </div>
            </div>

            <div className="border border-gray-200 rounded-lg overflow-hidden reveal">
              <button 
                onClick={() => toggleFaq(4)}
                className="w-full flex items-start justify-between p-6 text-left hover:bg-gray-50 transition-colors"
              >
                <div className="flex gap-4">
                  <span className="flex-shrink-0 w-6 h-6 bg-[#0063f2]/10 rounded-full flex items-center justify-center">
                    <svg className={`w-4 h-4 text-[#0063f2] transition-transform duration-200 ${openFaq === 4 ? 'rotate-45' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                  </span>
                  <span className="h3-small text-gray-900">Werkt Voicelabs met mijn telefoonsysteem?</span>
                </div>
              </button>
              <div className={`transition-all duration-200 ease-in-out ${openFaq === 4 ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'} overflow-hidden`}>
                <div className="px-6 pb-6 pt-2">
                  <p className="paragraph text-gray-600 ml-10">
                    Voicelabs werkt met alle zakelijke telefoons, zowel mobiel als vast. Het instellen kan gemakkelijk in een paar stappen zodat de virtuele assistent overflowgesprekken kan beantwoorden of klanten kan doorverbinden. We lopen samen het hele proces door, zodat je precies weet hoe het werkt.
                  </p>
                </div>
              </div>
            </div>

            {/* Benefits & Features */}
            <div className="border border-gray-200 rounded-lg overflow-hidden reveal">
              <button 
                onClick={() => toggleFaq(5)}
                className="w-full flex items-start justify-between p-6 text-left hover:bg-gray-50 transition-colors"
              >
                <div className="flex gap-4">
                  <span className="flex-shrink-0 w-6 h-6 bg-[#0063f2]/10 rounded-full flex items-center justify-center">
                    <svg className={`w-4 h-4 text-[#0063f2] transition-transform duration-200 ${openFaq === 5 ? 'rotate-45' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                  </span>
                  <span className="h3-small text-gray-900">Hoe helpt Voicelabs bij bedrijfsgroei en efficiëntie?</span>
                </div>
              </button>
              <div className={`transition-all duration-200 ease-in-out ${openFaq === 5 ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'} overflow-hidden`}>
                <div className="px-6 pb-6 pt-2">
                  <p className="paragraph text-gray-600 ml-10">
                    Onze virtuele assistenten regelen je gesprekken en afspraken 24/7, zodat jij je kunt focussen op je werk. Ze chatten met klanten, plannen afspraken, helpen met vragen en verzamelen contactgegevens. Gemiddeld bespaar je 20 uur aan belletjes per maand. Zo hou je tijd over voor belangrijkere zaken.
                  </p>
                </div>
              </div>
            </div>

            {/* Privacy & Ethics */}
            <div className="border border-gray-200 rounded-lg overflow-hidden reveal">
              <button 
                onClick={() => toggleFaq(6)}
                className="w-full flex items-start justify-between p-6 text-left hover:bg-gray-50 transition-colors"
              >
                <div className="flex gap-4">
                  <span className="flex-shrink-0 w-6 h-6 bg-[#0063f2]/10 rounded-full flex items-center justify-center">
                    <svg className={`w-4 h-4 text-[#0063f2] transition-transform duration-200 ${openFaq === 6 ? 'rotate-45' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                  </span>
                  <span className="h3-small text-gray-900">Hoe voldoet Voicelabs aan de AVG en waarborgt het de privacy van gegevens?</span>
                </div>
              </button>
              <div className={`transition-all duration-200 ease-in-out ${openFaq === 6 ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'} overflow-hidden`}>
                <div className="px-6 pb-6 pt-2">
                  <p className="paragraph text-gray-600 ml-10">
                    We nemen privacy serieus en volgen alle AVG-regels. Je data is veilig bij ons door sterke versleuteling en beveiligde opslag.
                    <br /><br />
                    Willen je klanten liever met een mens praten? We kunnen gesprekken direct doorverbinden of een terugbelverzoek regelen.
                    <br /><br />
                    We zijn open over het gebruik van AI - onze assistenten zeggen altijd eerlijk dat ze AI zijn. Check onze <Link href="/privacy-beleid" className="text-[#0063f2] hover:opacity-80">Privacyverklaring</Link> en Ethisch Kader voor meer details.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
