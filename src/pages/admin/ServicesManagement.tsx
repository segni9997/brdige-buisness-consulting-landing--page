import React, { useState, useEffect } from 'react';
import { Plus, Trash2, Edit, X, Check, Settings, BarChart3, Cpu, Briefcase, Headphones, Target, Users, Zap, TrendingUp, Shield, Globe } from 'lucide-react';
import { useGetServicesQuery, useUpdateServicesMutation, type TServiceSection, type TService, useUpdateServicesIndividualMutation, useCreateServiceMutation } from '../../store/api';

const iconMap = {
  BarChart3, Target, Users, Zap, TrendingUp, Shield, Cpu, Globe, Briefcase, Headphones
};

const iconOptions = Object.keys(iconMap);

const gradientOptions = [
  { value: 'from-accent-500 to-accent-600', label: 'Sunset Accent' },
  { value: 'from-primary-500 to-primary-700', label: 'Deep Ocean' },
  { value: 'from-purple-500 to-indigo-600', label: 'Royal Purple' },
  { value: 'from-emerald-500 to-teal-600', label: 'Emerald Forest' },
  { value: 'from-rose-500 to-orange-600', label: 'Warm Fire' },
  { value: 'from-slate-700 to-slate-900', label: 'Industrial Slate' },
];

export default function ServicesManagement() {
  const { data: servicesData } = useGetServicesQuery();
  const [updateSection] = useUpdateServicesMutation();
  const [updateService] = useUpdateServicesIndividualMutation();
  const [createService] = useCreateServiceMutation();
  
  const [showModal, setShowModal] = useState(false);
  const [showItemModal, setShowItemModal] = useState(false);
  const [modalMode, setModalMode] = useState<'edit' | 'add'>('edit');
  const [editingItem, setEditingItem] = useState<TService | null>(null);
  const [formData, setFormData] = useState<TServiceSection | null>(null);

  useEffect(() => {
    if (servicesData) setFormData(JSON.parse(JSON.stringify(servicesData)));
  }, [servicesData]);

  if (!servicesData || !formData) return <div>Loading...</div>;

  const handleSectionSubmit = async () => {
    try {
      await updateSection(formData).unwrap();
      setShowModal(false);
    } catch (err) {
      console.error('Failed to update section:', err);
    }
  };

  const handleItemSubmit = async () => {
    if (!editingItem) return;
    try {
      if (modalMode === 'add') {
        await createService(editingItem).unwrap();
      } else {
        await updateService(editingItem).unwrap();
      }
      setShowItemModal(false);
    } catch (err) {
      console.error('Failed to save service:', err);
    }
  };

  const openAddItemModal = () => {
    setEditingItem({
      section: servicesData.id,
      id: 0,
      icon: 'BarChart3',
      title: '',
      description: '',
      features: ['New Feature'],
      gradient: 'from-accent-500 to-accent-600'
    });
    setModalMode('add');
    setShowItemModal(true);
  };

  const openEditItemModal = (item: TService) => {
    setEditingItem(JSON.parse(JSON.stringify(item)));
    setModalMode('edit');
    setShowItemModal(true);
  };

  const addFeature = () => {
    if (!editingItem) return;
    setEditingItem({
      ...editingItem,
      features: [...editingItem.features, '']
    });
  };

  const removeFeature = (index: number) => {
    if (!editingItem) return;
    const newFeatures = [...editingItem.features];
    newFeatures.splice(index, 1);
    setEditingItem({ ...editingItem, features: newFeatures });
  };

  const updateFeature = (index: number, value: string) => {
    if (!editingItem) return;
    const newFeatures = [...editingItem.features];
    newFeatures[index] = value;
    setEditingItem({ ...editingItem, features: newFeatures });
  };

  return (
    <div className="space-y-6 sm:space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white tracking-tight">Our Services</h1>
          <p className="text-slate-400 mt-1 text-sm sm:text-base">Define and showcase your core expertise.</p>
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
            onClick={openAddItemModal}
            className="flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-accent-500 to-accent-600 text-white font-bold rounded-xl hover:shadow-lg hover:shadow-accent-500/20 transition-all text-sm group"
          >
            <Plus className="w-5 h-5 group-hover:rotate-90 transition-transform" />
            Add New Service
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {servicesData.services.map((service) => (
          <div key={service.id} className="group bg-[#262e49]/50 backdrop-blur-sm border border-[#3f4d7f]/30 rounded-2xl p-6 hover:border-accent-500/50 transition-all duration-300 flex flex-col relative overflow-hidden">
            <div className="flex items-start justify-between mb-6">
               <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${service.gradient} flex items-center justify-center text-white shadow-lg`}>
                  {iconMap[service.icon as keyof typeof iconMap] ? React.createElement(iconMap[service.icon as keyof typeof iconMap], { className: "w-7 h-7" }) : <Settings className="w-7 h-7" />}
               </div>
               <div className="flex gap-2">
                  <button onClick={() => openEditItemModal(service)} className="p-2 bg-white/10 border border-white/10 rounded-lg text-white hover:bg-accent-500 transition-colors shadow-sm">
                    <Edit className="w-4 h-4" />
                  </button>
               </div>
            </div>
            
            <h3 className="text-xl font-bold text-white mb-2">{service.title}</h3>
            <p className="text-slate-400 text-sm mb-6 flex-1 line-clamp-3 leading-relaxed">{service.description}</p>
            
            <div className="space-y-3">
               <div className="flex items-center justify-between">
                  <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Capabilities</p>
                  <span className="text-[10px] text-accent-400 font-bold">{service.features.length} Items</span>
               </div>
               <div className="flex flex-wrap gap-2">
                 {service.features.slice(0, 3).map((feature, i) => (
                   <span key={i} className="px-3 py-1 bg-white/5 border border-white/10 text-slate-300 text-[10px] font-bold rounded-full uppercase">
                     {feature}
                   </span>
                 ))}
                 {service.features.length > 3 && <span className="text-[10px] text-slate-500 font-bold">+{service.features.length - 3} more</span>}
               </div>
            </div>
          </div>
        ))}
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center z-50 p-4 overflow-y-auto">
          <div className="bg-[#1e253a] border border-[#3f4d7f]/50 rounded-3xl w-full max-w-2xl my-8 shadow-2xl overflow-hidden flex flex-col">
            <div className="p-6 border-b border-[#3f4d7f]/30 flex items-center justify-between bg-[#262e49]/50">
              <h2 className="text-2xl font-bold text-white">Section Configuration</h2>
              <button onClick={() => setShowModal(false)} className="p-2 text-slate-400 hover:text-white hover:bg-white/10 rounded-full transition-all">
                <X className="w-6 h-6" />
              </button>
            </div>
            <div className="p-8 space-y-6">
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase mb-2">Section Headline</label>
                <input
                  type="text"
                  value={formData.sectionTitle}
                  onChange={(e) => setFormData({ ...formData, sectionTitle: e.target.value })}
                  className="w-full px-4 py-3 bg-[#131926] border border-[#3f4d7f]/30 rounded-xl text-white text-sm focus:border-accent-500/50 outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase mb-2">Section Subtitle</label>
                <input
                  type="text"
                  value={formData.sectionSubtitle}
                  onChange={(e) => setFormData({ ...formData, sectionSubtitle: e.target.value })}
                  className="w-full px-4 py-3 bg-[#131926] border border-[#3f4d7f]/30 rounded-xl text-white text-sm focus:border-accent-500/50 outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase mb-2">General Description</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-4 py-3 bg-[#131926] border border-[#3f4d7f]/30 rounded-xl text-white text-sm h-32 resize-none focus:border-accent-500/50 outline-none"
                />
              </div>
            </div>
            <div className="p-6 border-t border-[#3f4d7f]/30 bg-[#262e49]/50 flex gap-4">
              <button onClick={() => setShowModal(false)} className="flex-1 px-6 py-3 bg-white/5 text-white font-bold rounded-xl hover:bg-white/10">Discard</button>
              <button onClick={handleSectionSubmit} className="flex-[2] px-6 py-3 bg-gradient-to-r from-accent-500 to-accent-600 text-white font-bold rounded-xl shadow-lg shadow-accent-500/20">Save Settings</button>
            </div>
          </div>
        </div>
      )}

      {showItemModal && editingItem && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center z-50 p-4 overflow-y-auto">
          <div className="bg-[#1e253a] border border-[#3f4d7f]/50 rounded-3xl w-full max-w-4xl my-8 shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
            <div className="p-6 border-b border-[#3f4d7f]/30 flex items-center justify-between bg-[#262e49]/50">
               <div>
                <h2 className="text-2xl font-bold text-white">{modalMode === 'add' ? 'Architect New Service' : 'Refine Service Details'}</h2>
                <p className="text-slate-400 text-sm mt-1">Specify icons, descriptions, and core capabilities.</p>
              </div>
              <button onClick={() => setShowItemModal(false)} className="p-2 text-slate-400 hover:text-white hover:bg-white/10 rounded-full transition-all">
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <div className="p-8 overflow-y-auto flex-1 space-y-10">
               <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                  <div className="space-y-6">
                     <h3 className="text-sm font-bold text-accent-400 uppercase tracking-widest">Service Overview</h3>
                     <div className="space-y-4">
                        <div>
                          <label className="block text-xs font-bold text-slate-400 uppercase mb-2">Service Name</label>
                          <input
                            type="text"
                            value={editingItem.title}
                            onChange={(e) => setEditingItem({ ...editingItem, title: e.target.value })}
                            className="w-full px-4 py-3 bg-[#131926] border border-[#3f4d7f]/30 rounded-xl text-white text-sm focus:border-accent-500/50 outline-none"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-bold text-slate-400 uppercase mb-2">Service Description</label>
                          <textarea
                            value={editingItem.description}
                            onChange={(e) => setEditingItem({ ...editingItem, description: e.target.value })}
                            className="w-full px-4 py-3 bg-[#131926] border border-[#3f4d7f]/30 rounded-xl text-white text-sm h-32 resize-none focus:border-accent-500/50 outline-none"
                          />
                        </div>
                     </div>
                  </div>
                  
                  <div className="space-y-6">
                     <h3 className="text-sm font-bold text-primary-400 uppercase tracking-widest">Visual Identity</h3>
                     <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-bold text-slate-400 uppercase mb-2">Icon Selection</label>
                          <select
                            value={editingItem.icon}
                            onChange={(e) => setEditingItem({ ...editingItem, icon: e.target.value })}
                            className="w-full px-4 py-3 bg-[#131926] border border-[#3f4d7f]/30 rounded-xl text-white text-sm outline-none"
                          >
                            {iconOptions.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                          </select>
                        </div>
                        <div>
                          <label className="block text-xs font-bold text-slate-400 uppercase mb-2">Color Theme</label>
                          <select
                            value={editingItem.gradient}
                            onChange={(e) => setEditingItem({ ...editingItem, gradient: e.target.value })}
                            className="w-full px-4 py-3 bg-[#131926] border border-[#3f4d7f]/30 rounded-xl text-white text-sm outline-none"
                          >
                            {gradientOptions.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
                          </select>
                        </div>
                     </div>
                     <div className="h-32 w-full rounded-2xl bg-gradient-to-br flex items-center justify-center border border-white/5" style={{ background: `linear-gradient(to bottom right, var(--tw-gradient-from), var(--tw-gradient-to))` }}>
                        <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${editingItem.gradient} flex items-center justify-center text-white shadow-xl scale-110`}>
                           {iconMap[editingItem.icon as keyof typeof iconMap] ? React.createElement(iconMap[editingItem.icon as keyof typeof iconMap], { className: "w-8 h-8" }) : <Settings className="w-8 h-8" />}
                        </div>
                     </div>
                  </div>
               </div>

               <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-bold text-emerald-400 uppercase tracking-widest">Capabilities & Features</h3>
                    <button onClick={addFeature} className="flex items-center gap-2 px-4 py-2 bg-emerald-500/10 text-emerald-400 text-xs font-bold rounded-lg hover:bg-emerald-500/20 transition-all">
                      <Plus className="w-4 h-4" /> Add Item
                    </button>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {editingItem.features.map((feature, index) => (
                      <div key={index} className="flex gap-2">
                        <input
                          type="text"
                          value={feature}
                          onChange={(e) => updateFeature(index, e.target.value)}
                          className="flex-1 px-4 py-2 bg-[#131926] border border-[#3f4d7f]/30 rounded-xl text-white text-sm outline-none focus:border-emerald-500/30"
                          placeholder="e.g., Cloud Integration"
                        />
                        <button onClick={() => removeFeature(index)} className="p-2 text-slate-500 hover:text-red-500 transition-colors">
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>
                    ))}
                  </div>
               </div>
            </div>

            <div className="p-6 border-t border-[#3f4d7f]/30 bg-[#262e49]/50 flex gap-4">
              <button onClick={() => setShowItemModal(false)} className="flex-1 px-6 py-3 bg-white/5 text-white font-bold rounded-xl hover:bg-white/10">Cancel</button>
              <button onClick={handleItemSubmit} className="flex-[2] px-6 py-3 bg-gradient-to-r from-accent-500 to-accent-600 text-white font-bold rounded-xl shadow-lg shadow-accent-500/20 flex items-center justify-center gap-2">
                <Check className="w-5 h-5" /> {modalMode === 'add' ? 'Publish Service' : 'Save Changes'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
