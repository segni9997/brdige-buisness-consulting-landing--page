import React from 'react';
import { Linkedin, Twitter, Mail } from 'lucide-react';

const Team = () => {
  const teamMembers = [
    {
      name: 'Sarah Johnson',
      role: 'Managing Partner',
      image: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=300',
      bio: 'Former McKinsey partner with 20+ years of experience in strategic consulting across Fortune 500 companies.',
      linkedin: '#',
      twitter: '#',
      email: '#',
      gradient: 'from-blue-500 to-purple-600'
    },
    {
      name: 'Michael Chen',
      role: 'Operations Director',
      image: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=300',
      bio: 'Expert in process optimization and digital transformation with a track record of delivering 30%+ efficiency gains.',
      linkedin: '#',
      twitter: '#',
      email: '#',
      gradient: 'from-green-500 to-teal-600'
    },
    {
      name: 'Emily Rodriguez',
      role: 'Financial Advisory Lead',
      image: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=300',
      bio: 'CPA and former investment banker specializing in M&A advisory and financial restructuring.',
      linkedin: '#',
      twitter: '#',
      email: '#',
      gradient: 'from-orange-500 to-red-600'
    },
    {
      name: 'David Thompson',
      role: 'Technology Practice Head',
      image: 'https://images.pexels.com/photos/1516680/pexels-photo-1516680.jpeg?auto=compress&cs=tinysrgb&w=300',
      bio: 'Former CTO with expertise in digital transformation and emerging technology adoption strategies.',
      linkedin: '#',
      twitter: '#',
      email: '#',
      gradient: 'from-indigo-500 to-blue-600'
    },
    {
      name: 'Lisa Park',
      role: 'Organizational Development',
      image: 'https://images.pexels.com/photos/1181424/pexels-photo-1181424.jpeg?auto=compress&cs=tinysrgb&w=300',
      bio: 'HR executive and organizational psychologist focused on culture transformation and leadership development.',
      linkedin: '#',
      twitter: '#',
      email: '#',
      gradient: 'from-pink-500 to-rose-600'
    },
    {
      name: 'Robert Martinez',
      role: 'Risk Management Partner',
      image: 'https://images.pexels.com/photos/1212984/pexels-photo-1212984.jpeg?auto=compress&cs=tinysrgb&w=300',
      bio: 'Former audit partner with extensive experience in risk assessment and compliance across regulated industries.',
      linkedin: '#',
      twitter: '#',
      email: '#',
      gradient: 'from-yellow-500 to-orange-600'
    }
  ];

  return (
    <section id="team" className="py-20 relative overflow-hidden">
      {/* Background Image with Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-5"
        style={{
          backgroundImage: 'url(https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=1920)'
        }}
      ></div>
      <div className="absolute inset-0 bg-gradient-to-br from-gray-50 to-white"></div>
      
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-10 left-10 w-40 h-40 bg-blue-500/5 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-10 right-10 w-56 h-56 bg-orange-500/5 rounded-full blur-3xl animate-float-delayed"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-green-500/5 rounded-full blur-3xl animate-pulse"></div>
      </div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 animate-fade-in-up">
            Meet Our Team
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto animate-fade-in-up delay-200">
            Our diverse team of experts brings together decades of experience from top-tier consulting firms, 
            Fortune 500 companies, and leading academic institutions.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {teamMembers.map((member, index) => (
            <div
              key={index}
              className="group relative bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-4 animate-fade-in-up"
              style={{
                animationDelay: `${index * 100}ms`,
                clipPath: 'polygon(0 0, calc(100% - 20px) 0, 100% 20px, 100% calc(100% - 20px), calc(100% - 20px) 100%, 0 100%)'
              }}
            >
              {/* Image Container */}
              <div className="relative overflow-hidden">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-700"
                />
                {/* Gradient Overlay */}
                <div className={`absolute inset-0 bg-gradient-to-t ${member.gradient} opacity-0 group-hover:opacity-20 transition-opacity duration-500`}></div>
                
                {/* Social Links Overlay */}
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <div className="flex space-x-4 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                    <a
                      href={member.linkedin}
                      className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-blue-600 hover:scale-110 transition-all duration-300"
                    >
                      <Linkedin className="h-5 w-5" />
                    </a>
                    <a
                      href={member.twitter}
                      className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-blue-400 hover:scale-110 transition-all duration-300"
                    >
                      <Twitter className="h-5 w-5" />
                    </a>
                    <a
                      href={member.email}
                      className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-orange-500 hover:scale-110 transition-all duration-300"
                    >
                      <Mail className="h-5 w-5" />
                    </a>
                  </div>
                </div>
              </div>
              
              <div className="p-6 relative">
                {/* Background Accent */}
                <div className={`absolute top-0 right-0 w-16 h-16 bg-gradient-to-bl ${member.gradient} opacity-5 group-hover:opacity-10 transition-opacity duration-500`}
                     style={{ clipPath: 'polygon(100% 0, 100% 70%, 30% 100%, 0 0)' }}></div>
                
                <div className="relative z-10">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors duration-300">
                    {member.name}
                  </h3>
                  <p className={`text-transparent bg-clip-text bg-gradient-to-r ${member.gradient} font-medium mb-3`}>
                    {member.role}
                  </p>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {member.bio}
                  </p>
                </div>
              </div>
              
              {/* Animated Border */}
              <div className={`absolute inset-0 rounded-xl bg-gradient-to-r ${member.gradient} opacity-0 group-hover:opacity-20 transition-opacity duration-500`}
                   style={{ clipPath: 'inset(0 round 12px)', mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)', maskComposite: 'xor' }}></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Team;