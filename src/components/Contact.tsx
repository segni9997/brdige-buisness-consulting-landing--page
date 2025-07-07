import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle } from 'lucide-react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate form submission
    setIsSubmitted(true);
    setTimeout(() => setIsSubmitted(false), 3000);
    setFormData({ name: '', email: '', company: '', message: '' });
  };

  return (
    <section id="contact" className="py-20 relative overflow-hidden">
      {/* Background Image with Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-10"
        style={{
          backgroundImage: 'url(https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=1920)'
        }}
      ></div>
      <div className="absolute inset-0 bg-gradient-to-br from-gray-50 to-white"></div>
      
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 right-20 w-56 h-56 bg-red-500/5 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-20 left-20 w-72 h-72 bg-blue-500/5 rounded-full blur-3xl animate-float-delayed"></div>
      </div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 animate-fade-in-up">
            Get In Touch
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto animate-fade-in-up delay-200">
            Ready to transform your business? Contact us today for a free consultation 
            and discover how we can help you achieve your goals.
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="animate-fade-in-left">
            <h3 className="text-2xl font-semibold text-gray-900 mb-6">
              Let's Start a Conversation
            </h3>
            
            <div className="space-y-6">
              {[
                {
                  icon: <Phone className="h-6 w-6 text-white" />,
                  title: 'Phone',
                  info: '+1 (555) 123-4567',
                  subInfo: 'Mon-Fri 9AM-6PM EST',
                  gradient: 'from-red-500 to-red-600'
                },
                {
                  icon: <Mail className="h-6 w-6 text-white" />,
                  title: 'Email',
                  info: 'contact@bridgeconsultancy.com',
                  subInfo: "We'll respond within 24 hours",
                  gradient: 'from-blue-500 to-blue-600'
                },
                {
                  icon: <MapPin className="h-6 w-6 text-white" />,
                  title: 'Office',
                  info: '123 Business District',
                  subInfo: 'New York, NY 10001',
                  gradient: 'from-orange-500 to-orange-600'
                }
              ].map((contact, index) => (
                <div key={index} className="flex items-start space-x-4 group">
                  <div className={`flex-shrink-0 w-14 h-14 bg-gradient-to-r ${contact.gradient} rounded-lg flex items-center justify-center group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 shadow-lg`}>
                    {contact.icon}
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1 group-hover:text-red-600 transition-colors duration-300">{contact.title}</h4>
                    <p className="text-gray-600 font-medium">{contact.info}</p>
                    <p className="text-sm text-gray-500">{contact.subInfo}</p>
                  </div>
                </div>
              ))}
            </div>
            
            <div 
              className="mt-8 p-6 bg-gradient-to-r from-red-50 to-blue-50 rounded-lg border border-red-100 group hover:shadow-lg transition-all duration-300"
              style={{
                clipPath: 'polygon(0 0, calc(100% - 15px) 0, 100% 15px, 100% 100%, 15px 100%, 0 calc(100% - 15px))'
              }}
            >
              <h4 className="font-semibold text-gray-900 mb-3 group-hover:text-red-600 transition-colors duration-300">
                Schedule a Free Consultation
              </h4>
              <p className="text-gray-600 mb-4">
                Book a 30-minute discovery call to discuss your business challenges and explore how we can help.
              </p>
              <button className="bg-gradient-to-r from-red-600 to-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:from-red-700 hover:to-blue-700 transition-all duration-300 transform hover:scale-105 hover:shadow-lg">
                Book Now
              </button>
            </div>
          </div>
          
          <div 
            className="bg-white p-8 rounded-xl shadow-lg border border-gray-100 animate-fade-in-right hover:shadow-2xl transition-all duration-500"
            style={{
              clipPath: 'polygon(0 0, calc(100% - 20px) 0, 100% 20px, 100% calc(100% - 20px), calc(100% - 20px) 100%, 0 100%)'
            }}
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="group">
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2 group-focus-within:text-red-600 transition-colors duration-200">
                  Full Name *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-200 hover:border-red-300"
                  placeholder="Your full name"
                />
              </div>
              
              <div className="group">
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2 group-focus-within:text-red-600 transition-colors duration-200">
                  Email Address *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-200 hover:border-red-300"
                  placeholder="your.email@company.com"
                />
              </div>
              
              <div className="group">
                <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-2 group-focus-within:text-red-600 transition-colors duration-200">
                  Company Name
                </label>
                <input
                  type="text"
                  id="company"
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-200 hover:border-red-300"
                  placeholder="Your company name"
                />
              </div>
              
              <div className="group">
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2 group-focus-within:text-red-600 transition-colors duration-200">
                  Message *
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-200 hover:border-red-300 resize-none"
                  placeholder="Tell us about your business challenges and goals..."
                />
              </div>
              
              <button
                type="submit"
                disabled={isSubmitted}
                className="w-full bg-gradient-to-r from-red-600 to-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:from-red-700 hover:to-blue-700 transition-all duration-300 flex items-center justify-center space-x-2 disabled:opacity-50 transform hover:scale-105 hover:shadow-lg"
              >
                {isSubmitted ? (
                  <>
                    <CheckCircle className="h-5 w-5 animate-bounce" />
                    <span>Message Sent!</span>
                  </>
                ) : (
                  <>
                    <Send className="h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
                    <span>Send Message</span>
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;