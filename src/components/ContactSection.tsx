import React from 'react';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';

const ContactSection = () => {
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
                Contact our Wedding Concierge team to schedule a tour and begin planning your celebration at West Maui's most renowned venue.
              </p>
              
              <form className="space-y-6" name="contact" method="POST" data-netlify="true" action="/thank-you"
                    onSubmit={async (e) => {
                      e.preventDefault();
                      const form = e.target as HTMLFormElement;
                      const formData = new FormData(form);
                      
                      // Extract form data for webhook
                      const firstName = formData.get('firstName') as string;
                      const lastName = formData.get('lastName') as string;
                      const email = formData.get('email') as string;
                      const phone = formData.get('phone') as string;
                      const eventDate = formData.get('eventDate') as string;
                      const guests = formData.get('guests') as string;
                      const message = formData.get('message') as string;
                      
                      // Send webhook
                      const webhookData = {
                        form_type: 'Contact Form',
                        firstName: firstName,
                        lastName: lastName,
                        fullName: `${firstName} ${lastName}`,
                        email: email,
                        phone: phone,
                        eventDate: eventDate,
                        guests: guests,
                        message: message,
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
                        
                        // Also submit to Cloudflare Forms as backup
                        await fetch('/', {
                          method: 'POST',
                          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                          body: new URLSearchParams(formData as any).toString(),
                        });
                        
                        // Redirect to thank you page
                        window.location.href = '/thank-you';
                      } catch (error) {
                        console.error('Form submission error:', error);
                        alert('Thank you for your inquiry! We\'ll be in touch soon.');
                        form.reset();
                      }
                    }}>
                {/* Hidden field for Cloudflare Forms */}
                <input type="hidden" name="form-name" value="contact" />
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="firstName" className="block text-sm font-medium text-dark-600 mb-1">First Name</label>
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      required
                      className="w-full px-4 py-3 bg-[#fcfcfb] border border-olive-200 text-dark-700 rounded-lg focus:ring-2 focus:ring-olive-400 focus:border-olive-400 transition-all duration-300"
                      placeholder="Your first name"
                    />
                  </div>
                  <div>
                    <label htmlFor="lastName" className="block text-sm font-medium text-dark-600 mb-1">Last Name</label>
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      required
                      className="w-full px-4 py-3 bg-[#fcfcfb] border border-olive-200 text-dark-700 rounded-lg focus:ring-2 focus:ring-olive-400 focus:border-olive-400 transition-all duration-300"
                      placeholder="Your last name"
                    />
                  </div>
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-dark-600 mb-1">Email Address</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    className="w-full px-4 py-3 bg-[#fcfcfb] border border-olive-200 text-dark-700 rounded-lg focus:ring-2 focus:ring-olive-400 focus:border-olive-400 transition-all duration-300"
                    placeholder="your.email@example.com"
                  />
                </div>
                
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-dark-600 mb-1">Phone Number</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    className="w-full px-4 py-3 bg-[#fcfcfb] border border-olive-200 text-dark-700 rounded-lg focus:ring-2 focus:ring-olive-400 focus:border-olive-400 transition-all duration-300"
                    placeholder="(808) 555-1234"
                  />
                </div>
                
                <div>
                  <label htmlFor="eventDate" className="block text-sm font-medium text-dark-600 mb-1">Preferred Wedding Date</label>
                  <input
                    type="date"
                    id="eventDate"
                    name="eventDate"
                    className="w-full px-4 py-3 bg-[#fcfcfb] border border-olive-200 text-dark-700 rounded-lg focus:ring-2 focus:ring-olive-400 focus:border-olive-400 transition-all duration-300"
                  />
                </div>
                
                <div>
                  <label htmlFor="guests" className="block text-sm font-medium text-dark-600 mb-1">Estimated Number of Guests</label>
                  <select
                    id="guests"
                    name="guests"
                    className="w-full px-4 py-3 bg-[#fcfcfb] border border-olive-200 text-dark-700 rounded-lg focus:ring-2 focus:ring-olive-400 focus:border-olive-400 transition-all duration-300"
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
                  <label htmlFor="message" className="block text-sm font-medium text-dark-600 mb-1">Additional Information</label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    className="w-full px-4 py-3 bg-[#fcfcfb] border border-olive-200 text-dark-700 rounded-lg focus:ring-2 focus:ring-olive-400 focus:border-olive-400 transition-all duration-300"
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