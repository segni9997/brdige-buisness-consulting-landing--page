import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { BarChart3, Target, Users, Zap, TrendingUp, Shield, Cpu, Globe, Briefcase, Headphones } from 'lucide-react';
import { useContent } from '../context/ContentContext';

const iconMap: Record<string, React.ReactNode> = {
  BarChart3: <BarChart3 className="h-8 w-8" />,
  Target: <Target className="h-8 w-8" />,
  Users: <Users className="h-8 w-8" />,
  Zap: <Zap className="h-8 w-8" />,
  TrendingUp: <TrendingUp className="h-8 w-8" />,
  Shield: <Shield className="h-8 w-8" />,
  Cpu: <Cpu className="h-8 w-8" />,
  Globe: <Globe className="h-8 w-8" />,
  Briefcase: <Briefcase className="h-8 w-8" />,
  Headphones: <Headphones className="h-8 w-8" />,
};

const Services = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { services } = useContent();

  return (
    <section id="services" className="py-16 md:py-24 relative overflow-hidden bg-black/80">
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
          animate={{ scale: [1, 1.2, 1], x: [0, 30, 0] }}
          transition={{ duration: 7, repeat: Infinity }}
        />
        <motion.div 
          className="absolute bottom-10 md:bottom-20 left-10 md:left-20 w-48 md:w-72 h-48 md:h-72 bg-white/10 rounded-full blur-3xl"
          animate={{ scale: [1, 1.1, 1], x: [0, -20, 0] }}
          transition={{ duration: 9, repeat: Infinity, delay: 2 }}
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
            transition={{ delay: 0.2, duration: 0.4 }}
          >
            {services.subtitle}
          </motion.span>
          <h2 className="text-3xl md:text-4xl md:text-5xl font-bold text-white mb-4" style={{ fontFamily: 'var(--font-heading)' }}>
            {services.title}
          </h2>
          <p className="text-lg md:text-xl text-white/80 max-w-3xl mx-auto">
            {services.description}
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8" ref={ref}>
          {services.services.map((service, index) => (
            <motion.div
              key={index}
              className="group relative bg-black/50 backdrop-blur-sm rounded-2xl p-8 border border-white/20 hover:border-accent-500/30 transition-all duration-500"
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -16 }}
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500 rounded-2xl`}></div>
              
              <motion.div className="relative p-6 md:p-8 z-10">
                <motion.div 
                  className={`text-white mb-4 md:mb-6 w-12 md:w-16 h-12 md:h-16 rounded-xl bg-gradient-to-br ${service.gradient} flex items-center justify-center shadow-lg`}
                  whileHover={{ scale: 1.1, rotate: 12 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  {iconMap[service.icon] || <BarChart3 className="h-8 w-8" />}
                </motion.div>
                
                <h3 className="text-lg md:text-xl font-semibold text-white mb-3 md:mb-4 group-hover:text-accent-400 transition-colors duration-300" style={{ fontFamily: 'var(--font-heading)' }}>
                  {service.title}
                </h3>
                
                <p className="text-white/80 mb-4 md:mb-6 leading-relaxed text-sm md:text-base">
                  {service.description}
                </p>
                
                <ul className="space-y-2 md:space-y-3 mb-4 md:mb-6">
                  {service.features.map((feature, featureIndex) => (
                    <motion.li 
                      key={featureIndex} 
                      className="flex items-center text-sm text-white/60 hover:text-white transition-colors duration-300"
                      initial={{ opacity: 0, x: -10 }}
                      animate={isInView ? { opacity: 1, x: 0 } : {}}
                      transition={{ delay: index * 0.1 + featureIndex * 0.05 + 0.3 }}
                    >
                      <motion.div 
                        className={`w-1.5 md:w-2 h-1.5 md:h-2 bg-gradient-to-r ${service.gradient} rounded-full mr-2 md:mr-3`}
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 2, repeat: Infinity, delay: featureIndex * 0.2 }}
                      />
                      {feature}
                    </motion.li>
                  ))}
                </ul>
                
                <div className="pt-4 md:pt-6 border-t border-white/20">
                  <motion.button 
                    className="text-accent-400 font-medium hover:scale-105 transition-all duration-300 group flex items-center text-sm md:text-base"
                    whileHover={{ x: 5 }}
                  >
                    Learn More
                    <span className="inline-block ml-2">→</span>
                  </motion.button>
                </div>
              </motion.div>
              
              <div className={`absolute bottom-0 right-0 w-20 h-20 bg-gradient-to-tl ${service.gradient} opacity-10 group-hover:opacity-20 transition-opacity duration-500 rounded-tl-2xl`}></div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;