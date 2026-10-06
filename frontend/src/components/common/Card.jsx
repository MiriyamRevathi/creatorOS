import React from 'react';

export const Card = ({ children, className = '', title, subtitle, headerAction, ...props }) => {
  return (
    <div
      className={`bg-white dark:bg-brand-darkCard rounded-xl border border-slate-200/80 dark:border-slate-800 p-6 shadow-sm ${className}`}
      {...props}
    >
      {(title || subtitle || headerAction) && (
        <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-100 dark:border-slate-800">
          <div>
            {title && <h3 className="text-lg font-semibold text-slate-900 dark:text-white">{title}</h3>}
            {subtitle && <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{subtitle}</p>}
          </div>
          {headerAction && <div>{headerAction}</div>}
        </div>
      )}
      {children}
    </div>
  );
};
