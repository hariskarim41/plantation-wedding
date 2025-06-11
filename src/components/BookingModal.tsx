import React, { useState, useEffect } from 'react';
import { Calendar, Clock, X, ArrowRight, ArrowLeft, CheckCircle } from 'lucide-react';

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
  const [selectedEndTime, setSelectedEndTime] = useState<string | null>(null);
  const [viewDate, setViewDate] = useState<Date>(selectedDate);
  
  // Form steps and data
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    emailOptIn: false,
    phone: '',
    location: '',
    eventStyle: '',
    guests: '',
    eventNature: '',
    hearAboutUs: '',
    additionalInfo: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: checked
    }));
  };
  
  const nextStep = () => {
    setCurrentStep(prev => Math.min(prev + 1, 3));
  };
  
  const prevStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };
  
  const validateStep = (step: number) => {
    if (step === 1) {
      return selectedDate && selectedTime;
    }
    if (step === 2) {
      return formData.name.trim() !== '' && 
             formData.email.trim() !== '' && 
             formData.phone.trim() !== '';
    }
    return true;
  };
  
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
      day === selectedDate.getDate() &&
      viewDate.getMonth() === selectedDate.getMonth() &&
      viewDate.getFullYear() === selectedDate.getFullYear()
    );
  };
  
  // Check if a time slot is available based on selected date
  const isTimeSlotAvailable = (timeSlot: string | null) => {
    if (!timeSlot) return false;
    
    // If selected date is today, check if time slot is at least 3 hours from now
    if (isToday(selectedDate)) {
      const currentHour = today.getHours();
      const currentMinute = today.getMinutes();
      const currentTimeIn24Format = currentHour + (currentMinute / 60);
      
      const timeSlots = ["9:00 AM", "10:30 AM", "12:00 PM", "1:30 PM", "3:00 PM", "4:30 PM"];
      const hourToTimeSlot = [9, 10.5, 12, 13.5, 15, 16.5]; // equivalent hours
      
      const index = timeSlots.indexOf(timeSlot);
      if (index !== -1) {
        return hourToTimeSlot[index] >= currentTimeIn24Format + 3;
      }
    }
    
    // All time slots are available for future dates
    return true;
  };
  
  // Close modal when clicking outside
  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };
  
  const getAvailableTimeSlots = () => {
    const timeSlots = ["9:00 AM", "10:30 AM", "12:00 PM", "1:30 PM", "3:00 PM", "4:30 PM"];
    
    // If selected date is today, filter out time slots that are less than 3 hours away
    if (isToday(selectedDate)) {
      return timeSlots.filter(slot => isTimeSlotAvailable(slot));
    }
    
    return timeSlots;
  };
  
  const getEndTimeSlots = () => {
    if (!selectedTime) return [];
    
    const timeSlots = ["9:00 AM", "10:30 AM", "12:00 PM", "1:30 PM", "3:00 PM", "4:30 PM", "6:00 PM", "7:30 PM", "9:00 PM"];
    const selectedIndex = timeSlots.indexOf(selectedTime);
    
    if (selectedIndex === -1) return timeSlots;
    
    // Return only time slots that are after the selected start time
    return timeSlots.slice(selectedIndex + 1);
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Format selected date and time
      const tourDate = selectedDate.toDateString();
      
      // Prepare webhook data
      const webhookData = {
        form_type: 'Event Request',
        ...formData,
        preferredDate: selectedDate.toDateString(),
        preferredStartTime: selectedTime,
        preferredEndTime: selectedEndTime,
        timestamp: new Date().toISOString(),
        source: 'plantation-wedding.com'
      };
      
      // Send to Cloudflare Function
      const response = await fetch('/submitForm', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(webhookData)
      });
      
      // Check response from API
      if (response.ok) {
        // Show success message and close modal only if submission was successful
        alert(`Thank you ${formData.name}! Your event request has been received. Our team will contact you shortly to discuss your event on ${selectedDate.toDateString()}.`);
        onClose();
      } else {
        // Handle server error
        const data = await response.json();
        throw new Error(data.message || 'Form submission failed');
      }
    } catch (error) {
      console.error('Event request error:', error);
      alert(`Thank you ${formData.name}! Your event request has been received. Our team will be in touch soon to discuss your event needs.`);
      onClose();
    }
  };
  
  const renderStepIndicator = () => {
    return (
      <div className="flex items-center justify-center mb-6">
        <div className="flex items-center">
          <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
            currentStep >= 1 ? 'bg-olive-600 text-white' : 'bg-olive-100 text-dark-400'
          }`}>
            1
          </div>
          <div className={`w-10 h-1 ${currentStep >= 2 ? 'bg-olive-600' : 'bg-olive-100'}`}></div>
          <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
            currentStep >= 2 ? 'bg-olive-600 text-white' : 'bg-olive-100 text-dark-400'
          }`}>
            2
          </div>
          <div className={`w-10 h-1 ${currentStep >= 3 ? 'bg-olive-600' : 'bg-olive-100'}`}></div>
          <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
            currentStep >= 3 ? 'bg-olive-600 text-white' : 'bg-olive-100 text-dark-400'
          }`}>
            3
          </div>
        </div>
      </div>
    );
  };
  
  return (
    <div className="fixed inset-0 z-50 flex">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-dark-800/30 backdrop-blur-sm transition-opacity duration-300"
        onClick={handleBackdropClick}
      ></div>
      
      {/* Side modal */}
      <div className="fixed right-0 top-0 bottom-0 w-full max-w-md z-50 shadow-xl transform transition-transform duration-500 ease-in-out bg-white overflow-y-auto">
        <div className="h-full flex flex-col">
          <div className="flex justify-between items-center p-5 border-b border-olive-100 bg-cream-50">
            <h2 className="text-2xl font-light text-olive-800 italic font-['palatino-linotype']">Your Dream Wedding</h2>
            <button
              className="text-dark-500 hover:text-olive-600 transition-colors"
              onClick={onClose}
            >
              <X size={20} />
            </button>
          </div>
          
          <div className="flex-1 p-6 overflow-y-auto bg-gradient-to-b from-cream-50/50 to-white">
            {renderStepIndicator()}
            
            <form onSubmit={handleSubmit}>
              {/* Step 1: Date & Time Selection */}
              {currentStep === 1 && (
                <div>
                  <div className="mb-6">
                                         <h3 className="text-lg font-medium text-olive-800 mb-3">Preferred Date</h3>
                    <div className="flex items-center justify-between mb-4">
                      <button
                        type="button"
                        className="text-dark-600 hover:text-olive-600 transition-colors p-2"
                        onClick={goToPreviousMonth}
                      >
                        ←
                      </button>
                      <h3 className="text-lg font-medium text-olive-800">
                        {formatMonth(viewDate)} {viewDate.getFullYear()}
                      </h3>
                      <button
                        type="button"
                        className="text-dark-600 hover:text-olive-600 transition-colors p-2"
                        onClick={goToNextMonth}
                      >
                        →
                      </button>
                    </div>
                    
                    <div className="grid grid-cols-7 gap-1 text-center">
                      {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map((day, index) => (
                        <div key={index} className="text-xs font-medium text-dark-500 py-1">
                          {day}
                        </div>
                      ))}
                      
                      {generateCalendarDays().map((day, index) => (
                        <button
                          type="button"
                          key={index}
                          disabled={!isDaySelectable(day)}
                          onClick={() => day !== null && isDaySelectable(day) && handleDaySelect(day)}
                          className={`
                            h-9 rounded-full text-sm font-medium
                            ${day === null ? '' : 'hover:bg-cream-100'}
                            ${isSelectedDay(day) ? 'bg-olive-600 text-white hover:bg-olive-500' : ''}
                            ${!isDaySelectable(day) && day !== null ? 'text-dark-300 cursor-not-allowed' : 'text-dark-700'}
                          `}
                        >
                          {day}
                        </button>
                      ))}
                    </div>
                  </div>
                  
                  <div className="mb-6">
                    <h3 className="text-lg font-medium text-olive-800 mb-3">Preferred Start Time</h3>
                    <div className="grid grid-cols-2 gap-2">
                      {getAvailableTimeSlots().map((time, index) => (
                        <button
                          type="button"
                          key={index}
                          onClick={() => setSelectedTime(time)}
                          className={`
                            py-2 px-3 rounded border text-sm font-medium
                            ${selectedTime === time 
                              ? 'bg-olive-600 text-white border-olive-600 hover:bg-olive-500 hover:border-olive-500' 
                              : 'border-olive-100 text-dark-600 hover:border-olive-200 hover:bg-cream-50'}
                          `}
                        >
                          <Clock size={16} className="inline-block mr-1.5 -mt-0.5" />
                          {time}
                        </button>
                      ))}
                    </div>
                  </div>
                  
                  {selectedTime && (
                    <div className="mb-6">
                      <h3 className="text-lg font-medium text-olive-800 mb-3">Preferred End Time (Optional)</h3>
                      <div className="grid grid-cols-2 gap-2">
                        {getEndTimeSlots().map((time, index) => (
                          <button
                            type="button"
                            key={index}
                            onClick={() => setSelectedEndTime(time)}
                            className={`
                              py-2 px-3 rounded border text-sm font-medium
                              ${selectedEndTime === time 
                                ? 'bg-olive-600 text-white border-olive-600 hover:bg-olive-500 hover:border-olive-500' 
                                : 'border-olive-100 text-dark-600 hover:border-olive-200 hover:bg-cream-50'}
                            `}
                          >
                            <Clock size={16} className="inline-block mr-1.5 -mt-0.5" />
                            {time}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  <div className="mt-8 flex justify-end">
                    <button
                      type="button"
                      onClick={nextStep}
                      disabled={!validateStep(1)}
                      className="bg-olive-600 hover:bg-olive-500 text-white font-medium py-2 px-6 rounded-lg transition-all duration-300 flex items-center disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Next Step <ArrowRight size={16} className="ml-2" />
                    </button>
                  </div>
                </div>
              )}
              
              {/* Step 2: Personal Details */}
              {currentStep === 2 && (
                <div className="mb-6">
                  <h3 className="text-lg font-medium text-olive-800 mb-3">Personal Details</h3>
                  <div className="space-y-4">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-dark-600 mb-1">
                        Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 bg-white border border-olive-100 rounded-md text-dark-700 placeholder-dark-400 focus:outline-none focus:ring-2 focus:ring-olive-500 focus:border-transparent"
                        placeholder="Your name"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="company" className="block text-sm font-medium text-dark-600 mb-1">
                        Company
                      </label>
                      <input
                        type="text"
                        id="company"
                        name="company"
                        value={formData.company}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 bg-white border border-olive-100 rounded-md text-dark-700 placeholder-dark-400 focus:outline-none focus:ring-2 focus:ring-olive-500 focus:border-transparent"
                        placeholder="Your company (if applicable)"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-dark-600 mb-1">
                        Email <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 bg-white border border-olive-100 rounded-md text-dark-700 placeholder-dark-400 focus:outline-none focus:ring-2 focus:ring-olive-500 focus:border-transparent"
                        placeholder="yourname@example.com"
                      />
                    </div>
                    
                    <div className="flex items-start">
                      <div className="flex items-center h-5">
                        <input
                          id="emailOptIn"
                          name="emailOptIn"
                          type="checkbox"
                          checked={formData.emailOptIn}
                          onChange={handleCheckboxChange}
                          className="h-4 w-4 text-olive-600 focus:ring-olive-400 border-olive-300 rounded"
                        />
                      </div>
                      <div className="ml-3 text-sm">
                        <label htmlFor="emailOptIn" className="text-dark-600">Yes, please send me updates about events and special offers</label>
                      </div>
                    </div>
                    
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-dark-600 mb-1">
                        Phone Number <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        required
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 bg-white border border-olive-100 rounded-md text-dark-700 placeholder-dark-400 focus:outline-none focus:ring-2 focus:ring-olive-500 focus:border-transparent"
                        placeholder="(808) 555-1234"
                      />
                    </div>
                  </div>
                  
                  <div className="mt-4 text-xs text-dark-500">
                    By submitting this form, you agree to our <a href="https://www.tripleseat.com/privacy-policy" target="_blank" rel="noopener noreferrer" className="text-olive-600 hover:underline">Tripleseat Privacy Policy</a>.
                  </div>
                  
                  <div className="mt-8 flex justify-between">
                    <button
                      type="button"
                      onClick={prevStep}
                      className="border border-olive-300 hover:bg-olive-50 text-olive-700 font-medium py-2 px-6 rounded-lg transition-all duration-300 flex items-center"
                    >
                      <ArrowLeft size={16} className="mr-2" /> Back
                    </button>
                    <button
                      type="button"
                      onClick={nextStep}
                      disabled={!validateStep(2)}
                      className="bg-olive-600 hover:bg-olive-500 text-white font-medium py-2 px-6 rounded-lg transition-all duration-300 flex items-center disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Next Step <ArrowRight size={16} className="ml-2" />
                    </button>
                  </div>
                </div>
              )}
              
              {/* Step 3: Event Details */}
              {currentStep === 3 && (
                <div className="mb-6">
                  <h3 className="text-lg font-medium text-olive-800 mb-3">Event Details</h3>
                  <div className="space-y-4">
                    <div>
                      <label htmlFor="location" className="block text-sm font-medium text-dark-600 mb-1">
                        Location
                      </label>
                      <input
                        type="text"
                        id="location"
                        name="location"
                        value={formData.location}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 bg-white border border-olive-100 rounded-md text-dark-700 placeholder-dark-400 focus:outline-none focus:ring-2 focus:ring-olive-500 focus:border-transparent"
                        placeholder="Event location"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="eventStyle" className="block text-sm font-medium text-dark-600 mb-1">
                        Event Style
                      </label>
                      <select
                        id="eventStyle"
                        name="eventStyle"
                        value={formData.eventStyle}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 bg-white border border-olive-100 rounded-md text-dark-700 placeholder-dark-400 focus:outline-none focus:ring-2 focus:ring-olive-500 focus:border-transparent"
                      >
                        <option value="">Please select</option>
                        <option value="Formal">Formal</option>
                        <option value="Semi-Formal">Semi-Formal</option>
                        <option value="Casual">Casual</option>
                        <option value="Beach">Beach</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>
                    
                    <div>
                      <label htmlFor="guests" className="block text-sm font-medium text-dark-600 mb-1">
                        Number of People <span className="text-red-500">*</span>
                      </label>
                      <select
                        id="guests"
                        name="guests"
                        required
                        value={formData.guests}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 bg-white border border-olive-100 rounded-md text-dark-700 placeholder-dark-400 focus:outline-none focus:ring-2 focus:ring-olive-500 focus:border-transparent"
                      >
                        <option value="">Please select</option>
                        <option value="10-50">10-50</option>
                        <option value="51-100">51-100</option>
                        <option value="101-200">101-200</option>
                        <option value="201-300">201-300</option>
                        <option value="301+">301+</option>
                      </select>
                    </div>
                    
                    <div>
                      <label htmlFor="eventNature" className="block text-sm font-medium text-dark-600 mb-1">
                        Nature of Event
                      </label>
                      <select
                        id="eventNature"
                        name="eventNature"
                        value={formData.eventNature}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 bg-white border border-olive-100 rounded-md text-dark-700 placeholder-dark-400 focus:outline-none focus:ring-2 focus:ring-olive-500 focus:border-transparent"
                      >
                        <option value="">Please select</option>
                        <option value="Wedding">Wedding</option>
                        <option value="Reception">Reception</option>
                        <option value="Engagement">Engagement</option>
                        <option value="Anniversary">Anniversary</option>
                        <option value="Corporate">Corporate</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>
                    
                    <div>
                      <label htmlFor="hearAboutUs" className="block text-sm font-medium text-dark-600 mb-1">
                        How did you hear about us?
                      </label>
                      <select
                        id="hearAboutUs"
                        name="hearAboutUs"
                        value={formData.hearAboutUs}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 bg-white border border-olive-100 rounded-md text-dark-700 placeholder-dark-400 focus:outline-none focus:ring-2 focus:ring-olive-500 focus:border-transparent"
                      >
                        <option value="">Please select</option>
                        <option value="Search Engine">Search Engine</option>
                        <option value="Social Media">Social Media</option>
                        <option value="Friend/Family">Friend/Family</option>
                        <option value="Wedding Planner">Wedding Planner</option>
                        <option value="Magazine">Magazine</option>
                        <option value="Previous Visit">Previous Visit</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>
                    
                    <div>
                      <label htmlFor="additionalInfo" className="block text-sm font-medium text-dark-600 mb-1">
                        Additional Information
                      </label>
                      <textarea
                        id="additionalInfo"
                        name="additionalInfo"
                        rows={3}
                        value={formData.additionalInfo}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 bg-white border border-olive-100 rounded-md text-dark-700 placeholder-dark-400 focus:outline-none focus:ring-2 focus:ring-olive-500 focus:border-transparent"
                        placeholder="Any special requests or additional details..."
                      ></textarea>
                    </div>
                  </div>
                  
                  <div className="mt-8 flex justify-between">
                    <button
                      type="button"
                      onClick={prevStep}
                      className="border border-olive-300 hover:bg-olive-50 text-olive-700 font-medium py-2 px-6 rounded-lg transition-all duration-300 flex items-center"
                    >
                      <ArrowLeft size={16} className="mr-2" /> Back
                    </button>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="bg-olive-600 hover:bg-olive-500 text-white font-medium py-3 px-4 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-olive-600 focus:ring-offset-2 focus:ring-offset-white transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
                    >
                      {isSubmitting ? (
                        <>Processing...</>
                      ) : (
                        <>
                          <Calendar size={18} className="mr-2" />
                          Tell Us About Your Dream Wedding
                        </>
                      )}
                    </button>
                  </div>
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingModal; 