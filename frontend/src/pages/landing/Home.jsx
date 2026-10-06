import React from 'react';
import { Link } from 'react-router-dom';
import { Navbar } from '../../components/layout/Navbar';
import { Footer } from '../../components/layout/Footer';
import { Button } from '../../components/common/Button';
import { Card } from '../../components/common/Card';
import { Badge } from '../../components/common/Badge';
import { 
  Sparkles, 
  Lightbulb, 
  Video, 
  Calendar, 
  BarChart3, 
  Briefcase, 
  Store, 
  DollarSign, 
  ArrowRight 
} from 'lucide-react';

export const Home = () => {
  const workflowSteps = [
    { number: '01', title: 'Capture Ideas', desc: 'Vault & organize raw creative sparks into structured concepts.' },
    { number: '02', title: 'Plan & Draft', desc: 'Schedule content timelines and collaborate with team members.' },
    { number: '03', title: 'Publish & Reach', desc: 'Cross-post and track unified multi-channel analytics.' },
    { number: '04', title: 'Monetize & Scale', desc: 'Manage brand deals, digital product sales, and revenue streams.' }
  ];

  const features = [
    { icon: Lightbulb, title: 'Idea Vault', desc: 'Never lose a creative spark with tagged priority queues.' },
    { icon: Video, title: 'Content Studio', desc: 'Write scripts, manage captions, and organize media assets.' },
    { icon: Calendar, title: 'Content Calendar', desc: 'Visual multi-platform publishing schedule.' },
    { icon: BarChart3, title: 'Unified Analytics', desc: 'Track reach, engagement, and audience demographics.' },
    { icon: Briefcase, title: 'Brand Marketplace', desc: 'Manage brand deal pipelines and campaign deliverables.' },
    { icon: Store, title: 'Creator Store', desc: 'Sell digital downloads, courses, and premium memberships.' },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-brand-darkBg text-slate-900 dark:text-white">
      <Navbar />

      <section className="relative pt-20 pb-24 md:pt-32 md:pb-36 px-4 sm:px-6 lg:px-8 text-center max-w-5xl mx-auto">
        <Badge variant="purple" className="mb-6 px-4 py-1 text-xs uppercase tracking-widest font-bold">
          The Creator Operating System
        </Badge>

        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-[1.15]">
          One Unified Platform to <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-purple via-brand-slate to-brand-coral">
            Create, Plan, Scale & Monetize
          </span>
        </h1>

        <p className="mt-6 text-lg md:text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto leading-relaxed">
          Stop switching between disconnected tools for notes, calendars, spreadsheets, and brand deals. CreatorOS brings your entire content business into one elegant workspace.
        </p>

        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link to="/register">
            <Button variant="primary" size="lg" className="w-full sm:w-auto shadow-lg shadow-brand-purple/20">
              Start Free Creator Account <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </Link>
          <Link to="/features">
            <Button variant="outline" size="lg" className="w-full sm:w-auto">
              Explore All Features
            </Button>
          </Link>
        </div>

        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
          <Card className="hover:border-brand-purple/30 transition-all">
            <div className="w-10 h-10 rounded-xl bg-brand-purple/10 flex items-center justify-center mb-4 text-brand-purple">
              <Sparkles className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-base text-slate-900 dark:text-white">Unified Workspace</h3>
            <p className="text-sm text-slate-500 mt-2">Manage content from initial spark to revenue report without tab switching.</p>
          </Card>

          <Card className="hover:border-brand-purple/30 transition-all">
            <div className="w-10 h-10 rounded-xl bg-brand-slate/10 flex items-center justify-center mb-4 text-brand-slate">
              <Briefcase className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-base text-slate-900 dark:text-white">Brand Deal Management</h3>
            <p className="text-sm text-slate-500 mt-2">Professional campaign tracking, contract milestones, and payout status.</p>
          </Card>

          <Card className="hover:border-brand-purple/30 transition-all">
            <div className="w-10 h-10 rounded-xl bg-brand-coral/10 flex items-center justify-center mb-4 text-brand-coral">
              <DollarSign className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-base text-slate-900 dark:text-white">Product & Revenue Store</h3>
            <p className="text-sm text-slate-500 mt-2">Sell digital products directly to your audience with built-in analytics.</p>
          </Card>
        </div>
      </section>

      <section className="py-20 bg-slate-50 dark:bg-brand-darkCard/50 border-y border-slate-200/80 dark:border-slate-800 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <Badge variant="lavender" className="mb-3">Streamlined Lifecycle</Badge>
            <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white">How CreatorOS Powers Your Business</h2>
            <p className="text-slate-600 dark:text-slate-400 mt-3">From raw idea to sustained income in 4 clear stages.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {workflowSteps.map((step) => (
              <div key={step.number} className="bg-white dark:bg-brand-darkCard p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm relative">
                <span className="text-3xl font-black text-brand-purple/20 dark:text-brand-lavender/20">{step.number}</span>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white mt-2">{step.title}</h3>
                <p className="text-sm text-slate-500 dark:text-slate-400 mt-2 leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <Badge variant="purple" className="mb-3">All-In-One Toolkit</Badge>
          <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white">Complete Creator Ecosystem</h2>
          <p className="text-slate-600 dark:text-slate-400 mt-3">Everything you need to build a modern media brand.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((f, i) => {
            const Icon = f.icon;
            return (
              <Card key={i} className="p-6">
                <Icon className="w-8 h-8 text-brand-purple dark:text-brand-lavender mb-4" />
                <h3 className="font-bold text-lg text-slate-900 dark:text-white">{f.title}</h3>
                <p className="text-sm text-slate-500 dark:text-slate-400 mt-2 leading-relaxed">{f.desc}</p>
              </Card>
            );
          })}
        </div>
      </section>

      <section className="py-20 bg-brand-purple text-white text-center px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto space-y-6">
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight">Ready to Upgrade Your Creator Workflow?</h2>
          <p className="text-white/80 text-lg max-w-2xl mx-auto">Join thousands of creators who manage their content, brand deals, and products with CreatorOS.</p>
          <div className="pt-4">
            <Link to="/register">
              <Button variant="action" size="lg" className="px-8 py-4 text-base">
                Create Free Account
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};
