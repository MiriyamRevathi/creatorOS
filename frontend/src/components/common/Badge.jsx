import React from 'react';

export const Badge = ({ children, variant = 'default', className = '' }) => {
  const variants = {
    default: 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300',
    purple: 'bg-brand-purple/10 text-brand-purple border border-brand-purple/20',
    slate: 'bg-brand-slate/10 text-brand-slate border border-brand-slate/20',
    lavender: 'bg-brand-lavender/15 text-brand-purple border border-brand-lavender/30',
    coral: 'bg-brand-coral/10 text-brand-coral border border-brand-coral/20',
    success: 'bg-emerald-50 text-emerald-700 border border-emerald-200',
    warning: 'bg-amber-50 text-amber-700 border border-amber-200'
  };

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold ${variants[variant] || variants.default} ${className}`}>
      {children}
    </span>
  );
};
