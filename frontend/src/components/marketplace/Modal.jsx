import React from 'react';

export default function Modal({ isOpen, onClose, title, subtitle, children, maxWidth = "max-w-2xl" }) {
  if (!isOpen) return null;

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      zIndex: 1000,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '1rem',
      backgroundColor: 'rgba(15, 23, 42, 0.65)',
      backdropFilter: 'blur(4px)',
      animation: 'fadeIn 0.2s ease-out'
    }}>
      <div 
        style={{
          backgroundColor: '#ffffff',
          borderRadius: '16px',
          width: '100%',
          maxWidth: maxWidth === 'max-w-3xl' ? '768px' : maxWidth === 'max-w-xl' ? '576px' : '640px',
          maxHeight: '90vh',
          display: 'flex',
          flexDirection: 'column',
          boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.2), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
          border: '1px solid #E5E7EB',
          overflow: 'hidden'
        }}
      >
        {/* Header */}
        <div style={{
          padding: '1.25rem 1.5rem',
          borderBottom: '1px solid #F3F4F6',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start'
        }}>
          <div>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#412653', margin: 0 }}>
              {title}
            </h3>
            {subtitle && (
              <p style={{ fontSize: '0.875rem', color: '#6B7280', marginTop: '0.25rem' }}>
                {subtitle}
              </p>
            )}
          </div>
          <button 
            onClick={onClose}
            style={{
              background: '#F3F4F6',
              border: 'none',
              borderRadius: '8px',
              width: '32px',
              height: '32px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              color: '#4B5563',
              fontSize: '1.25rem',
              lineHeight: 1
            }}
          >
            &times;
          </button>
        </div>

        {/* Content Body */}
        <div style={{ padding: '1.5rem', overflowY: 'auto', flex: 1 }}>
          {children}
        </div>
      </div>
    </div>
  );
}
