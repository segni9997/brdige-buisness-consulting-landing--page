import { useState, useEffect } from 'react';
import { X, Check, Eye as EyeIcon, Edit, Award, Target, Compass, Rocket } from 'lucide-react';
import { useGetAboutQuery, useUpdateAboutMutation, useUploadImageMutation, type TAboutUs } from '../../store/api';
import Editor from 'react-simple-wysiwyg';
export default function AboutManagement() {
  const { data: aboutData } = useGetAboutQuery();
  const [updateAboutMutation] = useUpdateAboutMutation();
  const [uploadImageMutation] = useUploadImageMutation();
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState<TAboutUs | null>(null);
  const [isUploading, setIsUploading] = useState(false);



  useEffect(() => {
    if (aboutData) setFormData(JSON.parse(JSON.stringify(aboutData)));
  }, [aboutData]);

  if (!aboutData || !formData) return <div>Loading...</div>;

  const handleSubmit = async () => {
    try {
      await updateAboutMutation(formData).unwrap();
      setShowModal(false);
    } catch (err) {
      console.error('Failed to update about section:', err);
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    const file = e.target.files[0];
    const data = new FormData();
    data.append('file', file);
    data.append('folder', 'about');
    
    setIsUploading(true);
    try {
      const res = await uploadImageMutation(data).unwrap();
      setFormData(prev => prev ? { ...prev, imageUrl: res.url } : null);
    } catch (err) {
      console.error('Upload failed', err);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="space-y-6 sm:space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white tracking-tight">About Bridge</h1>
          <p className="text-slate-400 mt-1 text-sm sm:text-base">Manage your agency's story, mission, and vision.</p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-accent-500 to-accent-600 text-white font-bold rounded-xl hover:shadow-lg hover:shadow-accent-500/20 transition-all text-sm group"
        >
          <Edit className="w-5 h-5" />
          Edit About Content
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
         <div className="bg-[#262e49]/50 backdrop-blur-sm border border-[#3f4d7f]/30 rounded-2xl p-6 flex flex-col justify-between hover:border-accent-500/30 transition-all">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 rounded-xl bg-accent-500/10 flex items-center justify-center text-accent-400">
                <Award className="w-6 h-6" />
              </div>
              <div>
                <p className="text-slate-400 text-xs font-bold uppercase tracking-wider">Excellence</p>
                <h3 className="text-lg font-bold text-white">{aboutData.yearsOfExcellence} Years</h3>
              </div>
            </div>
         </div>

         <div className="bg-[#262e49]/50 backdrop-blur-sm border border-[#3f4d7f]/30 rounded-2xl p-6 flex flex-col justify-between hover:border-accent-500/30 transition-all">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 rounded-xl bg-primary-500/10 flex items-center justify-center text-primary-400">
                <Target className="w-6 h-6" />
              </div>
              <div>
                <p className="text-slate-400 text-xs font-bold uppercase tracking-wider">Mission</p>
                <h3 className="text-lg font-bold text-white line-clamp-1">{aboutData.missionTitle}</h3>
              </div>
            </div>
         </div>

         <div className="bg-[#262e49]/50 backdrop-blur-sm border border-[#3f4d7f]/30 rounded-2xl p-6 flex flex-col justify-between hover:border-accent-500/30 transition-all">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 rounded-xl bg-green-500/10 flex items-center justify-center text-green-400">
                <Compass className="w-6 h-6" />
              </div>
              <div>
                <p className="text-slate-400 text-xs font-bold uppercase tracking-wider">Vision</p>
                <h3 className="text-lg font-bold text-white line-clamp-1">{aboutData.visionTitle}</h3>
              </div>
            </div>
         </div>

         <div className="bg-[#262e49]/50 backdrop-blur-sm border border-[#3f4d7f]/30 rounded-2xl p-6 flex flex-col justify-between hover:border-accent-500/30 transition-all">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 rounded-xl bg-purple-500/10 flex items-center justify-center text-purple-400">
                <Rocket className="w-6 h-6" />
              </div>
              <div>
                <p className="text-slate-400 text-xs font-bold uppercase tracking-wider">Strategy</p>
                <h3 className="text-lg font-bold text-white line-clamp-1">{aboutData.ctaTitle}</h3>
              </div>
            </div>
         </div>
      </div>

      <div className="bg-[#262e49]/30 backdrop-blur-xl border border-[#3f4d7f]/20 rounded-3xl p-8 relative overflow-hidden">
        <h2 className="text-xl font-bold text-white mb-8 flex items-center gap-2">
          <EyeIcon className="w-5 h-5 text-accent-400" /> Public Profile Overview
        </h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="space-y-8">
            <div>
              <span className="text-accent-400 font-bold uppercase tracking-widest text-xs">{aboutData.subtitle}</span>
              <h3 className="text-3xl font-bold text-white mt-2 leading-tight">{aboutData.ctaTitle}</h3>
              <div className="text-slate-300 mt-4 leading-relaxed [&>ul]:list-disc [&>ul]:pl-5 [&>ol]:list-decimal [&>ol]:pl-5 space-y-2" dangerouslySetInnerHTML={{ __html: aboutData.description || '' }} />
            </div>
            
            <div className="grid grid-cols-2 gap-8">
               <div className="bg-white/5 p-6 rounded-2xl border border-white/10">
                 <h4 className="text-white font-bold mb-2 flex items-center gap-2"><Target className="w-4 h-4 text-accent-400" /> {aboutData.missionTitle}</h4>
                 <div className="text-slate-400 text-sm leading-relaxed [&>ul]:list-disc [&>ul]:pl-5 [&>ol]:list-decimal [&>ol]:pl-5 space-y-2" dangerouslySetInnerHTML={{ __html: aboutData.missionContent || '' }} />
               </div>
               <div className="bg-white/5 p-6 rounded-2xl border border-white/10">
                 <h4 className="text-white font-bold mb-2 flex items-center gap-2"><Compass className="w-4 h-4 text-primary-400" /> {aboutData.visionTitle}</h4>
                 <div className="text-slate-400 text-sm leading-relaxed [&>ul]:list-disc [&>ul]:pl-5 [&>ol]:list-decimal [&>ol]:pl-5 space-y-2" dangerouslySetInnerHTML={{ __html: aboutData.visionContent || '' }} />
               </div>
            </div>
          </div>
          
          <div className="space-y-6">
            <div className="bg-[#131926] rounded-3xl overflow-hidden border border-[#3f4d7f]/30 aspect-video relative group">
               <img src={aboutData.imageUrl} alt="About Us" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
               <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
               <div className="absolute bottom-6 left-6 right-6">
                 <p className="text-white font-bold text-lg">{aboutData.companiesCountText}</p>
               </div>
            </div>
            
            <div className="bg-gradient-to-br from-accent-500 to-accent-700 rounded-3xl p-8 text-white shadow-xl shadow-accent-500/20">
               <h4 className="text-xl font-bold mb-2">{aboutData.ctaTitle}</h4>
               <div className="text-white/80 leading-relaxed mb-6 [&>ul]:list-disc [&>ul]:pl-5 [&>ol]:list-decimal [&>ol]:pl-5 space-y-2" dangerouslySetInnerHTML={{ __html: aboutData.ctaContent || '' }} />
               <button className="px-6 py-2 bg-white text-accent-600 font-bold rounded-xl text-sm">Join the Journey</button>
            </div>
          </div>
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center z-50 p-4 overflow-y-auto">
          <div className="bg-[#1e253a] border border-[#3f4d7f]/50 rounded-3xl w-full max-w-5xl my-8 shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
            <div className="p-6 border-b border-[#3f4d7f]/30 flex items-center justify-between bg-[#262e49]/50">
              <div>
                <h2 className="text-2xl font-bold text-white">Refine Agency Story</h2>
                <p className="text-slate-400 text-sm mt-1">Manage titles, mission, vision, and core narratives.</p>
              </div>
              <button onClick={() => setShowModal(false)} className="p-2 text-slate-400 hover:text-white hover:bg-white/10 rounded-full transition-all">
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <div className="p-6 overflow-y-auto flex-1 space-y-10">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                 <div className="space-y-6">
                    <h3 className="text-sm font-bold text-accent-400 uppercase tracking-widest">General Identity</h3>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-xs font-bold text-slate-400 uppercase mb-2">Section Subtitle</label>
                        <input
                          type="text"
                          value={formData.subtitle}
                          onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
                          className="w-full px-4 py-3 bg-[#131926] border border-[#3f4d7f]/30 rounded-xl text-white text-sm focus:border-accent-500/50 outline-none transition-all"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-slate-400 uppercase mb-2">Long Description</label>
                        <textarea
                          value={formData.description}
                          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                          className="w-full px-4 py-3 bg-[#131926] border border-[#3f4d7f]/30 rounded-xl text-white text-sm h-40 resize-none focus:border-accent-500/50 outline-none transition-all"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-bold text-slate-400 uppercase mb-2">Years of Excellence</label>
                          <input
                            type="number"
                            value={formData.yearsOfExcellence}
                            onChange={(e) => setFormData({ ...formData, yearsOfExcellence: parseInt(e.target.value) || 0 })}
                            className="w-full px-4 py-3 bg-[#131926] border border-[#3f4d7f]/30 rounded-xl text-white text-sm focus:border-accent-500/50 outline-none transition-all"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-bold text-slate-400 uppercase mb-2">Companies Trust Text</label>
                          <input
                            type="text"
                            value={formData.companiesCountText}
                            onChange={(e) => setFormData({ ...formData, companiesCountText: e.target.value })}
                            className="w-full px-4 py-3 bg-[#131926] border border-[#3f4d7f]/30 rounded-xl text-white text-sm focus:border-accent-500/50 outline-none transition-all"
                          />
                        </div>
                      </div>
                    </div>
                 </div>

                 <div className="space-y-6">
                    <h3 className="text-sm font-bold text-primary-400 uppercase tracking-widest">Visuals & Call to Action</h3>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-xs font-bold text-slate-400 uppercase mb-2">Section Hero Image</label>
                        <div className="flex gap-2">
                          <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageUpload}
                            className="w-full px-4 py-3 bg-[#131926] border border-[#3f4d7f]/30 rounded-xl text-white text-sm focus:border-accent-500/50 outline-none transition-all file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-accent-500/20 file:text-accent-400 hover:file:bg-accent-500/30"
                          />
                          {isUploading && <span className="text-sm text-accent-400 flex items-center">Uploading...</span>}
                        </div>
                        {formData.imageUrl && (
                          <div className="mt-2">
                            <img src={formData.imageUrl} alt="Preview" className="h-20 object-cover rounded-lg border border-[#3f4d7f]/30" />
                          </div>
                        )}
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-slate-400 uppercase mb-2">CTA Headline</label>
                        <input
                          type="text"
                          value={formData.ctaTitle}
                          onChange={(e) => setFormData({ ...formData, ctaTitle: e.target.value })}
                          className="w-full px-4 py-3 bg-[#131926] border border-[#3f4d7f]/30 rounded-xl text-white text-sm focus:border-accent-500/50 outline-none transition-all"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-slate-400 uppercase mb-2">CTA Body Content</label>
                        <textarea
                          value={formData.ctaContent}
                          onChange={(e) => setFormData({ ...formData, ctaContent: e.target.value })}
                          className="w-full px-4 py-3 bg-[#131926] border border-[#3f4d7f]/30 rounded-xl text-white text-sm h-32 resize-none focus:border-accent-500/50 outline-none transition-all"
                        />
                      </div>
                    </div>
                 </div>
              </div>

              <div className="space-y-6">
                 <h3 className="text-sm font-bold text-green-400 uppercase tracking-widest text-center">Mission & Vision</h3>
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="bg-[#131926] p-6 rounded-3xl border border-[#3f4d7f]/30 space-y-4">
                       <div>
                         <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Mission Title</label>
                         <input
                           type="text"
                           value={formData.missionTitle}
                           onChange={(e) => setFormData({ ...formData, missionTitle: e.target.value })}
                           className="w-full px-4 py-3 bg-[#1e253a] border border-[#3f4d7f]/30 rounded-xl text-white text-sm focus:border-accent-500/50 outline-none transition-all"
                         />
                       </div>
                       <div>
                         <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Mission Statement</label>
                         <div className="border border-[#3f4d7f]/30 rounded-xl overflow-hidden bg-white text-slate-800 mb-10">
                           <Editor
                             value={formData.missionContent}
                             onChange={(e) => setFormData({ ...formData, missionContent: e.target.value })}
                           />
                         </div>
                       </div>
                    </div>

                    <div className="bg-[#131926] p-6 rounded-3xl border border-[#3f4d7f]/30 space-y-4">
                       <div>
                         <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Vision Title</label>
                         <input
                           type="text"
                           value={formData.visionTitle}
                           onChange={(e) => setFormData({ ...formData, visionTitle: e.target.value })}
                           className="w-full px-4 py-3 bg-[#1e253a] border border-[#3f4d7f]/30 rounded-xl text-white text-sm focus:border-accent-500/50 outline-none transition-all"
                         />
                       </div>
                       <div>
                         <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Vision Statement</label>
                         <div className="border border-[#3f4d7f]/30 rounded-xl overflow-hidden bg-white text-slate-800 mb-10">
                           <Editor
                             value={formData.visionContent}
                             onChange={(e) => setFormData({ ...formData, visionContent: e.target.value })}
                           />
                         </div>
                       </div>
                    </div>

                    <div className="bg-[#131926] p-6 rounded-3xl border border-[#3f4d7f]/30 space-y-4 md:col-span-2">
                       <div>
                         <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Values Title</label>
                         <input
                           type="text"
                           value={formData.valuesTitle || ''}
                           onChange={(e) => setFormData({ ...formData, valuesTitle: e.target.value })}
                           className="w-full px-4 py-3 bg-[#1e253a] border border-[#3f4d7f]/30 rounded-xl text-white text-sm focus:border-accent-500/50 outline-none transition-all"
                         />
                       </div>
                       <div>
                         <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Values Statement</label>
                         <div className="border border-[#3f4d7f]/30 rounded-xl overflow-hidden bg-white text-slate-800 mb-10">
                           <Editor
                             value={formData.valuesContent || ''}
                             onChange={(e) => setFormData({ ...formData, valuesContent: e.target.value })}
                           />
                         </div>
                       </div>
                    </div>
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
                <Check className="w-5 h-5" /> Save About Section
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
