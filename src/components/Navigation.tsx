import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isClient, setIsClient] = useState(false);
  
  useEffect(() => {
    setIsClient(true);
    
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Prevent body scroll when mobile menu is open without jumping to top
  useEffect(() => {
    if (!isClient) return;
    
    if (isMobileMenuOpen) {
      const scrollY = window.scrollY;
      document.body.style.overflow = 'hidden';
      document.body.style.position = 'fixed';
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = '100%';
      
      return () => {
        document.body.style.overflow = '';
        document.body.style.position = '';
        document.body.style.top = '';
        document.body.style.width = '';
        window.scrollTo(0, scrollY);
      };
    }
  }, [isMobileMenuOpen, isClient]);

  // Close mobile menu on window resize to desktop size
  useEffect(() => {
    if (!isClient) return;
    
    const handleResize = () => {
      if (window.innerWidth >= 1024 && isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isMobileMenuOpen, isClient]);

  const handleMobileMenuClose = () => {
    setIsMobileMenuOpen(false);
  };

  const handleMobileNavClick = (href?: string, isHome: boolean = false) => {
    setIsMobileMenuOpen(false);
    
    if (!isClient) return;
    
    if (isHome) {
      // Handle home navigation - scroll to top
      if (window.location.pathname === '/') {
        // Already on home page, scroll to top
        setTimeout(() => {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }, 400);
      } else {
        // Navigate to home page
        window.location.href = '/';
      }
      return;
    }
    
    if (href && href.startsWith('/#')) {
      // Check if we're on the gallery page and need to navigate home first
      if (window.location.pathname !== '/') {
        window.location.href = href;
        return;
      }
      
      // Small delay to allow menu to close before scrolling
      setTimeout(() => {
        const elementId = href.substring(2); // Remove /#
        const element = document.getElementById(elementId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        } else {
          // Fallback: try to navigate to the URL
          window.location.hash = elementId;
        }
      }, 400);
    }
  };

  const handleLogoClick = (e: React.MouseEvent) => {
    if (!isClient) return;
    
    if (window.location.pathname === '/') {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };
  
  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white/95 backdrop-blur-sm shadow-md py-3' : 'backdrop-blur-sm py-5'
      }`}
      style={!isScrolled ? { backgroundColor: '#ffffff80' } : {}}
    >
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          <Link href="/" className={`z-50 relative transition-opacity duration-300 ${isMobileMenuOpen ? 'opacity-0 pointer-events-none' : 'opacity-100'}`} onClick={handleLogoClick}>
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
              href="/"
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
              href="/gallery" 
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
            className={`lg:hidden z-50 relative p-2 focus:outline-none focus:ring-2 focus:ring-olive-500 focus:ring-opacity-50 rounded-md transition-opacity duration-300 ${isMobileMenuOpen ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isMobileMenuOpen}
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
      <div 
        className={`fixed inset-0 z-40 transition-all duration-300 ease-in-out ${
          isMobileMenuOpen 
            ? 'opacity-100 visible' 
            : 'opacity-0 invisible pointer-events-none'
        }`}
        aria-hidden={!isMobileMenuOpen}
      >
        {/* Backdrop */}
        <div 
          className={`absolute inset-0 bg-black/40 transition-opacity duration-300 ${
            isMobileMenuOpen ? 'opacity-100' : 'opacity-0'
          }`}
          onClick={handleMobileMenuClose}
        />
        
                {/* Slide-in Menu Panel */}
        <div 
          className={`fixed top-0 right-0 h-screen w-full sm:w-80 bg-white shadow-2xl transform transition-transform duration-300 ease-in-out z-50 ${
            isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          {/* Menu Header */}
          <div className="flex items-center justify-between px-6 py-6 border-b border-gray-200">
            <img 
              src="https://res.cloudinary.com/dyokodjrm/image/upload/v1747203557/PH_Logo_Black_Horizontal_bu7ppb.webp" 
              alt="The Plantation House" 
              className="h-8"
            />
            <button 
              onClick={handleMobileMenuClose}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              aria-label="Close menu"
            >
              <X className="h-6 w-6 text-gray-600" />
            </button>
          </div>

          {/* Menu Content */}
          <div className="flex flex-col justify-center flex-1 px-8 py-12">
            <nav className="flex flex-col space-y-8">
              <Link 
                href="/"
                className="text-gray-800 text-xl font-medium py-4 hover:text-olive-600 transition-colors duration-200"
                onClick={(e) => {
                  e.preventDefault();
                  handleMobileNavClick(undefined, true);
                }}
              >
                Home
              </Link>
              
              <a 
                href="/#venues" 
                className="text-gray-800 text-xl font-medium py-4 hover:text-olive-600 transition-colors duration-200"
                onClick={(e) => {
                  e.preventDefault();
                  handleMobileNavClick('/#venues');
                }}
              >
                Venues
              </a>
              
              <a 
                href="/#experience" 
                className="text-gray-800 text-xl font-medium py-4 hover:text-olive-600 transition-colors duration-200"
                onClick={(e) => {
                  e.preventDefault();
                  handleMobileNavClick('/#experience');
                }}
              >
                Experience
              </a>
              
              <a 
                href="https://www.theplantationhouse.com/" 
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-800 text-xl font-medium py-4 hover:text-olive-600 transition-colors duration-200"
                onClick={() => handleMobileNavClick()}
              >
                Cuisine
              </a>
              
              <Link 
                href="/gallery" 
                className="text-gray-800 text-xl font-medium py-4 hover:text-olive-600 transition-colors duration-200"
                onClick={() => handleMobileNavClick()}
              >
                Gallery
              </Link>
              
              <a 
                href="/#concierge" 
                className="text-gray-800 text-xl font-medium py-4 hover:text-olive-600 transition-colors duration-200"
                onClick={(e) => {
                  e.preventDefault();
                  handleMobileNavClick('/#concierge');
                }}
              >
                Concierge
              </a>
              
              <a 
                href="/#contact" 
                className="text-gray-800 text-xl font-medium py-4 hover:text-olive-600 transition-colors duration-200"
                onClick={(e) => {
                  e.preventDefault();
                  handleMobileNavClick('/#contact');
                }}
              >
                Contact
              </a>
            </nav>
            
            <div className="mt-12">
              <button 
                className="w-full bg-olive-600 hover:bg-olive-700 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-colors duration-200"
                onClick={() => {
                  handleMobileNavClick();
                  setTimeout(() => {
                    document.getElementById('schedule-button')?.click();
                  }, 300);
                }}
              >
                Schedule a Tour
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation; 