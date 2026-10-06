import React, { useState, useEffect, useCallback } from 'react';
import { ideasService } from '../services/ideasService';
import { IdeaCard } from '../components/ideas/IdeaCard';
import { IdeasKanban } from '../components/ideas/IdeasKanban';
import { IdeasFilterBar } from '../components/ideas/IdeasFilterBar';
import { IdeaModal } from '../components/ideas/IdeaModal';
import { ConfirmDialog } from '../components/common/ConfirmDialog';
import { EmptyState } from '../components/common/EmptyState';
import { Lightbulb, Plus, Sparkles, Clock, CheckCircle2, ListTodo } from 'lucide-react';
import { Button } from '../components/common/Button';

export function IdeasPage({ onConvertIdeaToStudio }) {
  const [ideas, setIdeas] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Filters state
  const [filters, setFilters] = useState({
    search: '',
    status: 'All',
    content_type: 'All',
    priority: 'All',
    sort_by: 'created_at',
    sort_order: 'desc',
  });

  const [viewMode, setViewMode] = useState('kanban'); // 'kanban' or 'grid'

  // Modals state
  const [modalOpen, setModalOpen] = useState(false);
  const [editingIdea, setEditingIdea] = useState(null);
  const [modalLoading, setModalLoading] = useState(false);

  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [ideaToDelete, setIdeaToDelete] = useState(null);
  const [deleteLoading, setDeleteLoading] = useState(false);

  // Load data
  const loadIdeas = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const [data, statsData] = await Promise.all([
        ideasService.getIdeas(filters),
        ideasService.getStats(),
      ]);
      setIdeas(data);
      setStats(statsData);
    } catch (err) {
      setError(err.message || 'Failed to load content ideas');
    } finally {
      setLoading(false);
    }
  }, [filters]);

  useEffect(() => {
    loadIdeas();
  }, [loadIdeas]);

  // Handlers
  const handleOpenCreateModal = (defaultStatus = 'Backlog') => {
    setEditingIdea(defaultStatus ? { status: defaultStatus } : null);
    setModalOpen(true);
  };

  const handleOpenEditModal = (idea) => {
    setEditingIdea(idea);
    setModalOpen(true);
  };

  const handleSaveIdea = async (formData) => {
    try {
      setModalLoading(true);
      if (editingIdea && editingIdea.id) {
        await ideasService.updateIdea(editingIdea.id, formData);
      } else {
        await ideasService.createIdea(formData);
      }
      setModalOpen(false);
      setEditingIdea(null);
      await loadIdeas();
    } catch (err) {
      alert(`Save error: ${err.message}`);
    } finally {
      setModalLoading(false);
    }
  };

  const handleDeletePrompt = (idea) => {
    setIdeaToDelete(idea);
    setDeleteConfirmOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!ideaToDelete) return;
    try {
      setDeleteLoading(true);
      await ideasService.deleteIdea(ideaToDelete.id);
      setDeleteConfirmOpen(false);
      setIdeaToDelete(null);
      await loadIdeas();
    } catch (err) {
      alert(`Delete error: ${err.message}`);
    } finally {
      setDeleteLoading(false);
    }
  };

  const handleConvertIdea = (idea) => {
    if (onConvertIdeaToStudio) {
      onConvertIdeaToStudio(idea);
    }
  };

  return (
    <div className="p-8 space-y-6 max-w-7xl mx-auto">
      {/* Header section */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold px-2 py-0.5 rounded bg-[#f4eef7] text-[#412653] uppercase tracking-wider">
              Contributor 2 Module
            </span>
          </div>
          <h2 className="text-2xl font-bold text-slate-900 tracking-tight mt-1">
            Idea Vault & Brainstorming
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Capture raw thoughts, prioritize upcoming concepts, and convert winning ideas into content drafts.
          </p>
        </div>

        <Button
          variant="primary"
          onClick={() => handleOpenCreateModal()}
          className="shrink-0"
        >
          <Plus className="h-4 w-4" />
          <span>Capture Idea</span>
        </Button>
      </div>

      {/* KPI Stats Banner */}
      {stats && (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="bg-white rounded-xl p-4 border border-slate-200/80 shadow-xs flex items-center justify-between">
            <div>
              <p className="text-xs font-medium text-slate-500">Total Ideas</p>
              <p className="text-2xl font-bold text-slate-900 mt-1">{stats.total}</p>
            </div>
            <div className="p-2.5 rounded-lg bg-[#f4eef7] text-[#412653]">
              <Lightbulb className="h-5 w-5" />
            </div>
          </div>

          <div className="bg-white rounded-xl p-4 border border-slate-200/80 shadow-xs flex items-center justify-between">
            <div>
              <p className="text-xs font-medium text-slate-500">In Progress</p>
              <p className="text-2xl font-bold text-purple-700 mt-1">
                {stats.in_progress_count}
              </p>
            </div>
            <div className="p-2.5 rounded-lg bg-purple-50 text-purple-700">
              <Clock className="h-5 w-5" />
            </div>
          </div>

          <div className="bg-white rounded-xl p-4 border border-slate-200/80 shadow-xs flex items-center justify-between">
            <div>
              <p className="text-xs font-medium text-slate-500">Planned Queue</p>
              <p className="text-2xl font-bold text-indigo-700 mt-1">
                {stats.planned_count}
              </p>
            </div>
            <div className="p-2.5 rounded-lg bg-indigo-50 text-indigo-700">
              <ListTodo className="h-5 w-5" />
            </div>
          </div>

          <div className="bg-white rounded-xl p-4 border border-slate-200/80 shadow-xs flex items-center justify-between">
            <div>
              <p className="text-xs font-medium text-slate-500">Published</p>
              <p className="text-2xl font-bold text-emerald-700 mt-1">
                {stats.published_count}
              </p>
            </div>
            <div className="p-2.5 rounded-lg bg-emerald-50 text-emerald-700">
              <CheckCircle2 className="h-5 w-5" />
            </div>
          </div>
        </div>
      )}

      {/* Filter and search bar */}
      <IdeasFilterBar
        filters={filters}
        onChange={setFilters}
        viewMode={viewMode}
        onViewModeChange={setViewMode}
      />

      {/* Content representation */}
      {loading ? (
        <div className="py-20 text-center text-slate-400 text-sm flex flex-col items-center justify-center gap-2">
          <div className="h-6 w-6 border-2 border-[#412653] border-t-transparent rounded-full animate-spin" />
          <span>Loading ideas...</span>
        </div>
      ) : error ? (
        <div className="p-4 bg-rose-50 border border-rose-200 rounded-xl text-xs text-rose-700">
          {error}
        </div>
      ) : ideas.length === 0 ? (
        <EmptyState
          icon={Lightbulb}
          title="No content ideas found"
          description="Try modifying your search keywords or clear current filters to discover ideas."
          actionLabel="Create New Idea"
          onAction={() => handleOpenCreateModal()}
        />
      ) : viewMode === 'kanban' ? (
        <IdeasKanban
          ideas={ideas}
          onEdit={handleOpenEditModal}
          onDelete={handleDeletePrompt}
          onConvert={handleConvertIdea}
          onQuickAdd={(status) => handleOpenCreateModal(status)}
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {ideas.map((idea) => (
            <IdeaCard
              key={idea.id}
              idea={idea}
              onEdit={handleOpenEditModal}
              onDelete={handleDeletePrompt}
              onConvert={handleConvertIdea}
            />
          ))}
        </div>
      )}

      {/* Idea Modal (Create / Edit) */}
      <IdeaModal
        isOpen={modalOpen}
        onClose={() => {
          setModalOpen(false);
          setEditingIdea(null);
        }}
        onSave={handleSaveIdea}
        initialIdea={editingIdea}
        loading={modalLoading}
      />

      {/* Delete Confirmation Dialog */}
      <ConfirmDialog
        isOpen={deleteConfirmOpen}
        onClose={() => {
          setDeleteConfirmOpen(false);
          setIdeaToDelete(null);
        }}
        onConfirm={handleConfirmDelete}
        title="Delete Content Idea"
        message={`Are you sure you want to permanently delete "${ideaToDelete?.title}"? This action cannot be undone.`}
        confirmText="Delete Idea"
        loading={deleteLoading}
      />
    </div>
  );
}
