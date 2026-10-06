import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { contentService } from '../services/contentService';
import { useNotification } from '../context/NotificationContext';
import { ContentCard } from '../components/library/ContentCard';
import { ContentTableView } from '../components/library/ContentTableView';
import { ContentLibraryFilterBar } from '../components/library/ContentLibraryFilterBar';
import { ConfirmDialog } from '../components/common/ConfirmDialog';
import { EmptyState } from '../components/common/EmptyState';
import { Button } from '../components/common/Button';
import {
  Library,
  Plus,
  Download,
  FileCheck2,
  CalendarCheck,
  Send,
  FileText,
} from 'lucide-react';

export function ContentLibraryPage({ onOpenInStudio, onNewContent }) {
  const navigate = useNavigate();
  const [contentList, setContentList] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [filters, setFilters] = useState({
    search: '',
    status: 'All',
    content_type: 'All',
    platform: 'All',
    sort_by: 'updated_at',
    sort_order: 'desc',
  });

  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'table'

  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);
  const [deleteLoading, setDeleteLoading] = useState(false);

  const loadContent = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const [data, statsData] = await Promise.all([
        contentService.getContentList(filters),
        contentService.getStats(),
      ]);
      setContentList(data);
      setStats(statsData);
    } catch (err) {
      setError(err.message || 'Failed to load content items');
    } finally {
      setLoading(false);
    }
  }, [filters]);

  useEffect(() => {
    loadContent();
  }, [loadContent]);

  const notificationCtx = useNotification();
  const addToast = notificationCtx?.addToast || ((title, msg) => console.log(title, msg));

  const handleDeletePrompt = (item) => {
    setItemToDelete(item);
    setDeleteConfirmOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!itemToDelete) return;
    try {
      setDeleteLoading(true);
      await contentService.deleteContent(itemToDelete.id);
      addToast('Asset Deleted', `"${itemToDelete.title}" removed from library.`, 'info');
      setDeleteConfirmOpen(false);
      setItemToDelete(null);
      await loadContent();
    } catch (err) {
      addToast('Delete Failed', err.message, 'error');
    } finally {
      setDeleteLoading(false);
    }
  };

  const handleArchive = async (item) => {
    try {
      await contentService.updateContent(item.id, { status: 'Archived' });
      addToast('Archived', `"${item.title}" moved to archive.`, 'info');
      await loadContent();
    } catch (err) {
      addToast('Archive Failed', err.message, 'error');
    }
  };

  const handleExportJson = () => {
    try {
      const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(contentList, null, 2));
      const downloadAnchor = document.createElement('a');
      downloadAnchor.setAttribute('href', dataStr);
      downloadAnchor.setAttribute('download', `creatoros_content_export_${Date.now()}.json`);
      document.body.appendChild(downloadAnchor);
      downloadAnchor.click();
      downloadAnchor.remove();
      addToast('Export Complete', `${contentList.length} items exported to JSON file!`, 'success');
    } catch (err) {
      addToast('Export Failed', err.message, 'error');
    }
  };

  return (
    <div className="p-8 space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold px-2 py-0.5 rounded bg-[#f4eef7] text-[#412653] uppercase tracking-wider">
              Asset Vault & Catalog
            </span>
          </div>
          <h2 className="text-2xl font-bold text-slate-900 tracking-tight mt-1">
            Content Library & Repository
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Central repository of all drafts, scripts, scheduled assets, and published creator media.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={handleExportJson} className="hover:bg-slate-50">
            <Download className="h-3.5 w-3.5 mr-1" />
            <span>Export Catalog (.JSON)</span>
          </Button>

          <Button variant="primary" size="sm" onClick={onNewContent || (() => navigate('/studio'))} className="shadow-xs hover:shadow">
            <Plus className="h-3.5 w-3.5 mr-1" />
            <span>Open in Studio</span>
          </Button>
        </div>
      </div>

      {/* KPI Stats Banner */}
      {stats && (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="bg-white rounded-xl p-4 border border-slate-200/80 shadow-xs flex items-center justify-between">
            <div>
              <p className="text-xs font-medium text-slate-500">Total Items</p>
              <p className="text-2xl font-bold text-slate-900 mt-1">{stats.total}</p>
            </div>
            <div className="p-2.5 rounded-lg bg-[#edf2f9] text-[#3F567F]">
              <Library className="h-5 w-5" />
            </div>
          </div>

          <div className="bg-white rounded-xl p-4 border border-slate-200/80 shadow-xs flex items-center justify-between">
            <div>
              <p className="text-xs font-medium text-slate-500">Drafts & Review</p>
              <p className="text-2xl font-bold text-amber-700 mt-1">
                {(stats.draft_count || 0) + (stats.in_review_count || 0)}
              </p>
            </div>
            <div className="p-2.5 rounded-lg bg-amber-50 text-amber-700">
              <FileCheck2 className="h-5 w-5" />
            </div>
          </div>

          <div className="bg-white rounded-xl p-4 border border-slate-200/80 shadow-xs flex items-center justify-between">
            <div>
              <p className="text-xs font-medium text-slate-500">Scheduled Queue</p>
              <p className="text-2xl font-bold text-cyan-700 mt-1">
                {stats.scheduled_count || 0}
              </p>
            </div>
            <div className="p-2.5 rounded-lg bg-cyan-50 text-cyan-700">
              <CalendarCheck className="h-5 w-5" />
            </div>
          </div>

          <div className="bg-white rounded-xl p-4 border border-slate-200/80 shadow-xs flex items-center justify-between">
            <div>
              <p className="text-xs font-medium text-slate-500">Published</p>
              <p className="text-2xl font-bold text-emerald-700 mt-1">
                {stats.published_count || 0}
              </p>
            </div>
            <div className="p-2.5 rounded-lg bg-emerald-50 text-emerald-700">
              <Send className="h-5 w-5" />
            </div>
          </div>
        </div>
      )}

      {/* Filter and search bar */}
      <ContentLibraryFilterBar
        filters={filters}
        onChange={setFilters}
        viewMode={viewMode}
        onViewModeChange={setViewMode}
      />

      {/* Content representation */}
      {loading ? (
        <div className="py-20 text-center text-slate-400 text-sm flex flex-col items-center justify-center gap-2">
          <div className="h-6 w-6 border-2 border-[#412653] border-t-transparent rounded-full animate-spin" />
          <span>Loading content library...</span>
        </div>
      ) : error ? (
        <div className="p-4 bg-rose-50 border border-rose-200 rounded-xl text-xs text-rose-700">
          {error}
        </div>
      ) : contentList.length === 0 ? (
        <EmptyState
          icon={Library}
          title="No content found"
          description="You have no saved content matching the current filter criteria."
          actionLabel="Create in Content Studio"
          onAction={onNewContent}
        />
      ) : viewMode === 'table' ? (
        <ContentTableView
          items={contentList}
          onOpenInStudio={onOpenInStudio}
          onDelete={handleDeletePrompt}
          onArchive={handleArchive}
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {contentList.map((item) => (
            <ContentCard
              key={item.id}
              content={item}
              onOpenInStudio={onOpenInStudio}
              onDelete={handleDeletePrompt}
              onArchive={handleArchive}
            />
          ))}
        </div>
      )}

      {/* Delete Confirmation Dialog */}
      <ConfirmDialog
        isOpen={deleteConfirmOpen}
        onClose={() => {
          setDeleteConfirmOpen(false);
          setItemToDelete(null);
        }}
        onConfirm={handleConfirmDelete}
        title="Delete Content Item"
        message={`Are you sure you want to permanently delete "${itemToDelete?.title}"?`}
        confirmText="Delete Content"
        loading={deleteLoading}
      />
    </div>
  );
}
