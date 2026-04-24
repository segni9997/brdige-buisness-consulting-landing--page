import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Star, Quote } from 'lucide-react';
import { useGetTestimonialsQuery } from '../store/api';

const Testimonials = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { data: testimonials } = useGetTestimonialsQuery();

  if (!testimonials) return null;

  return (
    <section className="py-16 md:py-24 relative overflow-hidden bg-black/40">
      <div className="absolute inset-0 opacity-3">
        <div className="absolute top-0 left-0 w-full h-full" style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, rgba(0,0,0,0.04) 1px, transparent 0)`,
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
          className="absolute top-10 md:top-20 left-10 md:left-20 w-32 md:w-48 h-32 md:h-48 bg-accent-400/30 rounded-full blur-3xl"
          animate={{ x: [0, 20, 0], y: [0, -30, 0] }}
          transition={{ duration: 8, repeat: Infinity }}
        />
        <motion.div 
          className="absolute bottom-10 md:bottom-20 right-10 md:right-20 w-40 md:w-64 h-40 md:h-64 bg-white/10 rounded-full blur-3xl"
          animate={{ x: [0, -20, 0], y: [0, 20, 0] }}
          transition={{ duration: 10, repeat: Infinity, delay: 1 }}
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
            className="inline-block px-3 md:px-4 py-1.5 bg-black/40 text-white/70 rounded-full text-sm font-medium mb-4"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 0.2 }}
          >
            {testimonials?.sectionSubtitle}
          </motion.span>
          <h2 className="text-3xl md:text-4xl md:text-5xl font-bold text-white mb-4" style={{ fontFamily: 'var(--font-heading)' }}>
            {testimonials?.sectionTitle}
          </h2>
          <p className="text-lg md:text-xl text-white/70 max-w-3xl mx-auto">
            {testimonials?.description}
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8" ref={ref}>
          {testimonials?.testimonials?.map((testimonial, index) => (
            <motion.div
              key={index}
              className="group relative bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 border border-white/20"
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              whileHover={{ y: -8 }}
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${testimonial.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500 rounded-2xl`}></div>
              
              <Quote className="absolute top-6 right-6 h-12 w-12 text-white/60 group-hover:text-accent-400 transition-colors duration-300" />
              
              <div className="relative z-10">
                <motion.div 
                  className="flex mb-3 md:mb-4"
                  initial={{ opacity: 0 }}
                  animate={isInView ? { opacity: 1 } : {}}
                  transition={{ delay: index * 0.15 + 0.3 }}
                >
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <motion.div
                      key={i}
                      initial={{ scale: 0 }}
                      animate={isInView ? { scale: 1 } : {}}
                      transition={{ delay: index * 0.15 + 0.4 + i * 0.1, type: "spring" }}
                    >
                      <Star className="h-4 w-4 md:h-5 md:w-5 text-accent-500 fill-current" />
                    </motion.div>
                  ))}
                </motion.div>
                
                <p className="text-black/70 mb-4 md:mb-6 italic text-base md:text-lg leading-relaxed group-hover:text-black/70 transition-colors duration-300">
                  "{testimonial.testimonial}"
                </p>
                
                <div className="flex items-center">
                  <motion.img
                    src={testimonial.imageUrl}
                    alt={testimonial.name}
                    className="w-12 h-12 md:w-14 md:h-14 rounded-xl mr-3 md:mr-4 border-2 border-white/20 group-hover:border-accent-400"
                    initial={{ scale: 0 }}
                    animate={isInView ? { scale: 1 } : {}}
                    transition={{ delay: index * 0.15 + 0.5, type: "spring" }}
                    whileHover={{ scale: 1.1 }}
                  />
                  <div>
                    <h4 className="font-semibold text-black group-hover:text-accent-600 transition-colors duration-300 text-sm md:text-base" style={{ fontFamily: 'var(--font-heading)' }}>
                      {testimonial.name}
                    </h4>
                    <p className="text-sm text-black/70 group-hover:text-black/70 transition-colors duration-300">
                      {testimonial.role}
                    </p>
                    <p className="text-xs text-black/40">
                      {testimonial.company}
                    </p>
                  </div>
                </div>
              </div>
              
              <div className={`absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl ${testimonial.gradient} opacity-5 group-hover:opacity-10 transition-opacity duration-500`}></div>
            </motion.div>
          ))}
        </div>
        
        <motion.div 
          className="text-center mt-12 md:16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <div className="bg-gradient-to-r from-black/80 to-black/60 rounded-2xl p-6 md:p-8 md:p-12 relative overflow-hidden">
            <motion.div 
              className="absolute inset-0 opacity-10"
            >
              <motion.div 
                className="absolute top-0 left-0 w-24 md:w-40 h-24 md:h-40 bg-accent-500 rounded-full blur-3xl"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 3, repeat: Infinity }}
              />
              <motion.div 
                className="absolute bottom-0 right-0 w-32 md:w-48 h-32 md:h-48 bg-white rounded-full blur-3xl"
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 4, repeat: Infinity, delay: 1 }}
              />
            </motion.div>
            
            <div className="relative z-10">
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-3 md:mb-4" style={{ fontFamily: 'var(--font-heading)' }}>
                {testimonials.ctaTitle}
              </h3>
              <p className="text-lg md:text-xl text-white mb-6 md:mb-8 max-w-2xl mx-auto">
                {testimonials.ctaContent}
              </p>
              <motion.button 
                className="bg-accent-500 text-white px-6 md:px-8 py-3 md:py-4 rounded-lg font-semibold text-base md:text-lg hover:bg-accent-600 transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
              >
                Start Your Journey
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Testimonials;