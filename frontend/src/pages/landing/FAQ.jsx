import React, { useState } from 'react';
import { Navbar } from '../../components/layout/Navbar';
import { Footer } from '../../components/layout/Footer';
import { Card } from '../../components/common/Card';
import { Badge } from '../../components/common/Badge';
import { ChevronDown, ChevronUp } from 'lucide-react';

export const FAQ = () => {
  const faqs = [
    {
      q: 'Do I need a database server like PostgreSQL or MongoDB to run CreatorOS?',
      a: 'No. CreatorOS uses a file-based JSON repository architecture to store persistent data safely in the repository structure without external database dependencies.'
    },
    {
      q: 'Does CreatorOS require external API keys (OpenAI, Stripe, etc.)?',
      a: 'No external API keys are required. All features use local demo data and modular service interfaces so you can build, test, and run immediately.'
    },
    {
      q: 'Can I customize my Creator Profile and portfolio items?',
      a: 'Yes! Contributor 1 includes complete creator onboarding, profile editing, custom social links, niche selection, and portfolio item management.'
    },
    {
      q: 'How are notifications managed in CreatorOS?',
      a: 'CreatorOS has a dedicated Notification Context and repository backend that tracks read/unread statuses, system alerts, and campaign updates.'
    }
  ];

  const [openIndex, setOpenIndex] = useState(0);

  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-brand-darkBg text-slate-900 dark:text-white">
      <Navbar />
      <div className="py-16 md:py-24 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 flex-1">
        <div className="text-center mb-16">
          <Badge variant="purple" className="mb-3">Answers & Clarity</Badge>
          <h1 className="text-4xl font-extrabold tracking-tight">Frequently Asked Questions</h1>
          <p className="text-slate-600 dark:text-slate-400 mt-4 text-lg">
            Everything you need to know about CreatorOS architecture and features.
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <Card key={idx} className="p-6 cursor-pointer" onClick={() => setOpenIndex(isOpen ? null : idx)}>
                <div className="flex items-center justify-between">
                  <h3 className="text-base font-bold text-slate-900 dark:text-white">{faq.q}</h3>
                  {isOpen ? <ChevronUp className="w-5 h-5 text-brand-purple shrink-0" /> : <ChevronDown className="w-5 h-5 text-slate-400 shrink-0" />}
                </div>
                {isOpen && (
                  <p className="text-sm text-slate-600 dark:text-slate-400 mt-3 pt-3 border-t border-slate-100 dark:border-slate-800 leading-relaxed">
                    {faq.a}
                  </p>
                )}
              </Card>
            );
          })}
        </div>
      </div>
      <Footer />
    </div>
  );
};
