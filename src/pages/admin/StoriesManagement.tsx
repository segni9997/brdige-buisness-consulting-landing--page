import React, { useState } from 'react';
import { Edit, X, Check, Plus, Trash2, TrendingUp, DollarSign, Users, Clock, CheckCircle, Star } from 'lucide-react';
import { 
  useGetSuccessStoriesQuery, 
  useCreateSuccessStoryMutation, 
  useUpdateSuccessStoryMutation, 
  useDeleteSuccessStoryMutation, 
  type TStory, 
  type TStoryResult,
  useCreateStoryResultMutation,
  useUpdateStoryResultMutation,
  useDeleteStoryResultMutation
} from '../../store/api';

const gradientOptions = [
  { value: 'from-primary-600 to-primary-800', label: 'Blue to Dark Blue' },
  { value: 'from-accent-500 to-accent-600', label: 'Accent to Dark Accent' },
  { value: 'from-primary-700 to-accent-500', label: 'Dark Blue to Accent' },
  { value: 'from-accent-500 to-accent-700', label: 'Accent to Darker Accent' },
  { value: 'from-primary-500 to-accent-500', label: 'Light Blue to Accent' },
  { value: 'from-primary-600 to-accent-600', label: 'Blue to Dark Accent' },
  { value: 'from-accent-600 to-primary-700', label: 'Dark Accent to Dark Blue' },
  { value: 'from-primary-500 to-primary-800', label: 'Light Blue to Dark Blue' },
  { value: 'from-accent-500 to-primary-600', label: 'Accent to Blue' },
  { value: 'from-primary-700 to-primary-900', label: 'Dark Blue to Darker Blue' },
];

const iconOptions = [
  { value: 'TrendingUp', icon: TrendingUp },
  { value: 'DollarSign', icon: DollarSign },
  { value: 'Users', icon: Users },
  { value: 'Clock', icon: Clock },
  { value: 'CheckCircle', icon: CheckCircle },
  { value: 'Star', icon: Star },
];

export default function StoriesManagement() {
  const { data: storiesData } = useGetSuccessStoriesQuery();
  const [createStory] = useCreateSuccessStoryMutation();
  const [updateStory] = useUpdateSuccessStoryMutation();
  const [deleteStory] = useDeleteSuccessStoryMutation();
  
  const [createResult] = useCreateStoryResultMutation();
  const [updateResultMutation] = useUpdateStoryResultMutation();
  const [deleteResultMutation] = useDeleteStoryResultMutation();

  const [showModal, setShowModal] = useState(false);
  const [editingStory, setEditingStory] = useState<TStory | null>(null);
  const [deletedResultIds, setDeletedResultIds] = useState<number[]>([]);
  
  const [formData, setFormData] = useState<Partial<TStory>>({
    title: '',
    client: '',
    industry: '',
    duration: '',
    image: '',
    description: '',
    challenge: '',
    solution: '',
    impact: '',
    gradient: '',
    results: [],
  });

  const openAddModal = () => {
    setEditingStory(null);
    setDeletedResultIds([]);
    setFormData({
      title: '',
      client: '',
      industry: '',
      duration: '',
      image: '',
      description: '',
      challenge: '',
      solution: '',
      impact: '',
      gradient: 'from-accent-500 to-accent-600',
      results: [],
    });
    setShowModal(true);
  };

  const openEditModal = (story: TStory) => {
    setEditingStory(story);
    setDeletedResultIds([]);
    // Deep clone to avoid mutating the original object from RTK Query cache
    setFormData(JSON.parse(JSON.stringify(story)));
    setShowModal(true);
  };

  const handleSubmit = async () => {
    try {
      let storyId: number;
      
      if (editingStory) {
        await updateStory(formData as TStory).unwrap();
        storyId = editingStory.id;
      } else {
        const result = await createStory(formData).unwrap();
        storyId = result.id;
      }

      // Handle Results (Metrics)
      if (formData.results) {
        // 1. Delete results that were removed in the UI
        for (const id of deletedResultIds) {
          await deleteResultMutation(id).unwrap();
        }

        // 2. Create or Update remaining results
        for (const res of formData.results) {
          const payload = {
            ...res,
            story: storyId
          };

          // If ID is very large (Date.now()), it's a new result
          if (!res.id || res.id > 2000000000) { 
             await createResult(payload).unwrap();
          } else {
             await updateResultMutation(res).unwrap();
          }
        }
      }

      setShowModal(false);
    } catch (err) {
      console.error('Failed to save story:', err);
    }
  };

  const handleDelete = async (id: number) => {
    if (confirm('Are you sure you want to delete this story?')) {
      await deleteStory(id);
    }
  };

  const addResult = () => {
    const newResult: TStoryResult = {
      id: Date.now(), // Temporary ID
      metric: '',
      value: '',
      icon: 'TrendingUp',
      description: '',
      story: editingStory?.id || 0
    };
    setFormData(prev => ({
      ...prev,
      results: [...(prev.results || []), newResult],
    }));
  };

  const removeResult = (index: number) => {
    setFormData(prev => {
      const updatedResults = [...(prev.results || [])];
      const removed = updatedResults.splice(index, 1)[0];
      if (removed.id && removed.id < 2000000000) {
        setDeletedResultIds(prevIds => [...prevIds, removed.id!]);
      }
      return { ...prev, results: updatedResults };
    });
  };

  const updateResultField = (index: number, field: keyof TStoryResult, value: string) => {
    setFormData(prev => {
      const updatedResults = [...(prev.results || [])];
      updatedResults[index] = { ...updatedResults[index], [field]: value };
      return { ...prev, results: updatedResults };
    });
  };

  return (
    <div className="space-y-6 sm:space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white tracking-tight">Success Stories</h1>
          <p className="text-slate-400 mt-1 text-sm sm:text-base">Showcase your best projects and their impact.</p>
        </div>
        <button
          onClick={openAddModal}
          className="flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-accent-500 to-accent-600 text-white font-bold rounded-xl hover:shadow-lg hover:shadow-accent-500/20 transition-all text-sm group"
        >
          <Plus className="w-5 h-5 group-hover:rotate-90 transition-transform" />
          Add New Story
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {storiesData?.results.map((story) => (
          <div key={story.id} className="group bg-[#262e49]/50 backdrop-blur-sm border border-[#3f4d7f]/30 rounded-2xl overflow-hidden hover:border-accent-500/50 transition-all duration-300 flex flex-col relative">
            <div className="relative h-48 overflow-hidden">
              <img src={story.image} alt={story.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
              <div className={`absolute inset-0 bg-gradient-to-t ${story.gradient} opacity-60`}></div>
              <div className="absolute top-4 right-4 flex gap-2">
                <button
                  onClick={() => openEditModal(story)}
                  className="p-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-lg text-white hover:bg-accent-500 transition-colors"
                >
                  <Edit className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleDelete(story.id)}
                  className="p-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-lg text-white hover:bg-red-500 transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
            
            <div className="p-6 flex-1 flex flex-col">
              <div className="flex items-center gap-2 mb-3">
                <span className="px-3 py-1 bg-accent-500/10 border border-accent-500/20 text-accent-400 text-[10px] font-bold rounded-full uppercase tracking-widest">{story.industry}</span>
                <span className="text-slate-500 text-[10px] font-bold uppercase tracking-widest">• {story.duration}</span>
              </div>
              <h3 className="text-xl font-bold text-white mb-2 line-clamp-1">{story.title}</h3>
              <p className="text-slate-400 text-sm mb-6 flex-1 line-clamp-3 leading-relaxed">{story.description}</p>
              
              <div className="flex items-center justify-between pt-6 border-t border-[#3f4d7f]/30">
                <div className="flex -space-x-2">
                   {story.results.slice(0, 3).map((res, i) => (
                     <div key={i} className="w-8 h-8 rounded-full bg-[#191f2f] border-2 border-[#262e49] flex items-center justify-center text-accent-400" title={res.metric}>
                        {iconOptions.find(opt => opt.value === res.icon)?.icon ? React.createElement(iconOptions.find(opt => opt.value === res.icon)!.icon, { className: "w-4 h-4" }) : <TrendingUp className="w-4 h-4" />}
                     </div>
                   ))}
                </div>
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">{story.client}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center z-50 p-4 overflow-y-auto">
          <div className="bg-[#1e253a] border border-[#3f4d7f]/50 rounded-3xl w-full max-w-5xl my-8 shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
            <div className="p-6 border-b border-[#3f4d7f]/30 flex items-center justify-between bg-[#262e49]/50">
               <div>
                <h2 className="text-2xl font-bold text-white">{editingStory ? 'Refine Success Story' : 'Draft New Success Story'}</h2>
                <p className="text-slate-400 text-sm mt-1">Configure narrative, metrics, and visual presentation.</p>
              </div>
              <button onClick={() => setShowModal(false)} className="p-2 text-slate-400 hover:text-white hover:bg-white/10 rounded-full transition-all">
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <div className="p-8 overflow-y-auto flex-1 space-y-10">
               {/* Basic Info */}
               <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  <div className="space-y-4">
                    <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest">Headline & Identity</label>
                    <input
                      type="text"
                      placeholder="Story Title"
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      className="w-full px-4 py-3 bg-[#131926] border border-[#3f4d7f]/30 rounded-xl text-white text-sm focus:border-accent-500/50 outline-none"
                    />
                    <div className="grid grid-cols-2 gap-4">
                      <input
                        type="text"
                        placeholder="Client Name"
                        value={formData.client}
                        onChange={(e) => setFormData({ ...formData, client: e.target.value })}
                        className="w-full px-4 py-3 bg-[#131926] border border-[#3f4d7f]/30 rounded-xl text-white text-sm focus:border-accent-500/50 outline-none"
                      />
                      <input
                        type="text"
                        placeholder="Industry"
                        value={formData.industry}
                        onChange={(e) => setFormData({ ...formData, industry: e.target.value })}
                        className="w-full px-4 py-3 bg-[#131926] border border-[#3f4d7f]/30 rounded-xl text-white text-sm focus:border-accent-500/50 outline-none"
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest">Metadata & Media</label>
                    <input
                      type="text"
                      placeholder="Project Duration (e.g., 6 Months)"
                      value={formData.duration}
                      onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                      className="w-full px-4 py-3 bg-[#131926] border border-[#3f4d7f]/30 rounded-xl text-white text-sm focus:border-accent-500/50 outline-none"
                    />
                    <input
                      type="text"
                      placeholder="Image URL"
                      value={formData.image}
                      onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                      className="w-full px-4 py-3 bg-[#131926] border border-[#3f4d7f]/30 rounded-xl text-white text-sm focus:border-accent-500/50 outline-none"
                    />
                  </div>

                  <div className="space-y-4">
                    <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest">Visual Theme</label>
                    <select
                      value={formData.gradient}
                      onChange={(e) => setFormData({ ...formData, gradient: e.target.value })}
                      className="w-full px-4 py-3 bg-[#131926] border border-[#3f4d7f]/30 rounded-xl text-white text-sm focus:border-accent-500/50 outline-none"
                    >
                      <option value="">Select Gradient Theme</option>
                      {gradientOptions.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
                    </select>
                    <div className={`h-[46px] w-full rounded-xl bg-gradient-to-r ${formData.gradient} opacity-80 border border-white/10 flex items-center justify-center text-white text-[10px] font-bold uppercase tracking-widest`}>
                       Theme Preview
                    </div>
                  </div>
               </div>

               {/* Narrative */}
               <div className="space-y-6">
                  <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest">The Narrative</label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                     <div className="space-y-4">
                        <textarea
                          placeholder="Project Brief / Summary"
                          value={formData.description}
                          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                          className="w-full px-4 py-3 bg-[#131926] border border-[#3f4d7f]/30 rounded-xl text-white text-sm h-32 resize-none focus:border-accent-500/50 outline-none"
                        />
                        <textarea
                          placeholder="The Challenge"
                          value={formData.challenge}
                          onChange={(e) => setFormData({ ...formData, challenge: e.target.value })}
                          className="w-full px-4 py-3 bg-[#131926] border border-[#3f4d7f]/30 rounded-xl text-white text-sm h-32 resize-none focus:border-accent-500/50 outline-none"
                        />
                     </div>
                     <div className="space-y-4">
                        <textarea
                          placeholder="Our Solution"
                          value={formData.solution}
                          onChange={(e) => setFormData({ ...formData, solution: e.target.value })}
                          className="w-full px-4 py-3 bg-[#131926] border border-[#3f4d7f]/30 rounded-xl text-white text-sm h-32 resize-none focus:border-accent-500/50 outline-none"
                        />
                        <textarea
                          placeholder="The Impact"
                          value={formData.impact}
                          onChange={(e) => setFormData({ ...formData, impact: e.target.value })}
                          className="w-full px-4 py-3 bg-[#131926] border border-[#3f4d7f]/30 rounded-xl text-white text-sm h-32 resize-none focus:border-accent-500/50 outline-none"
                        />
                     </div>
                  </div>
               </div>

               {/* Results Metrics */}
               <div className="space-y-6">
                  <div className="flex items-center justify-between border-b border-[#3f4d7f]/30 pb-4">
                    <label className="block text-xs font-bold text-emerald-400 uppercase tracking-widest">Key Performance Indicators</label>
                    <button
                      onClick={addResult}
                      className="flex items-center gap-2 px-4 py-2 bg-emerald-500/10 text-emerald-400 text-xs font-bold rounded-lg hover:bg-emerald-500/20 transition-all border border-emerald-500/20"
                    >
                      <Plus className="w-4 h-4" /> Add Metric
                    </button>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {formData.results?.map((res, index) => (
                      <div key={res.id || index} className="p-6 bg-[#131926] border border-[#3f4d7f]/30 rounded-2xl space-y-4 relative group/item">
                        <button 
                          onClick={() => removeResult(index)}
                          className="absolute top-4 right-4 p-2 text-slate-500 hover:text-red-500 transition-colors opacity-0 group-hover/item:opacity-100"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                        
                        <div className="flex gap-4">
                          <div className="flex-1 space-y-4">
                             <div className="grid grid-cols-2 gap-4">
                                <div>
                                  <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">Metric Name</label>
                                  <input
                                    type="text"
                                    placeholder="e.g. ROI"
                                    value={res.metric}
                                    onChange={(e) => updateResultField(index, 'metric', e.target.value)}
                                    className="w-full px-3 py-2 bg-[#191f2f] border border-[#3f4d7f]/30 rounded-lg text-white text-sm outline-none focus:border-accent-500/30"
                                  />
                                </div>
                                <div>
                                  <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">Impact Value</label>
                                  <input
                                    type="text"
                                    placeholder="e.g. 250%"
                                    value={res.value}
                                    onChange={(e) => updateResultField(index, 'value', e.target.value)}
                                    className="w-full px-3 py-2 bg-[#191f2f] border border-[#3f4d7f]/30 rounded-lg text-white text-sm outline-none focus:border-accent-500/30"
                                  />
                                </div>
                             </div>
                             <div>
                                <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">Icon Representation</label>
                                <div className="flex flex-wrap gap-2">
                                  {iconOptions.map(opt => (
                                    <button
                                      key={opt.value}
                                      onClick={() => updateResultField(index, 'icon', opt.value)}
                                      className={`p-2 rounded-lg border transition-all ${res.icon === opt.value ? 'bg-accent-500 border-accent-500 text-white' : 'bg-white/5 border-white/10 text-slate-400 hover:border-white/20'}`}
                                    >
                                      <opt.icon className="w-4 h-4" />
                                    </button>
                                  ))}
                                </div>
                             </div>
                             <div>
                                <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">Short Description</label>
                                <input
                                  type="text"
                                  placeholder="Context for this metric"
                                  value={res.description}
                                  onChange={(e) => updateResultField(index, 'description', e.target.value)}
                                  className="w-full px-3 py-2 bg-[#191f2f] border border-[#3f4d7f]/30 rounded-lg text-white text-sm outline-none focus:border-accent-500/30"
                                />
                             </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
               </div>
            </div>

            <div className="p-6 border-t border-[#3f4d7f]/30 bg-[#262e49]/50 flex gap-4">
              <button onClick={() => setShowModal(false)} className="flex-1 px-6 py-3 bg-white/5 text-white font-bold rounded-xl hover:bg-white/10">Discard Draft</button>
              <button onClick={handleSubmit} className="flex-[2] px-6 py-3 bg-gradient-to-r from-accent-500 to-accent-600 text-white font-bold rounded-xl shadow-lg shadow-accent-500/20 flex items-center justify-center gap-2">
                <Check className="w-5 h-5" /> {editingStory ? 'Confirm Changes' : 'Publish Story'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
