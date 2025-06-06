import React, { useState } from 'react';
import Head from 'next/head';

// Import components
import Navigation from '../components/Navigation';
import HeroSection from '../components/HeroSection';
import Footer from '../components/Footer';
import FloatingCTA from '../components/FloatingCTA';
import ContactSection from '../components/ContactSection';
import BookingModal from '../components/BookingModal';

// Import sections from App.tsx - we'll need to extract these
import { 
  IntroductionSection,
  TrustedVenueSection,
  WeddingSpacesSection,
  ExperienceSection,
  GallerySectionPreview,
  WeddingConciergeSection,
  TestimonialSection
} from '../components/HomeSections';

export default function Home() {
  const [showBookingModal, setShowBookingModal] = useState(false);
  
  const handleScheduleTour = () => {
    setShowBookingModal(true);
  };

  return (
    <>
      <Head>
        <title>The Plantation House - Maui Wedding Venue</title>
        <meta name="description" content="Experience the wedding of your dreams at Maui's premier venue with panoramic ocean views and award-winning cuisine." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      <div className="bg-white">
        <Navigation />
        <HeroSection onScheduleTour={handleScheduleTour} />
        <IntroductionSection />
        <TrustedVenueSection />
        <WeddingSpacesSection />
        <ExperienceSection />
        <GallerySectionPreview />
        <WeddingConciergeSection onScheduleTour={handleScheduleTour} />
        <TestimonialSection />
        <ContactSection />
        <Footer />
        <FloatingCTA onScheduleTour={handleScheduleTour} />
        
        <BookingModal 
          isOpen={showBookingModal} 
          onClose={() => setShowBookingModal(false)} 
        />
      </div>
    </>
  );
} 