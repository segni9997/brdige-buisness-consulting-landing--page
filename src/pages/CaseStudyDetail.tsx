import React, { useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, useInView } from 'framer-motion';
import { ArrowLeft, Clock, Users, TrendingUp, DollarSign, CheckCircle, Star } from 'lucide-react';
import { useGetSuccessStoryQuery } from '../store/api';



const CaseStudyDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const studyRef = useRef(null);
  const isInView = useInView(studyRef, { once: true, margin: "-100px" });

  const { data: story, isLoading } = useGetSuccessStoryQuery(Number(id));

  const iconMap = {
    DollarSign: DollarSign,
    TrendingUp: TrendingUp,
    Users: Users,
    Clock: Clock,
    CheckCircle: CheckCircle,
    Star: Star,
  };

  const caseStudy = story ? {
    ...story,
    heroImage: story.image,
    results: story.results.map(result => ({
      ...result,
      icon: iconMap[result.icon as keyof typeof iconMap] ? React.createElement(iconMap[result.icon as keyof typeof iconMap], { className: "h-5 w-5" }) : <TrendingUp className="h-5 w-5" />,
      description: result.description || result.metric,
    })),
    challenge: story.challenge || "The client faced significant challenges in their industry that required expert consulting solutions.",
    solution: story.solution || "We provided comprehensive consulting services tailored to their specific needs and goals.",
    impact: story.impact || story.description,
    testimonial: {
      name: "Client Representative",
      role: "Executive",
      company: story.client,
      image: "https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150",
      text: "Bridge Consulting delivered exceptional results that transformed our business."
    }
  } : null;

  useEffect(() => {
    if (caseStudy) {
      window.scrollTo(0, 0);
      document.title = `${caseStudy.title} | Bridge Business Consulting Case Study`;

      let metaDesc = document.querySelector('meta[name="description"]');
      if (!metaDesc) {
        metaDesc = document.createElement('meta');
        metaDesc.setAttribute('name', 'description');
        document.head.appendChild(metaDesc);
      }
      metaDesc.setAttribute('content', `${caseStudy.challenge.substring(0, 150)}...`);
    }
  }, [id, caseStudy?.title, caseStudy?.challenge]);

  if (isLoading || !caseStudy) return <div>Loading...</div>;

return (
    <div className="min-h-screen bg-black">
      <motion.div
        className="relative h-[60vh] md:h-[70vh] overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <motion.img
          src={caseStudy.heroImage}
          alt={caseStudy.title}
          className="w-full h-full object-cover"
          initial={{ scale: 1.2 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.5 }}
        />
        <div className={`absolute inset-0 bg-gradient-to-t ${caseStudy.gradient} opacity-80`}></div>
        <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/50 to-transparent"></div>
        
        <motion.div 
          className="absolute top-20 md:top-24 left-4 md:left-8 lg:left-16 z-10"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <motion.button 
            onClick={() => navigate(-1)}
            className="flex items-center text-white/80 hover:text-white mb-4 md:mb-6 text-sm md:text-base"
            whileHover={{ x: -5 }}
          >
            <ArrowLeft className="h-4 w-4 md:h-5 md:w-5 mr-2" />
            Back to Case Studies
          </motion.button>
        </motion.div>

        <div className="absolute bottom-8 md:bottom-16 left-4 md:left-8 lg:left-16 right-4 md:right-8 lg:right-16">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <motion.span 
              className="inline-block px-3 md:px-4 py-1.5 bg-accent-500/20 text-accent-400 rounded-full text-sm font-medium mb-3 md:mb-4"
            >
              {caseStudy.industry}
            </motion.span>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-3 md:mb-4" style={{ fontFamily: 'var(--font-heading)' }}>
              {caseStudy.title}
            </h1>
            <p className="text-lg md:text-xl text-white/80 mb-4 md:mb-6">{caseStudy.client}</p>
            <div className="flex items-center text-white/60">
              <Clock className="h-4 w-4 md:h-5 md:w-5 mr-2" />
              <span className="text-sm md:text-base">{caseStudy.duration}</span>
            </div>
          </motion.div>
        </div>
      </motion.div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <motion.div 
          className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8 mb-12 md:mb-16"
          ref={studyRef}
        >
          {caseStudy.results.map((result, index) => (
            <motion.div
              key={index}
              className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 md:p-8"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              whileHover={{ y: -5 }}
            >
              <motion.div 
                className="text-accent-400 mb-3 md:mb-4"
                initial={{ scale: 0 }}
                animate={isInView ? { scale: 1 } : {}}
                transition={{ delay: index * 0.15 + 0.3, type: "spring" }}
              >
                {result.icon}
              </motion.div>
              <div className={`text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r ${caseStudy.gradient} mb-2`} style={{ fontFamily: 'var(--font-heading)' }}>
                {result.value}
              </div>
              <div className="text-white/70 font-medium mb-1 text-sm md:text-base">{result.metric}</div>
              <div className="text-white/50 text-xs md:text-sm">{result.description}</div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div 
          className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 mb-12 md:mb-16"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <motion.div 
            className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 md:p-8"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 1 }}
          >
            <h3 className="text-xl md:text-2xl font-bold text-white mb-4 md:mb-6" style={{ fontFamily: 'var(--font-heading)' }}>
              The Challenge
            </h3>
            <p className="text-white/70 leading-relaxed text-sm md:text-base">
              {caseStudy.challenge}
            </p>
          </motion.div>

          <motion.div 
            className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 md:p-8"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 1.2 }}
          >
            <h3 className="text-xl md:text-2xl font-bold text-white mb-4 md:mb-6" style={{ fontFamily: 'var(--font-heading)' }}>
              Our Solution
            </h3>
            <p className="text-white/70 leading-relaxed text-sm md:text-base">
              {caseStudy.solution}
            </p>
          </motion.div>
        </motion.div>

        <motion.div 
          className="bg-gradient-to-r from-white/10 to-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 md:p-8 lg:p-12 mb-12 md:mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.4 }}
        >
          <h3 className="text-xl md:text-2xl font-bold text-white mb-4 md:mb-6" style={{ fontFamily: 'var(--font-heading)' }}>
            The Impact
          </h3>
          <p className="text-white/70 leading-relaxed text-sm md:text-base max-w-4xl">
            {caseStudy.impact}
          </p>
        </motion.div>

        {/* <motion.div 
          className="bg-white rounded-2xl p-6 md:p-8 lg:p-12 mb-12 md:mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.6 }}
        >
          <div className="flex flex-col md:flex-row gap-6 md:gap-8 items-start">
            <Quote className="h-12 w-12 text-accent-500 flex-shrink-0" />
            <div>
              <p className="text-black/70 italic text-lg md:text-xl leading-relaxed mb-6 md:mb-8">
                "{caseStudy.testimonial.text}"
              </p>
              <div className="flex items-center">
                <motion.img
                  src={caseStudy.testimonial.image}
                  alt={caseStudy.testimonial.name}
                  className="w-12 h-12 rounded-xl mr-3 md:mr-4"
                  whileHover={{ scale: 1.1 }}
                />
                <div>
                  <h4 className="font-semibold text-black" style={{ fontFamily: 'var(--font-heading)' }}>
                    {caseStudy.testimonial.name}
                  </h4>
                  <p className="text-sm text-black/70">
                    {caseStudy.testimonial.role}, {caseStudy.testimonial.company}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.div> */}

        <motion.div 
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.8 }}
        >
          <motion.button 
            onClick={() => navigate('/case-studies')}
            className="bg-gradient-to-r from-accent-500 to-accent-600 text-white px-6 md:px-8 py-3 md:py-4 rounded-lg font-semibold text-base md:text-lg hover:from-accent-600 hover:to-accent-700 transition-all duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
          >
            View All Case Studies
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
};

export default CaseStudyDetail;