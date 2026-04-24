import { useState } from 'react';
import { Search, Filter, Trash2, Check, X, Reply, ThumbsUp, ThumbsDown, Plus, Clock, X as XIcon } from 'lucide-react';

import { useGetCommentsQuery, useUpdateCommentMutation, useCreateCommentMutation, useDeleteCommentMutation, type TComment } from '../../store/api';

// const posts = ['Growth Strategies for 2024', 'Business Analytics Guide', 'Startup Guide 2024', 'Financial Planning Tips', 'Market Analysis Report'];

export default function Comments() {
  const { data: comments = [] } = useGetCommentsQuery();
  const [createComment] = useCreateCommentMutation();
  const [updateComment] = useUpdateCommentMutation();
  const [deleteComment] = useDeleteCommentMutation();
  const [showModal, setShowModal] = useState(false);
  const [modalMode, setModalMode] = useState<'add' | 'edit' | 'reply'>('add');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  
  const [formData, setFormData] = useState<Partial<TComment>>({
    id: 0,
    user: '',
    comment: '',
    post: 1,
    createdAt: '',
    status: 'pending',
  });

  const [replyText, setReplyText] = useState('');

  const openAddModal = () => {
    setFormData({
      id: 0,
      user: '',
      comment: '',
      post: 1,
      createdAt: new Date().toISOString().split('T')[0],
      status: 'pending',
    });
    setModalMode('add');
    setShowModal(true);
  };

  const openEditModal = (comment: TComment) => {
    setFormData({ ...comment });
    setModalMode('edit');
    setShowModal(true);
  };

  const openReplyModal = (comment: TComment) => {
    setFormData({ ...comment });
    setReplyText('');
    setModalMode('reply');
    setShowModal(true);
  };

  const handleSubmit = async () => {
    if (modalMode === 'add') {
      const newComment = {
        ...formData,
        createdAt: new Date().toISOString().split('T')[0],
      };
      await createComment(newComment);
    } else if (modalMode === 'edit') {
      await updateComment(formData as TComment);
    }
    setShowModal(false);
  };

  const handleReply = async () => {
    const replyComment = {
      ...formData,
      user: 'Admin',
      comment: `Re: ${formData.comment}\n\nReply: ${replyText}`,
      status: 'approved' as const,
    };
    await createComment(replyComment);
    setShowModal(false);
  };

  const handleDelete = async (id: number) => {
    await deleteComment(id);
  };

  const handleStatusChange = async (comment: TComment, status: TComment['status']) => {
    await updateComment({ ...comment, status });
  };

  const filteredComments = comments.filter(c => {
    const matchesSearch = (c.fullName || c.user || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
                         c.comment.toLowerCase().includes(searchTerm.toLowerCase());
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
                    <span className="text-white text-xs sm:text-sm font-medium">{(comment.fullName || comment.user || 'Anonymous').split(' ').map(n=>n[0]).join('').toUpperCase().slice(0, 2)}</span>
                  </div>
                  <div className="min-w-0">
                    <p className="text-white font-medium text-sm truncate">{comment.fullName || comment.user || 'Anonymous'}</p>
                    <p className="text-[#3f4d7f] text-xs truncate">{comment.email || (comment.post ? `Post ID: ${comment.post}` : 'Contact Request')}</p>
                    {comment.Company && <p className="text-accent-400 text-[10px] font-bold uppercase tracking-widest mt-0.5">{comment.Company}</p>}
                  </div>
                </div>
                <span className={`px-2 sm:px-3 py-0.5 rounded-full text-xs font-medium ${getStatusColor(comment.status)}`}>
                  {comment.status}
                </span>
              </div>
              <p className="text-slate-300 text-sm mb-3 line-clamp-2">{comment.comment}</p>
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                <div className="flex items-center gap-3 sm:gap-4 text-slate-500 text-xs">
                  <div className="flex items-center gap-1">
                    <ThumbsUp className="w-3 h-3" />
                    <span>0</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <ThumbsDown className="w-3 h-3" />
                    <span>0</span>
                  </div>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3" /> {comment.createdAt ? new Date(comment.createdAt).toLocaleDateString() : ''}
                  </span>
                </div>
                <div className="flex items-center gap-1">
                  {comment.status === 'pending' && (
                    <>
                      <button
                        onClick={() => handleStatusChange(comment, 'approved')}
                        className="p-1.5 text-[#ee6969] hover:text-[#ff9494] hover:bg-[#bb0505]/10 rounded-lg transition-all"
                        title="Approve"
                      >
                        <Check className="w-3 h-3 sm:w-4 sm:h-4" />
                      </button>
                      <button
                        onClick={() => handleStatusChange(comment, 'rejected')}
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
                  <p className="text-white text-sm">{formData.comment}</p>
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
                  <label className="block text-sm font-medium text-slate-300 mb-2">Post ID</label>
                  <input
                    type="number"
                    value={formData.post}
                    onChange={(e) => setFormData({ ...formData, post: parseInt(e.target.value) || 1 })}
                    className="w-full px-3 sm:px-4 py-2.5 bg-[#191f2f]/50 border border-[#3f4d7f]/30 rounded-xl text-white text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">Status</label>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value as TComment['status'] })}
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
                    value={formData.comment}
                    onChange={(e) => setFormData({ ...formData, comment: e.target.value })}
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