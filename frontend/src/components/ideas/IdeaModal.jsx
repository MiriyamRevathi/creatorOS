import React, { useState, useEffect } from 'react';
import { Modal } from '../common/Modal';
import { Button } from '../common/Button';
import { X, Plus } from 'lucide-react';

const CONTENT_TYPES = [
  'Video',
  'Short',
  'Reel',
  'Post',
  'Blog',
  'Podcast',
  'Newsletter',
  'Other',
];

const PRIORITIES = ['Low', 'Medium', 'High', 'Urgent'];
const STATUSES = ['Backlog', 'Planned', 'In Progress', 'Published', 'Archived'];

export function IdeaModal({ isOpen, onClose, onSave, initialIdea = null, loading = false }) {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    content_type: 'Video',
    priority: 'Medium',
    status: 'Backlog',
    target_date: '',
    tags: [],
  });

  const [tagInput, setTagInput] = useState('');
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (initialIdea) {
      setFormData({
        title: initialIdea.title || '',
        description: initialIdea.description || '',
        content_type: initialIdea.content_type || 'Video',
        priority: initialIdea.priority || 'Medium',
        status: initialIdea.status || 'Backlog',
        target_date: initialIdea.target_date || '',
        tags: Array.isArray(initialIdea.tags) ? [...initialIdea.tags] : [],
      });
    } else {
      setFormData({
        title: '',
        description: '',
        content_type: 'Video',
        priority: 'Medium',
        status: 'Backlog',
        target_date: '',
        tags: [],
      });
    }
    setErrors({});
    setTagInput('');
  }, [initialIdea, isOpen]);

  const validate = () => {
    const errs = {};
    if (!formData.title.trim()) {
      errs.title = 'Title is required';
    } else if (formData.title.trim().length > 200) {
      errs.title = 'Title cannot exceed 200 characters';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleAddTag = () => {
    const cleaned = tagInput.trim().replace(/^#/, '');
    if (cleaned && !formData.tags.includes(cleaned)) {
      setFormData((prev) => ({
        ...prev,
        tags: [...prev.tags, cleaned],
      }));
      setTagInput('');
    }
  };

  const handleRemoveTag = (tagToRemove) => {
    setFormData((prev) => ({
      ...prev,
      tags: prev.tags.filter((t) => t !== tagToRemove),
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    onSave(formData);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={initialIdea ? 'Edit Content Idea' : 'Capture New Idea'}
      maxWidth="max-w-xl"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Title */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">
            Idea Title <span className="text-rose-500">*</span>
          </label>
          <input
            type="text"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            placeholder="e.g. 5 Mistakes Beginners Make with Next.js in 2026"
            className={`w-full px-3 py-2 text-sm bg-white border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#412653] transition-all ${
              errors.title ? 'border-rose-300 ring-rose-200' : 'border-slate-300'
            }`}
          />
          {errors.title && <p className="mt-1 text-xs text-rose-500">{errors.title}</p>}
        </div>

        {/* Description / Notes */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">
            Description & Brainstorming Notes
          </label>
          <textarea
            rows={3}
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            placeholder="Key talking points, angle, target audience, hooks..."
            className="w-full px-3 py-2 text-sm bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#412653] transition-all"
          />
        </div>

        {/* Content Type & Priority */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Content Type
            </label>
            <select
              value={formData.content_type}
              onChange={(e) => setFormData({ ...formData, content_type: e.target.value })}
              className="w-full px-3 py-2 text-sm bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#412653]"
            >
              {CONTENT_TYPES.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Priority
            </label>
            <select
              value={formData.priority}
              onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
              className="w-full px-3 py-2 text-sm bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#412653]"
            >
              {PRIORITIES.map((pri) => (
                <option key={pri} value={pri}>
                  {pri}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Status & Target Date */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Status
            </label>
            <select
              value={formData.status}
              onChange={(e) => setFormData({ ...formData, status: e.target.value })}
              className="w-full px-3 py-2 text-sm bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#412653]"
            >
              {STATUSES.map((st) => (
                <option key={st} value={st}>
                  {st}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Target / Publish Date (Optional)
            </label>
            <input
              type="date"
              value={formData.target_date}
              onChange={(e) => setFormData({ ...formData, target_date: e.target.value })}
              className="w-full px-3 py-2 text-sm bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#412653]"
            />
          </div>
        </div>

        {/* Tags */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">
            Tags & Keywords
          </label>
          <div className="flex gap-2">
            <input
              type="text"
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  handleAddTag();
                }
              }}
              placeholder="Add tag and press Enter"
              className="flex-1 px-3 py-1.5 text-xs bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#412653]"
            />
            <Button variant="outline" size="sm" onClick={handleAddTag}>
              <Plus className="h-3.5 w-3.5" />
              <span>Add</span>
            </Button>
          </div>

          {formData.tags.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mt-2.5">
              {formData.tags.map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center gap-1 text-xs font-medium bg-[#f4eef7] text-[#412653] px-2 py-0.5 rounded-full"
                >
                  #{tag}
                  <button
                    type="button"
                    onClick={() => handleRemoveTag(tag)}
                    className="hover:text-rose-600 ml-0.5"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
          <Button variant="outline" size="sm" onClick={onClose} disabled={loading}>
            Cancel
          </Button>
          <Button variant="primary" size="sm" type="submit" loading={loading}>
            {initialIdea ? 'Save Changes' : 'Create Idea'}
          </Button>
        </div>
      </form>
    </Modal>
  );
}
