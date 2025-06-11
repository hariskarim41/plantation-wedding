import React, { useState } from 'react';
import { MapPin, Phone, Mail, Clock, ArrowRight, ArrowLeft, CheckCircle } from 'lucide-react';

const ContactSection = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    emailOptIn: false,
    phone: '',
    location: '',
    eventDate: '',
    eventTime: '',
    eventEndTime: '',
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
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
          try {
        // Prepare form data for webhook
        const webhookData = {
          form_type: 'Event Request',
          ...formData,
          timestamp: new Date().toISOString(),
          source: 'plantation-wedding.com'
        };
        
        // Create FormData for Cloudflare Forms
        const cloudflareFormData = new FormData();
        Object.entries(formData).forEach(([key, value]) => {
          cloudflareFormData.append(key, value as string);
        });
        cloudflareFormData.append('form-name', 'contact');
        
        // Send to Cloudflare Function
        const response = await fetch('/submitForm', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(webhookData)
        });
        
        // Check response from API
        if (response.ok) {
          // Also submit to Cloudflare Forms as backup
          await fetch('/', {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: new URLSearchParams(cloudflareFormData as any).toString(),
          });
          
          // Redirect to thank you page only if submission was successful
          window.location.href = '/thank-you';
        } else {
          // Handle server error
          const data = await response.json();
          throw new Error(data.message || 'Form submission failed');
        }
      } catch (error) {
        console.error('Form submission error:', error);
        alert('Thank you for your event request! Our team will be in touch with you soon to discuss your event needs.');
        setIsSubmitting(false);
      }
  };
  
  const validateStep = (step: number) => {
    if (step === 1) {
      return formData.name.trim() !== '' && 
             formData.email.trim() !== '' && 
             formData.phone.trim() !== '';
    }
    if (step === 2) {
      return formData.eventDate.trim() !== '' && 
             formData.eventTime.trim() !== '' && 
             formData.guests.trim() !== '';
    }
    return true;
  };
  
  const renderStepIndicator = () => {
    return (
      <div className="flex items-center justify-center mb-8">
        <div className="flex items-center">
          <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
            currentStep >= 1 ? 'bg-olive-600 text-white' : 'bg-olive-100 text-dark-400'
          }`}>
            1
          </div>
          <div className={`w-16 h-1 ${currentStep >= 2 ? 'bg-olive-600' : 'bg-olive-100'}`}></div>
          <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
            currentStep >= 2 ? 'bg-olive-600 text-white' : 'bg-olive-100 text-dark-400'
          }`}>
            2
          </div>
          <div className={`w-16 h-1 ${currentStep >= 3 ? 'bg-olive-600' : 'bg-olive-100'}`}></div>
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
    <section id="contact" className="py-24 bg-gradient-to-br from-[#f3f1ee] to-[#e2dbcf] relative">
      {/* Flower pattern overlay */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div className="h-full w-full" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='88' height='24' viewBox='0 0 88 24'%3E%3Cg fill-rule='evenodd'%3E%3Cg fill='%235F653C' fill-opacity='0.2'%3E%3Cpath d='M13 0h1v8h-1V0zm0 16h1v8H6v-8zM6 0h1v8H6V0zm0 16h1v8H6v-8zM0 0h1v8H0V0zm0 16h1v8H0v-8zM19 0h1v8h-1V0zm0 16h1v8h-1v-8zM38 0h1v8h-1V0zm0 16h1v8h-1v-8zM31 0h1v8h-1V0zm0 16h1v8h-1v-8zM25 0h1v8h-1V0zm0 16h1v8h-1v-8zM44 0h1v8h-1V0zm0 16h1v8h-1v-8zM63 0h1v8h-1V0zm0 16h1v8h-1v-8zM56 0h1v8h-1V0zm0 16h1v8h-1v-8zM50 0h1v8h-1V0zm0 16h1v8h-1v-8zM69 0h1v8h-1V0zm0 16h1v8h-1v-8zM88 0h1v8h-1V0zm0 16h1v8h-1v-8zM81 0h1v8h-1V0zm0 16h1v8h-1v-8zM75 0h1v8h-1V0zm0 16h1v8h-1v-8z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col lg:flex-row bg-white shadow-lg rounded-xl overflow-hidden border border-olive-200">
            <div className="lg:w-1/2 p-8 lg:p-12">
                              <h2 className="text-3xl text-olive-800 mb-6 font-light italic"
                style={{ fontFamily: '"palatino-linotype", "Palatino Linotype", "Palatino", serif !important', fontStyle: 'italic !important' }}
              >
                <span style={{ fontFamily: '"palatino-linotype", "Palatino Linotype", "Palatino", serif', fontStyle: 'italic' }}>
                  Your Perfect Maui Wedding Begins Here
                </span>
              </h2>
              <p className="text-dark-500 mb-10 leading-relaxed">
                Tell us about your event vision and our Wedding Concierge team will reach out to help you plan your celebration at West Maui's most renowned venue.
              </p>
              
              {renderStepIndicator()}
              
              <form className="space-y-6" name="contact" method="POST" data-netlify="true" action="/thank-you" onSubmit={handleSubmit}>
                {/* Hidden field for Cloudflare Forms */}
                <input type="hidden" name="form-name" value="contact" />
                
                {/* Step 1: Personal Details */}
                {currentStep === 1 && (
                  <div className="mb-6">
                    <h3 className="text-lg font-medium text-olive-800 mb-3">Personal Details</h3>
                    <div className="space-y-4">
                      <div>
                        <label htmlFor="name" className="block text-sm font-medium text-dark-600 mb-1">Name <span className="text-red-500">*</span></label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          required
                          className="w-full px-4 py-3 bg-[#fcfcfb] border border-olive-200 text-dark-700 rounded-lg focus:ring-2 focus:ring-olive-400 focus:border-olive-400 transition-all duration-300"
                          placeholder="Your name"
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="company" className="block text-sm font-medium text-dark-600 mb-1">Company</label>
                        <input
                          type="text"
                          id="company"
                          name="company"
                          value={formData.company}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 bg-[#fcfcfb] border border-olive-200 text-dark-700 rounded-lg focus:ring-2 focus:ring-olive-400 focus:border-olive-400 transition-all duration-300"
                          placeholder="Your company (if applicable)"
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="email" className="block text-sm font-medium text-dark-600 mb-1">Email Address <span className="text-red-500">*</span></label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          required
                          className="w-full px-4 py-3 bg-[#fcfcfb] border border-olive-200 text-dark-700 rounded-lg focus:ring-2 focus:ring-olive-400 focus:border-olive-400 transition-all duration-300"
                          placeholder="your.email@example.com"
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
                        <label htmlFor="phone" className="block text-sm font-medium text-dark-600 mb-1">Phone Number <span className="text-red-500">*</span></label>
                        <input
                          type="tel"
                          id="phone"
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          required
                          className="w-full px-4 py-3 bg-[#fcfcfb] border border-olive-200 text-dark-700 rounded-lg focus:ring-2 focus:ring-olive-400 focus:border-olive-400 transition-all duration-300"
                          placeholder="(808) 555-1234"
                        />
                      </div>
                    </div>
                    
                    <div className="mt-4 text-xs text-dark-500">
                      By submitting this form, you agree to our <a href="https://www.tripleseat.com/privacy-policy" target="_blank" rel="noopener noreferrer" className="text-olive-600 hover:underline">Tripleseat Privacy Policy</a>.
                    </div>
                    
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
                
                {/* Step 2: Event Details */}
                {currentStep === 2 && (
                  <div className="mb-6">
                    <h3 className="text-lg font-medium text-olive-800 mb-3">Event Details</h3>
                    <div className="space-y-4">
                      <div>
                        <label htmlFor="location" className="block text-sm font-medium text-dark-600 mb-1">Location</label>
                        <input
                          type="text"
                          id="location"
                          name="location"
                          value={formData.location}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 bg-[#fcfcfb] border border-olive-200 text-dark-700 rounded-lg focus:ring-2 focus:ring-olive-400 focus:border-olive-400 transition-all duration-300"
                          placeholder="Event location"
                        />
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label htmlFor="eventDate" className="block text-sm font-medium text-dark-600 mb-1">Date <span className="text-red-500">*</span></label>
                          <input
                            type="date"
                            id="eventDate"
                            name="eventDate"
                            value={formData.eventDate}
                            onChange={handleInputChange}
                            required
                            className="w-full px-4 py-3 bg-[#fcfcfb] border border-olive-200 text-dark-700 rounded-lg focus:ring-2 focus:ring-olive-400 focus:border-olive-400 transition-all duration-300"
                          />
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label htmlFor="eventTime" className="block text-sm font-medium text-dark-600 mb-1">Start Time <span className="text-red-500">*</span></label>
                          <input
                            type="time"
                            id="eventTime"
                            name="eventTime"
                            value={formData.eventTime}
                            onChange={handleInputChange}
                            required
                            className="w-full px-4 py-3 bg-[#fcfcfb] border border-olive-200 text-dark-700 rounded-lg focus:ring-2 focus:ring-olive-400 focus:border-olive-400 transition-all duration-300"
                          />
                        </div>
                        
                        <div>
                          <label htmlFor="eventEndTime" className="block text-sm font-medium text-dark-600 mb-1">End Time</label>
                          <input
                            type="time"
                            id="eventEndTime"
                            name="eventEndTime"
                            value={formData.eventEndTime}
                            onChange={handleInputChange}
                            className="w-full px-4 py-3 bg-[#fcfcfb] border border-olive-200 text-dark-700 rounded-lg focus:ring-2 focus:ring-olive-400 focus:border-olive-400 transition-all duration-300"
                          />
                        </div>
                      </div>
                      
                      <div>
                        <label htmlFor="eventStyle" className="block text-sm font-medium text-dark-600 mb-1">Event Style</label>
                        <select
                          id="eventStyle"
                          name="eventStyle"
                          value={formData.eventStyle}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 bg-[#fcfcfb] border border-olive-200 text-dark-700 rounded-lg focus:ring-2 focus:ring-olive-400 focus:border-olive-400 transition-all duration-300"
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
                        <label htmlFor="guests" className="block text-sm font-medium text-dark-600 mb-1">Number of People <span className="text-red-500">*</span></label>
                        <select
                          id="guests"
                          name="guests"
                          value={formData.guests}
                          onChange={handleInputChange}
                          required
                          className="w-full px-4 py-3 bg-[#fcfcfb] border border-olive-200 text-dark-700 rounded-lg focus:ring-2 focus:ring-olive-400 focus:border-olive-400 transition-all duration-300"
                        >
                          <option value="">Please select</option>
                          <option value="10-50">10-50</option>
                          <option value="51-100">51-100</option>
                          <option value="101-200">101-200</option>
                          <option value="201-300">201-300</option>
                          <option value="301+">301+</option>
                        </select>
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
                
                {/* Step 3: Additional Details */}
                {currentStep === 3 && (
                  <div className="mb-6">
                    <h3 className="text-lg font-medium text-olive-800 mb-3">Additional Information</h3>
                    <div className="space-y-4">
                      <div>
                        <label htmlFor="eventNature" className="block text-sm font-medium text-dark-600 mb-1">Nature of Event</label>
                        <select
                          id="eventNature"
                          name="eventNature"
                          value={formData.eventNature}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 bg-[#fcfcfb] border border-olive-200 text-dark-700 rounded-lg focus:ring-2 focus:ring-olive-400 focus:border-olive-400 transition-all duration-300"
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
                        <label htmlFor="hearAboutUs" className="block text-sm font-medium text-dark-600 mb-1">How did you hear about us?</label>
                        <select
                          id="hearAboutUs"
                          name="hearAboutUs"
                          value={formData.hearAboutUs}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 bg-[#fcfcfb] border border-olive-200 text-dark-700 rounded-lg focus:ring-2 focus:ring-olive-400 focus:border-olive-400 transition-all duration-300"
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
                        <label htmlFor="additionalInfo" className="block text-sm font-medium text-dark-600 mb-1">Additional Information</label>
                        <textarea
                          id="additionalInfo"
                          name="additionalInfo"
                          value={formData.additionalInfo}
                          onChange={handleInputChange}
                          rows={4}
                          className="w-full px-4 py-3 bg-[#fcfcfb] border border-olive-200 text-dark-700 rounded-lg focus:ring-2 focus:ring-olive-400 focus:border-olive-400 transition-all duration-300"
                          placeholder="Tell us about your vision or any questions you have..."
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
                          className="w-1/2 bg-olive-600 hover:bg-olive-500 text-white font-medium py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-102 shadow-md hover:shadow-lg flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          {isSubmitting ? (
                            <>Processing...</>
                          ) : (
                            <>
                              <CheckCircle size={18} className="mr-2" />
                              Send Request
                            </>
                          )}
                        </button>
                    </div>
                  </div>
                )}
              </form>
            </div>
            
            <div className="lg:w-1/2 relative">
              <img
                src="https://www.theplantationhouse.com/wp-content/uploads/2023/05/Photo-1.jpg"
                alt="Wedding at The Plantation House"
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-10000 animate-subtle-zoom-slow"
              />
              
              <div className="absolute bottom-0 left-0 right-0 p-8">
                <div className="bg-white/90 backdrop-blur-sm p-4 rounded-lg shadow-md border border-olive-200 space-y-4">
                  <div className="flex items-start group">
                    <MapPin className="h-5 w-5 mr-3 text-olive-600 mt-1 flex-shrink-0 group-hover:text-olive-500 transition-colors duration-300" />
                    <div>
                      <p className="font-medium text-olive-800">The Plantation House</p>
                      <p className="text-dark-500">2000 Plantation Club Drive, Kapalua, Maui, HI 96761</p>
                    </div>
                  </div>
                  
                  <a href="tel:(808)669-6299" className="flex items-center group hover:opacity-90 transition-opacity duration-300 text-dark-600">
                    <Phone className="h-5 w-5 mr-3 text-olive-600 flex-shrink-0 group-hover:text-olive-500 transition-colors duration-300" />
                    <span>(808) 669-6299</span>
                  </a>
                  
                  <a href="mailto:events@plantationhouse.com" className="flex items-center group hover:opacity-90 transition-opacity duration-300 text-dark-600">
                    <Mail className="h-5 w-5 mr-3 text-olive-600 flex-shrink-0 group-hover:text-olive-500 transition-colors duration-300" />
                    <span>events@plantationhouse.com</span>
                  </a>
                  
                  <div className="flex items-center group text-dark-600">
                    <Clock className="h-5 w-5 mr-3 text-olive-600 flex-shrink-0 group-hover:text-olive-500 transition-colors duration-300" />
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

export default ContactSection; 