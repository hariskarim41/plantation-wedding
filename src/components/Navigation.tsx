import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-white/95 backdrop-blur-sm shadow-md py-3' : 'bg-white/20 backdrop-blur-sm py-5'}`}>
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          <Link to="/" className="z-50">
            <div className="px-2 py-1">
              <img 
                src="https://res.cloudinary.com/dyokodjrm/image/upload/v1747203557/PH_Logo_Black_Horizontal_bu7ppb.webp" 
                alt="The Plantation House" 
                className={`h-10 md:h-12 transition-opacity duration-300 ${isScrolled ? 'opacity-100 brightness-0' : 'opacity-90 hover:opacity-100 filter-none'}`}
                style={{ filter: isScrolled ? 'brightness(0)' : 'none' }}
              />
            </div>
          </Link>
          
          <div className="hidden lg:flex items-center space-x-8">
            <Link 
              to="/"
              className="relative font-bold text-lg transition-colors duration-300 group text-olive-800 hover:text-olive-600"
            >
              <span>Home</span>
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-olive-500 transition-all duration-300 group-hover:w-full"></span>
            </Link>
            {['Venues', 'Experience'].map((item) => (
              <a 
                key={item} 
                href={`/#${item.toLowerCase().replace(/\s+/g, '-')}`} 
                className="relative font-bold text-lg transition-colors duration-300 group text-olive-800 hover:text-olive-600"
              >
                <span>{item}</span>
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-olive-500 transition-all duration-300 group-hover:w-full"></span>
              </a>
            ))}
            <a 
              href="https://www.theplantationhouse.com/" 
              target="_blank"
              rel="noopener noreferrer"
              className="relative font-bold text-lg transition-colors duration-300 group text-olive-800 hover:text-olive-600"
            >
              <span>Cuisine</span>
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-olive-500 transition-all duration-300 group-hover:w-full"></span>
            </a>
            <Link 
              to="/gallery" 
              className="relative font-bold text-lg transition-colors duration-300 group text-olive-800 hover:text-olive-600"
            >
              <span>Gallery</span>
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-olive-500 transition-all duration-300 group-hover:w-full"></span>
            </Link>
            {['Concierge', 'Contact'].map((item) => (
              <a 
                key={item} 
                href={`/#${item.toLowerCase().replace(/\s+/g, '-')}`} 
                className="relative font-bold text-lg transition-colors duration-300 group text-olive-800 hover:text-olive-600"
              >
                <span>{item}</span>
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-olive-500 transition-all duration-300 group-hover:w-full"></span>
              </a>
            ))}
            <button 
              onClick={() => document.getElementById('schedule-button')?.click()}
              className="bg-olive-600 hover:bg-olive-500 text-white px-6 py-3 rounded-full font-bold text-lg transition-colors duration-300 transform hover:scale-105 shadow-md hover:shadow-lg"
            >
              Schedule a Tour
            </button>
          </div>
          
          <button 
            className="lg:hidden z-50 p-2 focus:outline-none"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? (
              <X className="h-7 w-7 text-olive-800" />
            ) : (
              <Menu className="h-7 w-7 text-olive-800" />
            )}
          </button>
        </div>
      </div>
      
      {/* Mobile Menu */}
      <div className={`fixed inset-0 bg-white/95 flex flex-col items-center justify-center transition-all duration-300 ${isMobileMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`}>
        <div className="flex flex-col items-center space-y-6">
          <Link 
            to="/"
            className="text-olive-800 text-2xl font-bold transition-colors hover:text-olive-600"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Home
          </Link>
          {['Venues', 'Experience'].map((item) => (
            <a 
              key={item} 
              href={`/#${item.toLowerCase().replace(/\s+/g, '-')}`} 
              className="text-olive-800 text-2xl font-bold transition-colors hover:text-olive-600"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {item}
            </a>
          ))}
          <a 
            href="https://www.theplantationhouse.com/" 
            target="_blank"
            rel="noopener noreferrer"
            className="text-olive-800 text-2xl font-bold transition-colors hover:text-olive-600"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Cuisine
          </a>
          <Link 
            to="/gallery" 
            className="text-olive-800 text-2xl font-bold transition-colors hover:text-olive-600"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Gallery
          </Link>
          {['Concierge', 'Contact'].map((item) => (
            <a 
              key={item} 
              href={`/#${item.toLowerCase().replace(/\s+/g, '-')}`} 
              className="text-olive-800 text-2xl font-bold transition-colors hover:text-olive-600"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {item}
            </a>
          ))}
          <button 
            className="mt-4 bg-olive-600 hover:bg-olive-500 text-white px-7 py-4 rounded-full font-bold text-xl transition-all duration-300 transform hover:scale-105"
            onClick={() => {
              setIsMobileMenuOpen(false);
              document.getElementById('schedule-button')?.click();
            }}
          >
            Schedule a Tour
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navigation; 