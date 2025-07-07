import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import logo from "../assets/logoonly.png"
const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  return (
    <header className={`fixed w-full z-50 transition-all duration-300 ${
      isScrolled ? 'bg-white shadow-md' : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-3">
            <img 
              src={logo}
              alt="Bridge Management Consultancy" 
              className="h-10 w-auto"
            />
            <span className={`text-xl font-bold ${isScrolled ? 'text-gray-900' : 'text-white'}`}>
              Bridge
            </span>
          </div>
          
          <nav className="hidden md:flex items-center space-x-8">
            {['Home', 'Services', 'About', 'Team', 'Contact'].map((item) => (
              <button
                key={item}
                onClick={() => scrollToSection(item.toLowerCase())}
                className={`text-sm font-medium transition-colors duration-200 hover:text-red-600 ${
                  isScrolled ? 'text-gray-700' : 'text-white'
                }`}
              >
                {item}
              </button>
            ))}
            <button
              onClick={() => scrollToSection('contact')}
              className="bg-red-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-red-700 transition-colors duration-200"
            >
              Get Started
            </button>
          </nav>

          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className={`${isScrolled ? 'text-gray-700' : 'text-white'}`}
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {isMenuOpen && (
        <div className="md:hidden bg-white border-t">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {['Home', 'Services', 'About', 'Team', 'Contact'].map((item) => (
              <button
                key={item}
                onClick={() => scrollToSection(item.toLowerCase())}
                className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-red-600 hover:bg-gray-50 rounded-md w-full text-left"
              >
                {item}
              </button>
            ))}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;