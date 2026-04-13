import { useState, useEffect } from 'react';
import { Settings, Plus, Trash2, Edit, X, Check, Image as ImageIcon } from 'lucide-react';
import { useContent, type ServicesContent, type ServiceItem } from '../../context/ContentContext';

const iconOptions = [
  { value: 'BarChart3', label: 'Bar Chart' },
  { value: 'Target', label: 'Target' },
  { value: 'Users', label: 'Users' },
  { value: 'Zap', label: 'Zap' },
  { value: 'TrendingUp', label: 'Trending Up' },
  { value: 'Shield', label: 'Shield' },
  { value: 'Cpu', label: 'CPU' },
  { value: 'Globe', label: 'Globe' },
  { value: 'Briefcase', label: 'Briefcase' },
  { value: 'Headphones', label: 'Headphones' },
];

const gradientOptions = [
  { value: 'from-black/60 to-black/80', label: 'Dark' },
  { value: 'from-accent-500 to-accent-600', label: 'Accent 1' },
  { value: 'from-accent-500 to-accent-700', label: 'Accent 2' },
  { value: 'from-black/40 to-black/60', label: 'Dark Light' },
  { value: 'from-primary-600 to-accent-500', label: 'Primary' },
  { value: 'from-primary-700 to-primary-900', label: 'Primary Dark' },
];

export default function ServicesManagement() {
  const { services, updateServices } = useContent();
  const [showModal, setShowModal] = useState(false);
  const [showItemModal, setShowItemModal] = useState(false);
  const [modalMode, setModalMode] = useState<'edit' | 'add'>('edit');
  const [editingItem, setEditingItem] = useState<ServiceItem | null>(null);

  const [formData, setFormData] = useState<ServicesContent>(services);

  useEffect(() => {
    setFormData(services);
  }, [services]);

  const openEditModal = () => {
    setFormData(services);
    setModalMode('edit');
    setShowModal(true);
  };

  const openAddItemModal = () => {
    setEditingItem({
      id: Date.now(),
      icon: 'BarChart3',
      title: '',
      description: '',
      features: [],
      gradient: 'from-accent-500 to-accent-600'
    });
    setModalMode('add');
    setShowItemModal(true);
  };

  const openEditItemModal = (item: ServiceItem) => {
    setEditingItem({ ...item });
    setModalMode('edit');
    setShowItemModal(true);
  };

  const handleItemSubmit = () => {
    if (!editingItem) return;
    
    if (modalMode === 'add') {
      setFormData({
        ...formData,
        services: [...formData.services, editingItem]
      });
    } else {
      setFormData({
        ...formData,
        services: formData.services.map(s => s.id === editingItem.id ? editingItem : s)
      });
    }
    setShowItemModal(false);
  };

  const handleDeleteItem = (id: number) => {
    setFormData({
      ...formData,
      services: formData.services.filter(s => s.id !== id)
    });
  };

  const saveAllItems = () => {
    updateServices(formData);
    setShowModal(false);
  };

  return (
    <div className="space-y-4 sm:space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white">Our Services Section</h1>
          <p className="text-slate-400 mt-1 text-sm sm:text-base">Manage your services section content</p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={openAddItemModal}
            className="flex items-center gap-2 px-4 py-2.5 bg-[#262e49] border border-[#3f4d7f]/30 text-white font-medium rounded-xl hover:bg-[#3f4d7f]/20 transition-all text-sm"
          >
            <Plus className="w-4 h-4" />
            Add Service
          </button>
          <button
            onClick={openEditModal}
            className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-[#3f4d7f] to-[#3f4d7f]/80 text-white font-medium rounded-xl hover:opacity-90 transition-all text-sm"
          >
            <Edit className="w-4 h-4" />
            Edit Services
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
        <div className="bg-[#262e49]/50 border border-[#3f4d7f]/30 rounded-xl p-3 sm:p-4">
          <div className="flex items-center gap-3">
            <div className="w-8 sm:w-10 h-8 sm:h-10 rounded-lg bg-[#3f4d7f]/20 flex items-center justify-center">
              <Settings className="w-4 sm:w-5 h-4 sm:h-5 text-[#3f4d7f]" />
            </div>
            <div>
              <p className="text-slate-400 text-xs sm:text-sm">Total Services</p>
              <p className="text-xl sm:text-2xl font-bold text-white">{services.services.length}</p>
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
              <p className="text-lg font-bold text-white truncate">{services.title}</p>
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
        <h2 className="text-lg sm:text-xl font-semibold text-white mb-4">Services Preview</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {services.services.map((service) => (
            <div key={service.id} className="bg-[#191f2f]/50 rounded-xl p-4 border border-[#3f4d7f]/20">
              <div className="flex items-start justify-between mb-3">
                <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${service.gradient} flex items-center justify-center text-white`}>
                  <span className="text-xs font-bold">{service.icon[0]}</span>
                </div>
                <div className="flex gap-1">
                  <button
                    onClick={() => {
                      setFormData({ ...services });
                      openEditItemModal(service);
                    }}
                    className="p-1.5 text-slate-400 hover:text-white hover:bg-[#3f4d7f]/10 rounded-lg transition-all"
                  >
                    <Edit className="w-3 h-3 sm:w-4 sm:h-4" />
                  </button>
                </div>
              </div>
              <h3 className="text-white font-semibold mb-2">{service.title}</h3>
              <p className="text-slate-400 text-sm mb-3 line-clamp-2">{service.description}</p>
              <div className="flex flex-wrap gap-1">
                {service.features.slice(0, 2).map((feature, i) => (
                  <span key={i} className="px-2 py-0.5 bg-[#3f4d7f]/20 text-[#3f4d7f] text-xs rounded-full">
                    {feature}
                  </span>
                ))}
                {service.features.length > 2 && (
                  <span className="px-2 py-0.5 text-slate-500 text-xs">+{service.features.length - 2} more</span>
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
              <h2 className="text-xl sm:text-2xl font-bold text-white">Edit Services Section</h2>
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
            </div>

            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-white">Services</h3>
              <button
                onClick={() => {
                  openAddItemModal();
                }}
                className="flex items-center gap-1 px-3 py-1.5 bg-[#3f4d7f]/20 text-white text-sm rounded-lg hover:bg-[#3f4d7f]/40 transition-all"
              >
                <Plus className="w-4 h-4" /> Add Service
              </button>
            </div>

            <div className="space-y-3 max-h-60 overflow-y-auto">
              {formData.services.map((service) => (
                <div key={service.id} className="bg-[#191f2f]/30 rounded-lg p-3 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${service.gradient} flex items-center justify-center text-white text-xs`}>
                      {service.icon[0]}
                    </div>
                    <div>
                      <p className="text-white font-medium">{service.title}</p>
                      <p className="text-slate-400 text-xs">{service.features.length} features</p>
                    </div>
                  </div>
                  <div className="flex gap-1">
                    <button
                      onClick={() => openEditItemModal(service)}
                      className="p-1.5 text-slate-400 hover:text-white hover:bg-[#3f4d7f]/10 rounded-lg"
                    >
                      <Edit className="w-3 h-3" />
                    </button>
                    <button
                      onClick={() => handleDeleteItem(service.id)}
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
                onClick={saveAllItems}
                className="flex-1 px-4 py-2.5 bg-gradient-to-r from-[#3f4d7f] to-[#3f4d7f]/80 text-white font-medium rounded-xl text-sm flex items-center justify-center gap-2"
              >
                <Check className="w-4 h-4" /> Save All
              </button>
            </div>
          </div>
        </div>
      )}

      {showItemModal && editingItem && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-[#262e49] border border-[#3f4d7f]/30 rounded-2xl p-4 sm:p-6 w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4 sm:mb-6">
              <h2 className="text-xl sm:text-2xl font-bold text-white">
                {modalMode === 'add' ? 'Add Service' : 'Edit Service'}
              </h2>
              <button onClick={() => setShowItemModal(false)} className="text-slate-400 hover:text-white p-1">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="space-y-3 sm:space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Title</label>
                <input
                  type="text"
                  value={editingItem.title}
                  onChange={(e) => setEditingItem({ ...editingItem, title: e.target.value })}
                  className="w-full px-3 sm:px-4 py-2.5 bg-[#191f2f]/50 border border-[#3f4d7f]/30 rounded-xl text-white text-sm"
                  placeholder="Service Title"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Description</label>
                <textarea
                  value={editingItem.description}
                  onChange={(e) => setEditingItem({ ...editingItem, description: e.target.value })}
                  className="w-full px-3 sm:px-4 py-2.5 bg-[#191f2f]/50 border border-[#3f4d7f]/30 rounded-xl text-white h-20 resize-none text-sm"
                  placeholder="Service Description"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Icon</label>
                <select
                  value={editingItem.icon}
                  onChange={(e) => setEditingItem({ ...editingItem, icon: e.target.value })}
                  className="w-full px-3 sm:px-4 py-2.5 bg-[#191f2f]/50 border border-[#3f4d7f]/30 rounded-xl text-white text-sm"
                >
                  {iconOptions.map(opt => (
                    <option key={opt.value} value={opt.value}>{opt.label}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Gradient</label>
                <select
                  value={editingItem.gradient}
                  onChange={(e) => setEditingItem({ ...editingItem, gradient: e.target.value })}
                  className="w-full px-3 sm:px-4 py-2.5 bg-[#191f2f]/50 border border-[#3f4d7f]/30 rounded-xl text-white text-sm"
                >
                  {gradientOptions.map(opt => (
                    <option key={opt.value} value={opt.value}>{opt.label}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Features (comma separated)</label>
                <input
                  type="text"
                  value={editingItem.features.join(', ')}
                  onChange={(e) => setEditingItem({ ...editingItem, features: e.target.value.split(',').map(f => f.trim()).filter(Boolean) })}
                  className="w-full px-3 sm:px-4 py-2.5 bg-[#191f2f]/50 border border-[#3f4d7f]/30 rounded-xl text-white text-sm"
                  placeholder="Feature 1, Feature 2, Feature 3"
                />
              </div>
            </div>
            <div className="flex gap-3 mt-4 sm:mt-6">
              <button
                onClick={() => setShowItemModal(false)}
                className="flex-1 px-4 py-2.5 bg-[#191f2f] text-white font-medium rounded-xl text-sm"
              >
                Cancel
              </button>
              <button
                onClick={handleItemSubmit}
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
