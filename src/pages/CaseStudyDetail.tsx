import { useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, useInView } from 'framer-motion';
import { ArrowLeft, Clock, Users, TrendingUp, DollarSign, CheckCircle, Star, Quote } from 'lucide-react';

const caseStudies = [
  {
    id: 1,
    title: 'Global Manufacturing Optimization',
    client: 'Fortune 500 Manufacturing Corp',
    industry: 'Manufacturing',
    duration: '8 months',
    image: 'https://images.pexels.com/photos/1267338/pexels-photo-1267338.jpeg?auto=compress&cs=tinysrgb&w=800',
    heroImage: 'https://images.pexels.com/photos/1267338/pexels-photo-1267338.jpeg?auto=compress&cs=tinysrgb&w=1920',
    results: [
      { metric: 'Cost Reduction', value: '35%', icon: <DollarSign className="h-5 w-5" />, description: 'Annual operational cost savings across all facilities' },
      { metric: 'Efficiency Gain', value: '50%', icon: <TrendingUp className="h-5 w-5" />, description: 'Increase in production line throughput' },
      { metric: 'Employee Satisfaction', value: '40%', icon: <Users className="h-5 w-5" />, description: 'Improvement in workforce engagement scores' }
    ],
    challenge: 'The client faced significant operational inefficiencies across their 12 manufacturing facilities, leading to rising production costs and declining profit margins. Legacy systems and manual processes were hindering their ability to compete effectively in the global market.',
    solution: 'We implemented a comprehensive lean manufacturing transformation program, introducing digital automation systems, optimizing production workflows, and training staff on new methodologies. The approach combined Six Sigma principles with Industry 4.0 technologies.',
    impact: 'The transformation resulted in substantial improvements across all key metrics. The client achieved a 35% reduction in operational costs, a 50% increase in production efficiency, and significantly improved employee satisfaction scores. The ROI was realized within the first year itself.',
    testimonial: {
      name: 'James Mitchell',
      role: 'COO',
      company: 'Fortune 500 Manufacturing Corp',
      image: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150',
      text: 'Bridge transformed our operations completely. Their strategic insights and implementation expertise helped us achieve results we never thought possible. The ROI has been exceptional.'
    },
    gradient: 'from-primary-600 to-primary-800'
  },
  {
    id: 2,
    title: 'Digital Banking Transformation',
    client: 'Regional Financial Institution',
    industry: 'Financial Services',
    duration: '12 months',
    image: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=800',
    heroImage: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=1920',
    results: [
      { metric: 'Digital Adoption', value: '85%', icon: <TrendingUp className="h-5 w-5" />, description: 'Increase in digital channel usage' },
      { metric: 'Processing Time', value: '60%', icon: <Clock className="h-5 w-5" />, description: 'Reduction in transaction processing time' },
      { metric: 'Customer Growth', value: '25%', icon: <Users className="h-5 w-5" />, description: 'Year-over-year customer acquisition growth' }
    ],
    challenge: 'This regional bank was struggling with outdated legacy systems that couldn\'t support modern customer expectations. Digital adoption was low, and they were losing market share to fintech competitors.',
    solution: 'We led a comprehensive digital transformation initiative, modernizing core banking systems, implementing AI-driven customer service solutions, and creating a seamless omnichannel experience.',
    impact: 'Digital adoption surged to 85%, processing times decreased by 60%, and customer growth reached 25% year-over-year. The bank now competes effectively with larger fintech players.',
    testimonial: {
      name: 'Sarah Chen',
      role: 'CEO',
      company: 'Regional Financial Institution',
      image: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=150',
      text: 'Bridge understood our unique challenges and delivered a transformation that exceeded our expectations. Our customers love the new digital experience.'
    },
    gradient: 'from-accent-500 to-accent-600'
  },
  {
    id: 3,
    title: 'Healthcare System Restructuring',
    client: 'Multi-State Healthcare Network',
    industry: 'Healthcare',
    duration: '10 months',
    image: 'https://images.pexels.com/photos/3184339/pexels-photo-3184339.jpeg?auto=compress&cs=tinysrgb&w=800',
    heroImage: 'https://images.pexels.com/photos/3184339/pexels-photo-3184339.jpeg?auto=compress&cs=tinysrgb&w=1920',
    results: [
      { metric: 'Patient Satisfaction', value: '45%', icon: <Users className="h-5 w-5" />, description: 'Improvement in patient satisfaction scores' },
      { metric: 'Operational Costs', value: '30%', icon: <DollarSign className="h-5 w-5" />, description: 'Reduction in operational expenses' },
      { metric: 'Wait Times', value: '55%', icon: <Clock className="h-5 w-5" />, description: 'Decrease in average patient wait times' }
    ],
    challenge: 'A healthcare network spanning 15 facilities was facing severe operational challenges with fragmented patient care workflows and inefficient health information systems.',
    solution: 'We redesigned patient care workflows end-to-end and implemented integrated health information systems across all 15 facilities, ensuring seamless data flow and coordinated care.',
    impact: 'Patient satisfaction improved by 45%, operational costs decreased by 30%, and wait times were cut by 55%. The network now serves patients more efficiently than ever before.',
    testimonial: {
      name: 'Dr. Patricia Williams',
      role: 'Chief Medical Officer',
      company: 'Multi-State Healthcare Network',
      image: 'https://images.pexels.com/photos/1181690/pexels-photo-1181690.jpeg?auto=compress&cs=tinysrgb&w=150',
      text: 'The improvement in patient care efficiency has been remarkable. Our staff is happier, and patients are receiving better care faster.'
    },
    gradient: 'from-primary-700 to-accent-500'
  },
  {
    id: 4,
    title: 'Retail Chain Expansion Strategy',
    client: 'National Retail Corporation',
    industry: 'Retail',
    duration: '6 months',
    image: 'https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=800',
    heroImage: 'https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=1920',
    results: [
      { metric: 'Market Expansion', value: '200%', icon: <TrendingUp className="h-5 w-5" />, description: 'Growth in market presence' },
      { metric: 'Revenue Growth', value: '75%', icon: <DollarSign className="h-5 w-5" />, description: 'Increase in annual revenue' },
      { metric: 'Store Efficiency', value: '40%', icon: <Users className="h-5 w-5" />, description: 'Improvement in per-store performance' }
    ],
    challenge: 'The retail chain needed to rapidly expand their presence while maintaining operational efficiency and supply chain management across new locations.',
    solution: 'We developed and executed a strategic expansion plan that opened 50 new locations while simultaneously optimizing supply chain operations and inventory management systems.',
    impact: 'Market presence grew by 200%, revenue increased by 75%, and store efficiency improved by 40%. The expansion was executed smoothly and ahead of schedule.',
    testimonial: {
      name: 'Michael Roberts',
      role: 'VP of Operations',
      company: 'National Retail Corporation',
      image: 'https://images.pexels.com/photos/1516680/pexels-photo-1516680.jpeg?auto=compress&cs=tinysrgb&w=150',
      text: 'Bridge made our aggressive expansion feel effortless. Their strategic planning and execution were flawless from start to finish.'
    },
    gradient: 'from-accent-500 to-accent-700'
  },
  {
    id: 5,
    title: 'Tech Startup Scale-Up',
    client: 'InnovateTech Solutions',
    industry: 'Technology',
    duration: '9 months',
    image: 'https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&w=800',
    heroImage: 'https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&w=1920',
    results: [
      { metric: 'Team Growth', value: '300%', icon: <Users className="h-5 w-5" />, description: 'Increase in team size while maintaining culture' },
      { metric: 'Revenue', value: '500%', icon: <TrendingUp className="h-5 w-5" />, description: 'Year-over-year revenue growth' },
      { metric: 'Market Share', value: '150%', icon: <TrendingUp className="h-5 w-5" />, description: 'Growth in market share' }
    ],
    challenge: 'This technology startup had a breakthrough product but lacked the operational infrastructure to scale efficiently while maintaining their company culture and product quality.',
    solution: 'We helped build scalable operational systems, implemented effective hiring and onboarding processes, and established the infrastructure needed for sustainable rapid growth.',
    impact: 'The company grew their team by 300%, achieved 500% revenue growth, and expanded market share by 150%. They successfully scaled from startup to industry leader.',
    testimonial: {
      name: 'Kevin Park',
      role: 'CEO',
      company: 'InnovateTech Solutions',
      image: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150',
      text: 'Bridge helped us scale without compromising what made us special. Their guidance was instrumental in our journey from startup to market leader.'
    },
    gradient: 'from-primary-500 to-accent-500'
  },
  {
    id: 6,
    title: 'Energy Company Sustainability',
    client: 'GreenPower Industries',
    industry: 'Energy',
    duration: '14 months',
    image: 'https://images.pexels.com/photos/1470169/pexels-photo-1470169.jpeg?auto=compress&cs=tinysrgb&w=800',
    heroImage: 'https://images.pexels.com/photos/1470169/pexels-photo-1470169.jpeg?auto=compress&cs=tinysrgb&w=1920',
    results: [
      { metric: 'Carbon Reduction', value: '60%', icon: <TrendingUp className="h-5 w-5" />, description: 'Decrease in carbon emissions' },
      { metric: 'Cost Savings', value: '40%', icon: <DollarSign className="h-5 w-5" />, description: 'Reduction in energy costs' },
      { metric: 'Renewable Usage', value: '80%', icon: <TrendingUp className="h-5 w-5" />, description: 'Transition to renewable energy sources' }
    ],
    challenge: 'A traditional energy company needed to transition to sustainable practices while maintaining reliability and competitive pricing for their customers.',
    solution: 'We developed a comprehensive sustainability roadmap that integrated renewable energy sources, modernized infrastructure, and implemented carbon reduction strategies.',
    impact: 'Carbon emissions decreased by 60%, energy costs dropped by 40%, and 80% of operations now use renewable sources. The company became an industry sustainability leader.',
    testimonial: {
      name: 'Linda Martinez',
      role: 'Sustainability Director',
      company: 'GreenPower Industries',
      image: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=150',
      text: 'We proved that sustainability and profitability can go hand in hand. Bridge helped us become a leader in clean energy while improving our bottom line.'
    },
    gradient: 'from-primary-600 to-accent-600'
  },
  {
    id: 7,
    title: 'Logistics Network Optimization',
    client: 'GlobalFreight Solutions',
    industry: 'Logistics',
    duration: '7 months',
    image: 'https://images.pexels.com/photos/2984512/pexels-photo-2984512.jpeg?auto=compress&cs=tinysrgb&w=800',
    heroImage: 'https://images.pexels.com/photos/2984512/pexels-photo-2984512.jpeg?auto=compress&cs=tinysrgb&w=1920',
    results: [
      { metric: 'Delivery Speed', value: '45%', icon: <Clock className="h-5 w-5" />, description: 'Improvement in delivery times' },
      { metric: 'Cost Per Mile', value: '35%', icon: <DollarSign className="h-5 w-5" />, description: 'Reduction in logistics costs' },
      { metric: 'On-Time Rate', value: '98%', icon: <CheckCircle className="h-5 w-5" />, description: 'Achievement in on-time deliveries' }
    ],
    challenge: 'The logistics company was struggling with inefficient routing, high fuel costs, and inconsistent delivery times across their national distribution network.',
    solution: 'We implemented advanced route optimization algorithms, redesigned the distribution network, and introduced real-time tracking and fuel management systems.',
    impact: 'Delivery speed improved by 45%, cost per mile decreased by 35%, and on-time delivery rates reached 98%. Customer satisfaction scores soared.',
    testimonial: {
      name: 'David Thompson',
      role: 'Operations Director',
      company: 'GlobalFreight Solutions',
      image: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150',
      text: 'Our logistics operations were transformed. The improvements in efficiency and reliability have made us the go-to choice in our industry.'
    },
    gradient: 'from-primary-700 to-primary-900'
  },
  {
    id: 8,
    title: 'Restaurant Chain Modernization',
    client: 'Culinary Brands Inc',
    industry: 'Food & Beverage',
    duration: '5 months',
    image: 'https://images.pexels.com/photos/262978/pexels-photo-262978.jpeg?auto=compress&cs=tinysrgb&w=800',
    heroImage: 'https://images.pexels.com/photos/262978/pexels-photo-262978.jpeg?auto=compress&cs=tinysrgb&w=1920',
    results: [
      { metric: 'Customer Reviews', value: '4.5x', icon: <Star className="h-5 w-5" />, description: 'Improvement in average ratings' },
      { metric: 'Turnover Time', value: '30%', icon: <Clock className="h-5 w-5" />, description: 'Reduction in table turnover time' },
      { metric: 'Profit Margins', value: '25%', icon: <DollarSign className="h-5 w-5" />, description: 'Increase in profit margins' }
    ],
    challenge: 'A regional restaurant chain with 25 locations was facing declining customer satisfaction and increasing competition from new dining concepts.',
    solution: 'We modernized their entire operational model, from kitchen workflows to customer experience, introducing technology solutions and training programs.',
    impact: 'Customer ratings improved 4.5x, table turnover improved by 30%, and profit margins increased by 25%. The chain became the top-rated in their region.',
    testimonial: {
      name: 'Jennifer Adams',
      role: 'CEO',
      company: 'Culinary Brands Inc',
      image: 'https://images.pexels.com/photos/1181690/pexels-photo-1181690.jpeg?auto=compress&cs=tinysrgb&w=150',
      text: 'Bridge helped us rediscover our passion for excellence. Every aspect of our operation improved, and our customers definitely noticed the difference.'
    },
    gradient: 'from-accent-600 to-primary-700'
  },
  {
    id: 9,
    title: 'Real Estate Development',
    client: 'Urban Development Group',
    industry: 'Real Estate',
    duration: '18 months',
    image: 'https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg?auto=compress&cs=tinysrgb&w=800',
    heroImage: 'https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg?auto=compress&cs=tinysrgb&w=1920',
    results: [
      { metric: 'Project ROI', value: '180%', icon: <DollarSign className="h-5 w-5" />, description: 'Return on development investment' },
      { metric: 'Time Saved', value: '25%', icon: <Clock className="h-5 w-5" />, description: 'Reduction in project timeline' },
      { metric: 'Occupancy Rate', value: '95%', icon: <CheckCircle className="h-5 w-5" />, description: 'Pre-leasing success rate' }
    ],
    challenge: 'A real estate developer was facing delays and budget overruns on their flagship mixed-use development project in a competitive urban market.',
    solution: 'We implemented advanced project management methodologies, optimized contractor coordination, and introduced value engineering approaches.',
    impact: 'The project achieved 180% ROI, completed 25% faster than projected, and reached 95% pre-leasing. It became an award-winning development.',
    testimonial: {
      name: 'Robert Williams',
      role: 'Managing Partner',
      company: 'Urban Development Group',
      image: 'https://images.pexels.com/photos/1516680/pexels-photo-1516680.jpeg?auto=compress&cs=tinysrgb&w=150',
      text: 'The efficiency and expertise Bridge brought to our project exceeded all expectations. This development is our company\'s flagship.'
    },
    gradient: 'from-primary-500 to-primary-800'
  },
  {
    id: 10,
    title: 'Education Technology Integration',
    client: 'LearnTech Academy',
    industry: 'Education',
    duration: '8 months',
    image: 'https://images.pexels.com/photos/3184631/pexels-photo-3184631.jpeg?auto=compress&cs=tinysrgb&w=800',
    heroImage: 'https://images.pexels.com/photos/3184631/pexels-photo-3184631.jpeg?auto=compress&cs=tinysrgb&w=1920',
    results: [
      { metric: 'Student Engagement', value: '65%', icon: <Users className="h-5 w-5" />, description: 'Increase in student participation' },
      { metric: 'Completion Rates', value: '40%', icon: <CheckCircle className="h-5 w-5" />, description: 'Improvement in course completion' },
      { metric: 'Satisfaction', value: '92%', icon: <Star className="h-5 w-5" />, description: 'Overall student satisfaction' }
    ],
    challenge: 'An education technology company was struggling with low student engagement and completion rates in their online learning platform.',
    solution: 'We redesigned the learning experience with interactive elements, implemented adaptive learning pathways, and created engaging mobile-first content.',
    impact: 'Student engagement increased by 65%, completion rates improved by 40%, and satisfaction reached 92%. The platform became a market leader.',
    testimonial: {
      name: 'Amanda Foster',
      role: 'CEO',
      company: 'LearnTech Academy',
      image: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=150',
      text: 'Our students love the new learning experience. Bridge transformed our platform into something truly special and effective.'
    },
    gradient: 'from-accent-500 to-primary-600'
  },
  {
    id: 11,
    title: 'Pharmaceutical Operations',
    client: 'MedPharm Corporation',
    industry: 'Healthcare',
    duration: '11 months',
    image: 'https://images.pexels.com/photos/3845625/pexels-photo-3845625.jpeg?auto=compress&cs=tinysrgb&w=800',
    heroImage: 'https://images.pexels.com/photos/3845625/pexels-photo-3845625.jpeg?auto=compress&cs=tinysrgb&w=1920',
    results: [
      { metric: 'Production Speed', value: '55%', icon: <TrendingUp className="h-5 w-5" />, description: 'Increase in production capacity' },
      { metric: 'Compliance', value: '100%', icon: <CheckCircle className="h-5 w-5" />, description: 'Regulatory compliance achievement' },
      { metric: 'Quality', value: '99.9%', icon: <Star className="h-5 w-5" />, description: 'Product quality rate' }
    ],
    challenge: 'A pharmaceutical company needed to scale production while maintaining strict regulatory compliance and quality standards.',
    solution: 'We optimized manufacturing processes, implemented cutting-edge quality management systems, and streamlined regulatory compliance procedures.',
    impact: 'Production capacity increased by 55%, they achieved 100% regulatory compliance, and product quality reached 99.9%. The company became a preferred manufacturing partner.',
    testimonial: {
      name: 'Dr. Richard Blake',
      role: 'VP of Operations',
      company: 'MedPharm Corporation',
      image: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150',
      text: 'Bridge helped us scale without compromising our rigorous quality standards. Their expertise in regulated environments was invaluable.'
    },
    gradient: 'from-primary-600 to-primary-800'
  },
  {
    id: 12,
    title: 'Insurance Process Transformation',
    client: 'SecureLife Insurance',
    industry: 'Insurance',
    duration: '9 months',
    image: 'https://images.pexels.com/photos/2070574/pexels-photo-2070574.jpeg?auto=compress&cs=tinysrgb&w=800',
    heroImage: 'https://images.pexels.com/photos/2070574/pexels-photo-2070574.jpeg?auto=compress&cs=tinysrgb&w=1920',
    results: [
      { metric: 'Claims Time', value: '70%', icon: <Clock className="h-5 w-5" />, description: 'Reduction in claims processing time' },
      { metric: 'Customer NPS', value: '+45', icon: <TrendingUp className="h-5 w-5" />, description: 'Improvement in Net Promoter Score' },
      { metric: 'Cost Per Claim', value: '40%', icon: <DollarSign className="h-5 w-5" />, description: 'Reduction in processing costs' }
    ],
    challenge: 'An insurance company was dealing with slow claims processing, high costs, and declining customer satisfaction scores.',
    solution: 'We implemented automated claims processing systems, redesigned workflows, and introduced AI-powered fraud detection.',
    impact: 'Claims processing time decreased by 70%, customer NPS improved by 45 points, and processing costs dropped by 40%.',
    testimonial: {
      name: 'Michelle Carter',
      role: 'Claims Director',
      company: 'SecureLife Insurance',
      image: 'https://images.pexels.com/photos/1181690/pexels-photo-1181690.jpeg?auto=compress&cs=tinysrgb&w=150',
      text: 'Our transformation has been remarkable. Customers are happier, costs are down, and our team actually enjoys coming to work now.'
    },
    gradient: 'from-accent-500 to-primary-700'
  }
];

const CaseStudyDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const studyRef = useRef(null);
  const isInView = useInView(studyRef, { once: true, margin: "-100px" });
  
  const caseStudy = caseStudies.find(s => s.id === Number(id)) || caseStudies[0];

useEffect(() => {
    window.scrollTo(0, 0);
    document.title = `${caseStudy.title} | Bridge Business Consulting Case Study`;
    
    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement('meta');
      metaDesc.setAttribute('name', 'description');
      document.head.appendChild(metaDesc);
    }
    metaDesc.setAttribute('content', `${caseStudy.challenge.substring(0, 150)}...`);
  }, [id, caseStudy.title, caseStudy.challenge]);

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

        <motion.div 
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
        </motion.div>

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