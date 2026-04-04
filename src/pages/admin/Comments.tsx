import { useState } from 'react';
import { Search, Filter, Trash2, Check, X, Reply, ThumbsUp, ThumbsDown, Plus, Clock, X as XIcon } from 'lucide-react';

interface Comment {
  id: number;
  user: string;
  avatar: string;
  content: string;
  post: string;
  date: string;
  status: 'pending' | 'approved' | 'rejected';
  likes: number;
  dislikes: number;
}

const initialComments: Comment[] = [
  { id: 1, user: 'Alex Thompson', avatar: 'AT', content: 'This article provided excellent insights into market trends. Very helpful for our business strategy!', post: 'Growth Strategies for 2024', date: '2024-01-15', status: 'approved', likes: 12, dislikes: 1 },
  { id: 2, user: 'Maria Garcia', avatar: 'MG', content: 'I disagree with some points, but overall a well-written piece.', post: 'Business Analytics Guide', date: '2024-01-14', status: 'pending', likes: 3, dislikes: 2 },
  { id: 3, user: 'David Lee', avatar: 'DL', content: 'Great tips for small businesses. Would love to see more content like this.', post: 'Startup Guide 2024', date: '2024-01-13', status: 'approved', likes: 8, dislikes: 0 },
  { id: 4, user: 'Jennifer Wilson', avatar: 'JW', content: 'Could you elaborate more on the financial planning section?', post: 'Financial Planning Tips', date: '2024-01-12', status: 'pending', likes: 5, dislikes: 0 },
  { id: 5, user: 'Robert Chen', avatar: 'RC', content: 'Not very helpful for our specific industry. Too generic.', post: 'Market Analysis Report', date: '2024-01-11', status: 'rejected', likes: 1, dislikes: 5 },
];

const posts = ['Growth Strategies for 2024', 'Business Analytics Guide', 'Startup Guide 2024', 'Financial Planning Tips', 'Market Analysis Report'];

export default function Comments() {
  const [comments, setComments] = useState<Comment[]>(initialComments);
  const [showModal, setShowModal] = useState(false);
  const [modalMode, setModalMode] = useState<'add' | 'edit' | 'reply'>('add');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  
  const [formData, setFormData] = useState({
    id: 0,
    user: '',
    avatar: '',
    content: '',
    post: posts[0],
    date: '',
    status: 'pending' as Comment['status'],
    likes: 0,
    dislikes: 0,
  });

  const [replyText, setReplyText] = useState('');

  const openAddModal = () => {
    setFormData({
      id: 0,
      user: '',
      avatar: '',
      content: '',
      post: posts[0],
      date: new Date().toISOString().split('T')[0],
      status: 'pending',
      likes: 0,
      dislikes: 0,
    });
    setModalMode('add');
    setShowModal(true);
  };

  const openEditModal = (comment: Comment) => {
    setFormData({ ...comment });
    setModalMode('edit');
    setShowModal(true);
  };

  const openReplyModal = (comment: Comment) => {
    setFormData({ ...comment });
    setReplyText('');
    setModalMode('reply');
    setShowModal(true);
  };

  const handleSubmit = () => {
    if (modalMode === 'add') {
      const newComment: Comment = {
        ...formData,
        id: Date.now(),
        avatar: formData.user.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2),
        date: new Date().toISOString().split('T')[0],
      };
      setComments([newComment, ...comments]);
    } else if (modalMode === 'edit') {
      setComments(comments.map(c => c.id === formData.id ? formData : c));
    }
    setShowModal(false);
  };

  const handleReply = () => {
    const replyComment: Comment = {
      ...formData,
      id: Date.now(),
      user: 'Admin',
      avatar: 'AD',
      content: `Re: ${formData.content}\n\nReply: ${replyText}`,
      status: 'approved',
      likes: 0,
      dislikes: 0,
    };
    setComments([replyComment, ...comments]);
    setShowModal(false);
  };

  const handleDelete = (id: number) => {
    setComments(comments.filter(c => c.id !== id));
  };

  const handleStatusChange = (id: number, status: Comment['status']) => {
    setComments(comments.map(c => c.id === id ? { ...c, status } : c));
  };

  const filteredComments = comments.filter(c => {
    const matchesSearch = c.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         c.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         c.post.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || c.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved': return 'bg-[#bb0505]/20 text-[#ee6969]';
      case 'pending': return 'bg-yellow-500/20 text-yellow-400';
      case 'rejected': return 'bg-red-500/20 text-red-400';
      default: return 'bg-slate-500/20 text-slate-400';
    }
  };

  const pendingCount = comments.filter(c => c.status === 'pending').length;
  const approvedCount = comments.filter(c => c.status === 'approved').length;

  return (
    <div className="space-y-4 sm:space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white">Comments</h1>
          <p className="text-slate-400 mt-1 text-sm sm:text-base">Moderate user comments</p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={openAddModal}
            className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-[#3f4d7f] to-[#3f4d7f]/80 text-white font-medium rounded-xl hover:opacity-90 transition-all text-sm"
          >
            <Plus className="w-4 h-4" />
            Add
          </button>
          <div className="flex items-center gap-2 px-3 py-2 bg-[#262e49]/50 border border-[#3f4d7f]/30 rounded-xl">
            <div className="w-2 h-2 rounded-full bg-yellow-400"></div>
            <span className="text-white text-xs">{pendingCount}</span>
          </div>
          <div className="flex items-center gap-2 px-3 py-2 bg-[#262e49]/50 border border-[#3f4d7f]/30 rounded-xl">
            <div className="w-2 h-2 rounded-full bg-[#ee6969]"></div>
            <span className="text-white text-xs">{approvedCount}</span>
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
              className="w-full pl-10 sm:pl-12 pr-4 py-2.5 bg-[#191f2f]/50 border border-[#3f4d7f]/30 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#3f4d7f] text-sm"
            />
          </div>
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-slate-400" />
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-3 py-2.5 bg-[#191f2f]/50 border border-[#3f4d7f]/30 rounded-xl text-white text-sm focus:outline-none"
            >
              <option value="all">All</option>
              <option value="pending">Pending</option>
              <option value="approved">Approved</option>
              <option value="rejected">Rejected</option>
            </select>
          </div>
        </div>

        <div className="space-y-3 sm:space-y-4">
          {filteredComments.map((comment) => (
            <div key={comment.id} className="p-4 sm:p-5 bg-[#191f2f]/30 rounded-xl hover:bg-[#191f2f]/50 transition-all">
              <div className="flex items-start justify-between gap-2 mb-2 sm:mb-3">
                <div className="flex items-center gap-2 sm:gap-3">
                  <div className="w-8 sm:w-10 h-8 sm:h-10 rounded-full bg-gradient-to-br from-[#3f4d7f] to-[#bb0505] flex items-center justify-center flex-shrink-0">
                    <span className="text-white text-xs sm:text-sm font-medium">{comment.avatar}</span>
                  </div>
                  <div className="min-w-0">
                    <p className="text-white font-medium text-sm truncate">{comment.user}</p>
                    <p className="text-[#3f4d7f] text-xs truncate">{comment.post}</p>
                  </div>
                </div>
                <span className={`px-2 sm:px-3 py-0.5 rounded-full text-xs font-medium ${getStatusColor(comment.status)}`}>
                  {comment.status}
                </span>
              </div>
              <p className="text-slate-300 text-sm mb-3 line-clamp-2">{comment.content}</p>
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                <div className="flex items-center gap-3 sm:gap-4 text-slate-500 text-xs">
                  <div className="flex items-center gap-1">
                    <ThumbsUp className="w-3 h-3" />
                    <span>{comment.likes}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <ThumbsDown className="w-3 h-3" />
                    <span>{comment.dislikes}</span>
                  </div>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3" /> {comment.date}
                  </span>
                </div>
                <div className="flex items-center gap-1">
                  {comment.status === 'pending' && (
                    <>
                      <button
                        onClick={() => handleStatusChange(comment.id, 'approved')}
                        className="p-1.5 text-[#ee6969] hover:text-[#ff9494] hover:bg-[#bb0505]/10 rounded-lg transition-all"
                        title="Approve"
                      >
                        <Check className="w-3 h-3 sm:w-4 sm:h-4" />
                      </button>
                      <button
                        onClick={() => handleStatusChange(comment.id, 'rejected')}
                        className="p-1.5 text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-lg transition-all"
                        title="Reject"
                      >
                        <X className="w-3 h-3 sm:w-4 sm:h-4" />
                      </button>
                    </>
                  )}
                  <button 
                    onClick={() => openReplyModal(comment)}
                    className="p-1.5 text-[#3f4d7f] hover:text-[#3f4d7f]/80 hover:bg-[#3f4d7f]/10 rounded-lg transition-all"
                  >
                    <Reply className="w-3 h-3 sm:w-4 sm:h-4" />
                  </button>
                  <button 
                    onClick={() => openEditModal(comment)}
                    className="p-1.5 text-slate-400 hover:text-white hover:bg-[#3f4d7f]/10 rounded-lg transition-all"
                  >
                    <Plus className="w-3 h-3 sm:w-4 sm:h-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(comment.id)}
                    className="p-1.5 text-[#ee6969] hover:text-[#ff9494] hover:bg-[#bb0505]/10 rounded-lg transition-all"
                  >
                    <Trash2 className="w-3 h-3 sm:w-4 sm:h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredComments.length === 0 && (
          <div className="text-center py-8 sm:py-12">
            <p className="text-slate-400">No comments found</p>
          </div>
        )}
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-[#262e49] border border-[#3f4d7f]/30 rounded-2xl p-4 sm:p-6 w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4 sm:mb-6">
              <h2 className="text-xl sm:text-2xl font-bold text-white">
                {modalMode === 'add' ? 'Add Comment' : modalMode === 'edit' ? 'Edit Comment' : 'Reply'}
              </h2>
              <button onClick={() => setShowModal(false)} className="text-slate-400 hover:text-white p-1">
                <XIcon className="w-5 h-5" />
              </button>
            </div>
            
            {modalMode === 'reply' ? (
              <div className="space-y-3 sm:space-y-4">
                <div className="p-3 sm:p-4 bg-[#191f2f]/50 rounded-xl">
                  <p className="text-slate-400 text-xs sm:text-sm mb-1">Original:</p>
                  <p className="text-white text-sm">{formData.content}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">Reply</label>
                  <textarea
                    value={replyText}
                    onChange={(e) => setReplyText(e.target.value)}
                    className="w-full px-3 sm:px-4 py-2.5 bg-[#191f2f]/50 border border-[#3f4d7f]/30 rounded-xl text-white h-24 sm:h-32 resize-none text-sm"
                    placeholder="Type reply..."
                  />
                </div>
                <div className="flex gap-3 mt-4 sm:mt-6">
                  <button
                    onClick={() => setShowModal(false)}
                    className="flex-1 px-4 py-2.5 bg-[#191f2f] text-white font-medium rounded-xl text-sm"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleReply}
                    className="flex-1 px-4 py-2.5 bg-gradient-to-r from-[#bb0505] to-[#ee6969] text-white font-medium rounded-xl text-sm"
                  >
                    Send
                  </button>
                </div>
              </div>
            ) : (
              <div className="space-y-3 sm:space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">User</label>
                  <input
                    type="text"
                    value={formData.user}
                    onChange={(e) => setFormData({ ...formData, user: e.target.value })}
                    className="w-full px-3 sm:px-4 py-2.5 bg-[#191f2f]/50 border border-[#3f4d7f]/30 rounded-xl text-white text-sm"
                    placeholder="User name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">Post</label>
                  <select
                    value={formData.post}
                    onChange={(e) => setFormData({ ...formData, post: e.target.value })}
                    className="w-full px-3 sm:px-4 py-2.5 bg-[#191f2f]/50 border border-[#3f4d7f]/30 rounded-xl text-white text-sm"
                  >
                    {posts.map(post => (
                      <option key={post} value={post}>{post}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">Status</label>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value as Comment['status'] })}
                    className="w-full px-3 sm:px-4 py-2.5 bg-[#191f2f]/50 border border-[#3f4d7f]/30 rounded-xl text-white text-sm"
                  >
                    <option value="pending">Pending</option>
                    <option value="approved">Approved</option>
                    <option value="rejected">Rejected</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">Comment</label>
                  <textarea
                    value={formData.content}
                    onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                    className="w-full px-3 sm:px-4 py-2.5 bg-[#191f2f]/50 border border-[#3f4d7f]/30 rounded-xl text-white h-24 sm:h-32 resize-none text-sm"
                    placeholder="Comment"
                  />
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
                    className="flex-1 px-4 py-2.5 bg-gradient-to-r from-[#3f4d7f] to-[#3f4d7f]/80 text-white font-medium rounded-xl text-sm"
                  >
                    {modalMode === 'add' ? 'Add' : 'Save'}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}