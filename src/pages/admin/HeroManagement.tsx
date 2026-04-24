import { useState, useEffect } from 'react';
import { Home, Edit, X, Check, Eye as EyeIcon, Image, Plus, Trash2, TrendingUp } from 'lucide-react';
import { useGetHeroQuery, useUpdateHeroMutation, type THeroSection } from '../../store/api';

export default function HeroManagement() {
  const { data: heroData } = useGetHeroQuery();
  const [updateHeroMutation] = useUpdateHeroMutation();
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState<THeroSection | null>(null);

  const getStatsArray = (stats: any) => {
    if (Array.isArray(stats)) return stats;
    try {
      if (typeof stats === 'string') return JSON.parse(stats);
    } catch (e) {
      console.error("Failed to parse hero stats:", e);
    }
    return [];
  };

  useEffect(() => {
    if (heroData) {
      const parsed = JSON.parse(JSON.stringify(heroData));
      parsed.stats = getStatsArray(parsed.stats);
      setFormData(parsed);
    }
  }, [heroData]);

  if (!heroData || !formData) return <div>Loading...</div>;

  const handleSubmit = async () => {
    try {
      await updateHeroMutation(formData).unwrap();
      setShowModal(false);
    } catch (err) {
      console.error('Failed to update hero:', err);
    }
  };

  const addStat = () => {
    const newStats = [...(formData.stats || [])];
    newStats.push({ label: 'New Stat', number: '0' });
    setFormData({ ...formData, stats: newStats });
  };

  const removeStat = (index: number) => {
    const newStats = [...(formData.stats || [])];
    newStats.splice(index, 1);
    setFormData({ ...formData, stats: newStats });
  };

  const updateStat = (index: number, field: 'label' | 'number', value: string) => {
    const newStats = [...(formData.stats || [])];
    newStats[index] = { ...newStats[index], [field]: value };
    setFormData({ ...formData, stats: newStats });
  };

  return (
    <div className="space-y-6 sm:space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white tracking-tight">Hero Section</h1>
          <p className="text-slate-400 mt-1 text-sm sm:text-base">Command the first impression of your platform.</p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-accent-500 to-accent-600 text-white font-bold rounded-xl hover:shadow-lg hover:shadow-accent-500/20 transition-all text-sm group"
        >
          <Edit className="w-5 h-5" />
          Edit Hero Content
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
         <div className="bg-[#262e49]/50 backdrop-blur-sm border border-[#3f4d7f]/30 rounded-2xl p-6 flex flex-col justify-between hover:border-accent-500/30 transition-all">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 rounded-xl bg-accent-500/10 flex items-center justify-center text-accent-400">
                <Home className="w-6 h-6" />
              </div>
              <div>
                <p className="text-slate-400 text-xs font-bold uppercase tracking-wider">Main Title</p>
                <h3 className="text-lg font-bold text-white line-clamp-1">{heroData.title}</h3>
              </div>
            </div>
            <p className="text-slate-300 text-sm line-clamp-2 italic">"{heroData.subtitle}"</p>
         </div>

         <div className="bg-[#262e49]/50 backdrop-blur-sm border border-[#3f4d7f]/30 rounded-2xl p-6 flex flex-col justify-between hover:border-accent-500/30 transition-all">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 rounded-xl bg-primary-500/10 flex items-center justify-center text-primary-400">
                <Image className="w-6 h-6" />
              </div>
              <div>
                <p className="text-slate-400 text-xs font-bold uppercase tracking-wider">Visual Asset</p>
                <h3 className="text-lg font-bold text-white">Hero Image</h3>
              </div>
            </div>
            <p className="text-slate-400 text-xs truncate">{heroData.backgroundImageUrl}</p>
         </div>

         <div className="bg-[#262e49]/50 backdrop-blur-sm border border-[#3f4d7f]/30 rounded-2xl p-6 flex flex-col justify-between hover:border-accent-500/30 transition-all">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 rounded-xl bg-green-500/10 flex items-center justify-center text-green-400">
                <TrendingUp className="w-6 h-6" />
              </div>
              <div>
                <p className="text-slate-400 text-xs font-bold uppercase tracking-wider">Engagement</p>
                <h3 className="text-lg font-bold text-white">{getStatsArray(heroData.stats).length} Key Statistics</h3>
              </div>
            </div>
            <div className="flex -space-x-2">
              {getStatsArray(heroData.stats).slice(0, 3).map((_: any, i: number) => (
                <div key={i} className="w-8 h-8 rounded-full bg-[#191f2f] border-2 border-[#262e49] flex items-center justify-center text-accent-400 text-[10px] font-bold">
                   {i+1}
                </div>
              ))}
            </div>
         </div>
      </div>

      <div className="bg-[#262e49]/30 backdrop-blur-xl border border-[#3f4d7f]/20 rounded-3xl p-8 overflow-hidden relative">
        <div className="absolute top-0 right-0 w-64 h-64 bg-accent-500/5 rounded-full blur-3xl -mr-32 -mt-32"></div>
        <h2 className="text-xl font-bold text-white mb-8 flex items-center gap-2">
          <EyeIcon className="w-5 h-5 text-accent-400" /> Content Preview
        </h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="space-y-6">
            <div>
              <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest block mb-2">Headline</label>
              <p className="text-3xl font-bold text-white leading-tight">{heroData.title}</p>
            </div>
            <div>
              <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest block mb-2">Description</label>
              <p className="text-slate-300 text-lg leading-relaxed">{heroData.subtitle}</p>
            </div>
            <div className="flex gap-4">
              <div className="px-6 py-3 bg-accent-500 rounded-xl text-white font-bold text-sm">{heroData.primaryCtaText}</div>
              <div className="px-6 py-3 bg-white/10 rounded-xl text-white font-bold text-sm border border-white/10">{heroData.secondaryCtaText}</div>
            </div>
          </div>
          
          <div className="space-y-6">
             <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest block mb-4">Key Metrics</label>
             <div className="grid grid-cols-2 gap-4">
               {getStatsArray(heroData.stats).map((stat: any, i: number) => (
                 <div key={i} className="bg-white/5 border border-white/10 rounded-2xl p-5 hover:bg-white/10 transition-colors">
                   <p className="text-3xl font-bold text-accent-400 mb-1">{stat.number}</p>
                   <p className="text-slate-400 text-sm font-medium">{stat.label}</p>
                 </div>
               ))}
             </div>
          </div>
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center z-50 p-4 overflow-y-auto">
          <div className="bg-[#1e253a] border border-[#3f4d7f]/50 rounded-3xl w-full max-w-4xl my-8 shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
            <div className="p-6 border-b border-[#3f4d7f]/30 flex items-center justify-between bg-[#262e49]/50">
              <div>
                <h2 className="text-2xl font-bold text-white">Refine Hero Section</h2>
                <p className="text-slate-400 text-sm mt-1">Update titles, CTAs, and statistics.</p>
              </div>
              <button onClick={() => setShowModal(false)} className="p-2 text-slate-400 hover:text-white hover:bg-white/10 rounded-full transition-all">
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <div className="p-6 overflow-y-auto flex-1 space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-6">
                   <h3 className="text-sm font-bold text-accent-400 uppercase tracking-widest">Main Messaging</h3>
                   <div className="space-y-4">
                     <div>
                       <label className="block text-xs font-bold text-slate-400 uppercase mb-2">Main Headline</label>
                       <input
                         type="text"
                         value={formData.title}
                         onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                         className="w-full px-4 py-3 bg-[#131926] border border-[#3f4d7f]/30 rounded-xl text-white text-sm focus:border-accent-500/50 outline-none transition-all"
                       />
                     </div>
                     <div>
                       <label className="block text-xs font-bold text-slate-400 uppercase mb-2">Subtitle / Description</label>
                       <textarea
                         value={formData.subtitle}
                         onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
                         className="w-full px-4 py-3 bg-[#131926] border border-[#3f4d7f]/30 rounded-xl text-white text-sm h-32 resize-none focus:border-accent-500/50 outline-none transition-all"
                       />
                     </div>
                   </div>
                </div>

                <div className="space-y-6">
                   <h3 className="text-sm font-bold text-accent-400 uppercase tracking-widest">Call to Actions & Assets</h3>
                   <div className="space-y-4">
                     <div className="grid grid-cols-2 gap-4">
                       <div>
                         <label className="block text-xs font-bold text-slate-400 uppercase mb-2">Primary CTA</label>
                         <input
                           type="text"
                           value={formData.primaryCtaText}
                           onChange={(e) => setFormData({ ...formData, primaryCtaText: e.target.value })}
                           className="w-full px-4 py-3 bg-[#131926] border border-[#3f4d7f]/30 rounded-xl text-white text-sm focus:border-accent-500/50 outline-none transition-all"
                         />
                       </div>
                       <div>
                         <label className="block text-xs font-bold text-slate-400 uppercase mb-2">Secondary CTA</label>
                         <input
                           type="text"
                           value={formData.secondaryCtaText}
                           onChange={(e) => setFormData({ ...formData, secondaryCtaText: e.target.value })}
                           className="w-full px-4 py-3 bg-[#131926] border border-[#3f4d7f]/30 rounded-xl text-white text-sm focus:border-accent-500/50 outline-none transition-all"
                         />
                       </div>
                     </div>
                     <div>
                       <label className="block text-xs font-bold text-slate-400 uppercase mb-2">Background Image URL</label>
                       <input
                         type="url"
                         value={formData.backgroundImageUrl}
                         onChange={(e) => setFormData({ ...formData, backgroundImageUrl: e.target.value })}
                         className="w-full px-4 py-3 bg-[#131926] border border-[#3f4d7f]/30 rounded-xl text-white text-sm focus:border-accent-500/50 outline-none transition-all"
                       />
                     </div>
                   </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-bold text-accent-400 uppercase tracking-widest">Growth Statistics</h3>
                  <button
                    onClick={addStat}
                    className="flex items-center gap-2 px-4 py-2 bg-accent-500/10 text-accent-400 text-xs font-bold rounded-lg hover:bg-accent-500/20 transition-all"
                  >
                    <Plus className="w-4 h-4" /> Add Stat
                  </button>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {formData.stats.map((stat, index) => (
                    <div key={index} className="bg-[#131926] border border-[#3f4d7f]/30 rounded-2xl p-5 relative group">
                      <button 
                        onClick={() => removeStat(index)}
                        className="absolute top-4 right-4 text-slate-500 hover:text-red-500 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                      <div className="grid grid-cols-2 gap-4 mt-2">
                        <div>
                          <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">Value</label>
                          <input
                            type="text"
                            value={stat.number}
                            onChange={(e) => updateStat(index, 'number', e.target.value)}
                            className="w-full px-3 py-2 bg-[#1e253a] border border-[#3f4d7f]/30 rounded-lg text-white text-sm outline-none focus:border-accent-500/30"
                            placeholder="e.g., 500+"
                          />
                        </div>
                        <div>
                          <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">Label</label>
                          <input
                            type="text"
                            value={stat.label}
                            onChange={(e) => updateStat(index, 'label', e.target.value)}
                            className="w-full px-3 py-2 bg-[#1e253a] border border-[#3f4d7f]/30 rounded-lg text-white text-sm outline-none focus:border-accent-500/30"
                            placeholder="e.g., Clients"
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="p-6 border-t border-[#3f4d7f]/30 bg-[#262e49]/50 flex gap-4">
              <button
                onClick={() => setShowModal(false)}
                className="flex-1 px-6 py-3 bg-white/5 text-white font-bold rounded-xl hover:bg-white/10 transition-all"
              >
                Discard Changes
              </button>
              <button
                onClick={handleSubmit}
                className="flex-[2] px-6 py-3 bg-gradient-to-r from-accent-500 to-accent-600 text-white font-bold rounded-xl hover:shadow-lg hover:shadow-accent-500/20 transition-all flex items-center justify-center gap-2"
              >
                <Check className="w-5 h-5" /> Save Hero Section
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
