import React from 'react';
import { Mail, Phone, MapPin, Linkedin, Twitter, Facebook } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-1">
            <div className="flex items-center space-x-3 mb-4">
              <img 
                src="/logoonly.png" 
                alt="Bridge Management Consultancy" 
                className="h-8 w-auto"
              />
              <span className="text-xl font-bold">Bridge</span>
            </div>
            <p className="text-gray-400 mb-6">
              Transforming businesses through strategic consulting and innovative solutions. 
              Your success is our mission - Closing The Gap!
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">
                <Linkedin className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">
                <Twitter className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">
                <Facebook className="h-6 w-6" />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Services</h3>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#" className="hover:text-white transition-colors duration-200">Strategic Planning</a></li>
              <li><a href="#" className="hover:text-white transition-colors duration-200">Operations Optimization</a></li>
              <li><a href="#" className="hover:text-white transition-colors duration-200">Digital Transformation</a></li>
              <li><a href="#" className="hover:text-white transition-colors duration-200">Financial Advisory</a></li>
              <li><a href="#" className="hover:text-white transition-colors duration-200">Risk Management</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Company</h3>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#" className="hover:text-white transition-colors duration-200">About Us</a></li>
              <li><a href="#" className="hover:text-white transition-colors duration-200">Our Team</a></li>
              <li><a href="#" className="hover:text-white transition-colors duration-200">Careers</a></li>
              <li><a href="#" className="hover:text-white transition-colors duration-200">Case Studies</a></li>
              <li><a href="#" className="hover:text-white transition-colors duration-200">Blog</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Info</h3>
            <div className="space-y-3 text-gray-400">
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4" />
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4" />
                <span>contact@bridgeconsultancy.com</span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin className="h-4 w-4" />
                <span>123 Business District<br />New York, NY 10001</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              © 2024 Bridge Management Consultancy Services PLC. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors duration-200">
                Privacy Policy
              </a>
              <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors duration-200">
                Terms of Service
              </a>
              <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors duration-200">
                Cookie Policy
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;