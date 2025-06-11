import React from 'react';
import { ChevronDown } from 'lucide-react';

const HeroSection = ({ onScheduleTour }: { onScheduleTour: () => void }) => {
  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-black/20 z-10"></div>
        <img
          src="https://www.theplantationhouse.com/wp-content/uploads/2023/05/Photo-6-1.jpg"
          alt="The Plantation House - Maui Wedding Venue"
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-20000 ease-in-out animate-subtle-zoom"
        />
      </div>
      <div className="container mx-auto px-4 z-10 text-center">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-light text-white leading-tight mb-6 animate-fade-in italic"
          style={{ fontFamily: '"palatino-linotype", "Palatino Linotype", "Palatino", serif !important', fontStyle: 'italic !important' }}
        >
          <span style={{ fontFamily: '"palatino-linotype", "Palatino Linotype", "Palatino", serif', fontStyle: 'italic' }}>
            Your Dream Maui Wedding in One Perfect Place
          </span>
        </h1>
        <p className="text-xl md:text-3xl text-white max-w-5xl mx-auto mb-10 animate-fade-in-delay italic">
          Where breathtaking ocean views, iconic island hospitality, and our legendary wedding concierge service create the celebration you've always imagined
        </p>
        <button 
          id="schedule-button"
          onClick={onScheduleTour}
          className="bg-olive-600 hover:bg-olive-500 text-white px-8 py-3 rounded-full font-medium text-lg transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-105 animate-fade-in-delay-2"
        >
          Tell Us About Your Dream Wedding
        </button>
      </div>
      <div className="absolute bottom-10 left-0 right-0 flex justify-center z-10 animate-bounce">
        <ChevronDown className="text-olive-700 h-8 w-8" />
      </div>
    </section>
  );
};

export default HeroSection; 