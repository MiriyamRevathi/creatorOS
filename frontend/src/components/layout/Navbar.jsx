import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Button } from '../common/Button';
import { Sparkles } from 'lucide-react';

export const Navbar = () => {
  const { isAuthenticated } = useAuth();
  const location = useLocation();

  const navLinks = [
    { label: 'Home', path: '/' },
    { label: 'Features', path: '/features' },
    { label: 'Pricing', path: '/pricing' },
    { label: 'About', path: '/about' },
    { label: 'Contact', path: '/contact' },
    { label: 'FAQ', path: '/faq' },
  ];

  return (
    <nav className="sticky top-0 z-40 bg-white/90 dark:bg-brand-darkBg/90 backdrop-blur-md border-b border-slate-200/80 dark:border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2.5 font-bold text-xl text-brand-purple dark:text-white">
          <div className="w-8 h-8 rounded-lg bg-brand-purple flex items-center justify-center text-white">
            <Sparkles className="w-5 h-5 text-brand-lavender" />
          </div>
          <span className="tracking-tight">Creator<span className="text-brand-coral">OS</span></span>
        </Link>

        <div className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => {
            const active = location.pathname === link.path;
            return (
              <Link
                key={link.path}
                to={link.path}
                className={`text-sm font-medium transition-colors ${
                  active
                    ? 'text-brand-purple dark:text-brand-lavender font-semibold'
                    : 'text-slate-600 dark:text-slate-300 hover:text-brand-purple'
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </div>

        <div className="flex items-center space-x-3">
          {isAuthenticated ? (
            <Link to="/dashboard">
              <Button variant="primary" size="sm">Go to Dashboard</Button>
            </Link>
          ) : (
            <>
              <Link to="/login">
                <Button variant="ghost" size="sm">Sign In</Button>
              </Link>
              <Link to="/register">
                <Button variant="primary" size="sm">Get Started</Button>
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};
