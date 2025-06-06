import React from 'react';
import Link from 'next/link';
import SEOHead from '../components/SEOHead';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import { Check, Phone, Mail, Calendar } from 'lucide-react';

export default function ThankYou() {
  return (
    <>
      <SEOHead
        title="Thank You - The Plantation House"
        description="Thank you for contacting The Plantation House. We'll be in touch soon to help plan your dream Maui wedding."
        canonicalUrl="https://yourdomain.com/thank-you/"
        additionalMeta={[
          { name: "robots", content: "noindex, nofollow" }
        ]}
      />
      
      <div className="bg-white min-h-screen">
        <Navigation />
        
        <section className="pt-24 pb-16 bg-gradient-to-b from-cream-50 to-white">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl mx-auto text-center">
              <div className="mb-8">
                <div className="w-20 h-20 bg-olive-600 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Check className="h-10 w-10 text-white" />
                </div>
                
                <h1 className="text-3xl md:text-4xl text-olive-800 mb-4 font-light italic"
                    style={{ fontFamily: '"palatino-linotype", "Palatino Linotype", "Palatino", serif !important', fontStyle: 'italic !important' }}>
                  <span style={{ fontFamily: '"palatino-linotype", "Palatino Linotype", "Palatino", serif', fontStyle: 'italic' }}>
                    Thank You for Reaching Out!
                  </span>
                </h1>
                
                <p className="text-lg text-dark-600 mb-8 leading-relaxed">
                  We've received your inquiry and our Wedding Concierge team will be in touch within 24 hours to help you begin planning your perfect Maui celebration.
                </p>
              </div>
              
              <div className="bg-white rounded-lg shadow-md p-8 border border-olive-100 mb-8">
                <h2 className="text-xl text-olive-800 mb-6 font-medium">What Happens Next?</h2>
                
                <div className="space-y-4 text-left">
                  <div className="flex items-start">
                    <div className="w-8 h-8 bg-olive-600 rounded-full flex items-center justify-center mr-4 flex-shrink-0 mt-1">
                      <span className="text-white font-medium text-sm">1</span>
                    </div>
                    <div>
                      <h3 className="font-medium text-dark-700 mb-1">Personal Consultation</h3>
                      <p className="text-dark-600 text-sm">Our team will call you to discuss your vision and answer any questions.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="w-8 h-8 bg-olive-600 rounded-full flex items-center justify-center mr-4 flex-shrink-0 mt-1">
                      <span className="text-white font-medium text-sm">2</span>
                    </div>
                    <div>
                      <h3 className="font-medium text-dark-700 mb-1">Schedule Your Tour</h3>
                      <p className="text-dark-600 text-sm">Experience our stunning venues and meet your dedicated Wedding Concierge.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="w-8 h-8 bg-olive-600 rounded-full flex items-center justify-center mr-4 flex-shrink-0 mt-1">
                      <span className="text-white font-medium text-sm">3</span>
                    </div>
                    <div>
                      <h3 className="font-medium text-dark-700 mb-1">Begin Planning</h3>
                      <p className="text-dark-600 text-sm">Start creating your dream wedding with our expert guidance and island connections.</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <p className="text-dark-600">
                  Have immediate questions? We're here to help:
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <a 
                    href="tel:(808)669-6299"
                    className="inline-flex items-center justify-center bg-olive-600 hover:bg-olive-500 text-white px-6 py-3 rounded-full font-medium transition-colors duration-300"
                  >
                    <Phone className="h-5 w-5 mr-2" />
                    Call (808) 669-6299
                  </a>
                  
                  <a 
                    href="mailto:events@plantationhouse.com"
                    className="inline-flex items-center justify-center border border-olive-600 text-olive-600 hover:bg-olive-600 hover:text-white px-6 py-3 rounded-full font-medium transition-colors duration-300"
                  >
                    <Mail className="h-5 w-5 mr-2" />
                    Email Us
                  </a>
                </div>
                
                <div className="pt-6">
                  <Link 
                    href="/"
                    className="text-olive-600 hover:text-olive-500 font-medium transition-colors duration-300"
                  >
                    ← Return to Homepage
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        <Footer />
      </div>
    </>
  );
} 