import React from 'react';
import { Navbar } from '../../components/layout/Navbar';
import { Footer } from '../../components/layout/Footer';
import { Card } from '../../components/common/Card';
import { Badge } from '../../components/common/Badge';
import { 
  Lightbulb, Video, Calendar, BarChart3, Briefcase, Store, DollarSign, Shield, Zap
} from 'lucide-react';

export const Features = () => {
  const featureList = [
    { title: 'Core Platform & Profiles', icon: Shield, desc: 'Central creator profile with customized preferences, portfolio showcase, security controls, and customizable themes.' },
    { title: 'Idea Vault', icon: Lightbulb, desc: 'Capture sparks, categorize by platform/niche, assign priority weights, and convert directly to draft scripts.' },
    { title: 'Content Studio', icon: Video, desc: 'Write multi-format scripts (YouTube, Reels, Newsletters, Blogs) with tag organization and status tracking.' },
    { title: 'Content Calendar Hub', icon: Calendar, desc: 'Drag-and-drop planning view across YouTube, Instagram, TikTok, LinkedIn, and newsletters.' },
    { title: 'Analytics & Insights', icon: BarChart3, desc: 'Cross-platform growth telemetry, reach breakdown, engagement metrics, and channel audience trends.' },
    { title: 'Brand Marketplace', icon: Briefcase, desc: 'Sponsorship outreach, campaign stage pipelines, deliverables tracking, and contract milestones.' },
    { title: 'Creator Store & Orders', icon: Store, desc: 'Sell ebooks, digital presets, video courses, and templates directly to your audience.' },
    { title: 'Finance & Earnings', icon: DollarSign, desc: 'Revenue analytics, sponsorship payouts, store sales, expense tracking, and net profit dashboards.' },
    { title: 'DevOps & Data Integrity', icon: Zap, desc: 'Fast file-based local storage repositories, zero mandatory database lock-in, and reliable data persistence.' }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-brand-darkBg text-slate-900 dark:text-white">
      <Navbar />
      <div className="py-16 md:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex-1">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <Badge variant="purple" className="mb-3">Comprehensive Capabilities</Badge>
          <h1 className="text-4xl font-extrabold tracking-tight">CreatorOS Features</h1>
          <p className="text-slate-600 dark:text-slate-400 mt-4 text-lg">
            Designed specifically for creators who run their content like a real business.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {featureList.map((f, idx) => {
            const Icon = f.icon;
            return (
              <Card key={idx} className="p-6 hover:shadow-md transition-shadow">
                <div className="w-12 h-12 rounded-xl bg-brand-purple/10 flex items-center justify-center mb-5 text-brand-purple">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-lg text-slate-900 dark:text-white">{f.title}</h3>
                <p className="text-sm text-slate-500 dark:text-slate-400 mt-2 leading-relaxed">{f.desc}</p>
              </Card>
            );
          })}
        </div>
      </div>
      <Footer />
    </div>
  );
};
