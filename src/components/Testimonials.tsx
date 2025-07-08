import { Star, Quote } from 'lucide-react';

const Testimonials = () => {
  const testimonials = [
    {
      name: 'Alexandra Williams',
      role: 'CEO, TechFlow Industries',
      company: 'Fortune 500 Technology Company',
      image: 'https://images.pexels.com/photos/1181690/pexels-photo-1181690.jpeg?auto=compress&cs=tinysrgb&w=150',
      testimonial: 'Bridge transformed our operations completely. Their strategic insights helped us reduce costs by 35% while improving customer satisfaction by 40%. The ROI has been exceptional.',
      rating: 5,
      gradient: 'from-red-500 to-blue-600'
    },
    {
      name: 'Marcus Thompson',
      role: 'COO, Global Manufacturing Corp',
      company: 'International Manufacturing',
      image: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150',
      testimonial: 'The team at Bridge brought fresh perspectives to our decades-old processes. Their implementation of lean methodologies resulted in a 50% improvement in production efficiency.',
      rating: 5,
      gradient: 'from-blue-500 to-red-600'
    },
    {
      name: 'Jennifer Davis',
      role: 'Founder, StartUp Innovations',
      company: 'Technology Startup',
      image: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=150',
      testimonial: 'As a growing startup, we needed expert guidance on scaling our operations. Bridge provided invaluable strategic planning that helped us secure Series B funding and expand internationally.',
      rating: 5,
      gradient: 'from-orange-500 to-red-600'
    },
    {
      name: 'Robert Chen',
      role: 'President, Financial Services Inc',
      company: 'Financial Services',
      image: 'https://images.pexels.com/photos/1516680/pexels-photo-1516680.jpeg?auto=compress&cs=tinysrgb&w=150',
      testimonial: 'Their risk management expertise was crucial during our digital transformation. Bridge helped us navigate complex regulatory requirements while modernizing our entire technology stack.',
      rating: 5,
      gradient: 'from-indigo-500 to-red-600'
    }
  ];

  return (
    <section className="py-20 relative overflow-hidden">
      {/* Background Image with Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-10"
        style={{
          backgroundImage: 'url(https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=1920)'
        }}
      ></div>
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-black"></div>
      
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-20 w-48 h-48 bg-red-500/5 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-20 right-20 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl animate-float-delayed"></div>
        <div className="absolute top-1/3 right-1/3 w-32 h-32 bg-green-500/5 rounded-full blur-2xl animate-pulse"></div>
      </div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-200 mb-4 animate-fade-in-up">
            What Our Clients Say
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto animate-fade-in-up delay-200">
            Don't just take our word for it. Here's what industry leaders say about their 
            experience working with Bridge Management Consultancy Services.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="group relative bg-gray-800 p-8 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 animate-fade-in-up border border-gray-100"
              style={{
                animationDelay: `${index * 150}ms`,
                clipPath: 'polygon(0 0, calc(100% - 25px) 0, 100% 25px, 100% 100%, 25px 100%, 0 calc(100% - 25px))'
              }}
            >
              {/* Gradient Background */}
              <div className={`absolute inset-0 bg-gradient-to-br ${testimonial.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500 rounded-xl`}></div>
              
              {/* Quote Icon */}
              <Quote className={`absolute top-6 right-6 h-12 w-12 text-transparent bg-clip-text bg-gradient-to-r ${testimonial.gradient} opacity-20 group-hover:opacity-40 transition-opacity duration-300 group-hover:scale-110 group-hover:rotate-12 transition-transform`} />
              
              <div className="relative z-10">
                {/* Rating Stars */}
                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star 
                      key={i} 
                      className="h-5 w-5 text-yellow-400 fill-current group-hover:scale-110 transition-transform duration-300" 
                      style={{ animationDelay: `${i * 100}ms` }}
                    />
                  ))}
                </div>
                
                {/* Testimonial Text */}
                <p className="text-gray-300 mb-6 italic text-lg leading-relaxed group-hover:text-gray-400 transition-colors duration-300">
                  "{testimonial.testimonial}"
                </p>
                
                {/* Client Info */}
                <div className="flex items-center">
                  <div className="relative">
                    <img
                      src={testimonial.image}
                      alt={testimonial.name}
                      className="w-14 h-14 rounded-full mr-4 group-hover:scale-110 transition-transform duration-300 border-2 border-transparent group-hover:border-red-200"
                    />
                    <div className={`absolute inset-0 rounded-full bg-gradient-to-r ${testimonial.gradient} opacity-0 group-hover:opacity-20 transition-opacity duration-300`}></div>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-300 group-hover:text-red-600 transition-colors duration-300">
                      {testimonial.name}
                    </h4>
                    <p className="text-sm text-gray-400 group-hover:text-gray-700 transition-colors duration-300">
                      {testimonial.role}
                    </p>
                    <p className="text-xs text-gray-500">
                      {testimonial.company}
                    </p>
                  </div>
                </div>
              </div>
              
              {/* Corner Accent */}
              <div className={`absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl ${testimonial.gradient} opacity-5 group-hover:opacity-15 transition-opacity duration-500`}
                   style={{ clipPath: 'polygon(100% 0, 100% 60%, 40% 100%, 0 0)' }}></div>
              
              {/* Animated Border */}
              <div className={`absolute inset-0 rounded-xl bg-gradient-to-r ${testimonial.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500 animate-border-flow`}></div>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-12 animate-fade-in-up delay-500">
          <div 
            className="bg-gradient-to-r from-red-600 to-blue-700 rounded-2xl p-8 md:p-12 relative overflow-hidden"
            style={{
              clipPath: 'polygon(10% 0%, 100% 0%, 90% 100%, 0% 100%)'
            }}
          >
            {/* Background Animation */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-0 left-0 w-40 h-40 bg-white rounded-full blur-3xl animate-pulse"></div>
              <div className="absolute bottom-0 right-0 w-48 h-48 bg-orange-500 rounded-full blur-3xl animate-pulse delay-1000"></div>
            </div>
            
            <div className="relative z-10">
              <h3 className="text-3xl font-bold text-white mb-4">
                Join Our Success Stories
              </h3>
              <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
                Ready to transform your business and achieve exceptional results? 
                Let's discuss how we can help you reach your goals.
              </p>
              <button className="bg-orange-500 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-orange-600 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl animate-bounce-subtle">
                Start Your Journey
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;