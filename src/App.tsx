import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
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
  Trophy,
  GolfIcon
} from 'lucide-react';
import GalleryPage from './GalleryPage';

// Import extracted components
import ScrollToTop from './components/ScrollToTop';
import BookingModal from './components/BookingModal';
import Navigation from './components/Navigation';
import HeroSection from './components/HeroSection';
import Footer from './components/Footer';
import FloatingCTA from './components/FloatingCTA';
import ContactSection from './components/ContactSection';

// Introduction Section Component
const IntroductionSection = () => {
  return (
    <section className="py-20 bg-gradient-to-b from-cream-50 via-white to-cream-100 relative">
      {/* Decorative pattern overlay */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div className="h-full w-full" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%235F653C' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2V6h4V4H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl text-olive-800 mb-8 relative font-light">
            <span className="inline-block relative">
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
const TrustedVenueSection = () => {
  return (
    <section className="py-24 bg-cream-50 relative">
      {/* Leaf pattern overlay */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div className="h-full w-full" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM50 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z' fill='%235F653C' fill-opacity='0.1' fill-rule='evenodd'/%3E%3C/svg%3E")`,
          backgroundSize: "100px 100px"
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
const WeddingSpacesSection = () => {
  const spaces = [
    {
      id: 'molokai-lawn',
      name: 'Molokai Lawn',
      description: 'Our signature outdoor space offering panoramic ocean views and breathtaking Maui sunsets, perfect for ceremonies and receptions up to 500 guests. This is our most popular venue choice, creating unforgettable moments as you exchange vows with the Pacific Ocean as your backdrop.',
      image: 'https://res.cloudinary.com/dyokodjrm/image/upload/v1746415605/The_scenic_golf_course_at_The_Plantation_House_provides_the_perfect_backdrop_to_complement_your_Maui_adventures._qukovi.webp',
      capacity: 500,
    },
    {
      id: 'lower-lawn',
      name: 'Lower Lawn',
      description: 'A more intimate oceanfront setting ideal for ceremonies up to 100 guests. This secluded space offers a sense of privacy while still showcasing the spectacular ocean views that make The Plantation House famous. Perfect for couples desiring an exclusive outdoor experience.',
      image: 'https://www.theplantationhouse.com/wp-content/uploads/2023/05/Photo-9.jpg',
      capacity: 100,
    },
    {
      id: 'grand-staircase',
      name: 'Grand Staircase',
      description: 'Our iconic grand staircase offers a majestic setting for memorable wedding moments, perfect for elegant ceremonies and stunning photo opportunities. The cascading steps create a dramatic entrance for the bride and provide an unforgettable backdrop for your special day.',
      image: 'https://res.cloudinary.com/dyokodjrm/image/upload/v1746415951/i-hRcx5kq-X3_vtrhqb.jpg',
      capacity: 120,
    },
    {
      id: 'ohana-room',
      name: 'Ohana Room',
      description: 'An elegant indoor space with glass-paneled doors opening to golf course views, accommodating up to 80 guests. This versatile venue offers air-conditioned comfort with panoramic vistas, making it perfect for intimate receptions or as a sophisticated backup for outdoor events.',
      image: 'https://www.theplantationhouse.com/wp-content/uploads/2023/05/Photo-8.jpg',
      capacity: 80,
    },
  ];

  const [activeSpace, setActiveSpace] = useState(spaces[0]);

  return (
    <section id="venues" className="py-24 bg-gradient-to-b from-white to-cream-100 relative">
      {/* Triangular pattern overlay */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div className="h-full w-full" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='36' height='72' viewBox='0 0 36 72'%3E%3Cg fill-rule='evenodd'%3E%3Cg fill='%235F653C' fill-opacity='0.2'%3E%3Cpath d='M2 6h12L8 18 2 6zm18 36h12l-6 12-6-12z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <h2 className="text-3xl md:text-4xl text-olive-800 text-center mb-16 relative font-light">
          <span className="inline-block relative">
            Our Exclusive Wedding Venues
            <span className="absolute -bottom-2 left-1/4 right-1/4 h-0.5 bg-olive-600"></span>
          </span>
        </h2>
        
        <div className="flex flex-col lg:flex-row gap-12">
          <div className="lg:w-1/2">
            <div className="relative rounded-xl overflow-hidden h-96 lg:h-[600px] shadow-xl transition-all duration-700 group border border-olive-100">
              <img 
                src={activeSpace.image} 
                alt={activeSpace.name} 
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-olive-800/60 via-olive-700/30 to-transparent flex flex-col justify-end p-8 transition-all duration-300">
                <h3 className="text-white text-2xl font-medium mb-2">{activeSpace.name}</h3>
                <p className="text-white/90 mb-4">{activeSpace.description}</p>
                <div className="flex items-center text-white/90 mb-2">
                  <Users className="h-4 w-4 mr-2 text-cream-50" />
                  <span>Up to {activeSpace.capacity} guests</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="lg:w-1/2">
            <div className="space-y-4">
              {spaces.map((space) => (
                <div 
                  key={space.id}
                  className={`p-5 rounded-lg cursor-pointer transition-all duration-300 ${activeSpace.id === space.id ? 'bg-cream-100 border-l-4 border-olive-600 shadow-md' : 'hover:bg-cream-50 hover:shadow-sm'}`}
                  onClick={() => setActiveSpace(space)}
                >
                  <div className="flex justify-between items-center">
                    <h4 className={`font-medium text-lg transition-colors duration-300 ${activeSpace.id === space.id ? 'text-olive-800' : 'text-dark-600'}`}>{space.name}</h4>
                    <ChevronRight className={`h-5 w-5 transition-transform duration-300 ${activeSpace.id === space.id ? 'rotate-90 text-olive-600' : 'text-dark-400'}`} />
                  </div>
                  {activeSpace.id === space.id && (
                    <p className="mt-2 text-dark-600 animate-fade-in">
                      {space.description.split('.')[0]}.
                    </p>
                  )}
                </div>
              ))}
            </div>
            
            <div className="mt-10 bg-olive-50 p-6 rounded-lg w-full border border-olive-100">
              <h4 className="text-olive-800 font-medium text-xl mb-4">Why Our Venues Stand Apart</h4>
              <div className="space-y-3">
                {[
                  "All venues are part of our iconic property - no need for multiple location coordination",
                  "Backup options for every outdoor space in case of weather changes",
                  "Exclusive use of selected venues for complete privacy",
                  "Photography-optimized settings with perfect lighting throughout the day",
                  "Seamless transitions between ceremony, cocktail hour, and reception spaces"
                ].map((item, index) => (
                  <div key={index} className="flex items-start group">
                    <Check className="h-5 w-5 text-olive-600 mr-3 mt-1 flex-shrink-0 transition-colors duration-300 group-hover:text-olive-500" />
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

// Experience Section Component
const ExperienceSection = () => {
  const experiences = [
    {
      icon: <Utensils className="h-8 w-8 text-olive-600 group-hover:text-olive-500 transition-colors duration-300" />,
      title: "Island-Inspired Culinary Excellence",
      description: "Our award-winning chefs create customized menus featuring locally-sourced ingredients that showcase Hawaii's unique flavors."
    },
    {
      icon: <PalmtreeIcon className="h-8 w-8 text-olive-500 group-hover:text-olive-400 transition-colors duration-300" />,
      title: "West Maui's Premier Location",
      description: "As a beloved island institution since 1991, we offer unmatched connections to Maui's best vendors and services."
    },
    {
      icon: <Camera className="h-8 w-8 text-olive-500 group-hover:text-olive-400 transition-colors duration-300" />,
      title: "Instagram-Worthy Backdrops",
      description: "Every corner of our venue is designed to create breathtaking photo opportunities from sunrise to sunset."
    },
    {
      icon: <Heart className="h-8 w-8 text-olive-500 group-hover:text-olive-400 transition-colors duration-300" />,
      title: "Comprehensive Wedding Concierge",
      description: "Our dedicated team handles everything from vendor coordination to guest transportation and accommodations."
    }
  ];

  return (
    <section id="experience" className="py-24 bg-gradient-radial from-white to-cream-100 relative">
      {/* Wave pattern overlay */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div className="h-full w-full" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='20' viewBox='0 0 100 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M21.184 20c.357-.13.72-.264.888-.14 1.055.793 1.603 1.257 1.656.233.231-.91-.562-1.518-1.424-2.226-.872-.707-1.75-1.412-2.628-2.12L2.792 0 0 3.294l2.02 1.621 5.877 4.72-.708.708L8 9.13l-.708.708-1.412.007.808-.807-3.34-2.69-.708.708-1.412 1.412 2.82 2.26.42-.422 2.84-2.125.565.566.572-.572 1.412 1.411-1.412 1.412-.571-.571-2.126 2.126L0 16.27l.808.808L0 18.9l1.414-1.413L0 19.314v.687h.02L0 21h4.2l3.54-3.54L10.414 14l1.413-1.414-1.413-1.414-2.12-2.122 2.12-2.12-1.413-1.415-2.121 2.122-2.122-2.122L2.121 7.071l2.121 2.122 2.122-2.122 1.414 1.414-2.121 2.121 2.12 2.121 2.122-2.12 2.12 2.12 2.122-2.12 2.121 2.12 2.121-2.12 2.121 2.12 1.414-1.413-2.12-2.12 2.12-2.123 4.243 4.242 2.121-2.12 1.414 1.413 2.121-2.12-1.414-1.415-2.12 2.121-2.121-2.12-2.121 2.12L18.363 7.9l-2.121 2.121-1.414-1.414L9.071 3.35l-4.95 4.95-1.414-1.413 4.95-4.95L2.121 6.364 3.536 7.78l2.12-2.122 1.415 1.414-2.121 2.121 2.12 2.121 2.122-2.12 2.12 2.12 2.122-2.12 2.12 2.12 4.243-4.242-2.121-2.122 2.121-2.121L21.78 1.818l-5.657 5.656-1.414-1.414 5.657-5.656-2.121-2.122-2.829 2.83-1.414-1.414 2.829-2.83-2.121-2.12L6.364 2.121 4.95.707l4.242-4.243L21.779 9.05l1.407-1.407L24.592 9.05 21.184 20z' fill='%235F653C' fill-opacity='0.1' fill-rule='evenodd'/%3E%3C/svg%3E")`,
        }}></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <h2 className="text-3xl md:text-4xl text-olive-800 text-center mb-16 relative font-light">
          <span className="inline-block relative">
            The Plantation House Experience
            <span className="absolute -bottom-2 left-1/4 right-1/4 h-0.5 bg-olive-600"></span>
          </span>
        </h2>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {experiences.map((item, index) => (
            <div key={index} className="group bg-olive-50 p-8 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-102 hover:translate-y-[-4px] border border-olive-100">
              <div className="flex justify-center mb-4">
                {item.icon}
              </div>
              <h3 className="text-xl text-center font-medium text-olive-800 mb-3 group-hover:text-olive-700 transition-colors duration-300">{item.title}</h3>
              <p className="text-center text-dark-600">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Wedding Concierge Section
const WeddingConciergeSection = ({ onScheduleTour }: { onScheduleTour: () => void }) => {
  return (
    <section id="concierge" className="py-24 bg-gradient-to-br from-cream-50 via-white to-cream-100 relative overflow-hidden">
      {/* Diamond pattern overlay */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div className="h-full w-full" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='48' height='64' viewBox='0 0 48 64' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%235F653C' fill-opacity='0.15'%3E%3Cpath d='M12 0h18v6h6v6h6v18h-6v6h-6v6H12v-6H6v-6H0V12h6V6h6V0zm12 6h-6v6h-6v6H6v6h6v6h6v6h6v-6h6v-6h6v-6h-6v-6h-6V6zm-6 12h6v6h-6v-6zm24 24h6v6h-6v-6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col lg:flex-row bg-white backdrop-blur-sm rounded-xl overflow-hidden shadow-lg border border-olive-100">
            <div className="lg:w-2/5 h-96 lg:h-auto overflow-hidden">
              <img 
                src="https://www.theplantationhouse.com/wp-content/uploads/2023/05/Photo-8.jpg"
                alt="Wedding Concierge Service"
                className="w-full h-full object-cover object-center"
              />
            </div>
            
            <div className="lg:w-3/5 p-8 lg:p-12">
              <h2 className="text-3xl md:text-4xl text-olive-800 mb-6 relative font-light">
                <span className="inline-block relative">
                  Your Personal Wedding Concierge
                  <span className="absolute -bottom-2 left-0 right-1/2 h-0.5 bg-olive-600"></span>
                </span>
              </h2>
              
              <p className="text-dark-600 text-lg mb-8">
                When you choose The Plantation House, you don't just get a venue - you gain a dedicated Wedding Concierge who leverages our 30+ years as a West Maui institution to create your perfect celebration. Our deep island connections mean unparalleled service for you and your guests.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
                <div className="bg-cream-50 rounded-lg p-5 border border-olive-100">
                  <div className="flex items-start mb-3">
                    <Building className="h-6 w-6 text-olive-600 mr-3 flex-shrink-0" />
                    <h3 className="text-olive-800 font-medium">Venue Coordination</h3>
                  </div>
                  <p className="text-dark-600 text-sm">
                    Seamless management of all venue spaces, setup coordination, and weather contingency planning.
                  </p>
                </div>
                
                <div className="bg-cream-50 rounded-lg p-5 border border-olive-100">
                  <div className="flex items-start mb-3">
                    <Plane className="h-6 w-6 text-olive-600 mr-3 flex-shrink-0" />
                    <h3 className="text-olive-800 font-medium">Guest Services</h3>
                  </div>
                  <p className="text-dark-600 text-sm">
                    Hotel room blocks, transportation arrangement, and local activity recommendations for all guests.
                  </p>
                </div>
                
                <div className="bg-cream-50 rounded-lg p-5 border border-olive-100">
                  <div className="flex items-start mb-3">
                    <CalendarClock className="h-6 w-6 text-olive-600 mr-3 flex-shrink-0" />
                    <h3 className="text-olive-800 font-medium">Event Timeline</h3>
                  </div>
                  <p className="text-dark-600 text-sm">
                    Detailed planning of your entire wedding day and coordination with all vendors.
                  </p>
                </div>
                
                <div className="bg-cream-50 rounded-lg p-5 border border-olive-100">
                  <div className="flex items-start mb-3">
                    <PalmtreeIcon className="h-6 w-6 text-olive-600 mr-3 flex-shrink-0" />
                    <h3 className="text-olive-800 font-medium">Island Connection</h3>
                  </div>
                  <p className="text-dark-600 text-sm">
                    Access to Maui's best vendors, exclusive experiences, and local expertise through our extensive network.
                  </p>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row items-center justify-between p-5 bg-olive-50 rounded-lg border border-olive-100">
                <div className="text-dark-700 mb-4 sm:mb-0">
                  <p className="font-medium">Ready to meet your Wedding Concierge?</p>
                  <p className="text-dark-600 text-sm mt-1">Book a tour today and begin your planning journey</p>
                </div>
                <button 
                  onClick={onScheduleTour}
                  className="bg-olive-600 hover:bg-olive-500 text-white px-5 py-2 rounded-full font-medium transition-colors duration-300 shadow-md"
                >
                  Schedule Now
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// Testimonial Section Component
const TestimonialSection = () => {
  return (
    <section className="py-24 bg-cream-50 relative">
      {/* Background image with texture overlay */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-white/90 via-cream-50/90 to-white/90 z-10"></div>
        <img
          src="https://www.theplantationhouse.com/wp-content/uploads/2023/05/Photo-1.jpg"
          alt="Background"
          className="w-full h-full object-cover"
          style={{ opacity: 0.15 }}
        />
        {/* Noise texture overlay */}
        <div className="absolute inset-0 z-20 opacity-30" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          mixBlendMode: 'overlay'
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
      
      {/* Decorative elements */}
      <div className="absolute bottom-0 left-0 w-40 h-40 bg-olive-600/10 rounded-full -mb-20 -ml-20 z-10"></div>
      <div className="absolute top-0 right-0 w-60 h-60 bg-olive-600/10 rounded-full -mt-20 -mr-20 z-10"></div>
    </section>
  );
};

// Gallery Section Preview Component
const GallerySectionPreview = () => {
  return (
    <section id="gallery-preview" className="py-24 bg-gradient-to-b from-cream-50 to-white relative">
      {/* Dotted pattern overlay */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div className="h-full w-full" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%235F653C' fill-opacity='0.3' fill-rule='evenodd'%3E%3Ccircle cx='3' cy='3' r='3'/%3E%3Ccircle cx='13' cy='13' r='3'/%3E%3C/g%3E%3C/svg%3E")`,
        }}></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <h2 className="text-3xl md:text-4xl text-olive-800 text-center mb-16 relative font-light">
          <span className="inline-block relative">
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
              <h3 className="text-white font-medium">Molokai Lawn</h3>
              <p className="text-white/90 text-sm">Oceanfront ceremonies with breathtaking views</p>
            </div>
          </div>
          
          <div className="relative overflow-hidden rounded-lg shadow-md group border border-olive-100">
            <img 
              src="https://res.cloudinary.com/dyokodjrm/image/upload/v1746415951/i-hRcx5kq-X3_vtrhqb.jpg" 
              alt="Grand Staircase" 
              className="w-full h-64 object-cover transition-transform duration-1000 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-olive-800/70 via-olive-700/40 to-transparent flex flex-col justify-end p-4">
              <h3 className="text-white font-medium">Grand Staircase</h3>
              <p className="text-white/90 text-sm">Elegant setting for memorable wedding moments</p>
            </div>
          </div>
          
          <div className="relative overflow-hidden rounded-lg shadow-md group border border-olive-100">
            <img 
              src="https://plantationhouseevents.com/app/default/assets/galleries/dbac0097bbe3d709b9c5243f8ca1919d.jpg" 
              alt="Lower Lawn" 
              className="w-full h-64 object-cover transition-transform duration-1000 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-olive-800/70 via-olive-700/40 to-transparent flex flex-col justify-end p-4">
              <h3 className="text-white font-medium">Lower Lawn</h3>
              <p className="text-white/90 text-sm">Intimate ceremonies with ocean backdrop</p>
            </div>
          </div>
          
          <div className="relative overflow-hidden rounded-lg shadow-md group border border-olive-100">
            <img 
              src="https://plantationhouseevents.com/app/default/assets/galleries/1b972638a4877d372bac0bb50a0146b2.jpg" 
              alt="Gourmet Cuisine" 
              className="w-full h-64 object-cover transition-transform duration-1000 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-olive-800/70 via-olive-700/40 to-transparent flex flex-col justify-end p-4">
              <h3 className="text-white font-medium">Culinary Excellence</h3>
              <p className="text-white/90 text-sm">Award-winning island-inspired cuisine</p>
            </div>
          </div>
        </div>
        
        <div className="text-center mt-12">
          <Link 
            to="/gallery"
            className="inline-flex items-center bg-olive-600 hover:bg-olive-500 text-white px-6 py-3 rounded-full transition-colors duration-300 transform hover:scale-105 shadow-md"
          >
            <Camera className="h-5 w-5 mr-2" />
            <span>View Full Gallery</span>
          </Link>
          <p className="text-dark-600 mt-4 text-sm">Explore all our stunning venues and past celebrations</p>
        </div>
      </div>
    </section>
  );
};

// HomePage Component 
const HomePage = ({ onScheduleTour }: { onScheduleTour: () => void }) => {
  return (
    <div className="bg-white">
      <Navigation />
      <HeroSection onScheduleTour={onScheduleTour} />
      <IntroductionSection />
      <TrustedVenueSection />
      <WeddingSpacesSection />
      <ExperienceSection />
      <GallerySectionPreview />
      <WeddingConciergeSection onScheduleTour={onScheduleTour} />
      <TestimonialSection />
      <ContactSection />
      <Footer />
      <FloatingCTA onScheduleTour={onScheduleTour} />
    </div>
  );
};

// App Component
function App() {
  const [showBookingModal, setShowBookingModal] = useState(false);
  
  const handleScheduleTour = () => {
    setShowBookingModal(true);
  };
  
  return (
    <Router>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<HomePage onScheduleTour={handleScheduleTour} />} />
        <Route path="/gallery" element={<GalleryPage />} />
      </Routes>
      <BookingModal 
        isOpen={showBookingModal} 
        onClose={() => setShowBookingModal(false)} 
      />
    </Router>
  );
}

export default App;