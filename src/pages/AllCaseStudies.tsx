import { useState, useEffect, useCallback, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, useInView } from 'framer-motion';
import { ArrowRight, Clock } from 'lucide-react';
import { useGetSuccessStoriesQuery, type TStory } from '../store/api';

const ITEMS_PER_PAGE = 8;

const AllCaseStudies = () => {
  const navigate = useNavigate();
  const { data: storiesData, isLoading: isApiLoading } = useGetSuccessStoriesQuery();
  
  const [displayedItems, setDisplayedItems] = useState<TStory[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const loaderRef = useRef(null);
  const isInView = useInView(loaderRef, { margin: "100px" });

  useEffect(() => {
    document.title = 'Case Studies | Bridge Business Consulting';
    
    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement('meta');
      metaDesc.setAttribute('name', 'description');
      document.head.appendChild(metaDesc);
    }
    metaDesc.setAttribute('content', 'Explore our comprehensive portfolio of successful business transformations across industries. See how Bridge Consulting has helped clients achieve remarkable results.');
  }, []);

  const loadMore = useCallback(() => {
    if (isLoading || isApiLoading || !hasMore || !storiesData) return;
    
    setIsLoading(true);
    
    setTimeout(() => {
      const allStories = storiesData.results;
      const start = (page - 1) * ITEMS_PER_PAGE;
      const end = start + ITEMS_PER_PAGE;
      const newItems = allStories.slice(start, end);
      
      if (newItems.length > 0) {
        setDisplayedItems(prev => [...prev, ...newItems]);
        setPage(prev => prev + 1);
        setHasMore(end < allStories.length);
      } else {
        setHasMore(false);
      }
      setIsLoading(false);
    }, 500);
  }, [page, hasMore, isLoading, isApiLoading, storiesData]);

  useEffect(() => {
    if (isInView && hasMore) {
      loadMore();
    }
  }, [isInView, hasMore, loadMore]);

  // Initial load
  useEffect(() => {
    if (storiesData) {
      setDisplayedItems(storiesData.results.slice(0, ITEMS_PER_PAGE));
      setPage(2);
      setHasMore(storiesData.results.length > ITEMS_PER_PAGE);
    }
  }, [storiesData]);

  const handleCaseStudyClick = (id: number) => {
    navigate(`/case-study/${id}`);
  };

  if (isApiLoading && displayedItems.length === 0) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="flex items-center gap-2 text-white/60">
           <motion.div className="w-3 h-3 bg-accent-500 rounded-full" animate={{ y: [0, -10, 0] }} transition={{ duration: 0.6, repeat: Infinity }} />
           <motion.div className="w-3 h-3 bg-accent-500 rounded-full" animate={{ y: [0, -10, 0] }} transition={{ duration: 0.6, repeat: Infinity, delay: 0.1 }} />
           <motion.div className="w-3 h-3 bg-accent-500 rounded-full" animate={{ y: [0, -10, 0] }} transition={{ duration: 0.6, repeat: Infinity, delay: 0.2 }} />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black">
      <motion.div 
        className="relative py-20 md:py-28 px-4 md:px-8 lg:px-16"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <div className="absolute inset-0 overflow-hidden">
          <motion.div 
            className="absolute top-0 left-0 w-full h-full"
            style={{
              backgroundImage: `radial-gradient(circle at 2px 2px, rgba(255,193,7,0.08) 1px, transparent 0)`,
              backgroundSize: '40px 40px'
            }}
          />
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

        <div className="relative z-10 max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <motion.span 
              className="inline-block px-3 md:px-4 py-1.5 bg-accent-500/20 text-accent-400 rounded-full text-sm font-medium mb-4 md:mb-6"
            >
              Our Impact
            </motion.span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 md:mb-6" style={{ fontFamily: 'var(--font-heading)' }}>
              All Case Studies
            </h1>
            <p className="text-lg md:text-xl text-white/70 max-w-3xl mx-auto">
              Explore our comprehensive portfolio of successful transformations across industries.
            </p>
          </motion.div>
        </div>
      </motion.div>

      <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-16 pb-16 md:pb-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {displayedItems.map((study, index) => (
            <motion.div
              key={study.id}
              className="group relative bg-black/50 backdrop-blur-sm rounded-2xl overflow-hidden border border-white/10 hover:border-accent-500/30 cursor-pointer transition-all duration-500"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              onClick={() => handleCaseStudyClick(study.id)}
              layout
            >
              <div className="relative h-48 md:h-56 overflow-hidden">
                <motion.img
                  src={study.image}
                  alt={study.title}
                  className="w-full h-full object-cover"
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.7 }}
                />
                <div className={`absolute inset-0 bg-gradient-to-t ${study.gradient} opacity-60`}></div>
                <div className="absolute top-3 md:top-4 right-3 md:right-4 bg-white/20 backdrop-blur-sm px-2 md:px-3 py-1 rounded-full text-white text-xs md:text-sm font-medium">
                  {study.industry}
                </div>
                <div className="absolute bottom-3 md:bottom-4 left-3 md:left-4">
                  {study.results?.[0] && (
                    <>
                      <div className={`text-2xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r ${study.gradient}`} style={{ fontFamily: 'var(--font-heading)' }}>
                        {study.results[0].value}
                      </div>
                      <div className="text-white/80 text-xs md:text-sm">{study.results[0].metric}</div>
                    </>
                  )}
                </div>
              </div>
              
              <div className="p-5 md:p-7">
                <h3 className="text-xl md:text-2xl font-bold text-white mb-2 group-hover:text-accent-400 transition-colors duration-300" style={{ fontFamily: 'var(--font-heading)' }}>
                  {study.title}
                </h3>
                <p className="text-white/60 mb-2 text-sm md:text-base">{study.client}</p>
                <p className="text-white/50 text-sm mb-4 flex items-center">
                  <Clock className="h-3 w-3 md:h-4 md:w-4 mr-1" />
                  {study.duration}
                </p>
                
                <p className="text-white/70 mb-4 md:mb-6 leading-relaxed text-sm md:text-base line-clamp-2">
                  {study.description}
                </p>
                
                <motion.div 
                  className="flex items-center text-accent-400 font-semibold"
                  whileHover={{ x: 5 }}
                >
                  View Case Study
                  <ArrowRight className="h-4 w-4 ml-2" />
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>

        {hasMore && (
          <div ref={loaderRef} className="flex justify-center py-8 md:py-12">
            <motion.div 
              className="flex items-center gap-2 text-white/60"
              animate={isLoading ? { opacity: 1 } : { opacity: 0 }}
            >
              <motion.div className="w-2 h-2 bg-accent-500 rounded-full" animate={{ y: [0, -8, 0] }} transition={{ duration: 0.6, repeat: Infinity }} />
              <motion.div className="w-2 h-2 bg-accent-500 rounded-full" animate={{ y: [0, -8, 0] }} transition={{ duration: 0.6, repeat: Infinity, delay: 0.1 }} />
              <motion.div className="w-2 h-2 bg-accent-500 rounded-full" animate={{ y: [0, -8, 0] }} transition={{ duration: 0.6, repeat: Infinity, delay: 0.2 }} />
              <span className="text-sm ml-2">Loading more...</span>
            </motion.div>
          </div>
        )}

        {!hasMore && displayedItems.length > 0 && (
          <motion.div 
            className="text-center py-8 md:py-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <p className="text-white/40 text-sm md:text-base">You've reached the end of our case studies</p>
          </motion.div>
        )}
        
        {!isApiLoading && displayedItems.length === 0 && (
          <div className="text-center py-20">
            <p className="text-white/40">No case studies found.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AllCaseStudies;