import React from 'react';

export const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  disabled = false,
  onClick,
  type = 'button',
  ...props
}) => {
  const baseStyles = 'inline-flex items-center justify-center font-medium rounded-lg transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed';

  const variants = {
    primary: 'bg-brand-purple hover:bg-brand-purple/90 text-white focus:ring-brand-purple',
    secondary: 'bg-brand-slate hover:bg-brand-slate/90 text-white focus:ring-brand-slate',
    accent: 'bg-brand-lavender hover:bg-brand-lavender/90 text-white focus:ring-brand-lavender',
    action: 'bg-brand-coral hover:bg-brand-coral/90 text-white focus:ring-brand-coral',
    outline: 'border border-brand-purple/30 text-brand-purple hover:bg-brand-purple/5 focus:ring-brand-purple',
    ghost: 'text-slate-600 hover:text-brand-purple hover:bg-slate-100 focus:ring-slate-300',
    danger: 'bg-red-600 hover:bg-red-700 text-white focus:ring-red-500'
  };

  const sizes = {
    sm: 'px-3 py-1.5 text-xs',
    md: 'px-4 py-2 text-sm',
    lg: 'px-6 py-3 text-base font-semibold'
  };

  return (
    <button
      type={type}
      className={`${baseStyles} ${variants[variant] || variants.primary} ${sizes[size]} ${className}`}
      disabled={disabled}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
};
