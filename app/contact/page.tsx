'use client';

import { useState, useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Link from 'next/link';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'success' | 'error' | null>(null);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const response = await fetch('/api/contact-form', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error('Submission failed');
      
      setSubmitStatus('success');
      setFormData({ name: '', email: '', phone: '', message: '' });
    } catch (error) {
      console.error('Form submission error:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
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
    <main className="min-h-screen bg-white">
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 pt-40 pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start mb-32">
          {/* Left Column - Hero Text */}
          <div className="reveal [transform:translateY(20px)] [transition:all_0.8s_ease-out] [opacity:0] [.active&]:translate-y-0 [.active&]:opacity-100">
            <div className="text-sm font-medium text-gray-500 tracking-wide mb-6 animate-[fadeIn_0.8s_ease-out]">
              Contact Form
            </div>
            <h1 className="text-[56px] leading-[1.1] font-normal mb-6 animate-[fadeSlideIn_1s_ease-out]">
              Get in touch easily
            </h1>
            <p className="paragraph text-gray-600 mb-12 animate-[fadeSlideIn_1.2s_ease-out]">
              Whether you're curious about our AI receptionists, need help, or just want to say hello, we're here for you. Send us a message using the form or contact us directly through the options below.
            </p>

            <div className="grid grid-cols-1 gap-8 mb-16 animate-[fadeSlideIn_1.4s_ease-out]">
              <div>
                <h3 className="text-lg font-medium mb-2">Email</h3>
                <a href="mailto:contact@voicelabs.agency" className="text-[#0063f2] hover:opacity-80">
                  contact@voicelabs.agency
                </a>
              </div>
            </div>
          </div>

          {/* Right Column - Contact Form */}
          <div className="bg-white rounded-2xl p-8 shadow-[0_8px_32px_rgba(0,0,0,0.12)] border border-gray-100 lg:sticky lg:top-32 reveal [transform:translateY(20px)] [transition:all_1s_ease-out] [opacity:0] [.active&]:translate-y-0 [.active&]:opacity-100">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="animate-[fadeSlideIn_1.2s_ease-out]">
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  required
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[#0063f2] focus:border-transparent transition-colors"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>
              
              <div className="animate-[fadeSlideIn_1.4s_ease-out]">
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  Email address
                </label>
                <input
                  type="email"
                  id="email"
                  required
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[#0063f2] focus:border-transparent transition-colors"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>

              <div className="animate-[fadeSlideIn_1.6s_ease-out]">
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                  Phone number
                </label>
                <input
                  type="tel"
                  id="phone"
                  required
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[#0063f2] focus:border-transparent transition-colors"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="+31612345678"
                />
              </div>

              <div className="animate-[fadeSlideIn_1.8s_ease-out]">
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  required
                  rows={4}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[#0063f2] focus:border-transparent transition-colors"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-[#0063f2] text-white px-8 py-4 rounded-xl hover:bg-[#004dbd] transition-all duration-300 text-[17px] font-medium hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
              >
                {isSubmitting ? 'Sending...' : 'Send message'}
              </button>

              {submitStatus === 'success' && (
                <div className="bg-emerald-50 text-emerald-600 p-4 rounded-xl text-sm">
                  Your message has been sent successfully. We'll get back to you as soon as possible.
                </div>
              )}
              {submitStatus === 'error' && (
                <div className="bg-red-50 text-red-600 p-4 rounded-xl text-sm">
                  Something went wrong. Please try again later.
                </div>
              )}
            </form>
          </div>
        </div>

        {/* FAQ Section - Full Width */}
        <div className="max-w-3xl mx-auto mt-32 reveal [transform:translateY(20px)] [transition:all_0.8s_ease-out] [opacity:0] [.active&]:translate-y-0 [.active&]:opacity-100">
          <h2 className="text-center text-4xl mb-4 animate-[fadeSlideIn_0.8s_ease-out]">Frequently Asked Questions</h2>
          <p className="paragraph text-gray-600 text-center mb-12 animate-[fadeSlideIn_1s_ease-out]">
            These are the most common questions about our AI receptionists.
            <br />
            Other questions? <button onClick={() => window.scrollTo(0, 0)} className="text-[#0063f2] hover:opacity-80">Contact our team!</button>
          </p>

          <div className="space-y-4">
            <div className="border border-gray-200 rounded-lg overflow-hidden animate-[fadeSlideIn_1.2s_ease-out]">
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
                    AI telephony uses artificial intelligence to manage phone calls. It ensures your business is available 24/7, handles calls professionally, and automates your customer service. The AI understands natural language, can conduct normal conversations, and handles practical matters such as scheduling appointments or providing information.
                  </p>
                </div>
              </div>
            </div>

            <div className="border border-gray-200 rounded-lg overflow-hidden animate-[fadeSlideIn_1.4s_ease-out]">
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
                    AI receptionists are smart digital assistants that talk and understand what customers want, just like humans. They take over routine tasks like scheduling appointments and taking orders. This saves you time and money, and reduces stress about missed calls.
                  </p>
                </div>
              </div>
            </div>

            <div className="border border-gray-200 rounded-lg overflow-hidden animate-[fadeSlideIn_1.6s_ease-out]">
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
                    Conversational AI maakt het mogelijk dat computers normaal met mensen kunnen praten. Het is geen simpele 'ja/nee' computer meer, maar een systeem dat echt begrijpt wat je zegt en bedoelt. Dit zorgt voor natuurlijke gesprekken, of je nu chat of belt.
                  </p>
                </div>
              </div>
            </div>

            <div className="border border-gray-200 rounded-lg overflow-hidden animate-[fadeSlideIn_1.8s_ease-out]">
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

            <div className="border border-gray-200 rounded-lg overflow-hidden animate-[fadeSlideIn_2s_ease-out]">
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

            <div className="border border-gray-200 rounded-lg overflow-hidden animate-[fadeSlideIn_2.2s_ease-out]">
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

            <div className="border border-gray-200 rounded-lg overflow-hidden animate-[fadeSlideIn_2.4s_ease-out]">
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
      </div>

      <Footer />

      <style jsx global>{`
        @keyframes fadeSlideIn {
          0% {
            opacity: 0;
            transform: translateY(20px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes fadeIn {
          0% {
            opacity: 0;
          }
          100% {
            opacity: 1;
          }
        }
      `}</style>
    </main>
  );
} 