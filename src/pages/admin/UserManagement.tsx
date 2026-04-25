import { useState } from 'react';
import { Plus, Search, Trash2, Edit, X, Check, User, Mail, Key, ShieldCheck } from 'lucide-react';
import { 
  useGetUsersQuery, 
  useCreateUserMutation, 
  useUpdateUserMutation, 
  useDeleteUserMutation,
  type TUser
} from '../../store/api';

export default function UserManagement() {
  const { data: users = [], isLoading } = useGetUsersQuery();
  const [createUser] = useCreateUserMutation();
  const [updateUser] = useUpdateUserMutation();
  const [deleteUser] = useDeleteUserMutation();

  const [showModal, setShowModal] = useState(false);
  const [modalMode, setModalMode] = useState<'add' | 'edit'>('add');
  const [searchTerm, setSearchTerm] = useState('');
  
  const [formData, setFormData] = useState<Partial<TUser>>({
    username: '',
    email: '',
    password: '',
    is_admin_user: true
  });

  const openAddModal = () => {
    setFormData({
      username: '',
      email: '',
      password: '',
      is_admin_user: true
    });
    setModalMode('add');
    setShowModal(true);
  };

  const openEditModal = (user: TUser) => {
    setFormData({ ...user, password: '' }); // Don't show password
    setModalMode('edit');
    setShowModal(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (modalMode === 'add') {
        await createUser(formData).unwrap();
      } else {
        await updateUser(formData as TUser).unwrap();
      }
      setShowModal(false);
    } catch (err) {
      console.error('Failed to save user:', err);
    }
  };

  const handleDelete = async (id: number) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        await deleteUser(id).unwrap();
      } catch (err) {
        console.error('Failed to delete user:', err);
      }
    }
  };

  const filteredUsers = users.filter(user => 
    user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white tracking-tight">User Management</h1>
          <p className="text-slate-400 mt-1">Manage administrative access and user accounts.</p>
        </div>
        <button
          onClick={openAddModal}
          className="flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-accent-500 to-accent-600 text-white font-bold rounded-xl hover:shadow-lg hover:shadow-accent-500/20 transition-all text-sm group"
        >
          <Plus className="w-5 h-5 group-hover:rotate-90 transition-transform" />
          Add User
        </button>
      </div>

      <div className="relative group max-w-md">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500 group-focus-within:text-accent-400 transition-colors" />
        <input
          type="text"
          placeholder="Search users..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-12 pr-4 py-3 bg-[#1e253a] border border-[#3f4d7f]/30 rounded-xl text-white text-sm focus:border-accent-500/50 outline-none transition-all"
        />
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center py-20">
          <div className="w-8 h-8 border-4 border-accent-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : (
        <div className="bg-[#262e49]/50 backdrop-blur-sm border border-[#3f4d7f]/30 rounded-2xl overflow-hidden shadow-2xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-[#3f4d7f]/30 bg-white/5">
                  <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-slate-400">User</th>
                  <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-slate-400">Email Address</th>
                  <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-slate-400 text-center">Status</th>
                  <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-slate-400 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#3f4d7f]/20">
                {filteredUsers.map((user) => (
                  <tr key={user.id} className="hover:bg-white/5 transition-colors group">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#3f4d7f] to-[#bb0505]/20 flex items-center justify-center border border-white/10 group-hover:scale-105 transition-transform">
                          <User className="w-5 h-5 text-white" />
                        </div>
                        <span className="font-bold text-white text-base">{user.username}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-2 text-slate-400 group-hover:text-white transition-colors">
                        <Mail className="w-4 h-4 text-accent-500/50" />
                        <span className="text-sm font-medium">{user.email}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-center">
                      {user.is_admin_user ? (
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-accent-500/10 border border-accent-500/30 rounded-full text-xs font-bold text-accent-400 uppercase tracking-wide">
                          <ShieldCheck className="w-3.5 h-3.5" />
                          Admin
                        </span>
                      ) : (
                        <span className="inline-flex items-center px-3 py-1 bg-white/5 border border-white/10 rounded-full text-xs font-bold text-slate-500 uppercase tracking-wide">
                          Member
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button 
                          onClick={() => openEditModal(user)}
                          className="p-2 text-slate-400 hover:text-white hover:bg-accent-500 rounded-lg transition-all"
                          title="Edit User"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button 
                          onClick={() => handleDelete(user.id!)}
                          className="p-2 text-slate-400 hover:text-red-400 hover:bg-red-500/20 rounded-lg transition-all"
                          title="Delete User"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {filteredUsers.length === 0 && (
            <div className="py-20 text-center">
              <div className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-white/10">
                <Search className="w-8 h-8 text-slate-600" />
              </div>
              <h3 className="text-white font-bold text-lg">No users found</h3>
              <p className="text-slate-500 text-sm">Try adjusting your search criteria</p>
            </div>
          )}
        </div>
      )}

      {showModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center z-50 p-4">
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-[#1e253a] border border-[#3f4d7f]/50 rounded-3xl w-full max-w-lg shadow-2xl overflow-hidden"
          >
            <div className="p-6 border-b border-[#3f4d7f]/30 flex items-center justify-between bg-[#262e49]/50">
              <h2 className="text-2xl font-bold text-white">{modalMode === 'add' ? 'Add New User' : 'Edit User'}</h2>
              <button onClick={() => setShowModal(false)} className="p-2 text-slate-400 hover:text-white hover:bg-white/10 rounded-full transition-all">
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="p-8 space-y-6">
              <div className="space-y-4">
                <div className="relative group">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500 group-focus-within:text-accent-400 transition-colors" />
                  <input
                    type="text"
                    required
                    placeholder="Username"
                    value={formData.username}
                    onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                    className="w-full pl-12 pr-4 py-3 bg-[#131926] border border-[#3f4d7f]/30 rounded-xl text-white text-sm focus:border-accent-500/50 outline-none transition-all"
                  />
                </div>

                <div className="relative group">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500 group-focus-within:text-accent-400 transition-colors" />
                  <input
                    type="email"
                    required
                    placeholder="Email Address"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full pl-12 pr-4 py-3 bg-[#131926] border border-[#3f4d7f]/30 rounded-xl text-white text-sm focus:border-accent-500/50 outline-none transition-all"
                  />
                </div>

                <div className="relative group">
                  <Key className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500 group-focus-within:text-accent-400 transition-colors" />
                  <input
                    type="password"
                    required={modalMode === 'add'}
                    placeholder={modalMode === 'edit' ? "Leave blank to keep current password" : "Password"}
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    className="w-full pl-12 pr-4 py-3 bg-[#131926] border border-[#3f4d7f]/30 rounded-xl text-white text-sm focus:border-accent-500/50 outline-none transition-all"
                  />
                </div>

                <label className="flex items-center gap-3 p-4 bg-[#131926] border border-[#3f4d7f]/30 rounded-xl cursor-pointer hover:bg-[#1a2133] transition-all group">
                  <div className="flex-1">
                    <p className="text-sm font-bold text-white group-hover:text-accent-400 transition-colors">Admin Privileges</p>
                    <p className="text-xs text-slate-500 mt-0.5">Grant full administrative access to the dashboard.</p>
                  </div>
                  <div className={`w-12 h-6 rounded-full relative transition-all duration-300 ${formData.is_admin_user ? 'bg-accent-500' : 'bg-slate-700'}`}>
                    <input
                      type="checkbox"
                      className="hidden"
                      checked={formData.is_admin_user}
                      onChange={(e) => setFormData({ ...formData, is_admin_user: e.target.checked })}
                    />
                    <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all duration-300 ${formData.is_admin_user ? 'left-7' : 'left-1'}`} />
                  </div>
                </label>
              </div>

              <div className="flex gap-4 pt-4">
                <button 
                  type="button"
                  onClick={() => setShowModal(false)} 
                  className="flex-1 px-6 py-3 bg-white/5 text-white font-bold rounded-xl hover:bg-white/10 transition-all"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  className="flex-[2] px-6 py-3 bg-gradient-to-r from-accent-500 to-accent-600 text-white font-bold rounded-xl shadow-lg shadow-accent-500/20 flex items-center justify-center gap-2 hover:opacity-90 transition-all"
                >
                  <Check className="w-5 h-5" />
                  {modalMode === 'add' ? 'Create User' : 'Save Changes'}
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  );
}
import { motion } from 'framer-motion';
