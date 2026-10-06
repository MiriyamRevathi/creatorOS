import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="bg-slate-900 text-slate-300 pt-16 pb-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-slate-800">
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-2 font-bold text-xl text-white">
              <div className="w-8 h-8 rounded-lg bg-brand-purple flex items-center justify-center text-white">
                <Sparkles className="w-5 h-5 text-brand-lavender" />
              </div>
              <span>Creator<span className="text-brand-coral">OS</span></span>
            </Link>
            <p className="text-sm text-slate-400 leading-relaxed">
              The unified premium operating system for content creators. Manage ideas, planning, analytics, brand deals and growth in one seamless workspace.
            </p>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-white tracking-wider uppercase mb-4">Platform</h4>
            <ul className="space-y-2.5 text-sm text-slate-400">
              <li><Link to="/features" className="hover:text-brand-lavender">Features</Link></li>
              <li><Link to="/pricing" className="hover:text-brand-lavender">Pricing Plans</Link></li>
              <li><Link to="/about" className="hover:text-brand-lavender">About CreatorOS</Link></li>
              <li><Link to="/faq" className="hover:text-brand-lavender">FAQ</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-white tracking-wider uppercase mb-4">Creator Journey</h4>
            <ul className="space-y-2.5 text-sm text-slate-400">
              <li><Link to="/register" className="hover:text-brand-lavender">Join CreatorOS</Link></li>
              <li><Link to="/login" className="hover:text-brand-lavender">Creator Sign In</Link></li>
              <li><Link to="/contact" className="hover:text-brand-lavender">Contact Support</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-white tracking-wider uppercase mb-4">Architecture</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Built using local JSON repository architecture, locked brand palette, and production-style clean components.
            </p>
          </div>
        </div>

        <div className="pt-8 flex flex-col md:flex-row items-center justify-between text-xs text-slate-500">
          <p>© {new Date().getFullYear()} CreatorOS. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link to="/settings" className="hover:text-slate-300">Privacy Policy</Link>
            <Link to="/settings" className="hover:text-slate-300">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
