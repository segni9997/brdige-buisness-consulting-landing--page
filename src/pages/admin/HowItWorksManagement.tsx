import { useState, useEffect } from 'react';
import { Layers, Plus, Trash2, Edit, X, Check, Image as ImageIcon } from 'lucide-react';
import { useContent, type HowItWorksContent, type HowItWorksStep } from '../../context/ContentContext';

const iconOptions = [
  { value: 'Search', label: 'Search' },
  { value: 'Lightbulb', label: 'Lightbulb' },
  { value: 'Rocket', label: 'Rocket' },
  { value: 'BarChart', label: 'Bar Chart' },
  { value: 'Target', label: 'Target' },
  { value: 'Users', label: 'Users' },
  { value: 'Zap', label: 'Zap' },
  { value: 'TrendingUp', label: 'Trending Up' },
  { value: 'Shield', label: 'Shield' },
  { value: 'Globe', label: 'Globe' },
];

export default function HowItWorksManagement() {
  const { howItWorks, updateHowItWorks } = useContent();
  const [showModal, setShowModal] = useState(false);
  const [showStepModal, setShowStepModal] = useState(false);
  const [modalMode, setModalMode] = useState<'edit' | 'add'>('edit');
  const [editingStep, setEditingStep] = useState<HowItWorksStep | null>(null);

  const [formData, setFormData] = useState<HowItWorksContent>(howItWorks);

  useEffect(() => {
    setFormData(howItWorks);
  }, [howItWorks]);

  const openEditModal = () => {
    setFormData(howItWorks);
    setModalMode('edit');
    setShowModal(true);
  };

  const openAddStepModal = () => {
    setEditingStep({
      id: Date.now(),
      number: String(formData.steps.length + 1).padStart(2, '0'),
      icon: 'Search',
      title: '',
      description: '',
      deliverables: []
    });
    setModalMode('add');
    setShowStepModal(true);
  };

  const openEditStepModal = (step: HowItWorksStep) => {
    setEditingStep({ ...step });
    setModalMode('edit');
    setShowStepModal(true);
  };

  const handleSubmit = () => {
    updateHowItWorks(formData);
    setShowModal(false);
  };

  const handleStepSubmit = () => {
    if (!editingStep) return;
    
    if (modalMode === 'add') {
      setFormData({
        ...formData,
        steps: [...formData.steps, editingStep]
      });
    } else {
      setFormData({
        ...formData,
        steps: formData.steps.map(s => s.id === editingStep.id ? editingStep : s)
      });
    }
    setShowStepModal(false);
  };

  const handleDeleteStep = (id: number) => {
    setFormData({
      ...formData,
      steps: formData.steps.filter(s => s.id !== id).map((s, i) => ({ ...s, number: String(i + 1).padStart(2, '0') }))
    });
  };

  return (
    <div className="space-y-4 sm:space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white">How It Works Section</h1>
          <p className="text-slate-400 mt-1 text-sm sm:text-base">Manage your how it works section content</p>
        </div>
        <button
          onClick={openEditModal}
          className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-[#3f4d7f] to-[#3f4d7f]/80 text-white font-medium rounded-xl hover:opacity-90 transition-all text-sm"
        >
          <Edit className="w-4 h-4" />
          Edit Steps
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
        <div className="bg-[#262e49]/50 border border-[#3f4d7f]/30 rounded-xl p-3 sm:p-4">
          <div className="flex items-center gap-3">
            <div className="w-8 sm:w-10 h-8 sm:h-10 rounded-lg bg-[#3f4d7f]/20 flex items-center justify-center">
              <Layers className="w-4 sm:w-5 h-4 sm:h-5 text-[#3f4d7f]" />
            </div>
            <div>
              <p className="text-slate-400 text-xs sm:text-sm">Total Steps</p>
              <p className="text-xl sm:text-2xl font-bold text-white">{howItWorks.steps.length}</p>
            </div>
          </div>
        </div>
        <div className="bg-[#262e49]/50 border border-[#3f4d7f]/30 rounded-xl p-3 sm:p-4">
          <div className="flex items-center gap-3">
            <div className="w-8 sm:w-10 h-8 sm:h-10 rounded-lg bg-[#bb0505]/20 flex items-center justify-center">
              <ImageIcon className="w-4 sm:w-5 h-4 sm:h-5 text-[#ee6969]" />
            </div>
            <div>
              <p className="text-slate-400 text-xs sm:text-sm">Title</p>
              <p className="text-lg font-bold text-white truncate">{howItWorks.title}</p>
            </div>
          </div>
        </div>
        <div className="bg-[#262e49]/50 border border-[#3f4d7f]/30 rounded-xl p-3 sm:p-4">
          <div className="flex items-center gap-3">
            <div className="w-8 sm:w-10 h-8 sm:h-10 rounded-lg bg-yellow-500/20 flex items-center justify-center">
              <Edit className="w-4 sm:w-5 h-4 sm:h-5 text-yellow-400" />
            </div>
            <div>
              <p className="text-slate-400 text-xs sm:text-sm">Status</p>
              <p className="text-lg font-bold text-white">Editable</p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-[#262e49]/50 backdrop-blur-xl border border-[#3f4d7f]/30 rounded-2xl p-4 sm:p-6">
        <h2 className="text-lg sm:text-xl font-semibold text-white mb-4">Steps Preview</h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {howItWorks.steps.map((step) => (
            <div key={step.id} className="bg-[#191f2f]/50 rounded-xl p-4 border border-[#3f4d7f]/20">
              <div className="flex items-start justify-between mb-3">
                <div className="w-8 h-8 rounded-full bg-[#3f4d7f]/40 flex items-center justify-center text-white font-bold text-sm">
                  {step.number}
                </div>
                <button
                  onClick={() => {
                    setFormData({ ...howItWorks });
                    openEditStepModal(step);
                  }}
                  className="p-1.5 text-slate-400 hover:text-white hover:bg-[#3f4d7f]/10 rounded-lg transition-all"
                >
                  <Edit className="w-3 h-3 sm:w-4 sm:h-4" />
                </button>
              </div>
              <h3 className="text-white font-semibold mb-2">{step.title}</h3>
              <p className="text-slate-400 text-sm mb-3 line-clamp-2">{step.description}</p>
              <div className="space-y-1">
                <p className="text-xs font-medium text-slate-500">Deliverables:</p>
                {step.deliverables.slice(0, 2).map((del, i) => (
                  <p key={i} className="text-xs text-slate-400 flex items-center gap-1">
                    <span className="w-1 h-1 rounded-full bg-accent-500"></span>
                    {del}
                  </p>
                ))}
                {step.deliverables.length > 2 && (
                  <p className="text-xs text-slate-500">+{step.deliverables.length - 2} more</p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-[#262e49] border border-[#3f4d7f]/30 rounded-2xl p-4 sm:p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4 sm:mb-6">
              <h2 className="text-xl sm:text-2xl font-bold text-white">Edit How It Works Section</h2>
              <button onClick={() => setShowModal(false)} className="text-slate-400 hover:text-white p-1">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="space-y-3 sm:space-y-4 mb-6">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Section Subtitle</label>
                <input
                  type="text"
                  value={formData.subtitle}
                  onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
                  className="w-full px-3 sm:px-4 py-2.5 bg-[#191f2f]/50 border border-[#3f4d7f]/30 rounded-xl text-white text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Section Title</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-3 sm:px-4 py-2.5 bg-[#191f2f]/50 border border-[#3f4d7f]/30 rounded-xl text-white text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Description</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-3 sm:px-4 py-2.5 bg-[#191f2f]/50 border border-[#3f4d7f]/30 rounded-xl text-white h-20 resize-none text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">CTA Button Text</label>
                <input
                  type="text"
                  value={formData.ctaText}
                  onChange={(e) => setFormData({ ...formData, ctaText: e.target.value })}
                  className="w-full px-3 sm:px-4 py-2.5 bg-[#191f2f]/50 border border-[#3f4d7f]/30 rounded-xl text-white text-sm"
                />
              </div>
            </div>

            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-white">Steps</h3>
              <button
                onClick={() => {
                  openAddStepModal();
                }}
                className="flex items-center gap-1 px-3 py-1.5 bg-[#3f4d7f]/20 text-white text-sm rounded-lg hover:bg-[#3f4d7f]/40 transition-all"
              >
                <Plus className="w-4 h-4" /> Add Step
              </button>
            </div>

            <div className="space-y-3 max-h-60 overflow-y-auto">
              {formData.steps.map((step) => (
                <div key={step.id} className="bg-[#191f2f]/30 rounded-lg p-3 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-[#3f4d7f]/40 flex items-center justify-center text-white font-bold text-sm">
                      {step.number}
                    </div>
                    <div>
                      <p className="text-white font-medium">{step.title}</p>
                      <p className="text-slate-400 text-xs">{step.deliverables.length} deliverables</p>
                    </div>
                  </div>
                  <div className="flex gap-1">
                    <button
                      onClick={() => openEditStepModal(step)}
                      className="p-1.5 text-slate-400 hover:text-white hover:bg-[#3f4d7f]/10 rounded-lg"
                    >
                      <Edit className="w-3 h-3" />
                    </button>
                    <button
                      onClick={() => handleDeleteStep(step.id)}
                      className="p-1.5 text-[#ee6969] hover:text-[#ff9494] hover:bg-[#bb0505]/10 rounded-lg"
                    >
                      <Trash2 className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex gap-3 mt-6">
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
                <Check className="w-4 h-4" /> Save All
              </button>
            </div>
          </div>
        </div>
      )}

      {showStepModal && editingStep && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-[#262e49] border border-[#3f4d7f]/30 rounded-2xl p-4 sm:p-6 w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4 sm:mb-6">
              <h2 className="text-xl sm:text-2xl font-bold text-white">
                {modalMode === 'add' ? 'Add Step' : 'Edit Step'}
              </h2>
              <button onClick={() => setShowStepModal(false)} className="text-slate-400 hover:text-white p-1">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="space-y-3 sm:space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Step Number</label>
                <input
                  type="text"
                  value={editingStep.number}
                  onChange={(e) => setEditingStep({ ...editingStep, number: e.target.value })}
                  className="w-full px-3 sm:px-4 py-2.5 bg-[#191f2f]/50 border border-[#3f4d7f]/30 rounded-xl text-white text-sm"
                  placeholder="01"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Title</label>
                <input
                  type="text"
                  value={editingStep.title}
                  onChange={(e) => setEditingStep({ ...editingStep, title: e.target.value })}
                  className="w-full px-3 sm:px-4 py-2.5 bg-[#191f2f]/50 border border-[#3f4d7f]/30 rounded-xl text-white text-sm"
                  placeholder="Step Title"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Description</label>
                <textarea
                  value={editingStep.description}
                  onChange={(e) => setEditingStep({ ...editingStep, description: e.target.value })}
                  className="w-full px-3 sm:px-4 py-2.5 bg-[#191f2f]/50 border border-[#3f4d7f]/30 rounded-xl text-white h-20 resize-none text-sm"
                  placeholder="Step Description"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Icon</label>
                <select
                  value={editingStep.icon}
                  onChange={(e) => setEditingStep({ ...editingStep, icon: e.target.value })}
                  className="w-full px-3 sm:px-4 py-2.5 bg-[#191f2f]/50 border border-[#3f4d7f]/30 rounded-xl text-white text-sm"
                >
                  {iconOptions.map(opt => (
                    <option key={opt.value} value={opt.value}>{opt.label}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Deliverables (comma separated)</label>
                <input
                  type="text"
                  value={editingStep.deliverables.join(', ')}
                  onChange={(e) => setEditingStep({ ...editingStep, deliverables: e.target.value.split(',').map(d => d.trim()).filter(Boolean) })}
                  className="w-full px-3 sm:px-4 py-2.5 bg-[#191f2f]/50 border border-[#3f4d7f]/30 rounded-xl text-white text-sm"
                  placeholder="Deliverable 1, Deliverable 2"
                />
              </div>
            </div>
            <div className="flex gap-3 mt-4 sm:mt-6">
              <button
                onClick={() => setShowStepModal(false)}
                className="flex-1 px-4 py-2.5 bg-[#191f2f] text-white font-medium rounded-xl text-sm"
              >
                Cancel
              </button>
              <button
                onClick={handleStepSubmit}
                className="flex-1 px-4 py-2.5 bg-gradient-to-r from-[#3f4d7f] to-[#3f4d7f]/80 text-white font-medium rounded-xl text-sm flex items-center justify-center gap-2"
              >
                <Check className="w-4 h-4" /> {modalMode === 'add' ? 'Add' : 'Save'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
