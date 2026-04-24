import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Search, Lightbulb, Rocket, BarChart, ArrowRight, CheckCircle, Cpu, Globe, Target, Users, Zap, TrendingUp, Shield } from 'lucide-react';
import { useGetHowItWorksQuery } from '../store/api';

const iconMap: Record<string, React.ReactNode> = {
  Search: <Search className="h-10 w-10" />,
  Lightbulb: <Lightbulb className="h-10 w-10" />,
  Rocket: <Rocket className="h-10 w-10" />,
  BarChart: <BarChart className="h-10 w-10" />,
  Target: <Target className="h-10 w-10" />,
  Users: <Users className="h-10 w-10" />,
  Zap: <Zap className="h-10 w-10" />,
  TrendingUp: <TrendingUp className="h-10 w-10" />,
  Shield: <Shield className="h-10 w-10" />,
  Globe: <Globe className="h-10 w-10" />,
  Cpu: <Cpu className="h-10 w-10" />,
};

const HowItWorks = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { data: howItWorks } = useGetHowItWorksQuery();

  // if (!howItWorks) return null;

  return (
    <section id="how-it-works" className="py-16 md:py-24 relative overflow-hidden bg-black">
      <div className="absolute inset-0">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-black/30 to-transparent"></div>
      </div>
      
      <motion.div 
        className="absolute inset-0 overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <motion.div 
          className="absolute top-20 md:top-40 left-5 md:left-10 w-24 md:w-32 h-24 md:h-32 bg-accent-400/10 rounded-full blur-2xl"
          animate={{ 
            y: [0, -20, 0],
            x: [0, 10, 0]
          }}
          transition={{ duration: 6, repeat: Infinity }}
        />
        <motion.div 
          className="absolute bottom-20 md:bottom-40 right-5 md:right-10 w-32 md:w-40 h-32 md:h-40 bg-black/20 rounded-full blur-2xl"
          animate={{ 
            y: [0, 20, 0],
            x: [0, -10, 0]
          }}
          transition={{ duration: 8, repeat: Infinity, delay: 1 }}
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
            className="inline-block px-3 md:px-4 py-1.5 bg-black/40 text-white/80 rounded-full text-sm font-medium mb-4"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 0.2, duration: 0.4 }}
          >
            {howItWorks?.sectionSubtitle}
          </motion.span>
          <h2 className="text-3xl md:text-4xl md:text-5xl font-bold text-white mb-4 md:mb-6" style={{ fontFamily: 'var(--font-heading)' }}>
            {howItWorks?.sectionTitle}
          </h2>
          <p className="text-lg md:text-xl text-white/70 max-w-3xl mx-auto">
            {howItWorks?.description}
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 relative" ref={ref}>
          {howItWorks?.steps.map((step, index) => (
            <motion.div
              key={index}
              className="relative"
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.15 }}
            >
              <motion.div 
                className="bg-black/80 rounded-2xl p-4 md:p-6 shadow-lg hover:shadow-2xl transition-all duration-500 border border-white/20"
                whileHover={{ y: -8 }}
              >
                <motion.div 
                  className="absolute -top-2 md:-top-3 -left-2 md:-left-3 w-10 md:w-12 h-10 md:h-12 bg-black/50 rounded-full flex items-center justify-center text-white font-bold text-sm md:text-lg shadow-lg"
                  style={{ fontFamily: 'var(--font-heading)' }}
                  whileHover={{ scale: 1.1 }}
                >
                  {String(step.stepNumber).padStart(2, '0')}
                </motion.div>
                
                <div className="mt-3 md:mt-4 mb-3 md:mb-4">
                  <motion.div 
                    className="w-12 md:w-16 h-12 md:h-16 rounded-xl bg-black/50 flex items-center justify-center text-white/80"
                    whileHover={{ scale: 1.1, rotate: 6 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    {iconMap[step.icon] || <Search className="h-10 w-10" />}
                  </motion.div>
                </div>
                
                <h3 className="text-lg md:text-xl font-semibold text-white mb-2 md:mb-3 group-hover:text-accent-600 transition-colors duration-300" style={{ fontFamily: 'var(--font-heading)' }}>
                  {step.title}
                </h3>
                
                <p className="text-white/70 mb-3 md:mb-4 leading-relaxed text-sm">
                  {step.description}
                </p>
                
                <div className="space-y-1 md:space-y-2">
                  <p className="text-xs font-semibold text-white/80 uppercase tracking-wider">Deliverables:</p>
                  {step.deliverables.map((item, i) => (
                    <motion.div 
                      key={i} 
                      className="flex items-center text-xs text-white/70"
                      initial={{ opacity: 0, x: -10 }}
                      animate={isInView ? { opacity: 1, x: 0 } : {}}
                      transition={{ delay: index * 0.15 + i * 0.05 + 0.4 }}
                    >
                      <CheckCircle className="h-3 w-3 text-accent-500 mr-1 md:mr-2 flex-shrink-0" />
                      {item}
                    </motion.div>
                  ))}
                </div>
              </motion.div>
              
              {index < howItWorks.steps.length - 1 && (
                <motion.div 
                  className="hidden lg:block absolute top-1/2 -right-2 md:-right-4 transform -translate-y-1/2 z-10"
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: index * 0.15 + 0.5 }}
                >
                  <motion.div 
                    className="w-8 md:w-10 h-8 md:h-10 bg-black/20 rounded-full flex items-center justify-center shadow-lg"
                    whileHover={{ scale: 1.1 }}
                  >
                    <ArrowRight className="h-3 md:h-4 w-3 md:w-4 text-white" />
                  </motion.div>
                </motion.div>
              )}
            </motion.div>
          ))}
        </div>
        
        <motion.div 
          className="mt-12 md:mt-16 text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <motion.div 
            className="inline-flex items-center justify-center bg-black/50 text-white px-6 md:px-8 py-3 md:py-4 rounded-xl hover:shadow-2xl transition-all duration-300 cursor-pointer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
          >
            <span className="font-semibold text-base md:text-lg">{howItWorks?.ctaButtonText}</span>
            <ArrowRight className="h-4 md:h-5 w-4 md:w-5 ml-2" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default HowItWorks;