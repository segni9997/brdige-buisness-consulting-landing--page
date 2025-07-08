import { BarChart3, Target, Users, Zap, TrendingUp, Shield } from 'lucide-react';

const Services = () => {
  const services = [
    {
      icon: <BarChart3 className="h-8 w-8" />,
      title: 'Strategic Planning',
      description: 'Develop comprehensive strategies that align with your business goals and market opportunities.',
      features: ['Market Analysis', 'Growth Strategy', 'Risk Assessment', 'Performance Metrics'],
      gradient: 'from-blue-500 to-purple-600'
    },
    {
      icon: <Target className="h-8 w-8" />,
      title: 'Operations Optimization',
      description: 'Streamline your operations to improve efficiency, reduce costs, and enhance productivity.',
      features: ['Process Mapping', 'Workflow Automation', 'Quality Management', 'Cost Reduction'],
      gradient: 'from-green-500 to-teal-600'
    },
    {
      icon: <Users className="h-8 w-8" />,
      title: 'Organizational Development',
      description: 'Build high-performing teams and create a culture that drives sustainable success.',
      features: ['Leadership Development', 'Team Building', 'Change Management', 'Culture Transformation'],
      gradient: 'from-orange-500 to-red-600'
    },
    {
      icon: <Zap className="h-8 w-8" />,
      title: 'Digital Transformation',
      description: 'Leverage technology to modernize your business processes and stay competitive.',
      features: ['Technology Integration', 'Digital Strategy', 'Data Analytics', 'Innovation Lab'],
      gradient: 'from-yellow-500 to-orange-600'
    },
    {
      icon: <TrendingUp className="h-8 w-8" />,
      title: 'Financial Advisory',
      description: 'Optimize your financial performance with expert guidance on budgeting and forecasting.',
      features: ['Financial Planning', 'Investment Strategy', 'Cash Flow Management', 'M&A Advisory'],
      gradient: 'from-indigo-500 to-blue-600'
    },
    {
      icon: <Shield className="h-8 w-8" />,
      title: 'Risk Management',
      description: 'Identify, assess, and mitigate business risks to protect your organization.',
      features: ['Risk Assessment', 'Compliance', 'Crisis Management', 'Insurance Strategy'],
      gradient: 'from-pink-500 to-rose-600'
    }
  ];

  return (
    <section id="services" className="py-20 relative overflow-hidden">
      {/* Background Image with Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-5"
        style={{
          backgroundImage: 'url(https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=1920)'
        }}
      ></div>
      <div className="absolute inset-0  bg-gradient-to-br from-gray-900 via-gray-800 to-black"></div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-100 mb-4 animate-fade-in-up">
            Our Services
          </h2>
          <p className="text-xl text-gray-200 max-w-3xl mx-auto animate-fade-in-up delay-200">
            We offer comprehensive consulting services designed to address your unique business challenges and unlock new opportunities for growth.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className="group relative bg-gray-700 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-4 animate-fade-in-up"
              style={{
                animationDelay: `${index * 100}ms`,
                clipPath: 'polygon(0 0, 100% 0, 100% 85%, 85% 100%, 0 100%)'
              }}
            >
              {/* Gradient Background */}
              <div className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500 rounded-xl`}></div>
              
              {/* Animated Border */}
              <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-transparent via-blue-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-border-flow"></div>
              
              <div className="relative p-8 z-10">
                <div className={`text-white mb-6 w-16 h-16 rounded-full bg-gradient-to-br ${service.gradient} flex items-center justify-center group-hover:scale-110 group-hover:rotate-12 transition-all duration-500 shadow-lg`}>
                  {service.icon}
                </div>
                
                <h3 className="text-xl font-semibold text-gray-200 mb-4 group-hover:text-blue-200 transition-colors duration-300">
                  {service.title}
                </h3>
                
                <p className="text-gray-400 mb-6 leading-relaxed">
                  {service.description}
                </p>
                
                <ul className="space-y-3 mb-6">
                  {service.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center text-sm text-gray-400 group-hover:text-gray-200 transition-colors duration-300">
                      <div className={`w-2 h-2 bg-gradient-to-r ${service.gradient} rounded-full mr-3 animate-pulse`}></div>
                      {feature}
                    </li>
                  ))}
                </ul>
                
                <div className="pt-6 border-t border-gray-100">
                  <button className={`text-transparent bg-clip-text bg-gradient-to-r ${service.gradient} font-medium hover:scale-105 transition-all duration-300 group flex items-center`}>
                    Learn More
                    <span className="inline-block ml-2 group-hover:translate-x-2 transition-transform duration-300">→</span>
                  </button>
                </div>
              </div>
              
              {/* Corner Accent */}
              <div className={`absolute bottom-0 right-0 w-16 h-16 bg-gradient-to-tl ${service.gradient} opacity-10 group-hover:opacity-20 transition-opacity duration-500`}
                   style={{ clipPath: 'polygon(100% 0, 100% 100%, 0 100%)' }}></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;