import React from 'react';
import {
  Lightbulb,
  PenTool,
  Library,
  LayoutDashboard,
  Calendar,
  BarChart3,
  Briefcase,
  Store,
  Sparkles,
} from 'lucide-react';

export function Sidebar({ currentTab, onNavigate }) {
  const activeModules = [
    { id: 'dashboard', label: 'Overview', icon: LayoutDashboard, badge: null },
    { id: 'ideas', label: 'Idea Vault', icon: Lightbulb, badge: 'C2' },
    { id: 'studio', label: 'Content Studio', icon: PenTool, badge: 'C2' },
    { id: 'library', label: 'Content Library', icon: Library, badge: 'C2' },
  ];

  const teamModules = [
    { id: 'calendar', label: 'Calendar & Collab', icon: Calendar, contributor: 'C3' },
    { id: 'analytics', label: 'Analytics & Trends', icon: BarChart3, contributor: 'C4' },
    { id: 'brands', label: 'Brand Marketplace', icon: Briefcase, contributor: 'C5' },
    { id: 'store', label: 'Store & Finance', icon: Store, contributor: 'C6' },
    { id: 'ai-qa', label: 'AI & QA Platform', icon: Sparkles, contributor: 'C7' },
  ];

  return (
    <aside className="w-64 bg-white border-r border-slate-200 flex flex-col shrink-0 h-screen sticky top-0 select-none z-20">
      {/* Brand Header */}
      <div className="h-16 flex items-center gap-3 px-6 border-b border-slate-100">
        <div className="h-9 w-9 rounded-lg bg-[#412653] flex items-center justify-center text-white font-bold text-lg shadow-sm">
          C
        </div>
        <div className="flex flex-col">
          <span className="font-bold text-slate-900 tracking-tight text-base flex items-center gap-1.5">
            Creator<span className="text-[#412653]">OS</span>
          </span>
          <span className="text-[10px] uppercase font-semibold text-slate-400 tracking-wider">
            Workspace v2.0
          </span>
        </div>
      </div>

      {/* Main Navigation */}
      <div className="flex-1 overflow-y-auto px-3 py-4 space-y-6">
        <div>
          <div className="px-3 mb-2 text-[11px] font-semibold uppercase text-slate-400 tracking-wider">
            Workspace Core
          </div>
          <nav className="space-y-1">
            {activeModules.map((item) => {
              const Icon = item.icon;
              const isActive = currentTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => onNavigate(item.id)}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                    isActive
                      ? 'bg-[#412653] text-white shadow-sm'
                      : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className={`h-4 w-4 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                    <span>{item.label}</span>
                  </div>
                  {item.badge && (
                    <span
                      className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${
                        isActive
                          ? 'bg-white/20 text-white'
                          : 'bg-[#f4eef7] text-[#412653]'
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Team Integration Modules */}
        <div>
          <div className="px-3 mb-2 text-[11px] font-semibold uppercase text-slate-400 tracking-wider flex items-center justify-between">
            <span>Team Modules</span>
            <span className="text-[9px] bg-slate-100 text-slate-500 px-1 rounded">7 Members</span>
          </div>
          <nav className="space-y-1">
            {teamModules.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.id}
                  className="w-full flex items-center justify-between px-3 py-1.5 rounded-lg text-xs font-medium text-slate-400 hover:bg-slate-50 cursor-not-allowed group"
                  title={`${item.label} is maintained by team contributor ${item.contributor}`}
                >
                  <div className="flex items-center gap-2.5">
                    <Icon className="h-3.5 w-3.5 text-slate-300" />
                    <span>{item.label}</span>
                  </div>
                  <span className="text-[9px] px-1 py-0.5 rounded bg-slate-100 text-slate-400 group-hover:bg-slate-200">
                    {item.contributor}
                  </span>
                </div>
              );
            })}
          </nav>
        </div>
      </div>

      {/* Contributor Footer Status */}
      <div className="p-3 border-t border-slate-100 bg-slate-50/50">
        <div className="flex items-center gap-2.5 px-2 py-1.5 rounded-md">
          <div className="h-7 w-7 rounded-full bg-[#3F567F] flex items-center justify-center text-white text-xs font-semibold">
            C2
          </div>
          <div className="flex flex-col min-w-0">
            <span className="text-xs font-semibold text-slate-800 truncate">
              Contributor 2
            </span>
            <span className="text-[10px] text-slate-400 truncate">
              Ideas • Studio • Library
            </span>
          </div>
        </div>
      </div>
    </aside>
  );
}
