import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export interface THeroSection {
  id: number;
  title: string;
  subtitle: string;
  primaryCtaText: string;
  primaryCtaLink: string;
  secondaryCtaText: string;
  secondaryCtaLink: string;
  backgroundImageUrl: string;
  stats: { number: string; label: string }[];
}

export interface TAboutUs {
  id: number;
  subtitle: string;
  description: string;
  missionTitle: string;
  missionContent: string;
  visionTitle: string;
  visionContent: string;
  yearsOfExcellence: number;
  companiesCountText: string;
  imageUrl: string;
  ctaTitle: string;
  ctaContent: string;
}

export interface TService {
  section: number;
  id?: number;
  icon: string;
  title: string;
  description: string;
  gradient: string;
  features: string[];
}

export interface TServiceSection {
  id: number;
  sectionSubtitle: string;
  sectionTitle: string;
  description: string;
  services: TService[];
}

export interface TStep {
  id?: number;
  stepNumber: number;
  icon: string;
  title: string;
  description: string;
  deliverables: string[];
}

export interface THowItWorks {
  id: number;
  sectionSubtitle: string;
  sectionTitle: string;
  description: string;
  ctaButtonText: string;
  steps: TStep[];
}

export interface TTestimonial {
  id?: number;
  name: string;
  role: string;
  company: string;
  imageUrl: string;
  testimonial: string;
  rating: number;
  gradient: string;
}

export interface TTestimonialSection {
  id: number;
  sectionSubtitle: string;
  sectionTitle: string;
  description: string;
  ctaTitle: string;
  ctaContent: string;
  testimonials: TTestimonial[];
}

export interface TFeedback {
  id: number;
  name: string;
  email: string;
  rating: number;
  status: 'new' | 'read' | 'replied';
  message: string;
  createdAt: string;
}

export interface TComment {
  id: number;
  post?: number;
  user?: string;
  fullName?: string;
  email?: string;
  Company?: string;
  comment: string;
  status: 'pending' | 'approved' | 'rejected';
  createdAt: string;
}

export interface TBlog {
  id: number;
  title: string;
  category: string;
  status: 'draft' | 'published';
  imageUrl: string;
  expert: string;
  content: string;
  createdAt: string;
  slug: string;
  comments: TComment[];
}

export interface TStoryResult {
  id: number;
  metric: string;
  value: string;
  icon: string;
  description: string;
  story: number;
}

export interface TStory {
  id: number;
  results: TStoryResult[];
  title: string;
  client: string;
  industry: string;
  duration: string;
  image: string;
  description: string;
  challenge: string;
  solution: string;
  impact: string;
  gradient: string;
  created_at: string;
}

export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ 
    baseUrl: 'http://127.0.0.1:8000/api/',
    prepareHeaders: (headers) => {
      const token = localStorage.getItem('access_token');
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    }
  }),
  tagTypes: ['Hero', 'About', 'Services', 'HowItWorks', 'Testimonials', 'Stories', 'Feedback', 'Comments', 'SuccessStories', 'StoryResults'],
  endpoints: (builder) => ({
    login: builder.mutation<any, {username:string, password:string}>({
      query: (credentials) => ({
        url: 'auth/login/',
        method: 'POST',
        body: credentials,
      }),
    }),
    
    // HERO
    getHero: builder.query<THeroSection | null, void>({
      query: () => 'hero/',
      providesTags: ['Hero'],
    transformResponse: (response: {results: THeroSection[]}) => {
  console.log("RAW RESPONSE:", response.results[0]);
  return response.results.length > 0 ? response.results[0] : null;
}
    }),
    updateHero: builder.mutation<void, THeroSection>({
      query: (content) => ({
        url: `hero/${content.id}/`,
        method: 'PUT',
        body: {
          title: content.title,
          subtitle: content.subtitle,
          primary_cta_text: content.primaryCtaText,
          primary_cta_link: content.primaryCtaLink || '#',
          secondary_cta_text: content.secondaryCtaText,
          secondary_cta_link: content.secondaryCtaLink || '#',
          background_image_url: content.backgroundImageUrl,
          stats: content.stats,
        }
      }),
      invalidatesTags: ['Hero'],
    }),

    // ABOUT
    getAbout: builder.query<TAboutUs | null, void>({
      query: () => 'about/',
      providesTags: ['About'],
      transformResponse: (response: {results: TAboutUs[]}) => {
        console.log("RAW ABOUT RESPONSE:", response.results[0]);
        return response.results.length > 0 ? response.results[0] : null
      }
    }),
    updateAbout: builder.mutation<void, TAboutUs>({
      query: (content) => ({
        url: `about/${content.id}/`,
        method: 'PUT',
        body: {
          subtitle: content.subtitle,
          description: content.description,
          mission_title: content.missionTitle,
          mission_content: content.missionContent,
          vision_title: content.visionTitle,
          vision_content: content.visionContent,
          years_of_excellence: content.yearsOfExcellence,
          companies_count_text: content.companiesCountText,
          image_url: content.imageUrl,
          cta_title: content.ctaTitle,
          cta_content: content.ctaContent,
        }
      }),
      invalidatesTags: ['About'],
    }),

    // SERVICES
    getServices: builder.query<TServiceSection | null, void>({
      query: () => 'service-sections/',
      providesTags: ['Services'],
      transformResponse: (response: {results: TServiceSection[]}) =>{
        console.log("RAW SERVICES RESPONSE:", response.results[0]);
        return response.results.length > 0 ? response.results[0] : null
      }
    }),
    updateServices: builder.mutation<void, TServiceSection>({
      query: (content) => ({
        url: `service-sections/${content.id}/`,
        method: 'PUT',
        body: {
          section_subtitle: content.sectionSubtitle,
          section_title: content.sectionTitle,
          description: content.description,
          services: content.services.map(service => ({
            id: service.id,
            icon: service.icon,
            title: service.title,
            description: service.description,
            gradient: service.gradient,
            features: service.features,
          })),
        }
      }),
      invalidatesTags: ['Services'],
    }),

    updateServicesIndividual: builder.mutation<void, TService>({
      query: (content) => ({
        url: `services/${content.id}/`,
        method: 'PUT',
        body: {
          section: content.section,
          id: content.id,
          icon: content.icon,
          title: content.title,
          description: content.description,
          gradient: content.gradient,
          features: content.features,
        }
      }),
      invalidatesTags: ['Services'],
    }),
    createService: builder.mutation<TService, Partial<TService>>({
      query: (content) => ({
        url: 'services/',
        method: 'POST',
        body: {
          section: content.section,
          icon: content.icon,
          title: content.title,
          description: content.description,
          gradient: content.gradient,
          features: content.features,
        }
      }),
      invalidatesTags: ['Services'],
    }),
    deleteService: builder.mutation<void, number>({
      query: (id) => ({
        url: `services/${id}/`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Services'],
    }),

    // HOW IT WORKS
    getHowItWorks: builder.query<THowItWorks | null, void>({
      query: () => 'how-it-works/',
      providesTags: ['HowItWorks'],
      transformResponse: (response: {results:THowItWorks[]}) => {
        console.log("RAW HOW IT WORKS RESPONSE:", response.results[0]);
        return response.results.length > 0 ? response.results[0] : null
      }
    }),
    updateHowItWorks: builder.mutation<void, THowItWorks>({
      query: (content) => ({
        url: `how-it-works/${content.id}/`,
        method: 'PUT',
        body: {
          section_subtitle: content.sectionSubtitle,
          section_title: content.sectionTitle,
          description: content.description,
          cta_button_text: content.ctaButtonText,
        }
      }),
      invalidatesTags: ['HowItWorks'],
    }),
    createHowItWorksStep: builder.mutation<TStep, Partial<TStep> & { section: number }>({
      query: (content) => ({
        url: 'steps/',
        method: 'POST',
        body: {
          how_it_works: content.section,
          step_number: content.stepNumber,
          icon: content.icon,
          title: content.title,
          description: content.description,
          deliverables: content.deliverables,
        }
      }),
      invalidatesTags: ['HowItWorks'],
    }),
    updateHowItWorksStep: builder.mutation<void, TStep & { section: number }>({
      query: (content) => ({
        url: `steps/${content.id}/`,
        method: 'PUT',
        body: {
          how_it_works: content.section,
          step_number: content.stepNumber,
          icon: content.icon,
          title: content.title,
          description: content.description,
          deliverables: content.deliverables,
        }
      }),
      invalidatesTags: ['HowItWorks'],
    }),
    deleteHowItWorksStep: builder.mutation<void, number>({
      query: (id) => ({
        url: `steps/${id}/`,
        method: 'DELETE',
      }),
      invalidatesTags: ['HowItWorks'],
    }),

    // TESTIMONIALS
    getTestimonials: builder.query<TTestimonialSection | null, void>({
      query: () => 'testimonial-sections/',
      providesTags: ['Testimonials'],
      transformResponse: (response: {results: TTestimonialSection[]}) => {
        console.log("RAW TESTIMONIALS RESPONSE:", response.results[0]);
        return response.results.length > 0 ? response.results[0] : null
      }
    }),
    updateTestimonials: builder.mutation<void, TTestimonialSection>({
      query: (content) => ({
        url: `testimonial-sections/${content.id}/`,
        method: 'PUT',
        body: {
          section_subtitle: content.sectionSubtitle,
          section_title: content.sectionTitle,
          description: content.description,
          cta_title: content.ctaTitle,
          cta_content: content.ctaContent,
          testimonials: content.testimonials.map(t => ({
            id: t.id,
            name: t.name,
            role: t.role,
            company: t.company,
            image_url: t.imageUrl,
            testimonial: t.testimonial,
            rating: t.rating,
            gradient: t.gradient,
          })),
        }
      }),
      invalidatesTags: ['Testimonials'],
    }),

    // BLOGS
    getStories: builder.query<TBlog[], void>({
      query: () => 'blogs/',
      providesTags: ['Stories'],
    }),
    createStory: builder.mutation<TBlog, Partial<TBlog>>({
      query: (content) => ({
        url: 'blogs/',
        method: 'POST',
        body: {
          title: content.title,
          category: content.category,
          status: content.status,
          image_url: content.imageUrl,
          expert: content.expert,
          content: content.content,
        }
      }),
      invalidatesTags: ['Stories'],
    }),
    updateStory: builder.mutation<TBlog, TBlog>({
      query: (content) => ({
        url: `blogs/${content.id}/`,
        method: 'PUT',
        body: {
          title: content.title,
          category: content.category,
          status: content.status,
          image_url: content.imageUrl,
          expert: content.expert,
          content: content.content,
        }
      }),
      invalidatesTags: ['Stories'],
    }),
    deleteStory: builder.mutation<void, number>({
      query: (id) => ({
        url: `blogs/${id}/`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Stories'],
    }),

    // SUCCESS STORIES
    getSuccessStories: builder.query<{count: number; next: string | null; previous: string | null; results: TStory[]}, void>({
      query: () => 'stories/',
      providesTags: ['SuccessStories'],
    }),
    getSuccessStory: builder.query<TStory, number>({
      query: (id) => `stories/${id}/`,
      providesTags: ['SuccessStories'],
    }),
    createSuccessStory: builder.mutation<TStory, Partial<TStory>>({
      query: (content) => ({
        url: 'stories/',
        method: 'POST',
        body: {
          title: content.title,
          client: content.client,
          industry: content.industry,
          duration: content.duration,
          image: content.image,
          description: content.description,
          challenge: content.challenge,
          solution: content.solution,
          impact: content.impact,
          gradient: content.gradient,
          results: content.results,
        }
      }),
      invalidatesTags: ['SuccessStories'],
    }),
    updateSuccessStory: builder.mutation<TStory, TStory>({
      query: (content) => ({
        url: `stories/${content.id}/`,
        method: 'PUT',
        body: {
          title: content.title,
          client: content.client,
          industry: content.industry,
          duration: content.duration,
          image: content.image,
          description: content.description,
          challenge: content.challenge,
          solution: content.solution,
          impact: content.impact,
          gradient: content.gradient,
          results: content.results,
        }
      }),
      invalidatesTags: ['SuccessStories'],
    }),
    deleteSuccessStory: builder.mutation<void, number>({
      query: (id) => ({
        url: `stories/${id}/`,
        method: 'DELETE',
      }),
      invalidatesTags: ['SuccessStories'],
    }),
    getStoryResults: builder.query<{count: number; next: string | null; previous: string | null; results: TStoryResult[]}, void>({
      query: () => 'story-results/',
      providesTags: ['StoryResults'],
    }),
    createStoryResult: builder.mutation<TStoryResult, Partial<TStoryResult>>({
      query: (content) => ({
        url: 'story-results/',
        method: 'POST',
        body: {
          story: content.story,
          metric: content.metric,
          value: content.value,
          icon: content.icon,
          description: content.description,
        }
      }),
      invalidatesTags: ['StoryResults', 'SuccessStories'],
    }),
    updateStoryResult: builder.mutation<TStoryResult, TStoryResult>({
      query: (content) => ({
        url: `story-results/${content.id}/`,
        method: 'PUT',
        body: {
          story: content.story,
          metric: content.metric,
          value: content.value,
          icon: content.icon,
          description: content.description,
        }
      }),
      invalidatesTags: ['StoryResults', 'SuccessStories'],
    }),
    deleteStoryResult: builder.mutation<void, number>({
      query: (id) => ({
        url: `story-results/${id}/`,
        method: 'DELETE',
      }),
      invalidatesTags: ['StoryResults', 'SuccessStories'],
    }),

    // FEEDBACK
    getFeedback: builder.query<TFeedback[], void>({
      query: () => 'feedback/',
      transformResponse: (response: {results: TFeedback[]}) => {
        console.log("RAW FEEDBACK RESPONSE:", response.results);
        return response.results;
      },
      providesTags: ['Feedback'],
    }),
    createFeedback: builder.mutation<TFeedback, Partial<TFeedback>>({
      query: (content) => ({
        url: 'feedback/',
        method: 'POST',
        body: content,
      }),
      invalidatesTags: ['Feedback'],
    }),
    updateFeedback: builder.mutation<void, TFeedback>({
      query: (content) => ({
        url: `feedback/${content.id}/`,
        method: 'PATCH',
        body: {
          status: content.status
        }
      }),
      invalidatesTags: ['Feedback'],
    }),
    deleteFeedback: builder.mutation<void, number>({
      query: (id) => ({
        url: `feedback/${id}/`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Feedback'],
    }),

    // COMMENTS
    getComments: builder.query<TComment[], void>({
      query: () => 'comments/',
      transformResponse: (response: { results: TComment[] }) => {
        console.log("RAW COMMENTS RESPONSE:", response.results);
        return response.results;
      },
      providesTags: ['Comments'],
    }),
    createComment: builder.mutation<TComment, Partial<TComment>>({
      query: (content) => ({
        url: 'comments/',
        method: 'POST',
        body: content,
      }),
      invalidatesTags: ['Comments'],
    }),
    updateComment: builder.mutation<void, TComment>({
      query: (content) => ({
        url: `comments/${content.id}/`,
        method: 'PATCH',
        body: content,
      }),
      invalidatesTags: ['Comments'],
    }),
    deleteComment: builder.mutation<void, number>({
      query: (id) => ({
        url: `comments/${id}/`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Comments'],
    }),
  })
});

export const {
  useLoginMutation,
  
  useGetHeroQuery,
  useUpdateHeroMutation,
  
  useGetAboutQuery,
  useUpdateAboutMutation,
  
  useGetServicesQuery,
  useUpdateServicesMutation,
  
  useGetHowItWorksQuery,
  useUpdateHowItWorksMutation,

  useGetTestimonialsQuery,
  useUpdateTestimonialsMutation,
  useGetStoriesQuery,
  useCreateStoryMutation,
  useUpdateStoryMutation,
  useDeleteStoryMutation,
  useGetSuccessStoriesQuery,
  useGetSuccessStoryQuery,
  useCreateSuccessStoryMutation,
  useUpdateSuccessStoryMutation,
  useDeleteSuccessStoryMutation,
  useGetStoryResultsQuery,
  useCreateStoryResultMutation,
  useUpdateStoryResultMutation,
  useDeleteStoryResultMutation,
  useUpdateServicesIndividualMutation,
  useGetFeedbackQuery,
  useUpdateFeedbackMutation,
  useCreateFeedbackMutation,
  useDeleteFeedbackMutation,
  
  useGetCommentsQuery,
  useCreateCommentMutation,
  useUpdateCommentMutation,
  useDeleteCommentMutation,
  
  useCreateServiceMutation,
  useDeleteServiceMutation,
  useCreateHowItWorksStepMutation,
  useUpdateHowItWorksStepMutation,
  useDeleteHowItWorksStepMutation,
} = api;
