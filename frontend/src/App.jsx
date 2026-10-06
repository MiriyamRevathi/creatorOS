import React, { useState } from 'react';
import { Sidebar } from './components/layout/Sidebar';
import { Topbar } from './components/layout/Topbar';
import { DashboardOverview } from './pages/DashboardOverview';
import { IdeasPage } from './pages/IdeasPage';
import { ContentStudioPage } from './pages/ContentStudioPage';
import { ContentLibraryPage } from './pages/ContentLibraryPage';
import { contentService } from './services/contentService';

export function App() {
  const [currentTab, setCurrentTab] = useState('dashboard'); // 'dashboard', 'ideas', 'studio', 'library'
  const [studioContentId, setStudioContentId] = useState(null);
  const [convertedIdea, setConvertedIdea] = useState(null);

  const handleConvertIdeaToStudio = async (idea) => {
    try {
      const createdDraft = await contentService.convertIdeaToContent(idea.id);
      setConvertedIdea(createdDraft);
      setStudioContentId(createdDraft.id);
      setCurrentTab('studio');
    } catch (e) {
      alert(`Conversion error: ${e.message}`);
    }
  };

  const handleOpenContentInStudio = (contentItem) => {
    setStudioContentId(contentItem.id);
    setConvertedIdea(null);
    setCurrentTab('studio');
  };

  const handleNewContentStudio = () => {
    setStudioContentId(null);
    setConvertedIdea(null);
    setCurrentTab('studio');
  };

  const getPageTitle = () => {
    switch (currentTab) {
      case 'ideas':
        return { title: 'Idea Vault', subtitle: 'Capture & prioritize creator concepts' };
      case 'studio':
        return { title: 'Content Studio', subtitle: 'Draft, preview, and produce multi-platform media' };
      case 'library':
        return { title: 'Content Library', subtitle: 'Central assets repository & published records' };
      default:
        return { title: 'Creator Dashboard', subtitle: 'Overview of ideas, production pipeline & content' };
    }
  };

  const pageMeta = getPageTitle();

  return (
    <div className="flex min-h-screen bg-[#F8FAFC]">
      {/* Sidebar navigation */}
      <Sidebar
        currentTab={currentTab}
        onNavigate={(tab) => {
          if (tab === 'studio' && currentTab !== 'studio') {
            setStudioContentId(null);
            setConvertedIdea(null);
          }
          setCurrentTab(tab);
        }}
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        <Topbar
          title={pageMeta.title}
          subtitle={pageMeta.subtitle}
          onNewIdea={() => setCurrentTab('ideas')}
          onNewContent={handleNewContentStudio}
          showSearch={currentTab === 'dashboard'}
        />

        <main className="flex-1 pb-16">
          {currentTab === 'dashboard' && (
            <DashboardOverview
              onNavigateToIdeas={() => setCurrentTab('ideas')}
              onNavigateToStudio={handleNewContentStudio}
              onNavigateToLibrary={() => setCurrentTab('library')}
              onOpenContentInStudio={handleOpenContentInStudio}
            />
          )}

          {currentTab === 'ideas' && (
            <IdeasPage onConvertIdeaToStudio={handleConvertIdeaToStudio} />
          )}

          {currentTab === 'studio' && (
            <ContentStudioPage
              initialContentId={studioContentId}
              convertedFromIdea={convertedIdea}
              onNavigateToLibrary={() => setCurrentTab('library')}
            />
          )}

          {currentTab === 'library' && (
            <ContentLibraryPage
              onOpenInStudio={handleOpenContentInStudio}
              onNewContent={handleNewContentStudio}
            />
          )}
        </main>
      </div>
    </div>
  );
}

export default App;
