import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';

export interface HeroContent {
  title: string;
  subtitle: string;
  ctaPrimary: string;
  ctaSecondary: string;
  backgroundImage: string;
  stats: { number: string; label: string }[];
}

export interface AboutContent {
  subtitle: string;
  description: string;
  missionTitle: string;
  missionContent: string;
  visionTitle: string;
  visionContent: string;
  yearsOfExcellence: string;
  companiesCount: string;
  image: string;
  ctaTitle: string;
  ctaContent: string;
}

export interface ServiceItem {
  id: number;
  icon: string;
  title: string;
  description: string;
  features: string[];
  gradient: string;
}

export interface ServicesContent {
  subtitle: string;
  title: string;
  description: string;
  services: ServiceItem[];
}

export interface HowItWorksStep {
  id: number;
  number: string;
  icon: string;
  title: string;
  description: string;
  deliverables: string[];
}

export interface HowItWorksContent {
  subtitle: string;
  title: string;
  description: string;
  steps: HowItWorksStep[];
  ctaText: string;
}

export interface Story {
  id: number;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  category: string;
  image: string;
  date: string;
  status: 'published' | 'draft';
  views: number;
}

export interface Testimonial {
  id: number;
  name: string;
  role: string;
  company: string;
  image: string;
  testimonial: string;
  rating: number;
  gradient: string;
}

export interface TestimonialsContent {
  subtitle: string;
  title: string;
  description: string;
  testimonials: Testimonial[];
  ctaTitle: string;
  ctaContent: string;
}

interface ContentContextType {
  hero: HeroContent;
  about: AboutContent;
  services: ServicesContent;
  howItWorks: HowItWorksContent;
  testimonials: TestimonialsContent;
  stories: Story[];
  updateHero: (content: HeroContent) => void;
  updateAbout: (content: AboutContent) => void;
  updateServices: (content: ServicesContent) => void;
  updateHowItWorks: (content: HowItWorksContent) => void;
  updateTestimonials: (content: TestimonialsContent) => void;
  updateStories: (stories: Story[]) => void;
}

const defaultHero: HeroContent = {
  title: 'Bridge Management Consultancy',
  subtitle: 'We help businesses unlock their potential through strategic planning, operational excellence, and innovative solutions that drive measurable results.',
  ctaPrimary: 'Get Free Consultation',
  ctaSecondary: 'Learn More',
  backgroundImage: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=1920',
  stats: [
    { number: '500+', label: 'Projects Completed' },
    { number: '98%', label: 'Client Satisfaction' },
    { number: '50+', label: 'Industry Experts' }
  ]
};

const defaultAbout: AboutContent = {
  subtitle: 'About Us',
  description: 'Founded in 2008, Bridge Management Consultancy Services has been at the forefront of business transformation, helping organizations navigate complex challenges and unlock their full potential. Our approach combines deep industry knowledge with innovative methodologies to deliver sustainable results.',
  missionTitle: 'Our Mission',
  missionContent: 'To empower businesses with strategic insights and practical solutions that drive measurable growth and lasting competitive advantage.',
  visionTitle: 'Our Vision',
  visionContent: 'To be the trusted partner for organizations seeking to transform their operations and achieve breakthrough performance in an ever-evolving business landscape.',
  yearsOfExcellence: '15+',
  companiesCount: 'Trusted by 500+ companies worldwide',
  image: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=800',
  ctaTitle: 'Ready to Transform Your Business?',
  ctaContent: 'Join hundreds of successful companies that have partnered with us to achieve exceptional results and sustainable growth.'
};

const defaultServices: ServicesContent = {
  subtitle: 'What We Offer',
  title: 'Our Services',
  description: 'We offer comprehensive consulting services designed to address your unique business challenges and unlock new opportunities for growth.',
  services: [
    {
      id: 1,
      icon: 'BarChart3',
      title: 'Strategic Planning',
      description: 'Develop comprehensive strategies that align with your business goals and market opportunities.',
      features: ['Market Analysis', 'Growth Strategy', 'Risk Assessment', 'Performance Metrics'],
      gradient: 'from-black/60 to-black/80'
    },
    {
      id: 2,
      icon: 'Target',
      title: 'Operations Optimization',
      description: 'Streamline your operations to improve efficiency, reduce costs, and enhance productivity.',
      features: ['Process Mapping', 'Workflow Automation', 'Quality Management', 'Cost Reduction'],
      gradient: 'from-accent-500 to-accent-600'
    },
    {
      id: 3,
      icon: 'Users',
      title: 'Organizational Development',
      description: 'Build high-performing teams and create a culture that drives sustainable success.',
      features: ['Leadership Development', 'Team Building', 'Change Management', 'Culture Transformation'],
      gradient: 'from-accent-500 to-accent-700'
    },
    {
      id: 4,
      icon: 'Zap',
      title: 'Digital Transformation',
      description: 'Leverage technology to modernize your business processes and stay competitive.',
      features: ['Technology Integration', 'Digital Strategy', 'Data Analytics', 'Innovation Lab'],
      gradient: 'from-black/40 to-black/60'
    },
    {
      id: 5,
      icon: 'TrendingUp',
      title: 'Financial Advisory',
      description: 'Optimize your financial performance with expert guidance on budgeting and forecasting.',
      features: ['Financial Planning', 'Investment Strategy', 'Cash Flow Management', 'M&A Advisory'],
      gradient: 'from-primary-600 to-accent-500'
    },
    {
      id: 6,
      icon: 'Shield',
      title: 'Risk Management',
      description: 'Identify, assess, and mitigate business risks to protect your organization.',
      features: ['Risk Assessment', 'Compliance', 'Crisis Management', 'Insurance Strategy'],
      gradient: 'from-primary-700 to-primary-900'
    }
  ]
};

const defaultHowItWorks: HowItWorksContent = {
  subtitle: 'Our Process',
  title: 'How We Work',
  description: 'A proven 4-step methodology that delivers results. We partner with you from diagnosis to optimization.',
  steps: [
    {
      id: 1,
      number: '01',
      icon: 'Search',
      title: 'Discovery',
      description: 'We dive deep into your business, analyzing operations, market position, and growth potential to identify key opportunities.',
      deliverables: ['Business Audit', 'Market Analysis', 'SWOT Assessment', 'Stakeholder Interviews']
    },
    {
      id: 2,
      number: '02',
      icon: 'Lightbulb',
      title: 'Strategy',
      description: 'Our experts craft a customized roadmap aligned with your goals, outlining clear pathways to transform vision into reality.',
      deliverables: ['Strategic Plan', 'Implementation Roadmap', 'Resource Allocation', 'Risk Mitigation']
    },
    {
      id: 3,
      number: '03',
      icon: 'Rocket',
      title: 'Execution',
      description: 'We work alongside your team to implement solutions, ensuring smooth transitions and minimal disruption to daily operations.',
      deliverables: ['Project Management', 'Change Management', 'Team Training', 'Process Implementation']
    },
    {
      id: 4,
      number: '04',
      icon: 'BarChart',
      title: 'Optimization',
      description: 'We continuously monitor results, refine strategies, and provide ongoing support to ensure sustainable long-term success.',
      deliverables: ['Performance Tracking', 'KPI Dashboard', 'Quarterly Reviews', 'Continuous Improvement']
    }
  ],
  ctaText: 'Start Your Journey'
};

const defaultTestimonials: TestimonialsContent = {
  subtitle: 'Testimonials',
  title: 'What Our Clients Say',
  description: "Don't just take our word for it. Here's what industry leaders say about their experience working with Bridge Management Consultancy Services.",
  testimonials: [
    {
      id: 1,
      name: 'Alexandra Williams',
      role: 'CEO, TechFlow Industries',
      company: 'Fortune 500 Technology Company',
      image: 'https://images.pexels.com/photos/1181690/pexels-photo-1181690.jpeg?auto=compress&cs=tinysrgb&w=150',
      testimonial: 'Bridge transformed our operations completely. Their strategic insights helped us reduce costs by 35% while improving customer satisfaction by 40%. The ROI has been exceptional.',
      rating: 5,
      gradient: 'from-primary-600 to-accent-500'
    },
    {
      id: 2,
      name: 'Marcus Thompson',
      role: 'COO, Global Manufacturing Corp',
      company: 'International Manufacturing',
      image: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150',
      testimonial: 'The team at Bridge brought fresh perspectives to our decades-old processes. Their implementation of lean methodologies resulted in a 50% improvement in production efficiency.',
      rating: 5,
      gradient: 'from-accent-500 to-primary-600'
    },
    {
      id: 3,
      name: 'Jennifer Davis',
      role: 'Founder, StartUp Innovations',
      company: 'Technology Startup',
      image: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=150',
      testimonial: 'As a growing startup, we needed expert guidance on scaling our operations. Bridge provided invaluable strategic planning that helped us secure Series B funding and expand internationally.',
      rating: 5,
      gradient: 'from-primary-700 to-accent-500'
    },
    {
      id: 4,
      name: 'Robert Chen',
      role: 'President, Financial Services Inc',
      company: 'Financial Services',
      image: 'https://images.pexels.com/photos/1516680/pexels-photo-1516680.jpeg?auto=compress&cs=tinysrgb&w=150',
      testimonial: 'Their risk management expertise was crucial during our digital transformation. Bridge helped us navigate complex regulatory requirements while modernizing our entire technology stack.',
      rating: 5,
      gradient: 'from-accent-500 to-primary-800'
    }
  ],
  ctaTitle: 'Join Our Success Stories',
  ctaContent: 'Ready to transform your business and achieve exceptional results? Let\'s discuss how we can help you reach your goals.'
};

const defaultStories: Story[] = [
  { id: 1, title: 'Growth Strategies for 2024', excerpt: 'Discover the latest strategies to grow your business in the new year.', content: 'Full content here...', author: 'Admin', category: 'Business', image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400', date: '2024-01-15', status: 'published', views: 1250 },
  { id: 2, title: 'Financial Planning Tips', excerpt: 'Essential tips for effective financial management in your company.', content: 'Full content here...', author: 'Admin', category: 'Finance', image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=400', date: '2024-01-12', status: 'published', views: 890 },
  { id: 3, title: 'Market Analysis Report', excerpt: 'Comprehensive analysis of current market trends and predictions.', content: 'Full content here...', author: 'Admin', category: 'Analysis', image: 'https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=400', date: '2024-01-10', status: 'draft', views: 0 },
  { id: 4, title: 'Startup Guide 2024', excerpt: 'Everything you need to know about starting a successful business.', content: 'Full content here...', author: 'Admin', category: 'Startup', image: 'https://images.unsplash.com/photo-1553484771-371a605b060b?w=400', date: '2024-01-08', status: 'published', views: 2100 },
];

const ContentContext = createContext<ContentContextType | undefined>(undefined);

const STORAGE_KEY = 'bridge_consulting_content';

function getStoredContent() {
  if (typeof window === 'undefined') return null;
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored) {
    try {
      return JSON.parse(stored);
    } catch {
      return null;
    }
  }
  return null;
}

const storedData = getStoredContent();

export function ContentProvider({ children }: { children: ReactNode }) {
  const [hero, setHero] = useState<HeroContent>(storedData?.hero || defaultHero);
  const [about, setAbout] = useState<AboutContent>(storedData?.about || defaultAbout);
  const [services, setServices] = useState<ServicesContent>(storedData?.services || defaultServices);
  const [howItWorks, setHowItWorks] = useState<HowItWorksContent>(storedData?.howItWorks || defaultHowItWorks);
  const [testimonials, setTestimonials] = useState<TestimonialsContent>(storedData?.testimonials || defaultTestimonials);
  const [stories, setStories] = useState<Story[]>(storedData?.stories || defaultStories);

  useEffect(() => {
    const data = { hero, about, services, howItWorks, testimonials, stories };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  }, [hero, about, services, howItWorks, testimonials, stories]);

  const updateHero = (content: HeroContent) => setHero(content);
  const updateAbout = (content: AboutContent) => setAbout(content);
  const updateServices = (content: ServicesContent) => setServices(content);
  const updateHowItWorks = (content: HowItWorksContent) => setHowItWorks(content);
  const updateTestimonials = (content: TestimonialsContent) => setTestimonials(content);
  const updateStories = (newStories: Story[]) => setStories(newStories);

  return (
    <ContentContext.Provider value={{
      hero, about, services, howItWorks, testimonials, stories,
      updateHero, updateAbout, updateServices, updateHowItWorks, updateTestimonials, updateStories
    }}>
      {children}
    </ContentContext.Provider>
  );
}

export function useContent() {
  const context = useContext(ContentContext);
  if (!context) {
    throw new Error('useContent must be used within ContentProvider');
  }
  return context;
}
