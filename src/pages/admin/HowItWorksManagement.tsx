import React, { useState, useEffect } from 'react';
import { Plus, Trash2, Edit, X, Check, Search, Lightbulb, Rocket, BarChart, Target, Users, Zap, TrendingUp, Shield, Globe, Settings } from 'lucide-react';
import { useGetHowItWorksQuery, useUpdateHowItWorksMutation, type THowItWorks, type TStep, useCreateHowItWorksStepMutation, useUpdateHowItWorksStepMutation } from '../../store/api';

const iconMap = {
  Search, Lightbulb, Rocket, BarChart, Target, Users, Zap, TrendingUp, Shield, Globe
};

const iconOptions = Object.keys(iconMap);

export default function HowItWorksManagement() {
  const { data: howItWorksData } = useGetHowItWorksQuery();
  const [updateSection] = useUpdateHowItWorksMutation();
  const [createStep] = useCreateHowItWorksStepMutation();
  const [updateStep] = useUpdateHowItWorksStepMutation();
  
  const [showModal, setShowModal] = useState(false);
  const [showStepModal, setShowStepModal] = useState(false);
  const [modalMode, setModalMode] = useState<'edit' | 'add'>('edit');
  const [editingStep, setEditingStep] = useState<TStep | null>(null);
  const [formData, setFormData] = useState<THowItWorks | null>(null);

  useEffect(() => {
    if (howItWorksData) setFormData(JSON.parse(JSON.stringify(howItWorksData)));
  }, [howItWorksData]);

  if (!howItWorksData || !formData) return <div>Loading...</div>;

  const handleSectionSubmit = async () => {
    try {
      await updateSection(formData).unwrap();
      setShowModal(false);
    } catch (err) {
      console.error('Failed to update section:', err);
    }
  };

  const handleStepSubmit = async () => {
    if (!editingStep) return;
    try {
      if (modalMode === 'add') {
        await createStep({ ...editingStep, section: formData.id }).unwrap();
      } else {
        await updateStep({ ...editingStep, section: formData.id } as TStep & { section: number }).unwrap();
      }
      setShowStepModal(false);
    } catch (err) {
      console.error('Failed to save step:', err);
    }
  };

  const openAddStepModal = () => {
    setEditingStep({
      id: 0,
      stepNumber: formData.steps.length + 1,
      icon: 'Search',
      title: '',
      description: '',
      deliverables: ['Project Charter']
    });
    setModalMode('add');
    setShowStepModal(true);
  };

  const openEditStepModal = (step: TStep) => {
    setEditingStep(JSON.parse(JSON.stringify(step)));
    setModalMode('edit');
    setShowStepModal(true);
  };

  const addDeliverable = () => {
    if (!editingStep) return;
    setEditingStep({
      ...editingStep,
      deliverables: [...editingStep.deliverables, '']
    });
  };

  const removeDeliverable = (index: number) => {
    if (!editingStep) return;
    const newDels = [...editingStep.deliverables];
    newDels.splice(index, 1);
    setEditingStep({ ...editingStep, deliverables: newDels });
  };

  const updateDeliverable = (index: number, value: string) => {
    if (!editingStep) return;
    const newDels = [...editingStep.deliverables];
    newDels[index] = value;
    setEditingStep({ ...editingStep, deliverables: newDels });
  };

  return (
    <div className="space-y-6 sm:space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white tracking-tight">How It Works</h1>
          <p className="text-slate-400 mt-1 text-sm sm:text-base">Outline the roadmap to success for your clients.</p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={() => setShowModal(true)}
            className="flex items-center justify-center gap-2 px-6 py-3 bg-white/5 text-white font-bold rounded-xl border border-white/10 hover:bg-white/10 transition-all text-sm"
          >
            <Settings className="w-5 h-5" />
            Section Header
          </button>
          <button
            onClick={openAddStepModal}
            className="flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-accent-500 to-accent-600 text-white font-bold rounded-xl hover:shadow-lg hover:shadow-accent-500/20 transition-all text-sm group"
          >
            <Plus className="w-5 h-5 group-hover:rotate-90 transition-transform" />
            Add New Step
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {formData.steps.map((step) => (
          <div key={step.id} className="group bg-[#262e49]/50 backdrop-blur-sm border border-[#3f4d7f]/30 rounded-2xl p-6 hover:border-accent-500/50 transition-all duration-300 flex flex-col relative overflow-hidden">
             <div className="absolute top-4 right-4 flex gap-2">
                <button onClick={() => openEditStepModal(step)} className="p-2 bg-white/10 border border-white/10 rounded-lg text-white hover:bg-accent-500 transition-colors shadow-sm">
                  <Edit className="w-4 h-4" />
                </button>
             </div>
             
             <div className="w-12 h-12 rounded-full bg-accent-500/20 flex items-center justify-center text-accent-400 font-bold text-lg mb-4 border border-accent-500/20">
                {String(step.stepNumber).padStart(2, '0')}
             </div>
             
             <div className="mb-4 text-white">
                {iconMap[step.icon as keyof typeof iconMap] ? React.createElement(iconMap[step.icon as keyof typeof iconMap], { className: "w-6 h-6 text-primary-400" }) : <Search className="w-6 h-6" />}
             </div>
             
             <h3 className="text-xl font-bold text-white mb-2">{step.title}</h3>
             <p className="text-slate-400 text-sm mb-6 flex-1 leading-relaxed line-clamp-3">{step.description}</p>
             
             <div className="space-y-2">
                <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Deliverables</p>
                <div className="flex flex-wrap gap-1">
                  {step.deliverables.map((del, i) => (
                    <span key={i} className="flex items-center gap-1.5 text-[10px] text-slate-300 bg-white/5 px-2 py-1 rounded-md border border-white/5">
                      <div className="w-1 h-1 rounded-full bg-accent-500"></div>
                      {del}
                    </span>
                  ))}
                </div>
             </div>
          </div>
        ))}
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center z-50 p-4 overflow-y-auto">
          <div className="bg-[#1e253a] border border-[#3f4d7f]/50 rounded-3xl w-full max-w-2xl my-8 shadow-2xl overflow-hidden flex flex-col">
            <div className="p-6 border-b border-[#3f4d7f]/30 flex items-center justify-between bg-[#262e49]/50">
              <h2 className="text-2xl font-bold text-white">Section Settings</h2>
              <button onClick={() => setShowModal(false)} className="p-2 text-slate-400 hover:text-white hover:bg-white/10 rounded-full transition-all">
                <X className="w-6 h-6" />
              </button>
            </div>
            <div className="p-8 space-y-6">
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase mb-2">Headline</label>
                <input
                  type="text"
                  value={formData.sectionTitle}
                  onChange={(e) => setFormData({ ...formData, sectionTitle: e.target.value })}
                  className="w-full px-4 py-3 bg-[#131926] border border-[#3f4d7f]/30 rounded-xl text-white text-sm focus:border-accent-500/50 outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase mb-2">Subtitle</label>
                <input
                  type="text"
                  value={formData.sectionSubtitle}
                  onChange={(e) => setFormData({ ...formData, sectionSubtitle: e.target.value })}
                  className="w-full px-4 py-3 bg-[#131926] border border-[#3f4d7f]/30 rounded-xl text-white text-sm focus:border-accent-500/50 outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase mb-2">Description</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-4 py-3 bg-[#131926] border border-[#3f4d7f]/30 rounded-xl text-white text-sm h-32 resize-none focus:border-accent-500/50 outline-none"
                />
              </div>
            </div>
            <div className="p-6 border-t border-[#3f4d7f]/30 bg-[#262e49]/50 flex gap-4">
              <button onClick={() => setShowModal(false)} className="flex-1 px-6 py-3 bg-white/5 text-white font-bold rounded-xl hover:bg-white/10">Discard</button>
              <button onClick={handleSectionSubmit} className="flex-[2] px-6 py-3 bg-gradient-to-r from-accent-500 to-accent-600 text-white font-bold rounded-xl shadow-lg shadow-accent-500/20">Save Section</button>
            </div>
          </div>
        </div>
      )}

      {showStepModal && editingStep && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center z-50 p-4 overflow-y-auto">
          <div className="bg-[#1e253a] border border-[#3f4d7f]/50 rounded-3xl w-full max-w-4xl my-8 shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
            <div className="p-6 border-b border-[#3f4d7f]/30 flex items-center justify-between bg-[#262e49]/50">
               <div>
                <h2 className="text-2xl font-bold text-white">{modalMode === 'add' ? 'Define Process Step' : 'Optimize Step Strategy'}</h2>
                <p className="text-slate-400 text-sm mt-1">Specify order, icons, and tangible outcomes.</p>
              </div>
              <button onClick={() => setShowStepModal(false)} className="p-2 text-slate-400 hover:text-white hover:bg-white/10 rounded-full transition-all">
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <div className="p-8 overflow-y-auto flex-1 space-y-10">
               <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                  <div className="space-y-6">
                     <h3 className="text-sm font-bold text-accent-400 uppercase tracking-widest">Step Narrative</h3>
                     <div className="space-y-4">
                        <div className="grid grid-cols-3 gap-4">
                           <div>
                              <label className="block text-xs font-bold text-slate-400 uppercase mb-2">Step #</label>
                              <input
                                type="number"
                                value={editingStep.stepNumber}
                                onChange={(e) => setEditingStep({ ...editingStep, stepNumber: parseInt(e.target.value) || 0 })}
                                className="w-full px-4 py-3 bg-[#131926] border border-[#3f4d7f]/30 rounded-xl text-white text-sm focus:border-accent-500/50 outline-none"
                              />
                           </div>
                           <div className="col-span-2">
                              <label className="block text-xs font-bold text-slate-400 uppercase mb-2">Step Icon</label>
                              <select
                                value={editingStep.icon}
                                onChange={(e) => setEditingStep({ ...editingStep, icon: e.target.value })}
                                className="w-full px-4 py-3 bg-[#131926] border border-[#3f4d7f]/30 rounded-xl text-white text-sm outline-none"
                              >
                                {iconOptions.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                              </select>
                           </div>
                        </div>
                        <div>
                          <label className="block text-xs font-bold text-slate-400 uppercase mb-2">Step Title</label>
                          <input
                            type="text"
                            value={editingStep.title}
                            onChange={(e) => setEditingStep({ ...editingStep, title: e.target.value })}
                            className="w-full px-4 py-3 bg-[#131926] border border-[#3f4d7f]/30 rounded-xl text-white text-sm focus:border-accent-500/50 outline-none"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-bold text-slate-400 uppercase mb-2">Step Description</label>
                          <textarea
                            value={editingStep.description}
                            onChange={(e) => setEditingStep({ ...editingStep, description: e.target.value })}
                            className="w-full px-4 py-3 bg-[#131926] border border-[#3f4d7f]/30 rounded-xl text-white text-sm h-32 resize-none focus:border-accent-500/50 outline-none"
                          />
                        </div>
                     </div>
                  </div>
                  
                  <div className="space-y-6">
                     <div className="flex items-center justify-between">
                        <h3 className="text-sm font-bold text-emerald-400 uppercase tracking-widest">Tangible Deliverables</h3>
                        <button onClick={addDeliverable} className="flex items-center gap-2 px-4 py-2 bg-emerald-500/10 text-emerald-400 text-xs font-bold rounded-lg hover:bg-emerald-500/20 transition-all">
                          <Plus className="w-4 h-4" /> Add Item
                        </button>
                     </div>
                     <div className="space-y-3">
                        {editingStep.deliverables.map((del, index) => (
                          <div key={index} className="flex gap-2">
                             <input
                               type="text"
                               value={del}
                               onChange={(e) => updateDeliverable(index, e.target.value)}
                               className="flex-1 px-4 py-3 bg-[#131926] border border-[#3f4d7f]/30 rounded-xl text-white text-sm focus:border-emerald-500/30 outline-none"
                               placeholder="e.g., Audit Report"
                             />
                             <button onClick={() => removeDeliverable(index)} className="p-2 text-slate-500 hover:text-red-500 transition-colors">
                               <Trash2 className="w-5 h-5" />
                             </button>
                          </div>
                        ))}
                     </div>
                     
                     <div className="mt-8 bg-[#131926] border border-[#3f4d7f]/30 rounded-2xl p-6 text-center">
                        <div className="w-16 h-16 rounded-full bg-accent-500/10 border border-accent-500/20 flex items-center justify-center text-accent-400 mx-auto mb-4">
                           {iconMap[editingStep.icon as keyof typeof iconMap] ? React.createElement(iconMap[editingStep.icon as keyof typeof iconMap], { className: "w-8 h-8" }) : <Search className="w-8 h-8" />}
                        </div>
                        <p className="text-white font-bold">{editingStep.title || 'Step Preview'}</p>
                        <p className="text-slate-500 text-xs mt-1 italic">Step {editingStep.stepNumber}</p>
                     </div>
                  </div>
               </div>
            </div>

            <div className="p-6 border-t border-[#3f4d7f]/30 bg-[#262e49]/50 flex gap-4">
              <button onClick={() => setShowStepModal(false)} className="flex-1 px-6 py-3 bg-white/5 text-white font-bold rounded-xl hover:bg-white/10">Cancel</button>
              <button onClick={handleStepSubmit} className="flex-[2] px-6 py-3 bg-gradient-to-r from-accent-500 to-accent-600 text-white font-bold rounded-xl shadow-lg shadow-accent-500/20 flex items-center justify-center gap-2">
                <Check className="w-5 h-5" /> {modalMode === 'add' ? 'Append Step' : 'Confirm Strategy'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
