import { TrendingUp, Users, DollarSign, Clock, ArrowRight } from 'lucide-react';

const Projects = () => {
  const projects = [
    {
      title: 'Global Manufacturing Optimization',
      client: 'Fortune 500 Manufacturing Corp',
      industry: 'Manufacturing',
      duration: '8 months',
      image: 'https://images.pexels.com/photos/1267338/pexels-photo-1267338.jpeg?auto=compress&cs=tinysrgb&w=800',
      results: [
        { metric: 'Cost Reduction', value: '35%', icon: <DollarSign className="h-5 w-5" /> },
        { metric: 'Efficiency Gain', value: '50%', icon: <TrendingUp className="h-5 w-5" /> },
        { metric: 'Employee Satisfaction', value: '40%', icon: <Users className="h-5 w-5" /> }
      ],
      description: 'Implemented lean manufacturing principles and digital automation across 12 facilities, resulting in significant cost savings and productivity improvements.',
      gradient: 'from-blue-600 to-purple-700'
    },
    {
      title: 'Digital Banking Transformation',
      client: 'Regional Financial Institution',
      industry: 'Financial Services',
      duration: '12 months',
      image: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=800',
      results: [
        { metric: 'Digital Adoption', value: '85%', icon: <TrendingUp className="h-5 w-5" /> },
        { metric: 'Processing Time', value: '60%', icon: <Clock className="h-5 w-5" /> },
        { metric: 'Customer Growth', value: '25%', icon: <Users className="h-5 w-5" /> }
      ],
      description: 'Led comprehensive digital transformation initiative, modernizing core banking systems and implementing AI-driven customer service solutions.',
      gradient: 'from-green-600 to-teal-700'
    },
    {
      title: 'Healthcare System Restructuring',
      client: 'Multi-State Healthcare Network',
      industry: 'Healthcare',
      duration: '10 months',
      image: 'https://images.pexels.com/photos/3184339/pexels-photo-3184339.jpeg?auto=compress&cs=tinysrgb&w=800',
      results: [
        { metric: 'Patient Satisfaction', value: '45%', icon: <Users className="h-5 w-5" /> },
        { metric: 'Operational Costs', value: '30%', icon: <DollarSign className="h-5 w-5" /> },
        { metric: 'Wait Times', value: '55%', icon: <Clock className="h-5 w-5" /> }
      ],
      description: 'Redesigned patient care workflows and implemented integrated health information systems across 15 facilities.',
      gradient: 'from-red-600 to-pink-700'
    },
    {
      title: 'Retail Chain Expansion Strategy',
      client: 'National Retail Corporation',
      industry: 'Retail',
      duration: '6 months',
      image: 'https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=800',
      results: [
        { metric: 'Market Expansion', value: '200%', icon: <TrendingUp className="h-5 w-5" /> },
        { metric: 'Revenue Growth', value: '75%', icon: <DollarSign className="h-5 w-5" /> },
        { metric: 'Store Efficiency', value: '40%', icon: <Users className="h-5 w-5" /> }
      ],
      description: 'Developed and executed strategic expansion plan, opening 50 new locations while optimizing supply chain and inventory management.',
      gradient: 'from-orange-600 to-yellow-700'
    }
  ];

  return (
    <section className="py-20 relative overflow-hidden">
      {/* Background with Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-10"
        style={{
          backgroundImage: 'url(https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=1920)'
        }}
      ></div>
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-black"></div>
      
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-32 h-32 bg-blue-200/10 rounded-full blur-2xl animate-float"></div>
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-orange-500/10 rounded-full blur-2xl animate-float-delayed"></div>
        <div className="absolute top-1/2 left-1/3 w-24 h-24 bg-green-500/10 rounded-full blur-2xl animate-pulse"></div>
      </div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 animate-fade-in-up">
            Success Stories
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto animate-fade-in-up delay-200">
            Discover how we've helped organizations across industries achieve remarkable transformations and measurable results.
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <div
              key={index}
              className="group relative bg-white/5 backdrop-blur-sm rounded-2xl overflow-hidden hover:bg-white/10 transition-all duration-500 transform hover:-translate-y-2 animate-fade-in-up border border-white/10"
              style={{
                animationDelay: `${index * 200}ms`,
                clipPath: 'polygon(0 0, calc(100% - 20px) 0, 100% 20px, 100% 100%, 20px 100%, 0 calc(100% - 20px))'
              }}
            >
              {/* Project Image */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className={`absolute inset-0 bg-gradient-to-t ${project.gradient} opacity-60`}></div>
                <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-white text-sm font-medium">
                  {project.industry}
                </div>
              </div>
              
              <div className="p-8">
                <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-blue-300 transition-colors duration-300">
                  {project.title}
                </h3>
                <p className="text-gray-400 mb-1">{project.client}</p>
                <p className="text-gray-500 text-sm mb-4 flex items-center">
                  <Clock className="h-4 w-4 mr-1" />
                  {project.duration}
                </p>
                
                <p className="text-gray-300 mb-6 leading-relaxed">
                  {project.description}
                </p>
                
                {/* Results Grid */}
                <div className="grid grid-cols-3 gap-4 mb-6">
                  {project.results.map((result, resultIndex) => (
                    <div
                      key={resultIndex}
                      className="text-center p-4 bg-white/5 rounded-lg border border-white/10 hover:bg-white/10 transition-all duration-300 group/result"
                      style={{
                        clipPath: 'polygon(10% 0%, 100% 0%, 90% 100%, 0% 100%)'
                      }}
                    >
                      <div className={`text-white mb-2 flex justify-center group-hover/result:scale-110 transition-transform duration-300`}>
                        {result.icon}
                      </div>
                      <div className={`text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r ${project.gradient} mb-1`}>
                        {result.value}
                      </div>
                      <div className="text-xs text-gray-400">{result.metric}</div>
                    </div>
                  ))}
                </div>
                
                <button className={`flex items-center text-transparent bg-clip-text bg-gradient-to-r ${project.gradient} font-semibold hover:scale-105 transition-all duration-300 group/btn`}>
                  View Case Study
                  <ArrowRight className="h-4 w-4 ml-2 group-hover/btn:translate-x-2 transition-transform duration-300 text-blue-400" />
                </button>
              </div>
              
              {/* Decorative Elements */}
              <div className={`absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl ${project.gradient} opacity-20 group-hover:opacity-30 transition-opacity duration-500`}
                   style={{ clipPath: 'polygon(100% 0, 100% 70%, 30% 100%, 0 0)' }}></div>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-16">
          <button className="bg-gradient-to-r from-blue-600 to-purple-700 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:from-blue-700 hover:to-purple-800 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl animate-pulse-subtle">
            View All Case Studies
          </button>
        </div>
      </div>
    </section>
  );
};

export default Projects;