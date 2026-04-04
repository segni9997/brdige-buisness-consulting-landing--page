import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

const About = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" className="py-16 md:py-24 relative overflow-hidden bg-black/40">
      <div className="absolute inset-0 opacity-3">
        <div className="absolute top-0 left-0 w-full h-full" style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, rgba(0,0,0,0.05) 1px, transparent 0)`,
          backgroundSize: '32px 32px'
        }}></div>
      </div>
      
      <motion.div 
        className="absolute inset-0 overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <motion.div 
          className="absolute top-10 md:top-20 right-10 md:right-20 w-40 md:w-64 h-40 md:h-64 bg-accent-400/10 rounded-full blur-3xl"
          animate={{ x: [0, 30, 0], y: [0, -20, 0] }}
          transition={{ duration: 8, repeat: Infinity }}
        />
        <motion.div 
          className="absolute bottom-10 md:bottom-20 left-10 md:left-20 w-48 md:w-80 h-48 md:h-80 bg-white/10 rounded-full blur-3xl"
          animate={{ x: [0, -20, 0], y: [0, 30, 0] }}
          transition={{ duration: 10, repeat: Infinity, delay: 1 }}
        />
      </motion.div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-16 items-center max-w-6xl mx-auto" ref={ref}>
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <motion.span 
              className="inline-block px-3 md:px-4 py-1.5 bg-accent-500/20 text-accent-600 rounded-full text-sm font-medium mb-4"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 0.2 }}
            >
              About Us
            </motion.span>
            <h2 className="text-3xl md:text-4xl md:text-5xl font-bold text-white mb-4 md:mb-6" style={{ fontFamily: 'var(--font-heading)' }}>
              About Bridge
            </h2>
            
            <p className="text-base md:text-lg text-white/70 mb-6 md:mb-8 leading-relaxed">
              Founded in 2008, Bridge Management Consultancy Services has been at the forefront of business transformation, 
              helping organizations navigate complex challenges and unlock their full potential. 
              Our approach combines deep industry knowledge with innovative methodologies to deliver 
              sustainable results.
            </p>
            
            <div className="space-y-6 md:space-y-8">
              <motion.div 
                className="flex space-x-3 md:space-x-4 group"
                initial={{ opacity: 0, x: -30 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.3 }}
              >
                <div className="flex-shrink-0 w-8 md:w-10 h-8 md:h-10 bg-gradient-to-r from-accent-500 to-accent-600 rounded-xl flex items-center justify-center mt-0.5 md:mt-1 group-hover:scale-110 transition-transform duration-300">
                  <div className="w-3 md:w-4 h-3 md:h-4 bg-white rounded-full"></div>
                </div>
                <div>
                  <h3 className="font-semibold text-white/80 mb-1 md:mb-2 group-hover:text-accent-600 transition-colors duration-300 text-sm md:text-base" style={{ fontFamily: 'var(--font-heading)' }}>Our Mission</h3>
                  <p className="text-white/70 leading-relaxed text-sm md:text-base">
                    To empower businesses with strategic insights and practical solutions that drive 
                    measurable growth and lasting competitive advantage.
                  </p>
                </div>
              </motion.div>
              
              <motion.div 
                className="flex items-start space-x-3 md:space-x-4 group"
                initial={{ opacity: 0, x: -30 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.4 }}
              >
                <div className="flex-shrink-0 w-8 md:w-10 h-8 md:h-10 bg-gradient-to-r from-black/60 to-black/40 rounded-xl flex items-center justify-center mt-0.5 md:mt-1 group-hover:scale-110 transition-transform duration-300">
                  <div className="w-3 md:w-4 h-3 md:h-4 bg-white rounded-full"></div>
                </div>
                <div>
                  <h3 className="font-semibold text-white/80 mb-1 md:mb-2 group-hover:text-white/70 transition-colors duration-300 text-sm md:text-base" style={{ fontFamily: 'var(--font-heading)' }}>Our Vision</h3>
                  <p className="text-white/70 leading-relaxed text-sm md:text-base">
                    To be the trusted partner for organizations seeking to transform their operations 
                    and achieve breakthrough performance in an ever-evolving business landscape.
                  </p>
                </div>
              </motion.div>
            </div>
          </motion.div>
          
          <motion.div 
            className="relative mt-8 lg:mt-0"
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <motion.div 
              className="relative rounded-2xl overflow-hidden shadow-2xl"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              <img
                src="https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="Team collaboration"
                className="w-full h-64 md:h-80 lg:h-96 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
              <div className="absolute bottom-4 md:bottom-6 left-4 md:left-6 right-4 md:right-6">
                <p className="text-white font-semibold text-sm md:text-lg" style={{ fontFamily: 'var(--font-heading)' }}>
                  Trusted by 500+ companies worldwide
                </p>
              </div>
            </motion.div>
            
            <motion.div 
              className="absolute -bottom-4 md:-bottom-6 -right-4 md:-right-6 bg-white rounded-2xl shadow-xl p-4 md:p-6"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.6, type: "spring" }}
            >
              <div className="flex items-center space-x-3 md:space-x-4">
                <div className="text-2xl md:text-4xl font-bold text-accent-500" style={{ fontFamily: 'var(--font-heading)' }}>15+</div>
                <div>
                  <p className="text-white/70 font-medium text-xs md:text-sm">Years of</p>
                  <p className="text-white font-semibold text-sm md:text-base">Excellence</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
        
        <motion.div 
          className="mt-16 md:mt-20"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <div className="bg-gradient-to-r from-black/80 to-black/60 rounded-2xl p-6 md:p-8 md:p-12 text-center relative overflow-hidden">
            <motion.div 
              className="absolute inset-0 opacity-10"
            >
              <motion.div 
                className="absolute top-0 left-0 w-24 md:w-32 h-24 md:h-32 bg-accent-500 rounded-full blur-2xl"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 3, repeat: Infinity }}
              />
              <motion.div 
                className="absolute bottom-0 right-0 w-32 md:w-40 h-32 md:h-40 bg-white rounded-full blur-3xl"
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 4, repeat: Infinity, delay: 1 }}
              />
            </motion.div>
            
            <div className="relative z-10">
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-3 md:mb-4" style={{ fontFamily: 'var(--font-heading)' }}>
                Ready to Transform Your Business?
              </h3>
              <p className="text-lg md:text-xl text-white/80 mb-6 md:mb-8 max-w-2xl mx-auto">
                Join hundreds of successful companies that have partnered with us to achieve 
                exceptional results and sustainable growth.
              </p>
              <motion.button 
                className="bg-accent-500 text-white px-6 md:px-8 py-3 md:py-4 rounded-lg font-semibold text-base md:text-lg hover:bg-accent-600 transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
              >
                Schedule a Consultation
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;