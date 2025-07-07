import React from 'react';
import { Award, Clock, Globe, Users } from 'lucide-react';

const About = () => {
  const achievements = [
    {
      icon: <Award className="h-8 w-8" />,
      title: 'Industry Recognition',
      description: 'Awarded "Best Consulting Firm" by Business Excellence Awards for 3 consecutive years.',
      gradient: 'from-yellow-500 to-orange-600'
    },
    {
      icon: <Clock className="h-8 w-8" />,
      title: '15+ Years Experience',
      description: 'Over a decade of proven track record in delivering transformational business solutions.',
      gradient: 'from-blue-500 to-indigo-600'
    },
    {
      icon: <Globe className="h-8 w-8" />,
      title: 'Global Reach',
      description: 'Serving clients across 25+ countries with localized expertise and global best practices.',
      gradient: 'from-green-500 to-teal-600'
    },
    {
      icon: <Users className="h-8 w-8" />,
      title: 'Expert Team',
      description: 'A diverse team of 50+ consultants with expertise across multiple industries and domains.',
      gradient: 'from-purple-500 to-pink-600'
    }
  ];

  return (
    <section id="about" className="py-20 relative overflow-hidden">
      {/* Background Image with Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-5"
        style={{
          backgroundImage: 'url(https://images.pexels.com/photos/3184339/pexels-photo-3184339.jpeg?auto=compress&cs=tinysrgb&w=1920)'
        }}
      ></div>
      <div className="absolute inset-0 bg-gradient-to-br from-white to-gray-50"></div>
      
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 right-20 w-64 h-64 bg-red-500/5 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-20 left-20 w-80 h-80 bg-blue-500/5 rounded-full blur-3xl animate-float-delayed"></div>
      </div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="animate-fade-in-left">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              About Bridge
            </h2>
            
            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              Founded in 2008, Bridge Management Consultancy Services has been at the forefront of business transformation, 
              helping organizations navigate complex challenges and unlock their full potential. 
              Our approach combines deep industry knowledge with innovative methodologies to deliver 
              sustainable results.
            </p>
            
            <div className="space-y-6">
              <div className="flex items-start space-x-4 group">
                <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-r from-red-600 to-blue-600 rounded-full flex items-center justify-center mt-1 group-hover:scale-110 transition-transform duration-300">
                  <div className="w-3 h-3 bg-white rounded-full"></div>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2 group-hover:text-red-600 transition-colors duration-300">Our Mission</h3>
                  <p className="text-gray-600 leading-relaxed">
                    To empower businesses with strategic insights and practical solutions that drive 
                    measurable growth and lasting competitive advantage.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4 group">
                <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-r from-blue-500 to-red-500 rounded-full flex items-center justify-center mt-1 group-hover:scale-110 transition-transform duration-300">
                  <div className="w-3 h-3 bg-white rounded-full"></div>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors duration-300">Our Vision</h3>
                  <p className="text-gray-600 leading-relaxed">
                    To be the trusted partner for organizations seeking to transform their operations 
                    and achieve breakthrough performance in an ever-evolving business landscape.
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 animate-fade-in-right">
            {achievements.map((achievement, index) => (
              <div
                key={index}
                className="group relative bg-white p-6 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 animate-fade-in-up border border-gray-100"
                style={{
                  animationDelay: `${index * 150}ms`,
                  clipPath: 'polygon(0 0, calc(100% - 15px) 0, 100% 15px, 100% 100%, 15px 100%, 0 calc(100% - 15px))'
                }}
              >
                {/* Gradient Background */}
                <div className={`absolute inset-0 bg-gradient-to-br ${achievement.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500 rounded-xl`}></div>
                
                <div className="relative z-10">
                  <div className={`text-white mb-4 w-16 h-16 rounded-full bg-gradient-to-br ${achievement.gradient} flex items-center justify-center group-hover:scale-110 group-hover:rotate-12 transition-all duration-500 shadow-lg`}>
                    {achievement.icon}
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2 group-hover:text-red-600 transition-colors duration-300">
                    {achievement.title}
                  </h3>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    {achievement.description}
                  </p>
                </div>
                
                {/* Corner Accent */}
                <div className={`absolute top-0 right-0 w-12 h-12 bg-gradient-to-bl ${achievement.gradient} opacity-10 group-hover:opacity-20 transition-opacity duration-500`}
                     style={{ clipPath: 'polygon(100% 0, 100% 70%, 30% 100%, 0 0)' }}></div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="mt-16 relative animate-fade-in-up delay-500">
          <div 
            className="bg-gradient-to-r from-red-600 to-blue-700 rounded-2xl p-8 md:p-12 text-center relative overflow-hidden"
            style={{
              clipPath: 'polygon(5% 0%, 100% 0%, 95% 100%, 0% 100%)'
            }}
          >
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-0 left-0 w-32 h-32 bg-white rounded-full blur-2xl animate-pulse"></div>
              <div className="absolute bottom-0 right-0 w-40 h-40 bg-orange-500 rounded-full blur-3xl animate-pulse delay-1000"></div>
            </div>
            
            <div className="relative z-10">
              <h3 className="text-3xl font-bold text-white mb-4">
                Ready to Transform Your Business?
              </h3>
              <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
                Join hundreds of successful companies that have partnered with us to achieve 
                exceptional results and sustainable growth.
              </p>
              <button className="bg-orange-500 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-orange-600 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl animate-bounce-subtle">
                Schedule a Consultation
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;