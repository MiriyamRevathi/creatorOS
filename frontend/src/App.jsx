import React, { useState } from 'react';
import Analytics from './pages/analytics/Analytics';
import TrendExplorer from './pages/trends/TrendExplorer';

export function App() {
  const [currentModule, setCurrentModule] = useState('analytics');

  return (
    <div className="min-h-screen bg-[#FDFCFE] flex flex-col font-sans">
      {/* Top Global CreatorOS Navigation Header */}
      <header className="bg-brand-purple text-white px-6 py-3.5 border-b border-purple-900 flex items-center justify-between shadow-md">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-brand-lavender text-brand-purple font-black flex items-center justify-center text-lg shadow">
            OS
          </div>
          <div>
            <h1 className="font-black text-lg tracking-tight leading-none text-white">CreatorOS</h1>
            <span className="text-[10px] text-brand-lavender font-semibold tracking-wider uppercase">Unified Platform — Contributor 4</span>
          </div>
        </div>

        {/* Top Module Switcher */}
        <div className="flex items-center gap-2 bg-purple-950/60 p-1 rounded-lg border border-purple-800">
          <button
            onClick={() => setCurrentModule('analytics')}
            className={`px-4 py-1.5 rounded-md text-xs font-bold transition-all cursor-pointer ${
              currentModule === 'analytics'
                ? 'bg-brand-lavender text-brand-purple shadow'
                : 'text-purple-200 hover:text-white'
            }`}
          >
            📊 Analytics & Insights Hub
          </button>
          <button
            onClick={() => setCurrentModule('trends')}
            className={`px-4 py-1.5 rounded-md text-xs font-bold transition-all cursor-pointer ${
              currentModule === 'trends'
                ? 'bg-brand-lavender text-brand-purple shadow'
                : 'text-purple-200 hover:text-white'
            }`}
          >
            🔥 Trend Intelligence Explorer
          </button>
        </div>

        {/* User Profile Badge */}
        <div className="flex items-center gap-3">
          <div className="text-right hidden sm:block">
            <div className="text-xs font-bold text-white">Alex Rivera</div>
            <div className="text-[10px] text-brand-lavender font-medium">Tech & AI Creator</div>
          </div>
          <div className="w-8 h-8 rounded-full bg-brand-coral text-white font-bold flex items-center justify-center text-xs border-2 border-white shadow-sm">
            AR
          </div>
        </div>
      </header>

      {/* Main Content Workspace */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8">
        {currentModule === 'analytics' && <Analytics />}
        {currentModule === 'trends' && <TrendExplorer />}
      </main>

      {/* Global CreatorOS Footer */}
      <footer className="bg-white border-t border-brand-border py-4 px-6 text-center text-xs text-gray-500">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-2">
          <span>© 2026 CreatorOS. All Rights Reserved. File-Based Repository Architecture.</span>
          <span className="text-brand-slate font-medium">Contributor 4 — Analytics, Insights & Trends</span>
        </div>
      </footer>
    </div>
  );
}

export default App;
