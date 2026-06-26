import { useState } from 'react';
import { Plus, Pencil, Trash2, ExternalLink, ToggleLeft, ToggleRight, X } from 'lucide-react';
import {
  useGetSocialLinksQuery,
  useCreateSocialLinkMutation,
  useUpdateSocialLinkMutation,
  useDeleteSocialLinkMutation,
  TSocialLink,
} from '../../store/api';

const ICON_OPTIONS = [
  { value: 'linkedin',  label: 'LinkedIn' },
  { value: 'twitter',   label: 'Twitter / X' },
  { value: 'facebook',  label: 'Facebook' },
  { value: 'instagram', label: 'Instagram' },
  { value: 'youtube',   label: 'YouTube' },
  { value: 'tiktok',    label: 'TikTok' },
  { value: 'github',    label: 'GitHub' },
  { value: 'telegram',  label: 'Telegram' },
];

const EMPTY: Partial<TSocialLink> = { icon: 'linkedin', url: '', label: '', order: 0, isActive: true };

export default function SocialLinksManagement() {
  const { data: links = [], isLoading } = useGetSocialLinksQuery();
  const [createLink] = useCreateSocialLinkMutation();
  const [updateLink] = useUpdateSocialLinkMutation();
  const [deleteLink] = useDeleteSocialLinkMutation();

  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState<TSocialLink | null>(null);
  const [form, setForm] = useState<Partial<TSocialLink>>(EMPTY);
  const [saving, setSaving] = useState(false);
  const [deletingId, setDeletingId] = useState<number | null>(null);

  const openCreate = () => {
    setEditing(null);
    setForm(EMPTY);
    setShowModal(true);
  };

  const openEdit = (link: TSocialLink) => {
    setEditing(link);
    setForm({ ...link });
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditing(null);
    setForm(EMPTY);
  };

  const handleSave = async () => {
    if (!form.url) return;
    setSaving(true);
    try {
      if (editing?.id) {
        await updateLink({ ...editing, ...form } as TSocialLink).unwrap();
      } else {
        await createLink(form).unwrap();
      }
      closeModal();
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Delete this social link?')) return;
    setDeletingId(id);
    try { await deleteLink(id).unwrap(); } finally { setDeletingId(null); }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white">Social Links</h1>
          <p className="text-slate-400 mt-1 text-sm">Manage social media icons shown in the footer.</p>
        </div>
        <button
          onClick={openCreate}
          className="flex items-center gap-2 bg-[#3f4d7f] hover:bg-[#3f4d7f]/80 text-white px-4 py-2 rounded-xl text-sm font-medium transition-all"
        >
          <Plus className="w-4 h-4" /> Add Link
        </button>
      </div>

      {isLoading ? (
        <div className="text-slate-400 text-center py-12">Loading…</div>
      ) : links.length === 0 ? (
        <div className="bg-[#262e49]/50 border border-[#3f4d7f]/30 rounded-2xl p-12 text-center text-slate-400">
          No social links yet. Click <strong className="text-white">Add Link</strong> to get started.
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {links.map(link => (
            <div
              key={link.id}
              className="bg-[#262e49]/50 border border-[#3f4d7f]/30 rounded-2xl p-5 flex flex-col gap-3"
            >
              <div className="flex items-center justify-between">
                <span className="px-3 py-1 rounded-full bg-[#3f4d7f]/30 text-white text-xs font-semibold uppercase tracking-wider">
                  {link.icon}
                </span>
                <span className={`flex items-center gap-1 text-xs ${link.isActive ? 'text-green-400' : 'text-slate-500'}`}>
                  {link.isActive ? <ToggleRight className="w-4 h-4" /> : <ToggleLeft className="w-4 h-4" />}
                  {link.isActive ? 'Active' : 'Inactive'}
                </span>
              </div>

              {link.label && <p className="text-white font-medium text-sm">{link.label}</p>}

              <a
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 text-[#3f4d7f] hover:text-accent-400 text-xs truncate transition-colors"
              >
                <ExternalLink className="w-3 h-3 flex-shrink-0" />
                {link.url}
              </a>

              <div className="flex items-center gap-2 pt-1 border-t border-white/10">
                <button
                  onClick={() => openEdit(link)}
                  className="flex-1 flex items-center justify-center gap-1 py-1.5 rounded-lg bg-[#3f4d7f]/20 hover:bg-[#3f4d7f]/40 text-white text-xs transition-all"
                >
                  <Pencil className="w-3 h-3" /> Edit
                </button>
                <button
                  onClick={() => handleDelete(link.id!)}
                  disabled={deletingId === link.id}
                  className="flex-1 flex items-center justify-center gap-1 py-1.5 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 text-xs transition-all disabled:opacity-50"
                >
                  <Trash2 className="w-3 h-3" />
                  {deletingId === link.id ? 'Deleting…' : 'Delete'}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
          <div className="bg-[#1a2035] border border-[#3f4d7f]/40 rounded-2xl w-full max-w-md shadow-2xl">
            <div className="flex items-center justify-between px-6 pt-6 pb-4 border-b border-white/10">
              <h2 className="text-lg font-bold text-white">{editing ? 'Edit Social Link' : 'Add Social Link'}</h2>
              <button onClick={closeModal} className="text-slate-400 hover:text-white transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="px-6 py-5 space-y-4">
              {/* Icon */}
              <div>
                <label className="block text-slate-400 text-xs mb-1.5 font-medium uppercase tracking-wider">Platform / Icon</label>
                <select
                  value={form.icon}
                  onChange={e => setForm(f => ({ ...f, icon: e.target.value }))}
                  className="w-full bg-[#262e49] border border-[#3f4d7f]/40 text-white rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[#3f4d7f]"
                >
                  {ICON_OPTIONS.map(o => (
                    <option key={o.value} value={o.value}>{o.label}</option>
                  ))}
                </select>
              </div>

              {/* URL */}
              <div>
                <label className="block text-slate-400 text-xs mb-1.5 font-medium uppercase tracking-wider">URL *</label>
                <input
                  type="url"
                  placeholder="https://linkedin.com/company/..."
                  value={form.url ?? ''}
                  onChange={e => setForm(f => ({ ...f, url: e.target.value }))}
                  className="w-full bg-[#262e49] border border-[#3f4d7f]/40 text-white rounded-xl px-4 py-2.5 text-sm placeholder-slate-500 focus:outline-none focus:border-[#3f4d7f]"
                />
              </div>

              {/* Label */}
              <div>
                <label className="block text-slate-400 text-xs mb-1.5 font-medium uppercase tracking-wider">Label (optional)</label>
                <input
                  type="text"
                  placeholder="Follow us on LinkedIn"
                  value={form.label ?? ''}
                  onChange={e => setForm(f => ({ ...f, label: e.target.value }))}
                  className="w-full bg-[#262e49] border border-[#3f4d7f]/40 text-white rounded-xl px-4 py-2.5 text-sm placeholder-slate-500 focus:outline-none focus:border-[#3f4d7f]"
                />
              </div>

              {/* Order */}
              <div>
                <label className="block text-slate-400 text-xs mb-1.5 font-medium uppercase tracking-wider">Display Order</label>
                <input
                  type="number"
                  min={0}
                  value={form.order ?? 0}
                  onChange={e => setForm(f => ({ ...f, order: Number(e.target.value) }))}
                  className="w-full bg-[#262e49] border border-[#3f4d7f]/40 text-white rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[#3f4d7f]"
                />
              </div>

              {/* Active */}
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setForm(f => ({ ...f, isActive: !f.isActive }))}
                  className={`w-10 h-6 rounded-full transition-colors ${form.isActive ? 'bg-green-500' : 'bg-slate-600'}`}
                >
                  <span className={`block w-4 h-4 bg-white rounded-full mx-1 transition-transform ${form.isActive ? 'translate-x-4' : ''}`} />
                </button>
                <span className="text-white text-sm">{form.isActive ? 'Active (shown in footer)' : 'Inactive (hidden)'}</span>
              </div>
            </div>

            <div className="flex gap-3 px-6 pb-6">
              <button
                onClick={closeModal}
                className="flex-1 py-2.5 rounded-xl border border-white/20 text-slate-300 text-sm hover:bg-white/5 transition-all"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                disabled={saving || !form.url}
                className="flex-1 py-2.5 rounded-xl bg-[#3f4d7f] hover:bg-[#3f4d7f]/80 text-white text-sm font-semibold transition-all disabled:opacity-50"
              >
                {saving ? 'Saving…' : editing ? 'Save Changes' : 'Add Link'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
