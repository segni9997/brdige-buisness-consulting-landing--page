import { useState, useEffect } from 'react';
import { Plus, Trash2, Edit, X, Check, Image, Star, Quote } from 'lucide-react';
import { 
  useGetTestimonialsQuery, 
  useUpdateTestimonialsMutation, 
  useCreateTestimonialMutation,
  useUpdateTestimonialMutation,
  useDeleteTestimonialMutation,
  type TTestimonialSection, 
  type TTestimonial 
} from '../../store/api';

const gradientOptions = [
  { value: 'from-accent-500 to-accent-600', label: 'Accent Glow' },
  { value: 'from-primary-600 to-primary-800', label: 'Ocean Depth' },
  { value: 'from-purple-500 to-indigo-600', label: 'Royal Mist' },
  { value: 'from-slate-700 to-slate-900', label: 'Dark Professional' },
];

export default function TestimonialsManagement() {
  const { data: testimonialsData } = useGetTestimonialsQuery();
  const [updateSection] = useUpdateTestimonialsMutation();
  const [createTestimonial] = useCreateTestimonialMutation();
  const [updateTestimonial] = useUpdateTestimonialMutation();
  const [deleteTestimonial] = useDeleteTestimonialMutation();

  const [showModal, setShowModal] = useState(false);
  const [showItemModal, setShowItemModal] = useState(false);
  const [modalMode, setModalMode] = useState<'edit' | 'add'>('edit');
  const [editingItem, setEditingItem] = useState<TTestimonial | null>(null);
  const [formData, setFormData] = useState<TTestimonialSection | null>(null);

  useEffect(() => {
    if (testimonialsData) setFormData(JSON.parse(JSON.stringify(testimonialsData)));
  }, [testimonialsData]);

  if (!testimonialsData || !formData) return <div>Loading...</div>;

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
        await createTestimonial({ ...editingItem, section: formData.id }).unwrap();
      } else {
        await updateTestimonial({ ...editingItem, section: formData.id }).unwrap();
      }
      setShowItemModal(false);
    } catch (err) {
      console.error('Failed to save testimonial:', err);
    }
  };

  const openAddItemModal = () => {
    setEditingItem({
      id: 0,
      name: '',
      role: '',
      company: '',
      imageUrl: '',
      testimonial: '',
      rating: 5,
      gradient: 'from-accent-500 to-accent-600'
    });
    setModalMode('add');
    setShowItemModal(true);
  };

  const openEditItemModal = (item: TTestimonial) => {
    setEditingItem(JSON.parse(JSON.stringify(item)));
    setModalMode('edit');
    setShowItemModal(true);
  };

  const handleDeleteItem = async (id: number) => {
    if (confirm('Delete this testimonial?')) {
      try {
        await deleteTestimonial(id).unwrap();
      } catch (err) {
        console.error('Failed to delete testimonial:', err);
      }
    }
  };

  return (
    <div className="space-y-6 sm:space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white tracking-tight">Testimonials</h1>
          <p className="text-slate-400 mt-1 text-sm sm:text-base">Manage client feedback and social proof.</p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={() => setShowModal(true)}
            className="flex items-center justify-center gap-2 px-6 py-3 bg-white/5 text-white font-bold rounded-xl border border-white/10 hover:bg-white/10 transition-all text-sm"
          >
            Edit Header
          </button>
          <button
            onClick={openAddItemModal}
            className="flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-accent-500 to-accent-600 text-white font-bold rounded-xl hover:shadow-lg hover:shadow-accent-500/20 transition-all text-sm group"
          >
            <Plus className="w-5 h-5 group-hover:rotate-90 transition-transform" />
            Add Testimonial
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {formData.testimonials.map((testimonial) => (
          <div key={testimonial.id} className="group bg-[#262e49]/50 backdrop-blur-sm border border-[#3f4d7f]/30 rounded-2xl p-6 hover:border-accent-500/50 transition-all duration-300 flex flex-col relative overflow-hidden">
             <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <button onClick={() => openEditItemModal(testimonial)} className="p-2 bg-white/10 border border-white/10 rounded-lg text-white hover:bg-accent-500 transition-colors">
                  <Edit className="w-4 h-4" />
                </button>
                <button onClick={() => handleDeleteItem(testimonial.id || 0)} className="p-2 bg-white/10 border border-white/10 rounded-lg text-white hover:bg-red-500 transition-colors">
                  <Trash2 className="w-4 h-4" />
                </button>
             </div>
             
             <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 rounded-2xl overflow-hidden border-2 border-accent-500/20 shadow-lg">
                   <img src={testimonial.imageUrl} alt={testimonial.name} className="w-full h-full object-cover" />
                </div>
                <div>
                   <h3 className="text-xl font-bold text-white">{testimonial.name}</h3>
                   <p className="text-accent-400 text-sm font-medium">{testimonial.role} @ {testimonial.company}</p>
                   <div className="flex gap-1 mt-1">
                      {[...Array(testimonial.rating)].map((_, i) => <Star key={i} className="w-3 h-3 fill-yellow-500 text-yellow-500" />)}
                   </div>
                </div>
             </div>
             
             <div className="relative">
                <Quote className="absolute -top-2 -left-2 w-8 h-8 text-white/5" />
                <p className="text-slate-300 text-sm leading-relaxed italic relative z-10 line-clamp-4">
                   "{testimonial.testimonial}"
                </p>
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
              <div className="grid grid-cols-2 gap-4">
                 <div>
                    <label className="block text-xs font-bold text-slate-400 uppercase mb-2">Primary CTA</label>
                    <input
                      type="text"
                      value={formData.ctaTitle}
                      onChange={(e) => setFormData({ ...formData, ctaTitle: e.target.value })}
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
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase mb-2">Description</label>
                <input
                  type="text"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-4 py-3 bg-[#131926] border border-[#3f4d7f]/30 rounded-xl text-white text-sm focus:border-accent-500/50 outline-none"
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

      {showItemModal && editingItem && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center z-50 p-4 overflow-y-auto">
          <div className="bg-[#1e253a] border border-[#3f4d7f]/50 rounded-3xl w-full max-w-4xl my-8 shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
            <div className="p-6 border-b border-[#3f4d7f]/30 flex items-center justify-between bg-[#262e49]/50">
               <div>
                <h2 className="text-2xl font-bold text-white">{modalMode === 'add' ? 'Add Testimonial' : 'Refine Feedback'}</h2>
                <p className="text-slate-400 text-sm mt-1">Capture the voice of your satisfied clients.</p>
              </div>
              <button onClick={() => setShowItemModal(false)} className="p-2 text-slate-400 hover:text-white hover:bg-white/10 rounded-full transition-all">
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <div className="p-8 overflow-y-auto flex-1 space-y-10">
               <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                  <div className="space-y-6">
                     <h3 className="text-sm font-bold text-accent-400 uppercase tracking-widest">Client Profile</h3>
                     <div className="space-y-4">
                        <div className="flex gap-4 items-end">
                           <div className="w-20 h-20 rounded-2xl bg-[#131926] border border-[#3f4d7f]/30 overflow-hidden relative group">
                              {editingItem.imageUrl ? (
                                <img src={editingItem.imageUrl} className="w-full h-full object-cover" />
                              ) : (
                                <div className="w-full h-full flex items-center justify-center text-slate-600"><Image className="w-8 h-8" /></div>
                              )}
                           </div>
                           <div className="flex-1">
                              <label className="block text-xs font-bold text-slate-400 uppercase mb-2">Avatar URL</label>
                              <input
                                type="url"
                                value={editingItem.imageUrl}
                                onChange={(e) => setEditingItem({ ...editingItem, imageUrl: e.target.value })}
                                className="w-full px-4 py-3 bg-[#131926] border border-[#3f4d7f]/30 rounded-xl text-white text-sm focus:border-accent-500/50 outline-none"
                                placeholder="https://images.pexels.com/..."
                              />
                           </div>
                        </div>
                        <div>
                          <label className="block text-xs font-bold text-slate-400 uppercase mb-2">Full Name</label>
                          <input
                            type="text"
                            value={editingItem.name}
                            onChange={(e) => setEditingItem({ ...editingItem, name: e.target.value })}
                            className="w-full px-4 py-3 bg-[#131926] border border-[#3f4d7f]/30 rounded-xl text-white text-sm focus:border-accent-500/50 outline-none"
                            placeholder="John Doe"
                          />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                           <div>
                              <label className="block text-xs font-bold text-slate-400 uppercase mb-2">Role / Title</label>
                              <input
                                type="text"
                                value={editingItem.role}
                                onChange={(e) => setEditingItem({ ...editingItem, role: e.target.value })}
                                className="w-full px-4 py-3 bg-[#131926] border border-[#3f4d7f]/30 rounded-xl text-white text-sm focus:border-accent-500/50 outline-none"
                                placeholder="CTO"
                              />
                           </div>
                           <div>
                              <label className="block text-xs font-bold text-slate-400 uppercase mb-2">Company</label>
                              <input
                                type="text"
                                value={editingItem.company}
                                onChange={(e) => setEditingItem({ ...editingItem, company: e.target.value })}
                                className="w-full px-4 py-3 bg-[#131926] border border-[#3f4d7f]/30 rounded-xl text-white text-sm focus:border-accent-500/50 outline-none"
                                placeholder="TechCorp"
                              />
                           </div>
                        </div>
                     </div>
                  </div>
                  
                  <div className="space-y-6">
                     <h3 className="text-sm font-bold text-primary-400 uppercase tracking-widest">The Message</h3>
                     <div className="space-y-4">
                        <div>
                           <label className="block text-xs font-bold text-slate-400 uppercase mb-2">Rating</label>
                           <div className="flex gap-2">
                              {[1,2,3,4,5].map(num => (
                                <button
                                  key={num}
                                  onClick={() => setEditingItem({...editingItem, rating: num})}
                                  className={`w-10 h-10 rounded-lg flex items-center justify-center transition-all ${editingItem.rating >= num ? 'bg-yellow-500/20 text-yellow-500 border border-yellow-500/20' : 'bg-white/5 text-slate-600 border border-white/5'}`}
                                >
                                  <Star className={`w-5 h-5 ${editingItem.rating >= num ? 'fill-yellow-500' : ''}`} />
                                </button>
                              ))}
                           </div>
                        </div>
                        <div>
                          <label className="block text-xs font-bold text-slate-400 uppercase mb-2">Testimonial Quote</label>
                          <textarea
                            value={editingItem.testimonial}
                            onChange={(e) => setEditingItem({ ...editingItem, testimonial: e.target.value })}
                            className="w-full px-4 py-3 bg-[#131926] border border-[#3f4d7f]/30 rounded-xl text-white text-sm h-32 resize-none focus:border-accent-500/50 outline-none"
                            placeholder="What did they say about your work?"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-bold text-slate-400 uppercase mb-2">Preview Theme</label>
                          <select
                            value={editingItem.gradient}
                            onChange={(e) => setEditingItem({ ...editingItem, gradient: e.target.value })}
                            className="w-full px-4 py-3 bg-[#131926] border border-[#3f4d7f]/30 rounded-xl text-white text-sm outline-none"
                          >
                            {gradientOptions.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
                          </select>
                        </div>
                     </div>
                  </div>
               </div>
            </div>

            <div className="p-6 border-t border-[#3f4d7f]/30 bg-[#262e49]/50 flex gap-4">
              <button onClick={() => setShowItemModal(false)} className="flex-1 px-6 py-3 bg-white/5 text-white font-bold rounded-xl hover:bg-white/10">Cancel</button>
              <button onClick={handleItemSubmit} className="flex-[2] px-6 py-3 bg-gradient-to-r from-accent-500 to-accent-600 text-white font-bold rounded-xl shadow-lg shadow-accent-500/20 flex items-center justify-center gap-2">
                <Check className="w-5 h-5" /> {modalMode === 'add' ? 'Publish Testimonial' : 'Save Changes'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
