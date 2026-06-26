import { useState } from 'react';
import { useGetCarouselImagesQuery, useCreateCarouselImageMutation, useUpdateCarouselImageMutation, useDeleteCarouselImageMutation, useUploadImageMutation, type TCarouselImage } from '../../store/api';
import { Plus, Edit, Trash2, Check, X, Image as ImageIcon } from 'lucide-react';

export default function HeroCarouselManager() {
  const { data: images = [], isLoading } = useGetCarouselImagesQuery();
  const [createImage] = useCreateCarouselImageMutation();
  const [updateImage] = useUpdateCarouselImageMutation();
  const [deleteImage] = useDeleteCarouselImageMutation();
  const [uploadImage] = useUploadImageMutation();

  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState<Partial<TCarouselImage>>({ title: '', subtitle: '', imageUrl: '', order: 0, isActive: true });
  const [isUploading, setIsUploading] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);

  if (isLoading) return <div className="text-white mt-8">Loading carousel...</div>;

  const handleEdit = (img: TCarouselImage) => {
    setFormData(img);
    setEditingId(img.id);
    setShowModal(true);
  };

  const handleAddNew = () => {
    setFormData({ title: '', subtitle: '', imageUrl: '', order: images.length + 1, isActive: true });
    setEditingId(null);
    setShowModal(true);
  };

  const handleDelete = async (id: number) => {
    if (confirm('Are you sure you want to delete this image?')) {
      await deleteImage(id);
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    const file = e.target.files[0];
    const data = new FormData();
    data.append('file', file);
    data.append('folder', 'carousel');
    
    setIsUploading(true);
    try {
      const res = await uploadImage(data).unwrap();
      setFormData(prev => ({ ...prev, imageUrl: res.url }));
    } catch (err) {
      console.error('Upload failed', err);
    } finally {
      setIsUploading(false);
    }
  };

  const handleSubmit = async () => {
    try {
      if (editingId) {
        await updateImage({ ...formData, id: editingId } as TCarouselImage).unwrap();
      } else {
        await createImage(formData).unwrap();
      }
      setShowModal(false);
    } catch (err) {
      console.error('Failed to save carousel image', err);
    }
  };

  return (
    <div className="mt-12 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white tracking-tight">Hero Carousel</h2>
          <p className="text-slate-400 mt-1 text-sm">Manage the rotating background images for the Hero section.</p>
        </div>
        <button
          onClick={handleAddNew}
          className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-accent-500 to-accent-600 text-white font-bold rounded-xl hover:shadow-lg hover:shadow-accent-500/20 transition-all text-sm"
        >
          <Plus className="w-4 h-4" /> Add Image
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {images.map(img => (
          <div key={img.id} className={`bg-[#262e49]/50 backdrop-blur-sm border border-[#3f4d7f]/30 rounded-2xl overflow-hidden flex flex-col group ${!img.isActive ? 'opacity-60' : ''}`}>
            <div className="h-40 relative">
              <img src={img.imageUrl} alt={img.title || 'Carousel slide'} className="w-full h-full object-cover" />
              <div className="absolute top-2 right-2 flex gap-2">
                <button onClick={() => handleEdit(img)} className="p-2 bg-black/50 text-white rounded-lg hover:bg-accent-500 transition-colors">
                  <Edit className="w-4 h-4" />
                </button>
                <button onClick={() => handleDelete(img.id)} className="p-2 bg-black/50 text-red-400 rounded-lg hover:bg-red-500 hover:text-white transition-colors">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
              <div className="absolute bottom-2 left-2 px-2 py-1 bg-black/60 text-xs text-white rounded-md font-bold">
                Order: {img.order}
              </div>
            </div>
            <div className="p-4 flex-1 flex flex-col">
              <h3 className="font-bold text-white text-lg line-clamp-1">{img.title || <span className="text-slate-500 italic">No Title</span>}</h3>
              <p className="text-slate-400 text-sm line-clamp-2 mt-1 flex-1">{img.subtitle || <span className="text-slate-500 italic">No Subtitle</span>}</p>
              <div className="mt-4 flex items-center justify-between">
                <span className={`text-xs font-bold px-2 py-1 rounded-full ${img.isActive ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
                  {img.isActive ? 'Active' : 'Inactive'}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-slate-900 border border-[#3f4d7f]/30 rounded-3xl w-full max-w-xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh]">
            <div className="flex items-center justify-between p-6 border-b border-[#3f4d7f]/30">
              <h2 className="text-xl font-bold text-white">{editingId ? 'Edit Carousel Image' : 'Add Carousel Image'}</h2>
              <button onClick={() => setShowModal(false)} className="text-slate-400 hover:text-white transition-colors">
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <div className="p-6 overflow-y-auto space-y-4 flex-1">
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase mb-2">Image Upload</label>
                <div className="flex gap-2 items-center">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="w-full px-4 py-3 bg-[#131926] border border-[#3f4d7f]/30 rounded-xl text-white text-sm focus:border-accent-500/50 outline-none transition-all file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-accent-500/20 file:text-accent-400 hover:file:bg-accent-500/30"
                  />
                  {isUploading && <span className="text-sm text-accent-400 flex items-center shrink-0">Uploading...</span>}
                </div>
                {formData.imageUrl && (
                  <div className="mt-4">
                    <img src={formData.imageUrl} alt="Preview" className="h-32 w-full object-cover rounded-xl border border-[#3f4d7f]/30" />
                  </div>
                )}
              </div>
              
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase mb-2">Title (Optional)</label>
                <input
                  type="text"
                  value={formData.title || ''}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-4 py-3 bg-[#131926] border border-[#3f4d7f]/30 rounded-xl text-white text-sm focus:border-accent-500/50 outline-none transition-all"
                  placeholder="Slide title"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase mb-2">Subtitle (Optional)</label>
                <input
                  type="text"
                  value={formData.subtitle || ''}
                  onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
                  className="w-full px-4 py-3 bg-[#131926] border border-[#3f4d7f]/30 rounded-xl text-white text-sm focus:border-accent-500/50 outline-none transition-all"
                  placeholder="Slide subtitle"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase mb-2">Display Order</label>
                  <input
                    type="number"
                    value={formData.order || 0}
                    onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) || 0 })}
                    className="w-full px-4 py-3 bg-[#131926] border border-[#3f4d7f]/30 rounded-xl text-white text-sm focus:border-accent-500/50 outline-none transition-all"
                  />
                </div>
                <div className="flex items-center pt-8">
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.isActive}
                      onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                      className="w-5 h-5 rounded border-[#3f4d7f]/30 text-accent-500 focus:ring-accent-500/50 bg-[#131926]"
                    />
                    <span className="text-sm font-bold text-white">Active Status</span>
                  </label>
                </div>
              </div>
            </div>

            <div className="p-6 border-t border-[#3f4d7f]/30 bg-[#262e49]/50 flex justify-end gap-4 shrink-0">
              <button
                onClick={() => setShowModal(false)}
                className="px-6 py-3 bg-white/5 text-white font-bold rounded-xl hover:bg-white/10 transition-all"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                disabled={!formData.imageUrl || isUploading}
                className="px-6 py-3 bg-gradient-to-r from-accent-500 to-accent-600 text-white font-bold rounded-xl hover:shadow-lg hover:shadow-accent-500/20 transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Check className="w-5 h-5" /> Save Image
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
