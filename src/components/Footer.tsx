import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail, Heart, ChevronRight } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-cream-50 text-dark-700 pt-16 pb-8 border-t border-olive-200">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          <div>
            <div className="mb-6">
              <div className="inline-block bg-cream-50 p-2 rounded">
                <img 
                  src="https://www.theplantationhouse.com/wp-content/uploads/2023/05/PH_Logo_Butterfly-retina-1-400x65.png" 
                  alt="The Plantation House" 
                  className="h-12 mb-2 brightness-0"
                  style={{ filter: 'brightness(0)' }}
                />
              </div>
            </div>
            <p className="text-dark-500 mb-6">
              West Maui's premier wedding venue with breathtaking ocean views, exceptional service, and a dedicated Wedding Concierge team.
            </p>
            <div className="flex items-center space-x-4">
              <a href="https://www.facebook.com/ThePlantationHouse" className="text-olive-600 hover:text-olive-500 transition-colors">
                Facebook
              </a>
              <a href="https://www.instagram.com/plantationhouse/" className="text-olive-600 hover:text-olive-500 transition-colors">
                Instagram
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-xl mb-4 text-olive-800 font-light">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-dark-500 hover:text-olive-600 transition-colors">Home</Link>
              </li>
              <li>
                <a href="#venues" className="text-dark-500 hover:text-olive-600 transition-colors">Venues</a>
              </li>
              <li>
                <Link to="/gallery" className="text-dark-500 hover:text-olive-600 transition-colors">Gallery</Link>
              </li>
              <li>
                <a href="#experience" className="text-dark-500 hover:text-olive-600 transition-colors">Experience</a>
              </li>
              <li>
                <a href="#contact" className="text-dark-500 hover:text-olive-600 transition-colors">Contact</a>
              </li>
              <li>
                <a href="/privacy" className="text-dark-500 hover:text-olive-600 transition-colors">Privacy Policy</a>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-xl mb-4 text-olive-800 font-light">Contact Info</h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <MapPin className="h-5 w-5 text-olive-600 mt-0.5 mr-3 flex-shrink-0" />
                <span className="text-dark-500">2000 Plantation Club Drive<br />Kapalua, Maui, Hawaii 96761</span>
              </li>
              <li className="flex items-center">
                <Phone className="h-5 w-5 text-olive-600 mr-3 flex-shrink-0" />
                <a href="tel:+18086696299" className="text-dark-500 hover:text-olive-600 transition-colors">(808) 669-6299</a>
              </li>
              <li className="flex items-center">
                <Mail className="h-5 w-5 text-olive-600 mr-3 flex-shrink-0" />
                <a href="mailto:events@plantationhouse.com" className="text-dark-500 hover:text-olive-600 transition-colors">events@plantationhouse.com</a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-olive-200 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-dark-400 text-sm mb-4 md:mb-0">
            © {new Date().getFullYear()} The Plantation House. All rights reserved.
          </p>

        </div>
      </div>
    </footer>
  );
};

export default Footer; 