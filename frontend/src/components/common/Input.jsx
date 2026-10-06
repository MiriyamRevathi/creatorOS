import React from 'react';

export const Input = ({
  label,
  error,
  helperText,
  className = '',
  id,
  type = 'text',
  ...props
}) => {
  const inputId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);

  return (
    <div className={`space-y-1.5 ${className}`}>
      {label && (
        <label htmlFor={inputId} className="block text-xs font-semibold text-slate-700 dark:text-slate-200">
          {label}
        </label>
      )}
      <input
        id={inputId}
        type={type}
        className={`w-full px-3.5 py-2 text-sm bg-white dark:bg-slate-900 border rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-brand-purple/20 ${
          error
            ? 'border-red-500 text-red-900 focus:border-red-500'
            : 'border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white focus:border-brand-purple'
        }`}
        {...props}
      />
      {error && <p className="text-xs text-red-500">{error}</p>}
      {helperText && !error && <p className="text-xs text-slate-500">{helperText}</p>}
    </div>
  );
};
