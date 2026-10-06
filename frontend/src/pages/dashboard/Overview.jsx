import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useCreator } from '../../context/CreatorContext';
import { Card } from '../../components/common/Card';
import { Badge } from '../../components/common/Badge';
import { Button } from '../../components/common/Button';
import { 
  TrendingUp, Users, Eye, Sparkles, Lightbulb, Video, Briefcase, Store, Calendar, ArrowUpRight
} from 'lucide-react';

export const Overview = () => {
  const { user } = useAuth();
  const { profile } = useCreator();

  const metrics = [
    { title: 'Total Reach', value: '142,500', growth: '+12.4%', icon: Eye, color: 'text-brand-purple' },
    { title: 'Subscribers / Audience', value: '28,400', growth: '+8.1%', icon: Users, color: 'text-brand-slate' },
    { title: 'Monthly Engagement Rate', value: '4.8%', growth: '+1.2%', icon: TrendingUp, color: 'text-emerald-600' },
    { title: 'Active Brand Deals', value: '3 Campaigns', growth: '$4,200', icon: Briefcase, color: 'text-brand-coral' }
  ];

  const upcomingContent = [
    { title: 'Building a 6-Figure Creator Operating System', platform: 'YouTube', date: 'Tomorrow, 5:00 PM', status: 'Ready' },
    { title: '5 Tools I Use to Manage Sponsorships', platform: 'Newsletter', date: 'Oct 8, 10:00 AM', status: 'Drafting' },
    { title: 'Behind the Scenes of My Workstation Setup', platform: 'Reels', date: 'Oct 10, 2:00 PM', status: 'Idea' }
  ];

  return (
    <div className="space-y-8">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-brand-purple via-brand-purple/95 to-brand-slate rounded-2xl p-6 md:p-8 text-white shadow-lg relative overflow-hidden">
        <div className="relative z-10 max-w-2xl">
          <Badge variant="lavender" className="mb-3">Creator Operating System</Badge>
          <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight">
            Welcome back, {user?.full_name || user?.username}! ✨
          </h1>
          <p className="text-white/80 text-sm mt-2 leading-relaxed">
            Your creator workspace is active. You have <strong className="text-brand-lavender">3 scheduled content pieces</strong> and <strong className="text-brand-coral font-bold">2 pending brand inquiries</strong> this week.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link to="/creator/profile">
              <Button variant="accent" size="sm">View Public Profile</Button>
            </Link>
            <Link to="/settings">
              <Button variant="outline" size="sm" className="border-white/30 text-white hover:bg-white/10">
                Workspace Settings
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {metrics.map((m, idx) => {
          const Icon = m.icon;
          return (
            <Card key={idx} className="p-5">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">{m.title}</span>
                <Icon className={`w-5 h-5 ${m.color}`} />
              </div>
              <div className="mt-4 flex items-baseline justify-between">
                <span className="text-2xl font-extrabold text-slate-900 dark:text-white">{m.value}</span>
                <span className="text-xs font-bold text-emerald-600 bg-emerald-50 dark:bg-emerald-950/30 px-2 py-0.5 rounded-md">
                  {m.growth}
                </span>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Main Grid: Content Schedule & Integration Placeholders */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Content Schedule */}
        <Card title="Upcoming Content Queue" className="lg:col-span-2" subtitle="Items scheduled across your active platforms">
          <div className="space-y-3">
            {upcomingContent.map((item, idx) => (
              <div key={idx} className="flex items-center justify-between p-4 rounded-xl border border-slate-100 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                <div className="flex items-center gap-3.5">
                  <div className="w-9 h-9 rounded-lg bg-brand-purple/10 flex items-center justify-center text-brand-purple font-bold text-xs shrink-0">
                    <Video className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-900 dark:text-white">{item.title}</h4>
                    <p className="text-xs text-slate-500 mt-0.5">{item.platform} • {item.date}</p>
                  </div>
                </div>
                <Badge variant={item.status === 'Ready' ? 'success' : 'purple'}>{item.status}</Badge>
              </div>
            ))}
          </div>
        </Card>

        {/* Creator Ecosystem Integration Panel */}
        <Card title="Ecosystem Quick Action" subtitle="Seamless navigation to platform contributor modules">
          <div className="space-y-3">
            <div className="p-3.5 rounded-xl border border-slate-100 dark:border-slate-800 flex items-center justify-between hover:bg-slate-50 dark:hover:bg-slate-800">
              <div className="flex items-center gap-3">
                <Lightbulb className="w-4 h-4 text-amber-500" />
                <span className="text-xs font-semibold text-slate-800 dark:text-slate-200">Idea Vault</span>
              </div>
              <Badge variant="purple">Contributor 2</Badge>
            </div>

            <div className="p-3.5 rounded-xl border border-slate-100 dark:border-slate-800 flex items-center justify-between hover:bg-slate-50 dark:hover:bg-slate-800">
              <div className="flex items-center gap-3">
                <Calendar className="w-4 h-4 text-sky-500" />
                <span className="text-xs font-semibold text-slate-800 dark:text-slate-200">Content Calendar</span>
              </div>
              <Badge variant="purple">Contributor 3</Badge>
            </div>

            <div className="p-3.5 rounded-xl border border-slate-100 dark:border-slate-800 flex items-center justify-between hover:bg-slate-50 dark:hover:bg-slate-800">
              <div className="flex items-center gap-3">
                <Briefcase className="w-4 h-4 text-emerald-500" />
                <span className="text-xs font-semibold text-slate-800 dark:text-slate-200">Brand Deals</span>
              </div>
              <Badge variant="purple">Contributor 5</Badge>
            </div>

            <div className="p-3.5 rounded-xl border border-slate-100 dark:border-slate-800 flex items-center justify-between hover:bg-slate-50 dark:hover:bg-slate-800">
              <div className="flex items-center gap-3">
                <Store className="w-4 h-4 text-brand-coral" />
                <span className="text-xs font-semibold text-slate-800 dark:text-slate-200">Creator Store</span>
              </div>
              <Badge variant="purple">Contributor 6</Badge>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};
