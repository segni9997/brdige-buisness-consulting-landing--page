import { motion, useInView } from 'framer-motion';
import React, { useRef } from 'react';
import { TrendingUp, Users, DollarSign, Clock, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useGetSuccessStoriesQuery } from '../store/api';

const Projects = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const navigate = useNavigate();
  const { data: storiesData } = useGetSuccessStoriesQuery();

  const iconMap = {
    DollarSign: DollarSign,
    TrendingUp: TrendingUp,
    Users: Users,
    Clock: Clock,
  };

  const projects = storiesData?.results.map(story => ({
    ...story,
    results: story.results.map(result => ({
      ...result,
      icon: iconMap[result.icon as keyof typeof iconMap] ? React.createElement(iconMap[result.icon as keyof typeof iconMap], { className: "h-5 w-5" }) : <TrendingUp className="h-5 w-5" />,
    })),
  })) || [];

  return (
    <section id="projects" className="py-16 md:py-24 relative overflow-hidden bg-black/80">
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
          className="absolute top-10 md:top-20 left-5 md:left-10 w-24 md:w-32 h-24 md:h-32 bg-accent-400/10 rounded-full blur-2xl"
          animate={{ y: [0, -20, 0], x: [0, 10, 0] }}
          transition={{ duration: 6, repeat: Infinity }}
        />
        <motion.div 
          className="absolute bottom-10 md:bottom-20 right-5 md:right-10 w-32 md:w-40 h-32 md:h-40 bg-white/10 rounded-full blur-2xl"
          animate={{ y: [0, 20, 0], x: [0, -10, 0] }}
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
            className="inline-block px-3 md:px-4 py-1.5 bg-accent-500/20 text-accent-400 rounded-full text-sm font-medium mb-4"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 0.2 }}
          >
            Our Work
          </motion.span>
          <h2 className="text-3xl md:text-4xl md:text-5xl font-bold text-white mb-4" style={{ fontFamily: 'var(--font-heading)' }}>
            Success Stories
          </h2>
          <p className="text-lg md:text-xl text-white/80 max-w-3xl mx-auto">
            Discover how we've helped organizations across industries achieve remarkable transformations and measurable results.
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8" ref={ref}>
          {projects.map((project, index) => (
            <motion.div
              key={index}
              className="group relative bg-black/50 backdrop-blur-sm rounded-2xl overflow-hidden border border-white/20 hover:border-accent-500/30 transition-all duration-500"
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              whileHover={{ y: -8 }}
            >
              <div className="relative h-40 md:h-56 overflow-hidden">
                <motion.img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover"
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.7 }}
                />
                <div className={`absolute inset-0 bg-gradient-to-t ${project.gradient} opacity-60`}></div>
                <div className="absolute top-3 md:top-4 right-3 md:right-4 bg-white/20 backdrop-blur-sm px-2 md:px-3 py-1 rounded-full text-white text-xs md:text-sm font-medium">
                  {project.industry}
                </div>
              </div>
              
              <div className="p-6 md:p-8">
                <h3 className="text-xl md:text-2xl font-bold text-white mb-2 group-hover:text-accent-400 transition-colors duration-300" style={{ fontFamily: 'var(--font-heading)' }}>
                  {project.title}
                </h3>
                <p className="text-white/60 mb-1 text-sm md:text-base">{project.client}</p>
                <p className="text-white/50 text-sm mb-3 md:mb-4 flex items-center">
                  <Clock className="h-3 w-3 md:h-4 md:w-4 mr-1" />
                  {project.duration}
                </p>
                
                <p className="text-white/80 mb-4 md:mb-6 leading-relaxed text-sm md:text-base">
                  {project.description}
                </p>
                
                <div className="grid grid-cols-3 gap-2 md:gap-4 mb-4 md:mb-6">
                  {project.results.map((result, resultIndex) => (
                    <motion.div
                      key={resultIndex}
                      className="text-center p-2 md:p-4 bg-white/30 rounded-xl border border-white/30 hover:bg-white/50 transition-all duration-300"
                      whileHover={{ scale: 1.05 }}
                    >
                      <div className="text-white mb-1 md:mb-2 flex justify-center">
                        {result.icon}
                      </div>
                      <div className={`text-lg md:text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r ${project.gradient} mb-0 md:mb-1`} style={{ fontFamily: 'var(--font-heading)' }}>
                        {result.value}
                      </div>
                      <div className="text-xs text-white/60">{result.metric}</div>
                    </motion.div>
                  ))}
                </div>
                
                 <motion.button
                   className="flex items-center text-accent-400 font-semibold hover:scale-105 transition-all duration-300 group/btn"
                   whileHover={{ x: 5 }}
                   onClick={() => navigate(`/case-study/${project.id}`)}
                 >
                  View Case Study
                  <ArrowRight className="h-4 w-4 ml-2 group-hover/btn:translate-x-2 transition-transform duration-300 text-accent-400" />
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>
        
        <motion.div 
          className="text-center mt-12 md:16"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <motion.button 
            className="bg-gradient-to-r from-accent-500 to-accent-600 text-white px-6 md:px-8 py-3 md:py-4 rounded-lg font-semibold text-base md:text-lg hover:from-accent-600 hover:to-accent-700 transition-all duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => navigate('/case-studies')}
          >
            View All Case Studies
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;