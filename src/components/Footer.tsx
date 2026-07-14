import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Mail, Phone, MapPin, Linkedin, Twitter, Facebook, Instagram, Youtube, Github } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useGetSocialLinksQuery } from '../store/api';

const iconMap: Record<string, React.ReactNode> = {
  linkedin:  <Linkedin className="h-5 w-5 md:h-6 md:w-6" />,
  twitter:   <Twitter className="h-5 w-5 md:h-6 md:w-6" />,
  facebook:  <Facebook className="h-5 w-5 md:h-6 md:w-6" />,
  instagram: <Instagram className="h-5 w-5 md:h-6 md:w-6" />,
  youtube:   <Youtube className="h-5 w-5 md:h-6 md:w-6" />,
  github:    <Github className="h-5 w-5 md:h-6 md:w-6" />,
  // tiktok and telegram don't have lucide icons, fallback to text
};

const Footer = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "0px" });
  const { data: socialLinks } = useGetSocialLinksQuery();

  return (
    <footer className="bg-black/80 text-white" ref={ref}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-10">
          <motion.div 
            className="lg:col-span-1"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center space-x-3 mb-4 md:mb-6">
              <span className="text-xl md:text-2xl font-bold tracking-wide" style={{ fontFamily: 'var(--font-heading)' }}>BRIDGE</span>
            </div>
            <p className="text-white/60 mb-4 md:mb-6 leading-relaxed text-sm md:text-base">
              Transforming businesses through strategic consulting and innovative solutions. 
              Your success is our mission - Closing The Gap!
            </p>
            <div className="flex space-x-3 md:space-x-4">
              {socialLinks && socialLinks.length > 0
                ? socialLinks.map((social, index) => (
                    <motion.a
                      key={social.id ?? index}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={social.label || social.icon}
                      className="text-white/50 hover:text-accent-400 transition-colors duration-200"
                      whileHover={{ scale: 1.1, y: -2 }}
                    >
                      {iconMap[social.icon] ?? (
                        <span className="text-xs uppercase">{social.icon}</span>
                      )}
                    </motion.a>
                  ))
                : (
                  // Fallback static icons while no data
                  [
                    { icon: <Linkedin className="h-5 w-5 md:h-6 md:w-6" />, href: '#' },
                    { icon: <Twitter className="h-5 w-5 md:h-6 md:w-6" />, href: '#' },
                    { icon: <Facebook className="h-5 w-5 md:h-6 md:w-6" />, href: '#' },
                  ].map((social, index) => (
                    <motion.a 
                      key={index}
                      href={social.href}
                      className="text-white/50 hover:text-accent-400 transition-colors duration-200"
                      whileHover={{ scale: 1.1, y: -2 }}
                    >
                      {social.icon}
                    </motion.a>
                  ))
                )
              }
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <h3 className="text-base md:text-lg font-semibold mb-4 md:mb-6" style={{ fontFamily: 'var(--font-heading)' }}>Our Services</h3>
            <ul className="space-y-2 md:space-y-3 text-white/60 text-sm md:text-base">
              {[
                { label: 'Project Proposal', href: '/#services' },
                { label: 'Feasibility Study', href: '/#services' },
                { label: 'Environmental Impact Assessment (EIA)', href: '/#services' },
                { label: 'Environmental & Social Impact Assessment', href: '/#services' },
                { label: 'Training', href: '/#services' },
                { label: 'Asset Evaluation', href: '/#services' },
                { label: 'Organizational Structure', href: '/#services' },
                { label: 'Environmental Audit Report', href: '/#services' },
              ].map((item, index) => (
                <motion.li
                  key={index}
                  whileHover={{ x: 5 }}
                >
                  <Link to={item.href} className="hover:text-accent-400 transition-colors duration-200">{item.label}</Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h3 className="text-base md:text-lg font-semibold mb-4 md:mb-6" style={{ fontFamily: 'var(--font-heading)' }}>Company</h3>
            <ul className="space-y-2 md:space-y-3 text-white/60 text-sm md:text-base">
              {[
                { label: 'About Us', href: '/#about' },
                { label: 'Case Studies', href: '/case-studies' },
                { label: 'Success Stories', href: '/case-studies' },
                { label: 'How It Works', href: '/#how-it-works' },
                { label: 'Contact', href: '/#contact' },
           
              ].map((item, index) => (
                <motion.li
                  key={index}
                  whileHover={{ x: 5 }}
                >
                  <Link to={item.href} className="hover:text-accent-400 transition-colors duration-200">{item.label}</Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <h3 className="text-base md:text-lg font-semibold mb-4 md:mb-6" style={{ fontFamily: 'var(--font-heading)' }}>Contact Info</h3>
            <div className="space-y-3 md:space-y-4 text-white/60 text-sm md:text-base">
              {[
                { icon: <Phone className="h-4 w-4" />, text: '+251911331382 / +251929135812', label: 'Phone' },
                { icon: <Mail className="h-4 w-4" />, text: 'info@bridge-consulting.org', label: 'Email' },
                { icon: <MapPin className="h-4 w-4" />, text: 'Sar Bet, Addis Ababa, Ethiopia ,Bahre Building 2nd Floor, office N0.2005', label: 'Office' }
              ].map((contact, index) => (
                <motion.div 
                  key={index}
                  className="flex items-start space-x-2 md:space-x-3 group"
                  whileHover={{ x: 5 }}
                >
                  <div className="w-8 h-8 md:w-10 md:h-10 bg-white/10 rounded-lg flex items-center justify-center group-hover:bg-accent-500 transition-colors duration-300 flex-shrink-0">
                    <div className="text-accent-400 group-hover:text-white text-xs md:text-sm">
                      {contact.icon}
                    </div>
                  </div>
                  <span className="group-hover:text-accent-400 transition-colors duration-200 leading-tight">{contact.text}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
        
        <motion.div 
          className="border-t border-white/20 mt-10 md:mt-12 pt-6 md:pt-8"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <div className="flex flex-col md:flex-row justify-between items-center text-center md:text-left">
            <p className="text-white/40 text-xs md:text-sm">
              © 2026 Bridge Management Consultancy Services PLC. All rights reserved.
            </p>
            <div className="flex flex-wrap justify-center md:justify-end gap-3 md:gap-6 mt-4 md:mt-0">
              {['Privacy Policy', 'Terms of Service', 'Cookie Policy'].map((item, index) => (
                <motion.a 
                  key={index}
                  href="#"
                  className="text-white/40 hover:text-accent-400 text-xs md:text-sm transition-colors duration-200"
                  whileHover={{ y: -2 }}
                >
                  {item}
                </motion.a>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;