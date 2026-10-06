import React from 'react';

export const Badge = ({ children, variant = 'default', size = 'sm', className = '' }) => {
  const sizeClasses = {
    sm: 'text-xs px-2 py-0.5',
    md: 'text-sm px-2.5 py-1',
  };

  const variants = {
    // Brand accents
    default: 'bg-slate-100 text-slate-700 border border-slate-200',
    purple: 'bg-brand-purple/10 text-brand-purple border border-brand-purple/20',
    slate: 'bg-brand-slate/10 text-brand-slate border border-brand-slate/20',
    lavender: 'bg-brand-lavender/15 text-brand-purple border border-brand-lavender/30',
    coral: 'bg-brand-coral/10 text-brand-coral border border-brand-coral/20',
    success: 'bg-emerald-50 text-emerald-700 border border-emerald-200',
    warning: 'bg-amber-50 text-amber-700 border border-amber-200',

    // Priorities
    urgent: 'bg-rose-100 text-rose-800 border border-rose-200 font-semibold',
    high: 'bg-amber-100 text-amber-800 border border-amber-200 font-medium',
    medium: 'bg-blue-50 text-blue-700 border border-blue-200',
    low: 'bg-slate-100 text-slate-600 border border-slate-200',

    // Statuses
    backlog: 'bg-slate-100 text-slate-700 border border-slate-200',
    planned: 'bg-indigo-50 text-indigo-700 border border-indigo-200',
    'in progress': 'bg-purple-50 text-purple-700 border border-purple-200 font-medium',
    published: 'bg-emerald-50 text-emerald-700 border border-emerald-200 font-medium',
    archived: 'bg-zinc-100 text-zinc-600 border border-zinc-200',

    // Content statuses
    draft: 'bg-slate-100 text-slate-700 border border-slate-200',
    'in review': 'bg-amber-50 text-amber-700 border border-amber-200',
    scheduled: 'bg-cyan-50 text-cyan-700 border border-cyan-200',
  };

  const key = String(variant).toLowerCase();
  const appliedClass = variants[key] || variants[variant] || variants.default;

  return (
    <span className={`inline-flex items-center rounded-full font-medium tracking-tight ${sizeClasses[size] || sizeClasses.sm} ${appliedClass} ${className}`}>
      {children}
    </span>
  );
};

export default Badge;
