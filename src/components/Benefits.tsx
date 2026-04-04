import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { CheckCircle, BarChart3, TrendingUp, Users, Shield, Zap } from 'lucide-react';

const Benefits = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const benefits = [
    {
      icon: <BarChart3 className="h-8 w-8" />,
      title: 'Data-Driven Decisions',
      description: 'Leverage advanced analytics and insights to make informed strategic decisions that drive measurable growth.',
      gradient: 'from-black/60 to-black/80'
    },
    {
      icon: <TrendingUp className="h-8 w-8" />,
      title: 'Accelerated Growth',
      description: 'Implement proven strategies that help you scale faster, enter new markets, and increase revenue streams.',
      gradient: 'from-accent-500 to-accent-600'
    },
    {
      icon: <Users className="h-8 w-8" />,
      title: 'Stronger Teams',
      description: 'Build high-performing organizations with leadership development and cultural transformation programs.',
      gradient: 'from-accent-600 to-accent-700'
    },
    {
      icon: <Shield className="h-8 w-8" />,
      title: 'Reduced Risk',
      description: 'Identify potential threats early and implement robust risk management frameworks to protect your business.',
      gradient: 'from-black/80 to-black'
    },
    {
      icon: <Zap className="h-8 w-8" />,
      title: 'Operational Excellence',
      description: 'Streamline processes, reduce waste, and optimize resource allocation for maximum efficiency.',
      gradient: 'from-accent-500 to-accent-700'
    },
    {
      icon: <CheckCircle className="h-8 w-8" />,
      title: 'Sustainable Results',
      description: 'Create lasting competitive advantages with long-term strategies that evolve with your market.',
      gradient: 'from-black/40 to-black/60'
    }
  ];

  const values = [
    { number: '98%', label: 'Client Retention' },
    { number: '3x', label: 'Average ROI' },
    { number: '50+', label: 'Industries Served' },
    { number: '24/7', label: 'Support Available' }
  ];

  return (
    <section id="benefits" className="py-24 relative overflow-hidden bg-black/80">
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-full h-full" style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, rgba(255,193,7,0.15) 1px, transparent 0)`,
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
          className="absolute top-20 right-20 w-72 h-72 bg-accent-500/10 rounded-full blur-3xl"
          animate={{ x: [0, 50, 0], y: [0, -30, 0] }}
          transition={{ duration: 8, repeat: Infinity }}
        />
        <motion.div 
          className="absolute bottom-20 left-20 w-96 h-96 bg-white/10 rounded-full blur-3xl"
          animate={{ x: [0, -30, 0], y: [0, 50, 0] }}
          transition={{ duration: 10, repeat: Infinity, delay: 1 }}
        />
      </motion.div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <motion.span 
            className="inline-block px-4 py-1.5 bg-accent-500/20 text-accent-400 rounded-full text-sm font-medium mb-4"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 0.2, duration: 0.4 }}
          >
            Why Choose Bridge
          </motion.span>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6" style={{ fontFamily: 'var(--font-heading)' }}>
            What You Get
          </h2>
          <p className="text-xl text-white/80 max-w-3xl mx-auto">
            Partner with us to unlock your business potential. We deliver tangible results that impact your bottom line.
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {benefits.map((benefit, index) => (
            <motion.div
              key={index}
              className="group relative bg-black/50 backdrop-blur-sm rounded-2xl p-8 border border-white/20 hover:border-accent-500/30 transition-all duration-500"
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -8 }}
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${benefit.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500 rounded-2xl`}></div>
              
              <div className="relative z-10">
                <motion.div 
                  className={`w-16 h-16 rounded-xl bg-gradient-to-br ${benefit.gradient} flex items-center justify-center mb-6`}
                  whileHover={{ scale: 1.1, rotate: 6 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <div className="text-white">{benefit.icon}</div>
                </motion.div>
                
                <h3 className="text-xl font-semibold text-white mb-3 group-hover:text-accent-400 transition-colors duration-300" style={{ fontFamily: 'var(--font-heading)' }}>
                  {benefit.title}
                </h3>
                
                <p className="text-white/80 leading-relaxed">
                  {benefit.description}
                </p>
              </div>
              
              <div className={`absolute bottom-0 right-0 w-24 h-24 bg-gradient-to-tl ${benefit.gradient} opacity-5 group-hover:opacity-10 transition-opacity duration-500 rounded-tl-2xl`}></div>
            </motion.div>
          ))}
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 pt-12 border-t border-white/20">
          {values.map((value, index) => (
            <motion.div 
              key={index} 
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 + 0.4 }}
            >
              <motion.div 
                className="text-4xl md:text-5xl font-bold text-accent-500 mb-2" 
                style={{ fontFamily: 'var(--font-heading)' }}
                initial={{ scale: 0 }}
                animate={isInView ? { scale: 1 } : {}}
                transition={{ type: "spring", stiffness: 200, delay: index * 0.1 + 0.6 }}
              >
                {value.number}
              </motion.div>
              <div className="text-white/60">{value.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Benefits;