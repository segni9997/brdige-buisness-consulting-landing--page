import React, { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Mail, Phone, MapPin, Send, CheckCircle } from 'lucide-react';
import { useCreateCommentMutation } from '../store/api';

const Contact = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const [createComment] = useCreateCommentMutation();
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createComment({
        fullName: formData.name,
        email: formData.email,
        comment: formData.message,
        Company: formData.company,
        status: 'pending'
      }).unwrap();
      
      setIsSubmitted(true);
      setTimeout(() => setIsSubmitted(false), 3000);
      setFormData({ name: '', email: '', company: '', message: '' });
    } catch (err) {
      console.error('Failed to send message:', err);
    }
  };

  return (
    <section id="contact" className="py-16 md:py-24 relative overflow-hidden bg-black/80">
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-full h-full" style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, rgba(255,193,7,0.1) 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }}></div>
      </div>
      
      <motion.div 
        className="absolute inset-0 overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <motion.div 
          className="absolute top-10 md:top-20 right-10 md:right-20 w-40 md:w-56 h-40 md:h-56 bg-accent-500/10 rounded-full blur-3xl"
          animate={{ x: [0, 30, 0], y: [0, -20, 0] }}
          transition={{ duration: 8, repeat: Infinity }}
        />
        <motion.div 
          className="absolute bottom-10 md:bottom-20 left-10 md:left-20 w-48 md:w-72 h-48 md:h-72 bg-white/10 rounded-full blur-3xl"
          animate={{ x: [0, -20, 0], y: [0, 30, 0] }}
          transition={{ duration: 10, repeat: Infinity, delay: 1 }}
        />
      </motion.div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="text-center mb-12 md:mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <motion.span 
            className="inline-block px-3 md:px-4 py-1.5 bg-accent-500/20 text-accent-400 rounded-full text-sm font-medium mb-4"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 0.2 }}
          >
            Get In Touch
          </motion.span>
          <h2 className="text-3xl md:text-4xl md:text-5xl font-bold text-white mb-4" style={{ fontFamily: 'var(--font-heading)' }}>
            Contact Us
          </h2>
          <p className="text-lg md:text-xl text-white/80 max-w-3xl mx-auto">
            Ready to transform your business? Contact us today for a free consultation 
            and discover how we can help you achieve your goals.
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12" ref={ref}>
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <h3 className="text-xl md:text-2xl font-semibold text-white mb-4 md:mb-6" style={{ fontFamily: 'var(--font-heading)' }}>
              Let's Start a Conversation
            </h3>
            
            <div className="space-y-4 md:space-y-6">
              {[
                {
                  icon: <Phone className="h-5 md:h-6 w-5 md:w-6 text-white" />,
                  title: 'Phone',
                  info: '+1 (555) 123-4567',
                  subInfo: 'Mon-Fri 9AM-6PM EST',
                  gradient: 'from-accent-500 to-accent-600'
                },
                {
                  icon: <Mail className="h-5 md:h-6 w-5 md:w-6 text-white" />,
                  title: 'Email',
                  info: 'contact@bridgeconsultancy.com',
                  subInfo: "We'll respond within 24 hours",
                  gradient: 'from-primary-500 to-primary-600'
                },
                {
                  icon: <MapPin className="h-5 md:h-6 w-5 md:w-6 text-white" />,
                  title: 'Office',
                  info: '123 Business District',
                  subInfo: 'New York, NY 10001',
                  gradient: 'from-accent-600 to-accent-700'
                }
              ].map((contact, index) => (
                <motion.div 
                  key={index} 
                  className="flex items-start space-x-3 md:space-x-4 group"
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: index * 0.1 + 0.3 }}
                >
                  <motion.div 
                    className={`flex-shrink-0 w-10 md:w-14 h-10 md:h-14 bg-gradient-to-r ${contact.gradient} rounded-xl flex items-center justify-center group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 shadow-lg`}
                    whileHover={{ scale: 1.1, rotate: 6 }}
                  >
                    {contact.icon}
                  </motion.div>
                  <div>
                    <h4 className="font-semibold text-white mb-0.5 md:mb-1 group-hover:text-accent-400 transition-colors duration-300 text-sm md:text-base" style={{ fontFamily: 'var(--font-heading)' }}>{contact.title}</h4>
                    <p className="text-white/90 font-medium text-sm md:text-base">{contact.info}</p>
                    <p className="text-xs md:text-sm text-white/60">{contact.subInfo}</p>
                  </div>
                </motion.div>
              ))}
            </div>
            
            <motion.div 
              className="mt-6 md:mt-8 p-4 md:p-6 bg-black/50 rounded-xl border border-white/20 group hover:border-accent-500/30 transition-all duration-300"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.6 }}
            >
              <h4 className="font-semibold text-white mb-2 md:mb-3 group-hover:text-accent-400 transition-colors duration-300 text-sm md:text-base" style={{ fontFamily: 'var(--font-heading)' }}>
                Schedule a Free Consultation
              </h4>
              <p className="text-white/80 mb-3 md:mb-4 text-sm md:text-base">
                Book a 30-minute discovery call to discuss your business challenges and explore how we can help.
              </p>
              <motion.button 
                className="bg-gradient-to-r from-accent-500 to-accent-600 text-white px-4 md:px-6 py-2 md:py-3 rounded-lg font-semibold text-sm md:text-base hover:from-accent-600 hover:to-accent-700 transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
              >
                Book Now
              </motion.button>
            </motion.div>
          </motion.div>
          
          <motion.div 
            className="bg-black/50 backdrop-blur-sm p-6 md:p-8 rounded-2xl border border-white/20"
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
              <motion.div 
                className="group"
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.3 }}
              >
                <label htmlFor="name" className="block text-sm font-medium text-white/90 mb-1.5 md:mb-2 group-focus-within:text-accent-400 transition-colors duration-200">
                  Full Name *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-3 md:px-4 py-2.5 md:py-3 bg-black/50 border border-white/30 rounded-lg text-white placeholder-white/50 focus:ring-2 focus:ring-accent-500 focus:border-transparent transition-all duration-200 hover:border-accent-500/50 text-sm md:text-base"
                  placeholder="Your full name"
                />
              </motion.div>
              
              <motion.div 
                className="group"
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.4 }}
              >
                <label htmlFor="email" className="block text-sm font-medium text-white/90 mb-1.5 md:mb-2 group-focus-within:text-accent-400 transition-colors duration-200">
                  Email Address *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-3 md:px-4 py-2.5 md:py-3 bg-black/50 border border-white/30 rounded-lg text-white placeholder-white/50 focus:ring-2 focus:ring-accent-500 focus:border-transparent transition-all duration-200 hover:border-accent-500/50 text-sm md:text-base"
                  placeholder="your.email@company.com"
                />
              </motion.div>
              
              <motion.div 
                className="group"
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.5 }}
              >
                <label htmlFor="company" className="block text-sm font-medium text-white/90 mb-1.5 md:mb-2 group-focus-within:text-accent-400 transition-colors duration-200">
                  Company Name
                </label>
                <input
                  type="text"
                  id="company"
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  className="w-full px-3 md:px-4 py-2.5 md:py-3 bg-black/50 border border-white/30 rounded-lg text-white placeholder-white/50 focus:ring-2 focus:ring-accent-500 focus:border-transparent transition-all duration-200 hover:border-accent-500/50 text-sm md:text-base"
                  placeholder="Your company name"
                />
              </motion.div>
              
              <motion.div 
                className="group"
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.6 }}
              >
                <label htmlFor="message" className="block text-sm font-medium text-white/90 mb-1.5 md:mb-2 group-focus-within:text-accent-400 transition-colors duration-200">
                  Message *
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={4}
                  className="w-full px-3 md:px-4 py-2.5 md:py-3 bg-black/50 border border-white/30 rounded-lg text-white placeholder-white/50 focus:ring-2 focus:ring-accent-500 focus:border-transparent transition-all duration-200 hover:border-accent-500/50 resize-none text-sm md:text-base"
                  placeholder="Tell us about your business challenges and goals..."
                />
              </motion.div>
              
              <motion.button
                type="submit"
                disabled={isSubmitted}
                className="w-full bg-gradient-to-r from-accent-500 to-accent-600 text-white px-4 md:px-6 py-3 md:py-4 rounded-lg font-semibold hover:from-accent-600 hover:to-accent-700 transition-all duration-300 flex items-center justify-center space-x-2 disabled:opacity-50 text-sm md:text-base"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {isSubmitted ? (
                  <>
                    <CheckCircle className="h-4 md:h-5 w-4 md:w-5" />
                    <span>Message Sent!</span>
                  </>
                ) : (
                  <>
                    <Send className="h-4 md:h-5 w-4 md:w-5" />
                    <span>Send Message</span>
                  </>
                )}
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;