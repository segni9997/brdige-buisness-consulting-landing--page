import { useState } from 'react';
import { BookOpen, Plus, Search, Trash2, Edit, Eye, EyeOff, Calendar, User, X, Check, Eye as EyeIcon } from 'lucide-react';
import { useGetStoriesQuery, useCreateStoryMutation, useUpdateStoryMutation, useDeleteStoryMutation, type TBlog } from '../../store/api';

const categories = ['Business', 'Finance', 'Analysis', 'Startup', 'Technology', 'Marketing'];

const defaultImages = [
  'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=400',
  'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400',
  'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=400',
  'https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=400',
  'https://images.unsplash.com/photo-1553484771-371a605b060b?w=400',
];

export default function Stories() {
  const { data: storiesData = [] } = useGetStoriesQuery();
  const [createStory] = useCreateStoryMutation();
  const [updateStory] = useUpdateStoryMutation();
  const [deleteStory] = useDeleteStoryMutation();
  const [showModal, setShowModal] = useState(false);
  const [modalMode, setModalMode] = useState<'add' | 'edit'>('add');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [previewStory, setPreviewStory] = useState<TBlog | null>(null);

  const [formData, setFormData] = useState<Partial<TBlog>>({
    id: 0,
    title: '',
    content: '',
    category: 'Business',
    imageUrl: '',
    expert: 'Admin',
    createdAt: '',
    status: 'draft',
    slug: '',
  });

  const openAddModal = () => {
    setFormData({
      id: 0,
      title: '',
      content: '',
      category: 'Business',
      imageUrl: '',
      expert: 'Admin',
      createdAt: new Date().toISOString().split('T')[0],
      status: 'draft',
      slug: '',
    });
    setModalMode('add');
    setShowModal(true);
  };

  const openEditModal = (story: TBlog) => {
    setFormData({ ...story });
    setModalMode('edit');
    setShowModal(true);
  };

  const handleSubmit = async () => {
    if (modalMode === 'add') {
      const newStory = {
        ...formData,
        imageUrl: formData.imageUrl || defaultImages[Math.floor(Math.random() * defaultImages.length)],
      };
      await createStory(newStory);
    } else {
      await updateStory(formData as TBlog);
    }
    setShowModal(false);
  };

  const handleDelete = async (id: number) => {
    await deleteStory(id);
  };

  const handleStatusChange = async (story: TBlog, status: TBlog['status']) => {
    await updateStory({ ...story, status });
  };

  const filteredStories = storiesData.filter(s => {
    const matchesSearch = s.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         s.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         s.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || s.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'published': return 'bg-[#bb0505]/20 text-[#ee6969]';
      case 'draft': return 'bg-yellow-500/20 text-yellow-400';
      default: return 'bg-slate-500/20 text-slate-400';
    }
  };

  const totalViews = 0; // Views not tracked in MVP
  const publishedCount = storiesData.filter(s => s.status === 'published').length;
  const draftCount = storiesData.filter(s => s.status === 'draft').length;

  return (
    <div className="space-y-4 sm:space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white">Stories</h1>
          <p className="text-slate-400 mt-1 text-sm sm:text-base">Manage blog posts</p>
        </div>
        <button
          onClick={openAddModal}
          className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-[#3f4d7f] to-[#3f4d7f]/80 text-white font-medium rounded-xl hover:opacity-90 transition-all text-sm"
        >
          <Plus className="w-4 h-4" />
          Create
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
        <div className="bg-[#262e49]/50 border border-[#3f4d7f]/30 rounded-xl p-3 sm:p-4">
          <div className="flex items-center gap-3">
            <div className="w-8 sm:w-10 h-8 sm:h-10 rounded-lg bg-[#3f4d7f]/20 flex items-center justify-center">
              <EyeIcon className="w-4 sm:w-5 h-4 sm:h-5 text-[#3f4d7f]" />
            </div>
            <div>
              <p className="text-slate-400 text-xs sm:text-sm">Views</p>
              <p className="text-xl sm:text-2xl font-bold text-white">{totalViews.toLocaleString()}</p>
            </div>
          </div>
        </div>
        <div className="bg-[#262e49]/50 border border-[#3f4d7f]/30 rounded-xl p-3 sm:p-4">
          <div className="flex items-center gap-3">
            <div className="w-8 sm:w-10 h-8 sm:h-10 rounded-lg bg-[#bb0505]/20 flex items-center justify-center">
              <BookOpen className="w-4 sm:w-5 h-4 sm:h-5 text-[#ee6969]" />
            </div>
            <div>
              <p className="text-slate-400 text-xs sm:text-sm">Published</p>
              <p className="text-xl sm:text-2xl font-bold text-white">{publishedCount}</p>
            </div>
          </div>
        </div>
        <div className="bg-[#262e49]/50 border border-[#3f4d7f]/30 rounded-xl p-3 sm:p-4">
          <div className="flex items-center gap-3">
            <div className="w-8 sm:w-10 h-8 sm:h-10 rounded-lg bg-yellow-500/20 flex items-center justify-center">
              <Edit className="w-4 sm:w-5 h-4 sm:h-5 text-yellow-400" />
            </div>
            <div>
              <p className="text-slate-400 text-xs sm:text-sm">Drafts</p>
              <p className="text-xl sm:text-2xl font-bold text-white">{draftCount}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-[#262e49]/50 backdrop-blur-xl border border-[#3f4d7f]/30 rounded-2xl p-4 sm:p-6">
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-4 sm:mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 sm:pl-12 pr-4 py-2.5 bg-[#191f2f]/50 border border-[#3f4d7f]/30 rounded-xl text-white text-sm"
            />
          </div>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-3 py-2.5 bg-[#191f2f]/50 border border-[#3f4d7f]/30 rounded-xl text-white text-sm"
          >
            <option value="all">All</option>
            <option value="published">Published</option>
            <option value="draft">Draft</option>
          </select>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
          {filteredStories.map((story) => (
            <div key={story.id} className="bg-[#191f2f]/30 rounded-xl overflow-hidden hover:bg-[#191f2f]/50 transition-all">
              <div className="h-28 sm:h-40 bg-[#262e49] relative">
                <img src={story.imageUrl} alt={story.title} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <span className={`absolute top-2 sm:top-3 right-2 sm:right-3 px-2 sm:px-3 py-0.5 rounded-full text-xs font-medium ${getStatusColor(story.status)}`}>
                  {story.status}
                </span>
              </div>
              <div className="p-3 sm:p-5">
                <div className="flex items-center gap-2 mb-1 sm:mb-2">
                  <span className="px-2 py-0.5 bg-[#3f4d7f]/20 text-[#3f4d7f] text-xs rounded-full">{story.category}</span>
                  <span className="text-slate-500 text-xs flex items-center gap-1">
                    <EyeIcon className="w-3 h-3" /> 0
                  </span>
                </div>
                <h3 className="text-white font-semibold text-sm sm:text-lg mb-1 sm:mb-2 line-clamp-1">{story.title}</h3>
                <p className="text-slate-400 text-xs sm:text-sm mb-2 sm:mb-3 line-clamp-2">{story.content.substring(0, 100)}...</p>
                <div className="flex items-center justify-between pt-2 sm:pt-3 border-t border-[#3f4d7f]/30">
                  <div className="flex items-center gap-2 text-slate-500 text-xs">
                    <Calendar className="w-3 h-3 sm:w-4 sm:h-4" />
                    <span className="hidden sm:inline">{story.createdAt ? new Date(story.createdAt).toLocaleDateString() : ''}</span>
                    <span className="sm:hidden">{story.createdAt ? new Date(story.createdAt).toLocaleDateString().slice(5) : ''}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => setPreviewStory(story)}
                      className="p-1.5 text-[#3f4d7f] hover:text-[#3f4d7f]/80 hover:bg-[#3f4d7f]/10 rounded-lg transition-all"
                    >
                      <Eye className="w-3 h-3 sm:w-4 sm:h-4" />
                    </button>
                    <button
                      onClick={() => openEditModal(story)}
                      className="p-1.5 text-slate-400 hover:text-white hover:bg-[#3f4d7f]/10 rounded-lg transition-all"
                    >
                      <Edit className="w-3 h-3 sm:w-4 sm:h-4" />
                    </button>
                    <button
                      onClick={() => handleStatusChange(story, story.status === 'published' ? 'draft' : 'published')}
                      className="p-1.5 text-yellow-400 hover:text-yellow-300 hover:bg-yellow-500/10 rounded-lg transition-all"
                    >
                      {story.status === 'published' ? <EyeOff className="w-3 h-3 sm:w-4 sm:h-4" /> : <Check className="w-3 h-3 sm:w-4 sm:h-4" />}
                    </button>
                    <button
                      onClick={() => handleDelete(story.id)}
                      className="p-1.5 text-[#ee6969] hover:text-[#ff9494] hover:bg-[#bb0505]/10 rounded-lg transition-all"
                    >
                      <Trash2 className="w-3 h-3 sm:w-4 sm:h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredStories.length === 0 && (
          <div className="text-center py-8 sm:py-12">
            <BookOpen className="w-10 h-10 text-slate-600 mx-auto mb-3" />
            <p className="text-slate-400">No stories found</p>
          </div>
        )}
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-[#262e49] border border-[#3f4d7f]/30 rounded-2xl p-4 sm:p-6 w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4 sm:mb-6">
              <h2 className="text-xl sm:text-2xl font-bold text-white">
                {modalMode === 'add' ? 'Create Story' : 'Edit Story'}
              </h2>
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
                <label className="block text-sm font-medium text-slate-300 mb-2">Category</label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full px-3 sm:px-4 py-2.5 bg-[#191f2f]/50 border border-[#3f4d7f]/30 rounded-xl text-white text-sm"
                >
                  {categories.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Status</label>
                <select
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value as TBlog['status'] })}
                  className="w-full px-3 sm:px-4 py-2.5 bg-[#191f2f]/50 border border-[#3f4d7f]/30 rounded-xl text-white text-sm"
                >
                  <option value="draft">Draft</option>
                  <option value="published">Published</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Image URL</label>
                <input
                  type="url"
                  value={formData.imageUrl}
                  onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                  className="w-full px-3 sm:px-4 py-2.5 bg-[#191f2f]/50 border border-[#3f4d7f]/30 rounded-xl text-white text-sm"
                  placeholder="https://..."
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Expert Name</label>
                <input
                  type="text"
                  value={formData.expert}
                  onChange={(e) => setFormData({ ...formData, expert: e.target.value })}
                  className="w-full px-3 sm:px-4 py-2.5 bg-[#191f2f]/50 border border-[#3f4d7f]/30 rounded-xl text-white text-sm"
                  placeholder="John Doe"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Content</label>
                <textarea
                  value={formData.content}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                  className="w-full px-3 sm:px-4 py-2.5 bg-[#191f2f]/50 border border-[#3f4d7f]/30 rounded-xl text-white h-24 sm:h-32 resize-none text-sm"
                  placeholder="Full content"
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
                {modalMode === 'add' ? <><Plus className="w-4 h-4" /> Create</> : <><Check className="w-4 h-4" /> Save</>}
              </button>
            </div>
          </div>
        </div>
      )}

      {previewStory && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-[#262e49] border border-[#3f4d7f]/30 rounded-2xl p-4 sm:p-6 w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <div className="h-32 sm:h-48 rounded-xl overflow-hidden mb-4">
              <img src={previewStory.imageUrl} alt={previewStory.title} className="w-full h-full object-cover" />
            </div>
            <div className="flex items-center gap-2 mb-2 sm:mb-3">
              <span className="px-2 py-1 bg-[#3f4d7f]/20 text-[#3f4d7f] text-xs rounded-full">{previewStory.category}</span>
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(previewStory.status)}`}>
                {previewStory.status}
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-white mb-2">{previewStory.title}</h2>
            <div className="flex items-center gap-3 sm:gap-4 text-slate-400 text-xs sm:text-sm mb-3 sm:mb-4">
              <span className="flex items-center gap-1"><User className="w-3 h-3 sm:w-4 sm:h-4" /> {previewStory.expert}</span>
              <span className="flex items-center gap-1"><Calendar className="w-3 h-3 sm:w-4 sm:h-4" /> {previewStory.createdAt ? new Date(previewStory.createdAt).toLocaleDateString() : ''}</span>
              <span className="flex items-center gap-1"><EyeIcon className="w-3 h-3 sm:w-4 sm:h-4" /> 0</span>
            </div>
            <p className="text-slate-300 mb-3 sm:mb-4 text-sm">{previewStory.content.substring(0, 100)}...</p>
            <div className="bg-[#191f2f]/30 p-3 sm:p-4 rounded-xl text-slate-300 text-sm">
              {previewStory.content || 'No content available.'}
            </div>
            <button
              onClick={() => setPreviewStory(null)}
              className="w-full mt-4 sm:mt-6 px-5 py-2.5 bg-[#191f2f] text-white font-medium rounded-xl text-sm"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
