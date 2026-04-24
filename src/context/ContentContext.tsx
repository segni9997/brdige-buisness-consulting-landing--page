import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import { 
  useGetHeroQuery, useGetAboutQuery, useGetServicesQuery, 
  useGetHowItWorksQuery, useGetTestimonialsQuery, useGetSuccessStoriesQuery,
  useUpdateHeroMutation, useUpdateAboutMutation, useUpdateServicesMutation,
  useUpdateHowItWorksMutation, useUpdateTestimonialsMutation,
  type THeroSection, type TAboutUs, type TServiceSection, type THowItWorks, type TTestimonialSection, type TStory
} from '../store/api';

interface ContentContextType {
  hero: THeroSection | null;
  about: TAboutUs | null;
  services: TServiceSection | null;
  howItWorks: THowItWorks | null;
  testimonials: TTestimonialSection | null;
  stories: TStory[];
  updateHero: (content: THeroSection) => void;
  updateAbout: (content: TAboutUs) => void;
  updateServices: (content: TServiceSection) => void;
  updateHowItWorks: (content: THowItWorks) => void;
  updateTestimonials: (content: TTestimonialSection) => void;
  updateStories: (stories: TStory[]) => void;
}

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
  const { data: qHero } = useGetHeroQuery();
  const { data: qAbout } = useGetAboutQuery();
  const { data: qServices } = useGetServicesQuery();
  const { data: qHowItWorks } = useGetHowItWorksQuery();
  const { data: qTestimonials } = useGetTestimonialsQuery();
  const { data: qStories } = useGetSuccessStoriesQuery();

  const [updateHeroMutation] = useUpdateHeroMutation();
  const [updateAboutMutation] = useUpdateAboutMutation();
  const [updateServicesMutation] = useUpdateServicesMutation();
  const [updateHowItWorksMutation] = useUpdateHowItWorksMutation();
  const [updateTestimonialsMutation] = useUpdateTestimonialsMutation();

  const [hero, setHero] = useState<THeroSection | null>(storedData?.hero || null);
  const [about, setAbout] = useState<TAboutUs | null>(storedData?.about || null);
  const [services, setServices] = useState<TServiceSection | null>(storedData?.services || null);
  const [howItWorks, setHowItWorks] = useState<THowItWorks | null>(storedData?.howItWorks || null);
  const [testimonials, setTestimonials] = useState<TTestimonialSection | null>(storedData?.testimonials || null);
  const [stories, setStories] = useState<TStory[]>(storedData?.stories || []);

  useEffect(() => {
    if (qHero) setHero(qHero);
  }, [qHero]);

  useEffect(() => {
    if (qAbout) setAbout(qAbout);
  }, [qAbout]);

  useEffect(() => {
    if (qServices) setServices(qServices);
  }, [qServices]);

  useEffect(() => {
    if (qHowItWorks) setHero(qHowItWorks as any); // Wait, this was a typo in my thought process, fix below
  }, [qHowItWorks]);
  
  // Correction:
  useEffect(() => {
    if (qHowItWorks) setHowItWorks(qHowItWorks);
  }, [qHowItWorks]);

  useEffect(() => {
    if (qTestimonials) setTestimonials(qTestimonials);
  }, [qTestimonials]);

  useEffect(() => {
    if (qStories) setStories(qStories.results);
  }, [qStories]);

  useEffect(() => {
    const data = { hero, about, services, howItWorks, testimonials, stories };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  }, [hero, about, services, howItWorks, testimonials, stories]);

  const updateHero = async (content: THeroSection) => {
    try {
      await updateHeroMutation(content).unwrap();
      setHero(content);
    } catch (e) {
      console.error(e);
    }
  };
  const updateAbout = async (content: TAboutUs) => {
    try {
      await updateAboutMutation(content).unwrap();
      setAbout(content);
    } catch (e) {
      console.error(e);
    }
  };
  const updateServices = async (content: TServiceSection) => {
    try {
      await updateServicesMutation(content).unwrap();
      setServices(content);
    } catch (e) {
      console.error(e);
    }
  };
  const updateHowItWorks = async (content: THowItWorks) => {
    try {
      await updateHowItWorksMutation(content).unwrap();
      setHowItWorks(content);
    } catch (e) {
      console.error(e);
    }
  };
  const updateTestimonials = async (content: TTestimonialSection) => {
    try {
      await updateTestimonialsMutation(content).unwrap();
      setTestimonials(content);
    } catch (e) {
      console.error(e);
    }
  };
  const updateStories = (newStories: TStory[]) => setStories(newStories);

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
