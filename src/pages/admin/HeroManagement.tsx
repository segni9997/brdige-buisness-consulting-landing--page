import { useState, useEffect } from 'react';
import { Home, Edit, X, Check, Eye as EyeIcon, Image } from 'lucide-react';
import { useContent, type HeroContent } from '../../context/ContentContext';

export default function HeroManagement() {
  const { hero, updateHero } = useContent();
  const [showModal, setShowModal] = useState(false);
  const [previewMode, setPreviewMode] = useState(false);
  const [formData, setFormData] = useState<HeroContent>(hero);

  useEffect(() => {
    setFormData(hero);
  }, [hero]);

  const openEditModal = () => {
    setFormData(hero);
    setShowModal(true);
  };

  const handleSubmit = () => {
    updateHero(formData);
    setShowModal(false);
  };

  return (
    <div className="space-y-4 sm:space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white">Hero Section</h1>
          <p className="text-slate-400 mt-1 text-sm sm:text-base">Manage your hero section content</p>
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
              <Home className="w-4 sm:w-5 h-4 sm:h-5 text-[#3f4d7f]" />
            </div>
            <div>
              <p className="text-slate-400 text-xs sm:text-sm">Title</p>
              <p className="text-lg sm:text-xl font-bold text-white truncate">{hero.title}</p>
            </div>
          </div>
        </div>
        <div className="bg-[#262e49]/50 border border-[#3f4d7f]/30 rounded-xl p-3 sm:p-4">
          <div className="flex items-center gap-3">
            <div className="w-8 sm:w-10 h-8 sm:h-10 rounded-lg bg-[#bb0505]/20 flex items-center justify-center">
              <Image className="w-4 sm:w-5 h-4 sm:h-5 text-[#ee6969]" />
            </div>
            <div>
              <p className="text-slate-400 text-xs sm:text-sm">Background</p>
              <p className="text-lg sm:text-xl font-bold text-white truncate">Image Set</p>
            </div>
          </div>
        </div>
        <div className="bg-[#262e49]/50 border border-[#3f4d7f]/30 rounded-xl p-3 sm:p-4">
          <div className="flex items-center gap-3">
            <div className="w-8 sm:w-10 h-8 sm:h-10 rounded-lg bg-yellow-500/20 flex items-center justify-center">
              <Edit className="w-4 sm:w-5 h-4 sm:h-5 text-yellow-400" />
            </div>
            <div>
              <p className="text-slate-400 text-xs sm:text-sm">Stats</p>
              <p className="text-lg sm:text-xl font-bold text-white">{hero.stats.length} items</p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-[#262e49]/50 backdrop-blur-xl border border-[#3f4d7f]/30 rounded-2xl p-4 sm:p-6">
        <h2 className="text-lg sm:text-xl font-semibold text-white mb-4">Content Overview</h2>
        
        <div className="space-y-4">
          <div className="bg-[#191f2f]/30 rounded-xl p-4">
            <label className="block text-sm font-medium text-slate-400 mb-2">Title</label>
            <p className="text-white text-lg">{hero.title}</p>
          </div>

          <div className="bg-[#191f2f]/30 rounded-xl p-4">
            <label className="block text-sm font-medium text-slate-400 mb-2">Subtitle</label>
            <p className="text-white">{hero.subtitle}</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-[#191f2f]/30 rounded-xl p-4">
              <label className="block text-sm font-medium text-slate-400 mb-2">Primary CTA</label>
              <p className="text-accent-400 font-medium">{hero.ctaPrimary}</p>
            </div>
            <div className="bg-[#191f2f]/30 rounded-xl p-4">
              <label className="block text-sm font-medium text-slate-400 mb-2">Secondary CTA</label>
              <p className="text-white/80 font-medium">{hero.ctaSecondary}</p>
            </div>
          </div>

          <div className="bg-[#191f2f]/30 rounded-xl p-4">
            <label className="block text-sm font-medium text-slate-400 mb-2">Stats</label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-2">
              {hero.stats.map((stat, index) => (
                <div key={index} className="bg-[#262e49]/50 rounded-lg p-3">
                  <p className="text-2xl font-bold text-accent-400">{stat.number}</p>
                  <p className="text-slate-400 text-sm">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-[#191f2f]/30 rounded-xl p-4">
            <label className="block text-sm font-medium text-slate-400 mb-2">Background Image URL</label>
            <p className="text-white/60 text-sm truncate">{hero.backgroundImage}</p>
          </div>
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-[#262e49] border border-[#3f4d7f]/30 rounded-2xl p-4 sm:p-6 w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4 sm:mb-6">
              <h2 className="text-xl sm:text-2xl font-bold text-white">Edit Hero Section</h2>
              <button onClick={() => setShowModal(false)} className="text-slate-400 hover:text-white p-1">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="space-y-3 sm:space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Title</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-3 sm:px-4 py-2.5 bg-[#191f2f]/50 border border-[#3f4d7f]/30 rounded-xl text-white text-sm"
                  placeholder="Title"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Subtitle</label>
                <textarea
                  value={formData.subtitle}
                  onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
                  className="w-full px-3 sm:px-4 py-2.5 bg-[#191f2f]/50 border border-[#3f4d7f]/30 rounded-xl text-white h-20 resize-none text-sm"
                  placeholder="Subtitle"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Primary CTA Button</label>
                <input
                  type="text"
                  value={formData.ctaPrimary}
                  onChange={(e) => setFormData({ ...formData, ctaPrimary: e.target.value })}
                  className="w-full px-3 sm:px-4 py-2.5 bg-[#191f2f]/50 border border-[#3f4d7f]/30 rounded-xl text-white text-sm"
                  placeholder="Primary CTA"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Secondary CTA Button</label>
                <input
                  type="text"
                  value={formData.ctaSecondary}
                  onChange={(e) => setFormData({ ...formData, ctaSecondary: e.target.value })}
                  className="w-full px-3 sm:px-4 py-2.5 bg-[#191f2f]/50 border border-[#3f4d7f]/30 rounded-xl text-white text-sm"
                  placeholder="Secondary CTA"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Background Image URL</label>
                <input
                  type="url"
                  value={formData.backgroundImage}
                  onChange={(e) => setFormData({ ...formData, backgroundImage: e.target.value })}
                  className="w-full px-3 sm:px-4 py-2.5 bg-[#191f2f]/50 border border-[#3f4d7f]/30 rounded-xl text-white text-sm"
                  placeholder="https://..."
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Stats (JSON format)</label>
                <textarea
                  value={JSON.stringify(formData.stats, null, 2)}
                  onChange={(e) => {
                    try {
                      const parsed = JSON.parse(e.target.value);
                      setFormData({ ...formData, stats: parsed });
                    } catch {}
                  }}
                  className="w-full px-3 sm:px-4 py-2.5 bg-[#191f2f]/50 border border-[#3f4d7f]/30 rounded-xl text-white h-24 resize-none text-sm font-mono"
                  placeholder='[{"number": "500+", "label": "Projects"}]'
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
