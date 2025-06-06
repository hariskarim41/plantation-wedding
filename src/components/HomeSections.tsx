import React, { useState } from 'react';
import Link from 'next/link';
import { 
  ChevronDown, 
  Calendar, 
  Users, 
  MapPin, 
  Phone, 
  Mail, 
  Clock,
  ChevronRight,
  Heart,
  Camera,
  Utensils,
  Sparkles,
  Check,
  Star,
  PalmtreeIcon,
  CalendarClock,
  Building,
  Plane,
  Trophy
} from 'lucide-react';

// Gill Sans Nova styles moved to global CSS to prevent hydration issues

// Introduction Section Component
export const IntroductionSection = () => {
  return (
    <section className="py-20 bg-gradient-to-b from-white to-[#f7f4f1] relative">
      {/* Decorative pattern overlay */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div className="h-full w-full" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%235F653C' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2V6h4V4H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <h2 
            className="text-3xl md:text-4xl text-olive-800 mb-8 relative font-light italic"
            style={{ fontFamily: '"palatino-linotype", "Palatino Linotype", "Palatino", serif !important', fontStyle: 'italic !important' }}
          >
            <span className="inline-block relative" style={{ fontFamily: '"palatino-linotype", "Palatino Linotype", "Palatino", serif', fontStyle: 'italic' }}>
              A West Maui Legacy Since 1991
              <span className="absolute -bottom-2 left-0 right-0 h-0.5 bg-olive-600"></span>
            </span>
          </h2>
          <p className="text-dark-600 text-lg leading-relaxed mb-10">
            Experience the wedding of your dreams at Maui's premier venue, where the Pacific Ocean stretches endlessly before you and the lush fairways of Kapalua's award-winning Plantation Golf Course create a stunning backdrop for your special day. As a true West Maui institution for over three decades, The Plantation House has deep roots in the island community, unlocking exclusive possibilities for your celebration that other venues simply cannot offer.
          </p>
          <div className="flex flex-wrap justify-center gap-8">
            <div className="flex items-center text-dark-600 group transition-all duration-300 transform hover:scale-105">
              <Users className="h-5 w-5 mr-2 text-olive-600 group-hover:text-olive-500 transition-colors duration-300" />
              <span>10-500 Guests</span>
            </div>
            <div className="flex items-center text-dark-600 group transition-all duration-300 transform hover:scale-105">
              <MapPin className="h-5 w-5 mr-2 text-olive-600 group-hover:text-olive-500 transition-colors duration-300" />
              <span>Kapalua, Maui</span>
            </div>
            <div className="flex items-center text-dark-600 group transition-all duration-300 transform hover:scale-105">
              <Calendar className="h-5 w-5 mr-2 text-olive-600 group-hover:text-olive-500 transition-colors duration-300" />
              <span>Year-Round Availability</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// Maui's Most Trusted Wedding Venue Section
export const TrustedVenueSection = () => {
  return (
    <section className="py-24 bg-cream-50 relative">
      {/* Woven texture pattern overlay */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div className="h-full w-full" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='44' height='44' viewBox='0 0 44 44' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%235F653C' fill-opacity='0.25' fill-rule='evenodd'%3E%3Cpath d='M0 0h22v22H0V0zm22 22h22v22H22V22z'/%3E%3Cpath d='M2 2h18v18H2V2zm22 0h18v18H24V2zM2 24h18v18H2V24zm22 0h18v18H24V24z'/%3E%3Cpath d='M4 4h14v14H4V4zm22 0h14v14H26V4zM4 26h14v14H4V26zm22 0h14v14H26V26z'/%3E%3Cpath d='M6 6h10v10H6V6zm22 0h10v10H28V6zM6 28h10v10H6V28zm22 0h10v10H28V28z'/%3E%3Cpath d='M8 8h6v6H8V8zm22 0h6v6H30V8zM8 30h6v6H8V30zm22 0h6v6H30V30z'/%3E%3C/g%3E%3C/svg%3E")`,
          backgroundSize: "44px 44px"
        }}></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto bg-white/90 backdrop-blur-sm rounded-xl shadow-lg overflow-hidden transform transition-all duration-300 hover:shadow-xl border border-olive-100">
          <div className="flex flex-col md:flex-row">
            <div className="md:w-1/2 group overflow-hidden">
              <img 
                src="https://www.theplantationhouse.com/wp-content/uploads/2023/05/Photo-4.jpg" 
                alt="Couple at The Plantation House"
                className="w-full h-80 md:h-full object-cover transition-transform duration-1000 group-hover:scale-105"
              />
            </div>
            <div className="md:w-1/2 p-8 flex flex-col justify-center">
              <div className="flex items-center mb-2">
                {[1,2,3,4,5].map((star) => (
                  <Star key={star} className="h-5 w-5 text-olive-600 mr-1" fill="#5F653C" />
                ))}
              </div>
              <h3 className="text-2xl text-olive-800 mb-4 font-light">Maui's Most Trusted Wedding Venue</h3>
              <p className="text-dark-600 mb-8 leading-relaxed">
                With over three decades as West Maui's premier celebration destination, we've perfected the art of the island wedding. Our reputation opens doors across the island, ensuring your special day benefits from the very best Maui has to offer.
              </p>
              
              <div className="space-y-3">
                {["Panoramic ocean views from every venue", "Dedicated Wedding Concierge service", "Award-winning plantation-to-plate cuisine", "West Maui's most connected venue team"].map((item, index) => (
                  <div key={index} className="flex items-center group">
                    <Check className="h-5 w-5 text-olive-600 mr-3 transition-colors duration-300 group-hover:text-olive-500" />
                    <span className="text-dark-600 transition-colors duration-300 group-hover:text-dark-700">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// Wedding Spaces Section Component
export const WeddingSpacesSection = () => {
  const spaces = [
    {
      id: 'molokai-lawn',
      name: 'Molokai Lawn',
      description: 'Our signature outdoor space offering panoramic ocean views and breathtaking Maui sunsets, perfect for ceremonies and receptions up to 500 guests. This is our most popular venue choice, creating unforgettable moments as you exchange vows with the Pacific Ocean as your backdrop.',
      image: 'https://res.cloudinary.com/dyokodjrm/image/upload/v1746415605/The_scenic_golf_course_at_The_Plantation_House_provides_the_perfect_backdrop_to_complement_your_Maui_adventures._qukovi.webp',
      capacity: 500,
      fontFamily: '"Gill Sans Nova Book", "Gill Sans Nova", "Gill Sans", "Gill Sans MT", sans-serif',
    },
    {
      id: 'lower-lawn',
      name: 'Lower Lawn',
      description: 'A more intimate oceanfront setting ideal for ceremonies up to 100 guests. This secluded space offers a sense of privacy while still showcasing the spectacular ocean views that make The Plantation House famous. Perfect for couples desiring an exclusive outdoor experience.',
      image: 'https://www.theplantationhouse.com/wp-content/uploads/2023/05/Photo-9.jpg',
      capacity: 100,
      fontFamily: '"Gill Sans Nova Book", "Gill Sans Nova", "Gill Sans", "Gill Sans MT", sans-serif',
    },
    {
      id: 'grand-staircase',
      name: 'Grand Staircase',
      description: 'Our iconic grand staircase offers a majestic setting for memorable wedding moments, perfect for elegant ceremonies and stunning photo opportunities. The cascading steps create a dramatic entrance for the bride and provide an unforgettable backdrop for your special day.',
      image: 'https://res.cloudinary.com/dyokodjrm/image/upload/v1746415951/i-hRcx5kq-X3_vtrhqb.jpg',
      capacity: 120,
      fontFamily: '"Gill Sans Nova Book", "Gill Sans Nova", "Gill Sans", "Gill Sans MT", sans-serif',
    },
    {
      id: 'ohana-room',
      name: 'Ohana Room',
      description: 'An elegant indoor space with glass-paneled doors opening to golf course views, accommodating up to 80 guests. This versatile venue offers air-conditioned comfort with panoramic vistas, making it perfect for intimate receptions or as a sophisticated backup for outdoor events.',
      image: 'https://www.theplantationhouse.com/wp-content/uploads/2023/05/Photo-8.jpg',
      capacity: 80,
      fontFamily: '"Gill Sans Nova Book", "Gill Sans Nova", "Gill Sans", "Gill Sans MT", sans-serif',
    },
  ];

  const [activeSpace, setActiveSpace] = useState(spaces[0]);

  return (
    <section 
      id="venues" 
      className="py-24 bg-gradient-to-b from-white to-[#f7f4f1] relative"
    >
      {/* Triangular pattern overlay */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div className="h-full w-full" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='36' height='72' viewBox='0 0 36 72'%3E%3Cg fill-rule='evenodd'%3E%3Cg fill='%235F653C' fill-opacity='0.2'%3E%3Cpath d='M2 6h12L8 18 2 6zm18 36h12l-6 12-6-12z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <h2 
          className="text-3xl md:text-4xl text-olive-800 text-center mb-16 relative font-light italic"
          style={{ fontFamily: '"palatino-linotype", "Palatino Linotype", "Palatino", serif !important', fontStyle: 'italic !important' }}
        >
          <span className="inline-block relative" style={{ fontFamily: '"palatino-linotype", "Palatino Linotype", "Palatino", serif', fontStyle: 'italic' }}>
            Our Exclusive Wedding Venues
            <span className="absolute -bottom-2 left-1/4 right-1/4 h-0.5 bg-olive-600"></span>
          </span>
        </h2>
        
        <div className="flex flex-col lg:flex-row gap-12 force-gill-sans">
          {/* Left sidebar - Venue selector */}
          <div className="lg:w-1/3">
            <div className="bg-white rounded-xl shadow-lg p-6 border border-olive-100 lg:sticky lg:top-24">
              <h3 className="text-xl text-olive-800 mb-6">Select a Venue</h3>
              <div className="space-y-4">
                {spaces.map((space) => (
                  <button
                    key={space.id}
                    onClick={() => setActiveSpace(space)}
                    className={`w-full text-left p-4 rounded-lg transition-all duration-300 border-2 ${
                      activeSpace.id === space.id
                        ? 'border-olive-600 bg-olive-50 shadow-md'
                        : 'border-transparent bg-gray-50 hover:bg-olive-50 hover:border-olive-200'
                    }`}
                  >
                    <div className="flex justify-between items-center">
                      <div>
                        <h4 className="text-olive-800 font-medium">{space.name}</h4>
                        <p className="text-dark-600 text-sm mt-1">Up to {space.capacity} guests</p>
                      </div>
                      <ChevronRight className={`h-5 w-5 transition-transform duration-300 ${
                        activeSpace.id === space.id ? 'text-olive-600 transform rotate-90' : 'text-gray-400'
                      }`} />
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
          
          {/* Right content - Active venue details */}
          <div className="lg:w-2/3">
            <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-olive-100 transform transition-all duration-500">
              <div className="relative h-80 overflow-hidden group">
                <img 
                  src={activeSpace.image} 
                  alt={activeSpace.name}
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-olive-800/70 via-olive-700/30 to-transparent"></div>
                <div className="absolute bottom-6 left-6 text-white">
                  <h3 className="text-2xl font-light mb-2">{activeSpace.name}</h3>
                  <div className="flex items-center">
                    <Users className="h-5 w-5 mr-2" />
                    <span>Up to {activeSpace.capacity} guests</span>
                  </div>
                </div>
              </div>
              
              <div className="p-8">
                <p className="text-dark-600 leading-relaxed mb-8">
                  {activeSpace.description}
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link 
                    href="/gallery"
                    className="flex-1 bg-olive-600 hover:bg-olive-500 text-white px-6 py-3 rounded-full text-center transition-colors duration-300 transform hover:scale-105 shadow-md"
                  >
                    View Gallery
                  </Link>
                  <button className="flex-1 border-2 border-olive-600 text-olive-600 hover:bg-olive-600 hover:text-white px-6 py-3 rounded-full transition-colors duration-300 transform hover:scale-105">
                    Learn More
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// Experience Section Component
export const ExperienceSection = () => {
  const experiences = [
    {
      icon: Utensils,
      title: "Culinary Excellence",
      description: "Farm-to-table cuisine featuring the finest local ingredients, crafted by our award-winning culinary team.",
      features: ["Locally-sourced ingredients", "Custom menu design", "Dietary accommodations", "Wine pairing expertise"]
    },
    {
      icon: Heart,
      title: "Personalized Service",
      description: "Dedicated wedding coordination ensuring every detail reflects your unique love story and vision.",
      features: ["Personal wedding coordinator", "Custom décor planning", "Timeline management", "Day-of coordination"]
    },
    {
      icon: Camera,
      title: "Stunning Photography",
      description: "Breathtaking backdrops and golden hour lighting create the perfect setting for your wedding photos.",
      features: ["Multiple photo locations", "Golden hour sessions", "Bridal party spaces", "Sunset ceremony timing"]
    },
    {
      icon: Sparkles,
      title: "Magical Atmosphere",
      description: "From sunset ceremonies to starlit receptions, we create an enchanting ambiance for your celebration.",
      features: ["Sunset ceremony views", "Ambient lighting design", "Tropical garden settings", "Ocean backdrop"]
    }
  ];

  return (
    <section id="experience" className="py-24 bg-gradient-to-b from-[#f7f4f1] to-cream-50 relative">
      {/* Diamond pattern overlay */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div className="h-full w-full" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%235F653C' fill-opacity='0.3' fill-rule='evenodd'%3E%3Cpath d='M20 20L0 0h20v20zM0 20l20 20V20H0z'/%3E%3C/g%3E%3C/svg%3E")`,
        }}></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <h2 
          className="text-3xl md:text-4xl text-olive-800 text-center mb-16 relative font-light italic"
          style={{ fontFamily: '"palatino-linotype", "Palatino Linotype", "Palatino", serif !important', fontStyle: 'italic !important' }}
        >
          <span className="inline-block relative" style={{ fontFamily: '"palatino-linotype", "Palatino Linotype", "Palatino", serif', fontStyle: 'italic' }}>
            The Complete Wedding Experience
            <span className="absolute -bottom-2 left-1/4 right-1/4 h-0.5 bg-olive-600"></span>
          </span>
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {experiences.map((experience, index) => (
            <div key={index} className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300 border border-olive-100 group">
              <div className="flex items-center mb-6">
                <div className="bg-olive-100 rounded-full p-3 mr-4 group-hover:bg-olive-200 transition-colors duration-300">
                  <experience.icon className="h-8 w-8 text-olive-600" />
                </div>
                <h3 className="text-xl text-olive-800 font-medium">{experience.title}</h3>
              </div>
              
              <p className="text-dark-600 mb-6 leading-relaxed">
                {experience.description}
              </p>
              
              <ul className="space-y-2">
                {experience.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-center text-dark-600">
                    <Check className="h-4 w-4 text-olive-600 mr-3 flex-shrink-0" />
                    <span className="text-sm">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Wedding Concierge Section Component
export const WeddingConciergeSection = ({ onScheduleTour }: { onScheduleTour: () => void }) => {
  return (
    <section id="concierge" className="py-24 bg-gradient-to-b from-cream-50 to-white relative">
      {/* Hexagonal pattern overlay */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div className="h-full w-full" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='56' height='56' viewBox='0 0 56 56' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M28 28L14 14h28l-14 14z' fill='%235F653C' fill-opacity='0.2' fill-rule='evenodd'/%3E%3C/svg%3E")`,
        }}></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto">
          <h2 
            className="text-3xl md:text-4xl text-olive-800 text-center mb-8 relative font-light italic"
            style={{ fontFamily: '"palatino-linotype", "Palatino Linotype", "Palatino", serif !important', fontStyle: 'italic !important' }}
          >
            <span className="inline-block relative" style={{ fontFamily: '"palatino-linotype", "Palatino Linotype", "Palatino", serif', fontStyle: 'italic' }}>
              Your Maui Wedding Concierge
              <span className="absolute -bottom-2 left-1/4 right-1/4 h-0.5 bg-olive-600"></span>
            </span>
          </h2>
          
          <p className="text-center text-dark-600 text-lg mb-12 leading-relaxed">
            Beyond our stunning venues, we unlock the very best of Maui for your celebration. Our deep island connections and three decades of relationships ensure your wedding extends far beyond our grounds.
          </p>
          
          <div className="bg-white rounded-xl shadow-lg p-8 border border-olive-100">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <div className="bg-[#fcfcfb] rounded-lg p-5 border border-olive-100">
                <div className="flex items-start mb-3">
                  <Building className="h-6 w-6 text-olive-600 mr-3 flex-shrink-0" />
                  <h3 className="text-olive-800 !font-normal">Premium Accommodations</h3>
                </div>
                <p className="text-dark-600 text-sm">
                  Exclusive rates and room blocks at Maui's finest resorts and hotels for your guests.
                </p>
              </div>
              
              <div className="bg-[#fcfcfb] rounded-lg p-5 border border-olive-100">
                <div className="flex items-start mb-3">
                  <Plane className="h-6 w-6 text-olive-600 mr-3 flex-shrink-0" />
                  <h3 className="text-olive-800 !font-normal">Adventure Experiences</h3>
                </div>
                <p className="text-dark-600 text-sm">
                  Curated activities from sunset sails to helicopter tours, creating unforgettable memories.
                </p>
              </div>
              
              <div className="bg-[#fcfcfb] rounded-lg p-5 border border-olive-100">
                <div className="flex items-start mb-3">
                  <Trophy className="h-6 w-6 text-olive-600 mr-3 flex-shrink-0" />
                  <h3 className="text-olive-800 !font-normal">Vendor Excellence</h3>
                </div>
                <p className="text-dark-600 text-sm">
                  Connections to Maui's most talented photographers, florists, and entertainment providers.
                </p>
              </div>
              
              <div className="bg-[#fcfcfb] rounded-lg p-5 border border-olive-100">
                <div className="flex items-start mb-3">
                  <PalmtreeIcon className="h-6 w-6 text-olive-600 mr-3 flex-shrink-0" />
                  <h3 className="text-olive-800 !font-normal">Island Connection</h3>
                </div>
                <p className="text-dark-600 text-sm">
                  Access to Maui's best vendors, exclusive experiences, and local expertise through our extensive network.
                </p>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row items-center justify-between p-5 bg-[#fcfcfb] rounded-lg border border-olive-100 force-gill-sans">
              <div className="text-dark-700 mb-4 sm:mb-0">
                <p className="!font-normal">Ready to meet your Wedding Concierge?</p>
                <p className="text-dark-600 text-sm mt-1">Book a tour today and begin your planning journey</p>
              </div>
              <button 
                onClick={onScheduleTour}
                className="bg-olive-600 hover:bg-olive-500 text-white px-5 py-2 rounded-full !font-normal transition-colors duration-300 shadow-md"
              >
                Schedule Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// Testimonial Section Component
export const TestimonialSection = () => {
  return (
    <section className="py-24 bg-gradient-to-b from-cream-50 to-white relative">
      {/* Dotted pattern overlay */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div className="h-full w-full" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%235F653C' fill-opacity='0.3' fill-rule='evenodd'%3E%3Ccircle cx='3' cy='3' r='3'/%3E%3Ccircle cx='13' cy='13' r='3'/%3E%3C/g%3E%3C/svg%3E")`,
        }}></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-30">
        <div className="max-w-3xl mx-auto text-center">
          <div className="text-6xl text-olive-600 mb-6">"</div>
          <p className="text-xl md:text-2xl text-dark-600 italic mb-10 leading-relaxed">
            Our wedding at The Plantation House exceeded every expectation. The sunset views were absolutely magical, the food was incredible, and their Wedding Concierge made everything effortless. From securing the perfect hotel rooms for our guests to coordinating our sunset sail party the day before, they handled everything with perfection.
          </p>
          <div className="flex items-center justify-center">
            <div className="h-16 w-16 rounded-full overflow-hidden mr-4 shadow-md border border-olive-100">
              <img 
                src="https://www.theplantationhouse.com/wp-content/uploads/2023/05/Photo-5.jpg"
                alt="Alexandra"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="text-left">
              <div className="font-medium text-olive-800 text-lg">Alexandra & Michael</div>
              <div className="text-dark-500">Married May 2024</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// Gallery Section Preview Component
export const GallerySectionPreview = () => {
  return (
    <section id="gallery-preview" className="py-24 bg-gradient-to-b from-cream-50 to-white relative">
      {/* Dotted pattern overlay */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div className="h-full w-full" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%235F653C' fill-opacity='0.3' fill-rule='evenodd'%3E%3Ccircle cx='3' cy='3' r='3'/%3E%3Ccircle cx='13' cy='13' r='3'/%3E%3C/g%3E%3C/svg%3E")`,
        }}></div>
      </div>
      

      
      <div className="container mx-auto px-4 relative z-10">
        <h2 className="text-3xl md:text-4xl text-olive-800 text-center mb-16 relative font-light italic"
          style={{ fontFamily: '"palatino-linotype", "Palatino Linotype", "Palatino", serif !important', fontStyle: 'italic !important' }}
        >
          <span className="inline-block relative" style={{ fontFamily: '"palatino-linotype", "Palatino Linotype", "Palatino", serif', fontStyle: 'italic' }}>
            Explore Our Wedding Gallery
            <span className="absolute -bottom-2 left-1/4 right-1/4 h-0.5 bg-olive-600"></span>
          </span>
        </h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="relative overflow-hidden rounded-lg shadow-md group border border-olive-100">
            <img 
              src="https://plantationhouseevents.com/app/default/assets/galleries/ad185545679d2dff5cbf9c2b0449937b.jpg" 
              alt="Molokai Lawn" 
              className="w-full h-64 object-cover transition-transform duration-1000 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-olive-800/70 via-olive-700/40 to-transparent flex flex-col justify-end p-4">
              <h3 className="text-white font-medium gill-sans-nova-book">Molokai Lawn</h3>
              <p className="text-white/90 text-sm gill-sans-nova-book">Oceanfront ceremonies with breathtaking views</p>
            </div>
          </div>
          
          <div className="relative overflow-hidden rounded-lg shadow-md group border border-olive-100">
            <img 
              src="https://res.cloudinary.com/dyokodjrm/image/upload/v1746415951/i-hRcx5kq-X3_vtrhqb.jpg" 
              alt="Grand Staircase" 
              className="w-full h-64 object-cover transition-transform duration-1000 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-olive-800/70 via-olive-700/40 to-transparent flex flex-col justify-end p-4">
              <h3 className="text-white font-medium gill-sans-nova-book">Grand Staircase</h3>
              <p className="text-white/90 text-sm gill-sans-nova-book">Elegant setting for memorable wedding moments</p>
            </div>
          </div>
          
          <div className="relative overflow-hidden rounded-lg shadow-md group border border-olive-100">
            <img 
              src="https://plantationhouseevents.com/app/default/assets/galleries/dbac0097bbe3d709b9c5243f8ca1919d.jpg" 
              alt="Lower Lawn" 
              className="w-full h-64 object-cover transition-transform duration-1000 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-olive-800/70 via-olive-700/40 to-transparent flex flex-col justify-end p-4">
              <h3 className="text-white font-medium gill-sans-nova-book">Lower Lawn</h3>
              <p className="text-white/90 text-sm gill-sans-nova-book">Intimate ceremonies with ocean backdrop</p>
            </div>
          </div>
          
          <div className="relative overflow-hidden rounded-lg shadow-md group border border-olive-100">
            <img 
              src="https://plantationhouseevents.com/app/default/assets/galleries/1b972638a4877d372bac0bb50a0146b2.jpg" 
              alt="Gourmet Cuisine" 
              className="w-full h-64 object-cover transition-transform duration-1000 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-olive-800/70 via-olive-700/40 to-transparent flex flex-col justify-end p-4">
              <h3 className="text-white font-medium gill-sans-nova-book">Culinary Excellence</h3>
              <p className="text-white/90 text-sm gill-sans-nova-book">Award-winning island-inspired cuisine</p>
            </div>
          </div>
        </div>
        
        <div className="text-center mt-12">
          <Link 
            href="/gallery"
            className="inline-flex items-center bg-olive-600 hover:bg-olive-500 text-white px-6 py-3 rounded-full transition-colors duration-300 transform hover:scale-105 shadow-md"
          >
            <Camera className="h-5 w-5 mr-2" />
            <span className="gill-sans-nova-book">View Full Gallery</span>
          </Link>
          <p className="text-dark-600 mt-4 text-sm gill-sans-nova-book">Explore all our stunning venues and past celebrations</p>
        </div>
      </div>
    </section>
  );
}; 