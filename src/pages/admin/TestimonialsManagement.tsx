import { useState, useEffect } from 'react';
import { MessageCircle, Plus, Trash2, Edit, X, Check, Image } from 'lucide-react';
import { useContent, type TestimonialsContent, type Testimonial } from '../../context/ContentContext';

const gradientOptions = [
  { value: 'from-primary-600 to-accent-500', label: 'Primary' },
  { value: 'from-accent-500 to-primary-600', label: 'Accent' },
  { value: 'from-primary-700 to-accent-500', label: 'Primary Dark' },
  { value: 'from-accent-500 to-primary-800', label: 'Accent Dark' },
  { value: 'from-black/60 to-black/80', label: 'Dark' },
  { value: 'from-black/40 to-black/60', label: 'Dark Light' },
];

export default function TestimonialsManagement() {
  const { testimonials, updateTestimonials } = useContent();
  const [showModal, setShowModal] = useState(false);
  const [showItemModal, setShowItemModal] = useState(false);
  const [modalMode, setModalMode] = useState<'edit' | 'add'>('edit');
  const [editingItem, setEditingItem] = useState<Testimonial | null>(null);

  const [formData, setFormData] = useState<TestimonialsContent>(testimonials);

  useEffect(() => {
    setFormData(testimonials);
  }, [testimonials]);

  const openEditModal = () => {
    setFormData(testimonials);
    setModalMode('edit');
    setShowModal(true);
  };

  const openAddItemModal = () => {
    setEditingItem({
      id: Date.now(),
      name: '',
      role: '',
      company: '',
      image: '',
      testimonial: '',
      rating: 5,
      gradient: 'from-primary-600 to-accent-500'
    });
    setModalMode('add');
    setShowItemModal(true);
  };

  const openEditItemModal = (item: Testimonial) => {
    setEditingItem({ ...item });
    setModalMode('edit');
    setShowItemModal(true);
  };

  const handleItemSubmit = () => {
    if (!editingItem) return;
    
    if (modalMode === 'add') {
      setFormData({
        ...formData,
        testimonials: [...formData.testimonials, editingItem]
      });
    } else {
      setFormData({
        ...formData,
        testimonials: formData.testimonials.map(t => t.id === editingItem.id ? editingItem : t)
      });
    }
    setShowItemModal(false);
  };

  const handleDeleteItem = (id: number) => {
    setFormData({
      ...formData,
      testimonials: formData.testimonials.filter(t => t.id !== id)
    });
  };

  const saveAllItems = () => {
    updateTestimonials(formData);
    setShowModal(false);
  };

  return (
    <div className="space-y-4 sm:space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white">Testimonials (Stories) Section</h1>
          <p className="text-slate-400 mt-1 text-sm sm:text-base">Manage your testimonials/stories section content</p>
        </div>
        <button
          onClick={openEditModal}
          className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-[#3f4d7f] to-[#3f4d7f]/80 text-white font-medium rounded-xl hover:opacity-90 transition-all text-sm"
        >
          <Edit className="w-4 h-4" />
          Edit Testimonials
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
        <div className="bg-[#262e49]/50 border border-[#3f4d7f]/30 rounded-xl p-3 sm:p-4">
          <div className="flex items-center gap-3">
            <div className="w-8 sm:w-10 h-8 sm:h-10 rounded-lg bg-[#3f4d7f]/20 flex items-center justify-center">
              <MessageCircle className="w-4 sm:w-5 h-4 sm:h-5 text-[#3f4d7f]" />
            </div>
            <div>
              <p className="text-slate-400 text-xs sm:text-sm">Total Testimonials</p>
              <p className="text-xl sm:text-2xl font-bold text-white">{testimonials.testimonials.length}</p>
            </div>
          </div>
        </div>
        <div className="bg-[#262e49]/50 border border-[#3f4d7f]/30 rounded-xl p-3 sm:p-4">
          <div className="flex items-center gap-3">
            <div className="w-8 sm:w-10 h-8 sm:h-10 rounded-lg bg-[#bb0505]/20 flex items-center justify-center">
              <Image className="w-4 sm:w-5 h-4 sm:h-5 text-[#ee6969]" />
            </div>
            <div>
              <p className="text-slate-400 text-xs sm:text-sm">Title</p>
              <p className="text-lg font-bold text-white truncate">{testimonials.title}</p>
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
        <h2 className="text-lg sm:text-xl font-semibold text-white mb-4">Testimonials Preview</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {testimonials.testimonials.map((testimonial) => (
            <div key={testimonial.id} className="bg-white/5 rounded-xl p-4 border border-white/10">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl overflow-hidden flex-shrink-0">
                  <img src={testimonial.image} alt={testimonial.name} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-white font-semibold">{testimonial.name}</h3>
                  <p className="text-slate-400 text-sm">{testimonial.role}</p>
                  <p className="text-slate-500 text-xs">{testimonial.company}</p>
                </div>
                <div className="flex gap-1">
                  <button
                    onClick={() => {
                      setFormData({ ...testimonials });
                      openEditItemModal(testimonial);
                    }}
                    className="p-1.5 text-slate-400 hover:text-white hover:bg-[#3f4d7f]/10 rounded-lg transition-all"
                  >
                    <Edit className="w-3 h-3 sm:w-4 sm:h-4" />
                  </button>
                </div>
              </div>
              <p className="text-white/70 text-sm mt-3 line-clamp-2">"{testimonial.testimonial}"</p>
            </div>
          ))}
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-[#262e49] border border-[#3f4d7f]/30 rounded-2xl p-4 sm:p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4 sm:mb-6">
              <h2 className="text-xl sm:text-2xl font-bold text-white">Edit Testimonials Section</h2>
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
                <label className="block text-sm font-medium text-slate-300 mb-2">CTA Title</label>
                <input
                  type="text"
                  value={formData.ctaTitle}
                  onChange={(e) => setFormData({ ...formData, ctaTitle: e.target.value })}
                  className="w-full px-3 sm:px-4 py-2.5 bg-[#191f2f]/50 border border-[#3f4d7f]/30 rounded-xl text-white text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">CTA Content</label>
                <textarea
                  value={formData.ctaContent}
                  onChange={(e) => setFormData({ ...formData, ctaContent: e.target.value })}
                  className="w-full px-3 sm:px-4 py-2.5 bg-[#191f2f]/50 border border-[#3f4d7f]/30 rounded-xl text-white h-20 resize-none text-sm"
                />
              </div>
            </div>

            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-white">Testimonials</h3>
              <button
                onClick={() => {
                  openAddItemModal();
                }}
                className="flex items-center gap-1 px-3 py-1.5 bg-[#3f4d7f]/20 text-white text-sm rounded-lg hover:bg-[#3f4d7f]/40 transition-all"
              >
                <Plus className="w-4 h-4" /> Add Testimonial
              </button>
            </div>

            <div className="space-y-3 max-h-60 overflow-y-auto">
              {formData.testimonials.map((testimonial) => (
                <div key={testimonial.id} className="bg-[#191f2f]/30 rounded-lg p-3 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg overflow-hidden">
                      <img src={testimonial.image} alt={testimonial.name} className="w-full h-full object-cover" />
                    </div>
                    <div>
                      <p className="text-white font-medium">{testimonial.name}</p>
                      <p className="text-slate-400 text-xs">{testimonial.role}</p>
                    </div>
                  </div>
                  <div className="flex gap-1">
                    <button
                      onClick={() => openEditItemModal(testimonial)}
                      className="p-1.5 text-slate-400 hover:text-white hover:bg-[#3f4d7f]/10 rounded-lg"
                    >
                      <Edit className="w-3 h-3" />
                    </button>
                    <button
                      onClick={() => handleDeleteItem(testimonial.id)}
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
                {modalMode === 'add' ? 'Add Testimonial' : 'Edit Testimonial'}
              </h2>
              <button onClick={() => setShowItemModal(false)} className="text-slate-400 hover:text-white p-1">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="space-y-3 sm:space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Name</label>
                <input
                  type="text"
                  value={editingItem.name}
                  onChange={(e) => setEditingItem({ ...editingItem, name: e.target.value })}
                  className="w-full px-3 sm:px-4 py-2.5 bg-[#191f2f]/50 border border-[#3f4d7f]/30 rounded-xl text-white text-sm"
                  placeholder="Client Name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Role</label>
                <input
                  type="text"
                  value={editingItem.role}
                  onChange={(e) => setEditingItem({ ...editingItem, role: e.target.value })}
                  className="w-full px-3 sm:px-4 py-2.5 bg-[#191f2f]/50 border border-[#3f4d7f]/30 rounded-xl text-white text-sm"
                  placeholder="CEO, TechFlow Industries"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Company</label>
                <input
                  type="text"
                  value={editingItem.company}
                  onChange={(e) => setEditingItem({ ...editingItem, company: e.target.value })}
                  className="w-full px-3 sm:px-4 py-2.5 bg-[#191f2f]/50 border border-[#3f4d7f]/30 rounded-xl text-white text-sm"
                  placeholder="Company Name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Image URL</label>
                <input
                  type="url"
                  value={editingItem.image}
                  onChange={(e) => setEditingItem({ ...editingItem, image: e.target.value })}
                  className="w-full px-3 sm:px-4 py-2.5 bg-[#191f2f]/50 border border-[#3f4d7f]/30 rounded-xl text-white text-sm"
                  placeholder="https://..."
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Testimonial</label>
                <textarea
                  value={editingItem.testimonial}
                  onChange={(e) => setEditingItem({ ...editingItem, testimonial: e.target.value })}
                  className="w-full px-3 sm:px-4 py-2.5 bg-[#191f2f]/50 border border-[#3f4d7f]/30 rounded-xl text-white h-24 resize-none text-sm"
                  placeholder="Testimonial text"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Rating (1-5)</label>
                <input
                  type="number"
                  min={1}
                  max={5}
                  value={editingItem.rating}
                  onChange={(e) => setEditingItem({ ...editingItem, rating: parseInt(e.target.value) || 5 })}
                  className="w-full px-3 sm:px-4 py-2.5 bg-[#191f2f]/50 border border-[#3f4d7f]/30 rounded-xl text-white text-sm"
                />
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
