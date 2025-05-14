import React, { useState, useEffect } from 'react';
import { Calendar, Phone, X } from 'lucide-react';

const FloatingCTA = ({ onScheduleTour }: { onScheduleTour: () => void }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  
  const handleScroll = () => {
    // Show after scrolling 300px
    if (window.scrollY > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };
  
  const scrollToContact = () => {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
    setIsExpanded(false);
  };
  
  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  
  return (
    <>
      {/* Toggle Button */}
      <button 
        onClick={() => setIsExpanded(!isExpanded)}
        className={`fixed bottom-6 right-6 z-40 bg-olive-600 hover:bg-olive-500 text-white w-14 h-14 rounded-full shadow-lg flex items-center justify-center transition-all duration-500 transform ${
          isVisible ? 'translate-x-0 opacity-100' : 'translate-x-20 opacity-0'
        } ${isExpanded ? 'scale-0' : 'scale-100'}`}
      >
        <Calendar className="h-6 w-6" />
      </button>
      
      {/* Expanded CTA Panel */}
      <div 
        className={`fixed right-0 bottom-0 top-0 z-50 bg-white shadow-xl border-l border-olive-100 w-full max-w-md transform transition-transform duration-500 ease-in-out ${
          isExpanded ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="h-full flex flex-col p-6 overflow-y-auto bg-gradient-to-b from-cream-50 to-white">
          <div className="flex justify-between items-center mb-8 border-b border-olive-100 pb-4">
            <h3 className="text-2xl font-light text-olive-800">Plan Your Visit</h3>
            <button 
              onClick={() => setIsExpanded(false)}
              className="text-dark-500 hover:text-olive-600 transition-colors"
            >
              <X className="h-6 w-6" />
            </button>
          </div>
          
          <div className="flex-1">
            <div className="mb-8">
              <img 
                src="https://res.cloudinary.com/dyokodjrm/image/upload/v1747203557/PH_Logo_Black_Horizontal_bu7ppb.webp" 
                alt="The Plantation House" 
                className="h-10 mb-4 mx-auto"
                style={{ filter: 'brightness(0)' }}
              />
              <p className="text-center text-dark-600 mb-4">
                Discover the perfect Maui wedding venue with panoramic ocean views and exceptional service
              </p>
            </div>
            
            <div className="space-y-4 mb-8">
              <div className="bg-cream-50 p-5 rounded-lg border border-olive-100">
                <h4 className="text-olive-800 font-medium mb-2">Schedule a Tour</h4>
                <p className="text-dark-600 text-sm mb-4">
                  Experience our stunning venues in person and start planning your dream Maui wedding
                </p>
                <button 
                  onClick={() => {
                    onScheduleTour();
                    setIsExpanded(false);
                  }}
                  className="w-full bg-olive-600 hover:bg-olive-500 text-white px-4 py-3 rounded-lg font-medium transition-colors duration-300"
                >
                  <Calendar className="h-5 w-5 mr-2 inline-block" />
                  <span>Schedule Your Tour</span>
                </button>
              </div>
              
              <div className="bg-cream-50 p-5 rounded-lg border border-olive-100">
                <h4 className="text-olive-800 font-medium mb-2">Have Questions?</h4>
                <p className="text-dark-600 text-sm mb-4">
                  Our dedicated team is ready to assist with any questions about our venue and services
                </p>
                <button 
                  onClick={scrollToContact}
                  className="w-full bg-white hover:bg-cream-100 border border-olive-200 text-dark-600 px-4 py-3 rounded-lg font-medium transition-colors duration-300"
                >
                  <Phone className="h-5 w-5 mr-2 inline-block text-olive-600" />
                  <span>Contact Us</span>
                </button>
              </div>
            </div>
          </div>
          
          <div className="text-center text-dark-500 text-sm">
            <p>We can't wait to help you create unforgettable wedding memories in paradise</p>
          </div>
        </div>
      </div>
      
      {/* Overlay */}
      {isExpanded && (
        <div 
          className="fixed inset-0 bg-dark-800/30 z-40 transition-opacity duration-500"
          onClick={() => setIsExpanded(false)}
        ></div>
      )}
    </>
  );
};

export default FloatingCTA; 