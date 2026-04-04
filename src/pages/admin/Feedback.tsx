import { useState } from 'react';
import { Plus, Search, Filter, Trash2, Edit, Star, Clock, X, Check } from 'lucide-react';

interface Feedback {
  id: number;
  name: string;
  email: string;
  message: string;
  rating: number;
  date: string;
  status: 'new' | 'read' | 'replied';
}

const initialFeedback: Feedback[] = [
  { id: 1, name: 'John Doe', email: 'john@example.com', message: 'Excellent service! The team was very professional and helped our business grow significantly.', rating: 5, date: '2024-01-15', status: 'new' },
  { id: 2, name: 'Sarah Smith', email: 'sarah@example.com', message: 'Great consultation experience. Highly recommended for strategic planning.', rating: 5, date: '2024-01-14', status: 'read' },
  { id: 3, name: 'Mike Johnson', email: 'mike@example.com', message: 'Good overall experience. Response time could be improved.', rating: 3, date: '2024-01-13', status: 'replied' },
  { id: 4, name: 'Emily Brown', email: 'emily@example.com', message: 'Outstanding strategic planning support. Very detailed analysis.', rating: 5, date: '2024-01-12', status: 'new' },
  { id: 5, name: 'David Lee', email: 'david@example.com', message: 'Decent service, but expected more personalized attention.', rating: 3, date: '2024-01-11', status: 'read' },
];

export default function Feedback() {
  const [feedbackList, setFeedbackList] = useState<Feedback[]>(initialFeedback);
  const [showModal, setShowModal] = useState(false);
  const [modalMode, setModalMode] = useState<'add' | 'edit'>('add');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  
  const [formData, setFormData] = useState({
    id: 0,
    name: '',
    email: '',
    message: '',
    rating: 5,
    status: 'new' as Feedback['status'],
    date: '',
  });

  const openAddModal = () => {
    setFormData({
      id: 0,
      name: '',
      email: '',
      message: '',
      rating: 5,
      status: 'new',
      date: new Date().toISOString().split('T')[0],
    });
    setModalMode('add');
    setShowModal(true);
  };

  const openEditModal = (feedback: Feedback) => {
    setFormData({ ...feedback });
    setModalMode('edit');
    setShowModal(true);
  };

  const handleSubmit = () => {
    if (modalMode === 'add') {
      const newFeedback: Feedback = {
        ...formData,
        id: Date.now(),
        date: new Date().toISOString().split('T')[0],
      };
      setFeedbackList([newFeedback, ...feedbackList]);
    } else {
      setFeedbackList(feedbackList.map(f => f.id === formData.id ? formData : f));
    }
    setShowModal(false);
  };

  const handleDelete = (id: number) => {
    setFeedbackList(feedbackList.filter(f => f.id !== id));
  };

  const handleStatusChange = (id: number, status: Feedback['status']) => {
    setFeedbackList(feedbackList.map(f => f.id === id ? { ...f, status } : f));
  };

  const filteredFeedback = feedbackList.filter(f => {
    const matchesSearch = f.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         f.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         f.message.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || f.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'new': return 'bg-[#3f4d7f]/20 text-[#3f4d7f]';
      case 'read': return 'bg-yellow-500/20 text-yellow-400';
      case 'replied': return 'bg-[#bb0505]/20 text-[#ee6969]';
      default: return 'bg-slate-500/20 text-slate-400';
    }
  };

  return (
    <div className="space-y-4 sm:space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white">Feedback</h1>
          <p className="text-slate-400 mt-1 text-sm sm:text-base">Manage customer feedback</p>
        </div>
        <button
          onClick={openAddModal}
          className="flex items-center justify-center gap-2 px-4 sm:px-5 py-2.5 bg-gradient-to-r from-[#3f4d7f] to-[#3f4d7f]/80 text-white font-medium rounded-xl hover:opacity-90 transition-all text-sm sm:text-base"
        >
          <Plus className="w-5 h-5" />
          <span className="sm:hidden">Add</span>
          <span className="hidden sm:inline">Add Feedback</span>
        </button>
      </div>

      <div className="bg-[#262e49]/50 backdrop-blur-xl border border-[#3f4d7f]/30 rounded-2xl p-4 sm:p-6">
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-4 sm:mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-slate-400" />
            <input
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 sm:pl-12 pr-4 py-2.5 sm:py-3 bg-[#191f2f]/50 border border-[#3f4d7f]/30 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#3f4d7f] text-sm sm:text-base"
            />
          </div>
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 sm:w-5 sm:h-5 text-slate-400" />
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-3 sm:px-4 py-2.5 sm:py-3 bg-[#191f2f]/50 border border-[#3f4d7f]/30 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-[#3f4d7f] text-sm sm:text-base"
            >
              <option value="all">All</option>
              <option value="new">New</option>
              <option value="read">Read</option>
              <option value="replied">Replied</option>
            </select>
          </div>
        </div>

        <div className="space-y-3 sm:space-y-4">
          {filteredFeedback.map((feedback) => (
            <div key={feedback.id} className="p-4 sm:p-5 bg-[#191f2f]/30 rounded-xl hover:bg-[#191f2f]/50 transition-all">
              <div className="flex items-start justify-between gap-2 mb-3">
                <div className="flex items-center gap-2 sm:gap-3">
                  <div className="w-10 sm:w-12 h-10 sm:h-12 rounded-full bg-gradient-to-br from-[#3f4d7f] to-[#3f4d7f]/80 flex items-center justify-center flex-shrink-0">
                    <span className="text-white font-medium text-sm sm:text-base">{feedback.name.charAt(0)}</span>
                  </div>
                  <div className="min-w-0">
                    <p className="text-white font-medium text-sm sm:text-base truncate">{feedback.name}</p>
                    <p className="text-slate-400 text-xs sm:text-sm truncate">{feedback.email}</p>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2 mb-2">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-3 h-3 sm:w-4 sm:h-4 ${i < feedback.rating ? 'text-yellow-400 fill-yellow-400' : 'text-slate-600'}`}
                    />
                  ))}
                </div>
                <span className={`px-2 sm:px-3 py-0.5 rounded-full text-xs font-medium ${getStatusColor(feedback.status)}`}>
                  {feedback.status}
                </span>
              </div>
              <p className="text-slate-300 text-sm mb-3 line-clamp-2">{feedback.message}</p>
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                <div className="flex items-center gap-2 text-slate-500 text-xs sm:text-sm">
                  <Clock className="w-3 h-3 sm:w-4 sm:h-4" />
                  {feedback.date}
                </div>
                <div className="flex items-center gap-2">
                  <select
                    value={feedback.status}
                    onChange={(e) => handleStatusChange(feedback.id, e.target.value as Feedback['status'])}
                    className="px-2 py-1.5 bg-[#262e49]/50 border border-[#3f4d7f]/30 rounded-lg text-white text-xs sm:text-sm focus:outline-none"
                  >
                    <option value="new">New</option>
                    <option value="read">Read</option>
                    <option value="replied">Replied</option>
                  </select>
                  <button 
                    onClick={() => openEditModal(feedback)}
                    className="p-1.5 sm:p-2 text-[#3f4d7f] hover:text-[#3f4d7f]/80 hover:bg-[#3f4d7f]/10 rounded-lg transition-all"
                  >
                    <Edit className="w-3 h-3 sm:w-4 sm:h-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(feedback.id)}
                    className="p-1.5 sm:p-2 text-[#ee6969] hover:text-[#ff9494] hover:bg-[#bb0505]/10 rounded-lg transition-all"
                  >
                    <Trash2 className="w-3 h-3 sm:w-4 sm:h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredFeedback.length === 0 && (
          <div className="text-center py-8 sm:py-12">
            <p className="text-slate-400">No feedback found</p>
          </div>
        )}
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-[#262e49] border border-[#3f4d7f]/30 rounded-2xl p-4 sm:p-6 w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4 sm:mb-6">
              <h2 className="text-xl sm:text-2xl font-bold text-white">
                {modalMode === 'add' ? 'Add Feedback' : 'Edit Feedback'}
              </h2>
              <button onClick={() => setShowModal(false)} className="text-slate-400 hover:text-white p-1">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="space-y-3 sm:space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3 sm:px-4 py-2.5 sm:py-3 bg-[#191f2f]/50 border border-[#3f4d7f]/30 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-[#3f4d7f] text-sm sm:text-base"
                  placeholder="Enter name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Email</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-3 sm:px-4 py-2.5 sm:py-3 bg-[#191f2f]/50 border border-[#3f4d7f]/30 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-[#3f4d7f] text-sm sm:text-base"
                  placeholder="Enter email"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Rating</label>
                <div className="flex gap-1 sm:gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      onClick={() => setFormData({ ...formData, rating: star })}
                      className="p-0.5"
                    >
                      <Star
                        className={`w-6 sm:w-8 h-6 sm:h-8 ${star <= formData.rating ? 'text-yellow-400 fill-yellow-400' : 'text-slate-600'}`}
                      />
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Status</label>
                <select
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value as Feedback['status'] })}
                  className="w-full px-3 sm:px-4 py-2.5 sm:py-3 bg-[#191f2f]/50 border border-[#3f4d7f]/30 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-[#3f4d7f] text-sm sm:text-base"
                >
                  <option value="new">New</option>
                  <option value="read">Read</option>
                  <option value="replied">Replied</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Message</label>
                <textarea
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-3 sm:px-4 py-2.5 sm:py-3 bg-[#191f2f]/50 border border-[#3f4d7f]/30 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-[#3f4d7f] h-24 sm:h-32 resize-none text-sm sm:text-base"
                  placeholder="Enter message"
                />
              </div>
            </div>
            <div className="flex gap-3 mt-4 sm:mt-6">
              <button
                onClick={() => setShowModal(false)}
                className="flex-1 px-4 sm:px-5 py-2.5 bg-[#191f2f] text-white font-medium rounded-xl hover:bg-[#191f2f]/80 transition-all text-sm sm:text-base"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                className="flex-1 px-4 sm:px-5 py-2.5 bg-gradient-to-r from-[#3f4d7f] to-[#3f4d7f]/80 text-white font-medium rounded-xl hover:opacity-90 transition-all flex items-center justify-center gap-2 text-sm sm:text-base"
              >
                {modalMode === 'add' ? <><Plus className="w-4 h-4" /> Add</> : <><Check className="w-4 h-4" /> Save</>}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}