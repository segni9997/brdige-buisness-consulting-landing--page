import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, Quote, X } from 'lucide-react';
import { useGetTestimonialsQuery, type TTestimonial } from '../store/api';

const FeedbackCarousel = () => {
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [isPaused, setIsPaused] = useState(false);
  const { data: feedbacks } = useGetTestimonialsQuery();

  // Duplicate testimonials for infinite scroll effect
  const duplicatedTestimonials = feedbacks?.testimonials
    ? [...feedbacks.testimonials, ...feedbacks.testimonials, ...feedbacks.testimonials]
    : [];

  const handleCardClick = (id: number) => {
    setSelectedId(id);
    setIsPaused(true);
  };

  const handleClose = () => {
    setSelectedId(null);
    setIsPaused(false);
  };

  const selectedFeedback = feedbacks?.testimonials.find(f => f.id === selectedId) || null;

  if (!feedbacks || !feedbacks.testimonials.length) return null;

  return (
    <div className="relative w-full overflow-hidden bg-[#0a0f1a] py-20 md:py-32">
      {/* Dynamic Background */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-full h-full opacity-[0.03]" style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, #fff 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }}></div>
        <motion.div 
          className="absolute top-[10%] left-[-5%] w-[30%] h-[30%] bg-accent-500/10 rounded-full blur-[120px]"
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 8, repeat: Infinity }}
        />
        <motion.div 
          className="absolute bottom-[10%] right-[-5%] w-[30%] h-[30%] bg-primary-500/10 rounded-full blur-[120px]"
          animate={{ scale: [1.2, 1, 1.2], opacity: [0.5, 0.3, 0.5] }}
          transition={{ duration: 10, repeat: Infinity, delay: 1 }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <motion.div 
          className="text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <span className="inline-block px-4 py-1.5 bg-accent-500/10 text-accent-400 rounded-full text-xs font-bold uppercase tracking-widest mb-6 border border-accent-500/20">
            {feedbacks.sectionSubtitle || "Client Testimonials"}
          </span>
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-6 tracking-tight">
            {feedbacks.sectionTitle || "Trusted by Industry Leaders"}
          </h2>
          <p className="text-slate-400 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
            {feedbacks.description || "Real stories from businesses that scaled new heights with Bridge."}
          </p>
        </motion.div>
      </div>

      {/* Infinite Scroll Container */}
      <div 
        className="relative z-10 flex overflow-hidden group"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => !selectedId && setIsPaused(false)}
      >
        <motion.div 
          className="flex gap-6 whitespace-nowrap"
          animate={{ 
            x: isPaused ? undefined : ["0%", "-33.33%"] 
          }}
          transition={{ 
            x: {
              duration: 30,
              repeat: Infinity,
              ease: "linear",
            }
          }}
        >
          {duplicatedTestimonials.map((testimonial, index) => (
            <TestimonialCard 
              key={`${testimonial.id}-${index}`} 
              testimonial={testimonial} 
              onClick={() => handleCardClick(testimonial.id!)} 
            />
          ))}
        </motion.div>
      </div>

      {/* Modal Overlay */}
      <AnimatePresence>
        {selectedId && selectedFeedback && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div 
              className="absolute inset-0 bg-[#0a0f1a]/95 backdrop-blur-xl"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={handleClose}
            />
            
            <motion.div 
              className="relative bg-[#1a2133] border border-white/10 rounded-[2.5rem] p-8 md:p-12 max-w-3xl w-full shadow-2xl overflow-hidden"
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ type: "spring", duration: 0.6 }}
            >
              {/* Modal Decorative Elements */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-accent-500/10 rounded-full blur-3xl -mr-16 -mt-16" />
              
              <button 
                onClick={handleClose}
                className="absolute top-6 right-6 p-2 text-slate-400 hover:text-white hover:bg-white/10 rounded-full transition-all"
              >
                <X className="w-6 h-6" />
              </button>

              <div className="relative z-10">
                <Quote className="w-12 h-12 text-accent-500/20 mb-8" />
                
                <div className="flex gap-1 mb-6">
                  {[...Array(selectedFeedback.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-accent-500 fill-accent-500" />
                  ))}
                </div>

                <p className="text-white text-xl md:text-2xl leading-relaxed font-medium mb-10 italic">
                  "{selectedFeedback.testimonial}"
                </p>

                <div className="flex items-center gap-6">
                  <img 
                    src={selectedFeedback.imageUrl} 
                    alt={selectedFeedback.name} 
                    className="w-16 h-16 md:w-20 md:h-20 rounded-2xl object-cover border border-white/10"
                  />
                  <div>
                    <h4 className="text-xl font-bold text-white">{selectedFeedback.name}</h4>
                    <p className="text-slate-400 font-medium">{selectedFeedback.role}</p>
                    <p className="text-accent-400 text-sm font-bold uppercase tracking-wider mt-1">{selectedFeedback.company}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

const TestimonialCard = ({ testimonial, onClick }: { testimonial: TTestimonial, onClick: () => void }) => {
  return (
    <div 
      onClick={onClick}
      className="flex-shrink-0 w-[350px] md:w-[450px] bg-[#1a2133]/40 backdrop-blur-sm border border-white/5 rounded-3xl p-8 hover:bg-[#1a2133]/60 hover:border-accent-500/30 transition-all duration-500 cursor-pointer group/card"
    >
      <div className="flex justify-between items-start mb-6">
        <div className="flex gap-0.5">
          {[...Array(testimonial.rating)].map((_, i) => (
            <Star key={i} className="w-3 h-3 text-accent-500 fill-accent-500" />
          ))}
        </div>
        <Quote className="w-8 h-8 text-white/5 group-hover/card:text-accent-500/10 transition-colors" />
      </div>

      <p className="text-slate-300 text-base md:text-lg leading-relaxed mb-8 line-clamp-3 font-medium">
        "{testimonial.testimonial}"
      </p>

      <div className="flex items-center gap-4">
        <div className="relative">
          <img 
            src={testimonial.imageUrl} 
            alt={testimonial.name} 
            className="w-12 h-12 rounded-xl object-cover grayscale group-hover/card:grayscale-0 transition-all duration-500"
          />
          <div className="absolute inset-0 rounded-xl ring-1 ring-white/10 ring-inset" />
        </div>
        <div className="min-w-0">
          <h4 className="text-white font-bold truncate">{testimonial.name}</h4>
          <p className="text-slate-500 text-xs truncate">{testimonial.role}, {testimonial.company}</p>
        </div>
      </div>
    </div>
  );
};

export default FeedbackCarousel;