import React from 'react';

export default function CampaignCard({ campaign, onSelect, onApply }) {
  const formatCurrency = (val) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(val);
  };

  return (
    <div 
      className="card"
      style={{
        padding: '1.5rem',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        cursor: 'pointer',
        position: 'relative'
      }}
      onClick={() => onSelect(campaign)}
    >
      {/* Featured Ribbon / Badge */}
      {campaign.featured && (
        <div style={{
          position: 'absolute',
          top: '12px',
          right: '12px',
          backgroundColor: '#FFFBEB',
          border: '1px solid #FDE68A',
          color: '#B45309',
          fontSize: '0.7rem',
          fontWeight: 700,
          padding: '2px 8px',
          borderRadius: '9999px',
          textTransform: 'uppercase',
          letterSpacing: '0.05em'
        }}>
          Featured Spotlight
        </div>
      )}

      <div>
        {/* Brand & Category header */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
          <span style={{ fontSize: '0.8rem', fontWeight: 600, color: '#3F567F' }}>
            {campaign.brandName}
          </span>
          <span style={{ color: '#9CA3AF' }}>•</span>
          <span className="badge-creative" style={{ fontSize: '0.7rem' }}>
            {campaign.category}
          </span>
        </div>

        {/* Campaign Title */}
        <h4 style={{ 
          fontSize: '1.15rem', 
          fontWeight: 700, 
          color: '#412653', 
          marginBottom: '0.5rem',
          lineHeight: 1.3
        }}>
          {campaign.title}
        </h4>

        {/* Tagline */}
        <p style={{
          fontSize: '0.875rem',
          color: '#4B5563',
          marginBottom: '1rem',
          display: '-webkit-box',
          WebkitLineClamp: 2,
          WebkitBoxOrient: 'vertical',
          overflow: 'hidden'
        }}>
          {campaign.tagline}
        </p>

        {/* Deliverables summary pills */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem', marginBottom: '1.25rem' }}>
          {campaign.platforms?.map((p, idx) => (
            <span key={idx} style={{
              backgroundColor: '#F3F4F6',
              color: '#374151',
              fontSize: '0.75rem',
              padding: '2px 8px',
              borderRadius: '4px',
              fontWeight: 500
            }}>
              {p}
            </span>
          ))}
          {campaign.deliverables?.length > 0 && (
            <span style={{
              backgroundColor: '#EFF6FF',
              color: '#1D4ED8',
              fontSize: '0.75rem',
              padding: '2px 8px',
              borderRadius: '4px',
              fontWeight: 500
            }}>
              {campaign.deliverables.length} Deliverable{campaign.deliverables.length > 1 ? 's' : ''}
            </span>
          )}
        </div>
      </div>

      {/* Footer Info & Action */}
      <div style={{
        paddingTop: '1rem',
        borderTop: '1px solid #F3F4F6',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}>
        <div>
          <div style={{ fontSize: '0.75rem', color: '#6B7280', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
            Fixed Budget
          </div>
          <div style={{ fontSize: '1.2rem', fontWeight: 800, color: '#412653' }}>
            {formatCurrency(campaign.budget)}
          </div>
        </div>

        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <button 
            className="btn-action"
            style={{ fontSize: '0.8rem', padding: '0.45rem 0.9rem' }}
            onClick={(e) => {
              e.stopPropagation();
              onApply(campaign);
            }}
          >
            Apply Now
          </button>
        </div>
      </div>
    </div>
  );
}
