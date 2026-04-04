import { useState, useEffect, useCallback, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, useInView } from 'framer-motion';
import { ArrowRight, Clock } from 'lucide-react';

const allCaseStudies = [
  {
    id: 1,
    title: 'Global Manufacturing Optimization',
    client: 'Fortune 500 Manufacturing Corp',
    industry: 'Manufacturing',
    duration: '8 months',
    image: 'https://images.pexels.com/photos/1267338/pexels-photo-1267338.jpeg?auto=compress&cs=tinysrgb&w=800',
    summary: 'Implemented lean manufacturing principles and digital automation across 12 facilities, resulting in significant cost savings and productivity improvements.',
    results: { value: '35%', metric: 'Cost Reduction' },
    gradient: 'from-primary-600 to-primary-800'
  },
  {
    id: 2,
    title: 'Digital Banking Transformation',
    client: 'Regional Financial Institution',
    industry: 'Financial Services',
    duration: '12 months',
    image: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=800',
    summary: 'Led comprehensive digital transformation initiative, modernizing core banking systems and implementing AI-driven customer service solutions.',
    results: { value: '85%', metric: 'Digital Adoption' },
    gradient: 'from-accent-500 to-accent-600'
  },
  {
    id: 3,
    title: 'Healthcare System Restructuring',
    client: 'Multi-State Healthcare Network',
    industry: 'Healthcare',
    duration: '10 months',
    image: 'https://images.pexels.com/photos/3184339/pexels-photo-3184339.jpeg?auto=compress&cs=tinysrgb&w=800',
    summary: 'Redesigned patient care workflows and implemented integrated health information systems across 15 facilities.',
    results: { value: '45%', metric: 'Patient Satisfaction' },
    gradient: 'from-primary-700 to-accent-500'
  },
  {
    id: 4,
    title: 'Retail Chain Expansion Strategy',
    client: 'National Retail Corporation',
    industry: 'Retail',
    duration: '6 months',
    image: 'https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=800',
    summary: 'Developed and executed strategic expansion plan, opening 50 new locations while optimizing supply chain and inventory management.',
    results: { value: '200%', metric: 'Market Expansion' },
    gradient: 'from-accent-500 to-accent-700'
  },
  {
    id: 5,
    title: 'Tech Startup Scale-Up',
    client: 'InnovateTech Solutions',
    industry: 'Technology',
    duration: '9 months',
    image: 'https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&w=800',
    summary: 'Built scalable operational systems for rapid growth while maintaining company culture and product quality.',
    results: { value: '500%', metric: 'Revenue Growth' },
    gradient: 'from-primary-500 to-accent-500'
  },
  {
    id: 6,
    title: 'Energy Company Sustainability',
    client: 'GreenPower Industries',
    industry: 'Energy',
    duration: '14 months',
    image: 'https://images.pexels.com/photos/1470169/pexels-photo-1470169.jpeg?auto=compress&cs=tinysrgb&w=800',
    summary: 'Developed comprehensive sustainability roadmap integrating renewable energy sources and modernizing infrastructure.',
    results: { value: '60%', metric: 'Carbon Reduction' },
    gradient: 'from-primary-600 to-accent-600'
  },
  {
    id: 7,
    title: 'Logistics Network Optimization',
    client: 'GlobalFreight Solutions',
    industry: 'Logistics',
    duration: '7 months',
    image: 'https://images.pexels.com/photos/2984512/pexels-photo-2984512.jpeg?auto=compress&cs=tinysrgb&w=800',
    summary: 'Implemented advanced route optimization algorithms and redesigned distribution network for improved efficiency.',
    results: { value: '45%', metric: 'Delivery Speed' },
    gradient: 'from-primary-700 to-primary-900'
  },
  {
    id: 8,
    title: 'Restaurant Chain Modernization',
    client: 'Culinary Brands Inc',
    industry: 'Food & Beverage',
    duration: '5 months',
    image: 'https://images.pexels.com/photos/262978/pexels-photo-262978.jpeg?auto=compress&cs=tinysrgb&w=800',
    summary: 'Modernized entire operational model from kitchen workflows to customer experience across 25 locations.',
    results: { value: '4.5x', metric: 'Customer Reviews' },
    gradient: 'from-accent-600 to-primary-700'
  },
  {
    id: 9,
    title: 'Real Estate Development',
    client: 'Urban Development Group',
    industry: 'Real Estate',
    duration: '18 months',
    image: 'https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg?auto=compress&cs=tinysrgb&w=800',
    summary: 'Implemented advanced project management methodologies for flagship mixed-use development project.',
    results: { value: '180%', metric: 'Project ROI' },
    gradient: 'from-primary-500 to-primary-800'
  },
  {
    id: 10,
    title: 'Education Technology Integration',
    client: 'LearnTech Academy',
    industry: 'Education',
    duration: '8 months',
    image: 'https://images.pexels.com/photos/3184631/pexels-photo-3184631.jpeg?auto=compress&cs=tinysrgb&w=800',
    summary: 'Redesigned learning experience with interactive elements and adaptive learning pathways.',
    results: { value: '65%', metric: 'Student Engagement' },
    gradient: 'from-accent-500 to-primary-600'
  },
  {
    id: 11,
    title: 'Pharmaceutical Operations',
    client: 'MedPharm Corporation',
    industry: 'Healthcare',
    duration: '11 months',
    image: 'https://images.pexels.com/photos/3845625/pexels-photo-3845625.jpeg?auto=compress&cs=tinysrgb&w=800',
    summary: 'Optimized manufacturing processes with cutting-edge quality management systems.',
    results: { value: '55%', metric: 'Production Speed' },
    gradient: 'from-primary-600 to-primary-800'
  },
  {
    id: 12,
    title: 'Insurance Process Transformation',
    client: 'SecureLife Insurance',
    industry: 'Insurance',
    duration: '9 months',
    image: 'https://images.pexels.com/photos/2070574/pexels-photo-2070574.jpeg?auto=compress&cs=tinysrgb&w=800',
    summary: 'Implemented automated claims processing and AI-powered fraud detection systems.',
    results: { value: '70%', metric: 'Claims Time' },
    gradient: 'from-accent-500 to-primary-700'
  },
  {
    id: 13,
    title: 'E-commerce Platform Redesign',
    client: 'ShopMax Retail',
    industry: 'E-commerce',
    duration: '6 months',
    image: 'https://images.pexels.com/photos/230544/pexels-photo-230544.jpeg?auto=compress&cs=tinysrgb&w=800',
    summary: 'Completely redesigned e-commerce platform with focus on user experience and conversion optimization.',
    results: { value: '120%', metric: 'Conversion Rate' },
    gradient: 'from-primary-500 to-accent-600'
  },
  {
    id: 14,
    title: 'Telecommunications Network Upgrade',
    client: 'ConnectNet Corp',
    industry: 'Telecommunications',
    duration: '15 months',
    image: 'https://images.pexels.com/photos/1606296/pexels-photo-1606296.jpeg?auto=compress&cs=tinysrgb&w=800',
    summary: 'Upgraded core network infrastructure to support 5G and next-gen services.',
    results: { value: '300%', metric: 'Network Capacity' },
    gradient: 'from-primary-700 to-primary-900'
  },
  {
    id: 15,
    title: 'Automotive Manufacturing Excellence',
    client: 'AutoDrive Motors',
    industry: 'Automotive',
    duration: '12 months',
    image: 'https://images.pexels.com/photos/2116475/pexels-photo-2116475.jpeg?auto=compress&cs=tinysrgb&w=800',
    summary: 'Implemented lean production principles and automation for next-gen vehicle manufacturing.',
    results: { value: '40%', metric: 'Production Efficiency' },
    gradient: 'from-primary-600 to-accent-500'
  },
  {
    id: 16,
    title: 'Hospitality Brand Transformation',
    client: 'Luxury Stays Hotels',
    industry: 'Hospitality',
    duration: '8 months',
    image: 'https://images.pexels.com/photos/261101/pexels-photo-261101.jpeg?auto=compress&cs=tinysrgb&w=800',
    summary: 'Transformed brand experience and operational excellence across luxury hotel portfolio.',
    results: { value: '35%', metric: 'Guest Satisfaction' },
    gradient: 'from-accent-500 to-primary-700'
  },
  {
    id: 17,
    title: 'Fintech Security Enhancement',
    client: 'PaySafe Digital',
    industry: 'Financial Technology',
    duration: '7 months',
    image: 'https://images.pexels.com/photos/373543/pexels-photo-373543.jpeg?auto=compress&cs=tinysrgb&w=800',
    summary: 'Implemented advanced cybersecurity frameworks and compliance solutions.',
    results: { value: '99.9%', metric: 'Security Score' },
    gradient: 'from-primary-500 to-primary-800'
  },
  {
    id: 18,
    title: 'Non-Profit Organization Scaling',
    client: 'Global Aid Foundation',
    industry: 'Non-Profit',
    duration: '10 months',
    image: 'https://images.pexels.com/photos/2990656/pexels-photo-2990656.jpeg?auto=compress&cs=tinysrgb&w=800',
    summary: 'Scaled operational capacity while improving donor engagement and program efficiency.',
    results: { value: '250%', metric: 'Program Reach' },
    gradient: 'from-accent-500 to-accent-700'
  },
  {
    id: 19,
    title: 'SaaS Product Launch Strategy',
    client: 'CloudTools Inc',
    industry: 'Technology',
    duration: '5 months',
    image: 'https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&w=800',
    summary: 'Developed go-to-market strategy and product positioning for B2B SaaS launch.',
    results: { value: '10K+', metric: 'First Month Users' },
    gradient: 'from-primary-600 to-accent-600'
  },
  {
    id: 20,
    title: 'Fashion Brand Digital Transformation',
    client: 'StyleHouse Fashion',
    industry: 'Fashion Retail',
    duration: '9 months',
    image: 'https://images.pexels.com/photos/1926769/pexels-photo-1926769.jpeg?auto=compress&cs=tinysrgb&w=800',
    summary: 'Transformed digital presence and omnichannel strategy for fashion retail leader.',
    results: { value: '180%', metric: 'Online Revenue' },
    gradient: 'from-accent-600 to-primary-600'
  },
  {
    id: 21,
    title: 'Sports Team Performance Analytics',
    client: 'Metro Athletics',
    industry: 'Sports',
    duration: '6 months',
    image: 'https://images.pexels.com/photos/841021/pexels-photo-841021.jpeg?auto=compress&cs=tinysrgb&w=800',
    summary: 'Implemented advanced analytics and player performance tracking systems.',
    results: { value: '25%', metric: 'Win Rate' },
    gradient: 'from-primary-500 to-accent-500'
  },
  {
    id: 22,
    title: 'Government Agency Efficiency',
    client: 'City Municipal Services',
    industry: 'Government',
    duration: '14 months',
    image: 'https://images.pexels.com/photos/1104718/pexels-photo-1104718.jpeg?auto=compress&cs=tinysrgb&w=800',
    summary: 'Modernized citizen services and streamlined bureaucratic processes.',
    results: { value: '60%', metric: 'Processing Time' },
    gradient: 'from-primary-700 to-primary-900'
  },
  {
    id: 23,
    title: 'Fitness Chain Expansion',
    client: 'FitLife Gyms',
    industry: 'Fitness',
    duration: '8 months',
    image: 'https://images.pexels.com/photos/841130/pexels-photo-841130.jpeg?auto=compress&cs=tinysrgb&w=800',
    summary: 'Scaled franchise operations while maintaining brand consistency.',
    results: { value: '150%', metric: 'Location Growth' },
    gradient: 'from-accent-500 to-primary-600'
  },
  {
    id: 24,
    title: 'Media Company Content Strategy',
    client: 'NewsStream Media',
    industry: 'Media',
    duration: '7 months',
    image: 'https://images.pexels.com/photos/265667/pexels-photo-265667.jpeg?auto=compress&cs=tinysrgb&w=800',
    summary: 'Developed content strategy and monetization model for digital transformation.',
    results: { value: '200%', metric: 'Engagement' },
    gradient: 'from-primary-600 to-accent-700'
  }
];

const ITEMS_PER_PAGE = 8;

const AllCaseStudies = () => {
  const navigate = useNavigate();
  const [displayedItems, setDisplayedItems] = useState<typeof allCaseStudies>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const loaderRef = useRef(null);
  const isInView = useInView(loaderRef, { margin: "100px" });

  const loadMore = useCallback(() => {
    if (isLoading || !hasMore) return;
    
    setIsLoading(true);
    
    setTimeout(() => {
      const start = (page - 1) * ITEMS_PER_PAGE;
      const end = start + ITEMS_PER_PAGE;
      const newItems = allCaseStudies.slice(start, end);
      
      if (newItems.length > 0) {
        setDisplayedItems(prev => [...prev, ...newItems]);
        setPage(prev => prev + 1);
        setHasMore(end < allCaseStudies.length);
      } else {
        setHasMore(false);
      }
      setIsLoading(false);
    }, 500);
  }, [page, hasMore, isLoading]);

  useEffect(() => {
    if (isInView && hasMore) {
      loadMore();
    }
  }, [isInView, hasMore, loadMore]);

  useEffect(() => {
    window.scrollTo(0, 0);
    setDisplayedItems([]);
    setPage(1);
    setHasMore(true);
    setTimeout(() => {
      setDisplayedItems(allCaseStudies.slice(0, ITEMS_PER_PAGE));
      setPage(2);
    }, 100);
  }, []);

  const handleCaseStudyClick = (id: number) => {
    navigate(`/case-study/${id}`);
  };

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
              Our Work
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
                  <div className={`text-2xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r ${study.gradient}`} style={{ fontFamily: 'var(--font-heading)' }}>
                    {study.results.value}
                  </div>
                  <div className="text-white/80 text-xs md:text-sm">{study.results.metric}</div>
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
                  {study.summary}
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
              <motion.div 
                className="w-2 h-2 bg-accent-500 rounded-full"
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 0.6, repeat: Infinity }}
              />
              <motion.div 
                className="w-2 h-2 bg-accent-500 rounded-full"
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 0.6, repeat: Infinity, delay: 0.1 }}
              />
              <motion.div 
                className="w-2 h-2 bg-accent-500 rounded-full"
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 0.6, repeat: Infinity, delay: 0.2 }}
              />
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
      </div>
    </div>
  );
};

export default AllCaseStudies;