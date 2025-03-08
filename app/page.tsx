"use client";

import React from 'react';
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
      monthly: 427,
      yearly: 377
    },
    business: {
      monthly: 1075,
      yearly: 967
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
          url: 'https://voicelabs.agency',
          logo: 'https://voicelabs.agency/images/logovoicelabs.svg',
          description: 'Voicelabs provides AI-powered receptionists for businesses, enabling them to automate and optimize their customer service.',
          address: {
            '@type': 'PostalAddress',
            addressLocality: 'Amsterdam',
            addressCountry: 'NL'
          },
          contactPoint: {
            '@type': 'ContactPoint',
            telephone: '',
            contactType: 'customer service',
            email: 'contact@voicelabs.agency'
          }
        })}
      </Script>

      {/* Add Product Schema */}
      <Script id="product-schema" type="application/ld+json">
        {JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'Product',
          name: 'AI Receptionist',
          description: 'AI-powered receptionist for 24/7 professional customer service',
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
              name: 'What is AI telephony?',
              acceptedAnswer: {
                '@type': 'Answer',
                text: 'AI telephony uses artificial intelligence to manage phone calls. It ensures your business is available 24/7, handles conversations professionally, and automates your customer service.'
              }
            },
            {
              '@type': 'Question',
              name: 'What is an AI receptionist?',
              acceptedAnswer: {
                '@type': 'Answer',
                text: 'AI receptionists are smart digital assistants that talk and understand customers just like humans. They take over routine tasks like scheduling appointments and taking orders.'
              }
            },
            {
              '@type': 'Question',
              name: 'How does onboarding work?',
              acceptedAnswer: {
                '@type': 'Answer',
                text: 'Onboarding is simple and fast - you can go live within a day. We help you set up your business details, voice configuration, and call routing.'
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
                FOR FORWARD-THINKING BUSINESSES
              </div>
              <h1 className="mb-6 animate-fade-in [animation-duration:1.2s]">
                Support your customer service with <span className="text-[#0063f2]">AI.</span>
              </h1>
              <p className="paragraph text-gray-600 mb-10">
                Transform your customer service with our AI-powered receptionists. Available 24/7, handling calls professionally while reducing costs.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link
                  href="/consult"
                  className="bg-[#0063f2] text-white px-8 py-4 rounded-xl text-lg hover:bg-blue-600 transition-colors inline-flex items-center gap-2"
                >
                  Start Now
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
                <button
                  onClick={() => document.getElementById('future')?.scrollIntoView({ behavior: 'smooth' })}
                  className="text-gray-600 hover:text-gray-900 px-6 py-4 text-[15px] font-medium transition-colors duration-300"
                  aria-label="Learn how Voicelabs works"
                >
                  How do we work?
                </button>
              </div>
            </div>
            
            {/* Phone Container */}
            <div className="relative overflow-hidden -ml-[150px] lg:ml-0">
              <div className="relative w-[540px] h-[640px]">
                <Image
                  src="/comps/hand.png"
                  alt="Smartphone showing the Voicelabs AI receptionist interface"
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
                  <h3 className="text-lg font-semibold mb-2 mt-4">Curious?</h3>
                  <p className="text-sm text-gray-600 mb-6">Get a call from our AI receptionist right away!</p>
                  <form onSubmit={handleSubmit} className="space-y-4" aria-label="Contact form">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                        Name
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
                        placeholder="Name"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                        Email address
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
                        placeholder="name@email.com"
                      />
                    </div>
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                        Phone number
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
                        <p className="mt-1 text-sm text-red-600">Phone number is incorrect. Use format: +31612345678</p>
                      )}
                    </div>
                    {submitError && (
                      <p className="text-red-500 text-sm">Something went wrong. Please try again later.</p>
                    )}
                    {submitSuccess ? (
                      <div className="text-emerald-600 text-sm font-medium p-3 bg-emerald-50 rounded-md">
                        Our virtual assistant will contact you shortly.
                      </div>
                    ) : (
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full bg-[#0063f2] text-white px-4 py-2 rounded-md text-sm font-medium hover:opacity-90 transition-opacity disabled:opacity-50"
                        aria-label="Start conversation with AI receptionist"
                      >
                        {isSubmitting ? 'Please wait...' : 'Try it out'}
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
                The Advanced Technology Behind Our AI Receptionists
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
                        src="/partners/cartesia.svg"
                        alt="Cartesia - AI-telefonie partner"
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
                        src="/partners/livekit.png"
                        alt="LiveKit - Real-time communication partner"
                        width={120}
                        height={40}
                        className="grayscale hover:grayscale-0 transition-all object-contain"
                      />
                      <Image
                        src="/partners/twilio.svg"
                        alt="Twilio - Communicatie platform partner"
                        width={120}
                        height={40}
                        className="grayscale hover:grayscale-0 transition-all object-contain"
                      />
                      <Image
                        src="/partners/vonage.png"
                        alt="Vonage - Communication platform partner"
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
                        src="/partners/cartesia.svg"
                        alt="Cartesia - AI-telefonie partner"
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
                        src="/partners/livekit.svg"
                        alt="LiveKit - Real-time communication partner"
                        width={120}
                        height={40}
                        className="grayscale hover:grayscale-0 transition-all object-contain"
                      />
                      <Image
                        src="/partners/twilio.svg"
                        alt="Twilio - Communicatie platform partner"
                        width={120}
                        height={40}
                        className="grayscale hover:grayscale-0 transition-all object-contain"
                      />
                      <Image
                        src="/partners/vonage.png"
                        alt="Vonage - Communication platform partner"
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
                  src="/images/ai-receptionist.webp"
                  alt="AI Receptionist in action"
                  width={600}
                  height={500}
                  className="rounded-2xl"
                />
                {/* Summary Card */}
                <div className="absolute bottom-8 right-0 bg-white rounded-xl shadow-lg p-6 max-w-sm transform translate-x-12 animate-slide-in-right">
                  <h4 className="text-lg font-medium text-gray-800 mb-4">Daily Impact</h4>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <div className="w-5 h-5 bg-blue-50 rounded flex items-center justify-center">
                        <svg className="w-3 h-3 text-[#0063f2]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <span className="text-sm text-gray-600">53 minutes of calls saved</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-5 h-5 bg-blue-50 rounded flex items-center justify-center">
                        <svg className="w-3 h-3 text-[#0063f2]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                        </svg>
                      </div>
                      <span className="text-sm text-gray-600">9 new bookings</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column - Content */}
              <div className="reveal">
                <h2 className="mb-8">
                  With our <span className="text-[#0063f2]">AI receptionists</span>, you can focus on what truly matters.
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
                      <h3 className="mb-2">24/7 Availability, No Extra Staff</h3>
                      <p className="paragraph text-gray-600">Make every moment count. Our AI receptionist is ready day and night, instantly answering every question and elevating customer satisfaction.</p>
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
                      <h3 className="mb-2">Minimize Daily Disruptions and Frustration</h3>
                      <p className="paragraph text-gray-600">We handle all calls, eliminate unnecessary interruptions, and streamline communication so your business can grow unhindered.</p>
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
                      <h3 className="mb-2">No Missed Calls = More Revenue</h3>
                      <p className="paragraph text-gray-600">Every missed call is a missed opportunity. Capture every potential contact, convert every lead, and watch your bookings grow. No opportunity goes unused.</p>
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
                      <h3 className="mb-2">Seamless Integration into Your Business Workflow</h3>
                      <p className="paragraph text-gray-600">Voicelabs connects effortlessly with your essential tools. Using a less common system? No worries - we'll develop a seamless integration tailored to your specific business software.</p>
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
        <section id="future" className="text-white py-16 sm:py-24 relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-x-16">
              <div className="lg:col-span-4 reveal">
                <h2 className="text-center lg:text-left mb-8 lg:mb-0">
                  Experience the<br />future of<br />customer service.
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
                      <span className="paragraph text-white">Creating and managing appointments and reservations.</span>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="mt-1 flex-shrink-0">
                        <div className="w-5 h-5 rounded-full bg-emerald-500 flex items-center justify-center">
                          <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                      </div>
                      <span className="paragraph text-white">Answering the most common questions within the company.</span>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="mt-1 flex-shrink-0">
                        <div className="w-5 h-5 rounded-full bg-emerald-500 flex items-center justify-center">
                          <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                      </div>
                      <span className="paragraph text-white">Sending automatic confirmations via WhatsApp</span>
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
                      <span className="paragraph text-white">Easy transfer to a human agent whenever needed</span>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="mt-1 flex-shrink-0">
                        <div className="w-5 h-5 rounded-full bg-emerald-500 flex items-center justify-center">
                          <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                      </div>
                      <span className="paragraph text-white">Real-time conversation insights via our app</span>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="mt-1 flex-shrink-0">
                        <div className="w-5 h-5 rounded-full bg-emerald-500 flex items-center justify-center">
                          <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                      </div>
                      <span className="paragraph text-white">Smart notifications for follow-ups and actions</span>
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
          <h2 className="text-center mb-4 reveal">How it works</h2>
          <p className="paragraph text-gray-600 text-center mb-16 reveal">
            Working with Voicelabs is straightforward. With our clear approach, you'll be supported in all your telephony tasks in no time.
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
                  1. Analysis
                </button>
                <button
                  className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                    activeStep === 2
                      ? "bg-[#0063f2] text-white"
                      : "text-gray-500 hover:text-gray-900"
                  }`}
                  onClick={() => setActiveStep(2)}
                >
                  2. Implementation
                </button>
                <button
                  className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                    activeStep === 3
                      ? "bg-[#0063f2] text-white"
                      : "text-gray-500 hover:text-gray-900"
                  }`}
                  onClick={() => setActiveStep(3)}
                >
                  3. Optimization
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
                    <h3 className="mb-4">In-depth Analysis</h3>
                    <p className="paragraph text-gray-600">
                      We start with a thorough analysis of your business, processes, and customer needs. Our team works closely to understand your company's specific requirements and goals.
                    </p>
                    <ul className="mt-4 space-y-4">
                      <li className="paragraph text-gray-600 flex items-start gap-3">
                        <div className="w-6 h-6 mt-1 flex-shrink-0 rounded-full bg-[#0063f2]/10 flex items-center justify-center">
                          <svg className="w-4 h-4 text-[#0063f2]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                          </svg>
                        </div>
                        <span className="flex-1">The current CRM systems your business uses</span>
                      </li>
                      <li className="paragraph text-gray-600 flex items-start gap-3">
                        <div className="w-6 h-6 mt-1 flex-shrink-0 rounded-full bg-[#0063f2]/10 flex items-center justify-center">
                          <svg className="w-4 h-4 text-[#0063f2]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
                          </svg>
                        </div>
                        <span className="flex-1">The conversations you want to automate</span>
                      </li>
                      <li className="paragraph text-gray-600 flex items-start gap-3">
                        <div className="w-6 h-6 mt-1 flex-shrink-0 rounded-full bg-[#0063f2]/10 flex items-center justify-center">
                          <svg className="w-4 h-4 text-[#0063f2]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                        </div>
                        <span className="flex-1">Specific requirements such as multilingual support or integrations with existing systems</span>
                      </li>
                    </ul>
                  </div>
                )}
                {activeStep === 2 && (
                  <div className="animate-fadeSlideIn absolute inset-0 transition-all duration-500 ease-in-out">
                    <h3 className="mb-4">Implementation and Integration</h3>
                    <p className="paragraph text-gray-600">
                      Once the custom design is approved, we proceed with implementation. Our experts ensure seamless integration with your current systems, such as CRMs, calendars, or other tools.
                    </p>
                    <ul className="mt-4 space-y-4">
                      <li className="paragraph text-gray-600 flex items-start gap-3">
                        <div className="w-6 h-6 mt-1 flex-shrink-0 rounded-full bg-[#0063f2]/10 flex items-center justify-center">
                          <svg className="w-4 h-4 text-[#0063f2]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                          </svg>
                        </div>
                        <span className="flex-1">Support your workflows</span>
                      </li>
                      <li className="paragraph text-gray-600 flex items-start gap-3">
                        <div className="w-6 h-6 mt-1 flex-shrink-0 rounded-full bg-[#0063f2]/10 flex items-center justify-center">
                          <svg className="w-4 h-4 text-[#0063f2]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                          </svg>
                        </div>
                        <span className="flex-1">Be operational immediately</span>
                      </li>
                      <li className="paragraph text-gray-600 flex items-start gap-3">
                        <div className="w-6 h-6 mt-1 flex-shrink-0 rounded-full bg-[#0063f2]/10 flex items-center justify-center">
                          <svg className="w-4 h-4 text-[#0063f2]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                          </svg>
                        </div>
                        <span className="flex-1">Manage appointments, leads, or customer requests according to your specific needs</span>
                      </li>
                    </ul>
                  </div>
                )}
                {activeStep === 3 && (
                  <div className="animate-fadeSlideIn absolute inset-0 transition-all duration-500 ease-in-out">
                    <h3 className="mb-4">Optimization and Support</h3>
                    <p className="paragraph text-gray-600">
                      After launch, we carefully monitor your AI receptionist's performance. Based on customer feedback and user data, we continue to optimize to improve efficiency and customer satisfaction. Additionally, we provide ongoing support.
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Step Image */}
            <div className="relative aspect-[4/3] w-full reveal">
              <Image
                src={activeStep === 1 ? "/images/analysis.webp" : 
                     activeStep === 2 ? "/images/implementation.jpg" : 
                     "/images/optimization.webp"}
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
          <h2 className="text-center mb-4 text-black reveal">Choose the package that fits your business</h2>
          <p className="paragraph text-black text-center mb-16 reveal">Select from our best-fitting plans. Different needs?<br />We'll gladly create a custom plan!</p>

          {/* Pricing Toggle */}
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mb-16" role="group" aria-label="Payment period selection">
            <div className="flex items-center gap-4">
              <span className={`text-sm sm:text-base whitespace-nowrap ${!isYearly ? 'text-black' : 'text-gray-500'}`}>
                Pay Monthly
              </span>
              <button 
                onClick={() => setIsYearly(!isYearly)}
                className={`w-12 h-6 rounded-full relative cursor-pointer transition-colors ${
                  isYearly ? 'bg-emerald-500' : 'bg-black/20'
                }`}
                role="switch"
                aria-checked={isYearly}
                aria-label="Toggle between monthly and yearly payment"
              >
                <div className={`w-4 h-4 bg-white rounded-full absolute top-1 transition-all duration-200 ${
                  isYearly ? 'left-7' : 'left-1'
                }`}></div>
              </button>
              <span className={`text-sm sm:text-base whitespace-nowrap ${isYearly ? 'text-black' : 'text-gray-500'}`}>
                Pay Yearly
              </span>
            </div>
            <span className="text-sm text-emerald-600 font-medium whitespace-nowrap">
              (Save 15%)
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
                <h3 className="text-2xl font-semibold mb-4">Basic</h3>
                <div className="flex items-baseline gap-1 mb-6" aria-label="Price information">
                  <span className="text-4xl font-semibold">${isYearly ? prices.basis.yearly : prices.basis.monthly}</span>
                  <span className="text-gray-600">/month</span>
                </div>
                <p className="text-gray-600 mb-6">Start with a custom-built AI receptionist tailored to your business needs. We'll configure everything specifically for you.</p>
                <Link 
                  href="/consult" 
                  className="block text-center bg-[#0063f2] text-white py-3 px-6 rounded-lg hover:opacity-90 transition-colors mb-8 inline-flex items-center justify-center gap-2 w-full"
                >
                  Request Now
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
                <ul className="space-y-3" aria-label="Basic package features">
                  <li className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-emerald-500 flex-shrink-0 flex items-center justify-center mt-0.5" aria-hidden="true">
                      <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className="text-gray-600 flex-1 text-[15px] leading-snug">Can handle 5 simultaneous conversations</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-emerald-500 flex-shrink-0 flex items-center justify-center mt-0.5" aria-hidden="true">
                      <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className="text-gray-600 flex-1 text-[15px] leading-snug">Inbound calls – AI can handle and transfer incoming calls</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-emerald-500 flex-shrink-0 flex items-center justify-center mt-0.5" aria-hidden="true">
                      <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className="text-gray-600 flex-1 text-[15px] leading-snug">1000 call minutes, unlimited calls</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-emerald-500 flex-shrink-0 flex items-center justify-center mt-0.5" aria-hidden="true">
                      <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className="text-gray-600 flex-1 text-[15px] leading-snug">Direct integration with popular tools (e.g., HubSpot, Salesforce, Cal etc)</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-emerald-500 flex-shrink-0 flex items-center justify-center mt-0.5" aria-hidden="true">
                      <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className="text-gray-600 flex-1 text-[15px] leading-snug">Email transcripts – everything organized in your inbox</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-emerald-500 flex-shrink-0 flex items-center justify-center mt-0.5" aria-hidden="true">
                      <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className="text-gray-600 flex-1 text-[15px] leading-snug">No technical knowledge required – we handle and optimize everything</span>
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
                    <span className="text-4xl font-semibold text-white">${isYearly ? prices.business.yearly : prices.business.monthly}</span>
                    <span className="text-white/90">/month</span>
                  </div>
                  <p className="text-white/90 mb-6">Advanced custom solution with full process automation. We'll build and integrate an AI system perfectly matched to your workflow.</p>
                  <Link
                    href="/consult"
                    className="bg-white text-[#0063f2] px-6 py-3 rounded-xl hover:bg-gray-100 transition-colors inline-flex items-center justify-center gap-2 w-full mb-8"
                  >
                    Start Now
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
                      <span className="text-white/90 flex-1 text-[15px] leading-snug">Can handle 10 simultaneous conversations</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-5 h-5 rounded-full bg-emerald-500 flex-shrink-0 flex items-center justify-center mt-0.5">
                        <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <span className="text-white/90 flex-1 text-[15px] leading-snug">Inbound and outbound calls</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-5 h-5 rounded-full bg-emerald-500 flex-shrink-0 flex items-center justify-center mt-0.5">
                        <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <span className="text-white/90 flex-1 text-[15px] leading-snug">2000 call minutes, unlimited calls</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-5 h-5 rounded-full bg-emerald-500 flex-shrink-0 flex items-center justify-center mt-0.5">
                        <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <span className="text-white/90 flex-1 text-[15px] leading-snug">Advanced CRM integration – complete automation of customer data</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-5 h-5 rounded-full bg-emerald-500 flex-shrink-0 flex items-center justify-center mt-0.5">
                        <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <span className="text-white/90 flex-1 text-[15px] leading-snug">Connect multiple phone numbers – ideal for large teams or locations</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-5 h-5 rounded-full bg-emerald-500 flex-shrink-0 flex items-center justify-center mt-0.5">
                        <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <span className="text-white/90 flex-1 text-[15px] leading-snug">Follow-up workflows: email, WhatsApp, SMS</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-5 h-5 rounded-full bg-emerald-500 flex-shrink-0 flex items-center justify-center mt-0.5">
                        <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <span className="text-white/90 flex-1 text-[15px] leading-snug">Always informed with a real-time dashboard and comprehensive reports</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-5 h-5 rounded-full bg-emerald-500 flex-shrink-0 flex items-center justify-center mt-0.5">
                        <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <span className="text-white/90 flex-1 text-[15px] leading-snug">No technical knowledge required – we handle and optimize everything</span>
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
                  <span className="text-4xl font-semibold">On Request</span>
                </div>
                <p className="text-gray-600 mb-6">Completely bespoke AI solution built from the ground up. Full customization of every aspect to match your enterprise needs.</p>
                <Link
                  href="/consult"
                  className="block text-center bg-[#0063f2] text-white py-3 px-6 rounded-lg hover:opacity-90 transition-colors mb-8 inline-flex items-center justify-center gap-2 w-full"
                >
                  Become a Partner
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
                    <span className="text-gray-600 flex-1 text-[15px] leading-snug">Everything from the Business package</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-emerald-500 flex-shrink-0 flex items-center justify-center mt-0.5">
                      <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className="text-gray-600 flex-1 text-[15px] leading-snug">Connect multiple phone numbers – ideal for large teams or locations</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-emerald-500 flex-shrink-0 flex items-center justify-center mt-0.5">
                      <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className="text-gray-600 flex-1 text-[15px] leading-snug">Advanced workflows – fully tailored to your specific business processes</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-emerald-500 flex-shrink-0 flex items-center justify-center mt-0.5">
                      <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className="text-gray-600 flex-1 text-[15px] leading-snug">Strategic consultancy – our AI experts help you optimize and automate processes</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-emerald-500 flex-shrink-0 flex items-center justify-center mt-0.5">
                      <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className="text-gray-600 flex-1 text-[15px] leading-snug">And much more..</span>
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
          <h2 className="text-center mb-4 reveal">Frequently Asked Questions</h2>
          <p className="paragraph text-gray-600 text-center mb-12 reveal">
            These are the most common questions about our AI receptionists.
            <br />
            Other questions? <Link href="/contact" className="text-[#0063f2] hover:opacity-80">Contact our team!</Link>
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
                  <span className="h3-small text-gray-900">What is AI telephony?</span>
                </div>
              </button>
              <div className={`transition-all duration-200 ease-in-out ${openFaq === 0 ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'} overflow-hidden`}>
                <div className="px-6 pb-6 pt-2">
                  <p className="paragraph text-gray-600 ml-10">
                    AI telephony uses artificial intelligence to manage phone calls. It ensures your business is available 24/7, handles conversations professionally, and automates your customer service. The AI understands natural language, can conduct normal conversations, and handles practical matters like scheduling appointments or providing information.
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
                  <span className="h3-small text-gray-900">What is an AI receptionist?</span>
                </div>
              </button>
              <div className={`transition-all duration-200 ease-in-out ${openFaq === 1 ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'} overflow-hidden`}>
                <div className="px-6 pb-6 pt-2">
                  <p className="paragraph text-gray-600 ml-10">
                    AI receptionists are smart digital assistants that talk and understand customers just like humans. They take over routine tasks like scheduling appointments and taking orders. This saves you time and money, and reduces stress about missed calls.
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
                  <span className="h3-small text-gray-900">What is Conversational AI?</span>
                </div>
              </button>
              <div className={`transition-all duration-200 ease-in-out ${openFaq === 2 ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'} overflow-hidden`}>
                <div className="px-6 pb-6 pt-2">
                  <p className="paragraph text-gray-600 ml-10">
                    Conversational AI enables computers to have natural conversations with people. It's not just a simple 'yes/no' computer anymore, but a system that truly understands what you say and mean. This ensures natural conversations, whether you're chatting or calling.
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
                  <span className="h3-small text-gray-900">How does onboarding work?</span>
                </div>
              </button>
              <div className={`transition-all duration-200 ease-in-out ${openFaq === 3 ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'} overflow-hidden`}>
                <div className="px-6 pb-6 pt-2">
                  <p className="paragraph text-gray-600 ml-10">
                    During onboarding, we stay closely involved. We develop the virtual assistant entirely based on your company's preferences and help set up call forwarding and other functionalities. Everything is explained step by step, ensuring your AI assistant seamlessly aligns with your way of working.
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
                  <span className="h3-small text-gray-900">Does Voicelabs work with my phone system?</span>
                </div>
              </button>
              <div className={`transition-all duration-200 ease-in-out ${openFaq === 4 ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'} overflow-hidden`}>
                <div className="px-6 pb-6 pt-2">
                  <p className="paragraph text-gray-600 ml-10">
                    Voicelabs works with all business phones, both mobile and landline. Setup can be done easily in a few steps so the virtual assistant can answer overflow calls or transfer customers. We'll walk through the entire process together, so you know exactly how it works.
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
                  <span className="h3-small text-gray-900">How does Voicelabs help with business growth and efficiency?</span>
                </div>
              </button>
              <div className={`transition-all duration-200 ease-in-out ${openFaq === 5 ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'} overflow-hidden`}>
                <div className="px-6 pb-6 pt-2">
                  <p className="paragraph text-gray-600 ml-10">
                    Our virtual assistants handle your calls and appointments 24/7, so you can focus on your work. They chat with customers, schedule appointments, help with questions, and collect contact information. Experience shows that an average of 20 hours can be saved on calls per month. This leaves you time for more important matters. Additionally, Voicelabs actively helps automate workflows within your business.
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
                  <span className="h3-small text-gray-900">How does Voicelabs comply with GDPR and ensure data privacy?</span>
                </div>
              </button>
              <div className={`transition-all duration-200 ease-in-out ${openFaq === 6 ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'} overflow-hidden`}>
                <div className="px-6 pb-6 pt-2">
                  <p className="paragraph text-gray-600 ml-10">
                    We take privacy seriously and follow all GDPR rules. Your data is safe with us through strong encryption and secure storage.
                    <br /><br />
                    Do your customers prefer to talk to a human? We can transfer calls directly or arrange a callback request.
                    <br /><br />
                    We're transparent about AI use - our assistants always honestly identify themselves as AI. Check our <Link href="/privacy-policy" className="text-[#0063f2] hover:opacity-80">Privacy Policy</Link> and Ethical Framework for more details.
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
