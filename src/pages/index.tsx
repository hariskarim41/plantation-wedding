import React, { useState } from 'react';
import SEOHead from '../components/SEOHead';

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

  // Structured data for the wedding venue
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WeddingVenue",
    "name": "The Plantation House",
    "description": "Maui's premier wedding venue with panoramic ocean views and award-winning cuisine",
    "image": [
      "https://www.theplantationhouse.com/wp-content/uploads/2023/05/Photo-6-1.jpg",
      "https://www.theplantationhouse.com/wp-content/uploads/2023/05/Photo-4.jpg"
    ],
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "2000 Plantation Club Drive",
      "addressLocality": "Kapalua",
      "addressRegion": "HI",
      "postalCode": "96761",
      "addressCountry": "US"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 20.9992,
      "longitude": -156.6692
    },
    "telephone": "(808) 669-6299",
    "email": "events@plantationhouse.com",
    "url": "https://yourdomain.com",
    "openingHours": "Mo-Su 09:00-17:00",
    "priceRange": "$$$",
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.8",
      "reviewCount": "150"
    },
    "amenityFeature": [
      {
        "@type": "LocationFeatureSpecification",
        "name": "Ocean Views",
        "value": true
      },
      {
        "@type": "LocationFeatureSpecification", 
        "name": "Wedding Concierge",
        "value": true
      },
      {
        "@type": "LocationFeatureSpecification",
        "name": "Catering",
        "value": true
      }
    ]
  };

  return (
    <>
      <SEOHead
        title="The Plantation House - Maui Wedding Venue"
        description="Experience the wedding of your dreams at Maui's premier venue with panoramic ocean views and award-winning cuisine. Book your tour today!"
        canonicalUrl="https://yourdomain.com/"
        structuredData={structuredData}
        additionalMeta={[
          { name: "keywords", content: "maui wedding venue, hawaii wedding, plantation house, kapalua wedding, ocean view wedding, destination wedding" },
          { name: "author", content: "The Plantation House" },
          { name: "robots", content: "index, follow" }
        ]}
      />
      
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