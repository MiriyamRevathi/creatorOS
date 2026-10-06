import React from 'react';
import { Navbar } from '../../components/layout/Navbar';
import { Footer } from '../../components/layout/Footer';
import { Card } from '../../components/common/Card';
import { Badge } from '../../components/common/Badge';

export const About = () => {
  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-brand-darkBg text-slate-900 dark:text-white">
      <Navbar />
      <div className="py-16 md:py-24 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 flex-1">
        <div className="text-center mb-16">
          <Badge variant="purple" className="mb-3">Our Mission</Badge>
          <h1 className="text-4xl font-extrabold tracking-tight">About CreatorOS</h1>
          <p className="text-slate-600 dark:text-slate-400 mt-4 text-lg">
            Empowering modern digital creators to build sustainable, scalable media enterprises.
          </p>
        </div>

        <div className="space-y-8 text-slate-700 dark:text-slate-300 leading-relaxed text-sm">
          <Card className="p-8">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4">Why We Built CreatorOS</h2>
            <p>
              Content creators are the small business owners of the digital age. Yet, creators are forced to cobble together 7-10 separate applications—Notion for ideas, Google Docs for scripts, Trello for calendar, Spreadsheets for finance, and separate platforms for products.
            </p>
            <p className="mt-4">
              CreatorOS solves this fragmentation by offering ONE unified platform designed from the ground up specifically for creator workflows.
            </p>
          </Card>

          <Card className="p-8">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4">Core Principles</h2>
            <ul className="list-disc pl-5 space-y-2">
              <li><strong>Zero Database Lock-in:</strong> Local repository design ensures fast, transparent, privacy-first data handling.</li>
              <li><strong>Unified Ecosystem:</strong> Connects idea generation, planning, content creation, analytics, brand deals, and monetization.</li>
              <li><strong>Design Elegance:</strong> Built with a premium, slate-purple brand system that reduces cognitive clutter.</li>
            </ul>
          </Card>
        </div>
      </div>
      <Footer />
    </div>
  );
};
