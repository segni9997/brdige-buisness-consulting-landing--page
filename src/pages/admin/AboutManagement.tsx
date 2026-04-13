import { useState, useEffect } from 'react';
import { Info, X, Check, Eye as EyeIcon, Image, Edit } from 'lucide-react';
import { useContent, type AboutContent } from '../../context/ContentContext';

export default function AboutManagement() {
  const { about, updateAbout } = useContent();
  const [showModal, setShowModal] = useState(false);
  const [previewMode, setPreviewMode] = useState(false);
  const [formData, setFormData] = useState<AboutContent>(about);

  useEffect(() => {
    setFormData(about);
  }, [about]);

  const openEditModal = () => {
    setFormData(about);
    setShowModal(true);
  };

  const handleSubmit = () => {
    updateAbout(formData);
    setShowModal(false);
  };

  return (
    <div className="space-y-4 sm:space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white">About Us Section</h1>
          <p className="text-slate-400 mt-1 text-sm sm:text-base">Manage your about us section content</p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setPreviewMode(!previewMode)}
            className="flex items-center gap-2 px-4 py-2.5 bg-[#262e49] border border-[#3f4d7f]/30 text-white font-medium rounded-xl hover:bg-[#3f4d7f]/20 transition-all text-sm"
          >
            <EyeIcon className="w-4 h-4" />
            {previewMode ? 'Edit' : 'Preview'}
          </button>
          <button
            onClick={openEditModal}
            className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-[#3f4d7f] to-[#3f4d7f]/80 text-white font-medium rounded-xl hover:opacity-90 transition-all text-sm"
          >
            <Edit className="w-4 h-4" />
            Edit
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
        <div className="bg-[#262e49]/50 border border-[#3f4d7f]/30 rounded-xl p-3 sm:p-4">
          <div className="flex items-center gap-3">
            <div className="w-8 sm:w-10 h-8 sm:h-10 rounded-lg bg-[#3f4d7f]/20 flex items-center justify-center">
              <Info className="w-4 sm:w-5 h-4 sm:h-5 text-[#3f4d7f]" />
            </div>
            <div>
              <p className="text-slate-400 text-xs sm:text-sm">Years</p>
              <p className="text-xl sm:text-2xl font-bold text-white">{about.yearsOfExcellence}</p>
            </div>
          </div>
        </div>
        <div className="bg-[#262e49]/50 border border-[#3f4d7f]/30 rounded-xl p-3 sm:p-4">
          <div className="flex items-center gap-3">
            <div className="w-8 sm:w-10 h-8 sm:h-10 rounded-lg bg-[#bb0505]/20 flex items-center justify-center">
              <Image className="w-4 sm:w-5 h-4 sm:h-5 text-[#ee6969]" />
            </div>
            <div>
              <p className="text-slate-400 text-xs sm:text-sm">Image</p>
              <p className="text-lg font-bold text-white truncate">Set</p>
            </div>
          </div>
        </div>
        <div className="bg-[#262e49]/50 border border-[#3f4d7f]/30 rounded-xl p-3 sm:p-4">
          <div className="flex items-center gap-3">
            <div className="w-8 sm:w-10 h-8 sm:h-10 rounded-lg bg-yellow-500/20 flex items-center justify-center">
              <Edit className="w-4 sm:w-5 h-4 sm:h-5 text-yellow-400" />
            </div>
            <div>
              <p className="text-slate-400 text-xs sm:text-sm">Sections</p>
              <p className="text-xl sm:text-2xl font-bold text-white">4</p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-[#262e49]/50 backdrop-blur-xl border border-[#3f4d7f]/30 rounded-2xl p-4 sm:p-6">
        <h2 className="text-lg sm:text-xl font-semibold text-white mb-4">Content Overview</h2>
        
        <div className="space-y-4">
          <div className="bg-[#191f2f]/30 rounded-xl p-4">
            <label className="block text-sm font-medium text-slate-400 mb-2">Subtitle</label>
            <p className="text-accent-400">{about.subtitle}</p>
          </div>

          <div className="bg-[#191f2f]/30 rounded-xl p-4">
            <label className="block text-sm font-medium text-slate-400 mb-2">Description</label>
            <p className="text-white">{about.description}</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-[#191f2f]/30 rounded-xl p-4">
              <label className="block text-sm font-medium text-slate-400 mb-2">Mission Title</label>
              <p className="text-white font-medium">{about.missionTitle}</p>
            </div>
            <div className="bg-[#191f2f]/30 rounded-xl p-4">
              <label className="block text-sm font-medium text-slate-400 mb-2">Vision Title</label>
              <p className="text-white font-medium">{about.visionTitle}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-[#191f2f]/30 rounded-xl p-4">
              <label className="block text-sm font-medium text-slate-400 mb-2">Mission Content</label>
              <p className="text-white/80 text-sm">{about.missionContent}</p>
            </div>
            <div className="bg-[#191f2f]/30 rounded-xl p-4">
              <label className="block text-sm font-medium text-slate-400 mb-2">Vision Content</label>
              <p className="text-white/80 text-sm">{about.visionContent}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-[#191f2f]/30 rounded-xl p-4">
              <label className="block text-sm font-medium text-slate-400 mb-2">Years of Excellence</label>
              <p className="text-accent-400 font-bold text-2xl">{about.yearsOfExcellence}</p>
            </div>
            <div className="bg-[#191f2f]/30 rounded-xl p-4">
              <label className="block text-sm font-medium text-slate-400 mb-2">Companies Count</label>
              <p className="text-white">{about.companiesCount}</p>
            </div>
          </div>

          <div className="bg-[#191f2f]/30 rounded-xl p-4">
            <label className="block text-sm font-medium text-slate-400 mb-2">CTA Title</label>
            <p className="text-white font-medium">{about.ctaTitle}</p>
          </div>

          <div className="bg-[#191f2f]/30 rounded-xl p-4">
            <label className="block text-sm font-medium text-slate-400 mb-2">CTA Content</label>
            <p className="text-white/80 text-sm">{about.ctaContent}</p>
          </div>
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-[#262e49] border border-[#3f4d7f]/30 rounded-2xl p-4 sm:p-6 w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4 sm:mb-6">
              <h2 className="text-xl sm:text-2xl font-bold text-white">Edit About Section</h2>
              <button onClick={() => setShowModal(false)} className="text-slate-400 hover:text-white p-1">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="space-y-3 sm:space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Subtitle</label>
                <input
                  type="text"
                  value={formData.subtitle}
                  onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
                  className="w-full px-3 sm:px-4 py-2.5 bg-[#191f2f]/50 border border-[#3f4d7f]/30 rounded-xl text-white text-sm"
                  placeholder="Subtitle"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Description</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-3 sm:px-4 py-2.5 bg-[#191f2f]/50 border border-[#3f4d7f]/30 rounded-xl text-white h-24 resize-none text-sm"
                  placeholder="Description"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Mission Title</label>
                <input
                  type="text"
                  value={formData.missionTitle}
                  onChange={(e) => setFormData({ ...formData, missionTitle: e.target.value })}
                  className="w-full px-3 sm:px-4 py-2.5 bg-[#191f2f]/50 border border-[#3f4d7f]/30 rounded-xl text-white text-sm"
                  placeholder="Mission Title"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Mission Content</label>
                <textarea
                  value={formData.missionContent}
                  onChange={(e) => setFormData({ ...formData, missionContent: e.target.value })}
                  className="w-full px-3 sm:px-4 py-2.5 bg-[#191f2f]/50 border border-[#3f4d7f]/30 rounded-xl text-white h-20 resize-none text-sm"
                  placeholder="Mission Content"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Vision Title</label>
                <input
                  type="text"
                  value={formData.visionTitle}
                  onChange={(e) => setFormData({ ...formData, visionTitle: e.target.value })}
                  className="w-full px-3 sm:px-4 py-2.5 bg-[#191f2f]/50 border border-[#3f4d7f]/30 rounded-xl text-white text-sm"
                  placeholder="Vision Title"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Vision Content</label>
                <textarea
                  value={formData.visionContent}
                  onChange={(e) => setFormData({ ...formData, visionContent: e.target.value })}
                  className="w-full px-3 sm:px-4 py-2.5 bg-[#191f2f]/50 border border-[#3f4d7f]/30 rounded-xl text-white h-20 resize-none text-sm"
                  placeholder="Vision Content"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Years of Excellence</label>
                <input
                  type="text"
                  value={formData.yearsOfExcellence}
                  onChange={(e) => setFormData({ ...formData, yearsOfExcellence: e.target.value })}
                  className="w-full px-3 sm:px-4 py-2.5 bg-[#191f2f]/50 border border-[#3f4d7f]/30 rounded-xl text-white text-sm"
                  placeholder="15+"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Companies Count Text</label>
                <input
                  type="text"
                  value={formData.companiesCount}
                  onChange={(e) => setFormData({ ...formData, companiesCount: e.target.value })}
                  className="w-full px-3 sm:px-4 py-2.5 bg-[#191f2f]/50 border border-[#3f4d7f]/30 rounded-xl text-white text-sm"
                  placeholder="Trusted by 500+ companies"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Image URL</label>
                <input
                  type="url"
                  value={formData.image}
                  onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                  className="w-full px-3 sm:px-4 py-2.5 bg-[#191f2f]/50 border border-[#3f4d7f]/30 rounded-xl text-white text-sm"
                  placeholder="https://..."
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">CTA Title</label>
                <input
                  type="text"
                  value={formData.ctaTitle}
                  onChange={(e) => setFormData({ ...formData, ctaTitle: e.target.value })}
                  className="w-full px-3 sm:px-4 py-2.5 bg-[#191f2f]/50 border border-[#3f4d7f]/30 rounded-xl text-white text-sm"
                  placeholder="CTA Title"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">CTA Content</label>
                <textarea
                  value={formData.ctaContent}
                  onChange={(e) => setFormData({ ...formData, ctaContent: e.target.value })}
                  className="w-full px-3 sm:px-4 py-2.5 bg-[#191f2f]/50 border border-[#3f4d7f]/30 rounded-xl text-white h-20 resize-none text-sm"
                  placeholder="CTA Content"
                />
              </div>
            </div>
            <div className="flex gap-3 mt-4 sm:mt-6">
              <button
                onClick={() => setShowModal(false)}
                className="flex-1 px-4 py-2.5 bg-[#191f2f] text-white font-medium rounded-xl text-sm"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                className="flex-1 px-4 py-2.5 bg-gradient-to-r from-[#3f4d7f] to-[#3f4d7f]/80 text-white font-medium rounded-xl text-sm flex items-center justify-center gap-2"
              >
                <Check className="w-4 h-4" /> Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
