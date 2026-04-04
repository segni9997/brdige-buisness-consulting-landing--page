import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, X, Star, Quote } from 'lucide-react';

interface Feedback {
  id: number;
  name: string;
  role: string;
  company: string;
  image: string;
  feedback: string;
  rating: number;
  industry: string;
}

const feedbacks: Feedback[] = [
  {
    id: 1,
    name: 'Alexandra Williams',
    role: 'CEO',
    company: 'TechFlow Industries',
    image: 'https://images.pexels.com/photos/1181690/pexels-photo-1181690.jpeg?auto=compress&cs=tinysrgb&w=150',
    feedback: 'Bridge transformed our operations completely. Their strategic insights helped us reduce costs by 35% while improving customer satisfaction by 40%. The ROI has been exceptional.',
    rating: 5,
    industry: 'Technology'
  },
  {
    id: 2,
    name: 'Marcus Thompson',
    role: 'COO',
    company: 'Global Manufacturing Corp',
    image: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150',
    feedback: 'The team at Bridge brought fresh perspectives to our decades-old processes. Their implementation of lean methodologies resulted in a 50% improvement in production efficiency.',
    rating: 5,
    industry: 'Manufacturing'
  },
  {
    id: 3,
    name: 'Jennifer Davis',
    role: 'Founder',
    company: 'StartUp Innovations',
    image: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=150',
    feedback: 'As a growing startup, we needed expert guidance on scaling our operations. Bridge provided invaluable strategic planning that helped us secure Series B funding and expand internationally.',
    rating: 5,
    industry: 'Technology'
  },
  {
    id: 4,
    name: 'Robert Chen',
    role: 'President',
    company: 'Financial Services Inc',
    image: 'https://images.pexels.com/photos/1516680/pexels-photo-1516680.jpeg?auto=compress&cs=tinysrgb&w=150',
    feedback: 'Their risk management expertise was crucial during our digital transformation. Bridge helped us navigate complex regulatory requirements while modernizing our entire technology stack.',
    rating: 5,
    industry: 'Finance'
  },
  {
    id: 5,
    name: 'Sarah Martinez',
    role: 'VP of Operations',
    company: 'HealthCare Plus',
    image: 'https://images.pexels.com/photos/1181690/pexels-photo-1181690.jpeg?auto=compress&cs=tinysrgb&w=150',
    feedback: 'The improvements in patient care efficiency have been remarkable. Our staff is happier, and patients are receiving better care faster. Bridge truly understands healthcare operations.',
    rating: 5,
    industry: 'Healthcare'
  },
  {
    id: 6,
    name: 'David Wilson',
    role: 'CTO',
    company: 'CloudTech Solutions',
    image: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150',
    feedback: 'Working with Bridge was a game-changer for our company. Their technical expertise combined with business acumen helped us achieve milestones we never thought possible.',
    rating: 5,
    industry: 'Technology'
  },
  {
    id: 7,
    name: 'Emily Johnson',
    role: 'Director',
    company: 'Retail Dreams Inc',
    image: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=150',
    feedback: 'Our expansion strategy executed flawlessly thanks to Bridge. They helped us grow from 10 to 50 locations while maintaining our brand quality and customer satisfaction.',
    rating: 5,
    industry: 'Retail'
  },
  {
    id: 8,
    name: 'Michael Brown',
    role: 'CEO',
    company: 'EnergyCorp',
    image: 'https://images.pexels.com/photos/1516680/pexels-photo-1516680.jpeg?auto=compress&cs=tinysrgb&w=150',
    feedback: 'Bridge helped us transition to sustainable energy practices while improving our bottom line. Their strategic approach made our sustainability goals achievable and profitable.',
    rating: 5,
    industry: 'Energy'
  },
  {
    id: 9,
    name: 'Lisa Anderson',
    role: 'Managing Director',
    company: 'Global Logistics',
    image: 'https://images.pexels.com/photos/1181690/pexels-photo-1181690.jpeg?auto=compress&cs=tinysrgb&w=150',
    feedback: 'Our supply chain efficiency increased by 60% after working with Bridge. Their data-driven approach and innovative solutions transformed our entire operation.',
    rating: 5,
    industry: 'Logistics'
  },
  {
    id: 10,
    name: 'James Taylor',
    role: 'CEO',
    company: 'Food & Beverage Co',
    image: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150',
    feedback: 'The transformation in our operations was incredible. Customer satisfaction scores doubled, and we\'ve become the leading brand in our region thanks to Bridge\'s guidance.',
    rating: 5,
    industry: 'Food & Beverage'
  },
  {
    id: 11,
    name: 'Amanda White',
    role: 'COO',
    company: 'EduTech Learning',
    image: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=150',
    feedback: 'Student engagement increased dramatically after implementing Bridge\'s recommendations. Their understanding of both technology and educational best practices is unmatched.',
    rating: 5,
    industry: 'Education'
  },
  {
    id: 12,
    name: 'Christopher Lee',
    role: 'VP Strategy',
    company: 'Realty Group',
    image: 'https://images.pexels.com/photos/1516680/pexels-photo-1516680.jpeg?auto=compress&cs=tinysrgb&w=150',
    feedback: 'Our development projects are now completed 25% faster and 20% under budget. Bridge\'s project management expertise has been invaluable to our growth.',
    rating: 5,
    industry: 'Real Estate'
  }
];

const FeedbackCarousel = () => {
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [isPaused, setIsPaused] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const intervalRef = useRef<number | null>(null);
  const carouselRef = useRef<HTMLDivElement>(null);

  const duplicatedFeedbacks = [...feedbacks, ...feedbacks, ...feedbacks];

  const startAutoScroll = useCallback(() => {
    if (intervalRef.current) return;
    intervalRef.current = window.setInterval(() => {
      setCurrentIndex(prev => prev + 1);
    }, 3000);
  }, []);

  const stopAutoScroll = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  useEffect(() => {
    if (!isPaused && selectedId === null) {
      startAutoScroll();
    }
    return () => stopAutoScroll();
  }, [isPaused, selectedId, startAutoScroll, stopAutoScroll]);

  const handleCardClick = (id: number) => {
    setSelectedId(id);
    setIsPaused(true);
    stopAutoScroll();
  };

  const handleClose = () => {
    setSelectedId(null);
    setIsPaused(false);
  };

  const handleManualNavigation = (direction: 'left' | 'right') => {
    setCurrentIndex(prev => direction === 'left' ? prev - 1 : prev + 1);
    setIsPaused(true);
    stopAutoScroll();
  };

  const selectedFeedback = feedbacks.find(f => f.id === selectedId);

  return (
    <div className="relative w-full overflow-hidden bg-black py-16 md:py-24">
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
          className="absolute top-10 md:top-20 left-10 md:left-20 w-32 md:w-48 h-32 md:h-48 bg-accent-400/20 rounded-full blur-3xl"
          animate={{ x: [0, 20, 0], y: [0, -30, 0] }}
          transition={{ duration: 8, repeat: Infinity }}
        />
        <motion.div 
          className="absolute bottom-10 md:bottom-20 right-10 md:right-20 w-40 md:w-64 h-40 md:h-64 bg-white/10 rounded-full blur-3xl"
          animate={{ x: [0, -20, 0], y: [0, 20, 0] }}
          transition={{ duration: 10, repeat: Infinity, delay: 1 }}
        />
      </motion.div>

      <div className="relative z-10 mb-8 md:mb-12 px-4 md:px-8">
        <motion.div 
          className="text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <motion.span 
            className="inline-block px-3 md:px-4 py-1.5 bg-accent-500/20 text-accent-400 rounded-full text-sm font-medium mb-4"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
          >
            Client Stories
          </motion.span>
          <h2 className="text-3xl md:text-4xl md:text-5xl font-bold text-white mb-4" style={{ fontFamily: 'var(--font-heading)' }}>
            What Our Clients Say
          </h2>
          <p className="text-lg md:text-xl text-white/70 max-w-3xl mx-auto">
            Real stories from real clients who've transformed their businesses with Bridge.
          </p>
        </motion.div>
      </div>

      <div className="relative z-10">
        <div className="absolute left-0 top-1/2 -translate-y-1/2 z-20 pl-2 md:pl-4">
          <motion.button
            onClick={() => handleManualNavigation('left')}
            className="w-10 h-10 md:w-12 md:h-12 bg-black/60 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-accent-500 transition-colors duration-300"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <ChevronLeft className="h-5 w-5 md:h-6 md:w-6" />
          </motion.button>
        </div>
        
        <div className="absolute right-0 top-1/2 -translate-y-1/2 z-20 pr-2 md:pr-4">
          <motion.button
            onClick={() => handleManualNavigation('right')}
            className="w-10 h-10 md:w-12 md:h-12 bg-black/60 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-accent-500 transition-colors duration-300"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <ChevronRight className="h-5 w-5 md:h-6 md:w-6" />
          </motion.button>
        </div>

        <div 
          ref={carouselRef}
          className="overflow-hidden"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => selectedId === null && setIsPaused(false)}
        >
          <motion.div 
            className="flex gap-4 md:gap-6"
            animate={{ x: `-${currentIndex * (320 + 24)}px` }}
            transition={{ 
              x: { duration: 0.5, ease: "easeOut" }
            }}
          >
            {duplicatedFeedbacks.map((feedback, index) => (
              <motion.div
                key={`${feedback.id}-${index}`}
                className="flex-shrink-0 w-72 md:w-80 cursor-pointer"
                onClick={() => handleCardClick(feedback.id)}
                whileHover={{ scale: 1.02, y: -5 }}
                transition={{ duration: 0.3 }}
              >
                <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-5 md:p-6 h-full hover:border-accent-500/30 transition-all duration-300">
                  <div className="flex items-start gap-3 mb-3 md:mb-4">
                    <motion.img
                      src={feedback.image}
                      alt={feedback.name}
                      className="w-10 h-10 md:w-12 md:h-12 rounded-xl"
                      whileHover={{ scale: 1.1 }}
                    />
                    <div className="flex-1">
                      <h4 className="font-semibold text-white text-sm md:text-base" style={{ fontFamily: 'var(--font-heading)' }}>
                        {feedback.name}
                      </h4>
                      <p className="text-white/50 text-xs md:text-sm">{feedback.role}, {feedback.company}</p>
                    </div>
                  </div>
                  
                  <div className="flex mb-2 md:mb-3">
                    {[...Array(feedback.rating)].map((_, i) => (
                      <Star key={i} className="h-3 w-3 md:h-4 md:w-4 text-accent-500 fill-current" />
                    ))}
                  </div>
                  
                  <p className="text-white/70 text-xs md:text-sm leading-relaxed line-clamp-3">
                    "{feedback.feedback}"
                  </p>
                  
                  <div className="mt-3 md:mt-4 pt-3 border-t border-white/10">
                    <span className="text-accent-400 text-xs md:text-sm font-medium">{feedback.industry}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      <div className="relative z-10 flex justify-center gap-2 mt-6 md:mt-8">
        {feedbacks.map((_, index) => (
          <button
            key={index}
            onClick={() => {
              setCurrentIndex(index);
              setIsPaused(true);
              stopAutoScroll();
            }}
            className={`w-2 h-2 md:h-3 md:w-3 rounded-full transition-all duration-300 ${
              currentIndex % feedbacks.length === index 
                ? 'bg-accent-500 w-6 md:w-8' 
                : 'bg-white/30 hover:bg-white/50'
            }`}
          />
        ))}
      </div>

      <AnimatePresence>
        {selectedId && selectedFeedback && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div 
              className="absolute inset-0 bg-black/80 backdrop-blur-md"
              onClick={handleClose}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />
            
            <motion.div 
              className="relative bg-gradient-to-br from-white to-white/95 rounded-3xl p-6 md:p-8 lg:p-12 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
              initial={{ scale: 0.5, opacity: 0, y: 50 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.5, opacity: 0, y: 50 }}
              transition={{ type: "spring", duration: 0.6 }}
            >
              <motion.button
                onClick={handleClose}
                className="absolute top-4 right-4 md:top-6 md:right-6 w-8 h-8 md:w-10 md:h-10 bg-gray-100 rounded-full flex items-center justify-center text-gray-600 hover:bg-gray-200 transition-colors z-10"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <X className="h-4 w-4 md:h-5 md:w-5" />
              </motion.button>
              
              <div className="text-center mb-6 md:mb-8">
                <Quote className="h-12 w-12 text-accent-500 mx-auto mb-4" />
                <div className="flex justify-center mb-3 md:mb-4">
                  {[...Array(selectedFeedback.rating)].map((_, i) => (
                    <motion.div
                      key={i}
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: i * 0.1 }}
                    >
                      <Star className="h-5 w-5 md:h-6 md:w-6 text-accent-500 fill-current" />
                    </motion.div>
                  ))}
                </div>
              </div>
              
              <motion.p 
                className="text-gray-700 text-lg md:text-xl italic leading-relaxed text-center mb-6 md:mb-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                "{selectedFeedback.feedback}"
              </motion.p>
              
              <motion.div 
                className="flex items-center justify-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                <motion.img
                  src={selectedFeedback.image}
                  alt={selectedFeedback.name}
                  className="w-16 h-16 md:w-20 md:h-20 rounded-2xl mr-4 md:mr-6"
                  whileHover={{ scale: 1.1 }}
                />
                <div className="text-left">
                  <h4 className="font-bold text-gray-900 text-lg md:text-xl" style={{ fontFamily: 'var(--font-heading)' }}>
                    {selectedFeedback.name}
                  </h4>
                  <p className="text-gray-600 text-sm md:text-base">
                    {selectedFeedback.role}, {selectedFeedback.company}
                  </p>
                  <span className="text-accent-500 text-sm font-medium">{selectedFeedback.industry}</span>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default FeedbackCarousel;