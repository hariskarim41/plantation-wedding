import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate, useLocation } from 'react-router-dom';
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
  Menu,
  X,
  Star,
  PalmtreeIcon,
  CalendarClock,
  Building,
  Plane,
  Trophy,
  Flag as GolfIcon
} from 'lucide-react';
import GalleryPage from './GalleryPage';

// ScrollToTop component
const ScrollToTop = () => {
  const { pathname } = useLocation();
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  
  return null;
};

// Calendar Booking Modal Component
const BookingModal = ({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) => {
  if (!isOpen) return null;
  
  const today = new Date();
  const [selectedDate, setSelectedDate] = useState<Date>(() => {
    // Start with today's date, but set it to the next available day if needed
    const date = new Date();
    
    // If all today's time slots are less than 3 hours away, move to tomorrow
    const currentHour = date.getHours();
    const currentMinute = date.getMinutes();
    
    // If current time + 3 hours is past the last time slot (4:30 PM)
    if (currentHour >= 13 || (currentHour === 13 && currentMinute >= 30)) {
      date.setDate(date.getDate() + 1);
    }
    
    return date;
  });
  const [selectedTime, setSelectedTime] = useState<string | null>(() => {
    // Default time selection based on current time
    const currentHour = today.getHours();
    const currentMinute = today.getMinutes();
    
    // Pre-select the first available time slot that's at least 3 hours in the future
    const timeSlots = ["9:00 AM", "10:30 AM", "12:00 PM", "1:30 PM", "3:00 PM", "4:30 PM"];
    const hourToTimeSlot = [9, 10.5, 12, 13.5, 15, 16.5]; // equivalent hours for comparison
    
    const currentTimeIn24Format = currentHour + (currentMinute / 60);
    
    // Find the first available time slot that's at least 3 hours ahead
    for (let i = 0; i < timeSlots.length; i++) {
      if (hourToTimeSlot[i] >= currentTimeIn24Format + 3) {
        return timeSlots[i];
      }
    }
    
    // If no available slots today, default to first slot for next day
    return "9:00 AM";
  });
  const [viewDate, setViewDate] = useState<Date>(selectedDate);
  
  // Format date helpers
  const formatMonth = (date: Date) => {
    return date.toLocaleString('default', { month: 'long' });
  };
  
  // Navigate to previous/next month
  const goToPreviousMonth = () => {
    const newDate = new Date(viewDate);
    newDate.setMonth(newDate.getMonth() - 1);
    setViewDate(newDate);
  };
  
  const goToNextMonth = () => {
    const newDate = new Date(viewDate);
    newDate.setMonth(newDate.getMonth() + 1);
    setViewDate(newDate);
  };
  
  // Get days in month
  const getDaysInMonth = (year: number, month: number) => {
    return new Date(year, month + 1, 0).getDate();
  };
  
  // Get day of week for first day of month (0 = Sunday, 6 = Saturday)
  const getFirstDayOfMonth = (year: number, month: number) => {
    return new Date(year, month, 1).getDay();
  };
  
  // Check if a date is in the past
  const isDateInPast = (year: number, month: number, day: number) => {
    const date = new Date(year, month, day);
    date.setHours(0, 0, 0, 0);
    
    const compareDate = new Date();
    compareDate.setHours(0, 0, 0, 0);
    
    return date < compareDate;
  };
  
  // Generate calendar days
  const generateCalendarDays = () => {
    const year = viewDate.getFullYear();
    const month = viewDate.getMonth();
    
    const daysInMonth = getDaysInMonth(year, month);
    const firstDay = getFirstDayOfMonth(year, month);
    
    // Create blank spaces for days before the first day of the month
    const blanks = Array(firstDay).fill(null);
    
    // Create entries for each day of the month
    const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);
    
    return [...blanks, ...days];
  };
  
  // Handle day selection
  const handleDaySelect = (day: number) => {
    const newDate = new Date(viewDate);
    newDate.setDate(day);
    setSelectedDate(newDate);
    
    // If changing to today, ensure selected time is valid (at least 3 hours from now)
    if (isToday(newDate)) {
      const currentHour = today.getHours();
      const currentMinute = today.getMinutes();
      const currentTimeIn24Format = currentHour + (currentMinute / 60);
      
      // Find first available time slot
      const timeSlots = ["9:00 AM", "10:30 AM", "12:00 PM", "1:30 PM", "3:00 PM", "4:30 PM"];
      const hourToTimeSlot = [9, 10.5, 12, 13.5, 15, 16.5];
      
      let availableTime = null;
      for (let i = 0; i < timeSlots.length; i++) {
        if (hourToTimeSlot[i] >= currentTimeIn24Format + 3) {
          availableTime = timeSlots[i];
          break;
        }
      }
      
      setSelectedTime(availableTime);
    } else if (!isTimeSlotAvailable(selectedTime)) {
      // Reset to first time slot if current selection isn't available
      setSelectedTime("9:00 AM");
    }
  };
  
  // Check if a day is today
  const isToday = (date: Date) => {
    return (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    );
  };
  
  // Check if a day should be selectable
  const isDaySelectable = (day: number | null) => {
    if (day === null) return false;
    
    const year = viewDate.getFullYear();
    const month = viewDate.getMonth();
    
    // If in the past, it's not selectable
    if (isDateInPast(year, month, day)) return false;
    
    // If it's today, check if any time slots are available
    const date = new Date(year, month, day);
    if (isToday(date)) {
      const currentHour = today.getHours();
      const currentMinute = today.getMinutes();
      const currentTimeIn24Format = currentHour + (currentMinute / 60);
      
      // The earliest time slot is 9:00 AM (9)
      // The latest time slot is 4:30 PM (16.5)
      
      // If current time + 3 hours is past the last time slot (4:30 PM)
      if (currentTimeIn24Format + 3 > 16.5) {
        return false;
      }
    }
    
    return true;
  };
  
  // Check if a day is the selected day
  const isSelectedDay = (day: number | null) => {
    if (day === null) return false;
    
    return (
      selectedDate.getDate() === day &&
      selectedDate.getMonth() === viewDate.getMonth() &&
      selectedDate.getFullYear() === viewDate.getFullYear()
    );
  };
  
  // Check if a time slot is available (at least 3 hours in advance)
  const isTimeSlotAvailable = (timeSlot: string | null) => {
    if (!timeSlot) return false;
    
    // Only need to check for today
    if (!isToday(selectedDate)) return true;
    
    const currentHour = today.getHours();
    const currentMinute = today.getMinutes();
    const currentTimeIn24Format = currentHour + (currentMinute / 60);
    
    // Convert time slots to 24-hour format for comparison
    const timeSlots = ["9:00 AM", "10:30 AM", "12:00 PM", "1:30 PM", "3:00 PM", "4:30 PM"];
    const hourToTimeSlot = [9, 10.5, 12, 13.5, 15, 16.5];
    
    const slotIndex = timeSlots.indexOf(timeSlot);
    if (slotIndex === -1) return false;
    
    // Check if the time slot is at least 3 hours ahead of current time
    return hourToTimeSlot[slotIndex] >= (currentTimeIn24Format + 3);
  };
  
  // Close modal when clicking outside of content
  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };
  
  const calendarDays = generateCalendarDays();
  
  // Get available time slots based on selected date
  const getAvailableTimeSlots = () => {
    const timeSlots = ["9:00 AM", "10:30 AM", "12:00 PM", "1:30 PM", "3:00 PM", "4:30 PM"];
    
    // If not today, all slots are available
    if (!isToday(selectedDate)) {
      return timeSlots;
    }
    
    // For today, filter out slots that are less than 3 hours from now
    const currentHour = today.getHours();
    const currentMinute = today.getMinutes();
    const currentTimeIn24Format = currentHour + (currentMinute / 60);
    
    const hourToTimeSlot = [9, 10.5, 12, 13.5, 15, 16.5];
    
    return timeSlots.filter((_, index) => {
      return hourToTimeSlot[index] >= currentTimeIn24Format + 3;
    });
  };
  
  const availableTimeSlots = getAvailableTimeSlots();
  
  return (
    <div className="fixed inset-0 bg-dark-800/80 z-50 flex justify-end" onClick={handleBackdropClick}>
      <div 
        className="bg-dark-800 w-full md:w-[500px] h-full overflow-y-auto shadow-xl animate-slide-in-right"
      >
        <div className="p-6 border-b border-olive-600/30">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-serif text-white">Schedule Your Tour</h2>
            <button 
              onClick={onClose} 
              className="p-1 hover:bg-olive-600/20 rounded-full transition-colors duration-300"
            >
              <X className="h-6 w-6 text-white" />
            </button>
          </div>
        </div>
        
        <div className="p-6">
          <div className="mb-8">
            <h3 className="text-lg font-medium text-white mb-2">Select a Date & Time</h3>
            <p className="text-white/70 mb-6">Choose when you'd like to tour The Plantation House venues. Tours must be scheduled at least 3 hours in advance.</p>
            
            <div className="bg-dark-700 rounded-lg p-4 mb-6">
              {/* Month and Year Navigation */}
              <div className="flex justify-between items-center mb-4">
                <button 
                  onClick={goToPreviousMonth}
                  className="text-white p-1 rounded hover:bg-dark-600 transition-colors duration-300"
                  disabled={viewDate.getMonth() === today.getMonth() && viewDate.getFullYear() === today.getFullYear()}
                >
                  <ChevronDown className="h-5 w-5 transform rotate-90" />
                </button>
                <h4 className="text-white font-medium">
                  {formatMonth(viewDate)} {viewDate.getFullYear()}
                </h4>
                <button 
                  onClick={goToNextMonth}
                  className="text-white p-1 rounded hover:bg-dark-600 transition-colors duration-300"
                >
                  <ChevronDown className="h-5 w-5 transform -rotate-90" />
                </button>
              </div>
              
              <div className="grid grid-cols-7 gap-2 mb-4">
                {["S", "M", "T", "W", "T", "F", "S"].map((day, i) => (
                  <div key={i} className="text-center text-white/70 text-sm py-2">{day}</div>
                ))}
                
                {calendarDays.map((day, i) => (
                  <div 
                    key={i} 
                    className={`
                      text-center rounded-md py-2 text-sm
                      ${day === null ? 'invisible' : 'cursor-pointer'}
                      ${!isDaySelectable(day) ? 'text-white/30 cursor-not-allowed' : 'text-white hover:bg-olive-600/30'}
                      ${isSelectedDay(day) ? 'bg-olive-600 hover:bg-olive-500 text-white' : ''}
                    `}
                    onClick={() => day !== null && isDaySelectable(day) ? handleDaySelect(day) : null}
                  >
                    {day}
                  </div>
                ))}
              </div>
              
              <div className="mt-6 space-y-2">
                <h4 className="text-white font-medium mb-3">
                  Available Times - {formatMonth(selectedDate)} {selectedDate.getDate()}, {selectedDate.getFullYear()}
                </h4>
                <div className="grid grid-cols-3 gap-2">
                  {availableTimeSlots.length > 0 ? (
                    availableTimeSlots.map((time, i) => (
                      <div 
                        key={i} 
                        className={`bg-dark-600 text-white rounded-md py-2 px-3 text-center cursor-pointer text-sm transition-colors duration-300
                          ${selectedTime === time ? 'bg-olive-600' : 'hover:bg-olive-600/70'}
                        `}
                        onClick={() => setSelectedTime(time)}
                      >
                        {time}
                      </div>
                    ))
                  ) : (
                    <div className="col-span-3 text-center text-white/70 py-4">
                      No available times for this date. Please select another date.
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
          
          <div className="space-y-4 mb-8">
            <h3 className="text-lg font-medium text-white mb-2">Your Information</h3>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-white/70 text-sm mb-1">First Name</label>
                <input 
                  type="text" 
                  className="w-full bg-dark-700 border border-dark-600 text-white rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-olive-600"
                />
              </div>
              <div>
                <label className="block text-white/70 text-sm mb-1">Last Name</label>
                <input 
                  type="text" 
                  className="w-full bg-dark-700 border border-dark-600 text-white rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-olive-600"
                />
              </div>
            </div>
            
            <div>
              <label className="block text-white/70 text-sm mb-1">Email</label>
              <input 
                type="email" 
                className="w-full bg-dark-700 border border-dark-600 text-white rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-olive-600"
              />
            </div>
            
            <div>
              <label className="block text-white/70 text-sm mb-1">Phone</label>
              <input 
                type="tel" 
                className="w-full bg-dark-700 border border-dark-600 text-white rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-olive-600"
              />
            </div>
            
            <div>
              <label className="block text-white/70 text-sm mb-1">Estimated Number of Guests</label>
              <select 
                className="w-full bg-dark-700 border border-dark-600 text-white rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-olive-600"
              >
                <option>Select</option>
                <option>10-50</option>
                <option>51-100</option>
                <option>101-200</option>
                <option>201-300</option>
                <option>301+</option>
              </select>
            </div>
            
            <div>
              <label className="block text-white/70 text-sm mb-1">Special Requests</label>
              <textarea 
                rows={3}
                className="w-full bg-dark-700 border border-dark-600 text-white rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-olive-600"
              ></textarea>
            </div>
          </div>
          
          <button className="w-full bg-olive-600 hover:bg-olive-500 text-white py-3 px-6 rounded-md transition-colors duration-300 font-medium">
            Confirm Booking
          </button>
          
          <p className="mt-4 text-white/50 text-sm text-center">
            Your personal Wedding Concierge will reach out shortly after booking to customize your tour experience.
          </p>
        </div>
      </div>
    </div>
  );
};

// Navigation Component
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
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-dark-800/95 backdrop-blur-sm shadow-md py-2' : 'bg-transparent py-4'}`}>
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          <Link to="/" className="z-50">
            <img 
              src="https://www.theplantationhouse.com/wp-content/uploads/2023/05/PH_Logo_Butterfly-retina-1-400x65.png" 
              alt="The Plantation House" 
              className={`h-8 md:h-10 transition-opacity duration-300 ${isScrolled ? 'opacity-100' : 'opacity-90 hover:opacity-100'}`}
            />
          </Link>
          
          <div className="hidden lg:flex items-center space-x-6">
            <Link 
              to="/"
              className="relative font-medium text-sm transition-colors duration-300 group text-white hover:text-olive-400"
            >
              <span>Home</span>
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-olive-600 transition-all duration-300 group-hover:w-full"></span>
            </Link>
            {['Venues', 'Experience'].map((item) => (
              <a 
                key={item} 
                href={`/#${item.toLowerCase().replace(/\s+/g, '-')}`} 
                className="relative font-medium text-sm transition-colors duration-300 group text-white hover:text-olive-400"
              >
                <span>{item}</span>
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-olive-600 transition-all duration-300 group-hover:w-full"></span>
              </a>
            ))}
            <a 
              href="https://www.theplantationhouse.com/" 
              target="_blank"
              rel="noopener noreferrer"
              className="relative font-medium text-sm transition-colors duration-300 group text-white hover:text-olive-400"
            >
              <span>Cuisine</span>
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-olive-600 transition-all duration-300 group-hover:w-full"></span>
            </a>
            <Link 
              to="/gallery" 
              className="relative font-medium text-sm transition-colors duration-300 group text-white hover:text-olive-400"
            >
              <span>Gallery</span>
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-olive-600 transition-all duration-300 group-hover:w-full"></span>
            </Link>
            {['Concierge', 'Contact'].map((item) => (
              <a 
                key={item} 
                href={`/#${item.toLowerCase().replace(/\s+/g, '-')}`} 
                className="relative font-medium text-sm transition-colors duration-300 group text-white hover:text-olive-400"
              >
                <span>{item}</span>
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-olive-600 transition-all duration-300 group-hover:w-full"></span>
              </a>
            ))}
            <button 
              onClick={() => document.getElementById('schedule-button')?.click()}
              className="bg-olive-600 hover:bg-olive-500 text-white px-5 py-2 rounded-full font-medium transition-colors duration-300 transform hover:scale-105 shadow-md hover:shadow-lg"
            >
              Schedule a Tour
            </button>
          </div>
          
          <button 
            className="lg:hidden z-50 p-2 focus:outline-none"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? (
              <X className="h-6 w-6 text-white" />
            ) : (
              <Menu className="h-6 w-6 text-white" />
            )}
          </button>
        </div>
      </div>
      
      {/* Mobile Menu */}
      <div className={`fixed inset-0 bg-dark-800/95 flex flex-col items-center justify-center transition-all duration-300 ${isMobileMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`}>
        <div className="flex flex-col items-center space-y-6">
          <Link 
            to="/"
            className="text-white text-xl font-medium transition-colors hover:text-olive-400"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Home
          </Link>
          {['Venues', 'Experience'].map((item) => (
            <a 
              key={item} 
              href={`/#${item.toLowerCase().replace(/\s+/g, '-')}`} 
              className="text-white text-xl font-medium transition-colors hover:text-olive-400"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {item}
            </a>
          ))}
          <a 
            href="https://www.theplantationhouse.com/" 
            target="_blank"
            rel="noopener noreferrer"
            className="text-white text-xl font-medium transition-colors hover:text-olive-400"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Cuisine
          </a>
          <Link 
            to="/gallery" 
            className="text-white text-xl font-medium transition-colors hover:text-olive-400"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Gallery
          </Link>
          {['Concierge', 'Contact'].map((item) => (
            <a 
              key={item} 
              href={`/#${item.toLowerCase().replace(/\s+/g, '-')}`} 
              className="text-white text-xl font-medium transition-colors hover:text-olive-400"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {item}
            </a>
          ))}
          <button 
            className="mt-4 bg-olive-600 hover:bg-olive-500 text-white px-6 py-3 rounded-full font-medium transition-all duration-300 transform hover:scale-105"
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

// Hero Section Component
const HeroSection = ({ onScheduleTour }: { onScheduleTour: () => void }) => {
  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-dark-800/70 via-dark-800/50 to-dark-800/60 z-10"></div>
        <img
          src="https://www.theplantationhouse.com/wp-content/uploads/2023/05/Photo-6-1.jpg"
          alt="The Plantation House - Maui Wedding Venue"
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-20000 ease-in-out animate-subtle-zoom"
        />
      </div>
      <div className="container mx-auto px-4 z-10 text-center">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-white leading-tight mb-6 animate-fade-in">
          Your Dream Maui Wedding in One Perfect Place
        </h1>
        <p className="text-xl md:text-2xl text-white/90 font-light max-w-3xl mx-auto mb-10 animate-fade-in-delay">
          Where breathtaking ocean views, iconic island hospitality, and our legendary wedding concierge service create the celebration you've always imagined
        </p>
        <button 
          id="schedule-button"
          onClick={onScheduleTour}
          className="bg-olive-600 hover:bg-olive-500 text-white px-8 py-3 rounded-full font-medium text-lg transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 animate-fade-in-delay-2"
        >
          Schedule Your Tour
        </button>
      </div>
      <div className="absolute bottom-10 left-0 right-0 flex justify-center z-10 animate-bounce">
        <ChevronDown className="text-white/80 h-8 w-8" />
      </div>
    </section>
  );
};

// Introduction Section Component
const IntroductionSection = () => {
  return (
    <section className="py-20 bg-gradient-to-b from-dark-800 via-dark-700/95 to-dark-800 relative">
      {/* Decorative pattern overlay */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div className="h-full w-full" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-serif text-white mb-8 relative">
            <span className="inline-block relative">
              A West Maui Legacy Since 1991
              <span className="absolute -bottom-2 left-0 right-0 h-0.5 bg-olive-600"></span>
            </span>
          </h2>
          <p className="text-white/80 text-lg leading-relaxed mb-10">
            Experience the wedding of your dreams at Maui's premier venue, where the Pacific Ocean stretches endlessly before you and the lush fairways of Kapalua's award-winning Plantation Golf Course create a stunning backdrop for your special day. As a true West Maui institution for over three decades, The Plantation House has deep roots in the island community, unlocking exclusive possibilities for your celebration that other venues simply cannot offer.
          </p>
          <div className="flex flex-wrap justify-center gap-8">
            <div className="flex items-center text-white group transition-all duration-300 transform hover:scale-105">
              <Users className="h-5 w-5 mr-2 text-olive-500 group-hover:text-olive-400 transition-colors duration-300" />
              <span>10-500 Guests</span>
            </div>
            <div className="flex items-center text-white group transition-all duration-300 transform hover:scale-105">
              <MapPin className="h-5 w-5 mr-2 text-olive-500 group-hover:text-olive-400 transition-colors duration-300" />
              <span>Kapalua, Maui</span>
            </div>
            <div className="flex items-center text-white group transition-all duration-300 transform hover:scale-105">
              <Calendar className="h-5 w-5 mr-2 text-olive-500 group-hover:text-olive-400 transition-colors duration-300" />
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
    <section className="py-24 bg-dark-800 relative">
      {/* Leaf pattern overlay */}
      <div className="absolute inset-0 opacity-3 pointer-events-none">
        <div className="h-full w-full" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z' fill='%23ffffff' fill-opacity='0.1' fill-rule='evenodd'/%3E%3C/svg%3E")`,
          backgroundSize: "100px 100px"
        }}></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto bg-dark-600/70 backdrop-blur-sm rounded-xl shadow-lg overflow-hidden transform transition-all duration-300 hover:shadow-xl">
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
                  <Star key={star} className="h-5 w-5 text-olive-500 mr-1" fill="#5F653C" />
                ))}
              </div>
              <h3 className="text-2xl font-serif text-white mb-4">Maui's Most Trusted Wedding Venue</h3>
              <p className="text-white/80 mb-8 leading-relaxed">
                With over three decades as West Maui's premier celebration destination, we've perfected the art of the island wedding. Our reputation opens doors across the island, ensuring your special day benefits from the very best Maui has to offer.
              </p>
              
              <div className="space-y-3">
                {["Panoramic ocean views from every venue", "Dedicated Wedding Concierge service", "Award-winning plantation-to-plate cuisine", "West Maui's most connected venue team"].map((item, index) => (
                  <div key={index} className="flex items-center group">
                    <Check className="h-5 w-5 text-olive-500 mr-3 transition-colors duration-300 group-hover:text-olive-400" />
                    <span className="text-white transition-colors duration-300 group-hover:text-white/90">{item}</span>
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
      image: 'https://www.theplantationhouse.com/wp-content/uploads/2023/05/Photo-6-1.jpg',
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
      id: 'ohana-room',
      name: 'Ohana Room',
      description: 'An elegant indoor space with glass-paneled doors opening to golf course views, accommodating up to 80 guests. This versatile venue offers air-conditioned comfort with panoramic vistas, making it perfect for intimate receptions or as a sophisticated backup for outdoor events.',
      image: 'https://www.theplantationhouse.com/wp-content/uploads/2023/05/Photo-8.jpg',
      capacity: 80,
    },
    {
      id: 'dining-room',
      name: 'Main Dining Room',
      description: 'Our premier indoor reception space accommodating up to 150 guests with wall-to-wall windows showcasing dramatic ocean and golf course views. The elegant interior, with soaring ceilings and island-inspired décor, creates a sophisticated atmosphere while maintaining the breathtaking outdoor scenery that makes The Plantation House legendary.',
      image: 'https://www.theplantationhouse.com/wp-content/uploads/2023/05/Photo-7.jpg',
      capacity: 150,
    },
  ];

  const [activeSpace, setActiveSpace] = useState(spaces[0]);

  return (
    <section id="venues" className="py-24 bg-gradient-to-b from-dark-700 to-dark-800 relative">
      {/* Triangular pattern overlay */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div className="h-full w-full" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='36' height='72' viewBox='0 0 36 72'%3E%3Cg fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.2'%3E%3Cpath d='M2 6h12L8 18 2 6zm18 36h12l-6 12-6-12z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <h2 className="text-3xl md:text-4xl font-serif text-white text-center mb-16 relative">
          <span className="inline-block relative">
            Our Exclusive Wedding Venues
            <span className="absolute -bottom-2 left-1/4 right-1/4 h-0.5 bg-olive-600"></span>
          </span>
        </h2>
        
        <div className="flex flex-col lg:flex-row gap-12">
          <div className="lg:w-1/2">
            <div className="relative rounded-xl overflow-hidden h-96 lg:h-[600px] shadow-xl transition-all duration-700 group">
              <img 
                src={activeSpace.image} 
                alt={activeSpace.name} 
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-dark-800/90 via-dark-800/40 to-transparent flex flex-col justify-end p-8 transition-all duration-300">
                <h3 className="text-white text-2xl font-serif mb-2">{activeSpace.name}</h3>
                <p className="text-white/90 mb-4">{activeSpace.description}</p>
                <div className="flex items-center text-white/90 mb-2">
                  <Users className="h-4 w-4 mr-2 text-olive-500" />
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
                  className={`p-5 rounded-lg cursor-pointer transition-all duration-300 ${activeSpace.id === space.id ? 'bg-dark-600 border-l-4 border-olive-600 shadow-md' : 'hover:bg-dark-600/50 hover:shadow-sm'}`}
                  onClick={() => setActiveSpace(space)}
                >
                  <div className="flex justify-between items-center">
                    <h4 className={`font-medium text-lg transition-colors duration-300 ${activeSpace.id === space.id ? 'text-white' : 'text-white/90'}`}>{space.name}</h4>
                    <ChevronRight className={`h-5 w-5 transition-transform duration-300 ${activeSpace.id === space.id ? 'rotate-90 text-olive-500' : 'text-white/50'}`} />
                  </div>
                  {activeSpace.id === space.id && (
                    <p className="mt-2 text-white/80 animate-fade-in">
                      {space.description.split('.')[0]}.
                    </p>
                  )}
                </div>
              ))}
            </div>
            
            <div className="mt-10 bg-dark-600/80 p-6 rounded-lg w-full">
              <h4 className="text-white font-serif text-xl mb-4">Why Our Venues Stand Apart</h4>
              <div className="space-y-3">
                {[
                  "All venues are part of our iconic property - no need for multiple location coordination",
                  "Backup options for every outdoor space in case of weather changes",
                  "Exclusive use of selected venues for complete privacy",
                  "Photography-optimized settings with perfect lighting throughout the day",
                  "Seamless transitions between ceremony, cocktail hour, and reception spaces"
                ].map((item, index) => (
                  <div key={index} className="flex items-start group">
                    <Check className="h-5 w-5 text-olive-500 mr-3 mt-1 flex-shrink-0 transition-colors duration-300 group-hover:text-olive-400" />
                    <span className="text-white/90 transition-colors duration-300 group-hover:text-white">{item}</span>
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
      icon: <Utensils className="h-8 w-8 text-olive-500 group-hover:text-olive-400 transition-colors duration-300" />,
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
    <section id="experience" className="py-24 bg-gradient-radial from-dark-700/95 to-dark-800 relative">
      {/* Wave pattern overlay */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div className="h-full w-full" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='20' viewBox='0 0 100 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M21.184 20c.357-.13.72-.264.888-.14 1.055.793 1.603 1.257 1.656.233.231-.91-.562-1.518-1.424-2.226-.872-.707-1.75-1.412-2.628-2.12L2.792 0 0 3.294l2.02 1.621 5.877 4.72-.708.708L8 9.13l-.708.708-1.412.007.808-.807-3.34-2.69-.708.708-1.412 1.412 2.82 2.26.42-.422 2.84-2.125.565.566.572-.572 1.412 1.411-1.412 1.412-.571-.571-2.126 2.126L0 16.27l.808.808L0 18.9l1.414-1.413L0 19.314v.687h.02L0 21h4.2l3.54-3.54L10.414 14l1.413-1.414-1.413-1.414-2.12-2.122 2.12-2.12-1.413-1.415-2.121 2.122-2.122-2.122L2.121 7.071l2.121 2.122 2.122-2.122 1.414 1.414-2.122 2.122-1.414-1.414-2.121 2.121 2.121 2.121 2.121-2.12 2.122 2.12 2.121-2.12 2.121 2.12 1.414-1.413-2.12-2.12 2.12-2.123 4.243 4.242 2.121-2.12 1.414 1.413 2.121-2.12-1.414-1.415-2.12 2.121-2.121-2.12-2.121 2.12L18.363 7.9l-2.121 2.121-1.414-1.414L9.071 3.35l-4.95 4.95-1.414-1.413 4.95-4.95L2.121 6.364 3.536 7.78l2.12-2.122 1.415 1.414-2.121 2.121 2.12 2.121 2.122-2.12 2.12 2.12 2.122-2.12 2.12 2.12 4.243-4.242-2.121-2.122 2.121-2.121L21.78 1.818l-5.657 5.656-1.414-1.414 5.657-5.656-2.121-2.122-2.829 2.83-1.414-1.414 2.829-2.83-2.121-2.12L6.364 2.121 4.95.707l4.242-4.243L21.779 9.05l1.407-1.407L24.592 9.05 21.184 20z' fill='%23ffffff' fill-opacity='0.1' fill-rule='evenodd'/%3E%3C/svg%3E")`,
        }}></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <h2 className="text-3xl md:text-4xl font-serif text-white text-center mb-16 relative">
          <span className="inline-block relative">
            The Plantation House Experience
            <span className="absolute -bottom-2 left-1/4 right-1/4 h-0.5 bg-olive-600"></span>
          </span>
        </h2>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {experiences.map((item, index) => (
            <div key={index} className="group bg-dark-600/80 backdrop-blur-sm p-8 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-102 hover:translate-y-[-4px]">
              <div className="flex justify-center mb-4">
                {item.icon}
              </div>
              <h3 className="text-xl text-center font-medium text-white mb-3 group-hover:text-olive-300 transition-colors duration-300">{item.title}</h3>
              <p className="text-center text-white/70">{item.description}</p>
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
    <section id="concierge" className="py-24 bg-gradient-to-br from-dark-800 via-dark-700 to-dark-800 relative overflow-hidden">
      {/* Diamond pattern overlay */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div className="h-full w-full" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='48' height='64' viewBox='0 0 48 64' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.15'%3E%3Cpath d='M12 0h18v6h6v6h6v18h-6v6h-6v6H12v-6H6v-6H0V12h6V6h6V0zm12 6h-6v6h-6v6H6v6h6v6h6v6h6v-6h6v-6h6v-6h-6v-6h-6V6zm-6 12h6v6h-6v-6zm24 24h6v6h-6v-6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col lg:flex-row bg-dark-700/90 backdrop-blur-sm rounded-xl overflow-hidden shadow-2xl">
            <div className="lg:w-2/5 h-96 lg:h-auto overflow-hidden">
              <img 
                src="https://www.theplantationhouse.com/wp-content/uploads/2023/05/Photo-8.jpg"
                alt="Wedding Concierge Service"
                className="w-full h-full object-cover object-center"
              />
            </div>
            
            <div className="lg:w-3/5 p-8 lg:p-12">
              <h2 className="text-3xl md:text-4xl font-serif text-white mb-6 relative">
                <span className="inline-block relative">
                  Your Personal Wedding Concierge
                  <span className="absolute -bottom-2 left-0 right-1/2 h-0.5 bg-olive-600"></span>
                </span>
              </h2>
              
              <p className="text-white/80 text-lg mb-8">
                When you choose The Plantation House, you don't just get a venue - you gain a dedicated Wedding Concierge who leverages our 30+ years as a West Maui institution to create your perfect celebration. Our deep island connections mean unparalleled service for you and your guests.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
                <div className="bg-dark-600/50 rounded-lg p-5">
                  <div className="flex items-start mb-3">
                    <Building className="h-6 w-6 text-olive-500 mr-3 flex-shrink-0" />
                    <h3 className="text-white font-medium">Venue Coordination</h3>
                  </div>
                  <p className="text-white/70 text-sm">
                    Seamless management of all venue spaces, setup coordination, and weather contingency planning.
                  </p>
                </div>
                
                <div className="bg-dark-600/50 rounded-lg p-5">
                  <div className="flex items-start mb-3">
                    <Plane className="h-6 w-6 text-olive-500 mr-3 flex-shrink-0" />
                    <h3 className="text-white font-medium">Guest Services</h3>
                  </div>
                  <p className="text-white/70 text-sm">
                    Hotel room blocks, transportation arrangement, and local activity recommendations for all guests.
                  </p>
                </div>
                
                <div className="bg-dark-600/50 rounded-lg p-5">
                  <div className="flex items-start mb-3">
                    <CalendarClock className="h-6 w-6 text-olive-500 mr-3 flex-shrink-0" />
                    <h3 className="text-white font-medium">Event Timeline</h3>
                  </div>
                  <p className="text-white/70 text-sm">
                    Detailed planning of your entire wedding day and coordination with all vendors.
                  </p>
                </div>
                
                <div className="bg-dark-600/50 rounded-lg p-5">
                  <div className="flex items-start mb-3">
                    <PalmtreeIcon className="h-6 w-6 text-olive-500 mr-3 flex-shrink-0" />
                    <h3 className="text-white font-medium">Island Connection</h3>
                  </div>
                  <p className="text-white/70 text-sm">
                    Access to Maui's best vendors, exclusive experiences, and local expertise through our extensive network.
                  </p>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row items-center justify-between p-5 bg-olive-600/20 rounded-lg">
                <div className="text-white mb-4 sm:mb-0">
                  <p className="font-medium">Ready to meet your Wedding Concierge?</p>
                  <p className="text-white/70 text-sm mt-1">Book a tour today and begin your planning journey</p>
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
    <section className="py-24 bg-dark-800 relative">
      {/* Background image with texture overlay */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-dark-800/90 via-dark-700/90 to-dark-800/90 z-10"></div>
        <img
          src="https://www.theplantationhouse.com/wp-content/uploads/2023/05/Photo-1.jpg"
          alt="Background"
          className="w-full h-full object-cover"
          style={{ opacity: 0.15 }}
        />
        {/* Noise texture overlay */}
        <div className="absolute inset-0 z-20 opacity-40" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          mixBlendMode: 'overlay'
        }}></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-30">
        <div className="max-w-3xl mx-auto text-center">
          <div className="text-6xl text-olive-500 mb-6">"</div>
          <p className="text-xl md:text-2xl text-white italic mb-10 leading-relaxed">
            Our wedding at The Plantation House exceeded every expectation. The sunset views were absolutely magical, the food was incredible, and their Wedding Concierge made everything effortless. From securing the perfect hotel rooms for our guests to coordinating our sunset sail party the day before, they handled everything with perfection.
          </p>
          <div className="flex items-center justify-center">
            <div className="h-16 w-16 rounded-full overflow-hidden mr-4 shadow-md">
              <img 
                src="https://www.theplantationhouse.com/wp-content/uploads/2023/05/Photo-5.jpg"
                alt="Alexandra"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="text-left">
              <div className="font-medium text-white text-lg">Alexandra & Michael</div>
              <div className="text-white/70">Married May 2024</div>
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

// Contact Form Section Component
const ContactSection = () => {
  return (
    <section id="contact" className="py-24 bg-gradient-to-t from-dark-700 via-dark-800 to-dark-700 relative">
      {/* Flower pattern overlay */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div className="h-full w-full" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='88' height='24' viewBox='0 0 88 24'%3E%3Cg fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.2'%3E%3Cpath d='M13 0h1v8h-1V0zm0 16h1v8H6v-8zM6 0h1v8H6V0zm0 16h1v8H6v-8zM0 0h1v8H0V0zm0 16h1v8H0v-8zM19 0h1v8h-1V0zm0 16h1v8h-1v-8zM38 0h1v8h-1V0zm0 16h1v8h-1v-8zM31 0h1v8h-1V0zm0 16h1v8h-1v-8zM25 0h1v8h-1V0zm0 16h1v8h-1v-8zM44 0h1v8h-1V0zm0 16h1v8h-1v-8zM63 0h1v8h-1V0zm0 16h1v8h-1v-8zM56 0h1v8h-1V0zm0 16h1v8h-1v-8zM50 0h1v8h-1V0zm0 16h1v8h-1v-8zM69 0h1v8h-1V0zm0 16h1v8h-1v-8zM88 0h1v8h-1V0zm0 16h1v8h-1v-8zM81 0h1v8h-1V0zm0 16h1v8h-1v-8zM75 0h1v8h-1V0zm0 16h1v8h-1v-8z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col lg:flex-row bg-dark-600/80 backdrop-blur-sm rounded-xl overflow-hidden shadow-2xl">
            <div className="lg:w-1/2 p-8 lg:p-12">
              <h2 className="text-3xl font-serif text-white mb-6">Your perfect Maui wedding begins here</h2>
              <p className="text-white/80 mb-10 leading-relaxed">
                Contact our Wedding Concierge team to schedule a tour and begin planning your celebration at West Maui's most renowned venue.
              </p>
              
              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="firstName" className="block text-sm font-medium text-white/80 mb-1">First Name</label>
                    <input
                      type="text"
                      id="firstName"
                      className="w-full px-4 py-3 bg-dark-700 border border-dark-500 text-white rounded-lg focus:ring-2 focus:ring-olive-600 focus:border-olive-600 transition-all duration-300"
                      placeholder="Your first name"
                    />
                  </div>
                  <div>
                    <label htmlFor="lastName" className="block text-sm font-medium text-white/80 mb-1">Last Name</label>
                    <input
                      type="text"
                      id="lastName"
                      className="w-full px-4 py-3 bg-dark-700 border border-dark-500 text-white rounded-lg focus:ring-2 focus:ring-olive-600 focus:border-olive-600 transition-all duration-300"
                      placeholder="Your last name"
                    />
                  </div>
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-white/80 mb-1">Email Address</label>
                  <input
                    type="email"
                    id="email"
                    className="w-full px-4 py-3 bg-dark-700 border border-dark-500 text-white rounded-lg focus:ring-2 focus:ring-olive-600 focus:border-olive-600 transition-all duration-300"
                    placeholder="your.email@example.com"
                  />
                </div>
                
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-white/80 mb-1">Phone Number</label>
                  <input
                    type="tel"
                    id="phone"
                    className="w-full px-4 py-3 bg-dark-700 border border-dark-500 text-white rounded-lg focus:ring-2 focus:ring-olive-600 focus:border-olive-600 transition-all duration-300"
                    placeholder="(808) 555-1234"
                  />
                </div>
                
                <div>
                  <label htmlFor="eventDate" className="block text-sm font-medium text-white/80 mb-1">Preferred Wedding Date</label>
                  <input
                    type="date"
                    id="eventDate"
                    className="w-full px-4 py-3 bg-dark-700 border border-dark-500 text-white rounded-lg focus:ring-2 focus:ring-olive-600 focus:border-olive-600 transition-all duration-300"
                  />
                </div>
                
                <div>
                  <label htmlFor="guests" className="block text-sm font-medium text-white/80 mb-1">Estimated Number of Guests</label>
                  <select
                    id="guests"
                    className="w-full px-4 py-3 bg-dark-700 border border-dark-500 text-white rounded-lg focus:ring-2 focus:ring-olive-600 focus:border-olive-600 transition-all duration-300"
                  >
                    <option>Please select</option>
                    <option>10-50</option>
                    <option>51-100</option>
                    <option>101-200</option>
                    <option>201-300</option>
                    <option>301+</option>
                  </select>
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-white/80 mb-1">Additional Information</label>
                  <textarea
                    id="message"
                    rows={4}
                    className="w-full px-4 py-3 bg-dark-700 border border-dark-500 text-white rounded-lg focus:ring-2 focus:ring-olive-600 focus:border-olive-600 transition-all duration-300"
                    placeholder="Tell us about your wedding vision or any questions you have..."
                  ></textarea>
                </div>
                
                <button
                  type="submit"
                  className="w-full bg-olive-600 hover:bg-olive-500 text-white font-medium py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-102 shadow-md hover:shadow-lg"
                >
                  Connect with a Wedding Concierge
                </button>
              </form>
            </div>
            
            <div className="lg:w-1/2 relative">
              <img
                src="https://www.theplantationhouse.com/wp-content/uploads/2023/05/Photo-2.jpg"
                alt="Wedding at The Plantation House"
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-10000 animate-subtle-zoom-slow"
              />
              
              <div className="absolute bottom-0 left-0 right-0 p-8">
                <div className="text-white space-y-4 bg-dark-800/50 backdrop-blur-sm p-4 rounded-lg">
                  <div className="flex items-start group">
                    <MapPin className="h-5 w-5 mr-3 text-olive-500 mt-1 flex-shrink-0 group-hover:text-olive-400 transition-colors duration-300" />
                    <div>
                      <p className="font-medium">The Plantation House</p>
                      <p className="text-white/90">2000 Plantation Club Drive, Kapalua, Maui, HI 96761</p>
                    </div>
                  </div>
                  
                  <a href="tel:(808)669-6299" className="flex items-center group hover:opacity-90 transition-opacity duration-300">
                    <Phone className="h-5 w-5 mr-3 text-olive-500 flex-shrink-0 group-hover:text-olive-400 transition-colors duration-300" />
                    <span>(808) 669-6299</span>
                  </a>
                  
                  <a href="mailto:events@plantationhouse.com" className="flex items-center group hover:opacity-90 transition-opacity duration-300">
                    <Mail className="h-5 w-5 mr-3 text-olive-500 flex-shrink-0 group-hover:text-olive-400 transition-colors duration-300" />
                    <span>events@plantationhouse.com</span>
                  </a>
                  
                  <div className="flex items-center group">
                    <Clock className="h-5 w-5 mr-3 text-olive-500 flex-shrink-0 group-hover:text-olive-400 transition-colors duration-300" />
                    <span>Tours available daily by appointment</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// Floating CTA Component
const FloatingCTA = ({ onScheduleTour }: { onScheduleTour: () => void }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 500);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  const scrollToContact = () => {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };
  
  return (
    <div className={`fixed bottom-6 right-6 z-50 transition-all duration-500 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-16 opacity-0'}`}>
      <div className={`flex items-center transition-all duration-300 ${isExpanded ? 'bg-dark-700 rounded-lg shadow-xl' : ''}`}>
        {isExpanded && (
          <div className="flex flex-col p-4 pr-2 animate-fade-in">
            <a href="tel:8086696299" className="flex items-center text-white hover:text-olive-400 py-2 transition-colors duration-300">
              <Phone className="h-4 w-4 mr-2" />
              <span>(808) 669-6299</span>
            </a>
            <a href="mailto:events@plantationhouse.com" className="flex items-center text-white hover:text-olive-400 py-2 transition-colors duration-300">
              <Mail className="h-4 w-4 mr-2" />
              <span>Email Us</span>
            </a>
          </div>
        )}
        
        <button 
          onClick={() => {
            if (isExpanded) {
              setIsExpanded(false);
            } else {
              scrollToContact();
            }
          }}
          className={`flex items-center ${isExpanded ? 'bg-olive-600 text-white' : 'bg-olive-600 text-white'} px-6 py-3 rounded-lg shadow-lg hover:bg-olive-500 transition-all duration-300 transform hover:scale-105`}
        >
          {isExpanded ? (
            <>
              <span>Close</span>
            </>
          ) : (
            <>
              <span>Get in Touch!</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};

// Footer Component
const Footer = () => {
  return (
    <footer className="bg-dark-800 text-white py-16 relative">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div className="h-full w-full" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='0.2' fill-rule='evenodd'%3E%3Ccircle cx='3' cy='3' r='3'/%3E%3Ccircle cx='13' cy='13' r='3'/%3E%3C/g%3E%3C/svg%3E")`,
        }}></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          <div>
            <h3 className="text-xl font-serif mb-6">The Plantation House</h3>
            <p className="text-white/80 mb-6 leading-relaxed">
              West Maui's premier wedding venue with breathtaking ocean views, exceptional service, and a dedicated Wedding Concierge team.
            </p>
            <div className="flex space-x-6">
              <a href="https://www.facebook.com/plantationhousemaui" className="text-white/70 hover:text-olive-400 transition-colors duration-300">Facebook</a>
              <a href="https://www.instagram.com/plantationhousemaui" className="text-white/70 hover:text-olive-400 transition-colors duration-300">Instagram</a>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-medium mb-6">Contact Us</h3>
            <div className="space-y-4">
              <div className="flex items-start group">
                <MapPin className="h-5 w-5 mr-2 text-olive-500 mt-1 group-hover:text-olive-400 transition-colors duration-300" />
                <span className="text-white/80 group-hover:text-white/100 transition-colors duration-300">2000 Plantation Club Drive, Kapalua, Maui, HI 96761</span>
              </div>
              <a href="tel:(808)669-6299" className="flex items-center group">
                <Phone className="h-5 w-5 mr-2 text-olive-500 group-hover:text-olive-400 transition-colors duration-300" />
                <span className="text-white/80 group-hover:text-white/100 transition-colors duration-300">(808) 669-6299</span>
              </a>
              <a href="mailto:events@plantationhouse.com" className="flex items-center group">
                <Mail className="h-5 w-5 mr-2 text-olive-500 group-hover:text-olive-400 transition-colors duration-300" />
                <span className="text-white/80 group-hover:text-white/100 transition-colors duration-300">events@plantationhouse.com</span>
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-medium mb-6">Quick Links</h3>
            <ul className="space-y-3">
              {['Venues', 'Experience'].map((item) => (
                <li key={item}>
                  <a 
                    href={`/#${item.toLowerCase().replace(/\s+/g, '-')}`} 
                    className="text-white/80 hover:text-olive-400 transition-colors duration-300 flex items-center group"
                  >
                    <ChevronRight className="h-4 w-4 mr-1 opacity-0 group-hover:opacity-100 transition-all duration-300 transform -translate-x-2 group-hover:translate-x-0" />
                    <span>{item}</span>
                  </a>
                </li>
              ))}
              <li>
                <a 
                  href="https://www.theplantationhouse.com/" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/80 hover:text-olive-400 transition-colors duration-300 flex items-center group"
                >
                  <ChevronRight className="h-4 w-4 mr-1 opacity-0 group-hover:opacity-100 transition-all duration-300 transform -translate-x-2 group-hover:translate-x-0" />
                  <span>Cuisine</span>
                </a>
              </li>
              <li>
                <Link 
                  to="/gallery" 
                  className="text-white/80 hover:text-olive-400 transition-colors duration-300 flex items-center group"
                >
                  <ChevronRight className="h-4 w-4 mr-1 opacity-0 group-hover:opacity-100 transition-all duration-300 transform -translate-x-2 group-hover:translate-x-0" />
                  <span>Gallery</span>
                </Link>
              </li>
              {['Concierge', 'Contact'].map((item) => (
                <li key={item}>
                  <a 
                    href={`/#${item.toLowerCase().replace(/\s+/g, '-')}`} 
                    className="text-white/80 hover:text-olive-400 transition-colors duration-300 flex items-center group"
                  >
                    <ChevronRight className="h-4 w-4 mr-1 opacity-0 group-hover:opacity-100 transition-all duration-300 transform -translate-x-2 group-hover:translate-x-0" />
                    <span>{item}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-medium mb-6">Subscribe</h3>
            <p className="text-white/80 mb-6 leading-relaxed">Stay updated with our latest wedding packages and seasonal offers.</p>
            <div className="flex">
              <input 
                type="email" 
                placeholder="Your email"
                className="px-4 py-2 bg-dark-700 text-white rounded-l-lg focus:outline-none w-full focus:ring-2 focus:ring-olive-600 transition-all duration-300"
              />
              <button className="bg-olive-600 hover:bg-olive-500 px-4 rounded-r-lg transition-colors duration-300">
                →
              </button>
            </div>
          </div>
        </div>
        
        <div className="mt-16 pt-8 border-t border-white/20 text-center">
          <p className="text-white/50">© {new Date().getFullYear()} The Plantation House. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

// Gallery Section Preview Component
const GallerySectionPreview = () => {
  const navigate = useNavigate();
  
  return (
    <section id="gallery-preview" className="py-24 bg-gradient-to-b from-dark-800 to-dark-700 relative">
      {/* Dotted pattern overlay */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div className="h-full w-full" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='0.5' fill-rule='evenodd'%3E%3Ccircle cx='3' cy='3' r='3'/%3E%3Ccircle cx='13' cy='13' r='3'/%3E%3C/g%3E%3C/svg%3E")`,
        }}></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <h2 className="text-3xl md:text-4xl font-serif text-white text-center mb-16 relative">
          <span className="inline-block relative">
            Capture Your Perfect Moments
            <span className="absolute -bottom-2 left-1/4 right-1/4 h-0.5 bg-olive-600"></span>
          </span>
        </h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="relative overflow-hidden rounded-lg shadow-lg group">
            <img 
              src="https://plantationhouseevents.com/sites/default/files/styles/gallery_full/public/gallery-images/ceremony-site-golf-course-3.jpg" 
              alt="Molokai Lawn Ceremony" 
              className="w-full h-64 object-cover transition-transform duration-1000 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-dark-800/90 via-dark-800/60 to-transparent flex flex-col justify-end p-4">
              <h3 className="text-white font-medium">Molokai Lawn</h3>
              <p className="text-white/80 text-sm">Oceanfront ceremonies with breathtaking views</p>
            </div>
          </div>
          
          <div className="relative overflow-hidden rounded-lg shadow-lg group">
            <img 
              src="https://plantationhouseevents.com/sites/default/files/styles/gallery_full/public/gallery-images/event-dining-room-1.jpg" 
              alt="Main Dining Room" 
              className="w-full h-64 object-cover transition-transform duration-1000 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-dark-800/90 via-dark-800/60 to-transparent flex flex-col justify-end p-4">
              <h3 className="text-white font-medium">Main Dining Room</h3>
              <p className="text-white/80 text-sm">Elegant indoor receptions with panoramic views</p>
            </div>
          </div>
          
          <div className="relative overflow-hidden rounded-lg shadow-lg group">
            <img 
              src="https://plantationhouseevents.com/sites/default/files/styles/gallery_full/public/gallery-images/dining-terrace-reception-1.jpg" 
              alt="Dining Terrace" 
              className="w-full h-64 object-cover transition-transform duration-1000 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-dark-800/90 via-dark-800/60 to-transparent flex flex-col justify-end p-4">
              <h3 className="text-white font-medium">Dining Room Lanai</h3>
              <p className="text-white/80 text-sm">Open-air dining with sunset ocean views</p>
            </div>
          </div>
          
          <div className="relative overflow-hidden rounded-lg shadow-lg group">
            <img 
              src="https://plantationhouseevents.com/sites/default/files/styles/gallery_full/public/gallery-images/steak-seafood-entree.jpg" 
              alt="Gourmet Cuisine" 
              className="w-full h-64 object-cover transition-transform duration-1000 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-dark-800/90 via-dark-800/60 to-transparent flex flex-col justify-end p-4">
              <h3 className="text-white font-medium">Culinary Excellence</h3>
              <p className="text-white/80 text-sm">Award-winning island-inspired cuisine</p>
            </div>
          </div>
        </div>
        
        <div className="text-center mt-12">
          <button 
            onClick={() => navigate('/gallery')}
            className="inline-flex items-center bg-olive-600 hover:bg-olive-500 text-white px-6 py-3 rounded-full transition-colors duration-300 transform hover:scale-105 shadow-md"
          >
            <Camera className="h-5 w-5 mr-2" />
            <span>View Full Gallery</span>
          </button>
          <p className="text-white/60 mt-4 text-sm">Explore all our stunning venues and past celebrations</p>
        </div>
      </div>
    </section>
  );
};

// HomePage Component 
const HomePage = ({ onScheduleTour }: { onScheduleTour: () => void }) => {
  return (
    <>
      <HeroSection onScheduleTour={onScheduleTour} />
      <IntroductionSection />
      <TrustedVenueSection />
      <WeddingSpacesSection />
      <ExperienceSection />
      <WeddingConciergeSection onScheduleTour={onScheduleTour} />
      <TestimonialSection />
      <ContactSection />
    </>
  );
};

// App Component
function App() {
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  
  const handleScheduleTour = () => {
    setIsBookingModalOpen(true);
  };
  
  return (
    <Router>
      <div className="font-sans text-gray-900 bg-dark-800">
        <ScrollToTop />
        <BookingModal isOpen={isBookingModalOpen} onClose={() => setIsBookingModalOpen(false)} />
        <Navigation />
        
        <Routes>
          <Route path="/" element={<HomePage onScheduleTour={handleScheduleTour} />} />
          <Route path="/gallery" element={<GalleryPage />} />
        </Routes>
        
        <FloatingCTA onScheduleTour={handleScheduleTour} />
        <Footer />
      </div>
    </Router>
  );
}

export default App;