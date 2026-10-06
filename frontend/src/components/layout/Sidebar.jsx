import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  User, 
  Settings, 
  Bell, 
  Lightbulb, 
  PenTool, 
  Library,
  Calendar, 
  BarChart3, 
  Store, 
  DollarSign, 
  Sparkles,
  Briefcase
} from 'lucide-react';

export const Sidebar = ({ collapsed }) => {
  const location = useLocation();

  const mainNavigation = [
    { label: 'Overview', path: '/dashboard', icon: LayoutDashboard },
    { label: 'Activity', path: '/dashboard/activity', icon: Bell },
    { label: 'Profile', path: '/creator/profile', icon: User },
    { label: 'Settings', path: '/settings', icon: Settings },
  ];

  const c2Navigation = [
    { label: 'Idea Vault', path: '/ideas', icon: Lightbulb, badge: 'C2' },
    { label: 'Content Studio', path: '/studio', icon: PenTool, badge: 'C2' },
    { label: 'Content Library', path: '/library', icon: Library, badge: 'C2' },
  ];

  const integrationPlaceholders = [
    { label: 'Calendar Hub', path: '/calendar', icon: Calendar, badge: 'C3' },
    { label: 'Analytics', path: '/analytics', icon: BarChart3, badge: 'C4' },
    { label: 'Brand Marketplace', path: '/marketplace', icon: Briefcase, badge: 'C5' },
    { label: 'Creator Store', path: '/store', icon: Store, badge: 'C6' },
    { label: 'Finance & Payouts', path: '/finance', icon: DollarSign, badge: 'C6' },
    { label: 'AI & QA Platform', path: '/ai-qa', icon: Sparkles, badge: 'C7' },
  ];

  return (
    <aside className={`bg-brand-purple text-white transition-all duration-300 ${collapsed ? 'w-20' : 'w-64'} min-h-screen flex flex-col justify-between shrink-0 shadow-lg`}>
      <div>
        {/* Brand Header */}
        <div className="h-16 flex items-center px-6 border-b border-white/10">
          <Link to="/dashboard" className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center border border-white/20">
              <Sparkles className="w-5 h-5 text-brand-lavender" />
            </div>
            {!collapsed && (
              <span className="font-extrabold text-lg tracking-tight text-white">
                Creator<span className="text-brand-coral">OS</span>
              </span>
            )}
          </Link>
        </div>

        {/* Main Navigation */}
        <div className="py-5 px-3 space-y-5">
          {/* C1 Core Platform */}
          <div>
            {!collapsed && <div className="px-3 text-[11px] font-bold uppercase tracking-wider text-white/50 mb-2">Core Platform</div>}
            <div className="space-y-1">
              {mainNavigation.map((item) => {
                const Icon = item.icon;
                const active = location.pathname === item.path;
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                      active
                        ? 'bg-white/20 text-white font-semibold shadow-inner'
                        : 'text-white/80 hover:bg-white/10 hover:text-white'
                    }`}
                  >
                    <Icon className="w-4 h-4 shrink-0" />
                    {!collapsed && <span>{item.label}</span>}
                  </Link>
                );
              })}
            </div>
          </div>

          {/* C2 Ideas & Content Studio */}
          <div>
            {!collapsed && (
              <div className="px-3 text-[11px] font-bold uppercase tracking-wider text-brand-lavender mb-2 flex items-center justify-between">
                <span>Ideas & Content</span>
                <span className="text-[9px] bg-white/10 text-white px-1.5 py-0.2 rounded font-mono">C2</span>
              </div>
            )}
            <div className="space-y-1">
              {c2Navigation.map((item) => {
                const Icon = item.icon;
                const active = location.pathname.startsWith(item.path);
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`flex items-center justify-between px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                      active
                        ? 'bg-white/25 text-white font-bold shadow-inner'
                        : 'text-white/90 hover:bg-white/10 hover:text-white'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Icon className="w-4 h-4 shrink-0 text-brand-lavender" />
                      {!collapsed && <span>{item.label}</span>}
                    </div>
                    {!collapsed && item.badge && (
                      <span className="text-[10px] px-1.5 py-0.5 rounded bg-brand-lavender/30 text-white font-mono">
                        {item.badge}
                      </span>
                    )}
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Module Integration Placeholders (C3-C7) */}
          <div>
            {!collapsed && (
              <div className="px-3 text-[11px] font-bold uppercase tracking-wider text-white/50 mb-2 flex items-center justify-between">
                <span>Team Modules</span>
                <span className="text-[9px] text-white/40">Upcoming</span>
              </div>
            )}
            <div className="space-y-1">
              {integrationPlaceholders.map((item) => {
                const Icon = item.icon;
                return (
                  <div
                    key={item.path}
                    className="flex items-center justify-between px-3 py-1.5 rounded-lg text-xs font-medium text-white/50 hover:bg-white/5 cursor-not-allowed group"
                    title={`${item.label} (Maintained by ${item.badge})`}
                  >
                    <div className="flex items-center gap-3">
                      <Icon className="w-4 h-4 shrink-0 text-white/40 group-hover:text-brand-lavender" />
                      {!collapsed && <span className="group-hover:text-white/70">{item.label}</span>}
                    </div>
                    {!collapsed && (
                      <span className="text-[9px] px-1.5 py-0.5 rounded bg-white/5 text-white/40 font-mono">
                        {item.badge}
                      </span>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Footer Info */}
      {!collapsed && (
        <div className="p-3 m-3 rounded-xl bg-white/5 border border-white/10 text-xs text-white/70">
          <p className="font-semibold text-white">CreatorOS Platform</p>
          <p className="text-[10px] text-white/50 mt-0.5">Contributor 1 & 2 Integrated</p>
        </div>
      )}
    </aside>
  );
};

export default Sidebar;
