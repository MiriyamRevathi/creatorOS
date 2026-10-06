import React from 'react';

export default function BrandCard({ brand, onViewProfile }) {
  return (
    <div 
      className="card"
      style={{
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        cursor: 'pointer'
      }}
      onClick={() => onViewProfile(brand)}
    >
      {/* Banner */}
      <div style={{
        height: '80px',
        backgroundImage: `url(${brand.banner})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        position: 'relative'
      }}>
        <div style={{
          position: 'absolute',
          inset: 0,
          backgroundColor: 'rgba(65, 38, 83, 0.4)'
        }}></div>
      </div>

      {/* Profile Header */}
      <div style={{ padding: '0 1.25rem', marginTop: '-30px', position: 'relative' }}>
        <img
          src={brand.logo}
          alt={brand.name}
          style={{
            width: '60px',
            height: '60px',
            borderRadius: '12px',
            objectFit: 'cover',
            border: '3px solid #FFFFFF',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
          }}
        />
      </div>

      {/* Details */}
      <div style={{ padding: '0.75rem 1.25rem 1.25rem', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.25rem' }}>
            <h4 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#412653', margin: 0 }}>
              {brand.name}
            </h4>
            {brand.verified && (
              <span style={{ color: '#3B82F6', fontSize: '0.85rem' }} title="Verified Brand Partner">
                ✓
              </span>
            )}
          </div>

          <div style={{ fontSize: '0.75rem', color: '#6B7280', marginBottom: '0.5rem' }}>
            {brand.category} • {brand.location}
          </div>

          <p style={{
            fontSize: '0.85rem',
            color: '#4B5563',
            marginBottom: '1rem',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden'
          }}>
            {brand.tagline}
          </p>
        </div>

        {/* Stats Grid */}
        <div>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '0.5rem',
            padding: '0.75rem',
            backgroundColor: '#F9FAFB',
            borderRadius: '8px',
            marginBottom: '1rem',
            textAlign: 'center'
          }}>
            <div>
              <div style={{ fontSize: '0.7rem', color: '#6B7280' }}>Rating</div>
              <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#412653' }}>★ {brand.rating}</div>
            </div>
            <div>
              <div style={{ fontSize: '0.7rem', color: '#6B7280' }}>Collabs</div>
              <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#412653' }}>{brand.collaborationsCount}</div>
            </div>
            <div>
              <div style={{ fontSize: '0.7rem', color: '#6B7280' }}>Avg Payout</div>
              <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#412653' }}>{brand.avgPayout}</div>
            </div>
          </div>

          <button
            className="btn-creative-outline"
            style={{ width: '100%', justifyContent: 'center', fontSize: '0.85rem' }}
          >
            View Brand Profile & Deals
          </button>
        </div>
      </div>
    </div>
  );
}
