import React, { useState } from 'react';
import { useCreator } from '../../context/CreatorContext';
import { useNotification } from '../../context/NotificationContext';
import { DashboardLayout } from '../../components/layout/DashboardLayout';
import { Card } from '../../components/common/Card';
import { Input } from '../../components/common/Input';
import { Button } from '../../components/common/Button';
import { Modal } from '../../components/common/Modal';
import { Plus, Trash2, ExternalLink } from 'lucide-react';

export const Portfolio = () => {
  const { profile, addPortfolioItem, deletePortfolioItem } = useCreator();
  const { addToast } = useNotification();

  const [isOpen, setIsOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [url, setUrl] = useState('');
  const [category, setCategory] = useState('Video');
  const [thumbnail, setThumbnail] = useState('');
  const [loading, setLoading] = useState(false);

  const handleAdd = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await addPortfolioItem({
        title,
        description,
        url,
        category,
        thumbnail: thumbnail || 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=600&auto=format&fit=crop&q=80'
      });
      addToast('Item Added', 'Portfolio showcase updated.', 'success');
      setIsOpen(false);
      setTitle('');
      setDescription('');
      setUrl('');
      setThumbnail('');
    } catch (err) {
      addToast('Error', err.message, 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deletePortfolioItem(id);
      addToast('Item Removed', 'Portfolio item deleted.', 'info');
    } catch (err) {
      addToast('Error', err.message, 'error');
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Portfolio Manager</h1>
            <p className="text-xs text-slate-500 mt-1">Showcase your top content, sponsorships, and projects</p>
          </div>
          <Button variant="primary" size="sm" onClick={() => setIsOpen(true)} className="gap-2">
            <Plus className="w-4 h-4" /> Add Item
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {profile?.portfolio_items?.map((item) => (
            <Card key={item.id} className="p-0 overflow-hidden flex flex-col justify-between">
              <div>
                <img src={item.thumbnail} alt={item.title} className="w-full h-40 object-cover" />
                <div className="p-5">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-brand-purple bg-brand-purple/10 px-2.5 py-0.5 rounded-full">
                    {item.category}
                  </span>
                  <h3 className="font-bold text-slate-900 dark:text-white text-base mt-2">{item.title}</h3>
                  <p className="text-xs text-slate-500 mt-1 leading-relaxed">{item.description}</p>
                </div>
              </div>
              <div className="p-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                {item.url ? (
                  <a href={item.url} target="_blank" rel="noreferrer" className="text-xs text-brand-lavender font-semibold flex items-center hover:underline">
                    View Link <ExternalLink className="w-3 h-3 ml-1" />
                  </a>
                ) : <span />}
                <button
                  onClick={() => handleDelete(item.id)}
                  className="text-slate-400 hover:text-red-500 p-1 rounded transition-colors"
                  title="Delete item"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </Card>
          ))}
        </div>

        <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} title="Add Portfolio Project">
          <form onSubmit={handleAdd} className="space-y-4">
            <Input
              label="Project Title"
              required
              placeholder="e.g. Creator Economy Documentary"
              value={title}
              onChange={e => setTitle(e.target.value)}
            />
            <div className="space-y-1.5">
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-200">Category</label>
              <select
                className="w-full px-3.5 py-2 text-sm bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-lg focus:outline-none focus:border-brand-purple"
                value={category}
                onChange={e => setCategory(e.target.value)}
              >
                <option value="Video">Video</option>
                <option value="Article/Blog">Article / Blog</option>
                <option value="Sponsorship/Brand">Sponsorship / Brand Deal</option>
                <option value="Podcast">Podcast</option>
                <option value="Digital Product">Digital Product</option>
              </select>
            </div>
            <Input
              label="Link / URL"
              placeholder="https://..."
              value={url}
              onChange={e => setUrl(e.target.value)}
            />
            <Input
              label="Thumbnail Image URL"
              placeholder="https://images.unsplash.com/..."
              value={thumbnail}
              onChange={e => setThumbnail(e.target.value)}
            />
            <div className="space-y-1.5">
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-200">Description</label>
              <textarea
                rows="3"
                className="w-full px-3.5 py-2 text-sm bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-lg focus:outline-none focus:border-brand-purple"
                placeholder="Key stats, reach, or project highlights"
                value={description}
                onChange={e => setDescription(e.target.value)}
              />
            </div>
            <div className="flex justify-end gap-3 pt-2">
              <Button variant="outline" type="button" onClick={() => setIsOpen(false)}>Cancel</Button>
              <Button variant="primary" type="submit" disabled={loading}>
                {loading ? 'Adding...' : 'Add Project'}
              </Button>
            </div>
          </form>
        </Modal>
      </div>
    </DashboardLayout>
  );
};
