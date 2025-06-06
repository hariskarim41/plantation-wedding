import React, { useState, useEffect } from 'react';
import { Calendar, Clock, X } from 'lucide-react';

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
            <h2 className="text-2xl font-light text-olive-800 italic font-['palatino-linotype']">Schedule Your Tour</h2>
            <button
              className="text-dark-500 hover:text-olive-600 transition-colors"
              onClick={onClose}
            >
              <X size={20} />
            </button>
          </div>
          
          <div className="flex-1 p-6 overflow-y-auto bg-gradient-to-b from-cream-50/50 to-white">
            <div className="mb-8">
              <div className="flex items-center justify-between mb-4">
                <button
                  className="text-dark-600 hover:text-olive-600 transition-colors p-2"
                  onClick={goToPreviousMonth}
                >
                  ←
                </button>
                <h3 className="text-lg font-medium text-olive-800">
                  {formatMonth(viewDate)} {viewDate.getFullYear()}
                </h3>
                <button
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
            
            <div className="mb-8">
              <h3 className="text-lg font-medium text-olive-800 mb-3">Select a Time</h3>
              <div className="grid grid-cols-2 gap-2">
                {getAvailableTimeSlots().map((time, index) => (
                  <button
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
            
            <form onSubmit={async (e) => {
              e.preventDefault();
              const form = e.target as HTMLFormElement;
              const formData = new FormData(form);
              
              // Extract form data for webhook
              const name = formData.get('name') as string;
              const email = formData.get('email') as string;
              const phone = formData.get('phone') as string;
              
              // Format selected date and time
              const tourDate = selectedDate.toDateString();
              const tourTime = selectedTime;
              
              // Send webhook
              const webhookData = {
                form_type: 'Schedule Tour',
                name: name,
                email: email,
                phone: phone,
                tourDate: tourDate,
                tourTime: tourTime,
                timestamp: new Date().toISOString(),
                source: 'plantation-wedding.com'
              };
              
              try {
                // Send webhook
                await fetch('https://webhook.site/ebab4374-044e-45b7-bc9b-66da7adfe3e4', {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify(webhookData)
                });
                
                // Show success message and close modal
                alert(`Thank you ${name}! Your tour is scheduled for ${tourDate} at ${tourTime}. We'll contact you shortly to confirm.`);
                onClose();
              } catch (error) {
                console.error('Tour booking error:', error);
                alert(`Thank you ${name}! Your tour request has been received. We'll contact you shortly to confirm your ${tourDate} appointment.`);
                onClose();
              }
            }}>
              <div className="mb-6">
                <h3 className="text-lg font-medium text-olive-800 mb-3">Contact Information</h3>
                <div className="space-y-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-dark-600 mb-1">
                      Full Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      className="w-full px-3 py-2 bg-white border border-olive-100 rounded-md text-dark-700 placeholder-dark-400 focus:outline-none focus:ring-2 focus:ring-olive-500 focus:border-transparent"
                      placeholder="Your name"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-dark-600 mb-1">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      className="w-full px-3 py-2 bg-white border border-olive-100 rounded-md text-dark-700 placeholder-dark-400 focus:outline-none focus:ring-2 focus:ring-olive-500 focus:border-transparent"
                      placeholder="yourname@example.com"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-dark-600 mb-1">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      className="w-full px-3 py-2 bg-white border border-olive-100 rounded-md text-dark-700 placeholder-dark-400 focus:outline-none focus:ring-2 focus:ring-olive-500 focus:border-transparent"
                      placeholder="(808) 555-1234"
                    />
                  </div>
                </div>
              </div>
              
              <button
                type="submit"
                disabled={!selectedTime}
                className="w-full bg-olive-600 hover:bg-olive-500 text-white font-medium py-3 px-4 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-olive-600 focus:ring-offset-2 focus:ring-offset-white transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              >
                <Calendar size={18} className="inline-block mr-2 -mt-0.5" />
                Confirm Your Tour
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingModal; 